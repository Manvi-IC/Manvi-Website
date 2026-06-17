"use server";

import {
  canadaZones,
  ausZones,
  aramexAus,
  europeRemote,
  canadaRemote,
  usaRemote,
  ukRemote,
} from "./zipCodeData";

export interface ZipcodeResult {
  status: "success" | "fail";
  country?: string;
  postcode?: string;
  city?: string;
  state?: string;
  details?: string;
  deliveryTime?: string;
  isRemote?: boolean;
  notes?: string;
  matches?: Array<{ zip: string; days: string; label: string }>;
}

async function resolveCityState(canonCountry: string, cleanZip: string): Promise<{ city: string; state: string }> {
  let city = "";
  let state = "";

  if (!cleanZip) {
    return { city, state };
  }

  const countryToIso2: Record<string, string> = {
    "United States": "us",
    "Canada": "ca",
    "Australia": "au",
    "United Kingdom": "gb",
    "India": "in",
    "Germany": "de",
    "France": "fr",
    "Spain": "es",
    "Italy": "it",
    "Netherlands": "nl",
    "Belgium": "be",
    "Switzerland": "ch",
    "Austria": "at",
    "Sweden": "se",
    "Norway": "no",
    "Denmark": "dk",
    "Ireland": "ie",
    "Portugal": "pt"
  };

  const iso2 = countryToIso2[canonCountry] || countryToIso2[canonCountry.trim()];

  try {
    if (iso2 === "in") {
      const res = await fetch(`https://api.postalpincode.in/pincode/${cleanZip}`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        if (data && data[0]?.Status === "Success") {
          const postOffice = data[0].PostOffice?.[0];
          if (postOffice) {
            city = postOffice.District || postOffice.Name || "";
            state = postOffice.State || "";
          }
        }
      }
    } else if (iso2 === "gb") {
      const res = await fetch(`https://api.postcodes.io/postcodes/${cleanZip}`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          city = data.result.admin_district || data.result.parliamentary_constituency || "";
          state = data.result.region || data.result.country || "";
        }
      } else {
        const outcode = cleanZip.substring(0, 4).trim();
        const res2 = await fetch(`https://api.zippopotam.us/gb/${outcode}`, { signal: AbortSignal.timeout(3000) });
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2 && data2.places?.[0]) {
            city = data2.places[0]["place name"] || "";
            state = data2.places[0]["state"] || data2.places[0]["state abbreviation"] || "";
          }
        }
      }
    } else if (iso2 === "ca") {
      const fsa = cleanZip.substring(0, 3);
      const res = await fetch(`https://api.zippopotam.us/ca/${fsa}`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        if (data && data.places?.[0]) {
          city = data.places[0]["place name"] || "";
          state = data.places[0]["state"] || data.places[0]["state abbreviation"] || "";
        }
      }
    } else if (iso2) {
      const res = await fetch(`https://api.zippopotam.us/${iso2}/${cleanZip}`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        if (data && data.places?.[0]) {
          city = data.places[0]["place name"] || "";
          state = data.places[0]["state"] || data.places[0]["state abbreviation"] || "";
        }
      }
    }
  } catch (err) {
    console.warn("Failed to resolve city and state dynamically:", err);
  }

  return { city, state };
}

async function resolveEuropeCountry(cleanZip: string): Promise<{ canonCountry: string; city: string; state: string } | null> {
  const euroIsos = ["de", "fr", "es", "it", "nl", "be", "ch", "at", "se", "no", "dk", "ie", "pt"];
  const isoToName: Record<string, string> = {
    "de": "Germany",
    "fr": "France",
    "es": "Spain",
    "it": "Italy",
    "nl": "Netherlands",
    "be": "Belgium",
    "ch": "Switzerland",
    "at": "Austria",
    "se": "Sweden",
    "no": "Norway",
    "dk": "Denmark",
    "ie": "Ireland",
    "pt": "Portugal"
  };

  let targetIsos = euroIsos;
  if (/^\d{5}$/.test(cleanZip)) {
    targetIsos = ["de", "fr", "es", "it"];
  } else if (/^\d{4}$/.test(cleanZip)) {
    targetIsos = ["be", "ch", "at", "dk", "no"];
  } else if (/^\d{4}\s?[A-Z]{2}$/i.test(cleanZip)) {
    targetIsos = ["nl"];
  } else if (/^\d{3}\s?\d{2}$/.test(cleanZip)) {
    targetIsos = ["se"];
  } else if (/^\d{4}-\d{3}$/.test(cleanZip) || /^\d{7}$/.test(cleanZip)) {
    targetIsos = ["pt"];
  } else if (/^[A-Z\d]{3}\s?[A-Z\d]{4}$/i.test(cleanZip)) {
    targetIsos = ["ie"];
  }

  const fetches = targetIsos.map(async (iso) => {
    try {
      const res = await fetch(`https://api.zippopotam.us/${iso}/${cleanZip}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        if (data && data.places?.[0]) {
          return {
            canonCountry: isoToName[iso],
            city: data.places[0]["place name"] || "",
            state: data.places[0]["state"] || data.places[0]["state abbreviation"] || ""
          };
        }
      }
    } catch (e) {
      // ignore
    }
    return null;
  });

  const results = await Promise.all(fetches);
  const validResult = results.find(r => r !== null);
  return validResult || null;
}

export async function checkZipcodeAction(countryInput: string, zipInput: string = ""): Promise<ZipcodeResult> {
  const cleanCountry = countryInput.trim().toUpperCase();
  const cleanZip = zipInput.trim().toUpperCase().replace(/\s+/g, "");

  if (cleanCountry === "EUROPE") {
    if (!cleanZip) {
      return {
        status: "success",
        country: "Europe",
        postcode: "All Regions",
        deliveryTime: "12-15 Business Days",
        isRemote: false,
        details: "Serviceable destination: Europe.",
        notes: "Enter a specific European Postcode in the Zipcode field to check remote area status."
      };
    }

    const euroGeo = await resolveEuropeCountry(cleanZip);
    if (euroGeo) {
      const euroCountryName = euroGeo.canonCountry;
      const euroRemoteList = (europeRemote as any)[euroCountryName.toUpperCase()];
      const isRemote = euroRemoteList ? euroRemoteList.includes(cleanZip) : false;

      return {
        status: "success",
        country: euroCountryName,
        postcode: zipInput.trim(),
        city: euroGeo.city,
        state: euroGeo.state,
        deliveryTime: "12-15 Business Days",
        isRemote: isRemote,
        details: `Serviceable Postcode in ${euroCountryName}`,
        notes: isRemote
          ? `Designated as a ${euroCountryName} Remote Area. Surcharges apply.`
          : "Standard delivery area.",
      };
    }

    for (const [countryName, zipList] of Object.entries(europeRemote)) {
      if ((zipList as string[]).includes(cleanZip)) {
        return {
          status: "success",
          country: countryName,
          postcode: zipInput.trim(),
          deliveryTime: "12-15 Business Days",
          isRemote: true,
          details: `Serviceable Postcode in ${countryName}`,
          notes: "Designated as a Europe Remote Area. Surcharges apply."
        };
      }
    }

    if (cleanZip.length >= 3 && cleanZip.length <= 10) {
      return {
        status: "success",
        country: "Europe",
        postcode: zipInput.trim(),
        deliveryTime: "12-15 Business Days",
        isRemote: false,
        details: "Serviceable European Postcode",
        notes: "Standard delivery coverage applies."
      };
    }

    return { status: "fail" };
  }

  const res = await checkZipcodeActionRaw(countryInput, zipInput);
  if (res.status === "success" && zipInput.trim()) {
    const geo = await resolveCityState(res.country || countryInput, cleanZip);
    res.city = geo.city;
    res.state = geo.state;
  }
  return res;
}

async function checkZipcodeActionRaw(countryInput: string, zipInput: string = ""): Promise<ZipcodeResult> {
  const cleanCountry = countryInput.trim().toUpperCase();
  const cleanZip = zipInput.trim().toUpperCase().replace(/\s+/g, "");

  if (!cleanCountry) {
    return { status: "fail" };
  }

  const canonicalCountryMap: Record<string, string> = {
    "USA": "United States", "US": "United States", "UNITED STATES": "United States", "UNITED STATES OF AMERICA": "United States", "AMERICA": "United States",
    "CANADA": "Canada", "CA": "Canada",
    "AUSTRALIA": "Australia", "AU": "Australia",
    "UK": "United Kingdom", "UNITED KINGDOM": "United Kingdom", "GB": "United Kingdom", "GREAT BRITAIN": "United Kingdom", "ENGLAND": "United Kingdom", "SCOTLAND": "United Kingdom", "WALES": "United Kingdom",
    "INDIA": "India", "IN": "India",
    "GERMANY": "Germany", "DE": "Germany",
    "FRANCE": "France", "FR": "France",
    "SPAIN": "Spain", "ES": "Spain",
    "ITALY": "Italy", "IT": "Italy",
    "NETHERLANDS": "Netherlands", "NL": "Netherlands",
    "BELGIUM": "Belgium", "BE": "Belgium",
    "SWITZERLAND": "Switzerland", "CH": "Switzerland",
    "AUSTRIA": "Austria", "AT": "Austria",
    "SWEDEN": "Sweden", "SE": "Sweden",
    "NORWAY": "Norway", "NO": "Norway",
    "DENMARK": "Denmark", "DK": "Denmark",
    "IRELAND": "Ireland", "IE": "Ireland",
    "PORTUGAL": "Portugal", "PT": "Portugal"
  };

  const countryMatches: Record<string, { country: string; deliveryTime: string; details: string; notes?: string }> = {
    "UNITED STATES": {
      country: "United States",
      deliveryTime: "6-9 Business Days",
      details: "All standard United States zipcodes/cities are serviceable.",
      notes: "Enter a specific 5-digit US Zipcode in the Zipcode field to check remote area surcharge status."
    },
    "CANADA": {
      country: "Canada",
      deliveryTime: "12-15 Business Days",
      details: "All standard Canadian cities/postcodes are serviceable.",
      notes: "Enter a specific 3-character FSA prefix (e.g. M5V) in the Zipcode field to check remote area status."
    },
    "AUSTRALIA": {
      country: "Australia",
      deliveryTime: "8-12 Business Days",
      details: "All standard Australian cities/postcodes are serviceable.",
      notes: "Enter a specific 4-digit Australian Postcode in the Zipcode field to check remote area status."
    },
    "UNITED KINGDOM": {
      country: "United Kingdom",
      deliveryTime: "6-8 Business Days",
      details: "All standard United Kingdom cities/postcodes are serviceable.",
      notes: "Enter a specific UK Postcode (e.g. EC1A) in the Zipcode field to check remote area status."
    },
    "INDIA": {
      country: "India",
      deliveryTime: "1-3 Business Days (Domestic Pickup)",
      details: "Pan-India pickup network with express service in Punjab, Delhi NCR, Haryana, Rajasthan, Gujarat, Mumbai.",
      notes: "We ship worldwide from India with lowest B2B shipping rates."
    }
  };

  const canonCountry = canonicalCountryMap[cleanCountry];
  if (!canonCountry) {
    return { status: "fail" };
  }

  // If no zipcode is provided, return overall country serviceability success
  if (!cleanZip) {
    const countryMatch = countryMatches[canonCountry.toUpperCase()];
    return {
      status: "success",
      country: canonCountry,
      postcode: "All Regions",
      deliveryTime: countryMatch?.deliveryTime || "12-15 Business Days",
      isRemote: false,
      details: countryMatch?.details || `Serviceable destination country: ${canonCountry}.`,
      notes: countryMatch?.notes || "Standard delivery coverage applies."
    };
  }

  // If zipcode is provided, check based on the canonical country
  if (canonCountry === "Canada") {
    if (/^[A-Z]\d[A-Z]/i.test(cleanZip)) {
      const fsa = cleanZip.substring(0, 3);
      const zoneInfo = (canadaZones as any)[fsa];
      if (zoneInfo) {
        const isRemote = (canadaRemote as string[]).includes(cleanZip) || (canadaRemote as string[]).some(r => r.startsWith(fsa));
        const yvr = zoneInfo[0];
        const yyz = zoneInfo[1];
        
        return {
          status: "success",
          country: "Canada",
          postcode: cleanZip.substring(0, 3) + " " + cleanZip.substring(3),
          deliveryTime: "12-15 Business Days",
          isRemote: isRemote,
          details: `Serviceable FSA prefix: ${fsa} (YVR Zone: ${yvr}, YYZ Zone: ${yyz})`,
          notes: isRemote 
            ? "This location is designated as a Remote Area. Surcharges may apply."
            : "Standard delivery area.",
        };
      }
    }
    return { status: "fail" };
  }

  if (canonCountry === "Australia") {
    // 1. Check numeric postcode
    if (/^\d{4}$/.test(cleanZip)) {
      const postcode = cleanZip;
      const zoneInfo = (ausZones as any)[postcode];
      const aramexInfo = (aramexAus as any)[postcode];
      
      if (zoneInfo || aramexInfo) {
        const zone = zoneInfo ? zoneInfo.z : "N/A";
        const areas = zoneInfo ? zoneInfo.a : [];
        const isRemote = aramexInfo ? aramexInfo.b === "Remote" : false;
        const aramexCities = aramexInfo ? aramexInfo.c : [];
        
        let deliveryTime = "8-12 Business Days";
        if (zone) {
          if (zone.toLowerCase().includes("zone 1")) deliveryTime = "10-12 Business Days";
          else if (zone.toLowerCase().includes("zone 2")) deliveryTime = "15-18 Business Days";
          else if (/\b(zone [3-8])\b/i.test(zone)) deliveryTime = "18-22 Business Days";
        }

        const suburbList = areas.length > 0 
          ? areas.slice(0, 10).join(", ") + (areas.length > 10 ? "..." : "")
          : (aramexCities.length > 0 ? aramexCities.slice(0, 10).join(", ") : "Australia");

        return {
          status: "success",
          country: "Australia",
          postcode: postcode,
          deliveryTime: deliveryTime,
          isRemote: isRemote,
          details: `Serviceable Postcode ${postcode} (${zone}). Suburbs: ${suburbList}`,
          notes: isRemote 
            ? "Classified as a Remote/Out-of-delivery area by Aramex. Surcharges may apply."
            : "Standard delivery area.",
        };
      }
    }

    // 2. Suburb / Suburb Name search in Australia
    if (cleanZip.length >= 3) {
      const matches: Array<{ zip: string; days: string; label: string }> = [];
      
      for (const [postcode, info] of Object.entries(ausZones)) {
        const postcodeInfo = info as { z: string; a: string[] };
        const matchingArea = postcodeInfo.a.find(area => area.toUpperCase().includes(cleanZip));
        if (matchingArea) {
          let deliveryTime = "8-12 Business Days";
          const zone = postcodeInfo.z;
          if (zone.toLowerCase().includes("zone 1")) deliveryTime = "10-12 Business Days";
          else if (zone.toLowerCase().includes("zone 2")) deliveryTime = "15-18 Business Days";
          else if (/\b(zone [3-8])\b/i.test(zone)) deliveryTime = "18-22 Business Days";
          
          matches.push({
            zip: postcode,
            days: deliveryTime,
            label: `${matchingArea}, Australia (${zone})`
          });
        }
        if (matches.length >= 10) break;
      }
      
      if (matches.length < 10) {
        for (const [postcode, info] of Object.entries(aramexAus)) {
          const postcodeInfo = info as { b: string; c: string[] };
          const matchingCity = postcodeInfo.c.find(city => city.toUpperCase().includes(cleanZip));
          if (matchingCity && !matches.some(m => m.zip === postcode)) {
            matches.push({
              zip: postcode,
              days: "8-12 Business Days",
              label: `${matchingCity}, Australia (${postcodeInfo.b} Area)`
            });
          }
          if (matches.length >= 10) break;
        }
      }
      
      if (matches.length > 0) {
        return {
          status: "success",
          country: "Australia",
          details: `Found matches for "${zipInput}" in Australia`,
          matches: matches
        };
      }
    }

    return { status: "fail" };
  }

  if (canonCountry === "United States") {
    if (/^\d{5}$/.test(cleanZip)) {
      const zipcode = cleanZip;
      const isRemote = (usaRemote as string[]).includes(zipcode);
      
      return {
        status: "success",
        country: "United States",
        postcode: zipcode,
        deliveryTime: "6-9 Business Days",
        isRemote: isRemote,
        details: `Serviceable United States Zipcode ${zipcode}`,
        notes: isRemote 
          ? "Designated as a Remote Area. Extended delivery times or surcharges may apply."
          : "Standard delivery area.",
      };
    }
    return { status: "fail" };
  }

  if (canonCountry === "United Kingdom") {
    const ukPatterns = [
      { prefix: "IM", label: "Isle of Man" },
      { prefix: "TR21", label: "Isles of Scilly" },
      { prefix: "TR22", label: "Isles of Scilly" },
      { prefix: "TR23", label: "Isles of Scilly" },
      { prefix: "TR24", label: "Isles of Scilly" },
      { prefix: "TR25", label: "Isles of Scilly" },
      { prefix: "BT", label: "Northern Ireland" },
    ];

    for (const pattern of ukPatterns) {
      if (cleanZip.startsWith(pattern.prefix)) {
        return {
          status: "success",
          country: "United Kingdom",
          postcode: zipInput.trim(),
          deliveryTime: "6-8 Business Days",
          isRemote: true,
          details: `Serviceable UK Postcode in ${pattern.label} (Prefix: ${pattern.prefix})`,
          notes: "Classified as a Remote Area. Surcharges may apply.",
        };
      }
    }
    
    if (/^[A-Z]{1,2}\d[A-Z\d]?/i.test(cleanZip) && cleanZip.length >= 3 && cleanZip.length <= 8) {
      return {
        status: "success",
        country: "United Kingdom",
        postcode: zipInput.trim(),
        deliveryTime: "6-8 Business Days",
        isRemote: false,
        details: "Serviceable United Kingdom Postcode",
        notes: "Standard delivery area.",
      };
    }
    return { status: "fail" };
  }

  if (canonCountry === "India") {
    if (/^\d{6}$/.test(cleanZip)) {
      return {
        status: "success",
        country: "India",
        postcode: cleanZip,
        deliveryTime: "1-3 Business Days (Domestic Pickup)",
        isRemote: false,
        details: `Serviceable Indian PIN Code: ${cleanZip}`,
        notes: "Pickup will be arranged within 24 hours of confirmation."
      };
    }
    return { status: "fail" };
  }

  // European countries and others check Remote lists
  const euroRemoteList = (europeRemote as any)[canonCountry.toUpperCase()];
  if (euroRemoteList) {
    const isRemote = euroRemoteList.includes(cleanZip);
    return {
      status: "success",
      country: canonCountry,
      postcode: zipInput.trim(),
      deliveryTime: "12-15 Business Days",
      isRemote: isRemote,
      details: `Serviceable Postcode in ${canonCountry}`,
      notes: isRemote
        ? "Designated as Europe Remote Area. Surcharges apply."
        : "Standard delivery area.",
    };
  }

  // Default success for standard country shipping if postcode format doesn't match remote patterns
  return {
    status: "success",
    country: canonCountry,
    postcode: zipInput.trim(),
    deliveryTime: "12-15 Business Days",
    isRemote: false,
    details: `Serviceable Postcode in ${canonCountry}`,
    notes: "Standard delivery coverage applies."
  };
}

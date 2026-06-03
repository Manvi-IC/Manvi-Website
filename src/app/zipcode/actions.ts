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
  details?: string;
  deliveryTime?: string;
  isRemote?: boolean;
  notes?: string;
  matches?: Array<{ zip: string; days: string; label: string }>;
}

export async function checkZipcodeAction(query: string): Promise<ZipcodeResult> {
  const clean = query.trim().toUpperCase().replace(/\s+/g, "");
  if (!clean) {
    return { status: "fail" };
  }

  // 1. Check Canada Postcode
  // Canada FSA is the first 3 characters (e.g. A0A, M5V)
  if (/^[A-Z]\d[A-Z]/i.test(clean)) {
    const fsa = clean.substring(0, 3);
    const zoneInfo = (canadaZones as any)[fsa];
    if (zoneInfo) {
      // Check if full postcode (or FSA) is in remote list
      // canadaRemote contains full 6-char postcodes in uppercase
      const isRemote = (canadaRemote as string[]).includes(clean) || (canadaRemote as string[]).some(r => r.startsWith(fsa));
      
      const yvr = zoneInfo[0];
      const yyz = zoneInfo[1];
      
      return {
        status: "success",
        country: "Canada",
        postcode: clean.substring(0, 3) + " " + clean.substring(3),
        deliveryTime: "12-15 Business Days",
        isRemote: isRemote,
        details: `Serviceable FSA prefix: ${fsa} (YVR Zone: ${yvr}, YYZ Zone: ${yyz})`,
        notes: isRemote 
          ? "This location is designated as a Remote Area. Surcharges may apply."
          : "Standard delivery area.",
      };
    }
  }

  // 2. Check Australia Postcode (4 digits)
  if (/^\d{4}$/.test(clean)) {
    const postcode = clean;
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

  // 3. Check USA Postcode (5 digits)
  if (/^\d{5}$/.test(clean)) {
    const zipcode = clean;
    // Standard US zipcodes are serviceable, we check if it is remote
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

  // 4. Check UK Postcode prefix
  // Remote UK postcodes: Isle of Man (IM), Isles of Scilly (TR21-25), Northern Ireland (BT), Scottish Islands (HS, IV, etc.)
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
    if (clean.startsWith(pattern.prefix)) {
      return {
        status: "success",
        country: "United Kingdom",
        postcode: query.trim(),
        deliveryTime: "6-8 Business Days",
        isRemote: true,
        details: `Serviceable UK Postcode in ${pattern.label} (Prefix: ${pattern.prefix})`,
        notes: "Classified as a Remote Area. Surcharges may apply.",
      };
    }
  }
  
  // Generic UK postcode matching (if starts with standard UK formats but not remote)
  if (/^[A-Z]{1,2}\d[A-Z\d]?/i.test(clean) && clean.length >= 3 && clean.length <= 8) {
    return {
      status: "success",
      country: "United Kingdom",
      postcode: query.trim(),
      deliveryTime: "6-8 Business Days",
      isRemote: false,
      details: "Serviceable United Kingdom Postcode",
      notes: "Standard delivery area.",
    };
  }

  // 5. Check Europe Remote Area Postcodes
  for (const [country, codes] of Object.entries(europeRemote)) {
    if ((codes as string[]).includes(clean)) {
      return {
        status: "success",
        country: country.charAt(0) + country.substring(1).toLowerCase(),
        postcode: query.trim(),
        deliveryTime: "12-15 Business Days",
        isRemote: true,
        details: `Serviceable Remote Area Postcode in ${country}`,
        notes: "Designated as Europe Remote Area. Surcharges apply.",
      };
    }
  }

  // 6. Suburb / Suburb Name search in Australia / Aramex
  const cleanSearchTerm = query.trim().toUpperCase();
  if (cleanSearchTerm.length >= 3) {
    const matches: Array<{ zip: string; days: string; label: string }> = [];
    
    // Search in Australia Zones
    for (const [postcode, info] of Object.entries(ausZones)) {
      const postcodeInfo = info as { z: string; a: string[] };
      const matchingArea = postcodeInfo.a.find(area => area.toUpperCase().includes(cleanSearchTerm));
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
    
    // Search in Aramex if we haven't hit limit
    if (matches.length < 10) {
      for (const [postcode, info] of Object.entries(aramexAus)) {
        const postcodeInfo = info as { b: string; c: string[] };
        const matchingCity = postcodeInfo.c.find(city => city.toUpperCase().includes(cleanSearchTerm));
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
        details: `Found matches for "${query}"`,
        matches: matches
      };
    }
  }

  // If no match found
  return { status: "fail" };
}

"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import odaMeta from "@/lib/oda_meta.json";

import { checkZipcodeAction, getCitiesAction } from "./actions";
import { useLanguage, Language } from "@/context/LanguageContext";
import {
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface ZipItem {
  zip: string;
  days: string;
  highlighted?: boolean;
}

interface CityGroup {
  city: string;
  items: ZipItem[];
}

const localTranslations: Record<
  Language,
  {
    banner_title: string;
    card_title: string;
    card_subtitle: string;
    country_placeholder: string;
    zipcode_placeholder: string;
    service_placeholder: string;
    btn_check: string;
    success_msg: string;
    fail_msg: string;
    fail_submsg: string;
    need_assistance: string;
    assistance_subtitle: string;
    contact_btn: string;
    business_days: string;
  }
> = {
  en: {
    banner_title: "Serviceable Zipcode",
    card_title: "Check delivery\navailability in your area",
    card_subtitle:
      "Select Your Destination Country And Enter Zip/PIN Code Below To Instantly Check Delivery Feasibility.",
    country_placeholder: "Select Country...",
    zipcode_placeholder: "Enter ZIP",
    service_placeholder: "Select Service",
    btn_check: "Check Availability",
    success_msg: "Great news! We serve your area",
    fail_msg: "We're Not There Yet",
    fail_submsg: "But Don't Worry... We're Expanding Soon!",
    need_assistance: "Need Assistance With\nYour ZIP Code?",
    assistance_subtitle:
      "Not Sure About Your ZIP/PIN Code? Enter Your City Name Instead.",
    contact_btn: "Contact Support",
    business_days: "Business Days",
  },
  hi: {
    banner_title: "सेवा योग्य पिनकोड",
    card_title: "अपने क्षेत्र में डिलीवरी\nउपलब्धता की जांच करें",
    card_subtitle:
      "डिलीवरी की व्यवहार्यता की तुरंत जांच करने के लिए नीचे अपने गंतव्य देश का चयन करें और ज़िप/पिन कोड दर्ज करें।",
    country_placeholder: "देश चुनें...",
    zipcode_placeholder: "पिनकोड / ज़िप कोड दर्ज करें (वैकल्पिक)",
    service_placeholder: "सेवा चुनें",
    btn_check: "उपलब्धता जांचें",
    success_msg: "खुशखबरी! हम आपके क्षेत्र में सेवा प्रदान करते हैं",
    fail_msg: "हम अभी वहाँ नहीं हैं",
    fail_submsg: "चिंता न करें... हम जल्द ही विस्तार कर रहे हैं!",
    need_assistance: "अपने पिनकोड के साथ\nसहायता चाहिए?",
    assistance_subtitle:
      "पिनकोड के बारे में निश्चित नहीं हैं? अपना शहर का नाम दर्ज करें।",
    contact_btn: "सहायता टीम से संपर्क करें",
    business_days: "कार्य दिवस",
  },
  pa: {
    banner_title: "ਸੇਵਾ ਯੋਗ ਪਿੰਨ ਕੋਡ",
    card_title: "ਆਪਣੇ ਖੇਤਰ ਵਿੱਚ ਡਿਲਿਵਰੀ\nਉਪਲਬਧਤਾ ਦੀ ਜਾਂਚ ਕਰੋ",
    card_subtitle:
      "ਡਿਲਿਵਰੀ ਦੀ ਸੰਭਾਵਨਾ ਦੀ ਤੁਰੰਤ ਜਾਂਚ ਕਰਨ ਲਈ ਹੇਠਾਂ ਆਪਣੇ ਦੇਸ਼ ਦੀ ਚੋਣ ਕਰੋ ਅਤੇ ਜ਼ਿਪ/ਪਿਨ ਕੋਡ ਦਰਜ ਕਰੋ।",
    country_placeholder: "ਦੇਸ਼ ਚੁਣੋ...",
    zipcode_placeholder: "ਪਿੰਨ ਕੋਡ / ਜ਼ਿਪ ਕੋਡ ਦਰਜ ਕਰੋ (ਵੈਕਲਪਿਕ)",
    service_placeholder: "ਸੇਵਾ ਚੁਣੋ",
    btn_check: "ਉਪਲਬਧਤਾ ਦੀ ਜਾਂਚ ਕਰੋ",
    success_msg: "ਖੁਸ਼ਖਬਰੀ! ਅਸੀਂ ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਸੇਵਾ ਕਰਦੇ ਹਾਂ",
    fail_msg: "ਅਸੀਂ ਅਜੇ ਉੱਥੇ ਨਹੀਂ ਪਹੁੰਚੇ",
    fail_submsg: "ਚਿੰਤਾ ਨਾ ਕਰੋ... ਅਸੀਂ ਜਲਦੀ ਹੀ ਵਿਸਤਾਰ ਕਰ ਰਹੇ ਹਾਂ!",
    need_assistance: "ਆਪਣੇ ਪਿੰਨ ਕੋਡ ਬਾਰੇ\nਮਦਦ ਚਾਹੀਦੀ ਹੈ?",
    assistance_subtitle:
      "ਪਿੰਨ ਕੋਡ ਬਾਰੇ ਪੱਕਾ ਪਤਾ ਨਹੀਂ? ਆਪਣਾ ਸ਼ਹਿਰ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ।",
    contact_btn: "ਸੰਪਰਕ ਸਹਾਇਤਾ",
    business_days: "ਕਾਰੋਬਾਰੀ ਦਿਨ",
  },
  fr: {
    banner_title: "Code postal desservi",
    card_title: "Vérifier la disponibilité\nde la livraison",
    card_subtitle:
      "Sélectionnez votre pays de destination et entrez le code postal ci-dessous pour vérifier la faisabilité de la livraison.",
    country_placeholder: "Sélectionnez le pays...",
    zipcode_placeholder: "Entrez le code postal (optionnel)",
    service_placeholder: "Sélectionnez le service",
    btn_check: "Vérifier la disponibilité",
    success_msg: "Bonne nouvelle ! Nous desservons votre zone",
    fail_msg: "Nous n'y sommes pas encore",
    fail_submsg: "Ne vous inquiétez pas... nous nous développons bientôt !",
    need_assistance: "Besoin d'aide avec\nvotre code postal ?",
    assistance_subtitle:
      "Pas sûr de votre code postal ? Entrez le nom de votre ville.",
    contact_btn: "Contacter le support",
    business_days: "Jours ouvrables",
  },
  es: {
    banner_title: "Códigos postales disponibles",
    card_title: "Verificar disponibilidad de\nentrega en su área",
    card_subtitle:
      "Seleccione su país de destino e ingrese el código postal a continuación para verificar la factibilidad de la entrega.",
    country_placeholder: "Seleccione el país...",
    zipcode_placeholder: "Ingrese el código postal (opcional)",
    service_placeholder: "Seleccionar servicio",
    btn_check: "Verificar disponibilidad",
    success_msg: "¡Buenas noticias! Servimos su área",
    fail_msg: "Aún no estamos allí",
    fail_submsg: "Pero no se preocupe... ¡nos expandiremos pronto!",
    need_assistance: "¿Necesita ayuda con su\ncódigo postal?",
    assistance_subtitle:
      "¿No está seguro de su código postal? Ingrese el nombre de su ciudad.",
    contact_btn: "Contactar a soporte",
    business_days: "Días hábiles",
  },
};

function toOdaCountry(country: string): string {
  const c = country.trim().toUpperCase();
  if (c === "UK" || c === "UNITED KINGDOM" || c === "GREAT BRITAIN" || c === "GB") {
    return "GREAT BRITAIN (UK)";
  }
  if (c === "USA" || c === "US" || c === "UNITED STATES" || c === "UNITED STATES OF AMERICA") {
    return "UNITED STATES";
  }
  if (c === "SOUTH KOREA" || c === "KOREA" || c === "KOREA (SOUTH)") {
    return "KOREA (SOUTH)";
  }
  if (c === "CROATIA") {
    return "CROATIA (HRVATSKA)";
  }
  if (c === "SERBIA") {
    return "SERBIA (KOSOVO)";
  }
  if (c === "NEW ZEALAND") {
    return "NEW ZEALAND (AOTEAROA)";
  }
  return c;
}

export default function ZipcodePage() {
  const { language } = useLanguage();
  const lang: Language = language || "en";
  const t = localTranslations[lang] || localTranslations.en;

  const [country, setCountry] = useState("");
  const [subCountry, setSubCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");
  const [countryMappings, setCountryMappings] = useState<{ country: string, services: string[] }[]>([]);
  
  const [citiesList, setCitiesList] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.countryServiceMapping) {
          setCountryMappings(data.data.countryServiceMapping);
        }
      })
      .catch(err => console.error("Failed to fetch country mappings", err));
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      const effectiveCountry = country.toUpperCase() === "INTERNATIONAL" ? subCountry : country;
      if (effectiveCountry) {
        const key = toOdaCountry(effectiveCountry);
        const meta = (odaMeta as any)[key];
        if (meta?.usesCity && !meta?.usesPostal) {
          const list = await getCitiesAction(effectiveCountry);
          setCitiesList(list);
        } else {
          setCitiesList([]);
        }
      } else {
        setCitiesList([]);
      }
    };
    fetchCities();
    setZipcode("");
  }, [country, subCountry]);

  const defaultMappings = [
    { country: "USA", services: ["DHL", "ARAMEX", "UPS", "FEDEX", "SELF - DUTY Paid"] },
    { country: "UK", services: ["DHL", "ARAMEX", "UPS", "FEDEX", "SELF - DUTY Paid"] },
    { country: "AUSTRALIA", services: ["DHL", "ARAMEX", "UPS", "FEDEX", "SELF - DUTY Paid"] },
    { country: "CANADA", services: ["DHL", "ARAMEX", "UPS", "FEDEX", "SELF - DUTY Paid"] },
    { country: "EUROPE", services: ["DHL", "ARAMEX", "UPS", "FEDEX", "SELF - DUTY Paid"] },
  ];

  const activeMappings = countryMappings.length > 0 ? countryMappings : defaultMappings;
  const availableServices = country
    ? (activeMappings.find(m => m.country.toUpperCase() === country.toUpperCase())?.services || ["DHL", "ARAMEX", "UPS", "FEDEX", "SELF - DUTY Paid"])
    : [];

  // Get active mapped countries
  const activeMappedCountries = activeMappings.map(m => m.country.toUpperCase());
  
  // Get ODA countries
  const odaCountries = Object.keys(odaMeta).map(c => c.toUpperCase());
  
  // Combine other countries (excluding the active mapped ones and INTERNATIONAL)
  const otherCountries = odaCountries.filter(c => !activeMappedCountries.includes(c) && c !== "INTERNATIONAL");
  otherCountries.sort(); // Sort alphabetically
  
  const mainCountries = [...activeMappedCountries];
  if (!mainCountries.includes("INTERNATIONAL")) {
    mainCountries.push("INTERNATIONAL");
  }

  // Detailed success state variables
  const [matchedCountry, setMatchedCountry] = useState("");
  const [matchedPostcode, setMatchedPostcode] = useState("");
  const [matchedCity, setMatchedCity] = useState("");
  const [matchedState, setMatchedState] = useState("");
  const [matchedDeliveryTime, setMatchedDeliveryTime] = useState("");
  const [matchedIsRemote, setMatchedIsRemote] = useState(false);
  const [matchedDetails, setMatchedDetails] = useState("");
  const [matchedNotes, setMatchedNotes] = useState("");

  const effectiveCountry = country.toUpperCase() === "INTERNATIONAL" ? subCountry : country;
  const canonCountry = effectiveCountry.trim().toUpperCase();
  const odaCountryKey = toOdaCountry(canonCountry);
  const countryMeta = odaCountryKey ? (odaMeta as any)[odaCountryKey] : null;

  let zipcodePlaceholder = t.zipcode_placeholder;
  let zipcodeLabel = "Zipcode";
  if (countryMeta?.usesCity && !countryMeta?.usesPostal) {
    zipcodePlaceholder = `Enter City (required for ${canonCountry})`;
    zipcodeLabel = "City";
  } else if (countryMeta?.usesPostal) {
    zipcodePlaceholder = `Enter Zipcode (required for ${canonCountry})`;
    zipcodeLabel = "Zipcode";
  } else if (canonCountry) {
    zipcodePlaceholder = `Enter Zipcode / City (required for ${canonCountry})`;
    zipcodeLabel = "Zipcode / City";
  }

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCountry = country.toUpperCase() === "INTERNATIONAL" ? subCountry.trim() : country.trim();
    const cleanZipcode = zipcode.trim();

    if (!cleanCountry || !service) {
      setStatus("idle");
      return;
    }

    try {
      const result = await checkZipcodeAction(cleanCountry, cleanZipcode, service);

      if (result.status === "success") {
        setStatus("success");
        setMatchedCountry(result.country || cleanCountry.toUpperCase());
        setMatchedPostcode(result.postcode || (cleanZipcode ? cleanZipcode.toUpperCase() : "All Regions"));
        setMatchedCity(result.city || "");
        setMatchedState(result.state || "");
        setMatchedDeliveryTime(result.deliveryTime || "Serviceable");
        setMatchedIsRemote(!!result.isRemote);
        setMatchedDetails(result.details || "");
        setMatchedNotes(result.notes || "");

      } else {
        setStatus("fail");
      }
    } catch (err) {
      console.warn("Error validating zipcode:", err);
      setStatus("fail");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Top Banner Section */}
      <section className="relative bg-[#0D1527] overflow-hidden min-h-55 flex items-center py-12 px-6">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="max-w-425 w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
          <div>
            <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
              {t.banner_title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="flex-grow max-w-425 w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Check Availability */}
          <div className="lg:col-span-5 order-1 h-full">
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6 h-full">
              <div className="flex flex-col gap-4">
                <h2 className="text-[28px] md:text-[32px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight whitespace-pre-line">
                  {t.card_title}
                </h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  {t.card_subtitle}
                </p>
              </div>

              <form onSubmit={handleCheck} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-extrabold text-[#1c1f2e] uppercase tracking-wider pl-0.5">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setSubCountry("");
                      setService("");
                    }}
                    className="bg-white text-[#333] text-[14px] font-semibold rounded-xl px-5 py-4 focus:outline-none border border-gray-200 shadow-sm w-full cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:18px_18px] bg-[right_20px_center] bg-no-repeat pr-12"
                  >
                    <option value="" disabled hidden>
                      {t.country_placeholder}
                    </option>
                    {mainCountries.map((c, idx) => (
                      <option key={idx} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {country === "INTERNATIONAL" && (
                  <div className="flex flex-col gap-1.5 transition-all duration-300">
                    <label className="text-[12px] font-extrabold text-[#1c1f2e] uppercase tracking-wider pl-0.5">
                      Destination Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={subCountry}
                      onChange={(e) => setSubCountry(e.target.value)}
                      className="bg-white text-[#333] text-[14px] font-semibold rounded-xl px-5 py-4 focus:outline-none border border-gray-200 shadow-sm w-full cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:18px_18px] bg-[right_20px_center] bg-no-repeat pr-12"
                    >
                      <option value="" disabled hidden>
                        Select Destination Country...
                      </option>
                      {otherCountries.map((c, idx) => (
                        <option key={idx} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-extrabold text-[#1c1f2e] uppercase tracking-wider pl-0.5">
                    Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="bg-white text-[#333] text-[14px] font-semibold rounded-xl px-5 py-4 focus:outline-none border border-gray-200 shadow-sm w-full cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:18px_18px] bg-[right_20px_center] bg-no-repeat pr-12"
                  >
                    <option value="" disabled hidden>
                      {t.service_placeholder}
                    </option>
                    {availableServices.map((svc, idx) => (
                      <option key={idx} value={svc}>{svc}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-[12px] font-extrabold text-[#1c1f2e] uppercase tracking-wider pl-0.5">
                    {zipcodeLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={zipcodePlaceholder}
                    value={zipcode}
                    onChange={(e) => {
                      setZipcode(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                      // Delay closing so that click events on suggestions can trigger first
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm w-full"
                  />
                  {showSuggestions && citiesList.length > 0 && zipcode.trim() && (
                    (() => {
                      const filtered = citiesList.filter(c => c.toLowerCase().includes(zipcode.toLowerCase())).slice(0, 5);
                      if (filtered.length === 0) return null;
                      return (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
                          {filtered.map((s, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setZipcode(s);
                                setShowSuggestions(false);
                              }}
                              className="w-full text-left px-5 py-3 hover:bg-gray-50 text-[14px] text-[#333] font-medium transition-colors border-b border-gray-100 last:border-0"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      );
                    })()
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-[14px] py-4 rounded-xl transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {t.btn_check}
                </button>
              </form>


            </div>
          </div>

          {/* Card 2: Need Assistance */}
          <div className="lg:col-span-5 order-2 lg:order-3 mt-6 lg:mt-0">
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col items-start gap-5">
              <h3 className="text-[28px] md:text-[32px] font-extrabold text-[#f27a1a] tracking-tight leading-tight whitespace-pre-line">
                {t.need_assistance}
              </h3>
              <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                {t.assistance_subtitle}
              </p>
              <a
                href="/#contact"
                className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-6 py-3 text-[14px] font-bold flex items-center gap-1.5 mt-2"
              >
                {t.contact_btn}{" "}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Right Column List / Results */}
          <div className="lg:col-span-7 flex flex-col gap-8 h-full order-3 lg:order-2 mt-2 lg:mt-0">
            {status === "success" && (
              <div className="bg-[#ecfdf5] border border-[#10b981] rounded-4xl p-8 lg:p-10 flex flex-col gap-6 shadow-sm h-full justify-center">
                <div className="flex items-center gap-3 text-[#059669] font-extrabold text-[24px]">
                  <CheckCircle2 className="w-8 h-8 shrink-0" />
                  <span>{t.success_msg}</span>
                </div>

                <div className="text-[16px] text-gray-600 font-semibold pl-11 flex flex-col gap-4 border-t border-emerald-200 pt-6">
                  <div className="flex items-center">
                    <span className="text-gray-400 w-36">Country:</span>
                    <span className="text-[#1c1f2e] text-[18px]">{matchedCountry}</span>
                  </div>
                  {matchedPostcode && (
                    <div className="flex items-center">
                      <span className="text-gray-400 w-36">Postcode/Area:</span>
                      <span className="text-[#1c1f2e] text-[18px]">{matchedPostcode}</span>
                    </div>
                  )}
                  {matchedCity && (
                    <div className="flex items-center">
                      <span className="text-gray-400 w-36">City:</span>
                      <span className="text-[#1c1f2e] text-[18px]">{matchedCity}</span>
                    </div>
                  )}
                  {matchedState && (
                    <div className="flex items-center">
                      <span className="text-gray-400 w-36">State/Province:</span>
                      <span className="text-[#1c1f2e] text-[18px]">{matchedState}</span>
                    </div>
                  )}
                  {matchedDeliveryTime && (
                    <div className="flex items-center">
                      <span className="text-gray-400 w-36">Est. Delivery:</span>
                      <span className="text-[#1c1f2e] text-[18px]">{matchedDeliveryTime}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="text-gray-400 w-36">Zone Type:</span>
                    <span className="text-[#1c1f2e] text-[18px]">
                      {matchedIsRemote
                        ? "Remote Area"
                        : "Standard Zone"}
                    </span>
                  </div>
                  {matchedIsRemote && (
                    <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 p-4 rounded-xl mt-2 font-bold flex items-center gap-2 shadow-sm">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
                      This is a remote area and extra charges will be applied.
                    </div>
                  )}
                  {matchedDetails && (
                    <div className="text-sm text-gray-500 italic mt-2 font-medium">
                      {matchedDetails}
                    </div>
                  )}
                  {matchedNotes && matchedNotes !== "This is a remote area and extra charges will be applied." && (
                    <div className={`text-sm p-4 rounded-xl mt-2 font-medium leading-relaxed ${
                      matchedIsRemote 
                        ? "text-amber-800 bg-amber-50 border border-amber-200" 
                        : "text-[#059669] bg-emerald-100/50 border border-emerald-200"
                    }`}>
                      {matchedNotes}
                    </div>
                  )}
                </div>
              </div>
            )}

            {status === "fail" && (
              <div className="bg-[#fef2f2] border border-[#ef4444] rounded-4xl p-8 lg:p-10 flex flex-col gap-4 shadow-sm h-full justify-center">
                <div className="flex items-center gap-3 text-[#dc2626] font-extrabold text-[24px]">
                  <AlertTriangle className="w-8 h-8 shrink-0" />
                  <span>{t.fail_msg}</span>
                </div>
                <span className="text-[16px] text-gray-500 font-semibold pl-11">
                  {t.fail_submsg}
                </span>
              </div>
            )}

            {status === "idle" && (
              <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-14 flex flex-col items-center justify-center text-center gap-4 h-full min-h-80 shadow-sm border border-gray-200/50">
                <MapPin size={56} className="text-gray-300" />
                <div>
                  <p className="text-[#1c1f2e] font-bold text-lg">
                    Check Availability
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Please enter a country and service to check delivery availability
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

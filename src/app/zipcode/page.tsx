"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

import { checkZipcodeAction } from "./actions";
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
    card_title: "Check Delivery\nAvailability In Your Area",
    card_subtitle:
      "Select/Enter Your Destination Country And Zip/PIN Code Below To Instantly Check Delivery Feasibility.",
    country_placeholder: "Enter Country (e.g. USA, Canada, UK, India)",
    zipcode_placeholder: "Enter ZIP / PIN Code (Optional)",
    btn_check: "Check Availability",
    success_msg: "Great News! We Serve Your Area",
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
      "डिलीवरी की व्यवहार्यता की तुरंत जांच करने के लिए नीचे अपने गंतव्य देश और ज़िप/पिन कोड का चयन/दर्ज करें।",
    country_placeholder: "देश का नाम दर्ज करें (जैसे: भारत, अमेरिका, कनाडा)",
    zipcode_placeholder: "पिनकोड / ज़िप कोड दर्ज करें (वैकल्पिक)",
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
      "ਡਿਲਿਵਰੀ ਦੀ ਸੰਭਾਵਨਾ ਦੀ ਤੁਰੰਤ ਜਾਂਚ ਕਰਨ ਲਈ ਹੇਠਾਂ ਆਪਣੇ ਦੇਸ਼ ਅਤੇ ਜ਼ਿਪ/ਪਿਨ ਕੋਡ ਦੇਸ਼ ਦਰਜ ਕਰੋ।",
    country_placeholder: "ਦੇਸ਼ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ (ਜਿਵੇਂ: ਭਾਰਤ, ਅਮਰੀਕਾ, ਕੈਨੇਡਾ)",
    zipcode_placeholder: "ਪਿੰਨ ਕੋਡ / ਜ਼ਿਪ ਕੋਡ ਦਰਜ ਕਰੋ (ਵੈਕਲਪਿਕ)",
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
      "Sélectionnez/entrez votre pays de destination et code postal ci-dessous pour vérifier la faisabilité de la livraison.",
    country_placeholder: "Entrez le nom du pays (ex. France, Canada, USA)",
    zipcode_placeholder: "Entrez le code postal (optionnel)",
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
      "Seleccione/ingrese su país de destino y código postal a continuación para verificar la factibilidad de la entrega.",
    country_placeholder: "Ingrese el nombre del país (ej. España, EE. UU.)",
    zipcode_placeholder: "Ingrese el código postal (opcional)",
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

export default function ZipcodePage() {
  const { language } = useLanguage();
  const lang: Language = language || "en";
  const t = localTranslations[lang] || localTranslations.en;

  const initialCities: CityGroup[] = [
    {
      city: "New York, NY",
      items: [
        { zip: "10001", days: `6-9 ${t.business_days}` },
        { zip: "10002", days: `6-9 ${t.business_days}` },
        { zip: "10003", days: `6-9 ${t.business_days}` },
        { zip: "10004", days: `6-9 ${t.business_days}` },
      ],
    },
    {
      city: "Los Angeles, CA",
      items: [
        { zip: "90001", days: `7-11 ${t.business_days}` },
        { zip: "90002", days: `7-11 ${t.business_days}` },
        { zip: "90003", days: `6-10 ${t.business_days}` },
        { zip: "90004", days: `7-11 ${t.business_days}` },
      ],
    },
  ];

  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");
  const [cities, setCities] = useState<CityGroup[]>(initialCities);

  // Detailed success state variables
  const [matchedCountry, setMatchedCountry] = useState("");
  const [matchedPostcode, setMatchedPostcode] = useState("");
  const [matchedCity, setMatchedCity] = useState("");
  const [matchedState, setMatchedState] = useState("");
  const [matchedDeliveryTime, setMatchedDeliveryTime] = useState("");
  const [matchedIsRemote, setMatchedIsRemote] = useState(false);
  const [matchedDetails, setMatchedDetails] = useState("");
  const [matchedNotes, setMatchedNotes] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCountry = country.trim();
    const cleanZipcode = zipcode.trim();

    if (!cleanCountry) {
      setStatus("idle");
      setCities(initialCities);
      return;
    }

    try {
      const result = await checkZipcodeAction(cleanCountry, cleanZipcode);

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

        const searchLabel = cleanZipcode ? `${cleanCountry} - ${cleanZipcode}` : cleanCountry;

        if (result.matches && result.matches.length > 0) {
          setCities([
            {
              city: `Matches for "${searchLabel}"`,
              items: result.matches.map((m) => ({
                zip: m.zip,
                days: m.days,
                highlighted: true,
              })),
            },
          ]);
        } else {
          setCities([
            {
              city: result.country || "Search Match",
              items: [
                {
                  zip: result.postcode || (cleanZipcode ? cleanZipcode.toUpperCase() : "All Regions"),
                  days: result.deliveryTime || "Serviceable",
                  highlighted: true,
                },
              ],
            },
            ...initialCities,
          ]);
        }
      } else {
        setStatus("fail");
        setCities(initialCities);
      }
    } catch (err) {
      console.warn("Error validating zipcode:", err);
      setStatus("fail");
      setCities(initialCities);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Top Banner Section */}
      <section className="relative bg-[#0b1220] overflow-hidden min-h-55 flex items-center py-12 px-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 1: Check Availability */}
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6">
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
                  <input
                    type="text"
                    required
                    placeholder={t.country_placeholder}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm w-full"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-extrabold text-[#1c1f2e] uppercase tracking-wider pl-0.5">
                    Zipcode / Pincode
                  </label>
                  <input
                    type="text"
                    placeholder={t.zipcode_placeholder}
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-[14px] py-4 rounded-xl transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {t.btn_check}
                </button>
              </form>

              {/* Status Alert Cards */}
              {status === "success" && (
                <div className="bg-[#ecfdf5] border border-[#10b981] rounded-2xl p-5 flex flex-col gap-2.5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#059669] font-extrabold text-[14px]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{t.success_msg}</span>
                  </div>

                  <div className="text-[13px] text-gray-600 font-semibold pl-7 flex flex-col gap-1.5 border-t border-emerald-100/50 pt-2.5">
                    <div>
                      <span className="text-gray-400">Country:</span>{" "}
                      {matchedCountry}
                    </div>
                    {matchedPostcode && (
                      <div>
                        <span className="text-gray-400">Postcode/Area:</span>{" "}
                        {matchedPostcode}
                      </div>
                    )}
                    {matchedCity && (
                      <div>
                        <span className="text-gray-400">City:</span>{" "}
                        {matchedCity}
                      </div>
                    )}
                    {matchedState && (
                      <div>
                        <span className="text-gray-400">State/Province:</span>{" "}
                        {matchedState}
                      </div>
                    )}
                    {matchedDeliveryTime && (
                      <div>
                        <span className="text-gray-400">Est. Delivery:</span>{" "}
                        {matchedDeliveryTime}
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Zone Type:</span>{" "}
                      {matchedIsRemote
                        ? "Remote Area (Surcharges may apply)"
                        : "Standard Zone"}
                    </div>
                    {matchedDetails && (
                      <div className="text-xs text-gray-500 italic mt-1 font-medium">
                        {matchedDetails}
                      </div>
                    )}
                    {matchedNotes && (
                      <div className="text-xs text-gray-500 bg-emerald-50/50 p-2.5 rounded-lg mt-1 font-medium leading-relaxed">
                        {matchedNotes}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {status === "fail" && (
                <div className="bg-[#fef2f2] border border-[#ef4444] rounded-2xl p-5 flex flex-col gap-1.5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#dc2626] font-extrabold text-[14px]">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>{t.fail_msg}</span>
                  </div>
                  <span className="text-[13px] text-gray-500 font-semibold pl-7">
                    {t.fail_submsg}
                  </span>
                </div>
              )}
            </div>

            {/* Card 2: Need Assistance */}
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

          {/* Right Column List */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {cities.map((group, gIdx) => (
              <div key={gIdx} className="flex flex-col gap-4">
                {/* City Heading Row */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#f27a1a]" />
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                    {group.city}
                  </h3>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-3.5">
                  {group.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className={`flex justify-between items-center px-6 py-4.5 rounded-2xl border transition-all ${item.highlighted
                          ? "bg-[#fff7ed] border-[#fed7aa] shadow-sm"
                          : "bg-white border-gray-100 shadow-sm"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#f27a1a] shrink-0" />
                        <span className="text-[15px] font-extrabold text-[#1c1f2e]">
                          {item.zip}
                        </span>
                      </div>
                      <span className="text-[13.5px] text-gray-400 font-bold">
                        {item.days}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

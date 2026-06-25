"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage, Language } from "@/context/LanguageContext";
import {
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Truck,
  Package,
  Clock,
  CalendarDays,
  Loader2,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ServiceArea {
  _id: string;
  city: string;
  state: string;
  country: string;
  pickupAvailable: boolean;
  dropoffAvailable: boolean;
  pickupDays: string;
  dropoffDays: string;
  pickupTimeSlot: string;
  dropoffTimeSlot: string;
  notes: string;
}

interface CityGroup {
  city: string;
  state: string;
  pickupAvailable: boolean;
  dropoffAvailable: boolean;
  pickupDays: string;
  dropoffDays: string;
  pickupTimeSlot: string;
  dropoffTimeSlot: string;
  notes: string;
  highlighted?: boolean;
}

const localTranslations: Record<
  Language,
  {
    banner_title: string;
    card_title: string;
    card_subtitle: string;
    input_placeholder: string;
    btn_check: string;
    success_msg: string;
    fail_msg: string;
    fail_submsg: string;
    need_assistance: string;
    assistance_subtitle: string;
    contact_btn: string;
    pickup: string;
    dropoff: string;
    available: string;
    not_available: string;
  }
> = {
  en: {
    banner_title: "Pickup Availability",
    card_title: "Check pickup\navailability in your destination",
    card_subtitle:
      "Enter your city or state below to instantly check if we offer pickup or dropoff from your location.",
    input_placeholder: "Enter city or state name…",
    btn_check: "Check Availability",
    success_msg: "Great news! We service your area",
    fail_msg: "We're Not There Yet",
    fail_submsg: "But Don't Worry... We're Expanding Soon!",
    need_assistance: "Need Assistance With\nYour Location?",
    assistance_subtitle:
      "Not sure about your city or area? Contact our support team and we'll help you out.",
    contact_btn: "Contact Support",
    pickup: "Pickup",
    dropoff: "Dropoff",
    available: "Available",
    not_available: "Not Available",
  },
  hi: {
    banner_title: "पिकअप उपलब्धता",
    card_title: "अपने गंतव्य में पिकअप\nउपलब्धता की जांच करें",
    card_subtitle:
      "यह जांचने के लिए कि क्या हम आपके स्थान से पिकअप करते हैं, अपना शहर या राज्य दर्ज करें।",
    input_placeholder: "शहर या राज्य दर्ज करें…",
    btn_check: "उपलब्धता जांचें",
    success_msg: "खुशखबरी! हम आपके क्षेत्र में सेवा देते हैं",
    fail_msg: "हम अभी वहाँ नहीं हैं",
    fail_submsg: "चिंता न करें... हम जल्द ही विस्तार कर रहे हैं!",
    need_assistance: "अपने स्थान के साथ\nसहायता चाहिए?",
    assistance_subtitle:
      "अपने शहर के बारे में निश्चित नहीं हैं? हमारी सहायता टीम से संपर्क करें।",
    contact_btn: "सहायता टीम से संपर्क करें",
    pickup: "पिकअप",
    dropoff: "ड्रॉपऑफ",
    available: "उपलब्ध",
    not_available: "उपलब्ध नहीं",
  },
  pa: {
    banner_title: "ਪਿਕਅੱਪ ਉਪਲਬਧਤਾ",
    card_title: "ਆਪਣੇ ਟਿਕਾਣੇ 'ਤੇ ਪਿਕਅੱਪ\nਉਪਲਬਧਤਾ ਦੀ ਜਾਂਚ ਕਰੋ",
    card_subtitle:
      "ਇਹ ਦੇਖਣ ਲਈ ਕਿ ਕੀ ਅਸੀਂ ਤੁਹਾਡੇ ਸਥਾਨ ਤੋਂ ਪਿਕਅੱਪ ਕਰਦੇ ਹਾਂ, ਆਪਣਾ ਸ਼ਹਿਰ ਜਾਂ ਰਾਜ ਦਰਜ ਕਰੋ।",
    input_placeholder: "ਸ਼ਹਿਰ ਜਾਂ ਰਾਜ ਦਰਜ ਕਰੋ…",
    btn_check: "ਉਪਲਬਧਤਾ ਦੀ ਜਾਂਚ ਕਰੋ",
    success_msg: "ਖੁਸ਼ਖਬਰੀ! ਅਸੀਂ ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਸੇਵਾ ਕਰਦੇ ਹਾਂ",
    fail_msg: "ਅਸੀਂ ਅਜੇ ਉੱਥੇ ਨਹੀਂ ਪਹੁੰਚੇ",
    fail_submsg: "ਚਿੰਤਾ ਨਾ ਕਰੋ... ਅਸੀਂ ਜਲਦੀ ਹੀ ਵਿਸਤਾਰ ਕਰ ਰਹੇ ਹਾਂ!",
    need_assistance: "ਆਪਣੇ ਸਥਾਨ ਬਾਰੇ\nਮਦਦ ਚਾਹੀਦੀ ਹੈ?",
    assistance_subtitle:
      "ਆਪਣੇ ਸ਼ਹਿਰ ਬਾਰੇ ਪੱਕਾ ਪਤਾ ਨਹੀਂ? ਸਾਡੀ ਟੀਮ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    contact_btn: "ਸੰਪਰਕ ਸਹਾਇਤਾ",
    pickup: "ਪਿਕਅੱਪ",
    dropoff: "ਡ੍ਰੌਪਆਫ਼",
    available: "ਉਪਲਬਧ",
    not_available: "ਉਪਲਬਧ ਨਹੀਂ",
  },
  fr: {
    banner_title: "Disponibilité d'enlèvement",
    card_title:
      "Vérifier la disponibilité\nd'enlèvement dans votre destination",
    card_subtitle:
      "Entrez votre ville ou votre état pour vérifier si nous effectuons des enlèvements chez vous.",
    input_placeholder: "Entrez la ville ou l'état…",
    btn_check: "Vérifier la disponibilité",
    success_msg: "Bonne nouvelle ! Nous desservons votre zone",
    fail_msg: "Nous n'y sommes pas encore",
    fail_submsg: "Ne vous inquiétez pas... nous nous développons bientôt !",
    need_assistance: "Besoin d'aide avec\nvotre localisation ?",
    assistance_subtitle:
      "Pas sûr de votre ville ? Contactez notre équipe support.",
    contact_btn: "Contacter le support",
    pickup: "Enlèvement",
    dropoff: "Dépôt",
    available: "Disponible",
    not_available: "Non disponible",
  },
  es: {
    banner_title: "Disponibilidad de recogida",
    card_title: "Verificar disponibilidad de\nrecogida en su destino",
    card_subtitle:
      "Ingrese su ciudad o estado para verificar si realizamos recogidas en su ubicación.",
    input_placeholder: "Ingrese ciudad o estado…",
    btn_check: "Verificar disponibilidad",
    success_msg: "¡Buenas noticias! Prestamos servicio en su área",
    fail_msg: "Aún no estamos allí",
    fail_submsg: "Pero no se preocupe... ¡nos expandiremos pronto!",
    need_assistance: "¿Necesita ayuda con\nsu ubicación?",
    assistance_subtitle:
      "¿No está seguro de su ciudad? Contacte a nuestro equipo de soporte.",
    contact_btn: "Contactar a soporte",
    pickup: "Recogida",
    dropoff: "Entrega",
    available: "Disponible",
    not_available: "No disponible",
  },
};

export default function PickupAvailabilityPage() {
  const { language } = useLanguage();
  const lang: Language = language || "en";
  const t = localTranslations[lang] || localTranslations.en;

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "fail">(
    "idle",
  );
  const [cities, setCities] = useState<CityGroup[]>([]);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setStatus("loading");
    try {
      const res = await fetch(
        `${API_URL}/service-areas/search?q=${encodeURIComponent(cleanQuery)}`,
      );
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        setCities(
          data.data.map((area: ServiceArea) => ({
            city: area.city,
            state: area.state,
            pickupAvailable: area.pickupAvailable,
            dropoffAvailable: area.dropoffAvailable,
            pickupDays: area.pickupDays,
            dropoffDays: area.dropoffDays,
            pickupTimeSlot: area.pickupTimeSlot,
            dropoffTimeSlot: area.dropoffTimeSlot,
            notes: area.notes,
            highlighted: true,
          })),
        );
        setStatus("success");
      } else {
        setCities([]);
        setStatus("fail");
      }
    } catch {
      setCities([]);
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
                <input
                  type="text"
                  placeholder={t.input_placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm w-full"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#f27a1a] hover:bg-orange-600 disabled:opacity-70 text-white font-bold text-[14px] py-4 rounded-xl transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === "loading" && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
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
            {/* Idle placeholder */}
            {status === "idle" && (
              <div className="flex flex-col items-center justify-center h-52 text-gray-300 gap-3">
                <MapPin className="w-10 h-10" />
                <p className="text-[14px] font-semibold text-gray-400 text-center">
                  Enter a city or state to check availability
                </p>
              </div>
            )}

            {cities.map((group, gIdx) => (
              <div key={gIdx} className="flex flex-col gap-4">
                {/* City Heading Row */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#f27a1a]" />
                  </div>
                  <div>
                    <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e] leading-tight">
                      {group.city}
                    </h3>
                    {group.state && (
                      <p className="text-[13px] text-gray-400 font-medium leading-none mt-0.5">
                        {group.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-3.5">
                  {/* Pickup Row */}
                  <div
                    className={`flex justify-between items-center px-6 py-4.5 rounded-2xl border transition-all ${
                      group.highlighted
                        ? "bg-[#fff7ed] border-[#fed7aa] shadow-sm"
                        : "bg-white border-gray-100 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#f27a1a] shrink-0" />
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-blue-500" />
                        <span className="text-[15px] font-extrabold text-[#1c1f2e]">
                          {t.pickup}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {group.pickupAvailable ? (
                        <>
                          <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            ✓ {t.available}
                          </span>
                          <div className="flex items-center gap-3 mt-0.5">
                            {group.pickupDays && (
                              <span className="flex items-center gap-1 text-[12px] text-gray-400 font-semibold">
                                <CalendarDays className="w-3 h-3" />
                                {group.pickupDays}
                              </span>
                            )}
                            {group.pickupTimeSlot && (
                              <span className="flex items-center gap-1 text-[12px] text-gray-400 font-semibold">
                                <Clock className="w-3 h-3" />
                                {group.pickupTimeSlot}
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <span className="text-[13.5px] text-gray-400 font-bold">
                          {t.not_available}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dropoff Row */}
                  <div
                    className={`flex justify-between items-center px-6 py-4.5 rounded-2xl border transition-all ${
                      group.highlighted
                        ? "bg-[#fff7ed] border-[#fed7aa] shadow-sm"
                        : "bg-white border-gray-100 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#f27a1a] shrink-0" />
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-purple-500" />
                        <span className="text-[15px] font-extrabold text-[#1c1f2e]">
                          {t.dropoff}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {group.dropoffAvailable ? (
                        <>
                          <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            ✓ {t.available}
                          </span>
                          <div className="flex items-center gap-3 mt-0.5">
                            {group.dropoffDays && (
                              <span className="flex items-center gap-1 text-[12px] text-gray-400 font-semibold">
                                <CalendarDays className="w-3 h-3" />
                                {group.dropoffDays}
                              </span>
                            )}
                            {group.dropoffTimeSlot && (
                              <span className="flex items-center gap-1 text-[12px] text-gray-400 font-semibold">
                                <Clock className="w-3 h-3" />
                                {group.dropoffTimeSlot}
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <span className="text-[13.5px] text-gray-400 font-bold">
                          {t.not_available}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Notes — only if present */}
                  {group.notes && (
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl px-6 py-3.5 text-[12px] text-amber-700 font-semibold leading-relaxed">
                      {group.notes}
                    </div>
                  )}
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

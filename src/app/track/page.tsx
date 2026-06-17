"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Package,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

const localTranslations: Record<
  Language,
  {
    banner_title: string;
    form_headline: string;
    form_subtitle: string;
    tracking_placeholder: string;
    contact_placeholder: string;
    btn_track: string;
    need_help: string;
    help_desc: string;
    contact_support_btn: string;
    err_empty: string;
    back_btn: string;
    live_map: string;
    lbl_tracking_num: string;
    lbl_status_ready: string;
    lbl_carrier_awb: string;
    lbl_shipment_created: string;
    lbl_current_location: string;
    lbl_shipment_status: string;
    status_confirmed: string;
    status_ready: string;
    status_shipped: string;
    status_transit: string;
    status_delivery: string;
    status_delivered: string;
    loc_noida: string;
    loc_delhi: string;
  }
> = {
  en: {
    banner_title: "Track Shipment",
    form_headline: "Track Your Shipment\nIn Real Time",
    form_subtitle:
      "Stay Updated On Your Delivery Status From Pickup To Doorstep. Enter Your Tracking Number And Contact Details Below To Get The Latest Shipment Updates Instantly.",
    tracking_placeholder: "Tracking Number",
    contact_placeholder: "Contact Number",
    btn_track: "Track Shipment",
    need_help: "Need Help?",
    help_desc:
      "If You're Experiencing Delays Or Cannot Locate Your Tracking Details, Our Customer Support Team Is Available Monday To Saturday To Assist You.",
    contact_support_btn: "Contact Support",
    err_empty: "Please enter a tracking number.",
    back_btn: "Search Another Shipment",
    live_map: "Live Route Map",
    lbl_tracking_num: "Tracking Number",
    lbl_status_ready: "Ready To Ship",
    lbl_carrier_awb: "AWB No. #AWB45678901",
    lbl_shipment_created: "Shipment Created",
    lbl_current_location: "Current Location",
    lbl_shipment_status: "Shipment Status",
    status_confirmed: "Order Confirmed",
    status_ready: "Ready To Ship",
    status_shipped: "Shipped",
    status_transit: "In Transit",
    status_delivery: "Out For Delivery",
    status_delivered: "Delivered",
    loc_noida: "Noida",
    loc_delhi: "New Delhi",
  },
  hi: {
    banner_title: "शिपमेंट ट्रैक करें",
    form_headline: "अपने शिपमेंट को वास्तविक\nसमय में ट्रैक करें",
    form_subtitle:
      "पिकअप से लेकर आपके दरवाजे तक डिलीवरी की स्थिति पर अपडेट रहें। तत्काल शिपमेंट अपडेट प्राप्त करने के लिए नीचे अपना ट्रैकिंग नंबर और संपर्क विवरण दर्ज करें।",
    tracking_placeholder: "ट्रैकिंग नंबर",
    contact_placeholder: "संपर्क नंबर",
    btn_track: "ट्रैक शिपमेंट",
    need_help: "सहायता चाहिए?",
    help_desc:
      "यदि आपको देरी का सामना करना पड़ रहा है या ट्रैकिंग विवरण नहीं मिल रहे हैं, तो हमारी टीम सहायता के लिए उपलब्ध है।",
    contact_support_btn: "सहायता टीम से संपर्क करें",
    err_empty: "कृपया एक ट्रैकिंग नंबर दर्ज करें।",
    back_btn: "अन्य शिपमेंट खोजें",
    live_map: "लाइव मार्ग मानचित्र",
    lbl_tracking_num: "ट्रैकिंग नंबर",
    lbl_status_ready: "शिपिंग के लिए तैयार",
    lbl_carrier_awb: "AWB संख्या #AWB45678901",
    lbl_shipment_created: "शिपमेंट बनाया गया",
    lbl_current_location: "वर्तमान स्थान",
    lbl_shipment_status: "शिपमेंट की स्थिति",
    status_confirmed: "ऑर्डर की पुष्टि हो गई",
    status_ready: "शिपिंग के लिए तैयार",
    status_shipped: "भेज दिया गया",
    status_transit: "मार्ग में",
    status_delivery: "वितरण के लिए बाहर",
    status_delivered: "वितरित",
    loc_noida: "नोएडा",
    loc_delhi: "नई दिल्ली",
  },
  pa: {
    banner_title: "ਸ਼ਿਪਮੈਂਟ ਟ੍ਰੈਕ ਕਰੋ",
    form_headline: "ਆਪਣੀ ਸ਼ਿਪਮੈਂਟ ਨੂੰ ਰੀਅਲ\nਟਾਈਮ ਵਿੱਚ ਟ੍ਰੈਕ ਕਰੋ",
    form_subtitle:
      "ਪਿਕਅੱਪ ਤੋਂ ਲੈ ਕੇ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੱਕ ਡਿਲਿਵਰੀ ਦੀ ਸਥਿਤੀ ਬਾਰੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ। ਤੁਰੰਤ ਸ਼ਿਪਮੈਂਟ ਅੱਪਡੇਟ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਹੇਠਾਂ ਟ੍ਰੈਕਿੰਗ ਨੰਬਰ ਦਰਜ ਕਰੋ।",
    tracking_placeholder: "ਟ੍ਰੈਕਿੰਗ ਨੰਬਰ",
    contact_placeholder: "ਸੰਪਰਕ ਨੰਬਰ",
    btn_track: "ਟ੍ਰੈਕ ਸ਼ਿਪਮੈਂਟ",
    need_help: "ਮਦਦ ਚਾਹੀਦੀ ਹੈ?",
    help_desc:
      "ਜੇਕਰ ਤੁਹਾਨੂੰ ਦੇਰੀ ਦਾ ਸਾਹਮਣਾ ਕਰਨਾ ਪੈ ਰਿਹਾ ਹੈ ਜਾਂ ਟ੍ਰੈਕਿੰਗ ਵੇਰਵੇ ਨਹੀਂ ਲੱਭ ਰਹੇ, ਸਾਡੀ ਟੀਮ ਹਾਜ਼ਰ ਹੈ।",
    contact_support_btn: "ਸੰਪਰਕ ਸਹਾਇਤਾ",
    err_empty: "ਕਿਰਪਾ ਕਰਕੇ ਟ੍ਰੈਕਿੰਗ ਨੰਬਰ ਦਰਜ ਕਰੋ।",
    back_btn: "ਹੋਰ ਸ਼ਿਪਮੈਂਟ ਖੋਜੋ",
    live_map: "ਲਾਈਵ ਰੂਟ ਨਕਸ਼ਾ",
    lbl_tracking_num: "ਟ੍ਰੈਕਿੰਗ ਨੰਬਰ",
    lbl_status_ready: "ਭੇਜਣ ਲਈ ਤਿਆਰ",
    lbl_carrier_awb: "AWB ਨੰਬਰ #AWB45678901",
    lbl_shipment_created: "ਸ਼ਿਪਮੈਂਟ ਬਣਾਈ ਗਈ",
    lbl_current_location: "ਮੌਜੂਦਾ ਸਥਾਨ",
    lbl_shipment_status: "ਸ਼ਿਪਮੈਂਟ ਸਥਿਤੀ",
    status_confirmed: "ਆਰਡਰ ਦੀ ਪੁਸ਼ਟੀ ਹੋਈ",
    status_ready: "ਭੇਜਣ ਲਈ ਤਿਆਰ",
    status_shipped: "ਭੇਜ ਦਿੱਤਾ ਗਿਆ",
    status_transit: "ਰਾਹ ਵਿੱਚ",
    status_delivery: "ਡਿਲਿਵਰੀ ਲਈ ਬਾਹਰ",
    status_delivered: "ਪਹੁੰਚਾਇਆ ਗਿਆ",
    loc_noida: "ਨੋਇਡਾ",
    loc_delhi: "ਨਵੀਂ ਦਿੱਲੀ",
  },
  fr: {
    banner_title: "Suivre l'envoi",
    form_headline: "Suivez votre envoi\nen temps réel",
    form_subtitle:
      "Restez informé du statut de votre livraison, de la collecte à la livraison finale. Entrez vos détails ci-dessous.",
    tracking_placeholder: "Numéro de suivi",
    contact_placeholder: "Numéro de contact",
    btn_track: "Suivre l'envoi",
    need_help: "Besoin d'aide ?",
    help_desc:
      "Si vous rencontrez des retards ou ne trouvez pas vos détails de suivi, notre équipe est disponible pour vous aider.",
    contact_support_btn: "Contacter le support",
    err_empty: "Veuillez entrer un numéro de suivi.",
    back_btn: "Rechercher un autre envoi",
    live_map: "Carte d'itinéraire en direct",
    lbl_tracking_num: "Numéro de suivi",
    lbl_status_ready: "Prêt à expédier",
    lbl_carrier_awb: "N° AWB #AWB45678901",
    lbl_shipment_created: "Envoi créé",
    lbl_current_location: "Localisation actuelle",
    lbl_shipment_status: "Statut de l'envoi",
    status_confirmed: "Commande confirmée",
    status_ready: "Prêt à expédier",
    status_shipped: "Expédié",
    status_transit: "En transit",
    status_delivery: "En cours de livraison",
    status_delivered: "Livré",
    loc_noida: "Noida",
    loc_delhi: "New Delhi",
  },
  es: {
    banner_title: "Rastrear envío",
    form_headline: "Siga su envío en\ntiempo real",
    form_subtitle:
      "Manténgase actualizado sobre el estado de su entrega desde la recogida hasta su puerta. Ingrese su número de seguimiento.",
    tracking_placeholder: "Número de seguimiento",
    contact_placeholder: "Número de contacto",
    btn_track: "Rastrear envío",
    need_help: "¿Necesita ayuda?",
    help_desc:
      "Si tiene demoras o no encuentra los detalles de seguimiento, nuestro equipo está a su disposición.",
    contact_support_btn: "Contactar a soporte",
    err_empty: "Por favor ingrese un número de seguimiento.",
    back_btn: "Buscar otro envío",
    live_map: "Mapa de ruta en vivo",
    lbl_tracking_num: "Número de seguimiento",
    lbl_status_ready: "Listo para enviar",
    lbl_carrier_awb: "N° AWB #AWB45678901",
    lbl_shipment_created: "Envío creado",
    lbl_current_location: "Ubicación actual",
    lbl_shipment_status: "Estado del envío",
    status_confirmed: "Pedido confirmado",
    status_ready: "Listo para enviar",
    status_shipped: "Enviado",
    status_transit: "En tránsito",
    status_delivery: "En reparto",
    status_delivered: "Entregado",
    loc_noida: "Noida",
    loc_delhi: "Nueva Delhi",
  },
};

export default function TrackPage() {
  const { language } = useLanguage();
  const lang: Language = language || "en";
  const t = localTranslations[lang] || localTranslations.en;

  const [trackingNumber, setTrackingNumber] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError(t.err_empty);
      return;
    }
    setError("");
    setHasSearched(true);
  };

  const handleReset = () => {
    setTrackingNumber("");
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Banner Section */}
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

      {/* Main Content Area */}
      <main className="flex-grow max-w-425 w-full mx-auto px-6 py-12">
        {!hasSearched ? (
          // Initial Form View
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Box: Form */}
            <div className="lg:col-span-7 bg-[#eef0f5] rounded-4xl p-8 lg:p-14 shadow-sm border border-gray-200/50 flex flex-col justify-between">
              <div className="flex flex-col gap-5">
                <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight whitespace-pre-line">
                  {t.form_headline}
                </h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-xl">
                  {t.form_subtitle}
                </p>
              </div>

              <form onSubmit={handleTrack} className="flex flex-col gap-4 mt-8">
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder={t.tracking_placeholder}
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-[14px] py-4 rounded-xl transition-all active:scale-98 cursor-pointer mt-4 flex items-center justify-center gap-2"
                >
                  {t.btn_track}
                </button>
              </form>
            </div>

            {/* Right Box: Help Card */}
            <div className="lg:col-span-5 bg-[#eef0f5] rounded-4xl p-8 lg:p-14 shadow-sm border border-gray-200/50 flex flex-col items-center justify-center text-center">
              <div className="max-w-md flex flex-col items-center gap-6">
                <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#f27a1a] tracking-tight">
                  {t.need_help}
                </h2>
                <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                  {t.help_desc}
                </p>
                <a
                  href="/contact"
                  className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-8 py-3 text-[14.5px] font-bold flex items-center gap-1.5 mt-4"
                >
                  {t.contact_support_btn}{" "}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        ) : (
          // Tracking Active / Details View
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Box: Tracking Timeline & Details */}
            <div className="lg:col-span-7 bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6">
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 rounded-2xl p-5 border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="w-[52px] h-[52px] rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-[#f27a1a]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 font-bold block uppercase tracking-wider">
                      {t.lbl_tracking_num}
                    </span>
                    <span className="text-[18px] sm:text-[20px] font-extrabold text-[#1c1f2e]">
                      {trackingNumber || "TRK45678901"}
                    </span>
                  </div>
                </div>
                <span className="border-2 border-[#f27a1a] text-[#f27a1a] bg-orange-50/50 font-bold text-[12px] px-4 py-1.5 rounded-full w-fit">
                  {t.lbl_status_ready}
                </span>
              </div>

              {/* Transit Subcard */}
              <div className="bg-white/60 rounded-2xl p-6 border border-white/50 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                <div>
                  <h3 className="text-[17px] font-extrabold text-[#1c1f2e] flex items-center gap-2">
                    {t.loc_delhi} <span className="text-gray-400">→</span>{" "}
                    Ontario, Canada
                  </h3>
                  <span className="text-[11.5px] text-gray-400 font-bold block mt-1">
                    {t.lbl_carrier_awb}
                  </span>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-[11.5px] text-gray-400 font-bold block">
                    15 Feb 2026
                  </span>
                </div>
                <div className="sm:col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/50 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                      {t.lbl_shipment_created}
                    </span>
                    <span className="text-[13px] font-bold text-[#1c1f2e]">
                      15 Feb 2026
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                      {t.lbl_current_location}
                    </span>
                    <span className="text-[13px] font-bold text-[#1c1f2e]">
                      {t.loc_delhi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipment Status Timeline */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
                <h3 className="text-[18px] font-extrabold text-[#1c1f2e]">
                  {t.lbl_shipment_status}
                </h3>

                {/* Vertical Timeline */}
                <div className="flex flex-col relative pl-6 border-l-2 border-gray-100 gap-8 mt-2 ml-3">
                  {/* Item 1 */}
                  <div className="relative">
                    {/* Active timeline bar */}
                    <div className="absolute -left-[31px] top-[24px] bottom-[-40px] w-0.5 bg-[#f27a1a]" />
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-[#f27a1a] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f27a1a]" />
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-[#1c1f2e]">
                          {t.status_confirmed}
                        </h4>
                        <span className="text-[12px] text-gray-400 font-semibold block mt-0.5">
                          15 Feb 26, {t.loc_noida}
                        </span>
                      </div>
                      <span className="text-[12px] text-gray-400 font-semibold">
                        05:56 Pm
                      </span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="relative">
                    {/* Active timeline bar end */}
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-[#f27a1a] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f27a1a]" />
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-[#1c1f2e]">
                          {t.status_ready}
                        </h4>
                        <span className="text-[12px] text-gray-400 font-semibold block mt-0.5">
                          15 Feb 26, {t.loc_noida}
                        </span>
                      </div>
                      <span className="text-[12px] text-gray-400 font-semibold">
                        05:56 Pm
                      </span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-gray-400">
                          {t.status_shipped}
                        </h4>
                        <span className="text-[12px] text-gray-300 font-semibold block mt-0.5">
                          --
                        </span>
                      </div>
                      <span className="text-[12px] text-gray-300 font-semibold">
                        --
                      </span>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-gray-400">
                          {t.status_transit}
                        </h4>
                        <span className="text-[12px] text-gray-300 font-semibold block mt-0.5">
                          --
                        </span>
                      </div>
                      <span className="text-[12px] text-gray-300 font-semibold">
                        --
                      </span>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-gray-400">
                          {t.status_delivery}
                        </h4>
                        <span className="text-[12px] text-gray-300 font-semibold block mt-0.5">
                          --
                        </span>
                      </div>
                      <span className="text-[12px] text-gray-300 font-semibold">
                        --
                      </span>
                    </div>
                  </div>

                  {/* Item 6 */}
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-gray-400">
                          {t.status_delivered}
                        </h4>
                        <span className="text-[12px] text-gray-300 font-semibold block mt-0.5">
                          --
                        </span>
                      </div>
                      <span className="text-[12px] text-gray-300 font-semibold">
                        --
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back button */}
              <button
                onClick={handleReset}
                className="bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-[14px] py-4 rounded-xl transition-all active:scale-98 cursor-pointer mt-4 flex items-center justify-center gap-2 w-full"
              >
                {t.back_btn}
              </button>
            </div>

            {/* Right Box: Satellite Map & Help Card */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Styled Satellite Map container */}
              <div className="w-full aspect-[4/3] rounded-4xl overflow-hidden bg-slate-200 relative border border-gray-200 shadow-sm min-h-75">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.64417734135!2d77.10896253457031!3d28.613939100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0xa1f13f1737e90c88!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 z-0"
                />
                <div className="absolute top-4 left-4 z-10 bg-[#0b1220]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#f27a1a]" /> {t.live_map}
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-14 shadow-sm border border-gray-200/50 flex flex-col items-center justify-center text-center">
                <div className="max-w-md flex flex-col items-center gap-6">
                  <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#f27a1a] tracking-tight">
                    {t.need_help}
                  </h2>
                  <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                    {t.help_desc}
                  </p>
                  <a
                    href="/contact"
                    className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-8 py-3 text-[14.5px] font-bold flex items-center gap-1.5 mt-4"
                  >
                    {t.contact_support_btn}{" "}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

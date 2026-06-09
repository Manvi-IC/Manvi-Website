"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Globe, ArrowUpRight } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

const localTranslations: Record<
  Language,
  {
    contact_us: string;
    get_in_touch: string;
    who_we_are_subtitle: string;
    tab_1: string;
    tab_2: string;
    tab_3: string;
    tab_4: string;
    here_to_help: string;
    here_to_help_subtitle: string;
    inquiry_form_btn: string;
    direct_comm_desc: string;
    phone_label: string;
    general_inquiries: string;
    business_partnerships: string;
    claims_refunds: string;
    office_desc: string;
    address_label: string;
    hours_mon_sat: string;
    hours_sun: string;
    global_reach_desc: string;
    inquiry_form_title: string;
    inquiry_form_subtitle: string;
    name_placeholder: string;
    contact_placeholder: string;
    email_placeholder: string;
    select_inquiry_type: string;
    quote_request: string;
    shipment_issue: string;
    business_partnership: string;
    other: string;
    destination_placeholder: string;
    query_placeholder: string;
    submit_btn: string;
    success_alert: string;
  }
> = {
  en: {
    contact_us: "Contact Us",
    get_in_touch: "Get In Touch",
    who_we_are_subtitle:
      "Have A Question About Your International Shipment, Need A Custom Quote, Or Want To Discuss A Business Partnership? Our Logistics Experts Are Ready To Assist You.",
    tab_1: "Direct Communication Channels",
    tab_2: "Visit Our Head Office",
    tab_3: "Operating Hours",
    tab_4: "Global Reach Support",
    here_to_help: "We're Here To Help",
    here_to_help_subtitle:
      "Tell Us About Your Concern And We'll Connect You With The Right Team To Assist You Quickly.",
    inquiry_form_btn: "Inquiry Form ↴",
    direct_comm_desc:
      "For The Fastest Response, We Recommend Using Our WhatsApp Or Direct Line During Business Hours.",
    phone_label: "Phone / WhatsApp:",
    general_inquiries: "General Inquiries:",
    business_partnerships: "Business & Partnerships:",
    claims_refunds: "Claims & Refunds:",
    office_desc:
      "Located In The Heart Of India's Logistics Hub, Our Delhi Office Handles All Global Routing And Documentation.",
    address_label: "Address:",
    hours_mon_sat: "Monday – Saturday: 10:00 AM To 7:00 PM (IST)",
    hours_sun: "Sunday: Closed (Online Tracking Available 24/7)",
    global_reach_desc:
      "As We Partner With World-Class Carriers, You Can Also Track Your Shipments Directly On Their Portals Using The AWB (Air Waybill) Provided By Us:",
    inquiry_form_title: "Inquiry Form",
    inquiry_form_subtitle:
      "Please Fill Out The Form Below, And A Member Of Our Team Will Get Back To You Within 24 Business Hours.",
    name_placeholder: "Name*",
    contact_placeholder: "Contact Number*",
    email_placeholder: "Email Address*",
    select_inquiry_type: "Select Inquiry Type",
    quote_request: "Quote Request",
    shipment_issue: "Shipment Issue",
    business_partnership: "Business Partnership",
    other: "Other",
    destination_placeholder: "Destination Country",
    query_placeholder: "Write Your Query Here ...",
    submit_btn: "Submit Query",
    success_alert: "Thank you! Your inquiry has been submitted.",
  },
  hi: {
    contact_us: "संपर्क करें",
    get_in_touch: "संपर्क में रहें",
    who_we_are_subtitle:
      "क्या आपके पास अपने अंतर्राष्ट्रीय शिपमेंट के बारे में कोई प्रश्न है, कस्टमाइज़्ड कोटेशन चाहिए, या व्यावसायिक साझेदारी पर चर्चा करना चाहते हैं? हमारे लॉजिस्टिक्स विशेषज्ञ आपकी सहायता के लिए तैयार हैं।",
    tab_1: "सीधे संपर्क माध्यम",
    tab_2: "हमारे मुख्य कार्यालय में आएं",
    tab_3: "संचालन का समय",
    tab_4: "वैश्विक पहुंच सहायता",
    here_to_help: "हम आपकी सहायता के लिए तैयार हैं",
    here_to_help_subtitle:
      "हमें अपनी समस्या के बारे में बताएं और हम आपकी तुरंत सहायता करने के लिए आपको सही टीम से जोड़ेंगे।",
    inquiry_form_btn: "पूछताछ फ़ॉर्म ↴",
    direct_comm_desc:
      "सबसे तेज़ प्रतिक्रिया के लिए, हम व्यावसायिक घंटों के दौरान हमारे व्हाट्सएप या डायरेक्ट लाइन का उपयोग करने की सलाह देते हैं।",
    phone_label: "फ़ोन / व्हाट्सएप:",
    general_inquiries: "सामान्य पूछताछ:",
    business_partnerships: "व्यवसाय और भागीदारी:",
    claims_refunds: "दावे और रिफंड:",
    office_desc:
      "भारत के लॉजिस्टिक्स हब के केंद्र में स्थित, हमारा दिल्ली कार्यालय सभी वैश्विक रूटिंग और दस्तावेज़ीकरण को संभालता।",
    address_label: "पता:",
    hours_mon_sat: "सोमवार - शनिवार: सुबह 10:00 बजे से शाम 7:00 बजे तक (IST)",
    hours_sun: "रविवार: बंद (ऑनलाइन ट्रैकिंग 24/7 उपलब्ध है)",
    global_reach_desc:
      "जैसा कि हम विश्व स्तरीय वाहकों के साथ साझेदारी करते हैं, आप हमारे द्वारा प्रदान किए गए AWB (एयर वेसबिल) का उपयोग करके सीधे उनके पोर्टल पर भी अपने शिपमेंट को ट्रैक कर सकते हैं:",
    inquiry_form_title: "पूछताछ फ़ॉर्म",
    inquiry_form_subtitle:
      "कृपया नीचे दिया गया फ़ॉर्म भरें, और हमारी टीम का एक सदस्य 24 व्यावसायिक घंटों के भीतर आपसे संपर्क करेगा।",
    name_placeholder: "नाम*",
    contact_placeholder: "संपर्क नंबर*",
    email_placeholder: "ईमेल पता*",
    select_inquiry_type: "पूछताछ का प्रकार चुनें",
    quote_request: "कोटेशन अनुरोध",
    shipment_issue: "शिपमेंट समस्या",
    business_partnership: "व्यावसायिक साझेदारी",
    other: "अन्य",
    destination_placeholder: "गंतव्य देश",
    query_placeholder: "अपनी पूछताछ यहाँ लिखें ...",
    submit_btn: "पूछताछ सबमिट करें",
    success_alert: "धन्यवाद! आपकी पूछताछ सबमिट कर दी गई है।",
  },
  pa: {
    contact_us: "ਸੰਪਰਕ ਕਰੋ",
    get_in_touch: "ਸੰਪਰਕ ਕਰੋ",
    who_we_are_subtitle:
      "ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਆਪਣੇ ਅੰਤਰਰਾਸ਼ਟਰੀ ਸ਼ਿਪਮੈਂਟ ਬਾਰੇ ਕੋਈ ਸਵਾਲ ਹੈ, ਕਸਟਮ ਕੋਟੇਸ਼ਨ ਚਾਹੀਦਾ ਹੈ, ਜਾਂ ਵਪਾਰਕ ਭਾਈਵਾਲੀ ਬਾਰੇ ਚਰਚਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ? ਸਾਡੇ ਲੌਜਿਸਟਿਕ ਮਾਹਰ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਤਿਆਰ ਹਨ।",
    tab_1: "ਸਿੱਧੇ ਸੰਚਾਰ ਚੈਨਲ",
    tab_2: "ਸਾਡੇ ਮੁੱਖ ਦਫ਼ਤਰ ਆਓ",
    tab_3: "ਕਾਰਜਸ਼ੀਲ ਘੰਟੇ",
    tab_4: "ਗਲੋਬਲ ਪਹੁੰਚ ਸਹਾਇਤਾ",
    here_to_help: "ਅਸੀਂ ਮਦਦ ਲਈ ਇੱਥੇ ਹਾਂ",
    here_to_help_subtitle:
      "ਸਾਨੂੰ ਆਪਣੀ ਸਮੱਸਿਆ ਬਾਰੇ ਦੱਸੋ ਅਤੇ ਅਸੀਂ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਤੁਹਾਨੂੰ ਸਹੀ ਟੀਮ ਨਾਲ ਜੋੜਾਂਗੇ।",
    inquiry_form_btn: "ਪੁੱਛਗਿੱਛ ਫਾਰਮ ↴",
    direct_comm_desc:
      "ਸਭ ਤੋਂ ਤੇਜ਼ ਜਵਾਬ ਲਈ, ਅਸੀਂ ਕਾਰੋਬਾਰੀ ਘੰਟਿਆਂ ਦੌਰਾਨ ਸਾਡੇ ਵਟਸਐਪ ਜਾਂ ਸਿੱਧੀ ਲਾਈਨ ਦੀ ਵਰਤੋਂ ਕਰਨ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਦੇ ਹਾਂ।",
    phone_label: "ਫ਼ੋਨ / ਵਟਸਐਪ:",
    general_inquiries: "ਆਮ ਪੁੱਛਗਿੱਛ:",
    business_partnerships: "ਕਾਰੋਬਾਰ ਅਤੇ ਭਾਈਵਾਲੀ:",
    claims_refunds: "ਦਾਅਵੇ ਅਤੇ ਰਿਫੰਡ:",
    office_desc:
      "ਭਾਰਤ ਦੇ ਲੌਜਿਸਟਿਕਸ ਹੱਬ ਦੇ ਕੇਂਦਰ ਵਿੱਚ ਸਥਿਤ, ਸਾਡਾ ਦਿੱਲੀ ਦਫ਼ਤਰ ਸਾਰੀਆਂ ਗਲੋਬਲ ਰੂਟਿੰਗ ਅਤੇ ਦਸਤਾਵੇਜ਼ਾਂ ਨੂੰ ਸੰਭਾਲਦਾ ਹੈ।",
    address_label: "ਪਤਾ:",
    hours_mon_sat:
      "ਸੋਮਵਾਰ - ਸ਼ਨੀਵਾਰ: ਸਵੇਰੇ 10:00 ਵਜੇ ਤੋਂ ਸ਼ਾਮ 7:00 ਵਜੇ ਤੱਕ (IST)",
    hours_sun: "ਐਤਵਾਰ: ਬੰਦ (ਆਨਲਾਈਨ ਟਰੈਕਿੰਗ 24/7 ਉਪਲਬਧ ਹੈ)",
    global_reach_desc:
      "ਜਿਵੇਂ ਕਿ ਅਸੀਂ ਵਿਸ਼ਵ ਪੱਧਰੀ ਕੈਰੀਅਰਾਂ ਨਾਲ ਭਾਈਵਾਲੀ ਕਰਦੇ ਹਾਂ, ਤੁਸੀਂ ਸਾਡੇ ਦੁਆਰਾ ਪ੍ਰਦਾਨ ਕੀਤੇ AWB (ਏਅਰ ਵੇਅਬਿਲ) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਉਹਨਾਂ ਦੇ ਪੋਰਟਲ 'ਤੇ ਸਿੱਧੇ ਆਪਣੇ ਸ਼ਿਪਮੈਂਟ ਨੂੰ ਟਰੈਕ ਕਰ ਸਕਦੇ ਹੋ:",
    inquiry_form_title: "ਪੁੱਛਗਿੱਛ ਫਾਰਮ",
    inquiry_form_subtitle:
      "ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਦਿੱਤਾ ਫਾਰਮ ਭਰੋ, ਅਤੇ ਸਾਡੀ ਟੀਮ ਦਾ ਇੱਕ ਮੈਂਬਰ 24 ਕਾਰੋਬਾਰੀ ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੇਗਾ।",
    name_placeholder: "ਨਾਮ*",
    contact_placeholder: "ਸੰਪਰਕ ਨੰਬਰ*",
    email_placeholder: "ਈਮੇਲ ਪਤਾ*",
    select_inquiry_type: "ਪੁੱਛਗਿੱਛ ਦੀ ਕਿਸਮ ਚੁਣੋ",
    quote_request: "ਕੋਟੇਸ਼ਨ ਬੇਨਤੀ",
    shipment_issue: "ਸ਼ਿਪਮੈਂਟ ਸਮੱਸਿਆ",
    business_partnership: "ਵਪਾਰਕ ਭਾਈਵਾਲੀ",
    other: "ਹੋਰ",
    destination_placeholder: "ਮੰਜ਼ਿਲ ਦੇਸ਼",
    query_placeholder: "ਆਪਣੀ ਪੁੱਛਗਿੱਛ ਇੱਥੇ ਲਿਖੋ ...",
    submit_btn: "ਪੁੱਛਗਿੱਛ ਜਮ੍ਹਾਂ ਕਰੋ",
    success_alert: "ਧੰਨਵਾਦ! ਤੁਹਾਡੀ ਪੁੱਛਗਿੱਛ ਜਮ੍ਹਾਂ ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ।",
  },
  fr: {
    contact_us: "Nous contacter",
    get_in_touch: "Contactez-nous",
    who_we_are_subtitle:
      "Vous avez une question sur votre envoi international, besoin d'un devis personnalisé ou souhaitez discuter d'un partenariat ? Nos experts en logistique sont prêts à vous aider.",
    tab_1: "Canaux de communication directs",
    tab_2: "Visitez notre siège social",
    tab_3: "Heures d'ouverture",
    tab_4: "Assistance internationale",
    here_to_help: "Nous sommes là pour vous aider",
    here_to_help_subtitle:
      "Parlez-nous de votre préoccupation et nous vous mettrons en relation avec la bonne équipe pour vous aider rapidement.",
    inquiry_form_btn: "Formulaire de contact ↴",
    direct_comm_desc:
      "Pour une réponse plus rapide, nous vous recommandons d'utiliser WhatsApp ou notre ligne directe pendant les heures d'ouverture.",
    phone_label: "Téléphone / WhatsApp:",
    general_inquiries: "Demandes générales:",
    business_partnerships: "Entreprises & Partenariats:",
    claims_refunds: "Réclamations & Remboursements:",
    office_desc:
      "Situé au cœur du hub logistique de l'Inde, notre bureau de Delhi gère l'ensemble du routage et de la documentation mondiale.",
    address_label: "Adresse:",
    hours_mon_sat: "Lundi – Samedi: 10h00 à 19h00 (IST)",
    hours_sun: "Dimanche: Fermé (Suivi en ligne disponible 24/7)",
    global_reach_desc:
      "Puisque nous collaborons avec des transporteurs internationaux, vous pouvez également suivre vos envois directement sur leurs portails à l'aide de l'AWB que nous vous fournissons :",
    inquiry_form_title: "Formulaire de contact",
    inquiry_form_subtitle:
      "Veuillez remplir le formulaire ci-dessous, et un membre de notre équipe vous répondra sous 24 heures ouvrables.",
    name_placeholder: "Nom*",
    contact_placeholder: "Numéro de contact*",
    email_placeholder: "Adresse e-mail*",
    select_inquiry_type: "Sélectionnez le type de demande",
    quote_request: "Demande de devis",
    shipment_issue: "Problème d'expédition",
    business_partnership: "Partenariat commercial",
    other: "Autre",
    destination_placeholder: "Pays de destination",
    query_placeholder: "Écrivez votre demande ici ...",
    submit_btn: "Envoyer la demande",
    success_alert: "Merci ! Votre demande a été soumise.",
  },
  es: {
    contact_us: "Contáctenos",
    get_in_touch: "Póngase en contacto",
    who_we_are_subtitle:
      "¿Tiene alguna pregunta sobre su envío internacional, necesita una cotización personalizada o desea discutir una asociación comercial? Nuestros expertos están listos para ayudarle.",
    tab_1: "Canales de comunicación directa",
    tab_2: "Visite nuestra oficina principal",
    tab_3: "Horas de operación",
    tab_4: "Soporte de alcance global",
    here_to_help: "Estamos aquí para ayudar",
    here_to_help_subtitle:
      "Cuéntenos su inquietud y lo conectaremos con el equipo adecuado para ayudarle rápidamente.",
    inquiry_form_btn: "Formulario de consulta ↴",
    direct_comm_desc:
      "Para obtener la respuesta más rápida, le recomendamos utilizar WhatsApp o nuestra línea directa durante el horario comercial.",
    phone_label: "Teléfono / WhatsApp:",
    general_inquiries: "Consultas generales:",
    business_partnerships: "Negocios y asociaciones:",
    claims_refunds: "Reclamaciones y reembolsos:",
    office_desc:
      "Ubicada en el corazón del centro logístico de la India, nuestra oficina de Delhi maneja toda la documentación y rutas globales.",
    address_label: "Dirección:",
    hours_mon_sat: "Lunes – Sábado: 10:00 AM a 7:00 PM (IST)",
    hours_sun: "Domingo: Cerrado (Seguimiento en línea disponible 24/7)",
    global_reach_desc:
      "Dado que nos asociamos con transportistas de clase mundial, también puede rastrear sus envíos directamente en sus portales utilizando la AWB provista por nosotros:",
    inquiry_form_title: "Formulario de consulta",
    inquiry_form_subtitle:
      "Por favor complete el formulario a continuación, y un miembro de nuestro equipo se pondrá en contacto con usted dentro de las 24 horas hábiles.",
    name_placeholder: "Nombre*",
    contact_placeholder: "Número de contacto*",
    email_placeholder: "Dirección de correo electrónico*",
    select_inquiry_type: "Seleccione tipo de consulta",
    quote_request: "Solicitud de cotización",
    shipment_issue: "Problema con el envío",
    business_partnership: "Asociación comercial",
    other: "Otro",
    destination_placeholder: "País de destino",
    query_placeholder: "Escriba su consulta aquí ...",
    submit_btn: "Enviar consulta",
    success_alert: "¡Gracias! Su consulta ha sido enviada.",
  },
};

export default function ContactPage() {
  const { language } = useLanguage();
  const lang: Language = language || "en";
  const t = localTranslations[lang] || localTranslations.en;

  const [activeTab, setActiveTab] = useState("01");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [destination, setDestination] = useState("");
  const [queryText, setQueryText] = useState("");

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.success_alert);
    setName("");
    setContact("");
    setEmail("");
    setInquiryType("");
    setDestination("");
    setQueryText("");
  };

  const scrollToForm = () => {
    const element = document.getElementById("inquiry-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Top Dark Banner */}
      <section className="relative bg-[#0b1220] overflow-hidden min-h-55 flex items-center py-12 px-6">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="max-w-425 w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
          <div>
            <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
              {t.contact_us}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="flex-grow max-w-425 w-full mx-auto px-6 py-12 flex flex-col gap-10">
        {/* Top Split Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            {/* Get In Touch Card */}
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                  {t.get_in_touch}
                </h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  {t.who_we_are_subtitle}
                </p>
              </div>

              {/* Dynamic Interactive Tabs */}
              <div className="flex flex-col gap-3 mt-2">
                {[
                  { id: "01", label: t.tab_1 },
                  { id: "02", label: t.tab_2 },
                  { id: "03", label: t.tab_3 },
                  { id: "04", label: t.tab_4 },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-4 px-6 py-4.5 rounded-2xl border transition-all text-left w-full font-sans ${
                        isActive
                          ? "bg-white border-[#f27a1a] shadow-sm text-[#f27a1a]"
                          : "bg-white border-transparent hover:border-gray-200 text-gray-700"
                      }`}
                    >
                      <span
                        className={`text-[12px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                          isActive
                            ? "bg-orange-100 text-[#f27a1a]"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {tab.id}
                      </span>
                      <span className="text-[14.5px] font-extrabold">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* We're Here To Help Card */}
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col items-start gap-5">
              <h3 className="text-[28px] md:text-[34px] font-extrabold text-[#f27a1a] tracking-tight leading-tight">
                {t.here_to_help}
              </h3>
              <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                {t.here_to_help_subtitle}
              </p>
              <button
                onClick={scrollToForm}
                className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-6 py-3 text-[14px] font-bold flex items-center gap-1.5 mt-2"
              >
                {t.inquiry_form_btn}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Card 1: Direct Communication Channels */}
            <div
              className={`bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6 transition-all duration-300 ${
                activeTab === "01" ? "ring-2 ring-[#f27a1a]/50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">
                  01
                </span>
                <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                  {t.tab_1}
                </h3>
              </div>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                {t.direct_comm_desc}
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start sm:items-center gap-3">
                  <Phone className="w-4 h-4 text-[#f27a1a] mt-1 sm:mt-0 shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    {t.phone_label}{" "}
                    <span className="text-[#f27a1a] font-bold">
                      +91 7070 506070
                    </span>
                  </div>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <Mail className="w-4 h-4 text-[#f27a1a] mt-1 sm:mt-0 shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    {t.general_inquiries}{" "}
                    <span className="text-[#f27a1a] font-bold">
                      Info@manvicourier.com
                    </span>
                  </div>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <Mail className="w-4 h-4 text-[#f27a1a] mt-1 sm:mt-0 shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    {t.business_partnerships}{" "}
                    <span className="text-[#f27a1a] font-bold">
                      Sales@manvicourier.com
                    </span>
                  </div>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <Mail className="w-4 h-4 text-[#f27a1a] mt-1 sm:mt-0 shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    {t.claims_refunds}{" "}
                    <span className="text-[#f27a1a] font-bold">
                      Info@manvicourier.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Visit Our Head Office */}
            <div
              className={`bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6 transition-all duration-300 ${
                activeTab === "02" ? "ring-2 ring-[#f27a1a]/50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">
                  02
                </span>
                <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                  {t.tab_2}
                </h3>
              </div>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                {t.office_desc}
              </p>

              <div className="flex items-start gap-3 mt-2">
                <MapPin className="w-4 h-4 text-[#f27a1a] mt-1 shrink-0" />
                <div className="text-[14px] font-semibold text-gray-500 leading-relaxed">
                  {t.address_label}{" "}
                  <span className="text-[#f27a1a] font-bold">
                    C-699, Palam Extension, Sector 7, Dwarka, New Delhi, 110077
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Operating Hours */}
            <div
              className={`bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6 transition-all duration-300 ${
                activeTab === "03" ? "ring-2 ring-[#f27a1a]/50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">
                  03
                </span>
                <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                  {t.tab_3}
                </h3>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start sm:items-center gap-3">
                  <Clock className="w-4 h-4 text-[#f27a1a] shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    {t.hours_mon_sat}
                  </div>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <Clock className="w-4 h-4 text-[#f27a1a] shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    {t.hours_sun}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Global Reach Support */}
            <div
              className={`bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6 transition-all duration-300 ${
                activeTab === "04" ? "ring-2 ring-[#f27a1a]/50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">
                  04
                </span>
                <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                  {t.tab_4}
                </h3>
              </div>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                {t.global_reach_desc}
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-2">
                <a
                  href="https://www.dhl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f27a1a] font-bold text-[14px] flex items-center gap-1 hover:underline"
                >
                  DHL Tracking <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.fedex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f27a1a] font-bold text-[14px] flex items-center gap-1 hover:underline"
                >
                  FedEx Tracking <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.ups.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f27a1a] font-bold text-[14px] flex items-center gap-1 hover:underline"
                >
                  UPS Tracking <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.aramex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f27a1a] font-bold text-[14px] flex items-center gap-1 hover:underline"
                >
                  Aramex Tracking <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form Section */}
        <section
          id="inquiry-form-section"
          className="bg-[#eef0f5] rounded-4xl p-8 lg:p-14 shadow-sm border border-gray-200/50"
        >
          <div className="flex flex-col gap-3 mb-10">
            <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#1c1f2e] tracking-tight">
              {t.inquiry_form_title}
            </h2>
            <p className="text-[13.5px] text-gray-500 font-semibold leading-relaxed">
              {t.inquiry_form_subtitle}
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="flex flex-col gap-6">
            {/* Input Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <input
                type="text"
                placeholder={t.name_placeholder}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm"
              />
              <input
                type="text"
                placeholder={t.contact_placeholder}
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm"
              />
              <input
                type="email"
                placeholder={t.email_placeholder}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm"
              />
            </div>

            {/* Input Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <select
                  required
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none border border-gray-150 shadow-sm w-full appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    {t.select_inquiry_type}
                  </option>
                  <option value="Quote Request">{t.quote_request}</option>
                  <option value="Shipment Issue">{t.shipment_issue}</option>
                  <option value="Business Partnership">
                    {t.business_partnership}
                  </option>
                  <option value="Other">{t.other}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                placeholder={t.destination_placeholder}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm"
              />
            </div>

            {/* Input Row 3 */}
            <textarea
              placeholder={t.query_placeholder}
              rows={6}
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-5 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm resize-none w-full"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-[14px] px-8 py-4 rounded-xl transition-all active:scale-98 cursor-pointer w-fit"
            >
              {t.submit_btn}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

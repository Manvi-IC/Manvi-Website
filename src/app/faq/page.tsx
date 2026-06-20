"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight, HelpCircle } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

const localTranslations: Record<
  Language,
  {
    faq_title: string;
    badge: string;
    headline: string;
    description: string;
    still_questions: string;
    support_desc: string;
    contact_btn: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
  }
> = {
  en: {
    faq_title: "FAQ",
    badge: "FAQ",
    headline: "Questions?\nGlad You Asked",
    description:
      "Find quick answers to common questions about tracking, deliveries, pricing, and support. If you can't find what you're looking for, our team is here to help.",
    still_questions: "Still have questions?",
    support_desc: "Our customer support team is available Monday to Saturday, 10:00 AM to 7:00 PM (IST).",
    contact_btn: "Contact Support",
    q1: "Where can I send my packages?",
    a1: "Almost anywhere! We have a strong presence in the USA, Canada, UK, Europe, and Australia. Whether it's a big city or a quiet suburb, we'll get it there.",
    q2: "How do I know I'm getting a fair price?",
    a2: "We believe in value. Your quote is based on exactly what you need, considering weight, destination, and how fast you need it delivered. We promise no hidden surprises when it's time to pay.",
    q3: "Can I see where my package is right now?",
    a3: "Yes! The moment you ship with us, you'll get a unique tracking number. You can watch your package's journey in real-time, giving you total confidence.",
    q4: "What happens if there is a delay or a problem?",
    a4: "We know your shipments are important. If something goes wrong, we are here to help. To ensure a fair and thorough resolution, our team and our global partners (like DHL, FedEx, and UPS) conduct a detailed investigation.",
    q5: "Is there anything I cannot ship?",
    a5: "To keep everyone safe and follow international laws, we cannot ship hazardous chemicals, currency, precious stones, or illegal items. If you aren't sure about an item, just give us a call! We're happy to check for you before you book.",
  },
  hi: {
    faq_title: "सामान्य प्रश्न",
    badge: "सामान्य प्रश्न",
    headline: "प्रश्न?\nहमें खुशी है कि आपने पूछा",
    description:
      "ट्रैकिंग, डिलीवरी, मूल्य निर्धारण और सहायता के बारे में सामान्य प्रश्नों के त्वरित उत्तर पाएं। यदि आपको वह नहीं मिल रहा है जिसकी आपको तलाश है, तो हमारी टीम मदद के लिए यहां है।",
    still_questions: "अभी भी प्रश्न हैं?",
    support_desc: "हमारी ग्राहक सहायता टीम सोमवार से शनिवार, सुबह 10:00 बजे से शाम 7:00 बजे (IST) तक उपलब्ध है।",
    contact_btn: "सहायता टीम से संपर्क करें",
    q1: "मैं अपने पैकेज कहां भेज सकता हूं?",
    a1: "लगभग कहीं भी! अमेरिका, कनाडा, ब्रिटेन, यूरोप और ऑस्ट्रेलिया में हमारी मजबूत उपस्थिति है। चाहे वह बड़ा शहर हो या शांत उपनगर, हम इसे वहां पहुंचा देंगे।",
    q2: "मुझे कैसे पता चलेगा कि मुझे सही कीमत मिल रही है?",
    a2: "हम मूल्य में विश्वास करते हैं। आपका उद्धरण बिल्कुल उसी पर आधारित है जिसकी आपको आवश्यकता है - वजन, गंतव्य और डिलीवरी की गति।",
    q3: "क्या मैं अभी देख सकता हूँ कि मेरा पैकेज कहाँ है?",
    a3: "हाँ! जैसे ही आप हमारे साथ शिप करते हैं, आपको एक विशिष्ट ट्रैकिंग नंबर प्राप्त होगा। आप वास्तविक समय में यात्रा देख सकते हैं।",
    q4: "यदि देरी या समस्या हो तो क्या होगा?",
    a4: "हम जानते हैं कि आपके शिपमेंट महत्वपूर्ण हैं। यदि कुछ गलत होता है, तो हम यहाँ मदद के लिए हैं। पूर्ण जांच के लिए वैश्विक वाहकों (DHL, FedEx, UPS) द्वारा विस्तृत जांच की जाती है।",
    q5: "क्या ऐसा कुछ है जिसे मैं शिप नहीं कर सकता?",
    a5: "सभी को सुरक्षित रखने के लिए हम खतरनाक रसायनों, मुद्रा, कीमती पत्थरों या अवैध वस्तुओं को शिप नहीं कर सकते। यदि आप सुनिश्चित नहीं हैं, तो कॉल करें!",
  },
  pa: {
    faq_title: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
    badge: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
    headline: "ਸਵਾਲ?\nਚੰਗਾ ਲੱਗਾ ਤੁਸੀਂ ਪੁੱਛਿਆ",
    description:
      "ਟਰੈਕਿੰਗ, ਡਿਲਿਵਰੀ, ਕੀਮਤ ਅਤੇ ਸਹਾਇਤਾ ਬਾਰੇ ਆਮ ਸਵਾਲਾਂ ਦੇ ਤੁਰੰਤ ਜਵਾਬ ਲੱਭੋ। ਜੇਕਰ ਤੁਹਾਨੂੰ ਲੋੜੀਂਦਾ ਜਵਾਬ ਨਹੀਂ ਮਿਲਦਾ, ਸਾਡੀ ਟੀਮ ਹਾਜ਼ਰ ਹੈ।",
    still_questions: "ਅਜੇ ਵੀ ਸਵਾਲ ਹਨ?",
    support_desc: "ਸਾਡੀ ਗਾਹਕ ਸਹਾਇਤਾ ਟੀਮ ਸੋਮਵਾਰ ਤੋਂ ਸ਼ਨੀਵਾਰ, ਸਵੇਰੇ 10:00 ਵਜੇ ਤੋਂ ਸ਼ਾਮ 7:00 ਵਜੇ (IST) ਤੱਕ ਉਪਲਬਧ ਹੈ।",
    contact_btn: "ਸਹਾਇਤਾ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    q1: "ਮੈਂ ਆਪਣੇ ਪੈਕੇਜ ਕਿੱਥੇ ਭੇਜ ਸਕਦਾ ਹਾਂ?",
    a1: "ਲਗਭਗ ਕਿਤੇ ਵੀ! ਸਾਡੀ ਯੂਐਸਏ, ਕੈਨੇਡਾ, ਯੂਕੇ, ਯੂਰਪ ਅਤੇ ਆਸਟ੍ਰੇਲੀਆ ਵਿੱਚ ਮਜ਼ਬੂਤ ਮੌਜੂਦਗੀ ਹੈ।",
    q2: "ਮੈਨੂੰ ਕਿਵੇਂ ਪਤਾ ਲੱਗੇਗਾ ਕਿ ਮੈਨੂੰ ਸਹੀ ਕੀਮਤ ਮਿਲ ਰਹੀ ਹੈ?",
    a2: "ਅਸੀਂ ਕੀਮਤ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਰੱਖਦੇ ਹਾਂ। ਤੁਹਾਡਾ ਕੋਟੇਸ਼ਨ ਭਾਰ, ਮੰਜ਼ਿਲ ਅਤੇ ਗਤੀ ਦੇ ਅਧਾਰ 'ਤੇ ਤਿਆਰ ਹੁੰਦਾ ਹੈ।",
    q3: "ਕੀ ਮੈਂ ਹੁਣੇ ਦੇਖ ਸਕਦਾ ਹਾਂ ਕਿ ਮੇਰਾ ਪੈਕੇਜ ਕਿੱਥੇ ਹੈ?",
    a3: "ਹਾਂ! ਜਦੋਂ ਤੁਸੀਂ ਸਾਡੇ ਨਾਲ ਬੁੱਕ ਕਰਦੇ ਹੋ, ਤੁਹਾਨੂੰ ਇੱਕ ਵਿਲੱਖਣ ਟਰੈਕਿੰਗ ਨੰਬਰ ਮਿਲੇਗਾ।",
    q4: "ਜੇ ਦੇਰੀ ਜਾਂ ਸਮੱਸਿਆ ਆਉਂਦੀ ਹੈ ਤਾਂ ਕੀ ਹੋਵੇਗਾ?",
    a4: "ਅਸੀਂ ਜਾਣਦੇ ਹਾਂ ਕਿ ਤੁਹਾਡੇ ਸ਼ਿਪਮੈਂਟ ਮਹੱਤਵਪੂਰਨ ਹਨ। ਜੇ ਕੁਝ ਗਲਤ ਹੁੰਦਾ ਹੈ, ਤਾਂ ਅਸੀਂ ਮਦਦ ਲਈ ਇੱਥੇ ਹਾਂ।",
    q5: "ਕੀ ਕੋਈ ਅਜਿਹੀ ਚੀਜ਼ ਹੈ ਜੋ ਮੈਂ ਭੇਜ ਨਹੀਂ ਸਕਦਾ?",
    a5: "ਸੁਰੱਖਿਆ ਨਿਯਮਾਂ ਦੇ ਤਹਿਤ ਅਸੀਂ ਖਤਰਨਾਕ ਰਸਾਇਣ, ਨਕਦੀ, ਕੀਮਤੀ ਪੱਥਰ ਜਾਂ ਗੈਰ-ਕਾਨੂੰਨੀ ਸਾਮਾਨ ਨਹੀਂ ਭੇਜ ਸਕਦੇ।",
  },
  fr: {
    faq_title: "FAQ",
    badge: "FAQ",
    headline: "Des questions ?\nRavi que vous demandiez",
    description:
      "Trouvez des réponses rapides aux questions courantes sur le suivi, les livraisons, les tarifs et l'assistance.",
    still_questions: "Vous avez encore des questions ?",
    support_desc: "Notre équipe d'assistance client est disponible du lundi au samedi, de 10h00 à 19h00 (IST).",
    contact_btn: "Contacter le support",
    q1: "Où puis-je envoyer mes colis ?",
    a1: "Presque partout ! Nous avons une forte présence aux États-Unis, au Canada, au Royaume-Uni, en Europe et en Australie.",
    q2: "Comment savoir si j'obtiens un prix équitable ?",
    a2: "Nous croyons en la valeur. Votre devis est basé sur vos besoins exacts en termes de poids, destination et rapidité.",
    q3: "Puis-je voir où se trouve mon colis en temps réel ?",
    a3: "Oui ! Dès que vous expédiez avec nous, vous obtenez un numéro de suivi unique pour suivre le parcours en temps réel.",
    q4: "Que se passe-t-il en cas de retard ou de problème ?",
    a4: "Nous savons que vos envois sont importants. En cas de problème, notre équipe et nos partenaires (DHL, FedEx, UPS) enquêtent en détail.",
    q5: "Y a-t-il des objets interdits à l'envoi ?",
    a5: "Pour la sécurité de tous, nous n'expédions pas de produits chimiques dangereux, de devises, de pierres précieuses ou d'articles illégaux.",
  },
  es: {
    faq_title: "Preguntas frecuentes",
    badge: "FAQ",
    headline: "¿Preguntas?\nQué bueno que pregunte",
    description:
      "Encuentre respuestas rápidas a preguntas comunes sobre seguimiento, envíos, precios y soporte.",
    still_questions: "¿Aún tiene preguntas?",
    support_desc: "Nuestro equipo de soporte al cliente está disponible de lunes a sábado, de 10:00 a. m. a 7:00 p. m. (IST).",
    contact_btn: "Contactar a soporte",
    q1: "¿Dónde puedo enviar mis paquetes?",
    a1: "¡Casi a cualquier lugar! Tenemos una fuerte presencia en EE. UU., Canadá, Reino Unido, Europa y Australia.",
    q2: "¿Cómo sé que estoy obteniendo un precio justo?",
    a2: "Creemos en el valor. Su cotización se basa exactamente en lo que necesita: peso, destino y urgencia.",
    q3: "¿Puedo ver dónde está mi paquete ahora mismo?",
    a3: "¡Sí! En el momento en que realiza el envío, recibe un número de seguimiento único para ver el estado en tiempo real.",
    q4: "¿Qué pasa si hay un retraso o un problema?",
    a4: "Sabemos que sus envíos son importantes. Si algo sale mal, nuestro equipo y socios (DHL, FedEx, UPS) realizan una investigación formal.",
    q5: "¿Hay algo que no pueda enviar?",
    a5: "Por seguridad de todos y según leyes internacionales, no enviamos químicos peligrosos, divisas, piedras preciosas o artículos ilegales.",
  },
};

export default function FAQPage() {
  const { language } = useLanguage();
  const lang: Language = language || "en";
  const t = localTranslations[lang] || localTranslations.en;

  const [activeTab, setActiveTab] = useState("01");

  const faqs = [
    { id: "01", q: t.q1, a: t.a1 },
    { id: "02", q: t.q2, a: t.a2 },
    { id: "03", q: t.q3, a: t.a3 },
    { id: "04", q: t.q4, a: t.a4 },
    { id: "05", q: t.q5, a: t.a5 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Top Banner Section */}
      <section className="relative bg-[#0D1527] overflow-hidden min-h-55 flex items-center py-12 px-6">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="max-w-425 w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
          <div>
            <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
              {t.faq_title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="flex-grow max-w-425 w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Box */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            {/* Questions Card */}
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight whitespace-pre-line">
                  {t.headline}
                </h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  {t.description}
                </p>
              </div>

              {/* Dynamic Interactive Tabs */}
              <div className="flex flex-col gap-3 mt-2">
                {faqs.map((faq) => {
                  const isActive = activeTab === faq.id;
                  return (
                    <button
                      key={faq.id}
                      onClick={() => {
                        setActiveTab(faq.id);
                        const element = document.getElementById(`faq-${faq.id}`);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all text-left w-full font-sans ${
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
                        {faq.id}
                      </span>
                      <span className="text-[14px] font-extrabold line-clamp-1">
                        {faq.q}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Still Have Questions Box */}
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col items-start gap-5">
              <h3 className="text-[28px] md:text-[34px] font-extrabold text-[#f27a1a] tracking-tight leading-tight">
                {t.still_questions}
              </h3>
              <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                {t.support_desc}
              </p>
              <a
                href="/contact"
                className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-6 py-3 text-[14px] font-bold flex items-center gap-1.5 mt-2"
              >
                {t.contact_btn}{" "}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Right Column List */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {faqs.map((faq) => {
              const isActive = activeTab === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className={`bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-4 transition-all duration-300 ${
                    isActive ? "ring-2 ring-[#f27a1a]/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">
                      {faq.id}
                    </span>
                    <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#1c1f2e] leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <p className="text-[13.5px] text-gray-500 font-medium leading-relaxed mt-1">
                    {faq.a}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

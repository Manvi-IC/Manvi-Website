// app/career/page.tsx (FIXED — now fully translated across en/hi/pa/fr/es)
"use client";

import React, { useEffect, useState } from "react";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplyModal from "./ApplyModal";
import SpeculativeApplyModal from "./SpeculativeApplyModal";
import { useLanguage, Language } from "@/context/LanguageContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface StatItem {
  label: string;
  value: string;
}

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface RoleItem {
  _id: string;
  title: string;
  department: string;
  location: string;
  tag: string;
  description: string;
  responsibilities: string[];
  isActive: boolean;
}

interface StepItem {
  number: string;
  title: string;
  description: string;
}

interface CareerTranslations {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  subtitle: string;
  viewRoles: string;
  emailCv: string;
  statsHeading: string;
  stat1Label: string;
  stat2Label: string;
  stat3Label: string;
  stat4Label: string;
  valuesEyebrow: string;
  valuesHeading: string;
  valuesSubtitle: string;
  value1Title: string;
  value1Desc: string;
  value2Title: string;
  value2Desc: string;
  value3Title: string;
  value3Desc: string;
  value4Title: string;
  value4Desc: string;
  rolesEyebrow: string;
  rolesHeading: string;
  rolesSubtitle: string;
  loadingText: string;
  noJobsText: string;
  applyBtn: string;
  hireEyebrow: string;
  hireHeading: string;
  hireSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaBtn: string;
}

const careerTranslations: Record<Language, CareerTranslations> = {
  en: {
    eyebrow: "Careers at Manvi",
    headingPrefix: "Help Us Bridge ",
    headingHighlight: "Distances.",
    subtitle:
      "Behind every parcel is a family waiting on the other side of the world. Join the team that gets it there — across the USA, UK, Canada, Europe and Australia.",
    viewRoles: "View Open Roles",
    emailCv: "Email Your CV",
    statsHeading: "A growing network.",
    stat1Label: "International shipments delivered",
    stat2Label: "Happy customers worldwide",
    stat3Label: "Delivery success rate",
    stat4Label: "Global carrier partners",
    valuesEyebrow: "Why Manvi",
    valuesHeading: "Work That Actually Moves.",
    valuesSubtitle:
      "We're a logistics company built on precision and care. Here's what it feels like on the inside.",
    value1Title: "Precision First",
    value1Desc:
      "Every shipment is someone's trust. We sweat the details so nothing gets lost in transit.",
    value2Title: "Global Exposure",
    value2Desc:
      "Work across borders, carriers and time zones with partners like Aramex, Courier Please, DHL, DPD, FedEx and UPS.",
    value3Title: "People First",
    value3Desc:
      "Customers and colleagues alike. We're small enough to know your name and back your ideas.",
    value4Title: "Real Ownership",
    value4Desc:
      "A fast-growing company where what you build ships — and you see the impact quickly.",
    rolesEyebrow: "Open positions",
    rolesHeading: "Find Your Place In The Network.",
    rolesSubtitle:
      "All roles are based at our Dwarka, New Delhi office unless noted. Tap a role to see the details and apply.",
    loadingText: "Loading available positions...",
    noJobsText: "No open positions at the moment. Check back soon!",
    applyBtn: "Apply for this role →",
    hireEyebrow: "How we hire",
    hireHeading: "A Clear Route To Joining Us.",
    hireSubtitle:
      "No black holes. Four simple steps, and we keep you posted at each one.",
    step1Title: "Apply",
    step1Desc: "Send your CV for a role — or speculatively if none fits yet.",
    step2Title: "Screening Call",
    step2Desc:
      "A short chat to understand your experience and what you're after.",
    step3Title: "Interview",
    step3Desc: "Meet the team you'd work with and dig into the role.",
    step4Title: "Offer & Onboarding",
    step4Desc: "We make it official and get you set up to ship from day one.",
    ctaHeading: "Don't See Your Role?",
    ctaSubtitle:
      "We're always looking for sharp people who care about getting things where they need to be. Tell us how you'd help.",
    ctaBtn: "Send Your CV Anyway",
  },
  hi: {
    eyebrow: "मानवी में करियर",
    headingPrefix: "दूरियां मिटाने में ",
    headingHighlight: "हमारी मदद करें।",
    subtitle:
      "हर पार्सल के पीछे दुनिया के दूसरे छोर पर इंतज़ार करता एक परिवार होता है। उस टीम से जुड़ें जो इसे वहां तक पहुंचाती है — USA, UK, कनाडा, यूरोप और ऑस्ट्रेलिया में।",
    viewRoles: "खुली नौकरियां देखें",
    emailCv: "अपना सीवी ईमेल करें",
    statsHeading: "एक बढ़ता नेटवर्क।",
    stat1Label: "अंतर्राष्ट्रीय शिपमेंट डिलीवर किए गए",
    stat2Label: "दुनिया भर में खुश ग्राहक",
    stat3Label: "डिलीवरी सफलता दर",
    stat4Label: "वैश्विक वाहक साझेदार",
    valuesEyebrow: "मानवी क्यों",
    valuesHeading: "ऐसा काम जो वास्तव में मायने रखता है।",
    valuesSubtitle:
      "हम सटीकता और देखभाल पर बनी एक लॉजिस्टिक्स कंपनी हैं। यहां बताया गया है कि अंदर से यह कैसा महसूस होता है।",
    value1Title: "सटीकता पहले",
    value1Desc:
      "हर शिपमेंट किसी का भरोसा है। हम विवरणों का ध्यान रखते हैं ताकि पारगमन में कुछ भी न खोए।",
    value2Title: "वैश्विक अनुभव",
    value2Desc:
      "Aramex, Courier Please, DHL, DPD, FedEx और UPS जैसे साझेदारों के साथ सीमाओं, वाहकों और समय क्षेत्रों में काम करें।",
    value3Title: "लोग पहले",
    value3Desc:
      "ग्राहक और सहकर्मी दोनों। हम इतने छोटे हैं कि आपका नाम जानते हैं और आपके विचारों का समर्थन करते हैं।",
    value4Title: "वास्तविक स्वामित्व",
    value4Desc:
      "एक तेज़ी से बढ़ती कंपनी जहां आप जो बनाते हैं वह शिप होता है — और आप जल्दी प्रभाव देखते हैं।",
    rolesEyebrow: "खुली स्थितियां",
    rolesHeading: "नेटवर्क में अपनी जगह खोजें।",
    rolesSubtitle:
      "जब तक नोट न किया जाए, सभी भूमिकाएं हमारे द्वारका, नई दिल्ली कार्यालय में आधारित हैं। विवरण देखने और आवेदन करने के लिए किसी भूमिका पर टैप करें।",
    loadingText: "उपलब्ध पदों को लोड किया जा रहा है...",
    noJobsText: "इस समय कोई खुली स्थिति नहीं है। जल्द ही फिर से देखें!",
    applyBtn: "इस भूमिका के लिए आवेदन करें →",
    hireEyebrow: "हम कैसे नियुक्त करते हैं",
    hireHeading: "हमसे जुड़ने का एक स्पष्ट रास्ता।",
    hireSubtitle:
      "कोई ब्लैक होल नहीं। चार सरल चरण, और हम हर एक पर आपको सूचित रखते हैं।",
    step1Title: "आवेदन करें",
    step1Desc:
      "किसी भूमिका के लिए अपना सीवी भेजें — या यदि अभी कोई फिट नहीं है तो अनुमानित रूप से।",
    step2Title: "स्क्रीनिंग कॉल",
    step2Desc:
      "आपके अनुभव और आप क्या चाहते हैं, यह समझने के लिए एक छोटी बातचीत।",
    step3Title: "इंटरव्यू",
    step3Desc:
      "उस टीम से मिलें जिसके साथ आप काम करेंगे और भूमिका के बारे में गहराई से जानें।",
    step4Title: "ऑफर और ऑनबोर्डिंग",
    step4Desc:
      "हम इसे आधिकारिक बनाते हैं और आपको पहले दिन से शिप करने के लिए तैयार करते हैं।",
    ctaHeading: "अपनी भूमिका नहीं देख रहे?",
    ctaSubtitle:
      "हम हमेशा ऐसे तेज़ लोगों की तलाश में रहते हैं जो चीजों को वहां पहुंचाने की परवाह करते हैं जहां उन्हें जाने की जरूरत है। हमें बताएं कि आप कैसे मदद करेंगे।",
    ctaBtn: "फिर भी अपना सीवी भेजें",
  },
  pa: {
    eyebrow: "ਮਾਨਵੀ ਵਿੱਚ ਕੈਰੀਅਰ",
    headingPrefix: "ਦੂਰੀਆਂ ਮਿਟਾਉਣ ਵਿੱਚ ",
    headingHighlight: "ਸਾਡੀ ਮਦਦ ਕਰੋ।",
    subtitle:
      "ਹਰ ਪਾਰਸਲ ਦੇ ਪਿੱਛੇ ਦੁਨੀਆ ਦੇ ਦੂਜੇ ਸਿਰੇ 'ਤੇ ਇੰਤਜ਼ਾਰ ਕਰ ਰਿਹਾ ਇੱਕ ਪਰਿਵਾਰ ਹੁੰਦਾ ਹੈ। ਉਸ ਟੀਮ ਨਾਲ ਜੁੜੋ ਜੋ ਇਸਨੂੰ ਉੱਥੇ ਪਹੁੰਚਾਉਂਦੀ ਹੈ — USA, UK, ਕੈਨੇਡਾ, ਯੂਰਪ ਅਤੇ ਆਸਟ੍ਰੇਲੀਆ ਵਿੱਚ।",
    viewRoles: "ਖੁੱਲ੍ਹੀਆਂ ਨੌਕਰੀਆਂ ਦੇਖੋ",
    emailCv: "ਆਪਣਾ ਸੀਵੀ ਈਮੇਲ ਕਰੋ",
    statsHeading: "ਇੱਕ ਵਧ ਰਿਹਾ ਨੈੱਟਵਰਕ।",
    stat1Label: "ਅੰਤਰਰਾਸ਼ਟਰੀ ਸ਼ਿਪਮੈਂਟ ਡਿਲੀਵਰ ਕੀਤੇ ਗਏ",
    stat2Label: "ਦੁਨੀਆ ਭਰ ਵਿੱਚ ਖੁਸ਼ ਗਾਹਕ",
    stat3Label: "ਡਿਲੀਵਰੀ ਸਫਲਤਾ ਦਰ",
    stat4Label: "ਗਲੋਬਲ ਕੈਰੀਅਰ ਸਾਂਝੇਦਾਰ",
    valuesEyebrow: "ਮਾਨਵੀ ਕਿਉਂ",
    valuesHeading: "ਕੰਮ ਜੋ ਅਸਲ ਵਿੱਚ ਅੱਗੇ ਲੈ ਜਾਂਦਾ ਹੈ।",
    valuesSubtitle:
      "ਅਸੀਂ ਸ਼ੁੱਧਤਾ ਅਤੇ ਦੇਖਭਾਲ 'ਤੇ ਬਣੀ ਇੱਕ ਲੌਜਿਸਟਿਕਸ ਕੰਪਨੀ ਹਾਂ। ਇੱਥੇ ਦੱਸਿਆ ਗਿਆ ਹੈ ਕਿ ਇਹ ਅੰਦਰੋਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ।",
    value1Title: "ਸ਼ੁੱਧਤਾ ਪਹਿਲਾਂ",
    value1Desc:
      "ਹਰ ਸ਼ਿਪਮੈਂਟ ਕਿਸੇ ਦਾ ਭਰੋਸਾ ਹੈ। ਅਸੀਂ ਵੇਰਵਿਆਂ ਦਾ ਧਿਆਨ ਰੱਖਦੇ ਹਾਂ ਤਾਂ ਜੋ ਆਵਾਜਾਈ ਵਿੱਚ ਕੁਝ ਵੀ ਨਾ ਗੁਆਚੇ।",
    value2Title: "ਗਲੋਬਲ ਐਕਸਪੋਜ਼ਰ",
    value2Desc:
      "Aramex, Courier Please, DHL, DPD, FedEx ਅਤੇ UPS ਵਰਗੇ ਸਾਂਝੇਦਾਰਾਂ ਨਾਲ ਸਰਹੱਦਾਂ, ਕੈਰੀਅਰਾਂ ਅਤੇ ਸਮਾਂ ਖੇਤਰਾਂ ਵਿੱਚ ਕੰਮ ਕਰੋ।",
    value3Title: "ਲੋਕ ਪਹਿਲਾਂ",
    value3Desc:
      "ਗਾਹਕ ਅਤੇ ਸਹਿਯੋਗੀ ਦੋਵੇਂ। ਅਸੀਂ ਇੰਨੇ ਛੋਟੇ ਹਾਂ ਕਿ ਤੁਹਾਡਾ ਨਾਮ ਜਾਣਦੇ ਹਾਂ ਅਤੇ ਤੁਹਾਡੇ ਵਿਚਾਰਾਂ ਦਾ ਸਮਰਥਨ ਕਰਦੇ ਹਾਂ।",
    value4Title: "ਅਸਲ ਮਾਲਕੀ",
    value4Desc:
      "ਇੱਕ ਤੇਜ਼ੀ ਨਾਲ ਵਧ ਰਹੀ ਕੰਪਨੀ ਜਿੱਥੇ ਜੋ ਤੁਸੀਂ ਬਣਾਉਂਦੇ ਹੋ ਉਹ ਸ਼ਿਪ ਹੁੰਦਾ ਹੈ — ਅਤੇ ਤੁਸੀਂ ਜਲਦੀ ਪ੍ਰਭਾਵ ਦੇਖਦੇ ਹੋ।",
    rolesEyebrow: "ਖੁੱਲ੍ਹੀਆਂ ਅਸਾਮੀਆਂ",
    rolesHeading: "ਨੈੱਟਵਰਕ ਵਿੱਚ ਆਪਣੀ ਜਗ੍ਹਾ ਲੱਭੋ।",
    rolesSubtitle:
      "ਜਦੋਂ ਤੱਕ ਨੋਟ ਨਾ ਕੀਤਾ ਜਾਵੇ, ਸਾਰੀਆਂ ਭੂਮਿਕਾਵਾਂ ਸਾਡੇ ਦਵਾਰਕਾ, ਨਵੀਂ ਦਿੱਲੀ ਦਫ਼ਤਰ ਵਿੱਚ ਸਥਿਤ ਹਨ। ਵੇਰਵੇ ਦੇਖਣ ਅਤੇ ਅਪਲਾਈ ਕਰਨ ਲਈ ਕਿਸੇ ਭੂਮਿਕਾ 'ਤੇ ਟੈਪ ਕਰੋ।",
    loadingText: "ਉਪਲਬਧ ਅਸਾਮੀਆਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ...",
    noJobsText: "ਇਸ ਸਮੇਂ ਕੋਈ ਖੁੱਲ੍ਹੀ ਅਸਾਮੀ ਨਹੀਂ ਹੈ। ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਦੇਖੋ!",
    applyBtn: "ਇਸ ਭੂਮਿਕਾ ਲਈ ਅਪਲਾਈ ਕਰੋ →",
    hireEyebrow: "ਅਸੀਂ ਕਿਵੇਂ ਨਿਯੁਕਤ ਕਰਦੇ ਹਾਂ",
    hireHeading: "ਸਾਡੇ ਨਾਲ ਜੁੜਨ ਦਾ ਇੱਕ ਸਪਸ਼ਟ ਰਾਹ।",
    hireSubtitle:
      "ਕੋਈ ਬਲੈਕ ਹੋਲ ਨਹੀਂ। ਚਾਰ ਸਧਾਰਨ ਕਦਮ, ਅਤੇ ਅਸੀਂ ਹਰ ਇੱਕ 'ਤੇ ਤੁਹਾਨੂੰ ਸੂਚਿਤ ਰੱਖਦੇ ਹਾਂ।",
    step1Title: "ਅਪਲਾਈ ਕਰੋ",
    step1Desc:
      "ਕਿਸੇ ਭੂਮਿਕਾ ਲਈ ਆਪਣਾ ਸੀਵੀ ਭੇਜੋ — ਜਾਂ ਜੇ ਹੁਣੇ ਕੋਈ ਫਿੱਟ ਨਹੀਂ ਹੈ ਤਾਂ ਅੰਦਾਜ਼ਨ ਤੌਰ 'ਤੇ।",
    step2Title: "ਸਕ੍ਰੀਨਿੰਗ ਕਾਲ",
    step2Desc:
      "ਤੁਹਾਡੇ ਤਜਰਬੇ ਅਤੇ ਤੁਸੀਂ ਕੀ ਚਾਹੁੰਦੇ ਹੋ, ਇਹ ਸਮਝਣ ਲਈ ਇੱਕ ਛੋਟੀ ਗੱਲਬਾਤ।",
    step3Title: "ਇੰਟਰਵਿਊ",
    step3Desc:
      "ਉਸ ਟੀਮ ਨੂੰ ਮਿਲੋ ਜਿਸ ਨਾਲ ਤੁਸੀਂ ਕੰਮ ਕਰੋਗੇ ਅਤੇ ਭੂਮਿਕਾ ਬਾਰੇ ਡੂੰਘਾਈ ਨਾਲ ਜਾਣੋ।",
    step4Title: "ਆਫ਼ਰ ਅਤੇ ਆਨਬੋਰਡਿੰਗ",
    step4Desc:
      "ਅਸੀਂ ਇਸਨੂੰ ਅਧਿਕਾਰਤ ਬਣਾਉਂਦੇ ਹਾਂ ਅਤੇ ਤੁਹਾਨੂੰ ਪਹਿਲੇ ਦਿਨ ਤੋਂ ਸ਼ਿਪ ਕਰਨ ਲਈ ਤਿਆਰ ਕਰਦੇ ਹਾਂ।",
    ctaHeading: "ਆਪਣੀ ਭੂਮਿਕਾ ਨਹੀਂ ਦੇਖ ਰਹੇ?",
    ctaSubtitle:
      "ਅਸੀਂ ਹਮੇਸ਼ਾ ਤੇਜ਼ ਲੋਕਾਂ ਦੀ ਭਾਲ ਵਿੱਚ ਰਹਿੰਦੇ ਹਾਂ ਜੋ ਚੀਜ਼ਾਂ ਨੂੰ ਉੱਥੇ ਪਹੁੰਚਾਉਣ ਦੀ ਪਰਵਾਹ ਕਰਦੇ ਹਨ ਜਿੱਥੇ ਉਹਨਾਂ ਨੂੰ ਜਾਣ ਦੀ ਲੋੜ ਹੈ। ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਕਿਵੇਂ ਮਦਦ ਕਰੋਗੇ।",
    ctaBtn: "ਫਿਰ ਵੀ ਆਪਣਾ ਸੀਵੀ ਭੇਜੋ",
  },
  fr: {
    eyebrow: "Carrières chez Manvi",
    headingPrefix: "Aidez-nous à réduire les ",
    headingHighlight: "distances.",
    subtitle:
      "Derrière chaque colis se trouve une famille qui attend de l'autre côté du monde. Rejoignez l'équipe qui le fait arriver — aux États-Unis, au Royaume-Uni, au Canada, en Europe et en Australie.",
    viewRoles: "Voir les postes ouverts",
    emailCv: "Envoyer votre CV",
    statsHeading: "Un réseau en pleine croissance.",
    stat1Label: "Envois internationaux livrés",
    stat2Label: "Clients satisfaits dans le monde",
    stat3Label: "Taux de réussite des livraisons",
    stat4Label: "Partenaires transporteurs mondiaux",
    valuesEyebrow: "Pourquoi Manvi",
    valuesHeading: "Un travail qui a vraiment du sens.",
    valuesSubtitle:
      "Nous sommes une entreprise de logistique fondée sur la précision et le soin. Voici ce que cela représente de l'intérieur.",
    value1Title: "La précision avant tout",
    value1Desc:
      "Chaque envoi est une marque de confiance. Nous soignons les détails pour que rien ne se perde en transit.",
    value2Title: "Exposition mondiale",
    value2Desc:
      "Travaillez à travers les frontières, les transporteurs et les fuseaux horaires avec des partenaires comme Aramex, Courier Please, DHL, DPD, FedEx et UPS.",
    value3Title: "Les gens avant tout",
    value3Desc:
      "Clients et collègues. Nous sommes assez petits pour connaître votre nom et soutenir vos idées.",
    value4Title: "Une vraie responsabilisation",
    value4Desc:
      "Une entreprise en pleine croissance où ce que vous construisez est expédié — et où vous voyez l'impact rapidement.",
    rolesEyebrow: "Postes ouverts",
    rolesHeading: "Trouvez votre place dans le réseau.",
    rolesSubtitle:
      "Tous les postes sont basés à notre bureau de Dwarka, New Delhi, sauf indication contraire. Cliquez sur un poste pour voir les détails et postuler.",
    loadingText: "Chargement des postes disponibles...",
    noJobsText: "Aucun poste ouvert pour le moment. Revenez bientôt !",
    applyBtn: "Postuler à ce poste →",
    hireEyebrow: "Comment nous recrutons",
    hireHeading: "Un parcours clair pour nous rejoindre.",
    hireSubtitle:
      "Pas de zones d'ombre. Quatre étapes simples, et nous vous tenons informé à chacune d'elles.",
    step1Title: "Postuler",
    step1Desc:
      "Envoyez votre CV pour un poste — ou spontanément si aucun ne correspond encore.",
    step2Title: "Appel de présélection",
    step2Desc:
      "Une courte conversation pour comprendre votre expérience et ce que vous recherchez.",
    step3Title: "Entretien",
    step3Desc:
      "Rencontrez l'équipe avec laquelle vous travailleriez et approfondissez le poste.",
    step4Title: "Offre et intégration",
    step4Desc:
      "Nous officialisons le poste et vous préparons à être opérationnel dès le premier jour.",
    ctaHeading: "Vous ne voyez pas votre poste ?",
    ctaSubtitle:
      "Nous sommes toujours à la recherche de personnes talentueuses qui se soucient de faire arriver les choses où elles doivent aller. Dites-nous comment vous pourriez aider.",
    ctaBtn: "Envoyez votre CV quand même",
  },
  es: {
    eyebrow: "Carreras en Manvi",
    headingPrefix: "Ayúdenos a acortar las ",
    headingHighlight: "distancias.",
    subtitle:
      "Detrás de cada paquete hay una familia esperando del otro lado del mundo. Únase al equipo que lo hace llegar — a través de EE. UU., Reino Unido, Canadá, Europa y Australia.",
    viewRoles: "Ver puestos disponibles",
    emailCv: "Enviar su CV",
    statsHeading: "Una red en crecimiento.",
    stat1Label: "Envíos internacionales entregados",
    stat2Label: "Clientes satisfechos en todo el mundo",
    stat3Label: "Tasa de éxito de entregas",
    stat4Label: "Socios transportistas globales",
    valuesEyebrow: "Por qué Manvi",
    valuesHeading: "Un trabajo que realmente importa.",
    valuesSubtitle:
      "Somos una empresa de logística construida sobre la precisión y el cuidado. Así es como se siente por dentro.",
    value1Title: "La precisión primero",
    value1Desc:
      "Cada envío es la confianza de alguien. Cuidamos los detalles para que nada se pierda en el camino.",
    value2Title: "Exposición global",
    value2Desc:
      "Trabaje a través de fronteras, transportistas y zonas horarias con socios como Aramex, Courier Please, DHL, DPD, FedEx y UPS.",
    value3Title: "Las personas primero",
    value3Desc:
      "Clientes y colegas por igual. Somos lo suficientemente pequeños para saber su nombre y respaldar sus ideas.",
    value4Title: "Propiedad real",
    value4Desc:
      "Una empresa de rápido crecimiento donde lo que usted construye se envía — y ve el impacto rápidamente.",
    rolesEyebrow: "Puestos disponibles",
    rolesHeading: "Encuentre su lugar en la red.",
    rolesSubtitle:
      "Todos los puestos se basan en nuestra oficina de Dwarka, Nueva Delhi, salvo que se indique lo contrario. Toque un puesto para ver los detalles y postularse.",
    loadingText: "Cargando puestos disponibles...",
    noJobsText:
      "No hay puestos disponibles por el momento. ¡Vuelva a consultar pronto!",
    applyBtn: "Postularse a este puesto →",
    hireEyebrow: "Cómo contratamos",
    hireHeading: "Una ruta clara para unirse a nosotros.",
    hireSubtitle:
      "Sin agujeros negros. Cuatro pasos sencillos, y le mantenemos informado en cada uno.",
    step1Title: "Postularse",
    step1Desc:
      "Envíe su CV para un puesto — o espontáneamente si ninguno se ajusta todavía.",
    step2Title: "Llamada de selección",
    step2Desc: "Una breve charla para entender su experiencia y lo que busca.",
    step3Title: "Entrevista",
    step3Desc:
      "Conozca al equipo con el que trabajaría y profundice en el puesto.",
    step4Title: "Oferta e incorporación",
    step4Desc:
      "Lo hacemos oficial y lo preparamos para empezar a trabajar desde el primer día.",
    ctaHeading: "¿No ve su puesto?",
    ctaSubtitle:
      "Siempre estamos buscando personas capaces a las que les importe que las cosas lleguen a donde deben llegar. Cuéntenos cómo podría ayudar.",
    ctaBtn: "Enviar su CV de todos modos",
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CareerPage(): React.ReactElement {
  const { language } = useLanguage();
  const t = careerTranslations[language] || careerTranslations.en;

  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<RoleItem | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSpeculativeModal, setShowSpeculativeModal] = useState(false);

  const STATS: StatItem[] = [
    { value: "1M+", label: t.stat1Label },
    { value: "100K+", label: t.stat2Label },
    { value: "99.97%", label: t.stat3Label },
    { value: "5", label: t.stat4Label },
  ];

  const VALUES: ValueItem[] = [
    { icon: "🎯", title: t.value1Title, description: t.value1Desc },
    { icon: "🌍", title: t.value2Title, description: t.value2Desc },
    { icon: "🤝", title: t.value3Title, description: t.value3Desc },
    { icon: "🚀", title: t.value4Title, description: t.value4Desc },
  ];

  const STEPS: StepItem[] = [
    { number: "01", title: t.step1Title, description: t.step1Desc },
    { number: "02", title: t.step2Title, description: t.step2Desc },
    { number: "03", title: t.step3Title, description: t.step3Desc },
    { number: "04", title: t.step4Title, description: t.step4Desc },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/jobs?active=true`);
        const data = await res.json();
        if (data.success) {
          setRoles(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const handleApply = (job: RoleItem) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleSpeculativeApply = () => {
    setShowSpeculativeModal(true);
  };

  return (
    <div className={`career-wrapper ${geist.variable}`}>
      <Header />

      {showApplyModal && selectedJob && (
        <ApplyModal
          job={selectedJob}
          onClose={() => {
            setShowApplyModal(false);
            setSelectedJob(null);
          }}
          onSuccess={() => {
            setShowApplyModal(false);
            setSelectedJob(null);
          }}
        />
      )}

      {showSpeculativeModal && (
        <SpeculativeApplyModal
          onClose={() => {
            setShowSpeculativeModal(false);
          }}
          onSuccess={() => {
            setShowSpeculativeModal(false);
          }}
        />
      )}

      <style jsx global>{`
        .career-wrapper {
          --paper: #f8fafc;
          --paper-2: #ffffff;
          --panel: #0d1527;
          --ink: #0f172a;
          --muted: #64748b;
          --line: #e2e8f0;
          --accent: #f27a1a;
          --accent-deep: #db660c;
          --accent-soft: #fed7aa;
          --display:
            ${geist.style.fontFamily}, -apple-system, BlinkMacSystemFont,
            "Segoe UI", "Roboto", sans-serif;
          --body:
            ${geist.style.fontFamily}, -apple-system, BlinkMacSystemFont,
            "Segoe UI", "Roboto", sans-serif;
          --radius: 16px;

          font-family: var(--body);
          color: var(--ink);
          background: var(--paper);
          line-height: 1.6;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .career-wrapper h1,
        .career-wrapper h2,
        .career-wrapper h3 {
          font-family: var(--display);
          line-height: 1.04;
          letter-spacing: -0.02em;
          font-weight: 700;
        }

        .wrap {
          max-width: 106rem;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
        }

        .route-indicator {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 14px;
          max-width: 260px;
        }
        .route-indicator .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent);
          flex: none;
        }
        .route-indicator .line {
          flex: 1;
          height: 0;
          border-top: 2px dotted var(--accent-deep);
          opacity: 0.5;
        }
        .route-indicator .plane {
          color: var(--accent-deep);
          font-size: 0.95rem;
          margin-left: -2px;
        }

        .eyebrow {
          font-family: var(--body);
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 0.74rem;
          color: var(--accent-deep);
        }

        .career-hero {
          background:
            radial-gradient(
              80% 120% at 88% -20%,
              rgba(242, 122, 26, 0.16),
              transparent 60%
            ),
            var(--paper);
          padding: 64px 0 56px;
          position: relative;
          overflow: hidden;
        }
        .career-hero-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.9fr;
          gap: 48px;
          align-items: center;
        }
        .career-hero h1 {
          font-size: clamp(2.5rem, 6vw, 4.4rem);
          font-weight: 800;
          margin: 14px 0 18px;
          letter-spacing: -0.03em;
        }
        .career-hero h1 .highlight {
          color: var(--accent-deep);
        }
        .career-hero .subtitle {
          font-size: 1.16rem;
          color: var(--muted);
          max-width: 46ch;
        }
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: var(--body);
          font-weight: 700;
          font-size: 1rem;
          padding: 14px 24px;
          border-radius: 100px;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: all 0.18s ease;
          text-decoration: none;
        }
        .btn-primary {
          background: var(--accent);
          color: #fff;
        }
        .btn-primary:hover {
          background: var(--accent-deep);
          color: #fff;
        }
        .btn-ghost {
          background: transparent;
          color: var(--ink);
          border-color: var(--line);
        }
        .btn-ghost:hover {
          border-color: var(--ink);
        }

        .hero-stats {
          background: var(--panel);
          color: #eaf0f4;
          border-radius: 22px;
          padding: 30px;
          position: relative;
          overflow: hidden;
        }
        .hero-stats::after {
          content: "";
          position: absolute;
          right: -40px;
          bottom: -40px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(242, 122, 26, 0.4),
            transparent 70%
          );
          pointer-events: none;
        }
        .hero-stats h3 {
          font-size: 1.3rem;
          margin-bottom: 18px;
          color: #fff;
          position: relative;
          z-index: 2;
        }
        .stat-item {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 2;
        }
        .stat-item:last-child {
          border-bottom: 0;
        }
        .stat-item .value {
          font-family: var(--display);
          font-size: 2.4rem; /* was 1.9rem */
          font-weight: 500; /* add bold */
          color: var(--accent);
          min-width: 108px;
        }
        .stat-item .label {
          color: #c4cfd7;
          font-size: 0.95rem;
        }

        @media (max-width: 860px) {
          .career-hero {
            padding: 44px 0 40px;
          }
          .career-hero-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .section {
          padding: 64px 0;
        }
        .section-head {
          max-width: 640px;
          margin-bottom: 38px;
        }
        .section-head h2 {
          font-size: clamp(2rem, 4.4vw, 3rem);
          font-weight: 800;
          margin-top: 8px;
          letter-spacing: -0.02em;
        }
        .section-head p {
          color: var(--muted);
          font-size: 1.08rem;
          margin-top: 10px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .value-card {
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 24px;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }
        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -20px rgba(15, 30, 46, 0.3);
        }
        .value-card .icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: var(--accent-soft);
          display: grid;
          place-items: center;
          font-size: 1.4rem;
          margin-bottom: 16px;
        }
        .value-card h3 {
          font-size: 1.16rem;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .value-card p {
          color: var(--muted);
          font-size: 0.94rem;
        }

        @media (max-width: 860px) {
          .values-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 520px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }

        .roles-section {
          background: linear-gradient(180deg, #0d1527, #142838);
          padding: 64px 0;
        }
        .roles-section .section-head h2 {
          color: #ffffff;
        }
        .roles-section .section-head p {
          color: #aebcc7;
        }
        .roles-section .section-head .eyebrow {
          color: var(--accent);
        }

        .role-accordion {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          margin-bottom: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .role-accordion:hover {
          border-color: rgba(242, 122, 26, 0.4);
        }
        .role-accordion summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 22px;
          color: #ffffff;
          user-select: none;
        }
        .role-accordion summary::-webkit-details-marker {
          display: none;
        }
        .role-accordion .role-title {
          flex: 1;
          min-width: 0;
        }
        .role-accordion .role-title b {
          font-family: var(--display);
          font-size: 1.22rem;
          font-weight: 700;
          color: #ffffff !important;
          display: block;
        }
        .role-accordion .role-title span {
          color: #9fb0bb;
          font-size: 0.88rem;
          display: block;
          margin-top: 2px;
        }
        .role-accordion .role-tag {
          background: rgba(242, 122, 26, 0.2);
          color: var(--accent);
          font-size: 0.74rem;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 100px;
          white-space: nowrap;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }
        .role-accordion .chevron {
          color: var(--accent);
          font-size: 1.5rem;
          transition: transform 0.25s ease;
          flex: none;
          margin-left: auto;
          font-weight: 300;
        }
        .role-accordion[open] .chevron {
          transform: rotate(45deg);
        }
        .role-accordion .role-body {
          padding: 0 22px 22px 22px;
          color: #bcc9d2;
          font-size: 0.96rem;
        }
        .role-accordion .role-body p {
          color: #d0dce6;
          margin-bottom: 12px;
        }
        .role-accordion .role-body ul {
          margin: 6px 0 18px 18px;
          list-style-type: disc;
        }
        .role-accordion .role-body ul li {
          margin: 6px 0;
          color: #c8d4dd;
        }
        .role-accordion .apply-btn {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          background: var(--accent);
          color: #ffffff !important;
          font-weight: 700;
          padding: 11px 24px;
          border-radius: 100px;
          font-size: 0.92rem;
          text-decoration: none;
          transition: background 0.2s;
          border: none;
          cursor: pointer;
          margin-top: 4px;
        }
        .role-accordion .apply-btn:hover {
          background: var(--accent-deep);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .step-card {
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 24px;
          position: relative;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -20px rgba(15, 30, 46, 0.3);
        }
        .step-card .step-number {
          font-family: var(--display);
          font-size: 1rem;
          font-weight: 800;
          color: var(--accent-deep);
          border: 2px solid var(--accent);
          border-radius: 9px;
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          margin-bottom: 16px;
        }
        .step-card h3 {
          font-size: 1.1rem;
          margin-bottom: 5px;
        }
        .step-card p {
          color: var(--muted);
          font-size: 0.92rem;
        }

        @media (max-width: 860px) {
          .steps-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 520px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }

        .cta-band {
          background: var(--accent);
          color: #fff;
          border-radius: 24px;
          padding: 46px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-band h2 {
          font-size: clamp(1.7rem, 4vw, 2.6rem);
          font-weight: 800;
          margin-bottom: 10px;
          color: #ffffff;
        }
        .cta-band p {
          font-size: 1.08rem;
          max-width: 48ch;
          margin: 0 auto 24px;
          color: #f3f4f6;
        }
        .cta-band .btn-primary {
          background: var(--panel);
          color: #fff;
        }
        .cta-band .btn-primary:hover {
          background: #000;
        }

        .loading-jobs {
          color: #aebcc7;
          text-align: center;
          padding: 30px 0;
          font-size: 1.1rem;
        }
        .no-jobs {
          color: #aebcc7;
          text-align: center;
          padding: 30px 0;
          opacity: 0.7;
          font-size: 1.1rem;
        }

        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
        }
        .reveal.in {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="flex-1">
        {/* HERO */}
        <header className="career-hero">
          <div className="wrap">
            <div className="career-hero-grid">
              <div>
                <div className="route-indicator">
                  <span className="dot"></span>
                  <span className="line"></span>
                  <span className="plane">✈</span>
                </div>
                <span className="eyebrow">{t.eyebrow}</span>
                <h1>
                  {t.headingPrefix}
                  <span className="highlight">{t.headingHighlight}</span>
                </h1>
                <p className="subtitle">{t.subtitle}</p>
                <div className="hero-buttons">
                  <a href="#openings" className="btn btn-primary">
                    {t.viewRoles}
                  </a>
                  <button
                    onClick={handleSpeculativeApply}
                    className="btn btn-ghost"
                  >
                    {t.emailCv}
                  </button>
                </div>
              </div>
              <aside className="hero-stats">
                <h3>{t.statsHeading}</h3>
                {STATS.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <span className="value">{stat.value}</span>
                    <span className="label">{stat.label}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </header>

        {/* VALUES */}
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="route-indicator">
                <span className="dot"></span>
                <span className="line"></span>
                <span className="plane">✈</span>
              </div>
              <span className="eyebrow">{t.valuesEyebrow}</span>
              <h2>{t.valuesHeading}</h2>
              <p>{t.valuesSubtitle}</p>
            </div>
            <div className="values-grid">
              {VALUES.map((value, index) => (
                <div key={index} className="value-card reveal">
                  <div className="icon-wrap">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPEN ROLES */}
        <section className="roles-section" id="openings">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="route-indicator">
                <span className="dot"></span>
                <span className="line"></span>
                <span className="plane">✈</span>
              </div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>
                {t.rolesEyebrow}
              </span>
              <h2>{t.rolesHeading}</h2>
              <p>{t.rolesSubtitle}</p>
            </div>

            {loading ? (
              <div className="loading-jobs">{t.loadingText}</div>
            ) : roles.length === 0 ? (
              <div className="no-jobs">{t.noJobsText}</div>
            ) : (
              roles.map((role) => (
                <details key={role._id} className="role-accordion reveal">
                  <summary>
                    <div className="role-title">
                      <b>{role.title}</b>
                      <span>{role.location}</span>
                    </div>
                    <span className="role-tag">{role.tag}</span>
                    <span className="chevron">+</span>
                  </summary>
                  <div className="role-body">
                    <p>{role.description}</p>
                    <ul>
                      {role.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleApply(role)}
                      className="apply-btn"
                    >
                      {t.applyBtn}
                    </button>
                  </div>
                </details>
              ))
            )}
          </div>
        </section>

        {/* HOW WE HIRE */}
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="route-indicator">
                <span className="dot"></span>
                <span className="line"></span>
                <span className="plane">✈</span>
              </div>
              <span className="eyebrow">{t.hireEyebrow}</span>
              <h2>{t.hireHeading}</h2>
              <p>{t.hireSubtitle}</p>
            </div>
            <div className="steps-grid">
              {STEPS.map((step, index) => (
                <div key={index} className="step-card reveal">
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="cta-band reveal">
              <h2>{t.ctaHeading}</h2>
              <p>{t.ctaSubtitle}</p>
              <button
                onClick={handleSpeculativeApply}
                className="btn btn-primary"
              >
                {t.ctaBtn}
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

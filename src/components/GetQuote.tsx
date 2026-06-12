"use client";
import { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useLanguage, Language } from "@/context/LanguageContext";

const localTranslations: Record<
  Language,
  {
    home: string;
    get_quote: string;
    instant_estimate: string;
    headline: string;
    subtext: string;
    pickup_placeholder: string;
    drop_placeholder: string;
    weight_placeholder: string;
    service_placeholder: string;
    doc_express: string;
    parcel_shipping: string;
    cargo_express: string;
    vol_weight_label: string;
    length_placeholder: string;
    breadth_placeholder: string;
    height_placeholder: string;
    content_placeholder: string;
    est_cost: string;
    vol_weight_cost: string;
    est_delivery: string;
    days: string;
    trusted_worldwide: string;
    countries_partner: string;
    how_calculated: string;
    step_1_title: string;
    step_1_desc: string;
    step_2_title: string;
    step_2_desc: string;
    step_3_title: string;
    step_3_desc: string;
    estimate_disclaimer: string;
    call_confirm: string;
    got_questions: string;
    faq_title: string;
    faq_1_q: string;
    faq_1_a: string;
    faq_2_q: string;
    faq_2_a: string;
    faq_3_q: string;
    faq_3_a: string;
    faq_4_q: string;
    faq_4_a: string;
    faq_5_q: string;
    faq_5_a: string;
  }
> = {
  en: {
    home: "Home",
    get_quote: "Get Quote",
    instant_estimate: "Instant Estimate",
    headline: "CONNECTING FAMILIES,\nBRIDGING DISTANCES.",
    subtext:
      "Send documents, parcels, food items, gifts, or commercial shipments worldwide with confidence.",
    pickup_placeholder: "Pick Up Location",
    drop_placeholder: "Drop Location",
    weight_placeholder: "Actual Weight (Kg)",
    service_placeholder: "Service",
    doc_express: "Document Express",
    parcel_shipping: "Parcel Shipping",
    cargo_express: "Cargo Express",
    vol_weight_label: "Volume Weight (cm)",
    length_placeholder: "Length",
    breadth_placeholder: "Breadth",
    height_placeholder: "Height",
    content_placeholder: "Content / Description",
    est_cost: "Estimated Cost",
    vol_weight_cost: "Vol. Weight",
    est_delivery: "Est. Delivery",
    days: "Days",
    trusted_worldwide: "Trusted Worldwide",
    countries_partner: "225+ Countries.\nOne Reliable Partner.",
    how_calculated: "How Is Your Quote Calculated?",
    step_1_title: "Chargeable Weight",
    step_1_desc:
      "We use the higher of actual weight vs volumetric weight (L × B × H ÷ 5000).",
    step_2_title: "Service Type",
    step_2_desc:
      "Document Express, Parcel Shipping, and Cargo Express each carry different multipliers.",
    step_3_title: "Destination",
    step_3_desc:
      "Rates vary by corridor. Final confirmed pricing is shared after our team reviews your shipment.",
    estimate_disclaimer:
      "This is an instant estimate only. Actual rates may vary based on destination surcharges, fuel levies, and customs duties.",
    call_confirm: "Call us to confirm → +91 7070-506070",
    got_questions: "Got Questions?",
    faq_title: "Frequently Asked Questions",
    faq_1_q: "How Is The Shipping Cost Calculated?",
    faq_1_a:
      "Our shipping costs are calculated based on three main factors: destination country, package weight, and delivery urgency. We use real-time rates from our carrier partners to provide you with the most accurate pricing.",
    faq_2_q: "Are There Any Fees Or Hidden Charges?",
    faq_2_a:
      "No hidden fees. The quote you receive includes all shipping costs, handling charges, and standard insurance. Additional services like signature confirmation or extra insurance can be added at checkout.",
    faq_3_q: "What Payment Methods Do You Accept?",
    faq_3_a:
      "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. For corporate clients, we also offer credit terms and invoice-based payments.",
    faq_4_q: "How Long Does International Shipping Take?",
    faq_4_a:
      "Delivery timelines vary by destination and service type. Document Express typically takes 3–5 business days, Parcel Shipping 5–7 days, and Cargo Express 2–3 days to major destinations.",
    faq_5_q: "Can I Track My Shipment In Real Time?",
    faq_5_a:
      "Yes. Once your shipment is booked, you'll receive a tracking number via SMS and email. You can track your package live on our website or directly through the carrier's portal.",
  },
  hi: {
    home: "होम",
    get_quote: "कोटेशन लें",
    instant_estimate: "तत्काल अनुमान",
    headline: "महाद्वीपों को जोड़ना,\nविश्वास पहुंचाना।",
    subtext:
      "दुनिया भर में दस्तावेज़, पार्सल, खाद्य सामग्री, उपहार या व्यावसायिक शिपमेंट विश्वास के साथ भेजें।",
    pickup_placeholder: "पिकअप स्थान",
    drop_placeholder: "डिलीवरी स्थान",
    weight_placeholder: "वास्तविक वजन (Kg)",
    service_placeholder: "सेवा",
    doc_express: "दस्तावेज़ एक्सप्रेस",
    parcel_shipping: "पार्सल शिपिंग",
    cargo_express: "कार्गो एक्सप्रेस",
    vol_weight_label: "वॉल्यूम वजन (cm)",
    length_placeholder: "लंबाई",
    breadth_placeholder: "चौड़ाई",
    height_placeholder: "ऊंचाई",
    content_placeholder: "सामग्री / विवरण",
    est_cost: "अनुमानित लागत",
    vol_weight_cost: "वॉल्यूम वजन",
    est_delivery: "अनुमानित डिलीवरी",
    days: "दिन",
    trusted_worldwide: "दुनिया भर में विश्वसनीय",
    countries_partner: "225+ देश।\nएक विश्वसनीय भागीदार।",
    how_calculated: "आपका कोटेशन कैसे निकाला जाता है?",
    step_1_title: "प्रभार्य वजन (Chargeable Weight)",
    step_1_desc:
      "हम वास्तविक वजन बनाम वॉल्यूमेट्रिक वजन (L × B × H ÷ 5000) में से जो भी अधिक हो, उसका उपयोग करते हैं।",
    step_2_title: "सेवा का प्रकार",
    step_2_desc:
      "दस्तावेज़ एक्सप्रेस, पार्सल शिपिंग और कार्गो एक्सप्रेस में से प्रत्येक के अलग-अलग गुणक होते हैं।",
    step_3_title: "गंतव्य स्थान",
    step_3_desc:
      "दरें कॉरिडोर के अनुसार भिन्न होती हैं। हमारी टीम द्वारा आपके शिपमेंट की समीक्षा करने के बाद अंतिम कीमत साझा की जाती है।",
    estimate_disclaimer:
      "यह केवल एक त्वरित अनुमान है। वास्तविक दरें गंतव्य अधिभार, ईंधन लेवी और सीमा शुल्क के आधार पर भिन्न हो सकती हैं।",
    call_confirm: "पुष्टि करने के लिए हमें कॉल करें → +91 7070-506070",
    got_questions: "कोई सवाल है?",
    faq_title: "अक्सर पूछे जाने वाले प्रश्न",
    faq_1_q: "शिपिंग लागत की गणना कैसे की जाती है?",
    faq_1_a:
      "हमारी शिपिंग लागत तीन मुख्य कारकों पर आधारित होती है: गंतव्य देश, पैकेज का वजन और वितरण की तत्परता। हम सबसे सटीक मूल्य प्रदान करने के लिए वास्तविक समय की दरों का उपयोग करते हैं।",
    faq_2_q: "क्या कोई छिपी हुई फीस या अतिरिक्त शुल्क है?",
    faq_2_a:
      "कोई छिपी हुई फीस नहीं। आपको मिलने वाले कोटेशन में सभी शिपिंग लागत, हैंडलिंग शुल्क और मानक बीमा शामिल हैं।",
    faq_3_q: "आप कौन से भुगतान विकल्प स्वीकार करते हैं?",
    faq_3_a:
      "हम सभी प्रमुख क्रेडिट कार्ड, डेबिट कार्ड, UPI, नेट बैंकिंग और डिजिटल वॉलेट स्वीकार करते हैं।",
    faq_4_q: "अंतर्राष्ट्रीय शिपिंग में कितना समय लगता है?",
    faq_4_a:
      "वितरण समय सीमा गंतव्य और सेवा के प्रकार के अनुसार भिन्न होती है। प्रमुख गंतव्यों के लिए दस्तावेज़ एक्सप्रेस में आमतौर पर 3-5 कार्य दिवस लगते हैं।",
    faq_5_q: "क्या मैं वास्तविक समय में अपने शिपमेंट को ट्रैक कर सकता हूँ?",
    faq_5_a:
      "हाँ। एक बार आपका शिपमेंट बुक हो जाने के बाद, आपको एसएमएस और ईमेल के माध्यम से एक ट्रैकिंग नंबर मिलेगा।",
  },
  pa: {
    home: "ਹੋਮ",
    get_quote: "ਕੋਟੇਸ਼ਨ ਲਓ",
    instant_estimate: "ਤੁਰੰਤ ਅਨੁਮਾਨ",
    headline: "ਮਹਾਂਦੀਪਾਂ ਨੂੰ ਜੋੜਨਾ,\nਭਰੋਸਾ ਪਹੁੰਚਾਉਣਾ।",
    subtext:
      "ਦੁਨੀਆ ਭਰ ਵਿੱਚ ਦਸਤਾਵੇਜ਼, ਪਾਰਸਲ, ਭੋਜਨ ਪਦਾਰਥ, ਤੋਹਫ਼ੇ ਜਾਂ ਵਪਾਰਕ ਸ਼ਿਪਮੈਂਟ ਭਰੋਸੇ ਨਾਲ ਭੇਜੋ।",
    pickup_placeholder: "ਪਿਕਅੱਪ ਸਥਾਨ",
    drop_placeholder: "ਡਿਲਿਵਰੀ ਸਥਾਨ",
    weight_placeholder: "ਅਸਲ ਭਾਰ (Kg)",
    service_placeholder: "ਸੇਵਾ",
    doc_express: "ਦਸਤਾਵੇਜ਼ ਐਕਸਪ੍ਰੈਸ",
    parcel_shipping: "ਪਾਰਸਲ ਸ਼ਿਪਿੰਗ",
    cargo_express: "ਕਾਰਗੋ ਐਕਸਪ੍ਰੈਸ",
    vol_weight_label: "ਵਾਲੀਅਮ ਭਾਰ (cm)",
    length_placeholder: "ਲੰਬਾਈ",
    breadth_placeholder: "ਚੌੜਾਈ",
    height_placeholder: "ਉਚਾਈ",
    content_placeholder: "ਸਮੱਗਰੀ / ਵੇਰਵਾ",
    est_cost: "ਅਨੁਮਾਨਿਤ ਲਾਗਤ",
    vol_weight_cost: "ਵਾਲੀਅਮ ਭਾਰ",
    est_delivery: "ਅਨੁਮਾਨਿਤ ਡਿਲਿਵਰੀ",
    days: "ਦਿਨ",
    trusted_worldwide: "ਦੁਨੀਆ ਭਰ ਵਿੱਚ ਭਰੋਸੇਮੰਦ",
    countries_partner: "225+ ਦੇਸ਼।\nਇੱਕ ਭਰੋਸੇਮੰਦ ਭਾਈਵਾਲ।",
    how_calculated: "ਤੁਹਾਡਾ ਕੋਟੇਸ਼ਨ ਕਿਵੇਂ ਕੱਢਿਆ ਜਾਂਦਾ ਹੈ?",
    step_1_title: "ਚਾਰਜਯੋਗ ਭਾਰ",
    step_1_desc:
      "ਅਸੀਂ ਅਸਲ ਭਾਰ ਬਨਾਮ ਵੋਲਯੂਮੈਟ੍ਰਿਕ ਭਾਰ (L × B × H ÷ 5000) ਵਿੱਚੋਂ ਜੋ ਵੀ ਵੱਧ ਹੋਵੇ, ਉਸਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਾਂ।",
    step_2_title: "ਸੇਵਾ ਦੀ ਕਿਸਮ",
    step_2_desc:
      "ਦਸਤਾਵੇਜ਼ ਐਕਸਪ੍ਰੈਸ, ਪਾਰਸਲ ਸ਼ਿਪਿੰਗ ਅਤੇ ਕਾਰਗੋ ਐਕਸਪ੍ਰੈਸ ਦੇ ਵੱਖੋ-ਵੱਖਰੇ ਗੁਣਕ ਹੁੰਦੇ ਹਨ।",
    step_3_title: "ਮੰਜ਼ਿਲ ਸਥਾਨ",
    step_3_desc:
      "ਦਰਾਂ ਕਾਰੀਡੋਰ ਦੇ ਅਨੁਸਾਰ ਵੱਖੋ-ਵੱਖਰੀਆਂ ਹੁੰਦੀਆਂ ਹਨ। ਸਾਡੀ ਟੀਮ ਦੁਆਰਾ ਤੁਹਾਡੀ ਸ਼ਿਪਮੈਂਟ ਦੀ ਸਮੀਖਿਆ ਕਰਨ ਤੋਂ ਬਾਅਦ ਅੰਤਿਮ ਕੀਮਤ ਸਾਂਝੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।",
    estimate_disclaimer:
      "ਇਹ ਸਿਰਫ ਇੱਕ ਤੁਰੰਤ ਅਨੁਮਾਨ ਹੈ। ਅਸਲ ਦਰਾਂ ਮੰਜ਼ਿਲ ਸਰਚਾਰਜ, ਬਾਲਣ ਦੇ ਖਰਚੇ ਅਤੇ ਕਸਟਮ ਡਿਊਟੀ ਦੇ ਅਧਾਰ 'ਤੇ ਵੱਖਰੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ।",
    call_confirm: "ਪੁਸ਼ਟੀ ਕਰਨ ਲਈ ਸਾਨੂੰ ਕਾਲ ਕਰੋ → +91 7070-506070",
    got_questions: "ਕੋਈ ਸਵਾਲ ਹੈ?",
    faq_title: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    faq_1_q: "ਸ਼ਿਪਿੰਗ ਲਾਗਤ ਦੀ ਗਣਨਾ ਕਿਵੇਂ ਕੀਤੀ ਜਾਂਦੀ ਹੈ?",
    faq_1_a:
      "ਸਾਡੀ ਸ਼ਿਪਿੰਗ ਲਾਗਤਾਂ ਤਿੰਨ ਮੁੱਖ ਕਾਰਕਾਂ 'ਤੇ ਅਧਾਰਤ ਹੁੰਦੀਆਂ ਹਨ: ਮੰਜ਼ਿਲ ਦੇਸ਼, ਪੈਕੇਜ ਦਾ ਭਾਰ ਅਤੇ ਡਿਲਿਵਰੀ ਦੀ ਜਲਦੀ।",
    faq_2_q: "ਕੀ ਕੋਈ ਲੁਕਵੀਂ ਫੀਸ ਜਾਂ ਵਾਧੂ ਚਾਰਜ ਹੈ?",
    faq_2_a:
      "ਕੋਈ ਲੁਕਵੀਂ ਫੀਸ ਨਹੀਂ। ਕੋਟੇਸ਼ਨ ਵਿੱਚ ਸਾਰੀਆਂ ਸ਼ਿਪਿੰਗ ਲਾਗਤਾਂ, ਹੈਂਡਲਿੰਗ ਖਰਚੇ ਅਤੇ ਮਿਆਰੀ ਬੀਮਾ ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ।",
    faq_3_q: "ਤੁਸੀਂ ਕਿਹੜੇ ਭੁਗਤਾਨ ਵਿਕਲਪ ਸਵੀਕਾਰ ਕਰਦੇ ਹੋ?",
    faq_3_a:
      "ਅਸੀਂ ਸਾਰੇ ਪ੍ਰਮੁੱਖ ਕ੍ਰੈਡਿਟ ਕਾਰਡ, ਡੈਬਿਟ ਕਾਰਡ, UPI, ਨੈੱਟ ਬੈਂਕਿੰਗ ਅਤੇ ਡਿਜੀਟਲ ਵਾਲਿਟ ਸਵੀਕਾਰ ਕਰਦੇ ਹਾਂ।",
    faq_4_q: "ਅੰਤਰਰਾਸ਼ਟਰੀ ਸ਼ਿਪਿੰਗ ਵਿੱਚ ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ?",
    faq_4_a:
      "ਡਿਲਿਵਰੀ ਦੀ ਸਮਾਂ ਸੀਮਾ ਮੰਜ਼ਿਲ ਅਤੇ ਸੇਵਾ ਦੀ ਕਿਸਮ ਅਨੁਸਾਰ ਵੱਖਰੀ ਹੁੰਦੀ ਹੈ।",
    faq_5_q: "ਕੀ ਮੈਂ ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਆਪਣੀ ਸ਼ਿਪਮੈਂਟ ਨੂੰ ਟਰੈਕ ਕਰ ਸਕਦਾ ਹਾਂ?",
    faq_5_a:
      "ਹਾਂ। ਇੱਕ ਵਾਰ ਜਦੋਂ ਤੁਹਾਡੀ ਸ਼ਿਪਮੈਂਟ ਬੁੱਕ ਹੋ ਜਾਂਦੀ ਹੈ, ਤਾਂ ਤੁਹਾਨੂੰ ਐਸਐਮਐਸ ਅਤੇ ਈਮੇਲ ਰਾਹੀਂ ਇੱਕ ਟਰੈਕਿੰਗ ਨੰਬਰ ਮਿਲੇਗਾ।",
  },
  fr: {
    home: "Accueil",
    get_quote: "Obtenir un devis",
    instant_estimate: "Estimation Instantanée",
    headline: "CONNECTER LES CONTINENTS,\nLIVRER LA CONFIANCE.",
    subtext:
      "Envoyez des documents, colis, denrées, cadeaux ou expéditions commerciales dans le monde entier en toute confiance.",
    pickup_placeholder: "Lieu de collecte",
    drop_placeholder: "Lieu de livraison",
    weight_placeholder: "Poids réel (Kg)",
    service_placeholder: "Service",
    doc_express: "Express documents",
    parcel_shipping: "Expédition de colis",
    cargo_express: "Cargo express",
    vol_weight_label: "Poids volumétrique (cm)",
    length_placeholder: "Longueur",
    breadth_placeholder: "Largeur",
    height_placeholder: "Hauteur",
    content_placeholder: "Contenu / Description",
    est_cost: "Coût estimé",
    vol_weight_cost: "Poids vol.",
    est_delivery: "Livraison est.",
    days: "Jours",
    trusted_worldwide: "Confiance mondiale",
    countries_partner: "225+ Pays.\nUn partenaire fiable.",
    how_calculated: "Comment votre devis est-il calculé ?",
    step_1_title: "Poids facturable",
    step_1_desc:
      "Nous utilisons le plus élevé entre le poids réel et le poids volumétrique (L × B × H ÷ 5000).",
    step_2_title: "Type de service",
    step_2_desc:
      "Express documents, expédition de colis et cargo express ont chacun des multiplicateurs différents.",
    step_3_title: "Destination",
    step_3_desc:
      "Les tarifs varient selon le corridor. Le prix final confirmé est partagé après examen par notre équipe.",
    estimate_disclaimer:
      "Ceci est une estimation instantanée uniquement. Les tarifs réels peuvent varier en fonction des suppléments de destination, des taxes sur le carburant et des droits de douane.",
    call_confirm: "Appelez-nous pour confirmer → +91 7070-506070",
    got_questions: "Des questions ?",
    faq_title: "Foire Aux Questions",
    faq_1_q: "Comment le coût d'expédition est-il calculé ?",
    faq_1_a:
      "Nos coûts d'expédition sont calculés en fonction de trois facteurs principaux : le pays de destination, le poids du colis et l'urgence de la livraison.",
    faq_2_q: "Y a-t-il des frais cachés ?",
    faq_2_a:
      "Aucun frais caché. Le devis que vous recevez comprend tous les frais d'expédition, de manutention et l'assurance standard.",
    faq_3_q: "Quels modes de paiement acceptez-vous ?",
    faq_3_a:
      "Nous acceptons les principales cartes de crédit, de débit, UPI, les virements bancaires et les portefeuilles électroniques.",
    faq_4_q: "Combien de temps prend l'expédition internationale ?",
    faq_4_a:
      "Les délais de livraison varient selon la destination et le type de service. L'Express documents prend généralement 3 à 5 jours ouvrables.",
    faq_5_q: "Puis-je suivre mon envoi en temps réel ?",
    faq_5_a:
      "Oui. Une fois votre envoi réservé, vous recevrez un numéro de suivi par SMS et e-mail.",
  },
  es: {
    home: "Inicio",
    get_quote: "Obtener cotización",
    instant_estimate: "Estimación instantánea",
    headline: "CONECTANDO CONTINENTES,\nENTREGANDO CONFIANZA.",
    subtext:
      "Envíe documentos, paquetes, alimentos, regalos o envíos comerciales a todo el mundo con confianza.",
    pickup_placeholder: "Lugar de recogida",
    drop_placeholder: "Lugar de entrega",
    weight_placeholder: "Peso real (Kg)",
    service_placeholder: "Servicio",
    doc_express: "Documentos express",
    parcel_shipping: "Envío de paquetes",
    cargo_express: "Carga express",
    vol_weight_label: "Peso volumétrico (cm)",
    length_placeholder: "Largo",
    breadth_placeholder: "Ancho",
    height_placeholder: "Alto",
    content_placeholder: "Contenido / Descripción",
    est_cost: "Costo estimado",
    vol_weight_cost: "Peso vol.",
    est_delivery: "Entrega est.",
    days: "Días",
    trusted_worldwide: "Confianza mundial",
    countries_partner: "225+ Países.\nUn socio confiable.",
    how_calculated: "¿Cómo se calcula su cotización?",
    step_1_title: "Peso facturable",
    step_1_desc:
      "Utilizamos el mayor entre el peso real y el peso volumétrico (L × B × H ÷ 5000).",
    step_2_title: "Tipo de servicio",
    step_2_desc:
      "Documentos express, envío de paquetes y carga express tienen diferentes multiplicadores.",
    step_3_title: "Destino",
    step_3_desc:
      "Las tarifas varían según el corredor. El precio final confirmado se comparte después de que nuestro equipo revise su envío.",
    estimate_disclaimer:
      "Esto es solo una estimación instantánea. Las tarifas reales pueden variar según los recargos de destino, los cargos por combustible y los aranceles aduaneros.",
    call_confirm: "Llámenos para confirmar → +91 7070-506070",
    got_questions: "¿Preguntas?",
    faq_title: "Preguntas frecuentes",
    faq_1_q: "¿Cómo se calcula el costo de envío?",
    faq_1_a:
      "Nuestros costos de envío se calculan en base a tres factores principales: país de destino, peso del paquete y urgencia de entrega.",
    faq_2_q: "¿Hay cargos o tarifas ocultas?",
    faq_2_a:
      "Sin tarifas ocultas. La cotización que recibe incluye todos los costos de envío, cargos por manejo y seguro estándar.",
    faq_3_q: "¿Qué métodos de pago aceptan?",
    faq_3_a:
      "Aceptamos las principales tarjetas de crédito, débito, UPI, banca por internet y billeteras digitales.",
    faq_4_q: "¿Cuánto tiempo tarda el envío internacional?",
    faq_4_a:
      "Los plazos de entrega varían según el destino y el tipo de servicio. Documentos express suele tardar de 3 a 5 días hábiles.",
    faq_5_q: "¿Puedo realizar el seguimiento de mi envío en tiempo real?",
    faq_5_a:
      "Sí. Una vez que se reserva su envío, recibirá un número de seguimiento por SMS y correo electrónico.",
  },
};

export default function GetQuote() {
  const { language } = useLanguage();
  const lang: Language = language || "en";
  const t = localTranslations[lang] || localTranslations.en;

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState("");
  const [content, setContent] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [quote, setQuote] = useState<{
    price: number;
    days: number;
    volumetric: number;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>("01");

  const FAQS = [
    {
      id: "01",
      question: t.faq_1_q,
      answer: t.faq_1_a,
    },
    {
      id: "02",
      question: t.faq_2_q,
      answer: t.faq_2_a,
    },
    {
      id: "03",
      question: t.faq_3_q,
      answer: t.faq_3_a,
    },
    {
      id: "04",
      question: t.faq_4_q,
      answer: t.faq_4_a,
    },
    {
      id: "05",
      question: t.faq_5_q,
      answer: t.faq_5_a,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = Number(weight) || 1;
    const l = Number(length) || 0;
    const b = Number(breadth) || 0;
    const h = Number(height) || 0;
    const volumetric =
      l && b && h ? parseFloat(((l * b * h) / 5000).toFixed(2)) : 0;
    const chargeableWeight = Math.max(w, volumetric);
    const svcMul: Record<string, number> = {
      document: 0.85,
      parcel: 1.1,
      express: 1.4,
    };
    const price = Math.round(
      (chargeableWeight * 480 + 300) * (svcMul[service] ?? 1),
    );
    const days = service === "express" ? 3 : 5;
    setQuote({ price, days, volumetric });
  };

  return (
    <div className="flex flex-col flex-grow">
      {/* Banner */}
      <section className="relative bg-[#0b1220] overflow-hidden min-h-55 flex items-center py-12 px-6">
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('/banner.jpg')` }}
        />
        <div className="max-w-425 w-full mx-auto flex flex-col relative z-10 gap-3">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-white/50">
            <a href="/" className="hover:text-white transition-colors">
              {t.home}
            </a>
            <span className="text-white/30">/</span>
            <span className="text-white">{t.get_quote}</span>
          </div>
          <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
            {t.get_quote}
          </h1>
        </div>
      </section>

      {/* Body */}
      <main className="flex-grow max-w-425 w-full mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">
        {/* Quote + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Orange Quote Form Card */}
          <div className="bg-[#f27a1a] rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="border border-white/40 text-white rounded-full px-4 py-1 text-[11px] font-extrabold w-fit tracking-wide">
                {t.instant_estimate}
              </div>
              <h2 className="text-[28px] sm:text-[32px] font-extrabold text-white leading-[1.1] tracking-tight uppercase whitespace-pre-line">
                {t.headline}
              </h2>
              <p className="text-white/80 text-[13px] leading-relaxed">
                {t.subtext}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={t.pickup_placeholder}
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                />
                <input
                  type="text"
                  placeholder={t.drop_placeholder}
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder={t.weight_placeholder}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0.1"
                  step="0.1"
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                />
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none appearance-none"
                >
                  <option value="">{t.service_placeholder}</option>
                  <option value="document">{t.doc_express}</option>
                  <option value="parcel">{t.parcel_shipping}</option>
                  <option value="express">{t.cargo_express}</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-white/80 text-[11px] font-semibold tracking-wide uppercase pl-1">
                  {t.vol_weight_label}
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder={t.length_placeholder}
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    min="0"
                    className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                  />
                  <input
                    type="number"
                    placeholder={t.breadth_placeholder}
                    value={breadth}
                    onChange={(e) => setBreadth(e.target.value)}
                    min="0"
                    className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                  />
                  <input
                    type="number"
                    placeholder={t.height_placeholder}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="0"
                    className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                <input
                  type="text"
                  placeholder={t.content_placeholder}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="bg-[#0b1220] hover:bg-slate-800 text-white font-bold text-[13px] py-3 px-6 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  {t.get_quote}{" "}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </form>

            {quote && (
              <div className="p-4 bg-[#0b1220]/90 rounded-xl border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-[#f27a1a] font-bold uppercase tracking-wider block">
                      {t.est_cost}
                    </span>
                    <span className="text-lg font-extrabold text-white">
                      ₹{quote.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {quote.volumetric > 0 && (
                    <div className="text-center">
                      <span className="text-[9px] text-zinc-400 block">
                        {t.vol_weight_cost}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {quote.volumetric} Kg
                      </span>
                    </div>
                  )}
                  <div className="text-right">
                    <span className="text-[9px] text-zinc-400 block">
                      {t.est_delivery}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {quote.days} {t.days}
                    </span>
                  </div>
                  <button
                    onClick={() => setQuote(null)}
                    className="text-zinc-500 hover:text-white text-xs ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info card */}
          <div className="flex flex-col gap-5">
            <div className="relative w-full h-64 sm:h-80 rounded-[28px] overflow-hidden bg-slate-200">
              <Image
                src="/warehouse_worker.png"
                alt="Manvi Courier"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white/80 text-[11px] font-bold tracking-widest uppercase">
                  {t.trusted_worldwide}
                </span>
                <p className="text-white text-[20px] font-extrabold leading-tight mt-1 whitespace-pre-line">
                  {t.countries_partner}
                </p>
              </div>
            </div>

            <div className="bg-[#eef0f5] border border-gray-200/50 rounded-[28px] p-8 lg:p-10 shadow-sm flex flex-col gap-5">
              <h3 className="text-[22px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                {t.how_calculated}
              </h3>
              <div className="flex flex-col gap-4 text-[13px] text-[#727C88] leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f27a1a] text-white text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-[#1c1f2e] block mb-0.5">
                      {t.step_1_title}
                    </span>
                    {t.step_1_desc}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f27a1a] text-white text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-[#1c1f2e] block mb-0.5">
                      {t.step_2_title}
                    </span>
                    {t.step_2_desc}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f27a1a] text-white text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-[#1c1f2e] block mb-0.5">
                      {t.step_3_title}
                    </span>
                    {t.step_3_desc}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-5 flex flex-col gap-2">
                <p className="text-[12px] text-gray-400 font-medium">
                  {t.estimate_disclaimer}
                </p>
                <a
                  href="tel:+917070506070"
                  className="inline-flex items-center gap-2 text-[#f27a1a] font-bold text-[13px] hover:underline mt-1"
                >
                  {t.call_confirm}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ Section ── */}
        <div className="bg-[#eef0f5] border border-gray-200/50 rounded-[28px] p-8 sm:p-10 lg:p-14 shadow-sm flex flex-col items-center gap-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="border border-orange-300/80 text-[#f27a1a] bg-orange-50/50 rounded-full px-4 py-1 text-[11px] font-extrabold tracking-wide">
              {t.got_questions}
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
              {t.faq_title}
            </h2>
          </div>

          {/* FAQ List */}
          <div className="w-full flex flex-col">
            {FAQS.map((faq, idx) => (
              <div
                key={faq.id}
                className={`border-b border-gray-200/80 ${idx === 0 ? "border-t" : ""}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full grid grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start py-6 text-left group"
                >
                  {/* Number */}
                  <span className="text-[#f27a1a] text-[12px] font-black tracking-widest pt-0.5">
                    {faq.id}
                  </span>

                  {/* Question + Answer */}
                  <div className="flex flex-col gap-2">
                    <span
                      className={`text-[16px] sm:text-[18px] font-bold transition-colors ${openFaq === faq.id ? "text-[#1c1f2e]" : "text-[#333b49] group-hover:text-[#1c1f2e]"}`}
                    >
                      {faq.question}
                    </span>
                    {openFaq === faq.id && (
                      <p className="text-[13px] text-[#727C88] font-medium leading-relaxed pr-4">
                        {faq.answer}
                      </p>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="pt-0.5 shrink-0">
                    {openFaq === faq.id ? (
                      <Minus
                        className="w-5 h-5 text-[#1c1f2e]"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Plus
                        className="w-5 h-5 text-[#1c1f2e] group-hover:scale-110 transition-transform"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

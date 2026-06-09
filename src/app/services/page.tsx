"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Truck,
  Zap,
  Globe,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useLanguage, Language } from "@/context/LanguageContext";

const ManviChatBot = dynamic(() => import("@/components/ManviChatBot"));
const ManviWhatsApp = dynamic(() => import("@/components/ManviWhatsApp"));

const localTranslations: Record<
  Language,
  {
    banner_title: string;
    home: string;
    services: string;
    sidebar_title: string;
    sidebar_subtitle: string;
    cta_title: string;
    cta_subtitle: string;
    contact_btn: string;
    quote_btn: string;
    subtitle_dhl: string;
    desc_dhl: string;
    subtitle_ups: string;
    desc_ups: string;
    subtitle_fedex: string;
    desc_fedex: string;
    subtitle_aramex: string;
    desc_aramex: string;
    subtitle_special: string;
    desc_special: string;
    label_dox: string;
    label_nondox: string;
    label_nondox_hub: string;
    th_destination: string;
    th_max_weight: string;
    th_limit: string;
    th_delivery: string;
    th_service: string;
    lbl_max_size: string;
    lbl_available_co: string;
    lbl_fedex_pre: string;
    lbl_direct_badge: string;
    lbl_direct_title: string;
    lbl_direct_sub: string;
    lbl_uk_title: string;
    lbl_uk_sub: string;
    lbl_uk_desc: string;
    lbl_uk_note: string;
    lbl_eu_title: string;
    lbl_eu_sub: string;
    lbl_eu_desc: string;
    lbl_ca_title: string;
    lbl_ca_sub: string;
    lbl_ca_desc: string;
    lbl_au_title: string;
    lbl_au_sub: string;
    lbl_au_desc: string;
    lbl_au_note: string;
    tbl_dest: string;
    tbl_weight: string;
    tbl_limit: string;
    tbl_delivery: string;
  }
> = {
  en: {
    banner_title: "Services",
    home: "Home",
    services: "Services",
    sidebar_title: "Every Parcel. Every Country. Every Time.",
    sidebar_subtitle:
      "From A Single Document To A Multi-Box Shipment, Manvi International Courier Gets It There — With The World's Best Carriers And Our Own Direct Delivery Network.",
    cta_title: "Not Sure Which Service Is Right For You?",
    cta_subtitle:
      "Tell Us Where You're Shipping, How Much It Weighs, And What's Inside — We'll Recommend The Fastest And Most Cost-Effective Option.",
    contact_btn: "Contact Us",
    quote_btn: "Get A Quote",
    subtitle_dhl: "The World's #1 International Courier — Now At Your Doorstep",
    desc_dhl:
      "Whether You're Sending A Passport-Sized Document Or A 30kg Carton, DHL's Express Network Covers Every Country On The Globe.",
    subtitle_ups: "Speed And Reliability Across Every Major Market",
    desc_ups:
      "UPS Combines Global Reach With Robust Tracking, Making It The Smart Choice For Businesses And Individuals Shipping To North America, Australia, And Beyond.",
    subtitle_fedex: "Precision Delivery To The World's Biggest Destinations",
    desc_fedex:
      "FedEx's Express Network Ensures Your Shipment Moves Fast, With Full Visibility From Pickup To Delivery.",
    subtitle_aramex: "Cost-Effective Delivery To Australia And Beyond",
    desc_aramex:
      "Aramex Offers Flexible Express And Economy Options, Making It An Excellent Choice For Regular Australia-Bound Shipments And Select Worldwide Destinations.",
    subtitle_special: "Specialist Shipping For Medicines And Sensitive Items",
    desc_special:
      "Sending Medicines, Health Supplements, Or Other Regulated Goods Abroad? Our FedEx Medicine Route Is Handled By Authorised Channels With Full Compliance, Giving You Peace Of Mind At Every Step.",
    label_dox: "Document Shipping (DOX)",
    label_nondox: "Parcel Shipping (Non-DOX)",
    label_nondox_hub: "Parcel Shipping (Non-DOX) Via Authorised Hub",
    th_destination: "Destination",
    th_max_weight: "Max Weight",
    th_limit: "Duty-Free Limit",
    th_delivery: "Delivery",
    th_service: "Service",
    lbl_max_size:
      "Max Box Size: 100×80×80 Cm | Single Or Multiple Pieces Accepted.",
    lbl_available_co:
      "Also Available: Co-Loaders / 3, DHL For Documents And Parcels To All Countries",
    lbl_fedex_pre:
      "Please Contact Us Before Booking To Confirm Your Item Is Eligible For This Service.",
    lbl_direct_badge: "DIRECT (SELF-NETWORK) SERVICES",
    lbl_direct_title: "Our Own Consolidation Routes",
    lbl_direct_sub:
      "Better Rates, DDP Options, And No Cap On Total Shipment Weight.",
    lbl_uk_title: "UK",
    lbl_uk_sub: "Fast, Duty-Free Delivery Across the United Kingdom",
    lbl_uk_desc:
      "Our premium UK route operates via London Heathrow (LHR) with DPD handling last-mile delivery — one of the UK's most trusted domestic networks.",
    lbl_uk_note:
      "Also available: USA service via LHR with FedEx IE, 16-24kg per box, DDP, 10-12 working days.",
    lbl_eu_title: "Europe",
    lbl_eu_sub: "Door-to-door Across the Continent",
    lbl_eu_desc:
      "Ship to any European country on our direct DPD Europe route. No hidden duties, no surprise customs fees.",
    lbl_ca_title: "Canada",
    lbl_ca_sub: "DDP Service — No Customs Surprises, Ever",
    lbl_ca_desc:
      "Our Canada direct service is fully Delivered Duty Paid (DDP), meaning all import duties and taxes are settled before your shipment arrives. Available via two gateway hubs for maximum flexibility.",
    lbl_au_title: "Australia",
    lbl_au_sub: "Direct Australia Delivery Across All Zones",
    lbl_au_desc:
      "Our Australia direct service ships to every corner of the country, with no cap on total shipment weight. Delivery time is based on the destination zone within Australia.",
    lbl_au_note:
      "Not sure which zone your Australian destination falls under? Contact us and we'll check instantly.",
    tbl_dest: "Destination",
    tbl_weight: "Max Weight",
    tbl_limit: "Duty-Free Limit",
    tbl_delivery: "Delivery Time",
  },
  hi: {
    banner_title: "सेवाएं",
    home: "होम",
    services: "सेवाएं",
    sidebar_title: "हर पार्सल। हर देश। हर बार।",
    sidebar_subtitle:
      "एक दस्तावेज़ से लेकर बहु-बॉक्स शिपमेंट तक, मानवी इंटरनेशनल कूरियर इसे वहां पहुंचाता है - दुनिया के सर्वोत्तम वाहकों और हमारे अपने डायरेक्ट डिलीवरी नेटवर्क के साथ।",
    cta_title: "सुनिश्चित नहीं हैं कि कौन सी सेवा आपके लिए सही है?",
    cta_subtitle:
      "हमें बताएं कि आप कहां शिपिंग कर रहे हैं, इसका वजन कितना है, और इसके अंदर क्या है - हम सबसे तेज़ और सबसे किफायती विकल्प की सिफारिश करेंगे।",
    contact_btn: "संपर्क करें",
    quote_btn: "कोटेशन लें",
    subtitle_dhl: "दुनिया का #1 अंतर्राष्ट्रीय कूरियर - अब आपके दरवाजे पर",
    desc_dhl:
      "चाहे आप पासपोर्ट के आकार का दस्तावेज़ भेज रहे हों या 30 किलोग्राम का कार्टन, डीएचएल का एक्सप्रेस नेटवर्क दुनिया के हर देश को कवर करता है।",
    subtitle_ups: "हर बड़े बाजार में गति और विश्वसनीयता",
    desc_ups:
      "यूपीएस मजबूत ट्रैकिंग के साथ वैश्विक पहुंच को जोड़ता है, जिससे यह उत्तरी अमेरिका, ऑस्ट्रेलिया और उससे आगे शिपिंग करने वाले व्यवसायों और व्यक्तियों के लिए एक स्मार्ट विकल्प बन जाता है।",
    subtitle_fedex: "दुनिया के सबसे बड़े गंतव्यों के लिए सटीक डिलीवरी",
    desc_fedex:
      "फेडेक्स का एक्सप्रेस नेटवर्क यह सुनिश्चित करता है कि आपका शिपमेंट पिकअप से लेकर डिलीवरी तक पूर्ण दृश्यता के साथ तेजी से आगे बढ़े।",
    subtitle_aramex: "ऑस्ट्रेलिया और उससे आगे के लिए किफायती डिलीवरी",
    desc_aramex:
      "अरामेक्स लचीले एक्सप्रेस और इकोनॉमी विकल्प प्रदान करता है, जिससे यह नियमित ऑस्ट्रेलिया जाने वाले शिपमेंट के लिए एक उत्कृष्ट विकल्प बन जाता है।",
    subtitle_special: "दवाओं और संवेदनशील वस्तुओं के लिए विशेष शिपिंग",
    desc_special:
      "विदेशों में दवाएं, स्वास्थ्य सप्लीमेंट या अन्य विनियमित सामान भेज रहे हैं? हमारा फेडेक्स मेडिसिन रूट पूर्ण अनुपालन के साथ अधिकृत चैनलों द्वारा संभाला जाता है।",
    label_dox: "दस्तावेज़ शिपिंग (DOX)",
    label_nondox: "पार्सल शिपिंग (Non-DOX)",
    label_nondox_hub: "अधिकृत हब के माध्यम से पार्सल शिपिंग (Non-DOX)",
    th_destination: "गंतव्य",
    th_max_weight: "अधिकतम वजन",
    th_limit: "शुल्क-मुक्त सीमा",
    th_delivery: "डिलीवरी",
    th_service: "सेवा",
    lbl_max_size:
      "अधिकतम बॉक्स आकार: 100×80×80 सेमी | एकल या एकाधिक टुकड़े स्वीकार किए जाते हैं।",
    lbl_available_co:
      "यह भी उपलब्ध है: सभी देशों के लिए दस्तावेजों और पार्सल के लिए डीएचएल",
    lbl_fedex_pre:
      "यह पुष्टि करने के लिए बुकिंग से पहले कृपया हमसे संपर्क करें कि आपका सामान इस सेवा के लिए योग्य है।",
    lbl_direct_badge: "डायरेक्ट (सेल्फ-नेटवर्क) सेवाएं",
    lbl_direct_title: "हमारे अपने एकीकरण मार्ग",
    lbl_direct_sub:
      "बेहतर दरें, डीडीपी विकल्प, और कुल शिपमेंट वजन पर कोई सीमा नहीं।",
    lbl_uk_title: "यूके",
    lbl_uk_sub: "पूरे यूनाइटेड किंगडम में तेज़, शुल्क-मुक्त डिलीवरी",
    lbl_uk_desc:
      "हमारा प्रीमियम यूके रूट लंदन हीथ्रो (LHR) के माध्यम से संचालित होता है, जिसमें DPD अंतिम-मील डिलीवरी संभालता है।",
    lbl_uk_note:
      "यह भी उपलब्ध है: LHR के माध्यम से FedEx IE के साथ USA सेवा, प्रति बॉक्स 16-24 किग्रा, DDP, 10-12 कार्य दिवस।",
    lbl_eu_title: "यूरोप",
    lbl_eu_sub: "पूरे महाद्वीप में डोर-टू-डोर",
    lbl_eu_desc:
      "हमारे सीधे DPD यूरोप रूट पर किसी भी यूरोपीय देश में शिप करें। कोई छिपा हुआ शुल्क नहीं।",
    lbl_ca_title: "कनाडा",
    lbl_ca_sub: "डीडीपी सेवा - कभी कोई सीमा शुल्क आश्चर्य नहीं",
    lbl_ca_desc:
      "हमारी कनाडा डायरेक्ट सेवा पूरी तरह से डिलीवर्ड ड्यूटी पेड (DDP) है, जिसका अर्थ है कि आपके शिपमेंट के आने से पहले सभी आयात शुल्क और करों का निपटान कर दिया जाता है।",
    lbl_au_title: "ऑस्ट्रेलिया",
    lbl_au_sub: "सभी क्षेत्रों में सीधे ऑस्ट्रेलिया डिलीवरी",
    lbl_au_desc:
      "हमारी ऑस्ट्रेलिया डायरेक्ट सेवा बिना किसी कुल वजन सीमा के देश के हर कोने में शिप करती है।",
    lbl_au_note:
      "सुनिश्चित नहीं हैं कि आपका ऑस्ट्रेलियाई गंतव्य किस क्षेत्र में आता है? हमसे संपर्क करें और हम तुरंत जांच करेंगे।",
    tbl_dest: "गंतव्य",
    tbl_weight: "अधिकतम वजन",
    tbl_limit: "शुल्क-मुक्त सीमा",
    tbl_delivery: "डिलीवरी का समय",
  },
  pa: {
    banner_title: "ਸੇਵਾਵਾਂ",
    home: "ਹੋਮ",
    services: "ਸੇਵਾਵਾਂ",
    sidebar_title: "ਹਰ ਪਾਰਸਲ। ਹਰ ਦੇਸ਼। ਹਰ ਵਾਰ।",
    sidebar_subtitle:
      "ਇੱਕ ਸਿੰਗਲ ਦਸਤਾਵੇਜ਼ ਤੋਂ ਲੈ ਕੇ ਮਲਟੀ-ਬਾਕਸ ਸ਼ਿਪਮੈਂਟ ਤੱਕ, ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਕੂਰੀਅਰ ਇਸਨੂੰ ਉੱਥੇ ਪਹੁੰਚਾਉਂਦਾ ਹੈ - ਦੁਨੀਆ ਦੇ ਸਭ ਤੋਂ ਵਧੀਆ ਕੈਰੀਅਰਾਂ ਅਤੇ ਸਾਡੇ ਆਪਣੇ ਡਾਇਰੈਕਟ ਡਿਲਿਵਰੀ ਨੈੱਟਵਰਕ ਨਾਲ।",
    cta_title: "ਯਕੀਨਨ ਨਹੀਂ ਹੋ ਕਿ ਕਿਹੜੀ ਸੇਵਾ ਤੁਹਾਡੇ ਲਈ ਸਹੀ ਹੈ?",
    cta_subtitle:
      "ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਕਿੱਥੇ ਸ਼ਿਪਿੰਗ ਕਰ ਰਹੇ ਹੋ, ਇਸਦਾ ਭਾਰ ਕਿੰਨਾ ਹੈ, ਅਤੇ ਅੰਦਰ ਕੀ ਹੈ - ਅਸੀਂ ਸਭ ਤੋਂ ਤੇਜ਼ ਅਤੇ ਸਭ ਤੋਂ ਕਿਫਾਇਤੀ ਵਿਕਲਪ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਾਂਗੇ।",
    contact_btn: "ਸੰਪਰਕ ਕਰੋ",
    quote_btn: "ਕੋਟੇਸ਼ਨ ਲਓ",
    subtitle_dhl: "ਦੁਨੀਆ ਦਾ #1 ਅੰਤਰਰਾਸ਼ਟਰੀ ਕੂਰੀਅਰ - ਹੁਣ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ 'ਤੇ",
    desc_dhl:
      "ਚਾਹੇ ਤੁਸੀਂ ਪਾਸਪੋਰਟ-ਸਾਈਜ਼ ਦਸਤਾਵੇਜ਼ ਭੇਜ ਰਹੇ ਹੋ ਜਾਂ 30 ਕਿਲੋਗ੍ਰਾਮ ਦਾ ਕਾਰਟਨ, DHL ਦਾ ਐਕਸਪ੍ਰੈਸ ਨੈੱਟਵਰਕ ਦੁਨੀਆ ਦੇ ਹਰ ਦੇਸ਼ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ।",
    subtitle_ups: "ਹਰ ਵੱਡੀ ਮਾਰਕੀਟ ਵਿੱਚ ਗਤੀ ਅਤੇ ਭਰੋਸੇਯੋਗਤਾ",
    desc_ups:
      "UPS ਮਜ਼ਬੂਤ ਟਰੈਕਿੰਗ ਦੇ ਨਾਲ ਗਲੋਬਲ ਪਹੁੰਚ ਨੂੰ ਜੋੜਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਇਹ ਉੱਤਰੀ ਅਮਰੀਕਾ, ਆਸਟ੍ਰੇਲੀਆ ਅਤੇ ਇਸ ਤੋਂ ਬਾਹਰ ਭੇਜਣ ਵਾਲੇ ਕਾਰੋਬਾਰਾਂ ਅਤੇ ਵਿਅਕਤੀਆਂ ਲਈ ਇੱਕ ਸਮਾਰਟ ਵਿਕਲਪ ਬਣ ਜਾਂਦਾ ਹੈ।",
    subtitle_fedex: "ਦੁਨੀਆ ਦੇ ਸਭ ਤੋਂ ਵੱਡੇ ਮੰਜ਼ਿਲਾਂ ਲਈ ਸਹੀ ਡਿਲਿਵਰੀ",
    desc_fedex:
      "FedEx ਦਾ ਐਕਸਪ੍ਰੈਸ ਨੈੱਟਵਰਕ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ ਕਿ ਤੁਹਾਡੀ ਸ਼ਿਪਮੈਂਟ ਪਿਕਅੱਪ ਤੋਂ ਲੈ ਕੇ ਡਿਲੀਵਰੀ ਤੱਕ ਪੂਰੀ ਦਿੱਖ ਦੇ ਨਾਲ ਤੇਜ਼ੀ ਨਾਲ ਅੱਗੇ ਵਧੇ।",
    subtitle_aramex: "ਆਸਟ੍ਰੇਲੀਆ ਅਤੇ ਇਸ ਤੋਂ ਬਾਹਰ ਲਈ ਕਿਫਾਇਤੀ ਡਿਲਿਵਰੀ",
    desc_aramex:
      "Aramex ਲਚਕਦਾਰ ਐਕਸਪ੍ਰੈਸ ਅਤੇ ਇਕਨਾਮੀ ਵਿਕਲਪਾਂ ਦੀ ਪੇਸ਼ਕਸ਼ ਕਰਦਾ ਹੈ, ਜੋ ਕਿ ਨਿਯਮਤ ਆਸਟ੍ਰੇਲੀਆ ਜਾਣ ਵਾਲੀਆਂ ਸ਼ਿਪਮੈਂਟਾਂ ਲਈ ਇੱਕ ਵਧੀਆ ਵਿਕਲਪ ਹੈ।",
    subtitle_special: "ਦਵਾਈਆਂ ਅਤੇ ਸੰਵੇਦਨਸ਼ੀਲ ਚੀਜ਼ਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਸ਼ਿਪਿੰਗ",
    desc_special:
      "ਵਿਦੇਸ਼ਾਂ ਵਿੱਚ ਦਵਾਈਆਂ, ਸਿਹਤ ਸਪਲੀਮੈਂਟ ਜਾਂ ਹੋਰ ਨਿਯੰਤ੍ਰਿਤ ਸਮਾਨ ਭੇਜ ਰਹੇ ਹੋ? ਸਾਡਾ FedEx ਮੈਡੀਸਨ ਰੂਟ ਪੂਰੀ ਪਾਲਣਾ ਦੇ ਨਾਲ ਅਧਿਕਾਰਤ ਚੈਨਲਾਂ ਦੁਆਰਾ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ।",
    label_dox: "ਦਸਤਾਵੇਜ਼ ਸ਼ਿਪਿੰਗ (DOX)",
    label_nondox: "ਪਾਰਸਲ ਸ਼ਿਪਿੰਗ (Non-DOX)",
    label_nondox_hub: "ਅਧਿਕਾਰਤ ਹੱਬ ਰਾਹੀਂ ਪਾਰਸਲ ਸ਼ਿਪਿੰਗ (Non-DOX)",
    th_destination: "ਮੰਜ਼ਿਲ",
    th_max_weight: "ਅਧਿਕਤਮ ਭਾਰ",
    th_limit: "ਡਿਊਟੀ-ਮੁਕਤ ਸੀਮਾ",
    th_delivery: "ਡਿਲਿਵਰੀ",
    th_service: "ਸੇਵਾ",
    lbl_max_size:
      "ਅਧਿਕਤਮ ਬਾਕਸ ਆਕਾਰ: 100×80×80 ਸੈਂਟੀਮੀਟਰ | ਸਿੰਗਲ ਜਾਂ ਮਲਟੀਪਲ ਟੁਕੜੇ ਸਵੀਕਾਰ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।",
    lbl_available_co:
      "ਇਹ ਵੀ ਉਪਲਬਧ ਹੈ: ਸਾਰੇ ਦੇਸ਼ਾਂ ਲਈ ਦਸਤਾਵੇਜ਼ਾਂ ਅਤੇ ਪਾਰਸਲ ਲਈ DHL",
    lbl_fedex_pre:
      "ਇਹ ਪੁਸ਼ਟੀ ਕਰਨ ਲਈ ਬੁਕਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਕਿਰਪਾ ਕਰਕੇ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ ਕਿ ਤੁਹਾਡੀ ਆਈਟਮ ਇਸ ਸੇਵਾ ਲਈ ਯੋਗ ਹੈ।",
    lbl_direct_badge: "ਡਾਇਰੈਕਟ (ਸੈਲਫ-ਨੈੱਟਵਰਕ) ਸੇਵਾਵਾਂ",
    lbl_direct_title: "ਸਾਡੇ ਆਪਣੇ ਏਕੀਕਰਨ ਮਾਰਗ",
    lbl_direct_sub:
      "ਬਿਹਤਰ ਦਰਾਂ, DDP ਵਿਕਲਪ, ਅਤੇ ਕੁੱਲ ਸ਼ਿਪਮੈਂਟ ਭਾਰ 'ਤੇ ਕੋਈ ਸੀਮਾ ਨਹੀਂ।",
    lbl_uk_title: "ਯੂਕੇ",
    lbl_uk_sub: "ਪੂਰੇ ਯੂਨਾਈਟਿਡ ਕਿੰਗਡਮ ਵਿੱਚ ਤੇਜ਼, ਡਿਊਟੀ-ਮੁਕਤ ਡਿਲਿਵਰੀ",
    lbl_uk_desc:
      "ਸਾਡਾ ਪ੍ਰੀਮੀਅਮ ਯੂਕੇ ਰੂਟ ਲੰਡਨ ਹੀਥਰੋ (LHR) ਰਾਹੀਂ ਚੱਲਦਾ ਹੈ, ਜਿਸ ਵਿੱਚ DPD ਆਖਰੀ-ਮੀਲ ਡਿਲਿਵਰੀ ਸੰਭਾਲਦਾ ਹੈ।",
    lbl_uk_note:
      "ਇਹ ਵੀ ਉਪਲਬਧ ਹੈ: LHR ਰਾਹੀਂ FedEx IE ਦੇ ਨਾਲ USA ਸੇਵਾ, ਪ੍ਰਤੀ ਬਾਕਸ 16-24 ਕਿਲੋਗ੍ਰਾਮ, DDP, 10-12 ਕਾਰੋਬਾਰੀ ਦਿਨ।",
    lbl_eu_title: "ਯੂਰਪ",
    lbl_eu_sub: "ਪੂਰੇ ਮਹਾਂਦੀਪ ਵਿੱਚ ਡੋਰ-ਟੂ-ਡੋਰ",
    lbl_eu_desc:
      "ਸਾਡੇ ਸਿੱਧੇ DPD ਯੂਰਪ ਰੂਟ 'ਤੇ ਕਿਸੇ ਵੀ ਯੂਰਪੀਅਨ ਦੇਸ਼ ਵਿੱਚ ਸ਼ਿਪ ਕਰੋ। ਕੋਈ ਲੁਕਿਆ ਹੋਇਆ ਚਾਰਜ ਨਹੀਂ।",
    lbl_ca_title: "ਕੈਨੇਡਾ",
    lbl_ca_sub: "DDP ਸੇਵਾ - ਕੋਈ ਕਸਟਮ ਹੈਰਾਨੀ ਨਹੀਂ, ਕਦੇ ਵੀ",
    lbl_ca_desc:
      "ਸਾਡੀ ਕੈਨੇਡਾ ਡਾਇਰੈਕਟ ਸੇਵਾ ਪੂਰੀ ਤਰ੍ਹਾਂ ਡਿਲੀਵਰਡ ਡਿਊਟੀ ਪੇਡ (DDP) ਹੈ, ਜਿਸਦਾ ਮਤਲਬ ਹੈ ਕਿ ਤੁਹਾਡੀ ਸ਼ਿਪਮੈਂਟ ਦੇ ਆਉਣ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰੇ ਆਯਾਤ ਡਿਊਟੀਆਂ ਅਤੇ ਟੈਕਸਾਂ ਦਾ ਨਿਪਟਾਰਾ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ।",
    lbl_au_title: "ਆਸਟ੍ਰੇਲੀਆ",
    lbl_au_sub: "ਸਾਰੇ ਖੇਤਰਾਂ ਵਿੱਚ ਸਿੱਧੀ ਆਸਟ੍ਰੇਲੀਆ ਡਿਲਿਵਰੀ",
    lbl_au_desc:
      "ਸਾਡੀ ਆਸਟ੍ਰੇਲੀਆ ਡਾਇਰੈਕਟ ਸੇਵਾ ਬਿਨਾਂ ਕਿਸੇ ਕੁੱਲ ਭਾਰ ਸੀਮਾ ਦੇ ਦੇਸ਼ ਦੇ ਹਰ ਕੋਨੇ ਵਿੱਚ ਸ਼ਿਪ ਕਰਦੀ ਹੈ।",
    lbl_au_note:
      "ਯਕੀਨਨ ਨਹੀਂ ਹੋ ਕਿ ਤੁਹਾਡੀ ਆਸਟ੍ਰੇਲੀਆਈ ਮੰਜ਼ਿਲ ਕਿਸ ਜ਼ੋਨ ਵਿੱਚ ਆਉਂਦੀ ਹੈ? ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ ਅਤੇ ਅਸੀਂ ਤੁਰੰਤ ਜਾਂਚ ਕਰਾਂਗੇ।",
    tbl_dest: "ਮੰਜ਼ਿਲ",
    tbl_weight: "ਅਧਿਕਤਮ ਭਾਰ",
    tbl_limit: "ਡਿਊਟੀ-ਮੁਕਤ ਸੀਮਾ",
    tbl_delivery: "ਡਿਲਿਵਰੀ ਦਾ ਸਮਾਂ",
  },
  fr: {
    banner_title: "Services",
    home: "Accueil",
    services: "Services",
    sidebar_title: "Chaque colis. Chaque pays. Chaque fois.",
    sidebar_subtitle:
      "D'un simple document à un envoi multi-boîtes, Manvi International Courier l'achemine à destination — avec les meilleurs transporteurs mondiaux et notre propre réseau de livraison directe.",
    cta_title: "Vous ne savez pas quel service vous convient ?",
    cta_subtitle:
      "Dites-nous où vous expédiez, combien cela pèse et ce qu'il y a à l'intérieur — nous vous recommanderons l'option la plus rapide et la plus rentable.",
    contact_btn: "Nous contacter",
    quote_btn: "Obtenir un devis",
    subtitle_dhl:
      "Le transporteur international n°1 mondial — maintenant à votre porte",
    desc_dhl:
      "Que vous envoyiez un document de la taille d'un passeport ou un carton de 30 kg, le réseau express de DHL couvre tous les pays du monde.",
    subtitle_ups: "Rapidité et fiabilité sur tous les grands marchés",
    desc_ups:
      "UPS combine une portée mondiale avec un suivi robuste, ce qui en fait le choix intelligent pour les entreprises et les particuliers expédiant vers l'Amérique du Nord, l'Australie et au-delà.",
    subtitle_fedex:
      "Livraison de précision vers les plus grandes destinations du monde",
    desc_fedex:
      "Le réseau express de FedEx garantit que votre envoi se déplace rapidement, avec une visibilité totale de la collecte à la livraison.",
    subtitle_aramex: "Livraison économique vers l'Australie et au-delà",
    desc_aramex:
      "Aramex propose des options express et économiques flexibles, ce qui en fait un excellent choix pour les expéditions régulières vers l'Australie.",
    subtitle_special:
      "Expédition spécialisée pour les médicaments et les articles sensibles",
    desc_special:
      "Vous envoyez des médicaments, des compléments alimentaires ou d'autres marchandises réglementées à l'étranger ? Notre route FedEx Medicine est gérée par des canaux autorisés en toute conformité.",
    label_dox: "Expédition de documents (DOX)",
    label_nondox: "Expédition de colis (Non-DOX)",
    label_nondox_hub: "Expédition de colis (Non-DOX) via un hub autorisé",
    th_destination: "Destination",
    th_max_weight: "Poids max",
    th_limit: "Limite de franchise",
    th_delivery: "Livraison",
    th_service: "Service",
    lbl_max_size:
      "Taille max de boîte: 100×80×80 cm | Pièce unique ou multiples acceptées.",
    lbl_available_co:
      "Également disponible: DHL pour les documents et colis vers tous les pays",
    lbl_fedex_pre:
      "Veuillez nous contacter avant de réserver pour confirmer l'éligibilité de votre article.",
    lbl_direct_badge: "SERVICES DIRECTS (RÉSEAU PROPRE)",
    lbl_direct_title: "Nos propres routes de consolidation",
    lbl_direct_sub:
      "De meilleurs tarifs, des options DDP, et aucune limite sur le poids total de l'envoi.",
    lbl_uk_title: "Royaume-Uni",
    lbl_uk_sub: "Livraison rapide et sans taxes dans tout le Royaume-Uni",
    lbl_uk_desc:
      "Notre route premium vers le Royaume-Uni opère via Londres Heathrow (LHR) avec DPD gérant la livraison du dernier kilomètre.",
    lbl_uk_note:
      "Également disponible: service USA via LHR avec FedEx IE, 16-24 kg par boîte, DDP, 10-12 jours ouvrables.",
    lbl_eu_title: "Europe",
    lbl_eu_sub: "Porte-à-porte sur tout le continent",
    lbl_eu_desc:
      "Expédiez vers n'importe quel pays européen sur notre route directe DPD Europe. Pas de taxes cachées.",
    lbl_ca_title: "Canada",
    lbl_ca_sub: "Service DDP — Aucune surprise douanière, jamais",
    lbl_ca_desc:
      "Notre service direct vers le Canada est entièrement Delivered Duty Paid (DDP), ce qui signifie que tous les droits et taxes d'importation sont réglés avant l'arrivée de votre envoi.",
    lbl_au_title: "Australie",
    lbl_au_sub: "Livraison directe en Australie dans toutes les zones",
    lbl_au_desc:
      "Notre service direct vers l'Australie livre dans tous les coins du pays, sans limite de poids total d'envoi.",
    lbl_au_note:
      "Vous ne savez pas de quelle zone relève votre destination australienne ? Contactez-nous pour vérification immédiate.",
    tbl_dest: "Destination",
    tbl_weight: "Poids max",
    tbl_limit: "Limite de franchise",
    tbl_delivery: "Délai de livraison",
  },
  es: {
    banner_title: "Servicios",
    home: "Inicio",
    services: "Servicios",
    sidebar_title: "Cada paquete. Cada país. Cada vez.",
    sidebar_subtitle:
      "Desde un solo documento hasta un envío de varias cajas, Manvi International Courier lo lleva allí, con los mejores transportistas del mundo y nuestra propia red de entrega directa.",
    cta_title: "¿No está seguro de qué servicio es el adecuado?",
    cta_subtitle:
      "Díganos a dónde realiza el envío, cuánto pesa y qué hay dentro; le recomendaremos la opción más rápida y rentable.",
    contact_btn: "Contáctenos",
    quote_btn: "Obtener cotización",
    subtitle_dhl:
      "El mensajero internacional n° 1 del mundo, ahora en su puerta",
    desc_dhl:
      "Ya sea que envíe un documento del tamaño de un pasaporte o un cartón de 30 kg, la red express de DHL cubre todos los países del mundo.",
    subtitle_ups: "Velocidad y confiabilidad en todos los mercados importantes",
    desc_ups:
      "UPS combina el alcance global con un seguimiento sólido, lo que lo convierte en la opción inteligente para empresas y particulares que realizan envíos a América del Norte, Australia y más allá.",
    subtitle_fedex: "Entrega de precisión a los destinos más grandes del mundo",
    desc_fedex:
      "La red express de FedEx garantiza que su envío se mueva rápido, con total visibilidad desde la recogida hasta la entrega.",
    subtitle_aramex: "Entrega rentable a Australia y más allá",
    desc_aramex:
      "Aramex ofrece opciones flexibles de envío express y económico, lo que lo convierte en una excelente opción para envíos regulares a Australia.",
    subtitle_special:
      "Envío especializado para medicamentos y artículos sensibles",
    desc_special:
      "¿Envía medicamentos, suplementos de salud u otros productos regulados al extranjero? Nuestra ruta de FedEx Medicine se maneja a través de canales autorizados con total cumplimiento.",
    label_dox: "Envío de documentos (DOX)",
    label_nondox: "Envío de paquetes (Non-DOX)",
    label_nondox_hub: "Envío de paquetes (Non-DOX) a través de hub autorizado",
    th_destination: "Destino",
    th_max_weight: "Peso máx",
    th_limit: "Límite libre de impuestos",
    th_delivery: "Entrega",
    th_service: "Servicio",
    lbl_max_size:
      "Tamaño máx. de caja: 100×80×80 cm | Se aceptan piezas únicas o múltiples.",
    lbl_available_co:
      "También disponible: DHL para documentos y paquetes a todos los países",
    lbl_fedex_pre:
      "Comuníquese con nosotros antes de reservar para confirmar si su artículo es elegible para este servicio.",
    lbl_direct_badge: "SERVICIOS DIRECTOS (RED PROPIA)",
    lbl_direct_title: "Nuestras propias rutas de consolidación",
    lbl_direct_sub:
      "Mejores tarifas, opciones DDP y sin límite en el peso total del envío.",
    lbl_uk_title: "Reino Unido",
    lbl_uk_sub: "Entrega rápida y libre de impuestos en todo el Reino Unido",
    lbl_uk_desc:
      "Nuestra ruta premium al Reino Unido opera a través de Londres Heathrow (LHR) con DPD a cargo de la entrega de última milla.",
    lbl_uk_note:
      "También disponible: servicio a EE. UU. a través de LHR con FedEx IE, 16-24 kg por caja, DDP, 10-12 días hábiles.",
    lbl_eu_title: "Europa",
    lbl_eu_sub: "Puerta a puerta en todo el continente",
    lbl_eu_desc:
      "Realice envíos a cualquier país europeo en nuestra ruta directa DPD Europa. Sin aranceles ocultos.",
    lbl_ca_title: "Canadá",
    lbl_ca_sub: "Servicio DDP — Sin sorpresas aduaneras, nunca",
    lbl_ca_desc:
      "Nuestro servicio directo a Canadá es totalmente Delivered Duty Paid (DDP), lo que significa que todos los aranceles e impuestos de importación se liquidan antes de que llegue su envío.",
    lbl_au_title: "Australia",
    lbl_au_sub: "Entrega directa a Australia en todas las zonas",
    lbl_au_desc:
      "Nuestro servicio directo a Australia realiza envíos a todos los rincones del país, sin límite de peso total del envío.",
    lbl_au_note:
      "¿No está seguro de a qué zona pertenece su destino australiano? Contáctenos y lo verificaremos al instante.",
    tbl_dest: "Destino",
    tbl_weight: "Peso máx",
    tbl_limit: "Límite libre de impuestos",
    tbl_delivery: "Plazo de entrega",
  },
};

export default function ServicesPage() {
  const { language } = useLanguage();
  const lang: Language = language || "en";
  const t = localTranslations[lang] || localTranslations.en;

  const navItems = [
    {
      name: "DHL",
      icon: <Globe className="w-5 h-5 text-[#f27a1a]" />,
      active: true,
    },
    {
      name: "UPS",
      icon: <ShieldCheck className="w-5 h-5 text-[#f27a1a]" />,
      active: false,
    },
    {
      name: "FedEx",
      icon: <Zap className="w-5 h-5 text-[#f27a1a]" />,
      active: false,
    },
    {
      name: "FedEx - Medicine & Special Content",
      icon: <Package className="w-5 h-5 text-[#f27a1a]" />,
      active: false,
    },
    {
      name: "Aramex",
      icon: <Truck className="w-5 h-5 text-[#f27a1a]" />,
      active: false,
    },
    {
      name: t.lbl_direct_badge,
      icon: <Globe className="w-5 h-5 text-[#f27a1a]" />,
      active: false,
    },
  ];

  const serviceDetails = [
    {
      id: "dhl",
      title: "DHL",
      subtitle: t.subtitle_dhl,
      description: t.desc_dhl,
      dox: [
        { label: "Destinations", value: "All Countries" },
        { label: "Weight", value: "500g - 2kg" },
        { label: "Boxes", value: "Single" },
        { label: "Delivery", value: "5-7 Working Days" },
      ],
      nondox: [
        {
          dest: "USA",
          weight: "30kg/box",
          duty: "Duty may apply",
          delivery: "5-7 working days",
        },
        {
          dest: "Canada",
          weight: "30kg/box",
          duty: "Up to CAD 20",
          delivery: "5-7 working days",
        },
        {
          dest: "Australia",
          weight: "30kg/box",
          duty: "Up to AUD 800",
          delivery: "5-7 working days",
        },
        {
          dest: "New Zealand",
          weight: "30kg/box",
          duty: "Up to NZD 1,000",
          delivery: "5-7 working days",
        },
        {
          dest: "Rest of World",
          weight: "30kg/box",
          duty: "Duty may apply",
          delivery: "5-7 working days",
        },
      ],
    },
    {
      id: "ups",
      title: "UPS",
      subtitle: t.subtitle_ups,
      description: t.desc_ups,
      dox: null,
      nondox: [
        {
          dest: "USA",
          weight: "30kg/box",
          duty: "Duty may apply",
          delivery: "7-9 working days",
        },
        {
          dest: "Canada",
          weight: "30kg/box",
          duty: "Up to CAD 20",
          delivery: "7-9 working days",
        },
        {
          dest: "Australia",
          weight: "30kg/box",
          duty: "Up to AUD 800",
          delivery: "7-9 working days",
        },
        {
          dest: "New Zealand",
          weight: "30kg/box",
          duty: "Up to NZD 1,000",
          delivery: "7-9 working days",
        },
        {
          dest: "Rest of World",
          weight: "30kg/box",
          duty: "Duty may apply",
          delivery: "7-9 working days",
        },
      ],
    },
    {
      id: "fedex",
      title: "FedEx",
      subtitle: t.subtitle_fedex,
      description: t.desc_fedex,
      dox: null,
      nondox: [
        {
          dest: "USA",
          weight: "30kg/box",
          duty: "Duty may apply",
          delivery: "6-8 working days",
        },
        {
          dest: "Canada",
          weight: "30kg/box",
          duty: "Up to CAD 20",
          delivery: "6-8 working days",
        },
        {
          dest: "Australia",
          weight: "30kg/box",
          duty: "Up to AUD 800",
          delivery: "6-8 working days",
        },
        {
          dest: "New Zealand",
          weight: "30kg/box",
          duty: "Up to NZD 1,000",
          delivery: "6-8 working days",
        },
        {
          dest: "Rest of World",
          weight: "30kg/box",
          duty: "Duty may apply",
          delivery: "6-8 working days",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      <main className="flex-1 w-full max-w-425 mx-auto px-4 sm:px-6 md:px-8 py-8 pb-20">
        {/* Top Banner */}
        <div className="relative w-full h-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-sm flex items-center justify-end px-8 sm:px-12 md:px-20 mb-8 md:mb-12">
          <Image
            src="/hero-right.jpg"
            alt="Warehouse services"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#1c1f2e]/80" />

          <div className="relative z-10 text-right flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.banner_title}
            </h1>
            <p className="text-white/70 text-sm font-medium tracking-wide">
              {t.home} / {t.services}
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-8 xl:gap-12 relative items-start">
          {/* Left Sidebar (Sticky) */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 z-20">
            {/* Nav Card */}
            <div className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-[26px] md:text-[28px] font-extrabold text-[#f27a1a] leading-[1.1] tracking-tight">
                  {t.sidebar_title}
                </h2>
                <p className="text-xs text-gray-500 font-medium leading-relaxed mt-2">
                  {t.sidebar_subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                {navItems.map((item, i) => (
                  <button
                    key={i}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all text-left group bg-white
                      ${item.active ? "border border-[#f27a1a] shadow-sm" : "border border-transparent hover:border-[#f27a1a]/30 shadow-sm"}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-bold text-sm text-[#1c1f2e] group-hover:text-[#f27a1a] transition-colors leading-snug">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 flex flex-col gap-5 text-center">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#f27a1a] leading-tight tracking-tight">
                {t.cta_title}
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                {t.cta_subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-2 border border-[#f27a1a] text-[#f27a1a] font-bold text-sm py-3 px-4 rounded-xl hover:bg-[#f27a1a] hover:text-white transition-colors"
                >
                  {t.contact_btn} <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/quote"
                  className="flex-1 flex items-center justify-center gap-2 border border-[#f27a1a] text-[#f27a1a] font-bold text-sm py-3 px-4 rounded-xl hover:bg-[#f27a1a] hover:text-white transition-colors"
                >
                  {t.quote_btn} <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex flex-col gap-8">
            {serviceDetails.map((service, idx) => (
              <div
                key={service.id}
                className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 md:p-10 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-[#f27a1a]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1c1f2e]">
                    {service.title}
                  </h3>
                </div>

                <h4 className="font-bold text-[#1c1f2e] text-sm sm:text-base mb-2">
                  {service.subtitle}
                </h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 max-w-3xl">
                  {service.description}
                </p>

                {/* DOX Section */}
                {service.dox && (
                  <div className="mb-8">
                    <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">
                      {t.label_dox}
                    </h5>
                    <ul className="flex flex-col gap-2">
                      {service.dox.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs sm:text-sm text-gray-500 font-medium flex items-center"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 shrink-0" />
                          <strong className="text-gray-700 mr-1">
                            {item.label}:
                          </strong>{" "}
                          {item.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Non-DOX Section */}
                {service.nondox && (
                  <div className="flex flex-col">
                    <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">
                      {t.label_nondox}
                    </h5>

                    <div className="overflow-x-auto pb-4">
                      <table className="w-full text-left min-w-[600px] border-separate border-spacing-y-2">
                        <thead>
                          <tr>
                            <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-l-xl px-4 py-3">
                              {t.th_destination}
                            </th>
                            <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">
                              {t.th_max_weight}
                            </th>
                            <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">
                              {t.th_limit}
                            </th>
                            <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-r-xl px-4 py-3">
                              {t.th_delivery}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {service.nondox.map((row, i) => (
                            <tr key={i} className="bg-white transition-colors">
                              <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">
                                {row.dest}
                              </td>
                              <td className="text-xs font-medium text-gray-600 px-4 py-3">
                                {row.weight}
                              </td>
                              <td className="text-xs font-medium text-gray-600 px-4 py-3">
                                {row.duty}
                              </td>
                              <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">
                                {row.delivery}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-2 text-[10px] sm:text-[11px] text-gray-400 font-medium flex flex-col gap-0.5">
                      <span>{t.lbl_max_size}</span>
                      <span>{t.lbl_available_co}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Aramex */}
            <div
              id="aramex"
              className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 md:p-10 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-[#f27a1a]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1c1f2e]">
                  Aramex
                </h3>
              </div>
              <h4 className="font-bold text-[#1c1f2e] text-sm sm:text-base mb-2">
                {t.subtitle_aramex}
              </h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 max-w-3xl">
                {t.desc_aramex}
              </p>

              <div className="flex flex-col">
                <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">
                  {t.label_nondox}
                </h5>
                <div className="overflow-x-auto pb-4">
                  <table className="w-full text-left min-w-[600px] border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-l-xl px-4 py-3">
                          {t.th_service}
                        </th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">
                          {t.th_destination}
                        </th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">
                          {t.th_limit}
                        </th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-r-xl px-4 py-3">
                          {t.th_delivery}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">
                          DPX (Economy)
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Australia
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Up to AUD 800
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">
                          8-10 working days
                        </td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">
                          PPX (Express)
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Australia
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Up to AUD 800
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">
                          8-10 working days
                        </td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">
                          PPX (Express)
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Rest of World
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Duty may apply
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">
                          6-8 working days
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-[11px] text-gray-500 font-bold">
                  Max Box Size: 100×80×80 Cm | Min Weight: 500g | Max: 30kg/Box
                  | Single Or Multiple Pieces Accepted
                </div>
              </div>
            </div>

            {/* FedEx Medicine */}
            <div
              id="fedex-medicine"
              className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 md:p-10 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-[#f27a1a]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1c1f2e]">
                  FedEx — Medicine & Special Content
                </h3>
              </div>
              <h4 className="font-bold text-[#1c1f2e] text-sm sm:text-base mb-2">
                {t.subtitle_special}
              </h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 max-w-3xl">
                {t.desc_special}
              </p>

              <div className="flex flex-col">
                <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">
                  {t.label_nondox_hub}
                </h5>
                <div className="overflow-x-auto pb-4">
                  <table className="w-full text-left min-w-[600px] border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-l-xl px-4 py-3">
                          {t.th_destination}
                        </th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">
                          {t.th_max_weight}
                        </th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">
                          {t.th_limit}
                        </th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-r-xl px-4 py-3">
                          {t.th_delivery}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">
                          USA
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          30kg/box
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Duty may apply
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">
                          10-12 working days
                        </td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">
                          Canada
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          30kg/box
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Up to CAD 20
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">
                          10-12 working days
                        </td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">
                          Australia
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          30kg/box
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Up to AUD 800
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">
                          10-12 working days
                        </td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">
                          New Zealand
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          30kg/box
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">
                          Up to NZD 100
                        </td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">
                          10-12 working days
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <span className="text-[11px] text-gray-500 font-bold">
                    Max Box Size: 100×80×80 Cm | Single Or Multiple Pieces
                    Accepted
                  </span>
                  <span className="text-[11px] text-[#f27a1a] font-bold">
                    {t.lbl_fedex_pre}
                  </span>
                </div>
              </div>
            </div>

            {/* DIRECT (SELF-NETWORK) SERVICES */}
            <div
              id="direct"
              className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 md:p-10 flex flex-col"
            >
              <div className="mb-6">
                <span className="inline-block border border-[#f27a1a] text-[#f27a1a] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wide">
                  {t.lbl_direct_badge}
                </span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#1c1f2e] mb-2">
                {t.lbl_direct_title}
              </h3>
              <p className="text-gray-500 text-sm font-bold leading-relaxed mb-6">
                {t.lbl_direct_sub}
              </p>

              <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">
                {t.label_nondox}
              </h5>

              <div className="flex flex-col gap-6">
                {/* UK */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h4 className="text-2xl font-extrabold text-[#f27a1a] mb-2">
                    {t.lbl_uk_title}
                  </h4>
                  <h5 className="font-bold text-[#1c1f2e] text-sm mb-3">
                    {t.lbl_uk_sub}
                  </h5>
                  <p className="text-gray-400 text-xs font-medium mb-4">
                    {t.lbl_uk_desc}
                  </p>

                  <ul className="flex flex-col gap-1.5 mb-4">
                    {[
                      { l: t.tbl_dest, v: "United Kingdom" },
                      { l: t.tbl_weight, v: "500g - 30kg per box" },
                      { l: "Box size", v: "Up to 90x70x60 cm" },
                      { l: t.tbl_limit, v: "No limit" },
                      { l: t.tbl_delivery, v: "6-8 working days" },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-500 font-medium flex items-center"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0" />
                        <span className="text-gray-500 mr-1">{item.l}:</span>{" "}
                        {item.v}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-400 text-[10px] font-medium">
                    {t.lbl_uk_note}
                  </p>
                </div>

                {/* Europe */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h4 className="text-2xl font-extrabold text-[#f27a1a] mb-2">
                    {t.lbl_eu_title}
                  </h4>
                  <h5 className="font-bold text-[#1c1f2e] text-sm mb-3">
                    {t.lbl_eu_sub}
                  </h5>
                  <p className="text-gray-400 text-xs font-medium mb-4">
                    {t.lbl_eu_desc}
                  </p>

                  <ul className="flex flex-col gap-1.5">
                    {[
                      { l: t.tbl_dest, v: "All of Europe" },
                      { l: t.tbl_weight, v: "1kg - 30kg per box" },
                      { l: "Box size", v: "Up to 90x70x60 cm" },
                      { l: "Boxes", v: "Single piece" },
                      { l: t.tbl_limit, v: "No limit" },
                      { l: t.tbl_delivery, v: "12-15 working days" },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-500 font-medium flex items-center"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0" />
                        <span className="text-gray-500 mr-1">{item.l}:</span>{" "}
                        {item.v}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Canada */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h4 className="text-2xl font-extrabold text-[#f27a1a] mb-2">
                    {t.lbl_ca_title}
                  </h4>
                  <h5 className="font-bold text-[#1c1f2e] text-sm mb-3">
                    {t.lbl_ca_sub}
                  </h5>
                  <p className="text-gray-400 text-xs font-medium mb-5">
                    {t.lbl_ca_desc}
                  </p>

                  <div className="overflow-x-auto pb-4">
                    <table className="w-full text-left min-w-[500px] border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">
                            Route
                          </th>
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">
                            {t.tbl_weight}
                          </th>
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">
                            {t.tbl_limit}
                          </th>
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">
                            {t.tbl_delivery}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">
                            Via Vancouver (YVR)
                          </td>
                          <td className="text-xs font-medium text-gray-500 py-4">
                            20kg/box, no total limit
                          </td>
                          <td className="text-xs font-medium text-gray-500 py-4">
                            No limit
                          </td>
                          <td className="text-xs font-medium text-gray-500 py-4">
                            12-15 working days
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">
                            Via Toronto (YYZ)
                          </td>
                          <td className="text-xs font-medium text-gray-500 py-4">
                            20kg/box, no total limit
                          </td>
                          <td className="text-xs font-medium text-gray-500 py-4">
                            No limit
                          </td>
                          <td className="text-xs font-medium text-gray-500 py-4">
                            12-15 working days
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-gray-400 text-[10px] font-medium mt-2">
                    Box size: Up to 90x70x60 cm | Single or multiple pieces
                    accepted
                  </p>
                </div>

                {/* Australia */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h4 className="text-2xl font-extrabold text-[#f27a1a] mb-2">
                    {t.lbl_au_title}
                  </h4>
                  <h5 className="font-bold text-[#1c1f2e] text-sm mb-3">
                    {t.lbl_au_sub}
                  </h5>
                  <p className="text-gray-400 text-xs font-medium mb-5">
                    {t.lbl_au_desc}
                  </p>

                  <div className="overflow-x-auto pb-4">
                    <table className="w-full text-left min-w-[400px] border-collapse mb-6">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">
                            Zone
                          </th>
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">
                            {t.tbl_delivery}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">
                            Zone 1
                          </td>
                          <td className="text-xs font-medium text-gray-500 py-4">
                            12-15 working days
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">
                            Zone 2
                          </td>
                          <td className="text-xs font-medium text-gray-500 py-4">
                            15-18 working days
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">
                            Zones 3-8
                          </td>
                          <td className="text-xs font-medium text-gray-500 py-4">
                            18-22 working days
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <ul className="flex flex-col gap-1.5 mb-5">
                    {[
                      {
                        l: t.tbl_weight,
                        v: "500g - 20kg per box, no limit on total shipment weight",
                      },
                      { l: "Box size", v: "Up to 90x70x60 cm" },
                      { l: "Boxes", v: "Single or multiple pieces" },
                      { l: t.tbl_limit, v: "No limit" },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-500 font-medium flex items-center"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0" />
                        <span className="text-gray-500 mr-1">{item.l}:</span>{" "}
                        {item.v}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[#f27a1a] text-[11px] font-bold">
                    {t.lbl_au_note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ManviChatBot />
      <ManviWhatsApp />
    </div>
  );
}

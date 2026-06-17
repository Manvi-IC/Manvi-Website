// context/LanguageContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "hi" | "pa" | "fr" | "es";

export interface Translations {
  // Header / Nav
  nav_about: string;
  nav_services: string;
  nav_track: string;
  nav_quote: string;
  nav_contact: string;
  nav_home: string;
  nav_zipcode: string;
  nav_language: string;
  nav_track_shipment: string;

  // Breadcrumb labels
  bc_about: string;
  bc_track: string;
  bc_zipcode: string;
  bc_contact: string;
  bc_quote: string;
  bc_faq: string;
  bc_services: string;
  bc_business_campaign: string;

  // Hero
  hero_headline: string;
  hero_subtext: string;
  hero_pickup: string;
  hero_drop: string;
  hero_weight: string;
  hero_service: string;
  hero_content: string;
  hero_get_quote: string;
  hero_estimated_cost: string;
  hero_est_delivery: string;
  hero_days: string;
  hero_read_more: string;
  hero_legacy_badge: string;
  hero_legacy_heading: string;
  hero_legacy_highlight: string;
  hero_whatsapp: string;
  hero_doc_express: string;
  hero_parcel_shipping: string;
  hero_cargo_express: string;
  hero_serviceable_zipcodes: string;
  hero_our_services: string;
  hero_contact_us: string;

  // Delivery Partners
  partners_title: string;

  // Bespoke
  bespoke_badge: string;
  bespoke_title: string;
  bespoke_acc1_num: string;
  bespoke_acc1_title: string;
  bespoke_acc1_desc: string;
  bespoke_acc1_card1_title: string;
  bespoke_acc1_card1_desc: string;
  bespoke_acc1_card2_title: string;
  bespoke_acc1_card2_desc: string;
  bespoke_acc1_card3_title: string;
  bespoke_acc1_card3_desc: string;
  bespoke_acc2_num: string;
  bespoke_acc2_title: string;
  bespoke_acc2_desc: string;
  bespoke_acc2_card1_title: string;
  bespoke_acc2_card1_desc: string;
  bespoke_acc2_card2_title: string;
  bespoke_acc2_card2_desc: string;
  bespoke_acc2_card3_title: string;
  bespoke_acc2_card3_desc: string;

  // WhyWeLead
  wwl_badge: string;
  wwl_title: string;
  wwl_card1_label: string;
  wwl_card1_desc: string;
  wwl_card2_label: string;
  wwl_card2_stat: string;
  wwl_card2_desc: string;
  wwl_card3_label: string;
  wwl_card3_stat: string;
  wwl_card3_desc: string;
  wwl_card4_label: string;
  wwl_card4_stat: string;
  wwl_card4_desc: string;

  // ClaimPolicy
  claim_badge: string;
  claim_title: string;
  claim_intro: string;
  claim_tab1_title: string;
  claim_tab1_subtext: string;
  claim_tab1_panelTitle: string;
  claim_tab1_d1_num: string;
  claim_tab1_d1_title: string;
  claim_tab1_d1_desc: string;
  claim_tab1_d2_num: string;
  claim_tab1_d2_title: string;
  claim_tab1_d2_desc: string;
  claim_tab1_d3_num: string;
  claim_tab1_d3_title: string;
  claim_tab1_d3_desc: string;
  claim_tab2_title: string;
  claim_tab2_subtext: string;
  claim_tab2_panelTitle: string;
  claim_tab2_d1_num: string;
  claim_tab2_d1_title: string;
  claim_tab2_d1_desc: string;
  claim_tab2_d2_num: string;
  claim_tab2_d2_title: string;
  claim_tab2_d2_desc: string;
  claim_tab2_d3_num: string;
  claim_tab2_d3_title: string;
  claim_tab2_d3_desc: string;
  claim_tab3_title: string;
  claim_tab3_subtext: string;
  claim_tab3_panelTitle: string;
  claim_tab4_title: string;
  claim_tab4_subtext: string;
  claim_tab4_panelTitle: string;
  claim_tab4_d1_num: string;
  claim_tab4_d1_title: string;
  claim_tab4_d1_desc: string;
  claim_tab4_d2_num: string;
  claim_tab4_d2_title: string;
  claim_tab4_d2_desc: string;

  // NoCosts
  nocost_badge: string;
  nocost_title: string;
  nocost_desc: string;
  nocost_btn: string;

  // Prohibited
  prohibited_title: string;
  prohibited_desc: string;
  prohibited_item1: string;
  prohibited_item2: string;
  prohibited_item3: string;
  prohibited_item4: string;
  prohibited_item5: string;
  prohibited_btn: string;

  // FAQ
  faq_badge: string;
  faq_title: string;
  faq_q1: string;
  faq_a1: string;
  faq_q2: string;
  faq_a2: string;
  faq_q3: string;
  faq_a3: string;
  faq_q4: string;
  faq_a4: string;
  faq_q5: string;
  faq_a5: string;

  // Contact
  contact_badge: string;
  contact_title: string;
  contact_desc: string;
  contact_call: string;
  contact_whatsapp: string;
  contact_info: string;

  // Footer
  footer_tagline: string;
  footer_desc: string;
  footer_social: string;
  footer_quick_links: string;
  footer_office_info: string;
  footer_rights: string;

  // Forms & Quotes
  form_select_dest: string;
  form_select_euro: string;
  form_select_country: string;
  form_zipcode: string;
  form_actual_wt: string;
  form_vol_wt_dim: string;
  form_length: string;
  form_breadth: string;
  form_height: string;
  form_vol_wt: string;
  form_chargeable: string;
  form_calculating: string;
  form_selected: string;
  form_zone: string;
  form_slab: string;
  form_per_kg: string;
  form_duty_paid: string;
  form_duty_unpaid: string;
  form_gst_inc: string;
  form_final_rates_msg: string;
  form_services_found: string;
  form_services_found_text: string;

  quote_banner_title: string;
  quote_banner_sub: string;
  quote_instant_est: string;
  quote_heading: string;
  quote_subheading: string;
  quote_empty_title: string;
  quote_empty_sub: string;
  quote_loading_msg: string;
  quote_how_calc_title: string;
  quote_how_calc_1_title: string;
  quote_how_calc_1_desc: string;
  quote_how_calc_2_title: string;
  quote_how_calc_2_desc: string;
  quote_how_calc_3_title: string;
  quote_how_calc_3_desc: string;
  quote_faq_badge: string;
  quote_faq_title: string;

  bespoke_read_more: string;
}

const translations: Record<Language, Translations> = {
  en: {
    nav_about: "About us",
    nav_services: "Services",
    nav_track: "Track now",
    nav_quote: "Get quote",
    nav_contact: "Contact us",
    nav_home: "Home",
    nav_zipcode: "Serviceable zipcode",
    nav_language: "Language",
    nav_track_shipment: "Track shipment",
    bc_about: "About us",
    bc_track: "Track shipment",
    bc_zipcode: "Serviceable zipcode",
    bc_contact: "Contact us",
    bc_quote: "Get a quote",
    bc_faq: "FAQ",
    bc_services: "Services",
    bc_business_campaign: "Business Campaign",
    hero_headline: "Connecting families,\nbridging distances.",
    hero_subtext:
      "Send documents, parcels, food items, gifts, or commercial shipments worldwide with confidence.",
    hero_pickup: "Pick up location",
    hero_drop: "Drop location",
    hero_weight: "Weight (kg)",
    hero_service: "Service",
    hero_content: "Content",
    hero_get_quote: "Get quote",
    hero_estimated_cost: "Estimated cost",
    hero_est_delivery: "Est. delivery",
    hero_days: "Days",
    hero_read_more: "Read more",
    hero_legacy_badge: "The Manvi legacy",
    hero_legacy_heading: "We don't just move parcels;",
    hero_legacy_highlight: "We bridge distances.",
    hero_whatsapp: "•Whatsapp us •Whatsapp us •",
    hero_doc_express: "Document express",
    hero_parcel_shipping: "Parcel shipping",
    hero_cargo_express: "Cargo express",
    hero_serviceable_zipcodes: "Serviceable zipcodes",
    hero_our_services: "Our services",
    hero_contact_us: "Contact us",
    partners_title: "Our delivery\npartners ✈",
    bespoke_badge: "Our services",
    bespoke_title: "Bespoke shipping solutions.",
    bespoke_acc1_num: "01",
    bespoke_acc1_title: "Global personal logistics",
    bespoke_acc1_desc:
      "Reliable logistics for individuals moving cargo or personal items worldwide.",
    bespoke_acc1_card1_title: "Door-to-door delivery",
    bespoke_acc1_card1_desc:
      "Fast and secure package pickups directly from your doorstep.",
    bespoke_acc1_card2_title: "Global baggage shipping",
    bespoke_acc1_card2_desc:
      "Moving your personal baggage across borders hassle-free.",
    bespoke_acc1_card3_title: "Customs clearance support",
    bespoke_acc1_card3_desc:
      "Assistance with standard customs documentation for smooth arrivals.",
    bespoke_acc2_num: "02",
    bespoke_acc2_title: "Enterprise & bulk solutions",
    bespoke_acc2_desc:
      "Optimizing supply chains for businesses that demand precision.",
    bespoke_acc2_card1_title: "Strategic bulk shipping",
    bespoke_acc2_card1_desc:
      "High-volume transit with optimized cost-structures.",
    bespoke_acc2_card2_title: "Account management",
    bespoke_acc2_card2_desc:
      "Dedicated experts to navigate your commercial logistics.",
    bespoke_acc2_card3_title: "Seamless integration",
    bespoke_acc2_card3_desc:
      "Regular pickups tailored to your business rhythm.",
    wwl_badge: "The Manvi advantage",
    wwl_title: "Why we lead",
    wwl_card1_label: "Delivery success",
    wwl_card1_desc:
      "Successful international deliveries completed with accuracy and care.",
    wwl_card2_label: "Elite partnerships",
    wwl_card2_stat: "Multiple\ncountries",
    wwl_card2_desc:
      "Collaboration with world-class carriers including DHL, FedEx, UPS, Aramex, and DPD.",
    wwl_card3_label: "Customs mastery",
    wwl_card3_stat: "1000+",
    wwl_card3_desc:
      "Expert documentation support to navigate global borders effortlessly.",
    wwl_card4_label: "Technological edge",
    wwl_card4_stat: "Real-time\nupdates",
    wwl_card4_desc: "End-to-end, real-time tracking for total peace of mind.",
    claim_badge: "Comprehensive policies",
    claim_title: "Our refund and loss claim policy",
    claim_intro:
      "Manvi International is committed to providing reliable international logistics services. However, in the event of transit irregularities, the following policy outlines the formal procedures, timelines, and conditions for the resolution of claims.",
    claim_tab1_title: "General claim provisions",
    claim_tab1_subtext:
      "All claims for refunds or losses must undergo a formal investigation process.",
    claim_tab1_panelTitle:
      "All claims for refunds or losses must undergo a formal investigation process.",
    claim_tab1_d1_num: "01",
    claim_tab1_d1_title: "Mandatory investigation window",
    claim_tab1_d1_desc:
      "A minimum of 25 business days is required to process any claim.",
    claim_tab1_d2_num: "02",
    claim_tab1_d2_title: "Settlement Protocol",
    claim_tab1_d2_desc:
      'Under no circumstances will claims be settled "on the spot" or prior to the completion of the formal verification process.',
    claim_tab1_d3_num: "03",
    claim_tab1_d3_title: "Third-Party Dependency",
    claim_tab1_d3_desc:
      'As an international logistics provider, Manvi International\'s claim resolution is strictly contingent upon the official investigation reports and confirmation from our global courier partners, including but not limited to <strong class="font-extrabold text-[#1c1f2e]">DHL, FedEx, UPS, DPD, and Aramex</strong>',
    claim_tab2_title: "Return To Origin (RTO) Shipments",
    claim_tab2_subtext:
      "Returned shipments for non-delivery, incorrect addresses, or refusal qualify for refunds.",
    claim_tab2_panelTitle:
      "Shipments that are returned to the point of origin due to non-delivery, incorrect address, or receiver refusal are eligible for a streamlined refund process.",
    claim_tab2_d1_num: "01",
    claim_tab2_d1_title: "Processing Timeline",
    claim_tab2_d1_desc:
      'Refunds for RTO shipments will be initiated within <strong class="font-extrabold text-[#1c1f2e]">2 to 3 working days</strong>',
    claim_tab2_d2_num: "02",
    claim_tab2_d2_title: "Verification Requirement",
    claim_tab2_d2_desc:
      "The processing window commences only after the physical receipt and successful verification of the shipment at our facility.",
    claim_tab2_d3_num: "03",
    claim_tab2_d3_title: "Condition",
    claim_tab2_d3_desc:
      "The shipment must be intact and meet the criteria for a return-based refund as per the initial service agreement.",
    claim_tab3_title: "Claims For Lost, Damaged, Or Destroyed Shipments",
    claim_tab3_subtext:
      "Guidelines for handling lost, damaged, destroyed, or carrier-delayed shipments.",
    claim_tab3_panelTitle:
      "In the event of a shipment being lost, damaged, destroyed, or significantly delayed due to carrier-related issues, the following protocols apply:",
    claim_tab4_title: "General Claim Provisions",
    claim_tab4_subtext: "When Manvi International is not responsible",
    claim_tab4_panelTitle:
      "In some cases, delays or losses may occur due to factors outside our control. These conditions are explained below.",
    claim_tab4_d1_num: "01",
    claim_tab4_d1_title: "Force Majeure",
    claim_tab4_d1_desc:
      "Manvi International is not liable for delays or losses caused by circumstances beyond our control, including but not limited to customs seizures, weather disruptions, or political instability.",
    claim_tab4_d2_num: "02",
    claim_tab4_d2_title: "Carrier Confirmation",
    claim_tab4_d2_desc:
      'No claim for loss or destruction will be approved until the respective carrier (DHL, FedEx, or UPS) officially declares the shipment as "Lost" or "Damaged" in their global tracking system.',
    nocost_badge: "Pricing & Transparency",
    nocost_title:
      "No Hidden Costs. No Surprises.\nJust Straightforward Logistics.",
    nocost_desc:
      "We believe in value-based pricing. Our rates are carefully calculated based on destination, shipment weight, and delivery urgency, so you only pay for what truly matters. No hidden fees, no surprise surcharges, and no unnecessary overheads. Just transparent pricing built around performance, reliability, and efficiency.",
    nocost_btn: "Request Rates",
    prohibited_title: "Prohibited Goods",
    prohibited_desc:
      "To maintain the integrity of our network, we do not transport:",
    prohibited_item1: "Hazardous Chemicals",
    prohibited_item2: "Negotiable Currency",
    prohibited_item3: "Dangerous Goods",
    prohibited_item4: "Precious Stones",
    prohibited_item5: "Illegal or Restricted Contraband",
    prohibited_btn: "Detailed List",
    faq_badge: "FAQ",
    faq_title: "Questions? Glad You Asked",
    faq_q1: "Where Can I Send My Packages?",
    faq_a1:
      "Almost anywhere! We have a strong presence in the USA, Canada, UK, Europe, and Australia. Whether it's a big city or a quiet suburb, we'll get it there.",
    faq_q2: "How Do I Know I'm Getting A Fair Price?",
    faq_a2:
      "We believe in value. Your quote is based on exactly what you need; considering weight, destination, and how fast you need it delivered. We promise no hidden surprises when it's time to pay.",
    faq_q3: "Can I See Where My Package Is Right Now?",
    faq_a3:
      "Yes! The moment you ship with us, you'll get a unique tracking number. You can watch your package's journey in real-time, giving you total confidence.",
    faq_q4: "What Happens If There Is A Delay Or A Problem?",
    faq_a4:
      "We know your shipments are important. If something goes wrong, we are here to help. To ensure a fair and thorough resolution, our team and our global partners (like DHL, FedEx, and UPS) conduct a detailed investigation.",
    faq_q5: "Is There Anything I Cannot Ship?",
    faq_a5:
      "To keep everyone safe and follow international laws, we cannot ship hazardous chemicals, currency, precious stones, or illegal items. If you aren't sure about an item, just give us a call! We're happy to check for you before you book.",
    contact_badge: "Get In Touch",
    contact_title: "We're Here For You",
    contact_desc:
      "We believe in value. Your quote is based on exactly what you need—considering weight, destination, and how fast you need it delivered. We promise no hidden surprises when it's time to pay.",
    contact_call: "Call Us",
    contact_whatsapp: "Whatsapp Us",
    contact_info: "Contact Info",
    footer_tagline: "Connecting Families, Bridging Distances",
    footer_desc:
      "Trusted by 10,000+ happy customers and with over 50,000 successful international shipments, we deliver fast, secure, and seamless courier and freight solutions you can rely on.",
    footer_social: "Social Network",
    footer_quick_links: "Quick Links",
    footer_office_info: "Office Info",
    footer_rights: "All rights reserved.",
    form_select_dest: "Select Destination Country",
    form_select_euro: "Select European Country",
    form_select_country: "Select Country",
    form_zipcode: "Zipcode / Postcode",
    form_actual_wt: "Actual Weight (kg)",
    form_vol_wt_dim: "Volume Weight Dimensions (cm) — optional",
    form_length: "Length",
    form_breadth: "Breadth",
    form_height: "Height",
    form_vol_wt: "Vol wt:",
    form_chargeable: "Chargeable:",
    form_calculating: "Calculating...",
    form_selected: "SELECTED",
    form_zone: "Zone",
    form_slab: "Slab rate",
    form_per_kg: "Per kg",
    form_duty_paid: "DUTY PAID",
    form_duty_unpaid: "DUTY UNPAID",
    form_gst_inc: "GST inclusive",
    form_final_rates_msg:
      "Final rates may vary · Call +91 7070-506070 to confirm",
    form_services_found: "Services Found",
    form_services_found_text: "service(s) found",
    quote_banner_title: "Get a Quote",
    quote_banner_sub:
      "Enter your shipment details to instantly compare services and rates.",
    quote_instant_est: "INSTANT ESTIMATE",
    quote_heading: "CONNECTING FAMILIES,\nBRIDGING DISTANCES.",
    quote_subheading:
      "Send documents, parcels, gifts, or commercial shipments worldwide.",
    quote_empty_title: "Your quotes will appear here",
    quote_empty_sub:
      'Fill in the form and click "Get Quote" to compare services',
    quote_loading_msg: "Fetching rates from all carriers…",
    quote_how_calc_title: "How Is Your Quote Calculated?",
    quote_how_calc_1_title: "Chargeable Weight",
    quote_how_calc_1_desc:
      "We use the higher of actual weight vs volumetric weight (L × B × H ÷ 5000), rounded up to the nearest kg.",
    quote_how_calc_2_title: "Service & Zone",
    quote_how_calc_2_desc:
      "For Australia/Canada your postcode determines the delivery zone. Europe and International destinations use country-based zone mapping.",
    quote_how_calc_3_title: "Rate Application",
    quote_how_calc_3_desc:
      "Slab rates (S) are flat amounts per weight bracket. Per-kg rates (B) are multiplied by your chargeable weight. All rates are GST-inclusive.",
    quote_faq_badge: "Got Questions?",
    quote_faq_title: "Frequently Asked Questions",
    bespoke_read_more: "Read More • Read More •",
  },

  hi: {
    nav_about: "हमारे बारे में",
    nav_services: "सेवाएं",
    nav_track: "अभी ट्रैक करें",
    nav_quote: "कोटेशन लें",
    nav_contact: "संपर्क करें",
    nav_home: "होम",
    nav_zipcode: "सेवा योग्य पिनकोड",
    nav_language: "भाषा",
    nav_track_shipment: "शिपमेंट ट्रैक करें",
    bc_about: "हमारे बारे में",
    bc_track: "शिपमेंट ट्रैक करें",
    bc_zipcode: "सेवा योग्य पिनकोड",
    bc_contact: "संपर्क करें",
    bc_quote: "कोटेशन लें",
    bc_faq: "सामान्य प्रश्न",
    bc_services: "सेवाएं",
    bc_business_campaign: "बिजनेस सोर्सिंग",
    hero_headline: "महाद्वीपों को जोड़ना, विश्वास पहुंचाना।",
    hero_subtext:
      "दुनिया भर में दस्तावेज़, पार्सल, खाद्य सामग्री, उपहार या वाणिज्यिक शिपमेंट आत्मविश्वास के साथ भेजें।",
    hero_pickup: "पिकअप स्थान",
    hero_drop: "डिलीवरी स्थान",
    hero_weight: "वजन (किग्रा)",
    hero_service: "सेवा",
    hero_content: "सामग्री",
    hero_get_quote: "कोटेशन लें",
    hero_estimated_cost: "अनुमानित लागत",
    hero_est_delivery: "अनुमानित डिलीवरी",
    hero_days: "दिन",
    hero_read_more: "और पढ़ें",
    hero_legacy_badge: "मानवी विरासत",
    hero_legacy_heading: "हम सिर्फ पार्सल नहीं भेजते;",
    hero_legacy_highlight: "हम दूरियां मिटाते हैं।",
    hero_whatsapp: "•व्हाट्सएप करें •व्हाट्सएप करें •",
    hero_doc_express: "दस्तावेज़ एक्सप्रेस",
    hero_parcel_shipping: "पार्सल शिपिंग",
    hero_cargo_express: "कार्गो एक्सप्रेस",
    hero_serviceable_zipcodes: "सेवा योग्य पिनकोड",
    hero_our_services: "हमारी सेवाएं",
    hero_contact_us: "संपर्क करें",
    partners_title: "हमारे डिलीवरी\nसाझेदार ✈",
    bespoke_badge: "हमारी सेवाएं",
    bespoke_title: "विशेष शिपिंग समाधान।",
    bespoke_acc1_num: "01",
    bespoke_acc1_title: "वैश्विक व्यक्तिगत लॉजिस्टिक्स",
    bespoke_acc1_desc:
      "दुनिया भर में व्यक्तिगत सामान ले जाने वाले व्यक्तियों के लिए विश्वसनीय लॉजिस्टिक्स।",
    bespoke_acc1_card1_title: "डोर-टू-डोर डिलीवरी",
    bespoke_acc1_card1_desc:
      "सीधे आपके दरवाज़े से तेज़ और सुरक्षित पार्सल पिकअप।",
    bespoke_acc1_card2_title: "वैश्विक सामान शिपिंग",
    bespoke_acc1_card2_desc:
      "सीमाओं के पार आपका निजी सामान बिना किसी परेशानी के ले जाना।",
    bespoke_acc1_card3_title: "कस्टम क्लीयरेंस सहायता",
    bespoke_acc1_card3_desc:
      "सुगम आगमन के लिए मानक कस्टम दस्तावेज़ीकरण में सहायता।",
    bespoke_acc2_num: "02",
    bespoke_acc2_title: "एंटरप्राइज़ और बल्क समाधान",
    bespoke_acc2_desc:
      "सटीकता की मांग करने वाले व्यवसायों के लिए आपूर्ति श्रृंखला का अनुकूलन।",
    bespoke_acc2_card1_title: "रणनीतिक बल्क शिपिंग",
    bespoke_acc2_card1_desc:
      "अनुकूलित लागत संरचनाओं के साथ उच्च-मात्रा पारगमन।",
    bespoke_acc2_card2_title: "खाता प्रबंधन",
    bespoke_acc2_card2_desc:
      "आपकी वाणिज्यिक लॉजिस्टिक्स को संभालने के लिए समर्पित विशेषज्ञ।",
    bespoke_acc2_card3_title: "निर्बाध एकीकरण",
    bespoke_acc2_card3_desc: "आपके व्यवसाय की लय के अनुसार नियमित पिकअप।",
    wwl_badge: "मानवी का लाभ",
    wwl_title: "हम क्यों आगे हैं",
    wwl_card1_label: "डिलीवरी सफलता",
    wwl_card1_desc: "सटीकता और देखभाल के साथ सफल अंतर्राष्ट्रीय डिलीवरी।",
    wwl_card2_label: "श्रेष्ठ साझेदारी",
    wwl_card2_stat: "कई\nदेश",
    wwl_card2_desc:
      "DHL, FedEx, UPS और Aramex सहित विश्व स्तरीय वाहकों के साथ सहयोग।",
    wwl_card3_label: "कस्टम महारत",
    wwl_card3_stat: "1000+",
    wwl_card3_desc:
      "वैश्विक सीमाओं को आसानी से पार करने के लिए विशेषज्ञ दस्तावेज़ सहायता।",
    wwl_card4_label: "तकनीकी बढ़त",
    wwl_card4_stat: "रियल-टाइम\nअपडेट",
    wwl_card4_desc: "पूर्ण मन की शांति के लिए एंड-टू-एंड, रियल-टाइम ट्रैकिंग।",
    claim_badge: "व्यापक नीतियां",
    claim_title: "हमारी धनवापसी और हानि दावा नीति",
    claim_intro:
      "मानवी इंटरनेशनल विश्वसनीय अंतर्राष्ट्रीय लॉजिस्टिक्स सेवाएं प्रदान करने के लिए प्रतिबद्ध है। हालांकि, पारगमन अनियमितताओं की स्थिति में, निम्नलिखित नीति दावों के समाधान के लिए औपचारिक प्रक्रियाओं, समयसीमाओं और शर्तों को रेखांकित करती है।",
    claim_tab1_title: "सामान्य दावा प्रावधान",
    claim_tab1_subtext:
      "धनवापसी या हानि के सभी दावों को औपचारिक जांच प्रक्रिया से गुजरना होगा।",
    claim_tab1_panelTitle:
      "धनवापसी या हानि के सभी दावों को औपचारिक जांच प्रक्रिया से गुजरना होगा।",
    claim_tab1_d1_num: "01",
    claim_tab1_d1_title: "अनिवार्य जांच विंडो",
    claim_tab1_d1_desc:
      "किसी भी दावे को प्रोसेस करने के लिए न्यूनतम 25 कार्यदिवस आवश्यक हैं।",
    claim_tab1_d2_num: "02",
    claim_tab1_d2_title: "निपटान प्रोटोकॉल",
    claim_tab1_d2_desc:
      'किसी भी परिस्थिति में दावों का निपटारा "तत्काल" या औपचारिक सत्यापन प्रक्रिया पूरी होने से पहले नहीं किया जाएगा।',
    claim_tab1_d3_num: "03",
    claim_tab1_d3_title: "तृतीय-पक्ष निर्भरता",
    claim_tab1_d3_desc:
      'एक अंतर्राष्ट्रीय लॉजिस्टिक्स प्रदाता के रूप में, मानवी इंटरनेशनल का दावा समाधान हमारे वैश्विक कूरियर साझेदारों की आधिकारिक जांच रिपोर्ट पर निर्भर है, जिसमें <strong class="font-extrabold text-[#1c1f2e]">DHL, FedEx और UPS</strong> शामिल हैं।',
    claim_tab2_title: "मूल स्थान पर वापसी (RTO) शिपमेंट",
    claim_tab2_subtext:
      "गैर-डिलीवरी, गलत पते या इनकार के लिए वापस किए गए शिपमेंट धनवापसी के योग्य हैं।",
    claim_tab2_panelTitle:
      "गैर-डिलीवरी, गलत पते या प्राप्तकर्ता के इनकार के कारण मूल स्थान पर वापस किए गए शिपमेंट सुव्यवस्थित धनवापसी प्रक्रिया के लिए पात्र हैं।",
    claim_tab2_d1_num: "01",
    claim_tab2_d1_title: "प्रोसेसिंग समयसीमा",
    claim_tab2_d1_desc:
      'RTO शिपमेंट के लिए धनवापसी <strong class="font-extrabold text-[#1c1f2e]">2 से 3 कार्यदिवसों</strong> के भीतर शुरू की जाएगी।',
    claim_tab2_d2_num: "02",
    claim_tab2_d2_title: "सत्यापन आवश्यकता",
    claim_tab2_d2_desc:
      "प्रोसेसिंग विंडो हमारी सुविधा पर शिपमेंट की भौतिक प्राप्ति और सफल सत्यापन के बाद ही शुरू होती है।",
    claim_tab2_d3_num: "03",
    claim_tab2_d3_title: "शर्त",
    claim_tab2_d3_desc:
      "शिपमेंट अक्षुण्ण होनी चाहिए और प्रारंभिक सेवा समझौते के अनुसार वापसी-आधारित धनवापसी के मानदंडों को पूरा करना चाहिए।",
    claim_tab3_title: "खोए, क्षतिग्रस्त या नष्ट शिपमेंट के दावे",
    claim_tab3_subtext:
      "खोए, क्षतिग्रस्त, नष्ट या वाहक द्वारा विलंबित शिपमेंट को संभालने के दिशानिर्देश।",
    claim_tab3_panelTitle:
      "शिपमेंट के खो जाने, क्षतिग्रस्त होने, नष्ट होने या वाहक संबंधी मुद्दों के कारण महत्वपूर्ण विलंब की स्थिति में, निम्नलिखित प्रोटोकॉल लागू होते हैं:",
    claim_tab4_title: "सामान्य दावा प्रावधान",
    claim_tab4_subtext: "जब मानवी इंटरनेशनल जिम्मेदार नहीं है",
    claim_tab4_panelTitle:
      "कुछ मामलों में, हमारे नियंत्रण से बाहर के कारकों के कारण देरी या हानि हो सकती है। इन शर्तों को नीचे समझाया गया है।",
    claim_tab4_d1_num: "01",
    claim_tab4_d1_title: "फोर्स मेजर",
    claim_tab4_d1_desc:
      "मानवी इंटरनेशनल हमारे नियंत्रण से परे परिस्थितियों के कारण होने वाली देरी या हानि के लिए उत्तरदायी नहीं है, जिसमें कस्टम जब्ती, मौसम व्यवधान या राजनीतिक अस्थिरता शामिल है।",
    claim_tab4_d2_num: "02",
    claim_tab4_d2_title: "वाहक पुष्टि",
    claim_tab4_d2_desc:
      'हानि या विनाश के लिए कोई भी दावा तब तक स्वीकृत नहीं किया जाएगा जब तक संबंधित वाहक (DHL, FedEx या UPS) शिपमेंट को अपने वैश्विक ट्रैकिंग सिस्टम में आधिकारिक रूप से "खोया" या "क्षतिग्रस्त" घोषित न कर दे।',
    nocost_badge: "मूल्य निर्धारण और पारदर्शिता",
    nocost_title: "कोई छिपी लागत नहीं। कोई आश्चर्य नहीं।\nबस सीधा लॉजिस्टिक्स।",
    nocost_desc:
      "हम मूल्य-आधारित मूल्य निर्धारण में विश्वास रखते हैं। हमारी दरें गंतव्य, शिपमेंट वजन और डिलीवरी की तात्कालिकता के आधार पर सावधानीपूर्वक गणना की जाती हैं, इसलिए आप केवल वही भुगतान करते हैं जो वास्तव में मायने रखता है। कोई छिपा शुल्क नहीं, कोई आश्चर्यजनक अधिभार नहीं, और कोई अनावश्यक ओवरहेड नहीं। प्रदर्शन, विश्वसनीयता और दक्षता के आसपास पारदर्शी मूल्य निर्धारण।",
    nocost_btn: "दरें अनुरोध करें",
    prohibited_title: "प्रतिबंधित सामान",
    prohibited_desc:
      "हमारे नेटवर्क की अखंडता बनाए रखने के लिए, हम परिवहन नहीं करते:",
    prohibited_item1: "खतरनाक रसायन",
    prohibited_item2: "परक्राम्य मुद्रा",
    prohibited_item3: "खतरनाक सामान",
    prohibited_item4: "कीमती पत्थर",
    prohibited_item5: "अवैध या प्रतिबंधित माल",
    prohibited_btn: "विस्तृत सूची",
    faq_badge: "सामान्य प्रश्न",
    faq_title: "प्रश्न? हमें खुशी है कि आपने पूछा",
    faq_q1: "मैं अपने पैकेज कहाँ भेज सकता हूँ?",
    faq_a1:
      "लगभग कहीं भी! USA, कनाडा, UK, यूरोप और ऑस्ट्रेलिया में हमारी मजबूत उपस्थिति है। चाहे बड़ा शहर हो या शांत उपनगर, हम इसे वहां पहुंचाएंगे।",
    faq_q2: "मुझे कैसे पता चलेगा कि मुझे उचित मूल्य मिल रहा है?",
    faq_a2:
      "हम मूल्य में विश्वास करते हैं। आपका कोटेशन वजन, गंतव्य और डिलीवरी की गति के आधार पर बिल्कुल उस पर आधारित है जो आपको चाहिए। हम भुगतान के समय कोई छिपा आश्चर्य नहीं का वादा करते हैं।",
    faq_q3: "क्या मैं अभी देख सकता हूँ कि मेरा पैकेज कहाँ है?",
    faq_a3:
      "हाँ! जैसे ही आप हमारे साथ शिप करते हैं, आपको एक अनूठा ट्रैकिंग नंबर मिलेगा। आप रियल-टाइम में अपने पैकेज की यात्रा देख सकते हैं, जिससे आपको पूरा आत्मविश्वास मिलता है।",
    faq_q4: "यदि कोई देरी या समस्या हो तो क्या होगा?",
    faq_a4:
      "हम जानते हैं कि आपके शिपमेंट महत्वपूर्ण हैं। यदि कुछ गलत होता है, तो हम यहाँ मदद के लिए हैं। उचित और संपूर्ण समाधान सुनिश्चित करने के लिए, हमारी टीम और हमारे वैश्विक साझेदार (जैसे DHL, FedEx और UPS) एक विस्तृत जांच करते हैं।",
    faq_q5: "क्या कुछ ऐसा है जो मैं शिप नहीं कर सकता?",
    faq_a5:
      "सभी को सुरक्षित रखने और अंतर्राष्ट्रीय कानूनों का पालन करने के लिए, हम खतरनाक रसायन, मुद्रा, कीमती पत्थर या अवैध वस्तुएं शिप नहीं कर सकते। यदि आप किसी वस्तु के बारे में सुनिश्चित नहीं हैं, तो बस हमें कॉल करें! हम बुकिंग से पहले आपके लिए जांचने में खुश हैं।",
    contact_badge: "संपर्क करें",
    contact_title: "हम आपके लिए यहाँ हैं",
    contact_desc:
      "हम मूल्य में विश्वास करते हैं। आपका कोटेशन वजन, गंतव्य और डिलीवरी की गति के आधार पर बिल्कुल उस पर आधारित है जो आपको चाहिए। हम भुगतान के समय कोई छिपा आश्चर्य नहीं का वादा करते हैं।",
    contact_call: "हमें कॉल करें",
    contact_whatsapp: "व्हाट्सएप करें",
    contact_info: "संपर्क जानकारी",
    footer_tagline: "परिवारों को जोड़ना, दूरियां मिटाना",
    footer_desc:
      "10,000+ खुश ग्राहकों द्वारा भरोसेमंद और 50,000 से अधिक सफल अंतर्राष्ट्रीय शिपमेंट के साथ, हम तेज़, सुरक्षित और निर्बाध कूरियर और माल समाधान प्रदान करते हैं।",
    footer_social: "सोशल नेटवर्क",
    footer_quick_links: "त्वरित लिंक",
    footer_office_info: "कार्यालय जानकारी",
    footer_rights: "सर्वाधिकार सुरक्षित।",
    form_select_dest: "गंतव्य देश चुनें",
    form_select_euro: "यूरोपीय देश चुनें",
    form_select_country: "देश चुनें",
    form_zipcode: "पिनकोड / पोस्टकोड",
    form_actual_wt: "वास्तविक वजन (किग्रा)",
    form_vol_wt_dim: "वॉल्यूम वजन आयाम (सेमी) — वैकल्पिक",
    form_length: "लंबाई",
    form_breadth: "चौड़ाई",
    form_height: "ऊंचाई",
    form_vol_wt: "वॉल्यूम वजन:",
    form_chargeable: "प्रभार्य:",
    form_calculating: "गणना कर रहा है...",
    form_selected: "चयनित",
    form_zone: "ज़ोन",
    form_slab: "स्लैब दर",
    form_per_kg: "प्रति किग्रा",
    form_duty_paid: "शुल्क का भुगतान किया गया",
    form_duty_unpaid: "शुल्क का भुगतान नहीं किया गया",
    form_gst_inc: "जीएसटी सहित",
    form_final_rates_msg:
      "अंतिम दरें भिन्न हो सकती हैं · पुष्टि के लिए +91 7070-506070 पर कॉल करें",
    form_services_found: "सेवाएं मिलीं",
    form_services_found_text: "सेवा(एं) मिली(ं)",
    quote_banner_title: "कोटेशन लें",
    quote_banner_sub:
      "सेवाओं और दरों की तुरंत तुलना करने के लिए अपने शिपमेंट विवरण दर्ज करें।",
    quote_instant_est: "त्वरित अनुमान",
    quote_heading: "परिवारों को जोड़ना,\nदूरियां मिटाना।",
    quote_subheading:
      "दुनिया भर में दस्तावेज़, पार्सल, उपहार या वाणिज्यिक शिपमेंट भेजें।",
    quote_empty_title: "आपके कोटेशन यहां दिखाई देंगे",
    quote_empty_sub:
      'सेवाओं की तुलना करने के लिए फॉर्म भरें और "कोटेशन लें" पर क्लिक करें',
    quote_loading_msg: "सभी कैरियर्स से दरें प्राप्त की जा रही हैं…",
    quote_how_calc_title: "आपके कोटेशन की गणना कैसे की जाती है?",
    quote_how_calc_1_title: "प्रभार्य वजन",
    quote_how_calc_1_desc:
      "हम वास्तविक वजन बनाम वॉल्यूमेट्रिक वजन (L × B × H ÷ 5000) में से जो भी अधिक हो, उसका उपयोग करते हैं, जिसे निकटतम किग्रा तक पूर्णांकित किया जाता है।",
    quote_how_calc_2_title: "सेवा और ज़ोन",
    quote_how_calc_2_desc:
      "ऑस्ट्रेलिया/कनाडा के लिए आपका पिनकोड डिलीवरी ज़ोन निर्धारित करता है। यूरोप और अंतर्राष्ट्रीय गंतव्य देश-आधारित ज़ोन मैपिंग का उपयोग करते हैं।",
    quote_how_calc_3_title: "दर आवेदन",
    quote_how_calc_3_desc:
      "स्लैब दरें (S) प्रति वजन ब्रैकेट एक निश्चित राशि हैं। प्रति-किग्रा दरें (B) आपके प्रभार्य वजन से गुणा की जाती हैं। सभी दरें जीएसटी-सहित हैं।",
    quote_faq_badge: "क्या कोई प्रश्न हैं?",
    quote_faq_title: "अक्सर पूछे जाने वाले प्रश्न",
    bespoke_read_more: "और पढ़ें • और पढ़ें •",
  },

  pa: {
    nav_about: "ਸਾਡੇ ਬਾਰੇ",
    nav_services: "ਸੇਵਾਵਾਂ",
    nav_track: "ਹੁਣੇ ਟਰੈਕ ਕਰੋ",
    nav_quote: "ਕੋਟੇਸ਼ਨ ਲਓ",
    nav_contact: "ਸੰਪਰਕ ਕਰੋ",
    nav_home: "ਹੋਮ",
    nav_zipcode: "ਸੇਵਾ ਯੋਗ ਪਿੰਨਕੋਡ",
    nav_language: "ਭਾਸ਼ਾ",
    nav_track_shipment: "ਸ਼ਿਪਮੈਂਟ ਟਰੈਕ ਕਰੋ",
    bc_about: "ਸਾਡੇ ਬਾਰੇ",
    bc_track: "ਸ਼ਿਪਮੈਂਟ ਟਰੈਕ ਕਰੋ",
    bc_zipcode: "ਸੇਵਾ ਯੋਗ ਪਿੰਨਕੋਡ",
    bc_contact: "ਸੰਪਰਕ ਕਰੋ",
    bc_quote: "ਕੋਟੇਸ਼ਨ ਲਓ",
    bc_faq: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
    bc_services: "ਸੇਵਾਵਾਂ",
    bc_business_campaign: "ਬਿਜ਼ਨਸ ਮੁਹਿੰਮ",
    hero_headline: "ਮਹਾਂਦੀਪਾਂ ਨੂੰ ਜੋੜਨਾ, ਭਰੋਸਾ ਪਹੁੰਚਾਉਣਾ।",
    hero_subtext:
      "ਦਸਤਾਵੇਜ਼, ਪਾਰਸਲ, ਖਾਣ-ਪੀਣ ਦਾ ਸਾਮਾਨ, ਤੋਹਫ਼ੇ ਜਾਂ ਵਪਾਰਕ ਸ਼ਿਪਮੈਂਟ ਵਿਸ਼ਵਾਸ ਨਾਲ ਭੇਜੋ।",
    hero_pickup: "ਪਿਕਅੱਪ ਸਥਾਨ",
    hero_drop: "ਡਿਲੀਵਰੀ ਸਥਾਨ",
    hero_weight: "ਭਾਰ (ਕਿਲੋ)",
    hero_service: "ਸੇਵਾ",
    hero_content: "ਸਮੱਗਰੀ",
    hero_get_quote: "ਕੋਟੇਸ਼ਨ ਲਓ",
    hero_estimated_cost: "ਅਨੁਮਾਨਿਤ ਲਾਗਤ",
    hero_est_delivery: "ਅਨੁਮਾਨਿਤ ਡਿਲੀਵਰੀ",
    hero_days: "ਦਿਨ",
    hero_read_more: "ਹੋਰ ਪੜ੍ਹੋ",
    hero_legacy_badge: "ਮਾਨਵੀ ਵਿਰਾਸਤ",
    hero_legacy_heading: "ਅਸੀਂ ਸਿਰਫ਼ ਪਾਰਸਲ ਨਹੀਂ ਭੇਜਦੇ;",
    hero_legacy_highlight: "ਅਸੀਂ ਦੂਰੀਆਂ ਮਿਟਾਉਂਦੇ ਹਾਂ।",
    hero_whatsapp: "•ਵਟਸਐਪ ਕਰੋ •ਵਟਸਐਪ ਕਰੋ •",
    hero_doc_express: "ਦਸਤਾਵੇਜ਼ ਐਕਸਪ੍ਰੈਸ",
    hero_parcel_shipping: "ਪਾਰਸਲ ਸ਼ਿਪਿੰਗ",
    hero_cargo_express: "ਕਾਰਗੋ ਐਕਸਪ੍ਰੈਸ",
    hero_serviceable_zipcodes: "ਸੇਵਾ ਯੋਗ ਪਿੰਨਕੋਡ",
    hero_our_services: "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ",
    hero_contact_us: "ਸੰਪਰਕ ਕਰੋ",
    partners_title: "ਸਾਡੇ ਡਿਲੀਵਰੀ\nਸਾਂਝੇਦਾਰ ✈",
    bespoke_badge: "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ",
    bespoke_title: "ਵਿਸ਼ੇਸ਼ ਸ਼ਿਪਿੰਗ ਹੱਲ।",
    bespoke_acc1_num: "01",
    bespoke_acc1_title: "ਵਿਸ਼ਵਵਿਆਪੀ ਨਿੱਜੀ ਲੌਜਿਸਟਿਕਸ",
    bespoke_acc1_desc:
      "ਵਿਸ਼ਵ ਭਰ ਵਿੱਚ ਨਿੱਜੀ ਸਾਮਾਨ ਲਿਜਾਣ ਵਾਲੇ ਵਿਅਕਤੀਆਂ ਲਈ ਭਰੋਸੇਯੋਗ ਲੌਜਿਸਟਿਕਸ।",
    bespoke_acc1_card1_title: "ਦਰਵਾਜ਼ੇ ਤੋਂ ਦਰਵਾਜ਼ੇ ਡਿਲੀਵਰੀ",
    bespoke_acc1_card1_desc:
      "ਸਿੱਧੇ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੋਂ ਤੇਜ਼ ਅਤੇ ਸੁਰੱਖਿਅਤ ਪਾਰਸਲ ਪਿਕਅੱਪ।",
    bespoke_acc1_card2_title: "ਵਿਸ਼ਵ ਸਾਮਾਨ ਸ਼ਿਪਿੰਗ",
    bespoke_acc1_card2_desc:
      "ਸਰਹੱਦਾਂ ਪਾਰ ਤੁਹਾਡਾ ਨਿੱਜੀ ਸਾਮਾਨ ਬਿਨਾਂ ਕਿਸੇ ਪਰੇਸ਼ਾਨੀ ਦੇ।",
    bespoke_acc1_card3_title: "ਕਸਟਮ ਕਲੀਅਰੈਂਸ ਸਹਾਇਤਾ",
    bespoke_acc1_card3_desc:
      "ਸੁਚਾਰੂ ਆਗਮਨ ਲਈ ਮਿਆਰੀ ਕਸਟਮ ਦਸਤਾਵੇਜ਼ੀਕਰਨ ਵਿੱਚ ਸਹਾਇਤਾ।",
    bespoke_acc2_num: "02",
    bespoke_acc2_title: "ਐਂਟਰਪ੍ਰਾਈਜ਼ ਅਤੇ ਬਲਕ ਹੱਲ",
    bespoke_acc2_desc:
      "ਸਟੀਕਤਾ ਦੀ ਮੰਗ ਕਰਨ ਵਾਲੇ ਕਾਰੋਬਾਰਾਂ ਲਈ ਸਪਲਾਈ ਚੇਨ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰਨਾ।",
    bespoke_acc2_card1_title: "ਰਣਨੀਤਕ ਬਲਕ ਸ਼ਿਪਿੰਗ",
    bespoke_acc2_card1_desc: "ਅਨੁਕੂਲਿਤ ਲਾਗਤ ਢਾਂਚਿਆਂ ਨਾਲ ਵੱਡੇ ਪੱਧਰ ਦੀ ਆਵਾਜਾਈ।",
    bespoke_acc2_card2_title: "ਖਾਤਾ ਪ੍ਰਬੰਧਨ",
    bespoke_acc2_card2_desc:
      "ਤੁਹਾਡੀ ਵਪਾਰਕ ਲੌਜਿਸਟਿਕਸ ਨੂੰ ਸੰਭਾਲਣ ਲਈ ਸਮਰਪਿਤ ਮਾਹਰ।",
    bespoke_acc2_card3_title: "ਨਿਰਵਿਘਨ ਏਕੀਕਰਨ",
    bespoke_acc2_card3_desc: "ਤੁਹਾਡੀ ਕਾਰੋਬਾਰੀ ਤਾਲ ਅਨੁਸਾਰ ਨਿਯਮਿਤ ਪਿਕਅੱਪ।",
    wwl_badge: "ਮਾਨਵੀ ਦਾ ਫ਼ਾਇਦਾ",
    wwl_title: "ਅਸੀਂ ਕਿਉਂ ਅਗਵਾਈ ਕਰਦੇ ਹਾਂ",
    wwl_card1_label: "ਡਿਲੀਵਰੀ ਸਫਲਤਾ",
    wwl_card1_desc: "ਸ਼ੁੱਧਤਾ ਅਤੇ ਦੇਖਭਾਲ ਨਾਲ ਸਫਲ ਅੰਤਰਰਾਸ਼ਟਰੀ ਡਿਲੀਵਰੀ।",
    wwl_card2_label: "ਉੱਤਮ ਸਾਂਝੇਦਾਰੀ",
    wwl_card2_stat: "ਕਈ\nਦੇਸ਼",
    wwl_card2_desc:
      "DHL, FedEx, UPS ਅਤੇ Aramex ਸਮੇਤ ਵਿਸ਼ਵ ਪੱਧਰੀ ਕੈਰੀਅਰਾਂ ਨਾਲ ਸਹਿਯੋਗ।",
    wwl_card3_label: "ਕਸਟਮ ਮੁਹਾਰਤ",
    wwl_card3_stat: "1000+",
    wwl_card3_desc:
      "ਵਿਸ਼ਵ ਸਰਹੱਦਾਂ ਨੂੰ ਆਸਾਨੀ ਨਾਲ ਪਾਰ ਕਰਨ ਲਈ ਮਾਹਰ ਦਸਤਾਵੇਜ਼ ਸਹਾਇਤਾ।",
    wwl_card4_label: "ਤਕਨੀਕੀ ਬੜ੍ਹਤ",
    wwl_card4_stat: "ਰੀਅਲ-ਟਾਈਮ\nਅੱਪਡੇਟ",
    wwl_card4_desc:
      "ਪੂਰੀ ਮਾਨਸਿਕ ਸ਼ਾਂਤੀ ਲਈ ਸ਼ੁਰੂ ਤੋਂ ਅੰਤ ਤੱਕ ਰੀਅਲ-ਟਾਈਮ ਟਰੈਕਿੰਗ।",
    claim_badge: "ਵਿਆਪਕ ਨੀਤੀਆਂ",
    claim_title: "ਸਾਡੀ ਵਾਪਸੀ ਅਤੇ ਨੁਕਸਾਨ ਦਾਅਵਾ ਨੀਤੀ",
    claim_intro:
      "ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਭਰੋਸੇਯੋਗ ਅੰਤਰਰਾਸ਼ਟਰੀ ਲੌਜਿਸਟਿਕਸ ਸੇਵਾਵਾਂ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਵਚਨਬੱਧ ਹੈ। ਹਾਲਾਂਕਿ, ਆਵਾਜਾਈ ਅਨਿਯਮਿਤਤਾਵਾਂ ਦੀ ਸਥਿਤੀ ਵਿੱਚ, ਹੇਠਾਂ ਦਿੱਤੀ ਨੀਤੀ ਦਾਅਵਿਆਂ ਦੇ ਹੱਲ ਲਈ ਰਸਮੀ ਪ੍ਰਕਿਰਿਆਵਾਂ ਦੀ ਰੂਪਰੇਖਾ ਦਿੰਦੀ ਹੈ।",
    claim_tab1_title: "ਆਮ ਦਾਅਵਾ ਉਪਬੰਧ",
    claim_tab1_subtext:
      "ਵਾਪਸੀ ਜਾਂ ਨੁਕਸਾਨ ਦੇ ਸਾਰੇ ਦਾਅਵਿਆਂ ਨੂੰ ਰਸਮੀ ਜਾਂਚ ਪ੍ਰਕਿਰਿਆ ਵਿੱਚੋਂ ਲੰਘਣਾ ਪਵੇਗਾ।",
    claim_tab1_panelTitle:
      "ਵਾਪਸੀ ਜਾਂ ਨੁਕਸਾਨ ਦੇ ਸਾਰੇ ਦਾਅਵਿਆਂ ਨੂੰ ਰਸਮੀ ਜਾਂਚ ਪ੍ਰਕਿਰਿਆ ਵਿੱਚੋਂ ਲੰਘਣਾ ਪਵੇਗਾ।",
    claim_tab1_d1_num: "01",
    claim_tab1_d1_title: "ਲਾਜ਼ਮੀ ਜਾਂਚ ਵਿੰਡੋ",
    claim_tab1_d1_desc:
      "ਕਿਸੇ ਵੀ ਦਾਅਵੇ ਦੀ ਪ੍ਰਕਿਰਿਆ ਕਰਨ ਲਈ ਘੱਟੋ-ਘੱਟ 25 ਕਾਰੋਬਾਰੀ ਦਿਨ ਲੋੜੀਂਦੇ ਹਨ।",
    claim_tab1_d2_num: "02",
    claim_tab1_d2_title: "ਨਿਪਟਾਰਾ ਪ੍ਰੋਟੋਕੋਲ",
    claim_tab1_d2_desc:
      'ਕਿਸੇ ਵੀ ਹਾਲਤ ਵਿੱਚ ਦਾਅਵਿਆਂ ਦਾ ਨਿਪਟਾਰਾ "ਤੁਰੰਤ" ਜਾਂ ਰਸਮੀ ਤਸਦੀਕ ਪ੍ਰਕਿਰਿਆ ਪੂਰੀ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਨਹੀਂ ਕੀਤਾ ਜਾਵੇਗਾ।',
    claim_tab1_d3_num: "03",
    claim_tab1_d3_title: "ਤੀਜੀ-ਧਿਰ ਨਿਰਭਰਤਾ",
    claim_tab1_d3_desc:
      'ਇੱਕ ਅੰਤਰਰਾਸ਼ਟਰੀ ਲੌਜਿਸਟਿਕਸ ਪ੍ਰਦਾਤਾ ਵਜੋਂ, ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਦਾ ਦਾਅਵਾ ਹੱਲ ਸਾਡੇ ਵਿਸ਼ਵ ਕੂਰੀਅਰ ਸਾਂਝੇਦਾਰਾਂ ਤੋਂ ਅਧਿਕਾਰਤ ਜਾਂਚ ਰਿਪੋਰਟਾਂ \'ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ, ਜਿਸ ਵਿੱਚ <strong class="font-extrabold text-[#1c1f2e]">DHL, FedEx ਅਤੇ UPS</strong> ਸ਼ਾਮਲ ਹਨ।',
    claim_tab2_title: "ਮੂਲ ਸਥਾਨ ਵਾਪਸੀ (RTO) ਸ਼ਿਪਮੈਂਟ",
    claim_tab2_subtext:
      "ਗੈਰ-ਡਿਲੀਵਰੀ, ਗਲਤ ਪਤੇ ਜਾਂ ਇਨਕਾਰ ਲਈ ਵਾਪਸ ਕੀਤੇ ਸ਼ਿਪਮੈਂਟ ਵਾਪਸੀ ਦੇ ਯੋਗ ਹਨ।",
    claim_tab2_panelTitle:
      "ਗੈਰ-ਡਿਲੀਵਰੀ, ਗਲਤ ਪਤੇ ਜਾਂ ਪ੍ਰਾਪਤਕਰਤਾ ਦੇ ਇਨਕਾਰ ਕਾਰਨ ਮੂਲ ਸਥਾਨ 'ਤੇ ਵਾਪਸ ਕੀਤੇ ਸ਼ਿਪਮੈਂਟ ਸੁਚਾਰੂ ਵਾਪਸੀ ਪ੍ਰਕਿਰਿਆ ਲਈ ਯੋਗ ਹਨ।",
    claim_tab2_d1_num: "01",
    claim_tab2_d1_title: "ਪ੍ਰਕਿਰਿਆ ਸਮਾਂ-ਸੀਮਾ",
    claim_tab2_d1_desc:
      'RTO ਸ਼ਿਪਮੈਂਟਾਂ ਲਈ ਵਾਪਸੀ <strong class="font-extrabold text-[#1c1f2e]">2 ਤੋਂ 3 ਕਾਰੋਬਾਰੀ ਦਿਨਾਂ</strong> ਵਿੱਚ ਸ਼ੁਰੂ ਕੀਤੀ ਜਾਵੇਗੀ।',
    claim_tab2_d2_num: "02",
    claim_tab2_d2_title: "ਤਸਦੀਕ ਲੋੜ",
    claim_tab2_d2_desc:
      "ਪ੍ਰਕਿਰਿਆ ਵਿੰਡੋ ਕੇਵਲ ਸਾਡੀ ਸੁਵਿਧਾ 'ਤੇ ਸ਼ਿਪਮੈਂਟ ਦੀ ਭੌਤਿਕ ਪ੍ਰਾਪਤੀ ਅਤੇ ਸਫਲ ਤਸਦੀਕ ਤੋਂ ਬਾਅਦ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ।",
    claim_tab2_d3_num: "03",
    claim_tab2_d3_title: "ਸ਼ਰਤ",
    claim_tab2_d3_desc:
      "ਸ਼ਿਪਮੈਂਟ ਬਰਕਰਾਰ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ ਅਤੇ ਸ਼ੁਰੂਆਤੀ ਸੇਵਾ ਸਮਝੌਤੇ ਅਨੁਸਾਰ ਵਾਪਸੀ-ਅਧਾਰਿਤ ਵਾਪਸੀ ਦੇ ਮਾਪਦੰਡਾਂ ਨੂੰ ਪੂਰਾ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ।",
    claim_tab3_title: "ਗੁੰਮ, ਖਰਾਬ ਜਾਂ ਨਸ਼ਟ ਸ਼ਿਪਮੈਂਟਾਂ ਦੇ ਦਾਅਵੇ",
    claim_tab3_subtext:
      "ਗੁੰਮ, ਖਰਾਬ, ਨਸ਼ਟ ਜਾਂ ਕੈਰੀਅਰ ਦੁਆਰਾ ਦੇਰੀ ਨਾਲ ਕੀਤੇ ਸ਼ਿਪਮੈਂਟਾਂ ਦੇ ਪ੍ਰਬੰਧਨ ਲਈ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼।",
    claim_tab3_panelTitle:
      "ਕਿਸੇ ਸ਼ਿਪਮੈਂਟ ਦੇ ਗੁੰਮ, ਖਰਾਬ, ਨਸ਼ਟ ਜਾਂ ਕੈਰੀਅਰ-ਸੰਬੰਧੀ ਮੁੱਦਿਆਂ ਕਾਰਨ ਮਹੱਤਵਪੂਰਨ ਦੇਰੀ ਦੀ ਸਥਿਤੀ ਵਿੱਚ, ਹੇਠਾਂ ਦਿੱਤੇ ਪ੍ਰੋਟੋਕੋਲ ਲਾਗੂ ਹੁੰਦੇ ਹਨ:",
    claim_tab4_title: "ਆਮ ਦਾਅਵਾ ਉਪਬੰਧ",
    claim_tab4_subtext: "ਜਦੋਂ ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ",
    claim_tab4_panelTitle:
      "ਕੁਝ ਮਾਮਲਿਆਂ ਵਿੱਚ, ਸਾਡੇ ਨਿਯੰਤਰਣ ਤੋਂ ਬਾਹਰ ਦੇ ਕਾਰਕਾਂ ਕਾਰਨ ਦੇਰੀ ਜਾਂ ਨੁਕਸਾਨ ਹੋ ਸਕਦਾ ਹੈ। ਇਹਨਾਂ ਸ਼ਰਤਾਂ ਦੀ ਵਿਆਖਿਆ ਹੇਠਾਂ ਕੀਤੀ ਗਈ ਹੈ।",
    claim_tab4_d1_num: "01",
    claim_tab4_d1_title: "ਫੋਰਸ ਮੇਜੇਅਰ",
    claim_tab4_d1_desc:
      "ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਸਾਡੇ ਨਿਯੰਤਰਣ ਤੋਂ ਪਰੇ ਹਾਲਾਤਾਂ ਕਾਰਨ ਹੋਣ ਵਾਲੀ ਦੇਰੀ ਜਾਂ ਨੁਕਸਾਨ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹੈ।",
    claim_tab4_d2_num: "02",
    claim_tab4_d2_title: "ਕੈਰੀਅਰ ਪੁਸ਼ਟੀ",
    claim_tab4_d2_desc:
      'ਨੁਕਸਾਨ ਜਾਂ ਵਿਨਾਸ਼ ਲਈ ਕੋਈ ਵੀ ਦਾਅਵਾ ਉਦੋਂ ਤੱਕ ਮਨਜ਼ੂਰ ਨਹੀਂ ਕੀਤਾ ਜਾਵੇਗਾ ਜਦੋਂ ਤੱਕ ਸੰਬੰਧਿਤ ਕੈਰੀਅਰ (DHL, FedEx ਜਾਂ UPS) ਸ਼ਿਪਮੈਂਟ ਨੂੰ ਅਧਿਕਾਰਤ ਤੌਰ \'ਤੇ "ਗੁੰਮ" ਜਾਂ "ਖਰਾਬ" ਘੋਸ਼ਿਤ ਨਹੀਂ ਕਰਦਾ।',
    nocost_badge: "ਕੀਮਤ ਅਤੇ ਪਾਰਦਰਸ਼ਿਤਾ",
    nocost_title:
      "ਕੋਈ ਲੁਕਵੀਂ ਲਾਗਤ ਨਹੀਂ। ਕੋਈ ਹੈਰਾਨੀ ਨਹੀਂ।\nਬੱਸ ਸਿੱਧਾ ਲੌਜਿਸਟਿਕਸ।",
    nocost_desc:
      "ਅਸੀਂ ਮੁੱਲ-ਅਧਾਰਿਤ ਕੀਮਤ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਕਰਦੇ ਹਾਂ। ਸਾਡੀਆਂ ਦਰਾਂ ਮੰਜ਼ਿਲ, ਸ਼ਿਪਮੈਂਟ ਭਾਰ ਅਤੇ ਡਿਲੀਵਰੀ ਦੀ ਜ਼ਰੂਰਤ ਦੇ ਆਧਾਰ 'ਤੇ ਸਾਵਧਾਨੀ ਨਾਲ ਗਣਨਾ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ। ਕੋਈ ਲੁਕਿਆ ਚਾਰਜ ਨਹੀਂ, ਕੋਈ ਅਚਾਨਕ ਸਰਚਾਰਜ ਨਹੀਂ।",
    nocost_btn: "ਦਰਾਂ ਦੀ ਬੇਨਤੀ ਕਰੋ",
    prohibited_title: "ਪਾਬੰਦੀਸ਼ੁਦਾ ਸਾਮਾਨ",
    prohibited_desc: "ਸਾਡੇ ਨੈੱਟਵਰਕ ਦੀ ਅਖੰਡਤਾ ਬਣਾਈ ਰੱਖਣ ਲਈ, ਅਸੀਂ ਇਹ ਨਹੀਂ ਭੇਜਦੇ:",
    prohibited_item1: "ਖਤਰਨਾਕ ਰਸਾਇਣ",
    prohibited_item2: "ਪਰਕਰਾਮਯੋਗ ਮੁਦਰਾ",
    prohibited_item3: "ਖਤਰਨਾਕ ਸਾਮਾਨ",
    prohibited_item4: "ਕੀਮਤੀ ਪੱਥਰ",
    prohibited_item5: "ਗੈਰਕਾਨੂੰਨੀ ਜਾਂ ਪਾਬੰਦੀਸ਼ੁਦਾ ਮਾਲ",
    prohibited_btn: "ਵਿਸਤ੍ਰਿਤ ਸੂਚੀ",
    faq_badge: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
    faq_title: "ਸਵਾਲ? ਚੰਗਾ ਲੱਗਾ ਕਿ ਤੁਸੀਂ ਪੁੱਛਿਆ",
    faq_q1: "ਮੈਂ ਆਪਣੇ ਪੈਕੇਜ ਕਿੱਥੇ ਭੇਜ ਸਕਦਾ ਹਾਂ?",
    faq_a1:
      "ਲਗਭਗ ਕਿਤੇ ਵੀ! USA, ਕੈਨੇਡਾ, UK, ਯੂਰਪ ਅਤੇ ਆਸਟ੍ਰੇਲੀਆ ਵਿੱਚ ਸਾਡੀ ਮਜ਼ਬੂਤ ਮੌਜੂਦਗੀ ਹੈ। ਭਾਵੇਂ ਵੱਡਾ ਸ਼ਹਿਰ ਹੋਵੇ ਜਾਂ ਸ਼ਾਂਤ ਉਪਨਗਰ, ਅਸੀਂ ਇਸਨੂੰ ਉੱਥੇ ਪਹੁੰਚਾਵਾਂਗੇ।",
    faq_q2: "ਮੈਨੂੰ ਕਿਵੇਂ ਪਤਾ ਚੱਲੇਗਾ ਕਿ ਮੈਨੂੰ ਉਚਿਤ ਕੀਮਤ ਮਿਲ ਰਹੀ ਹੈ?",
    faq_a2:
      "ਅਸੀਂ ਮੁੱਲ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਕਰਦੇ ਹਾਂ। ਤੁਹਾਡਾ ਕੋਟੇਸ਼ਨ ਭਾਰ, ਮੰਜ਼ਿਲ ਅਤੇ ਡਿਲੀਵਰੀ ਦੀ ਗਤੀ ਦੇ ਆਧਾਰ 'ਤੇ ਹੈ। ਅਸੀਂ ਭੁਗਤਾਨ ਦੇ ਸਮੇਂ ਕੋਈ ਲੁਕਿਆ ਆਸ਼ਚਰਜ ਨਾ ਹੋਣ ਦਾ ਵਾਅਦਾ ਕਰਦੇ ਹਾਂ।",
    faq_q3: "ਕੀ ਮੈਂ ਹੁਣੇ ਦੇਖ ਸਕਦਾ ਹਾਂ ਕਿ ਮੇਰਾ ਪੈਕੇਜ ਕਿੱਥੇ ਹੈ?",
    faq_a3:
      "ਹਾਂ! ਜਿਵੇਂ ਹੀ ਤੁਸੀਂ ਸਾਡੇ ਨਾਲ ਸ਼ਿਪ ਕਰਦੇ ਹੋ, ਤੁਹਾਨੂੰ ਇੱਕ ਵਿਲੱਖਣ ਟਰੈਕਿੰਗ ਨੰਬਰ ਮਿਲੇਗਾ। ਤੁਸੀਂ ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਆਪਣੇ ਪੈਕੇਜ ਦੀ ਯਾਤਰਾ ਦੇਖ ਸਕਦੇ ਹੋ, ਜੋ ਤੁਹਾਨੂੰ ਪੂਰਾ ਭਰੋਸਾ ਦਿੰਦਾ ਹੈ।",
    faq_q4: "ਜੇ ਕੋਈ ਦੇਰੀ ਜਾਂ ਸਮੱਸਿਆ ਹੋਵੇ ਤਾਂ ਕੀ ਹੋਵੇਗਾ?",
    faq_a4:
      "ਅਸੀਂ ਜਾਣਦੇ ਹਾਂ ਕਿ ਤੁਹਾਡੇ ਸ਼ਿਪਮੈਂਟ ਮਹੱਤਵਪੂਰਨ ਹਨ। ਜੇ ਕੁਝ ਗਲਤ ਹੁੰਦਾ ਹੈ, ਅਸੀਂ ਮਦਦ ਲਈ ਇੱਥੇ ਹਾਂ। ਉਚਿਤ ਅਤੇ ਸੰਪੂਰਨ ਹੱਲ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ, ਸਾਡੀ ਟੀਮ ਅਤੇ ਸਾਡੇ ਵਿਸ਼ਵ ਸਾਂਝੇਦਾਰ (ਜਿਵੇਂ DHL, FedEx ਅਤੇ UPS) ਇੱਕ ਵਿਸਤ੍ਰਿਤ ਜਾਂਚ ਕਰਦੇ ਹਨ।",
    faq_q5: "ਕੀ ਕੁਝ ਅਜਿਹਾ ਹੈ ਜੋ ਮੈਂ ਭੇਜ ਨਹੀਂ ਸਕਦਾ?",
    faq_a5:
      "ਸਾਰਿਆਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖਣ ਅਤੇ ਅੰਤਰਰਾਸ਼ਟਰੀ ਕਾਨੂੰਨਾਂ ਦੀ ਪਾਲਣਾ ਕਰਨ ਲਈ, ਅਸੀਂ ਖਤਰਨਾਕ ਰਸਾਇਣ, ਮੁਦਰਾ, ਕੀਮਤੀ ਪੱਥਰ ਜਾਂ ਗੈਰਕਾਨੂੰਨੀ ਵਸਤੂਆਂ ਨਹੀਂ ਭੇਜ ਸਕਦੇ। ਜੇ ਤੁਸੀਂ ਕਿਸੇ ਚੀਜ਼ ਬਾਰੇ ਯਕੀਨੀ ਨਹੀਂ ਹੋ, ਤਾਂ ਬੱਸ ਸਾਨੂੰ ਕਾਲ ਕਰੋ! ਅਸੀਂ ਬੁਕਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਡੇ ਲਈ ਜਾਂਚ ਕਰਨ ਵਿੱਚ ਖੁਸ਼ ਹਾਂ।",
    contact_badge: "ਸੰਪਰਕ ਕਰੋ",
    contact_title: "ਅਸੀਂ ਤੁਹਾਡੇ ਲਈ ਇੱਥੇ ਹਾਂ",
    contact_desc:
      "ਅਸੀਂ ਮੁੱਲ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਕਰਦੇ ਹਾਂ। ਤੁਹਾਡਾ ਕੋਟੇਸ਼ਨ ਭਾਰ, ਮੰਜ਼ਿਲ ਅਤੇ ਡਿਲੀਵਰੀ ਦੀ ਗਤੀ ਦੇ ਆਧਾਰ 'ਤੇ ਹੈ। ਭੁਗਤਾਨ ਸਮੇਂ ਕੋਈ ਲੁਕਿਆ ਖਰਚਾ ਨਹੀਂ।",
    contact_call: "ਸਾਨੂੰ ਕਾਲ ਕਰੋ",
    contact_whatsapp: "ਵਟਸਐਪ ਕਰੋ",
    contact_info: "ਸੰਪਰਕ ਜਾਣਕਾਰੀ",
    footer_tagline: "ਪਰਿਵਾਰਾਂ ਨੂੰ ਜੋੜਨਾ, ਦੂਰੀਆਂ ਮਿਟਾਉਣਾ",
    footer_desc:
      "10,000+ ਖੁਸ਼ ਗਾਹਕਾਂ ਦੁਆਰਾ ਭਰੋਸੇਯੋਗ ਅਤੇ 50,000 ਤੋਂ ਵੱਧ ਸਫਲ ਅੰਤਰਰਾਸ਼ਟਰੀ ਸ਼ਿਪਮੈਂਟਾਂ ਦੇ ਨਾਲ, ਅਸੀਂ ਤੇਜ਼, ਸੁਰੱਖਿਅਤ ਅਤੇ ਨਿਰਵਿਘਨ ਕੂਰੀਅਰ ਹੱਲ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ।",
    footer_social: "ਸੋਸ਼ਲ ਨੈੱਟਵਰਕ",
    footer_quick_links: "ਤੇਜ਼ ਲਿੰਕ",
    footer_office_info: "ਦਫ਼ਤਰ ਜਾਣਕਾਰੀ",
    footer_rights: "ਸਾਰੇ ਅਧਿਕਾਰ ਸੁਰੱਖਿਅਤ।",
    form_select_dest: "ਮੰਜ਼ਿਲ ਦੇਸ਼ ਚੁਣੋ",
    form_select_euro: "ਯੂਰਪੀ ਦੇਸ਼ ਚੁਣੋ",
    form_select_country: "ਦੇਸ਼ ਚੁਣੋ",
    form_zipcode: "ਪਿੰਨਕੋਡ / ਪੋਸਟਕੋਡ",
    form_actual_wt: "ਅਸਲ ਭਾਰ (ਕਿਲੋ)",
    form_vol_wt_dim: "ਵਾਲੀਅਮ ਭਾਰ ਦੇ ਮਾਪ (ਸੈ.ਮੀ.) — ਵਿਕਲਪਿਕ",
    form_length: "ਲੰਬਾਈ",
    form_breadth: "ਚੌੜਾਈ",
    form_height: "ਉਚਾਈ",
    form_vol_wt: "ਵਾਲੀਅਮ ਭਾਰ:",
    form_chargeable: "ਚਾਰਜਯੋਗ:",
    form_calculating: "ਗਣਨਾ ਕਰ ਰਿਹਾ ਹੈ...",
    form_selected: "ਚੁਣਿਆ ਗਿਆ",
    form_zone: "ਜ਼ੋਨ",
    form_slab: "ਸਲੈਬ ਦਰ",
    form_per_kg: "ਪ੍ਰਤੀ ਕਿਲੋ",
    form_duty_paid: "ਡਿਊਟੀ ਅਦਾ ਕੀਤੀ",
    form_duty_unpaid: "ਡਿਊਟੀ ਅਦਾ ਨਹੀਂ ਕੀਤੀ",
    form_gst_inc: "ਜੀ.ਐਸ.ਟੀ. ਸਮੇਤ",
    form_final_rates_msg:
      "ਅੰਤਿਮ ਦਰਾਂ ਵੱਖਰੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ · ਪੁਸ਼ਟੀ ਲਈ +91 7070-506070 'ਤੇ ਕਾਲ ਕਰੋ",
    form_services_found: "ਸੇਵਾਵਾਂ ਮਿਲੀਆਂ",
    form_services_found_text: "ਸੇਵਾ(ਵਾਂ) ਮਿਲੀ(ਆਂ)",
    quote_banner_title: "ਕੋਟੇਸ਼ਨ ਲਓ",
    quote_banner_sub:
      "ਸੇਵਾਵਾਂ ਅਤੇ ਦਰਾਂ ਦੀ ਤੁਰੰਤ ਤੁਲਨਾ ਕਰਨ ਲਈ ਆਪਣੇ ਸ਼ਿਪਮੈਂਟ ਵੇਰਵੇ ਦਰਜ ਕਰੋ।",
    quote_instant_est: "ਤੁਰੰਤ ਅਨੁਮਾਨ",
    quote_heading: "ਪਰਿਵਾਰਾਂ ਨੂੰ ਜੋੜਨਾ,\nਦੂਰੀਆਂ ਮਿਟਾਉਣਾ।",
    quote_subheading:
      "ਦੁਨੀਆ ਭਰ ਵਿੱਚ ਦਸਤਾਵੇਜ਼, ਪਾਰਸਲ, ਤੋਹਫ਼ੇ ਜਾਂ ਵਪਾਰਕ ਸ਼ਿਪਮੈਂਟ ਭੇਜੋ।",
    quote_empty_title: "ਤੁਹਾਡੇ ਕੋਟੇਸ਼ਨ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ",
    quote_empty_sub:
      'ਸੇਵਾਵਾਂ ਦੀ ਤੁਲਨਾ ਕਰਨ ਲਈ ਫਾਰਮ ਭਰੋ ਅਤੇ "ਕੋਟੇਸ਼ਨ ਲਓ" \'ਤੇ ਕਲਿੱਕ ਕਰੋ',
    quote_loading_msg: "ਸਾਰੇ ਕੈਰੀਅਰਾਂ ਤੋਂ ਦਰਾਂ ਪ੍ਰਾਪਤ ਕੀਤੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ…",
    quote_how_calc_title: "ਤੁਹਾਡੇ ਕੋਟੇਸ਼ਨ ਦੀ ਗਣਨਾ ਕਿਵੇਂ ਕੀਤੀ ਜਾਂਦੀ ਹੈ?",
    quote_how_calc_1_title: "ਚਾਰਜਯੋਗ ਭਾਰ",
    quote_how_calc_1_desc:
      "ਅਸੀਂ ਅਸਲ ਭਾਰ ਬਨਾਮ ਵਾਲੀਅਮੈਟ੍ਰਿਕ ਭਾਰ (L × B × H ÷ 5000) ਵਿੱਚੋਂ ਜੋ ਵੀ ਵੱਧ ਹੋਵੇ, ਉਸਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਾਂ, ਜਿਸਨੂੰ ਨੇੜਲੇ ਕਿਲੋ ਤੱਕ ਪੂਰਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।",
    quote_how_calc_2_title: "ਸੇਵਾ ਅਤੇ ਜ਼ੋਨ",
    quote_how_calc_2_desc:
      "ਆਸਟ੍ਰੇਲੀਆ/ਕੈਨੇਡਾ ਲਈ ਤੁਹਾਡਾ ਪਿੰਨਕੋਡ ਡਿਲੀਵਰੀ ਜ਼ੋਨ ਨਿਰਧਾਰਤ ਕਰਦਾ ਹੈ। ਯੂਰਪ ਅਤੇ ਅੰਤਰਰਾਸ਼ਟਰੀ ਮੰਜ਼ਿਲਾਂ ਦੇਸ਼-ਅਧਾਰਤ ਜ਼ੋਨ ਮੈਪਿੰਗ ਦੀ ਵਰਤੋਂ ਕਰਦੀਆਂ ਹਨ।",
    quote_how_calc_3_title: "ਦਰ ਐਪਲੀਕੇਸ਼ਨ",
    quote_how_calc_3_desc:
      "ਸਲੈਬ ਦਰਾਂ (S) ਪ੍ਰਤੀ ਭਾਰ ਬ੍ਰੈਕੇਟ ਇੱਕ ਨਿਸ਼ਚਤ ਰਕਮ ਹਨ। ਪ੍ਰਤੀ-ਕਿਲੋ ਦਰਾਂ (B) ਨੂੰ ਤੁਹਾਡੇ ਚਾਰਜਯੋਗ ਭਾਰ ਨਾਲ ਗੁਣਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਸਾਰੀਆਂ ਦਰਾਂ ਜੀ.ਐਸ.ਟੀ.-ਸਮੇਤ ਹਨ।",
    quote_faq_badge: "ਕੀ ਕੋਈ ਸਵਾਲ ਹਨ?",
    quote_faq_title: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
    bespoke_read_more: "ਹੋਰ ਪੜ੍ਹੋ • ਹੋਰ ਪੜ੍ਹੋ •",
  },

  fr: {
    nav_about: "À propos",
    nav_services: "Services",
    nav_track: "Suivre maintenant",
    nav_quote: "Obtenir un devis",
    nav_contact: "Nous contacter",
    nav_home: "Accueil",
    nav_zipcode: "Code postal desservi",
    nav_language: "Langue",
    nav_track_shipment: "Suivre l'envoi",
    bc_about: "À propos de nous",
    bc_track: "Suivre l'envoi",
    bc_zipcode: "Code postal desservi",
    bc_contact: "Nous contacter",
    bc_quote: "Obtenir un devis",
    bc_faq: "FAQ",
    bc_services: "Services",
    bc_business_campaign: "Campagne d'affaires",
    hero_headline: "Connecter les continents, livrer la confiance.",
    hero_subtext:
      "Envoyez des documents, colis, denrées, cadeaux ou expéditions commerciales dans le monde entier en toute confiance.",
    hero_pickup: "Lieu de collecte",
    hero_drop: "Lieu de livraison",
    hero_weight: "Poids (Kg)",
    hero_service: "Service",
    hero_content: "Contenu",
    hero_get_quote: "Obtenir un devis",
    hero_estimated_cost: "Coût estimé",
    hero_est_delivery: "Livraison est.",
    hero_days: "Jours",
    hero_read_more: "Lire plus",
    hero_legacy_badge: "L'héritage Manvi",
    hero_legacy_heading: "Nous ne transportons pas que des colis ;",
    hero_legacy_highlight: "Nous rapprochons les distances.",
    hero_whatsapp: "•WhatsApp •WhatsApp •",
    hero_doc_express: "Express documents",
    hero_parcel_shipping: "Expédition de colis",
    hero_cargo_express: "Cargo express",
    hero_serviceable_zipcodes: "Codes postaux desservis",
    hero_our_services: "Nos services",
    hero_contact_us: "Nous contacter",
    partners_title: "Nos partenaires\nde livraison ✈",
    bespoke_badge: "Nos services",
    bespoke_title: "Solutions d'expédition sur mesure.",
    bespoke_acc1_num: "01",
    bespoke_acc1_title: "Logistique personnelle mondiale",
    bespoke_acc1_desc:
      "Logistique fiable pour les particuliers transportant des marchandises ou articles personnels dans le monde entier.",
    bespoke_acc1_card1_title: "Livraison porte-à-porte",
    bespoke_acc1_card1_desc:
      "Collecte rapide et sécurisée directement à votre porte.",
    bespoke_acc1_card2_title: "Expédition de bagages mondiaux",
    bespoke_acc1_card2_desc:
      "Transport de vos bagages personnels à travers les frontières sans tracas.",
    bespoke_acc1_card3_title: "Assistance au dédouanement",
    bespoke_acc1_card3_desc:
      "Aide avec la documentation douanière standard pour des arrivées fluides.",
    bespoke_acc2_num: "02",
    bespoke_acc2_title: "Solutions entreprise et en gros",
    bespoke_acc2_desc:
      "Optimisation des chaînes d'approvisionnement pour les entreprises exigeant la précision.",
    bespoke_acc2_card1_title: "Expédition en gros stratégique",
    bespoke_acc2_card1_desc:
      "Transit à grand volume avec des structures de coûts optimisées.",
    bespoke_acc2_card2_title: "Gestion de compte",
    bespoke_acc2_card2_desc:
      "Experts dédiés pour gérer votre logistique commerciale.",
    bespoke_acc2_card3_title: "Intégration transparente",
    bespoke_acc2_card3_desc:
      "Collectes régulières adaptées au rythme de votre entreprise.",
    wwl_badge: "L'avantage Manvi",
    wwl_title: "Pourquoi nous menons",
    wwl_card1_label: "Succès de livraison",
    wwl_card1_desc:
      "Livraisons internationales réussies avec précision et soin.",
    wwl_card2_label: "Partenariats d'élite",
    wwl_card2_stat: "Plusieurs\npays",
    wwl_card2_desc:
      "Collaboration avec des transporteurs de classe mondiale : DHL, FedEx, UPS, Aramex et DPD.",
    wwl_card3_label: "Maîtrise douanière",
    wwl_card3_stat: "1000+",
    wwl_card3_desc:
      "Support documentaire expert pour naviguer les frontières mondiales sans effort.",
    wwl_card4_label: "Avantage technologique",
    wwl_card4_stat: "Mises à jour\nen temps réel",
    wwl_card4_desc:
      "Suivi en temps réel de bout en bout pour une tranquillité d'esprit totale.",
    claim_badge: "Politiques complètes",
    claim_title: "Notre politique de remboursement et de réclamation",
    claim_intro:
      "Manvi International s'engage à fournir des services logistiques internationaux fiables. Cependant, en cas d'irrégularités de transit, la politique suivante décrit les procédures formelles, délais et conditions pour la résolution des réclamations.",
    claim_tab1_title: "Dispositions générales des réclamations",
    claim_tab1_subtext:
      "Toutes les réclamations de remboursement ou de perte doivent passer par un processus d'enquête formel.",
    claim_tab1_panelTitle:
      "Toutes les réclamations de remboursement ou de perte doivent passer par un processus d'enquête formel.",
    claim_tab1_d1_num: "01",
    claim_tab1_d1_title: "Fenêtre d'enquête obligatoire",
    claim_tab1_d1_desc:
      "Un minimum de 25 jours ouvrables est nécessaire pour traiter toute réclamation.",
    claim_tab1_d2_num: "02",
    claim_tab1_d2_title: "Protocole de règlement",
    claim_tab1_d2_desc:
      'En aucun cas les réclamations ne seront réglées "sur place" ou avant la fin du processus de vérification formel.',
    claim_tab1_d3_num: "03",
    claim_tab1_d3_title: "Dépendance tierce",
    claim_tab1_d3_desc:
      'En tant que prestataire logistique international, la résolution des réclamations de Manvi International dépend des rapports d\'enquête de nos partenaires, notamment <strong class="font-extrabold text-[#1c1f2e]">DHL, FedEx et UPS</strong>.',
    claim_tab2_title: "Retour à l'origine (RTO)",
    claim_tab2_subtext:
      "Les envois retournés pour non-livraison, adresse incorrecte ou refus sont éligibles au remboursement.",
    claim_tab2_panelTitle:
      "Les envois retournés au point d'origine en raison de non-livraison, d'adresse incorrecte ou de refus du destinataire sont éligibles à un processus de remboursement simplifié.",
    claim_tab2_d1_num: "01",
    claim_tab2_d1_title: "Délai de traitement",
    claim_tab2_d1_desc:
      'Les remboursements pour les envois RTO seront initiés dans <strong class="font-extrabold text-[#1c1f2e]">2 à 3 jours ouvrables</strong>.',
    claim_tab2_d2_num: "02",
    claim_tab2_d2_title: "Exigence de vérification",
    claim_tab2_d2_desc:
      "La fenêtre de traitement commence uniquement après la réception physique et la vérification réussie de l'envoi dans nos installations.",
    claim_tab2_d3_num: "03",
    claim_tab2_d3_title: "Condition",
    claim_tab2_d3_desc:
      "L'envoi doit être intact et répondre aux critères de remboursement basé sur le retour conformément à l'accord de service initial.",
    claim_tab3_title: "Réclamations pour envois perdus, endommagés ou détruits",
    claim_tab3_subtext:
      "Directives pour la gestion des envois perdus, endommagés, détruits ou retardés par le transporteur.",
    claim_tab3_panelTitle:
      "En cas d'envoi perdu, endommagé, détruit ou significativement retardé en raison de problèmes liés au transporteur, les protocoles suivants s'appliquent :",
    claim_tab4_title: "Dispositions générales des réclamations",
    claim_tab4_subtext: "Quand Manvi International n'est pas responsable",
    claim_tab4_panelTitle:
      "Dans certains cas, des retards ou pertes peuvent survenir en raison de facteurs hors de notre contrôle. Ces conditions sont expliquées ci-dessous.",
    claim_tab4_d1_num: "01",
    claim_tab4_d1_title: "Force majeure",
    claim_tab4_d1_desc:
      "Manvi International n'est pas responsable des retards ou pertes causés par des circonstances hors de notre contrôle, notamment les saisies douanières, perturbations météorologiques ou instabilité politique.",
    claim_tab4_d2_num: "02",
    claim_tab4_d2_title: "Confirmation du transporteur",
    claim_tab4_d2_desc:
      'Aucune réclamation de perte ou destruction ne sera approuvée avant que le transporteur concerné (DHL, FedEx ou UPS) ne déclare officiellement l\'envoi "Perdu" ou "Endommagé".',
    nocost_badge: "Tarification et transparence",
    nocost_title:
      "Aucun coût caché. Aucune surprise.\nJuste une logistique simple.",
    nocost_desc:
      "Nous croyons en une tarification basée sur la valeur. Nos tarifs sont soigneusement calculés en fonction de la destination, du poids et de l'urgence. Aucun frais caché, aucune surcharge surprenante, et aucun surcoût inutile. Juste une tarification transparente axée sur la performance, la fiabilité et l'efficacité.",
    nocost_btn: "Demander les tarifs",
    prohibited_title: "Marchandises interdites",
    prohibited_desc:
      "Pour maintenir l'intégrité de notre réseau, nous ne transportons pas :",
    prohibited_item1: "Produits chimiques dangereux",
    prohibited_item2: "Devises négociables",
    prohibited_item3: "Marchandises dangereuses",
    prohibited_item4: "Pierres précieuses",
    prohibited_item5: "Contrebande illégale ou restreinte",
    prohibited_btn: "Liste détaillée",
    faq_badge: "FAQ",
    faq_title: "Des questions ? Nous sommes ravis que vous demandiez",
    faq_q1: "Où puis-je envoyer mes colis ?",
    faq_a1:
      "Presque n'importe où ! Nous avons une forte présence aux États-Unis, au Canada, au Royaume-Uni, en Europe et en Australie. Que ce soit une grande ville ou une banlieue tranquille, nous l'y ferons parvenir.",
    faq_q2: "Comment savoir si j'obtiens un prix équitable ?",
    faq_a2:
      "Nous croyons en la valeur. Votre devis est basé exactement sur vos besoins — poids, destination et délai de livraison. Nous promettons aucune surprise cachée au moment de payer.",
    faq_q3: "Puis-je voir où se trouve mon colis maintenant ?",
    faq_a3:
      "Oui ! Dès que vous expédiez avec nous, vous recevrez un numéro de suivi unique. Vous pouvez suivre le trajet de votre colis en temps réel, ce qui vous donne une confiance totale.",
    faq_q4: "Que se passe-t-il en cas de retard ou de problème ?",
    faq_a4:
      "Nous savons que vos envois sont importants. En cas de problème, nous sommes là pour vous aider. Pour garantir une résolution juste et approfondie, notre équipe et nos partenaires mondiaux (comme DHL, FedEx et UPS) mènent une enquête détaillée.",
    faq_q5: "Y a-t-il des articles que je ne peux pas expédier ?",
    faq_a5:
      "Pour la sécurité de tous et le respect des lois internationales, nous ne pouvons pas expédier de produits chimiques dangereux, de devises, de pierres précieuses ou d'articles illégaux. Si vous n'êtes pas sûr d'un article, appelez-nous simplement ! Nous sommes heureux de vérifier pour vous avant la réservation.",
    contact_badge: "Nous contacter",
    contact_title: "Nous sommes là pour vous",
    contact_desc:
      "Nous croyons en la valeur. Votre devis est basé exactement sur vos besoins — poids, destination et délai de livraison. Nous promettons aucune surprise cachée lors du paiement.",
    contact_call: "Appelez-nous",
    contact_whatsapp: "WhatsApp",
    contact_info: "Coordonnées",
    footer_tagline: "Connecter les familles, rapprocher les distances",
    footer_desc:
      "Approuvé par plus de 10 000 clients satisfaits et avec plus de 50 000 expéditions internationales réussies, nous livrons des solutions de messagerie et de fret rapides, sécurisées et transparentes sur lesquelles vous pouvez compter.",
    footer_social: "Réseau social",
    footer_quick_links: "Liens rapides",
    footer_office_info: "Infos bureau",
    footer_rights: "Tous droits réservés.",
    form_select_dest: "Sélectionnez le pays de destination",
    form_select_euro: "Sélectionnez le pays européen",
    form_select_country: "Sélectionnez le pays",
    form_zipcode: "Code postal",
    form_actual_wt: "Poids réel (kg)",
    form_vol_wt_dim: "Dimensions du poids volumétrique (cm) — facultatif",
    form_length: "Longueur",
    form_breadth: "Largeur",
    form_height: "Hauteur",
    form_vol_wt: "Poids vol:",
    form_chargeable: "Facturable:",
    form_calculating: "Calcul en cours...",
    form_selected: "SÉLECTIONNÉ",
    form_zone: "Zone",
    form_slab: "Tarif forfaitaire",
    form_per_kg: "Par kg",
    form_duty_paid: "TAXES PAYÉES",
    form_duty_unpaid: "TAXES NON PAYÉES",
    form_gst_inc: "TTC",
    form_final_rates_msg:
      "Les tarifs finaux peuvent varier · Appelez le +91 7070-506070 pour confirmer",
    form_services_found: "Services trouvés",
    form_services_found_text: "service(s) trouvé(s)",
    quote_banner_title: "Obtenir un devis",
    quote_banner_sub:
      "Entrez les détails de votre envoi pour comparer instantanément les services et les tarifs.",
    quote_instant_est: "ESTIMATION INSTANTANÉE",
    quote_heading: "Connecter les familles,\nréduire les distances.",
    quote_subheading:
      "Envoyez des documents, des colis, des cadeaux ou des expéditions commerciales dans le monde entier.",
    quote_empty_title: "Vos devis apparaîtront ici",
    quote_empty_sub:
      'Remplissez le formulaire et cliquez sur "Obtenir un devis" pour comparer les services',
    quote_loading_msg: "Récupération des tarifs de tous les transporteurs…",
    quote_how_calc_title: "Comment votre devis est-il calculé ?",
    quote_how_calc_1_title: "Poids facturable",
    quote_how_calc_1_desc:
      "Nous utilisons le poids réel ou volumétrique (L × l × H ÷ 5000), le plus élevé étant retenu et arrondi au kg supérieur.",
    quote_how_calc_2_title: "Service et zone",
    quote_how_calc_2_desc:
      "Pour l'Australie/le Canada, votre code postal détermine la zone de livraison. L'Europe et l'international utilisent un système de zones par pays.",
    quote_how_calc_3_title: "Application des tarifs",
    quote_how_calc_3_desc:
      "Les tarifs forfaitaires (S) sont des montants fixes par tranche de poids. Les tarifs au kg (B) sont multipliés par votre poids facturable. Tous les tarifs incluent les taxes.",
    quote_faq_badge: "Des questions ?",
    quote_faq_title: "Foire Aux Questions",
    bespoke_read_more: "Lire la suite • Lire la suite •",
  },

  es: {
    nav_about: "Sobre nosotros",
    nav_services: "Servicios",
    nav_track: "Rastrear ahora",
    nav_quote: "Obtener cotización",
    nav_contact: "Contacto",
    nav_home: "Inicio",
    nav_zipcode: "Código postal disponible",
    nav_language: "Idioma",
    nav_track_shipment: "Rastrear envío",
    bc_about: "Sobre nosotros",
    bc_track: "Rastrear envío",
    bc_zipcode: "Código postal disponible",
    bc_contact: "Contacto",
    bc_quote: "Obtener cotización",
    bc_faq: "Preguntas frecuentes",
    bc_services: "Servicios",
    bc_business_campaign: "Campaña de negocios",
    hero_headline: "Conectando continentes, entregando confianza.",
    hero_subtext:
      "Envía documentos, paquetes, alimentos, regalos o envíos comerciales en todo el mundo con confianza.",
    hero_pickup: "Lugar de recogida",
    hero_drop: "Lugar de entrega",
    hero_weight: "Peso (Kg)",
    hero_service: "Servicio",
    hero_content: "Contenido",
    hero_get_quote: "Obtener cotización",
    hero_estimated_cost: "Costo estimado",
    hero_est_delivery: "Entrega est.",
    hero_days: "Días",
    hero_read_more: "Leer más",
    hero_legacy_badge: "El legado Manvi",
    hero_legacy_heading: "No solo movemos paquetes;",
    hero_legacy_highlight: "Acortamos distancias.",
    hero_whatsapp: "•WhatsApp •WhatsApp •",
    hero_doc_express: "Documentos express",
    hero_parcel_shipping: "Envío de paquetes",
    hero_cargo_express: "Carga express",
    hero_serviceable_zipcodes: "Códigos postales disponibles",
    hero_our_services: "Nuestros servicios",
    hero_contact_us: "Contacto",
    partners_title: "Nuestros socios\nde entrega ✈",
    bespoke_badge: "Nuestros servicios",
    bespoke_title: "Soluciones de envío a medida.",
    bespoke_acc1_num: "01",
    bespoke_acc1_title: "Logística personal global",
    bespoke_acc1_desc:
      "Logística confiable para personas que mueven carga o artículos personales en todo el mundo.",
    bespoke_acc1_card1_title: "Entrega puerta a puerta",
    bespoke_acc1_card1_desc:
      "Recogida rápida y segura directamente desde tu puerta.",
    bespoke_acc1_card2_title: "Envío global de equipaje",
    bespoke_acc1_card2_desc:
      "Mueve tu equipaje personal a través de fronteras sin complicaciones.",
    bespoke_acc1_card3_title: "Apoyo en despacho aduanero",
    bespoke_acc1_card3_desc:
      "Asistencia con documentación aduanera estándar para llegadas fluidas.",
    bespoke_acc2_num: "02",
    bespoke_acc2_title: "Soluciones empresariales y a granel",
    bespoke_acc2_desc:
      "Optimizando cadenas de suministro para empresas que exigen precisión.",
    bespoke_acc2_card1_title: "Envío masivo estratégico",
    bespoke_acc2_card1_desc:
      "Tránsito de alto volumen con estructuras de costos optimizadas.",
    bespoke_acc2_card2_title: "Gestión de cuenta",
    bespoke_acc2_card2_desc:
      "Expertos dedicados para gestionar tu logística comercial.",
    bespoke_acc2_card3_title: "Integración perfecta",
    bespoke_acc2_card3_desc:
      "Recogidas regulares adaptadas al ritmo de tu negocio.",
    wwl_badge: "La ventaja Manvi",
    wwl_title: "Por qué somos líderes",
    wwl_card1_label: "Éxito en entregas",
    wwl_card1_desc:
      "Entregas internacionales exitosas completadas con precisión y cuidado.",
    wwl_card2_label: "Asociaciones de élite",
    wwl_card2_stat: "Múltiples\npaíses",
    wwl_card2_desc:
      "Colaboración con transportistas de clase mundial: DHL, FedEx, UPS, Aramex y DPD.",
    wwl_card3_label: "Dominio aduanero",
    wwl_card3_stat: "1000+",
    wwl_card3_desc:
      "Soporte experto en documentación para cruzar fronteras globales sin esfuerzo.",
    wwl_card4_label: "Ventaja tecnológica",
    wwl_card4_stat: "Actualizaciones\nen tiempo real",
    wwl_card4_desc:
      "Seguimiento en tiempo real de extremo a extremo para total tranquilidad.",
    claim_badge: "Políticas integrales",
    claim_title: "Nuestra política de reembolso y reclamaciones",
    claim_intro:
      "Manvi International está comprometida a proporcionar servicios logísticos internacionales confiables. Sin embargo, ante irregularidades en el tránsito, la siguiente política describe los procedimientos formales, plazos y condiciones para la resolución de reclamaciones.",
    claim_tab1_title: "Disposiciones generales de reclamaciones",
    claim_tab1_subtext:
      "Todas las reclamaciones de reembolso o pérdida deben pasar por un proceso de investigación formal.",
    claim_tab1_panelTitle:
      "Todas las reclamaciones de reembolso o pérdida deben pasar por un proceso de investigación formal.",
    claim_tab1_d1_num: "01",
    claim_tab1_d1_title: "Ventana de investigación obligatoria",
    claim_tab1_d1_desc:
      "Se requiere un mínimo de 25 días hábiles para procesar cualquier reclamación.",
    claim_tab1_d2_num: "02",
    claim_tab1_d2_title: "Protocolo de liquidación",
    claim_tab1_d2_desc:
      'Bajo ninguna circunstancia se resolverán reclamaciones "en el momento" ni antes de completar el proceso de verificación formal.',
    claim_tab1_d3_num: "03",
    claim_tab1_d3_title: "Dependencia de terceros",
    claim_tab1_d3_desc:
      'Como proveedor logístico internacional, la resolución de reclamaciones de Manvi International depende de los informes de investigación de nuestros socios, incluyendo <strong class="font-extrabold text-[#1c1f2e]">DHL, FedEx y UPS</strong>.',
    claim_tab2_title: "Envíos retornados al origen (RTO)",
    claim_tab2_subtext:
      "Los envíos devueltos por no entrega, dirección incorrecta o rechazo califican para reembolso.",
    claim_tab2_panelTitle:
      "Los envíos devueltos al punto de origen por no entrega, dirección incorrecta o rechazo del destinatario son elegibles para un proceso de reembolso simplificado.",
    claim_tab2_d1_num: "01",
    claim_tab2_d1_title: "Plazo de procesamiento",
    claim_tab2_d1_desc:
      'Los reembolsos para envíos RTO se iniciarán en <strong class="font-extrabold text-[#1c1f2e]">2 a 3 días hábiles</strong>.',
    claim_tab2_d2_num: "02",
    claim_tab2_d2_title: "Requisito de verificación",
    claim_tab2_d2_desc:
      "La ventana de procesamiento comienza solo después de la recepción física y verificación exitosa del envío en nuestras instalaciones.",
    claim_tab2_d3_num: "03",
    claim_tab2_d3_title: "Condición",
    claim_tab2_d3_desc:
      "El envío debe estar intacto y cumplir los criterios para un reembolso basado en devolución según el acuerdo de servicio inicial.",
    claim_tab3_title: "Reclamaciones por envíos perdidos, dañados o destruidos",
    claim_tab3_subtext:
      "Directrices para gestionar envíos perdidos, dañados, destruidos o retrasados por el transportista.",
    claim_tab3_panelTitle:
      "En caso de que un envío sea perdido, dañado, destruido o significativamente retrasado debido a problemas del transportista, se aplican los siguientes protocolos:",
    claim_tab4_title: "Disposiciones generales de reclamaciones",
    claim_tab4_subtext: "Cuando Manvi International no es responsable",
    claim_tab4_panelTitle:
      "En algunos casos, los retrasos o pérdidas pueden ocurrir por factores fuera de nuestro control. Estas condiciones se explican a continuación.",
    claim_tab4_d1_num: "01",
    claim_tab4_d1_title: "Fuerza mayor",
    claim_tab4_d1_desc:
      "Manvi International no es responsable de retrasos o pérdidas causados por circunstancias fuera de nuestro control, incluyendo incautaciones aduaneras, interrupciones climáticas o inestabilidad política.",
    claim_tab4_d2_num: "02",
    claim_tab4_d2_title: "Confirmación del transportista",
    claim_tab4_d2_desc:
      'Ninguna reclamación de pérdida o destrucción será aprobada hasta que el transportista respectivo (DHL, FedEx o UPS) declare oficialmente el envío como "Perdido" o "Dañado".',
    nocost_badge: "Precios y transparencia",
    nocost_title: "Sin costos ocultos. Sin sorpresas.\nSolo logística directa.",
    nocost_desc:
      "Creemos en precios basados en el valor. Nuestras tarifas se calculan cuidadosamente según el destino, el peso del envío y la urgencia de entrega. Sin tarifas ocultas, sin recargos inesperados y sin gastos generales innecesarios. Solo precios transparentes construidos en torno al rendimiento, la confiabilidad y la eficiencia.",
    nocost_btn: "Solicitar tarifas",
    prohibited_title: "Mercancías prohibidas",
    prohibited_desc:
      "Para mantener la integridad de nuestra red, no transportamos:",
    prohibited_item1: "Productos químicos peligrosos",
    prohibited_item2: "Moneda negociable",
    prohibited_item3: "Mercancías peligrosas",
    prohibited_item4: "Piedras preciosas",
    prohibited_item5: "Contrabando ilegal o restringido",
    prohibited_btn: "Lista detallada",
    faq_badge: "Preguntas frecuentes",
    faq_title: "¿Preguntas? Nos alegra que preguntes",
    faq_q1: "¿Dónde puedo enviar mis paquetes?",
    faq_a1:
      "¡Casi a cualquier lugar! Tenemos una fuerte presencia en EE.UU., Canadá, Reino Unido, Europa y Australia. Ya sea una gran ciudad o un tranquilo suburbio, lo llevaremos hasta allí.",
    faq_q2: "¿Cómo sé que estoy obteniendo un precio justo?",
    faq_a2:
      "Creemos en el valor. Tu cotización se basa exactamente en lo que necesitas: peso, destino y velocidad de entrega. Prometemos que no habrá sorpresas ocultas a la hora de pagar.",
    faq_q3: "¿Puedo ver dónde está mi paquete ahora mismo?",
    faq_a3:
      "¡Sí! En el momento en que envíes con nosotros, recibirás un número de seguimiento único. Puedes ver el recorrido de tu paquete en tiempo real, lo que te brinda total confianza.",
    faq_q4: "¿Qué pasa si hay un retraso o un problema?",
    faq_a4:
      "Sabemos que tus envíos son importantes. Si algo sale mal, estamos aquí para ayudar. Para garantizar una resolución justa y exhaustiva, nuestro equipo y nuestros socios globales (DHL, FedEx, UPS) realizan una investigación detallada.",
    faq_q5: "¿Hay algo que no pueda enviar?",
    faq_a5:
      "Para mantener a todos seguros y cumplir con las leyes internacionales, no podemos enviar productos químicos peligrosos, moneda, piedras preciosas o artículos ilegales. ¡Llámanos si tienes dudas sobre algún artículo! Con gusto lo verificamos antes de que reserves.",
    contact_badge: "Contáctanos",
    contact_title: "Estamos aquí para ti",
    contact_desc:
      "Creemos en el valor. Tu cotización se basa exactamente en lo que necesitas: peso, destino y velocidad de entrega. Sin sorpresas ocultas al pagar.",
    contact_call: "Llámanos",
    contact_whatsapp: "WhatsApp",
    contact_info: "Información de contacto",
    footer_tagline: "Conectando familias, acortando distancias",
    footer_desc:
      "De confianza para más de 10,000 clientes satisfechos y con más de 50,000 envíos internacionales exitosos, entregamos soluciones de mensajería y carga rápidas, seguras y fluidas en las que puedes confiar.",
    footer_social: "Red social",
    footer_quick_links: "Enlaces rápidos",
    footer_office_info: "Información de oficina",
    footer_rights: "Todos los derechos reservados.",
    form_select_dest: "Seleccionar país de destino",
    form_select_euro: "Seleccionar país europeo",
    form_select_country: "Seleccionar país",
    form_zipcode: "Código postal",
    form_actual_wt: "Peso real (kg)",
    form_vol_wt_dim: "Dimensiones de peso volumétrico (cm) — opcional",
    form_length: "Longitud",
    form_breadth: "Anchura",
    form_height: "Altura",
    form_vol_wt: "Peso vol:",
    form_chargeable: "Facturable:",
    form_calculating: "Calculando...",
    form_selected: "SELECCIONADO",
    form_zone: "Zona",
    form_slab: "Tarifa plana",
    form_per_kg: "Por kg",
    form_duty_paid: "IMPUESTOS PAGADOS",
    form_duty_unpaid: "IMPUESTOS NO PAGADOS",
    form_gst_inc: "IVA incluido",
    form_final_rates_msg:
      "Las tarifas finales pueden variar · Llame al +91 7070-506070 para confirmar",
    form_services_found: "Servicios encontrados",
    form_services_found_text: "servicio(s) encontrado(s)",
    quote_banner_title: "Obtener presupuesto",
    quote_banner_sub:
      "Introduzca los detalles de su envío para comparar servicios y tarifas al instante.",
    quote_instant_est: "ESTIMACIÓN INSTANTÁNEA",
    quote_heading: "Conectando familias,\nreduciendo distancias.",
    quote_subheading:
      "Envíe documentos, paquetes, regalos o envíos comerciales a todo el mundo.",
    quote_empty_title: "Sus presupuestos aparecerán aquí",
    quote_empty_sub:
      'Rellene el formulario y haga clic en "Obtener presupuesto" para comparar servicios',
    quote_loading_msg: "Obteniendo tarifas de todos los transportistas…",
    quote_how_calc_title: "¿Cómo se calcula su presupuesto?",
    quote_how_calc_1_title: "Peso facturable",
    quote_how_calc_1_desc:
      "Utilizamos el peso real frente al peso volumétrico (L × A × A ÷ 5000), el que sea mayor, redondeado al kg superior.",
    quote_how_calc_2_title: "Servicio y zona",
    quote_how_calc_2_desc:
      "Para Australia/Canadá, su código postal determina la zona de entrega. Europa y destinos internacionales utilizan asignación de zonas por país.",
    quote_how_calc_3_title: "Aplicación de tarifas",
    quote_how_calc_3_desc:
      "Las tarifas planas (S) son cantidades fijas por tramo de peso. Las tarifas por kg (B) se multiplican por su peso facturable. Todas las tarifas incluyen impuestos.",
    quote_faq_badge: "¿Tiene preguntas?",
    quote_faq_title: "Preguntas frecuentes",
    bespoke_read_more: "Leer más • Leer más •",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

// context/LanguageContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "hi" | "pa" | "fr" | "es";

export interface Translations {
  footer_pickup_availability: string;
  footer_campaign: string;
  footer_business_campaign: string;
  footer_blog: string;
  footer_career: string;
  b2b_hero_badge: string;
  b2b_hero_title_line1: string;
  b2b_hero_title_line2: string;
  b2b_hero_title_line3: string;
  b2b_hero_subtext: string;
  b2b_hero_trusted: string;
  b2b_hero_destinations: string;
  b2b_call_now: string;
  b2b_partners_title: string;
  b2b_partners_subtitle: string;
  b2b_how_it_works_badge: string;
  b2b_how_it_works_title: string;
  b2b_how_it_works_sub: string;
  b2b_step1_title: string;
  b2b_step1_desc: string;
  b2b_step2_title: string;
  b2b_step2_desc: string;
  b2b_step3_title: string;
  b2b_step3_desc: string;
  b2b_step4_title: string;
  b2b_step4_desc: string;
  b2b_source_badge: string;
  b2b_source_title: string;
  b2b_source_item1_title: string;
  b2b_source_item1_desc: string;
  b2b_source_item2_title: string;
  b2b_source_item2_desc: string;
  b2b_source_item3_title: string;
  b2b_source_item3_desc: string;
  b2b_where_badge: string;
  b2b_where_title: string;
  b2b_pickup_title: string;
  b2b_pickup_desc: string;
  b2b_pan_india: string;
  b2b_delivery_title: string;
  b2b_worldwide: string;
  b2b_delivery_via: string;
  b2b_what_ship_title: string;
  b2b_what_ship_desc: string;
  b2b_what_ship_ask: string;
  b2b_what_ship_confirm: string;
  b2b_why_badge: string;
  b2b_why_title: string;
  b2b_why_sub: string;
  b2b_reason1_title: string;
  b2b_reason1_desc: string;
  b2b_reason2_title: string;
  b2b_reason2_desc: string;
  b2b_reason3_title: string;
  b2b_reason3_desc: string;
  b2b_reason4_title: string;
  b2b_reason4_desc: string;
  b2b_reason5_title: string;
  b2b_reason5_desc: string;
  b2b_reason6_title: string;
  b2b_reason6_desc: string;
  b2b_faq1_q: string;
  b2b_faq1_a: string;
  b2b_faq2_q: string;
  b2b_faq2_a: string;
  b2b_faq3_q: string;
  b2b_faq3_a: string;
  b2b_faq4_q: string;
  b2b_faq4_a: string;
  b2b_faq5_q: string;
  b2b_faq5_a: string;
  b2b_faq6_q: string;
  b2b_faq6_a: string;
  b2b_faq7_q: string;
  b2b_faq7_a: string;
  b2b_cta_title: string;
  b2b_cta_sub: string;
  b2b_call: string;
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
  faq_q2_link: string;
  faq_q2_after: string;

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

  // Campaign Page
  campaign_hero_badge: string;
  campaign_hero_title_line1: string;
  campaign_hero_title_line2: string;
  campaign_hero_title_highlight1: string;
  campaign_hero_title_highlight2: string;
  campaign_hero_subtext: string;
  campaign_hero_trusted: string;
  campaign_hero_shipments: string;
  campaign_partners_title: string;
  campaign_how_it_works_badge: string;
  campaign_how_it_works_title: string;
  campaign_how_it_works_sub: string;
  campaign_step1_title: string;
  campaign_step1_desc: string;
  campaign_step2_title: string;
  campaign_step2_desc: string;
  campaign_step3_title: string;
  campaign_step3_desc: string;
  campaign_step4_title: string;
  campaign_step4_desc: string;
  campaign_where_badge: string;
  campaign_where_title: string;
  campaign_pickup_title: string;
  campaign_pickup_desc: string;
  campaign_pan_india: string;
  campaign_delivery_title: string;
  campaign_worldwide: string;
  campaign_delivery_via: string;
  campaign_what_ship_title: string;
  campaign_what_ship_desc: string;
  campaign_what_ship_ask: string;
  campaign_what_ship_confirm: string;
  campaign_stats_title: string;
  campaign_stat1_value: string;
  campaign_stat1_label: string;
  campaign_stat2_value: string;
  campaign_stat2_label: string;
  campaign_stat3_value: string;
  campaign_stat3_label: string;
  campaign_stat4_value: string;
  campaign_stat4_label: string;
  campaign_testimonials_badge: string;
  campaign_testimonials_title: string;
  campaign_testimonial1: string;
  campaign_testimonial2: string;
  campaign_testimonial3: string;
  campaign_testimonial4: string;
  campaign_faq6_q: string;
  campaign_faq6_a: string;
  campaign_days: string;
  campaign_hrs: string;
  campaign_min: string;
  campaign_sec: string;
  campaign_cta_title: string;
  campaign_cta_sub: string;
  campaign_call: string;
}

const translations: Record<Language, Translations> = {
  en: {
    footer_pickup_availability: "Pickup Availability",
    footer_campaign: "Campaign",
    footer_business_campaign: "Business Campaign",
    footer_blog: "Blog",
    footer_career: "Career",
    b2b_hero_badge: "Bulk Sourcing For Indian Businesses",
    b2b_hero_title_line1: "Source From India.",
    b2b_hero_title_line2: "Delivered To Your Business",
    b2b_hero_title_line3: "In Your Country.",
    b2b_hero_subtext:
      "Run An Indian Restaurant, Grocery, Boutique Or Garment Store Abroad? Tell Us <strong>What You Need And Where It Is In India —</strong> Spices, Groceries, Fabrics, Ethnic Wear — And We'll Pick It Up In Bulk And Deliver It To Your Door. <strong>Customs Handled.</strong>",
    b2b_hero_trusted: "Trusted By Indian Businesses Worldwide",
    b2b_hero_destinations: "USA · UK · Canada · Australia",
    b2b_call_now: "Call Now",
    b2b_partners_title: "Trusted Delivery",
    b2b_partners_subtitle: "Partners",
    b2b_how_it_works_badge: "How It Works",
    b2b_how_it_works_title: "From India To Your Business In Four Steps",
    b2b_how_it_works_sub:
      "No complicated process. Send us your list on WhatsApp and we handle the rest — start to finish.",
    b2b_step1_title: "Tell us what you need",
    b2b_step1_desc:
      "Share your order and where it's sourced in India — your supplier, the local market, or a manufacturer.",
    b2b_step2_title: "We pick it up in bulk",
    b2b_step2_desc:
      "Our team collects your goods anywhere in India — spices, groceries, fabrics, ready stock, you name it.",
    b2b_step3_title: "We pack, ship & clear customs",
    b2b_step3_desc:
      "Bulk-freight packing plus all the import paperwork and customs handled for you — no headaches.",
    b2b_step4_title: "Delivered to your premises",
    b2b_step4_desc:
      "It arrives at your restaurant, store or boutique — fully tracked. We can also set up regular repeat pickups.",
    b2b_source_badge: "What You Can Source",
    b2b_source_title: "Stock Your Shelves, Straight From The Source",
    b2b_source_item1_title: "Food & Grocery",
    b2b_source_item1_desc:
      "Spices & masalas, lentils & grains, flours, snacks, sweets, packaged & frozen foods, pooja and household items.",
    b2b_source_item2_title: "Fabric & Fashion",
    b2b_source_item2_desc:
      "Fabrics & textiles, sarees, lehengas, suits, ethnic & festive wear, and accessories — in retail quantities or bulk.",
    b2b_source_item3_title: "Bulk, Mixed Or Recurring Orders",
    b2b_source_item3_desc:
      "Whether It's A One-Off Bulk Consignment Or A Regular Monthly Restock Tailored To Your Business Rhythm, We Handle It. Not Sure If We Can Source Or Ship An Item? Just Ask Us On WhatsApp — We'll Confirm Before You Commit.",
    b2b_where_badge: "Where We Pick Up And Deliver",
    b2b_where_title: "Where We Pick Up And Deliver",
    b2b_pickup_title: "Pickup Across India",
    b2b_pickup_desc:
      "We specialise in North India — with pan-India pickup available on request.",
    b2b_pan_india: "+ Pan-India",
    b2b_delivery_title: "Delivery Destinations",
    b2b_worldwide: "+ Worldwide",
    b2b_delivery_via:
      "Worldwide freight through our trusted shipping partners:",
    b2b_what_ship_title: "What You Can Ship",
    b2b_what_ship_desc:
      "Rakhis And Festival Gifts · Sweets & Dry Fruits · Gift Hampers · Clothing & Ethnic Wear · Business Documents · Commercial Samples · Personal Parcels. Not Sure About An Item?",
    b2b_what_ship_ask: "Ask Us On WhatsApp",
    b2b_what_ship_confirm: " — We'll Confirm Before You Book.",
    b2b_why_badge: "Why Manvi International",
    b2b_why_title: "A Logistics Partner You Can Build On",
    b2b_why_sub:
      "Sourcing for a business is about reliability and margins, not one-off luck. Here's why store owners trust us.",
    b2b_reason1_title: "Bulk & Cargo Expertise",
    b2b_reason1_desc:
      "From a single carton to full bulk consignments — packed and shipped to handle volume.",
    b2b_reason2_title: "Customs & Paperwork Handled",
    b2b_reason2_desc:
      "We manage import documentation and clearance so your stock isn't stuck at the border.",
    b2b_reason3_title: "Regular, Repeatable Pickups",
    b2b_reason3_desc:
      "Set up recurring restocks tailored to your business rhythm — weekly, monthly, seasonal.",
    b2b_reason4_title: "A Dedicated Point Of Contact",
    b2b_reason4_desc:
      "Talk to a real person on WhatsApp who knows your account — not a ticket queue.",
    b2b_reason5_title: "Transparent Pricing",
    b2b_reason5_desc:
      "Rates based on weight, destination and urgency. No hidden fees, no surprise surcharges.",
    b2b_reason6_title: "Established Logistics Company",
    b2b_reason6_desc:
      "Manvi International is a registered logistics business with global carrier partnerships.",
    b2b_faq1_q: "Is There A Minimum Order?",
    b2b_faq1_a:
      "We handle everything from a single carton to full bulk consignments. Share what you need on WhatsApp and we'll advise the most cost-effective way to ship it.",
    b2b_faq2_q: "How Is The Price Worked Out?",
    b2b_faq2_a:
      "Rates are based on weight, destination country and how fast you need it — with no hidden fees. Send us your list and we'll give you a clear quote.",
    b2b_faq3_q: "Do You Handle Customs And Import Paperwork?",
    b2b_faq3_a:
      "Yes. We manage documentation and clearance with our global carrier partners, so your stock moves smoothly across the border. (Any destination-country import duties are separate and depend on your local rules — we'll guide you.)",
    b2b_faq4_q: "Can You Set Up Regular, Recurring Shipments?",
    b2b_faq4_a:
      "Absolutely. Many of our business clients run scheduled restocks — weekly, monthly or seasonal — tailored to their business rhythm.",
    b2b_faq5_q: "How Long Does Bulk Delivery Take?",
    b2b_faq5_a:
      "It depends on the volume, route and customs, typically a few days to a couple of weeks. Order ahead of festive peaks to be safe — we'll confirm timelines on your quote.",
    b2b_faq6_q: "What Can't You Ship?",
    b2b_faq6_a:
      "We don't ship hazardous chemicals, negotiable currency, precious stones, or illegal goods. If you're unsure about a specific item, ask us before booking; we'll confirm.",
    b2b_faq7_q: "How Do I Pay?",
    b2b_faq7_a:
      "We'll share secure payment options once your quote is confirmed on WhatsApp.",
    b2b_cta_title: "Ready To Stock Up From India?",
    b2b_cta_sub:
      "Send Us Your List And Pickup Location. We'll Handle Pickup, Shipping And Customs.",
    b2b_call: "Call +91 7070506070",
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
    claim_tab3_title: "Claims for lost, damaged, or destroyed shipments",
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
      "No hidden costs. No surprises.\njust straightforward logistics.",
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
    faq_title: "Questions? Glad you asked",
    faq_q1: "Where can i send my packages?",
    faq_a1:
      "Almost anywhere! We have a strong presence in the USA, Canada, UK, Europe, and Australia. Whether it's a big city or a quiet suburb, we'll get it there.",
    faq_q2: "How Much Does It Cost?",
    faq_a2:
      "Pricing depends on destination, weight, and service type. Parcel shipping to the USA starts from ₹679/kg.",
    faq_q2_link: "Get a quick quote",
    faq_q2_after:
      " or message us on WhatsApp for an exact price; no hidden charges.",
    faq_q3: "How Long Does Delivery Take?",
    faq_a3:
      "Most shipments arrive within a few days to two weeks depending on destination and service level. We guarantee on-time delivery when you order within our confirmed service windows.",
    faq_q4: "Can I Track My Shipment?",
    faq_a4:
      "Yes. You'll receive a tracking number the moment your parcel is collected. Track live at manvicourier.com/track. We also send WhatsApp updates at every stage.",
    faq_q5: "What Can't Be Shipped?",
    faq_a5:
      "Hazardous chemicals, negotiable currency, precious stones, and prohibited or illegal goods. If you're unsure about a specific item, ask us before booking; we'll confirm.",
    contact_badge: "Get In Touch",
    contact_title: "We're Here For You",
    contact_desc:
      "We believe in value. Your quote is based on exactly what you need—considering weight, destination, and how fast you need it delivered. We promise no hidden surprises when it's time to pay.",
    contact_call: "Call Us",
    contact_whatsapp: "Whatsapp Us",
    contact_info: "Contact Info",
    footer_tagline: "Connecting families, bridging distances",
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
    quote_how_calc_title: "How is your quote calculated?",
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

    // Campaign Page - English
    campaign_hero_badge: "International Courier Service",
    campaign_hero_title_line1: "Your Parcel, Picked Up",
    campaign_hero_title_line2: "In India :",
    campaign_hero_title_highlight1: "Delivered To",
    campaign_hero_title_highlight2: "Your Door Worldwide.",
    campaign_hero_subtext:
      "Documents, gifts, parcels, and commercial shipments to the USA, UK, Canada, Australia and beyond. Doorstep pickup. Customs handled. Real-time tracking.",
    campaign_hero_trusted: "Trusted By 10,000+ Families Worldwide",
    campaign_hero_shipments: "50,000+ Shipments Delivered",
    campaign_partners_title: "Trusted Delivery\nPartners ✈️",
    campaign_how_it_works_badge: "How It Works",
    campaign_how_it_works_title: "Ship in Four Simple Steps",
    campaign_how_it_works_sub:
      "No complicated forms. Just WhatsApp us your details and we handle the rest; pickup to delivery.",
    campaign_step1_title: "WhatsApp us your details",
    campaign_step1_desc:
      "Tell us what you're sending, where it is in India, and your delivery address overseas.",
    campaign_step2_title: "We pick it up in India",
    campaign_step2_desc:
      "Our team collects from your home, a shop, or a relative's doorstep; doorstep pickup across India.",
    campaign_step3_title: "We pack, ship and handle customs",
    campaign_step3_desc:
      "Professionally packed, securely shipped, and all customs paperwork managed for you.",
    campaign_step4_title: "Delivered to your door",
    campaign_step4_desc:
      "Your parcel arrives overseas, fully tracked end-to-end, right to your doorstep.",
    campaign_where_badge: "Where We Pick Up and Deliver",
    campaign_where_title: "Where We Pick Up and Deliver",
    campaign_pickup_title: "📍 Pickup Across India",
    campaign_pickup_desc:
      "We specialise in North India, with pan-India pickup available on request.",
    campaign_pan_india: "+ Pan-India",
    campaign_delivery_title: "✈️ Delivery Destinations",
    campaign_worldwide: "+ Worldwide",
    campaign_delivery_via:
      "Delivered via our trusted global carrier network: Aramex, Courier Please, DHL, DPD, FedEx, UPS.",
    campaign_what_ship_title: "🎁 What You Can Ship",
    campaign_what_ship_desc:
      "Rakhis and festival gifts, sweets & dry fruits, gift hampers, clothing & ethnic wear, business documents, commercial samples, personal parcels. Not sure about an item?",
    campaign_what_ship_ask: "Ask us on WhatsApp",
    campaign_what_ship_confirm: "; we'll confirm before you book.",
    campaign_stats_title: "Numbers That Speak for Themselves",
    campaign_stat1_value: "99.97%",
    campaign_stat1_label: "Delivery Success Rate",
    campaign_stat2_value: "1M+",
    campaign_stat2_label: "Shipments Delivered",
    campaign_stat3_value: "100K+",
    campaign_stat3_label: "Happy Customers",
    campaign_stat4_value: "300+",
    campaign_stat4_label: "Employees",
    campaign_testimonials_badge: "From Our Customers",
    campaign_testimonials_title: "Trusted by Families Worldwide",
    campaign_testimonial1:
      "My brother's gift was sitting at our home in Ludhiana. They picked it up and it reached me in Toronto within days. I cried a little, honestly.",
    campaign_testimonial2:
      "I was nervous about sending sweets overseas, but everything arrived perfectly. The WhatsApp updates kept me calm the whole time.",
    campaign_testimonial3:
      "My brother's gift was sitting at our home in Ludhiana. They picked it up and it reached me in Toronto within days. I cried a little, honestly.",
    campaign_testimonial4:
      "Sent a parcel of clothes and dry fruits to my mother in Sydney. Arrived before the festival. Excellent service, highly recommend.",
    campaign_faq6_q: "How Do I Pay?",
    campaign_faq6_a:
      "Payment options are shared once your quote is confirmed on WhatsApp. You only pay when you're happy with the details. Secure payment links provided.",
    campaign_days: "Days",
    campaign_hrs: "Hrs",
    campaign_min: "Min",
    campaign_sec: "Sec",
    campaign_cta_title: "Send Your Parcel from India Today.",
    campaign_cta_sub:
      "Tell us where it is in India and where it needs to go. We'll handle everything else; pickup to delivery.",
    campaign_call: "Call +91 7070 506070",
  },

  hi: {
    footer_pickup_availability: "पिकअप उपलब्धता",
    footer_campaign: "अभियान",
    footer_business_campaign: "व्यावसायिक अभियान",
    footer_blog: "ब्लॉग",
    footer_career: "करियर",
    b2b_hero_badge: "भारतीय व्यवसायों के लिए थोक सोर्सिंग",
    b2b_hero_title_line1: "भारत से सोर्स करें।",
    b2b_hero_title_line2: "आपके व्यवसाय तक पहुंचाया जाएगा",
    b2b_hero_title_line3: "आपके देश में।",
    b2b_hero_subtext:
      "विदेश में भारतीय रेस्तरां, किराना, बुटीक या वस्त्र स्टोर चलाते हैं? हमें बताएं <strong>आपको क्या चाहिए और यह भारत में कहाँ है —</strong> मसाले, किराना, कपड़े, पारंपरिक पहनावा — और हम इसे थोक में उठाकर आपके दरवाजे तक पहुंचाएंगे। <strong>कस्टम क्लीयरेंस हम संभालेंगे।</strong>",
    b2b_hero_trusted: "दुनिया भर में भारतीय व्यवसायों द्वारा भरोसेमंद",
    b2b_hero_destinations: "USA · UK · कनाडा · ऑस्ट्रेलिया",
    b2b_call_now: "अभी कॉल करें",
    b2b_partners_title: "भरोसेमंद डिलीवरी",
    b2b_partners_subtitle: "पार्टनर्स",
    b2b_how_it_works_badge: "यह कैसे काम करता है",
    b2b_how_it_works_title: "भारत से आपके व्यवसाय तक चार चरणों में",
    b2b_how_it_works_sub:
      "कोई जटिल प्रक्रिया नहीं। हमें WhatsApp पर अपनी सूची भेजें और बाकी हम संभाल लेंगे — शुरू से अंत तक।",
    b2b_step1_title: "हमें बताएं कि आपको क्या चाहिए",
    b2b_step1_desc:
      "अपना ऑर्डर और बताएं कि यह भारत में कहाँ से सोर्स किया जा रहा है — आपका सप्लायर, स्थानीय बाजार, या निर्माता।",
    b2b_step2_title: "हम थोक में पिकअप करते हैं",
    b2b_step2_desc:
      "हमारी टीम भारत में कहीं से भी आपका सामान इकट्ठा करती है — मसाले, किराना, कपड़े, रेडी स्टॉक, जो भी हो।",
    b2b_step3_title: "हम पैक, शिप और कस्टम क्लियर करते हैं",
    b2b_step3_desc:
      "बल्क-फ्रेट पैकिंग और सभी आयात कागजी कार्रवाई और कस्टम क्लीयरेंस हम संभालते हैं — कोई सिरदर्द नहीं।",
    b2b_step4_title: "आपके परिसर में डिलीवरी",
    b2b_step4_desc:
      "यह आपके रेस्तरां, स्टोर या बुटीक तक पहुंचता है — पूरी तरह से ट्रैक किया गया। हम नियमित रिपीट पिकअप भी सेट कर सकते हैं।",
    b2b_source_badge: "आप क्या सोर्स कर सकते हैं",
    b2b_source_title: "अपनी अलमारियों को स्टॉक करें, सीधे सोर्स से",
    b2b_source_item1_title: "भोजन और किराना",
    b2b_source_item1_desc:
      "मसाले, दालें और अनाज, आटा, स्नैक्स, मिठाइयाँ, पैक्ड और फ्रोजन फूड, पूजा और घरेलू सामान।",
    b2b_source_item2_title: "कपड़ा और फैशन",
    b2b_source_item2_desc:
      "कपड़े और टेक्सटाइल, साड़ियाँ, लहंगे, सूट, पारंपरिक और त्योहारी पहनावा, और एक्सेसरीज़ — खुदरा मात्रा या थोक में।",
    b2b_source_item3_title: "बल्क, मिक्स्ड या आवर्ती ऑर्डर",
    b2b_source_item3_desc:
      "चाहे वह एक बार की बल्क खेप हो या आपके व्यवसाय की लय के अनुसार नियमित मासिक रीस्टॉक, हम संभालते हैं। निश्चित नहीं हैं कि हम कोई आइटम सोर्स या शिप कर सकते हैं? बस हमें WhatsApp पर पूछें — हम आपकी प्रतिबद्धता से पहले पुष्टि करेंगे।",
    b2b_where_badge: "हम कहाँ पिकअप और डिलीवरी करते हैं",
    b2b_where_title: "हम कहाँ पिकअप और डिलीवरी करते हैं",
    b2b_pickup_title: "पूरे भारत में पिकअप",
    b2b_pickup_desc:
      "हम उत्तर भारत में विशेषज्ञ हैं — अनुरोध पर पूरे भारत में पिकअप उपलब्ध है।",
    b2b_pan_india: "+ पूरे भारत में",
    b2b_delivery_title: "डिलीवरी गंतव्य",
    b2b_worldwide: "+ दुनिया भर में",
    b2b_delivery_via:
      "हमारे भरोसेमंद शिपिंग पार्टनर्स के माध्यम से दुनिया भर में माल भेजना:",
    b2b_what_ship_title: "आप क्या शिप कर सकते हैं",
    b2b_what_ship_desc:
      "राखी और त्योहार के उपहार · मिठाई और सूखे मेवे · गिफ्ट हैम्पर · कपड़े और पारंपरिक पहनावा · व्यावसायिक दस्तावेज़ · व्यावसायिक नमूने · व्यक्तिगत पार्सल। किसी आइटम के बारे में अनिश्चित हैं?",
    b2b_what_ship_ask: "हमें WhatsApp पर पूछें",
    b2b_what_ship_confirm: " — हम बुकिंग से पहले पुष्टि करेंगे।",
    b2b_why_badge: "मानवी इंटरनेशनल क्यों",
    b2b_why_title: "एक लॉजिस्टिक्स पार्टनर जिस पर आप भरोसा कर सकते हैं",
    b2b_why_sub:
      "व्यवसाय के लिए सोर्सिंग विश्वसनीयता और मार्जिन के बारे में है, न कि एक बार की किस्मत। यहाँ बताया गया है कि स्टोर मालिक हम पर क्यों भरोसा करते हैं।",
    b2b_reason1_title: "बल्क और कार्गो विशेषज्ञता",
    b2b_reason1_desc:
      "एक कार्टन से लेकर पूरी बल्क खेप तक — वॉल्यूम संभालने के लिए पैक और शिप किया गया।",
    b2b_reason2_title: "कस्टम और कागजी कार्रवाई संभाली",
    b2b_reason2_desc:
      "हम आयात दस्तावेज़ीकरण और क्लीयरेंस का प्रबंधन करते हैं ताकि आपका स्टॉक सीमा पर न फंसे।",
    b2b_reason3_title: "नियमित, रिपीटेबल पिकअप",
    b2b_reason3_desc:
      "आपके व्यवसाय की लय के अनुसार आवर्ती रीस्टॉक सेट करें — साप्ताहिक, मासिक, मौसमी।",
    b2b_reason4_title: "संपर्क का एक समर्पित बिंदु",
    b2b_reason4_desc:
      "WhatsApp पर एक वास्तविक व्यक्ति से बात करें जो आपके खाते को जानता है — न कि कोई टिकट कतार।",
    b2b_reason5_title: "पारदर्शी मूल्य निर्धारण",
    b2b_reason5_desc:
      "वजन, गंतव्य और तात्कालिकता के आधार पर दरें। कोई छिपा शुल्क नहीं, कोई आश्चर्यजनक अधिभार नहीं।",
    b2b_reason6_title: "स्थापित लॉजिस्टिक्स कंपनी",
    b2b_reason6_desc:
      "मानवी इंटरनेशनल एक पंजीकृत लॉजिस्टिक्स व्यवसाय है जिसकी वैश्विक कैरियर साझेदारी है।",
    b2b_faq1_q: "क्या कोई न्यूनतम ऑर्डर है?",
    b2b_faq1_a:
      "हम एक कार्टन से लेकर पूरी बल्क खेप तक सब कुछ संभालते हैं। WhatsApp पर अपनी आवश्यकता साझा करें और हम इसे शिप करने का सबसे लागत-प्रभावी तरीका बताएंगे।",
    b2b_faq2_q: "कीमत कैसे तय होती है?",
    b2b_faq2_a:
      "दरें वजन, गंतव्य देश और आपको कितनी जल्दी चाहिए, के आधार पर होती हैं — कोई छिपा शुल्क नहीं। हमें अपनी सूची भेजें और हम आपको एक स्पष्ट कोटेशन देंगे।",
    b2b_faq3_q: "क्या आप कस्टम और आयात कागजी कार्रवाई संभालते हैं?",
    b2b_faq3_a:
      "हाँ। हम अपने वैश्विक कैरियर पार्टनर्स के साथ दस्तावेज़ीकरण और क्लीयरेंस का प्रबंधन करते हैं, ताकि आपका स्टॉक सीमा पार सुचारू रूप से चले। (किसी भी गंतव्य-देश के आयात शुल्क अलग हैं और आपके स्थानीय नियमों पर निर्भर करते हैं — हम आपका मार्गदर्शन करेंगे।)",
    b2b_faq4_q: "क्या आप नियमित, आवर्ती शिपमेंट सेट कर सकते हैं?",
    b2b_faq4_a:
      "बिल्कुल। हमारे कई व्यावसायिक ग्राहक शेड्यूल्ड रीस्टॉक चलाते हैं — साप्ताहिक, मासिक या मौसमी — उनके व्यवसाय की लय के अनुसार।",
    b2b_faq5_q: "बल्क डिलीवरी में कितना समय लगता है?",
    b2b_faq5_a:
      "यह वॉल्यूम, रूट और कस्टम पर निर्भर करता है, आमतौर पर कुछ दिनों से दो सप्ताह तक। सुरक्षित रहने के लिए त्योहारी पीक से पहले ऑर्डर करें — हम आपके कोटेशन पर समय-सीमा की पुष्टि करेंगे।",
    b2b_faq6_q: "आप क्या शिप नहीं कर सकते?",
    b2b_faq6_a:
      "हम खतरनाक रसायन, परक्राम्य मुद्रा, कीमती पत्थर, या अवैध सामान नहीं भेजते हैं। यदि आप किसी विशिष्ट वस्तु के बारे में अनिश्चित हैं, तो बुकिंग से पहले हमसे पूछें; हम पुष्टि करेंगे।",
    b2b_faq7_q: "मैं भुगतान कैसे करूं?",
    b2b_faq7_a:
      "आपके कोटेशन की WhatsApp पर पुष्टि होने के बाद हम सुरक्षित भुगतान विकल्प साझा करेंगे।",
    b2b_cta_title: "भारत से स्टॉक करने के लिए तैयार हैं?",
    b2b_cta_sub:
      "हमें अपनी सूची और पिकअप स्थान भेजें। हम पिकअप, शिपिंग और कस्टम संभालेंगे।",
    b2b_call: "कॉल करें +91 7070506070",
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
    faq_q2: "इसकी लागत कितनी है?",
    faq_a2:
      "मूल्य निर्धारण गंतव्य, वजन और सेवा प्रकार पर निर्भर करता है। USA के लिए पार्सल शिपिंग ₹679/किग्रा से शुरू होती है।",
    faq_q2_link: "त्वरित कोटेशन लें",
    faq_q2_after:
      " या सटीक मूल्य के लिए हमें WhatsApp पर संदेश दें; कोई छिपा शुल्क नहीं।",
    faq_q3: "डिलीवरी में कितना समय लगता है?",
    faq_a3:
      "अधिकांश शिपमेंट गंतव्य और सेवा स्तर के आधार पर कुछ दिनों से दो सप्ताह के भीतर पहुंच जाते हैं। हम पुष्टि की गई सेवा समय-सीमा के भीतर ऑर्डर करने पर समय पर डिलीवरी की गारंटी देते हैं।",
    faq_q4: "क्या मैं अपने शिपमेंट को ट्रैक कर सकता हूँ?",
    faq_a4:
      "हाँ। आपके पार्सल के कलेक्ट होते ही आपको एक ट्रैकिंग नंबर मिल जाएगा। manvicourier.com/track पर लाइव ट्रैक करें। हम हर चरण पर WhatsApp अपडेट भी भेजते हैं।",
    faq_q5: "क्या कुछ ऐसा है जो मैं शिप नहीं कर सकता?",
    faq_a5:
      "खतरनाक रसायन, परक्राम्य मुद्रा, कीमती पत्थर, और प्रतिबंधित या अवैध सामान। यदि आप किसी विशिष्ट वस्तु के बारे में अनिश्चित हैं, तो बुकिंग से पहले हमसे पूछें; हम पुष्टि करेंगे।",
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

    // Campaign Page - Hindi
    campaign_hero_badge: "अंतर्राष्ट्रीय कूरियर सेवा",
    campaign_hero_title_line1: "आपका पार्सल, हम उठाएंगे",
    campaign_hero_title_line2: "भारत में :",
    campaign_hero_title_highlight1: "पहुंचाया जाएगा",
    campaign_hero_title_highlight2: "दुनिया भर में आपके दरवाजे तक।",
    campaign_hero_subtext:
      "USA, UK, कनाडा, ऑस्ट्रेलिया और अन्य देशों में दस्तावेज़, उपहार, पार्सल और वाणिज्यिक शिपमेंट। घर से पिकअप। कस्टम क्लीयरेंस। रियल-टाइम ट्रैकिंग।",
    campaign_hero_trusted: "दुनिया भर में 10,000+ परिवारों द्वारा भरोसेमंद",
    campaign_hero_shipments: "50,000+ शिपमेंट डिलीवर किए गए",
    campaign_partners_title: "भरोसेमंद डिलीवरी\nपार्टनर्स ✈️",
    campaign_how_it_works_badge: "यह कैसे काम करता है",
    campaign_how_it_works_title: "चार सरल चरणों में शिप करें",
    campaign_how_it_works_sub:
      "कोई जटिल फॉर्म नहीं। बस हमें WhatsApp पर अपना विवरण भेजें और बाकी हम संभाल लेंगे; पिकअप से डिलीवरी तक।",
    campaign_step1_title: "हमें WhatsApp पर अपना विवरण भेजें",
    campaign_step1_desc:
      "हमें बताएं कि आप क्या भेज रहे हैं, भारत में यह कहाँ है, और विदेश में आपका डिलीवरी पता।",
    campaign_step2_title: "हम भारत में पिकअप करते हैं",
    campaign_step2_desc:
      "हमारी टीम आपके घर, दुकान या रिश्तेदार के दरवाजे से सामान लेती है; पूरे भारत में घर से पिकअप।",
    campaign_step3_title: "हम पैक, शिप और कस्टम संभालते हैं",
    campaign_step3_desc:
      "पेशेवर रूप से पैक किया गया, सुरक्षित रूप से शिप किया गया, और सभी कस्टम कागजी कार्रवाई आपके लिए प्रबंधित की गई।",
    campaign_step4_title: "आपके दरवाजे पर डिलीवरी",
    campaign_step4_desc:
      "आपका पार्सल विदेश पहुंचता है, पूरी तरह से एंड-टू-एंड ट्रैक किया गया, सीधे आपके दरवाजे तक।",
    campaign_where_badge: "हम कहाँ पिकअप और डिलीवरी करते हैं",
    campaign_where_title: "हम कहाँ पिकअप और डिलीवरी करते हैं",
    campaign_pickup_title: "📍 पूरे भारत में पिकअप",
    campaign_pickup_desc:
      "हम उत्तर भारत में विशेषज्ञ हैं, अनुरोध पर पूरे भारत में पिकअप उपलब्ध है।",
    campaign_pan_india: "+ पूरे भारत में",
    campaign_delivery_title: "✈️ डिलीवरी गंतव्य",
    campaign_worldwide: "+ दुनिया भर में",
    campaign_delivery_via:
      "हमारे भरोसेमंद वैश्विक कैरियर नेटवर्क के माध्यम से डिलीवरी: Aramex, Courier Please, DHL, DPD, FedEx, UPS।",
    campaign_what_ship_title: "🎁 आप क्या शिप कर सकते हैं",
    campaign_what_ship_desc:
      "राखी और त्योहार के उपहार, मिठाई और सूखे मेवे, गिफ्ट हैम्पर, कपड़े और पारंपरिक पहनावा, व्यावसायिक दस्तावेज़, व्यावसायिक नमूने, व्यक्तिगत पार्सल। किसी वस्तु के बारे में अनिश्चित हैं?",
    campaign_what_ship_ask: "हमें WhatsApp पर पूछें",
    campaign_what_ship_confirm: "; बुकिंग से पहले हम पुष्टि करेंगे।",
    campaign_stats_title: "संख्याएं जो अपने लिए बोलती हैं",
    campaign_stat1_value: "99.97%",
    campaign_stat1_label: "डिलीवरी सफलता दर",
    campaign_stat2_value: "1M+",
    campaign_stat2_label: "शिपमेंट डिलीवर किए गए",
    campaign_stat3_value: "100K+",
    campaign_stat3_label: "खुश ग्राहक",
    campaign_stat4_value: "300+",
    campaign_stat4_label: "कर्मचारी",
    campaign_testimonials_badge: "हमारे ग्राहकों से",
    campaign_testimonials_title: "दुनिया भर के परिवारों द्वारा भरोसेमंद",
    campaign_testimonial1:
      "मेरे भाई का उपहार लुधियाना में हमारे घर पर पड़ा था। उन्होंने इसे उठाया और कुछ ही दिनों में यह मुझे टोरंटो में मिल गया। सच में, मुझे थोड़ा रोना आ गया।",
    campaign_testimonial2:
      "मुझे विदेश में मिठाई भेजने की चिंता थी, लेकिन सब कुछ बिल्कुल सही पहुंचा। WhatsApp अपडेट ने मुझे पूरे समय शांत रखा।",
    campaign_testimonial3:
      "मेरे भाई का उपहार लुधियाना में हमारे घर पर पड़ा था। उन्होंने इसे उठाया और कुछ ही दिनों में यह मुझे टोरंटो में मिल गया। सच में, मुझे थोड़ा रोना आ गया।",
    campaign_testimonial4:
      "सिडनी में अपनी माँ को कपड़े और सूखे मेवे का पार्सल भेजा। त्योहार से पहले पहुंच गया। उत्कृष्ट सेवा, अत्यधिक अनुशंसा करता हूँ।",
    campaign_faq6_q: "मैं भुगतान कैसे करूं?",
    campaign_faq6_a:
      "भुगतान विकल्प WhatsApp पर आपके कोटेशन की पुष्टि होने के बाद साझा किए जाते हैं। आप केवल तभी भुगतान करते हैं जब आप विवरण से खुश हों। सुरक्षित भुगतान लिंक प्रदान किए जाते हैं।",
    campaign_days: "दिन",
    campaign_hrs: "घंटे",
    campaign_min: "मिनट",
    campaign_sec: "सेकंड",
    campaign_cta_title: "आज ही भारत से अपना पार्सल भेजें।",
    campaign_cta_sub:
      "हमें बताएं कि यह भारत में कहाँ है और कहाँ जाना है। बाकी सब हम संभाल लेंगे; पिकअप से डिलीवरी तक।",
    campaign_call: "कॉल करें +91 7070 506070",
  },

  pa: {
    footer_pickup_availability: "ਪਿਕਅੱਪ ਉਪਲਬਧਤਾ",
    footer_campaign: "ਮੁਹਿੰਮ",
    footer_business_campaign: "ਵਪਾਰਕ ਮੁਹਿੰਮ",
    footer_blog: "ਬਲੌਗ",
    footer_career: "ਕੈਰੀਅਰ",
    // Add to the 'pa' object in LanguageContext.tsx
    b2b_hero_badge: "ਭਾਰਤੀ ਕਾਰੋਬਾਰਾਂ ਲਈ ਬਲਕ ਸੋਰਸਿੰਗ",
    b2b_hero_title_line1: "ਭਾਰਤ ਤੋਂ ਸੋਰਸ ਕਰੋ।",
    b2b_hero_title_line2: "ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਤੱਕ ਪਹੁੰਚਾਇਆ ਜਾਵੇਗਾ",
    b2b_hero_title_line3: "ਤੁਹਾਡੇ ਦੇਸ਼ ਵਿੱਚ।",
    b2b_hero_subtext:
      "ਵਿਦੇਸ਼ ਵਿੱਚ ਭਾਰਤੀ ਰੈਸਟੋਰੈਂਟ, ਕਰਿਆਨਾ, ਬੁਟੀਕ ਜਾਂ ਵਸਤਰ ਸਟੋਰ ਚਲਾਉਂਦੇ ਹੋ? ਸਾਨੂੰ ਦੱਸੋ <strong>ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ ਅਤੇ ਇਹ ਭਾਰਤ ਵਿੱਚ ਕਿੱਥੇ ਹੈ —</strong> ਮਸਾਲੇ, ਕਰਿਆਨਾ, ਕੱਪੜੇ, ਪਰੰਪਰਾਗਤ ਪਹਿਰਾਵਾ — ਅਤੇ ਅਸੀਂ ਇਸਨੂੰ ਬਲਕ ਵਿੱਚ ਚੁੱਕ ਕੇ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੱਕ ਪਹੁੰਚਾਵਾਂਗੇ। <strong>ਕਸਟਮ ਕਲੀਅਰੈਂਸ ਅਸੀਂ ਸੰਭਾਲਾਂਗੇ।</strong>",
    b2b_hero_trusted: "ਦੁਨੀਆ ਭਰ ਵਿੱਚ ਭਾਰਤੀ ਕਾਰੋਬਾਰਾਂ ਦੁਆਰਾ ਭਰੋਸੇਯੋਗ",
    b2b_hero_destinations: "USA · UK · ਕੈਨੇਡਾ · ਆਸਟ੍ਰੇਲੀਆ",
    b2b_call_now: "ਹੁਣੇ ਕਾਲ ਕਰੋ",
    b2b_partners_title: "ਭਰੋਸੇਯੋਗ ਡਿਲੀਵਰੀ",
    b2b_partners_subtitle: "ਪਾਰਟਨਰ",
    b2b_how_it_works_badge: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    b2b_how_it_works_title: "ਭਾਰਤ ਤੋਂ ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਤੱਕ ਚਾਰ ਕਦਮਾਂ ਵਿੱਚ",
    b2b_how_it_works_sub:
      "ਕੋਈ ਗੁੰਝਲਦਾਰ ਪ੍ਰਕਿਰਿਆ ਨਹੀਂ। ਸਾਨੂੰ WhatsApp 'ਤੇ ਆਪਣੀ ਸੂਚੀ ਭੇਜੋ ਅਤੇ ਬਾਕੀ ਅਸੀਂ ਸੰਭਾਲ ਲਵਾਂਗੇ — ਸ਼ੁਰੂ ਤੋਂ ਅੰਤ ਤੱਕ।",
    b2b_step1_title: "ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ",
    b2b_step1_desc:
      "ਆਪਣਾ ਆਰਡਰ ਅਤੇ ਦੱਸੋ ਕਿ ਇਹ ਭਾਰਤ ਵਿੱਚ ਕਿੱਥੋਂ ਸੋਰਸ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ — ਤੁਹਾਡਾ ਸਪਲਾਇਰ, ਸਥਾਨਕ ਮਾਰਕੀਟ, ਜਾਂ ਨਿਰਮਾਤਾ।",
    b2b_step2_title: "ਅਸੀਂ ਬਲਕ ਵਿੱਚ ਪਿਕਅੱਪ ਕਰਦੇ ਹਾਂ",
    b2b_step2_desc:
      "ਸਾਡੀ ਟੀਮ ਭਾਰਤ ਵਿੱਚ ਕਿਤੇ ਵੀ ਤੁਹਾਡਾ ਸਾਮਾਨ ਇਕੱਠਾ ਕਰਦੀ ਹੈ — ਮਸਾਲੇ, ਕਰਿਆਨਾ, ਕੱਪੜੇ, ਰੈਡੀ ਸਟਾਕ, ਜੋ ਵੀ ਹੋਵੇ।",
    b2b_step3_title: "ਅਸੀਂ ਪੈਕ, ਸ਼ਿਪ ਅਤੇ ਕਸਟਮ ਕਲੀਅਰ ਕਰਦੇ ਹਾਂ",
    b2b_step3_desc:
      "ਬਲਕ-ਫ੍ਰੇਟ ਪੈਕਿੰਗ ਅਤੇ ਸਾਰੇ ਆਯਾਤ ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਅਤੇ ਕਸਟਮ ਕਲੀਅਰੈਂਸ ਅਸੀਂ ਸੰਭਾਲਦੇ ਹਾਂ — ਕੋਈ ਸਿਰਦਰਦ ਨਹੀਂ।",
    b2b_step4_title: "ਤੁਹਾਡੇ ਪਰਿਸਰ ਵਿੱਚ ਡਿਲੀਵਰੀ",
    b2b_step4_desc:
      "ਇਹ ਤੁਹਾਡੇ ਰੈਸਟੋਰੈਂਟ, ਸਟੋਰ ਜਾਂ ਬੁਟੀਕ ਤੱਕ ਪਹੁੰਚਦਾ ਹੈ — ਪੂਰੀ ਤਰ੍ਹਾਂ ਟਰੈਕ ਕੀਤਾ ਗਿਆ। ਅਸੀਂ ਨਿਯਮਤ ਰਿਪੀਟ ਪਿਕਅੱਪ ਵੀ ਸੈਟ ਕਰ ਸਕਦੇ ਹਾਂ।",
    b2b_source_badge: "ਤੁਸੀਂ ਕੀ ਸੋਰਸ ਕਰ ਸਕਦੇ ਹੋ",
    b2b_source_title: "ਆਪਣੀਆਂ ਅਲਮਾਰੀਆਂ ਨੂੰ ਸਟਾਕ ਕਰੋ, ਸਿੱਧੇ ਸੋਰਸ ਤੋਂ",
    b2b_source_item1_title: "ਭੋਜਨ ਅਤੇ ਕਰਿਆਨਾ",
    b2b_source_item1_desc:
      "ਮਸਾਲੇ, ਦਾਲਾਂ ਅਤੇ ਅਨਾਜ, ਆਟਾ, ਸਨੈਕਸ, ਮਿਠਾਈਆਂ, ਪੈਕਡ ਅਤੇ ਫ੍ਰੋਜ਼ਨ ਫੂਡ, ਪੂਜਾ ਅਤੇ ਘਰੇਲੂ ਸਮਾਨ।",
    b2b_source_item2_title: "ਕੱਪੜਾ ਅਤੇ ਫੈਸ਼ਨ",
    b2b_source_item2_desc:
      "ਕੱਪੜੇ ਅਤੇ ਟੈਕਸਟਾਈਲ, ਸਾੜੀਆਂ, ਲਹਿੰਗੇ, ਸੂਟ, ਪਰੰਪਰਾਗਤ ਅਤੇ ਤਿਉਹਾਰੀ ਪਹਿਰਾਵਾ, ਅਤੇ ਐਕਸੈਸਰੀਜ਼ — ਖੁਦਰਾ ਮਾਤਰਾ ਜਾਂ ਬਲਕ ਵਿੱਚ।",
    b2b_source_item3_title: "ਬਲਕ, ਮਿਕਸਡ ਜਾਂ ਆਵਰਤੀ ਆਰਡਰ",
    b2b_source_item3_desc:
      "ਚਾਹੇ ਇਹ ਇੱਕ ਵਾਰ ਦੀ ਬਲਕ ਖੇਪ ਹੋਵੇ ਜਾਂ ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਦੀ ਤਾਲ ਅਨੁਸਾਰ ਨਿਯਮਤ ਮਾਸਿਕ ਰੀਸਟਾਕ, ਅਸੀਂ ਸੰਭਾਲਦੇ ਹਾਂ। ਯਕੀਨੀ ਨਹੀਂ ਹੈ ਕਿ ਅਸੀਂ ਕੋਈ ਆਈਟਮ ਸੋਰਸ ਜਾਂ ਸ਼ਿਪ ਕਰ ਸਕਦੇ ਹਾਂ? ਬੱਸ ਸਾਨੂੰ WhatsApp 'ਤੇ ਪੁੱਛੋ — ਅਸੀਂ ਤੁਹਾਡੀ ਪ੍ਰਤੀਬੱਧਤਾ ਤੋਂ ਪਹਿਲਾਂ ਪੁਸ਼ਟੀ ਕਰਾਂਗੇ।",
    b2b_where_badge: "ਅਸੀਂ ਕਿੱਥੇ ਪਿਕਅੱਪ ਅਤੇ ਡਿਲੀਵਰੀ ਕਰਦੇ ਹਾਂ",
    b2b_where_title: "ਅਸੀਂ ਕਿੱਥੇ ਪਿਕਅੱਪ ਅਤੇ ਡਿਲੀਵਰੀ ਕਰਦੇ ਹਾਂ",
    b2b_pickup_title: "ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਪਿਕਅੱਪ",
    b2b_pickup_desc:
      "ਅਸੀਂ ਉੱਤਰੀ ਭਾਰਤ ਵਿੱਚ ਮਾਹਰ ਹਾਂ — ਬੇਨਤੀ 'ਤੇ ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਪਿਕਅੱਪ ਉਪਲਬਧ ਹੈ।",
    b2b_pan_india: "+ ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ",
    b2b_delivery_title: "ਡਿਲੀਵਰੀ ਮੰਜ਼ਿਲਾਂ",
    b2b_worldwide: "+ ਦੁਨੀਆ ਭਰ ਵਿੱਚ",
    b2b_delivery_via:
      "ਸਾਡੇ ਭਰੋਸੇਯੋਗ ਸ਼ਿਪਿੰਗ ਪਾਰਟਨਰਾਂ ਰਾਹੀਂ ਦੁਨੀਆ ਭਰ ਵਿੱਚ ਮਾਲ ਭੇਜਣਾ:",
    b2b_what_ship_title: "ਤੁਸੀਂ ਕੀ ਸ਼ਿਪ ਕਰ ਸਕਦੇ ਹੋ",
    b2b_what_ship_desc:
      "ਰੱਖੜੀ ਅਤੇ ਤਿਉਹਾਰ ਦੇ ਤੋਹਫ਼ੇ · ਮਿਠਾਈਆਂ ਅਤੇ ਸੁੱਕੇ ਮੇਵੇ · ਗਿਫਟ ਹੈਂਪਰ · ਕੱਪੜੇ ਅਤੇ ਪਰੰਪਰਾਗਤ ਪਹਿਰਾਵਾ · ਵਪਾਰਕ ਦਸਤਾਵੇਜ਼ · ਵਪਾਰਕ ਨਮੂਨੇ · ਨਿੱਜੀ ਪਾਰਸਲ। ਕਿਸੇ ਆਈਟਮ ਬਾਰੇ ਅਨਿਸ਼ਚਿਤ ਹੋ?",
    b2b_what_ship_ask: "ਸਾਨੂੰ WhatsApp 'ਤੇ ਪੁੱਛੋ",
    b2b_what_ship_confirm: " — ਅਸੀਂ ਬੁਕਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਪੁਸ਼ਟੀ ਕਰਾਂਗੇ।",
    b2b_why_badge: "ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਕਿਉਂ",
    b2b_why_title: "ਇੱਕ ਲੌਜਿਸਟਿਕਸ ਪਾਰਟਨਰ ਜਿਸ 'ਤੇ ਤੁਸੀਂ ਭਰੋਸਾ ਕਰ ਸਕਦੇ ਹੋ",
    b2b_why_sub:
      "ਕਾਰੋਬਾਰ ਲਈ ਸੋਰਸਿੰਗ ਭਰੋਸੇਯੋਗਤਾ ਅਤੇ ਮਾਰਜਿਨ ਬਾਰੇ ਹੈ, ਨਾ ਕਿ ਇੱਕ ਵਾਰ ਦੀ ਕਿਸਮਤ। ਇੱਥੇ ਦੱਸਿਆ ਗਿਆ ਹੈ ਕਿ ਸਟੋਰ ਮਾਲਕ ਸਾਡੇ 'ਤੇ ਕਿਉਂ ਭਰੋਸਾ ਕਰਦੇ ਹਨ।",
    b2b_reason1_title: "ਬਲਕ ਅਤੇ ਕਾਰਗੋ ਮੁਹਾਰਤ",
    b2b_reason1_desc:
      "ਇੱਕ ਕਾਰਟਨ ਤੋਂ ਲੈ ਕੇ ਪੂਰੀ ਬਲਕ ਖੇਪ ਤੱਕ — ਵਾਲੀਅਮ ਸੰਭਾਲਣ ਲਈ ਪੈਕ ਅਤੇ ਸ਼ਿਪ ਕੀਤਾ ਗਿਆ।",
    b2b_reason2_title: "ਕਸਟਮ ਅਤੇ ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਸੰਭਾਲੀ",
    b2b_reason2_desc:
      "ਅਸੀਂ ਆਯਾਤ ਦਸਤਾਵੇਜ਼ੀਕਰਨ ਅਤੇ ਕਲੀਅਰੈਂਸ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਦੇ ਹਾਂ ਤਾਂ ਜੋ ਤੁਹਾਡਾ ਸਟਾਕ ਸੀਮਾ 'ਤੇ ਨਾ ਫਸੇ।",
    b2b_reason3_title: "ਨਿਯਮਤ, ਰਿਪੀਟੇਬਲ ਪਿਕਅੱਪ",
    b2b_reason3_desc:
      "ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਦੀ ਤਾਲ ਅਨੁਸਾਰ ਆਵਰਤੀ ਰੀਸਟਾਕ ਸੈਟ ਕਰੋ — ਹਫਤਾਵਾਰੀ, ਮਾਸਿਕ, ਮੌਸਮੀ।",
    b2b_reason4_title: "ਸੰਪਰਕ ਦਾ ਇੱਕ ਸਮਰਪਿਤ ਬਿੰਦੂ",
    b2b_reason4_desc:
      "WhatsApp 'ਤੇ ਇੱਕ ਅਸਲੀ ਵਿਅਕਤੀ ਨਾਲ ਗੱਲ ਕਰੋ ਜੋ ਤੁਹਾਡੇ ਖਾਤੇ ਨੂੰ ਜਾਣਦਾ ਹੈ — ਨਾ ਕਿ ਕੋਈ ਟਿਕਟ ਕਤਾਰ।",
    b2b_reason5_title: "ਪਾਰਦਰਸ਼ੀ ਕੀਮਤ",
    b2b_reason5_desc:
      "ਵਜ਼ਨ, ਮੰਜ਼ਿਲ ਅਤੇ ਤੁਰੰਤਤਾ ਦੇ ਆਧਾਰ 'ਤੇ ਦਰਾਂ। ਕੋਈ ਲੁਕਿਆ ਚਾਰਜ ਨਹੀਂ, ਕੋਈ ਅਚਾਨਕ ਸਰਚਾਰਜ ਨਹੀਂ।",
    b2b_reason6_title: "ਸਥਾਪਿਤ ਲੌਜਿਸਟਿਕਸ ਕੰਪਨੀ",
    b2b_reason6_desc:
      "ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਇੱਕ ਰਜਿਸਟਰਡ ਲੌਜਿਸਟਿਕਸ ਕਾਰੋਬਾਰ ਹੈ ਜਿਸ ਦੀ ਗਲੋਬਲ ਕੈਰੀਅਰ ਸਾਂਝੇਦਾਰੀ ਹੈ।",
    b2b_faq1_q: "ਕੀ ਕੋਈ ਘੱਟੋ-ਘੱਟ ਆਰਡਰ ਹੈ?",
    b2b_faq1_a:
      "ਅਸੀਂ ਇੱਕ ਕਾਰਟਨ ਤੋਂ ਲੈ ਕੇ ਪੂਰੀ ਬਲਕ ਖੇਪ ਤੱਕ ਸਭ ਕੁਝ ਸੰਭਾਲਦੇ ਹਾਂ। WhatsApp 'ਤੇ ਆਪਣੀ ਲੋੜ ਸਾਂਝੀ ਕਰੋ ਅਤੇ ਅਸੀਂ ਇਸਨੂੰ ਸ਼ਿਪ ਕਰਨ ਦਾ ਸਭ ਤੋਂ ਲਾਗਤ-ਪ੍ਰਭਾਵੀ ਤਰੀਕਾ ਦੱਸਾਂਗੇ।",
    b2b_faq2_q: "ਕੀਮਤ ਕਿਵੇਂ ਤੈਅ ਹੁੰਦੀ ਹੈ?",
    b2b_faq2_a:
      "ਦਰਾਂ ਵਜ਼ਨ, ਮੰਜ਼ਿਲ ਦੇਸ਼ ਅਤੇ ਤੁਹਾਨੂੰ ਕਿੰਨੀ ਜਲਦੀ ਚਾਹੀਦਾ ਹੈ, ਦੇ ਆਧਾਰ 'ਤੇ ਹੁੰਦੀਆਂ ਹਨ — ਕੋਈ ਲੁਕਿਆ ਚਾਰਜ ਨਹੀਂ। ਸਾਨੂੰ ਆਪਣੀ ਸੂਚੀ ਭੇਜੋ ਅਤੇ ਅਸੀਂ ਤੁਹਾਨੂੰ ਇੱਕ ਸਪਸ਼ਟ ਕੋਟੇਸ਼ਨ ਦੇਵਾਂਗੇ।",
    b2b_faq3_q: "ਕੀ ਤੁਸੀਂ ਕਸਟਮ ਅਤੇ ਆਯਾਤ ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਸੰਭਾਲਦੇ ਹੋ?",
    b2b_faq3_a:
      "ਹਾਂ। ਅਸੀਂ ਆਪਣੇ ਗਲੋਬਲ ਕੈਰੀਅਰ ਪਾਰਟਨਰਾਂ ਨਾਲ ਦਸਤਾਵੇਜ਼ੀਕਰਨ ਅਤੇ ਕਲੀਅਰੈਂਸ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਦੇ ਹਾਂ, ਤਾਂ ਜੋ ਤੁਹਾਡਾ ਸਟਾਕ ਸੀਮਾ ਪਾਰ ਸੁਚਾਰੂ ਢੰਗ ਨਾਲ ਚਲੇ। (ਕਿਸੇ ਵੀ ਮੰਜ਼ਿਲ-ਦੇਸ਼ ਦੇ ਆਯਾਤ ਡਿਊਟੀਆਂ ਵੱਖਰੀਆਂ ਹਨ ਅਤੇ ਤੁਹਾਡੇ ਸਥਾਨਕ ਨਿਯਮਾਂ 'ਤੇ ਨਿਰਭਰ ਕਰਦੀਆਂ ਹਨ — ਅਸੀਂ ਤੁਹਾਡਾ ਮਾਰਗਦਰਸ਼ਨ ਕਰਾਂਗੇ।)",
    b2b_faq4_q: "ਕੀ ਤੁਸੀਂ ਨਿਯਮਤ, ਆਵਰਤੀ ਸ਼ਿਪਮੈਂਟ ਸੈਟ ਕਰ ਸਕਦੇ ਹੋ?",
    b2b_faq4_a:
      "ਬਿਲਕੁਲ। ਸਾਡੇ ਬਹੁਤ ਸਾਰੇ ਵਪਾਰਕ ਗਾਹਕ ਸ਼ਡਿਊਲਡ ਰੀਸਟਾਕ ਚਲਾਉਂਦੇ ਹਨ — ਹਫਤਾਵਾਰੀ, ਮਾਸਿਕ ਜਾਂ ਮੌਸਮੀ — ਉਹਨਾਂ ਦੇ ਕਾਰੋਬਾਰ ਦੀ ਤਾਲ ਅਨੁਸਾਰ।",
    b2b_faq5_q: "ਬਲਕ ਡਿਲੀਵਰੀ ਵਿੱਚ ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ?",
    b2b_faq5_a:
      "ਇਹ ਵਾਲੀਅਮ, ਰੂਟ ਅਤੇ ਕਸਟਮ 'ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ, ਆਮ ਤੌਰ 'ਤੇ ਕੁਝ ਦਿਨਾਂ ਤੋਂ ਦੋ ਹਫਤਿਆਂ ਤੱਕ। ਸੁਰੱਖਿਅਤ ਰਹਿਣ ਲਈ ਤਿਉਹਾਰੀ ਪੀਕ ਤੋਂ ਪਹਿਲਾਂ ਆਰਡਰ ਕਰੋ — ਅਸੀਂ ਤੁਹਾਡੇ ਕੋਟੇਸ਼ਨ 'ਤੇ ਸਮਾਂ-ਸੀਮਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰਾਂਗੇ।",
    b2b_faq6_q: "ਤੁਸੀਂ ਕੀ ਸ਼ਿਪ ਨਹੀਂ ਕਰ ਸਕਦੇ?",
    b2b_faq6_a:
      "ਅਸੀਂ ਖਤਰਨਾਕ ਰਸਾਇਣ, ਪਰਕਰਾਮਯੋਗ ਮੁਦਰਾ, ਕੀਮਤੀ ਪੱਥਰ, ਜਾਂ ਗੈਰਕਾਨੂੰਨੀ ਸਮਾਨ ਨਹੀਂ ਭੇਜਦੇ। ਜੇਕਰ ਤੁਸੀਂ ਕਿਸੇ ਖਾਸ ਵਸਤੂ ਬਾਰੇ ਅਨਿਸ਼ਚਿਤ ਹੋ, ਤਾਂ ਬੁਕਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਸਾਨੂੰ ਪੁੱਛੋ; ਅਸੀਂ ਪੁਸ਼ਟੀ ਕਰਾਂਗੇ।",
    b2b_faq7_q: "ਮੈਂ ਭੁਗਤਾਨ ਕਿਵੇਂ ਕਰਾਂ?",
    b2b_faq7_a:
      "ਤੁਹਾਡੇ ਕੋਟੇਸ਼ਨ ਦੀ WhatsApp 'ਤੇ ਪੁਸ਼ਟੀ ਹੋਣ ਤੋਂ ਬਾਅਦ ਅਸੀਂ ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ ਵਿਕਲਪ ਸਾਂਝੇ ਕਰਾਂਗੇ।",
    b2b_cta_title: "ਭਾਰਤ ਤੋਂ ਸਟਾਕ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ?",
    b2b_cta_sub:
      "ਸਾਨੂੰ ਆਪਣੀ ਸੂਚੀ ਅਤੇ ਪਿਕਅੱਪ ਸਥਾਨ ਭੇਜੋ। ਅਸੀਂ ਪਿਕਅੱਪ, ਸ਼ਿਪਿੰਗ ਅਤੇ ਕਸਟਮ ਸੰਭਾਲਾਂਗੇ।",
    b2b_call: "ਕਾਲ ਕਰੋ +91 7070506070",
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
    faq_q2: "ਇਸ ਦੀ ਕੀਮਤ ਕਿੰਨੀ ਹੈ?",
    faq_a2:
      "ਕੀਮਤ ਮੰਜ਼ਿਲ, ਭਾਰ ਅਤੇ ਸੇਵਾ ਦੀ ਕਿਸਮ 'ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ। USA ਲਈ ਪਾਰਸਲ ਸ਼ਿਪਿੰਗ ₹679/ਕਿਲੋ ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ।",
    faq_q2_link: "ਤੁਰੰਤ ਕੋਟੇਸ਼ਨ ਲਓ",
    faq_q2_after:
      " ਜਾਂ ਸਹੀ ਕੀਮਤ ਲਈ ਸਾਨੂੰ WhatsApp 'ਤੇ ਸੁਨੇਹਾ ਭੇਜੋ; ਕੋਈ ਲੁਕਿਆ ਖਰਚਾ ਨਹੀਂ।",
    faq_q3: "ਡਿਲੀਵਰੀ ਵਿੱਚ ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ?",
    faq_a3:
      "ਜ਼ਿਆਦਾਤਰ ਸ਼ਿਪਮੈਂਟ ਮੰਜ਼ਿਲ ਅਤੇ ਸੇਵਾ ਪੱਧਰ ਦੇ ਆਧਾਰ 'ਤੇ ਕੁਝ ਦਿਨਾਂ ਤੋਂ ਦੋ ਹਫ਼ਤਿਆਂ ਦੇ ਅੰਦਰ ਪਹੁੰਚ ਜਾਂਦੇ ਹਨ। ਅਸੀਂ ਪੁਸ਼ਟੀ ਕੀਤੀ ਸੇਵਾ ਸਮਾਂ-ਸੀਮਾ ਦੇ ਅੰਦਰ ਆਰਡਰ ਕਰਨ 'ਤੇ ਸਮੇਂ ਸਿਰ ਡਿਲੀਵਰੀ ਦੀ ਗਾਰੰਟੀ ਦਿੰਦੇ ਹਾਂ।",
    faq_q4: "ਕੀ ਮੈਂ ਆਪਣੇ ਸ਼ਿਪਮੈਂਟ ਨੂੰ ਟਰੈਕ ਕਰ ਸਕਦਾ ਹਾਂ?",
    faq_a4:
      "ਹਾਂ। ਤੁਹਾਡੇ ਪਾਰਸਲ ਦੇ ਕਲੈਕਟ ਹੁੰਦੇ ਹੀ ਤੁਹਾਨੂੰ ਇੱਕ ਟਰੈਕਿੰਗ ਨੰਬਰ ਮਿਲ ਜਾਵੇਗਾ। manvicourier.com/track 'ਤੇ ਲਾਈਵ ਟਰੈਕ ਕਰੋ। ਅਸੀਂ ਹਰ ਪੜਾਅ 'ਤੇ WhatsApp ਅੱਪਡੇਟ ਵੀ ਭੇਜਦੇ ਹਾਂ।",
    faq_q5: "ਕੀ ਕੁਝ ਅਜਿਹਾ ਹੈ ਜੋ ਮੈਂ ਭੇਜ ਨਹੀਂ ਸਕਦਾ?",
    faq_a5:
      "ਖਤਰਨਾਕ ਰਸਾਇਣ, ਪਰਕਰਾਮਯੋਗ ਮੁਦਰਾ, ਕੀਮਤੀ ਪੱਥਰ, ਅਤੇ ਪਾਬੰਦੀਸ਼ੁਦਾ ਜਾਂ ਗੈਰਕਾਨੂੰਨੀ ਸਮਾਨ। ਜੇਕਰ ਤੁਸੀਂ ਕਿਸੇ ਖਾਸ ਵਸਤੂ ਬਾਰੇ ਅਨਿਸ਼ਚਿਤ ਹੋ, ਤਾਂ ਬੁਕਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਸਾਨੂੰ ਪੁੱਛੋ; ਅਸੀਂ ਪੁਸ਼ਟੀ ਕਰਾਂਗੇ।",
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

    // Campaign Page - Punjabi
    campaign_hero_badge: "ਅੰਤਰਰਾਸ਼ਟਰੀ ਕੂਰੀਅਰ ਸੇਵਾ",
    campaign_hero_title_line1: "ਤੁਹਾਡਾ ਪਾਰਸਲ, ਅਸੀਂ ਚੁੱਕਾਂਗੇ",
    campaign_hero_title_line2: "ਭਾਰਤ ਵਿੱਚ :",
    campaign_hero_title_highlight1: "ਪਹੁੰਚਾਇਆ ਜਾਵੇਗਾ",
    campaign_hero_title_highlight2: "ਦੁਨੀਆ ਭਰ ਵਿੱਚ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੱਕ।",
    campaign_hero_subtext:
      "USA, UK, ਕੈਨੇਡਾ, ਆਸਟ੍ਰੇਲੀਆ ਅਤੇ ਹੋਰ ਦੇਸ਼ਾਂ ਵਿੱਚ ਦਸਤਾਵੇਜ਼, ਤੋਹਫ਼ੇ, ਪਾਰਸਲ ਅਤੇ ਵਪਾਰਕ ਸ਼ਿਪਮੈਂਟ। ਘਰ ਤੋਂ ਪਿਕਅੱਪ। ਕਸਟਮ ਕਲੀਅਰੈਂਸ। ਰੀਅਲ-ਟਾਈਮ ਟਰੈਕਿੰਗ।",
    campaign_hero_trusted: "ਦੁਨੀਆ ਭਰ ਵਿੱਚ 10,000+ ਪਰਿਵਾਰਾਂ ਦੁਆਰਾ ਭਰੋਸੇਯੋਗ",
    campaign_hero_shipments: "50,000+ ਸ਼ਿਪਮੈਂਟ ਡਿਲੀਵਰ ਕੀਤੇ ਗਏ",
    campaign_partners_title: "ਭਰੋਸੇਯੋਗ ਡਿਲੀਵਰੀ\nਪਾਰਟਨਰ ✈️",
    campaign_how_it_works_badge: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    campaign_how_it_works_title: "ਚਾਰ ਸਰਲ ਕਦਮਾਂ ਵਿੱਚ ਸ਼ਿਪ ਕਰੋ",
    campaign_how_it_works_sub:
      "ਕੋਈ ਗੁੰਝਲਦਾਰ ਫਾਰਮ ਨਹੀਂ। ਬੱਸ ਸਾਨੂੰ WhatsApp 'ਤੇ ਆਪਣਾ ਵੇਰਵਾ ਭੇਜੋ ਅਤੇ ਬਾਕੀ ਅਸੀਂ ਸੰਭਾਲ ਲਵਾਂਗੇ; ਪਿਕਅੱਪ ਤੋਂ ਡਿਲੀਵਰੀ ਤੱਕ।",
    campaign_step1_title: "ਸਾਨੂੰ WhatsApp 'ਤੇ ਆਪਣਾ ਵੇਰਵਾ ਭੇਜੋ",
    campaign_step1_desc:
      "ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਕੀ ਭੇਜ ਰਹੇ ਹੋ, ਭਾਰਤ ਵਿੱਚ ਇਹ ਕਿੱਥੇ ਹੈ, ਅਤੇ ਵਿਦੇਸ਼ ਵਿੱਚ ਤੁਹਾਡਾ ਡਿਲੀਵਰੀ ਪਤਾ।",
    campaign_step2_title: "ਅਸੀਂ ਭਾਰਤ ਵਿੱਚ ਪਿਕਅੱਪ ਕਰਦੇ ਹਾਂ",
    campaign_step2_desc:
      "ਸਾਡੀ ਟੀਮ ਤੁਹਾਡੇ ਘਰ, ਦੁਕਾਨ ਜਾਂ ਰਿਸ਼ਤੇਦਾਰ ਦੇ ਦਰਵਾਜ਼ੇ ਤੋਂ ਸਾਮਾਨ ਲੈਂਦੀ ਹੈ; ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਘਰ ਤੋਂ ਪਿਕਅੱਪ।",
    campaign_step3_title: "ਅਸੀਂ ਪੈਕ, ਸ਼ਿਪ ਅਤੇ ਕਸਟਮ ਸੰਭਾਲਦੇ ਹਾਂ",
    campaign_step3_desc:
      "ਪੇਸ਼ੇਵਰ ਤੌਰ 'ਤੇ ਪੈਕ ਕੀਤਾ, ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਸ਼ਿਪ ਕੀਤਾ, ਅਤੇ ਸਾਰੇ ਕਸਟਮ ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਤੁਹਾਡੇ ਲਈ ਪ੍ਰਬੰਧਿਤ ਕੀਤੀ ਗਈ।",
    campaign_step4_title: "ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ 'ਤੇ ਡਿਲੀਵਰੀ",
    campaign_step4_desc:
      "ਤੁਹਾਡਾ ਪਾਰਸਲ ਵਿਦੇਸ਼ ਪਹੁੰਚਦਾ ਹੈ, ਪੂਰੀ ਤਰ੍ਹਾਂ ਐਂਡ-ਟੂ-ਐਂਡ ਟਰੈਕ ਕੀਤਾ, ਸਿੱਧੇ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੱਕ।",
    campaign_where_badge: "ਅਸੀਂ ਕਿੱਥੇ ਪਿਕਅੱਪ ਅਤੇ ਡਿਲੀਵਰੀ ਕਰਦੇ ਹਾਂ",
    campaign_where_title: "ਅਸੀਂ ਕਿੱਥੇ ਪਿਕਅੱਪ ਅਤੇ ਡਿਲੀਵਰੀ ਕਰਦੇ ਹਾਂ",
    campaign_pickup_title: "📍 ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਪਿਕਅੱਪ",
    campaign_pickup_desc:
      "ਅਸੀਂ ਉੱਤਰੀ ਭਾਰਤ ਵਿੱਚ ਮਾਹਰ ਹਾਂ, ਬੇਨਤੀ 'ਤੇ ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਪਿਕਅੱਪ ਉਪਲਬਧ ਹੈ।",
    campaign_pan_india: "+ ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ",
    campaign_delivery_title: "✈️ ਡਿਲੀਵਰੀ ਮੰਜ਼ਿਲਾਂ",
    campaign_worldwide: "+ ਦੁਨੀਆ ਭਰ ਵਿੱਚ",
    campaign_delivery_via:
      "ਸਾਡੇ ਭਰੋਸੇਯੋਗ ਗਲੋਬਲ ਕੈਰੀਅਰ ਨੈੱਟਵਰਕ ਰਾਹੀਂ ਡਿਲੀਵਰੀ: Aramex, Courier Please, DHL, DPD, FedEx, UPS।",
    campaign_what_ship_title: "🎁 ਤੁਸੀਂ ਕੀ ਸ਼ਿਪ ਕਰ ਸਕਦੇ ਹੋ",
    campaign_what_ship_desc:
      "ਰੱਖੜੀ ਅਤੇ ਤਿਉਹਾਰ ਦੇ ਤੋਹਫ਼ੇ, ਮਿਠਾਈਆਂ ਅਤੇ ਸੁੱਕੇ ਮੇਵੇ, ਗਿਫਟ ਹੈਂਪਰ, ਕੱਪੜੇ ਅਤੇ ਪਰੰਪਰਾਗਤ ਪਹਿਰਾਵਾ, ਵਪਾਰਕ ਦਸਤਾਵੇਜ਼, ਵਪਾਰਕ ਨਮੂਨੇ, ਨਿੱਜੀ ਪਾਰਸਲ। ਕਿਸੇ ਵਸਤੂ ਬਾਰੇ ਅਨਿਸ਼ਚਿਤ ਹੋ?",
    campaign_what_ship_ask: "ਸਾਨੂੰ WhatsApp 'ਤੇ ਪੁੱਛੋ",
    campaign_what_ship_confirm: "; ਬੁਕਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਅਸੀਂ ਪੁਸ਼ਟੀ ਕਰਾਂਗੇ।",
    campaign_stats_title: "ਅੰਕੜੇ ਜੋ ਆਪਣੇ ਲਈ ਬੋਲਦੇ ਹਨ",
    campaign_stat1_value: "99.97%",
    campaign_stat1_label: "ਡਿਲੀਵਰੀ ਸਫਲਤਾ ਦਰ",
    campaign_stat2_value: "1M+",
    campaign_stat2_label: "ਸ਼ਿਪਮੈਂਟ ਡਿਲੀਵਰ ਕੀਤੇ ਗਏ",
    campaign_stat3_value: "100K+",
    campaign_stat3_label: "ਖੁਸ਼ ਗਾਹਕ",
    campaign_stat4_value: "300+",
    campaign_stat4_label: "ਕਰਮਚਾਰੀ",
    campaign_testimonials_badge: "ਸਾਡੇ ਗਾਹਕਾਂ ਤੋਂ",
    campaign_testimonials_title: "ਦੁਨੀਆ ਭਰ ਦੇ ਪਰਿਵਾਰਾਂ ਦੁਆਰਾ ਭਰੋਸੇਯੋਗ",
    campaign_testimonial1:
      "ਮੇਰੇ ਭਰਾ ਦਾ ਤੋਹਫ਼ਾ ਲੁਧਿਆਣਾ ਵਿੱਚ ਸਾਡੇ ਘਰ 'ਤੇ ਪਿਆ ਸੀ। ਉਹਨਾਂ ਨੇ ਇਸਨੂੰ ਚੁੱਕਿਆ ਅਤੇ ਕੁਝ ਦਿਨਾਂ ਵਿੱਚ ਇਹ ਮੈਨੂੰ ਟੋਰਾਂਟੋ ਵਿੱਚ ਮਿਲ ਗਿਆ। ਸੱਚਮੁੱਚ, ਮੈਨੂੰ ਥੋੜ੍ਹਾ ਰੋਣਾ ਆ ਗਿਆ।",
    campaign_testimonial2:
      "ਮੈਨੂੰ ਵਿਦੇਸ਼ ਵਿੱਚ ਮਿਠਾਈ ਭੇਜਣ ਦੀ ਚਿੰਤਾ ਸੀ, ਪਰ ਸਭ ਕੁਝ ਬਿਲਕੁਲ ਸਹੀ ਪਹੁੰਚਿਆ। WhatsApp ਅੱਪਡੇਟ ਨੇ ਮੈਨੂੰ ਪੂਰੇ ਸਮੇਂ ਸ਼ਾਂਤ ਰੱਖਿਆ।",
    campaign_testimonial3:
      "ਮੇਰੇ ਭਰਾ ਦਾ ਤੋਹਫ਼ਾ ਲੁਧਿਆਣਾ ਵਿੱਚ ਸਾਡੇ ਘਰ 'ਤੇ ਪਿਆ ਸੀ। ਉਹਨਾਂ ਨੇ ਇਸਨੂੰ ਚੁੱਕਿਆ ਅਤੇ ਕੁਝ ਦਿਨਾਂ ਵਿੱਚ ਇਹ ਮੈਨੂੰ ਟੋਰਾਂਟੋ ਵਿੱਚ ਮਿਲ ਗਿਆ। ਸੱਚਮੁੱਚ, ਮੈਨੂੰ ਥੋੜ੍ਹਾ ਰੋਣਾ ਆ ਗਿਆ।",
    campaign_testimonial4:
      "ਸਿਡਨੀ ਵਿੱਚ ਆਪਣੀ ਮਾਂ ਨੂੰ ਕੱਪੜੇ ਅਤੇ ਸੁੱਕੇ ਮੇਵੇ ਦਾ ਪਾਰਸਲ ਭੇਜਿਆ। ਤਿਉਹਾਰ ਤੋਂ ਪਹਿਲਾਂ ਪਹੁੰਚ ਗਿਆ। ਸ਼ਾਨਦਾਰ ਸੇਵਾ, ਬਹੁਤ ਸਿਫਾਰਸ਼ ਕਰਦਾ ਹਾਂ।",
    campaign_faq6_q: "ਮੈਂ ਭੁਗਤਾਨ ਕਿਵੇਂ ਕਰਾਂ?",
    campaign_faq6_a:
      "ਭੁਗਤਾਨ ਵਿਕਲਪ WhatsApp 'ਤੇ ਤੁਹਾਡੇ ਕੋਟੇਸ਼ਨ ਦੀ ਪੁਸ਼ਟੀ ਹੋਣ ਤੋਂ ਬਾਅਦ ਸਾਂਝੇ ਕੀਤੇ ਜਾਂਦੇ ਹਨ। ਤੁਸੀਂ ਉਦੋਂ ਹੀ ਭੁਗਤਾਨ ਕਰਦੇ ਹੋ ਜਦੋਂ ਤੁਸੀਂ ਵੇਰਵੇ ਤੋਂ ਖੁਸ਼ ਹੁੰਦੇ ਹੋ। ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ ਲਿੰਕ ਪ੍ਰਦਾਨ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।",
    campaign_days: "ਦਿਨ",
    campaign_hrs: "ਘੰਟੇ",
    campaign_min: "ਮਿੰਟ",
    campaign_sec: "ਸਕਿੰਟ",
    campaign_cta_title: "ਅੱਜ ਹੀ ਭਾਰਤ ਤੋਂ ਆਪਣਾ ਪਾਰਸਲ ਭੇਜੋ।",
    campaign_cta_sub:
      "ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਇਹ ਭਾਰਤ ਵਿੱਚ ਕਿੱਥੇ ਹੈ ਅਤੇ ਕਿੱਥੇ ਜਾਣਾ ਹੈ। ਬਾਕੀ ਸਭ ਅਸੀਂ ਸੰਭਾਲ ਲਵਾਂਗੇ; ਪਿਕਅੱਪ ਤੋਂ ਡਿਲੀਵਰੀ ਤੱਕ।",
    campaign_call: "ਕਾਲ ਕਰੋ +91 7070 506070",
  },

  fr: {
    footer_pickup_availability: "Disponibilité du ramassage",
    footer_campaign: "Campagne",
    footer_business_campaign: "Campagne commerciale",
    footer_blog: "Blog",
    footer_career: "Carrière",
    // Add to the 'fr' object in LanguageContext.tsx
    b2b_hero_badge: "Approvisionnement en vrac pour les entreprises indiennes",
    b2b_hero_title_line1: "Approvisionnez-vous depuis l'Inde.",
    b2b_hero_title_line2: "Livré à votre entreprise",
    b2b_hero_title_line3: "Dans votre pays.",
    b2b_hero_subtext:
      "Vous dirigez un restaurant indien, une épicerie, une boutique ou un magasin de vêtements à l'étranger ? Dites-nous <strong>ce dont vous avez besoin et où il se trouve en Inde —</strong> épices, épicerie, tissus, vêtements ethniques — et nous le récupérerons en vrac et le livrerons à votre porte. <strong>Douane gérée.</strong>",
    b2b_hero_trusted:
      "Approuvé par les entreprises indiennes dans le monde entier",
    b2b_hero_destinations: "États-Unis · Royaume-Uni · Canada · Australie",
    b2b_call_now: "Appelez maintenant",
    b2b_partners_title: "Livraison de confiance",
    b2b_partners_subtitle: "Partenaires",
    b2b_how_it_works_badge: "Comment ça marche",
    b2b_how_it_works_title: "De l'Inde à votre entreprise en quatre étapes",
    b2b_how_it_works_sub:
      "Pas de processus compliqué. Envoyez-nous votre liste sur WhatsApp et nous nous occupons du reste — du début à la fin.",
    b2b_step1_title: "Dites-nous ce dont vous avez besoin",
    b2b_step1_desc:
      "Partagez votre commande et où elle est approvisionnée en Inde — votre fournisseur, le marché local ou un fabricant.",
    b2b_step2_title: "Nous le récupérons en vrac",
    b2b_step2_desc:
      "Notre équipe collecte vos marchandises n'importe où en Inde — épices, épicerie, tissus, stock prêt, tout ce que vous voulez.",
    b2b_step3_title: "Nous emballons, expédions et dédouanons",
    b2b_step3_desc:
      "Emballage de fret en vrac plus toutes les formalités d'importation et de douane gérées pour vous — sans tracas.",
    b2b_step4_title: "Livré à vos locaux",
    b2b_step4_desc:
      "Il arrive à votre restaurant, magasin ou boutique — entièrement suivi. Nous pouvons également mettre en place des ramassages réguliers.",
    b2b_source_badge: "Ce que vous pouvez approvisionner",
    b2b_source_title: "Remplissez vos étagères, directement depuis la source",
    b2b_source_item1_title: "Alimentation et épicerie",
    b2b_source_item1_desc:
      "Épices et masalas, lentilles et céréales, farines, snacks, sucreries, aliments emballés et surgelés, articles de puja et ménagers.",
    b2b_source_item2_title: "Tissu et mode",
    b2b_source_item2_desc:
      "Tissus et textiles, saris, lehengas, costumes, vêtements ethniques et de fête, et accessoires — en quantités de détail ou en vrac.",
    b2b_source_item3_title: "Commandes en vrac, mixtes ou récurrentes",
    b2b_source_item3_desc:
      "Qu'il s'agisse d'un envoi en vrac ponctuel ou d'un réapprovisionnement mensuel régulier adapté au rythme de votre entreprise, nous gérons tout. Vous ne savez pas si nous pouvons approvisionner ou expédier un article ? Demandez-nous simplement sur WhatsApp — nous confirmerons avant que vous vous engagiez.",
    b2b_where_badge: "Où nous récupérons et livrons",
    b2b_where_title: "Où nous récupérons et livrons",
    b2b_pickup_title: "Ramassage dans toute l'Inde",
    b2b_pickup_desc:
      "Nous sommes spécialisés dans le nord de l'Inde — avec un ramassage dans toute l'Inde disponible sur demande.",
    b2b_pan_india: "+ Toute l'Inde",
    b2b_delivery_title: "Destinations de livraison",
    b2b_worldwide: "+ Dans le monde entier",
    b2b_delivery_via:
      "Fret mondial via nos partenaires d'expédition de confiance :",
    b2b_what_ship_title: "Ce que vous pouvez expédier",
    b2b_what_ship_desc:
      "Rakhis et cadeaux de fête · Sucreries et fruits secs · Paniers-cadeaux · Vêtements et tenues ethniques · Documents professionnels · Échantillons commerciaux · Colis personnels. Vous n'êtes pas sûr d'un article ?",
    b2b_what_ship_ask: "Demandez-nous sur WhatsApp",
    b2b_what_ship_confirm: " — Nous confirmerons avant que vous réserviez.",
    b2b_why_badge: "Pourquoi Manvi International",
    b2b_why_title: "Un partenaire logistique sur lequel vous pouvez compter",
    b2b_why_sub:
      "L'approvisionnement pour une entreprise est une question de fiabilité et de marges, pas de chance ponctuelle. Voici pourquoi les propriétaires de magasins nous font confiance.",
    b2b_reason1_title: "Expertise en vrac et fret",
    b2b_reason1_desc:
      "D'un seul carton à des envois en vrac complets — emballés et expédiés pour gérer le volume.",
    b2b_reason2_title: "Douane et paperasse gérées",
    b2b_reason2_desc:
      "Nous gérons la documentation d'importation et le dédouanement pour que votre stock ne reste pas bloqué à la frontière.",
    b2b_reason3_title: "Ramassages réguliers et répétables",
    b2b_reason3_desc:
      "Mettez en place des réapprovisionnements récurrents adaptés au rythme de votre entreprise — hebdomadaires, mensuels, saisonniers.",
    b2b_reason4_title: "Un interlocuteur dédié",
    b2b_reason4_desc:
      "Parlez à une personne réelle sur WhatsApp qui connaît votre compte — pas une file d'attente de tickets.",
    b2b_reason5_title: "Tarification transparente",
    b2b_reason5_desc:
      "Tarifs basés sur le poids, la destination et l'urgence. Pas de frais cachés, pas de suppléments surprises.",
    b2b_reason6_title: "Société de logistique établie",
    b2b_reason6_desc:
      "Manvi International est une entreprise de logistique enregistrée avec des partenariats avec des transporteurs mondiaux.",
    b2b_faq1_q: "Y a-t-il une commande minimum ?",
    b2b_faq1_a:
      "Nous gérons tout, d'un seul carton à des envois en vrac complets. Partagez vos besoins sur WhatsApp et nous vous conseillerons sur le moyen le plus rentable de les expédier.",
    b2b_faq2_q: "Comment le prix est-il calculé ?",
    b2b_faq2_a:
      "Les tarifs sont basés sur le poids, le pays de destination et la rapidité dont vous avez besoin — sans frais cachés. Envoyez-nous votre liste et nous vous donnerons un devis clair.",
    b2b_faq3_q: "Gérez-vous les formalités douanières et d'importation ?",
    b2b_faq3_a:
      "Oui. Nous gérons la documentation et le dédouanement avec nos partenaires transporteurs mondiaux, afin que votre stock circule facilement à travers les frontières. (Les droits d'importation du pays de destination sont distincts et dépendent de vos règles locales — nous vous guiderons.)",
    b2b_faq4_q:
      "Pouvez-vous mettre en place des expéditions régulières et récurrentes ?",
    b2b_faq4_a:
      "Absolument. Beaucoup de nos clients professionnels organisent des réapprovisionnements programmés — hebdomadaires, mensuels ou saisonniers — adaptés à leur rythme d'activité.",
    b2b_faq5_q: "Combien de temps dure la livraison en vrac ?",
    b2b_faq5_a:
      "Cela dépend du volume, de l'itinéraire et des douanes, généralement de quelques jours à quelques semaines. Commandez avant les périodes de fête pour être sûr — nous confirmerons les délais sur votre devis.",
    b2b_faq6_q: "Que ne pouvez-vous pas expédier ?",
    b2b_faq6_a:
      "Nous n'expédions pas de produits chimiques dangereux, de devises négociables, de pierres précieuses ou de marchandises illégales. Si vous n'êtes pas sûr d'un article spécifique, demandez-nous avant de réserver ; nous confirmerons.",
    b2b_faq7_q: "Comment puis-je payer ?",
    b2b_faq7_a:
      "Nous partagerons les options de paiement sécurisées une fois votre devis confirmé sur WhatsApp.",
    b2b_cta_title: "Prêt à vous approvisionner depuis l'Inde ?",
    b2b_cta_sub:
      "Envoyez-nous votre liste et le lieu de ramassage. Nous gérerons le ramassage, l'expédition et les douanes.",
    b2b_call: "Appelez +91 7070506070",
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
    // Campaign Page - French
    campaign_hero_badge: "Service de courrier international",
    campaign_hero_title_line1: "Votre colis, nous le récupérons",
    campaign_hero_title_line2: "En Inde :",
    campaign_hero_title_highlight1: "Livré à",
    campaign_hero_title_highlight2: "Votre porte dans le monde entier.",
    campaign_hero_subtext:
      "Documents, cadeaux, colis et envois commerciaux vers les États-Unis, le Royaume-Uni, le Canada, l'Australie et au-delà. Ramassage à domicile. Douane gérée. Suivi en temps réel.",
    campaign_hero_trusted: "Approuvé par 10 000+ familles dans le monde",
    campaign_hero_shipments: "50 000+ envois livrés",
    campaign_partners_title: "Partenaires de livraison\nde confiance ✈️",
    campaign_how_it_works_badge: "Comment ça marche",
    campaign_how_it_works_title: "Expédiez en quatre étapes simples",
    campaign_how_it_works_sub:
      "Pas de formulaires compliqués. Envoyez-nous simplement vos coordonnées sur WhatsApp et nous nous occupons du reste ; du ramassage à la livraison.",
    campaign_step1_title: "Envoyez-nous vos coordonnées sur WhatsApp",
    campaign_step1_desc:
      "Dites-nous ce que vous envoyez, où il se trouve en Inde et votre adresse de livraison à l'étranger.",
    campaign_step2_title: "Nous le récupérons en Inde",
    campaign_step2_desc:
      "Notre équipe collecte à votre domicile, dans un magasin ou chez un parent ; ramassage à domicile dans toute l'Inde.",
    campaign_step3_title: "Nous emballons, expédions et gérons la douane",
    campaign_step3_desc:
      "Emballé professionnellement, expédié en toute sécurité et toutes les formalités douanières gérées pour vous.",
    campaign_step4_title: "Livré à votre porte",
    campaign_step4_desc:
      "Votre colis arrive à l'étranger, entièrement suivi de bout en bout, directement à votre porte.",
    campaign_where_badge: "Où nous récupérons et livrons",
    campaign_where_title: "Où nous récupérons et livrons",
    campaign_pickup_title: "📍 Ramassage dans toute l'Inde",
    campaign_pickup_desc:
      "Nous sommes spécialisés dans le nord de l'Inde, avec un ramassage dans toute l'Inde disponible sur demande.",
    campaign_pan_india: "+ Toute l'Inde",
    campaign_delivery_title: "✈️ Destinations de livraison",
    campaign_worldwide: "+ Dans le monde entier",
    campaign_delivery_via:
      "Livré via notre réseau de transporteurs mondiaux de confiance : Aramex, Courier Please, DHL, DPD, FedEx, UPS.",
    campaign_what_ship_title: "🎁 Ce que vous pouvez expédier",
    campaign_what_ship_desc:
      "Rakhis et cadeaux de fête, friandises et fruits secs, paniers-cadeaux, vêtements et tenues ethniques, documents professionnels, échantillons commerciaux, colis personnels. Vous n'êtes pas sûr d'un article ?",
    campaign_what_ship_ask: "Demandez-nous sur WhatsApp",
    campaign_what_ship_confirm:
      " ; nous confirmerons avant que vous réserviez.",
    campaign_stats_title: "Des chiffres qui parlent d'eux-mêmes",
    campaign_stat1_value: "99,97%",
    campaign_stat1_label: "Taux de réussite des livraisons",
    campaign_stat2_value: "1M+",
    campaign_stat2_label: "Envois livrés",
    campaign_stat3_value: "100K+",
    campaign_stat3_label: "Clients satisfaits",
    campaign_stat4_value: "300+",
    campaign_stat4_label: "Employés",
    campaign_testimonials_badge: "De nos clients",
    campaign_testimonials_title: "Approuvé par les familles du monde entier",
    campaign_testimonial1:
      "Le cadeau de mon frère était chez nous à Ludhiana. Ils l'ont récupéré et il m'est parvenu à Toronto en quelques jours. J'ai pleuré un peu, honnêtement.",
    campaign_testimonial2:
      "J'étais nerveux à l'idée d'envoyer des friandises à l'étranger, mais tout est arrivé parfaitement. Les mises à jour WhatsApp m'ont gardé calme tout du long.",
    campaign_testimonial3:
      "Le cadeau de mon frère était chez nous à Ludhiana. Ils l'ont récupéré et il m'est parvenu à Toronto en quelques jours. J'ai pleuré un peu, honnêtement.",
    campaign_testimonial4:
      "J'ai envoyé un colis de vêtements et de fruits secs à ma mère à Sydney. Arrivé avant la fête. Excellent service, je recommande vivement.",
    campaign_faq6_q: "Comment puis-je payer ?",
    campaign_faq6_a:
      "Les options de paiement sont partagées une fois votre devis confirmé sur WhatsApp. Vous ne payez que lorsque vous êtes satisfait des détails. Des liens de paiement sécurisés sont fournis.",
    campaign_days: "Jours",
    campaign_hrs: "Heures",
    campaign_min: "Min",
    campaign_sec: "Sec",
    campaign_cta_title: "Envoyez votre colis depuis l'Inde dès aujourd'hui.",
    campaign_cta_sub:
      "Dites-nous où il se trouve en Inde et où il doit aller. Nous nous occupons de tout le reste ; du ramassage à la livraison.",
    campaign_call: "Appelez +91 7070 506070",
    faq_q2_link: "Obtenir un devis rapide",
    faq_q2_after:
      " ou envoyez-nous un message sur WhatsApp pour un prix exact ; aucun frais caché.",
  },

  es: {
    footer_pickup_availability: "Disponibilidad de recogida",
    footer_campaign: "Campaña",
    footer_business_campaign: "Campaña comercial",
    footer_blog: "Blog",
    footer_career: "Carrera",
    // Add to the 'es' object in LanguageContext.tsx
    b2b_hero_badge: "Abastecimiento al por mayor para empresas indias",
    b2b_hero_title_line1: "Abastézcase desde India.",
    b2b_hero_title_line2: "Entregado a su negocio",
    b2b_hero_title_line3: "En su país.",
    b2b_hero_subtext:
      "¿Dirige un restaurante indio, una tienda de comestibles, una boutique o una tienda de ropa en el extranjero? Díganos <strong>qué necesita y dónde está en India —</strong> especias, comestibles, telas, ropa étnica — y lo recogeremos al por mayor y lo entregaremos en su puerta. <strong>Aduanas gestionadas.</strong>",
    b2b_hero_trusted: "Aprobado por empresas indias en todo el mundo",
    b2b_hero_destinations: "EE.UU. · Reino Unido · Canadá · Australia",
    b2b_call_now: "Llame ahora",
    b2b_partners_title: "Entrega de confianza",
    b2b_partners_subtitle: "Socios",
    b2b_how_it_works_badge: "Cómo funciona",
    b2b_how_it_works_title: "De India a su negocio en cuatro pasos",
    b2b_how_it_works_sub:
      "Sin procesos complicados. Envíenos su lista por WhatsApp y nosotros nos encargamos del resto — de principio a fin.",
    b2b_step1_title: "Díganos lo que necesita",
    b2b_step1_desc:
      "Comparta su pedido y dónde se abastece en India — su proveedor, el mercado local o un fabricante.",
    b2b_step2_title: "Lo recogemos al por mayor",
    b2b_step2_desc:
      "Nuestro equipo recoge sus mercancías en cualquier lugar de India — especias, comestibles, telas, stock listo, lo que sea.",
    b2b_step3_title: "Empaquetamos, enviamos y gestionamos las aduanas",
    b2b_step3_desc:
      "Embalaje de carga a granel más todos los trámites de importación y aduanas gestionados para usted — sin dolores de cabeza.",
    b2b_step4_title: "Entregado en sus instalaciones",
    b2b_step4_desc:
      "Llega a su restaurante, tienda o boutique — completamente rastreado. También podemos organizar recogidas regulares.",
    b2b_source_badge: "Lo que puede abastecer",
    b2b_source_title: "Abastezca sus estanterías, directamente desde la fuente",
    b2b_source_item1_title: "Alimentos y comestibles",
    b2b_source_item1_desc:
      "Especias y masalas, lentejas y granos, harinas, snacks, dulces, alimentos envasados y congelados, artículos de puja y del hogar.",
    b2b_source_item2_title: "Telas y moda",
    b2b_source_item2_desc:
      "Telas y textiles, sarees, lehengas, trajes, ropa étnica y de fiesta, y accesorios — en cantidades al por menor o al por mayor.",
    b2b_source_item3_title: "Pedidos al por mayor, mixtos o recurrentes",
    b2b_source_item3_desc:
      "Ya sea un envío al por mayor único o un reabastecimiento mensual regular adaptado al ritmo de su negocio, lo gestionamos. ¿No está seguro de si podemos abastecer o enviar un artículo? Pregúntenos en WhatsApp — confirmaremos antes de que se comprometa.",
    b2b_where_badge: "Dónde recogemos y entregamos",
    b2b_where_title: "Dónde recogemos y entregamos",
    b2b_pickup_title: "Recogida en toda India",
    b2b_pickup_desc:
      "Nos especializamos en el norte de India — con recogida en toda India disponible bajo solicitud.",
    b2b_pan_india: "+ Toda India",
    b2b_delivery_title: "Destinos de entrega",
    b2b_worldwide: "+ En todo el mundo",
    b2b_delivery_via:
      "Flete mundial a través de nuestros socios de envío de confianza:",
    b2b_what_ship_title: "Lo que puede enviar",
    b2b_what_ship_desc:
      "Rakhis y regalos de fiesta · Dulces y frutos secos · Cestas de regalo · Ropa y vestimenta étnica · Documentos comerciales · Muestras comerciales · Paquetes personales. ¿No está seguro de un artículo?",
    b2b_what_ship_ask: "Pregúntenos en WhatsApp",
    b2b_what_ship_confirm: " — Confirmaremos antes de que reserve.",
    b2b_why_badge: "Por qué Manvi International",
    b2b_why_title: "Un socio logístico en el que puede confiar",
    b2b_why_sub:
      "El abastecimiento para un negocio se trata de fiabilidad y márgenes, no de suerte puntual. He aquí por qué los propietarios de tiendas confían en nosotros.",
    b2b_reason1_title: "Experiencia en carga y granel",
    b2b_reason1_desc:
      "Desde un solo cartón hasta envíos completos al por mayor — empaquetados y enviados para manejar el volumen.",
    b2b_reason2_title: "Aduanas y papeleo gestionados",
    b2b_reason2_desc:
      "Gestionamos la documentación de importación y el despacho de aduanas para que su stock no se quede atascado en la frontera.",
    b2b_reason3_title: "Recogidas regulares y repetibles",
    b2b_reason3_desc:
      "Configure reabastecimientos recurrentes adaptados al ritmo de su negocio — semanales, mensuales, estacionales.",
    b2b_reason4_title: "Un punto de contacto dedicado",
    b2b_reason4_desc:
      "Hable con una persona real en WhatsApp que conoce su cuenta — no una cola de tickets.",
    b2b_reason5_title: "Precios transparentes",
    b2b_reason5_desc:
      "Tarifas basadas en peso, destino y urgencia. Sin tarifas ocultas, sin recargos sorpresa.",
    b2b_reason6_title: "Empresa de logística establecida",
    b2b_reason6_desc:
      "Manvi International es una empresa de logística registrada con asociaciones con transportistas globales.",
    b2b_faq1_q: "¿Hay un pedido mínimo?",
    b2b_faq1_a:
      "Gestionamos todo, desde un solo cartón hasta envíos completos al por mayor. Comparta sus necesidades en WhatsApp y le asesoraremos sobre la forma más rentable de enviarlo.",
    b2b_faq2_q: "¿Cómo se calcula el precio?",
    b2b_faq2_a:
      "Las tarifas se basan en el peso, el país de destino y la rapidez con que lo necesite — sin tarifas ocultas. Envíenos su lista y le daremos un presupuesto claro.",
    b2b_faq3_q: "¿Gestionan los trámites aduaneros y de importación?",
    b2b_faq3_a:
      "Sí. Gestionamos la documentación y el despacho de aduanas con nuestros socios transportistas globales, para que su stock circule sin problemas a través de las fronteras. (Los aranceles de importación del país de destino son separados y dependen de sus reglas locales — le guiaremos.)",
    b2b_faq4_q: "¿Pueden organizar envíos regulares y recurrentes?",
    b2b_faq4_a:
      "Absolutamente. Muchos de nuestros clientes comerciales realizan reabastecimientos programados — semanales, mensuales o estacionales — adaptados a su ritmo de negocio.",
    b2b_faq5_q: "¿Cuánto tarda la entrega al por mayor?",
    b2b_faq5_a:
      "Depende del volumen, la ruta y las aduanas, típicamente de unos días a un par de semanas. Haga su pedido antes de los picos festivos para estar seguro — confirmaremos los plazos en su presupuesto.",
    b2b_faq6_q: "¿Qué no pueden enviar?",
    b2b_faq6_a:
      "No enviamos productos químicos peligrosos, moneda negociable, piedras preciosas o mercancías ilegales. Si no está seguro de un artículo específico, pregúntenos antes de reservar; confirmaremos.",
    b2b_faq7_q: "¿Cómo puedo pagar?",
    b2b_faq7_a:
      "Compartiremos las opciones de pago seguras una vez que su presupuesto esté confirmado en WhatsApp.",
    b2b_cta_title: "¿Listo para abastecerse desde India?",
    b2b_cta_sub:
      "Envíenos su lista y la ubicación de recogida. Gestionaremos la recogida, el envío y las aduanas.",
    b2b_call: "Llame +91 7070506070",
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
    // Campaign Page - Spanish
    campaign_hero_badge: "Servicio de mensajería internacional",
    campaign_hero_title_line1: "Su paquete, lo recogemos",
    campaign_hero_title_line2: "En India :",
    campaign_hero_title_highlight1: "Entregado a",
    campaign_hero_title_highlight2: "Su puerta en todo el mundo.",
    campaign_hero_subtext:
      "Documentos, regalos, paquetes y envíos comerciales a EE.UU., Reino Unido, Canadá, Australia y más allá. Recogida en la puerta. Aduanas gestionadas. Seguimiento en tiempo real.",
    campaign_hero_trusted:
      "Aprobado por más de 10,000 familias en todo el mundo",
    campaign_hero_shipments: "Más de 50,000 envíos entregados",
    campaign_partners_title: "Socios de entrega\nde confianza ✈️",
    campaign_how_it_works_badge: "Cómo funciona",
    campaign_how_it_works_title: "Envíe en cuatro pasos sencillos",
    campaign_how_it_works_sub:
      "Sin formularios complicados. Simplemente envíenos sus datos por WhatsApp y nosotros nos encargamos del resto; desde la recogida hasta la entrega.",
    campaign_step1_title: "Envíenos sus datos por WhatsApp",
    campaign_step1_desc:
      "Díganos qué está enviando, dónde está en India y su dirección de entrega en el extranjero.",
    campaign_step2_title: "Lo recogemos en India",
    campaign_step2_desc:
      "Nuestro equipo recoge en su casa, tienda o en la puerta de un familiar; recogida en la puerta en toda India.",
    campaign_step3_title: "Empaquetamos, enviamos y gestionamos las aduanas",
    campaign_step3_desc:
      "Empaquetado profesionalmente, enviado de forma segura y toda la documentación aduanera gestionada por usted.",
    campaign_step4_title: "Entregado en su puerta",
    campaign_step4_desc:
      "Su paquete llega al extranjero, completamente rastreado de extremo a extremo, directamente a su puerta.",
    campaign_where_badge: "Dónde recogemos y entregamos",
    campaign_where_title: "Dónde recogemos y entregamos",
    campaign_pickup_title: "📍 Recogida en toda India",
    campaign_pickup_desc:
      "Nos especializamos en el norte de India, con recogida en toda India disponible bajo solicitud.",
    campaign_pan_india: "+ Toda India",
    campaign_delivery_title: "✈️ Destinos de entrega",
    campaign_worldwide: "+ En todo el mundo",
    campaign_delivery_via:
      "Entregado a través de nuestra red de transportistas globales de confianza: Aramex, Courier Please, DHL, DPD, FedEx, UPS.",
    campaign_what_ship_title: "🎁 Lo que puede enviar",
    campaign_what_ship_desc:
      "Rakhis y regalos festivos, dulces y frutos secos, cestas de regalo, ropa y vestimenta étnica, documentos comerciales, muestras comerciales, paquetes personales. ¿No está seguro de un artículo?",
    campaign_what_ship_ask: "Pregúntenos en WhatsApp",
    campaign_what_ship_confirm: " ; confirmaremos antes de que reserve.",
    campaign_stats_title: "Números que hablan por sí mismos",
    campaign_stat1_value: "99,97%",
    campaign_stat1_label: "Tasa de éxito de entregas",
    campaign_stat2_value: "1M+",
    campaign_stat2_label: "Envíos entregados",
    campaign_stat3_value: "100K+",
    campaign_stat3_label: "Clientes satisfechos",
    campaign_stat4_value: "300+",
    campaign_stat4_label: "Empleados",
    campaign_testimonials_badge: "De nuestros clientes",
    campaign_testimonials_title: "Aprobado por familias en todo el mundo",
    campaign_testimonial1:
      "El regalo de mi hermano estaba en nuestra casa en Ludhiana. Lo recogieron y me llegó a Toronto en cuestión de días. Lloré un poco, honestamente.",
    campaign_testimonial2:
      "Estaba nervioso por enviar dulces al extranjero, pero todo llegó perfectamente. Las actualizaciones por WhatsApp me mantuvieron tranquilo todo el tiempo.",
    campaign_testimonial3:
      "El regalo de mi hermano estaba en nuestra casa en Ludhiana. Lo recogieron y me llegó a Toronto en cuestión de días. Lloré un poco, honestamente.",
    campaign_testimonial4:
      "Envié un paquete de ropa y frutos secos a mi madre en Sydney. Llegó antes del festival. Excelente servicio, muy recomendable.",
    campaign_faq6_q: "¿Cómo puedo pagar?",
    campaign_faq6_a:
      "Las opciones de pago se comparten una vez que su cotización se confirma en WhatsApp. Solo paga cuando esté satisfecho con los detalles. Se proporcionan enlaces de pago seguros.",
    campaign_days: "Días",
    campaign_hrs: "Horas",
    campaign_min: "Min",
    campaign_sec: "Seg",
    campaign_cta_title: "Envíe su paquete desde India hoy.",
    campaign_cta_sub:
      "Díganos dónde está en India y a dónde debe ir. Nosotros nos encargamos de todo lo demás; desde la recogida hasta la entrega.",
    campaign_call: "Llame +91 7070 506070",
    faq_q2_link: "Obtener una cotización rápida",
    faq_q2_after:
      " o envíenos un mensaje por WhatsApp para un precio exacto ; sin cargos ocultos.",
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

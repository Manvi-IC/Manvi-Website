"use client";
import {
  ArrowUpRight,
  MapPin,
  Receipt,
  Phone,
  ChevronDown,
  Plane,
  Factory,
  Building2,
  FileText,
  TrendingUp,
  PackageSearch,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ─── DATA ────────────────────────────────────────────────────────────────────
const B2B_STEPS = [
  {
    num: "1",
    title: "Tell us what you need",
    desc: "Share your order and where it's sourced in India — your supplier, the local market, or a manufacturer.",
  },
  {
    num: "2",
    title: "We pick it up in bulk",
    desc: "Our team collects your goods anywhere in India — spices, groceries, fabrics, ready stock, you name it.",
  },
  {
    num: "3",
    title: "We pack, ship & clear customs",
    desc: "Bulk-freight packing plus all the import paperwork and customs handled for you — no headaches.",
  },
  {
    num: "4",
    title: "Delivered to your premises",
    desc: "It arrives at your restaurant, store or boutique — fully tracked. We can also set up regular repeat pickups.",
  },
];

const SOURCE_ITEMS = [
  {
    title: "Food & Grocery",
    desc: "Spices & masalas, lentils & grains, flours, snacks, sweets, packaged & frozen foods, pooja and household items."
  },
  {
    title: "Fabric & Fashion",
    desc: "Fabrics & textiles, sarees, lehengas, suits, ethnic & festive wear, and accessories — in retail quantities or bulk."
  },
  {
    title: "Bulk, Mixed Or Recurring Orders",
    desc: "Whether It's A One-Off Bulk Consignment Or A Regular Monthly Restock Tailored To Your Business Rhythm, We Handle It. Not Sure If We Can Source Or Ship An Item? Just Ask Us On WhatsApp — We'll Confirm Before You Commit."
  }
];

const LOGISTICS_REASONS = [
  {
    title: "Bulk & Cargo Expertise",
    desc: "From a single carton to full bulk consignments — packed and shipped to handle volume.",
    image: "/3d-boxes.png"
  },
  {
    title: "Customs & Paperwork Handled",
    desc: "We manage import documentation and clearance so your stock isn't stuck at the border.",
    image: "/3d-clipboard.png"
  },
  {
    title: "Regular, Repeatable Pickups",
    desc: "Set up recurring restocks tailored to your business rhythm — weekly, monthly, seasonal.",
    image: "/3d-map.png"
  },
  {
    title: "A Dedicated Point Of Contact",
    desc: "Talk to a real person on WhatsApp who knows your account — not a ticket queue.",
    image: "/3d-contact.png"
  },
  {
    title: "Transparent Pricing",
    desc: "Rates based on weight, destination and urgency. No hidden fees, no surprise surcharges.",
    image: "/3d-pricing.png"
  },
  {
    title: "Established Logistics Company",
    desc: "Manvi International is a registered logistics business with global carrier partnerships.",
    image: "/3d-handshake.png"
  }
];

const PICKUP_CITIES = ["Punjab", "Delhi NCR", "Haryana", "Rajasthan", "Gujarat", "Mumbai"];
const DESTINATIONS = ["USA", "UK", "Canada", "Australia"];
const PARTNERS = ["Fedex", "DPD", "UPS", "DHL", "ARAMEX"];

const TESTIMONIALS = [
  {
    name: "Anjali M.",
    location: "Birmingham, UK",
    text: "My brother's gift was sitting at our home in Ludhiana. They picked it up and it reached me in Toronto within days. I cried a little, honestly.",
  },
  {
    name: "Raj P.",
    location: "London, UK",
    text: "I was nervous about sending sweets overseas, but everything arrived perfectly. The WhatsApp updates kept me calm the whole time.",
  },
  {
    name: "Simran K.",
    location: "Toronto, Canada",
    text: "My brother's gift was sitting at our home in Ludhiana. They picked it up and it reached me in Toronto within days. I cried a little, honestly.",
  },
  {
    name: "Hardeep S.",
    location: "Sydney, Australia",
    text: "Sent a parcel of clothes and dry fruits to my mother in Sydney. Arrived before the festival. Excellent service — highly recommend.",
  },
];

const FAQS = [
  {
    num: "01",
    q: "Is There A Minimum Order?",
    a: "We handle everything from a single carton to full bulk consignments. Share what you need on WhatsApp and we'll advise the most cost-effective way to ship it.",
  },
  {
    num: "02",
    q: "How Is The Price Worked Out?",
    a: "Rates are based on weight, destination country and how fast you need it — with no hidden fees. Send us your list and we'll give you a clear quote.",
  },
  {
    num: "03",
    q: "Do You Handle Customs And Import Paperwork?",
    a: "Yes. We manage documentation and clearance with our global carrier partners, so your stock moves smoothly across the border. (Any destination-country import duties are separate and depend on your local rules — we'll guide you.)",
  },
  {
    num: "04",
    q: "Can You Set Up Regular, Recurring Shipments?",
    a: "Absolutely. Many of our business clients run scheduled restocks — weekly, monthly or seasonal — tailored to their business rhythm.",
  },
  {
    num: "05",
    q: "How Long Does Bulk Delivery Take?",
    a: "It depends on the volume, route and customs, typically a few days to a couple of weeks. Order ahead of festive peaks to be safe — we'll confirm timelines on your quote.",
  },
  {
    num: "06",
    q: "What Can't You Ship?",
    a: "Payment options are shared once your quote is confirmed on WhatsApp. You only pay when you're happy with the details. Secure payment links provided.",
  },
  {
    num: "07",
    q: "How Do I Pay?",
    a: "We'll share secure payment options once your quote is confirmed on WhatsApp.",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="#e77419" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function BusinessCampaignPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    centerMode: true,
    centerPadding: "20px",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "10px" } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "30px" } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: "10px" } },
    ],
  };

  return (
    <main className="w-full font-sans bg-white flex flex-col pb-16">
      {/* ── 1. HERO ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <div
          className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-lg"
          style={{ minHeight: "480px", height: "auto" }}
        >
          <Image
            src="/hero-right.jpg"
            alt="Manvi International Courier B2B"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for mobile readability, transitioning to horizontal gradient on desktop */}
          <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent" />

          <div className="relative z-10 min-h-[480px] flex flex-col justify-end p-6 sm:p-12 lg:p-16">
            <div className="flex flex-col gap-5 max-w-3xl">
              {/* Badge */}
              <div className="bg-black/40 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-[12px] md:text-[13px] font-semibold tracking-wide flex items-center gap-2 w-fit">
                <span>📦</span> Bulk Sourcing For Indian Businesses
              </div>

              {/* Heading */}
              <h1 className="text-white font-extrabold leading-[1.15] tracking-tight text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px]">
                Source From India.<br className="hidden sm:inline" /> Delivered To Your Business<br className="hidden sm:inline" /> In Your Country.
              </h1>

              {/* Description */}
              <p className="text-[15px] md:text-[16px] text-white/90 max-w-2xl leading-relaxed font-medium">
                Run An Indian Restaurant, Grocery, Boutique Or Garment Store Abroad? Tell Us <strong>What You Need And Where It Is In India —</strong> Spices, Groceries, Fabrics, Ethnic Wear — And We'll Pick It Up In Bulk And Deliver It To Your Door. <strong>Customs Handled.</strong>
              </p>
            </div>

            {/* CTAs and trust indicators */}
            <div className="flex flex-col gap-5 mt-8">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                {/* Call Now Button */}
                <a
                  href="tel:+917070506070"
                  className="flex items-center justify-center gap-2 font-bold text-[14px] md:text-[16px] px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-white no-underline transition-transform hover:scale-105 shadow-md bg-[#ff7a00] w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.5-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                  </svg>
                  Call Now
                </a>

                {/* WhatsApp Us Button */}
                <a
                  href="https://wa.me/917070506070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-bold text-[14px] md:text-[16px] px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-[#0a111e] no-underline transition-transform hover:scale-105 shadow-md bg-[#23c961] w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 fill-[#0a111e]" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-[#ff7a00]" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[14px] text-white/90 font-semibold tracking-wide">
                    Trusted By Indian Businesses Worldwide
                  </span>
                </div>
              </div>

              <p className="text-[14px] font-bold text-[#ff7a00]">
                USA · UK · Canada · Australia
              </p>
            </div>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-5">
          {[
            { label: "Serviceable Zipcodes", href: "/zipcode" },
            { label: "Track Shipment", href: "/track" },
            { label: "Our Services", href: "/services" },
            { label: "Contact Us", href: "/contact" },
          ].map((tab, idx) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-[14px] text-[13px] sm:text-[15px] md:text-[16px] font-bold text-white py-3 px-2 sm:py-4 sm:px-4 transition-transform hover:scale-[1.02] shadow-sm min-h-[48px] md:min-h-[64px] bg-[#ff7a00] no-underline text-center"
            >
              {idx === 1 ? (
                <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M8 12h5.5M8 14.5h5.5" />
                  <path d="M9.5 12c0 2 2 2.5 2 3.5" />
                </svg>
              ) : (
                <MapPin className="w-5 h-5 shrink-0 text-white" strokeWidth={2.5} />
              )}
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── 2. TRUSTED DELIVERY PARTNERS ── */}
      <section className="w-full bg-[#f0f1f4] py-8 mt-4">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12">
          <div className="flex items-center text-center md:text-left">
            <span className="text-xl sm:text-2xl font-extrabold text-[#ff7a00] leading-tight flex items-center gap-2">
              <span>
                Trusted Delivery <br className="hidden md:block" />Partners
              </span>
              <Plane className="w-6 h-6 text-[#ff7a00] shrink-0" fill="#ff7a00" />
            </span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center flex-1 gap-6 md:gap-12">
            {PARTNERS.map((p) => (
              <span key={p} className="text-xl sm:text-2xl font-black text-[#0f172a]">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="bg-[#f4f5f8] rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-14 border border-gray-100">
          <div className="text-center mb-8">
            <span className="inline-block border border-[#ff7a00] bg-[#fff5ed] text-[#ff7a00] px-4 py-1 rounded-full text-[12px] font-semibold tracking-wide uppercase mb-4">
              How It Works
            </span>
            <h2 className="text-[24px] sm:text-[32px] md:text-[42px] font-extrabold text-[#0f172a] leading-tight">
              From India To Your Business In Four Steps
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#555] mt-4 max-w-2xl mx-auto leading-relaxed">
              No complicated process. Send us your list on WhatsApp and we handle the rest — start to finish.
            </p>
          </div>
          <div className="flex flex-col gap-4 max-w-5xl mx-auto">
            {B2B_STEPS.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-start p-5 sm:p-8 rounded-[16px] sm:rounded-[20px] bg-white shadow-sm border border-gray-100/50"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0 mb-4 bg-[#ff7a00]">
                  {step.num}
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#0f172a] mb-2">
                  {step.title}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[#555] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHAT YOU CAN SOURCE ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="bg-[#f4f5f8] rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-14 border border-gray-100">
          <div className="mb-10 text-center">
            <span className="inline-block border border-[#ff7a00] bg-[#fff5ed] text-[#ff7a00] px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wide uppercase mb-4">
              What You Can Source
            </span>
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-extrabold text-[#0f172a] leading-tight">
              Stock Your Shelves, Straight From The Source
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 sm:p-8 rounded-[16px] sm:rounded-[20px] border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-[19px] sm:text-[22px] font-extrabold text-[#0f172a] mb-3 flex items-center gap-2">
                <span>🍲</span> Food & Grocery
              </h3>
              <p className="text-[14px] sm:text-[16px] text-[#555] leading-relaxed">
                {SOURCE_ITEMS[0].desc}
              </p>
            </div>
            <div className="bg-white p-5 sm:p-8 rounded-[16px] sm:rounded-[20px] border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-[19px] sm:text-[22px] font-extrabold text-[#0f172a] mb-3 flex items-center gap-2">
                <span>👗</span> Fabric & Fashion
              </h3>
              <p className="text-[14px] sm:text-[16px] text-[#555] leading-relaxed">
                {SOURCE_ITEMS[1].desc}
              </p>
            </div>
            <div className="bg-white p-5 sm:p-8 rounded-[16px] sm:rounded-[20px] border border-gray-100 shadow-sm md:col-span-2 flex flex-col">
              <h3 className="text-[19px] sm:text-[22px] font-extrabold text-[#0f172a] mb-3 flex items-center gap-2">
                <span>📦</span> Bulk, Mixed Or Recurring Orders
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#555] leading-relaxed">
                {SOURCE_ITEMS[2].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHERE WE PICK UP AND DELIVER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="bg-[#f4f5f8] rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-14 border border-gray-100">
          <div className="text-center mb-10">
            <span className="inline-block border border-[#ff7a00] bg-[#FF7F001F] text-[#ff7a00] px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wide uppercase mb-4">
              Where We Pick Up And Deliver
            </span>
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-extrabold text-[#0f172a] leading-tight">
              Where We Pick Up And Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Across India */}
            <div className="bg-white rounded-[16px] sm:rounded-[24px] p-5 sm:p-8 shadow-sm flex flex-col h-full border border-gray-100/50">
              <h3 className="text-[19px] sm:text-[22px] font-extrabold text-[#0f172a] mb-3 flex items-center gap-2">
                <span>📍</span> Pickup Across India
              </h3>
              <p className="text-[14px] sm:text-[16px] text-[#555] leading-relaxed mb-6">
                We specialise in North India — with pan-India pickup available on request.
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2.5">
                  {["Punjab", "Delhi NCR", "Haryana", "Rajasthan", "Gujarat", "Mumbai"].map((c) => (
                    <span
                      key={c}
                      className="text-[13px] sm:text-[15px] font-semibold px-4 py-1.5 rounded-full border border-[#FF7F00] text-[#0f172a] bg-[#FF7F001F]"
                    >
                      {c}
                    </span>
                  ))}
                  <span className="text-[13px] sm:text-[15px] font-bold px-4 py-1.5 rounded-full text-white bg-[#ff7a00]">
                    + Pan-India
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Destinations */}
            <div className="bg-white rounded-[16px] sm:rounded-[24px] p-5 sm:p-8 shadow-sm flex flex-col h-full border border-gray-100/50 justify-between">
              <div>
                <h3 className="text-[19px] sm:text-[22px] font-extrabold text-[#0f172a] mb-5 flex items-center gap-2">
                  <span>🛫</span> Delivery Destinations
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {["USA", "UK", "Canada", "Australia"].map((d) => (
                    <span
                      key={d}
                      className="text-[13px] sm:text-[15px] font-semibold px-4 py-1.5 rounded-full border border-[#FF7F00] text-[#0f172a] bg-[#FF7F001F]"
                    >
                      {d}
                    </span>
                  ))}
                  <span className="text-[13px] sm:text-[15px] font-bold px-4 py-1.5 rounded-full text-white bg-[#ff7a00]">
                    + Worldwide
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[14px] sm:text-[16px] text-[#555] font-semibold leading-relaxed mb-3">
                  Worldwide freight through our trusted shipping partners:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {["DHL", "FedEx", "UPS", "Aramex", "DPD"].map((partner) => (
                    <span
                      key={partner}
                      className="text-[13px] sm:text-[15px] font-semibold px-4 py-1.5 rounded-full border border-[#FF7F00] text-[#0f172a] bg-[#FF7F001F]"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* What You Can Ship */}
          <div className="mt-6 bg-white rounded-[16px] sm:rounded-[20px] p-5 sm:p-8 shadow-sm border border-gray-100/50">
            <h3 className="text-[18px] sm:text-[20px] font-extrabold text-[#0f172a] mb-2 flex items-center gap-2">
              <span>🎁</span> What You Can Ship
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed">
              Rakhis And Festival Gifts · Sweets & Dry Fruits · Gift Hampers · Clothing & Ethnic Wear · Business Documents · Commercial Samples · Personal Parcels. Not Sure About An Item? <strong className="text-[#ff7a00] font-extrabold">Ask Us On WhatsApp</strong> — We'll Confirm Before You Book.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. LOGISTICS PARTNER YOU CAN BUILD ON ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="bg-[#f4f5f8] rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-14 border border-gray-100">
          <div className="mb-10 text-center">
            <span className="inline-block border border-[#ff7a00] bg-[#fff5ed] text-[#ff7a00] px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wide uppercase mb-4">
              Why Manvi International
            </span>
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-extrabold text-[#0f172a] leading-tight">
              A Logistics Partner You Can Build On
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#666] mt-4 max-w-3xl mx-auto">
              Sourcing for a business is about reliability and margins, not one-off luck. Here's why store owners trust us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOGISTICS_REASONS.map((reason, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 bg-white p-5 sm:p-8 rounded-[20px] sm:rounded-[24px] border border-gray-100 shadow-sm"
              >
                <div className="relative w-[130px] h-[100px] shrink-0">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    fill
                    sizes="130px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-[19px] sm:text-[20px] font-extrabold text-[#0f172a] mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 py-8">
        <div className="bg-[#e5e6eb] rounded-[24px] p-5 sm:p-8 md:p-10">
          <div className="mb-10 text-center">
            <span className="inline-block border border-[#ff7a00] bg-[#fff5ed] text-[#ff7a00] px-4 py-1.5 rounded-full text-[12px] font-bold mb-4 uppercase tracking-wide">
              From Our Customers
            </span>
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-extrabold text-[#0f172a] leading-tight">
              Trusted By Families Worldwide
            </h2>
          </div>

          <div className="testimonial-carousel-container testimonial-carousel-light w-full">
            <Slider {...sliderSettings}>
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="px-1 sm:px-2 md:px-3">
                  <div className="testimonial-slide flex flex-col gap-0 px-5 py-5 sm:px-8 sm:py-8 rounded-2xl bg-white shadow-sm border border-black/5 mx-auto min-h-[250px] sm:min-h-[200px]">
                    <span className="text-[32px] md:text-[40px] text-[#ff7a00] font-serif leading-none select-none font-bold">
                      &#x201C;&#x201C;
                    </span>
                    <p className="text-[15px] sm:text-[16px] text-[#555] leading-relaxed italic mb-4">
                      {t.text}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0"
                        style={{ background: "#ff7a00" }}
                      >
                        {t.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[14px] font-bold text-[#0a111e]">
                          {t.name}
                        </p>
                        <p className="text-[12px] text-[#666]">{t.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <style jsx global>{`
            .testimonial-carousel-container {
              position: relative;
              overflow: hidden;
            }
            .testimonial-carousel-container::before,
            .testimonial-carousel-container::after {
              content: "";
              position: absolute;
              top: 0;
              width: 15%;
              height: 100%;
              z-index: 2;
              pointer-events: none;
            }
            .testimonial-carousel-light::before {
              left: 0;
              background: linear-gradient(to right, #e5e6eb, rgba(229,230,235,0.9), rgba(229,230,235,0));
            }
            .testimonial-carousel-light::after {
              right: 0;
              background: linear-gradient(to left, #e5e6eb, rgba(229,230,235,0.9), rgba(229,230,235,0));
            }
            .testimonial-slide {
              transition: all 0.5s ease;
              opacity: 0.4;
              transform: scale(0.85);
            }
            .slick-center .testimonial-slide {
              opacity: 1;
              transform: scale(1.05);
            }
            .slick-track {
              display: flex !important;
              align-items: center;
            }
            .slick-list {
              padding-top: 2rem !important;
              padding-bottom: 2rem !important;
            }
            .slick-slide {
              height: auto;
            }
            
            /* Mobile Adjustments */
            @media (max-width: 768px) {
              .testimonial-carousel-container::before,
              .testimonial-carousel-container::after {
                width: 5%; /* Less obscuring gradient on mobile */
              }
              .slick-center .testimonial-slide {
                transform: scale(1); /* Prevent scale cutoff on small screens */
              }
              .testimonial-slide {
                transform: scale(0.9);
                opacity: 0.5;
              }
              .slick-list {
                padding-top: 1rem !important;
                padding-bottom: 1rem !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="bg-[#f4f5f8] rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-14 border border-gray-100">
          <div className="text-center mb-10">
            <span className="inline-block border border-[#ff7a00] bg-[#fff5ed] text-[#ff7a00] px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wide uppercase mb-4">
              FAQ
            </span>
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-extrabold text-[#0f172a] leading-tight">
              Questions? Glad You Asked
            </h2>
          </div>

          {/* Accordion rows */}
          <div className="flex flex-col max-w-6xl mx-auto">
            {FAQS.map((f, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveIndex(isActive ? -1 : i)}
                  className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-4 lg:gap-16 border-b border-gray-300/40 last:border-b-0 cursor-pointer items-baseline select-none"
                  style={{ padding: isActive ? "2rem 0" : "1.25rem 0" }}
                >
                  {/* Left: Number + Question */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#ff7a00] text-[13px] font-black tracking-widest">
                      {f.num}
                    </span>
                    <h3
                      className="font-extrabold text-[#0f172a] leading-snug tracking-tight transition-all duration-300 flex items-start justify-between gap-3"
                      style={{ fontSize: isActive ? "20px" : "18px" }}
                    >
                      <span>{f.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#ff7a00] shrink-0 mt-0.5 transition-transform duration-300 ${isActive ? "rotate-180" : ""
                          }`}
                      />
                    </h3>
                  </div>

                  {/* Right: Answer */}
                  <p
                    className="leading-relaxed transition-all duration-300"
                    style={{
                      fontSize: isActive ? "16px" : "15px",
                      color: isActive ? "#4b5563" : "#888888",
                      fontStyle: isActive ? "normal" : "italic",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. BOTTOM CTA ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8 mb-8">
        <div className="rounded-[20px] sm:rounded-[24px] p-6 sm:p-10 md:p-16 text-center" style={{ background: "#FF7F0052" }}>
          <h2 className="text-[24px] sm:text-[32px] md:text-[44px] font-extrabold text-[#0a111e] leading-tight">
            Ready To Stock Up From India?
          </h2>
          <p className="text-[15px] md:text-[18px] text-[#444] leading-relaxed max-w-2xl mx-auto mt-4 mb-8 font-medium">
            Send Us Your List And Pickup Location. We'll Handle Pickup, Shipping And Customs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <a
              href="https://wa.me/917070506070"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-bold text-[15px] px-8 py-4 rounded-full text-[#0a111e] no-underline transition-transform hover:scale-105 w-full sm:w-auto"
              style={{ background: "#23c961" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0a111e">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            <a
              href="tel:+917070506070"
              className="flex items-center justify-center gap-2 font-bold text-[15px] px-8 py-4 rounded-full text-white no-underline transition-transform hover:scale-105 w-full sm:w-auto"
              style={{ background: "#e77419" }}
            >
              <Phone className="w-5 h-5" /> Call +91 7070506070
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

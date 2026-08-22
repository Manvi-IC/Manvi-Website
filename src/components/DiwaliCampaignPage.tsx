"use client";

import {
  ArrowUpRight,
  MapPin,
  Receipt,
  Phone,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Sparkles,
  Gift,
  Flame,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

const DIWALI_ITEMS = [
  {
    icon: "🥮",
    title: "Diwali Sweets & Faral",
    desc: "Kaju Katli, Motichoor Ladoo, Besan Barfi, Chakli, Karanji, Chivda & mathri with vacuum food sealing.",
  },
  {
    icon: "🪔",
    title: "Diyas, Puja Thalis & Decor",
    desc: "Terracotta diyas, brass puja items, decorative incense holders, rangoli stencils, and torans.",
  },
  {
    icon: "👗",
    title: "Ethnic Wear & Outfits",
    desc: "Festive Kurta-Pajamas, Sarees, Lehengas, kids ethnic dresses, and traditional jewellery.",
  },
  {
    icon: "🥜",
    title: "Dry Fruits & Nuts Hampers",
    desc: "Cashews, almonds, pistachios, raisins, saffron, and customized festive gift boxes.",
  },
  {
    icon: "🎁",
    title: "Corporate & Family Gifts",
    desc: "Festive gift packs, customized stationery, and premium token hampers for relatives.",
  },
  {
    icon: "🕯️",
    title: "Lanterns & Lights",
    desc: "Decorative paper kandils, decorative battery string lights, and festive home art.",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Book Early for Diwali",
    desc: "Share your Diwali parcel details and address to guarantee delivery before Diwali night.",
  },
  {
    num: "2",
    title: "Free Doorstep Pickup",
    desc: "We pick up directly from your doorstep across Delhi NCR, Punjab, Haryana, Rajasthan, Gujarat, etc.",
  },
  {
    num: "3",
    title: "Special Vacuum Packing",
    desc: "Multi-layered protective food packaging ensures fragile sweets and snacks arrive crunchy and fresh.",
  },
  {
    num: "4",
    title: "Festive Worldwide Delivery",
    desc: "Swift 3–5 day delivery right to your relatives' homes across USA, UK, Canada, Australia, and 200+ countries.",
  },
];

const DESTINATIONS = [
  { label: "Australia", value: "AUSTRALIA", requiresZip: true, requiresSubCountry: false, flag: "🇦🇺" },
  { label: "Canada", value: "CANADA", requiresZip: true, requiresSubCountry: false, flag: "🇨🇦" },
  { label: "United Kingdom", value: "UK", requiresZip: false, requiresSubCountry: false, flag: "🇬🇧" },
  { label: "Europe", value: "EUROPE", requiresZip: false, requiresSubCountry: true, flag: "🇪🇺" },
  { label: "International", value: "INTERNATIONAL", requiresZip: false, requiresSubCountry: true, flag: "🌍" },
];

const EUROPE_COUNTRIES = [
  "GERMANY", "AUSTRIA", "BELGIUM", "LUXEMBOURG", "NETHERLANDS", "CZECH REPUBLIC",
  "DENMARK", "FRANCE", "ITALY", "POLAND", "SPAIN", "IRELAND", "PORTUGAL", "SWEDEN",
  "FINLAND", "GREECE", "ICELAND", "NORWAY", "SWITZERLAND",
];

const INTERNATIONAL_COUNTRIES = [
  "USA", "SINGAPORE", "UNITED ARAB EMIRATES", "MALAYSIA", "NEW ZEALAND", "THAILAND",
  "HONG KONG", "QATAR", "SAUDI ARABIA", "KUWAIT", "OMAN", "BAHRAIN", "JAPAN", "SOUTH AFRICA",
];

const DIWALI_FAQS = [
  {
    q: "Will my Diwali sweets and Faral reach before Diwali day?",
    a: "Yes! We recommend booking your Diwali shipment 7 to 10 days before the festival. With express shipping (3-5 days delivery), your parcel will arrive well in time for the celebrations.",
  },
  {
    q: "How do you ensure fragile sweets and snacks don't break or spoil?",
    a: "All eatables, namkeen, and sweets are professionally vacuum-sealed, bubble wrapped, and placed inside rigid corrugated boxes to maintain freshness and prevent breakage.",
  },
  {
    q: "Are Brass Puja items, Diyas, and Torans allowed for courier to USA/UK?",
    a: "Yes! Brass puja items, clay diyas, Torans, and decorations are 100% permitted. Fireworks, oil, and flammable items are strictly prohibited.",
  },
  {
    q: "Can I send branded sweets as well as homemade snacks together?",
    a: "Yes, you can combine homemade snacks (faral, mathri, laddoos) and branded packaged sweets in the same box. We provide an itemized packing invoice for smooth customs clearance.",
  },
];

interface Quote {
  service: string;
  rateType: string;
  totalPrice: number;
  tat: string;
}

export default function DiwaliCampaignPage() {
  const { t } = useLanguage();
  const [destination, setDestination] = useState("");
  const [zoningCountry, setZoningCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [actualWt, setActualWt] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const quotesSectionRef = useRef<HTMLDivElement>(null);

  // Inquiry form states
  const [inqName, setInqName] = useState("");
  const [inqPhone, setInqPhone] = useState("");
  const [inqEmail, setInqEmail] = useState("");
  const [inqDest, setInqDest] = useState("");
  const [inqWeight, setInqWeight] = useState("");
  const [inqItems, setInqItems] = useState("");
  const [inqLoading, setInqLoading] = useState(false);
  const [inqSuccess, setInqSuccess] = useState(false);

  const destObj = DESTINATIONS.find((d) => d.value === destination);
  const requiresZip = destObj?.requiresZip ?? false;
  const requiresSubCountry = destObj?.requiresSubCountry ?? false;
  const subCountryOptions = destination === "EUROPE" ? EUROPE_COUNTRIES : INTERNATIONAL_COUNTRIES;

  const volWt =
    parseFloat(length) && parseFloat(breadth) && parseFloat(height)
      ? (
        (parseFloat(length) * parseFloat(breadth) * parseFloat(height)) /
        5000
      ).toFixed(2)
      : null;
  const chargeableWt = volWt
    ? Math.ceil(Math.max(parseFloat(actualWt) || 0, parseFloat(volWt)))
    : Math.ceil(parseFloat(actualWt) || 0);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !actualWt) {
      alert("Please select a destination and enter weight.");
      return;
    }
    setQuoteLoading(true);
    setQuotes([]);
    try {
      const params = new URLSearchParams({ actualWt, country: destination });
      if (length) params.append("length", length);
      if (breadth) params.append("breadth", breadth);
      if (height) params.append("height", height);
      if (zipcode) params.append("zipcode", zipcode);
      if (zoningCountry) params.append("zoningCountry", zoningCountry);

      const res = await fetch(`${API_URL}/rates/quote?${params}`, {
        headers: { "x-database": DB_NAME },
      });
      const data = await res.json();
      if (data.success && data.quotes?.length > 0) {
        setQuotes(data.quotes);
        setShowQuoteModal(true);
        setTimeout(() => {
          quotesSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        alert(data.message || "No rate available. Contact us directly on WhatsApp!");
      }
    } catch {
      alert("Could not fetch instant rates. Please connect directly with our support team.");
    } finally {
      setQuoteLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInqLoading(true);
    const params = new URLSearchParams();
    params.append("xnQsjsdp", "0865f832e9eff8ac8416c9074e4fe81d82b2f78105b16bc6675b9cd2e3f7dfad");
    params.append("zc_gad", "");
    params.append("xmIwtLD", "ca6104fc687d6c4afcb27e6c4f9bdef93a18aec2baa19548cd8ce05901d0a0de7d20fe8f7958b27d61877d5aaa686212");
    params.append("actionType", "Q29udGFjdHM=");
    params.append("returnURL", "null");
    params.append("Last Name", inqName || "Diwali Customer");
    params.append("Phone", inqPhone);
    params.append("Email", inqEmail || "noemail@diwali.com");
    params.append("Title", "Diwali Campaign Inquiry");
    params.append("Department", inqDest || "International");
    params.append("Description", `Diwali shipment: ${inqItems}, Approx weight: ${inqWeight}kg`);
    params.append("Lead Source", "Diwali Campaign Page");

    try {
      await fetch("https://crm.zoho.in/crm/WebToContactForm", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      setInqSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Thank you! Your Diwali courier request is received. We will contact you shortly.");
      setInqSuccess(true);
    } finally {
      setInqLoading(false);
    }
  };

  return (
    <main className="w-full font-sans bg-[#faf5ea] text-[#1c1f2e] flex flex-col antialiased pb-24 sm:pb-28">
      {/* ── 1. HERO BANNER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 pt-4 sm:pt-8 pb-6 sm:pb-12">
        <div className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[32px] bg-[#1a0c02] shadow-2xl flex flex-col justify-center">
          <Image
            src="/diwali-banner.jpg"
            alt="Diwali International Courier Campaign"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-55 mix-blend-screen"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0c02] via-[#1a0c02]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0c02] via-[#1a0c02]/75 to-transparent" />

          {/* Top Festive Badge */}
          <div className="absolute top-5 right-5 hidden md:flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Diwali Festive Special Edition · Guaranteed Delivery
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 flex flex-col justify-center px-4 py-7 sm:px-10 sm:py-12 md:px-14 md:py-14 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-300 text-[10px] sm:text-[12px] font-extrabold w-fit mb-2.5 sm:mb-3 tracking-wide uppercase">
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400" />
              THIS DIWALI FESTIVAL
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.2] sm:leading-[1.15] tracking-tight mb-3 sm:mb-4">
              Send Diwali Sweets & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-200">
                Gifts to USA, UK & Worldwide
              </span>
            </h1>

            <p className="text-amber-100/90 text-xs sm:text-base font-medium leading-relaxed mb-5 sm:mb-6 max-w-xl">
              Deliver the authentic taste of home! Ship homemade Faral, sweets, diyas, dry fruits, and festive ethnic clothes to family across 200+ global destinations.
            </p>

            {/* Rate Highlight Pill */}
            <div className="bg-white/10 backdrop-blur-md border border-amber-500/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 max-w-xl mb-5 sm:mb-6 shadow-xl">
              <div className="text-[10px] sm:text-[12px] uppercase tracking-wider text-amber-300 font-extrabold mb-2 flex items-center gap-1.5">
                <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 🪔 Diwali Special Parcel Rates (Per Kg Starting)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-center text-xs font-bold">
                <div className="bg-amber-950/80 border border-amber-500/40 rounded-lg sm:rounded-xl py-1.5 sm:py-2 px-1.5 sm:px-2">
                  <span className="text-white block text-[11px] sm:text-xs mb-0.5">🇬🇧 UK</span>
                  <span className="text-amber-300 font-extrabold text-xs sm:text-base">₹649/kg</span>
                </div>
                <div className="bg-amber-950/80 border border-amber-500/40 rounded-lg sm:rounded-xl py-1.5 sm:py-2 px-1.5 sm:px-2">
                  <span className="text-white block text-[11px] sm:text-xs mb-0.5">🇺🇸 USA</span>
                  <span className="text-amber-300 font-extrabold text-xs sm:text-base">₹679/kg</span>
                </div>
                <div className="bg-amber-950/80 border border-amber-500/40 rounded-lg sm:rounded-xl py-1.5 sm:py-2 px-1.5 sm:px-2">
                  <span className="text-white block text-[11px] sm:text-xs mb-0.5">🇨🇦 Canada</span>
                  <span className="text-amber-300 font-extrabold text-xs sm:text-base">₹749/kg</span>
                </div>
                <div className="bg-amber-950/80 border border-cyan-500/30 rounded-lg sm:rounded-xl py-1.5 sm:py-2 px-1.5 sm:px-2">
                  <span className="text-white block text-[11px] sm:text-xs mb-0.5">🇦🇺 Australia</span>
                  <span className="text-amber-300 font-extrabold text-xs sm:text-base">₹789/kg</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href="#diwali-calculator"
                className="bg-[#e77419] hover:bg-orange-600 text-white font-bold text-xs sm:text-base px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 text-center"
              >
                {t.nav_quote} <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/917070506070?text=Hi%2C%20I%20want%20to%20send%20a%20Diwali%20gift%20parcel%20abroad"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#23c961] hover:bg-[#1fb355] text-[#0a111e] font-extrabold text-xs sm:text-base px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 text-center"
              >
                {t.contact_whatsapp}
              </a>
            </div>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-8">
          {[
            { label: t.hero_serviceable_zipcodes, href: "/zipcode" },
            { label: t.nav_track_shipment, href: "/track" },
            { label: t.hero_our_services, href: "/services" },
            { label: t.hero_contact_us, href: "/contact" },
          ].map((tab, idx) => {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl md:rounded-2xl text-[11px] sm:text-[14px] font-semibold text-white py-2.5 sm:py-4 px-2 sm:px-4 transition-transform hover:scale-[1.02] no-underline shadow-sm min-h-[44px] sm:min-h-[54px] text-center"
                style={{ background: "#e77419" }}
              >
                {idx === 1 ? (
                  <Receipt className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" strokeWidth={2.5} />
                ) : (
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" strokeWidth={2.5} />
                )}
                <span className="truncate sm:whitespace-normal">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 2. INSTANT RATE CALCULATOR (Signature Orange Card) ── */}
      <section id="diwali-calculator" className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-5 sm:py-10">
        <div className="bg-[#f27a1a] rounded-[20px] sm:rounded-[28px] p-4 sm:p-10 lg:p-12 shadow-xl">
          <div className="flex flex-col gap-1.5 sm:gap-2 mb-5 sm:mb-6 text-center md:text-left">
            <h2 className="text-xl sm:text-[30px] md:text-[34px] font-extrabold text-white leading-tight tracking-tight">
              Calculate Instant Diwali Parcel Rates
            </h2>
            <p className="text-white/80 text-xs sm:text-[14px] leading-relaxed max-w-2xl mx-auto md:mx-0">
              Calculate lowest courier rates for Diwali Sweets, Faral, Hampers & Clothes across global air carriers.
            </p>
          </div>

          <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-3 sm:gap-4">
            {/* Row 1: Destination · (Sub-country / Zip) · Actual Weight */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <div className="relative flex-1 min-w-full sm:min-w-[220px]">
                <select
                  aria-label={t.form_select_dest}
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setZipcode("");
                    setZoningCountry("");
                    setQuotes([]);
                  }}
                  className="w-full bg-white text-[#333] text-xs sm:text-[13px] font-medium rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-3 sm:py-3.5 focus:outline-none appearance-none"
                >
                  <option value="">{t.form_select_dest}</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.flag} {d.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              {requiresSubCountry && (
                <div className="relative flex-1 min-w-full sm:min-w-[220px]">
                  <select
                    aria-label={
                      destination === "EUROPE"
                        ? t.form_select_euro
                        : t.form_select_country
                    }
                    value={zoningCountry}
                    onChange={(e) => {
                      setZoningCountry(e.target.value);
                      setQuotes([]);
                    }}
                    className="w-full bg-white text-[#333] text-xs sm:text-[13px] font-medium rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-3 sm:py-3.5 focus:outline-none appearance-none"
                  >
                    <option value="">
                      {destination === "EUROPE"
                        ? t.form_select_euro
                        : t.form_select_country}
                    </option>
                    {subCountryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              )}

              {requiresZip && (
                <input
                  aria-label={`${t.form_zipcode} (required for ${destObj?.label})`}
                  type="text"
                  placeholder={`${t.form_zipcode} (required for ${destObj?.label})`}
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                  className="flex-1 min-w-full sm:min-w-[220px] bg-white text-[#333] text-xs sm:text-[13px] font-medium rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-3 sm:py-3.5 focus:outline-none placeholder:text-gray-400"
                />
              )}

              <input
                aria-label={t.form_actual_wt || "Actual Weight"}
                type="number"
                placeholder={t.form_actual_wt}
                value={actualWt}
                onChange={(e) => setActualWt(e.target.value)}
                min="0.001"
                step="0.001"
                className="flex-1 min-w-full sm:min-w-[220px] bg-white text-[#333] text-xs sm:text-[13px] font-medium rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-3 sm:py-3.5 focus:outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Row 2: Dimensions */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <span className="text-white/70 text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase pl-1">
                {t.form_vol_wt_dim}
              </span>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <input
                  aria-label={t.form_length}
                  type="number"
                  placeholder={t.form_length}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  min="0"
                  className="w-full bg-white text-[#333] text-xs sm:text-[13px] font-medium rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-2.5 sm:py-3.5 focus:outline-none placeholder:text-gray-400"
                />
                <input
                  aria-label={t.form_breadth}
                  type="number"
                  placeholder={t.form_breadth}
                  value={breadth}
                  onChange={(e) => setBreadth(e.target.value)}
                  min="0"
                  className="w-full bg-white text-[#333] text-xs sm:text-[13px] font-medium rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-2.5 sm:py-3.5 focus:outline-none placeholder:text-gray-400"
                />
                <input
                  aria-label={t.form_height}
                  type="number"
                  placeholder={t.form_height}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="0"
                  className="w-full bg-white text-[#333] text-xs sm:text-[13px] font-medium rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-2.5 sm:py-3.5 focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Row 3: Submit */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mt-1">
              {(actualWt || volWt) && (
                <div className="flex-1 bg-white/20 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-1 text-white text-[11px] sm:text-xs font-semibold">
                  {volWt && (
                    <span>
                      {t.form_vol_wt} {volWt} kg
                    </span>
                  )}
                  <span>
                    {t.form_chargeable} {chargeableWt} kg
                  </span>
                </div>
              )}
              <button
                type="submit"
                disabled={quoteLoading}
                className={`bg-[#0D1527] hover:bg-slate-800 text-white font-bold text-xs sm:text-[13px] py-3 sm:py-3.5 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-70 ${actualWt || volWt ? "sm:w-auto" : "w-full"
                  }`}
              >
                {quoteLoading ? t.form_calculating : t.hero_get_quote}{" "}
                {!quoteLoading && (
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </form>

          {/* Quotes Results List */}
          {showQuoteModal && quotes.length > 0 && (
            <div ref={quotesSectionRef} className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 animate-in fade-in duration-300">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" /> Available Diwali Carrier Options for {destObj?.label || destination}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {quotes.map((q, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md text-[#1c1f2e]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-sm sm:text-base text-[#1c1f2e]">{q.service}</span>
                        <span className="text-[11px] sm:text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-amber-200">
                          {q.tat}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-500">{q.rateType} · Priority Festive Air Dispatch</p>
                    </div>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] sm:text-xs text-gray-400 block font-medium">Total Price</span>
                        <p className="text-xl sm:text-2xl font-black text-[#f27a1a]">₹{Math.round(q.totalPrice).toLocaleString("en-IN")}</p>
                      </div>
                      <a
                        href={`https://wa.me/917070506070?text=Hi%2C%20I%20want%20to%20book%20Diwali%20Shipment%20${encodeURIComponent(q.service)}%20to%20${destination}%20for%20approx%20${actualWt}kg%20at%20₹${Math.round(q.totalPrice)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#23c961] hover:bg-[#1fb355] text-[#0a111e] font-extrabold text-[11px] sm:text-xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all shadow-sm"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. SPECIAL DIWALI FESTIVE OFFER INFO BOX ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-10">
        <div className="bg-gradient-to-br from-[#fff7ed] via-[#fffbf5] to-[#fff3e0] border-2 border-[#e77419]/30 rounded-[20px] sm:rounded-[28px] p-4 sm:p-8 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-3 sm:gap-4 text-[#0a111e]">
            <div>
              <span className="inline-flex items-center gap-1.5 border border-[#e77419] bg-[#e77419]/10 text-[#e77419] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-extrabold uppercase tracking-wide">
                🪔 Special Diwali Shipping Offer
              </span>
            </div>
            <p className="text-sm sm:text-[17px] md:text-[18px] font-semibold text-[#0a111e] leading-relaxed">
              Celebrate the festival of lights with your relatives overseas! Send homemade Diwali Faral, Kaju Katli, traditional Diyas, and gift hampers with guaranteed fast delivery.
            </p>
            <p className="text-xs sm:text-[16px] text-[#444] leading-relaxed">
              <strong className="text-[#e77419] font-bold">Food-Grade Vacuum Sealing:</strong> We protect every batch of homemade snacks and sweets with airtight sealing and rigid packing so they arrive tasting just like home.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT YOU CAN SHIP FOR DIWALI ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <span className="text-[#f27a1a] text-[11px] sm:text-xs font-black uppercase tracking-wider">
            Festive Packing Catalog
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1f2e] mt-1">
            What Can You Ship For Diwali?
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1.5 sm:mt-2">
            Send authentic homemade delicacies, traditional gifts, and festive wear anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
          {DIWALI_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col gap-3 sm:gap-4 hover:border-orange-400 hover:shadow-md transition-all group shadow-sm"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1c1f2e] group-hover:text-[#f27a1a] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1 sm:mt-1.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14">
        <div className="bg-[#eef0f5] rounded-[20px] sm:rounded-3xl p-5 sm:p-12 shadow-sm border border-gray-200/60">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-12">
            <span className="text-[#f27a1a] text-[11px] sm:text-xs font-black uppercase tracking-wider">
              Hassle-Free Logistics
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1f2e] mt-1">
              How Diwali Delivery Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#f27a1a] text-white font-black text-sm sm:text-lg flex items-center justify-center mb-3 sm:mb-4 shadow-md shadow-orange-500/20">
                    {step.num}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1c1f2e] mb-1.5 sm:mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. QUICK INQUIRY & BOOKING FORM ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center bg-[#eef0f5] border border-gray-200/70 rounded-[20px] sm:rounded-3xl p-4 sm:p-10 lg:p-12 shadow-sm">
          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4">
            <span className="text-[#f27a1a] text-[11px] sm:text-xs font-black uppercase tracking-wider">
              Diwali Express Dispatch
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1c1f2e] leading-tight">
              Book Your Diwali Parcel Today
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Ensure your family celebrates with homemade treats and gifts on time. Request our free doorstep pickup and custom packing service today.
            </p>

            <div className="flex flex-col gap-2.5 sm:gap-3 mt-1 sm:mt-2">
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                <span>Doorstep Pickup Across Delhi NCR, Punjab, Haryana & Gujarat</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                <span>Free Vacuum Sealing & Food-Grade Packaging</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                <span>Zero Customs Hassle with Complete Documentation</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2 sm:mt-4">
              <a
                href="tel:+917070506070"
                className="w-full sm:w-auto justify-center bg-[#f27a1a] hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full transition-all flex items-center gap-2 shadow-md shadow-orange-500/25 text-center"
              >
                <Phone className="w-4 h-4" /> Call: +91 70 70 50 60 70
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 bg-white border border-gray-200/80 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm">
            {inqSuccess ? (
              <div className="text-center py-6 sm:py-8">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Diwali Booking Received!</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">Our logistics agent will contact you shortly to schedule pickup.</p>
                <button
                  onClick={() => setInqSuccess(false)}
                  className="text-xs text-[#f27a1a] font-bold underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg font-bold text-[#1c1f2e] mb-1">Request Diwali Pickup</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name*"
                    value={inqName}
                    onChange={(e) => setInqName(e.target.value)}
                    className="bg-[#f8f9fa] border border-gray-200 rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-[#333] text-xs font-medium focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Contact Number*"
                    value={inqPhone}
                    onChange={(e) => setInqPhone(e.target.value)}
                    className="bg-[#f8f9fa] border border-gray-200 rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-[#333] text-xs font-medium focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Destination Country (e.g. USA)*"
                    value={inqDest}
                    onChange={(e) => setInqDest(e.target.value)}
                    className="bg-[#f8f9fa] border border-gray-200 rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-[#333] text-xs font-medium focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="Approx Weight (kg)"
                    value={inqWeight}
                    onChange={(e) => setInqWeight(e.target.value)}
                    className="bg-[#f8f9fa] border border-gray-200 rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-[#333] text-xs font-medium focus:outline-none focus:border-orange-500"
                  />
                </div>

                <textarea
                  rows={3}
                  placeholder="Items list (e.g., Kaju Katli, Faral, Diyas, Clothes)..."
                  value={inqItems}
                  onChange={(e) => setInqItems(e.target.value)}
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-[#333] text-xs font-medium focus:outline-none focus:border-orange-500 resize-none"
                />

                <button
                  type="submit"
                  disabled={inqLoading}
                  className="bg-[#f27a1a] hover:bg-orange-600 disabled:opacity-70 text-white font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  {inqLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Diwali Pickup Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 7. DIWALI SHIPPING FAQS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <span className="text-[#f27a1a] text-[11px] sm:text-xs font-black uppercase tracking-wider">
            Help & Guidelines
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1f2e] mt-1">
            Diwali Shipping FAQs
          </h2>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-3 sm:gap-4">
          {DIWALI_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-1.5 sm:gap-2 shadow-sm"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#1c1f2e] flex items-start gap-2 sm:gap-3">
                <span className="text-[#f27a1a] font-extrabold">Q{idx + 1}.</span> {faq.q}
              </h3>
              <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed pl-5 sm:pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOBILE STICKY QUICK ACTION BAR ── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a0c02]/95 backdrop-blur-md border-t border-amber-500/20 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="#diwali-calculator"
          className="flex-1 bg-[#e77419] hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all text-center no-underline"
        >
          {t.nav_quote || "Instant Rate"} <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://wa.me/917070506070?text=Hi%2C%20I%20want%20to%20send%20a%20Diwali%20gift%20parcel%20abroad"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#23c961] hover:bg-[#1fb355] text-[#0a111e] font-extrabold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all text-center no-underline"
        >
          {t.contact_whatsapp || "WhatsApp"}
        </a>
        <a
          href="tel:+917070506070"
          className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-all no-underline"
          aria-label="Call Support"
        >
          <Phone className="w-3.5 h-3.5 text-amber-300" />
        </a>
      </div>
    </main>
  );
}

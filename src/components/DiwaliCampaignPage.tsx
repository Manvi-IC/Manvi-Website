"use client";
import DiwaliFireworks from "@/components/DiwaliFireworks";
import SearchableCountryDropdown from "@/components/SearchableCountryDropdown";
import {
  DiyaLamp,
  AkashKandil,
  RangoliDivider,
  RangoliWatermark,
  DiwaliAmbientEmbers,
  FestiveJaliBackground,
  CornerFlourish,
} from "@/components/DiwaliDecorations";

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
import { useState, useRef, useEffect } from "react";
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
  {
    label: "Australia",
    value: "AUSTRALIA",
    requiresZip: true,
    requiresSubCountry: false,
    flag: "🇦🇺",
  },
  {
    label: "Canada",
    value: "CANADA",
    requiresZip: true,
    requiresSubCountry: false,
    flag: "🇨🇦",
  },
  {
    label: "United Kingdom",
    value: "UK",
    requiresZip: false,
    requiresSubCountry: false,
    flag: "🇬🇧",
  },
  {
    label: "Europe",
    value: "EUROPE",
    requiresZip: false,
    requiresSubCountry: true,
    flag: "🇪🇺",
  },
  {
    label: "International",
    value: "INTERNATIONAL",
    requiresZip: false,
    requiresSubCountry: true,
    flag: "🌍",
  },
];

const EUROPE_COUNTRIES = [
  "GERMANY",
  "AUSTRIA",
  "BELGIUM",
  "LUXEMBOURG",
  "NETHERLANDS",
  "CZECH REPUBLIC",
  "DENMARK",
  "FRANCE",
  "ITALY",
  "POLAND",
  "SPAIN",
  "IRELAND",
  "PORTUGAL",
  "SWEDEN",
  "FINLAND",
  "GREECE",
  "ICELAND",
  "NORWAY",
  "SWITZERLAND",
];

import { INTERNATIONAL_COUNTRIES } from "@/lib/countries";

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

interface DiwaliCampaignPageProps {
  isDiwaliMode?: boolean;
  setIsDiwaliMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DiwaliCampaignPage({
  isDiwaliMode: controlledDiwaliMode,
  setIsDiwaliMode: setControlledDiwaliMode,
}: DiwaliCampaignPageProps = {}) {
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
  const [internalDiwaliMode, setInternalDiwaliMode] = useState(true);
  const isDiwaliMode =
    controlledDiwaliMode !== undefined
      ? controlledDiwaliMode
      : internalDiwaliMode;
  const setIsDiwaliMode = setControlledDiwaliMode || setInternalDiwaliMode;

  useEffect(() => {
    if (isDiwaliMode) {
      document.body.classList.add("diwali-dark-global");
      document.documentElement.style.backgroundColor = "#1E1109";
      document.body.style.backgroundColor = "#1E1109";
    } else {
      document.body.classList.remove("diwali-dark-global");
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    }

    return () => {
      document.body.classList.remove("diwali-dark-global");
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, [isDiwaliMode]);

  const destObj = DESTINATIONS.find((d) => d.value === destination);
  const requiresZip = destObj?.requiresZip ?? false;
  const requiresSubCountry = destObj?.requiresSubCountry ?? false;
  const subCountryOptions =
    destination === "EUROPE" ? EUROPE_COUNTRIES : INTERNATIONAL_COUNTRIES;

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
          quotesSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        alert(
          data.message || "No rate available. Contact us directly on WhatsApp!",
        );
      }
    } catch {
      alert(
        "Could not fetch instant rates. Please connect directly with our support team.",
      );
    } finally {
      setQuoteLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInqLoading(true);
    const params = new URLSearchParams();
    params.append(
      "xnQsjsdp",
      "0865f832e9eff8ac8416c9074e4fe81d82b2f78105b16bc6675b9cd2e3f7dfad",
    );
    params.append("zc_gad", "");
    params.append(
      "xmIwtLD",
      "ca6104fc687d6c4afcb27e6c4f9bdef93a18aec2baa19548cd8ce05901d0a0de7d20fe8f7958b27d61877d5aaa686212",
    );
    params.append("actionType", "Q29udGFjdHM=");
    params.append("returnURL", "null");
    params.append("Last Name", inqName || "Diwali Customer");
    params.append("Phone", inqPhone);
    params.append("Email", inqEmail || "noemail@diwali.com");
    params.append("Title", "Diwali Campaign Inquiry");
    params.append("Department", inqDest || "International");
    params.append(
      "Description",
      `Diwali shipment: ${inqItems}, Approx weight: ${inqWeight}kg`,
    );
    params.append("Lead Source", "Diwali Campaign Page");

    try {
      await fetch("https://crm.zoho.in/crm/WebToContactForm", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      // Save to backend quote-enquiries for admin dashboard
      fetch(`${API_URL}/quote-enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-database": DB_NAME,
        },
        body: JSON.stringify({
          name: inqName.trim() || "Diwali Customer",
          phone: inqPhone.trim(),
          email: inqEmail.trim() || "not-provided@diwali-campaign.local",
          destination: inqDest.trim() || "International",
          actualWt: parseFloat(inqWeight) || 0,
          chargeableWt: parseFloat(inqWeight) || 0,
          service: "Diwali Pickup Request",
          sourcePage: "Diwali Campaign",
          notes: `Items: ${inqItems || "N/A"}`,
        }),
      }).catch((e) => console.warn("[Diwali Campaign] Quote save error:", e));

      setInqSuccess(true);
    } catch (err) {
      console.error(err);
      alert(
        "Thank you! Your Diwali courier request is received. We will contact you shortly.",
      );
      setInqSuccess(true);
    } finally {
      setInqLoading(false);
    }
  };

  return (
    <main
      className={`w-full font-sans flex flex-col antialiased pb-24 sm:pb-28 transition-colors duration-300 relative ${
        isDiwaliMode ? "text-[#1F272F]" : "bg-[#faf5ea] text-[#1c1f2e]"
      }`}
    >
      {isDiwaliMode && (
        <style>{`
          .gold-text {
            background: linear-gradient(180deg, #f58f35 0%, #ED7E23 48%, #B4683F 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .diwali-panel {
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(252, 246, 240, 0.96));
            box-shadow: 0 14px 34px -22px rgba(31, 39, 47, 0.28);
            border: 1px solid rgba(237, 126, 35, 0.3);
          }
        `}</style>
      )}

      {/* ── Festive Top Props (Visible exclusively in Diwali Mode) ── */}
      {isDiwaliMode && (
        <>
          {/* Subtle Royal Indian Jali Lattice Texture across the background */}
          <FestiveJaliBackground />

          {/* Traditional Hanging Akash Kandils on Outer Margins (Desktop only to prevent clutter) */}
          <div className="hidden 2xl:block fixed top-24 left-3 z-30 opacity-90 pointer-events-none">
            <AkashKandil size={56} />
          </div>
          <div className="hidden 2xl:block fixed top-24 right-3 z-30 opacity-90 pointer-events-none">
            <AkashKandil size={56} />
          </div>

          {/* Gentle Ambient Embers Floating Upwards */}
          <DiwaliAmbientEmbers />
        </>
      )}

      {/* ── 1. HERO BANNER ── */}
      <section className="w-full max-w-[1352px] mx-auto px-3 sm:px-6 pt-2 sm:pt-4 pb-6 sm:pb-10">
        <div
          className={`relative w-full overflow-hidden rounded-[20px] sm:rounded-[32px] shadow-2xl transition-all ${
            isDiwaliMode
              ? "bg-white border-2 border-[#ED7E23]/40 shadow-[0_20px_50px_-20px_rgba(31,39,47,0.25)]"
              : "bg-[#1a0c02]"
          }`}
        >
          {/* Exact aspect ratio container (1352x486) ensures zero cutout */}
          <div className="relative w-full aspect-[1352/486]">
            <Image
              src="/diwali-banner.webp"
              alt="Diwali International Courier Campaign"
              fill
              sizes="(max-width: 1352px) 100vw, 1352px"
              className="object-cover object-center"
              priority
            />

            {/* Soft, natural left vignette for crystal-clear readability without obscuring the golden sunset sky */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 via-35% to-transparent pointer-events-none" />

            {/* High-Contrast Top Right Festive Badge */}
            <div
              className={`absolute top-4 right-4 hidden md:flex items-center gap-2 ${
                isDiwaliMode
                  ? "bg-white/95 backdrop-blur-md border border-[#ED7E23]/60 px-4 py-1.5 rounded-full shadow-md z-20 text-[#1F272F]"
                  : "bg-[#1E1109]/92 backdrop-blur-md border border-amber-400/70 px-4 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.65)] z-20 text-white"
              }`}
            >
              <DiyaLamp size={17} glow={false} />
              <span
                className={`font-extrabold text-[11px] tracking-wider uppercase ${
                  isDiwaliMode ? "text-[#1F272F]" : "text-white"
                }`}
              >
                Diwali Edition{" "}
                <span
                  className={`${
                    isDiwaliMode ? "text-[#c4620c]" : "text-[#FFD666]"
                  } font-black`}
                >
                  · Guaranteed Delivery
                </span>
              </span>
            </div>

            {/* Desktop Hero Content Overlay */}
            <div className="hidden md:flex absolute inset-0 z-10 flex-col justify-center px-6 lg:px-12 py-4 max-w-xl lg:max-w-2xl">
              {/* Refined Festive Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-amber-500/10 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs font-black tracking-widest uppercase w-fit mb-2.5 shadow-md">
                {isDiwaliMode ? (
                  <DiyaLamp size={15} glow={false} />
                ) : (
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                )}
                <span>DIWALI WITH MANVI · FESTIVE AIR COURIER</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl lg:text-[34px] xl:text-[38px] font-black text-white leading-[1.14] tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Can&apos;t be there to hug them this Diwali? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0B3] via-[#FFD666] to-[#FFA940] drop-shadow-[0_2px_12px_rgba(255,170,0,0.35)]">
                  Send something that feels like one.
                </span>
              </h1>

              {/* Emotional Sub-tagline */}
              <p className="text-amber-100/95 text-xs lg:text-[13px] font-medium tracking-wide leading-relaxed mb-3.5 max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] flex items-center gap-2">
                <span className="text-amber-400 font-bold">✨</span>
                <span className="italic">Because miles don&apos;t matter at Manvi.</span>
              </p>

              {/* Sleek Floating Glass Rate Highlight Bar */}
              <div className="bg-black/55 backdrop-blur-md border border-amber-400/40 rounded-2xl p-2.5 sm:p-3 max-w-lg mb-3.5 shadow-lg">
                <div className="text-[10px] uppercase tracking-wider text-amber-300 font-extrabold mb-2 flex items-center justify-between px-1">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    Festive Sweets, Faral & Gift Rates
                  </span>
                  <span className="text-amber-200/70 text-[9px] font-medium">
                    Starting per kg
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { country: "UK", flag: "🇬🇧", price: "₹649" },
                    { country: "USA", flag: "🇺🇸", price: "₹679" },
                    { country: "Canada", flag: "🇨🇦", price: "₹749" },
                    { country: "Australia", flag: "🇦🇺", price: "₹789" },
                  ].map((c) => (
                    <div
                      key={c.country}
                      className="bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-400/50 rounded-xl py-1.5 px-1 transition-all"
                    >
                      <span className="text-white/90 block text-[11px] font-bold leading-tight">
                        {c.flag} {c.country}
                      </span>
                      <span className="text-[#FFD666] font-black text-xs sm:text-[13px] block mt-0.5">
                        {c.price}
                        <span className="text-[9px] font-normal text-amber-200/70">
                          /kg
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Styled Unified Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href="#diwali-calculator"
                  className={`font-extrabold text-xs lg:text-[13px] px-6 py-2.5 rounded-full transition-all flex items-center gap-1.5 hover:scale-[1.03] active:scale-95 text-center no-underline ${
                    isDiwaliMode
                      ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5]"
                      : "bg-[#f27a1a] hover:bg-orange-600 text-white shadow-md shadow-orange-500/25"
                  }`}
                >
                  {t.nav_quote || "Instant Rate Quote"}{" "}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://wa.me/917070506070?text=Hi%2C%20I%20want%20to%20send%20a%20Diwali%20gift%20parcel%20abroad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-[#052e16] font-extrabold text-xs lg:text-[13px] px-5 py-2.5 rounded-full transition-all shadow-[0_4px_16px_rgba(37,211,102,0.35)] flex items-center gap-2 hover:scale-[1.03] active:scale-95 text-center no-underline"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping shrink-0" />
                  {t.contact_whatsapp || "WhatsApp Us"}
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Content (Below banner on small screens so banner artwork is 100% visible with 0 cutout) */}
          <div
            className={`md:hidden px-4 py-5 flex flex-col gap-3 transition-colors ${
              isDiwaliMode
                ? "bg-gradient-to-b from-white/95 to-[#FCF6F0]/95 border-x border-b border-[#ED7E23]/30 text-[#1F272F]"
                : "bg-[#170a02] text-white"
            }`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-800 text-[11px] font-extrabold w-fit tracking-wide uppercase">
              <Flame className="w-3 h-3 text-amber-600 fill-amber-600" />
              DIWALI WITH MANVI
            </div>

            <h1
              className={`text-xl sm:text-2xl font-black leading-tight tracking-tight ${
                isDiwaliMode ? "text-[#1F272F]" : "text-white"
              }`}
            >
              Can&apos;t be there to hug them this Diwali? <br />
              <span
                className={
                  isDiwaliMode
                    ? "gold-text"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-200"
                }
              >
                Send something that feels like one.
              </span>
            </h1>

            <p
              className={`text-xs font-semibold italic flex items-center gap-1.5 ${
                isDiwaliMode ? "text-[#B4683F]" : "text-amber-200/90"
              }`}
            >
              <span className="w-4 h-0.5 bg-[#ED7E23] inline-block" />
              Because miles don&apos;t matter at Manvi.
            </p>

            {/* Rate Highlight Pill Mobile */}
            <div
              className={`rounded-2xl p-3 ${
                isDiwaliMode
                  ? "bg-white border border-[#ED7E23]/35 shadow-sm"
                  : "bg-white/5 border border-amber-500/30 shadow-md"
              }`}
            >
              <div
                className={`text-[11px] uppercase tracking-wider font-extrabold mb-2 flex items-center justify-between ${
                  isDiwaliMode ? "text-[#c4620c]" : "text-amber-300"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#ED7E23]" /> Festive Sweets & Gift Rates
                </span>
                <span
                  className={`text-[10px] font-normal ${
                    isDiwaliMode ? "text-[#58626c]" : "text-amber-200/60"
                  }`}
                >
                  Starting per kg
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                {[
                  { country: "UK", flag: "🇬🇧", price: "₹649" },
                  { country: "USA", flag: "🇺🇸", price: "₹679" },
                  { country: "Canada", flag: "🇨🇦", price: "₹749" },
                  { country: "Australia", flag: "🇦🇺", price: "₹789" },
                ].map((c) => (
                  <div
                    key={c.country}
                    className={`rounded-xl py-2 px-2 ${
                      isDiwaliMode
                        ? "bg-[#F0F3F3]/80 border border-[#ED7E23]/25"
                        : "bg-white/10 border border-white/15"
                    }`}
                  >
                    <span
                      className={`block text-[11px] font-bold ${
                        isDiwaliMode ? "text-[#1F272F]" : "text-white/90"
                      }`}
                    >
                      {c.flag} {c.country}
                    </span>
                    <span
                      className={`font-black text-sm block mt-0.5 ${
                        isDiwaliMode ? "text-[#c4620c]" : "text-[#FFD666]"
                      }`}
                    >
                      {c.price}
                      <span
                        className={`text-[10px] font-normal ${
                          isDiwaliMode ? "text-[#58626c]" : "text-amber-200/70"
                        }`}
                      >
                        /kg
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons Mobile */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <a
                href="#diwali-calculator"
                className={`font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center no-underline active:scale-95 ${
                  isDiwaliMode
                    ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5]"
                    : "bg-[#e77419] hover:bg-orange-600 text-white shadow-md"
                }`}
              >
                {t.nav_quote || "Instant Rate"}{" "}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/917070506070?text=Hi%2C%20I%20want%20to%20send%20a%20Diwali%20gift%20parcel%20abroad"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-[#052e16] font-extrabold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 text-center no-underline active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping shrink-0" />
                {t.contact_whatsapp || "WhatsApp"}
              </a>
            </div>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mt-4 sm:mt-8">
          {[
            { label: t.hero_serviceable_zipcodes, href: "/zipcode", icon: MapPin },
            { label: t.nav_track_shipment, href: "/track", icon: Receipt },
            { label: t.hero_our_services, href: "/services", icon: Gift },
            { label: t.hero_contact_us, href: "/contact", icon: Phone },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`group relative flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl md:rounded-2xl text-[12px] sm:text-[14px] font-bold py-3 sm:py-4 px-3 sm:px-4 transition-all duration-300 no-underline text-center overflow-hidden active:scale-95 min-h-[48px] sm:min-h-[56px] ${
                  isDiwaliMode
                    ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] border border-[#ED7E23]/40 shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5] hover:scale-[1.03]"
                    : "bg-[#e77419] text-white shadow-sm hover:scale-[1.02]"
                }`}
              >
                {/* Diwali Festive Micro-Accents */}
                {isDiwaliMode && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <span className="absolute top-1.5 right-2 text-[10px] text-[#1F272F]/50 group-hover:text-[#1F272F] transition-colors pointer-events-none">
                      ✨
                    </span>
                  </>
                )}

                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                    isDiwaliMode
                      ? "bg-white/30 backdrop-blur-sm border border-white/40 text-[#1F272F] shadow-sm"
                      : "text-white"
                  }`}
                >
                  <IconComponent
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    strokeWidth={2.5}
                  />
                </div>

                <span className="truncate sm:whitespace-normal font-extrabold tracking-wide">
                  {tab.label}
                </span>

                {isDiwaliMode && (
                  <span className="text-[#1F272F] group-hover:translate-x-0.5 transition-transform text-xs font-black hidden sm:inline-block">
                    →
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 2. INSTANT RATE CALCULATOR (Signature Orange Card) ── */}
      <section
        id="diwali-calculator"
        className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-5 sm:py-10"
      >
        <div
          className={`rounded-[20px] sm:rounded-[28px] p-4 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden transition-all ${
            isDiwaliMode
              ? "bg-gradient-to-br from-[#f79a45] via-[#ED7E23] to-[#c4620c] text-white shadow-[0_20px_50px_-20px_rgba(237,126,35,0.6)] border border-[#ffd9b5]/40"
              : "bg-[#f27a1a] text-white"
          }`}
        >
          {/* Subtle Royal Rangoli Watermarks */}
          {isDiwaliMode && (
            <>
              <div className="absolute -top-12 -right-12 pointer-events-none">
                <RangoliWatermark size={250} opacity={0.14} />
              </div>
              <div className="absolute -bottom-16 -left-16 pointer-events-none">
                <RangoliWatermark size={220} opacity={0.1} />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1.5 sm:gap-2 mb-5 sm:mb-6 text-center md:text-left relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              {isDiwaliMode && <DiyaLamp size={26} className="shrink-0" />}
              <h2 className="text-xl sm:text-[30px] md:text-[34px] font-extrabold text-white leading-tight tracking-tight">
                Calculate Instant Diwali Parcel Rates
              </h2>
              {isDiwaliMode && (
                <DiyaLamp size={26} className="shrink-0 hidden sm:inline-flex" />
              )}
            </div>
            <p className="text-white/80 text-xs sm:text-[14px] leading-relaxed max-w-2xl mx-auto md:mx-0">
              Calculate lowest courier rates for Diwali Sweets, Faral, Hampers &
              Clothes across global air carriers.
            </p>
          </div>

          <form
            onSubmit={handleQuoteSubmit}
            className="flex flex-col gap-3 sm:gap-4"
          >
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
                  <SearchableCountryDropdown
                    countries={subCountryOptions}
                    value={zoningCountry}
                    onChange={(val) => {
                      setZoningCountry(val);
                      setQuotes([]);
                    }}
                    placeholder={
                      destination === "EUROPE"
                        ? t.form_select_euro
                        : t.form_select_country
                    }
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
                className={`font-bold text-xs sm:text-[13px] py-3 sm:py-3.5 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-70 ${
                  isDiwaliMode
                    ? "bg-[#1F272F] hover:bg-black text-white shadow-lg shadow-black/30"
                    : "bg-[#0D1527] hover:bg-slate-800 text-white"
                } ${actualWt || volWt ? "sm:w-auto" : "w-full"}`}
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
            <div
              ref={quotesSectionRef}
              className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 animate-in fade-in duration-300"
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />{" "}
                Available Diwali Carrier Options for{" "}
                {destObj?.label || destination}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {quotes.map((q, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md text-[#1c1f2e]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-sm sm:text-base text-[#1c1f2e]">
                          {q.service}
                        </span>
                        <span className="text-[11px] sm:text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-amber-200">
                          {q.tat}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-500">
                        {q.rateType} · Priority Festive Air Dispatch
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] sm:text-xs text-gray-400 block font-medium">
                          Total Price
                        </span>
                        <p
                          className={`text-xl sm:text-2xl font-black ${
                            isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
                          }`}
                        >
                          ₹{Math.round(q.totalPrice).toLocaleString("en-IN")}
                        </p>
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

      {/* Rangoli Divider */}
      {isDiwaliMode && <RangoliDivider label="Festive Express Air Dispatch" />}

      {/* ── 3. SPECIAL DIWALI FESTIVE OFFER INFO BOX ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div
          className={`rounded-[20px] sm:rounded-[28px] p-4 sm:p-8 lg:p-12 shadow-sm relative overflow-hidden transition-colors ${
            isDiwaliMode
              ? "bg-gradient-to-b from-white/95 to-[#FCF6F0]/96 border border-[#ED7E23]/35 shadow-[0_14px_34px_-22px_rgba(31,39,47,0.28)] text-[#1F272F]"
              : "bg-gradient-to-br from-[#fff7ed] via-[#fffbf5] to-[#fff3e0] border-2 border-[#e77419]/30 text-[#0a111e]"
          }`}
        >
          {isDiwaliMode && (
            <div className="absolute -right-10 -bottom-10 pointer-events-none">
              <RangoliWatermark size={200} opacity={0.12} />
            </div>
          )}
          <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
            <div>
              <span
                className={`inline-flex items-center gap-2 border px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-black uppercase tracking-wide ${
                  isDiwaliMode
                    ? "border-[#ED7E23]/40 bg-[#ED7E23]/10 text-[#c4620c]"
                    : "border-[#e77419] bg-[#e77419]/10 text-[#e77419]"
                }`}
              >
                {isDiwaliMode ? <DiyaLamp size={18} glow={false} /> : "🪔"}
                Special Diwali Shipping Offer
              </span>
            </div>
            <p
              className={`text-sm sm:text-[17px] md:text-[18px] font-semibold leading-relaxed ${
                isDiwaliMode ? "text-[#1F272F]" : "text-[#0a111e]"
              }`}
            >
              Celebrate the festival of lights with your relatives overseas!
              Send homemade Diwali Faral, Kaju Katli, traditional Diyas, and
              gift hampers with guaranteed fast delivery.
            </p>
            <p
              className={`text-xs sm:text-[16px] leading-relaxed ${
                isDiwaliMode ? "text-[#58626c]" : "text-[#444]"
              }`}
            >
              <strong
                className={
                  isDiwaliMode
                    ? "text-[#c4620c] font-bold"
                    : "text-[#e77419] font-bold"
                }
              >
                Food-Grade Vacuum Sealing:
              </strong>{" "}
              We protect every batch of homemade snacks and sweets with airtight
              sealing and rigid packing so they arrive tasting just like home.
            </p>
          </div>
        </div>
      </section>

      {/* Rangoli Divider */}
      {isDiwaliMode && <RangoliDivider label="Homemade Faral & Traditional Gifts" />}

      {/* ── 4. WHAT YOU CAN SHIP FOR DIWALI ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-12">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div
            className={`inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-1 ${
              isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
            }`}
          >
            {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
            <span>Festive Packing Catalog</span>
            {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
          </div>
          <h2
            className={`text-2xl sm:text-4xl font-extrabold mt-1 ${
              isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
            }`}
          >
            What Can You Ship For Diwali?
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1.5 sm:mt-2 ${
              isDiwaliMode ? "text-[#58626c]" : "text-gray-600"
            }`}
          >
            Send authentic homemade delicacies, traditional gifts, and festive
            wear anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
          {DIWALI_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col gap-3 sm:gap-4 transition-all group shadow-sm relative overflow-hidden ${
                isDiwaliMode
                  ? "bg-gradient-to-b from-white/95 to-[#FCF6F0]/96 border border-[#ED7E23]/30 shadow-[0_10px_25px_-18px_rgba(31,39,47,0.2)] hover:border-[#ED7E23]/60 hover:shadow-[0_20px_45px_-20px_rgba(237,126,35,0.4)] text-[#1F272F]"
                  : "bg-white border border-gray-200/80 hover:border-orange-400 hover:shadow-md"
              }`}
            >
              {isDiwaliMode && (
                <span className="absolute top-3.5 right-3.5 text-[#ED7E23]/40 group-hover:text-[#ED7E23] transition-colors text-xs pointer-events-none">
                  ✨
                </span>
              )}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform ${
                  isDiwaliMode
                    ? "bg-white border border-[#ED7E23]/30 shadow-sm"
                    : "bg-orange-50 border border-orange-100"
                }`}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  className={`text-lg sm:text-xl font-bold transition-colors ${
                    isDiwaliMode
                      ? "text-[#c4620c] group-hover:text-[#B4683F]"
                      : "text-[#1c1f2e] group-hover:text-[#f27a1a]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed mt-1 sm:mt-1.5 ${
                    isDiwaliMode ? "text-[#58626c]" : "text-gray-600"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rangoli Divider */}
      {isDiwaliMode && <RangoliDivider label="Doorstep to Worldwide" />}

      {/* ── 5. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14">
        <div
          className={`rounded-[20px] sm:rounded-3xl p-5 sm:p-12 shadow-sm transition-colors relative overflow-hidden ${
            isDiwaliMode
              ? "bg-gradient-to-b from-white/92 to-[#FCF6F0]/95 border border-[#ED7E23]/30 shadow-[0_14px_34px_-22px_rgba(31,39,47,0.28)]"
              : "bg-[#eef0f5] border border-gray-200/60"
          }`}
        >
          {isDiwaliMode && (
            <>
              {/* Antique Gold Corner Flourishes */}
              <CornerFlourish position="top-left" size={32} className="top-2 left-2 opacity-40" />
              <CornerFlourish position="top-right" size={32} className="top-2 right-2 opacity-40" />
              <CornerFlourish position="bottom-left" size={32} className="bottom-2 left-2 opacity-40" />
              <CornerFlourish position="bottom-right" size={32} className="bottom-2 right-2 opacity-40" />
              {/* Subtle Central Floor Mandala Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <RangoliWatermark size={360} opacity={0.05} />
              </div>
            </>
          )}

          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-12 relative z-10">
            <div
              className={`inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-1 ${
                isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
              }`}
            >
              {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
              <span>Hassle-Free Logistics</span>
              {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-extrabold mt-1 ${
                isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
              }`}
            >
              How Diwali Delivery Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-sm transition-colors ${
                  isDiwaliMode
                    ? "bg-white border border-[#ED7E23]/25 shadow-sm text-[#1F272F]"
                    : "bg-white border border-gray-200/80"
                }`}
              >
                <div>
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl font-black text-sm sm:text-lg flex items-center justify-center mb-3 sm:mb-4 shadow-md ${
                      isDiwaliMode
                        ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-[0_8px_20px_-6px_rgba(237,126,35,0.55)]"
                        : "bg-[#f27a1a] text-white shadow-orange-500/20"
                    }`}
                  >
                    {step.num}
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-bold mb-1.5 sm:mb-2 leading-snug ${
                      isDiwaliMode ? "text-[#1F272F]" : "text-[#1c1f2e]"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isDiwaliMode ? "text-[#58626c]" : "text-gray-600"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rangoli Divider */}
      {isDiwaliMode && <RangoliDivider label="Book Your Shipment" />}

      {/* ── 6. QUICK INQUIRY & BOOKING FORM ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center rounded-[20px] sm:rounded-3xl p-4 sm:p-10 lg:p-12 shadow-sm transition-colors relative overflow-hidden ${
            isDiwaliMode
              ? "bg-gradient-to-b from-white/92 to-[#FCF6F0]/95 border border-[#ED7E23]/30 shadow-[0_14px_34px_-22px_rgba(31,39,47,0.28)] text-[#1F272F]"
              : "bg-[#eef0f5] border border-gray-200/70"
          }`}
        >
          {isDiwaliMode && (
            <>
              <CornerFlourish position="top-left" size={32} className="top-2 left-2 opacity-40" />
              <CornerFlourish position="top-right" size={32} className="top-2 right-2 opacity-40" />
              <CornerFlourish position="bottom-left" size={32} className="bottom-2 left-2 opacity-40" />
              <CornerFlourish position="bottom-right" size={32} className="bottom-2 right-2 opacity-40" />
            </>
          )}

          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4 relative z-10">
            <div
              className={`inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider ${
                isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
              }`}
            >
              {isDiwaliMode && <DiyaLamp size={16} glow={false} />}
              <span>Diwali Express Dispatch</span>
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-black leading-tight ${
                isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
              }`}
            >
              Book Your Diwali Parcel Today
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDiwaliMode ? "text-[#58626c]" : "text-gray-600"
              }`}
            >
              Ensure your family celebrates with homemade treats and gifts on
              time. Request our free doorstep pickup and custom packing service
              today.
            </p>

            <div className="flex flex-col gap-2.5 sm:gap-3 mt-1 sm:mt-2">
              <div
                className={`flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium ${
                  isDiwaliMode ? "text-[#1F272F]" : "text-gray-700"
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${
                    isDiwaliMode ? "text-[#ED7E23]" : "text-emerald-500"
                  }`}
                />
                <span>
                  Doorstep Pickup Across Delhi NCR, Punjab, Haryana & Gujarat
                </span>
              </div>
              <div
                className={`flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium ${
                  isDiwaliMode ? "text-[#1F272F]" : "text-gray-700"
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${
                    isDiwaliMode ? "text-[#ED7E23]" : "text-emerald-500"
                  }`}
                />
                <span>Free Vacuum Sealing & Food-Grade Packaging</span>
              </div>
              <div
                className={`flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium ${
                  isDiwaliMode ? "text-[#1F272F]" : "text-gray-700"
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${
                    isDiwaliMode ? "text-[#ED7E23]" : "text-emerald-500"
                  }`}
                />
                <span>Zero Customs Hassle with Complete Documentation</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2 sm:mt-4">
              <a
                href="tel:+917070506070"
                className={`w-full sm:w-auto justify-center font-extrabold text-xs sm:text-sm px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full transition-all flex items-center gap-2 text-center ${
                  isDiwaliMode
                    ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5] hover:scale-105"
                    : "bg-[#f27a1a] hover:bg-orange-600 text-white shadow-md shadow-orange-500/25"
                }`}
              >
                <Phone className="w-4 h-4" /> Call: +91 70 70 50 60 70
              </a>
            </div>
          </div>

          {/* Form */}
          <div
            className={`lg:col-span-6 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm transition-colors relative overflow-hidden ${
              isDiwaliMode
                ? "bg-white border border-[#ED7E23]/35 shadow-md text-[#1F272F]"
                : "bg-white border border-gray-200/80"
            }`}
          >
            {isDiwaliMode && (
              <div className="absolute -top-10 -right-10 pointer-events-none">
                <RangoliWatermark size={180} opacity={0.12} />
              </div>
            )}
            {inqSuccess ? (
              <div className="text-center py-6 sm:py-8">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 mx-auto mb-3" />
                <h3
                  className={`text-lg sm:text-xl font-bold mb-1 ${
                    isDiwaliMode ? "text-[#1F272F]" : "text-gray-900"
                  }`}
                >
                  Diwali Booking Received!
                </h3>
                <p
                  className={`text-xs sm:text-sm mb-4 ${
                    isDiwaliMode ? "text-[#58626c]" : "text-gray-500"
                  }`}
                >
                  Our logistics agent will contact you shortly to schedule
                  pickup.
                </p>
                <button
                  onClick={() => setInqSuccess(false)}
                  className={`text-xs font-bold underline ${
                    isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
                  }`}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleInquirySubmit}
                className="flex flex-col gap-3 sm:gap-4"
              >
                <h3
                  className={`text-base sm:text-lg font-bold mb-1 ${
                    isDiwaliMode ? "text-[#1F272F]" : "text-[#1c1f2e]"
                  }`}
                >
                  Request Diwali Pickup
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name*"
                    value={inqName}
                    onChange={(e) => setInqName(e.target.value)}
                    className={`rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none transition-colors ${
                      isDiwaliMode
                        ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] placeholder:text-[#909498] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                        : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
                    }`}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Contact Number*"
                    value={inqPhone}
                    onChange={(e) => setInqPhone(e.target.value)}
                    className={`rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none transition-colors ${
                      isDiwaliMode
                        ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] placeholder:text-[#909498] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                        : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Destination Country (e.g. USA)*"
                    value={inqDest}
                    onChange={(e) => setInqDest(e.target.value)}
                    className={`rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none transition-colors ${
                      isDiwaliMode
                        ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] placeholder:text-[#909498] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                        : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Approx Weight (kg)"
                    value={inqWeight}
                    onChange={(e) => setInqWeight(e.target.value)}
                    className={`rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none transition-colors ${
                      isDiwaliMode
                        ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] placeholder:text-[#909498] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                        : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
                    }`}
                  />
                </div>

                <textarea
                  rows={3}
                  placeholder="Items list (e.g., Kaju Katli, Faral, Diyas, Clothes)..."
                  value={inqItems}
                  onChange={(e) => setInqItems(e.target.value)}
                  className={`rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none resize-none transition-colors ${
                    isDiwaliMode
                      ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] placeholder:text-[#909498] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                      : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
                  }`}
                />

                <button
                  type="submit"
                  disabled={inqLoading}
                  className={`disabled:opacity-70 font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1 ${
                    isDiwaliMode
                      ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5] hover:scale-[1.01]"
                      : "bg-[#f27a1a] hover:bg-orange-600 text-white"
                  }`}
                >
                  {inqLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Submit Diwali Pickup Request"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Rangoli Divider */}
      {isDiwaliMode && <RangoliDivider label="Diwali Shipping Guidelines" />}

      {/* ── 7. DIWALI SHIPPING FAQS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14 relative overflow-hidden">
        {isDiwaliMode && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <RangoliWatermark size={460} opacity={0.04} />
          </div>
        )}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 relative z-10">
          <div
            className={`inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-1 ${
              isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
            }`}
          >
            {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
            <span>Help & Guidelines</span>
            {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
          </div>
          <h2
            className={`text-2xl sm:text-4xl font-extrabold mt-1 ${
              isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
            }`}
          >
            Diwali Shipping FAQs
          </h2>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-3 sm:gap-4">
          {DIWALI_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-1.5 sm:gap-2 shadow-sm transition-colors ${
                isDiwaliMode
                  ? "bg-white/90 border border-[#ED7E23]/28 shadow-sm text-[#1F272F]"
                  : "bg-white border border-gray-200 text-[#1c1f2e]"
              }`}
            >
              <h3
                className={`text-sm sm:text-base font-bold flex items-start gap-2 sm:gap-3 ${
                  isDiwaliMode ? "text-[#1F272F]" : "text-[#1c1f2e]"
                }`}
              >
                <span
                  className={
                    isDiwaliMode
                      ? "text-[#c4620c] font-extrabold"
                      : "text-[#f27a1a] font-extrabold"
                  }
                >
                  Q{idx + 1}.
                </span>{" "}
                {faq.q}
              </h3>
              <p
                className={`text-[11px] sm:text-sm leading-relaxed pl-5 sm:pl-7 ${
                  isDiwaliMode ? "text-[#58626c]" : "text-gray-600"
                }`}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOBILE STICKY QUICK ACTION BAR ── */}
      <div
        className={`sm:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md border-t px-3 py-2 flex items-center justify-between gap-2 shadow-2xl transition-colors ${
          isDiwaliMode
            ? "bg-white/95 border-[#ED7E23]/30 text-[#1F272F]"
            : "bg-[#1a0c02]/95 border-amber-500/20"
        }`}
      >
        <a
          href="#diwali-calculator"
          className={`flex-1 font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all text-center no-underline ${
            isDiwaliMode
              ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-sm"
              : "bg-[#e77419] hover:bg-orange-600 text-white"
          }`}
        >
          {t.nav_quote || "Instant Rate"}{" "}
          <ArrowUpRight className="w-3.5 h-3.5" />
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
          className={`font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-all no-underline ${
            isDiwaliMode
              ? "bg-[#F0F3F3] border border-[#ED7E23]/35 text-[#c4620c]"
              : "bg-white/15 hover:bg-white/25 text-white"
          }`}
          aria-label="Call Support"
        >
          <Phone
            className={`w-3.5 h-3.5 ${
              isDiwaliMode ? "text-[#c4620c]" : "text-amber-300"
            }`}
          />
        </a>
      </div>

      {/* Diwali Mode Toggle */}
      <div
        className={`fixed bottom-6 left-6 z-[10000] flex items-center gap-3 p-3 rounded-full shadow-2xl backdrop-blur-md border ${
          isDiwaliMode
            ? "bg-white/90 border-[#ED7E23]/40 text-[#1F272F]"
            : "bg-black/40 border-white/10 text-white"
        }`}
      >
        <span
          className={`text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 ${
            isDiwaliMode ? "text-[#1F272F]" : "text-white"
          }`}
        >
          {isDiwaliMode ? (
            <DiyaLamp size={16} glow={false} />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          )}
          Diwali Mode
        </span>
        <button
          onClick={() => setIsDiwaliMode(!isDiwaliMode)}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${
            isDiwaliMode ? "bg-[#ED7E23]" : "bg-gray-500"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
              isDiwaliMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {isDiwaliMode && <DiwaliFireworks />}
    </main>
  );
}

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
  X,
  PackageCheck,
  Check,
  MessageCircle,
  Truck,
  Clock,
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
  const [showInqSuccessModal, setShowInqSuccessModal] = useState(false);
  const [successAnimationPhase, setSuccessAnimationPhase] = useState<
    "idle" | "celebrating" | "modal"
  >("idle");
  const [submittedInquiry, setSubmittedInquiry] = useState<{
    name: string;
    phone: string;
    email: string;
    destination: string;
    weight: string;
    items: string;
    submittedAt: string;
  } | null>(null);
  const [internalDiwaliMode, setInternalDiwaliMode] = useState(true);
  const isDiwaliMode =
    controlledDiwaliMode !== undefined
      ? controlledDiwaliMode
      : internalDiwaliMode;
  const setIsDiwaliMode = setControlledDiwaliMode || setInternalDiwaliMode;

  const [isIlluminating, setIsIlluminating] = useState(false);
  const [renderFireworks, setRenderFireworks] = useState(isDiwaliMode);

  useEffect(() => {
    if (isDiwaliMode) {
      setRenderFireworks(true);
    } else {
      const timer = setTimeout(() => setRenderFireworks(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isDiwaliMode]);

  const handleToggleDiwaliMode = () => {
    setIsIlluminating(true);
    setIsDiwaliMode(!isDiwaliMode);
    setTimeout(() => {
      setIsIlluminating(false);
    }, 650);
  };

  const closeModal = () => {
    setSuccessAnimationPhase("idle");
    setTimeout(() => {
      setShowInqSuccessModal(false);
    }, 350);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (showInqSuccessModal) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showInqSuccessModal]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showInqSuccessModal && successAnimationPhase === "celebrating") {
      timer = setTimeout(() => {
        setSuccessAnimationPhase("modal");
      }, 2300);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showInqSuccessModal, successAnimationPhase]);

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

    const inquiryDetails = {
      name: inqName.trim() || "Diwali Customer",
      phone: inqPhone.trim(),
      email: inqEmail.trim(),
      destination: inqDest.trim() || "International",
      weight: inqWeight.trim(),
      items: inqItems.trim(),
      submittedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

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

      setSubmittedInquiry(inquiryDetails);
      setInqSuccess(true);
      setShowInqSuccessModal(true);
      setSuccessAnimationPhase("celebrating");
    } catch (err) {
      console.error(err);
      setSubmittedInquiry(inquiryDetails);
      setInqSuccess(true);
      setShowInqSuccessModal(true);
      setSuccessAnimationPhase("celebrating");
    } finally {
      setInqLoading(false);
    }
  };

  return (
    <main
      className={`w-full font-sans flex flex-col antialiased pb-24 sm:pb-28 transition-colors duration-700 ease-in-out relative ${
        isDiwaliMode ? "text-[#1F272F]" : "bg-[#faf5ea] text-[#1c1f2e]"
      }`}
    >
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
        @keyframes diwaliShockwave {
          0% { transform: translate(-50%, -50%) scale(0.25); opacity: 0.95; }
          60% { opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
        }
        @keyframes diwaliCrackerSpark {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 0;
          }
          25% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(calc(var(--tx) * 0.45), calc(var(--ty) * 0.45)) scale(1.3);
          }
          70% {
            opacity: 0.95;
            transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1.1);
          }
          100% {
            transform: translate(-50%, -50%) translate(calc(var(--tx) * 1.08), calc(var(--ty) * 1.08)) scale(0.7);
            opacity: 0;
          }
        }
        @keyframes diwaliDiyaIgnite {
          0% {
            transform: scale(0.3) translateY(30px);
            opacity: 0;
          }
          45% {
            transform: scale(1.1) translateY(-8px);
            opacity: 1;
          }
          70% {
            transform: scale(0.98) translateY(2px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* ── Festive Top Props (Visible with silky smooth opacity transition) ── */}
      <div
        className={`pointer-events-none transition-opacity duration-700 ease-in-out ${
          isDiwaliMode ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!isDiwaliMode}
      >
        {/* Subtle Royal Indian Jali Lattice Texture across the background */}
        <FestiveJaliBackground isVisible={isDiwaliMode} />

        {/* Traditional Hanging Akash Kandils on Outer Margins (Desktop only to prevent clutter) */}
        <div
          className="hidden 2xl:block fixed top-24 left-3 z-30 pointer-events-none transition-all duration-700 ease-out"
          style={{
            transform: isDiwaliMode ? "translateY(0)" : "translateY(-20px)",
            opacity: isDiwaliMode ? 0.9 : 0,
          }}
        >
          <AkashKandil size={56} />
        </div>
        <div
          className="hidden 2xl:block fixed top-24 right-3 z-30 pointer-events-none transition-all duration-700 ease-out"
          style={{
            transform: isDiwaliMode ? "translateY(0)" : "translateY(-20px)",
            opacity: isDiwaliMode ? 0.9 : 0,
          }}
        >
          <AkashKandil size={56} />
        </div>

        {/* Gentle Ambient Embers Floating Upwards */}
        <DiwaliAmbientEmbers />
      </div>

      {/* ── 1. HERO BANNER ── */}
      <section className="w-full max-w-[1352px] mx-auto px-3 sm:px-6 pt-2 sm:pt-4 pb-6 sm:pb-10">
        <div
          className={`relative w-full overflow-hidden rounded-[20px] sm:rounded-[32px] shadow-2xl transition-all duration-700 ease-in-out ${
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
                <span className="italic">
                  Because miles don&apos;t matter at Manvi.
                </span>
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
                  <Gift className="w-3.5 h-3.5 text-[#ED7E23]" /> Festive Sweets
                  & Gift Rates
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
            {
              label: t.hero_serviceable_zipcodes,
              href: "/zipcode",
              icon: MapPin,
            },
            { label: t.nav_track_shipment, href: "/track", icon: Receipt },
            { label: t.hero_our_services, href: "/services", icon: Gift },
            { label: t.hero_contact_us, href: "/contact", icon: Phone },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`group relative flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl md:rounded-2xl text-[12px] sm:text-[14px] font-bold py-3 sm:py-4 px-3 sm:px-4 transition-all duration-500 ease-in-out no-underline text-center overflow-hidden active:scale-95 min-h-[48px] sm:min-h-[56px] ${
                  isDiwaliMode
                    ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] border border-[#ED7E23]/40 shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5] hover:scale-[1.03]"
                    : "bg-[#e77419] text-white shadow-sm hover:scale-[1.02]"
                }`}
              >
                {/* Diwali Festive Micro-Accents */}
                <div
                  className={`pointer-events-none transition-opacity duration-500 ${
                    isDiwaliMode ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={!isDiwaliMode}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <span className="absolute top-1.5 right-2 text-[10px] text-[#1F272F]/50 group-hover:text-[#1F272F] transition-colors pointer-events-none">
                    ✨
                  </span>
                </div>

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

                <span
                  className={`text-[#1F272F] group-hover:translate-x-0.5 transition-all duration-300 text-xs font-black hidden sm:inline-block ${
                    isDiwaliMode
                      ? "opacity-100 max-w-[20px]"
                      : "opacity-0 max-w-0 overflow-hidden"
                  }`}
                >
                  →
                </span>
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
          className={`rounded-[20px] sm:rounded-[28px] p-4 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden transition-all duration-700 ease-in-out ${
            isDiwaliMode
              ? "bg-gradient-to-br from-[#f79a45] via-[#ED7E23] to-[#c4620c] text-white shadow-[0_20px_50px_-20px_rgba(237,126,35,0.6)] border border-[#ffd9b5]/40"
              : "bg-[#f27a1a] text-white"
          }`}
        >
          {/* Subtle Royal Rangoli Watermarks & Ornate Corner Flourishes */}
          <div
            className={`pointer-events-none transition-opacity duration-700 ease-in-out ${
              isDiwaliMode ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!isDiwaliMode}
          >
            <CornerFlourish
              position="top-left"
              size={64}
              className="top-2 left-2 opacity-95"
            />
            <CornerFlourish
              position="top-right"
              size={64}
              className="top-2 right-2 opacity-95"
            />
            <CornerFlourish
              position="bottom-left"
              size={64}
              className="bottom-2 left-2 opacity-95"
            />
            <CornerFlourish
              position="bottom-right"
              size={64}
              className="bottom-2 right-2 opacity-95"
            />
            <div className="absolute -top-12 -right-12 pointer-events-none">
              <RangoliWatermark size={260} opacity={0.22} />
            </div>
            <div className="absolute -bottom-16 -left-16 pointer-events-none">
              <RangoliWatermark size={240} opacity={0.18} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2 mb-5 sm:mb-6 text-center md:text-left relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div
                className={`inline-flex items-center transition-all duration-500 overflow-hidden ${
                  isDiwaliMode
                    ? "opacity-100 max-w-[32px] scale-100"
                    : "opacity-0 max-w-0 scale-75"
                }`}
              >
                <DiyaLamp size={26} className="shrink-0" />
              </div>
              <h2 className="text-xl sm:text-[30px] md:text-[34px] font-extrabold text-white leading-tight tracking-tight">
                Calculate Instant Diwali Parcel Rates
              </h2>
              <div
                className={`hidden sm:inline-flex items-center transition-all duration-500 overflow-hidden ${
                  isDiwaliMode
                    ? "opacity-100 max-w-[32px] scale-100"
                    : "opacity-0 max-w-0 scale-75"
                }`}
              >
                <DiyaLamp size={26} className="shrink-0" />
              </div>
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
      <RangoliDivider label="Festive Express Air Dispatch" isVisible={isDiwaliMode} />

      {/* ── 3. SPECIAL DIWALI FESTIVE OFFER INFO BOX ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div
          className={`rounded-[20px] sm:rounded-[28px] p-4 sm:p-8 lg:p-12 shadow-sm relative overflow-hidden transition-all duration-700 ease-in-out ${
            isDiwaliMode
              ? "bg-gradient-to-b from-white/95 to-[#FCF6F0]/96 border border-[#ED7E23]/35 shadow-[0_14px_34px_-22px_rgba(31,39,47,0.28)] text-[#1F272F]"
              : "bg-gradient-to-br from-[#fff7ed] via-[#fffbf5] to-[#fff3e0] border-2 border-[#e77419]/30 text-[#0a111e]"
          }`}
        >
          <div
            className={`absolute -right-10 -bottom-10 pointer-events-none transition-opacity duration-700 ease-in-out ${
              isDiwaliMode ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!isDiwaliMode}
          >
            <RangoliWatermark size={200} opacity={0.14} />
          </div>
          <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
            <div>
              <span
                className={`inline-flex items-center gap-2 border px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-black uppercase tracking-wide transition-colors duration-500 ${
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
              className={`text-sm sm:text-[17px] md:text-[18px] font-semibold leading-relaxed transition-colors duration-500 ${
                isDiwaliMode ? "text-[#1F272F]" : "text-[#0a111e]"
              }`}
            >
              Celebrate the festival of lights with your relatives overseas!
              Send homemade Diwali Faral, Kaju Katli, traditional Diyas, and
              gift hampers with guaranteed fast delivery.
            </p>
            <p
              className={`text-xs sm:text-[16px] leading-relaxed transition-colors duration-500 ${
                isDiwaliMode ? "text-[#58626c]" : "text-[#444]"
              }`}
            >
              <strong
                className={`font-bold transition-colors duration-500 ${
                  isDiwaliMode ? "text-[#c4620c]" : "text-[#e77419]"
                }`}
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
      <RangoliDivider label="Homemade Faral & Traditional Gifts" isVisible={isDiwaliMode} />

      {/* ── 4. WHAT YOU CAN SHIP FOR DIWALI ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-12">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div
            className={`inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-1 transition-colors duration-500 ${
              isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
            }`}
          >
            {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
            <span>Festive Packing Catalog</span>
            {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
          </div>
          <h2
            className={`text-2xl sm:text-4xl font-extrabold mt-1 transition-colors duration-500 ${
              isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
            }`}
          >
            What Can You Ship For Diwali?
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1.5 sm:mt-2 transition-colors duration-500 ${
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
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col gap-3 sm:gap-4 transition-all duration-500 ease-in-out group shadow-sm relative overflow-hidden ${
                isDiwaliMode
                  ? "bg-gradient-to-b from-white/95 to-[#FCF6F0]/96 border border-[#ED7E23]/30 shadow-[0_10px_25px_-18px_rgba(31,39,47,0.2)] hover:border-[#ED7E23]/60 hover:shadow-[0_20px_45px_-20px_rgba(237,126,35,0.4)] text-[#1F272F]"
                  : "bg-white border border-gray-200/80 hover:border-orange-400 hover:shadow-md"
              }`}
            >
              <div
                className={`pointer-events-none transition-opacity duration-500 ease-in-out ${
                  isDiwaliMode ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={!isDiwaliMode}
              >
                <CornerFlourish
                  position="top-right"
                  size={34}
                  className="top-1 right-1 opacity-80"
                />
                <span className="absolute top-3.5 right-3.5 text-[#ED7E23]/40 group-hover:text-[#ED7E23] transition-colors text-xs pointer-events-none">
                  ✨
                </span>
              </div>
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
      <RangoliDivider label="Doorstep to Worldwide" isVisible={isDiwaliMode} />

      {/* ── 5. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14">
        <div
          className={`rounded-[20px] sm:rounded-3xl p-5 sm:p-12 shadow-sm transition-all duration-700 ease-in-out relative overflow-hidden ${
            isDiwaliMode
              ? "bg-gradient-to-b from-white/92 to-[#FCF6F0]/95 border border-[#ED7E23]/30 shadow-[0_14px_34px_-22px_rgba(31,39,47,0.28)]"
              : "bg-[#eef0f5] border border-gray-200/60"
          }`}
        >
          {/* Grand Central Floor Mandala Watermark */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-700 ease-in-out ${
              isDiwaliMode ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!isDiwaliMode}
          >
            <RangoliWatermark size={420} opacity={0.16} />
          </div>

          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-12 relative z-10">
            <div
              className={`inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-1 transition-colors duration-500 ${
                isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
              }`}
            >
              {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
              <span>Hassle-Free Logistics</span>
              {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-extrabold mt-1 transition-colors duration-500 ${
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
      <RangoliDivider label="Book Your Shipment" isVisible={isDiwaliMode} />

      {/* ── 6. QUICK INQUIRY & BOOKING FORM ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center rounded-[20px] sm:rounded-3xl p-4 sm:p-10 lg:p-12 shadow-sm transition-all duration-700 ease-in-out relative overflow-hidden ${
            isDiwaliMode
              ? "bg-gradient-to-b from-white/92 to-[#FCF6F0]/95 border border-[#ED7E23]/30 shadow-[0_14px_34px_-22px_rgba(31,39,47,0.28)] text-[#1F272F]"
              : "bg-[#eef0f5] border border-gray-200/70"
          }`}
        >
          <div
            className={`absolute -left-12 -bottom-12 pointer-events-none transition-opacity duration-700 ease-in-out ${
              isDiwaliMode ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!isDiwaliMode}
          >
            <RangoliWatermark size={240} opacity={0.14} />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4 relative z-10">
            <div
              className={`inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider transition-colors duration-500 ${
                isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
              }`}
            >
              {isDiwaliMode && <DiyaLamp size={16} glow={false} />}
              <span>Diwali Express Dispatch</span>
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-black leading-tight transition-colors duration-500 ${
                isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
              }`}
            >
              Book Your Diwali Parcel Today
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed transition-colors duration-500 ${
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
            className={`lg:col-span-6 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm transition-all duration-700 ease-in-out relative overflow-hidden ${
              isDiwaliMode
                ? "bg-white border border-[#ED7E23]/35 shadow-md text-[#1F272F]"
                : "bg-white border border-gray-200/80"
            }`}
          >
            <div
              className={`absolute -top-10 -right-10 pointer-events-none transition-opacity duration-700 ease-in-out ${
                isDiwaliMode ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!isDiwaliMode}
            >
              <RangoliWatermark size={180} opacity={0.12} />
            </div>
            {inqSuccess ? (
              <div className="text-center py-6 sm:py-8">
                <div className="relative inline-flex items-center justify-center mb-2">
                  <div className="absolute w-12 h-12 rounded-full bg-emerald-500/20 blur-md pointer-events-none" />
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 relative z-10" />
                </div>
                <h3
                  className={`text-lg sm:text-xl font-bold mb-1 ${
                    isDiwaliMode ? "text-[#1F272F]" : "text-gray-900"
                  }`}
                >
                  Diwali Booking Received!
                </h3>
                <p
                  className={`text-xs sm:text-sm mb-4 max-w-sm mx-auto ${
                    isDiwaliMode ? "text-[#58626c]" : "text-gray-500"
                  }`}
                >
                  Thank you
                  {submittedInquiry?.name ? `, ${submittedInquiry.name}` : ""}!
                  Our logistics coordinator will contact you shortly to schedule
                  doorstep pickup.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInqSuccessModal(true);
                      setSuccessAnimationPhase("celebrating");
                    }}
                    className="text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    View Confirmation 🪔
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInqSuccess(false);
                      setInqName("");
                      setInqPhone("");
                      setInqEmail("");
                      setInqDest("");
                      setInqWeight("");
                      setInqItems("");
                    }}
                    className={`text-xs font-bold underline cursor-pointer px-2 py-1 ${
                      isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
                    }`}
                  >
                    Send another inquiry
                  </button>
                </div>
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
      <RangoliDivider label="Diwali Shipping Guidelines" isVisible={isDiwaliMode} />

      {/* ── 7. DIWALI SHIPPING FAQS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-14 relative overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-700 ease-in-out ${
            isDiwaliMode ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!isDiwaliMode}
        >
          <RangoliWatermark size={500} opacity={0.2} />
        </div>
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 relative z-10">
          <div
            className={`inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-1 transition-colors duration-500 ${
              isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
            }`}
          >
            {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
            <span>Help & Guidelines</span>
            {isDiwaliMode && <DiyaLamp size={18} glow={false} />}
          </div>
          <h2
            className={`text-2xl sm:text-4xl font-extrabold mt-1 transition-colors duration-500 ${
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
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-1.5 sm:gap-2 shadow-sm transition-all duration-500 ease-in-out relative overflow-hidden ${
                isDiwaliMode
                  ? "bg-white/90 border border-[#ED7E23]/28 shadow-sm text-[#1F272F]"
                  : "bg-white border border-gray-200 text-[#1c1f2e]"
              }`}
            >
              <div
                className={`pointer-events-none transition-opacity duration-500 ease-in-out ${
                  isDiwaliMode ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={!isDiwaliMode}
              >
                <CornerFlourish
                  position="top-right"
                  size={30}
                  className="top-1 right-1 opacity-75"
                />
              </div>
              <h3
                className={`text-sm sm:text-base font-bold flex items-start gap-2 sm:gap-3 transition-colors duration-500 ${
                  isDiwaliMode ? "text-[#1F272F]" : "text-[#1c1f2e]"
                }`}
              >
                <span
                  className={`font-extrabold transition-colors duration-500 ${
                    isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
                  }`}
                >
                  Q{idx + 1}.
                </span>{" "}
                {faq.q}
              </h3>
              <p
                className={`text-[11px] sm:text-sm leading-relaxed pl-5 sm:pl-7 transition-colors duration-500 ${
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
        className={`sm:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md border-t px-3 py-2 flex items-center justify-between gap-2 shadow-2xl transition-all duration-700 ease-in-out ${
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
            className={`w-3.5 h-3.5 transition-colors duration-500 ${
              isDiwaliMode ? "text-[#c4620c]" : "text-amber-300"
            }`}
          />
        </a>
      </div>

      {/* ── Silky Smooth Ambient Illumination Wash (0% CPU, pure CSS transition) ── */}
      <div
        className={`pointer-events-none fixed inset-0 z-[9990] transition-opacity duration-700 ease-out ${
          isIlluminating ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: isDiwaliMode
            ? "radial-gradient(ellipse 90% 80% at 20% 90%, rgba(237, 126, 35, 0.18) 0%, rgba(251, 191, 36, 0.10) 45%, transparent 75%)"
            : "radial-gradient(ellipse 90% 80% at 20% 90%, rgba(251, 191, 36, 0.16) 0%, rgba(237, 126, 35, 0.08) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Diwali Mode Toggle */}
      <div
        className={`fixed bottom-6 left-6 z-[10000] flex items-center gap-3 p-3 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-500 ease-in-out ${
          isDiwaliMode
            ? "bg-white/95 border-[#ED7E23]/50 text-[#1F272F] shadow-[0_12px_36px_-6px_rgba(237,126,35,0.35)]"
            : "bg-[#1E1109]/90 border-white/15 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        }`}
      >
        <span
          className={`text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 transition-colors duration-500 ${
            isDiwaliMode ? "text-[#1F272F]" : "text-white"
          }`}
        >
          <span className="relative w-4 h-4 flex items-center justify-center">
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${
                isDiwaliMode
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 -rotate-45"
              }`}
            >
              <DiyaLamp size={16} glow={false} />
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${
                !isDiwaliMode
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 rotate-45"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </span>
          </span>
          <span>Diwali Mode</span>
        </span>
        <button
          onClick={handleToggleDiwaliMode}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-500 ease-in-out cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-[#ED7E23]/50 ${
            isDiwaliMode ? "bg-[#ED7E23]" : "bg-gray-600/80"
          }`}
          aria-label="Toggle Diwali Mode"
          role="switch"
          aria-checked={isDiwaliMode}
        >
          <div
            className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-500"
            style={{
              transform: isDiwaliMode ? "translateX(24px)" : "translateX(0px)",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        </button>
      </div>

      {renderFireworks && (
        <div
          className={`pointer-events-none transition-opacity duration-700 ease-in-out ${
            isDiwaliMode ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!isDiwaliMode}
        >
          <DiwaliFireworks />
        </div>
      )}

      {/* Diwali Themed Success Popup Modal (Premium Reference Design with Festive Intro Animation) */}
      {showInqSuccessModal && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-[10005] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs transition-opacity duration-300 ${
            successAnimationPhase !== "idle"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => {
            if (successAnimationPhase === "celebrating") {
              setSuccessAnimationPhase("modal");
            } else {
              closeModal();
            }
          }}
        >
          {/* ── Festive Diwali Celebration Stage (Pure Visual Animation - No Text) ── */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 select-none overflow-hidden transition-all duration-700 ease-in-out ${
              successAnimationPhase === "celebrating"
                ? "opacity-100 scale-100 blur-none"
                : "opacity-0 scale-110 blur-xs pointer-events-none"
            }`}
          >
            {/* Concentric Golden Mandala Shockwaves */}
            <div
              className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full border-2 border-amber-400/80 pointer-events-none"
              style={{ animation: "diwaliShockwave 2s ease-out infinite" }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full border border-orange-400/50 pointer-events-none"
              style={{ animation: "diwaliShockwave 2s ease-out 0.4s infinite" }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border border-amber-300/30 pointer-events-none"
              style={{ animation: "diwaliShockwave 2s ease-out 0.8s infinite" }}
            />

            {/* 16 Golden & Amber Fireworks Sparkler Bursts */}
            {[
              { angle: 0, dist: 150, color: "#FDE047", size: 18, delay: "0s" },
              {
                angle: 22,
                dist: 125,
                color: "#F97316",
                size: 14,
                delay: "0.08s",
              },
              {
                angle: 45,
                dist: 165,
                color: "#FEF08A",
                size: 20,
                delay: "0.15s",
              },
              {
                angle: 68,
                dist: 135,
                color: "#FBBF24",
                size: 15,
                delay: "0.12s",
              },
              {
                angle: 90,
                dist: 160,
                color: "#FDE047",
                size: 18,
                delay: "0.18s",
              },
              {
                angle: 112,
                dist: 130,
                color: "#EA580C",
                size: 14,
                delay: "0.06s",
              },
              {
                angle: 135,
                dist: 155,
                color: "#FEF08A",
                size: 20,
                delay: "0.14s",
              },
              {
                angle: 158,
                dist: 140,
                color: "#F59E0B",
                size: 16,
                delay: "0.22s",
              },
              {
                angle: 180,
                dist: 160,
                color: "#FDE047",
                size: 18,
                delay: "0.04s",
              },
              {
                angle: 202,
                dist: 125,
                color: "#F97316",
                size: 14,
                delay: "0.1s",
              },
              {
                angle: 225,
                dist: 165,
                color: "#FEF08A",
                size: 20,
                delay: "0.16s",
              },
              {
                angle: 248,
                dist: 135,
                color: "#FBBF24",
                size: 15,
                delay: "0.09s",
              },
              {
                angle: 270,
                dist: 155,
                color: "#FDE047",
                size: 18,
                delay: "0.2s",
              },
              {
                angle: 292,
                dist: 130,
                color: "#EA580C",
                size: 14,
                delay: "0.07s",
              },
              {
                angle: 315,
                dist: 160,
                color: "#FEF08A",
                size: 20,
                delay: "0.15s",
              },
              {
                angle: 338,
                dist: 140,
                color: "#F59E0B",
                size: 16,
                delay: "0.11s",
              },
            ].map((p, idx) => {
              const rad = (p.angle * Math.PI) / 180;
              const x = Math.round(Math.cos(rad) * p.dist);
              const y = Math.round(Math.sin(rad) * p.dist);
              return (
                <div
                  key={idx}
                  className="absolute top-1/2 left-1/2 select-none"
                  style={{
                    animation: `diwaliCrackerSpark 1.8s cubic-bezier(0.25, 1, 0.5, 1) ${p.delay} forwards`,
                    ["--tx" as any]: `${x}px`,
                    ["--ty" as any]: `${y}px`,
                  }}
                >
                  <span
                    style={{ color: p.color, fontSize: `${p.size}px` }}
                    className="drop-shadow-[0_0_10px_rgba(254,240,138,0.95)]"
                  >
                    ✦
                  </span>
                </div>
              );
            })}

            {/* Centered Glowing Diya & Radiant Checkmark Emblem (Clean visual, no text) */}
            <div
              className="relative z-10 flex flex-col items-center text-center px-4"
              style={{
                animation:
                  "diwaliDiyaIgnite 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards",
              }}
            >
              {/* Large Blooming Radiant Golden Glow */}
              <div className="absolute -top-8 w-48 h-48 rounded-full bg-amber-400/45 blur-2xl pointer-events-none" />

              {/* Golden Checkmark Emblem */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#EE7F26] to-[#FBBF24] text-white flex items-center justify-center mb-4 shadow-[0_0_35px_rgba(238,127,38,0.9)] border-2 border-amber-200">
                <Check className="w-9 h-9 stroke-[3.2]" />
              </div>

              {/* Luminous Vector Diya */}
              <svg
                viewBox="0 0 120 90"
                className="w-28 h-22 drop-shadow-[0_0_28px_rgba(245,158,11,0.95)] overflow-visible"
                fill="none"
              >
                <ellipse
                  cx="60"
                  cy="30"
                  rx="32"
                  ry="26"
                  fill="#FDE047"
                  opacity="0.4"
                  filter="blur(7px)"
                />
                <path
                  d="M 60 6 C 48 24, 43 34, 49 46 C 54 54, 66 54, 71 46 C 77 34, 72 24, 60 6 Z"
                  fill="url(#diyaFlameGrad)"
                  filter="drop-shadow(0 0 10px rgba(255, 213, 79, 0.95))"
                />
                <path
                  d="M 60 14 C 54 25, 51 32, 54 41 C 57 47, 63 47, 66 41 C 69 32, 66 25, 60 14 Z"
                  fill="#FFFFFF"
                  opacity="0.95"
                />
                <path d="M 50 78 L 70 78 L 74 84 L 46 84 Z" fill="#321008" />
                <path
                  d="M 22 52 C 28 80, 92 80, 98 52 C 84 60, 36 60, 22 52 Z"
                  fill="url(#diyaBowlGrad)"
                />
                <ellipse
                  cx="60"
                  cy="51.5"
                  rx="38"
                  ry="7.5"
                  fill="url(#diyaRimGrad)"
                />
                <ellipse cx="60" cy="51.5" rx="33" ry="5.2" fill="#2D0E07" />
                <circle cx="34" cy="62" r="2.5" fill="#FFD54F" />
                <circle cx="42" cy="67" r="2.7" fill="#FFD54F" />
                <circle cx="51" cy="70" r="2.9" fill="#FFD54F" />
                <circle cx="60" cy="71" r="3.0" fill="#FFD54F" />
                <circle cx="69" cy="70" r="2.9" fill="#FFD54F" />
                <circle cx="78" cy="67" r="2.7" fill="#FFD54F" />
                <circle cx="86" cy="62" r="2.5" fill="#FFD54F" />
              </svg>
            </div>
          </div>

          {/* ── The Modal Dialog (Enters with smooth ease-in-out transition) ── */}
          <div
            className={`relative w-full max-w-[580px] rounded-[28px] overflow-hidden bg-white shadow-2xl transition-all duration-700 ease-in-out transform ${
              successAnimationPhase === "modal"
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-90 translate-y-8 pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button (Discreet X) */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 text-white/95 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ── Orange Festive Header ── */}
            <div className="relative bg-[#EE7F26] px-6 sm:px-12 pt-9 pb-8 text-center select-none overflow-hidden">
              {/* Top Festive String Lights & Hanging Golden Bulbs */}
              <svg
                className="absolute top-0 left-0 w-full h-9 pointer-events-none opacity-60"
                viewBox="0 0 580 36"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M 0 6 Q 72 26 145 6 Q 217 26 290 6 Q 362 26 435 6 Q 507 26 580 6"
                  stroke="#FDE68A"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                />
                <circle
                  cx="72.5"
                  cy="21"
                  r="3.2"
                  fill="#FEF08A"
                  filter="drop-shadow(0 0 3px rgba(254, 240, 138, 0.9))"
                />
                <circle
                  cx="217.5"
                  cy="21"
                  r="3.2"
                  fill="#FEF08A"
                  filter="drop-shadow(0 0 3px rgba(254, 240, 138, 0.9))"
                />
                <circle
                  cx="362.5"
                  cy="21"
                  r="3.2"
                  fill="#FEF08A"
                  filter="drop-shadow(0 0 3px rgba(254, 240, 138, 0.9))"
                />
                <circle
                  cx="507.5"
                  cy="21"
                  r="3.2"
                  fill="#FEF08A"
                  filter="drop-shadow(0 0 3px rgba(254, 240, 138, 0.9))"
                />
                <circle cx="145" cy="6" r="2" fill="#FDE047" />
                <circle cx="290" cy="6" r="2" fill="#FDE047" />
                <circle cx="435" cy="6" r="2" fill="#FDE047" />
              </svg>

              {/* Four-point Sparkle Stars */}
              <div className="absolute top-8 left-9 text-[#FED7AA] opacity-90 select-none">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0 Z" />
                </svg>
              </div>
              <div className="absolute top-22 left-14 text-[#FEF08A] opacity-75 select-none">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0 Z" />
                </svg>
              </div>
              <div className="absolute top-8 right-9 text-[#FED7AA] opacity-90 select-none">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0 Z" />
                </svg>
              </div>
              <div className="absolute top-22 right-14 text-[#FEF08A] opacity-75 select-none">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0 Z" />
                </svg>
              </div>

              {/* Ambient light glow orbs */}
              <div className="absolute top-9 left-[22%] w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px]" />
              <div className="absolute top-14 right-[24%] w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px]" />

              {/* ── Central Illustrated Diwali Diya ── */}
              <div className="relative mx-auto mb-3 flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 120 90"
                  className="w-28 h-22 drop-shadow-[0_4px_14px_rgba(0,0,0,0.15)] overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="diyaFlameGrad"
                      x1="60"
                      y1="6"
                      x2="60"
                      y2="52"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="25%" stopColor="#FFF59D" />
                      <stop offset="65%" stopColor="#FFC107" />
                      <stop offset="100%" stopColor="#FF8F00" />
                    </linearGradient>

                    <linearGradient
                      id="diyaBowlGrad"
                      x1="60"
                      y1="52"
                      x2="60"
                      y2="82"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#5C2415" />
                      <stop offset="60%" stopColor="#45180C" />
                      <stop offset="100%" stopColor="#321008" />
                    </linearGradient>

                    <linearGradient
                      id="diyaRimGrad"
                      x1="20"
                      y1="50"
                      x2="100"
                      y2="50"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#7E311B" />
                      <stop offset="50%" stopColor="#A84427" />
                      <stop offset="100%" stopColor="#7E311B" />
                    </linearGradient>

                    <radialGradient
                      id="flameGlow"
                      cx="60"
                      cy="30"
                      r="30"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#FFE082" stopOpacity="0.8" />
                      <stop
                        offset="60%"
                        stopColor="#FFB300"
                        stopOpacity="0.3"
                      />
                      <stop offset="100%" stopColor="#FF8F00" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Ambient Glow Behind Flame */}
                  <circle
                    cx="60"
                    cy="32"
                    r="28"
                    fill="url(#flameGlow)"
                    filter="blur(4px)"
                  />

                  {/* Outer Flame Teardrop */}
                  <path
                    d="M 60 6 C 48 24, 43 34, 49 46 C 54 54, 66 54, 71 46 C 77 34, 72 24, 60 6 Z"
                    fill="url(#diyaFlameGrad)"
                    filter="drop-shadow(0 0 6px rgba(255, 213, 79, 0.9))"
                  />

                  {/* Bright Pure White Flame Core */}
                  <path
                    d="M 60 14 C 54 25, 51 32, 54 41 C 57 47, 63 47, 66 41 C 69 32, 66 25, 60 14 Z"
                    fill="#FFFFFF"
                    opacity="0.95"
                  />

                  {/* Diya Stand / Foot */}
                  <path d="M 50 78 L 70 78 L 74 84 L 46 84 Z" fill="#321008" />

                  {/* Diya Clay Bowl Body */}
                  <path
                    d="M 22 52 C 28 80, 92 80, 98 52 C 84 60, 36 60, 22 52 Z"
                    fill="url(#diyaBowlGrad)"
                  />

                  {/* Outer Rim Ellipse */}
                  <ellipse
                    cx="60"
                    cy="51.5"
                    rx="38"
                    ry="7.5"
                    fill="url(#diyaRimGrad)"
                  />

                  {/* Inner Rim Hollow Ellipse */}
                  <ellipse cx="60" cy="51.5" rx="33" ry="5.2" fill="#2D0E07" />

                  {/* Oil Reflection in Diya Bowl */}
                  <ellipse
                    cx="60"
                    cy="52"
                    rx="27"
                    ry="3.5"
                    fill="#5A1E0E"
                    opacity="0.8"
                  />

                  {/* Golden Pearl Beads Along the Belly of the Bowl */}
                  <circle
                    cx="34"
                    cy="62"
                    r="2.5"
                    fill="#FFD54F"
                    stroke="#B27400"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="42"
                    cy="67"
                    r="2.7"
                    fill="#FFD54F"
                    stroke="#B27400"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="51"
                    cy="70"
                    r="2.9"
                    fill="#FFD54F"
                    stroke="#B27400"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="60"
                    cy="71"
                    r="3.0"
                    fill="#FFD54F"
                    stroke="#B27400"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="69"
                    cy="70"
                    r="2.9"
                    fill="#FFD54F"
                    stroke="#B27400"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="78"
                    cy="67"
                    r="2.7"
                    fill="#FFD54F"
                    stroke="#B27400"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="86"
                    cy="62"
                    r="2.5"
                    fill="#FFD54F"
                    stroke="#B27400"
                    strokeWidth="0.5"
                  />

                  {/* Golden Dots Highlights */}
                  <circle cx="34" cy="61.3" r="0.8" fill="#FFFDE7" />
                  <circle cx="42" cy="66.3" r="0.9" fill="#FFFDE7" />
                  <circle cx="51" cy="69.3" r="1.0" fill="#FFFDE7" />
                  <circle cx="60" cy="70.3" r="1.0" fill="#FFFDE7" />
                  <circle cx="69" cy="69.3" r="1.0" fill="#FFFDE7" />
                  <circle cx="78" cy="66.3" r="0.9" fill="#FFFDE7" />
                  <circle cx="86" cy="61.3" r="0.8" fill="#FFFDE7" />

                  {/* Floating Sparkles around Diya */}
                  <circle
                    cx="44"
                    cy="20"
                    r="1.3"
                    fill="#FFF9C4"
                    opacity="0.85"
                  />
                  <circle
                    cx="76"
                    cy="17"
                    r="1.1"
                    fill="#FFF9C4"
                    opacity="0.85"
                  />
                  <circle
                    cx="28"
                    cy="45"
                    r="1.5"
                    fill="#FFE082"
                    opacity="0.9"
                  />
                  <circle
                    cx="92"
                    cy="45"
                    r="1.5"
                    fill="#FFE082"
                    opacity="0.9"
                  />
                </svg>
              </div>

              {/* Happy Diwali, {Name} */}
              <h2 className="text-2xl sm:text-[27px] font-bold text-[#1C1917] tracking-tight mt-1 leading-snug">
                Happy Diwali,{" "}
                {submittedInquiry?.name
                  ? submittedInquiry.name.trim().split(" ")[0]
                  : "Priya"}
              </h2>
            </div>

            {/* ── White Lower Body Section ── */}
            <div className="px-6 sm:px-12 pt-8 pb-7 text-center bg-white">
              {/* Title */}
              <h3 className="font-bold text-[#1F2937] text-lg sm:text-[20px] mb-8 tracking-tight">
                Your pickup request is in.
              </h3>

              {/* 3 Steps Progress Tracker */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center mb-8">
                {/* Step 1: Request sent (Solid Orange Circle with Checkmark) */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#EE7F26] text-white flex items-center justify-center mb-2.5 shadow-sm">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">
                    Request sent
                  </span>
                </div>

                {/* Step 2: We reply with quote (White Circle with Orange Border & Chat Bubble) */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-[#EE7F26] bg-white text-[#EE7F26] flex items-center justify-center mb-2.5 shadow-xs">
                    <MessageCircle className="w-5 h-5 stroke-[2.4]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">
                    We reply with quote
                  </span>
                </div>

                {/* Step 3: Pickup booked (Dashed Border Gray Circle with Truck) */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 bg-white text-gray-400 flex items-center justify-center mb-2.5">
                    <Truck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-400 leading-tight">
                    Pickup booked
                  </span>
                </div>
              </div>

              {/* Festive offer pill */}
              <div className="rounded-2xl bg-[#FCE4CC] py-3.5 px-5 flex items-center justify-center gap-2.5 mb-7 text-[#6F3E17]">
                <Clock className="w-4 h-4 text-[#6F3E17] stroke-[2.4] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight">
                  Festive offer ends 2 November
                </span>
              </div>

              {/* Continue on WhatsApp Button */}
              <a
                href={`https://wa.me/917070506070?text=${encodeURIComponent(
                  `Hi Manvi Express! 🪔 I just submitted a Diwali pickup request for ${
                    submittedInquiry?.name || ""
                  } to ${
                    submittedInquiry?.destination || ""
                  }. Please reply with my quote!`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-[#EE7F26] hover:bg-[#E07218] text-white font-bold text-base sm:text-[17px] flex items-center justify-center gap-3 shadow-md shadow-[#EE7F26]/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer mb-4"
              >
                <svg
                  className="w-5 h-5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.4-5.83 2.4-1.46 0-2.89-.39-4.14-1.12l-.3-.18-3.12.82.83-3.04-.2-.31a8.216 8.216 0 01-1.26-4.41c0-4.55 3.69-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.13-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45s-.56-1.35-.77-1.85c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                </svg>
                <span>Continue on WhatsApp</span>
              </a>

              {/* Back to page Link */}
              <button
                type="button"
                onClick={closeModal}
                className="w-full text-center text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 underline underline-offset-4 cursor-pointer py-1 transition-colors"
              >
                Back to page
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

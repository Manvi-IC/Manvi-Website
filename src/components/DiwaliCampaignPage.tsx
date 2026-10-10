"use client";
import dynamic from "next/dynamic";
import {
  DiyaLamp,
  AkashKandil,
  RangoliDivider,
  RangoliWatermark,
  FestiveJaliBackground,
  CornerFlourish,
} from "@/components/DiwaliDecorations";

const DiwaliFireworks = dynamic(() => import("@/components/DiwaliFireworks"), {
  ssr: false,
});
const DiwaliAmbientEmbers = dynamic(
  () =>
    import("@/components/DiwaliDecorations").then(
      (mod) => mod.DiwaliAmbientEmbers,
    ),
  { ssr: false },
);

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
import DiwaliBookingForm from "@/components/DiwaliBookingForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

const DIWALI_ITEMS = [
  {
    icon: "🥮",
    title: "Sweets, Puja/ Decoration Items",
    desc: "Kaju katli, laddoo, ghee, chakli, mathri etc, all securely packed for delivery. You can also send diyas, brass puja items, torans, rangoli and other festive decoration items",
    bgImage: "/Sweet, Puja.jpeg",
  },
  {
    icon: "🧣",
    title: "Blankets & Winter Wear",
    desc: "Send razais, blankets, shawls, sweaters, woollens, caps, mufflers and much more to your loved ones abroad. Keep them warm and cosy through the colder months!",
    bgImage: "/Blanket and winter wear.jpeg",
  },
  {
    icon: "👗",
    title: "Ethnic Wear & Clothes",
    desc: "Kurta-pajamas, sarees, lehengas, kids' ethnic wear, everyday clothes and traditional jewellery.",
    bgImage: "/ethnic wear & clothes.jpeg",
  },
  {
    icon: "🍼",
    title: "Wellness & New Baby Items",
    desc: "Baby clothes, swaddles, baby-care essentials and ayurvedic & herbal wellness products , for a new arrival or someone who needs a little care. Medicines need a quick check with us first.",
    bgImage: "/wellness & new baby items.jpeg",
  },
  {
    icon: "🥜",
    title: "Dry Fruits, Masalas & Pickles",
    desc: "Cashews, almonds, saffron, whole spices, homemade masalas, pickles and other Indian food essentials, carefully packed and delivered with care.",
    bgImage: "/Dry fruits. masalas & pickles.jpeg",
  },
  {
    icon: "💬",
    title: "Not on the list?",
    desc: "Gifts, books, home items or something else entirely , tell us what you want to send and we'll let you know if it can go.",
    link: "https://wa.me/917070506070?text=Hi%2C%20I%20want%20to%20send%20something%20abroad%20that%20is%20not%20on%20your%20list",
    linkText: "Contact us for more info →",
    bgImage: "/Not on the list.jpeg",
  },
];

const DIWALI_RATES = [
  {
    flag: "🇦🇺",
    country: "Australia",
    code: "AU",
    price: "₹333",
    per: "per kg · starting",
  },
  {
    flag: "🇨🇦",
    country: "Canada",
    code: "CA",
    price: "₹569",
    per: "per kg · starting",
  },
  {
    flag: "🇪🇺",
    country: "Europe",
    code: "EU",
    price: "₹481",
    per: "per kg · starting",
  },
  {
    flag: "🇦🇪",
    country: "UAE",
    code: "AE",
    price: "₹301",
    per: "per kg · starting",
  },
  {
    flag: "🇬🇧",
    country: "UK",
    code: "GB",
    price: "₹414",
    per: "per kg · starting",
  },
  {
    flag: "🇺🇸",
    country: "USA",
    code: "US",
    price: "₹697",
    per: "per kg · starting",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Book early for Diwali",
    desc: "Share your parcel details & address for a delivery before Diwali night.",
  },
  {
    num: "2",
    title: "Free doorstep pickup",
    desc: "We collect from your home across Dellhi NCR, Haryana plus pan India pickup on request",
  },
  {
    num: "3",
    title: "Secure packing",
    desc: "Your parcel is packed securely in sturdy boxes with protective cushioning, so everything arrives safe and intact.",
  },
  {
    num: "4",
    title: "Worldwide delivery",
    desc: "Delivery available to Australia, Canada, Europe, UAE, UK, USA & Worldwide 200+ countries",
  },
];

const DIWALI_FAQS = [
  {
    q: "Will my Diwali order reach before Diwali?",
    a: "Yes, if you book early! Place your order at least 7–8 days before Diwali to help ensure your parcel reaches your loved ones in time for the celebrations. Booking later? Message us on WhatsApp, and we’ll let you know what’s possible.",
  },
  {
    q: "Which cities do you pick up from?",
    a: "We offer free doorstep pickup across Delhi NCR, Haryana & Punjab. The rest of India is available on request.",
  },
  {
    q: "How much does shipping cost?",
    a: "Festive rates starts from ₹333/kg to Australia,₹481/kg to Europe,₹569/kg to Canada, ₹301/kg to UAE, ₹414/kg to the UK, and ₹697/kg to the USA + GST. The final price depends on actual or volumetric weight, destination and speed , share your details and we'll send an exact quote on WhatsApp.",
  },
  {
    q: "How do you make sure sweets & snacks don't break or spoil?",
    a: "Everything is packed securely in sturdy boxes with protective cushioning to prevent breakage.",
  },
  {
    q: "Are there any restrictions on sending sweets and food?",
    a: "Dry sweets, snacks and dry fruits are usually fine, but milk-based sweets, dairy, meat and fresh items can be restricted in some countries. Share your item list and destination and we'll confirm before pickup.",
  },
  {
    q: "Are brass puja items, diyas and torans allowed?",
    a: "Generally, yes! We ship brass puja items, clay diyas, torans and decorations, subject to destination-country regulations. WhatsApp us, and our team will guide you on shipping availability and the details for your destination. Fireworks, oil, ghee, camphor, lighters, matches, perfumes and other flammable items are not allowed.",
  },
  {
    q: "Can I send branded sweets and homemade snacks together?",
    a: "Yes. You can combine homemade snacks and branded packaged sweets in one box, subject to your destination's food rules. We provide an itemised packing invoice for smooth customs clearance.",
  },
  {
    q: "Can I track my parcel?",
    a: "Yes. Once your parcel is booked, you can follow it any time on the Track shipment page.",
    link: "/track",
    linkText: "Track shipment",
  },
];

interface DiwaliCampaignPageProps {
  isDiwaliMode?: boolean;
  setIsDiwaliMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DiwaliCampaignPage({
  isDiwaliMode: controlledDiwaliMode,
  setIsDiwaliMode: setControlledDiwaliMode,
}: DiwaliCampaignPageProps = {}) {
  const { t } = useLanguage();

  // Inquiry form states extracted to DiwaliBookingForm
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
        .eyebrow {
          font-family: var(--font-space-mono), "Space Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c4620c;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .eyebrow::before {
          content: "";
          width: 22px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c4620c);
          display: inline-block;
        }
        .eyebrow::after {
          content: "";
          width: 22px;
          height: 1px;
          background: linear-gradient(90deg, #c4620c, transparent);
          display: inline-block;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-weight: 700;
          font-size: 16px;
          padding: 15px 28px;
          border-radius: 999px;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: transform .15s, box-shadow .15s, background .15s;
          white-space: nowrap;
          text-decoration: none;
        }
        .btn:focus-visible {
          outline: 3px solid #c4620c;
          outline-offset: 3px;
        }
        .btn svg {
          width: 18px;
          height: 18px;
          flex: none;
        }
        .btn-primary {
          background: linear-gradient(180deg, #f79a45, #ED7E23);
          color: #1F272F;
          box-shadow: 0 10px 30px -8px rgba(237, 126, 35, 0.6), inset 0 1px 0 #ffd9b5;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
        }
        .btn-ghost {
          background: rgba(255, 255, 255, 0.75);
          color: #1F272F;
          border: 1.5px solid rgba(237, 126, 35, 0.5);
        }
        .btn-ghost:hover {
          border-color: #c4620c;
          transform: translateY(-2px);
          background: rgba(237, 126, 35, 0.12);
        }
        .offer-cta {
          animation: ctapulse 2s ease-in-out infinite;
        }
        @keyframes ctapulse {
          0%, 100% {
            box-shadow: 0 10px 30px -8px rgba(237, 126, 35, 0.6), inset 0 1px 0 #ffd9b5, 0 0 0 0 rgba(237, 126, 35, 0.5);
          }
          50% {
            box-shadow: 0 10px 30px -8px rgba(237, 126, 35, 0.6), inset 0 1px 0 #ffd9b5, 0 0 0 10px rgba(237, 126, 35, 0);
          }
        }
        .final {
          text-align: center;
          padding: 60px 0 44px;
        }
        .final h2 {
          font-family: var(--font-league-spartan), Georgia, serif;
          font-weight: 700;
          font-size: clamp(30px, 4.4vw, 52px);
          max-width: 18ch;
          margin: 0 auto;
          line-height: 1.15;
        }
        .final .hinglish {
          margin-top: 16px;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 20px;
          color: #c4620c;
        }
        .final .hero-cta {
          display: flex;
          gap: 13px;
          justify-content: center;
          margin-top: 26px;
          flex-wrap: wrap;
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
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-10">
        <div
          className={`relative w-full overflow-hidden rounded-[20px] sm:rounded-[32px] shadow-2xl transition-all duration-700 ease-in-out ${
            isDiwaliMode
              ? "bg-white border-2 border-[#ED7E23]/40 shadow-[0_20px_50px_-20px_rgba(31,39,47,0.25)]"
              : "bg-[#1a0c02]"
          }`}
        >
          {/* Banner Image Container */}
          <div className="relative w-full aspect-[1352/486] lg:aspect-[1352/520] xl:aspect-[1352/480]">
            <Image
              src="/diwali-banner.webp"
              alt="Diwali International Courier Campaign"
              fill
              sizes="(max-width: 1352px) 100vw, 1352px"
              className="object-cover object-center"
              priority
            />

            {/* Desktop soft left vignette */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 via-35% to-transparent pointer-events-none" />
            {/* Mobile dark vignette for text readability */}
            <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Mobile Overlay Text */}
            <div className="md:hidden absolute inset-0 z-10 flex flex-col justify-between px-3 py-2.5">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/30 border border-amber-400/40 text-amber-200 text-[9px] sm:text-[10px] font-black w-fit tracking-wider uppercase backdrop-blur-md shadow-md">
                <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                DIWALI WITH MANVI
              </div>

              <div className="flex flex-col gap-1 sm:gap-1.5">
                <h1 className="text-[15px] sm:text-lg font-black leading-tight text-white drop-shadow-md">
                  Share the sweets,
                  <br /> Share the glow,
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0B3] via-[#FFD666] to-[#FFA940]">
                    Send your love where you can&apos;t go
                    <br />
                  </span>
                </h1>

                <p className="text-amber-100/95 text-[10px] sm:text-[11px] font-semibold italic flex items-center gap-1 drop-shadow-md">
                  <span className="w-2.5 h-0.5 bg-[#ED7E23] inline-block" />
                  Because miles don&apos;t matter at Manvi.
                </p>
              </div>
            </div>

            {/* Desktop Hero Content Overlay */}
            <div className="hidden md:flex absolute inset-0 z-10 flex-row items-center justify-between px-6 lg:px-12 xl:px-16 py-4 gap-8">
              <div className="flex flex-col justify-center max-w-xl lg:max-w-2xl">
                {/* Refined Festive Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-amber-500/10 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs font-black tracking-widest uppercase w-fit mb-2.5 shadow-md">
                  {isDiwaliMode ? (
                    <DiyaLamp size={15} glow={false} />
                  ) : (
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  )}
                  <span>DIWALI WITH MANVI · FESTIVE AIR COURIER</span>
                </div>

                <h1 className="text-2xl lg:text-[34px] xl:text-[38px] font-black text-white leading-[1.14] tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Share the Sweets
                  <br /> Share the Glow <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0B3] via-[#FFD666] to-[#FFA940] drop-shadow-[0_2px_12px_rgba(255,170,0,0.35)]">
                    Send your Love where you can&apos;t go
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
                <div className="bg-black/55 backdrop-blur-md border border-amber-400/40 rounded-2xl p-2.5 sm:p-3 max-w-xl xl:max-w-2xl mb-3.5 shadow-lg">
                  <div className="text-[10px] uppercase tracking-wider text-amber-300 font-extrabold mb-2 flex items-center justify-between px-1">
                    <span className="flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-amber-400" />
                      Festive Sweets, Faral & Gift Rates
                    </span>
                    <span className="text-amber-200/70 text-[9px] font-medium">
                      Starting per kg
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2 text-center">
                    {[
                      { country: "Australia", flag: "🇦🇺", price: "₹333" },
                      { country: "Canada", flag: "🇨🇦", price: "₹569" },
                      { country: "Europe", flag: "🇪🇺", price: "₹481" },
                      { country: "UAE", flag: "🇦🇪", price: "₹301" },
                      { country: "UK", flag: "🇬🇧", price: "₹414" },
                      { country: "USA", flag: "🇺🇸", price: "₹697" },
                    ].map((c) => (
                      <div
                        key={c.country}
                        className="bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-400/50 rounded-lg sm:rounded-xl py-1.5 px-0.5 sm:px-1 transition-all flex flex-col items-center justify-center"
                      >
                        <span className="text-white/90 block text-[9px] sm:text-[10px] font-bold leading-tight uppercase">
                          {c.country}
                        </span>
                        <span className="text-[#FFD666] font-black text-[11px] sm:text-xs block mt-0.5 whitespace-nowrap">
                          {c.price}
                          <span className="text-[8px] font-normal text-amber-200/70">
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
                    href="#diwali-booking"
                    className={`font-extrabold text-xs lg:text-[13px] px-6 py-2.5 rounded-full transition-all flex items-center gap-1.5 hover:scale-[1.03] active:scale-95 text-center no-underline ${
                      isDiwaliMode
                        ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5]"
                        : "bg-[#f27a1a] hover:bg-orange-600 text-white shadow-md shadow-orange-500/25"
                    }`}
                  >
                    Book Diwali Parcel <ArrowUpRight className="w-3.5 h-3.5" />
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

              {/* Embedded Form on the Right Side */}
              <div
                className="hidden lg:flex flex-col w-[380px] xl:w-[420px] h-auto max-h-[92%] shrink-0 translate-x-2"
                id="diwali-booking"
              >
                <div className="w-full h-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-y-auto overflow-x-hidden p-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent">
                  <DiwaliBookingForm
                    isDiwaliMode={isDiwaliMode}
                    setShowInqSuccessModal={setShowInqSuccessModal}
                    setSuccessAnimationPhase={setSuccessAnimationPhase}
                    setSubmittedInquiry={setSubmittedInquiry}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Content (Below banner on small screens so banner artwork is 100% visible with 0 cutout) */}
          <div
            className={`md:hidden px-4 py-4 flex flex-col gap-3 transition-colors ${
              isDiwaliMode
                ? "bg-gradient-to-b from-white/95 to-[#FCF6F0]/95 border-x border-b border-[#ED7E23]/30 text-[#1F272F]"
                : "bg-[#170a02] text-white"
            }`}
          >
            {/* Mobile Booking Form embedded below text */}
            <div id="diwali-booking-mobile" className="w-full lg:hidden">
              <DiwaliBookingForm
                isDiwaliMode={isDiwaliMode}
                setShowInqSuccessModal={setShowInqSuccessModal}
                setSuccessAnimationPhase={setSuccessAnimationPhase}
                setSubmittedInquiry={setSubmittedInquiry}
              />
            </div>

            {/* Rate Highlight Pill Mobile */}
            <div
              className={`rounded-2xl p-3 mt-2 ${
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
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs font-bold">
                {[
                  { country: "Australia", flag: "🇦🇺", price: "₹333" },
                  { country: "Canada", flag: "🇨🇦", price: "₹569" },
                  { country: "Europe", flag: "🇪🇺", price: "₹481" },
                  { country: "UAE", flag: "🇦🇪", price: "₹301" },
                  { country: "UK", flag: "🇬🇧", price: "₹414" },
                  { country: "USA", flag: "🇺🇸", price: "₹697" },
                ].map((c) => (
                  <div
                    key={c.country}
                    className={`rounded-xl py-2 px-1 ${
                      isDiwaliMode
                        ? "bg-[#F0F3F3]/80 border border-[#ED7E23]/25"
                        : "bg-white/10 border border-white/15"
                    }`}
                  >
                    <span
                      className={`block text-[10px] sm:text-[11px] font-bold uppercase ${
                        isDiwaliMode ? "text-[#1F272F]" : "text-white/90"
                      }`}
                    >
                      {c.country}
                    </span>
                    <span
                      className={`font-black text-xs sm:text-sm block mt-0.5 whitespace-nowrap ${
                        isDiwaliMode ? "text-[#c4620c]" : "text-[#FFD666]"
                      }`}
                    >
                      {c.price}
                      <span
                        className={`text-[9px] sm:text-[10px] font-normal ${
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

            {/* CTA Buttons Mobile (WhatsApp only, since Form is right above) */}
            <div className="flex w-full mt-1">
              <a
                href="https://wa.me/917070506070?text=Hi%2C%20I%20want%20to%20send%20a%20Diwali%20gift%20parcel%20abroad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-[#052e16] font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 text-center no-underline active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping shrink-0" />
                {t.contact_whatsapp || "Chat on WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DIWALI BENEFITS ── */}
      <section
        id="diwali-benefits"
        className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-2 sm:py-4 mt-2 sm:mt-4"
      >
        <span id="diwali-calculator" className="sr-only" />
        <div
          className={`flex flex-col items-center justify-center rounded-[20px] sm:rounded-3xl px-4 sm:px-8 py-8 sm:py-10 shadow-sm transition-all duration-700 ease-in-out relative ${
            isDiwaliMode
              ? "bg-gradient-to-b from-white/92 to-[#FCF6F0]/95 border border-[#ED7E23]/30 shadow-[0_14px_34px_-22px_rgba(31,39,47,0.28)] text-[#1F272F]"
              : "bg-[#eef0f5] border border-gray-200/70 text-[#1c1f2e]"
          }`}
        >
          {/* Background Watermark container with hidden overflow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px] sm:rounded-3xl z-0">
            <div
              className={`absolute -left-12 -bottom-12 transition-opacity duration-700 ease-in-out ${
                isDiwaliMode ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!isDiwaliMode}
            >
              <RangoliWatermark size={240} opacity={0.14} />
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 relative z-10 items-center text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div
                className={`inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider transition-colors duration-500 ${
                  isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
                }`}
              >
                {isDiwaliMode && <DiyaLamp size={16} glow={false} />}
                <span>Diwali Express Dispatch</span>
              </div>
              <h2
                className={`text-2xl sm:text-4xl lg:text-5xl font-black leading-tight transition-colors duration-500 ${
                  isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
                }`}
              >
                Book Your Diwali Parcel Today
              </h2>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto transition-colors duration-500 ${
                isDiwaliMode ? "text-[#58626c]" : "text-gray-600"
              }`}
            >
              Make Diwali special for your loved ones abroad. Send sweets,
              gifts, clothes and festive essentials with reliable doorstep
              pickup and hassle-free international delivery.
            </p>

            <div className="flex flex-col gap-2 sm:gap-2 mt-2 sm:mt-0 w-full text-left max-w-2xl mx-auto">
              {[
                "Doorstep Pickup Across Delhi NCR, Haryana & Pan India",
                "Complete Customs Documentation for a Hassle-Free Shipment",
                "Free Pickup and Packaging",
                "Delivery available to Australia, Canada, Europe, UAE, UK, USA & Worldwide 200+ countries",
                "Safe & Reliable Door-to-Door International Delivery",
                "Easy Booking & Quick Assistance on WhatsApp",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 sm:gap-3.5 text-xs sm:text-sm font-semibold ${
                    isDiwaliMode ? "text-[#1F272F]" : "text-gray-700"
                  }`}
                >
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 mt-[1px] ${
                      isDiwaliMode ? "text-[#ED7E23]" : "text-emerald-500"
                    }`}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 mt-2 mb-10">
              <a
                href="tel:+917070506070"
                className={`w-full sm:w-auto justify-center font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full transition-all flex items-center gap-2 text-center ${
                  isDiwaliMode
                    ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5] hover:scale-105"
                    : "bg-[#f27a1a] hover:bg-orange-600 text-white shadow-md shadow-orange-500/25"
                }`}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Call: +91 70 70 50
                60 70
              </a>
              <p
                className={`text-xs sm:text-sm italic font-medium text-center transition-colors duration-500 mt-2 ${isDiwaliMode ? "text-[#B4683F]" : "text-orange-600"}`}
              >
                Send the warmth of home, wherever your loved ones are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2.5 QUICK ACTIONS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-2 sm:py-4 mb-4 sm:mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Serviceable zipcodes", icon: MapPin, href: "#" },
            { label: "Track shipment", icon: Receipt, href: "#" },
            { label: "Our services", icon: Gift, href: "#" },
            { label: "Contact us", icon: Phone, href: "#" },
          ].map((action, idx) => (
            <a
              key={idx}
              href={action.href}
              className={`group flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-[0_8px_20px_-6px_rgba(242,122,26,0.3)] active:scale-95 text-decoration-none ${
                isDiwaliMode
                  ? "bg-gradient-to-br from-[#faa860] to-[#f27a1a]"
                  : "bg-gradient-to-br from-[#faa860] to-[#f27a1a]"
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-[10px] sm:rounded-xl bg-white/25 shadow-sm transition-transform group-hover:scale-105 flex items-center justify-center">
                  <action.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#1a0f05] stroke-[2.5]" />
                </div>
                <span className="font-black text-[10px] sm:text-xs text-[#1a0f05] tracking-wide mt-[1px]">
                  {action.label}
                </span>
              </div>
              <span className="font-black text-[10px] sm:text-xs text-[#1a0f05] opacity-80 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Rangoli Divider */}
      <RangoliDivider
        label="What You Can Send This Diwali"
        isVisible={isDiwaliMode}
      />

      {/* ── 3. WHAT YOU CAN SEND THIS DIWALI ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-12">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <h2
            className={`text-2xl sm:text-4xl font-extrabold mt-1 transition-colors duration-500 ${
              isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
            }`}
          >
            A little box of home, delivered worldwide
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1.5 sm:mt-2 transition-colors duration-500 ${
              isDiwaliMode ? "text-[#58626c]" : "text-gray-600"
            }`}
          >
            From diyas, torani, mithai, blankets, home made food and more,
            whatever your family abroad is missing, we pick it up from your door
            and deliver it, packed with care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
          {DIWALI_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col justify-end gap-3 transition-all duration-500 ease-in-out group shadow-sm hover:shadow-xl relative overflow-hidden min-h-[300px] sm:min-h-[340px] border ${
                isDiwaliMode
                  ? "border-[#ED7E23]/30 hover:border-[#ED7E23]/70 shadow-[0_10px_25px_-18px_rgba(31,39,47,0.2)] hover:shadow-[0_20px_45px_-20px_rgba(237,126,35,0.4)]"
                  : "border-gray-200/80 hover:border-orange-400"
              }`}
            >
              {/* Background Image */}
              {item.bgImage && (
                <div
                  className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${encodeURI(item.bgImage)}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 z-0 transition-opacity duration-500 bg-gradient-to-t ${
                  isDiwaliMode
                    ? "from-[#1F272F] via-[#1F272F]/70 to-[#1F272F]/10 group-hover:from-[#1F272F]/90"
                    : "from-black/90 via-black/50 to-black/10 group-hover:from-black/95"
                }`}
              />

              {/* Corner Flourish for Diwali Mode */}
              <div
                className={`pointer-events-none transition-opacity duration-500 ease-in-out z-10 ${
                  isDiwaliMode ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={!isDiwaliMode}
              >
                <CornerFlourish
                  position="top-right"
                  size={34}
                  className="top-1 right-1 opacity-60 text-white/40"
                />
                <span className="absolute top-3.5 right-3.5 text-white/50 group-hover:text-white transition-colors text-xs pointer-events-none">
                  ✨
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-start mt-auto">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform mb-3 sm:mb-4 shadow-md ${
                    isDiwaliMode
                      ? "bg-white/20 backdrop-blur-md border border-white/30 text-white"
                      : "bg-white/20 backdrop-blur-md border border-white/30 text-white"
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed mt-1.5 sm:mt-2 text-white/90">
                  {item.desc}
                </p>
              </div>

              {item.link && (
                <div className="pt-1 relative z-10">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-xs sm:text-sm hover:underline cursor-pointer text-orange-300"
                  >
                    {item.linkText || "Contact us for more info →"}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <p
          className={`text-xs sm:text-sm text-center mt-6 sm:mt-8 transition-colors duration-500 ${
            isDiwaliMode ? "text-[#58626c]" : "text-gray-500"
          }`}
        >
          Almost anything for family can go. Fireworks, flammables and a few
          restricted items can&apos;t be shipped , not sure about something?
          Just ask us on WhatsApp.
        </p>
      </section>

      {/* Rangoli Divider */}
      <RangoliDivider
        label="Festive Air Cargo Rates"
        isVisible={isDiwaliMode}
      />

      {/* ── 4. FESTIVE PER-KG RATES ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-12">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <h2
            className={`text-2xl sm:text-4xl font-extrabold mt-1 transition-colors duration-500 ${
              isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
            }`}
          >
            Diwali shipping, starting from
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1.5 sm:mt-2 transition-colors duration-500 ${
              isDiwaliMode ? "text-[#58626c]" : "text-gray-600"
            }`}
          >
            For homemade sweets, faral, hampers &amp; clothes , across global
            air carriers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {DIWALI_RATES.map((rate, idx) => (
            <div
              key={idx}
              className={`rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center shadow-sm transition-all duration-500 ease-in-out relative overflow-hidden group hover:scale-[1.02] ${
                isDiwaliMode
                  ? "bg-gradient-to-b from-white/95 to-[#FCF6F0]/96 border border-[#ED7E23]/30 shadow-[0_10px_25px_-18px_rgba(31,39,47,0.2)] text-[#1F272F]"
                  : "bg-white border border-gray-200/80 text-[#1c1f2e] hover:shadow-md hover:border-orange-300"
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
                  size={26}
                  className="top-1 right-1 opacity-70"
                />
              </div>
              <div className="flex flex-col items-center mt-2">
                <div className="font-light text-sm opacity-60 tracking-widest uppercase mb-0.5">
                  {rate.code}
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-tight ${
                    isDiwaliMode ? "text-[#1F272F]" : "text-[#1c1f2e]"
                  }`}
                >
                  {rate.country}
                </div>
              </div>
              <div
                className={`text-2xl sm:text-3xl font-extrabold my-1.5 transition-colors duration-500 ${
                  isDiwaliMode ? "gold-text" : "text-[#ED7E23]"
                }`}
              >
                {rate.price}
              </div>
              <div
                className={`text-xs ${
                  isDiwaliMode ? "text-[#58626c]" : "text-gray-500"
                }`}
              >
                {rate.per}
              </div>
            </div>
          ))}
        </div>

        <p
          className={`text-xs sm:text-sm text-center mt-6 sm:mt-8 transition-colors duration-500 ${
            isDiwaliMode ? "text-[#58626c]" : "text-gray-500"
          }`}
        >
          Starting rates. Final price depends on actual/volumetric weight,
          destination &amp; speed , get a quick quote on WhatsApp. *T&amp;C
          Applied
        </p>
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
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-12 relative z-10">
            <h2
              className={`text-2xl sm:text-4xl font-extrabold mt-1 transition-colors duration-500 ${
                isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
              }`}
            >
              How Diwali Delivery Works
            </h2>
            <p
              className={`text-xs sm:text-sm mt-1.5 sm:mt-2 transition-colors duration-500 ${
                isDiwaliMode ? "text-[#58626c]" : "text-gray-600"
              }`}
            >
              Doorstep pickup, secure packing, customs handled , you just share
              what to send.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 relative z-10">
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
      <RangoliDivider label="Help & Guidelines" isVisible={isDiwaliMode} />

      {/* ── 6. DIWALI SHIPPING FAQS ── */}
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
          <h2
            className={`text-2xl sm:text-4xl font-extrabold mt-1 transition-colors duration-500 ${
              isDiwaliMode ? "gold-text" : "text-[#1c1f2e]"
            }`}
          >
            Diwali Shipping FAQs
          </h2>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-3 sm:gap-4 relative z-10">
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
                {faq.a}{" "}
                {faq.link && (
                  <Link
                    href={faq.link}
                    className={`font-semibold underline underline-offset-2 ${
                      isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
                    }`}
                  >
                    {faq.linkText}
                  </Link>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA: SEND A LITTLE BIT OF HOME THIS DIWALI ── */}
      <section className="final">
        <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6">
          <span
            className="eyebrow"
            style={{ justifyContent: "center", display: "inline-flex" }}
          >
            This Diwali
          </span>
          <h2 className="gold-text" style={{ marginTop: "14px" }}>
            Send a little bit of home this Diwali.
          </h2>
          <p className="hinglish">
            Is Diwali, apno tak ghar ki mithaas pahunchaiye. 💖
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary offer-cta" href="#diwali-booking">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
              </svg>
              Book now &mdash; offer ends 2 Nov
            </a>
            <a className="btn btn-ghost" href="tel:+917070506070">
              Call +91 70 70 50 60 70
            </a>
          </div>
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
          href="#diwali-booking"
          className={`flex-1 font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all text-center no-underline ${
            isDiwaliMode
              ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-sm"
              : "bg-[#e77419] hover:bg-orange-600 text-white"
          }`}
        >
          Book Diwali Parcel <ArrowUpRight className="w-3.5 h-3.5" />
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
        className={`hidden sm:flex fixed bottom-6 left-6 z-[10000] items-center gap-3 p-3 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-500 ease-in-out ${
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

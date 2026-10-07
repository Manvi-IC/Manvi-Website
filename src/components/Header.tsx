"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Globe, Mail, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, Language } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/fpixel";

const LANGUAGES: {
  code: Language;
  label: string;
  native: string;
  flag: string;
}[] = [
  { code: "hi", label: "Hindi", native: "हिंदी", flag: "🇮🇳" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸" },
];

interface HeaderProps {
  isDiwaliMode?: boolean;
}

export default function Header({ isDiwaliMode = false }: HeaderProps = {}) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showMarquee, setShowMarquee] = useState(true);
  const [marqueeText, setMarqueeText] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isEnded: false,
  });

  useEffect(() => {
    const OFFER_END = new Date("2026-11-02T23:59:59+05:30");
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

    function calculateTime() {
      const diff = OFFER_END.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isEnded: true,
        });
        return;
      }
      const totalSec = Math.floor(diff / 1000);
      const d = Math.floor(totalSec / 86400);
      const h = Math.floor((totalSec % 86400) / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      setTimeLeft({
        days: pad(d),
        hours: pad(h),
        minutes: pad(m),
        seconds: pad(s),
        isEnded: false,
      });
    }

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Response is not JSON");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          if (data.data.marqueeText !== undefined) {
            setMarqueeText(data.data.marqueeText);
          }
          if (data.data.showMarquee !== undefined) {
            setShowMarquee(data.data.showMarquee);
          }
        }
      })
      .catch((err) =>
        console.warn("Failed to fetch site settings:", err.message),
      );
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language);

  const handleSelectLang = (code: Language) => {
    setLanguage(code);
    setIsLangOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes waterFluid1 {
          0% {
            transform: translate(-30%, -30%) rotate(0deg) scale(1.1);
          }
          50% {
            transform: translate(15%, 20%) rotate(180deg) scale(1.4);
          }
          100% {
            transform: translate(-30%, -30%) rotate(360deg) scale(1.1);
          }
        }
        @keyframes waterFluid2 {
          0% {
            transform: translate(25%, 20%) rotate(0deg) scale(1.3);
          }
          50% {
            transform: translate(-25%, -20%) rotate(-180deg) scale(1.1);
          }
          100% {
            transform: translate(25%, 20%) rotate(-360deg) scale(1.3);
          }
        }
        @keyframes waterShimmerFlow {
          0% {
            background-position: 0% 50%;
            opacity: 0.25;
          }
          50% {
            background-position: 100% 50%;
            opacity: 0.6;
          }
          100% {
            background-position: 0% 50%;
            opacity: 0.25;
          }
        }
        .diwali-water-flow-1 {
          background: radial-gradient(ellipse 65% 55% at 50% 50%, rgba(247, 154, 69, 0.22) 0%, rgba(237, 126, 35, 0.10) 50%, transparent 75%);
          animation: waterFluid1 36s ease-in-out infinite;
          filter: blur(22px);
        }
        .diwali-water-flow-2 {
          background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(237, 126, 35, 0.18) 0%, rgba(180, 104, 63, 0.08) 55%, transparent 80%);
          animation: waterFluid2 48s ease-in-out infinite;
          filter: blur(26px);
        }
        .diwali-water-shimmer-layer {
          background: linear-gradient(90deg, transparent 0%, rgba(237, 126, 35, 0.08) 30%, rgba(247, 154, 69, 0.16) 50%, rgba(237, 126, 35, 0.08) 70%, transparent 100%);
          background-size: 200% 100%;
          animation: waterShimmerFlow 24s ease-in-out infinite;
        }

        .announce {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px 20px;
          color: #ED7E23;
          font-weight: 700;
          font-size: 16px;
          white-space: nowrap;
        }
        .announce .an-txt {
          font-size: 16px;
          font-weight: 700;
          color: #ED7E23;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          letter-spacing: -0.01em;
        }
        .announce .an-cd {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: var(--font-space-mono), "Space Mono", monospace;
          color: #ED7E23;
        }
        .announce .an-u {
          font-size: 13.5px;
          font-weight: 500;
          color: #ED7E23;
          display: inline-flex;
          align-items: baseline;
        }
        .announce .an-u b {
          font-size: 19px;
          font-weight: 800;
          margin-right: 1.5px;
          color: #ED7E23;
        }
        .announce .an-link {
          background: linear-gradient(180deg, #f79a45, #ED7E23);
          color: #1F272F;
          padding: 3.5px 14px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 4px 12px -4px rgba(237, 126, 35, 0.45);
        }
        .announce .an-link:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .announce .offer-end {
          margin: 0;
          color: #ED7E23;
          font-weight: 700;
          font-size: 15px;
        }
        @media (max-width: 860px) {
          .announce {
            font-size: 14px;
            gap: 8px 12px;
          }
          .announce .an-txt {
            font-size: 14px;
          }
          .announce .an-u {
            font-size: 12px;
          }
          .announce .an-u b {
            font-size: 16px;
          }
          .announce .an-cd {
            gap: 7px;
          }
        }
        @media (max-width: 560px) {
          .announce {
            font-size: 13px;
            gap: 8px 10px;
          }
          .announce .an-link {
            display: none;
          }
          .announce .an-u b {
            font-size: 15px;
          }
          .announce .an-cd {
            gap: 6px;
          }
        }
        @media (max-width: 380px) {
          .announce .an-txt {
            display: none;
          }
        }
      `}</style>
      <div className="sticky top-0 z-50 w-full flex flex-col transition-colors duration-700 ease-in-out">
        <div
          data-header-bg
          className={`text-[12px] font-semibold py-3.5 px-4 sm:px-6 relative z-50 transition-colors duration-700 ease-in-out ${
            isDiwaliMode
              ? "bg-white/95 border-b border-[#ED7E23]/25 text-[#1F272F]"
              : "bg-[#0D1527] text-zinc-300 border-b border-white/5"
          }`}
        >
          <div className="max-w-425 mx-auto flex flex-col md:flex-row justify-between items-center gap-2.5 md:gap-0">
            <div className="flex items-center justify-between sm:justify-start gap-4 w-full md:w-auto shrink-0">
              {/* Phone: Meta "Contact" event + Google Ads conversion */}
              <a
                href="tel:+917070506070"
                onClick={() => {
                  trackEvent("Contact", {
                    method: "Phone",
                    location: "header",
                  });
                  if (
                    typeof window !== "undefined" &&
                    typeof (window as any).gtag === "function"
                  ) {
                    (window as any).gtag("event", "conversion", {
                      send_to: "AW-16880308122/aoaYCMbx5dccEJqflPE-",
                    });
                  }
                }}
                className={`flex items-center gap-1.5 sm:gap-2 transition-colors ${
                  isDiwaliMode
                    ? "text-[#1F272F] hover:text-[#c4620c]"
                    : "hover:text-white"
                }`}
              >
                <Phone
                  className={`h-3.5 w-3.5 shrink-0 ${isDiwaliMode ? "text-[#c4620c]" : "text-white"}`}
                />
                <span
                  className={`truncate ${isDiwaliMode ? "text-[#1F272F]" : "text-white/90"}`}
                >
                  +91 70 70 50 60 70
                </span>
              </a>

              {/* Email: Meta "Contact" event */}
              <a
                href="mailto:Info@manvicourier.com"
                onClick={() =>
                  trackEvent("Contact", { method: "Email", location: "header" })
                }
                className={`flex items-center gap-1.5 sm:gap-2 transition-colors ${
                  isDiwaliMode
                    ? "text-[#1F272F] hover:text-[#c4620c]"
                    : "hover:text-white"
                }`}
              >
                <Mail
                  className={`h-3.5 w-3.5 shrink-0 ${isDiwaliMode ? "text-[#c4620c]" : "text-white"}`}
                />
                <span
                  className={`truncate ${isDiwaliMode ? "text-[#1F272F]" : "text-white/90"}`}
                >
                  Info@manvicourier.com
                </span>
              </a>
            </div>

            {!timeLeft.isEnded ||
            isDiwaliMode ||
            pathname === "/diwali-campaign" ? (
              <div className="flex flex-1 items-center justify-center w-full mx-0 md:mx-4 overflow-visible relative py-0.5 md:py-0">
                <div className="announce" id="offer">
                  {!timeLeft.isEnded ? (
                    <>
                      <span className="an-txt">
                        &#128293; Festive offer ends 2 Nov
                      </span>
                      <div
                        className="an-cd"
                        id="cd"
                        role="timer"
                        aria-label="Time left to book"
                      >
                        <span className="an-u">
                          <b id="cd-d">{timeLeft.days}</b>d
                        </span>
                        <span className="an-u">
                          <b id="cd-h">{timeLeft.hours}</b>h
                        </span>
                        <span className="an-u">
                          <b id="cd-m">{timeLeft.minutes}</b>m
                        </span>
                        <span className="an-u">
                          <b id="cd-s">{timeLeft.seconds}</b>s
                        </span>
                      </div>
                      <Link href="/book-shipment" className="an-link">
                        Book now &rarr;
                      </Link>
                    </>
                  ) : (
                    <span className="offer-end" id="offerEnd">
                      This offer has ended &mdash; message us for current rates.
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-1 w-full mx-0 md:mx-6 overflow-hidden relative pt-1 md:pt-0">
                {showMarquee && marqueeText && (
                  <div
                    className="text-[12.5px] md:text-[14.5px] font-medium md:font-extrabold tracking-wide whitespace-pre overflow-hidden"
                    style={{ color: isDiwaliMode ? "#c4620c" : "#f27a1a" }}
                  >
                    {marqueeText}
                  </div>
                )}
              </div>
            )}

            <div className="hidden sm:flex items-center gap-6 overflow-visible shrink-0">
              <Link
                href="/zipcode"
                className={`transition-colors ${
                  isDiwaliMode
                    ? "text-[#1F272F] hover:text-[#c4620c]"
                    : "hover:text-white"
                }`}
              >
                {t.nav_zipcode}
              </Link>

              <div className="relative overflow-visible" ref={langRef}>
                <button
                  id="language-selector"
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none ${
                    isDiwaliMode
                      ? "text-[#1F272F] hover:text-[#c4620c]"
                      : "hover:text-white"
                  }`}
                  aria-expanded={isLangOpen}
                  aria-haspopup="listbox"
                  aria-controls="language-dropdown-list"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>
                    {currentLang
                      ? `${currentLang.flag} ${currentLang.native}`
                      : t.nav_language}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isLangOpen && (
                  <div
                    id="language-dropdown-list"
                    role="listbox"
                    aria-labelledby="language-selector"
                    className="absolute right-0 top-full mt-2 w-44 bg-[#0f1a2e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[200] animate-in fade-in duration-150"
                  >
                    <button
                      role="option"
                      aria-selected={language === "en"}
                      onClick={() => handleSelectLang("en")}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-semibold transition-colors ${
                        language === "en"
                          ? "bg-[#f27a1a] text-white"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="text-base">🌐</span>
                      <span className="flex flex-col items-start leading-none gap-0.5">
                        <span>English</span>
                        <span className="text-[10px] opacity-60">English</span>
                      </span>
                    </button>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        role="option"
                        aria-selected={language === lang.code}
                        onClick={() => handleSelectLang(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-semibold transition-colors ${
                          language === lang.code
                            ? "bg-[#f27a1a] text-white"
                            : "text-zinc-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="flex flex-col items-start leading-none gap-0.5">
                          <span>{lang.label}</span>
                          <span className="text-[10px] opacity-60">
                            {lang.native}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <header className="px-4 sm:px-6 py-4 relative z-40 transition-colors duration-700 ease-in-out">
          <div
            data-header-bg
            className={`max-w-425 mx-auto rounded-2xl px-6 sm:px-8 py-4 flex justify-between items-center transition-all duration-700 ease-in-out relative ${
              isDiwaliMode
                ? "bg-gradient-to-b from-white/95 to-[#F0F3F3]/90 backdrop-blur-md border border-[#ED7E23]/35 shadow-lg shadow-black/5"
                : "bg-[#0D1527] border border-white/5 shadow-md"
            }`}
          >
            {/* Glowing Water Background Animation for Diwali Mode */}
            <div
              className={`absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0 transition-opacity duration-700 ease-in-out ${
                isDiwaliMode ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!isDiwaliMode}
            >
              <div className="diwali-water-flow-1 absolute -inset-full opacity-70" />
              <div className="diwali-water-flow-2 absolute -inset-full opacity-60" />
              <div className="diwali-water-shimmer-layer absolute inset-0" />
            </div>

            <Link href="/" className="flex items-center gap-3 relative z-10">
              <img
                src="/logo.png"
                alt="Logo"
                style={{ width: "70.69px", height: "36px", opacity: 1 }}
                className="object-contain"
              />
              <div className="flex flex-col leading-none">
                <span
                  className={`font-bold text-[18px] font-league-spartan ${
                    isDiwaliMode ? "text-[#1F272F]" : "text-white"
                  }`}
                >
                  Manvi
                </span>
                <span
                  className={`font-bold text-[18px] font-league-spartan ${
                    isDiwaliMode ? "text-[#1F272F]" : "text-white"
                  }`}
                >
                  International Courier
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8 relative z-10">
              <nav
                className={`flex items-center gap-8 text-[13px] font-semibold ${
                  isDiwaliMode ? "text-[#1F272F]" : "text-white"
                }`}
              >
                <Link
                  href="/services"
                  className={`transition-colors ${
                    pathname?.startsWith("/services")
                      ? isDiwaliMode
                        ? "text-[#c4620c]"
                        : "text-[#f27a1a]"
                      : isDiwaliMode
                        ? "hover:text-[#c4620c]"
                        : "hover:text-[#f27a1a]"
                  }`}
                >
                  {t.nav_services}
                </Link>
                <Link
                  href="/quote"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      typeof (window as any).gtag === "function"
                    ) {
                      (window as any).gtag("event", "conversion", {
                        send_to: "AW-16880308122/iOWzCJbhrtccEJqflPE-",
                      });
                    }
                  }}
                  className={`transition-colors ${
                    pathname?.startsWith("/quote")
                      ? isDiwaliMode
                        ? "text-[#c4620c]"
                        : "text-[#f27a1a]"
                      : isDiwaliMode
                        ? "hover:text-[#c4620c]"
                        : "hover:text-[#f27a1a]"
                  }`}
                >
                  {t.nav_quote}
                </Link>

                <div className="relative group py-2">
                  <span
                    className={`cursor-pointer transition-colors flex items-center gap-1 ${
                      ["/about", "/contact", "/blog", "/career"].some((p) => pathname?.startsWith(p))
                        ? isDiwaliMode
                          ? "text-[#c4620c]"
                          : "text-[#f27a1a]"
                        : isDiwaliMode
                          ? "hover:text-[#c4620c]"
                          : "hover:text-[#f27a1a]"
                    }`}
                  >
                    Company <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </span>
                  
                  <div
                    className={`absolute left-0 top-full mt-0 w-40 rounded-xl shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden ${
                      isDiwaliMode
                        ? "bg-white border-[#ED7E23]/30"
                        : "bg-[#0D1527] border-white/10"
                    }`}
                  >
                    <Link
                      href="/about"
                      className={`px-4 py-3 transition-colors ${
                        pathname?.startsWith("/about")
                          ? isDiwaliMode ? "text-[#c4620c] bg-orange-50/50" : "text-[#f27a1a] bg-white/5"
                          : isDiwaliMode ? "hover:bg-orange-50/50 hover:text-[#c4620c]" : "hover:bg-white/5 hover:text-[#f27a1a]"
                      }`}
                    >
                      {t.nav_about}
                    </Link>
                    <Link
                      href="/contact"
                      className={`px-4 py-3 transition-colors ${
                        pathname?.startsWith("/contact")
                          ? isDiwaliMode ? "text-[#c4620c] bg-orange-50/50" : "text-[#f27a1a] bg-white/5"
                          : isDiwaliMode ? "hover:bg-orange-50/50 hover:text-[#c4620c]" : "hover:bg-white/5 hover:text-[#f27a1a]"
                      }`}
                    >
                      {t.nav_contact}
                    </Link>
                    <Link
                      href="/blog"
                      className={`px-4 py-3 transition-colors ${
                        pathname?.startsWith("/blog")
                          ? isDiwaliMode ? "text-[#c4620c] bg-orange-50/50" : "text-[#f27a1a] bg-white/5"
                          : isDiwaliMode ? "hover:bg-orange-50/50 hover:text-[#c4620c]" : "hover:bg-white/5 hover:text-[#f27a1a]"
                      }`}
                    >
                      {t.footer_blog}
                    </Link>
                    <Link
                      href="/career"
                      className={`px-4 py-3 transition-colors ${
                        pathname?.startsWith("/career")
                          ? isDiwaliMode ? "text-[#c4620c] bg-orange-50/50" : "text-[#f27a1a] bg-white/5"
                          : isDiwaliMode ? "hover:bg-orange-50/50 hover:text-[#c4620c]" : "hover:bg-white/5 hover:text-[#f27a1a]"
                      }`}
                    >
                      {t.footer_career}
                    </Link>
                  </div>
                </div>
                {/* Customer Login */}
                <a
                  href="https://portal.manvicourier.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors whitespace-nowrap ${
                    isDiwaliMode
                      ? "text-[#1F272F] hover:text-[#c4620c]"
                      : "text-white hover:text-[#f27a1a]"
                  }`}
                >
                  Customer Login
                </a>
              </nav>
              <div className="flex items-center gap-3">
                <Link
                  href="/book-shipment"
                  className={`px-5 py-1.5 rounded-full text-[13px] font-extrabold transition-all whitespace-nowrap ${
                    isDiwaliMode
                      ? "bg-white text-[#ED7E23] border border-[#ED7E23] hover:bg-[#ED7E23] hover:text-white"
                      : pathname?.startsWith("/book-shipment")
                        ? "bg-[#0D1527] text-white border border-white"
                        : "bg-[#0D1527] text-white hover:bg-gray-800 border-[2px] border-white/80"
                  }`}
                >
                  Book Now
                </Link>
                <Link
                  href="/track"
                  className={`px-5 py-2 rounded-full text-[13px] font-extrabold transition-all whitespace-nowrap ${
                    isDiwaliMode
                      ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5] hover:scale-105 active:scale-95"
                      : pathname?.startsWith("/track")
                        ? "bg-orange-600  text-white"
                        : "bg-[#f27a1a] text-white hover:bg-orange-600"
                  }`}
                >
                  {t.nav_track}
                </Link>
              </div>
            </div>

            <button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden w-10 h-10 bg-[#f27a1a] rounded-xl flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors focus:outline-none shadow-md shadow-orange-500/25 relative z-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="text-white h-5 w-5" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
                  <rect x="0" y="0" width="4" height="4" rx="1" />
                  <rect x="6" y="0" width="4" height="4" rx="1" />
                  <rect x="12" y="0" width="4" height="4" rx="1" />
                  <rect x="0" y="6" width="4" height="4" rx="1" />
                  <rect x="6" y="6" width="4" height="4" rx="1" />
                  <rect x="12" y="6" width="4" height="4" rx="1" />
                  <rect x="0" y="12" width="4" height="4" rx="1" />
                  <rect x="6" y="12" width="4" height="4" rx="1" />
                  <rect x="12" y="12" width="4" height="4" rx="1" />
                </svg>
              )}
            </button>
          </div>
        </header>
      </div>
        
      {/* Mobile Menu Backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-[280px] max-w-[85vw] z-[110] px-6 py-6 pb-20 shadow-2xl flex flex-col gap-6 font-sans overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        } ${
          isDiwaliMode
            ? "bg-white/98 backdrop-blur-xl text-[#1F272F] border-l border-[#ED7E23]/25"
            : "bg-white text-[#1c1f2e] border-l border-gray-100"
        }`}
      >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-50 ${
              isDiwaliMode ? "bg-[#fef4ea] text-[#ED7E23]" : "bg-gray-100 text-gray-500"
            }`}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
          
          <nav
            className={`flex flex-col gap-4 text-[16px] font-bold mt-8 ${
              isDiwaliMode ? "text-[#1F272F]" : "text-[#1c1f2e]"
            }`}
          >
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname === "/" ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_home}
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/about") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_about}
            </Link>

            <Link
              href="/quote"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (
                  typeof window !== "undefined" &&
                  typeof (window as any).gtag === "function"
                ) {
                  (window as any).gtag("event", "conversion", {
                    send_to: "AW-16880308122/iOWzCJbhrtccEJqflPE-",
                  });
                }
              }}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/quote") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_quote}
            </Link>
            <Link
              href="/zipcode"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/zipcode") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_zipcode}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/contact") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_contact}
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/blog") ? "text-[#f27a1a]" : ""}`}
            >
              {t.footer_blog}
            </Link>
            <Link
              href="/career"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/career") ? "text-[#f27a1a]" : ""}`}
            >
              {t.footer_career}
            </Link>
            <a
              href="https://portal.manvicourier.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="pb-2 hover:text-[#f27a1a] transition-colors"
            >
              Customer Login
            </a>
            
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/book-shipment"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full py-3 px-4 rounded-xl text-center text-white font-bold transition-all shadow-md active:scale-95 ${
                  isDiwaliMode ? "bg-[#ED7E23] hover:bg-[#c4620c]" : "bg-[#f27a1a] hover:bg-[#e06808]"
                }`}
              >
                Book Now
              </Link>
              <Link
                href="/track"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full py-3 px-4 rounded-xl text-center font-bold transition-all active:scale-95 ${
                  isDiwaliMode
                    ? "bg-[#fef4ea] text-[#ED7E23] border border-[#ED7E23]"
                    : "bg-[#fff1e6] text-[#f27a1a] border border-[#f27a1a]"
                }`}
              >
                {t.nav_track_shipment}
              </Link>
            </div>
          </nav>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              {t.nav_language}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  handleSelectLang("en");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold border transition-colors ${
                  language === "en"
                    ? "bg-[#f27a1a] text-white border-[#f27a1a]"
                    : "border-gray-200 text-gray-700 hover:border-[#f27a1a] hover:text-[#f27a1a]"
                }`}
              >
                <span>🌐</span> English
              </button>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleSelectLang(lang.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold border transition-colors ${
                    language === lang.code
                      ? "bg-[#f27a1a] text-white border-[#f27a1a]"
                      : "border-gray-200 text-gray-700 hover:border-[#f27a1a] hover:text-[#f27a1a]"
                  }`}
                >
                  <span>{lang.flag}</span> {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      {pathname &&
        pathname !== "/" &&
        pathname !== "/campaign" &&
        pathname !== "/diwali-campaign" &&
        pathname !== "/winter-campaign" &&
        pathname !== "/shopkeeper" &&
        pathname !== "/shopkeepers" &&
        pathname !== "/winter" &&
        !pathname.endsWith("-policy") &&
        pathname !== "/terms-and-conditions" && (
          <div className="py-3.5 px-4 sm:px-6 relative z-30">
            <div className="max-w-425 w-full mx-auto flex items-center gap-2 text-sm font-light text-gray-800">
              <Link href="/" className="hover:text-[#f27a1a] transition-colors">
                {t.nav_home}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-600 shrink-0" />
              <span className="text-gray-900 font-medium uppercase tracking-wide">
                {pathname === "/about" && t.bc_about}
                {pathname === "/track" && t.bc_track}
                {pathname === "/zipcode" && t.bc_zipcode}
                {pathname === "/contact" && t.bc_contact}
                {pathname === "/quote" && t.bc_quote}
                {pathname === "/faq" && t.bc_faq}
                {pathname === "/services" && t.bc_services}
                {pathname === "/business-campaign" && t.bc_business_campaign}
                {(pathname === "/shopkeeper" || pathname === "/shopkeepers") &&
                  "Shopkeeper's Page"}
                {pathname === "/blog" && "Blog"}
                {pathname === "/career" && "Careers"}
                {pathname === "/pickup-availability" && "Pickup Availability"}
                {pathname === "/book-shipment" && "Book Shipment"}
              </span>
            </div>
          </div>
        )}
    </>
  );
}

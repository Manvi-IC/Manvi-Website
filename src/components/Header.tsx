"use client";
import { useState, useRef, useEffect } from "react";
import { Phone, ChevronDown, ChevronRight, X, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, Language } from "@/context/LanguageContext";

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

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showMarquee, setShowMarquee] = useState(true);
  const [marqueeText, setMarqueeText] = useState("");
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
      .then(data => {
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
      <div className="sticky top-0 z-50 w-full flex flex-col">
        {/* Top utility bar */}
        <div className="bg-[#0D1527] text-zinc-300 text-[12px] font-semibold py-3.5 px-4 sm:px-6 border-b border-white/5 relative z-50">
          <div className="max-w-425 mx-auto flex flex-col md:flex-row justify-between items-center gap-2.5 md:gap-0">
            <div className="flex items-center justify-between sm:justify-start gap-4 w-full md:w-auto">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Phone className="h-3.5 w-3.5 text-white shrink-0" />
                <span className="text-white/90 truncate">
                  +91 70 70 50 60 70
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Mail className="h-3.5 w-3.5 text-white shrink-0" />
                <span className="text-white/90 truncate">
                  Info@manvicourier.com
                </span>
              </div>
            </div>

            {/* Marquee offer strip */}
            <div className="flex flex-1 w-full mx-0 md:mx-6 overflow-hidden relative pt-1 md:pt-0">
              {showMarquee && marqueeText && (() => {
                const Marquee = "marquee" as any;
                return (
                  <Marquee
                    behavior="scroll"
                    direction="left"
                    scrollamount="3"
                    className="text-[12.5px] md:text-[14.5px] font-medium md:font-extrabold tracking-wide whitespace-pre"
                    style={{ color: "#f27a1a" }}
                  >
                    {marqueeText}
                  </Marquee>
                ) as any;
              })()}
            </div>

            <div className="hidden sm:flex items-center gap-6 overflow-visible">
              <Link
                href="/zipcode"
                className="hover:text-white transition-colors"
              >
                {t.nav_zipcode}
              </Link>

              {/* Language Dropdown */}
              <div className="relative overflow-visible" ref={langRef}>
                <button
                  id="language-selector"
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer focus:outline-none"
                  aria-expanded={isLangOpen}
                  aria-haspopup="listbox"
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

                {/* Dropdown — positioned below the entire sticky bar */}
                {isLangOpen && (
                  <div
                    role="listbox"
                    className="absolute right-0 top-full mt-2 w-44 bg-[#0f1a2e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[200] animate-in fade-in duration-150"
                  >
                    <button
                      role="option"
                      aria-selected={language === "en"}
                      onClick={() => handleSelectLang("en")}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-semibold transition-colors ${language === "en"
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
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-semibold transition-colors ${language === lang.code
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

        {/* Main header */}
        <header className="px-4 sm:px-6 py-4 relative z-40">
          <div className="max-w-425 mx-auto bg-[#0D1527] rounded-2xl px-6 sm:px-8 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                style={{ width: "70.69px", height: "36px", opacity: 1 }}
                className="object-contain"
              />
              <div className="flex flex-col leading-none">
                <span
                  style={{
                    fontFamily: "var(--font-league-spartan), sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: "100%",
                    letterSpacing: 0,
                  }}
                  className="text-white"
                >
                  Manvi
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-league-spartan), sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: "100%",
                    letterSpacing: 0,
                  }}
                  className="text-white"
                >
                  International Courier
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-8 text-[13px] font-semibold text-white">
                <Link
                  href="/about"
                  className={`transition-colors ${pathname?.startsWith("/about") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.nav_about}
                </Link>
                <Link
                  href="/services"
                  className={`flex items-center gap-1 transition-colors ${pathname?.startsWith("/services") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.nav_services}
                </Link>
                <Link
                  href="/quote"
                  className={`transition-colors ${pathname?.startsWith("/quote") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.nav_quote}
                </Link>
                <Link
                  href="/contact"
                  className={`transition-colors ${pathname?.startsWith("/contact") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.nav_contact}
                </Link>
                {/* Customer Login */}
                <a
                  href="https://portal.manvicourier.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-[#f27a1a] whitespace-nowrap"
                >
                  Customer Login
                </a>
              </nav>



              {/* Track Now — orange pill pushed to far right */}
              <Link
                href="/track"
                className={`ml-2 px-5 py-2 rounded-full text-[13px] font-bold transition-colors whitespace-nowrap ${pathname?.startsWith("/track")
                  ? "bg-orange-600 text-white"
                  : "bg-[#f27a1a] text-white hover:bg-orange-600"
                  }`}
              >
                {t.nav_track}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div
              className="md:hidden w-10 h-10 bg-[#f27a1a] rounded-xl flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors"
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
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-33.75 z-40 bg-white px-6 py-6 shadow-xl border-t border-gray-100 flex flex-col gap-6 font-sans overflow-y-auto">
          <nav className="flex flex-col gap-4 text-[16px] font-bold text-[#1c1f2e]">
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
            <a
              href="https://portal.manvicourier.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="pb-2 border-b border-gray-100"
            >
              Customer Login
            </a>
            <Link
              href="/track"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/track") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_track_shipment}
            </Link>
            <Link
              href="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
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
          </nav>

          {/* Mobile Language Selector */}
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
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold border transition-colors ${language === "en" ? "bg-[#f27a1a] text-white border-[#f27a1a]" : "border-gray-200 text-gray-700 hover:border-[#f27a1a] hover:text-[#f27a1a]"}`}
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold border transition-colors ${language === lang.code ? "bg-[#f27a1a] text-white border-[#f27a1a]" : "border-gray-200 text-gray-700 hover:border-[#f27a1a] hover:text-[#f27a1a]"}`}
                >
                  <span>{lang.flag}</span> {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {pathname && pathname !== "/" && pathname !== "/campaign" && (
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
              {pathname === "/blog" && "Blog"}
              {pathname === "/career" && "Careers"}
              {pathname === "/pickup-availability" && "Pickup Availability"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

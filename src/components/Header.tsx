"use client";
import { useState } from "react";
import { Phone, ChevronDown, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-[#0b1220] text-zinc-400 text-[11px] font-medium py-2.5 px-4 sm:px-6 border-b border-white/5">
        <div className="max-w-425 mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3 text-white" />
            <span className="text-white/90">+91 7070-506070</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <Link
              href="/zipcode"
              className="hover:text-white transition-colors"
            >
              Servicable Zipcode
            </Link>
            <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              Language <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-4">
        <div className="max-w-425 mx-auto bg-[#0b1220] rounded-2xl px-6 sm:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: "70.69px",
                height: "36px",
                opacity: 1,
              }}
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
                className={`transition-colors ${
                  pathname?.startsWith("/about")
                    ? "text-[#f27a1a]"
                    : "hover:text-[#f27a1a]"
                }`}
              >
                About Us
              </Link>

              <div className="flex items-center gap-1 cursor-pointer hover:text-[#f27a1a] transition-colors">
                Services <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </div>

              <Link
                href="/track"
                className={`transition-colors ${
                  pathname?.startsWith("/track")
                    ? "text-[#f27a1a]"
                    : "hover:text-[#f27a1a]"
                }`}
              >
                Track Now
              </Link>

              <Link
                href="/contact"
                className={`transition-colors ${
                  pathname?.startsWith("/contact")
                    ? "text-[#f27a1a]"
                    : "hover:text-[#f27a1a]"
                }`}
              >
                Contact Us
              </Link>
            </nav>
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-33.75 z-40 bg-white px-6 py-6 shadow-xl border-t border-gray-100 flex flex-col gap-6 font-sans">
          <nav className="flex flex-col gap-4 text-[16px] font-bold text-[#1c1f2e]">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname === "/" ? "text-[#f27a1a]" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/about") ? "text-[#f27a1a]" : ""}`}
            >
              About Us
            </Link>
            <Link
              href="/track"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/track") ? "text-[#f27a1a]" : ""}`}
            >
              Track Shipment
            </Link>
            <Link
              href="/zipcode"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/zipcode") ? "text-[#f27a1a]" : ""}`}
            >
              Serviceable Zipcode
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/contact") ? "text-[#f27a1a]" : ""}`}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}

      {pathname && pathname !== "/" && (
        <div className="bg-white border-b border-gray-200/80 py-3.5 px-4 sm:px-6 shadow-sm relative z-30">
          <div className="max-w-425 w-full mx-auto flex items-center gap-2 text-xs font-bold text-gray-500">
            <Link href="/" className="hover:text-[#f27a1a] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-[#f27a1a] font-extrabold uppercase tracking-wide">
              {pathname === "/about" && "About Us"}
              {pathname === "/track" && "Track Shipment"}
              {pathname === "/zipcode" && "Serviceable Zipcode"}
              {pathname === "/contact" && "Contact Us"}
              {pathname === "/quote" && "Get a Quote"}
              {pathname === "/faq" && "FAQ"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

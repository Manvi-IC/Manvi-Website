"use client";
import { Phone, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-[#0b1220] text-zinc-400 text-[11px] font-medium py-2.5 px-6 border-b border-white/5">
        <div className="max-w-[1700px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3 text-white" />
            <span className="text-white/90">+91 7070-506070</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/zipcode" className="hover:text-white transition-colors">Servicable Zipcode</Link>
            <Link href="/track" className="hover:text-white transition-colors">Track Now</Link>
            <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              Language <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 px-6 py-4">
        <div className="max-w-[1700px] mx-auto bg-[#0b1220] rounded-2xl px-8 py-4 flex justify-between items-center">
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
              <span className="text-sm font-extrabold text-white tracking-tight">
                Manvi
              </span>
              <span className="text-[10px] text-white font-bold uppercase tracking-wider mt-0.5">
                International Courier
              </span>
            </div>
          </Link>

          {/* Nav */}
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

            {/* Grid menu icon */}
            <div className="w-10 h-10 bg-[#f27a1a] rounded-xl flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

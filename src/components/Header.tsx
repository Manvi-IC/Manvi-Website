"use client";
import { Phone, Mail } from "lucide-react";

export default function Header() {
  return (
    <>
      {/* Top utility bar */}
      <div className="bg-[#0b1220] text-zinc-400 text-[11px] font-medium py-2 px-6 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-5">
            <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-[#f27a1a]" />+91 99000 99000</span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-[#f27a1a]" />info@manvi-express.com</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Partner Signup</a>
            <span className="text-zinc-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Partner Login</a>
            <span className="text-zinc-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Tracking</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-[#0b1220] border-b border-white/[0.06] py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#f27a1a] flex items-center justify-center text-white font-extrabold text-lg italic shadow-lg shadow-[#f27a1a]/25">M</div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-extrabold text-white tracking-tight">Manvi</span>
              <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-wider mt-0.5">International Courier</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-white uppercase tracking-wider">
            <a href="#about" className="hover:text-[#f27a1a] transition-colors">About Us</a>
            <a href="#services" className="hover:text-[#f27a1a] transition-colors">Services</a>
            <a href="#contact" className="hover:text-[#f27a1a] transition-colors">Contact Us</a>
          </nav>
        </div>
      </header>
    </>
  );
}

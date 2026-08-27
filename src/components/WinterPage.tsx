"use client";

import React, { useEffect, useState } from "react";

export default function WinterPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    city: "",
    dest: "",
    goods: "",
    msg: "",
  });
  const [showOk, setShowOk] = useState(false);
  const [snowflakes, setSnowflakes] = useState<
    Array<{ id: number; left: string; duration: string; delay: string; size: string; opacity: number }>
  >([]);

  useEffect(() => {
    // Generate snowfall items client-side to prevent hydration mismatch
    const flakes = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(Math.random() * 100).toFixed(2)}%`,
      duration: `${(6 + Math.random() * 8).toFixed(1)}s`,
      delay: `${(-Math.random() * 10).toFixed(1)}s`,
      size: `${(2.5 + Math.random() * 3.5).toFixed(1)}px`,
      opacity: Number((0.25 + Math.random() * 0.5).toFixed(2)),
    }));
    setSnowflakes(flakes);
  }, []);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) return;

    const parts = [
      "New winter pickup request",
      "",
      `Name: ${formState.name.trim()}`,
      `WhatsApp: ${formState.phone.trim()}`,
    ];
    if (formState.city.trim()) parts.push(`Pickup city: ${formState.city.trim()}`);
    if (formState.dest) parts.push(`Send to: ${formState.dest}`);
    if (formState.goods.trim()) parts.push(`Sending: ${formState.goods.trim()}`);
    if (formState.msg.trim()) parts.push(`Notes: ${formState.msg.trim()}`);

    const text = encodeURIComponent(parts.join("\n"));
    setShowOk(true);
    window.open(`https://wa.me/917070506070?text=${text}`, "_blank");
  };

  return (
    <div className="w-full font-sans bg-[#f8f9fa] text-[#0f172a] antialiased overflow-x-hidden">
      {/* Styles & Keyframe animations */}
      <style>{`
        @keyframes winterFall {
          to {
            transform: translateY(720px);
            opacity: 0;
          }
        }
        @keyframes winterDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes winterPop {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes winterFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .winter-snow-flake {
          position: absolute;
          top: -12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.45);
          animation: winterFall linear infinite;
          pointer-events: none;
        }

        .thread-draw-line {
          stroke-dashoffset: 600;
          animation: winterDraw 2.6s ease forwards;
        }

        .pin-pop-anim {
          opacity: 0;
          animation: winterPop 0.5s ease forwards 1.9s;
        }

        .item-float-anim {
          animation: winterFloat 5.5s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>

      {/* ── 1. HERO CONTAINER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6 pb-2">
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-[#0f172a] text-white border border-white/10 shadow-2xl p-6 sm:p-10 lg:p-14">
          {/* Ambient background glow & Snowfall background layer */}
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#ff7a00]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#ff7a00]/15 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {snowflakes.map((f) => (
              <i
                key={f.id}
                className="winter-snow-flake"
                style={{
                  left: f.left,
                  animationDuration: f.duration,
                  animationDelay: f.delay,
                  width: f.size,
                  height: f.size,
                  opacity: f.opacity,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="flex flex-col">
              {/* Logo */}
              <div className="mb-4 overflow-hidden" style={{ height: "36px" }}>
                <img
                  src="/logo-png.png"
                  alt="Manvi International Courier"
                  style={{ height: "100px", marginTop: "-30px", width: "auto", display: "block" }}
                />
              </div>

              <h1 className="text-[32px] sm:text-[44px] lg:text-[54px] font-extrabold text-white leading-[1.12] tracking-tight">
                This winter, send them <span className="text-[#ff7a00]">a little piece of home.</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-slate-200 leading-relaxed max-w-xl font-medium">
                Warm sweaters, maa ke haath ki pinni, dry fruits, festive gifts — we pick them up from your doorstep in India
                and deliver to your family&apos;s door abroad, safe and in time for the season.
              </p>

              <div className="flex flex-wrap gap-3.5 sm:gap-4 mt-6 sm:mt-8">
                <a
                  href="#book"
                  className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all text-center"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                  </svg>
                  <span>Book a pickup</span>
                </a>
                <a
                  href="tel:+917070506070"
                  className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all text-center"
                >
                  Call +91 70 70 50 60 70
                </a>
              </div>

              {/* Trust block */}
              <div className="mt-7 sm:mt-8 pt-5 sm:pt-6 border-t border-white/15 text-[13px] sm:text-[14px] text-slate-300 leading-relaxed">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#ff7a00] block mb-1">
                  Pickup · India
                </span>
                <b className="text-white font-semibold">Standard doorstep pickup across Punjab, Delhi NCR, Haryana and Rajasthan</b>{" "}
                — Gujarat, Mumbai and pan-India on request.
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#ff7a00] block mt-3 mb-1">
                  Delivered · Worldwide
                </span>
                <b className="text-white font-semibold">USA · UK · Canada · Australia · Europe</b> — right to their door.
              </div>
            </div>

            {/* Right Signature Artwork: Winter Care Package SVG */}
            <div className="relative w-full max-w-[480px] lg:max-w-none mx-auto order-first lg:order-last">
              <svg
                viewBox="0 0 520 470"
                className="w-full h-auto drop-shadow-2xl"
                role="img"
                aria-label="A wrapped winter care package in India with a warmth route reaching a small home abroad"
              >
                <defs>
                  <radialGradient id="glowP" cx="46%" cy="52%" r="55%">
                    <stop offset="0%" stopColor="#ff7a00" stopOpacity="0.45" />
                    <stop offset="65%" stopColor="#ff7a00" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ff7a00" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="245" cy="300" rx="240" ry="200" fill="url(#glowP)" />

                {/* Warmth route to home abroad */}
                <path
                  className="thread-draw-line stroke-[#ff7a00] stroke-[2.5] fill-none [stroke-linecap:round] [stroke-dasharray:5_7]"
                  d="M372 300 C 428 250, 446 176, 452 126"
                />

                {/* Home abroad + heart pin */}
                <g className="pin-pop-anim" transform="translate(452,104)">
                  <circle r="30" fill="#ff7a00" opacity="0.2" />
                  <rect x="-17" y="-4" width="34" height="30" rx="3" fill="#1e293b" stroke="#ff7a00" strokeWidth="1.4" />
                  <path d="M-22 -4 L0 -24 L22 -4 Z" fill="#ff7a00" />
                  <path d="M0 16 C -8 6, -14 4, -14 -2 C -14 -8, -6 -8, 0 -2 C 6 -8, 14 -8, 14 -2 C 14 4, 8 6, 0 16 Z" fill="#ef4444" />
                </g>

                {/* Snowflake accents */}
                <g stroke="#ffffff" strokeWidth="1.4" opacity="0.6" strokeLinecap="round">
                  <g transform="translate(96,150)">
                    <line x1="-7" y1="0" x2="7" y2="0" />
                    <line x1="0" y1="-7" x2="0" y2="7" />
                    <line x1="-5" y1="-5" x2="5" y2="5" />
                    <line x1="-5" y1="5" x2="5" y2="-5" />
                  </g>
                  <g transform="translate(180,96)">
                    <line x1="-6" y1="0" x2="6" y2="0" />
                    <line x1="0" y1="-6" x2="0" y2="6" />
                    <line x1="-4" y1="-4" x2="4" y2="4" />
                    <line x1="-4" y1="4" x2="4" y2="-4" />
                  </g>
                  <g transform="translate(410,300)">
                    <line x1="-6" y1="0" x2="6" y2="0" />
                    <line x1="0" y1="-6" x2="0" y2="6" />
                    <line x1="-4" y1="-4" x2="4" y2="4" />
                    <line x1="-4" y1="4" x2="4" y2="-4" />
                  </g>
                </g>

                {/* Warm items behind box: Folded sweater */}
                <g className="item-float-anim" style={{ animationDelay: "0.4s" }}>
                  <g transform="translate(96,318) rotate(-7)">
                    <rect x="0" y="0" width="92" height="66" rx="12" fill="#0f766e" />
                    <path d="M30 0 L46 16 L62 0 Z" fill="#0d5f58" />
                    <rect x="0" y="46" width="92" height="8" fill="#0d5f58" />
                    <rect x="10" y="12" width="6" height="30" rx="3" fill="#ff7a00" opacity="0.9" />
                  </g>
                </g>

                {/* Dry fruit jar & Mithai box */}
                <g className="item-float-anim" style={{ animationDelay: "1.1s" }}>
                  {/* Dry-fruit jar */}
                  <g transform="translate(372,300)">
                    <rect x="0" y="6" width="46" height="66" rx="9" fill="#f1f5f9" opacity="0.95" />
                    <rect x="-3" y="-6" width="52" height="16" rx="4" fill="#ff7a00" />
                    <circle cx="12" cy="34" r="5" fill="#c2410c" />
                    <circle cx="28" cy="30" r="5" fill="#ea580c" />
                    <circle cx="20" cy="48" r="5" fill="#f97316" />
                    <circle cx="33" cy="48" r="4" fill="#c2410c" />
                    <circle cx="12" cy="56" r="4" fill="#ea580c" />
                  </g>
                  {/* Mithai box */}
                  <g transform="translate(410,342)">
                    <rect x="0" y="0" width="58" height="40" rx="5" fill="#fed7aa" />
                    <rect x="0" y="0" width="58" height="40" rx="5" fill="none" stroke="#ea580c" strokeWidth="1.4" />
                    <line x1="0" y1="20" x2="58" y2="20" stroke="#ea580c" strokeWidth="1.2" />
                    <line x1="29" y1="0" x2="29" y2="40" stroke="#ea580c" strokeWidth="1.2" />
                    <circle cx="15" cy="10" r="5" fill="#ea580c" />
                    <circle cx="44" cy="10" r="5" fill="#ea580c" />
                    <circle cx="15" cy="30" r="5" fill="#ea580c" />
                    <circle cx="44" cy="30" r="5" fill="#ea580c" />
                  </g>
                </g>

                {/* The Care Package */}
                <ellipse cx="262" cy="406" rx="140" ry="16" fill="#020617" opacity="0.5" />
                <g className="item-float-anim">
                  {/* Box body */}
                  <rect x="170" y="288" width="196" height="116" rx="9" fill="#fde68a" />
                  <rect x="338" y="288" width="28" height="116" rx="9" fill="#fcd34d" />
                  {/* Box lid */}
                  <rect x="158" y="262" width="220" height="32" rx="7" fill="#fef08a" />
                  <rect x="158" y="286" width="220" height="6" fill="#eab308" />
                  {/* Ribbons */}
                  <rect x="255" y="288" width="26" height="116" fill="#ff7a00" />
                  <rect x="158" y="268" width="220" height="16" fill="#ea580c" />
                  <rect x="255" y="262" width="26" height="32" fill="#ff7a00" />
                  {/* Bow */}
                  <g transform="translate(268,258)">
                    <ellipse cx="-16" cy="-2" rx="17" ry="12" transform="rotate(-24 -16 -2)" fill="#ff7a00" />
                    <ellipse cx="16" cy="-2" rx="17" ry="12" transform="rotate(24 16 -2)" fill="#ff7a00" />
                    <ellipse cx="-16" cy="-2" rx="8" ry="5" transform="rotate(-24 -16 -2)" fill="#ea580c" />
                    <ellipse cx="16" cy="-2" rx="8" ry="5" transform="rotate(24 16 -2)" fill="#ea580c" />
                    <rect x="-7" y="-9" width="14" height="18" rx="4" fill="#ea580c" />
                  </g>
                  {/* Shipping Tag */}
                  <line x1="281" y1="300" x2="312" y2="320" stroke="#ca8a04" strokeWidth="2" />
                  <g transform="translate(316,318) rotate(-8)">
                    <rect x="0" y="0" width="74" height="40" rx="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" />
                    <circle cx="11" cy="12" r="3.4" fill="none" stroke="#ca8a04" strokeWidth="1.4" />
                    <text x="22" y="16" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill="#0f172a" letterSpacing="0.5">
                      TO ♥
                    </text>
                    <text x="22" y="30" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill="#ff7a00" letterSpacing="0.5">
                      ABROAD
                    </text>
                  </g>
                </g>

                <text x="262" y="446" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="11" fill="#94a3b8" letterSpacing="1.4">
                  FROM YOUR DOORSTEP · INDIA
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PARTNERS STRIP ── */}
      <div className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-4 sm:py-5">
        <div className="rounded-[18px] sm:rounded-[22px] bg-[#0f172a] text-white px-5 sm:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 border border-white/10 shadow-sm">
          <span className="text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00]">
            Delivered by trusted carriers
          </span>
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center sm:justify-end gap-3.5 sm:gap-8 items-center font-extrabold text-[15px] sm:text-[18px] md:text-[20px] text-white/90">
            <span>DHL</span>
            <span>FedEx</span>
            <span>UPS</span>
            <span>Aramex</span>
            <span>DPD</span>
            <span>Courier&nbsp;Please</span>
          </div>
        </div>
      </div>

      {/* ── 3. BOOK A PICKUP / LEAD FORM CONTAINER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12" id="book">
        <div className="bg-white border border-slate-200 rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
                <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
                Book a pickup
              </div>
              <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] font-extrabold text-[#0f172a] leading-tight">
                Tell us what to send. <span className="text-[#ff7a00]">We&apos;ll bring winter to their door.</span>
              </h2>
              <p className="mt-3 text-[14.5px] sm:text-[16px] text-[#555555] leading-relaxed">
                Share a few details and we will reply on WhatsApp with a clear quote and pickup schedule — usually within a few
                hours. You don&apos;t step out in the cold; we come right to you.
              </p>

              <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5">
                <li className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#0f172a] font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a00]/15 text-[#ff7a00] flex items-center justify-center font-bold text-[12px] shrink-0">
                    ✓
                  </span>
                  Doorstep pickup from your home in India
                </li>
                <li className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#0f172a] font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a00]/15 text-[#ff7a00] flex items-center justify-center font-bold text-[12px] shrink-0">
                    ✓
                  </span>
                  Homemade food &amp; fragile gifts packed safely
                </li>
                <li className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#0f172a] font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a00]/15 text-[#ff7a00] flex items-center justify-center font-bold text-[12px] shrink-0">
                    ✓
                  </span>
                  Customs and paperwork handled for you
                </li>
                <li className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#0f172a] font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a00]/15 text-[#ff7a00] flex items-center justify-center font-bold text-[12px] shrink-0">
                    ✓
                  </span>
                  Live tracking, delivered in time for the season
                </li>
              </ul>
            </div>

            {/* Right Form Card */}
            <div className="bg-[#0f172a] text-white border border-white/10 rounded-[20px] sm:rounded-[28px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#ff7a00]/10 blur-3xl pointer-events-none" />

              <h3 className="text-[21px] sm:text-[25px] font-extrabold text-white">
                Send a winter parcel
              </h3>
              <p className="mt-1 text-[13px] sm:text-[13.5px] text-slate-300 mb-5">
                Takes under a minute. Fields marked with <span className="text-[#ff7a00] font-bold">*</span> are required.
              </p>

              <form onSubmit={handleLeadSubmit} className="space-y-3.5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-300 mb-1.5">
                      Your Name <span className="text-[#ff7a00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1e293b] text-white placeholder-slate-400 rounded-xl text-[14.5px] border border-slate-700 focus:outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-300 mb-1.5">
                      WhatsApp Number <span className="text-[#ff7a00]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98xxxxxxxx"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1e293b] text-white placeholder-slate-400 rounded-xl text-[14.5px] border border-slate-700 focus:outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-300 mb-1.5">
                      Pickup City (India)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ludhiana, Delhi"
                      value={formState.city}
                      onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1e293b] text-white placeholder-slate-400 rounded-xl text-[14.5px] border border-slate-700 focus:outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-300 mb-1.5">
                      Send to (Country)
                    </label>
                    <select
                      value={formState.dest}
                      onChange={(e) => setFormState({ ...formState, dest: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1e293b] text-white rounded-xl text-[14.5px] border border-slate-700 focus:outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
                    >
                      <option value="" className="bg-[#1e293b] text-white">Select country...</option>
                      <option value="USA" className="bg-[#1e293b] text-white">USA</option>
                      <option value="UK" className="bg-[#1e293b] text-white">UK</option>
                      <option value="Canada" className="bg-[#1e293b] text-white">Canada</option>
                      <option value="Australia" className="bg-[#1e293b] text-white">Australia</option>
                      <option value="Europe" className="bg-[#1e293b] text-white">Europe</option>
                      <option value="Other" className="bg-[#1e293b] text-white">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-300 mb-1.5">
                    What would you like to send?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. sweaters, pinni & dry fruits, a gift"
                    value={formState.goods}
                    onChange={(e) => setFormState({ ...formState, goods: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1e293b] text-white placeholder-slate-400 rounded-xl text-[14.5px] border border-slate-700 focus:outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-300 mb-1.5">
                    Anything else?
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Roughly how much, by when, or any specific question"
                    value={formState.msg}
                    onChange={(e) => setFormState({ ...formState, msg: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1e293b] text-white placeholder-slate-400 rounded-xl text-[14.5px] border border-slate-700 focus:outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] px-6 py-3.5 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all text-center cursor-pointer mt-1"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                  </svg>
                  <span>Book on WhatsApp</span>
                </button>

                <p className="text-[11.5px] sm:text-[12px] text-slate-400 text-center leading-relaxed mt-1">
                  On submit you will be taken to WhatsApp with your details pre-filled so we can arrange your pickup.
                </p>

                {showOk && (
                  <div className="mt-2.5 p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-[13px] text-center leading-relaxed">
                    Opening WhatsApp with your details... If it doesn&apos;t open, message us at{" "}
                    <a href="tel:+917070506070" className="font-bold underline text-white">
                      +91 70 70 50 60 70
                    </a>
                    .
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT YOU CAN SEND ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-10 sm:py-16">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            What you can send this winter
          </div>
          <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] font-extrabold text-[#0f172a] leading-tight">
            The things they miss most, when it&apos;s coldest.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-[14.5px] sm:text-[16px] md:text-[17px] text-[#555555] leading-relaxed">
            From warm clothes to maa ke haath ka khaana — packed to travel safely and arrive just the way you sent it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-7 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-3 sm:mb-4 block">🧤</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Warm clothes</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Sweaters, shawls, thermals and jackets to get them through the cold winters abroad.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-7 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-3 sm:mb-4 block">🍲</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Maa ke haath ka khaana</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Pinni, gajak, panjiri, laddoo, achaar and masalas — packed food-safe to arrive fresh.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-7 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-3 sm:mb-4 block">🥜</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Dry fruits &amp; mithai</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Almonds, walnuts, cashews and festive sweets — the winter favourites they crave.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-7 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-3 sm:mb-4 block">🛏️</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Blankets &amp; warmth</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Razais, mink blankets and cosy home comforts that are pricey and hard to find abroad.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-7 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-3 sm:mb-4 block">🎁</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Festive &amp; New Year gifts</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Ready gift hampers and presents for Christmas, New Year and the whole holiday season.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-7 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#ff7a00] bg-[#fff5ed] border border-orange-200 px-2.5 py-1 rounded-full">
              Anything else?
            </span>
            <span className="text-[32px] leading-none mb-3 sm:mb-4 block">📦</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Not sure about an item?</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Documents, essentials, a surprise — WhatsApp us a photo and we will tell you if we can send it.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-10 sm:py-16">
        <div className="rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-[#0f172a] text-white p-6 sm:p-10 lg:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mb-8 sm:mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
              How it works
            </div>
            <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] font-extrabold text-white leading-tight">
              Four easy steps. You don&apos;t even leave home.
            </h2>
            <p className="mt-3 text-[14.5px] sm:text-[16px] text-slate-300 leading-relaxed">
              Tell us what to send on WhatsApp and we take care of the rest — pickup, packing, customs and delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            <div className="p-5 sm:p-6 bg-[#1e293b]/60 rounded-2xl border border-white/10 hover:border-[#ff7a00]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#ff7a00]/20 border border-[#ff7a00]/40 text-[#ff7a00] grid place-items-center font-extrabold text-[20px] mb-4 sm:mb-5">
                1
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-white mb-2">Tell us what to send</h3>
              <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed">
                WhatsApp your list, where it&apos;s going and your pickup address. We reply with a quote.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-[#1e293b]/60 rounded-2xl border border-white/10 hover:border-[#ff7a00]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#ff7a00]/20 border border-[#ff7a00]/40 text-[#ff7a00] grid place-items-center font-extrabold text-[20px] mb-4 sm:mb-5">
                2
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-white mb-2">We pick up from home</h3>
              <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed">
                Our team collects from your doorstep at a time that suits you — no queues, no cold.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-[#1e293b]/60 rounded-2xl border border-white/10 hover:border-[#ff7a00]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#ff7a00]/20 border border-[#ff7a00]/40 text-[#ff7a00] grid place-items-center font-extrabold text-[20px] mb-4 sm:mb-5">
                3
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-white mb-2">We pack &amp; clear customs</h3>
              <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed">
                Food-safe, secure packing and all the paperwork and customs handled for you.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-[#1e293b]/60 rounded-2xl border border-white/10 hover:border-[#ff7a00]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#ff7a00]/20 border border-[#ff7a00]/40 text-[#ff7a00] grid place-items-center font-extrabold text-[20px] mb-4 sm:mb-5">
                4
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-white mb-2">Delivered to their door</h3>
              <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed">
                Fully tracked from your door to theirs, delivered abroad in time for the season.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE MANVI ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-10 sm:py-16">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Why families choose Manvi
          </div>
          <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] font-extrabold text-[#0f172a] leading-tight">
            Sending love home should feel easy.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="text-[12px] font-extrabold text-[#ff7a00] tracking-wider mb-2">01</div>
            <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0f172a]">Doorstep pickup</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              We collect from your home in India — no courier-office visits, no standing in the cold.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="text-[12px] font-extrabold text-[#ff7a00] tracking-wider mb-2">02</div>
            <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0f172a]">Food packed to travel</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Homemade sweets and dry foods packed food-safe so they arrive fresh and clear customs.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="text-[12px] font-extrabold text-[#ff7a00] tracking-wider mb-2">03</div>
            <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0f172a]">Customs handled</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              No forms or paperwork for you — we take care of the documentation end to end.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="text-[12px] font-extrabold text-[#ff7a00] tracking-wider mb-2">04</div>
            <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0f172a]">Live tracking</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Follow your parcel every step from your doorstep to your family&apos;s door abroad.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="text-[12px] font-extrabold text-[#ff7a00] tracking-wider mb-2">05</div>
            <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0f172a]">In time for the season</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Book early and we plan the delivery so it lands before the winter and holidays.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="text-[12px] font-extrabold text-[#ff7a00] tracking-wider mb-2">06</div>
            <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0f172a]">A real person on WhatsApp</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Talk to someone who cares about your parcel like it&apos;s their own, not a call centre.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. WHO YOU'RE SENDING TO ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <div className="bg-white border border-slate-200 rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
              Who you&apos;re sending to
            </div>
            <h2 className="text-[22px] sm:text-[30px] lg:text-[34px] font-extrabold text-[#0f172a] leading-tight">
              Distance is hard in winter. Make it a little warmer.
            </h2>
            <p className="mt-2 sm:mt-2.5 text-[14px] sm:text-[16px] text-[#555555] leading-relaxed">
              Whoever they are, wherever they&apos;ve moved — send them a reason to smile this season.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {[
              "A student far from home",
              "Family newly settled abroad",
              "Newlyweds & weddings",
              "Christmas & New Year",
              "Lohri & Makar Sankranti",
              "Birthdays & just because",
            ].map((chip, idx) => (
              <span
                key={idx}
                className="bg-[#f8f9fa] border border-slate-200 rounded-full px-5 py-2.5 font-semibold text-[13.5px] sm:text-[15px] text-[#0f172a] inline-flex items-center gap-2.5 shadow-sm hover:border-[#ff7a00] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff7a00] shrink-0" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="w-full max-w-[1000px] mx-auto px-3.5 sm:px-6 py-10 sm:py-16">
        <div className="max-w-2xl mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Questions? Glad you asked
          </div>
          <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-extrabold text-[#0f172a] leading-tight">
            Everything you want to know before you send.
          </h2>
        </div>

        <div className="flex flex-col">
          {[
            {
              q: "Can I send homemade food and sweets?",
              a: "Yes — we pack food safely so it travels well, and we handle the documentation. A few countries restrict certain items, so we'll check and let you know before pickup.",
              defaultOpen: true,
            },
            {
              q: "How do you pack fragile things and food?",
              a: "Everything is packed export-grade and food-safe, so sweets, dry fruits and delicate gifts arrive fresh and intact.",
            },
            {
              q: "Will my family pay customs or duty?",
              a: "It depends on the destination country and what's inside. We'll tell you upfront so there are no surprises at their end.",
            },
            {
              q: "How long does delivery take?",
              a: "Usually a few days to about two weeks depending on the country and customs. Book early for the winter and holiday rush and we'll confirm timings on your quote.",
            },
            {
              q: "Where do you pick up from?",
              a: "We offer standard doorstep pickup across Punjab, Delhi NCR, Haryana and Rajasthan. Pickup from Gujarat, Mumbai and other locations across India can be arranged on request — just share your address.",
            },
            {
              q: "What can't I send?",
              a: "Hazardous items, currency, precious stones and prohibited goods can't be shipped. Unsure about something? Send us a photo on WhatsApp and we'll confirm before you book.",
            },
            {
              q: "How do I pay?",
              a: "Share your parcel details on WhatsApp for a clear quote, and we'll share secure payment options. You pay only for the shipping.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              open={faq.defaultOpen}
              className="group border-b border-slate-200 py-3.5 sm:py-4 transition-all"
            >
              <summary className="list-none cursor-pointer flex items-center justify-between text-[15.5px] sm:text-[18px] md:text-[19px] font-bold text-[#0f172a] select-none gap-2">
                <span>{faq.q}</span>
                <span className="text-[#ff7a00] font-bold text-[20px] sm:text-[24px] ml-2 shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15.5px] text-[#555555] leading-relaxed pr-2 sm:pr-6">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 pt-4 pb-12 sm:pb-16">
        <div className="rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-[radial-gradient(120%_130%_at_15%_0%,#1e293b_0%,#0f172a_60%)] text-white text-center p-6 sm:p-10 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle Snow effect on final section */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {snowflakes.slice(0, 16).map((f) => (
              <i
                key={`final-${f.id}`}
                className="winter-snow-flake"
                style={{
                  left: f.left,
                  animationDuration: f.duration,
                  animationDelay: f.delay,
                  width: f.size,
                  height: f.size,
                  opacity: f.opacity,
                }}
              />
            ))}
          </div>

          <div className="max-w-[800px] mx-auto relative z-10">
            <div className="inline-flex items-center justify-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
              This winter
              <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            </div>

            <h2 className="text-[24px] sm:text-[34px] lg:text-[46px] font-extrabold text-white max-w-2xl mx-auto leading-tight">
              Winter won&apos;t wait. Send warmth home today.
            </h2>

            <p className="mt-3.5 sm:mt-4 text-[16px] sm:text-[19px] md:text-[20px] text-[#ff7a00] italic font-medium">
              &ldquo;Thand mein apnon ko ghar ki garmaahat bhejiye.&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all text-center"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                </svg>
                <span>Book a pickup on WhatsApp</span>
              </a>
              <a
                href="tel:+917070506070"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all text-center"
              >
                Call +91 70 70 50 60 70
              </a>
            </div>

            <p className="mt-4 sm:mt-5 text-[12.5px] sm:text-[14px] text-slate-300">
              Standard doorstep pickup across Punjab, Delhi NCR, Haryana and Rajasthan — Gujarat, Mumbai and pan-India on request. Delivered worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

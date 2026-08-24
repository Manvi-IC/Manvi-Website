"use client";

import React, { useEffect } from "react";

export default function ShopkeeperPage() {
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const snow = document.getElementById("snow");
    if (!snow) return;
    snow.innerHTML = "";
    for (let i = 0; i < 24; i++) {
      const f = document.createElement("i");
      f.style.left = Math.random() * 100 + "%";
      f.style.animationDuration = 6 + Math.random() * 8 + "s";
      f.style.animationDelay = -Math.random() * 10 + "s";
      const s = 2 + Math.random() * 3;
      f.style.width = s + "px";
      f.style.height = s + "px";
      f.style.opacity = String(0.2 + Math.random() * 0.45);
      f.style.position = "absolute";
      f.style.top = "-10px";
      f.style.borderRadius = "50%";
      f.style.background = "rgba(255, 255, 255, 0.45)";
      f.style.animationName = "skFall";
      f.style.animationTimingFunction = "linear";
      f.style.animationIterationCount = "infinite";
      snow.appendChild(f);
    }
  }, []);

  return (
    <div className="w-full font-sans bg-[#f8f9fa] text-[#0f172a] antialiased">
      {/* Keyframe animation helpers */}
      <style>{`
        @keyframes skFall {
          to { transform: translateY(560px); opacity: 0; }
        }
        @keyframes skDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes skPop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes skSpin {
          to { transform: rotate(360deg); }
        }
        .sk-draw { stroke-dashoffset: 600; animation: skDraw 2.4s ease forwards; }
        .sk-draw-d2 { animation-delay: 0.35s; }
        .sk-draw-d3 { animation-delay: 0.7s; }
        .sk-draw-d4 { animation-delay: 1.05s; }
        .sk-pop-1 { opacity: 0; animation: skPop 0.5s ease 1.5s forwards; }
        .sk-pop-2 { opacity: 0; animation: skPop 0.5s ease 1.75s forwards; }
        .sk-pop-3 { opacity: 0; animation: skPop 0.5s ease 2s forwards; }
        .sk-pop-4 { opacity: 0; animation: skPop 0.5s ease 2.25s forwards; }
        .sk-yarn { transform-box: fill-box; transform-origin: center; animation: skSpin 30s linear infinite; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>

      {/* ── 1. HERO CONTAINER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[radial-gradient(120%_90%_at_88%_-10%,#1e293b_0%,#0f172a_55%)] text-white border border-white/10 shadow-2xl">
          {/* Falling particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" id="snow" aria-hidden="true" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center p-6 sm:p-10 lg:p-14">
            {/* Left Copy */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-slate-300 mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_0_4px_rgba(34,197,94,0.25)] animate-pulse" />
                For businesses exporting from India
              </div>

              <h1 className="text-[28px] sm:text-[40px] lg:text-[50px] font-extrabold text-white leading-[1.14] tracking-tight">
                You already ship from India. <span className="text-[#ff7a00]">Let&apos;s ship it smarter.</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-slate-200 leading-relaxed max-w-xl">
                Garments, utensils, handicrafts, food or machine parts. Whatever you export, Manvi picks it up directly from your
                doorstep, packs it export-ready, clears customs and delivers worldwide through DHL, FedEx, UPS and
                Aramex at competitive rates.
              </p>

              <div className="flex flex-wrap gap-3.5 sm:gap-4 mt-7 sm:mt-8">
                <a
                  href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20I%20export%20from%20India%20and%20want%20to%20compare%20my%20shipping%20rates."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                  </svg>
                  Compare your rate
                </a>
                <a
                  href="tel:+917070506070"
                  className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                >
                  Call +91 70 70 50 60 70
                </a>
              </div>

              {/* Stats Counters */}
              <div className="flex flex-wrap gap-6 sm:gap-8 mt-8 pt-6 border-t border-white/10">
                <div className="border-l-[3px] border-[#ff7a00] pl-3.5">
                  <div className="text-[24px] sm:text-[28px] font-extrabold text-white leading-none">1M+</div>
                  <div className="text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1.5">
                    Shipments delivered
                  </div>
                </div>
                <div className="border-l-[3px] border-[#ff7a00] pl-3.5">
                  <div className="text-[24px] sm:text-[28px] font-extrabold text-white leading-none">100K+</div>
                  <div className="text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1.5">
                    Customers served
                  </div>
                </div>
                <div className="border-l-[3px] border-[#ff7a00] pl-3.5">
                  <div className="text-[24px] sm:text-[28px] font-extrabold text-white leading-none">200+</div>
                  <div className="text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1.5">
                    Destinations worldwide
                  </div>
                </div>
              </div>
            </div>

            {/* Right Spool Artwork SVG */}
            <div className="relative w-full max-w-[460px] mx-auto lg:max-w-none">
              <svg
                viewBox="0 0 520 430"
                className="w-full h-auto block"
                role="img"
                aria-label="A spool in India sending delivery routes to cities around the world"
              >
                <path
                  className="stroke-[#ff7a00] stroke-[2] fill-none stroke-round [stroke-dasharray:5_7] sk-draw sk-draw-d4"
                  d="M110 300 C 150 200, 190 130, 250 74"
                />
                <path
                  className="stroke-[#ff7a00] stroke-[2] fill-none stroke-round [stroke-dasharray:5_7] sk-draw"
                  d="M110 300 C 200 220, 300 170, 402 120"
                />
                <path
                  className="stroke-[#ff7a00] stroke-[2] fill-none stroke-round [stroke-dasharray:5_7] sk-draw sk-draw-d2"
                  d="M110 300 C 220 288, 330 260, 436 232"
                />
                <path
                  className="stroke-[#ff7a00] stroke-[2] fill-none stroke-round [stroke-dasharray:5_7] sk-draw sk-draw-d3"
                  d="M110 300 C 210 322, 300 336, 410 344"
                />

                <g className="sk-pop-4" transform="translate(250,74)">
                  <circle r="6.5" fill="#ff7a00" />
                  <circle r="2.6" fill="#0f172a" />
                  <text x="13" y="4" className="text-[11px] font-bold fill-white tracking-wider">
                    NEW YORK
                  </text>
                </g>
                <g className="sk-pop-1" transform="translate(402,120)">
                  <circle r="6.5" fill="#ff7a00" />
                  <circle r="2.6" fill="#0f172a" />
                  <text x="13" y="4" className="text-[11px] font-bold fill-white tracking-wider">
                    TORONTO
                  </text>
                </g>
                <g className="sk-pop-2" transform="translate(436,232)">
                  <circle r="6.5" fill="#ff7a00" />
                  <circle r="2.6" fill="#0f172a" />
                  <text x="-13" y="4" textAnchor="end" className="text-[11px] font-bold fill-white tracking-wider">
                    LONDON
                  </text>
                </g>
                <g className="sk-pop-3" transform="translate(410,344)">
                  <circle r="6.5" fill="#ff7a00" />
                  <circle r="2.6" fill="#0f172a" />
                  <text x="13" y="4" className="text-[11px] font-bold fill-white tracking-wider">
                    SYDNEY
                  </text>
                </g>

                <g transform="translate(110,300)">
                  <circle r="47" fill="#1e293b" stroke="#ff7a00" strokeWidth="1.5" />
                  <clipPath id="sk-ball">
                    <circle r="47" />
                  </clipPath>
                  <g
                    className="sk-yarn"
                    clipPath="url(#sk-ball)"
                    stroke="#ff7a00"
                    strokeWidth="1.8"
                    fill="none"
                    opacity="0.85"
                    strokeLinecap="round"
                  >
                    <ellipse rx="44" ry="17" transform="rotate(22)" />
                    <ellipse rx="44" ry="17" transform="rotate(68)" />
                    <ellipse rx="44" ry="17" transform="rotate(112)" />
                    <ellipse rx="44" ry="17" transform="rotate(158)" />
                    <ellipse rx="17" ry="44" />
                  </g>
                  <text
                    y="70"
                    textAnchor="middle"
                    className="font-bold text-[11px] fill-slate-300 tracking-[1.2px]"
                  >
                    YOUR SHOP · INDIA
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PARTNERS ── */}
      <div className="w-full bg-[#0f172a] text-white py-7 border-y border-white/10 mt-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8">
          <span className="text-[12px] font-bold tracking-widest uppercase text-slate-300">
            One partner, every major carrier
          </span>
          <div className="flex flex-wrap justify-center sm:justify-end gap-6 sm:gap-8 items-center font-extrabold text-[18px] sm:text-[20px] text-white/90">
            <span>DHL</span>
            <span>FedEx</span>
            <span>UPS</span>
            <span>Aramex</span>
            <span>DPD</span>
            <span>Courier&nbsp;Please</span>
          </div>
        </div>
      </div>

      {/* ── 3. WHAT WE SHIP ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2.5 text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-3">
            <span className="w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Whatever you export
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#0f172a] leading-tight">
            If you send it abroad, we move it.
          </h2>
          <p className="mt-3 text-[16px] sm:text-[17px] text-[#555555] leading-relaxed">
            Manvi is product-agnostic. From a single sample to a full bulk consignment, packed export-ready and shipped
            worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-[20px] p-7 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-4 block">👕</span>
            <h3 className="text-[20px] font-bold text-[#0f172a]">Garments &amp; textiles</h3>
            <p className="mt-2.5 text-[15px] text-[#555555] leading-relaxed">
              Apparel, fabrics, home linen and made-ups in retail quantities or bulk cartons.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[20px] p-7 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-4 block">🍽️</span>
            <h3 className="text-[20px] font-bold text-[#0f172a]">Utensils &amp; kitchenware</h3>
            <p className="mt-2.5 text-[15px] text-[#555555] leading-relaxed">
              Steel, brass, cookware and small appliances, packed carefully to arrive dent-free.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[20px] p-7 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-4 block">🪔</span>
            <h3 className="text-[20px] font-bold text-[#0f172a]">Handicrafts &amp; home décor</h3>
            <p className="mt-2.5 text-[15px] text-[#555555] leading-relaxed">
              Fragile, artisan and decorative goods, export-packed to survive the global journey.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[20px] p-7 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-4 block">🫙</span>
            <h3 className="text-[20px] font-bold text-[#0f172a]">Food &amp; packaged goods</h3>
            <p className="mt-2.5 text-[15px] text-[#555555] leading-relaxed">
              Spices, snacks, dry foods and FMCG, shipped with proper export documentation.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[20px] p-7 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[32px] leading-none mb-4 block">⚙️</span>
            <h3 className="text-[20px] font-bold text-[#0f172a]">Parts, tools &amp; samples</h3>
            <p className="mt-2.5 text-[15px] text-[#555555] leading-relaxed">
              Components, machinery parts and commercial samples for your buyers overseas.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[20px] p-7 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="absolute top-4 right-4 text-[10.5px] font-bold uppercase tracking-wider text-[#ff7a00] bg-[#fff5ed] border border-orange-200 px-2.5 py-1 rounded-full">
              Anything else?
            </span>
            <span className="text-[32px] leading-none mb-4 block">📦</span>
            <h3 className="text-[20px] font-bold text-[#0f172a]">Not on this list?</h3>
            <p className="mt-2.5 text-[15px] text-[#555555] leading-relaxed">
              Send us a photo on WhatsApp. We will confirm if we can ship it, how to pack it and what it costs.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
        <div className="bg-[#0f172a] text-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-14 border border-white/10 shadow-2xl">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-3">
              <span className="w-6 h-[2px] bg-[#ff7a00] rounded-full" />
              How it works
            </div>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-tight">
              You run the business. We run the logistics.
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-slate-300 leading-relaxed">
              No juggling carriers and no customs forms to fill. Send your shipment details on WhatsApp and we handle it end
              to end.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-[#1e293b] border border-[#ff7a00]/50 text-[#ff7a00] font-extrabold text-[20px] grid place-items-center mb-5 w-[52px] h-[52px]">
                1
              </div>
              <h3 className="text-[19px] font-bold text-white mb-2">Send your shipment details</h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                WhatsApp what you are sending, the weight and the destination. We reply with a clear quote.
              </p>
            </div>

            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-[#1e293b] border border-[#ff7a00]/50 text-[#ff7a00] font-extrabold text-[20px] grid place-items-center mb-5 w-[52px] h-[52px]">
                2
              </div>
              <h3 className="text-[19px] font-bold text-white mb-2">We pick up from your door</h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Collection from your shop, factory or godown anywhere in North and West India, with pan-India pickup on request.
              </p>
            </div>

            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-[#1e293b] border border-[#ff7a00]/50 text-[#ff7a00] font-extrabold text-[20px] grid place-items-center mb-5 w-[52px] h-[52px]">
                3
              </div>
              <h3 className="text-[19px] font-bold text-white mb-2">We pack, ship &amp; clear customs</h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Export-grade packing plus all documentation and clearance, handled for you across our carrier network.
              </p>
            </div>

            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-[#1e293b] border border-[#ff7a00]/50 text-[#ff7a00] font-extrabold text-[20px] grid place-items-center mb-5 w-[52px] h-[52px]">
                4
              </div>
              <h3 className="text-[19px] font-bold text-white mb-2">Delivered &amp; tracked</h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Door delivery to your buyer abroad with live tracking. Set up recurring pickups for regular orders anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. RATE COMPARE HIGHLIGHT BOX ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#0f172a] text-white p-7 sm:p-12 lg:p-14 border border-white/10 shadow-2xl">
          {/* Radial Glow */}
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.25),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-extrabold text-white leading-tight">
                Already paying for shipping? Let&apos;s beat it.
              </h2>
              <p className="mt-3.5 text-[15px] sm:text-[16px] text-slate-300 leading-relaxed max-w-xl">
                Send us a recent invoice or your typical weight, destination and volume. We will come back
                with a quote and show you the difference, with no obligation and no switching hassle.
              </p>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className="text-[12px] font-bold tracking-wider uppercase text-[#ff7a00]">
                Free rate comparison
              </span>
              <a
                href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20here%20are%20my%20current%20export%20shipping%20details%20to%20compare%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all text-center"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                </svg>
                <span>Send my details</span>
              </a>
              <a
                href="tel:+917070506070"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all text-center"
              >
                Call +91 70 70 50 60 70
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. WHY EXPORTERS SWITCH ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2.5 text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-3">
            <span className="w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Why exporters switch to Manvi
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#0f172a] leading-tight">
            A logistics partner that protects your margins.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-slate-200 border border-slate-200 rounded-[20px] overflow-hidden shadow-sm">
          <div className="bg-white p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2.5">01</div>
              <h3 className="text-[19px] font-bold text-[#0f172a] mb-2">Rates that beat the market</h3>
              <p className="text-[15px] text-[#555555] leading-relaxed">
                Transparent per-kg pricing by weight, destination and transit speed. Share your current bill and we will try to
                beat it.
              </p>
            </div>
          </div>

          <div className="bg-white p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2.5">02</div>
              <h3 className="text-[19px] font-bold text-[#0f172a] mb-2">Every major carrier, one desk</h3>
              <p className="text-[15px] text-[#555555] leading-relaxed">
                DHL, FedEx, UPS and Aramex under one account. We pick the best route for each shipment.
              </p>
            </div>
          </div>

          <div className="bg-white p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2.5">03</div>
              <h3 className="text-[19px] font-bold text-[#0f172a] mb-2">Customs &amp; paperwork done</h3>
              <p className="text-[15px] text-[#555555] leading-relaxed">
                Commercial invoices, packing lists and clearance handled so your goods never get stuck at the border.
              </p>
            </div>
          </div>

          <div className="bg-white p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2.5">04</div>
              <h3 className="text-[19px] font-bold text-[#0f172a] mb-2">Doorstep pickup, pan-India</h3>
              <p className="text-[15px] text-[#555555] leading-relaxed">
                From your shop, factory or godown across North and West India, with pan-India pickup on request.
              </p>
            </div>
          </div>

          <div className="bg-white p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2.5">05</div>
              <h3 className="text-[19px] font-bold text-[#0f172a] mb-2">Bulk &amp; recurring shipments</h3>
              <p className="text-[15px] text-[#555555] leading-relaxed">
                From a single sample carton to scheduled weekly, monthly and seasonal exports for your regular buyers.
              </p>
            </div>
          </div>

          <div className="bg-white p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2.5">06</div>
              <h3 className="text-[19px] font-bold text-[#0f172a] mb-2">A dedicated point of contact</h3>
              <p className="text-[15px] text-[#555555] leading-relaxed">
                A real logistics specialist on WhatsApp who knows your account and your orders, not a frustrating call center queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. WHO IT'S FOR ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-3">
              <span className="w-6 h-[2px] bg-[#ff7a00] rounded-full" />
              Built for exporters like you
            </div>
            <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#0f172a] leading-tight">
              If you are already shipping out of India, this is for you.
            </h2>
            <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] leading-relaxed">
              Whatever your product and whatever your consignment volume, we have moved similar goods across global borders.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              "Garment & apparel exporters",
              "Utensil & kitchenware exporters",
              "Handicraft & décor exporters",
              "Food & spice exporters",
              "Wholesale traders & suppliers",
              "Online sellers shipping abroad",
              "Manufacturers & sample shippers",
            ].map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2.5 bg-[#f8f9fa] border border-slate-200 rounded-full px-5 py-3 text-[15px] font-semibold text-[#0f172a] shadow-sm hover:border-[#ff7a00] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff7a00]" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2.5 text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-3">
            <span className="w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Questions? Glad you asked
          </div>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#0f172a] leading-tight">
            What exporters ask us first.
          </h2>
        </div>

        <div className="flex flex-col">
          {[
            {
              q: "Can you beat my current shipping rate?",
              a: "Often, yes. Share a recent invoice or your typical weight, destination and volume, and we will quote and show you the difference with no obligation.",
              defaultOpen: true,
            },
            {
              q: "Do you handle export documentation and customs?",
              a: "Yes. Commercial invoices, packing lists, clearance and all carrier paperwork are handled for you, so your goods keep moving across the border without delays.",
            },
            {
              q: "What is the minimum weight I can ship?",
              a: "Anything from a single parcel or sample to full bulk consignments. WhatsApp your details and we will advise the most cost-effective option.",
            },
            {
              q: "Which countries do you deliver to?",
              a: "Core lanes include the USA, UK, Canada, Australia and Europe, as well as worldwide delivery across 200+ countries through our carrier partners.",
            },
            {
              q: "Can you set up regular, recurring pickups?",
              a: "Yes. Many exporters run scheduled weekly, monthly or seasonal shipments with us tailored to their production and order flow.",
            },
            {
              q: "Where do you pick up from in India?",
              a: "Doorstep pickup is available across Punjab, Delhi NCR, Haryana, Rajasthan, Gujarat and Mumbai, with pan-India pickup arranged upon request.",
            },
            {
              q: "What items cannot be shipped?",
              a: "We do not ship hazardous chemicals, currency, precious stones or prohibited goods. If you are ever unsure about an item, send a photo on WhatsApp and we will confirm before booking.",
            },
            {
              q: "How do I get started?",
              a: "Send your shipment details on WhatsApp. You will receive a quote, we will schedule the pickup, and handle packing, customs and international delivery from there.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              open={faq.defaultOpen}
              className="group border-b border-slate-200 py-4 transition-all"
            >
              <summary className="list-none cursor-pointer flex items-center justify-between text-[18px] sm:text-[19px] font-bold text-[#0f172a] select-none">
                <span>{faq.q}</span>
                <span className="text-[#ff7a00] font-bold text-[24px] ml-4 shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] sm:text-[16px] text-[#555555] leading-relaxed pr-6">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pt-4 pb-16">
        <div className="rounded-[24px] sm:rounded-[32px] bg-[radial-gradient(120%_130%_at_15%_0%,#1e293b_0%,#0f172a_60%)] text-white text-center p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
          <div className="inline-flex items-center gap-2.5 text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-3">
            <span className="w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Ready when you are
          </div>

          <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold text-white max-w-2xl mx-auto leading-tight">
            Get a quote before your next shipment goes out.
          </h2>

          <p className="mt-4 text-[18px] sm:text-[20px] text-[#ff7a00] italic font-medium">
            &ldquo;Aap export karo, pickup, customs aur delivery hum sambhaal lenge.&rdquo;
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 mt-8">
            <a
              href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20I%20export%20from%20India%20and%20want%20a%20shipping%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
              </svg>
              <span>WhatsApp us your details</span>
            </a>
            <a
              href="tel:+917070506070"
              className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Call +91 70 70 50 60 70
            </a>
          </div>

          <p className="mt-5 text-[13.5px] sm:text-[14.5px] text-slate-300">
            Doorstep pickup across Punjab · Delhi NCR · Haryana · Rajasthan · Gujarat · Mumbai, delivered worldwide.
          </p>
        </div>
      </section>
    </div>
  );
}

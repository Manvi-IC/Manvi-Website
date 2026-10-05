"use client";

import React from "react";

// ─── 1. Traditional Glowing Diya (Terracotta & Brass with Flickering Flame) ───
export function DiyaLamp({
  size = 36,
  className = "",
  glow = true,
}: {
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{ width: size, height: size * 0.85 }}
      aria-hidden="true"
    >
      {/* Diya Flame Ambient Halo */}
      {glow && (
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400/35 blur-md pointer-events-none animate-pulse"
          style={{ animationDuration: "2s" }}
        />
      )}
      <svg
        viewBox="0 0 48 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
      >
        <defs>
          <linearGradient id="terracotta" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="brassRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Diya Clay Bowl */}
        <path
          d="M6 24 C10 34, 38 34, 42 24 C36 28, 12 28, 6 24 Z"
          fill="url(#terracotta)"
        />
        {/* Brass / Terracotta Rim */}
        <ellipse cx="24" cy="23.5" rx="18" ry="4" fill="url(#brassRim)" />
        <ellipse cx="24" cy="23.5" rx="15" ry="2.6" fill="#451a03" />

        {/* Traditional carved dots on the bowl */}
        <circle cx="16" cy="27" r="1.1" fill="#fde047" opacity="0.8" />
        <circle cx="20" cy="29" r="1.1" fill="#fde047" opacity="0.9" />
        <circle cx="24" cy="29.5" r="1.2" fill="#fde047" />
        <circle cx="28" cy="29" r="1.1" fill="#fde047" opacity="0.9" />
        <circle cx="32" cy="27" r="1.1" fill="#fde047" opacity="0.8" />

        {/* Wick */}
        <path
          d="M24 23.5 C24 20, 24.5 19, 25 18"
          stroke="#292524"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Flickering Flame with CSS animation */}
        <g className="diya-flame-motion origin-bottom">
          {/* Outer flame */}
          <path
            d="M24.5 18 C22 14, 21 11, 24.5 4 C28 11, 27 14, 24.5 18 Z"
            fill="url(#flameGrad)"
          />
          {/* Inner hot white core */}
          <path
            d="M24.5 17 C23.2 14, 22.8 12, 24.5 8 C26.2 12, 25.8 14, 24.5 17 Z"
            fill="#ffffff"
            opacity="0.95"
          />
        </g>
      </svg>
    </div>
  );
}

// ─── 2. Hanging Akash Kandil (Traditional Lantern with Gentle Sway) ───────────
export function AkashKandil({
  className = "",
  size = 64,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{
        width: size,
        transformOrigin: "top center",
        animation: "kandilSway 6s ease-in-out infinite alternate",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 80 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)]"
      >
        <defs>
          <linearGradient id="kandilGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="kandilRuby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="70%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
          <linearGradient id="kandilRibbon1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="kandilRibbon2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Top Hanging String */}
        <line
          x1="40"
          y1="0"
          x2="40"
          y2="28"
          stroke="#fde047"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <circle cx="40" cy="28" r="3" fill="#f59e0b" />

        {/* Top Diamond Facet */}
        <polygon points="40,32 58,48 40,64 22,48" fill="url(#kandilRuby)" />
        <polygon points="40,32 40,64 22,48" fill="#e11d48" opacity="0.6" />

        {/* Center Main Hexagon/Star Body */}
        <polygon
          points="40,46 68,66 68,96 40,116 12,96 12,66"
          fill="url(#kandilGold)"
          stroke="#fef08a"
          strokeWidth="1.2"
        />

        {/* Inner Glowing Pattern */}
        <polygon
          points="40,58 60,72 60,92 40,104 20,92 20,72"
          fill="#78350f"
          opacity="0.85"
        />
        <circle cx="40" cy="81" r="10" fill="#fde047" opacity="0.9" />
        <circle cx="40" cy="81" r="6" fill="#ffffff" />

        {/* Corner Golden Jhumkas / Ornaments */}
        <circle cx="12" cy="81" r="2.5" fill="#fde047" />
        <circle cx="68" cy="81" r="2.5" fill="#fde047" />
        <circle cx="40" cy="116" r="3" fill="#fde047" />

        {/* Bottom Hanging Festive Ribbons / Streamers */}
        {/* Ribbon 1 (Left) */}
        <path
          d="M24 112 C20 135, 28 150, 22 175"
          stroke="url(#kandilRibbon1)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Ribbon 2 (Center-left) */}
        <path
          d="M32 116 C30 138, 38 155, 34 180"
          stroke="url(#kandilRibbon2)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Ribbon 3 (Center) */}
        <path
          d="M40 118 C40 142, 42 160, 40 185"
          stroke="#fde047"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Ribbon 4 (Center-right) */}
        <path
          d="M48 116 C50 138, 42 155, 46 180"
          stroke="url(#kandilRibbon2)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Ribbon 5 (Right) */}
        <path
          d="M56 112 C60 135, 52 150, 58 175"
          stroke="url(#kandilRibbon1)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// ─── 3. Delicate Marigold (Genda Phool) & Mango Leaves Toran ──────────────────
export function MarigoldToran({ className = "" }: { className?: string }) {
  // A clean, minimal repeating string of marigold flowers and mango leaves
  const items = Array.from({ length: 14 });

  return (
    <div
      className={`w-full overflow-hidden flex items-center justify-center pointer-events-none select-none py-1.5 opacity-90 ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between w-full max-w-[1352px] px-2 sm:px-4">
        {items.map((_, i) => (
          <div key={i} className="flex items-center -space-x-1 shrink-0">
            {/* Mango Leaf */}
            <svg
              viewBox="0 0 16 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-6 sm:w-4 sm:h-7 drop-shadow-sm -rotate-6"
            >
              <path
                d="M8 2 C14 8, 14 18, 8 26 C2 18, 2 8, 8 2 Z"
                fill="#15803d"
                stroke="#166534"
                strokeWidth="0.8"
              />
              <line
                x1="8"
                y1="4"
                x2="8"
                y2="24"
                stroke="#22c55e"
                strokeWidth="0.6"
                opacity="0.8"
              />
            </svg>

            {/* Marigold Flower (Alternating vibrant orange & golden yellow) */}
            <div
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-sm ${
                i % 2 === 0
                  ? "bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-orange-500/40"
                  : "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-400 shadow-amber-400/40"
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-orange-700/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Royal Rangoli / Mandala Section Divider ──────────────────────────────
export function RangoliDivider({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-[1400px] mx-auto px-4 my-6 sm:my-8 flex items-center justify-center gap-3 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Left Golden Filigree Line */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#ED7E23]/40 to-[#c4620c]/80 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#c4620c] shadow-xs" />
      </div>

      {/* Center Ornate Motif & Diya */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#ED7E23]/45 shadow-sm shadow-orange-950/5">
        <span className="text-[#c4620c] text-xs">✨</span>
        <DiyaLamp size={22} glow={false} />
        {label && (
          <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-[#c4620c] px-1">
            {label}
          </span>
        )}
        <span className="text-[#c4620c] text-xs">✨</span>
      </div>

      {/* Right Golden Filigree Line */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#ED7E23]/40 to-[#c4620c]/80 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#c4620c] shadow-xs" />
      </div>
    </div>
  );
}

// ─── 5. Sacred Geometric Rangoli Mandala Watermark ───────────────────────────
export function RangoliWatermark({
  size = 280,
  className = "",
  opacity = 0.06,
}: {
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke="#f59e0b"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <circle cx="100" cy="100" r="82" stroke="#f59e0b" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="64" stroke="#f59e0b" strokeWidth="1" />
      <circle cx="100" cy="100" r="44" stroke="#f59e0b" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="24" stroke="#f59e0b" strokeWidth="1" />

      {/* 8-Pointed Star Lotus Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <path
            d="M100 8 C108 36, 118 64, 100 76 C82 64, 92 36, 100 8 Z"
            stroke="#f59e0b"
            strokeWidth="0.9"
            fill="none"
          />
          <circle cx="100" cy="20" r="2" fill="#f59e0b" />
          <path
            d="M100 36 C105 52, 110 68, 100 76 C90 68, 95 52, 100 36 Z"
            stroke="#fbbf24"
            strokeWidth="0.6"
          />
        </g>
      ))}

      {/* Inner Central Floral Ring */}
      <circle cx="100" cy="100" r="10" fill="#f59e0b" opacity="0.3" />
      <circle cx="100" cy="100" r="4" fill="#fde047" />
    </svg>
  );
}

// ─── 6. Ambient Floating Golden Embers (Subtle, Minimal Particle Drift) ───────
export function DiwaliAmbientEmbers() {
  // 14 fixed seeds for consistent, non-jittering SSR hydration
  const embers = [
    { left: "4%", size: 3, delay: "0s", duration: "11s" },
    { left: "11%", size: 2, delay: "3s", duration: "14s" },
    { left: "18%", size: 2.5, delay: "1.5s", duration: "12s" },
    { left: "26%", size: 2, delay: "5s", duration: "15s" },
    { left: "34%", size: 3, delay: "2s", duration: "13s" },
    { left: "42%", size: 2.5, delay: "6s", duration: "16s" },
    { left: "55%", size: 2, delay: "0.5s", duration: "12s" },
    { left: "63%", size: 3, delay: "4s", duration: "14s" },
    { left: "71%", size: 2.5, delay: "2.5s", duration: "13s" },
    { left: "79%", size: 2, delay: "5.5s", duration: "15s" },
    { left: "87%", size: 3, delay: "1s", duration: "12s" },
    { left: "94%", size: 2.5, delay: "3.5s", duration: "14s" },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {embers.map((e, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-gradient-to-t from-amber-400 to-yellow-200 shadow-[0_0_8px_rgba(251,191,36,0.8)] opacity-0 animate-diwali-ember"
          style={{
            left: e.left,
            bottom: "-20px",
            width: `${e.size}px`,
            height: `${e.size}px`,
            animationDelay: e.delay,
            animationDuration: e.duration,
          }}
        />
      ))}
    </div>
  );
}

// ─── 7. Subtle Royal Indian Jali Lattice Texture ─────────────────────────────
export function FestiveJaliBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.038]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23f59e0b' stroke-width='0.75' fill='none'%3E%3Cpath d='M28 0 L38 10 L28 20 L18 10 Z'/%3E%3Cpath d='M0 28 L10 38 L0 48 L-10 38 Z'/%3E%3Cpath d='M56 28 L66 38 L56 48 L46 38 Z'/%3E%3Cpath d='M28 56 L38 66 L28 76 L18 66 Z'/%3E%3Ccircle cx='28' cy='28' r='5' stroke-width='0.5'/%3E%3Cpath d='M14 14 L28 28 L42 14 M14 42 L28 28 L42 42' stroke-width='0.5' opacity='0.7'/%3E%3Ccircle cx='0' cy='0' r='2' fill='%23f59e0b'/%3E%3Ccircle cx='56' cy='0' r='2' fill='%23f59e0b'/%3E%3Ccircle cx='0' cy='56' r='2' fill='%23f59e0b'/%3E%3Ccircle cx='56' cy='56' r='2' fill='%23f59e0b'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}

// ─── 8. Delicate Indian Gold Corner Filigree ─────────────────────────────────
export function CornerFlourish({
  position = "top-left",
  size = 32,
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  className?: string;
}) {
  const transform =
    position === "top-left"
      ? ""
      : position === "top-right"
      ? "scale-x-[-1]"
      : position === "bottom-left"
      ? "scale-y-[-1]"
      : "scale-x-[-1] scale-y-[-1]";

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none absolute ${transform} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 38 V10 C2 5.58 5.58 2 10 2 H38"
        stroke="#f59e0b"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M6 38 V14 C6 9.58 9.58 6 14 6 H38"
        stroke="#fbbf24"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="2.2" fill="#f59e0b" />
      <path
        d="M14 14 C19 14, 22 17, 22 22"
        stroke="#f59e0b"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="22" cy="22" r="1.3" fill="#fde047" />
      <circle cx="38" cy="2" r="1.8" fill="#f59e0b" />
      <circle cx="2" cy="38" r="1.8" fill="#f59e0b" />
    </svg>
  );
}


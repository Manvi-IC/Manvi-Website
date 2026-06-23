// app/components/Hero.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ArrowUpRight,
  Users,
  Package,
  Headphones,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

/* ── Carousel Slides ─────────────────────────────────────────────────────── */
const SLIDES = [
  {
    src: "/hero-right.jpg",
    tagline: "Your trusted courier,",
    highlight: "across every mile.",
  },
  {
    src: "/hero-right-2.jpeg",
    tagline: "Distance not Divide,",
    highlight: "with Manvi.",
  },
  {
    src: "/hero-right-3.jpeg",
    tagline: "Miles don't matter",
    highlight: "at Manvi.",
  },
  {
    src: "/hero-right-4.jpeg",
    tagline: "Shipping love,",
    highlight: "packed in a box.",
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
  "LUXEMBOURGE",
  "NETHERLANDS",
  "CZECH REPUBLIC",
  "DENMARK",
  "LIECHTENSTEIN",
  "FRANCE",
  "MONACO",
  "HUNGARY",
  "ITALY",
  "POLAND",
  "SLOVAKIA",
  "SLOVENIA",
  "SPAIN",
  "IRELAND",
  "PORTUGAL",
  "SWEDEN",
  "ESTONIA",
  "FINLAND",
  "CROATIA",
  "LATVIA",
  "LITHUANIA",
  "BULGARIA",
  "ROMANIA",
  "GREECE",
  "ICELAND",
];

const INTERNATIONAL_COUNTRIES = [
  "USA",
  "BANGLADESH",
  "BHUTAN",
  "MALDIVES",
  "NEPAL",
  "SRI LANKA",
  "UNITED ARAB EMIRATES",
  "HONG KONG",
  "MALAYSIA",
  "SINGAPORE",
  "THAILAND",
  "CHINA, PEOPLE'S REPUBLIC",
  "BAHRAIN",
  "JORDAN",
  "KUWAIT",
  "OMAN",
  "PAKISTAN",
  "QATAR",
  "SAUDI ARABIA",
  "BRUNEI",
  "CAMBODIA",
  "INDONESIA",
  "JAPAN",
  "KOREA, REPUBLIC OF",
  "MACAU",
  "MYANMAR",
  "PHILIPPINES, THE",
  "TAIWAN",
  "VIETNAM",
  "NEW ZEALAND",
  "SOUTH AFRICA",
  "NIGERIA",
  "KENYA",
  "EGYPT",
  "GHANA",
];

const NETWORK_LABELS: Record<string, string> = {
  SELF: "Self Network",
  ARA: "Aramex",
  DHL: "DHL",
  UPS: "UPS",
  FED: "FedEx",
};
const NETWORK_COLORS: Record<string, string> = {
  SELF: "bg-orange-100 text-orange-700",
  ARA: "bg-purple-100 text-purple-700",
  DHL: "bg-yellow-100 text-yellow-800",
  UPS: "bg-amber-100 text-amber-800",
  FED: "bg-blue-100 text-blue-700",
};

interface Quote {
  service: string;
  network: string;
  chargeableWt: number;
  volWt: number;
  zone: string;
  rateType: string;
  totalPrice: number;
  tat: string;
}

/* ── Quotes Modal ─────────────────────────────────────────────────────────── */
function QuotesModal({
  quotes,
  destLabel,
  zoningCountry,
  selectedService,
  onSelect,
  onClose,
}: {
  quotes: Quote[];
  destLabel: string;
  zoningCountry: string;
  selectedService: string | null;
  onSelect: (key: string) => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0D1527] rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-white/10">
        <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10">
          <div>
            <p className="text-white font-bold text-base">
              {destLabel}
              {zoningCountry && ` — ${zoningCountry}`}
            </p>
            <p className="text-zinc-400 text-[12px] mt-0.5">
              {quotes.length} service{quotes.length !== 1 ? "s" : ""} found ·
              Chargeable:{" "}
              <span className="text-[#e77419] font-semibold">
                {quotes[0]?.chargeableWt} kg
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1 mt-0.5 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {quotes.map((q) => {
            const key = `${q.service}__${q.rateType}`;
            const isSelected = selectedService === key;
            const networkColor =
              NETWORK_COLORS[q.network] ?? "bg-gray-100 text-gray-700";
            const networkLabel = NETWORK_LABELS[q.network] ?? q.network;
            const dutyPaid = q.network === "SELF";
            return (
              <div
                key={key}
                onClick={() => onSelect(key)}
                className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#e77419] bg-[#e77419]/10"
                    : "border-zinc-700 bg-zinc-800/60 hover:border-zinc-500"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2.5 left-3 bg-[#e77419] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {t.form_selected}
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${networkColor}`}
                      >
                        {q.service}
                      </span>
                      {q.zone && (
                        <span className="text-[10px] bg-white/10 text-zinc-300 px-2.5 py-0.5 rounded-full font-mono">
                          {t.form_zone} {q.zone}
                        </span>
                      )}
                      <span className="text-[10px] bg-white/10 text-zinc-300 px-2.5 py-0.5 rounded-full">
                        {q.rateType === "S" ? t.form_slab : t.form_per_kg}
                      </span>
                      {dutyPaid ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 size={10} strokeWidth={2} />
                          {t.form_duty_paid}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/20">
                          <AlertCircle size={10} strokeWidth={2} />
                          {t.form_duty_unpaid}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-[20px] font-semibold text-white leading-snug tracking-wide">
                        {networkLabel}
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                        {q.tat}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pt-0.5">
                    <p className="text-[22px] font-extrabold text-[#e77419] leading-none tracking-tight">
                      ₹{Math.round(q.totalPrice).toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-1 font-medium tracking-wide uppercase">
                      {t.form_gst_inc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-5 py-3 border-t border-white/10 text-center">
          <p className="text-[11px] text-zinc-500">{t.form_final_rates_msg}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const { t } = useLanguage();

  /* Form state */
  const [destination, setDestination] = useState("");
  const [zoningCountry, setZoningCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [actualWt, setActualWt] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /* Carousel state */
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

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

  /* Auto-advance */
  const goTo = useCallback(
    (idx: number, dir: "next" | "prev") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 500);
    },
    [animating],
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length, "next"),
    [current, goTo],
  );
  const prev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length, "prev"),
    [current, goTo],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, paused]);

  /* Quote fetch */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !actualWt) {
      alert("Please select a destination and enter actual weight");
      return;
    }
    if (requiresZip && !zipcode.trim()) {
      alert("Please enter the zipcode/postcode for this destination.");
      return;
    }
    if (requiresSubCountry && !zoningCountry) {
      alert(`Please select a specific country within ${destObj?.label}.`);
      return;
    }
    setLoading(true);
    setQuotes([]);
    setSelectedService(null);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";
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
        setSelectedService(
          `${data.quotes[0].service}__${data.quotes[0].rateType}`,
        );
        setShowModal(true);
      } else {
        alert(
          data.message ||
            "No services available for this destination/weight combination.",
        );
      }
    } catch (err: any) {
      alert("Failed to get quote: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const slide = SLIDES[current];

  return (
    <>
      {showModal && quotes.length > 0 && (
        <QuotesModal
          quotes={quotes}
          destLabel={destObj?.label ?? destination}
          zoningCountry={zoningCountry}
          selectedService={selectedService}
          onSelect={setSelectedService}
          onClose={() => setShowModal(false)}
        />
      )}

      <section className="max-w-425 w-full mx-auto px-4 sm:px-6 py-6 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* ── LEFT: Orange Form Card ── */}
          <div className="bg-[#f27a1a] rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col gap-6 shadow-xl">
            <div className="flex flex-col gap-4">
              <h1 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold text-white leading-[1.1] tracking-tight uppercase">
                {t.hero_headline}
              </h1>
              <p className="text-white/80 text-[13px] leading-relaxed max-w-md">
                {t.hero_subtext}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Destination */}
              <div className="relative">
                <select
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setZipcode("");
                    setZoningCountry("");
                    setQuotes([]);
                  }}
                  className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none appearance-none"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              {requiresSubCountry && (
                <div className="relative">
                  <select
                    value={zoningCountry}
                    onChange={(e) => {
                      setZoningCountry(e.target.value);
                      setQuotes([]);
                    }}
                    className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none appearance-none"
                  >
                    <option value="">
                      {destination === "EUROPE"
                        ? t.form_select_euro
                        : t.form_select_country}
                    </option>
                    {subCountryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              )}

              {requiresZip && (
                <input
                  type="text"
                  placeholder={`${t.form_zipcode} (required for ${destObj?.label})`}
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                  className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                />
              )}

              <input
                type="number"
                placeholder={t.form_actual_wt}
                value={actualWt}
                onChange={(e) => setActualWt(e.target.value)}
                min="0.001"
                step="0.001"
                className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
              />

              <div className="flex flex-col gap-1">
                <span className="text-white/80 text-[11px] font-semibold tracking-wide uppercase pl-1">
                  {t.form_vol_wt_dim}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: length, setter: setLength, label: t.form_length },
                    { val: breadth, setter: setBreadth, label: t.form_breadth },
                    { val: height, setter: setHeight, label: t.form_height },
                  ].map(({ val, setter, label }) => (
                    <input
                      key={label}
                      type="number"
                      placeholder={label}
                      value={val}
                      onChange={(e) => setter(e.target.value)}
                      min="0"
                      className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-3 py-3 focus:outline-none placeholder:text-gray-400"
                    />
                  ))}
                </div>
              </div>

              {(actualWt || volWt) && (
                <div className="bg-white/20 rounded-xl px-4 py-3 flex justify-between text-white text-xs font-semibold">
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
                disabled={loading}
                className="mt-2 bg-[#0D1527] hover:bg-slate-800 text-white font-bold text-[13px] py-3 px-6 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-70"
              >
                {loading ? t.form_calculating : t.hero_get_quote}{" "}
                {!loading && (
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                )}
              </button>
            </form>
          </div>

          {/* ── RIGHT: Carousel Card ── */}
          <div
            className="relative rounded-[16px] min-h-[485px] lg:h-auto flex flex-col justify-between overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Slides */}
            {SLIDES.map((s, i) => (
              <div
                key={s.src}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={s.src}
                  alt={s.tagline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority={i === 0}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-black/45" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 60%)",
                  }}
                />
              </div>
            ))}

            {/* Top badge — above everything */}
            <div className="relative z-20 p-6 sm:p-8 lg:p-10 flex flex-col gap-3">
              <span className="text-[11px] font-bold tracking-wider bg-white/15 text-white/90 border border-white/20 w-fit px-3 py-1 rounded-full">
                {t.hero_legacy_badge}
              </span>
            </div>

            {/* Tagline — centre of card, changes per slide */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 pb-75 pointer-events-none">
              <div
                key={current}
                className="text-left"
                style={{ animation: "fadeSlideUp 0.55s ease both" }}
              >
                <p className="text-[28px] sm:text-[34px] md:text-[38px] font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-lg">
                  {slide.tagline.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                  {slide.highlight && (
                    <span className="text-[#f27a1a]">{slide.highlight}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Bottom bar: WhatsApp + dots + arrows + read more */}
            <div className="relative z-20 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-end justify-between gap-6 sm:gap-0">
              {/* WhatsApp cutout */}
              <div className="absolute -bottom-4 -left-4 w-34 h-34 sm:w-36 sm:h-36 bg-[#f8f9fa] rounded-full flex items-center justify-center pointer-events-none z-20">
                <a
                  href="https://wa.me/917070506070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-20 sm:w-28 sm:h-28 bg-[#23c961] rounded-full relative flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-300 z-50"
                >
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white z-10 relative"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <svg
                    className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
                    viewBox="0 0 100 100"
                    aria-hidden
                  >
                    <path
                      id="heroCircleText"
                      d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                      fill="none"
                    />
                    <text>
                      <textPath
                        href="#heroCircleText"
                        startOffset="0"
                        style={{
                          fontSize: "11px",
                          fill: "white",
                          fontWeight: "bold",
                          letterSpacing: "0.12em",
                        }}
                        textLength="239"
                      >
                        {t.hero_whatsapp}
                      </textPath>
                    </text>
                  </svg>
                </a>
              </div>

              {/* Spacer for WhatsApp */}
              <div className="w-24 sm:w-32 flex-shrink-0" />

              {/* Right side: dots + arrows + read more */}
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Dot indicators */}
                <div className="flex gap-1.5 items-center">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i, i > current ? "next" : "prev")}
                      className={`rounded-full transition-all duration-300 ${
                        i === current
                          ? "w-5 h-2 bg-[#f27a1a]"
                          : "w-2 h-2 bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prev}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    onClick={next}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>

                <Link
                  href="/about"
                  className="border border-white/50 text-white text-[12px] font-semibold px-5 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {t.hero_read_more}
                </Link>
              </div>
            </div>

            {/* Slide counter badge (top-right) */}
            {/* <div className="absolute top-5 right-5 z-20 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white/70 tabular-nums">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(SLIDES.length).padStart(2, "0")}
            </div> */}
          </div>
        </div>

        {/* Action Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">
          {[
            {
              icon: <MapPin className="w-4 h-4" />,
              label: t.hero_serviceable_zipcodes,
              href: "/zipcode",
            },
            {
              icon: <Package className="w-4 h-4" />,
              label: t.nav_track_shipment,
              href: "/track",
            },
            {
              icon: <Users className="w-4 h-4" />,
              label: t.hero_our_services,
              href: "/services",
            },
            {
              icon: <Headphones className="w-4 h-4" />,
              label: t.hero_contact_us,
              href: "/contact",
            },
          ].map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center justify-center gap-2 sm:gap-3 bg-[#0D1527] hover:bg-[#f27a1a] rounded-[14px] sm:rounded-2xl text-[12px] sm:text-[14px] font-semibold text-white py-3 sm:py-4 transition-all text-center px-2"
            >
              {tab.icon} <span className="truncate">{tab.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Keyframe for tagline fade-up */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

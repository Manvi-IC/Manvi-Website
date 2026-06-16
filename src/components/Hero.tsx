"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Users,
  Package,
  Headphones,
  MapPin,
  ChevronDown,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

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

export default function Hero() {
  const { t } = useLanguage();
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
  const [showResults, setShowResults] = useState(false);

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
    setShowResults(false);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "m5clogs";

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
        setShowResults(true);
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

  return (
    <section className="max-w-425 w-full mx-auto px-4 sm:px-6 py-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Orange Form Card */}
        <div className="bg-[#f27a1a] rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-110 shadow-xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold text-white leading-[1.1] tracking-tight uppercase">
              {t.hero_headline}
            </h1>
            <p className="text-white/80 text-[13px] leading-relaxed max-w-md">
              {t.hero_subtext}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
            {/* Destination */}
            <div className="relative">
              <select
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setZipcode("");
                  setZoningCountry("");
                  setQuotes([]);
                  setShowResults(false);
                }}
                className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none appearance-none"
              >
                <option value="">Select Destination Country</option>
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

            {/* Sub-country (EUROPE / INTERNATIONAL) */}
            {requiresSubCountry && (
              <div className="relative">
                <select
                  value={zoningCountry}
                  onChange={(e) => {
                    setZoningCountry(e.target.value);
                    setQuotes([]);
                    setShowResults(false);
                  }}
                  className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none appearance-none"
                >
                  <option value="">
                    {destination === "EUROPE"
                      ? "Select European Country"
                      : "Select Country"}
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

            {/* Zipcode (AUS / CAN only) */}
            {requiresZip && (
              <input
                type="text"
                placeholder={`Zipcode / Postcode (required for ${destObj?.label})`}
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
              />
            )}

            {/* Actual weight */}
            <input
              type="number"
              placeholder="Actual Weight (kg)"
              value={actualWt}
              onChange={(e) => setActualWt(e.target.value)}
              min="0.001"
              step="0.001"
              className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
            />

            {/* Dimensions */}
            <div className="flex flex-col gap-1">
              <span className="text-white/80 text-[11px] font-semibold tracking-wide uppercase pl-1">
                Volume Weight Dimensions (cm) — optional
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: length, setter: setLength, label: "Length" },
                  { val: breadth, setter: setBreadth, label: "Breadth" },
                  { val: height, setter: setHeight, label: "Height" },
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

            {/* Live weight preview */}
            {(actualWt || volWt) && (
              <div className="bg-white/20 rounded-xl px-4 py-3 flex justify-between text-white text-xs font-semibold">
                {volWt && <span>Vol wt: {volWt} kg</span>}
                <span>Chargeable: {chargeableWt} kg</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#0b1220] hover:bg-slate-800 text-white font-bold text-[13px] py-3 px-6 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-70"
            >
              {loading ? "Calculating..." : t.hero_get_quote}{" "}
              {!loading && (
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              )}
            </button>
          </form>
        </div>

        {/* Right: Dark Image Card (always visible) or results overlay */}
        <div className="relative rounded-[16px] min-h-[485px] lg:h-auto flex flex-col justify-between">
          {/* ── Results panel (shown after quote) ── */}
          {showResults && quotes.length > 0 ? (
            <div className="bg-[#0b1220] rounded-[16px] h-full flex flex-col p-5 gap-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">
                    {destObj?.label}
                    {zoningCountry && ` — ${zoningCountry}`}
                  </p>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    {quotes.length} service{quotes.length !== 1 ? "s" : ""}{" "}
                    found · Chargeable:{" "}
                    <span className="text-[#e77419] font-semibold">
                      {quotes[0].chargeableWt} kg
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setQuotes([]);
                  }}
                  className="text-zinc-500 hover:text-white transition-colors p-1"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable service list */}
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[380px] pr-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                {quotes.map((q) => {
                  const key = `${q.service}__${q.rateType}`;
                  const isSelected = selectedService === key;
                  const networkColor =
                    NETWORK_COLORS[q.network] ?? "bg-gray-100 text-gray-700";
                  const networkLabel = NETWORK_LABELS[q.network] ?? q.network;

                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedService(key)}
                      className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#e77419] bg-[#e77419]/10"
                          : "border-zinc-700 bg-zinc-800/60 hover:border-zinc-500"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute -top-2 left-3 bg-[#e77419] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          SELECTED
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        {/* Left */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${networkColor}`}
                            >
                              {networkLabel}
                            </span>
                            {q.zone && (
                              <span className="text-[9px] bg-white/10 text-zinc-300 px-1.5 py-0.5 rounded-full font-mono">
                                Zone {q.zone}
                              </span>
                            )}
                            <span className="text-[9px] bg-white/10 text-zinc-300 px-1.5 py-0.5 rounded-full">
                              {q.rateType === "S" ? "Slab" : "Per kg"}
                            </span>
                          </div>
                          <p className="mt-1.5 text-[12px] font-bold text-white leading-tight">
                            {q.service}
                          </p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {q.tat}
                          </p>
                        </div>

                        {/* Right */}
                        <div className="text-right shrink-0">
                          <p className="text-[18px] font-extrabold text-[#e77419] leading-none">
                            ₹{Math.round(q.totalPrice).toLocaleString("en-IN")}
                          </p>
                          <p className="text-[9px] text-zinc-500 mt-0.5">
                            GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-[10px] text-zinc-500 text-center pt-1">
                Final rates may vary · Call{" "}
                <strong className="text-zinc-400">+91 7070-506070</strong> to
                confirm
              </p>
            </div>
          ) : (
            /* ── Original dark image card ── */
            <>
              <div className="absolute inset-0 rounded-[16px] rounded-bl-[18px] overflow-hidden">
                <Image
                  src="/hero-right.jpg"
                  alt="Manvi Legacy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 54.84%)",
                  }}
                />
              </div>

              {/* Top content */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col gap-3">
                <span className="text-[11px] font-bold tracking-wider bg-white/15 text-white/90 border border-white/20 w-fit px-3 py-1 rounded-full">
                  {t.hero_legacy_badge}
                </span>
                <h2 className="text-[30px] sm:text-[34px] md:text-[40px] font-extrabold text-white leading-[1.15] tracking-tight mt-2">
                  {t.hero_legacy_heading}
                  <br />
                  <span className="text-[#f27a1a]">
                    {t.hero_legacy_highlight}
                  </span>
                </h2>
              </div>

              {/* Bottom row */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-end justify-between gap-6 sm:gap-0">
                {/* Cutout corner circle */}
                <div className="absolute -bottom-4 -left-4 w-34 h-34 sm:w-36 sm:h-36 bg-[#f8f9fa] rounded-full flex items-center justify-center pointer-events-none z-20">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#f27a1a] rounded-full relative flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-300 z-50">
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
                  </div>
                </div>

                <div className="w-24 sm:w-32 flex-shrink-0" />

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#f27a1a]" />
                    <div className="w-2 h-2 rounded-full bg-[#f27a1a]" />
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                  </div>
                  <button className="border border-white/50 text-white text-[12px] font-semibold px-5 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    {t.hero_read_more}
                  </button>
                </div>
              </div>
            </>
          )}
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
            className="flex items-center justify-center gap-2 sm:gap-3 bg-[#0b1220] hover:bg-[#f27a1a] rounded-[14px] sm:rounded-2xl text-[12px] sm:text-[14px] font-semibold text-white py-3 sm:py-4 transition-all text-center px-2"
          >
            {tab.icon} <span className="truncate">{tab.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

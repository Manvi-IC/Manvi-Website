"use client";

import { useEffect, useState, useMemo } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Filter,
  TrendingDown,
  Clock,
  Info,
  Loader2,
  LogOut,
  PackageCheck,
  Sparkles,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";
const SESSION_KEY = "manvi_shopkeeper_session";

const DESTINATIONS = [
  { label: "Australia", value: "AUSTRALIA", requiresZip: true, requiresSubCountry: false, flag: "🇦🇺" },
  { label: "Canada", value: "CANADA", requiresZip: true, requiresSubCountry: false, flag: "🇨🇦" },
  { label: "United Kingdom", value: "UK", requiresZip: false, requiresSubCountry: false, flag: "🇬🇧" },
  { label: "Europe", value: "EUROPE", requiresZip: false, requiresSubCountry: true, flag: "🇪🇺" },
  { label: "International", value: "INTERNATIONAL", requiresZip: false, requiresSubCountry: true, flag: "🌍" },
];

const EUROPE_COUNTRIES = [
  "GERMANY","AUSTRIA","BELGIUM","LUXEMBOURGE","NETHERLANDS","CZECH REPUBLIC","DENMARK",
  "LIECHTENSTEIN","FRANCE","MONACO","HUNGARY","ITALY","POLAND","SLOVAKIA","SLOVENIA",
  "SPAIN","IRELAND","PORTUGAL","SWEDEN","ESTONIA","FINLAND","CROATIA","LATVIA",
  "LITHUANIA","BULGARIA","ROMANIA","GREECE","ICELAND",
];

const INTERNATIONAL_COUNTRIES = [
  "USA","BANGLADESH","BHUTAN","MALDIVES","NEPAL","SRI LANKA","UNITED ARAB EMIRATES",
  "HONG KONG","MALAYSIA","SINGAPORE","THAILAND","CHINA, PEOPLE'S REPUBLIC","BAHRAIN",
  "JORDAN","KUWAIT","OMAN","PAKISTAN","QATAR","SAUDI ARABIA","BRUNEI","CAMBODIA",
  "INDONESIA","JAPAN","KOREA, REPUBLIC OF","MACAU","MYANMAR","PHILIPPINES, THE",
  "TAIWAN","VIETNAM","NEW ZEALAND","SOUTH AFRICA","NIGERIA","KENYA","EGYPT","GHANA",
];

const NETWORK_LABELS: Record<string, string> = {
  SELF: "Self Network", ARA: "Aramex", DHL: "DHL", UPS: "UPS", FED: "FedEx",
};

const NETWORK_COLORS: Record<string, string> = {
  SELF: "bg-orange-100 text-orange-700",
  ARA: "bg-purple-100 text-purple-700",
  DHL: "bg-yellow-100 text-yellow-800",
  UPS: "bg-amber-100 text-amber-800",
  FED: "bg-blue-100 text-blue-700",
};

interface Quote {
  service: string; network: string; chargeableWt: number; volWt: number;
  zone: string; rateType: string; totalPrice: number; tat: string;
}

type FilterType = "all" | "cheapest" | "fastest";

export default function ShopkeeperBulkRatesPage() {
  const [shopkeeper, setShopkeeper] = useState<any>(null);
  const [ready, setReady] = useState(false);

  const [destination, setDestination] = useState("");
  const [zoningCountry, setZoningCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [actualWt, setActualWt] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) { window.location.href = "/shopkeeper"; return; }
      setShopkeeper(JSON.parse(raw));
      setReady(true);
    } catch {
      window.location.href = "/shopkeeper";
    }
  }, []);

  const handleLogout = () => {
    try { localStorage.removeItem(SESSION_KEY); } catch {}
    window.location.href = "/shopkeeper";
  };

  const destObj = DESTINATIONS.find((d) => d.value === destination);
  const requiresZip = destObj?.requiresZip ?? false;
  const requiresSubCountry = destObj?.requiresSubCountry ?? false;
  const subCountryOptions = destination === "EUROPE" ? EUROPE_COUNTRIES : INTERNATIONAL_COUNTRIES;

  const volWt = parseFloat(length) && parseFloat(breadth) && parseFloat(height)
    ? ((parseFloat(length) * parseFloat(breadth) * parseFloat(height)) / 5000).toFixed(2)
    : null;
  const chargeableWt = volWt
    ? Math.ceil(Math.max(parseFloat(actualWt) || 0, parseFloat(volWt)))
    : Math.ceil(parseFloat(actualWt) || 0);

  const getTATDays = (tat: string) => {
    const m = tat.match(/(\d+)/);
    return m ? parseInt(m[0]) : 999;
  };

  const displayedQuotes = useMemo<Quote[]>(() => {
    const arr = [...quotes];
    if (filter === "cheapest") arr.sort((a, b) => a.totalPrice - b.totalPrice);
    else if (filter === "fastest") arr.sort((a, b) => getTATDays(a.tat) - getTATDays(b.tat));
    return arr;
  }, [quotes, filter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!destination || !actualWt) return setFormError("Please select a destination and enter actual weight.");
    if (requiresZip && !zipcode.trim()) return setFormError("Please enter the zipcode/postcode.");
    if (requiresSubCountry && !zoningCountry) return setFormError("Please select a specific country.");

    setLoading(true);
    setQuotes([]);
    try {
      const params = new URLSearchParams({ actualWt, country: destination });
      if (length) params.append("length", length);
      if (breadth) params.append("breadth", breadth);
      if (height) params.append("height", height);
      if (zipcode) params.append("zipcode", zipcode);
      if (zoningCountry) params.append("zoningCountry", zoningCountry);
      const res = await fetch(`${API_URL}/shopkeeper/rates/quote?${params}`, {
        headers: { "x-database": DB_NAME },
      });
      const data = await res.json();
      if (data.success && data.quotes?.length > 0) setQuotes(data.quotes);
      else setFormError(data.message || "No bulk rates available for this combination.");
    } catch (err: any) {
      setFormError("Failed to fetch bulk rates: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!ready || !shopkeeper) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="animate-spin text-[#f27a1a]" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans antialiased">
      {/* ── Banner (styled like get-quote) ── */}
      <section className="relative bg-[#0D1527] overflow-hidden py-12 px-6">
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('/banner.jpg')` }}
        />
        <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-3 min-w-0">
            <div className="flex items-center gap-2 text-[12px] font-semibold text-white/50">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span className="text-white/30">/</span>
              <span className="text-white">Bulk Rates</span>
            </div>
            <h1 className="text-[32px] md:text-[40px] font-extrabold text-white leading-tight tracking-tight">
              Exclusive <span className="text-[#f27a1a]">Bulk Rates</span>
            </h1>
            <p className="text-white/70 text-sm max-w-xl">
              Welcome back, <span className="text-white font-semibold">{shopkeeper.name}</span>.
              Get your exclusive shopkeeper pricing across every major carrier.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex flex-col items-end gap-0.5 text-right">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                Signed in as
              </p>
              <p className="text-white text-[13px] font-bold truncate max-w-[220px]">
                {shopkeeper.company || shopkeeper.email}
              </p>
              <p className="text-white/50 text-[11px]">
                GSTIN: <span className="text-[#f27a1a] font-semibold">{shopkeeper.gstin}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-[12px] font-bold text-white/80 hover:text-white border border-white/20 hover:border-white/50 rounded-full px-4 py-2 transition-all"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-[1400px] w-full mx-auto px-6 py-12">
        {/* ── Two-column grid with equal-height panels ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Bulk rate form */}
          <div className="lg:col-span-5 bg-[#eef0f5] rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col h-full">
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 border border-orange-300/80 text-[#f27a1a] bg-orange-50/50 rounded-full px-4 py-1 text-[11px] font-extrabold w-fit tracking-wide">
                <Sparkles size={12} strokeWidth={2.5} />
                Exclusive Bulk Pricing
              </div>
              <h2 className="text-[28px] md:text-[32px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                Get your exclusive rate
              </h2>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                Fill in your shipment details and unlock the bulk rates available only to logged-in shopkeepers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
              {/* Destination */}
              <div className="relative">
                <select
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setZipcode("");
                    setZoningCountry("");
                    setQuotes([]);
                    setFormError("");
                  }}
                  className={`w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none appearance-none border border-gray-200 shadow-sm cursor-pointer ${
                    destination ? "" : "text-gray-400"
                  }`}
                >
                  <option value="">Select destination country</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.flag} {d.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {requiresSubCountry && (
                <div className="relative">
                  <select
                    value={zoningCountry}
                    onChange={(e) => {
                      setZoningCountry(e.target.value);
                      setQuotes([]);
                      setFormError("");
                    }}
                    className={`w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none appearance-none border border-gray-200 shadow-sm cursor-pointer ${
                      zoningCountry ? "" : "text-gray-400"
                    }`}
                  >
                    <option value="">
                      {destination === "EUROPE" ? "Select European country" : "Select country"}
                    </option>
                    {subCountryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              )}

              {requiresZip && (
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                  placeholder={`Zipcode / Postcode (required for ${destObj?.label})`}
                  className="w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
                />
              )}

              <input
                type="number"
                min="0.001"
                step="0.001"
                value={actualWt}
                onChange={(e) => setActualWt(e.target.value)}
                placeholder="Actual weight (kg)"
                className="w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
              />

              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-gray-500 font-semibold tracking-wide uppercase">
                  Volume weight dimensions (cm) — Optional
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: length, setter: setLength, ph: "Length" },
                    { val: breadth, setter: setBreadth, ph: "Breadth" },
                    { val: height, setter: setHeight, ph: "Height" },
                  ].map(({ val, setter, ph }) => (
                    <input
                      key={ph}
                      type="number"
                      min="0"
                      value={val}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={ph}
                      className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {(actualWt || volWt) && (
                <div className="bg-orange-50 rounded-xl px-4 py-3 flex justify-between text-gray-700 text-xs font-semibold border border-orange-200/50">
                  {volWt && <span>Vol. weight: {volWt} kg</span>}
                  <span>Chargeable: {chargeableWt} kg</span>
                </div>
              )}

              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span> {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#f27a1a] hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-[14px] py-4 px-6 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Calculating…
                  </>
                ) : (
                  <>
                    Get bulk rate <ArrowUpRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Results panel */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full">
            {displayedQuotes.length === 0 && !loading && (
              <div className="bg-[#eef0f5] rounded-[28px] p-6 sm:p-8 lg:p-14 flex flex-col items-center justify-center text-center gap-4 flex-1 shadow-sm border border-gray-200/50">
                <PackageCheck size={56} className="text-gray-300" />
                <div>
                  <p className="text-[#1c1f2e] font-bold text-lg">
                    Your bulk rates will appear here
                  </p>
                  <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
                    Fill the form to see your exclusive shopkeeper pricing across every major carrier.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-[#eef0f5] rounded-[28px] p-6 sm:p-8 lg:p-14 flex flex-col items-center justify-center gap-4 flex-1 shadow-sm border border-gray-200/50">
                <Loader2 size={44} className="text-[#f27a1a] animate-spin" />
                <p className="text-gray-600 text-sm font-medium">
                  Fetching your exclusive rates…
                </p>
              </div>
            )}

            {displayedQuotes.length > 0 && (
              <>
                {/* Summary Card */}
                <div className="bg-[#0D1527] rounded-2xl px-6 py-5 flex flex-wrap gap-4 text-white shadow-sm">
                  <div className="flex-1 min-w-[120px]">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Destination</p>
                    <p className="font-bold text-sm">
                      {destObj?.label ?? destination}
                      {zoningCountry && ` — ${zoningCountry}`}
                    </p>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Actual Wt</p>
                    <p className="font-bold text-sm">{actualWt} kg</p>
                  </div>
                  {volWt && (
                    <div className="flex-1 min-w-[100px]">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Vol Wt</p>
                      <p className="font-bold text-sm">{volWt} kg</p>
                    </div>
                  )}
                  <div className="flex-1 min-w-[120px]">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Chargeable Wt</p>
                    <p className="font-bold text-sm text-[#f27a1a]">{chargeableWt} kg</p>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Services</p>
                    <p className="font-bold text-sm">{quotes.length}</p>
                  </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Filter size={13} className="text-gray-400" />
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      Sort by
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {(["all", "cheapest", "fastest"] as FilterType[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                          filter === f
                            ? "bg-[#f27a1a] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#f27a1a]"
                        }`}
                      >
                        {f === "cheapest" && <TrendingDown size={12} />}
                        {f === "fastest" && <Clock size={12} />}
                        {f === "all" ? "Default" : f === "cheapest" ? "Cheapest" : "Fastest"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Cards */}
                <div className="flex flex-col gap-3">
                  {displayedQuotes.map((q, idx) => {
                    const networkLabel = NETWORK_LABELS[q.network] ?? q.network;
                    const networkColor = NETWORK_COLORS[q.network] ?? "bg-gray-100 text-gray-700";
                    const dutyPaid = q.network === "SELF";
                    return (
                      <div
                        key={`${q.service}__${q.rateType}__${idx}`}
                        className="relative rounded-2xl border-2 border-gray-200 bg-white p-5 transition-all hover:border-orange-300 hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${networkColor}`}>
                                {q.service}
                              </span>
                              {q.zone && (
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                                  Zone {q.zone}
                                </span>
                              )}
                              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                {q.rateType === "S" ? "Slab" : "Per kg"}
                              </span>
                              {dutyPaid ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                  ✓ Duty Paid
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                                  Duty Unpaid
                                </span>
                              )}
                            </div>

                            <p className="mt-2 text-xl font-bold text-gray-800 leading-tight">
                              {networkLabel}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{q.tat}</p>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="text-2xl font-extrabold text-[#f27a1a]">
                              ₹{Math.round(q.totalPrice).toLocaleString("en-IN")}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">GST Inclusive</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-base sm:text-lg text-gray-600 text-center px-4 font-medium leading-relaxed">
                  Final rates may vary · Call +91 70 70 50 60 70 to confirm
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
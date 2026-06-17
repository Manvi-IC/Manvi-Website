"use client";
import { useState, FormEvent } from "react";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Loader2,
  PackageCheck,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

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

const FAQS = [
  {
    id: "01",
    q: "How is the shipping cost calculated?",
    a: "We compare actual weight vs volumetric weight (L × B × H ÷ 5000) and charge the higher one. The rate is applied per kg or as a slab depending on the service.",
  },
  {
    id: "02",
    q: "Why do Australia and Canada need a zipcode?",
    a: "These countries have zone-based pricing that depends on the exact delivery area. Your zipcode/postcode determines which zone applies and hence the rate.",
  },
  {
    id: "03",
    q: "What is the difference between Slab and Per-kg rates?",
    a: "Slab rate (S) is a flat fixed amount for the entire weight bracket — you pay that amount regardless of exact weight. Per-kg rate (B) is multiplied by your chargeable weight.",
  },
  {
    id: "04",
    q: "Are the prices shown inclusive of GST?",
    a: "Yes. All rates shown are GST-inclusive. Final invoiced amount may vary based on fuel surcharge, destination surcharge, or customs duties.",
  },
  {
    id: "05",
    q: "Can I track my shipment after booking?",
    a: "Yes. Once booked via the portal, you'll receive an AWB number and can track in real-time through our tracking page.",
  },
];

interface Quote {
  service: string;
  network: string;
  chargeableWt: number;
  actualWt: number;
  volWt: number;
  zone: string;
  rateType: string;
  totalPrice: number;
  tat: string;
}

interface QuoteResult {
  chargeableWt: number;
  actualWt: number;
  volWt: number;
  country: string;
  zipcode: string | null;
  quotes: Quote[];
}

function fmtPrice(n: number): string {
  return Math.round(n).toLocaleString("en-IN");
}

function ServiceCard({
  quote,
  selected,
  onSelect,
}: {
  quote: Quote;
  selected: boolean;
  onSelect: (val: string) => void;
}) {
  const networkColor =
    NETWORK_COLORS[quote.network] ?? "bg-gray-100 text-gray-700";
  const networkLabel = NETWORK_LABELS[quote.network] ?? quote.network;
  const labelKey = `${quote.service}__${quote.rateType}`;
  const dutyPaid = quote.network === "SELF";

  return (
    <div
      onClick={() => onSelect(labelKey)}
      className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all ${
        selected
          ? "border-[#f27a1a] bg-orange-50 shadow-md"
          : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm"
      }`}
    >
      {selected && (
        <div className="absolute -top-2.5 left-4 bg-[#f27a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          SELECTED
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${networkColor}`}
            >
              {networkLabel}
            </span>
            {quote.zone && (
              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                Zone {quote.zone}
              </span>
            )}
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {quote.rateType === "S" ? "Slab rate" : "Per kg"}
            </span>
            {dutyPaid ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                <CheckCircle2 size={9} strokeWidth={2.5} />
                DUTY PAID
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                <AlertCircle size={9} strokeWidth={2.5} />
                DUTY UNPAID
              </span>
            )}
          </div>

          <p className="mt-2 text-sm font-bold text-gray-800 leading-tight">
            {quote.service}
          </p>
          <p className="text-xs text-gray-500 mt-1">{quote.tat}</p>

          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
            <span>
              Chargeable:{" "}
              <strong className="text-gray-700">{quote.chargeableWt} kg</strong>
            </span>
            {quote.volWt > 0 && (
              <span>
                Vol wt: <strong>{quote.volWt} kg</strong>
              </span>
            )}
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-2xl font-extrabold text-[#f27a1a]">
            ₹{fmtPrice(quote.totalPrice)}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">GST inclusive</p>
        </div>
      </div>
    </div>
  );
}

export default function GetQuote() {
  const [actualWt, setActualWt] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [destination, setDestination] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [zoningCountry, setZoningCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>("01");

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

  const handleGetQuote = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setSelectedService(null);

    if (!actualWt || !destination) {
      setError("Please enter actual weight and select a destination.");
      return;
    }
    if (requiresZip && !zipcode.trim()) {
      setError(`Please enter the zipcode / postcode for ${destObj?.label}.`);
      return;
    }
    if (requiresSubCountry && !zoningCountry) {
      setError(`Please select a specific country within ${destObj?.label}.`);
      return;
    }

    setLoading(true);
    try {
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

      if (!data.success) throw new Error(data.message || "Failed to get quote");
      if (data.quotes.length === 0)
        throw new Error(
          "No services available for this destination / weight combination.",
        );

      setResult(data);
      const first = data.quotes[0];
      setSelectedService(`${first.service}__${first.rateType}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      {/* Banner Section - Same as Track Shipment */}
      <section className="relative bg-[#0b1220] overflow-hidden min-h-55 flex items-center py-12 px-6">
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('/banner.jpg')` }}
        />
        <div className="max-w-425 w-full mx-auto flex flex-col relative z-10 gap-3">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-white/50">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <span className="text-white/30">/</span>
            <span className="text-white">Get Quote</span>
          </div>
          <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
            Get a Quote
          </h1>
          <p className="text-white/70 text-sm max-w-md">
            Enter your shipment details to instantly compare services and rates.
          </p>
        </div>
      </section>

      <main className="flex-grow max-w-425 w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Quote form - Same styling as Track Shipment form */}
          <div className="lg:col-span-5 bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col">
            <div className="flex flex-col gap-5">
              <div className="border border-orange-300/80 text-[#f27a1a] bg-orange-50/50 rounded-full px-4 py-1 text-[11px] font-extrabold w-fit tracking-wide">
                INSTANT ESTIMATE
              </div>
              <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                CONNECTING FAMILIES,
                <br />
                BRIDGING DISTANCES.
              </h2>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                Send documents, parcels, gifts, or commercial shipments
                worldwide.
              </p>
            </div>

            <form
              onSubmit={handleGetQuote}
              className="flex flex-col gap-4 mt-6"
            >
              {/* Destination */}
              <div className="relative">
                <select
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setZipcode("");
                    setZoningCountry("");
                    setResult(null);
                    setError("");
                  }}
                  className="w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none appearance-none border border-gray-200 shadow-sm"
                >
                  <option value="">Select Destination</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.flag} {d.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Sub-country (EUROPE / INTERNATIONAL) */}
              {requiresSubCountry && (
                <div className="relative">
                  <select
                    value={zoningCountry}
                    onChange={(e) => {
                      setZoningCountry(e.target.value);
                      setResult(null);
                      setError("");
                    }}
                    className="w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none appearance-none border border-gray-200 shadow-sm"
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
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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
                  className="w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
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
                className="w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
              />

              {/* Dimensions */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-gray-500 font-semibold tracking-wide uppercase">
                  Volume Weight Dimensions (cm) — optional
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      { val: length, setter: setLength, label: "Length" },
                      { val: breadth, setter: setBreadth, label: "Breadth" },
                      { val: height, setter: setHeight, label: "Height" },
                    ] as const
                  ).map(({ val, setter, label }) => (
                    <input
                      key={label}
                      type="number"
                      placeholder={label}
                      value={val}
                      onChange={(e) => setter(e.target.value)}
                      min="0"
                      className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-4 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Live weight preview */}
              {(actualWt || volWt) && (
                <div className="bg-orange-50 rounded-xl px-4 py-3 flex justify-between text-gray-700 text-xs font-semibold border border-orange-200/50">
                  {volWt && <span>Vol wt: {volWt} kg</span>}
                  <span>Chargeable: {chargeableWt} kg</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#f27a1a] hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-[14px] py-4 px-6 rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Calculating…
                  </>
                ) : (
                  <>
                    Get Quote <ArrowUpRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Results - Updated styling */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {!result && !loading && (
              <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-14 flex flex-col items-center justify-center text-center gap-4 min-h-80 shadow-sm border border-gray-200/50">
                <PackageCheck size={56} className="text-gray-300" />
                <div>
                  <p className="text-[#1c1f2e] font-bold text-lg">
                    Your quotes will appear here
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Fill in the form and click "Get Quote" to compare services
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-14 flex flex-col items-center justify-center gap-4 min-h-80 shadow-sm border border-gray-200/50">
                <Loader2 size={44} className="text-[#f27a1a] animate-spin" />
                <p className="text-gray-600 text-sm font-medium">
                  Fetching rates from all carriers…
                </p>
              </div>
            )}

            {result && (
              <>
                {/* Summary Card - Same style as Track Shipment */}
                <div className="bg-[#0b1220] rounded-2xl px-6 py-5 flex flex-wrap gap-4 text-white shadow-sm">
                  <div className="flex-1 min-w-[120px]">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      Destination
                    </p>
                    <p className="font-bold text-sm">
                      {destObj?.label ?? result.country}
                      {zoningCountry && ` — ${zoningCountry}`}
                    </p>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      Actual Wt
                    </p>
                    <p className="font-bold text-sm">{result.actualWt} kg</p>
                  </div>
                  {result.volWt > 0 && (
                    <div className="flex-1 min-w-[100px]">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                        Vol Wt
                      </p>
                      <p className="font-bold text-sm">{result.volWt} kg</p>
                    </div>
                  )}
                  <div className="flex-1 min-w-[120px]">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      Chargeable Wt
                    </p>
                    <p className="font-bold text-sm text-[#f27a1a]">
                      {result.chargeableWt} kg
                    </p>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      Services Found
                    </p>
                    <p className="font-bold text-sm">{result.quotes.length}</p>
                  </div>
                </div>

                {/* Service Cards */}
                <div className="flex flex-col gap-3">
                  {result.quotes.map((quote) => {
                    const key = `${quote.service}__${quote.rateType}`;
                    return (
                      <ServiceCard
                        key={key}
                        quote={quote}
                        selected={selectedService === key}
                        onSelect={setSelectedService}
                      />
                    );
                  })}
                </div>

                <p className="text-xs text-gray-400 text-center px-4">
                  * All rates are GST-inclusive. Final amounts may vary based on
                  fuel surcharge, customs, and destination surcharges. Call{" "}
                  <strong className="text-gray-600">+91 7070-506070</strong> to
                  confirm.
                </p>
              </>
            )}
          </div>
        </div>

        {/* HOW CALCULATED - Updated styling */}
        <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-12 shadow-sm border border-gray-200/50 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-3 mb-2">
              <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                How Is Your Quote Calculated?
              </h2>
            </div>
            {[
              {
                n: "1",
                title: "Chargeable Weight",
                desc: "We use the higher of actual weight vs volumetric weight (L × B × H ÷ 5000), rounded up to the nearest kg.",
              },
              {
                n: "2",
                title: "Service & Zone",
                desc: "For Australia/Canada your postcode determines the delivery zone. Europe and International destinations use country-based zone mapping.",
              },
              {
                n: "3",
                title: "Rate Application",
                desc: "Slab rates (S) are flat amounts per weight bracket. Per-kg rates (B) are multiplied by your chargeable weight. All rates are GST-inclusive.",
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f27a1a] text-white text-xs font-bold shrink-0 mt-0.5">
                  {n}
                </span>
                <div>
                  <span className="font-bold text-[#1c1f2e] block mb-1 text-sm">
                    {title}
                  </span>
                  <span className="text-xs text-gray-500 leading-relaxed">
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ - Updated styling to match Track Shipment */}
        <div className="bg-[#eef0f5] rounded-4xl p-8 sm:p-10 lg:p-14 shadow-sm border border-gray-200/50 flex flex-col items-center gap-8 mt-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="border border-orange-300/80 text-[#f27a1a] bg-orange-50/50 rounded-full px-4 py-1 text-[11px] font-extrabold tracking-wide">
              Got Questions?
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="w-full flex flex-col">
            {FAQS.map((faq, idx) => (
              <div
                key={faq.id}
                className={`border-b border-gray-200/80 ${idx === 0 ? "border-t" : ""}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full grid grid-cols-[auto_1fr_auto] gap-6 items-start py-6 text-left group"
                >
                  <span className="text-[#f27a1a] text-[12px] font-black tracking-widest pt-0.5">
                    {faq.id}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span
                      className={`text-[16px] font-bold transition-colors ${openFaq === faq.id ? "text-[#1c1f2e]" : "text-[#333b49] group-hover:text-[#1c1f2e]"}`}
                    >
                      {faq.q}
                    </span>
                    {openFaq === faq.id && (
                      <p className="text-[13px] text-gray-500 font-medium leading-relaxed pr-4">
                        {faq.a}
                      </p>
                    )}
                  </div>
                  <div className="pt-0.5 shrink-0">
                    {openFaq === faq.id ? (
                      <Minus
                        className="w-5 h-5 text-[#1c1f2e]"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Plus
                        className="w-5 h-5 text-[#1c1f2e] group-hover:scale-110 transition-transform"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

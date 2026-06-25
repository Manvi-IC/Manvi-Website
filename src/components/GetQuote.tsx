// app/get-quote/page.tsx
"use client";
import { useState, useEffect, FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Loader2,
  PackageCheck,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  User,
  Phone,
  Mail,
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

// Currency config
const SUPPORTED_CURRENCIES = [
  "INR",
  "CAD",
  "AUD",
  "USD",
  "GBP",
  "EUR",
] as const;
type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  INR: "₹",
  CAD: "CA$",
  AUD: "A$",
  USD: "US$",
  GBP: "£",
  EUR: "€",
};

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

// ─── Apply Now Modal ──────────────────────────────────────────────────────────
function ApplyModal({
  open,
  onClose,
  quote,
  result,
  destination,
  zoningCountry,
  zipcode,
  actualWt,
  volWt,
  length,
  breadth,
  height,
  destObj,
  convertPrice,
}: {
  open: boolean;
  onClose: () => void;
  quote: Quote | null;
  result: QuoteResult | null;
  destination: string;
  zoningCountry: string;
  zipcode: string;
  actualWt: string;
  volWt: string | null;
  length: string;
  breadth: string;
  height: string;
  destObj: (typeof DESTINATIONS)[0] | undefined;
  convertPrice: (inrAmount: number) => string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open || !quote || !result) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/quote-enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-database": DB_NAME,
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          destination,
          zoningCountry,
          zipcode,
          actualWt: parseFloat(actualWt) || 0,
          volWt: parseFloat(volWt ?? "0") || 0,
          chargeableWt: result.chargeableWt,
          length: parseFloat(length) || 0,
          breadth: parseFloat(breadth) || 0,
          height: parseFloat(height) || 0,
          service: quote.service,
          network: quote.network,
          zone: quote.zone,
          rateType: quote.rateType,
          totalPrice: quote.totalPrice,
          tat: quote.tat,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Submission failed");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setEmail("");
    setError("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#0D1527] px-6 py-5 flex items-start justify-between">
          <div>
            <p className="text-[#f27a1a] text-[11px] font-extrabold tracking-widest uppercase mb-1">
              Confirm Your Interest
            </p>
            <h3 className="text-white font-extrabold text-lg leading-tight">
              Apply Now
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-white/50 hover:text-white transition-colors mt-0.5"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-12 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <div>
              <p className="font-extrabold text-[#1c1f2e] text-lg">
                Enquiry Submitted!
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Our team will reach out to you shortly.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="mt-2 bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-sm py-3 px-8 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Selected Service Summary */}
            <div className="bg-orange-50 border-b border-orange-100 px-6 py-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">
                Selected Service
              </p>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#1c1f2e]">
                    {quote.service}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {destObj?.flag} {destObj?.label ?? destination}
                    {zoningCountry && ` — ${zoningCountry}`}
                    {zipcode && ` · ${zipcode}`}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{quote.tat}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-extrabold text-[#f27a1a]">
                    {convertPrice(quote.totalPrice)}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {result.chargeableWt} kg chargeable
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="px-6 py-5 flex flex-col gap-4"
            >
              <p className="text-sm text-gray-500 font-medium">
                Fill in your details and our team will contact you to finalise
                the shipment.
              </p>

              {/* Name */}
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f8f9fa] text-[#333] text-sm font-medium rounded-xl pl-10 pr-4 py-3.5 focus:outline-none border border-gray-200 placeholder:text-gray-400 focus:border-orange-300 transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#f8f9fa] text-[#333] text-sm font-medium rounded-xl pl-10 pr-4 py-3.5 focus:outline-none border border-gray-200 placeholder:text-gray-400 focus:border-orange-300 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f8f9fa] text-[#333] text-sm font-medium rounded-xl pl-10 pr-4 py-3.5 focus:outline-none border border-gray-200 placeholder:text-gray-400 focus:border-orange-300 transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-[#f27a1a] hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2 mt-1"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    Submit Enquiry <Send size={15} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  quote,
  selected,
  onSelect,
  t,
  convertPrice,
}: {
  quote: Quote;
  selected: boolean;
  onSelect: (val: string) => void;
  t: any;
  convertPrice: (inrAmount: number) => string;
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
          {t.form_selected}
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${networkColor}`}
            >
              {quote.service}
            </span>
            {quote.zone && (
              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                {t.form_zone} {quote.zone}
              </span>
            )}
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {quote.rateType === "S" ? t.form_slab : t.form_per_kg}
            </span>
            {dutyPaid ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                <CheckCircle2 size={9} strokeWidth={2.5} />
                {t.form_duty_paid}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                <AlertCircle size={9} strokeWidth={2.5} />
                {t.form_duty_unpaid}
              </span>
            )}
          </div>

          <p className="mt-2 text-xl font-bold text-gray-800 leading-tight">
            {networkLabel}
          </p>
          <p className="text-xs text-gray-500 mt-1">{quote.tat}</p>

          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
            <span>
              {t.form_chargeable}{" "}
              <strong className="text-gray-700">{quote.chargeableWt} kg</strong>
            </span>
            {quote.volWt > 0 && (
              <span>
                {t.form_vol_wt} <strong>{quote.volWt} kg</strong>
              </span>
            )}
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-2xl font-extrabold text-[#f27a1a]">
            {convertPrice(quote.totalPrice)}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">{t.form_gst_inc}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GetQuote() {
  const { t } = useLanguage();
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
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // ── Currency converter state ──────────────────────────────────────────────
  const [currency, setCurrency] = useState<SupportedCurrency>("INR");
  const [rates, setRates] = useState<Record<string, number>>({ INR: 1 });
  const [ratesLoading, setRatesLoading] = useState(false);

  useEffect(() => {
    if (currency === "INR") return;
    setRatesLoading(true);
    fetch("https://api.exchangerate-api.com/v4/latest/INR")
      .then((r) => r.json())
      .then((d) => setRates(d.rates ?? {}))
      .catch(() => {})
      .finally(() => setRatesLoading(false));
  }, [currency]);

  // ── Price conversion helper ───────────────────────────────────────────────
  function convertPrice(inrAmount: number): string {
    if (currency === "INR") return `₹${fmtPrice(inrAmount)}`;
    const converted = inrAmount * (rates[currency] ?? 1);
    const sym = CURRENCY_SYMBOLS[currency];
    return `${sym}${converted.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })}`;
  }

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

  const selectedQuote =
    result?.quotes.find(
      (q) => `${q.service}__${q.rateType}` === selectedService,
    ) ?? null;

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
      console.error("GetQuote handler error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      {/* Apply Now Modal */}
      <ApplyModal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        quote={selectedQuote}
        result={result}
        destination={destination}
        zoningCountry={zoningCountry}
        zipcode={zipcode}
        actualWt={actualWt}
        volWt={volWt}
        length={length}
        breadth={breadth}
        height={height}
        destObj={destObj}
        convertPrice={convertPrice}
      />

      {/* Banner Section */}
      <section className="relative bg-[#0D1527] overflow-hidden min-h-55 flex items-center py-12 px-6">
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
            <span className="text-white">{t.quote_banner_title}</span>
          </div>
          <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
            {t.quote_banner_title}
          </h1>
          <p className="text-white/70 text-sm max-w-md">{t.quote_banner_sub}</p>
        </div>
      </section>

      <main className="flex-grow max-w-425 w-full mx-auto px-6 py-12">
        {/* ── Two-column grid — items-stretch makes both panels equal height ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Quote form */}
          <div className="lg:col-span-5 bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col h-full">
            <div className="flex flex-col gap-5">
              <div className="border border-orange-300/80 text-[#f27a1a] bg-orange-50/50 rounded-full px-4 py-1 text-[11px] font-extrabold w-fit tracking-wide">
                {t.quote_instant_est}
              </div>
              <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                {t.quote_heading}
              </h2>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                {t.quote_subheading}
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
                  <option value="">{t.form_select_dest}</option>
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

              {/* Sub-country */}
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
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              )}

              {/* Zipcode */}
              {requiresZip && (
                <input
                  type="text"
                  placeholder={`${t.form_zipcode} (required for ${destObj?.label})`}
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                  className="w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
                />
              )}

              {/* Actual weight */}
              <input
                type="number"
                placeholder={t.form_actual_wt}
                value={actualWt}
                onChange={(e) => setActualWt(e.target.value)}
                min="0.001"
                step="0.001"
                className="w-full bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
              />

              {/* Dimensions */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-gray-500 font-semibold tracking-wide uppercase">
                  {t.form_vol_wt_dim}
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      { val: length, setter: setLength, label: t.form_length },
                      {
                        val: breadth,
                        setter: setBreadth,
                        label: t.form_breadth,
                      },
                      { val: height, setter: setHeight, label: t.form_height },
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
                    <Loader2 size={18} className="animate-spin" />{" "}
                    {t.form_calculating}
                  </>
                ) : (
                  <>
                    {t.hero_get_quote}{" "}
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Results — h-full ensures it matches left panel height */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full">
            {!result && !loading && (
              <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-14 flex flex-col items-center justify-center text-center gap-4 flex-1 shadow-sm border border-gray-200/50">
                <PackageCheck size={56} className="text-gray-300" />
                <div>
                  <p className="text-[#1c1f2e] font-bold text-lg">
                    {t.quote_empty_title}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {t.quote_empty_sub}
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-14 flex flex-col items-center justify-center gap-4 flex-1 shadow-sm border border-gray-200/50">
                <Loader2 size={44} className="text-[#f27a1a] animate-spin" />
                <p className="text-gray-600 text-sm font-medium">
                  {t.quote_loading_msg}
                </p>
              </div>
            )}

            {result && (
              <>
                {/* Summary Card */}
                <div className="bg-[#0D1527] rounded-2xl px-6 py-5 flex flex-wrap gap-4 text-white shadow-sm">
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
                      {t.form_services_found}
                    </p>
                    <p className="font-bold text-sm">{result.quotes.length}</p>
                  </div>
                </div>

                {/* ── Currency Converter ─────────────────────────────────────── */}
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      Show prices in
                    </span>
                    {ratesLoading && (
                      <Loader2
                        size={13}
                        className="animate-spin text-[#f27a1a]"
                      />
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {SUPPORTED_CURRENCIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
                          currency === c
                            ? "bg-[#f27a1a] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#f27a1a]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
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
                        t={t}
                        convertPrice={convertPrice}
                      />
                    );
                  })}
                </div>

                {/* Apply Now Button — shown when a service is selected */}
                {selectedService && selectedQuote && (
                  <div className="bg-white rounded-2xl border-2 border-[#f27a1a] p-5 flex items-center justify-between gap-4 shadow-sm">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Ready to ship with
                      </p>
                      <p className="text-sm font-extrabold text-[#1c1f2e] mt-0.5 leading-tight">
                        {selectedQuote.service}
                      </p>
                      <p className="text-[#f27a1a] font-extrabold text-lg mt-0.5">
                        {convertPrice(selectedQuote.totalPrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => setApplyModalOpen(true)}
                      className="shrink-0 bg-[#f27a1a] hover:bg-orange-600 text-white font-extrabold text-sm py-3.5 px-7 rounded-xl transition-all active:scale-98 flex items-center gap-2 shadow-md shadow-orange-200"
                    >
                      Apply Now <ArrowUpRight size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                )}

                <p className="text-xs text-gray-400 text-center px-4">
                  {t.form_final_rates_msg}
                </p>
              </>
            )}
          </div>
        </div>

        {/* HOW CALCULATED */}
        <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-12 shadow-sm border border-gray-200/50 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-3 mb-2">
              <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                {t.quote_how_calc_title}
              </h2>
            </div>
            {[
              {
                n: "1",
                title: t.quote_how_calc_1_title,
                desc: t.quote_how_calc_1_desc,
              },
              {
                n: "2",
                title: t.quote_how_calc_2_title,
                desc: t.quote_how_calc_2_desc,
              },
              {
                n: "3",
                title: t.quote_how_calc_3_title,
                desc: t.quote_how_calc_3_desc,
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

        {/* FAQ */}
        <div className="bg-[#eef0f5] rounded-4xl p-8 sm:p-10 lg:p-14 shadow-sm border border-gray-200/50 flex flex-col items-center gap-8 mt-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="border border-orange-300/80 text-[#f27a1a] bg-orange-50/50 rounded-full px-4 py-1 text-[11px] font-extrabold tracking-wide">
              {t.quote_faq_badge}
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
              {t.quote_faq_title}
            </h2>
          </div>
          <div className="w-full flex flex-col">
            {[
              { id: "01", q: t.faq_q1, a: t.faq_a1 },
              { id: "02", q: t.faq_q2, a: t.faq_a2 },
              { id: "03", q: t.faq_q3, a: t.faq_a3 },
              { id: "04", q: t.faq_q4, a: t.faq_a4 },
              { id: "05", q: t.faq_q5, a: t.faq_a5 },
            ].map((faq, idx) => (
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
                      className={`text-[16px] font-bold transition-colors ${
                        openFaq === faq.id
                          ? "text-[#1c1f2e]"
                          : "text-[#333b49] group-hover:text-[#1c1f2e]"
                      }`}
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

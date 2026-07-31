// app/campaign/page.tsx
"use client";
import {
  ArrowUpRight,
  MapPin,
  Receipt,
  Phone,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle,
  Filter,
  TrendingDown,
  Clock,
  Info,
  Loader2,
  Send,
  User,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "@/context/LanguageContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

// ─── DATA ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "1",
    titleKey: "campaign_step1_title",
    descKey: "campaign_step1_desc",
  },
  {
    num: "2",
    titleKey: "campaign_step2_title",
    descKey: "campaign_step2_desc",
  },
  {
    num: "3",
    titleKey: "campaign_step3_title",
    descKey: "campaign_step3_desc",
  },
  {
    num: "4",
    titleKey: "campaign_step4_title",
    descKey: "campaign_step4_desc",
  },
];

const PICKUP_CITIES = [
  "Punjab",
  "Delhi NCR",
  "Haryana",
  "Rajasthan",
  "Gujarat",
  "Mumbai",
];

const DESTINATIONS_LIST = ["Australia", "Canada", "UK", "USA", "EUROPE"];

const PARTNERS = ["Aramex", "Courier Please", "DHL", "DPD", "FedEx", "UPS"];

const STATS = [
  { valueKey: "campaign_stat1_value", labelKey: "campaign_stat1_label" },
  { valueKey: "campaign_stat2_value", labelKey: "campaign_stat2_label" },
  { valueKey: "campaign_stat3_value", labelKey: "campaign_stat3_label" },
  { valueKey: "campaign_stat4_value", labelKey: "campaign_stat4_label" },
];

const FAQS = [
  { num: "01", qKey: "faq_q1", aKey: "faq_a1" },
  {
    num: "02",
    qKey: "faq_q2",
    aKey: "faq_a2",
    linkKey: "faq_q2_link",
    afterLinkKey: "faq_q2_after",
  },
  { num: "03", qKey: "faq_q3", aKey: "faq_a3" },
  { num: "04", qKey: "faq_q4", aKey: "faq_a4" },
  { num: "05", qKey: "faq_q5", aKey: "faq_a5" },
  { num: "06", qKey: "campaign_faq6_q", aKey: "campaign_faq6_a" },
];

// ─── GET QUOTE FORM DATA (ported from Hero.tsx) ──────────────────────────────
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

// Shipping restrictions for each network
const getShippingRestrictions = (network: string, t: any) => {
  const restrictions: Record<
    string,
    { blocked: string[]; warning: string[]; allowed: string[]; note?: string }
  > = {
    DHL: {
      blocked: [
        t.restriction_medicine,
        t.restriction_herbal_medicine,
        t.restriction_liquid_medicine,
        t.restriction_ghee,
        t.restriction_oil,
        t.restriction_pickle,
        t.restriction_silver,
        t.restriction_supplements,
        t.restriction_memory_cards,
      ],
      warning: [
        t.restriction_homemade_sweets,
        t.restriction_cosmetics,
        t.restriction_branded_eatables,
        t.restriction_spices,
        t.restriction_electronics,
        t.restriction_wooden_items,
      ],
      allowed: [
        t.restriction_sim_cards,
        t.restriction_turban_items,
        t.restriction_accessories,
        t.restriction_phone_accessories,
      ],
      note: t.restriction_dhl_note,
    },
    UPS: {
      blocked: [
        t.restriction_medicine,
        t.restriction_herbal_medicine,
        t.restriction_liquid_medicine,
        t.restriction_ghee,
        t.restriction_oil,
        t.restriction_pickle,
        t.restriction_silver,
        t.restriction_supplements,
        t.restriction_memory_cards,
      ],
      warning: [
        t.restriction_homemade_sweets,
        t.restriction_cosmetics,
        t.restriction_branded_eatables,
        t.restriction_spices,
        t.restriction_electronics,
      ],
      allowed: [
        t.restriction_sim_cards,
        t.restriction_turban_items,
        t.restriction_accessories,
        t.restriction_phone_accessories,
      ],
      note: t.restriction_ups_note,
    },
    FED: {
      blocked: [
        t.restriction_medicine,
        t.restriction_ghee,
        t.restriction_oil,
        t.restriction_pickle,
        t.restriction_silver,
        t.restriction_supplements,
        t.restriction_memory_cards,
      ],
      warning: [
        t.restriction_homemade_sweets,
        t.restriction_cosmetics,
        t.restriction_branded_eatables,
        t.restriction_spices,
        t.restriction_electronics,
      ],
      allowed: [
        t.restriction_sim_cards,
        t.restriction_turban_items,
        t.restriction_accessories,
        t.restriction_phone_accessories,
      ],
      note: t.restriction_fedex_note,
    },
    SELF: {
      blocked: [t.restriction_self_blocked],
      warning: [t.restriction_self_uk, t.restriction_self_usa],
      allowed: [t.restriction_self_allowed],
      note: t.restriction_self_note,
    },
  };

  return restrictions[network] || { blocked: [], warning: [], allowed: [] };
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

type FilterType = "all" | "cheapest" | "fastest";

// ─── OFFER END DATE ──────────────────────────────────────────────────────────
const DEFAULT_OFFER_END = new Date("2026-06-20T23:59:59");

function useCountdown(target: Date) {
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  const calc = () => {
    const diff = targetRef.current.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const secs = Math.floor(diff / 1000);
    return {
      d: Math.floor(secs / 86400),
      h: Math.floor((secs % 86400) / 3600),
      m: Math.floor((secs % 3600) / 60),
      s: secs % 60,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return time;
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="#e77419"
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── COMPACT TIMER ────────────────────────────────────────────────────────────
function CompactTimer({
  endDate,
  title,
  subtitle,
}: {
  endDate: Date;
  title: string;
  subtitle: string;
}) {
  const { t } = useLanguage(); // FIX: Added useLanguage hook
  const { d, h, m, s } = useCountdown(endDate);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 py-10 md:py-16 border-[1px] border-[#f97316] px-4 md:px-10 rounded-2xl"
      style={{ background: "#fff7ed" }}
    >
      {/* Label */}
      <div className="flex w-full md:w-1/3 items-center justify-center md:justify-start gap-3 md:gap-0 text-[#e77419]">
        <span className="text-4xl md:text-5xl md:ml-10 lg:ml-20">🔥</span>
        <div className="text-center md:text-left">
          <p className="text-2xl md:text-4xl font-bold text-[#e77419] leading-none">
            {title}
          </p>
          <p className="text-sm md:text-lg text-[#0a111e] mt-1 md:mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Clock blocks */}
      <div className="flex w-full md:w-1/3 items-center justify-center gap-1 sm:gap-2">
        {[
          { val: pad(d), label: t.campaign_days },
          { val: pad(h), label: t.campaign_hrs },
          { val: pad(m), label: t.campaign_min },
          { val: pad(s), label: t.campaign_sec },
        ].map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center bg-white/50 shadow-sm rounded-xl p-2 md:p-3">
              <span
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none tabular-nums"
                style={{ color: "#e77419" }}
              >
                {unit.val}
              </span>
              <span className="text-[10px] md:text-xs font-medium text-[#888] uppercase tracking-wider mt-0.5">
                {unit.label}
              </span>
            </div>
            {i < 3 && (
              <span className="text-[14px] md:text-[18px] font-extrabold text-[#e77419] -mt-1 md:-mt-2 select-none">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-center w-full md:w-1/3 mt-6 md:mt-0">
        <a
          href="https://wa.me/917070506070"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-base md:text-2xl font-medium px-6 py-3 md:px-8 md:py-4 rounded-2xl tracking-wide text-white no-underline transition-transform hover:scale-105 shrink-0"
          style={{ background: "#e77419" }}
        >
          <span>Claim Offer</span>{" "}
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}

/* ── Apply Now Modal (ported from Hero.tsx) ──────────────────────────────── */
function ApplyModal({
  open,
  onClose,
  quote,
  destination,
  destLabel,
  zoningCountry,
  zipcode,
  actualWt,
  volWt,
  length,
  breadth,
  height,
  chargeableWt,
}: {
  open: boolean;
  onClose: () => void;
  quote: Quote | null;
  destination: string;
  destLabel: string;
  zoningCountry: string;
  zipcode: string;
  actualWt: string;
  volWt: string | null;
  length: string;
  breadth: string;
  height: string;
  chargeableWt: number;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open || !quote) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
          chargeableWt,
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
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_enquiry_success",
      });
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
                    {destLabel}
                    {zoningCountry && ` — ${zoningCountry}`}
                    {zipcode && ` · ${zipcode}`}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{quote.tat}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-extrabold text-[#f27a1a]">
                    ₹{Math.round(quote.totalPrice).toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {chargeableWt} kg chargeable
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

/* ── Quotes Modal (ported from Hero.tsx) ──────────────────────────────────── */
function QuotesModal({
  quotes,
  destLabel,
  zoningCountry,
  selectedService,
  onSelect,
  onClose,
  onApplyNow,
}: {
  quotes: Quote[];
  destLabel: string;
  zoningCountry: string;
  selectedService: string | null;
  onSelect: (key: string) => void;
  onClose: () => void;
  onApplyNow: () => void;
}) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterType>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [expandedRestrictions, setExpandedRestrictions] = useState<
    string | null
  >(null);

  // Parse TAT string to extract days for sorting
  const getTATDays = (tat: string): number => {
    const match = tat.match(/(\d+)/);
    return match ? parseInt(match[0]) : 999;
  };

  // Sort and filter quotes based on TAT only (no DHL priority)
  const displayedQuotes = useMemo<Quote[]>(() => {
    const filtered = [...quotes];

    switch (filter) {
      case "cheapest":
        filtered.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      case "fastest":
        filtered.sort((a, b) => {
          const daysA = getTATDays(a.tat);
          const daysB = getTATDays(b.tat);
          return daysA - daysB;
        });
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes, filter]);

  // Automatically select the first quote ONLY when the filter (or the quote
  // set) changes — never when the user manually picked a card.
  useEffect(() => {
    if (isManualSelection) {
      setIsManualSelection(false);
      return;
    }
    if (displayedQuotes.length > 0) {
      const firstQuote = displayedQuotes[0];
      const key = `${firstQuote.service}__${firstQuote.rateType}`;
      onSelect(key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, quotes]);

  // Scroll to selected card when it changes
  useEffect(() => {
    if (selectedService && scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.querySelector(
        `[data-service-key="${selectedService}"]`,
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedService]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleServiceSelect = (key: string) => {
    setIsManualSelection(true);
    onSelect(key);
  };

  const toggleRestrictions = (key: string) => {
    setExpandedRestrictions(expandedRestrictions === key ? null : key);
  };

  const selectedQuote =
    quotes.find((q) => `${q.service}__${q.rateType}` === selectedService) ??
    null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0D1527] rounded-2xl w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] min-h-[380px] flex flex-col shadow-2xl border border-white/10">
        <div className="flex items-start justify-between gap-3 p-4 sm:p-5 border-b border-white/10 shrink-0">
          <div className="min-w-0">
            <p className="text-white font-bold text-sm sm:text-base truncate">
              {destLabel}
              {zoningCountry && ` — ${zoningCountry}`}
            </p>
            <p className="text-zinc-400 text-[11px] sm:text-[12px] mt-0.5">
              {quotes.length} {t.form_services_found_text}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1 mt-0.5 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Section with Scroll Controls */}
        <div className="px-4 sm:px-5 py-3 border-b border-white/10 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-zinc-400 shrink-0" />
            <span className="text-zinc-400 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">
              Sort by:
            </span>
            <div className="flex gap-1.5 ml-1 flex-wrap">
              <button
                onClick={() => {
                  setIsManualSelection(false);
                  setFilter("all");
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all ${filter === "all"
                  ? "bg-[#e77419] text-white"
                  : "bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white"
                  }`}
              >
                Default
              </button>
              <button
                onClick={() => {
                  setIsManualSelection(false);
                  setFilter("cheapest");
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all flex items-center gap-1 ${filter === "cheapest"
                  ? "bg-[#e77419] text-white"
                  : "bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white"
                  }`}
              >
                <TrendingDown size={12} />
                <span className="hidden xs:inline">Most Affordable</span>
                <span className="xs:hidden">Cheapest</span>
              </button>
              <button
                onClick={() => {
                  setIsManualSelection(false);
                  setFilter("fastest");
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all flex items-center gap-1 ${filter === "fastest"
                  ? "bg-[#e77419] text-white"
                  : "bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white"
                  }`}
              >
                <Clock size={12} />
                Fastest
              </button>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-x-auto overflow-y-auto p-3 sm:p-5 gap-3 sm:gap-5 flex items-start scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#3f3f46 transparent",
          }}
        >
          {displayedQuotes.map((q, index) => {
            const key = `${q.service}__${q.rateType}`;
            const isSelected = selectedService === key;
            const networkColor =
              NETWORK_COLORS[q.network] ?? "bg-gray-100 text-gray-700";
            const networkLabel = NETWORK_LABELS[q.network] ?? q.network;
            const dutyPaid = q.network === "SELF";
            const restrictions = getShippingRestrictions(q.network, t);
            const isExpanded = expandedRestrictions === key;

            let badge = "";
            if (filter === "cheapest" && index === 0) {
              badge = "🏆 Best Price";
            } else if (filter === "fastest" && index === 0) {
              badge = "⚡ Fastest";
            }

            return (
              <div
                key={key}
                data-service-key={key}
                onClick={() => handleServiceSelect(key)}
                className={`relative rounded-xl border-2 cursor-pointer transition-all min-w-[82vw] xs:min-w-[300px] sm:min-w-[300px] max-w-[340px] flex-shrink-0 flex flex-col max-h-full ${isSelected
                  ? "border-[#e77419] bg-[#e77419]/10"
                  : "border-zinc-700 bg-zinc-800/60 hover:border-zinc-500"
                  }`}
              >
                {isSelected && (
                  <div className="absolute -top-2.5 left-3 z-10 bg-[#e77419] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {t.form_selected}
                  </div>
                )}
                {badge && (
                  <div className="absolute -top-2.5 right-3 z-10 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {badge}
                  </div>
                )}

                <div className="flex flex-col gap-3 h-full p-4 sm:p-5 overflow-y-auto rounded-xl">
                  {/* Top row: Service badge, Zone, Rate Type */}
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

                  {/* Middle row: Network name */}
                  <div className="flex">
                    <p className="text-[18px] sm:text-[20px] font-semibold text-white leading-snug tracking-wide">
                      {networkLabel}
                    </p>
                  </div>

                  {/* Shipping Restrictions */}
                  <div className="flex-1 border-t border-white/10 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRestrictions(key);
                      }}
                      className="flex items-center gap-2 text-[11px] sm:text-[12px] text-zinc-400 hover:text-white transition-colors font-medium group w-full"
                    >
                      <Info
                        size={15}
                        className="text-zinc-500 group-hover:text-white transition-colors shrink-0"
                      />
                      <span className="truncate">
                        {t.restriction_view_details}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`ml-auto shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2.5 text-[10.5px] sm:text-[11px] bg-white/5 rounded-lg p-3 sm:p-3.5 border border-white/10">
                        {restrictions.blocked.length > 0 && (
                          <div>
                            <p className="text-rose-400 font-semibold flex items-center gap-2 text-[11px] sm:text-[12px]">
                              <span>❌</span> {t.restriction_blocked}:
                            </p>
                            <ul className="text-zinc-300 ml-6 sm:ml-7 list-disc space-y-0.5 mt-1">
                              {restrictions.blocked.map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {restrictions.warning.length > 0 && (
                          <div>
                            <p className="text-amber-400 font-semibold flex items-center gap-2 text-[11px] sm:text-[12px]">
                              <span>⚠️</span> {t.restriction_warning}:
                            </p>
                            <ul className="text-zinc-300 ml-6 sm:ml-7 list-disc space-y-0.5 mt-1">
                              {restrictions.warning.map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {restrictions.allowed.length > 0 && (
                          <div>
                            <p className="text-emerald-400 font-semibold flex items-center gap-2 text-[11px] sm:text-[12px]">
                              <span>✅</span> {t.restriction_allowed}:
                            </p>
                            <ul className="text-zinc-300 ml-6 sm:ml-7 list-disc space-y-0.5 mt-1">
                              {restrictions.allowed.map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {restrictions.note && (
                          <p className="text-zinc-400 italic mt-2 text-[10px] sm:text-[10.5px] border-t border-white/5 pt-2">
                            {restrictions.note}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom row: TAT and Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <p className="text-[11px] sm:text-[12px] text-zinc-400 font-medium">
                      {q.tat}
                    </p>
                    <div className="text-right">
                      <p className="text-[20px] sm:text-[22px] font-extrabold text-[#e77419] leading-none tracking-tight">
                        ₹{Math.round(q.totalPrice).toLocaleString("en-IN")}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-zinc-500 mt-0.5 font-medium tracking-wide uppercase">
                        {t.form_gst_inc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Apply Now — shown when a service is selected */}
        {selectedService && selectedQuote && (
          <div className="px-4 sm:px-5 pt-3 shrink-0">
            <div className="bg-white/5 rounded-2xl border-2 border-[#e77419] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-zinc-400 font-medium">
                  Ready to ship with
                </p>
                <p className="text-sm font-extrabold text-white mt-0.5 leading-tight">
                  {selectedQuote.service}
                </p>
                <p className="text-[#e77419] font-extrabold text-lg mt-0.5">
                  ₹
                  {Math.round(selectedQuote.totalPrice).toLocaleString("en-IN")}
                </p>
              </div>
              <button
                onClick={onApplyNow}
                className="shrink-0 bg-[#e77419] hover:bg-orange-600 text-white font-extrabold text-sm py-3.5 px-7 rounded-xl transition-all active:scale-98 flex items-center gap-2 shadow-md shadow-orange-900/30 w-full sm:w-auto justify-center"
              >
                Enquire Now <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        <div className="px-4 sm:px-5 py-3 border-t border-white/10 text-center shrink-0">
          <p className="text-[10px] sm:text-[11px] text-zinc-500">
            {t.form_final_rates_msg}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CampaignPage() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [slidesCount, setSlidesCount] = useState<number>(3);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesCount(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesCount(2);
      } else {
        setSlidesCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [offerDetails, setOfferDetails] = useState({
    title: "Limited-Time Offer",
    subtitle: "₹679/kg to USA, ends soon",
    endDate: DEFAULT_OFFER_END,
    showOffer: true,
  });

  /* ── Get Quote form state (ported from Hero.tsx) ── */
  const [destination, setDestination] = useState("");
  const [zoningCountry, setZoningCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [actualWt, setActualWt] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

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

  const selectedQuoteObj =
    quotes.find((q) => `${q.service}__${q.rateType}` === selectedService) ??
    null;

  const handleQuoteSubmit = async (e: React.FormEvent) => {
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
    setQuoteLoading(true);
    setQuotes([]);
    setSelectedService(null);
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
      if (data.success && data.quotes?.length > 0) {
        setQuotes(data.quotes);
        setSelectedService(
          `${data.quotes[0].service}__${data.quotes[0].rateType}`,
        );
        setShowQuoteModal(true);
      } else {
        alert(
          data.message ||
          "No services available for this destination/weight combination.",
        );
      }
    } catch (err: any) {
      alert("Failed to get quote: " + err.message);
    } finally {
      setQuoteLoading(false);
    }
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesCount,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    centerMode: slidesCount > 1,
    centerPadding: slidesCount > 1 ? "20px" : "0px",
  };

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Response is not JSON");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          setOfferDetails({
            title: data.data.offerTitle || "Limited-Time Offer",
            subtitle: data.data.offerSubtitle || "₹679/kg to USA, ends soon",
            endDate: data.data.offerEndDate
              ? new Date(data.data.offerEndDate)
              : DEFAULT_OFFER_END,
            showOffer: data.data.showOffer ?? true,
          });
        }
      })
      .catch((err) =>
        console.warn("Failed to fetch site settings:", err.message),
      );
  }, []);

  return (
    <main className="w-full font-sans bg-[#faf5ea] flex flex-col pb-16">
      {/* Quotes + Apply modals for the Get Quote form below */}
      {showQuoteModal && quotes.length > 0 && (
        <QuotesModal
          quotes={quotes}
          destLabel={destObj?.label ?? destination}
          zoningCountry={zoningCountry}
          selectedService={selectedService}
          onSelect={setSelectedService}
          onClose={() => setShowQuoteModal(false)}
          onApplyNow={() => setApplyModalOpen(true)}
        />
      )}

      <ApplyModal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        quote={selectedQuoteObj}
        destination={destination}
        destLabel={destObj?.label ?? destination}
        zoningCountry={zoningCountry}
        zipcode={zipcode}
        actualWt={actualWt}
        volWt={volWt}
        length={length}
        breadth={breadth}
        height={height}
        chargeableWt={chargeableWt}
      />

      {/* ── 1. HERO ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <div
          className="relative w-full overflow-hidden rounded-[20px] bg-[#faf5ea] aspect-[398/550] sm:aspect-[1024/400] min-h-[490px] sm:min-h-0"
        >
          {/* Desktop Banner (Textless Image Background) */}
          <Image
            src="/raksha-bandhan-banner-v2.jpg"
            alt="Manvi International Courier"
            fill
            sizes="100vw"
            className="hidden sm:block object-contain object-center"
            priority
          />
          {/* Mobile Banner (Textless Image Background) */}
          <Image
            src="/raksha-bandhan-banner-mobile-v2.jpg"
            alt="Manvi International Courier Mobile"
            fill
            sizes="100vw"
            className="block sm:hidden object-cover object-center"
            priority
          />
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 lg:p-8 pointer-events-none">
            <div className="flex flex-col max-w-xl lg:max-w-2xl pt-16 sm:pt-14 md:pt-26 justify-center items-center mx-auto sm:mx-0">
              {/* Top line: THIS RAKSHA BANDHAN */}
              <span className="text-md sm:text-[18px] md:text-2xl font-black tracking-[0.14em] text-[#0a111e] uppercase font-sans leading-none">
                THIS RAKSHA BANDHAN
              </span>

              {/* Middle line: Send love */}
              <h1 className="text-5xl sm:text-[58px] md:text-5xl lg:text-8xl font-sans font-extrabold text-[#f96302] leading-[1.02] tracking-tight -ml-0.5 sm:my-0">
                Send love
              </h1>

              {/* Bottom line: Miles Don't Matter at Manvi */}
              <p className="text-md sm:text-[19px] md:text-2xl font-medium text-[#1a1a1a] tracking-tight font-sans">
                Miles Don't Matter at Manvi
              </p>

              {/* Ornamental Flourish Divider Line */}
              <div className="flex items-center gap-2 my-1 sm:my-2 w-fit max-w-[260px]">
                <div className="h-[1.5px] w-16 sm:w-20 bg-gradient-to-r from-transparent via-[#0a111e]/70 to-[#0a111e]" />
                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#0a111e]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
                </svg>
                <div className="h-[1.5px] w-16 sm:w-20 bg-gradient-to-l from-transparent via-[#0a111e]/70 to-[#0a111e]" />
              </div>

              {/* 📦 100g Rakhi Parcels — Flat Rates Card/Pill */}
              <div className="mt-1.5 sm:mt-3 w-full max-w-[340px] sm:max-w-xl px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-gray/10 backdrop-blur-md border border-[#e77419]/30 shadow-md flex flex-col items-center text-center pointer-events-auto">
                <span className="text-[11px] sm:text-[13px] md:text-sm font-extrabold text-[#e77419] flex items-center gap-1.5 uppercase tracking-wide">
                  <span>📦</span> 100g Rakhi Parcels — Flat Rates
                </span>

                {/* Responsive Layout: 2x2 Grid on Mobile, Single Line Flex on Desktop */}
                <div className="grid grid-cols-2 gap-1.5 w-full mt-1.5 text-[11px] sm:text-[12px] md:text-xs font-bold text-[#0a111e] sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3 sm:gap-y-1">
                  <div className="bg-orange-50/90 border border-orange-200/80 px-2 py-1 sm:p-0 rounded-lg sm:rounded-none sm:bg-transparent sm:border-0 flex items-center justify-between sm:justify-start sm:gap-1">
                    <span>🇬🇧 UK</span>
                    <span className="text-[#e77419] font-black">₹280</span>
                  </div>
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  <div className="bg-orange-50/90 border border-orange-200/80 px-2 py-1 sm:p-0 rounded-lg sm:rounded-none sm:bg-transparent sm:border-0 flex items-center justify-between sm:justify-start sm:gap-1">
                    <span>🇦🇺 Australia</span>
                    <span className="text-[#e77419] font-black">₹405</span>
                  </div>
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  <div className="bg-orange-50/90 border border-orange-200/80 px-2 py-1 sm:p-0 rounded-lg sm:rounded-none sm:bg-transparent sm:border-0 flex items-center justify-between sm:justify-start sm:gap-1">
                    <span>🇨🇦 Canada</span>
                    <span className="text-[#e77419] font-black">₹445</span>
                  </div>
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  <div className="bg-orange-50/90 border border-orange-200/80 px-2 py-1 sm:p-0 rounded-lg sm:rounded-none sm:bg-transparent sm:border-0 flex items-center justify-between sm:justify-start sm:gap-1">
                    <span>🇺🇸 USA</span>
                    <span className="text-[#e77419] font-black">₹489</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-auto pointer-events-auto">
              <div className="flex flex-row flex-wrap gap-2.5 sm:gap-4 items-center justify-center sm:justify-start pb-2 md:pb-0">
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-1.5 font-bold text-[12px] sm:text-[14px] md:text-[15px] px-4 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-full text-white no-underline transition-transform hover:scale-105 shadow-md flex-1 sm:flex-none max-w-[160px] sm:max-w-none text-center"
                  style={{
                    background: "#e77419",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {t.nav_quote}{" "}
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                </Link>
                <a
                  href="https://wa.me/917070506070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-bold text-[12px] sm:text-[14px] md:text-[15px] px-4 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-full no-underline transition-transform hover:scale-105 shadow-md flex-1 sm:flex-none max-w-[160px] sm:max-w-none text-center"
                  style={{
                    background: "#23c961",
                    color: "#0a111e",
                  }}
                >
                  <svg
                    className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                    viewBox="0 0 24 24"
                    fill="#0a111e"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.contact_whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mt-5">
          {[
            { label: t.hero_serviceable_zipcodes, href: "/zipcode" },
            { label: t.nav_track_shipment, href: "/track" },
            { label: t.hero_our_services, href: "/services" },
            { label: t.hero_contact_us, href: "/contact" },
          ].map((tab, idx) => {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex items-center justify-center gap-2 md:gap-2.5 rounded-[14px] text-[13px] md:text-[15px] font-semibold text-white py-3 md:py-4 px-3 md:px-4 transition-transform hover:scale-[1.02] no-underline shadow-sm min-h-[48px] md:min-h-[64px]"
                style={{ background: "#e77419" }}
              >
                {idx === 1 ? (
                  <Receipt className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                ) : (
                  <MapPin className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                )}
                {tab.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 1.5 GET INSTANT QUOTE FORM ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-4">
        <div className="bg-[#f27a1a] rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-xl">
          <div className="flex flex-col gap-2 mb-6 text-center md:text-left">
            <h2 className="text-[24px] sm:text-[30px] md:text-[34px] font-extrabold text-white leading-tight tracking-tight">
              {t.hero_headline}
            </h2>
            <p className="text-white/80 text-[13px] sm:text-[14px] leading-relaxed max-w-2xl mx-auto md:mx-0">
              {t.hero_subtext}
            </p>
          </div>

          <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-4">
            {/* Row 1: Destination · (Sub-country / Zip) · Actual Weight — equal-width, wraps symmetrically regardless of which conditional field is showing */}
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <select
                  aria-label={t.form_select_dest}
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setZipcode("");
                    setZoningCountry("");
                    setQuotes([]);
                  }}
                  className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3.5 focus:outline-none appearance-none"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              {requiresSubCountry && (
                <div className="relative flex-1 min-w-[220px]">
                  <select
                    aria-label={
                      destination === "EUROPE"
                        ? t.form_select_euro
                        : t.form_select_country
                    }
                    value={zoningCountry}
                    onChange={(e) => {
                      setZoningCountry(e.target.value);
                      setQuotes([]);
                    }}
                    className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3.5 focus:outline-none appearance-none"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              )}

              {requiresZip && (
                <input
                  aria-label={`${t.form_zipcode} (required for ${destObj?.label})`}
                  type="text"
                  placeholder={`${t.form_zipcode} (required for ${destObj?.label})`}
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                  className="flex-1 min-w-[220px] bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3.5 focus:outline-none placeholder:text-gray-400"
                />
              )}

              <input
                aria-label={t.form_actual_wt || "Actual Weight"}
                type="number"
                placeholder={t.form_actual_wt}
                value={actualWt}
                onChange={(e) => setActualWt(e.target.value)}
                min="0.001"
                step="0.001"
                className="flex-1 min-w-[220px] bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3.5 focus:outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Row 2: Package dimensions — labelled group, always 3 equal columns */}
            <div className="flex flex-col gap-2">
              <span className="text-white/70 text-[11px] font-semibold tracking-wide uppercase pl-1">
                {t.form_vol_wt_dim}
              </span>
              <div className="grid grid-cols-3 gap-3">
                <input
                  aria-label={t.form_length}
                  type="number"
                  placeholder={t.form_length}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  min="0"
                  className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-3 sm:px-4 py-3.5 focus:outline-none placeholder:text-gray-400"
                />
                <input
                  aria-label={t.form_breadth}
                  type="number"
                  placeholder={t.form_breadth}
                  value={breadth}
                  onChange={(e) => setBreadth(e.target.value)}
                  min="0"
                  className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-3 sm:px-4 py-3.5 focus:outline-none placeholder:text-gray-400"
                />
                <input
                  aria-label={t.form_height}
                  type="number"
                  placeholder={t.form_height}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="0"
                  className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-3 sm:px-4 py-3.5 focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Row 3: Weight summary chips + submit — one tidy bar, button never squeezed */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-1">
              {(actualWt || volWt) && (
                <div className="flex-1 bg-white/20 rounded-xl px-4 py-3 flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-1 text-white text-xs font-semibold">
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
                disabled={quoteLoading}
                className={`bg-[#0D1527] hover:bg-slate-800 text-white font-bold text-[13px] py-3.5 px-8 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-70 ${actualWt || volWt ? "sm:w-auto" : "w-full"
                  }`}
              >
                {quoteLoading ? t.form_calculating : t.hero_get_quote}{" "}
                {!quoteLoading && (
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── 1.75 RAKHI SPECIAL OFFER INFO BOX ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
        <div className="bg-gradient-to-br from-[#fff7ed] via-[#fffbf5] to-[#fff3e0] border-2 border-[#e77419]/30 rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-md relative overflow-hidden">
          {/* Decorative Blur Effect */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#e77419]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-5 text-[#0a111e]">
            {/* Top Badge */}
            <div>
              <span className="inline-flex items-center gap-2 border border-[#e77419] bg-[#e77419]/10 text-[#e77419] px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                🎁 Special Rakhi Shipping Offer
              </span>
            </div>

            {/* Paragraph 1 */}
            <p className="text-[15px] sm:text-[17px] md:text-[18px] font-semibold text-[#0a111e] leading-relaxed">
              This Rakhi don’t worry about collecting enough weight to ship abroad. With Manvi International, send just a Rakhi anywhere in the world. And don’t worry about higher charges or extra costs.
            </p>

            {/* Paragraph 2 */}
            <p className="text-[14px] sm:text-[16px] text-[#444] leading-relaxed">
              <strong className="text-[#e77419] font-bold">Weight less pay less!</strong> When your shipment contains less than hundred grams, you can avail special prices for international shipping. Because why pay more when you’re shipping less? Send Rakhis and shipments up to hundred grams with special rates, anywhere in the world. Larger shipments? Don’t worry, Manvi has got you! Ship with no limit with Manvi. Avail special discounts for bulk and business shipping.
            </p>

            {/* Paragraph 3 */}
            <p className="text-[14px] sm:text-[16px] text-[#444] leading-relaxed italic border-l-4 border-[#e77419] pl-4 py-1.5 bg-orange-100/50 rounded-r-xl">
              Manvi has got something for everyone. Because milestone matter at Manvi, but your smiles do.
            </p>

            {/* Clickable Actions */}
            <div className="mt-3 pt-6 border-t border-[#e77419]/20 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-5">
              <div className="flex flex-col gap-2.5">
                {/* WhatsApp or call us on 7070506070 */}
                <div className="flex items-center flex-wrap gap-2 text-[14px] sm:text-[15px] font-semibold text-[#0a111e]">
                  <span>To avail the offers,</span>
                  <a
                    href="https://wa.me/917070506070"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#23c961] font-bold hover:underline"
                  >
                    WhatsApp
                  </a>
                  <span>or call us on</span>
                  <a
                    href="tel:+917070506070"
                    className="inline-flex items-center gap-1 text-[#e77419] font-extrabold hover:underline bg-orange-100/90 px-2.5 py-0.5 rounded-full border border-[#e77419]/30"
                  >
                    <Phone size={14} className="shrink-0" />
                    7070506070
                  </a>
                </div>

                {/* To get a quote, click here */}
                <div className="flex items-center gap-1.5 text-[14px] sm:text-[15px] font-semibold text-[#0a111e]">
                  <span>To get a quote,</span>
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-1 text-[#e77419] font-bold underline hover:text-orange-700 transition-colors"
                  >
                    click here <ArrowUpRight size={15} strokeWidth={2.5} />
                  </Link>
                </div>

                {/* For any queries, contact us */}
                <div className="flex items-center gap-1.5 text-[14px] sm:text-[15px] font-semibold text-[#0a111e]">
                  <span>For any queries,</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-[#e77419] font-bold underline hover:text-orange-700 transition-colors"
                  >
                    contact us <ArrowUpRight size={15} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>

              {/* Quick Action CTA Buttons */}
              <div className="flex flex-wrap gap-3 w-full sm:w-auto mt-1 sm:mt-0">
                <a
                  href="https://wa.me/917070506070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl bg-[#23c961] text-[#0a111e] no-underline hover:scale-105 transition-transform shadow-sm flex-1 sm:flex-none"
                >
                  <Send size={15} /> WhatsApp Us
                </a>
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl bg-[#e77419] text-white no-underline hover:scale-105 transition-transform shadow-sm flex-1 sm:flex-none"
                >
                  Get Quote <ArrowUpRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUSTED DELIVERY PARTNERS ── */}
      <section className="w-full bg-[#f4ebe0] py-8 mt-4">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-center md:justify-around items-center gap-6 md:gap-12">
          <div className="flex text-center md:text-left">
            <span className="text-xl sm:text-2xl font-extrabold text-[#e77419] leading-snug block">
              {t.campaign_partners_title}
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="text-xl sm:text-2xl font-extrabold text-[#0a111e]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="bg-[#f4ebe0] rounded-xl p-8 sm:p-14">
          <div className="mb-10">
            <span className="inline-block border border-[#e77419] text-[#e77419] px-5 py-1.5 bg-[#FF7F001F] rounded-full text-[12px] font-semibold tracking-wide mb-5">
              {t.campaign_how_it_works_badge}
            </span>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#0a111e] leading-tight">
              {t.campaign_how_it_works_title}
            </h2>
            <p className="text-[15px] text-[#666] mt-3 max-w-2xl leading-relaxed">
              {t.campaign_how_it_works_sub}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="flex flex-col p-8 rounded-3xl bg-white shadow-sm"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0 mb-4"
                  style={{ background: "#e77419" }}
                >
                  {step.num}
                </div>
                <h3 className="text-[17px] font-bold text-[#0a111e] mb-2">
                  {t[step.titleKey as keyof typeof t]}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  {t[step.descKey as keyof typeof t]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHERE WE PICK UP AND DELIVER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
        <div className="bg-[#f4ebe0] rounded-xl p-8 sm:p-14">
          <div className="text-center mb-12">
            <span className="inline-block border bg-[#FF7F001F] border-[#e77419] text-[#e77419] px-5 py-1.5 rounded-full text-[12px] font-semibold tracking-wide mb-5">
              {t.campaign_where_badge}
            </span>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#0a111e] leading-tight">
              {t.campaign_where_title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Across India */}
            <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col h-full">
              <p className="text-[16px] font-bold text-[#0a111e] mb-3">
                {t.campaign_pickup_title}
              </p>
              <p className="text-[14px] text-[#666] leading-relaxed mb-6">
                {t.campaign_pickup_desc}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {PICKUP_CITIES.map((c) => (
                  <span
                    key={c}
                    className="text-[13px] font-medium px-5 py-1.5 rounded-full bg-[#FF7F001F] text-[#0a111e]"
                    style={{ border: "1px solid #e77419" }}
                  >
                    {c}
                  </span>
                ))}
                <span
                  className="text-[13px] font-semibold px-5 py-1.5 rounded-full text-white"
                  style={{ background: "#e77419" }}
                >
                  {t.campaign_pan_india}
                </span>
              </div>
            </div>

            {/* Delivery Destinations */}
            <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col h-full justify-between">
              <div>
                <p className="text-[16px] font-bold text-[#0a111e] mb-5">
                  {t.campaign_delivery_title}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {DESTINATIONS_LIST.map((d) => (
                    <span
                      key={d}
                      className="text-[13px] font-medium px-5 py-1.5 rounded-full bg-[#FF7F001F] text-[#0a111e]"
                      style={{ border: "1px solid #e77419" }}
                    >
                      {d}
                    </span>
                  ))}
                  <span
                    className="text-[13px] font-semibold px-5 py-1.5 rounded-full text-white"
                    style={{ background: "#e77419" }}
                  >
                    {t.campaign_worldwide}
                  </span>
                </div>
              </div>
              <p className="text-[13px] text-[#666] leading-relaxed mt-6">
                {t.campaign_delivery_via}
              </p>
            </div>
          </div>

          {/* What You Can Ship */}
          <div className="mt-6 bg-white rounded-3xl p-6 sm:px-8 sm:py-6 shadow-sm">
            <p className="text-[15px] font-bold text-[#0a111e] mb-2">
              {t.campaign_what_ship_title}
            </p>
            <p className="text-[12.5px] text-[#777] leading-[1.6]">
              {t.campaign_what_ship_desc}{" "}
              <a
                href="https://wa.me/917070506070"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e77419] font-bold underline"
              >
                {t.campaign_what_ship_ask}
              </a>
              {t.campaign_what_ship_confirm}
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. STATS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div
          className="rounded-xl p-6 sm:p-12"
          style={{ background: "#FF7F0052" }}
        >
          <p className="text-center text-[#0a111e] text-[18px] md:text-[20px] font-extrabold mb-6 md:mb-10">
            {t.campaign_stats_title}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, idx) => {
              let borderClass = "";
              if (idx === 0) {
                borderClass =
                  "border-r border-b md:border-b-0 border-[#e77419]/30";
              } else if (idx === 1) {
                borderClass =
                  "border-b md:border-r md:border-b-0 border-[#e77419]/30";
              } else if (idx === 2) {
                borderClass = "border-r border-[#e77419]/30";
              }
              return (
                <div
                  key={s.labelKey}
                  className={`flex flex-col items-center gap-2 md:gap-4 text-center py-4 md:py-6 px-2 md:px-4 ${borderClass}`}
                >
                  <span className="text-[32px] md:text-[56px] font-bold leading-none text-[#e77419]">
                    {t[s.valueKey as keyof typeof t]}
                  </span>
                  <span className="text-[11px] md:text-[13px] font-bold text-[#555] uppercase tracking-wide">
                    {t[s.labelKey as keyof typeof t]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4">
        <div className="bg-[#f4ebe0] rounded-xl p-8 sm:p-10">
          <div className="mb-10 text-center">
            <span className="inline-block border border-[#e77419] text-[#e77419] px-4 py-1.5 rounded-full text-[12px] font-bold mb-4">
              {t.campaign_testimonials_badge}
            </span>
            <h2 className="text-[26px] md:text-[32px] font-extrabold text-[#0a111e]">
              {t.campaign_testimonials_title}
            </h2>
          </div>

          <div className="testimonial-carousel-container testimonial-carousel-light w-full min-h-[300px]">
            {mounted ? (
              <Slider key={slidesCount} {...sliderSettings}>
                {[
                  {
                    name: "Anjali M.",
                    location: "Birmingham, UK",
                    textKey: "campaign_testimonial1",
                  },
                  {
                    name: "Raj P.",
                    location: "London, UK",
                    textKey: "campaign_testimonial2",
                  },
                  {
                    name: "Simran K.",
                    location: "Toronto, Canada",
                    textKey: "campaign_testimonial3",
                  },
                  {
                    name: "Hardeep S.",
                    location: "Sydney, Australia",
                    textKey: "campaign_testimonial4",
                  },
                ].map((testimonial, i) => (
                  <div key={i} className="px-2 md:px-3">
                    <div className="testimonial-slide flex flex-col gap-0 px-8 py-8 rounded-2xl bg-white shadow-sm border border-black/5 mx-auto min-h-[250px] sm:min-h-[200px]">
                      <span className="text-[32px] md:text-[40px] text-[#e77419] font-serif leading-none select-none">
                        &#x201C;&#x201C;
                      </span>
                      <p className="text-[14px] sm:text-[15px] text-[#666] leading-relaxed italic mb-4">
                        {t[testimonial.textKey as keyof typeof t]}
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0"
                          style={{ background: "#e77419" }}
                        >
                          {testimonial.name[0]}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[14px] font-bold text-[#0a111e]">
                            {testimonial.name}
                          </p>
                          <p className="text-[12px] text-[#666]">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : null}
          </div>

          <style jsx global>{`
            .testimonial-carousel-container {
              position: relative;
              overflow: hidden;
            }
            .testimonial-carousel-container::before,
            .testimonial-carousel-container::after {
              content: "";
              position: absolute;
              top: 0;
              width: 15%;
              height: 100%;
              z-index: 2;
              pointer-events: none;
            }
            .testimonial-carousel-light::before {
              left: 0;
              background: linear-gradient(
                to right,
                #f4ebe0,
                rgba(244, 235, 224, 0.9),
                rgba(244, 235, 224, 0)
              );
            }
            .testimonial-carousel-light::after {
              right: 0;
              background: linear-gradient(
                to left,
                #f4ebe0,
                rgba(244, 235, 224, 0.9),
                rgba(244, 235, 224, 0)
              );
            }
            .testimonial-slide {
              transition: all 0.5s ease;
              opacity: 0.4;
              transform: scale(0.85);
            }
            .slick-center .testimonial-slide {
              opacity: 1;
              transform: scale(1.05);
            }
            .slick-track {
              display: flex !important;
              align-items: center;
            }
            .slick-list {
              padding-top: 2rem !important;
              padding-bottom: 2rem !important;
            }
            .slick-slide {
              height: auto;
            }

            @media (max-width: 768px) {
              .testimonial-carousel-container::before,
              .testimonial-carousel-container::after {
                display: none !important;
              }
              .slick-center .testimonial-slide,
              .testimonial-slide {
                transform: scale(1) !important;
                opacity: 1 !important;
              }
              .slick-list {
                padding-top: 1rem !important;
                padding-bottom: 1rem !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ── 7. TIMER + FAQ ── */}
      <section className="w-full flex flex-col justify-center items-center mx-auto py-10">
        {/* Compact Timer */}
        {offerDetails.showOffer && (
          <div className="mb-14 w-full max-w-[1400px] px-4 sm:px-6">
            <CompactTimer
              endDate={offerDetails.endDate}
              title={offerDetails.title}
              subtitle={offerDetails.subtitle}
            />
          </div>
        )}

        {/* FAQ */}
        <div className="bg-[#f4ebe0] rounded-xl p-8 sm:p-14 max-w-[1400px] w-full mx-4 sm:mx-6">
          <div className="text-center mb-12">
            <span className="inline-block border border-[#e77419] text-[#e77419] px-4 py-1.5 rounded-full text-[12px] font-bold mb-4">
              {t.faq_badge}
            </span>
            <h2 className="text-[26px] md:text-[32px] font-extrabold text-[#0a111e]">
              {t.faq_title}
            </h2>
          </div>

          {/* Accordion rows */}
          <div className="flex flex-col">
            {FAQS.map((f, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveIndex(isActive ? -1 : i)}
                  className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-4 lg:gap-16 border-b border-gray-300/40 last:border-b-0 cursor-pointer items-baseline select-none"
                  style={{ padding: isActive ? "2rem 0" : "1.25rem 0" }}
                >
                  {/* Left: Number + Question */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#e77419] text-[12px] font-black tracking-widest">
                      {f.num}
                    </span>
                    <h3
                      className="font-extrabold text-[#0a111e] leading-snug tracking-tight transition-all duration-300 flex items-start justify-between gap-3"
                      style={{ fontSize: isActive ? "22px" : "16px" }}
                    >
                      <span>{t[f.qKey as keyof typeof t]}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#e77419] shrink-0 mt-0.5 transition-transform duration-300 ${isActive ? "rotate-180" : ""
                          }`}
                      />
                    </h3>
                  </div>

                  {/* Right: Answer */}
                  <div
                    className="leading-relaxed transition-all duration-300"
                    style={{
                      fontSize: isActive ? "15px" : "13px",
                      color: isActive ? "#4b5563" : "#9ca3af",
                      fontStyle: isActive ? "normal" : "italic",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    <span>{t[f.aKey as keyof typeof t]}</span>
                    {f.linkKey && f.afterLinkKey && (
                      <>
                        <Link
                          href="/quote"
                          className="text-[#e77419] font-bold underline ml-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t[f.linkKey as keyof typeof t]}
                        </Link>
                        {t[f.afterLinkKey as keyof typeof t]}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. BOTTOM CTA ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-4 mb-8">
        <div
          className="rounded-xl p-8 md:p-16 text-center"
          style={{ background: "#FF7F0052" }}
        >
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#0a111e] leading-tight">
            {t.campaign_cta_title}
          </h2>
          <p className="text-[16px] text-[#666] leading-relaxed max-w-2xl mx-auto mt-4 mb-10">
            {t.campaign_cta_sub}
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href="/quote"
              className="flex items-center gap-2 font-bold text-[13px] md:text-[15px] px-6 py-3 md:px-8 md:py-4 rounded-full text-white no-underline transition-transform hover:scale-105"
              style={{
                background: "#e77419",
              }}
            >
              {t.nav_quote}{" "}
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
            <a
              href="https://wa.me/917070506070"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-[13px] md:text-[15px] px-6 py-3 md:px-8 md:py-4 rounded-full text-[#0a111e] no-underline transition-transform hover:scale-105"
              style={{
                background: "#23c961",
              }}
            >
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="#0a111e"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.contact_whatsapp}
            </a>
            <a
              href="tel:+917070506070"
              className="flex items-center gap-2 font-bold text-[13px] md:text-[15px] px-6 py-3 md:px-8 md:py-4 rounded-full no-underline transition-transform hover:scale-105"
              style={{
                background: "transparent",
                color: "#e77419",
                border: "2px solid #e77419",
              }}
            >
              <Phone className="w-4 h-4" />
              {t.campaign_call}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
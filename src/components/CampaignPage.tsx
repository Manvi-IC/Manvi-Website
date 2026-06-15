"use client";
import {
  ArrowUpRight,
  MapPin,
  Receipt,
  Phone,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "1",
    title: "WhatsApp us your details",
    desc: "Tell us what you're sending, where it is in India, and your delivery address overseas.",
  },
  {
    num: "2",
    title: "We pick it up in India",
    desc: "Our team collects from your home, a shop, or a relative's doorstep; doorstep pickup across India.",
  },
  {
    num: "3",
    title: "We pack, ship and handle customs",
    desc: "Professionally packed, securely shipped, and all customs paperwork managed for you.",
  },
  {
    num: "4",
    title: "Delivered to your door",
    desc: "Your parcel arrives overseas, fully tracked end-to-end, right to your doorstep.",
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

// Issue #7: Alphabetical order - Australia, Canada, UK, USA
const DESTINATIONS = ["Australia", "Canada", "UK", "USA"];

// Issue #6 + #8: Aramex (not ARAMEX); consistent order: DHL, FedEx, UPS, Aramex, DPD
const PARTNERS = ["DHL", "FedEx", "UPS", "Aramex", "DPD"];

const STATS = [
  { value: "98%", label: "Delivery Success Rate" },
  { value: "50K+", label: "Shipments Delivered" },
  { value: "10K+", label: "Happy Customers" },
  { value: "1,000+", label: "Customs Cases Handled" },
];

const TESTIMONIALS = [
  {
    name: "Anjali M.",
    location: "Birmingham, UK",
    text: "My brother's gift was sitting at our home in Ludhiana. They picked it up and it reached me in Toronto within days. I cried a little, honestly.",
  },
  {
    name: "Raj P.",
    location: "London, UK",
    text: "I was nervous about sending sweets overseas, but everything arrived perfectly. The WhatsApp updates kept me calm the whole time.",
  },
  {
    name: "Simran K.",
    location: "Toronto, Canada",
    text: "My brother's gift was sitting at our home in Ludhiana. They picked it up and it reached me in Toronto within days. I cried a little, honestly.",
  },
  {
    name: "Hardeep S.",
    location: "Sydney, Australia",
    text: "Sent a parcel of clothes and dry fruits to my mother in Sydney. Arrived before the festival. Excellent service, highly recommend.",
  },
];

const FAQS = [
  {
    num: "01",
    q: "Where Can I Send My Packages?",
    a: "Almost anywhere! We have a strong presence in the USA, Canada, UK, Europe, and Australia. Whether it's a big city or a quiet suburb, we'll get it there.",
  },
  {
    num: "02",
    q: "How Much Does It Cost?",
    a: "Pricing depends on destination, weight, and service type. Parcel shipping to the USA starts from ₹679/kg.",
    link: { text: "Get a quick quote", href: "/quote" },
    afterLink:
      " or message us on WhatsApp for an exact price; no hidden charges.",
  },
  {
    num: "03",
    q: "How Long Does Delivery Take?",
    a: "Most shipments arrive within a few days to two weeks depending on destination and service level. We guarantee on-time delivery when you order within our confirmed service windows.",
  },
  {
    num: "04",
    q: "Can I Track My Shipment?",
    a: "Yes. You'll receive a tracking number the moment your parcel is collected. Track live at manvicourier.com/track. We also send WhatsApp updates at every stage.",
  },
  {
    num: "05",
    q: "What Can't Be Shipped?",
    a: "Hazardous chemicals, negotiable currency, precious stones, and prohibited or illegal goods. If you're unsure about a specific item, ask us before booking; we'll confirm.",
  },
  {
    num: "06",
    q: "How Do I Pay?",
    a: "Payment options are shared once your quote is confirmed on WhatsApp. You only pay when you're happy with the details. Secure payment links provided.",
  },
];

// ─── OFFER END DATE (72 hours from a fixed anchor) ──────────────────────────
// Set your real campaign deadline here (ISO string, local time)
const DEFAULT_OFFER_END = new Date("2026-06-20T23:59:59");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const s = Math.floor(diff / 1000);
    return {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    setTime(calc()); // immediately update if target changed
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [target.getTime()]);

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
function CompactTimer({ endDate, title, subtitle }: { endDate: Date, title: string, subtitle: string }) {
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
          { val: pad(d), label: "Days" },
          { val: pad(h), label: "Hrs" },
          { val: pad(m), label: "Min" },
          { val: pad(s), label: "Sec" },
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
          Claim Offer <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </a>
      </div>

    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CampaignPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [offerDetails, setOfferDetails] = useState({
    title: "Limited-Time Offer",
    subtitle: "₹679/kg to USA, ends soon",
    endDate: DEFAULT_OFFER_END,
  });

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setOfferDetails({
            title: data.data.offerTitle || "Limited-Time Offer",
            subtitle: data.data.offerSubtitle || "₹679/kg to USA, ends soon",
            endDate: data.data.offerEndDate ? new Date(data.data.offerEndDate) : DEFAULT_OFFER_END,
          });
        }
      })
      .catch(err => console.error("Failed to fetch site settings", err));
  }, []);

  return (
    <main className="w-full font-sans bg-white flex flex-col pb-16">
      {/* ── 1. HERO ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <div
          className="relative w-full overflow-hidden"
          style={{ minHeight: "485px", height: "auto", borderRadius: "20px" }}
        >
          <Image
            src="/hero-right.jpg"
            alt="Manvi International Courier"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.4)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 80%)",
            }}
          />
          <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-12 lg:p-14">
            <div className="flex flex-col gap-4 max-w-3xl">
              <span
                className="text-[12px] text-white/90 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit font-medium tracking-wide"
                style={{
                  background: "rgba(10,17,30,0.5)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <span className="text-[14px]">🌍</span> International Courier
                Service
              </span>
              <h1 className="text-white font-extrabold leading-[1.15] tracking-tight text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px]">
                Your Parcel, Picked Up
                <br />
                In India : <span className="text-[#e77419]">Delivered To</span>
                <br />
                <span className="text-[#e77419]">Your Door Worldwide.</span>
              </h1>
              <p className="text-[15px] text-white/80 max-w-2xl leading-relaxed font-normal">
                Documents, gifts, parcels, and commercial shipments to the USA,
                UK, Canada, Australia and beyond. Doorstep pickup. Customs
                handled. Real-time tracking.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 mt-2">
              <div className="flex items-center gap-2">
                <Stars />
                <span className="text-[13px] text-white/80 font-medium">
                  Trusted By 10,000+ Families Worldwide
                </span>
              </div>
              <span className="text-[14px] font-bold text-[#e77419]">
                50,000+ Shipments Delivered
              </span>
            </div>


            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="flex items-center gap-2 font-bold text-[13px] md:text-[15px] px-5 py-2.5 md:px-7 md:py-3.5 rounded-full text-white no-underline transition-transform hover:scale-105"
                  style={{
                    background: "#e77419",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Get Quote{" "}
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
                <a
                  href="https://wa.me/917070506070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold text-[13px] md:text-[15px] px-5 py-2.5 md:px-7 md:py-3.5 rounded-full no-underline transition-transform hover:scale-105"
                  style={{
                    background: "#23c961",
                    color: "#0a111e",
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
                  WhatsApp Us
                </a>
              </div>



            </div>
          </div>
        </div>


        {/* Action Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mt-5">
          {[
            { label: "Serviceable Zipcodes", href: "/zipcode" },
            { label: "Track Shipment", href: "/track" },
            { label: "Our Services", href: "/services" },
            { label: "Contact Us", href: "/contact" },
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

      {/* ── 2. TRUSTED DELIVERY PARTNERS (FULL WIDTH GRAY BAR) ── */}
      {/* Issue #8: consistent order DHL, FedEx, UPS, Aramex, DPD */}
      <section className="w-full bg-[#e5e6eb] py-8 mt-4">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-center md:justify-around items-center gap-6 md:gap-12">
          <div className="flex text-center md:text-left">
            <span className="text-xl sm:text-2xl font-extrabold text-[#e77419] leading-snug block">
              Trusted Delivery
              <br className="hidden md:block" />
              Partners ✈️
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {PARTNERS.map((p) => (
              <span key={p} className="text-xl sm:text-2xl font-extrabold text-[#0a111e]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="bg-[#F7F7F8] rounded-xl p-8 sm:p-14">
          <div className="mb-10">
            <span className="inline-block border border-[#e77419] text-[#e77419] px-5 py-1.5 bg-[#FF7F001F] rounded-full text-[12px] font-semibold tracking-wide mb-5">
              How It Works
            </span>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#0a111e] leading-tight">
              Ship in Four Simple Steps
            </h2>
            {/* Issue #9: removed em-dash, use semicolon */}
            <p className="text-[15px] text-[#666] mt-3 max-w-2xl leading-relaxed">
              No complicated forms. Just WhatsApp us your details and we handle
              the rest; pickup to delivery.
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
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHERE WE PICK UP AND DELIVER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
        <div className="bg-[#e5e6eb] rounded-xl p-8 sm:p-14">
          <div className="text-center mb-12">
            <span className="inline-block border bg-[#FF7F001F] border-[#e77419] text-[#e77419] px-5 py-1.5 rounded-full text-[12px] font-semibold tracking-wide mb-5">
              Where We Pick Up and Deliver
            </span>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#0a111e] leading-tight">
              Where We Pick Up and Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Across India */}
            <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col h-full">
              <p className="text-[16px] font-bold text-[#0a111e] mb-3">
                📍 Pickup Across India
              </p>
              {/* Issue #9: removed em-dash */}
              <p className="text-[14px] text-[#666] leading-relaxed mb-6">
                We specialise in North India, with pan-India pickup available on
                request.
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
                  + Pan-India
                </span>
              </div>
            </div>

            {/* Delivery Destinations - Issue #7: alphabetical */}
            <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col h-full justify-between">
              <div>
                <p className="text-[16px] font-bold text-[#0a111e] mb-5">
                  ✈️ Delivery Destinations
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {DESTINATIONS.map((d) => (
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
                    + Worldwide
                  </span>
                </div>
              </div>
              {/* Issue #8+#9: consistent carrier order, comma instead of dash */}
              <p className="text-[13px] text-[#666] leading-relaxed mt-6">
                Delivered via our trusted global carrier network: DHL, FedEx,
                UPS, Aramex, DPD.
              </p>
            </div>
          </div>

          {/* What You Can Ship */}
          <div className="mt-6 bg-white rounded-3xl p-6 sm:px-8 sm:py-6 shadow-sm">
            <p className="text-[15px] font-bold text-[#0a111e] mb-2">
              🎁 What You Can Ship
            </p>
            {/* Issue #9: removed em-dash at end */}
            <p className="text-[12.5px] text-[#777] leading-[1.6]">
              Rakhis and festival gifts, sweets &amp; dry fruits, gift hampers,
              clothing &amp; ethnic wear, business documents, commercial
              samples, personal parcels. Not sure about an item?{" "}
              <a
                href="https://wa.me/917070506070"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e77419] font-bold underline"
              >
                Ask us on WhatsApp
              </a>
              ; we&apos;ll confirm before you book.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. STATS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="rounded-xl p-6 sm:p-12" style={{ background: "#FF7F0052" }}>
          <p className="text-center text-[#0a111e] text-[18px] md:text-[20px] font-extrabold mb-6 md:mb-10">
            Numbers That Speak for Themselves
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
                  key={s.label}
                  className={`flex flex-col items-center gap-2 md:gap-4 text-center py-4 md:py-6 px-2 md:px-4 ${borderClass}`}
                >
                  <span className="text-[32px] md:text-[56px] font-bold leading-none text-[#e77419]">
                    {s.value}
                  </span>
                  <span className="text-[11px] md:text-[13px] font-bold text-[#555] uppercase tracking-wide">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
        <div className="bg-[#e5e6eb] rounded-xl p-8 sm:p-14">
          <div className="mb-10 text-center sm:text-left">
            <span className="inline-block border border-[#e77419] text-[#e77419] px-4 py-1.5 rounded-full text-[12px] font-bold mb-4">
              From Our Customers
            </span>
            <h2 className="text-[26px] md:text-[32px] font-extrabold text-[#0a111e]">
              Trusted by Families Worldwide
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-8 rounded-2xl bg-white shadow-sm"
              >
                <span className="text-[32px] md:text-[40px] text-[#e77419] font-serif leading-none select-none">
                  &#x201C;&#x201C;
                </span>
                <p className="text-[15px] text-[#666] leading-relaxed italic mb-4">
                  {t.text}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0"
                    style={{ background: "#e77419" }}
                  >
                    {t.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[14px] font-bold text-[#0a111e]">
                      {t.name}
                    </p>
                    <p className="text-[12px] text-[#666]">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TIMER + FAQ ── */}
      {/* Issue #3+#4: Compact countdown timer above FAQs */}
      <section className="w-full flex flex-col justify-center items-center mx-auto  py-10">
        {/* Compact Timer */}
        <div className="mb-14 w-full">
          <CompactTimer endDate={offerDetails.endDate} title={offerDetails.title} subtitle={offerDetails.subtitle} />
        </div>

        {/* Issue #2: Claude-style interactive accordion FAQ */}
        <div className="bg-[#e5e6eb] rounded-xl p-8 sm:p-14 max-w-[1400px] px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block border border-[#e77419] text-[#e77419] px-4 py-1.5 rounded-full text-[12px] font-bold mb-4">
              FAQ
            </span>
            <h2 className="text-[26px] md:text-[32px] font-extrabold text-[#0a111e]">
              Questions? Glad You Asked
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
                      <span>{f.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#e77419] shrink-0 mt-0.5 transition-transform duration-300 ${isActive ? "rotate-180" : ""
                          }`}
                      />
                    </h3>
                  </div>

                  {/* Right: Answer */}
                  <p
                    className="leading-relaxed transition-all duration-300"
                    style={{
                      fontSize: isActive ? "15px" : "13px",
                      color: isActive ? "#4b5563" : "#9ca3af",
                      fontStyle: isActive ? "normal" : "italic",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {f.a}
                    {f.link && (
                      <>
                        <Link
                          href={f.link.href}
                          className="text-[#e77419] font-bold underline ml-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {f.link.text}
                        </Link>
                        {f.afterLink}
                      </>
                    )}
                  </p>
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
            Send Your Parcel from India Today.
          </h2>
          {/* Issue #9: removed em-dash in CTA */}
          <p className="text-[16px] text-[#666] leading-relaxed max-w-2xl mx-auto mt-4 mb-10">
            Tell us where it is in India and where it needs to go. We&apos;ll
            handle everything else; pickup to delivery.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {/* Get Quote */}
            <Link
              href="/quote"
              className="flex items-center gap-2 font-bold text-[13px] md:text-[15px] px-6 py-3 md:px-8 md:py-4 rounded-full text-white no-underline transition-transform hover:scale-105"
              style={{
                background: "#e77419",
              }}
            >
              Get Quote <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
            {/* WhatsApp */}
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
              WhatsApp Us
            </a>
            {/* Call - Issue #10: consistent phone format +91 7070 506070 */}
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
              Call +91 7070 506070
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

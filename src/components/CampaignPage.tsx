"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ─── DATA ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "WhatsApp or Email details",
    desc: "Share your parcel details — weight, destination, contents — over WhatsApp or email. No forms, no hassle.",
  },
  {
    num: "02",
    title: "Receive your instant quote",
    desc: "Get a transparent price estimate within minutes. No hidden charges. Customs duties explained upfront.",
  },
  {
    num: "03",
    title: "We pack, ship and handle customs",
    desc: "Our team does the heavy lifting: professional packing, export documentation, and customs clearance.",
  },
  {
    num: "04",
    title: "Delivered to your door",
    desc: "Real-time tracking from Delhi to your destination worldwide. Doorstep delivery guaranteed.",
  },
];

const PICKUP_CITIES = [
  "Punjabi Bagh",
  "Dwarka",
  "Rohini",
  "Janakpuri",
  "Lajpat Nagar",
  "Greater Kailash",
  "Noida",
  "Gurgaon",
];
const DESTINATIONS = ["USA", "Canada", "UK", "Australia"];
const PARTNERS = ["FedEx", "DHL", "UPS", "DHL Express", "ARAMEX"];

const STATS = [
  { value: "98%", label: "DELIVERY SUCCESS RATE" },
  { value: "50K+", label: "SHIPMENTS DELIVERED" },
  { value: "10K+", label: "HAPPY CUSTOMERS" },
  { value: "1000+", label: "CUSTOMS CLEARANCES" },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Delhi → New Jersey, USA",
    text: "Sent a huge rakhi package to my brother in New Jersey. Manvi handled everything — packing, customs, tracking. It arrived in 5 days!",
    rating: 5,
  },
  {
    name: "Arun Mehta",
    location: "Delhi → Toronto, Canada",
    text: "Commercial invoice, customs docs, export paperwork — they took care of it all. My business shipments finally go through without delays.",
    rating: 5,
  },
  {
    name: "Sunita Kapoor",
    location: "Dwarka → London, UK",
    text: "The WhatsApp coordination is seamless. I just send them my parcel details and they do everything else. Highly recommend.",
    rating: 5,
  },
  {
    name: "Rajesh Bhatia",
    location: "Noida → Sydney, Australia",
    text: "I've sent 12 parcels through Manvi now. Never a single issue. The tracking updates are real-time and the team is always reachable.",
    rating: 5,
  },
];

const FAQS = [
  {
    q: "Where Can I Send My Parcel?",
    a: "We deliver to over 220 countries and territories worldwide, including the USA, UK, Canada, Australia, UAE, Germany, Singapore, New Zealand, and beyond. If you're unsure about your destination, just WhatsApp us.",
  },
  {
    q: "How Much Does It Cost?",
    a: "Pricing depends on weight, dimensions, destination, and service type. Documents start from ₹850, parcels from ₹1,200. We give you an exact quote with no hidden charges before you commit.",
  },
  {
    q: "How Long Is Delivery Time?",
    a: "Express shipments reach the USA, UK, and Canada in 3–5 business days. Standard service takes 5–7 business days. Delivery times may vary slightly based on customs clearance at the destination.",
  },
  {
    q: "Can I Track My Shipment?",
    a: "Yes, every shipment comes with a real-time tracking number. You can track via our website, the carrier's website, or we'll send you WhatsApp updates at key milestones.",
  },
  {
    q: "What Items Can I Ship?",
    a: "Documents, gifts, clothes, electronics, ayurvedic products, food items (non-perishable), commercial goods, and more. Some items are restricted by destination country customs — we'll advise you upfront.",
  },
];

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="#f27a1a"
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ q = "", a = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(0,0,0,0.08)" }}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between py-4 gap-4">
        <span className="text-[15px] font-semibold text-[#0b1220]">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 shrink-0 text-[#f27a1a]" />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0 text-[#666]" />
        )}
      </div>
      {open && (
        <p className="text-[13px] text-[#555] leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CampaignPage() {
  return (
    <main className="w-full font-sans bg-white">
      {/* ── 1. HERO ── */}
      <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 py-6">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "485px", borderRadius: "16px" }}
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
            style={{ background: "rgba(0,0,0,0.5)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 54.84%)",
            }}
          />
          <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span
                className="text-[11px] font-bold tracking-widest text-white/90 w-fit px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                🌐 International Courier Service
              </span>
              <h1
                className="text-white font-extrabold leading-[1.1] tracking-tight"
                style={{ fontSize: "clamp(28px,4vw,52px)" }}
              >
                Your Parcel, Picked Up
                <br />
                In India —{" "}
                <span style={{ color: "#f27a1a" }}>Delivered To</span>
                <br />
                <span style={{ color: "#f27a1a" }}>Your Door Worldwide.</span>
              </h1>
              <p className="text-white/75 text-[14px] leading-relaxed max-w-lg">
                Documents, Gifts, Parcels, And Commercial Shipments To The USA,
                UK, Canada, Australia And Beyond. Doorstep Pickup. Customs
                Handled. Real-Time Tracking.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="flex items-center gap-2 font-bold text-[14px] px-5 py-3 rounded-full no-underline"
                  style={{
                    background: "#f27a1a",
                    color: "#fff",
                    boxShadow: "0 4px 18px rgba(242,122,26,0.45)",
                  }}
                >
                  Get Quote{" "}
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold text-[14px] px-5 py-3 rounded-full no-underline"
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
                  }}
                >
                  <svg
                    className="w-[17px] h-[17px]"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Stars />
                  <span className="text-white/80 text-[13px] font-medium">
                    Trusted By 10,000+ Families Worldwide
                  </span>
                </div>
                <p
                  className="text-[14px] font-extrabold mt-1"
                  style={{ color: "#f27a1a" }}
                >
                  50,000+ Shipments Delivered
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { label: "Serviceable Zipcodes", href: "/zipcode" },
            { label: "Track Shipment", href: "/track" },
            { label: "Our Services", href: "/services" },
            { label: "Contact Us", href: "/contact" },
          ].map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center justify-center gap-2 rounded-2xl text-[13px] font-semibold text-white py-4 transition-all text-center px-3 no-underline hover:bg-[#f27a1a]"
              style={{ background: "#0b1220" }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── 2. TRUSTED DELIVERY PARTNERS ── */}
      <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 py-6">
        <div
          className="flex flex-wrap items-center gap-6 px-6 py-4 rounded-2xl"
          style={{
            background: "#fef6ee",
            border: "1px solid rgba(242,122,26,0.15)",
          }}
        >
          <span className="text-[13px] font-bold text-[#f27a1a] whitespace-nowrap flex items-center gap-1.5">
            🤝 Trusted Delivery Partners
          </span>
          <div className="flex flex-wrap gap-6 items-center">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="text-[14px] font-extrabold text-[#0b1220] tracking-wide"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-widest text-[#f27a1a] uppercase bg-[#fef6ee] px-3 py-1 rounded-full">
            Our Process
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#0b1220] mt-3 leading-tight">
            Ship In Four Simple Steps
          </h2>
          <p className="text-[14px] text-[#666] mt-2 max-w-lg mx-auto">
            From pickup in Delhi to delivery at your door worldwide — we make
            international shipping effortless.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{
                background: "#fef6ee",
                border: "1px solid rgba(242,122,26,0.12)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-[14px] shrink-0"
                style={{ background: "#f27a1a" }}
              >
                {step.num}
              </div>
              <h3 className="text-[15px] font-bold text-[#0b1220] leading-snug">
                {step.title}
              </h3>
              <p className="text-[13px] text-[#666] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. WHERE WE PICK UP AND DELIVER ── */}
      <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 py-10">
        <div
          className="rounded-2xl p-8"
          style={{
            background: "#f8f9fa",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#0b1220] text-center mb-8">
            Where We Pick Up And Deliver
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pickup */}
            <div>
              <p className="text-[12px] font-bold text-[#f27a1a] uppercase tracking-widest mb-3">
                📍 Pickup Across Delhi
              </p>
              <p className="text-[13px] text-[#555] mb-4 leading-relaxed">
                Free doorstep pickup from all major Delhi NCR areas — Dwarka,
                Palam, Rohini, Janakpuri, Punjabi Bagh, Lajpat Nagar, Greater
                Kailash, Noida, Gurgaon, and more.
              </p>
              <div className="flex flex-wrap gap-2">
                {PICKUP_CITIES.map((c) => (
                  <span
                    key={c}
                    className="text-[12px] font-semibold px-3 py-1.5 rounded-lg"
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(242,122,26,0.3)",
                      color: "#0b1220",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            {/* Destinations */}
            <div>
              <p className="text-[12px] font-bold text-[#f27a1a] uppercase tracking-widest mb-3">
                🌍 Delivery Destinations
              </p>
              <p className="text-[13px] text-[#555] mb-4 leading-relaxed">
                We ship to 220+ countries including the USA, UK, Canada,
                Australia, UAE, Germany, New Zealand, Singapore, and beyond.
                Customs clearance included on all routes.
              </p>
              <div className="flex flex-wrap gap-2">
                {DESTINATIONS.map((d) => (
                  <span
                    key={d}
                    className="text-[12px] font-bold px-3 py-1.5 rounded-lg text-white"
                    style={{ background: "#f27a1a" }}
                  >
                    {d}
                  </span>
                ))}
                <span
                  className="text-[12px] font-semibold px-3 py-1.5 rounded-lg"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.1)",
                    color: "#555",
                  }}
                >
                  + 216 more
                </span>
              </div>
              <p className="text-[12px] text-[#888] mt-4 leading-relaxed">
                Restricted items vary by destination country. We advise you
                upfront on what can and cannot be shipped to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. STATS BANNER ── */}
      <section className="w-full py-12" style={{ background: "#f27a1a" }}>
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6">
          <p className="text-center text-white/80 text-[12px] font-bold tracking-widest uppercase mb-8">
            Numbers That Speak For Themselves
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="text-[36px] sm:text-[44px] font-black text-white leading-none">
                  {s.value}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ── */}
      <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-widest text-[#f27a1a] uppercase bg-[#fef6ee] px-3 py-1 rounded-full">
            Reviews
          </span>
          <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#0b1220] mt-3">
            Trusted By Families Worldwide
          </h2>
          <p className="text-[14px] text-[#666] mt-2">
            Real stories from customers who ship with us every month.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{
                background: "#fef6ee",
                border: "1px solid rgba(242,122,26,0.12)",
              }}
            >
              <Stars count={t.rating} />
              <p className="text-[14px] text-[#333] leading-relaxed">
                "{t.text}"
              </p>
              <div
                className="flex items-center gap-3 mt-auto pt-2"
                style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-extrabold text-[13px] shrink-0"
                  style={{ background: "#f27a1a" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0b1220]">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-[#888]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-widest text-[#f27a1a] uppercase bg-[#fef6ee] px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#0b1220] mt-3">
            Questions? Glad You Asked
          </h2>
        </div>
        <div className="flex flex-col">
          {FAQS.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ── 8. BOTTOM CTA ── */}
      <section
        className="w-full py-16 px-4 sm:px-6 text-center"
        style={{ background: "#0b1220" }}
      >
        <div className="max-w-[700px] mx-auto flex flex-col items-center gap-5">
          <span className="text-[11px] font-bold tracking-widest text-[#f27a1a] uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Start Shipping Today
          </span>
          <h2 className="text-[26px] sm:text-[36px] font-extrabold text-white leading-tight">
            Send Your Parcel from India Today.
          </h2>
          <p className="text-[14px] text-white/65 leading-relaxed max-w-md">
            All it takes is a WhatsApp message to our team. We handle everything
            from Doorstep Pickup in Delhi to Final Delivery worldwide.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/quote"
              className="flex items-center gap-2 font-bold text-[14px] px-6 py-3.5 rounded-full no-underline"
              style={{
                background: "#f27a1a",
                color: "#fff",
                boxShadow: "0 4px 18px rgba(242,122,26,0.45)",
              }}
            >
              Get a Free Quote{" "}
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-[14px] px-6 py-3.5 rounded-full no-underline"
              style={{
                background: "#25D366",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
              }}
            >
              <svg
                className="w-[17px] h-[17px]"
                viewBox="0 0 24 24"
                fill="#fff"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

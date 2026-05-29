"use client";
import { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import Image from "next/image";

const FAQS = [
  {
    id: "01",
    question: "How Is The Shipping Cost Calculated?",
    answer:
      "Our shipping costs are calculated based on three main factors: destination country, package weight, and delivery urgency. We use real-time rates from our carrier partners to provide you with the most accurate pricing.",
  },
  {
    id: "02",
    question: "Are There Any Fees Or Hidden Charges?",
    answer:
      "No hidden fees. The quote you receive includes all shipping costs, handling charges, and standard insurance. Additional services like signature confirmation or extra insurance can be added at checkout.",
  },
  {
    id: "03",
    question: "What Payment Methods Do You Accept?",
    answer:
      "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. For corporate clients, we also offer credit terms and invoice-based payments.",
  },
  {
    id: "04",
    question: "How Long Does International Shipping Take?",
    answer:
      "Delivery timelines vary by destination and service type. Document Express typically takes 3–5 business days, Parcel Shipping 5–7 days, and Cargo Express 2–3 days to major destinations.",
  },
  {
    id: "05",
    question: "Can I Track My Shipment In Real Time?",
    answer:
      "Yes. Once your shipment is booked, you'll receive a tracking number via SMS and email. You can track your package live on our website or directly through the carrier's portal.",
  },
];

export default function GetQuote() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState("");
  const [content, setContent] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [quote, setQuote] = useState<{ price: number; days: number; volumetric: number } | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>("01");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = Number(weight) || 1;
    const l = Number(length) || 0;
    const b = Number(breadth) || 0;
    const h = Number(height) || 0;
    const volumetric = l && b && h ? parseFloat(((l * b * h) / 5000).toFixed(2)) : 0;
    const chargeableWeight = Math.max(w, volumetric);
    const svcMul: Record<string, number> = { document: 0.85, parcel: 1.1, express: 1.4 };
    const price = Math.round((chargeableWeight * 480 + 300) * (svcMul[service] ?? 1));
    const days = service === "express" ? 3 : 5;
    setQuote({ price, days, volumetric });
  };

  return (
    <div className="flex flex-col flex-grow">

      {/* Banner */}
      <section className="relative bg-[#0b1220] overflow-hidden min-h-55 flex items-center py-12 px-6">
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('/banner.jpg')` }}
        />
        <div className="max-w-425 w-full mx-auto flex flex-col relative z-10 gap-3">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-white/50">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-white/30">/</span>
            <span className="text-white">Get Quote</span>
          </div>
          <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
            Get a Quote
          </h1>
        </div>
      </section>

      {/* Body */}
      <main className="flex-grow max-w-425 w-full mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">

        {/* Quote + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: Orange Quote Form Card */}
          <div className="bg-[#f27a1a] rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="border border-white/40 text-white rounded-full px-4 py-1 text-[11px] font-extrabold w-fit tracking-wide">
                Instant Estimate
              </div>
              <h2 className="text-[28px] sm:text-[32px] font-extrabold text-white leading-[1.1] tracking-tight uppercase">
                CONNECTING CONTINENTS,<br />DELIVERING TRUST.
              </h2>
              <p className="text-white/80 text-[13px] leading-relaxed">
                Send documents, parcels, food items, gifts, or commercial shipments worldwide with confidence.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Pick Up Location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Drop Location"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Actual Weight (Kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0.1"
                  step="0.1"
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                />
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none appearance-none"
                >
                  <option value="">Service</option>
                  <option value="document">Document Express</option>
                  <option value="parcel">Parcel Shipping</option>
                  <option value="express">Cargo Express</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-white/80 text-[11px] font-semibold tracking-wide uppercase pl-1">
                  Volume Weight (cm)
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="Length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    min="0"
                    className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="Breadth"
                    value={breadth}
                    onChange={(e) => setBreadth(e.target.value)}
                    min="0"
                    className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="Height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="0"
                    className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                <input
                  type="text"
                  placeholder="Content / Description"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="bg-[#0b1220] hover:bg-slate-800 text-white font-bold text-[13px] py-3 px-6 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  Get Quote <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </form>

            {quote && (
              <div className="p-4 bg-[#0b1220]/90 rounded-xl border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-[#f27a1a] font-bold uppercase tracking-wider block">
                      Estimated Cost
                    </span>
                    <span className="text-lg font-extrabold text-white">
                      ₹{quote.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {quote.volumetric > 0 && (
                    <div className="text-center">
                      <span className="text-[9px] text-zinc-400 block">Vol. Weight</span>
                      <span className="text-sm font-bold text-white">{quote.volumetric} Kg</span>
                    </div>
                  )}
                  <div className="text-right">
                    <span className="text-[9px] text-zinc-400 block">Est. Delivery</span>
                    <span className="text-sm font-bold text-white">{quote.days} Days</span>
                  </div>
                  <button
                    onClick={() => setQuote(null)}
                    className="text-zinc-500 hover:text-white text-xs ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info card */}
          <div className="flex flex-col gap-5">
            <div className="relative w-full h-64 sm:h-80 rounded-[28px] overflow-hidden bg-slate-200">
              <Image
                src="/warehouse_worker.png"
                alt="Manvi Courier"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white/80 text-[11px] font-bold tracking-widest uppercase">
                  Trusted Worldwide
                </span>
                <p className="text-white text-[20px] font-extrabold leading-tight mt-1">
                  225+ Countries.<br />One Reliable Partner.
                </p>
              </div>
            </div>

            <div className="bg-[#eef0f5] border border-gray-200/50 rounded-[28px] p-8 lg:p-10 shadow-sm flex flex-col gap-5">
              <h3 className="text-[22px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                How Is Your Quote Calculated?
              </h3>
              <div className="flex flex-col gap-4 text-[13px] text-[#727C88] leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f27a1a] text-white text-xs font-bold shrink-0 mt-0.5">1</span>
                  <div>
                    <span className="font-bold text-[#1c1f2e] block mb-0.5">Chargeable Weight</span>
                    We use the higher of actual weight vs volumetric weight (L × B × H ÷ 5000).
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f27a1a] text-white text-xs font-bold shrink-0 mt-0.5">2</span>
                  <div>
                    <span className="font-bold text-[#1c1f2e] block mb-0.5">Service Type</span>
                    Document Express, Parcel Shipping, and Cargo Express each carry different multipliers.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f27a1a] text-white text-xs font-bold shrink-0 mt-0.5">3</span>
                  <div>
                    <span className="font-bold text-[#1c1f2e] block mb-0.5">Destination</span>
                    Rates vary by corridor. Final confirmed pricing is shared after our team reviews your shipment.
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-5 flex flex-col gap-2">
                <p className="text-[12px] text-gray-400 font-medium">
                  This is an instant estimate only. Actual rates may vary based on destination surcharges, fuel levies, and customs duties.
                </p>
                 <a
                  href="tel:+917070506070"
                  className="inline-flex items-center gap-2 text-[#f27a1a] font-bold text-[13px] hover:underline mt-1"
                >
                  Call us to confirm → +91 7070-506070
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ Section ── */}
        <div className="bg-[#eef0f5] border border-gray-200/50 rounded-[28px] p-8 sm:p-10 lg:p-14 shadow-sm flex flex-col items-center gap-8">

          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="border border-orange-300/80 text-[#f27a1a] bg-orange-50/50 rounded-full px-4 py-1 text-[11px] font-extrabold tracking-wide">
              Got Questions?
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ List */}
          <div className="w-full flex flex-col">
            {FAQS.map((faq, idx) => (
              <div
                key={faq.id}
                className={`border-b border-gray-200/80 ${idx === 0 ? "border-t" : ""}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full grid grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start py-6 text-left group"
                >
                  {/* Number */}
                  <span className="text-[#f27a1a] text-[12px] font-black tracking-widest pt-0.5">
                    {faq.id}
                  </span>

                  {/* Question + Answer */}
                  <div className="flex flex-col gap-2">
                    <span className={`text-[16px] sm:text-[18px] font-bold transition-colors ${openFaq === faq.id ? "text-[#1c1f2e]" : "text-[#333b49] group-hover:text-[#1c1f2e]"}`}>
                      {faq.question}
                    </span>
                    {openFaq === faq.id && (
                      <p className="text-[13px] text-[#727C88] font-medium leading-relaxed pr-4">
                        {faq.answer}
                      </p>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="pt-0.5 shrink-0">
                    {openFaq === faq.id ? (
                      <Minus className="w-5 h-5 text-[#1c1f2e]" strokeWidth={1.5} />
                    ) : (
                      <Plus className="w-5 h-5 text-[#1c1f2e] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
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
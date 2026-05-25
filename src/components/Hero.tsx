"use client";
import { useState } from "react";
import { Phone, ArrowRight } from "lucide-react";

export default function Hero() {
  const [service, setService] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [dimension, setDimension] = useState("");
  const [mobile, setMobile] = useState("");
  const [quote, setQuote] = useState<{ price: number; days: number } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = Number(weight) || 1;
    const destMul: Record<string, number> = { usa: 2.4, uk: 1.9, uae: 1.3, aus: 2.6, global: 1.5 };
    const svcMul: Record<string, number> = { document: 0.85, parcel: 1.1, express: 1.4 };
    const price = Math.round((w * 480 + 300) * (destMul[destination] ?? 1) * (svcMul[service] ?? 1));
    const days = service === "express" ? 3 : 5;
    setQuote({ price, days });
  };

  return (
    <section className="max-w-6xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Orange form card */}
      <div className="lg:col-span-5 bg-[#f27a1a] text-white p-7 rounded-2xl shadow-xl relative overflow-hidden flex flex-col gap-5">
        <div className="absolute inset-0 bg-white/[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-3">
          <h2 className="text-2xl font-extrabold leading-tight uppercase tracking-tight">
            CONNECTING CONTINENTS,<br />DELIVERING TRUST.
          </h2>
          <p className="text-orange-100 text-[11px] leading-relaxed">
            Your logistics partner for fast, safe, and reliable international shipping. Calculate estimated courier rates instantly.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1">
            <div className="grid grid-cols-2 gap-3">
              <select value={service} onChange={e => setService(e.target.value)} required className="bg-white text-[#0f172a] font-semibold text-xs rounded-lg px-3 py-2.5 focus:outline-none">
                <option value="">Choose Service</option>
                <option value="document">Document Express</option>
                <option value="parcel">Parcel Shipping</option>
                <option value="express">Cargo Express</option>
              </select>
              <select value={destination} onChange={e => setDestination(e.target.value)} required className="bg-white text-[#0f172a] font-semibold text-xs rounded-lg px-3 py-2.5 focus:outline-none">
                <option value="">Select Destination</option>
                <option value="usa">USA</option>
                <option value="uk">United Kingdom</option>
                <option value="uae">UAE</option>
                <option value="aus">Australia</option>
                <option value="global">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Weight (Kg)" value={weight} onChange={e => setWeight(e.target.value)} required min="0.1" step="0.1" className="bg-white text-[#0f172a] font-semibold text-xs rounded-lg px-3 py-2.5 focus:outline-none" />
              <input type="text" placeholder="Dimension (L x W x H)" value={dimension} onChange={e => setDimension(e.target.value)} className="bg-white text-[#0f172a] font-semibold text-xs rounded-lg px-3 py-2.5 focus:outline-none" />
            </div>
            <div className="grid grid-cols-12 gap-3">
              <input type="tel" placeholder="Mobile No" value={mobile} onChange={e => setMobile(e.target.value)} required className="col-span-7 bg-white text-[#0f172a] font-semibold text-xs rounded-lg px-3 py-2.5 focus:outline-none" />
              <button type="submit" className="col-span-5 bg-[#0b1220] hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-lg transition-all active:scale-95 cursor-pointer">Get Quote</button>
            </div>
          </form>
          {quote && (
            <div className="mt-1 p-3 bg-[#0b1220]/90 rounded-xl border border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-[#f27a1a] font-bold uppercase tracking-wider block">Estimated Cost</span>
                  <span className="text-lg font-extrabold text-white">₹{quote.price.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-zinc-400 block">Est. Delivery</span>
                  <span className="text-sm font-bold text-white">{quote.days} Days</span>
                </div>
                <button onClick={() => setQuote(null)} className="text-zinc-500 hover:text-white text-xs ml-2">✕</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dark hero card */}
      <div className="lg:col-span-7 bg-[#0b1220] rounded-2xl p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[360px] shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-slate-900 to-indigo-950/40 z-0" />
        <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col gap-3">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-[#f27a1a]/20 text-[#f27a1a] border border-[#f27a1a]/30 w-fit px-2.5 py-0.5 rounded-full">Global Logistics</span>
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight mt-1">
            We Don&apos;t Just Move Parcels;<br />
            <span className="text-[#f27a1a]">We Bridge Distances.</span>
          </h2>
        </div>
        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
          <a href="tel:+919900099000" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-full bg-[#f27a1a] flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Hotline Help</span>
              <span className="text-xs text-white font-bold">+91 99000 99000</span>
            </div>
          </a>
          <a href="#contact" className="px-5 py-2.5 bg-[#f27a1a] hover:bg-orange-600 rounded-full text-xs font-bold text-white shadow-lg active:scale-95 transition-all flex items-center gap-1">
            Book Now <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Action tabs */}
      <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
        {[
          { icon: "⭐", label: "Select Country & Get Quote", href: "#" },
          { icon: "📄", label: "Document Checklist", href: "#prohibited" },
          { icon: "📞", label: "Our Services", href: "#services" },
          { icon: "✉", label: "Contact Us", href: "#contact" },
        ].map(tab => (
          <a key={tab.label} href={tab.href} className="flex items-center justify-center gap-2 p-3.5 bg-[#0b1220] hover:bg-[#f27a1a] rounded-xl text-xs font-bold text-white transition-all text-center">
            <span>{tab.icon}</span> {tab.label}
          </a>
        ))}
      </div>
    </section>
  );
}

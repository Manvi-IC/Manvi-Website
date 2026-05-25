import Image from "next/image";
import { Users } from "lucide-react";

export default function WhyWeLead() {
  return (
    <section className="bg-[#eef0f5] py-16 px-6 border-y border-slate-200">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Quality Excellence</span>
          <h2 className="text-2xl font-extrabold text-[#0b1220] tracking-tight">Why We Lead</h2>
        </div>

        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Quick Partnerships - white */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-5">
            <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center text-base">🤝</div>
            <div>
              <span className="text-xs font-bold text-[#0b1220] uppercase tracking-wider block mb-1.5">Quick Partnerships</span>
              <p className="text-[11px] text-zinc-500 leading-normal">We establish corporate agreements that simplify cargo routines and lower border entry duties for our partner networks.</p>
            </div>
          </div>

          {/* 98% - dark navy */}
          <div className="bg-[#0b1220] text-white p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-sm">
            <div>
              <span className="text-[9px] font-bold uppercase text-[#f27a1a] tracking-widest font-mono">Service Success</span>
            </div>
            <div>
              <span className="text-4xl font-black text-[#f27a1a]">98%</span>
              <span className="text-sm font-bold text-white block mt-1">Customer Satisfaction Score</span>
              <p className="text-[10px] text-zinc-400 mt-1">Consistently delivering peace of mind across complex global courier transits.</p>
            </div>
          </div>

          {/* Airplane photo - dark */}
          <div className="bg-[#0b1220] rounded-2xl relative overflow-hidden min-h-[180px] shadow-sm">
            <Image src="/cargo_airplane.png" alt="Cargo airplane" fill className="object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/80 to-transparent z-10" />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-[#f27a1a]">✈</span> Air Transit
              </span>
              <p className="text-[10px] text-zinc-400 mt-0.5">Time-critical express networks.</p>
            </div>
          </div>
        </div>

        {/* Row 2: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Multiple Countries - white */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-5">
            <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center text-base">🌐</div>
            <div>
              <span className="text-xs font-bold text-[#0b1220] uppercase tracking-wider block mb-1.5">Multiple Countries</span>
              <p className="text-[11px] text-zinc-500 leading-normal">Delivering to over 220+ countries and sovereign territories worldwide with local clearance support.</p>
            </div>
          </div>

          {/* Forklift photo / 1000+ - orange */}
          <div className="bg-[#f27a1a] text-white p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-sm">
            <div className="absolute inset-0 overflow-hidden">
              <Image src="/warehouse_forklift.png" alt="Warehouse" fill className="object-cover opacity-20" />
            </div>
            <div className="relative z-10">
              <span className="text-[9px] font-bold uppercase text-white/80 tracking-widest font-mono">Consignments Processed</span>
              <Users className="h-4 w-4 text-[#0b1220] float-right" />
            </div>
            <div className="relative z-10">
              <span className="text-4xl font-black text-[#0b1220]">1000+</span>
              <span className="text-sm font-bold text-white block mt-1">Customers Daily</span>
              <p className="text-[10px] text-orange-100 mt-1">Managing corporate accounts and personal express cargo on scheduled routes.</p>
            </div>
          </div>

          {/* Real-time updates - white */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-5">
            <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center text-base">⏰</div>
            <div>
              <span className="text-xs font-bold text-[#0b1220] uppercase tracking-wider block mb-1.5">Real-Time Updates</span>
              <p className="text-[11px] text-zinc-500 leading-normal">We utilize automated API webhooks. You will receive active SMS updates and tracking logs at each dispatch terminal.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

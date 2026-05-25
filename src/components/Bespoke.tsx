import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";

export default function Bespoke() {
  return (
    <section id="services" className="max-w-6xl w-full mx-auto px-6 py-16">
      <div className="flex flex-col gap-1 mb-8">
        <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Tailored Logistics</span>
        <h2 className="text-2xl font-extrabold text-[#0b1220] tracking-tight">Bespoke Shipping Solutions.</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: warehouse worker photo card */}
        <div className="lg:col-span-5 bg-[#0b1220] rounded-2xl relative overflow-hidden min-h-[380px] shadow flex flex-col justify-between">
          <div className="absolute inset-0 bg-white/[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px] z-10 pointer-events-none" />
          <Image src="/warehouse_worker.png" alt="Warehouse worker" fill className="object-cover opacity-60" />
          <div className="relative z-20 p-6 flex flex-col gap-1">
            <span className="text-[9px] font-bold uppercase text-[#f27a1a] tracking-widest">Express Air Courier</span>
            <h3 className="text-xl font-bold text-white tracking-tight">Bespoke Cargo Network</h3>
            <p className="text-zinc-400 text-[11px] leading-relaxed max-w-xs mt-1">
              Safe, verified cargo lines providing point-to-point courier and air delivery globally with customs validation support.
            </p>
          </div>
          <div className="relative z-20 p-6 flex justify-between items-center">
            <span className="text-[9px] text-[#f27a1a] font-bold uppercase tracking-widest font-mono">Status: Active</span>
            <div className="h-10 w-10 rounded-full bg-[#f27a1a] flex items-center justify-center text-white cursor-pointer shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition-colors">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Right: service tabs + accordion */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Tab header */}
          <div className="flex border-b border-slate-200 gap-6 pb-0">
            <button className="pb-3 text-xs font-extrabold uppercase tracking-wider text-[#f27a1a] border-b-2 border-[#f27a1a] relative">
              Global Personal Logistics
            </button>
            <button className="pb-3 text-xs font-extrabold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors">
              Enterprise &amp; Bulk Solutions
            </button>
          </div>

          {/* Service items */}
          {[
            { icon: "🔥", title: "Right Place at the Right Time", desc: "Our commitment is to ensure your personal cargo, household goods, or emergency documents reach their destination with speed, security, and absolute precision." },
            { icon: "📍", title: "Door-to-Door Delivery", desc: "Skip the depot queues! We pick up directly from your doorstep and deliver straight to the recipient's desk, completing clearances automatically." },
            { icon: "📦", title: "Guaranteed Delivery Dates", desc: "Time-critical consignments enjoy scheduled standard arrivals. We verify transit lanes daily to provide dependable delivery dates." },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex-shrink-0 flex items-center justify-center text-base">{item.icon}</div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0b1220]">{item.title}</span>
                <p className="text-[11px] text-zinc-500 leading-normal mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}

          {/* Collapsed Enterprise accordion */}
          <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center bg-white cursor-pointer hover:bg-slate-50 transition-colors">
            <span className="text-xs font-extrabold text-[#0b1220] uppercase tracking-wider">Enterprise &amp; Bulk Solutions</span>
            <Plus className="h-4 w-4 text-[#f27a1a]" />
          </div>
        </div>
      </div>
    </section>
  );
}

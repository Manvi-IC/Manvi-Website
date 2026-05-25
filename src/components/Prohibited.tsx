import { ArrowUpRight } from "lucide-react";

const items = [
  { name: "No Plants / Seeds", desc: "Agricultural Control" },
  { name: "No Corrosives", desc: "Chemical Hazard" },
  { name: "No Open Liquids", desc: "Leak & Spill Risks" },
  { name: "No Loose Lithium", desc: "Fire Risk Batteries" },
  { name: "No High Magnets", desc: "Aviation Interference" },
];

export default function Prohibited() {
  return (
    <section id="prohibited" className="max-w-6xl w-full mx-auto px-6 py-16">
      <div className="flex flex-col items-center text-center gap-2 mb-10">
        <span className="text-[10px] text-red-500 bg-red-50 border border-red-100 font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">Safety Compliance</span>
        <h2 className="text-2xl font-extrabold text-[#0b1220]">Prohibited Goods</h2>
        <p className="text-zinc-500 text-xs max-w-md leading-normal">To maintain safety and satisfy flight regulations, the following items are strictly banned from our express courier network:</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {items.map(item => (
          <div key={item.name} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3">
            {/* Prohibited icon: circle with slash */}
            <div className="relative h-12 w-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-0.5 bg-red-400/70 rotate-45 rounded-full" />
              </div>
              <span className="text-lg relative z-10">📦</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1220]">{item.name}</span>
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="#contact" className="text-xs font-extrabold text-[#f27a1a] hover:underline flex items-center justify-center gap-1 uppercase tracking-wider">
          View Full List of Restricted Cargo <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

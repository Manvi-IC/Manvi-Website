import { ArrowUpRight } from "lucide-react";

export default function NoCosts() {
  return (
    <section className="bg-[#0b1220] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Affordable Shipping</span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">No Hidden Costs. No Surprises. Just Straightforward Logistics.</h2>
        </div>
        <a href="#contact" className="flex-shrink-0 px-5 py-2.5 bg-[#f27a1a] hover:bg-orange-600 rounded-full text-xs font-bold text-white shadow active:scale-95 transition-all flex items-center gap-1.5">
          View Tariff Rate <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

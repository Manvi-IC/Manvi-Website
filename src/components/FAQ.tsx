"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "Which Countries Do You Ship To?", a: "We offer express shipping to over 220 countries globally including the USA, UK, UAE, Australia, Canada, Europe, and all major destinations with complete door-to-door tracking." },
  { q: "How Do I Get A Tracking Code?", a: "Once your shipment is picked up and scanned at our hub, a unique tracking number is instantly generated and sent to you via SMS and Email. You can track it in real-time on our tracking page." },
  { q: "What Is The Maximum Weight Limit?", a: "We handle shipments of all sizes. For individual parcel express, packages up to 70kg are standard. For heavier enterprise bulk cargo, we provide palletized ocean and air freight solutions with no maximum weight limit." },
  { q: "Who Handles Custom Clearances?", a: "Our in-house customs clearance experts handle all regulatory paperwork and documentation checks. We prepare customs declarations beforehand to ensure rapid clearance with minimum transit delay." },
  { q: "Is There A Insurance Cover?", a: "Yes! We offer comprehensive transit insurance cover representing up to 100% of your declared cargo value. This guarantees peace of mind against damage, loss, or customs delays." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white border-y border-slate-100 py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col items-center text-center gap-1.5">
          <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Help Center</span>
          <h2 className="text-2xl font-extrabold text-[#0b1220]">Questions? Glad You Asked</h2>
        </div>
        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`border rounded-xl px-5 py-4 cursor-pointer transition-all ${isOpen ? "bg-slate-50 border-slate-200" : "bg-white border-slate-100 hover:bg-slate-50"}`} onClick={() => setOpen(isOpen ? null : i)}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-[#0b1220] uppercase tracking-wider">{faq.q}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-[#f27a1a]" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                </div>
                {isOpen && <p className="text-[11px] text-zinc-500 leading-relaxed mt-3 pt-3 border-t border-slate-200/60">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

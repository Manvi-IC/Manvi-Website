"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

const policies = [
  { id: "customs", title: "Customs Clear Problems", desc: "In case cargo is detained by customs due to lack of local documentation, our clearance experts initiate instant mitigation. If clearance fails due to carrier variables, we process 100% transit cost refund." },
  { id: "delayed", title: "Delayed Deliveries", desc: "If express shipments do not arrive within the guaranteed window due to scheduling mistakes, we refund the premium shipping difference directly into your active wallet." },
  { id: "undelivered", title: "Undelivered Parcels", desc: "If any package is declared lost during ocean or air transit, our active insurance cover kicks in immediately, refunding your full declared consignment invoice within 24 business hours." },
  { id: "damaged", title: "Damaged Consignments", desc: "Our verification team inspects packages. If any damage is recorded during active carrier transit, we reimburse repairing costs or replace value based on your transit cover level." },
];

export default function ClaimPolicy() {
  const [active, setActive] = useState("customs");

  return (
    <section id="claims" className="max-w-6xl w-full mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 mb-2">
            <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Peace Of Mind Guarantees</span>
            <h2 className="text-2xl font-extrabold text-[#0b1220] tracking-tight">Our Refund And Loss Claim Policy</h2>
            <p className="text-xs text-zinc-500 mt-1">Logistics can sometimes face global border variables. We provide rigid, fast-track insurance claim pipelines so your investment remains 100% protected.</p>
          </div>

          {policies.map(p => {
            const isOpen = active === p.id;
            return (
              <div key={p.id} className={`border rounded-xl p-4 cursor-pointer transition-all ${isOpen ? "bg-white border-[#f27a1a] shadow-sm" : "bg-white border-slate-200 hover:bg-slate-50"}`} onClick={() => setActive(isOpen ? "" : p.id)}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center border ${isOpen ? "border-[#f27a1a] bg-[#f27a1a]" : "border-slate-300"}`}>
                      {isOpen && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-xs font-extrabold text-[#0b1220] uppercase tracking-wider">{p.title}</span>
                  </div>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-[#f27a1a]" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                </div>
                {isOpen && <p className="text-[11px] text-zinc-500 leading-normal mt-3 pt-3 border-t border-slate-100">{p.desc}</p>}
              </div>
            );
          })}
        </div>

        {/* Right: amber card */}
        <div className="lg:col-span-5 bg-[#a16207] text-white p-7 rounded-2xl shadow flex flex-col gap-5 relative overflow-hidden min-h-[340px]">
          <div className="absolute inset-0 bg-white/[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-3">
            <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 w-fit px-2.5 py-0.5 rounded-full">Disbursement Policy</span>
            <h3 className="text-xl font-black leading-tight uppercase">GET CLAIM IN 24 HOURS ON LOSS &amp; DAMAGE REFUNDING PROCESS</h3>
          </div>
          <div className="relative z-10 flex flex-col gap-3 mt-auto pt-5 border-t border-white/10">
            {["Complete Verification in 12 Hours", "Affordable shipping insurance rates", "Immediate bank account refund disbursement"].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                <span className="text-xs font-semibold">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PolicySidebar from "@/components/PolicySidebar";
import { ShieldCheck, AlertOctagon, FileCheck2, FileText, Phone, Mail, MapPin, CheckSquare, XSquare } from "lucide-react";

const sidebarItems = [
  { id: "statutory", label: "Statutory Aviation Compliance", num: "1" },
  { id: "kyc", label: "Mandatory KYC Verification", num: "2" },
  { id: "declaration", label: "Non-Discrepancy Declaration", num: "3" },
  { id: "dangerous-goods", label: "Prohibited Goods & DG Rules", num: "4" },
  { id: "reporting", label: "Law Enforcement Reporting", num: "5" },
  { id: "indemnity", label: "Shipper Indemnity & Legal Liability", num: "6" },
  { id: "compliance-officer", label: "Legal Compliance Desk", num: "7" },
];

export default function MandatoryPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#334155] text-white pt-8 sm:pt-12 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="max-w-[1650px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f27a1a]/20 border border-[#f27a1a]/40 text-[#f27a1a] text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertOctagon className="w-3.5 h-3.5" />
            Mandatory Legal Policy
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Mandatory Compliance & Legal Policy
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl leading-relaxed mb-5">
            Essential aviation security guidelines, statutory KYC rules, mandatory item declaration policies, and anti-smuggling compliance requirements at Manvi International Courier.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-400 border-t border-slate-700/80 pt-3">
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700"><strong>Effective Date:</strong> August 11, 2026</span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700"><strong>Legal Name:</strong> Manvi International Courier</span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700"><strong>Website:</strong> manvicourier.com</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        {/* Table of Contents Sidebar */}
        <PolicySidebar
          title="Table of Contents"
          items={sidebarItems}
          supportWidget={{
            title: "Compliance Desk",
            description: "Questions regarding customs regulations or KYC compliance?",
            type: "email",
            contactText: "Email Compliance Officer",
            contactHref: "mailto:info@manvicourier.com",
          }}
        />

        {/* Main Document Details */}
        <article className="lg:col-span-8 flex flex-col gap-6 sm:gap-10">
          {/* 1. Statutory */}
          <section id="statutory" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-[#d8630c] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-[#f27a1a]/20 shrink-0">1</span>
              Statutory Aviation Security Compliance
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              <strong>Manvi International Courier</strong> operates strictly in accordance with international aviation security standards governed by the International Air Transport Association (IATA), Bureau of Civil Aviation Security (BCAS), Indian Customs Act, and international postal & transport treaties. All shippers are legally bound to comply with these mandatory directives.
            </p>
          </section>

          {/* 2. Mandatory KYC */}
          <section id="kyc" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-[#d8630c] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-[#f27a1a]/20 shrink-0">2</span>
              Mandatory Know Your Customer (KYC) Requirements
            </h2>
            <p className="text-slate-600 mb-4 text-xs sm:text-sm leading-relaxed">
              Under Indian Customs export rules, no international shipment can be dispatched without verified identity and address proofs of the sender.
            </p>

            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 mb-4">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-xs sm:text-sm">
                <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#f27a1a] shrink-0" /> Acceptable KYC Documents for Shippers:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200"><CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> Aadhaar Card (Front & Back)</div>
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200"><CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> Valid Passport Copy</div>
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200"><CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> Voter Identification Card</div>
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200"><CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> PAN Card & GST Registration (Commercial)</div>
              </div>
            </div>
            <p className="text-xs text-[#f27a1a] font-bold leading-relaxed">
              Failure to provide authentic KYC documents will result in immediate shipment cancellation and refusal of service.
            </p>
          </section>

          {/* 3. Non-Discrepancy Declaration */}
          <section id="declaration" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-[#d8630c] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-[#f27a1a]/20 shrink-0">3</span>
              Non-Discrepancy Item Declaration
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
              Shippers must sign/submit a true and accurate packing declaration. Concealing items, misrepresenting item values, or declaring commercial items as personal gifts is strictly prohibited and illegal under export customs laws.
            </p>
          </section>

          {/* 4. Dangerous Goods */}
          <section id="dangerous-goods" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-[#d8630c] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-[#f27a1a]/20 shrink-0">4</span>
              Prohibited & Dangerous Goods Rules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 mb-4">
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-amber-900 flex items-center gap-2"><XSquare className="w-4 h-4 text-[#f27a1a] shrink-0" /> No Explosives, Gases, or Flammable Liquids</div>
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-amber-900 flex items-center gap-2"><XSquare className="w-4 h-4 text-[#f27a1a] shrink-0" /> No Illegal Narcotics, Drugs, or Banned Chemicals</div>
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-amber-900 flex items-center gap-2"><XSquare className="w-4 h-4 text-[#f27a1a] shrink-0" /> No Firearms, Ammunition, or Weapons Replica</div>
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-amber-900 flex items-center gap-2"><XSquare className="w-4 h-4 text-[#f27a1a] shrink-0" /> No Loose Cash, Bullion, or Precious Gems</div>
            </div>
          </section>

          {/* 5. Law Enforcement Reporting */}
          <section id="reporting" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-[#d8630c] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-[#f27a1a]/20 shrink-0">5</span>
              Anti-Smuggling & Law Enforcement Reporting
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Manvi International Courier maintains a strict zero-tolerance policy against contraband smuggling, illicit drug trade, or tax evasion. Any attempt to ship contraband will be immediately handed over to <strong>Narcotics Control Bureau (NCB)</strong>, <strong>Customs Intelligence</strong>, and local police agencies along with the shipper&apos;s KYC details.
            </p>
          </section>

          {/* 6. Shipper Indemnity */}
          <section id="indemnity" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-[#d8630c] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-[#f27a1a]/20 shrink-0">6</span>
              Shipper Indemnity & Legal Liability
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              The shipper explicitly agrees to defend, indemnify, and hold harmless Manvi International Courier against all legal fines, airline penalties, customs seizures, or legal claims resulting from false declarations or forbidden items enclosed in the shipper&apos;s parcel.
            </p>
          </section>

          {/* 7. Legal Compliance Desk */}
          <section id="compliance-officer" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-8 rounded-2xl shadow-md scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#f27a1a] shrink-0" />
              Legal Compliance Officer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <Mail className="w-5 h-5 text-[#f27a1a] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-bold text-white mb-0.5">Compliance Email</div>
                  <a href="mailto:info@manvicourier.com" className="hover:text-white transition-colors break-all">info@manvicourier.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <Phone className="w-5 h-5 text-[#f27a1a] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Compliance Phone</div>
                  <a href="tel:+917070506070" className="hover:text-white transition-colors">+91 7070506070</a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <MapPin className="w-5 h-5 text-[#f27a1a] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Corporate Headquarters</div>
                  <p className="leading-relaxed">HQ Shiksha Bharti school road, opposite Agroha furnishings, blocks C sector 7 Dwarka, Palam, New Delhi, 110077</p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}



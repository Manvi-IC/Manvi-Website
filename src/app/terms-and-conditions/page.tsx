"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PolicySidebar from "@/components/PolicySidebar";
import { Scale, ShieldAlert, FileText, Phone, Mail, MapPin } from "lucide-react";

const sidebarItems = [
  { id: "acceptance", label: "Acceptance of Terms", num: "1" },
  { id: "services", label: "Scope of Services", num: "2" },
  { id: "billing-weight", label: "Charges & Volumetric Weight", num: "3" },
  { id: "shipper-obligations", label: "Shipper Obligations & KYC", num: "4" },
  { id: "customs-duties", label: "Customs & Destination Duties", num: "5" },
  { id: "prohibited", label: "Prohibited Goods & Inspection", num: "6" },
  { id: "liability", label: "Limitation of Liability", num: "7" },
  { id: "governing-law", label: "Governing Law & Jurisdiction", num: "8" },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#334155] text-white pt-8 sm:pt-12 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="max-w-[1650px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f27a1a]/20 border border-[#f27a1a]/40 text-[#f27a1a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            Official Policy
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Terms and Conditions
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl leading-relaxed mb-5">
            The legal terms governing the use of Manvi International Courier services, shipment bookings, volumetric weight assessments, customs compliance, and liability boundaries.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-400 border-t border-slate-700/80 pt-3">
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700"><strong>Legal Entity:</strong> Manvi International Courier</span>
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
            title: "Legal Enquiries",
            description: "Questions about terms or service contracts?",
            type: "phone",
            contactText: "Call Legal Desk",
            contactHref: "tel:+917070506070",
          }}
        />

        {/* Main Document Details */}
        <article className="lg:col-span-8 flex flex-col gap-6 sm:gap-10">
          {/* 1. Acceptance */}
          <section id="acceptance" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">1</span>
              Acceptance of Terms
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              By accessing our website <strong>manvicourier.com</strong>, requesting a shipping quote, booking a parcel pickup, or utilizing any services offered by <strong>Manvi International Courier</strong>, you agree to be bound by these Terms and Conditions. If you do not agree to all terms, you may not use our services.
            </p>
          </section>

          {/* 2. Services */}
          <section id="services" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">2</span>
              Scope of Services
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Manvi International Courier operates domestic and international express courier services, freight forwarding, commercial cargo transportation, and door-to-door delivery. We reserve the right to route shipments through our verified international network partners (including DHL, FedEx, UPS, Aramex, and regional carriers).
            </p>
          </section>

          {/* 3. Weight & Billing */}
          <section id="billing-weight" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">3</span>
              Charges & Volumetric Weight Assessment
            </h2>
            <p className="text-slate-600 mb-3 text-xs sm:text-sm leading-relaxed">
              All shipping charges are billed based on the higher of <strong>Actual Gross Weight</strong> or <strong>Volumetric (Dimensional) Weight</strong> calculated as:
            </p>
            <div className="p-3.5 sm:p-4 bg-slate-900 text-[#f27a1a] font-mono text-center rounded-xl font-bold mb-3 text-xs sm:text-sm break-words overflow-x-auto">
              Length (cm) × Width (cm) × Height (cm) ÷ 5000
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              If weight discrepancies are detected at our processing hub, the customer will be issued an additional invoice for the weight difference prior to dispatch.
            </p>
          </section>

          {/* 4. Shipper Obligations */}
          <section id="shipper-obligations" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">4</span>
              Shipper Obligations & KYC Compliance
            </h2>
            <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <li>• The Shipper must ensure accurate declarations of package contents, weights, and values.</li>
              <li>• The Shipper must provide valid identity proofs (Aadhaar / Passport / Tax ID) as mandated under Indian Export Laws.</li>
              <li>• The Shipper is responsible for ensuring goods are packaged securely for long-distance international air transit.</li>
            </ul>
          </section>

          {/* 5. Customs & Duties */}
          <section id="customs-duties" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">5</span>
              Customs & Destination Duties
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              All international parcels undergo mandatory customs inspection. Destination customs duties, import VAT/GST, and clearance processing charges are the responsibility of the recipient/consignee unless explicitly agreed under prepaid DDP shipping terms.
            </p>
          </section>

          {/* 6. Prohibited Goods */}
          <section id="prohibited" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">6</span>
              Prohibited Goods & Right to Inspect
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
              Manvi International Courier reserves the right to open, inspect, and X-ray any parcel without prior notice for aviation safety and legal compliance.
            </p>
            <div className="p-3.5 sm:p-4 bg-red-50 text-red-900 text-xs font-semibold rounded-xl border border-red-200 leading-relaxed">
              Carriage of explosives, contraband, weapons, illicit drugs, or unauthorized lithium batteries is strictly forbidden.
            </div>
          </section>

          {/* 7. Limitation of Liability */}
          <section id="liability" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">7</span>
              Limitation of Liability & Force Majeure
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Manvi International Courier shall not be held liable for indirect, consequential, or special damages, or for delays caused by Force Majeure events including severe weather, customs holds, acts of God, or civil unrest.
            </p>
          </section>

          {/* 8. Jurisdiction */}
          <section id="governing-law" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-8 rounded-2xl shadow-md scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7 text-[#f27a1a] shrink-0" />
              Governing Law & Jurisdiction
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes or legal proceedings arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in <strong>New Delhi, India</strong>.
            </p>
            <div className="text-xs text-slate-400 border-t border-slate-700 pt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
              <span><strong>Support Email:</strong> info@manvicourier.com</span>
              <span className="hidden sm:inline">•</span>
              <span><strong>Phone:</strong> +91 7070506070</span>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}


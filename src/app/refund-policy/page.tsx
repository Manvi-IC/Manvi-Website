"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PolicySidebar from "@/components/PolicySidebar";
import { RotateCcw, ShieldCheck, Clock, AlertCircle, FileText, Phone, Mail, MapPin, CheckCircle2, XCircle } from "lucide-react";

const sidebarItems = [
  { id: "overview", label: "Policy Overview", num: "1" },
  { id: "cancellation-eligibility", label: "Cancellation Eligibility", num: "2" },
  { id: "refund-timeline", label: "Refund Processing & Timelines", num: "3" },
  { id: "claims-procedure", label: "Damaged or Lost Shipment Claims", num: "4" },
  { id: "non-refundable", label: "Non-Refundable Items & Taxes", num: "5" },
  { id: "contact", label: "Support & Claims Contact", num: "6" },
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#334155] text-white pt-8 sm:pt-12 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="max-w-[1650px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f27a1a]/20 border border-[#f27a1a]/40 text-[#f27a1a] text-xs font-semibold uppercase tracking-wider mb-3">
            <RotateCcw className="w-3.5 h-3.5" />
            Official Policy
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Cancellation & Refund Policy
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl leading-relaxed mb-5">
            Clear guidelines regarding shipment booking cancellations, RTO return charges, refund timelines, and claim processing rules at Manvi International Courier.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-400 border-t border-slate-700/80 pt-3">
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
            title: "Refunds Support",
            description: "Our customer support team is available Mon-Sat, 10 AM to 9 PM IST.",
            type: "email",
            contactText: "Email Support Desk",
            contactHref: "mailto:info@manvicourier.com",
          }}
        />

        {/* Main Document Details */}
        <article className="lg:col-span-8 flex flex-col gap-6 sm:gap-10">
          {/* 1. Overview */}
          <section id="overview" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">1</span>
              Policy Overview
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              At <strong>Manvi International Courier</strong>, customer satisfaction and clarity are our top priorities. We understand that plans can change or unforeseen shipment events may occur. This Refund & Cancellation Policy outlines the exact terms under which booking cancellations, service refunds, and shipment loss/damage claims are processed.
            </p>
          </section>

          {/* 2. Cancellation Eligibility */}
          <section id="cancellation-eligibility" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">2</span>
              Cancellation Eligibility & Conditions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Before Pickup */}
              <div className="bg-emerald-50/70 p-4 sm:p-6 rounded-2xl border border-emerald-200 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base sm:text-lg">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
                  Before Pickup Dispatch
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  You may cancel a booking prior to pickup vehicle dispatch. You will receive a <strong>full refund</strong> of shipping charges, minus a nominal administrative/payment processing fee.
                </p>
              </div>

              {/* After Pickup */}
              <div className="bg-rose-50/70 p-4 sm:p-6 rounded-2xl border border-rose-200 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-rose-800 font-extrabold text-base sm:text-lg">
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600 shrink-0" />
                  After Pickup Completed
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Once a package has been collected by our pickup team or logistics partner, the shipment cannot be cancelled and standard shipping fees paid are <strong>non-refundable</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Refund Processing & Timelines */}
          <section id="refund-timeline" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">3</span>
              Refund Processing & Timelines
            </h2>
            <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-2xl mb-6">
              <div className="flex items-center gap-2.5 mb-2">
                <Clock className="w-5 h-5 text-[#f27a1a]" />
                <span className="text-base sm:text-xl font-bold text-white">Refund SLA Timeline</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f27a1a] mb-2">5 – 7 Business Days</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All approved refunds are credited exclusively back to the original payment method / bank card / UPI account used during booking.
              </p>
            </div>
            <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <li>• <strong>Verification Step:</strong> Approved refunds are initiated only after verifying cancellation eligibility or completing formal claim investigations.</li>
              <li>• <strong>Bank Credit Duration:</strong> Depending on your banking institution or gateway issuer, it may take 2 to 4 additional business days for the funds to reflect in your account statement.</li>
            </ul>
          </section>

          {/* 4. Claims Procedure */}
          <section id="claims-procedure" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">4</span>
              Damaged or Lost Shipment Claims
            </h2>
            <p className="text-slate-600 mb-4 text-xs sm:text-sm leading-relaxed">
              If your package experiences loss or physical damage during transit, you may submit a formal claim subject to the strict reporting windows below:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6">
              <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">Damaged / Missing Contents Window</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Must be reported to Manvi International Courier within <strong>48 hours</strong> of package delivery receipt.
                </p>
              </div>
              <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">Lost Shipment Claim Window</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Must be reported within <strong>7 days</strong> of the last estimated delivery date window.
                </p>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3">Required Documents for Claim Settlement:</h3>
            <ul className="space-y-2 text-slate-600 text-xs sm:text-sm bg-orange-50/60 p-4 rounded-xl border border-orange-200 leading-relaxed">
              <li>1. Air Waybill (AWB) / Tracking Number.</li>
              <li>2. High-resolution photographs and videos showing damaged outer box, shipping label, and damaged internal goods.</li>
              <li>3. Original commercial invoice / invoice copy showing item purchase value.</li>
              <li>4. Retain all original packaging material until inspection or claim resolution is complete.</li>
            </ul>
          </section>

          {/* 5. Non-Refundable Charges */}
          <section id="non-refundable" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">5</span>
              Non-Refundable Items & Fees
            </h2>
            <ul className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Government Taxes & GST:</strong> Taxes levied by government authorities once invoiced are non-refundable.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Customs Duties & Penalty Charges:</strong> Import duties, taxes, or regulatory storage fees incurred at destination customs are non-refundable.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Return to Origin (RTO) Freight:</strong> Freight charges incurred for returning unclaimed or rejected parcels back to India are non-refundable and billed to sender.</span>
              </li>
            </ul>
          </section>

          {/* 6. Support & Contact */}
          <section id="contact" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-8 rounded-2xl shadow-md scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#f27a1a] shrink-0" />
              Refunds Support Contact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <Mail className="w-5 h-5 text-[#f27a1a] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-bold text-white mb-0.5">Email Support</div>
                  <a href="mailto:info@manvicourier.com" className="hover:text-white transition-colors break-all">info@manvicourier.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <Phone className="w-5 h-5 text-[#f27a1a] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Customer Support Phone</div>
                  <a href="tel:+917070506070" className="hover:text-white transition-colors">+91 7070506070</a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <MapPin className="w-5 h-5 text-[#f27a1a] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Office Address</div>
                  <p className="leading-relaxed">C1034, A 2ND FLOOR, HARIJAN BASTI, PALAM EXTN, PART-1 RAMPHAL CHOWK, NEW DELHI, INDIA, 110045</p>
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


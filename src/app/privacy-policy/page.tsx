"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PolicySidebar from "@/components/PolicySidebar";
import { Shield, Lock, Eye, Database, FileText, Phone, Mail, MapPin } from "lucide-react";

const sidebarItems = [
  { id: "introduction", label: "Introduction", num: "1" },
  { id: "data-collection", label: "Information We Collect", num: "2" },
  { id: "data-use", label: "How We Use Your Data", num: "3" },
  { id: "data-sharing", label: "Data Sharing & Third Parties", num: "4" },
  { id: "security", label: "Data Security & Encryption", num: "5" },
  { id: "user-rights", label: "Your Privacy Rights", num: "6" },
  { id: "contact", label: "Contact Privacy Officer", num: "7" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#334155] text-white pt-8 sm:pt-12 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="max-w-[1650px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f27a1a]/20 border border-[#f27a1a]/40 text-[#f27a1a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            Official Policy
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Privacy Policy & Data Security
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl leading-relaxed mb-5">
            Transparent information on how Manvi International Courier protects your personal data, identity documents, and shipment privacy across global operations.
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
            title: "Data Privacy Desk",
            description: "Have questions about your data or KYC privacy?",
            type: "email",
            contactText: "Email Privacy Desk",
            contactHref: "mailto:info@manvicourier.com",
          }}
        />

        {/* Main Document Details */}
        <article className="lg:col-span-8 flex flex-col gap-6 sm:gap-10">
          {/* 1. Introduction */}
          <section id="introduction" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">1</span>
              Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              <strong>Manvi International Courier</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal data of our customers, website visitors, and service users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>manvicourier.com</strong> or book courier services with us.
            </p>
          </section>

          {/* 2. Data Collection */}
          <section id="data-collection" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">2</span>
              Information We Collect
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1 flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#f27a1a] shrink-0" /> Personal Identification Data
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Full name, sender/recipient phone numbers, physical pickup and delivery addresses, zip codes, and email addresses.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#f27a1a] shrink-0" /> Customs Compliance & KYC Documents
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Government identity proofs (Passport, Aadhaar card, PAN, GSTIN, EORI number) required under Indian Export Customs and International Aviation Security laws.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#f27a1a] shrink-0" /> Transaction & Technical Data
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Payment confirmation receipts, Air Waybill tracking numbers, IP addresses, browser type, and site usage statistics.
                </p>
              </div>
            </div>
          </section>

          {/* 3. How We Use Data */}
          <section id="data-use" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">3</span>
              How We Use Your Data
            </h2>
            <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <li>• <strong>Service Delivery:</strong> Processing shipment bookings, door pickups, weight verification, and international transportation.</li>
              <li>• <strong>Customs Filing:</strong> Preparing mandatory shipping manifests, shipping bills, and customs declarations required by aviation authorities.</li>
              <li>• <strong>Real-time Communication:</strong> Sending automated WhatsApp, Email, and SMS tracking notifications regarding package milestones.</li>
              <li>• <strong>Support & Safety:</strong> Responding to customer queries, resolving claims, and preventing fraudulent transactions.</li>
            </ul>
          </section>

          {/* 4. Data Sharing */}
          <section id="data-sharing" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">4</span>
              Data Sharing & Third Parties
            </h2>
            <p className="text-slate-600 mb-3 text-xs sm:text-sm leading-relaxed">
              We never sell or rent your personal data to third-party marketers. We only share necessary data with trusted partners under strict confidentiality:
            </p>
            <ul className="space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <li>• <strong>Logistics Carriers:</strong> Carrier partners (DHL, FedEx, UPS, Aramex, DPD, local postal services) for physical transport.</li>
              <li>• <strong>Customs Authorities:</strong> Indian Customs and international destination customs agencies for clearance compliance.</li>
              <li>• <strong>Payment Gateways:</strong> Secure PCI-DSS compliant payment processing platforms.</li>
            </ul>
          </section>

          {/* 5. Security */}
          <section id="security" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">5</span>
              Data Security & Encryption
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              We implement industry-standard 256-bit SSL encryption, restricted server access, and secure data storage protocols to ensure your information remains protected against unauthorized access, loss, or disclosure.
            </p>
          </section>

          {/* 6. User Rights */}
          <section id="user-rights" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">6</span>
              Your Privacy Rights
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
              You have the right to request access to your personal data, request correction of inaccurate records, or request deletion of data (subject to statutory customs retention mandates required by law).
            </p>
          </section>

          {/* 7. Contact */}
          <section id="contact" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-8 rounded-2xl shadow-md scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-[#f27a1a] shrink-0" />
              Contact Our Privacy Desk
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <Mail className="w-5 h-5 text-[#f27a1a] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-bold text-white mb-0.5">Privacy Email</div>
                  <a href="mailto:info@manvicourier.com" className="hover:text-white transition-colors break-all">info@manvicourier.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <Phone className="w-5 h-5 text-[#f27a1a] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Support Desk</div>
                  <a href="tel:+917070506070" className="hover:text-white transition-colors">+91 7070506070</a>
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


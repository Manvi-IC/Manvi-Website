"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PolicySidebar from "@/components/PolicySidebar";
import { Truck, ShieldCheck, Clock, PackageCheck, AlertTriangle, FileText, Phone, Mail, MapPin } from "lucide-react";

const sidebarItems = [
  { id: "introduction", label: "Introduction", num: "1" },
  { id: "booking-process", label: "Shipping & Booking Process", num: "2" },
  { id: "pickup-policy", label: "Pickup Policy", num: "3" },
  { id: "delivery-timelines", label: "Delivery Timelines", num: "4" },
  { id: "weight-calculation", label: "Charges & Weight Calculation", num: "5" },
  { id: "customs-duties", label: "International Shipments & Customs", num: "6" },
  { id: "prohibited-items", label: "Prohibited & Restricted Items", num: "7" },
  { id: "tracking", label: "Tracking Your Shipment", num: "8" },
  { id: "failed-delivery", label: "Failed Delivery & RTO", num: "9" },
  { id: "claims", label: "Damaged or Lost Shipments", num: "10" },
  { id: "contact-support", label: "Contact Information", num: "11" },
];

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#334155] text-white pt-8 sm:pt-12 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="max-w-[1650px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f27a1a]/20 border border-[#f27a1a]/40 text-[#f27a1a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5" />
            Official Policy
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Shipping Policy
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl leading-relaxed mb-5">
            Everything you need to know about shipment bookings, pickup timelines, volumetric weight calculations, customs clearance, and delivery procedures at Manvi International Courier.
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
            title: "Need help with a shipment?",
            description: "Our support team is active Mon-Sat, 10 AM to 9 PM IST.",
            type: "phone",
            contactText: "Call +91 7070506070",
            contactHref: "tel:+917070506070",
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
              Welcome to <strong>Manvi International Courier</strong>. We provide reliable, end-to-end domestic and international logistics, freight, and express courier services across major destinations including the USA, UK, Canada, Australia, Europe, and worldwide.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-3">
              This Shipping Policy governs all shipment bookings, requests, and transactions processed through our website, online customer portal, customer service desks, and payment gateways. By booking a shipment or making a payment with Manvi International Courier, you (&ldquo;the Customer&rdquo;) agree to the terms and conditions outlined in this policy.
            </p>
          </section>

          {/* 2. Shipping & Booking Process */}
          <section id="booking-process" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">2</span>
              Shipping & Booking Process
            </h2>
            <ul className="space-y-3 sm:space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 shrink-0">Placing a Request:</span>
                <span>Shipments can be booked online via our portal, WhatsApp support desk, or by contacting our customer service team. You must provide complete details including sender/recipient full names, complete pin code/zip code addresses, phone numbers, item descriptions, and declared values.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 shrink-0">Payment Requirement:</span>
                <span>Full payment for estimated shipping charges must be processed and cleared through our payment portal before a booking is finalized or dispatched.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 shrink-0">Booking Confirmation:</span>
                <span>A shipment is officially confirmed only after successful payment verification and the generation of a unique Air Waybill (AWB) / Tracking Number.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 shrink-0">Pickup Authorization:</span>
                <span>Pickup drivers will collect packages only after payment confirmation is reflected in our system and valid shipping labels/documentation are prepared.</span>
              </li>
            </ul>
          </section>

          {/* 3. Pickup Policy */}
          <section id="pickup-policy" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">3</span>
              Pickup Policy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm mb-1">
                  <Clock className="w-4 h-4 text-[#f27a1a] shrink-0" /> Pickup Timelines
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standard door pickups occur within 24 to 48 hours of booking confirmation during regular operating hours (Monday to Saturday).
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm mb-1">
                  <PackageCheck className="w-4 h-4 text-[#f27a1a] shrink-0" /> Packaging Requirements
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Packages must be securely boxed, cushioned internally, and sealed prior to pickup. Manvi International is not liable for damage resulting from improper customer packaging.
                </p>
              </div>
            </div>
            <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <li>• <strong>Serviceable Areas:</strong> Pickups are available across selected domestic postal codes and designated international pickup zones. Serviceability can be verified during booking.</li>
              <li>• <strong>Customer Availability:</strong> The sender (or an authorized representative) must be available at the designated address during the scheduled pickup window.</li>
              <li>• <strong>Re-pickup Charges:</strong> If a pickup fails due to customer unavailability, incorrect address details, or unready packages, a re-pickup fee may apply for subsequent attempts.</li>
            </ul>
          </section>

          {/* 4. Delivery Timelines */}
          <section id="delivery-timelines" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">4</span>
              Delivery Timelines
            </h2>
            <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-xl mb-6">
              <div className="text-base sm:text-xl font-bold text-[#f27a1a] mb-1">Standard Delivery Window</div>
              <div className="text-2xl sm:text-3xl font-extrabold mb-2">4 – 12 Business Days</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Varies depending on destination country (USA, UK, Canada, Australia, EU), selected carrier option, and customs processing.
              </p>
            </div>
            <div className="p-3.5 sm:p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm flex gap-3 leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Important Disclaimer:</strong> All delivery timelines provided are estimates only and are not guaranteed transit times. Delays may occur due to destination customs clearance, severe weather events, airline space availability, regulatory inspections, public holidays, or local carrier disruptions.
              </div>
            </div>
          </section>

          {/* 5. Charges & Weight Calculation */}
          <section id="weight-calculation" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">5</span>
              Shipping Charges & Calculation
            </h2>
            <p className="text-slate-600 mb-4 text-xs sm:text-sm leading-relaxed">
              Shipping charges are calculated based on the higher of the <strong>Actual Gross Weight</strong> or the <strong>Volumetric (Dimensional) Weight</strong> of the parcel.
            </p>
            
            <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-xl mb-6 font-mono text-xs sm:text-sm text-center break-words overflow-x-auto">
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mb-2 font-sans">Volumetric Weight Formula</div>
              <div className="text-sm sm:text-lg text-[#f27a1a] font-bold">
                Volumetric Weight (kg) = Length (cm) × Width (cm) × Height (cm) ÷ 5000
              </div>
            </div>

            <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <li>• <strong>Taxes:</strong> All applicable government taxes (including GST) will be itemized during invoice generation.</li>
              <li>• <strong>Price Adjustments Post-Booking:</strong> If the actual weight or dimensions measured at our hub exceed the weight declared during booking, the Customer will be billed for the difference. The shipment may be held until the remaining balance is paid.</li>
              <li>• <strong>Surcharges:</strong> Deliveries to remote/out-of-delivery areas (ODA), fuel surcharges, or parcels requiring special handling are subject to additional carrier fees.</li>
            </ul>
          </section>

          {/* 6. Customs & Duties */}
          <section id="customs-duties" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">6</span>
              International Shipments & Customs
            </h2>
            <div className="space-y-3 sm:space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p>
                <strong>Customs Clearance:</strong> All international parcels are subject to inspection and clearance by the customs authority of the destination country.
              </p>
              <p>
                <strong>Duties & Taxes:</strong> Import duties, local taxes, entry clearance fees, and customs administration charges are not included in standard shipping rates unless explicitly specified under DDP terms. These fees are the sole responsibility of the recipient/consignee.
              </p>
              <p>
                <strong>Required Documentation:</strong> The Customer must provide accurate customs declarations, commercial invoices, itemized packing lists, and identity proofs (Passport / Aadhaar / Tax ID / EORI, as required by law).
              </p>
              <div className="p-3.5 sm:p-4 bg-red-50 rounded-xl border border-red-200 text-red-900 text-xs sm:text-sm leading-relaxed">
                <strong>Customs Holds & Rejections:</strong> Manvi International Courier is not responsible for delays, confiscation, or rejections by destination customs authorities. If a parcel is returned or destroyed due to unpaid duties or missing compliance paperwork, all return freight and destruction costs will be billed to the sender.
              </div>
            </div>
          </section>

          {/* 7. Prohibited & Restricted Items */}
          <section id="prohibited-items" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">7</span>
              Prohibited & Restricted Items
            </h2>
            <p className="text-slate-600 mb-4 text-xs sm:text-sm leading-relaxed">
              Manvi International strictly prohibits the carriage of items that pose a safety risk or violate domestic/international laws. Prohibited items include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 font-medium mb-4">
              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200">• Dangerous Goods & Explosives</div>
              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200">• Illegal Goods & Narcotics</div>
              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200">• Weapons, Ammunition & Tactical Gear</div>
              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200">• Loose Cash, Currency & Precious Stones</div>
              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200">• Standalone Lithium-Ion Batteries</div>
              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200">• Perishable Goods without Cold-Chain Contract</div>
            </div>
            <p className="text-xs text-red-600 font-bold leading-relaxed">
              Shipments containing prohibited items are subject to immediate cancellation, law enforcement reporting, and disposal without refund.
            </p>
          </section>

          {/* 8. Tracking */}
          <section id="tracking" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">8</span>
              Tracking Your Shipment
            </h2>
            <p className="text-slate-600 mb-4 text-xs sm:text-sm leading-relaxed">
              A unique Tracking / AWB Number is issued upon payment clearance and dispatch. Customers can monitor status 24/7 on our tracking portal.
            </p>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 py-2.5 px-5 sm:py-3 sm:px-6 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors text-xs sm:text-sm shadow-sm"
            >
              Track Your Shipment Online →
            </Link>
          </section>

          {/* 9. Failed Delivery & RTO */}
          <section id="failed-delivery" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">9</span>
              Failed Delivery & Return-to-Origin (RTO)
            </h2>
            <p className="text-slate-600 mb-3 text-xs sm:text-sm leading-relaxed">
              Local courier partners will make up to 2 to 3 delivery attempts. If the delivery fails due to incorrect address, recipient unavailability, or refusal to pay duties:
            </p>
            <ul className="space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <li>• The parcel will be held at a local destination holding facility for a limited duration.</li>
              <li>• If unclaimed, the parcel will be marked for <strong>Return-to-Origin (RTO)</strong>.</li>
              <li>• The Customer (sender) is fully liable for all return freight costs, return customs duties, and storage charges.</li>
            </ul>
          </section>

          {/* 10. Damaged or Lost Shipments */}
          <section id="claims" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f27a1a] to-orange-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">10</span>
              Damaged or Lost Shipments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-4">
              <div className="bg-orange-50 p-3.5 sm:p-4 rounded-xl border border-orange-200">
                <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">Damaged / Missing Items</div>
                <p className="text-xs text-slate-600 leading-relaxed">Must be reported within <strong>48 hours</strong> of package delivery with unboxing photos/videos.</p>
              </div>
              <div className="bg-orange-50 p-3.5 sm:p-4 rounded-xl border border-orange-200">
                <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">Lost Shipments</div>
                <p className="text-xs text-slate-600 leading-relaxed">Must be reported within <strong>7 days</strong> of the last estimated delivery window.</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              For complete refund rules, please check our dedicated <Link href="/refund-policy" className="text-[#f27a1a] underline font-bold">Refund & Cancellation Policy</Link>.
            </p>
          </section>

          {/* 11. Contact Support */}
          <section id="contact-support" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-8 rounded-2xl shadow-md scroll-mt-[90px] sm:scroll-mt-[120px]">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#f27a1a] shrink-0" />
              Support & Contact Information
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
                  <div className="font-bold text-white mb-0.5">Headquarters Address</div>
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


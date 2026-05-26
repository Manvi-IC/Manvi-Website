"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, ArrowUpRight, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number.");
      return;
    }
    setError("");
    setHasSearched(true);
  };

  const handleReset = () => {
    setTrackingNumber("");
    setContactNumber("");
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Banner Section */}
      <section className="relative bg-[#0b1220] overflow-hidden min-h-[220px] flex items-center py-12 px-6">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="max-w-[1700px] w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
          <div>
            <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
              Track Shipment
            </h1>
          </div>
          <div className="text-white/60 text-sm font-semibold tracking-wide bg-white/10 px-4 py-2 rounded-full border border-white/10">
            Home / Track Shipment
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow max-w-[1700px] w-full mx-auto px-6 py-12">
        {!hasSearched ? (
          // Initial Form View
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Box: Form */}
            <div className="lg:col-span-7 bg-[#eef0f5] rounded-[32px] p-8 lg:p-14 shadow-sm border border-gray-200/50 flex flex-col justify-between">
              <div className="flex flex-col gap-5">
                <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                  Track Your Shipment<br />In Real Time
                </h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-xl">
                  Stay Updated On Your Delivery Status From Pickup To Doorstep. Enter Your Tracking Number And Contact Details Below To Get The Latest Shipment Updates Instantly.
                </p>
              </div>

              <form onSubmit={handleTrack} className="flex flex-col gap-4 mt-8">
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-[14px] py-4 rounded-xl transition-all active:scale-98 cursor-pointer mt-4 flex items-center justify-center gap-2"
                >
                  Track Shipment
                </button>
              </form>
            </div>

            {/* Right Box: Help Card */}
            <div className="lg:col-span-5 bg-[#eef0f5] rounded-[32px] p-8 lg:p-14 shadow-sm border border-gray-200/50 flex flex-col items-center justify-center text-center">
              <div className="max-w-md flex flex-col items-center gap-6">
                <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#f27a1a] tracking-tight">
                  Need Help?
                </h2>
                <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                  If You&apos;re Experiencing Delays Or Cannot Locate Your Tracking Details, Our Customer Support Team Is Available 24/7 To Assist You.
                </p>
                <a
                  href="/#contact"
                  className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-8 py-3 text-[14.5px] font-bold flex items-center gap-1.5 mt-4"
                >
                  Contact Support <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        ) : (
          // Tracking Active / Details View
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Box: Tracking Timeline & Details */}
            <div className="lg:col-span-7 bg-[#eef0f5] rounded-[32px] p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6">
              
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 rounded-2xl p-5 border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="w-[52px] h-[52px] rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-[#f27a1a]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 font-bold block uppercase tracking-wider">Tracking Number</span>
                    <span className="text-[18px] sm:text-[20px] font-extrabold text-[#1c1f2e]">{trackingNumber || "TRK45678901"}</span>
                  </div>
                </div>
                <span className="border-2 border-[#f27a1a] text-[#f27a1a] bg-orange-50/50 font-bold text-[12px] px-4 py-1.5 rounded-full w-fit">
                  Ready To Ship
                </span>
              </div>

              {/* Transit Subcard */}
              <div className="bg-white/60 rounded-2xl p-6 border border-white/50 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                <div>
                  <h3 className="text-[17px] font-extrabold text-[#1c1f2e] flex items-center gap-2">
                    New Delhi <span className="text-gray-400">→</span> Ontario, Canada
                  </h3>
                  <span className="text-[11.5px] text-gray-400 font-bold block mt-1">AWB No. #AWB45678901</span>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-[11.5px] text-gray-400 font-bold block">15 Feb 2026</span>
                </div>
                <div className="sm:col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/50 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Shipment Created</span>
                    <span className="text-[13px] font-bold text-[#1c1f2e]">15 Feb 2026</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Current Location</span>
                    <span className="text-[13px] font-bold text-[#1c1f2e]">New Delhi</span>
                  </div>
                </div>
              </div>

              {/* Shipment Status Timeline */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
                <h3 className="text-[18px] font-extrabold text-[#1c1f2e]">
                  Shipment Status
                </h3>

                {/* Vertical Timeline */}
                <div className="flex flex-col relative pl-6 border-l-2 border-gray-100 gap-8 mt-2 ml-3">
                  {/* Item 1 */}
                  <div className="relative">
                    {/* Active timeline bar */}
                    <div className="absolute -left-[31px] top-[24px] bottom-[-40px] w-0.5 bg-[#f27a1a]" />
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-[#f27a1a] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f27a1a]" />
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-[#1c1f2e]">Order Confirmed</h4>
                        <span className="text-[12px] text-gray-400 font-semibold block mt-0.5">15 Feb 26, Noida</span>
                      </div>
                      <span className="text-[12px] text-gray-400 font-semibold">05:56 Pm</span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="relative">
                    {/* Active timeline bar end */}
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-[#f27a1a] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f27a1a]" />
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-[#1c1f2e]">Ready To Ship</h4>
                        <span className="text-[12px] text-gray-400 font-semibold block mt-0.5">15 Feb 26, Noida</span>
                      </div>
                      <span className="text-[12px] text-gray-400 font-semibold">05:56 Pm</span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-gray-400">Shipped</h4>
                        <span className="text-[12px] text-gray-300 font-semibold block mt-0.5">--</span>
                      </div>
                      <span className="text-[12px] text-gray-300 font-semibold">--</span>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-gray-400">In Transit</h4>
                        <span className="text-[12px] text-gray-300 font-semibold block mt-0.5">--</span>
                      </div>
                      <span className="text-[12px] text-gray-300 font-semibold">--</span>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-gray-400">Out For Delivery</h4>
                        <span className="text-[12px] text-gray-300 font-semibold block mt-0.5">--</span>
                      </div>
                      <span className="text-[12px] text-gray-300 font-semibold">--</span>
                    </div>
                  </div>

                  {/* Item 6 */}
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-5 h-5 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-gray-400">Delivered</h4>
                        <span className="text-[12px] text-gray-300 font-semibold block mt-0.5">--</span>
                      </div>
                      <span className="text-[12px] text-gray-300 font-semibold">--</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back button */}
              <button
                onClick={handleReset}
                className="bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-[14px] py-4 rounded-xl transition-all active:scale-98 cursor-pointer mt-4 flex items-center justify-center gap-2 w-full"
              >
                Search Another Shipment
              </button>
            </div>

            {/* Right Box: Satellite Map & Help Card */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Styled Satellite Map container */}
              <div className="w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-200 relative border border-gray-200 shadow-sm min-h-[300px]">
                {/* Embed high fidelity visual or use premium highres map placeholder background */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.64417734135!2d77.10896253457031!3d28.613939100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0xa1f13f1737e90c88!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 z-0"
                />
                <div className="absolute top-4 left-4 z-10 bg-[#0b1220]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#f27a1a]" /> Live Route Map
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-[#eef0f5] rounded-[32px] p-8 lg:p-14 shadow-sm border border-gray-200/50 flex flex-col items-center justify-center text-center">
                <div className="max-w-md flex flex-col items-center gap-6">
                  <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#f27a1a] tracking-tight">
                    Need Help?
                  </h2>
                  <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                    If You&apos;re Experiencing Delays Or Cannot Locate Your Tracking Details, Our Customer Support Team Is Available 24/7 To Assist You.
                  </p>
                  <a
                    href="/#contact"
                    className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-8 py-3 text-[14.5px] font-bold flex items-center gap-1.5 mt-4"
                  >
                    Contact Support <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

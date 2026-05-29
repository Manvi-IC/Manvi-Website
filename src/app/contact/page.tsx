"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Globe, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("01");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [destination, setDestination] = useState("");
  const [queryText, setQueryText] = useState("");

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your inquiry has been submitted.");
    setName("");
    setContact("");
    setEmail("");
    setInquiryType("");
    setDestination("");
    setQueryText("");
  };

  // Scroll to inquiry form cleanly
  const scrollToForm = () => {
    const element = document.getElementById("inquiry-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Top Dark Banner */}
      <section className="relative bg-[#0b1220] overflow-hidden min-h-55 flex items-center py-12 px-6">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="max-w-425 w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
          <div>
            <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="flex-grow max-w-425 w-full mx-auto px-6 py-12 flex flex-col gap-10">
        
        {/* Top Split Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Sticky Navigation/Intro Box to prevent vertical stretching offset) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            
            {/* Get In Touch Card */}
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                  Get In Touch
                </h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  Have A Question About Your International Shipment, Need A Custom Quote, Or Want To Discuss A Business Partnership? Our Logistics Experts Are Ready To Assist You.
                </p>
              </div>

              {/* Dynamic Interactive Tabs */}
              <div className="flex flex-col gap-3 mt-2">
                {[
                  { id: "01", label: "Direct Communication Channels" },
                  { id: "02", label: "Visit Our Head Office" },
                  { id: "03", label: "Operating Hours" },
                  { id: "04", label: "Global Reach Support" }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-4 px-6 py-4.5 rounded-2xl border transition-all text-left w-full font-sans ${
                        isActive
                          ? "bg-white border-[#f27a1a] shadow-sm text-[#f27a1a]"
                          : "bg-white border-transparent hover:border-gray-200 text-gray-700"
                      }`}
                    >
                      <span className={`text-[12px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                        isActive ? "bg-orange-100 text-[#f27a1a]" : "bg-gray-100 text-gray-400"
                      }`}>
                        {tab.id}
                      </span>
                      <span className="text-[14.5px] font-extrabold">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* We're Here To Help Inquiry Trigger Card */}
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col items-start gap-5">
              <h3 className="text-[28px] md:text-[34px] font-extrabold text-[#f27a1a] tracking-tight leading-tight">
                We&apos;re Here To Help
              </h3>
              <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                Tell Us About Your Concern And We&apos;ll Connect You With The Right Team To Assist You Quickly.
              </p>
              <button
                onClick={scrollToForm}
                className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-6 py-3 text-[14px] font-bold flex items-center gap-1.5 mt-2"
              >
                Inquiry Form ↴
              </button>
            </div>

          </div>

          {/* Right Column (Actual Details Cards) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Card 1: Direct Communication Channels */}
            <div className={`bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6 transition-all duration-300 ${
              activeTab === "01" ? "ring-2 ring-[#f27a1a]/50" : ""
            }`}>
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">01</span>
                <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                  Direct Communication Channels
                </h3>
              </div>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                For The Fastest Response, We Recommend Using Our WhatsApp Or Direct Line During Business Hours.
              </p>
              
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start sm:items-center gap-3">
                  <Phone className="w-4 h-4 text-[#f27a1a] mt-1 sm:mt-0 shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    Phone / WhatsApp: <span className="text-[#f27a1a] font-bold">+91 7070506070</span>
                  </div>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <Mail className="w-4 h-4 text-[#f27a1a] mt-1 sm:mt-0 shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    General Inquiries: <span className="text-[#f27a1a] font-bold">Info@manvicourier.com</span>
                  </div>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <Mail className="w-4 h-4 text-[#f27a1a] mt-1 sm:mt-0 shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    Business & Partnerships: <span className="text-[#f27a1a] font-bold">Sales@manvicourier.com</span>
                  </div>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <Mail className="w-4 h-4 text-[#f27a1a] mt-1 sm:mt-0 shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    Claims & Refunds: <span className="text-[#f27a1a] font-bold">Info@manvicourier.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Visit Our Head Office */}
            <div className={`bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6 transition-all duration-300 ${
              activeTab === "02" ? "ring-2 ring-[#f27a1a]/50" : ""
            }`}>
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">02</span>
                <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                  Visit Our Head Office
                </h3>
              </div>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                Located In The Heart Of India&apos;s Logistics Hub, Our Delhi Office Handles All Global Routing And Documentation.
              </p>
              
              <div className="flex items-start gap-3 mt-2">
                <MapPin className="w-4 h-4 text-[#f27a1a] mt-1 shrink-0" />
                <div className="text-[14px] font-semibold text-gray-500 leading-relaxed">
                  Address: <span className="text-[#f27a1a] font-bold">C-699, Palam Extension, Sector 7, Dwarka, New Delhi, 110077</span>
                </div>
              </div>
            </div>

            {/* Card 3: Operating Hours */}
            <div className={`bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6 transition-all duration-300 ${
              activeTab === "03" ? "ring-2 ring-[#f27a1a]/50" : ""
            }`}>
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">03</span>
                <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                  Operating Hours
                </h3>
              </div>
              
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start sm:items-center gap-3">
                  <Clock className="w-4 h-4 text-[#f27a1a] shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    Monday – Saturday: <span className="text-[#f27a1a] font-bold">10:00 AM To 7:00 PM (IST)</span>
                  </div>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <Clock className="w-4 h-4 text-[#f27a1a] shrink-0" />
                  <div className="text-[14px] font-semibold text-gray-500">
                    Sunday: <span className="text-[#f27a1a] font-bold">Closed (Online Tracking Available 24/7)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Global Reach Support */}
            <div className={`bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6 transition-all duration-300 ${
              activeTab === "04" ? "ring-2 ring-[#f27a1a]/50" : ""
            }`}>
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">04</span>
                <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                  Global Reach Support
                </h3>
              </div>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                As We Partner With World-Class Carriers, You Can Also Track Your Shipments Directly On Their Portals Using The AWB (Air Waybill) Provided By Us:
              </p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-2">
                <a
                  href="https://www.dhl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f27a1a] font-bold text-[14px] flex items-center gap-1 hover:underline"
                >
                  DHL Tracking <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.fedex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f27a1a] font-bold text-[14px] flex items-center gap-1 hover:underline"
                >
                  FedEx Tracking <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.ups.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f27a1a] font-bold text-[14px] flex items-center gap-1 hover:underline"
                >
                  UPS Tracking <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Inquiry Form Section */}
        <section id="inquiry-form-section" className="bg-[#eef0f5] rounded-4xl p-8 lg:p-14 shadow-sm border border-gray-200/50">
          <div className="flex flex-col gap-3 mb-10">
            <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#1c1f2e] tracking-tight">
              Inquiry Form
            </h2>
            <p className="text-[13.5px] text-gray-500 font-semibold leading-relaxed">
              Please Fill Out The Form Below, And A Member Of Our Team Will Get Back To You Within 24 Business Hours.
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="flex flex-col gap-6">
            {/* Input Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <input
                type="text"
                placeholder="Name*"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm"
              />
              <input
                type="text"
                placeholder="Contact Number*"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm"
              />
              <input
                type="email"
                placeholder="Email Address*"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm"
              />
            </div>

            {/* Input Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <select
                  required
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none border border-gray-150 shadow-sm w-full appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Inquiry Type</option>
                  <option value="Quote Request">Quote Request</option>
                  <option value="Shipment Issue">Shipment Issue</option>
                  <option value="Business Partnership">Business Partnership</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <input
                type="text"
                placeholder="Destination Country"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm"
              />
            </div>

            {/* Input Row 3 */}
            <textarea
              placeholder="Write You Query Here ..."
              rows={6}
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-5 focus:outline-none placeholder:text-gray-400 border border-gray-150 shadow-sm resize-none w-full"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-[14px] px-8 py-4 rounded-xl transition-all active:scale-98 cursor-pointer w-fit"
            >
              Submit Query
            </button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUpRight, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("01");

  const faqs = [
    {
      id: "01",
      q: "Where Can I Send My Packages?",
      a: "Almost Anywhere! We Have A Strong Presence In The USA, Canada, UK, Europe, And Australia. Whether It's A Big City Or A Quiet Suburb, We'll Get It There."
    },
    {
      id: "02",
      q: "How Do I Know I'm Getting A Fair Price?",
      a: "We Believe In Value. Your Quote Is Based On Exactly What You Need—Considering Weight, Destination, And How Fast You Need It Delivered. We Promise No Hidden Surprises When It's Time To Pay."
    },
    {
      id: "03",
      q: "Can I See Where My Package Is Right Now?",
      a: "Yes! The Moment You Ship With Us, You'll Get A Unique Tracking Number. You Can Watch Your Package's Journey In Real-Time, Giving You Total Confidence."
    },
    {
      id: "04",
      q: "What Happens If There Is A Delay Or A Problem?",
      a: "We Know Your Shipments Are Important. If Something Goes Wrong, We Are Here To Help. To Ensure A Fair And Thorough Resolution, Our Team And Our Global Partners (Like DHL, FedEx, and UPS) Conduct A Detailed Investigation."
    },
    {
      id: "05",
      q: "Is There Anything I Cannot Ship?",
      a: "To Keep Everyone Safe And Follow International Laws, We Cannot Ship Hazardous Chemicals, Currency, Precious Stones, Or Illegal Items. If You Aren't Sure About An Item, Just Give Us A Call! We're Happy To Check For You Before You Book."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Top Banner Section */}
      <section className="relative bg-[#0b1220] overflow-hidden min-h-[220px] flex items-center py-12 px-6">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="max-w-[1700px] w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
          <div>
            <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
              FAQ
            </h1>
          </div>
          <div className="text-white/60 text-sm font-semibold tracking-wide bg-white/10 px-4 py-2 rounded-full border border-white/10">
            Home / FAQ
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="flex-grow max-w-[1700px] w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Box */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            
            {/* Questions Card */}
            <div className="bg-[#eef0f5] rounded-[32px] p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                  Questions?<br />Glad You Asked
                </h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  Find Quick Answers To Common Questions About Tracking, Deliveries, Pricing, And Support. If You Can&apos;t Find What You&apos;re Looking For, Our Team Is Here To Help.
                </p>
              </div>

              {/* Dynamic Interactive Tabs */}
              <div className="flex flex-col gap-3 mt-2">
                {faqs.map((faq) => {
                  const isActive = activeTab === faq.id;
                  return (
                    <button
                      key={faq.id}
                      onClick={() => setActiveTab(faq.id)}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all text-left w-full font-sans ${
                        isActive
                          ? "bg-white border-[#f27a1a] shadow-sm text-[#f27a1a]"
                          : "bg-white border-transparent hover:border-gray-200 text-gray-700"
                      }`}
                    >
                      <span className={`text-[12px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                        isActive ? "bg-orange-100 text-[#f27a1a]" : "bg-gray-100 text-gray-400"
                      }`}>
                        {faq.id}
                      </span>
                      <span className="text-[14px] font-extrabold line-clamp-1">
                        {faq.q}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Still Have Questions Box */}
            <div className="bg-[#eef0f5] rounded-[32px] p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col items-start gap-5">
              <h3 className="text-[28px] md:text-[34px] font-extrabold text-[#f27a1a] tracking-tight leading-tight">
                Still Have Questions?
              </h3>
              <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                Our Customer Support Team Is Available 24/7 To Assist You.
              </p>
              <a
                href="/contact"
                className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-6 py-3 text-[14px] font-bold flex items-center gap-1.5 mt-2"
              >
                Contact Support <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>

          </div>

          {/* Right Column List */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {faqs.map((faq) => {
              const isActive = activeTab === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-[#eef0f5] rounded-[32px] p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-4 transition-all duration-300 ${
                    isActive ? "ring-2 ring-[#f27a1a]/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] font-extrabold bg-orange-100 text-[#f27a1a] px-3 py-1.5 rounded-full shrink-0">
                      {faq.id}
                    </span>
                    <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#1c1f2e] leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <p className="text-[13.5px] text-gray-500 font-medium leading-relaxed mt-1">
                    {faq.a}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bespoke from "@/components/Bespoke";
import WhyWeLead from "@/components/WhyWeLead";
import ClaimPolicy from "@/components/ClaimPolicy";
import NoCosts from "@/components/NoCosts";
import Prohibited from "@/components/Prohibited";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
const ManviChatBot = dynamic(() => import("@/components/ManviChatBot"));
const ManviWhatsApp = dynamic(() => import("@/components/ManviWhatsApp"));
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      <Hero />

      {/* Delivery Partners */}
      <ScrollReveal>
        <div className="bg-[#f3f4f6] border-y border-slate-200/50 py-8 px-4 sm:px-6">
          <div className="max-w-425 mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[20px] md:text-[24px] font-extrabold text-[#f27a1a] leading-tight italic whitespace-pre-line">
                {t.partners_title}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10 md:gap-16">
              {["DHL", "FedEx", "UPS", "Aramex", "DPD"].map((p) => (
                <span
                  key={p}
                  className="text-[18px] sm:text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e] tracking-wide select-none"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <Bespoke />
      </ScrollReveal>

      <ScrollReveal>
        <WhyWeLead />
      </ScrollReveal>

      <ScrollReveal>
        <ClaimPolicy />
      </ScrollReveal>

      {/* NoCosts + Prohibited combined in one container */}
      <ScrollReveal>
        <div className="max-w-425 w-full mx-auto px-4 sm:px-6 py-10 font-sans">
          <div className="bg-[#eef0f5] rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
            <NoCosts />
            <Prohibited />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <FAQ />
      </ScrollReveal>

      <ScrollReveal>
        <Contact />
      </ScrollReveal>

      <Footer />

      {/* Floating Chat Bot - renders above everything else */}
      <ManviChatBot />
      <ManviWhatsApp />
    </div>
  );
}

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
import ManviChatBot from "@/components/ManviChatBot"; // ← ADD THIS

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      <Hero />

      {/* Delivery Partners */}
      <div className="bg-[#f3f4f6] border-y border-slate-200/50 py-8 px-6">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[20px] md:text-[24px] font-extrabold text-[#f27a1a] leading-tight italic">
              Our Delivery<br />Partners ✈
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-10 md:gap-16">
            {["Fedex", "DPD", "Ups", "DHL", "ARAMEX"].map(p => (
              <span key={p} className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e] tracking-wide select-none">{p}</span>
            ))}
          </div>
        </div>
      </div>

      <Bespoke />

      <WhyWeLead />

      <ClaimPolicy />

      {/* NoCosts + Prohibited combined in one container */}
      <div className="max-w-[1700px] w-full mx-auto px-6 py-10 font-sans">
        <div className="bg-[#eef0f5] rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <NoCosts />
          <Prohibited />
        </div>
      </div>

      <FAQ />

      <Contact />

      <Footer />

      {/* Floating Chat Bot — renders above everything else */}
      <ManviChatBot /> {/* ← ADD THIS */}
    </div>
  );
}
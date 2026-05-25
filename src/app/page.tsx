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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eef0f5] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Hero + Action tabs (white bg section) */}
      <div className="bg-[#eef0f5]">
        <Hero />
      </div>

      {/* Delivery Partners */}
      <div className="bg-white border-y border-slate-200 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-wider">Strategic Networks</span>
            <span className="text-sm font-extrabold text-[#0b1220]">Our Delivery Partners All</span>
          </div>
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {["Fedex", "DPD", "Ups", "DHL", "ARAMEX"].map(p => (
              <span key={p} className="text-xl font-black text-slate-300 hover:text-slate-700 transition-colors tracking-widest font-mono italic select-none">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bespoke white bg */}
      <div className="bg-[#eef0f5]">
        <Bespoke />
      </div>

      <WhyWeLead />

      {/* Claims white bg */}
      <div className="bg-[#eef0f5]">
        <ClaimPolicy />
      </div>

      <NoCosts />

      {/* Prohibited white bg */}
      <div className="bg-[#eef0f5]">
        <Prohibited />
      </div>

      <FAQ />

      {/* Contact white bg */}
      <div className="bg-[#eef0f5]">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}

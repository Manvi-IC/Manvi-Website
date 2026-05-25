"use client";

import { useState, useEffect } from "react";
import {
  Plane,
  Truck,
  ShieldCheck,
  Scale,
  Clock,
  Coins,
  AlertOctagon,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Globe,
  ArrowRight,
  ArrowUpRight,
  Ban,
  Calculator,
  MessageSquare,
  FileText,
  Users,
  Compass
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Home() {
  // Quote Calculator states
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [serviceType, setServiceType] = useState("document");
  const [calculatedQuote, setCalculatedQuote] = useState<{
    price: number;
    days: number;
    show: boolean;
  } | null>(null);

  // Policy Section states
  const [activePolicy, setActivePolicy] = useState<string>("customs");

  // FAQ states
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Services accordion states
  const [activeServiceTab, setActiveServiceTab] = useState<"personal" | "enterprise">("personal");

  // Calculator Handler
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || isNaN(Number(weight))) {
      alert("Please enter a valid weight in Kg");
      return;
    }

    const w = Number(weight);
    let basePrice = 250; // default base price
    let multiplier = 1.0;

    if (destination === "usa") multiplier = 2.5;
    else if (destination === "uk") multiplier = 2.0;
    else if (destination === "uae") multiplier = 1.4;
    else if (destination === "aus") multiplier = 2.8;

    let typeMultiplier = serviceType === "express" ? 1.5 : serviceType === "document" ? 0.8 : 1.1;
    
    // Estimate cost: (weight * 450 + basePrice) * destinationMultiplier * typeMultiplier
    const priceEst = Math.round((w * 450 + basePrice) * multiplier * typeMultiplier);
    const deliveryDays = serviceType === "express" ? 3 : destination === "usa" || destination === "aus" ? 5 : 4;

    setCalculatedQuote({
      price: priceEst,
      days: deliveryDays,
      show: true
    });
  };

  const faqData: FAQItem[] = [
    {
      question: "Which Countries Do You Ship To?",
      answer: "We offer express shipping to over 220 countries globally including the USA, UK, UAE, Australia, Canada, Europe, and all major destinations with complete door-to-door tracking."
    },
    {
      question: "How Do I Get A Tracking Code?",
      answer: "Once your shipment is picked up and scanned at our hub, a unique tracking number is instantly generated and sent to you via SMS and Email. You can track it in real-time on our tracking page."
    },
    {
      question: "What Is The Maximum Weight Limit?",
      answer: "We handle shipments of all sizes! For individual parcel express, packages up to 70kg are standard. For heavier enterprise bulk cargo, we provide palletized ocean and air freight solutions with no maximum weight limit."
    },
    {
      question: "Who Handles Custom Clearances?",
      answer: "Our in-house customs clearance experts handle all regulatory paperwork and documentation checks. We prepare customs declarations beforehand to ensure rapid clearance with minimum transit delay."
    },
    {
      question: "Is There A Insurance Cover?",
      answer: "Yes! We offer comprehensive transit insurance cover representing up to 100% of your declared cargo value. This guarantees peace of mind against damage, loss, or customs delays."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col antialiased">
      
      {/* 1. TOP UTILITY NAVBAR */}
      <div className="bg-[#0d1527] text-zinc-400 text-[11px] font-medium border-b border-white/5 py-2 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">📍 Track Shipment</span>
            <span className="text-zinc-600">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">📞 24/7 Hotline: +91 99000 99000</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer font-bold text-brand-orange">Partner Registration</span>
            <span className="text-zinc-600">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Agent Login ↗</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo with Orange Oval */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#f27a1a] flex items-center justify-center shadow-lg shadow-[#f27a1a]/25 text-white font-extrabold text-lg italic">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-md font-extrabold text-[#0d1527] tracking-tight leading-none">
                Manvi
              </span>
              <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-wider mt-0.5">
                International Courier
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#0d1527]">
            <a href="#about" className="hover:text-[#f27a1a] transition-colors">About Us</a>
            <a href="#services" className="hover:text-[#f27a1a] transition-colors">Services</a>
            <a href="#claims" className="hover:text-[#f27a1a] transition-colors">Claim Policy</a>
            <a href="#prohibited" className="hover:text-[#f27a1a] transition-colors">Safety Guide</a>
            <a href="#faq" className="hover:text-[#f27a1a] transition-colors">FAQs</a>
          </nav>

          {/* Contact Button */}
          <a
            href="#contact"
            className="bg-[#0d1527] text-white hover:bg-[#f27a1a] px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Contact Us
          </a>
        </div>
      </header>

      {/* 3. HERO SPLIT SECTION */}
      <section className="max-w-6xl w-full mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Card: Orange Form Box (5 Cols) */}
        <div className="lg:col-span-5 bg-[#f27a1a] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid background overlay */}
          <div className="absolute inset-0 bg-white/[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-5">
            <span className="text-[11px] font-bold tracking-widest uppercase bg-white/10 w-fit px-2.5 py-0.5 rounded-full">
              Global Shipping
            </span>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
              CONNECTING CONTINENTS,<br />DELIVERING TRUST.
            </h2>
            <p className="text-orange-50 text-xs leading-relaxed max-w-sm">
              Your trusted partner for door-to-door courier deliveries. Compute instantaneous shipping estimates to worldwide countries in seconds.
            </p>

            {/* Form */}
            <form onSubmit={handleCalculate} className="flex flex-col gap-3.5 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-orange-100">Destination Country</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="w-full bg-white text-[#0d1527] font-semibold text-xs rounded-xl px-3.5 py-2.5 focus:outline-none shadow-inner"
                >
                  <option value="">Select Destination...</option>
                  <option value="usa">United States (USA)</option>
                  <option value="uk">United Kingdom (UK)</option>
                  <option value="uae">United Arab Emirates (UAE)</option>
                  <option value="aus">Australia (AUS)</option>
                  <option value="global">Other Worldwide Countries</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-orange-100">Weight (Kg)</label>
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    min="0.1"
                    step="0.1"
                    className="w-full bg-white text-[#0d1527] font-semibold text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-orange-100">Service Type</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-white text-[#0d1527] font-semibold text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  >
                    <option value="document">Doc (Express)</option>
                    <option value="parcel">Parcel (Economy)</option>
                    <option value="express">Express (Premium)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-orange-100">Dimensions (L x W x H cm)</label>
                <input
                  type="text"
                  placeholder="e.g. 30 x 20 x 15"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full bg-white text-[#0d1527] font-semibold text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0d1527] hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-98 mt-2 cursor-pointer"
              >
                <Calculator className="h-4 w-4 text-[#f27a1a]" />
                Get Instant Quote
              </button>
            </form>
          </div>

          {/* Dynamic Quote Result Modal inside Hero Card */}
          {calculatedQuote?.show && (
            <div className="mt-4 p-4 bg-[#0d1527] border border-white/10 rounded-2xl animate-pulse-slow">
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                <span className="text-[10px] font-bold uppercase text-[#f27a1a] tracking-wider">Estimated Invoice Cost</span>
                <button
                  onClick={() => setCalculatedQuote(null)}
                  className="text-white hover:text-[#f27a1a] text-xs font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xl font-extrabold text-white">₹{calculatedQuote.price.toLocaleString("en-IN")}</span>
                <span className="text-[10px] text-zinc-400 font-medium">Est. Delivery: {calculatedQuote.days} Days</span>
              </div>
              <span className="text-[9px] text-zinc-500 leading-none mt-1 block">Door-to-door delivery with customs support. *Taxes extra.</span>
              <a
                href="#contact"
                className="w-full mt-2.5 py-2 bg-[#f27a1a] hover:bg-orange-600 rounded-lg text-[10px] font-bold text-white text-center block transition-colors"
              >
                Confirm & Book pickup ↗
              </a>
            </div>
          )}
        </div>

        {/* Right Card: Visual Slider/Graphic Box (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0d1527] rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[420px] shadow-xl">
          {/* Warehouse Worker Backdrop Visual Concept using gorgeous dark CSS styling */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/60 z-0" />
          <div className="absolute right-0 bottom-0 w-[400px] h-[350px] opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-400 via-indigo-600 to-transparent rounded-tl-full pointer-events-none" />
          
          {/* Conceptual vector graphic of global shipping route overlay */}
          <div className="absolute inset-0 bg-no-repeat bg-center opacity-10 pointer-events-none select-none z-0" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 600\"><path d=\"M150,150 Q450,50 750,250 T950,50\" fill=\"none\" stroke=\"orange\" stroke-width=\"4\" stroke-dasharray=\"10 5\"/></svg>')" }} />

          <div className="relative z-10 flex flex-col gap-4">
            <span className="text-[11px] font-bold tracking-widest uppercase bg-[#f27a1a]/20 text-[#f27a1a] border border-[#f27a1a]/30 w-fit px-2.5 py-0.5 rounded-full">
              Premium Logistics
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight max-w-lg leading-tight mt-1">
              We Don&apos;t Just Move Parcels;<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f27a1a] to-orange-400 font-black">
                We Bridge Distances.
              </span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Expanding your commerce reach. Manvi ensures quick border processing and prompt terminal handling for commercial bulk or personal consignments.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Service Hub</span>
              <span className="text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#f27a1a]" />
                Worldwide Courier Delivery
              </span>
            </div>

            <div className="flex gap-3">
              <a
                href="#contact"
                className="px-6 py-2.5 bg-gradient-to-tr from-[#f27a1a] to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-full text-xs font-bold text-white shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-1"
              >
                Book Now
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* 4. ACTION BAR TABS (SCROLL HELPER) */}
      <section className="max-w-6xl w-full mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-[#f27a1a]/5 hover:text-[#f27a1a] rounded-xl text-xs font-bold text-[#0d1527] transition-all text-center"
          >
            <Calculator className="h-4 w-4 text-[#f27a1a]" />
            Select Country & Get Quote
          </a>
          
          <a
            href="#prohibited"
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-[#f27a1a]/5 hover:text-[#f27a1a] rounded-xl text-xs font-bold text-[#0d1527] transition-all text-center"
          >
            <FileText className="h-4 w-4 text-[#f27a1a]" />
            Document Checklist
          </a>
          
          <a
            href="#services"
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-[#f27a1a]/5 hover:text-[#f27a1a] rounded-xl text-xs font-bold text-[#0d1527] transition-all text-center"
          >
            <Truck className="h-4 w-4 text-[#f27a1a]" />
            Our Services
          </a>
          
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-[#f27a1a]/5 hover:text-[#f27a1a] rounded-xl text-xs font-bold text-[#0d1527] transition-all text-center"
          >
            <Mail className="h-4 w-4 text-[#f27a1a]" />
            Contact Us
          </a>
        </div>
      </section>

      {/* 5. DELIVERY PARTNERS STRIP */}
      <section className="bg-white border-y border-slate-100 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-wider">Strategic Networks</span>
            <span className="text-sm font-extrabold text-[#0d1527]">Our Delivery Partners All:</span>
          </div>

          {/* Delivery partners horizontal list */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {["FedEx", "DPD", "UPS", "DHL", "ARAMEX"].map((partner) => (
              <span
                key={partner}
                className="text-lg font-black text-slate-300 hover:text-slate-900 transition-colors select-none tracking-widest font-mono italic"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SERVICES: BESPOKE SHIPPING SOLUTIONS */}
      <section id="services" className="max-w-6xl w-full mx-auto px-6 py-20">
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Tailored Logistics</span>
          <h2 className="text-3xl font-extrabold text-[#0d1527] tracking-tight">
            Bespoke Shipping Solutions.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Image/Graphic (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0d1527] to-slate-950 text-white rounded-3xl p-8 relative overflow-hidden min-h-[350px] shadow-lg flex flex-col justify-between">
            <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute right-0 top-0 w-[200px] h-[200px] bg-[#f27a1a]/10 rounded-full blur-[80px]" />
            
            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-[9px] font-bold uppercase text-[#f27a1a] tracking-widest">Global Express</span>
              <h3 className="text-xl font-bold tracking-tight">Bespoke Cargo Network</h3>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-xs mt-1">
                Safe, verified cargo lines providing point-to-point courier and air delivery globally with customs validation support.
              </p>
            </div>

            <div className="relative z-10 flex justify-between items-center mt-8">
              <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest font-mono">Status: active</span>
              <div className="h-10 w-10 rounded-full bg-[#f27a1a] hover:bg-orange-600 transition-colors flex items-center justify-center text-white cursor-pointer shadow-lg shadow-orange-500/25">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Right panel: Accordion lists (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Service Category Tabs */}
            <div className="flex border-b border-slate-200 pb-2 mb-2 gap-6">
              <button
                onClick={() => setActiveServiceTab("personal")}
                className={`pb-2 text-sm font-bold transition-all relative ${
                  activeServiceTab === "personal"
                    ? "text-[#f27a1a]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Global Personal Logistics
                {activeServiceTab === "personal" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f27a1a]" />
                )}
              </button>
              
              <button
                onClick={() => setActiveServiceTab("enterprise")}
                className={`pb-2 text-sm font-bold transition-all relative ${
                  activeServiceTab === "enterprise"
                    ? "text-[#f27a1a]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Enterprise & Bulk Solutions
                {activeServiceTab === "enterprise" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f27a1a]" />
                )}
              </button>
            </div>

            {/* TAB CONTENT: Personal Logistics */}
            {activeServiceTab === "personal" && (
              <div className="flex flex-col gap-3">
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 flex-shrink-0 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-[#f27a1a]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0d1527]">Right Place at the Right Time</span>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                      Our commitment is to ensure your personal cargo, household goods, or emergency documents reach their destination with speed, security, and absolute precision.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 flex-shrink-0 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-[#f27a1a]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0d1527]">Door-to-Door Delivery</span>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                      Skip the depot queues! We pick up directly from your doorstep and deliver straight to the recipient&apos;s desk, completing clearances automatically.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 flex-shrink-0 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-[#f27a1a]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0d1527]">Guaranteed Delivery Dates</span>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                      Time-critical consignments enjoy scheduled standard arrivals. We verify transit lanes daily to provide dependable delivery dates.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Enterprise & Bulk Solutions */}
            {activeServiceTab === "enterprise" && (
              <div className="flex flex-col gap-3">
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 flex-shrink-0 flex items-center justify-center">
                    <Plane className="h-5 w-5 text-[#f27a1a]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0d1527]">Heavy Commercial Air Freight</span>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                      Pre-booked schedules with major airlines for heavy container palettes, providing bulk imports and exports at consolidated contract pricing.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 flex-shrink-0 flex items-center justify-center">
                    <Scale className="h-5 w-5 text-[#f27a1a]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0d1527]">Consolidated Warehouse & Distribution</span>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                      Supply chain warehousing. We receive, inspect, inventory-map, package, label, and dispatch industrial components for global distribution channels.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 7. WHY WE LEAD: GRID LAYOUT */}
      <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Quality Excellence</span>
            <h2 className="text-3xl font-extrabold text-[#0d1527] tracking-tight">
              Why We Lead
            </h2>
          </div>

          {/* Grid Layout representing mock asymmetric grid exactly */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Box 1 (4 Cols): Quick Partnerships */}
            <div className="md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/50 flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#f27a1a]">
                <Users className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0d1527]">Quick Partnerships</span>
                <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                  We establish corporate agreements that simplify cargo routines and lower border entry duties for our partner networks.
                </p>
              </div>
            </div>

            {/* Box 2 (5 Cols): Plane Image / Visual card */}
            <div className="md:col-span-5 bg-[#0d1527] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[180px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 to-[#0d1527] z-0" />
              <div className="absolute right-0 bottom-0 w-[150px] h-[150px] bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[9px] font-bold uppercase text-[#f27a1a] tracking-widest font-mono">Air Cargo Line</span>
                <Plane className="h-4.5 w-4.5 text-[#f27a1a] animate-pulse" />
              </div>
              <div className="relative z-10">
                <span className="text-lg font-black tracking-tight leading-none">99% Air Transit Integrity</span>
                <p className="text-[10px] text-zinc-400 mt-1">Guaranteed space mapping on premium commercial logistics carriers.</p>
              </div>
            </div>

            {/* Box 3 (3 Cols): Multiple Countries */}
            <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/50 flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#f27a1a]">
                <Globe className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0d1527] leading-none">Multiple Countries</span>
                <span className="text-[10px] text-zinc-400 mt-0.5">Customs operations active.</span>
                <p className="text-[11px] text-zinc-500 leading-normal mt-2">
                  Delivering to over 220+ countries and sovereign territories worldwide.
                </p>
              </div>
            </div>

            {/* Box 4 (7 Cols): Customer Volume */}
            <div className="md:col-span-7 bg-[#f27a1a] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[160px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-[#f27a1a] z-0" />
              
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[9px] font-bold uppercase text-white/80 tracking-widest font-mono">Customer base</span>
                <Compass className="h-4.5 w-4.5 text-[#0d1527]" />
              </div>
              <div className="relative z-10">
                <span className="text-2xl font-black tracking-tight">1000+ Consignments Processed Daily</span>
                <p className="text-[10px] text-orange-50 mt-1">Managing personal packages and bulky commercial freight on time, every single day.</p>
              </div>
            </div>

            {/* Box 5 (5 Cols): Real-time updates */}
            <div className="md:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/50 flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#f27a1a]">
                <Clock className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0d1527]">Real-Time Updates</span>
                <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                  We utilize automated API webhooks. You will receive SMS alerts, tracking logs, and active transit timestamps at each shipping terminal.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. REFUND AND LOSS CLAIM POLICY SECTION */}
      <section id="claims" className="max-w-6xl w-full mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Policy issues list (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 mb-2">
              <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Peace Of Mind Guarantees</span>
              <h2 className="text-3xl font-extrabold text-[#0d1527] tracking-tight">
                Our Refund And Loss Claim Policy
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Logistics can sometimes face global border variables. We provide rigid, fast-track insurance claim pipelines so your investment remains 100% protected.
              </p>
            </div>

            {/* Policy Toggle accordions */}
            <div className="flex flex-col gap-3 mt-2">
              {[
                {
                  id: "customs",
                  title: "Customs Clear Problems",
                  desc: "In case cargo is detained by customs due to lack of local documentation, our clearance experts initiate instant mitigation. If clearance fails due to carrier variables, we process 100% transit cost refund."
                },
                {
                  id: "delayed",
                  title: "Delayed Deliveries",
                  desc: "If express shipments do not arrive within the guaranteed window due to scheduling mistakes, we refund the premium shipping difference directly into your active wallet."
                },
                {
                  id: "undelivered",
                  title: "Undelivered Parcels",
                  desc: "If any package is declared lost during ocean or air transit, our active insurance cover kicks in immediately, refunding your full declared consignment invoice within 24 business hours."
                },
                {
                  id: "damaged",
                  title: "Damaged Consignments",
                  desc: "Our verification team inspects packages. If any damage is recorded during active carrier transit, we reimburse repairing costs or replace value based on your transit cover level."
                }
              ].map((policy) => {
                const isActive = activePolicy === policy.id;
                return (
                  <div
                    key={policy.id}
                    className={`border rounded-2xl p-4 transition-all cursor-pointer ${
                      isActive
                        ? "bg-white border-[#f27a1a] shadow-md"
                        : "bg-white/40 border-slate-100 hover:bg-white"
                    }`}
                    onClick={() => setActivePolicy(isActive ? "" : policy.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#0d1527]">{policy.title}</span>
                      {isActive ? (
                        <ChevronUp className="h-4 w-4 text-[#f27a1a]" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-zinc-400" />
                      )}
                    </div>
                    {isActive && (
                      <p className="text-[11px] text-zinc-500 leading-normal mt-2.5 pt-2.5 border-t border-slate-100">
                        {policy.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel: Orange 24h refund highlight card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-tr from-[#9a3412] to-[#c2410c] text-white p-8 rounded-3xl shadow-lg flex flex-col justify-between min-h-[380px] relative overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute right-0 bottom-0 w-[200px] h-[200px] bg-orange-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 w-fit px-2.5 py-0.5 rounded-full">
                Fast-Track Refunding
              </span>
              <h3 className="text-2xl font-black leading-tight tracking-tight mt-1">
                Get Claim in 24 Hours on Loss & Damage Refunding Process
              </h3>
              <p className="text-orange-50 text-xs leading-relaxed max-w-sm">
                We believe in transparent shipping. No prolonged dispute periods. If our audit confirms carrier failure, your reimbursement is disbursed inside 24 hours.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">1</div>
                <span className="text-xs font-semibold text-white">Complete Verification in 12 Hours</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">2</div>
                <span className="text-xs font-semibold text-white">Affordable shipping insurance rates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">3</div>
                <span className="text-xs font-semibold text-white">Immediate bank account refund disbursement</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. PRICING TARIFF CTA */}
      <section className="bg-[#0d1527] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest font-mono">Affordable Shipping</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              No Hidden Costs. No Surprises.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 font-bold">
                Just Straightforward Logistics.
              </span>
            </h2>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 bg-[#f27a1a] hover:bg-orange-600 rounded-full text-xs font-bold text-white shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            View Tariff Rate
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 10. PROHIBITED GOODS GRID */}
      <section id="prohibited" className="max-w-6xl w-full mx-auto px-6 py-20">
        <div className="flex flex-col items-center justify-center text-center gap-3 mb-12">
          <span className="text-[10px] text-red-500 bg-red-50 border border-red-100 font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">
            Safety compliance
          </span>
          <h2 className="text-3xl font-extrabold text-[#0d1527] tracking-tight">
            Prohibited Goods
          </h2>
          <p className="text-zinc-500 text-xs max-w-md leading-normal">
            To maintain safety and satisfy flight regulations, the following items are strictly banned from our express courier network:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          {[
            { name: "No Plants / Seeds", desc: "Agricultural Controls" },
            { name: "No Corrosives", desc: "Chemical Hazard" },
            { name: "No Open Liquids", desc: "Leak & Spill Risks" },
            { name: "No Loose Lithium", desc: "Fire Risk Batteries" },
            { name: "No High Magnets", desc: "Aviation Interference" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center gap-4">
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                <Ban className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0d1527]">{item.name}</span>
                <span className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider mt-0.5">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="text-xs font-bold text-[#f27a1a] hover:underline flex items-center justify-center gap-1">
            View Full List of Restricted Cargo
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* 11. FAQ ACCORDION SECTION */}
      <section id="faq" className="bg-white border-y border-slate-100 py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Help Center</span>
            <h2 className="text-3xl font-extrabold text-[#0d1527] tracking-tight">
              Questions? Glad You Asked
            </h2>
          </div>

          {/* Accordion List */}
          <div className="flex flex-col gap-3">
            {faqData.map((faq, index) => {
              const isOpen = expandedFAQ === index;
              return (
                <div
                  key={index}
                  className={`border rounded-2xl p-5 transition-all cursor-pointer ${
                    isOpen ? "bg-slate-50 border-slate-200" : "bg-white border-slate-100 hover:bg-slate-50"
                  }`}
                  onClick={() => setExpandedFAQ(isOpen ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-bold text-[#0d1527]">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4.5 w-4.5 text-[#f27a1a]" />
                    ) : (
                      <ChevronDown className="h-4.5 w-4.5 text-zinc-400" />
                    )}
                  </div>
                  {isOpen && (
                    <p className="text-xs text-zinc-500 leading-relaxed mt-4 pt-4 border-t border-slate-200/60">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. CONTACT INFO & MOCK INTERACTIVE MAP */}
      <section id="contact" className="max-w-6xl w-full mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Info & Address (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Local Branch</span>
              <h2 className="text-3xl font-extrabold text-[#0d1527] tracking-tight">
                We&apos;re Here For You
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Connect with our local service hub or mail us directly. Our booking agents are available 24/7 to manage your pickup orders.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              
              {/* Call detail */}
              <div className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#f27a1a] flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">24/7 Booking Desk</span>
                  <span className="text-xs font-bold text-[#0d1527]">+91 99000 99000</span>
                </div>
              </div>

              {/* Email detail */}
              <div className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#f27a1a] flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Direct Mail</span>
                  <span className="text-xs font-bold text-[#0d1527]">info@manvi-express.com</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right panel: Premium Mock Map Graphic (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-4 shadow-md overflow-hidden relative min-h-[300px]">
            {/* Map Placeholder Visual styling mimicking actual maps */}
            <div className="absolute inset-0 bg-[#e5e9f0] bg-no-repeat bg-cover pointer-events-none opacity-90" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"800\" height=\"400\" viewBox=\"0 0 800 400\"><rect width=\"800\" height=\"400\" fill=\"%23eef2f6\"/><path d=\"M0,50 L800,50 M0,150 L800,150 M0,280 L800,280 M0,350 L800,350 M120,0 L120,400 M320,0 L320,400 M550,0 L550,400 M700,0 L700,400\" stroke=\"%23cbd5e1\" stroke-width=\"2\"/><circle cx=\"320\" cy=\"150\" r=\"150\" fill=\"none\" stroke=\"%23cbd5e1\" stroke-width=\"1\"/><circle cx=\"320\" cy=\"150\" r=\"8\" fill=\"%23f27a1a\" stroke=\"white\" stroke-width=\"2\"/></svg>')" }} />
            
            {/* Overlay map marker card */}
            <div className="absolute bottom-6 left-6 bg-[#0d1527] text-white p-4 rounded-2xl shadow-lg border border-white/5 max-w-xs z-10">
              <span className="text-[9px] font-bold text-[#f27a1a] uppercase tracking-wider font-mono">Headquarters Location</span>
              <h4 className="text-xs font-bold text-white mt-1">Manvi International Hub</h4>
              <p className="text-[10px] text-zinc-400 mt-1 leading-normal">
                4th floor, Metro Business Plaza, Central Terminal Road, Mumbai, India.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 14. SOLID ORANGE FOOTER */}
      <footer className="bg-[#f27a1a] text-white pt-16 pb-8 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Footer Left description (5 Cols) */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-md text-[#f27a1a] font-extrabold text-lg italic">
                  M
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-extrabold text-[#0d1527] tracking-tight leading-none">
                    Manvi
                  </span>
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider mt-0.5">
                    International Courier
                  </span>
                </div>
              </div>
              <p className="text-orange-50 text-xs leading-relaxed max-w-sm">
                Manvi International Courier is a premier globally consolidated logistics company. Connecting global borders for businesses and individual shipments safely, transparently, and on time.
              </p>
            </div>

            {/* Footer Center links (4 Cols) */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <span className="text-xs font-bold text-[#0d1527] uppercase tracking-wider">Quick Links</span>
              <div className="grid grid-cols-2 gap-2 text-xs text-orange-50">
                <a href="#about" className="hover:text-zinc-900 transition-colors">About Us</a>
                <a href="#services" className="hover:text-zinc-900 transition-colors">Services</a>
                <a href="#claims" className="hover:text-zinc-900 transition-colors">Claims Policy</a>
                <a href="#faq" className="hover:text-zinc-900 transition-colors">Help Center FAQs</a>
                <a href="#prohibited" className="hover:text-zinc-900 transition-colors">Banned Goods</a>
              </div>
            </div>

            {/* Footer Right Office info (3 Cols) */}
            <div className="md:col-span-3 flex flex-col gap-4">
              <span className="text-xs font-bold text-[#0d1527] uppercase tracking-wider">Office Info</span>
              <div className="flex flex-col gap-2.5 text-xs text-orange-50 font-medium">
                <span className="flex items-start gap-1.5">
                  <MapPin className="h-4 w-4 text-[#0d1527] flex-shrink-0 mt-0.5" />
                  Metro Plaza, Mumbai, India.
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-[#0d1527]" />
                  info@manvi-express.com
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-[#0d1527]" />
                  +91 99000 99000
                </span>
              </div>
            </div>

          </div>

          {/* Footer bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-orange-100">
            <span>&copy; {new Date().getFullYear()} Manvi International Courier. All rights reserved.</span>
            <div className="flex gap-6">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

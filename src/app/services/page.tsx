import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Package, Truck, Zap, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

const ManviChatBot = dynamic(() => import("@/components/ManviChatBot"));
const ManviWhatsApp = dynamic(() => import("@/components/ManviWhatsApp"));

// Navigation items matching the design
const navItems = [
  { name: "DHL", icon: <Globe className="w-5 h-5 text-[#f27a1a]" />, active: true },
  { name: "UPS", icon: <ShieldCheck className="w-5 h-5 text-[#f27a1a]" />, active: false },
  { name: "Fedex", icon: <Zap className="w-5 h-5 text-[#f27a1a]" />, active: false },
  { name: "FedEx - Medicine & Special Content", icon: <Package className="w-5 h-5 text-[#f27a1a]" />, active: false },
  { name: "Aramex", icon: <Truck className="w-5 h-5 text-[#f27a1a]" />, active: false },
  { name: "DIRECT (SELF-NETWORK) SERVICES", icon: <Globe className="w-5 h-5 text-[#f27a1a]" />, active: false },
];

const serviceDetails = [
  {
    id: "dhl",
    title: "DHL",
    subtitle: "The World's #1 International Courier — Now At Your Doorstep",
    description: "Whether You're Sending A Passport-Sized Document Or A 30kg Carton, DHL's Express Network Covers Every Country On The Globe.",
    dox: [
      { label: "Destinations", value: "All Countries" },
      { label: "Weight", value: "500g - 2kg" },
      { label: "Boxes", value: "Single" },
      { label: "Delivery", value: "5-7 Working Days" }
    ],
    nondox: [
      { dest: "USA", weight: "30kg/box", duty: "Duty may apply", delivery: "5-7 working days" },
      { dest: "Canada", weight: "30kg/box", duty: "Up to CAD 20", delivery: "5-7 working days" },
      { dest: "Australia", weight: "30kg/box", duty: "Up to AUD 800", delivery: "5-7 working days" },
      { dest: "New Zealand", weight: "30kg/box", duty: "Up to AUD 800", delivery: "5-7 working days" },
      { dest: "Rest of World", weight: "30kg/box", duty: "Duty may apply", delivery: "5-7 working days" },
    ],
  },
  {
    id: "ups",
    title: "UPS",
    subtitle: "Speed And Reliability Across Every Major Market",
    description: "UPS Combines Global Reach With Robust Tracking, Making It The Smart Choice For Businesses And Individuals Shipping To North America, Australia, And Beyond.",
    dox: null,
    nondox: [
      { dest: "USA", weight: "30kg/box", duty: "Duty may apply", delivery: "7-9 working days" },
      { dest: "Canada", weight: "30kg/box", duty: "Up to CAD 20", delivery: "7-9 working days" },
      { dest: "Australia", weight: "30kg/box", duty: "Up to AUD 800", delivery: "7-9 working days" },
      { dest: "New Zealand", weight: "30kg/box", duty: "Up to AUD 800", delivery: "7-9 working days" },
      { dest: "Rest of World", weight: "30kg/box", duty: "Duty may apply", delivery: "7-9 working days" },
    ],
  },
  {
    id: "fedex",
    title: "FedEx",
    subtitle: "Precision Delivery To The World's Biggest Destinations",
    description: "FedEx's Express Network Ensures Your Shipment Moves Fast, With Full Visibility From Pickup To Delivery.",
    dox: null,
    nondox: [
      { dest: "USA", weight: "30kg/box", duty: "Duty may apply", delivery: "6-8 working days" },
      { dest: "Canada", weight: "30kg/box", duty: "Up to CAD 20", delivery: "6-8 working days" },
      { dest: "Australia", weight: "30kg/box", duty: "Up to AUD 800", delivery: "6-8 working days" },
      { dest: "New Zealand", weight: "30kg/box", duty: "Up to AUD 800", delivery: "6-8 working days" },
      { dest: "Rest of World", weight: "30kg/box", duty: "Duty may apply", delivery: "6-8 working days" },
    ],
  }
];

export const metadata = {
  title: "Services",
  description: "Explore our range of international courier and freight services including DHL, UPS, FedEx, Aramex, and our Direct Network.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      <main className="flex-1 w-full max-w-425 mx-auto px-4 sm:px-6 md:px-8 py-8 pb-20">
        {/* Top Banner */}
        <div className="relative w-full h-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-sm flex items-center justify-end px-8 sm:px-12 md:px-20 mb-8 md:mb-12">
          <Image
            src="/hero-right.jpg"
            alt="Warehouse services"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#1c1f2e]/80" />
          
          <div className="relative z-10 text-right flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Services</h1>
            <p className="text-white/70 text-sm font-medium tracking-wide">Home / Services</p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-8 xl:gap-12 relative items-start">
          
          {/* Left Sidebar (Sticky) */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 z-20">
            {/* Nav Card */}
            <div className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-[26px] md:text-[28px] font-extrabold text-[#f27a1a] leading-[1.1] tracking-tight">
                  Every Parcel. Every Country. Every Time.
                </h2>
                <p className="text-xs text-gray-500 font-medium leading-relaxed mt-2">
                  From A Single Document To A Multi-Box Shipment, Manvi International Courier Gets It There — With The World's Best Carriers And Our Own Direct Delivery Network.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                {navItems.map((item, i) => (
                  <button 
                    key={i} 
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all text-left group bg-white
                      ${item.active ? 'border border-[#f27a1a] shadow-sm' : 'border border-transparent hover:border-[#f27a1a]/30 shadow-sm'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-bold text-sm text-[#1c1f2e] group-hover:text-[#f27a1a] transition-colors leading-snug">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 flex flex-col gap-5 text-center">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#f27a1a] leading-tight tracking-tight">
                Not Sure Which Service Is Right For You?
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Tell Us Where You're Shipping, How Much It Weighs, And What's Inside — We'll Recommend The Fastest And Most Cost-Effective Option.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link href="/contact" className="flex-1 flex items-center justify-center gap-2 border border-[#f27a1a] text-[#f27a1a] font-bold text-sm py-3 px-4 rounded-xl hover:bg-[#f27a1a] hover:text-white transition-colors">
                  Contact Us <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link href="/quote" className="flex-1 flex items-center justify-center gap-2 border border-[#f27a1a] text-[#f27a1a] font-bold text-sm py-3 px-4 rounded-xl hover:bg-[#f27a1a] hover:text-white transition-colors">
                  Get A Quote <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex flex-col gap-8">
            {serviceDetails.map((service, idx) => (
              <div key={service.id} className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 md:p-10 flex flex-col">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-[#f27a1a]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1c1f2e]">{service.title}</h3>
                </div>

                <h4 className="font-bold text-[#1c1f2e] text-sm sm:text-base mb-2">{service.subtitle}</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 max-w-3xl">
                  {service.description}
                </p>

                {/* DOX Section */}
                {service.dox && (
                  <div className="mb-8">
                    <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">Document Shipping (DOX)</h5>
                    <ul className="flex flex-col gap-2">
                      {service.dox.map((item, i) => (
                        <li key={i} className="text-xs sm:text-sm text-gray-500 font-medium flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 shrink-0" />
                          <strong className="text-gray-700 mr-1">{item.label}:</strong> {item.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Non-DOX Section */}
                {service.nondox && (
                  <div className="flex flex-col">
                    <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">Parcel Shipping (Non-DOX)</h5>
                    
                    <div className="overflow-x-auto pb-4">
                      <table className="w-full text-left min-w-[600px] border-separate border-spacing-y-2">
                        <thead>
                          <tr>
                            <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-l-xl px-4 py-3">Destination</th>
                            <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">Max Weight</th>
                            <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">Duty-Free Limit</th>
                            <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-r-xl px-4 py-3">Delivery</th>
                          </tr>
                        </thead>
                        <tbody>
                          {service.nondox.map((row, i) => (
                            <tr key={i} className="bg-white transition-colors">
                              <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">{row.dest}</td>
                              <td className="text-xs font-medium text-gray-600 px-4 py-3">{row.weight}</td>
                              <td className="text-xs font-medium text-gray-600 px-4 py-3">{row.duty}</td>
                              <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">{row.delivery}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-2 text-[10px] sm:text-[11px] text-gray-400 font-medium flex flex-col gap-0.5">
                      <span>Max Box Size: 100×80×80 Cm | Single Or Multiple Pieces Accepted.</span>
                      <span>Also Available: Co-Loaders / 3, DHL For Documents And Parcels To All Countries</span>
                    </div>
                  </div>
                )}

              </div>
            ))}
            
            {/* Aramex */}
            <div id="aramex" className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-[#f27a1a]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1c1f2e]">Aramex</h3>
              </div>
              <h4 className="font-bold text-[#1c1f2e] text-sm sm:text-base mb-2">Cost-Effective Delivery To Australia And Beyond</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 max-w-3xl">
                Aramex Offers Flexible Express And Economy Options, Making It An Excellent Choice For Regular Australia-Bound Shipments And Select Worldwide Destinations.
              </p>
              
              <div className="flex flex-col">
                <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">Parcel Shipping (Non-DOX)</h5>
                <div className="overflow-x-auto pb-4">
                  <table className="w-full text-left min-w-[600px] border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-l-xl px-4 py-3">Service</th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">Destination</th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">Duty-Free Limit</th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-r-xl px-4 py-3">Delivery</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">DPX (Economy)</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Australia</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Up to AUD 800</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">8-10 working days</td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">PPX (Express)</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Australia</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Up to AUD 800</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">8-10 working days</td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">PPX (Express)</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Rest of World</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Duty may apply</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">6-8 working days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-[11px] text-gray-500 font-bold">
                  Max Box Size: 100×80×80 Cm | Min Weight: 500g | Max: 30kg/Box | Single Or Multiple Pieces Accepted
                </div>
              </div>
            </div>

            {/* FedEx Medicine */}
            <div id="fedex-medicine" className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-[#f27a1a]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1c1f2e]">FedEx — Medicine & Special Content</h3>
              </div>
              <h4 className="font-bold text-[#1c1f2e] text-sm sm:text-base mb-2">Specialist Shipping For Medicines And Sensitive Items</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 max-w-3xl">
                Sending Medicines, Health Supplements, Or Other Regulated Goods Abroad? Our FedEx Medicine Route Is Handled By Authorised Channels With Full Compliance, Giving You Peace Of Mind At Every Step.
              </p>
              
              <div className="flex flex-col">
                <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">Parcel Shipping (Non-DOX) Via Authorised Hub</h5>
                <div className="overflow-x-auto pb-4">
                  <table className="w-full text-left min-w-[600px] border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-l-xl px-4 py-3">Destination</th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">Max Weight</th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white px-4 py-3">Duty-Free Limit</th>
                        <th className="font-bold text-xs text-[#1c1f2e] bg-white rounded-r-xl px-4 py-3">Delivery</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">USA</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">30kg/box</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Duty may apply</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">10-12 working days</td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">Canada</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">30kg/box</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Up to CAD 20</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">10-12 working days</td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">Australia</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">30kg/box</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Up to AUD 800</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">10-12 working days</td>
                      </tr>
                      <tr className="bg-white transition-colors">
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-l-xl">New Zealand</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">30kg/box</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3">Up to NZD 100</td>
                        <td className="text-xs font-medium text-gray-600 px-4 py-3 rounded-r-xl">10-12 working days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <span className="text-[11px] text-gray-500 font-bold">Max Box Size: 100×80×80 Cm | Single Or Multiple Pieces Accepted</span>
                  <span className="text-[11px] text-[#f27a1a] font-bold">Please Contact Us Before Booking To Confirm Your Item Is Eligible For This Service.</span>
                </div>
              </div>
            </div>

            {/* DIRECT (SELF-NETWORK) SERVICES */}
            <div id="direct" className="bg-[#f8f9fa] rounded-2xl shadow-md border border-gray-100/50 p-6 sm:p-8 md:p-10 flex flex-col">
              <div className="mb-6">
                <span className="inline-block border border-[#f27a1a] text-[#f27a1a] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wide">
                  DIRECT (SELF-NETWORK) SERVICES
                </span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#1c1f2e] mb-2">Our Own Consolidation Routes</h3>
              <p className="text-gray-500 text-sm font-bold leading-relaxed mb-6">
                Better Rates, DDP Options, And No Cap On Total Shipment Weight.
              </p>
              
              <h5 className="font-extrabold text-sm text-[#1c1f2e] mb-4">Parcel Shipping (Non-DOX)</h5>

              <div className="flex flex-col gap-6">
                
                {/* UK */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h4 className="text-2xl font-extrabold text-[#f27a1a] mb-2">UK</h4>
                  <h5 className="font-bold text-[#1c1f2e] text-sm mb-3">Fast, Duty-Free Delivery Across the United Kingdom</h5>
                  <p className="text-gray-400 text-xs font-medium mb-4">Our premium UK route operates via London Heathrow (LHR) with DPD handling last-mile delivery — one of the UK's most trusted domestic networks.</p>
                  
                  <ul className="flex flex-col gap-1.5 mb-4">
                    {[
                      { l: "Destination", v: "United Kingdom" },
                      { l: "Weight", v: "500g - 30kg per box" },
                      { l: "Box size", v: "Up to 90x70x60 cm" },
                      { l: "Duty-Free Limit", v: "No limit" },
                      { l: "Delivery", v: "6-8 working days" }
                    ].map((item, i) => (
                      <li key={i} className="text-xs text-gray-500 font-medium flex items-center">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0" />
                        <span className="text-gray-500 mr-1">{item.l}:</span> {item.v}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-400 text-[10px] font-medium">Also available: USA service via LHR with FedEx IE, 16-24kg per box, DDP, 10-12 working days.</p>
                </div>

                {/* Europe */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h4 className="text-2xl font-extrabold text-[#f27a1a] mb-2">Europe</h4>
                  <h5 className="font-bold text-[#1c1f2e] text-sm mb-3">Door-to-Door Across the Continent</h5>
                  <p className="text-gray-400 text-xs font-medium mb-4">Ship to any European country on our direct DPD Europe route. No hidden duties, no surprise customs fees.</p>
                  
                  <ul className="flex flex-col gap-1.5">
                    {[
                      { l: "Destinations", v: "All of Europe" },
                      { l: "Weight", v: "1kg - 30kg per box" },
                      { l: "Box size", v: "Up to 90x70x60 cm" },
                      { l: "Boxes", v: "Single piece" },
                      { l: "Duty-Free Limit", v: "No limit" },
                      { l: "Delivery", v: "12-15 working days" }
                    ].map((item, i) => (
                      <li key={i} className="text-xs text-gray-500 font-medium flex items-center">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0" />
                        <span className="text-gray-500 mr-1">{item.l}:</span> {item.v}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Canada */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h4 className="text-2xl font-extrabold text-[#f27a1a] mb-2">Canada</h4>
                  <h5 className="font-bold text-[#1c1f2e] text-sm mb-3">DDP Service — No Customs Surprises, Ever</h5>
                  <p className="text-gray-400 text-xs font-medium mb-5">Our Canada direct service is fully Delivered Duty Paid (DDP), meaning all import duties and taxes are settled before your shipment arrives. Available via two gateway hubs for maximum flexibility.</p>
                  
                  <div className="overflow-x-auto pb-4">
                    <table className="w-full text-left min-w-[500px] border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">Route</th>
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">Max Weight</th>
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">Duty-Free Limit</th>
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">Delivery Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">Via Vancouver (YVR)</td>
                          <td className="text-xs font-medium text-gray-500 py-4">20kg/box, no total limit</td>
                          <td className="text-xs font-medium text-gray-500 py-4">No limit</td>
                          <td className="text-xs font-medium text-gray-500 py-4">12-15 working days</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">Via Toronto (YYZ)</td>
                          <td className="text-xs font-medium text-gray-500 py-4">20kg/box, no total limit</td>
                          <td className="text-xs font-medium text-gray-500 py-4">No limit</td>
                          <td className="text-xs font-medium text-gray-500 py-4">12-15 working days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-gray-400 text-[10px] font-medium mt-2">Box size: Up to 90x70x60 cm | Single or multiple pieces accepted</p>
                </div>

                {/* Australia */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h4 className="text-2xl font-extrabold text-[#f27a1a] mb-2">Australia</h4>
                  <h5 className="font-bold text-[#1c1f2e] text-sm mb-3">Direct Australia Delivery Across All Zones</h5>
                  <p className="text-gray-400 text-xs font-medium mb-5">Our Australia direct service ships to every corner of the country, with no cap on total shipment weight. Delivery time is based on the destination zone within Australia.</p>
                  
                  <div className="overflow-x-auto pb-4">
                    <table className="w-full text-left min-w-[400px] border-collapse mb-6">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">Zone</th>
                          <th className="font-bold text-xs text-[#1c1f2e] pb-3">Delivery Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">Zone 1</td>
                          <td className="text-xs font-medium text-gray-500 py-4">12-15 working days</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">Zone 2</td>
                          <td className="text-xs font-medium text-gray-500 py-4">15-18 working days</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="text-xs font-medium text-gray-500 py-4">Zones 3-8</td>
                          <td className="text-xs font-medium text-gray-500 py-4">18-22 working days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <ul className="flex flex-col gap-1.5 mb-5">
                    {[
                      { l: "Weight", v: "500g - 20kg per box, no limit on total shipment weight" },
                      { l: "Box size", v: "Up to 90x70x60 cm" },
                      { l: "Boxes", v: "Single or multiple pieces" },
                      { l: "Duty-Free Limit", v: "No limit" }
                    ].map((item, i) => (
                      <li key={i} className="text-xs text-gray-500 font-medium flex items-center">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0" />
                        <span className="text-gray-500 mr-1">{item.l}:</span> {item.v}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[#f27a1a] text-[11px] font-bold">Not sure which zone your Australian destination falls under? Contact us and we'll check instantly.</p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <ManviChatBot />
      <ManviWhatsApp />
    </div>
  );
}

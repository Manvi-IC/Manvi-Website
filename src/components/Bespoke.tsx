import Image from "next/image";
import { Plus, Minus } from "lucide-react";

const CustomIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 16c0 6.627-5.373 12-12 12A11.95 11.95 0 0 1 7.514 24.485L16 16V4a12 12 0 0 1 12 12Z" fill="#ff8a00"/>
    <path d="M12.5 13.5L4.686 16A11.95 11.95 0 0 1 8 8.686L12.5 13.5Z" fill="#ff8a00" opacity="0.7"/>
    <path d="M11 25.5A11.95 11.95 0 0 1 4 16H8C8 20 11 22 11 25.5Z" fill="#ff8a00" opacity="0.4"/>
  </svg>
);

export default function Bespoke() {
  return (
    <section id="services" className="max-w-[1700px] w-full mx-auto px-6 py-10 font-sans">
      <div className="bg-[#eef0f5] rounded-[32px] shadow-sm border border-gray-100 p-10 lg:p-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* Left Side: Image with Read More Cutout */}
        <div className="relative w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-[32px] overflow-hidden bg-slate-300 flex items-center justify-center">
          <span className="text-slate-400 font-semibold uppercase tracking-widest text-xs">Image Placeholder</span>
          
          {/* Bottom Right Cutout Illusion (Assuming section background is #eef0f5) */}
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#eef0f5] rounded-full flex items-center justify-center pointer-events-none">
            <div className="w-28 h-28 bg-[#ff8a00] rounded-full relative flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-300">
              
              {/* Arrow Icon */}
              <svg className="w-8 h-8 text-white z-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
              </svg>

              {/* Circular Text SVG */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                <path id="textPathCircle" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text>
                  <textPath 
                    href="#textPathCircle" 
                    startOffset="0" 
                    className="text-[12px] fill-white font-bold tracking-[0.15em] uppercase"
                    textLength="220"
                  >
                    Read More • Read More •
                  </textPath>
                </text>
              </svg>
              
            </div>
          </div>
        </div>

        {/* Right Side: Content & Accordion */}
        <div className="flex flex-col">
          {/* Badge */}
          <div className="border border-orange-300/60 text-[#ff8a00] bg-orange-50/30 rounded-full px-4 py-1 text-[11px] font-semibold w-fit tracking-wide">
            Our Services
          </div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-[44px] font-extrabold text-[#1c1f2e] mt-5 tracking-tight leading-tight">
            Bespoke Shipping Solutions.
          </h2>
          
          {/* Accordions */}
          <div className="mt-12 flex flex-col gap-8">
            
            {/* Item 1 (Collapsed) */}
            <div className="border-b border-gray-200/80 pb-6 flex items-start justify-between cursor-pointer group">
              <div className="flex flex-col gap-1">
                <span className="text-[#ff8a00] text-[13px] font-black tracking-widest">01</span>
                <h3 className="text-2xl font-bold text-[#333b49] group-hover:text-[#1c1f2e] transition-colors">Global Personal Logistics</h3>
              </div>
              <Plus className="text-[#1c1f2e] w-7 h-7 mt-2" strokeWidth={1.5} />
            </div>
            
            {/* Item 2 (Expanded) */}
            <div className="flex flex-col">
              <div className="flex items-start justify-between cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="text-[#ff8a00] text-[13px] font-black tracking-widest">02</span>
                  <h3 className="text-2xl font-bold text-[#1c1f2e]">Enterprise & Bulk Solutions</h3>
                  <p className="text-sm text-gray-400 mt-2 font-medium">Optimizing supply chains for businesses that demand precision.</p>
                </div>
                <Minus className="text-[#1c1f2e] w-7 h-7 mt-2" strokeWidth={1.5} />
              </div>
              
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                
                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
                  <CustomIcon />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[15px] font-bold text-[#1c1f2e]">Strategic Bulk Shipping</span>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed">High-volume transit with optimized cost-structures.</span>
                  </div>
                </div>
                
                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
                  <CustomIcon />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[15px] font-bold text-[#1c1f2e]">Account Management</span>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed">Dedicated experts to navigate your commercial logistics.</span>
                  </div>
                </div>
                
                {/* Card 3 (Full width) */}
                <div className="sm:col-span-2 bg-white rounded-3xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
                  <CustomIcon />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[15px] font-bold text-[#1c1f2e]">Seamless Integration</span>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed">Regular pickups tailored to your business rhythm.</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        
      </div>
      </div>
    </section>
  );
}

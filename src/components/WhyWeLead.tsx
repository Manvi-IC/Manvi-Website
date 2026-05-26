import Image from "next/image";

export default function WhyWeLead() {
  return (
    <section className="w-full mx-auto px-6 py-10 font-sans max-w-[1700px]">
      <div className="bg-[#eef0f5] rounded-[32px] shadow-sm border border-gray-100 p-10 lg:p-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* ROW 1 */}
        {/* Column 1: Title Block */}
        <div className="flex flex-col justify-start pt-2">
          <div className="border border-orange-300/60 text-[#ff8a00] bg-orange-50/30 rounded-full px-4 py-1.5 text-[11px] font-semibold w-fit tracking-wide">
            The Manvi Advantage
          </div>
          <h2 className="text-4xl md:text-[44px] font-extrabold text-[#1c1f2e] mt-4 tracking-tight leading-tight">
            Why We Lead
          </h2>
        </div>
        
        {/* Column 2: Delivery Success Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between h-[240px] lg:h-auto">
          <div className="flex items-center gap-2.5">
            <span className="text-xl leading-none">📦</span>
            <span className="font-bold text-[#333b49] text-[15px]">Delivery Success</span>
          </div>
          <div className="flex flex-col items-end text-right mt-auto pt-6">
            <span className="text-[36px] sm:text-[42px] font-extrabold text-[#ff8a00] leading-none tracking-tight">98%</span>
            <div className="w-full h-[1.5px] bg-[#ff8a00]/30 my-4" />
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed sm:max-w-[85%]">
              Successful international deliveries completed with accuracy and care.
            </p>
          </div>
        </div>
        
        {/* Column 3 & 4: Airplane Image */}
        <div className="md:col-span-2 relative rounded-[32px] overflow-hidden h-[240px] lg:h-auto shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] bg-slate-300 flex items-center justify-center">
          <span className="text-slate-400 font-semibold uppercase tracking-widest text-xs">Image Placeholder</span>
        </div>

        {/* ROW 2 */}
        {/* Column 1: Elite Partnerships Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center gap-2.5">
            <span className="text-xl leading-none">🌍</span>
            <span className="font-bold text-[#333b49] text-[15px]">Elite Partnerships</span>
          </div>
          <div className="flex flex-col items-end text-right mt-auto pt-8">
            <h3 className="text-[32px] sm:text-[38px] font-extrabold text-[#ff8a00] leading-[1.1] tracking-tight">
              Multiple<br/>Countries
            </h3>
            <div className="w-full h-[1.5px] bg-[#ff8a00]/30 my-4" />
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
              Collaboration with world-class carriers including DHL, FedEx, and UPS.
            </p>
          </div>
        </div>
        
        {/* Column 2: Warehouse Image */}
        <div className="relative rounded-[32px] overflow-hidden min-h-[340px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] bg-slate-300 flex items-center justify-center">
          <span className="text-slate-400 font-semibold uppercase tracking-widest text-xs">Image Placeholder</span>
        </div>
        
        {/* Column 3: Customs Mastery Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center gap-2.5">
            <span className="text-xl leading-none">🚚</span>
            <span className="font-bold text-[#333b49] text-[15px]">Customs Mastery</span>
          </div>
          <div className="flex flex-col items-end text-right mt-auto pt-8">
            <span className="text-[36px] sm:text-[42px] font-extrabold text-[#ff8a00] leading-none tracking-tight">1000+</span>
            <div className="w-full h-[1.5px] bg-[#ff8a00]/30 my-4" />
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed sm:max-w-[90%]">
              Expert documentation support to navigate global borders effortlessly.
            </p>
          </div>
        </div>
        
        {/* Column 4: Technological Edge Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center gap-2.5">
            <span className="text-xl leading-none">🤝</span>
            <span className="font-bold text-[#333b49] text-[15px]">Technological Edge</span>
          </div>
          <div className="flex flex-col items-end text-right mt-auto pt-8">
            <h3 className="text-[32px] sm:text-[38px] font-extrabold text-[#ff8a00] leading-[1.1] tracking-tight">
              Real-Time<br/>Updates
            </h3>
            <div className="w-full h-[1.5px] bg-[#ff8a00]/30 my-4" />
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed sm:max-w-[90%]">
              End-to-end, real-time tracking for total peace of mind.
            </p>
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}

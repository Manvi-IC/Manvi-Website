"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyWeLead() {
  const { t } = useLanguage();

  return (
    <section className="w-full mx-auto px-4 sm:px-6 py-10 font-sans max-w-425">
      <div className="bg-[#eef0f5] rounded-4xl shadow-sm border border-gray-100 p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* ROW 1 */}
          {/* Column 1: Title Block */}
          <div className="flex flex-col justify-start pt-2">
            <div className="border border-orange-300/60 text-[#ff8a00] bg-orange-50/30 rounded-full px-4 py-1.5 text-[11px] font-semibold w-fit tracking-wide">
              {t.wwl_badge}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#1c1f2e] mt-4 tracking-tight leading-tight">
              {t.wwl_title}
            </h2>
          </div>

          {/* Column 2: Delivery Success Card */}
          <div className="group bg-white rounded-4xl p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between h-55 sm:h-60 lg:h-auto transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-[#ff8a00]/30 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <span className="text-xl leading-none transition-transform duration-300 group-hover:scale-115">
                📦
              </span>
              <span className="font-bold text-[#333b49] text-[15px]">
                {t.wwl_card1_label}
              </span>
            </div>
            <div className="flex flex-col items-end text-right mt-auto pt-6">
              <span className="text-[36px] sm:text-[42px] font-extrabold text-[#ff8a00] leading-none tracking-tight">
                98%
              </span>
              <div className="w-full h-[1.5px] bg-[#ff8a00]/30 my-4 transition-colors duration-300 group-hover:bg-[#ff8a00]/50" />
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed sm:max-w-[85%]">
                {t.wwl_card1_desc}
              </p>
            </div>
          </div>

          {/* Column 3 & 4: Airplane Image */}
          <div className="md:col-span-2 relative rounded-4xl overflow-hidden h-55 sm:h-60 lg:h-auto shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] bg-slate-100 flex items-center justify-center cursor-pointer">
            <Image
              src="/cargo_airplane.png"
              alt="Cargo Airplane"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* ROW 2 */}
          {/* Column 1: Elite Partnerships Card */}
          <div className="group bg-white rounded-4xl p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between min-h-70 sm:min-h-85 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-[#ff8a00]/30 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <span className="text-xl leading-none transition-transform duration-300 group-hover:scale-115">
                🌍
              </span>
              <span className="font-bold text-[#333b49] text-[15px]">
                {t.wwl_card2_label}
              </span>
            </div>
            <div className="flex flex-col items-end text-right mt-auto pt-8">
              <h3 className="text-[28px] sm:text-[32px] lg:text-[38px] font-extrabold text-[#ff8a00] leading-[1.1] tracking-tight whitespace-pre-line">
                {t.wwl_card2_stat}
              </h3>
              <div className="w-full h-[1.5px] bg-[#ff8a00]/30 my-4 transition-colors duration-300 group-hover:bg-[#ff8a00]/50" />
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                {t.wwl_card2_desc}
              </p>
            </div>
          </div>

          {/* Column 2: Warehouse Image */}
          <div className="relative rounded-4xl overflow-hidden min-h-70 sm:min-h-85 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] bg-slate-100 flex items-center justify-center cursor-pointer">
            <Image
              src="/warehouse_forklift.png"
              alt="Warehouse Forklift"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Column 3: Customs Mastery Card */}
          <div className="group bg-white rounded-4xl p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between min-h-70 sm:min-h-85 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-[#ff8a00]/30 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <span className="text-xl leading-none transition-transform duration-300 group-hover:scale-115">
                🚚
              </span>
              <span className="font-bold text-[#333b49] text-[15px]">
                {t.wwl_card3_label}
              </span>
            </div>
            <div className="flex flex-col items-end text-right mt-auto pt-8">
              <span className="text-[32px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#ff8a00] leading-none tracking-tight">
                {t.wwl_card3_stat}
              </span>
              <div className="w-full h-[1.5px] bg-[#ff8a00]/30 my-4 transition-colors duration-300 group-hover:bg-[#ff8a00]/50" />
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed sm:max-w-[90%]">
                {t.wwl_card3_desc}
              </p>
            </div>
          </div>

          {/* Column 4: Technological Edge Card */}
          <div className="group bg-white rounded-4xl p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between min-h-70 sm:min-h-85 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-[#ff8a00]/30 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <span className="text-xl leading-none transition-transform duration-300 group-hover:scale-115">
                🤝
              </span>
              <span className="font-bold text-[#333b49] text-[15px]">
                {t.wwl_card4_label}
              </span>
            </div>
            <div className="flex flex-col items-end text-right mt-auto pt-8">
              <h3 className="text-[28px] sm:text-[32px] lg:text-[38px] font-extrabold text-[#ff8a00] leading-[1.1] tracking-tight whitespace-pre-line">
                {t.wwl_card4_stat}
              </h3>
              <div className="w-full h-[1.5px] bg-[#ff8a00]/30 my-4 transition-colors duration-300 group-hover:bg-[#ff8a00]/50" />
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed sm:max-w-[90%]">
                {t.wwl_card4_desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

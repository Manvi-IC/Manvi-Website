"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const CustomIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28 16c0 6.627-5.373 12-12 12A11.95 11.95 0 0 1 7.514 24.485L16 16V4a12 12 0 0 1 12 12Z"
      fill="#ff8a00"
    />
    <path
      d="M12.5 13.5L4.686 16A11.95 11.95 0 0 1 8 8.686L12.5 13.5Z"
      fill="#ff8a00"
      opacity="0.7"
    />
    <path
      d="M11 25.5A11.95 11.95 0 0 1 4 16H8C8 20 11 22 11 25.5Z"
      fill="#ff8a00"
      opacity="0.4"
    />
  </svg>
);

export default function Bespoke() {
  const { t } = useLanguage();
  const [activeAccordion, setActiveAccordion] = useState<1 | 2>(2);

  return (
    <section
      id="services"
      className="max-w-425 w-full mx-auto px-4 sm:px-6 py-10 font-sans"
    >
      <div className="bg-[#eef0f5] rounded-4xl shadow-sm border border-gray-100 p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side: Image */}
          <div className="relative w-full h-75 sm:h-100 md:h-125 lg:h-145 shrink-0">
            <div className="absolute inset-0 rounded-4xl overflow-hidden bg-slate-100 shadow-md">
              <Image
                src="/warehouse_worker.png"
                alt="Bespoke Shipping Solutions"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            {/* Bottom Right Cutout Illusion */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-40 sm:h-40 bg-[#eef0f5] rounded-full flex items-center justify-center pointer-events-none">
              <Link href="/services">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#ff8a00] rounded-full relative flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white z-10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                  <svg
                    className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite]"
                    viewBox="0 0 100 100"
                    aria-hidden
                  >
                    <path
                      id="textPathCircleBespoke"
                      d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      fill="none"
                    />
                    <text>
                      <textPath
                        href="#textPathCircleBespoke"
                        startOffset="0"
                        className="text-[12px] fill-white font-bold tracking-[0.15em] uppercase"
                        textLength="220"
                      >
                        {t.bespoke_read_more}
                      </textPath>
                    </text>
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Side: Content & Accordion */}
          <div className="flex flex-col justify-center h-full">
            {/* Badge */}
            <div className="border border-orange-300/60 text-[#ff8a00] bg-orange-50/30 rounded-full px-4 py-1 text-[11px] font-semibold w-fit tracking-wide">
              {t.bespoke_badge}
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#1c1f2e] mt-5 tracking-tight leading-tight">
              {t.bespoke_title}
            </h2>

            {/* Accordions */}
            <div className="mt-8 sm:mt-10 flex flex-col gap-6">
              {/* Item 1 */}
              <div className="border-b border-gray-200/80 pb-6 flex flex-col">
                <div
                  onClick={() => setActiveAccordion(1)}
                  className="flex items-start justify-between cursor-pointer group"
                >
                  <div className="flex flex-col gap-1 pr-4">
                    <span className="text-[#ff8a00] text-[13px] font-black tracking-widest">
                      {t.bespoke_acc1_num}
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-bold transition-colors ${activeAccordion === 1 ? "text-[#1c1f2e]" : "text-[#333b49] group-hover:text-[#1c1f2e]"}`}
                    >
                      {t.bespoke_acc1_title}
                    </h3>
                    {activeAccordion === 1 && (
                      <p className="text-sm text-gray-400 mt-2 font-medium">
                        {t.bespoke_acc1_desc}
                      </p>
                    )}
                  </div>
                  {activeAccordion === 1 ? (
                    <Minus
                      className="text-[#1c1f2e] w-6 h-6 sm:w-7 sm:h-7 mt-2 shrink-0"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Plus
                      className="text-[#1c1f2e] w-6 h-6 sm:w-7 sm:h-7 mt-2 shrink-0 group-hover:scale-110 transition-transform"
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                {activeAccordion === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8 transition-all duration-300">
                    <div className="bg-white rounded-[20px] sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
                      <CustomIcon />
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-bold text-[#1c1f2e]">
                          {t.bespoke_acc1_card1_title}
                        </span>
                        <span className="text-xs text-gray-500 font-medium leading-relaxed">
                          {t.bespoke_acc1_card1_desc}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white rounded-[20px] sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
                      <CustomIcon />
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-bold text-[#1c1f2e]">
                          {t.bespoke_acc1_card2_title}
                        </span>
                        <span className="text-xs text-gray-500 font-medium leading-relaxed">
                          {t.bespoke_acc1_card2_desc}
                        </span>
                      </div>
                    </div>
                    <div className="sm:col-span-2 bg-white rounded-[20px] sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
                      <CustomIcon />
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-bold text-[#1c1f2e]">
                          {t.bespoke_acc1_card3_title}
                        </span>
                        <span className="text-xs text-gray-500 font-medium leading-relaxed">
                          {t.bespoke_acc1_card3_desc}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Item 2 */}
              <div className="border-b border-gray-200/80 pb-6 flex flex-col">
                <div
                  onClick={() => setActiveAccordion(2)}
                  className="flex items-start justify-between cursor-pointer group"
                >
                  <div className="flex flex-col gap-1 pr-4">
                    <span className="text-[#ff8a00] text-[13px] font-black tracking-widest">
                      {t.bespoke_acc2_num}
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-bold transition-colors ${activeAccordion === 2 ? "text-[#1c1f2e]" : "text-[#333b49] group-hover:text-[#1c1f2e]"}`}
                    >
                      {t.bespoke_acc2_title}
                    </h3>
                    {activeAccordion === 2 && (
                      <p className="text-sm text-gray-400 mt-2 font-medium">
                        {t.bespoke_acc2_desc}
                      </p>
                    )}
                  </div>
                  {activeAccordion === 2 ? (
                    <Minus
                      className="text-[#1c1f2e] w-6 h-6 sm:w-7 sm:h-7 mt-2 shrink-0"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Plus
                      className="text-[#1c1f2e] w-6 h-6 sm:w-7 sm:h-7 mt-2 shrink-0 group-hover:scale-110 transition-transform"
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                {activeAccordion === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8 transition-all duration-300">
                    <div className="bg-white rounded-[20px] sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
                      <CustomIcon />
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-bold text-[#1c1f2e]">
                          {t.bespoke_acc2_card1_title}
                        </span>
                        <span className="text-xs text-gray-500 font-medium leading-relaxed">
                          {t.bespoke_acc2_card1_desc}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white rounded-[20px] sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
                      <CustomIcon />
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-bold text-[#1c1f2e]">
                          {t.bespoke_acc2_card2_title}
                        </span>
                        <span className="text-xs text-gray-500 font-medium leading-relaxed">
                          {t.bespoke_acc2_card2_desc}
                        </span>
                      </div>
                    </div>
                    <div className="sm:col-span-2 bg-white rounded-[20px] sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
                      <CustomIcon />
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-bold text-[#1c1f2e]">
                          {t.bespoke_acc2_card3_title}
                        </span>
                        <span className="text-xs text-gray-500 font-medium leading-relaxed">
                          {t.bespoke_acc2_card3_desc}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

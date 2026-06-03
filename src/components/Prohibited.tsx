"use client";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Prohibited() {
  const { t } = useLanguage();

  const prohibitedItems = [
    { icon: "🧪", label: t.prohibited_item1 },
    { icon: "💵", label: t.prohibited_item2 },
    { icon: "📱", label: t.prohibited_item3 },
    { icon: "💎", label: t.prohibited_item4 },
    { icon: "🌿", label: t.prohibited_item5 },
  ];

  return (
    <div className="px-10 lg:px-14 pb-10 lg:pb-14 pt-4 font-sans border-t border-gray-200/50">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center text-center gap-1.5">
          <h2 className="text-[26px] md:text-[30px] font-extrabold text-[#1c1f2e] tracking-tight">
            {t.prohibited_title}
          </h2>
          <p className="text-[13px] text-gray-500 font-medium tracking-wide">
            {t.prohibited_desc}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 mt-14 w-full max-w-[900px] mx-auto px-4">
          {prohibitedItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-start text-center gap-4"
            >
              {/* Red Crossed-Out Circle */}
              <div className="relative w-[60px] h-[60px] md:w-[68px] md:h-[68px] flex items-center justify-center">
                <div className="absolute inset-0 border-[2.5px] border-[#e11d48] rounded-full z-10" />
                <div className="absolute top-1/2 left-0 w-full h-[2.5px] bg-[#e11d48] -rotate-45 z-20" />
                <span className="text-3xl md:text-[38px] z-0 drop-shadow-sm leading-none flex items-center justify-center">
                  {item.icon}
                </span>
              </div>

              <span className="text-[11px] text-gray-500 font-extrabold leading-snug w-full px-2 max-w-[140px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <button
            onClick={() => window.open("/content_allowed.pdf", "_blank")}
            className="border-2 border-[#ff8a00] text-[#ff8a00] hover:bg-[#ff8a00] hover:text-white transition-colors duration-300 rounded-md px-6 py-2.5 text-[14.5px] font-extrabold flex items-center gap-1.5"
          >
            {t.prohibited_btn}{" "}
            <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

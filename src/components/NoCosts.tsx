"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NoCosts() {
  const { t } = useLanguage();

  return (
    <div className="p-10 lg:p-14 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        <div className="flex flex-col gap-4">
          <div className="border border-orange-300/80 text-[#ff8a00] rounded-full px-4 py-1 text-[12px] font-extrabold w-fit tracking-wide bg-transparent">
            {t.nocost_badge}
          </div>
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#1c1f2e] leading-[1.1] tracking-tight whitespace-pre-line">
            {t.nocost_title}
          </h2>
        </div>

        <div className="flex flex-col items-start gap-6 lg:pl-4">
          <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
            {t.nocost_desc}
          </p>
          <Link href="/quote">
            <button className="border-2 border-[#ff8a00] text-[#ff8a00] hover:bg-[#ff8a00] hover:text-white transition-colors duration-300 rounded-md px-6 py-2.5 text-[14.5px] font-extrabold flex items-center gap-1.5 mt-2">
              {t.nocost_btn}{" "}
              <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

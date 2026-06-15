"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const faqs = [
    {
      num: "01",
      q: t.faq_q1,
      a: t.faq_a1,
    },
    {
      num: "02",
      q: t.faq_q2,
      a: t.faq_a2,
    },
    {
      num: "03",
      q: t.faq_q3,
      a: t.faq_a3,
    },
    {
      num: "04",
      q: t.faq_q4,
      a: t.faq_a4,
    },
    {
      num: "05",
      q: t.faq_q5,
      a: t.faq_a5,
    },
  ];

  return (
    <section id="faq" className="max-w-425 w-full mx-auto px-6 mt-6 font-sans">
      <div className="bg-[#eef0f5] rounded-4xl px-10 md:px-16 lg:px-20 py-14 md:py-20 shadow-sm border border-gray-100">
        {/* Badge & Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <div className="border border-orange-300 text-[#ff8a00] bg-transparent rounded-full px-5 py-1.5 text-[11px] font-bold tracking-wide w-fit">
            {t.faq_badge}
          </div>
          <h2 className="text-[26px] md:text-[40px] font-extrabold text-[#1c1f2e] tracking-tight mt-1">
            {t.faq_title}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col">
          {faqs.map((faq, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-4 lg:gap-16 border-b border-gray-300/40 last:border-b-0 cursor-pointer items-baseline"
                style={{ padding: isActive ? "2rem 0" : "1.25rem 0" }}
              >
                {/* Left: Number + Question */}
                <div className="flex flex-col gap-0.5 select-none">
                  <span className="text-[#ff8a00] text-[12px] font-black tracking-widest">
                    {faq.num}
                  </span>
                  <h3
                    className="font-extrabold text-[#1c1f2e] leading-snug tracking-tight transition-all duration-300"
                    style={{ fontSize: isActive ? "28px" : "16px" }}
                  >
                    {faq.q}
                  </h3>
                </div>

                {/* Right: Answer */}
                <p
                  className="leading-relaxed select-none transition-all duration-300"
                  style={{
                    fontSize: isActive ? "16px" : "13px",
                    color: isActive ? "#4b5563" : "#9ca3af",
                    fontStyle: isActive ? "normal" : "italic",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

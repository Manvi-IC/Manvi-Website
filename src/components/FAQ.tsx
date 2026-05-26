"use client";
import { useState } from "react";

const faqs = [
  {
    num: "01",
    q: "Where Can I Send My Packages?",
    a: "Almost anywhere! We have a strong presence in the USA, Canada, UK, Europe, and Australia. Whether it's a big city or a quiet suburb, we'll get it there."
  },
  {
    num: "02",
    q: "How Do I Know I'm Getting A Fair Price?",
    a: "We believe in value. Your quote is based on exactly what you need—considering weight, destination, and how fast you need it delivered. We promise no hidden surprises when it's time to pay."
  },
  {
    num: "03",
    q: "Can I See Where My Package Is Right Now?",
    a: "Yes! The moment you ship with us, you'll get a unique tracking number. You can watch your package's journey in real-time, giving you total confidence."
  },
  {
    num: "04",
    q: "What Happens If There Is A Delay Or A Problem?",
    a: "We know your shipments are important. If something goes wrong, we are here to help. To ensure a fair and thorough resolution, our team and our global partners (like DHL, FedEx, and UPS) conduct a detailed investigation."
  },
  {
    num: "05",
    q: "Is There Anything I Cannot Ship?",
    a: "To keep everyone safe and follow international laws, we cannot ship hazardous chemicals, currency, precious stones, or illegal items. If you aren't sure about an item, just give us a call! We're happy to check for you before you book."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number>(1);

  return (
    <section id="faq" className="max-w-[1700px] w-full mx-auto px-6 mt-6 font-sans">
      <div className="bg-[#eef0f5] rounded-[32px] px-10 md:px-16 lg:px-20 py-14 md:py-20 shadow-sm border border-gray-100">
        
        {/* Badge & Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <div className="border border-orange-300 text-[#ff8a00] bg-transparent rounded-full px-5 py-1.5 text-[11px] font-bold tracking-wide w-fit">
            FAQ
          </div>
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#1c1f2e] tracking-tight mt-1">
            Questions? Glad You Asked
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

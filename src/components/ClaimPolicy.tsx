"use client";
import { useState } from "react";

const TagIcon = ({ active }: { active: boolean }) => (
  <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0 ${active ? "bg-[#fff7ed]" : "bg-[#fff7ed]/60"}`}>
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill={active ? "#ff8a00" : "#ff8a0090"} 
      className="-rotate-45 transform"
    >
      <path d="M21.71 11.29l-9-9C12.53 2.11 12.28 2 12 2H3c-.55 0-1 .45-1 1v9c0 .28.11.53.29.71l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.42zM6 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
  </div>
);

const claimsData = [
  {
    id: "general-1",
    title: "General Claim Provisions",
    subtext: "All Claims For Refunds Or Losses Must Undergo A Formal Investigation Process.",
    panelTitle: "All Claims For Refunds Or Losses Must Undergo A Formal Investigation Process.",
    details: [
      { num: "01", title: "Mandatory Investigation Window", desc: "A minimum of 25 business days is required to process any claim." },
      { num: "02", title: "Settlement Protocol", desc: "Under no circumstances will claims be settled \"on the spot\" or prior to the completion of the formal verification process." },
      { num: "03", title: "Third-Party Dependency", desc: "As an international logistics provider, Manvi International's claim resolution is strictly contingent upon the official investigation reports and confirmation from our global courier partners, including but not limited to DHL, FedEx, and UPS" }
    ]
  },
  {
    id: "rto",
    title: "Return To Origin (RTO) Shipments",
    subtext: "Returned Shipments For Non-Delivery, Incorrect Addresses, Or Refusal Qualify For Refunds.",
    panelTitle: "Returned Shipments For Non-Delivery, Incorrect Addresses, Or Refusal Qualify For Refunds.",
    details: [
      { num: "01", title: "Address Verification", desc: "Shipments returned due to incorrect or incomplete addresses provided by the sender will not be eligible for full refunds." },
      { num: "02", title: "Recipient Refusal", desc: "If a recipient outright refuses delivery, the resulting RTO transit charges will be borne by the shipper account." }
    ]
  },
  {
    id: "lost",
    title: "Claims For Lost, Damaged, Or Destroyed Shipments",
    subtext: "Guidelines For Handling Lost, Damaged, Destroyed, Or Carrier-Delayed Shipments.",
    panelTitle: "Guidelines For Handling Lost, Damaged, Destroyed, Or Carrier-Delayed Shipments.",
    details: [
      { num: "01", title: "Photographic Evidence", desc: "All damage claims require high-resolution photographs of both the damaged contents and the original exterior packaging." },
      { num: "02", title: "Filing Deadline", desc: "Claims for damaged goods must be officially lodged within 48 hours of the delivery timestamp." }
    ]
  },
  {
    id: "general-2",
    title: "General Claim Provisions",
    subtext: "When Manvi International Is Not Responsible",
    panelTitle: "When Manvi International Is Not Responsible",
    details: [
      { num: "01", title: "Force Majeure", desc: "Manvi International is not liable for delays or losses caused by natural disasters, acts of God, or severe weather conditions." },
      { num: "02", title: "Customs Seizures", desc: "We hold no liability for consignments confiscated by international customs authorities due to restricted or prohibited contents." }
    ]
  }
];

export default function ClaimPolicy() {
  const [activeTab, setActiveTab] = useState(claimsData[0].id);

  const currentData = claimsData.find(d => d.id === activeTab) || claimsData[0];

  return (
    <section className="w-full mx-auto px-6 py-10 font-sans max-w-[1700px]">
      <div className="bg-[#eef0f5] rounded-[32px] shadow-sm border border-gray-100 p-10 lg:p-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
        
        {/* Left Column */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 mb-8">
            <div className="border border-orange-300/80 text-[#ff8a00] bg-transparent rounded-full px-4 py-1 text-[12px] font-bold w-fit tracking-wide">
              Comprehensive Policies
            </div>
            <h2 className="text-4xl md:text-[42px] font-extrabold text-[#1c1f2e] tracking-tight leading-tight">
              Our Refund And Loss Claim Policy
            </h2>
            <p className="text-[13px] text-gray-400 font-medium leading-relaxed max-w-[98%] mt-1">
              Manvi International Is Committed To Providing Reliable International Logistics Services. However, In The Event Of Transit Irregularities, The Following Policy Outlines The Formal Procedures, Timelines, And Conditions For The Resolution Of Claims.
            </p>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {claimsData.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <div 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative p-5 lg:p-6 rounded-[24px] cursor-pointer flex items-center gap-5 transition-all duration-300 ${
                    isActive 
                      ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                >
                  <TagIcon active={isActive} />
                  <div className="flex flex-col pr-8">
                    <h3 className={`text-[17px] font-extrabold ${isActive ? "text-[#1c1f2e]" : "text-[#9ca3af]"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-[12.5px] font-medium leading-relaxed mt-1 ${isActive ? "text-[#9ca3af]" : "text-[#d1d5db]"}`}>
                      {item.subtext}
                    </p>
                  </div>
                  
                  {/* Active Orange Bar */}
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[4px] h-[36px] bg-[#ff8a00] rounded-l-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Panel */}
        <div className="bg-[#c26d46] rounded-[32px] p-8 lg:p-12 shadow-[0_10px_40px_-10px_rgba(194,109,70,0.4)] flex flex-col h-full">
          <h3 className="text-white text-[24px] md:text-[26px] font-bold leading-[1.3] tracking-tight">
            {currentData.panelTitle}
          </h3>
          
          <div className="flex flex-col gap-5 mt-10">
            {currentData.details.map((detail, idx) => (
              <div key={idx} className="bg-white rounded-[20px] p-6 lg:p-7 shadow-sm flex flex-col gap-2">
                <span className="text-[#ff8a00] text-[14px] font-extrabold tracking-widest">{detail.num}</span>
                <h4 className="text-[16px] font-extrabold text-[#1c1f2e]">{detail.title}</h4>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed mt-0.5">
                  {detail.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}

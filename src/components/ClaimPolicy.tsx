"use client";
import { useState } from "react";

const TagIcon = ({ active }: { active: boolean }) => (
  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${active ? "bg-[#fff7ed]" : "bg-[#fff7ed]/35"}`}>
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill={active ? "#ff8a00" : "#ff8a0050"} 
      className={`-rotate-45 transform transition-opacity duration-300 ${active ? "opacity-100" : "opacity-40"}`}
    >
      <path d="M21.71 11.29l-9-9C12.53 2.11 12.28 2 12 2H3c-.55 0-1 .45-1 1v9c0 .28.11.53.29.71l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.42zM6 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
  </div>
);

const DiamondIcon = () => (
  <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-2 border-[#ff8a00] flex items-center justify-center shrink-0 bg-white">
    <div className="w-1.5 h-1.5 sm:w-1.75 sm:h-1.75 rotate-45 bg-[#ff8a00]" />
  </div>
);

interface SubItem {
  label: string;
  text: string;
}

interface ClaimDetail {
  num: string;
  title: string;
  desc?: string;
  subItems?: SubItem[];
}

interface ClaimData {
  id: string;
  title: string;
  subtext: string;
  panelTitle: string;
  details: ClaimDetail[];
}

const claimsData: ClaimData[] = [
  {
    id: "general-1",
    title: "General Claim Provisions",
    subtext: "All Claims For Refunds Or Losses Must Undergo A Formal Investigation Process.",
    panelTitle: "All Claims For Refunds Or Losses Must Undergo A Formal Investigation Process.",
    details: [
      {
        num: "01",
        title: "Mandatory Investigation Window",
        desc: "A minimum of 25 business days is required to process any claim."
      },
      {
        num: "02",
        title: "Settlement Protocol",
        desc: "Under no circumstances will claims be settled \"on the spot\" or prior to the completion of the formal verification process."
      },
      {
        num: "03",
        title: "Third-Party Dependency",
        desc: "As an international logistics provider, Manvi International's claim resolution is strictly contingent upon the official investigation reports and confirmation from our global courier partners, including but not limited to <strong class=\"font-extrabold text-[#1c1f2e]\">DHL, FedEx, and UPS</strong>"
      }
    ]
  },
  {
    id: "rto",
    title: "Return To Origin (RTO) Shipments",
    subtext: "Returned Shipments For Non-Delivery, Incorrect Addresses, Or Refusal Qualify For Refunds.",
    panelTitle: "Shipments That Are Returned To The Point Of Origin Due To Non-Delivery, Incorrect Address, Or Receiver Refusal Are Eligible For A Streamlined Refund Process.",
    details: [
      {
        num: "01",
        title: "Processing Timeline",
        desc: "Refunds for RTO shipments will be initiated within <strong class=\"font-extrabold text-[#1c1f2e]\">2 to 3 working days</strong>"
      },
      {
        num: "02",
        title: "Verification Requirement",
        desc: "The processing window commences only after the physical receipt and successful verification of the shipment at our facility."
      },
      {
        num: "03",
        title: "Condition",
        desc: "The shipment must be intact and meet the criteria for a return-based refund as per the initial service agreement."
      }
    ]
  },
  {
    id: "lost",
    title: "Claims For Lost, Damaged, Or Destroyed Shipments",
    subtext: "Guidelines For Handling Lost, Damaged, Destroyed, Or Carrier-Delayed Shipments.",
    panelTitle: "In The Event Of A Shipment Being Lost, Damaged, Destroyed, Or Significantly Delayed Due To Carrier-Related Issues, The Following Protocols Apply:",
    details: [
      {
        num: "01",
        title: "Investigation Timeline",
        subItems: [
          {
            label: "Standard Processing Window",
            text: "A minimum of <strong class=\"font-extrabold text-[#1c1f2e]\">25 business days</strong> is required to initiate and investigate the claim."
          },
          {
            label: "Extended Resolution Window",
            text: "Depending on the complexity of the international route and carrier responsiveness, the resolution period may extend up to <strong class=\"font-extrabold text-[#1c1f2e]\">40 business days</strong>."
          },
          {
            label: "Carrier Standards",
            text: "Please be advised that international carriers (DHL, FedEx, UPS) maintain an internal standard claim processing cycle of up to <strong class=\"font-extrabold text-[#1c1f2e]\">45 days</strong>. Manvi International acts as the liaison between the customer and these carriers and must adhere to their global investigative timelines."
          }
        ]
      },
      {
        num: "02",
        title: "Documentation & Evidence",
        desc: "For a claim to be considered valid, the claimant must provide:",
        subItems: [
          {
            label: "Proof of Value",
            text: "Original invoices or receipts for the contents."
          },
          {
            label: "Damage Evidence",
            text: "Photographic or video evidence of the damaged packaging and contents (in cases of damage/destruction)."
          },
          {
            label: "Communication Logs",
            text: "Any correspondence with the local delivery branch at the destination."
          }
        ]
      }
    ]
  },
  {
    id: "general-2",
    title: "General Claim Provisions",
    subtext: "When Manvi International Is Not Responsible",
    panelTitle: "In Some Cases, Delays Or Losses May Occur Due To Factors Outside Our Control. These Conditions Are Explained Below.",
    details: [
      {
        num: "01",
        title: "Force Majeure",
        desc: "Manvi International is not liable for delays or losses caused by circumstances beyond our control, including but not limited to customs seizures, weather disruptions, or political instability."
      },
      {
        num: "02",
        title: "Carrier Confirmation",
        desc: "No claim for loss or destruction will be approved until the respective carrier (DHL, FedEx, or UPS) officially declares the shipment as \"Lost\" or \"Damaged\" in their global tracking system."
      }
    ]
  }
];

export default function ClaimPolicy() {
  const [activeTab, setActiveTab] = useState(claimsData[0].id);

  const currentData = claimsData.find(d => d.id === activeTab) || claimsData[0];

  return (
    <section className="w-full mx-auto px-4 sm:px-6 py-10 font-sans max-w-425">
      <div className="bg-[#eef0f5] rounded-4xl shadow-sm border border-gray-100 p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 mb-8">
              <div className="border border-orange-300/80 text-[#ff8a00] bg-transparent rounded-full px-4 py-1 text-[12px] font-bold w-fit tracking-wide">
                Comprehensive Policies
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#1c1f2e] tracking-tight leading-tight">
                Our Refund And Loss Claim Policy
              </h2>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-[98%] mt-1">
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
                    className={`relative p-4 sm:p-5 lg:p-6 rounded-3xl cursor-pointer flex items-center gap-4 sm:gap-5 transition-all duration-300 ${
                      isActive 
                        ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  >
                    <TagIcon active={isActive} />
                    <div className="flex flex-col pr-6 sm:pr-8">
                      <h3 className={`text-[15px] sm:text-[17px] font-extrabold transition-colors duration-300 ${isActive ? "text-[#1c1f2e]" : "text-[#9ca3af]"}`}>
                        {item.title}
                      </h3>
                      <p className={`text-[11.5px] sm:text-[12.5px] font-medium leading-relaxed mt-1 transition-colors duration-300 ${isActive ? "text-[#9ca3af]" : "text-[#d1d5db]"}`}>
                        {item.subtext}
                      </p>
                    </div>
                    
                    {/* Active Orange Bar */}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.25 h-7.5 sm:h-9 bg-[#ff8a00] rounded-l-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Panel */}
          <div className="bg-[#c26d46] rounded-4xl p-6 sm:p-8 lg:p-12 shadow-[0_10px_40px_-10px_rgba(194,109,70,0.4)] flex flex-col h-full justify-between mt-6 lg:mt-0">
            <div>
              <h3 className="text-white text-[22px] sm:text-[24px] md:text-[26px] font-bold leading-[1.3] tracking-tight">
                {currentData.panelTitle}
              </h3>
              
              <div className="flex flex-col gap-4 sm:gap-5 mt-8 sm:mt-10">
                {currentData.details.map((detail, idx) => (
                  <div key={idx} className="bg-white rounded-[20px] sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-3">
                    <span className="text-[#ff8a00] text-[12px] sm:text-[13px] font-extrabold tracking-wider">{detail.num}</span>
                    <h4 className="text-[15px] sm:text-[17px] font-extrabold text-[#1c1f2e]">{detail.title}</h4>
                    
                    {detail.desc && (
                      <p 
                        className="text-[12px] sm:text-[13px] text-gray-500 font-medium leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: detail.desc }}
                      />
                    )}

                    {detail.subItems && (
                      <div className="flex flex-col gap-4 mt-2">
                        {detail.subItems.map((sub, sIdx) => (
                          <div key={sIdx} className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-start gap-2 md:gap-4">
                            <div className="flex items-center gap-2 sm:gap-3 text-[#1c1f2e] text-[12px] sm:text-[13px] font-extrabold tracking-tight shrink-0">
                              <DiamondIcon />
                              <span>{sub.label}</span>
                            </div>
                            <p 
                              className="text-[12px] sm:text-[13px] text-gray-500 font-medium leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: sub.text }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

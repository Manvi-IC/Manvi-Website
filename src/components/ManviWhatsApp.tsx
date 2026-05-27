"use client";

import { useState } from "react";

const WhatsAppIcon = ({ width = 16, height = 16, fill = "currentColor", className = "" }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill={fill} 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ManviWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const handleStartChat = () => {
    window.open("https://wa.me/917070506070?text=Hi!%20I%20have%20a%20query%20about%20your%20services.", "_blank");
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact on WhatsApp"
        className="fixed bottom-6 left-6 z-50 w-[56px] h-[56px] rounded-full bg-black shadow-[0_6px_24px_rgba(0,0,0,0.3)] border-none cursor-pointer flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <WhatsAppIcon width={26} height={26} fill="white" />
        {/* Active Online green dot */}
        <span className="absolute top-0 right-0 w-[12px] h-[12px] rounded-full bg-[#4ade80] border-2 border-white" />
      </button>

      {/* WhatsApp chat popup card */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-6 z-50 w-[330px] rounded-[24px] p-4 flex flex-col gap-4 bg-white shadow-[0_12px_48px_rgba(0,0,0,0.15)] font-sans border border-slate-100"
          style={{
            animation: "whatsAppPop 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Brand Avatar Icon */}
              <div className="w-[36px] h-[36px] rounded-full bg-[#fff7ed] flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transform -rotate-45">
                  <path d="M21.71 11.29l-9-9C12.53 2.11 12.28 2 12 2H3c-.55 0-1 .45-1 1v9c0 .28.11.53.29.71l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.42zM6 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#ff8a00" />
                </svg>
              </div>
              <span className="font-extrabold text-[#1c1f2e] text-[15px] tracking-tight">
                Customer Care Team
              </span>
            </div>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close panel"
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-50"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Chat Body Card */}
          <div className="bg-[#f0ece7] rounded-[20px] p-4 flex flex-col shadow-inner">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">
              Customer Care Team
            </span>
            <div className="bg-white rounded-[14px] p-3.5 shadow-sm text-[#1c1f2e] text-[13px] font-medium leading-relaxed max-w-[92%]">
              Hi there !!
              <br />
              How can we help you today?
            </div>
          </div>

          {/* Start Whatsapp Chat Action Button */}
          <button
            onClick={handleStartChat}
            className="w-full bg-black hover:bg-neutral-800 text-white font-bold text-[14px] py-3.5 px-4 rounded-full flex items-center justify-center gap-2.5 shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <WhatsAppIcon width={18} height={18} fill="white" />
            <span>Start Whatsapp Chat</span>
          </button>
        </div>
      )}

      <style>{`
        @keyframes whatsAppPop {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </>
  );
}

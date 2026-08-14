"use client";

import React, { useState, useEffect } from "react";
import { ListOrdered, ChevronRight, ChevronDown, Phone, Mail } from "lucide-react";

export interface PolicySidebarItem {
  id: string;
  label: string;
  num?: string | number;
}

export interface PolicySidebarProps {
  title?: string;
  items: PolicySidebarItem[];
  supportWidget?: {
    title: string;
    description: string;
    type: "phone" | "email";
    contactText: string;
    contactHref: string;
  };
}

export default function PolicySidebar({
  title = "Table of Contents",
  items,
  supportWidget,
}: PolicySidebarProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -65% 0px",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [items]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    setIsMobileOpen(false); // Auto close mobile dropdown on select
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for fixed header on mobile/desktop
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const activeItem = items.find((item) => item.id === activeId) || items[0];

  return (
    <aside className="lg:col-span-4 flex flex-col gap-6">
      {/* MOBILE ACCORDION (< lg) */}
      <div className="block lg:hidden bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-2">
        <div className="h-1 bg-gradient-to-r from-orange-500 via-[#f27a1a] to-amber-400" />
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full bg-slate-900 p-4 text-white flex items-center justify-between transition-colors hover:bg-slate-800 focus:outline-none"
        >
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-[#f27a1a]/20 border border-[#f27a1a]/40 flex items-center justify-center text-[#f27a1a] shrink-0">
              <ListOrdered className="w-4 h-4" />
            </div>
            <div className="text-left truncate">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#f27a1a] block leading-none mb-1">
                Table of Contents ({items.length} Sections)
              </span>
              <div className="text-sm font-semibold text-white truncate leading-snug">
                {activeItem ? activeItem.label : title}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 font-semibold">
              {isMobileOpen ? "Hide" : "Jump"}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#f27a1a] transition-transform duration-200 ${isMobileOpen ? "rotate-180" : ""
                }`}
            />
          </div>
        </button>

        {isMobileOpen && (
          <div className="p-3 bg-slate-50 border-t border-slate-200/80 max-h-[60vh] overflow-y-auto custom-scrollbar flex flex-col gap-1 text-sm">
            {items.map((item, idx) => {
              const isActive = activeId === item.id;
              const displayNum = item.num || idx + 1;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 ${isActive
                      ? "bg-gradient-to-r from-[#f27a1a] to-orange-600 text-white font-semibold shadow-md shadow-orange-500/20"
                      : "text-slate-700 font-medium hover:text-slate-900 hover:bg-orange-50/80"
                    }`}
                >
                  <span className="flex items-center gap-3 pr-2 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-700"
                        }`}
                    >
                      {displayNum}
                    </span>
                    <span className="truncate text-[13px]">{item.label}</span>
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"
                      }`}
                  />
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* DESKTOP SIDEBAR (lg:block) */}
      <div className="hidden lg:block bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(15,23,42,0.06)] overflow-hidden sticky top-[110px]">
        {/* Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-orange-500 via-[#f27a1a] to-amber-400" />

        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 text-white flex items-center justify-between border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f27a1a]/20 border border-[#f27a1a]/40 flex items-center justify-center text-[#f27a1a] shadow-inner">
              <ListOrdered className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#f27a1a] block leading-none mb-1">
                Quick Navigation
              </span>
              <h3 className="text-base font-bold text-white leading-none">
                {title}
              </h3>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-semibold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
            {items.length} Sections
          </span>
        </div>

        {/* Navigation items list */}
        <nav className="p-3 flex flex-col gap-1 text-sm bg-slate-50/50 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
          {items.map((item, idx) => {
            const isActive = activeId === item.id;
            const displayNum = item.num || idx + 1;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 ${isActive
                    ? "bg-gradient-to-r from-[#f27a1a] to-orange-600 text-white font-semibold shadow-md shadow-orange-500/20"
                    : "text-slate-600 font-medium hover:text-slate-900 hover:bg-orange-50/80"
                  }`}
              >
                <span className="flex items-center gap-3 pr-2 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-600 group-hover:bg-[#f27a1a] group-hover:text-white"
                      }`}
                  >
                    {displayNum}
                  </span>
                  <span className="truncate text-[13px]">{item.label}</span>
                </span>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isActive
                      ? "text-white translate-x-0.5"
                      : "text-slate-400 group-hover:text-[#f27a1a] group-hover:translate-x-0.5"
                    }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Optional Support Box inside Sidebar */}
        {supportWidget && (
          <div className="p-5 border-t border-slate-200/80 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/50">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-1">
              {supportWidget.title}
            </h4>
            <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
              {supportWidget.description}
            </p>
            <a
              href={supportWidget.contactHref}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-[#f27a1a] to-orange-600 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-[#f27a1a] transition-all duration-200"
            >
              {supportWidget.type === "phone" ? (
                <Phone className="w-3.5 h-3.5" />
              ) : (
                <Mail className="w-3.5 h-3.5" />
              )}
              {supportWidget.contactText}
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}

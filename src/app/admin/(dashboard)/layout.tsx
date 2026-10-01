// app/admin/layout.tsx
"use client";

import { logoutAction } from "../actions";
import {
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Briefcase,
  FileText,
  MessageSquareQuote,
  MapPinned,
  Mail,
  Layers,
  ShieldCheck,
  Store,
  Users,
  Calculator,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_PUBLIC_URL ||
  process.env.NEXT_API_URL ||
  "http://localhost:5000";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);
  const [newEnquiryCount, setNewEnquiryCount] = useState(0);
  const [pendingShopkeepers, setPendingShopkeepers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Restore collapsed state preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("manvi_admin_sidebar_collapsed");
      if (saved === "true") {
        setIsCollapsed(true);
      }
    } catch {
      // Ignore in private browsing
    }
  }, []);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("manvi_admin_sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;

    const fetchCounts = async () => {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          "x-database": "manvi",
        };

        const [appRes, enquiryRes, shopRes] = await Promise.all([
          fetch(`${API_URL}/admin/applications/stats`, { headers }).catch(
            () => null,
          ),
          fetch(`${API_URL}/admin/quote-enquiries/stats`, { headers }).catch(
            () => null,
          ),
          fetch(`${API_URL}/admin/shopkeepers/stats`, { headers }).catch(
            () => null,
          ),
        ]);

        if (!isMounted) return;

        if (appRes?.ok) {
          try {
            const data = await appRes.json();
            if (data?.success) setPendingCount(data.data?.pending || 0);
          } catch {}
        }

        if (enquiryRes?.ok) {
          try {
            const data = await enquiryRes.json();
            if (data?.success) setNewEnquiryCount(data.data?.new || 0);
          } catch {}
        }

        if (shopRes?.ok) {
          try {
            const data = await shopRes.json();
            if (data?.success) setPendingShopkeepers(data.data?.pending || 0);
          } catch {}
        }
      } catch {
        // Silently ignore network interruptions
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navLink = (
    href: string,
    icon: React.ReactNode,
    label: string,
    badge?: number,
  ) => {
    const active =
      href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

    if (isCollapsed) {
      return (
        <Link
          href={href}
          title={label}
          className={`relative flex items-center justify-center w-11 h-11 mx-auto rounded-xl transition-all duration-150 group ${
            active
              ? "bg-[#f27a1a]/15 text-[#f27a1a] shadow-xs"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <span className="shrink-0">{icon}</span>
          {!loading && badge !== undefined && badge > 0 && (
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f27a1a] ring-2 ring-[#090D1A]"
              title={`${badge} pending`}
            />
          )}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 group ${
          active
            ? "bg-[#f27a1a]/15 text-[#f27a1a] font-semibold shadow-2xs"
            : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 font-normal"
        }`}
      >
        <span
          className={`shrink-0 transition-colors ${
            active ? "text-[#f27a1a]" : "text-slate-400 group-hover:text-slate-200"
          }`}
        >
          {icon}
        </span>
        <span className="text-[13px] tracking-tight whitespace-nowrap overflow-hidden text-ellipsis flex-1">
          {label}
        </span>
        {!loading && badge !== undefined && badge > 0 && (
          <span className="ml-auto bg-[#f27a1a]/20 text-[#f27a1a] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#f27a1a]/30 shrink-0">
            {badge}
          </span>
        )}
      </Link>
    );
  };

  const navContent = (
    <>
      {/* Sidebar Header */}
      <div
        className={`h-16 flex items-center border-b border-slate-800/60 px-4 shrink-0 transition-all ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/logo.png"
              alt="Manvi"
              className="h-6 w-auto object-contain shrink-0"
            />
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-extrabold text-white text-[15px] tracking-tight leading-none">
                Manvi
              </span>
              <span className="text-[9.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-500/10 text-[#f27a1a] border border-[#f27a1a]/20 leading-none">
                Admin
              </span>
            </div>
          </div>
        )}

        {/* Desktop Collapse / Expand Toggle Button */}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="hidden md:flex items-center justify-center p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Links (Spacious, Single-Line, No Wrapping) */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {navLink("/admin", <LayoutDashboard size={18} />, "Dashboard")}
        {navLink(
          "/admin/proposal",
          <Calculator size={18} />,
          "Courier Proposal",
        )}
        {navLink(
          "/admin/services",
          <Layers size={18} />,
          "Courier Services",
        )}
        {navLink(
          "/admin/upload-rates",
          <Package size={18} />,
          "Upload Rates",
        )}
        {navLink(
          "/admin/shopkeeper-rates",
          <Store size={18} />,
          "Upload Bulk Rates",
        )}
        {navLink(
          "/admin/shopkeepers",
          <Users size={18} />,
          "Shopkeepers",
          pendingShopkeepers,
        )}
        {navLink(
          "/admin/service-mapping",
          <Settings size={18} />,
          "Serviceable Zipcode Mapping",
        )}
        {navLink("/admin/jobs", <Briefcase size={18} />, "Jobs")}
        {navLink(
          "/admin/applications",
          <FileText size={18} />,
          "Applications",
          pendingCount,
        )}
        {navLink(
          "/admin/quote-enquiries",
          <MessageSquareQuote size={18} />,
          "Quote Enquiries",
          newEnquiryCount,
        )}
        {navLink(
          "/admin/site-settings",
          <Settings size={18} />,
          "Site Settings",
        )}
        {navLink("/admin/blog", <FileText size={18} />, "Blogs")}
        {navLink("/admin/newsletter", <Mail size={18} />, "Newsletter")}
        {navLink(
          "/admin/settings",
          <Settings size={18} />,
          "Profile Settings",
        )}
        {navLink(
          "/admin/settings/credentials",
          <ShieldCheck size={18} />,
          "Admin Credentials",
        )}
        {navLink(
          "/admin/service-areas",
          <MapPinned size={18} />,
          "Pickup & Dropoff Areas",
        )}
      </nav>

      {/* Sidebar Footer / User & Logout */}
      <div className="p-3 border-t border-slate-800/60 shrink-0 bg-[#070A14]">
        {isCollapsed ? (
          <form action={logoutAction} className="flex justify-center">
            <button
              type="submit"
              title="Logout"
              className="p-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <LogOut size={18} />
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <div className="flex flex-col min-w-0 leading-tight">
                <span className="text-[12px] font-semibold text-slate-200 truncate">
                  Admin Panel
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  Authorized Session
                </span>
              </div>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                title="Sign out of Admin Panel"
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white print:min-h-0 print:block flex">
      {/* ── DESKTOP COLLAPSIBLE SIDEBAR (WIDER 285PX / 74PX COLLAPSED) ── */}
      <aside
        className={`hidden md:flex flex-col bg-[#090D1A] text-slate-300 border-r border-slate-800/70 shrink-0 print:hidden transition-[width] duration-300 ease-in-out z-30 select-none ${
          isCollapsed ? "w-[74px]" : "w-[285px]"
        }`}
      >
        {navContent}
      </aside>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* ── MOBILE SLIDEOUT DRAWER ── */}
      <aside
        className={`fixed inset-y-0 left-0 w-[285px] bg-[#090D1A] text-slate-300 z-50 flex flex-col md:hidden transition-transform duration-300 ease-in-out shadow-2xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible print:bg-white print:block min-w-0">
        {/* Mobile Top Header (Hidden in Print) */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:hidden print:hidden shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-1.5 -ml-1 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Manvi" className="h-5 w-auto" />
              <span className="font-bold text-base text-slate-900">
                Manvi Admin
              </span>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </form>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 print:p-0 print:overflow-visible print:bg-white print:block">
          {children}
        </div>
      </main>
    </div>
  );
}
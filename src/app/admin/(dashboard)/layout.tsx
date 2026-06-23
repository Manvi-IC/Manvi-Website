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
  MessageSquareQuote, // ← new icon for Quote Enquiries
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);
  const [newEnquiryCount, setNewEnquiryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [appRes, enquiryRes] = await Promise.all([
          fetch(`${API_URL}/admin/applications/stats`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }),
          fetch(`${API_URL}/admin/quote-enquiries/stats`),
        ]);

        if (appRes.ok) {
          const data = await appRes.json();
          if (data.success) setPendingCount(data.data.pending || 0);
        }

        if (enquiryRes.ok) {
          const data = await enquiryRes.json();
          if (data.success) setNewEnquiryCount(data.data.new || 0);
        }
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLink = (
    href: string,
    icon: React.ReactNode,
    label: string,
    badge?: number,
  ) => {
    const active =
      href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          active
            ? "bg-slate-800 text-[#f27a1a] font-medium"
            : "hover:bg-slate-800 text-slate-400 hover:text-slate-100"
        }`}
      >
        {icon}
        {label}
        {!loading && badge !== undefined && badge > 0 && (
          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center animate-pulse">
            {badge}
          </span>
        )}
        {!loading && badge !== undefined && badge === 0 && (
          <span className="ml-auto text-xs px-2 py-0.5 text-gray-400">0</span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1527] text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 bg-[#050914] font-bold text-xl tracking-wider">
          Manvi Admin Panel
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLink("/admin", <LayoutDashboard size={20} />, "Dashboard")}
          {navLink(
            "/admin/upload-rates",
            <Package size={20} />,
            "Upload Rates",
          )}
          {navLink(
            "/admin/service-mapping",
            <Settings size={20} />,
            "Serviceable Zipcode Mapping",
          )}
          {navLink("/admin/jobs", <Briefcase size={20} />, "Jobs")}
          {navLink(
            "/admin/applications",
            <FileText size={20} />,
            "Applications",
            pendingCount,
          )}

          {/* ← NEW: Quote Enquiries link */}
          {navLink(
            "/admin/quote-enquiries",
            <MessageSquareQuote size={20} />,
            "Quote Enquiries",
            newEnquiryCount,
          )}

          {navLink(
            "/admin/site-settings",
            <Settings size={20} />,
            "Site Settings",
          )}
          {navLink("/admin/blog", <FileText size={20} />, "Blogs")}
          {navLink(
            "/admin/settings",
            <Settings size={20} />,
            "Profile Settings",
          )}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-red-900/50 text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:hidden">
          <div className="font-bold text-lg text-slate-900">M5C ADMIN</div>
          <form action={logoutAction}>
            <button type="submit" className="text-gray-500 hover:text-red-600">
              <LogOut size={24} />
            </button>
          </form>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

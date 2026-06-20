// app/admin/layout.tsx (FIXED)
"use client";

import { logoutAction } from '../actions';
import {
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Briefcase,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Make sure API_URL is defined
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        console.log(`📊 Fetching pending count from: ${API_URL}/admin/applications/stats`);
        const res = await fetch(`${API_URL}/admin/applications/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add this if you need credentials
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('📊 Pending count response:', data);

        if (data.success) {
          setPendingCount(data.data.pending || 0);
        }
      } catch (error) {
        console.error("Failed to fetch pending count:", error);
        // Don't set pending count on error - keep it at 0
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCount();

    // Optional: Refresh count every 30 seconds
    const interval = setInterval(fetchPendingCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1527] text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 bg-[#050914] font-bold text-xl tracking-wider">
          Manvi Admin Panel
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-800 text-slate-100">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/upload-rates" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Package size={20} />
            Upload Rates
          </Link>
          <Link href="/admin/service-mapping" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Settings size={20} />
            Serviceable Zipcode Mapping
          </Link>
          <Link href="/admin/jobs" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Briefcase size={20} />
            Jobs
          </Link>
          <Link href="/admin/applications" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <FileText size={20} />
            Applications
            {!loading && pendingCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center animate-pulse">
                {pendingCount}
              </span>
            )}
            {!loading && pendingCount === 0 && (
              <span className="ml-auto text-xs px-2 py-0.5 text-gray-400">
                0
              </span>
            )}
          </Link>
          <Link href="/admin/site-settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Settings size={20} />
            Site Settings
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <FileText size={20} />
            Blogs
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Settings size={20} />
            Profile Settings
          </Link>
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
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
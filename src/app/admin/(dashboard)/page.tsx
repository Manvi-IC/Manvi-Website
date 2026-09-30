"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Store,
  Users,
  MessageSquareQuote,
  FileText,
  MapPinned,
  Ship,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  RefreshCw,
  Activity,
  Sparkles,
} from "lucide-react";

const API_URL = process.env.NEXT_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

const headers = { "x-database": DB_NAME };

type Stat = {
  key: string;
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ReactNode;
  accent: string;
  bg: string;
  href: string;
  trend?: "up" | "down" | "neutral";
  badge?: number;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Quote enquiries
  const [eq, setEq] = useState({ total: 0, new: 0, contacted: 0, converted: 0, closed: 0 });
  // Applications
  const [apps, setApps] = useState({ total: 0, pending: 0, reviewed: 0, shortlisted: 0, rejected: 0 });
  // Shopkeepers
  const [sk, setSk] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  // Customers
  const [cust, setCust] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  // Service areas
  const [areas, setAreas] = useState({ total: 0, active: 0, pickupOnly: 0, dropoffOnly: 0, both: 0 });
  // Shipments
  const [ship, setShip] = useState({ total: 0, booked: 0, hold: 0, delivered: 0 });
  // Rate coverage
  const [rates, setRates] = useState({ services: 0, slabs: 0, zipServices: 0 });
  // Bulk rates
  const [bulk, setBulk] = useState({ services: 0, slabs: 0, zipServices: 0 });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [
        eqRes, appsRes, skRes, custRes, areasRes, shipRes, ratesRes, bulkRes,
      ] = await Promise.all([
        fetch(`${API_URL}/admin/quote-enquiries/stats`, { headers }).catch(() => null),
        fetch(`${API_URL}/admin/applications/stats`, { headers }).catch(() => null),
        fetch(`${API_URL}/admin/shopkeepers/stats`, { headers }).catch(() => null),
        fetch(`${API_URL}/admin/customers/stats`, { headers }).catch(() => null),
        fetch(`${API_URL}/admin/service-areas/stats`, { headers }).catch(() => null),
        fetch(`${API_URL}/admin/shipments/stats/summary`, { headers }).catch(() => null),
        fetch(`${API_URL}/rates/services`, { headers }).catch(() => null),
        fetch(`${API_URL}/shopkeeper/rates/services`, { headers }).catch(() => null),
      ]);

      if (eqRes?.ok) {
        const d = await eqRes.json();
        if (d.success) setEq(d.data);
      }
      if (appsRes?.ok) {
        const d = await appsRes.json();
        if (d.success) setApps(d.data);
      }
      if (skRes?.ok) {
        const d = await skRes.json();
        if (d.success) setSk(d.data);
      }
      if (custRes?.ok) {
        const d = await custRes.json();
        if (d.success) setCust(d.data);
      }
      if (areasRes?.ok) {
        const d = await areasRes.json();
        if (d.success) setAreas(d.data);
      }
      if (shipRes?.ok) {
        const d = await shipRes.json();
        if (d.success) setShip(d.data);
      }
      if (ratesRes?.ok) {
        const d = await ratesRes.json();
        if (d.success) {
          const list = d.data.rateServices || [];
          setRates({
            services: list.length,
            slabs: list.reduce((s: number, r: any) => s + (r.slabs || 0), 0),
            zipServices: (d.data.zipcodeServices || []).length,
          });
        }
      }
      if (bulkRes?.ok) {
        const d = await bulkRes.json();
        if (d.success) {
          const list = d.data.rateServices || [];
          setBulk({
            services: list.length,
            slabs: list.reduce((s: number, r: any) => s + (r.slabs || 0), 0),
            zipServices: (d.data.zipcodeServices || []).length,
          });
        }
      }

      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const t = setInterval(fetchAll, 60000);
    return () => clearInterval(t);
  }, []);

  const primaryStats: Stat[] = [
    {
      key: "enquiries",
      label: "Quote Enquiries",
      value: eq.total,
      sub: `${eq.new} new · ${eq.converted} converted`,
      icon: <MessageSquareQuote size={22} />,
      accent: "text-[#f27a1a]",
      bg: "bg-orange-50",
      href: "/admin/quote-enquiries",
      badge: eq.new,
      trend: "up",
    },
    {
      key: "shipments",
      label: "Shipments",
      value: ship.total,
      sub: `${ship.booked} booked · ${ship.delivered} delivered`,
      icon: <Ship size={22} />,
      accent: "text-blue-600",
      bg: "bg-blue-50",
      href: "/admin/shipments",
      trend: "up",
    },
    {
      key: "shopkeepers",
      label: "Shopkeepers",
      value: sk.total,
      sub: `${sk.approved} approved · ${sk.pending} pending`,
      icon: <Store size={22} />,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
      href: "/admin/shopkeepers",
      badge: sk.pending,
      trend: "up",
    },
    {
      key: "customers",
      label: "Portal Customers",
      value: cust.total,
      sub: `${cust.approved} approved · ${cust.pending} pending`,
      icon: <Users size={22} />,
      accent: "text-violet-600",
      bg: "bg-violet-50",
      href: "/admin/customers",
      badge: cust.pending,
      trend: "up",
    },
  ];

  const secondaryStats: Stat[] = [
    {
      key: "apps",
      label: "Job Applications",
      value: apps.total,
      sub: `${apps.pending} awaiting review`,
      icon: <FileText size={20} />,
      accent: "text-sky-600",
      bg: "bg-sky-50",
      href: "/admin/applications",
      badge: apps.pending,
    },
    {
      key: "areas",
      label: "Serviceable Areas",
      value: areas.total,
      sub: `${areas.active} active`,
      icon: <MapPinned size={20} />,
      accent: "text-rose-600",
      bg: "bg-rose-50",
      href: "/admin/service-areas",
    },
    {
      key: "rates",
      label: "Walk-in Rate Sheets",
      value: rates.services,
      sub: `${rates.slabs} slabs · ${rates.zipServices} zip services`,
      icon: <Package size={20} />,
      accent: "text-amber-600",
      bg: "bg-amber-50",
      href: "/admin/upload-rates",
    },
    {
      key: "bulk",
      label: "Bulk Rate Sheets",
      value: bulk.services,
      sub: `${bulk.slabs} slabs · ${bulk.zipServices} zip services`,
      icon: <Store size={20} />,
      accent: "text-[#f27a1a]",
      bg: "bg-orange-50",
      href: "/admin/shopkeeper-rates",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0D1527] text-white px-6 py-7 sm:px-8 sm:py-8">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#f27a1a]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-[#f27a1a]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex flex-col gap-2 min-w-0">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#f27a1a]">
              <Sparkles size={12} strokeWidth={2.5} />
              Admin Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Welcome back to <span className="text-[#f27a1a]">Manvi Admin</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Live overview of enquiries, shipments, shopkeepers and rate coverage
              across the entire platform.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex flex-col items-end gap-0.5 text-right">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                Last updated
              </p>
              <p className="text-slate-300 text-[12px] font-semibold">
                {lastUpdated ? lastUpdated.toLocaleTimeString("en-IN") : "—"}
              </p>
            </div>
            <button
              onClick={fetchAll}
              disabled={loading}
              className="inline-flex items-center gap-2 text-[12px] font-bold text-white/90 hover:text-white border border-white/20 hover:border-white/50 rounded-full px-4 py-2 transition-all disabled:opacity-60"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ── Primary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {primaryStats.map((s) => (
          <StatCard key={s.key} stat={s} loading={loading} primary />
        ))}
      </div>

      {/* ── Quick Actions + Secondary Stats ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick actions */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <Activity size={16} className="text-[#f27a1a]" strokeWidth={2.5} />
            </div>
            <h2 className="text-sm font-bold text-gray-900">Quick Actions</h2>
          </div>

          <div className="flex flex-col gap-2.5 flex-1">
            {[
              { href: "/admin/upload-rates", label: "Upload Walk-in Rates", icon: <Package size={15} /> },
              { href: "/admin/shopkeeper-rates", label: "Upload Bulk Rates", icon: <Store size={15} /> },
              { href: "/admin/quote-enquiries", label: "Review Enquiries", icon: <MessageSquareQuote size={15} />, badge: eq.new },
              { href: "/admin/shopkeepers", label: "Manage Shopkeepers", icon: <Users size={15} />, badge: sk.pending },
              { href: "/admin/applications", label: "Review Applications", icon: <FileText size={15} />, badge: apps.pending },
              { href: "/admin/service-areas", label: "Serviceable Areas", icon: <MapPinned size={15} /> },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-gray-100 hover:border-[#f27a1a]/40 hover:bg-orange-50/40 transition-all"
              >
                <span className="h-8 w-8 rounded-lg bg-gray-50 group-hover:bg-[#f27a1a] group-hover:text-white flex items-center justify-center text-gray-500 transition-all">
                  {a.icon}
                </span>
                <span className="text-[13px] font-semibold text-gray-700 group-hover:text-gray-900 flex-1">
                  {a.label}
                </span>
                {a.badge !== undefined && a.badge > 0 && (
                  <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {a.badge}
                  </span>
                )}
                <ArrowUpRight
                  size={14}
                  className="text-gray-300 group-hover:text-[#f27a1a] transition-all"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Secondary stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {secondaryStats.map((s) => (
            <StatCard key={s.key} stat={s} loading={loading} />
          ))}
        </div>
      </div>

      {/* ── Pipeline Overview ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Enquiries pipeline */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <MessageSquareQuote size={16} className="text-[#f27a1a]" strokeWidth={2.5} />
              </div>
              <h2 className="text-sm font-bold text-gray-900">
                Enquiry Pipeline
              </h2>
            </div>
            <Link
              href="/admin/quote-enquiries"
              className="text-[11px] font-bold text-[#f27a1a] hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "New", value: eq.new, color: "text-orange-600", bg: "bg-orange-50" },
              { label: "Contacted", value: eq.contacted, color: "text-sky-600", bg: "bg-sky-50" },
              { label: "Converted", value: eq.converted, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Closed", value: eq.closed, color: "text-slate-600", bg: "bg-slate-50" },
            ].map((p) => (
              <div key={p.label} className={`${p.bg} rounded-xl p-3 text-center`}>
                <p className={`text-xl font-extrabold ${p.color}`}>{p.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-0.5">
                  {p.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shopkeeper pipeline */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Store size={16} className="text-emerald-600" strokeWidth={2.5} />
              </div>
              <h2 className="text-sm font-bold text-gray-900">
                Shopkeeper Accounts
              </h2>
            </div>
            <Link
              href="/admin/shopkeepers"
              className="text-[11px] font-bold text-[#f27a1a] hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Total", value: sk.total, color: "text-slate-700", bg: "bg-slate-50" },
              { label: "Pending", value: sk.pending, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Approved", value: sk.approved, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Rejected", value: sk.rejected, color: "text-red-600", bg: "bg-red-50" },
            ].map((p) => (
              <div key={p.label} className={`${p.bg} rounded-xl p-3 text-center`}>
                <p className={`text-xl font-extrabold ${p.color}`}>{p.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-0.5">
                  {p.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer hint ── */}
      <p className="text-center text-[11px] text-gray-400 pt-2">
        Data refreshes automatically every 60 seconds · Manvi Admin Panel
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/* Stat Card Component                             */
/* ────────────────────────────────────────────── */
function StatCard({
  stat,
  loading,
  primary,
}: {
  stat: Stat;
  loading: boolean;
  primary?: boolean;
}) {
  return (
    <Link
      href={stat.href}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#f27a1a]/30 transition-all p-5 flex flex-col gap-3 overflow-hidden"
    >
      {/* Subtle hover accent */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#f27a1a]/0 group-hover:bg-[#f27a1a]/5 transition-colors pointer-events-none" />

      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className={`h-11 w-11 rounded-xl ${stat.bg} flex items-center justify-center ${stat.accent} shrink-0`}>
          {stat.icon}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {stat.badge !== undefined && stat.badge > 0 && (
            <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {stat.badge}
            </span>
          )}
          {stat.trend === "up" && (
            <TrendingUp size={14} className="text-emerald-500" />
          )}
          {stat.trend === "down" && (
            <TrendingDown size={14} className="text-red-500" />
          )}
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
          {stat.label}
        </p>
        <p
          className={`${primary ? "text-3xl" : "text-2xl"} font-extrabold text-gray-900 leading-none`}
        >
          {loading ? (
            <span className="inline-block h-7 w-12 bg-gray-100 rounded animate-pulse" />
          ) : (
            stat.value
          )}
        </p>
        {stat.sub && (
          <p className="text-[11.5px] text-gray-500 mt-1.5 leading-tight">
            {stat.sub}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end mt-auto relative z-10">
        <span className="text-[11px] font-bold text-[#f27a1a] opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
          Open <ArrowUpRight size={12} />
        </span>
      </div>
    </Link>
  );
}
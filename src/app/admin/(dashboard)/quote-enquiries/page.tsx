// app/admin/quote-enquiries/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Package,
  Loader2,
  Trash2,
  CheckCircle2,
  Clock,
  TrendingUp,
  XCircle,
  Eye,
  X,
  StickyNote,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  zoningCountry: string;
  zipcode: string;
  actualWt: number;
  volWt: number;
  chargeableWt: number;
  length: number;
  breadth: number;
  height: number;
  service: string;
  network: string;
  zone: string;
  rateType: string;
  totalPrice: number;
  tat: string;
  status: "new" | "contacted" | "converted" | "closed";
  notes: string;
  createdAt: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
  closed: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  new: {
    label: "New",
    color: "bg-blue-100 text-blue-700",
    icon: <Clock size={11} />,
  },
  contacted: {
    label: "Contacted",
    color: "bg-yellow-100 text-yellow-700",
    icon: <Phone size={11} />,
  },
  converted: {
    label: "Converted",
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle2 size={11} />,
  },
  closed: {
    label: "Closed",
    color: "bg-gray-100 text-gray-600",
    icon: <XCircle size={11} />,
  },
};

function fmtPrice(n: number) {
  return Math.round(n).toLocaleString("en-IN");
}

function fmtDate(s: string) {
  return new Date(s).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Detail Drawer ────────────────────────────────────────────────────────────
function DetailDrawer({
  enquiry,
  onClose,
  onStatusChange,
  onNoteSave,
}: {
  enquiry: Enquiry;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => Promise<void>;
  onNoteSave: (id: string, notes: string) => Promise<void>;
}) {
  const [notes, setNotes] = useState(enquiry.notes || "");
  const [saving, setSaving] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const cfg = STATUS_CONFIG[enquiry.status];

  const handleStatusChange = async (newStatus: string) => {
    setStatusLoading(true);
    await onStatusChange(enquiry._id, newStatus);
    setStatusLoading(false);
  };

  const handleNoteSave = async () => {
    setSaving(true);
    await onNoteSave(enquiry._id, notes);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg h-full flex flex-col shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="bg-[#0D1527] px-6 py-5 flex items-start justify-between shrink-0">
          <div>
            <p className="text-[#f27a1a] text-[10px] font-extrabold tracking-widest uppercase">
              Quote Enquiry
            </p>
            <h3 className="text-white font-extrabold text-lg mt-1">
              {enquiry.name}
            </h3>
            <p className="text-white/50 text-xs mt-0.5">
              {fmtDate(enquiry.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white mt-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6">
          {/* Contact */}
          <section>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-3">
              Contact Details
            </p>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Phone size={14} className="text-[#f27a1a] shrink-0" />
                <a
                  href={`tel:${enquiry.phone}`}
                  className="font-semibold hover:text-[#f27a1a]"
                >
                  {enquiry.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Mail size={14} className="text-[#f27a1a] shrink-0" />
                <a
                  href={`mailto:${enquiry.email}`}
                  className="font-semibold hover:text-[#f27a1a] break-all"
                >
                  {enquiry.email}
                </a>
              </div>
            </div>
          </section>

          {/* Shipment */}
          <section>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-3">
              Shipment Details
            </p>
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                  Destination
                </p>
                <p className="font-semibold text-[#1c1f2e] mt-0.5">
                  {enquiry.destination}
                  {enquiry.zoningCountry && ` — ${enquiry.zoningCountry}`}
                </p>
              </div>
              {enquiry.zipcode && (
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                    Zipcode
                  </p>
                  <p className="font-semibold text-[#1c1f2e] mt-0.5">
                    {enquiry.zipcode}
                  </p>
                </div>
              )}
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                  Actual Wt
                </p>
                <p className="font-semibold text-[#1c1f2e] mt-0.5">
                  {enquiry.actualWt} kg
                </p>
              </div>
              {enquiry.volWt > 0 && (
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                    Vol Wt
                  </p>
                  <p className="font-semibold text-[#1c1f2e] mt-0.5">
                    {enquiry.volWt} kg
                  </p>
                </div>
              )}
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                  Chargeable Wt
                </p>
                <p className="font-semibold text-[#f27a1a] mt-0.5">
                  {enquiry.chargeableWt} kg
                </p>
              </div>
              {(enquiry.length > 0 ||
                enquiry.breadth > 0 ||
                enquiry.height > 0) && (
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                    Dimensions (cm)
                  </p>
                  <p className="font-semibold text-[#1c1f2e] mt-0.5">
                    {enquiry.length} × {enquiry.breadth} × {enquiry.height}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Selected Service */}
          <section>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-3">
              Selected Service
            </p>
            <div className="bg-orange-50 border border-orange-200/50 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-extrabold text-[#1c1f2e] text-sm">
                    {enquiry.service}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{enquiry.tat}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {enquiry.network && (
                      <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full font-semibold text-gray-600">
                        {enquiry.network}
                      </span>
                    )}
                    {enquiry.zone && (
                      <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full font-mono text-gray-600">
                        Zone {enquiry.zone}
                      </span>
                    )}
                    <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full text-gray-600">
                      {enquiry.rateType === "S" ? "Slab" : "Per KG"}
                    </span>
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-[#f27a1a] shrink-0">
                  ₹{fmtPrice(enquiry.totalPrice)}
                </p>
              </div>
            </div>
          </section>

          {/* Status */}
          <section>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-3">
              Update Status
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(
                Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>
              ).map((s) => {
                const c = STATUS_CONFIG[s];
                const isActive = enquiry.status === s;
                return (
                  <button
                    key={s}
                    disabled={statusLoading || isActive}
                    onClick={() => handleStatusChange(s)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                      isActive
                        ? "border-[#f27a1a] bg-orange-50 text-[#f27a1a]"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    } disabled:opacity-60`}
                  >
                    {c.icon} {c.label}
                    {isActive && (
                      <span className="ml-auto text-[9px] font-black">
                        CURRENT
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Notes */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
              Internal Notes
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add internal notes here…"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-orange-300 resize-none placeholder:text-gray-400"
            />
            <button
              onClick={handleNoteSave}
              disabled={saving}
              className="self-end bg-[#f27a1a] hover:bg-orange-600 disabled:opacity-60 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Saving…
                </>
              ) : (
                <>
                  <StickyNote size={12} /> Save Note
                </>
              )}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function QuoteEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [eRes, sRes] = await Promise.all([
        fetch(`${API_URL}/admin/quote-enquiries?limit=200`),
        fetch(`${API_URL}/admin/quote-enquiries/stats`),
      ]);
      const eData = await eRes.json();
      const sData = await sRes.json();
      if (eData.success) setEnquiries(eData.data);
      if (sData.success) setStats(sData.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`${API_URL}/admin/quote-enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setEnquiries((prev) =>
      prev.map((e) =>
        e._id === id ? { ...e, status: status as Enquiry["status"] } : e,
      ),
    );
    if (selected?._id === id)
      setSelected((p) => p && { ...p, status: status as Enquiry["status"] });
    fetchAll(); // refresh stats
  };

  const handleNoteSave = async (id: string, notes: string) => {
    await fetch(`${API_URL}/admin/quote-enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setEnquiries((prev) =>
      prev.map((e) => (e._id === id ? { ...e, notes } : e)),
    );
    if (selected?._id === id) setSelected((p) => p && { ...p, notes });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`${API_URL}/admin/quote-enquiries/${id}`, { method: "DELETE" });
    setEnquiries((prev) => prev.filter((e) => e._id !== id));
    if (selected?._id === id) setSelected(null);
    setDeleting(null);
    fetchAll();
  };

  const filtered = enquiries.filter((e) => {
    const matchStatus = filter === "all" || e.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      e.destination.toLowerCase().includes(q) ||
      e.service.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {selected && (
        <DetailDrawer
          enquiry={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onNoteSave={handleNoteSave}
        />
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1c1f2e]">
            Quote Enquiries
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Leads submitted from the Get a Quote page
          </p>
        </div>
        <button
          onClick={fetchAll}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#f27a1a] transition-colors"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            {
              label: "Total",
              value: stats.total,
              color: "text-[#1c1f2e]",
              bg: "bg-white",
            },
            {
              label: "New",
              value: stats.new,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Contacted",
              value: stats.contacted,
              color: "text-yellow-600",
              bg: "bg-yellow-50",
            },
            {
              label: "Converted",
              value: stats.converted,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              label: "Closed",
              value: stats.closed,
              color: "text-gray-500",
              bg: "bg-gray-50",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`${s.bg} rounded-xl p-4 border border-gray-200/70 flex flex-col gap-1`}
            >
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                {s.label}
              </p>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, email, phone, destination…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-300 placeholder:text-gray-400"
          />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl pl-4 pr-8 py-2.5 text-sm font-medium focus:outline-none appearance-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
          <ChevronDown
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="text-[#f27a1a] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 py-16 flex flex-col items-center gap-3 text-center">
          <Package size={40} className="text-gray-300" />
          <p className="font-bold text-gray-500">No enquiries found</p>
          <p className="text-sm text-gray-400">
            {search || filter !== "all"
              ? "Try adjusting your filters."
              : "Enquiries submitted from the Get a Quote page will appear here."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {[
                    "Contact",
                    "Destination",
                    "Service",
                    "Price",
                    "Status",
                    "Date",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((e) => {
                  const cfg = STATUS_CONFIG[e.status];
                  return (
                    <tr
                      key={e._id}
                      className="hover:bg-orange-50/40 transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold text-[#1c1f2e]">{e.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {e.phone}
                        </p>
                        <p className="text-xs text-gray-400">{e.email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#1c1f2e] whitespace-nowrap">
                          {e.destination}
                        </p>
                        {e.zoningCountry && (
                          <p className="text-xs text-gray-500">
                            {e.zoningCountry}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-0.5">
                          {e.chargeableWt} kg chargeable
                        </p>
                      </td>
                      <td className="px-5 py-4 max-w-[180px]">
                        <p className="font-semibold text-[#1c1f2e] text-xs leading-snug">
                          {e.service}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {e.tat}
                        </p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="font-extrabold text-[#f27a1a]">
                          ₹{fmtPrice(e.totalPrice)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${cfg.color}`}
                        >
                          {cfg.icon} {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-xs text-gray-500">
                          {fmtDate(e.createdAt)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSelected(e)}
                            title="View details"
                            className="p-1.5 rounded-lg hover:bg-orange-100 text-gray-400 hover:text-[#f27a1a] transition-colors"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(e._id)}
                            disabled={deleting === e._id}
                            title="Delete"
                            className="p-1.5 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          >
                            {deleting === e._id ? (
                              <Loader2 size={15} className="animate-spin" />
                            ) : (
                              <Trash2 size={15} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {enquiries.length} enquiries
          </div>
        </div>
      )}
    </div>
  );
}

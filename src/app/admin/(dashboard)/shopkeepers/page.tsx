"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Users, Search, RefreshCw, CheckCircle2, XCircle, Clock, Trash2,
  Eye, X, Loader2, Building2, Mail, Phone, MapPin, Shield,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

const headers = { "Content-Type": "application/json", "x-database": DB_NAME };

type Shopkeeper = {
  _id: string;
  shopkeeperId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstin: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  lastLoginAt?: string;
};

type Stats = { total: number; pending: number; approved: number; rejected: number };

export default function AdminShopkeepersPage() {
  const [list, setList] = useState<Shopkeeper[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Shopkeeper | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Shopkeeper | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== "ALL") params.append("status", filterStatus);
      if (search.trim()) params.append("q", search.trim());

      const [listRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/admin/shopkeepers?${params.toString()}`, { headers }),
        fetch(`${API_URL}/admin/shopkeepers/stats`, { headers }),
      ]);

      const listData = await listRes.json();
      const statsData = await statsRes.json();

      if (listData.success) setList(listData.data || []);
      if (statsData.success) setStats(statsData.data);
    } catch (err) {
      console.error("Failed to fetch shopkeepers:", err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, search]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const updateStatus = async (shopkeeperId: string, status: "APPROVED" | "REJECTED" | "PENDING") => {
    setUpdatingId(shopkeeperId);
    try {
      const res = await fetch(`${API_URL}/admin/shopkeepers/status`, {
        method: "POST", headers,
        body: JSON.stringify({ shopkeeperId, status }),
      });
      const data = await res.json();
      if (data.success) await fetchAll();
      else alert(data.message || "Failed to update status.");
    } catch (err: any) {
      alert("Failed to update: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteShopkeeper = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/admin/shopkeepers/${confirmDelete.shopkeeperId}`, {
        method: "DELETE", headers,
      });
      const data = await res.json();
      if (data.success) { setConfirmDelete(null); await fetchAll(); }
      else alert(data.message || "Failed to delete.");
    } catch (err: any) {
      alert("Failed to delete: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const statusBadge = (status: Shopkeeper["status"]) => {
    const map = {
      APPROVED: "bg-green-100 text-green-800 border-green-200",
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
      REJECTED: "bg-red-100 text-red-800 border-red-200",
    };
    const Icon = status === "APPROVED" ? CheckCircle2 : status === "PENDING" ? Clock : XCircle;
    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${map[status]}`}>
        <Icon size={11} /> {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users size={22} className="text-[#e77419]" /> Shopkeepers (Bulk Accounts)
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage bulk rate accounts. Approve, reject, or remove shopkeepers who access exclusive bulk pricing.
          </p>
        </div>
        <button onClick={fetchAll}
          className="self-start inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md px-3 py-2">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total", value: stats.total, color: "text-slate-700", bg: "bg-slate-50" },
          { label: "Approved", value: stats.approved, color: "text-green-700", bg: "bg-green-50" },
          { label: "Pending", value: stats.pending, color: "text-yellow-700", bg: "bg-yellow-50" },
          { label: "Rejected", value: stats.rejected, color: "text-red-700", bg: "bg-red-50" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border border-gray-100 p-4 ${s.bg}`}>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, GST or company"
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#e77419] focus:ring-2 focus:ring-[#e77419]/15" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                filterStatus === s ? "bg-[#e77419] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center text-gray-400">
            <Loader2 className="animate-spin" size={22} />
          </div>
        ) : list.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">No shopkeepers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Shopkeeper</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">GST</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {list.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#0D1527] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{s.name}</p>
                          <p className="text-xs text-gray-500 truncate">{s.company || s.shopkeeperId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-gray-700 truncate max-w-[200px]">{s.email}</p>
                      <p className="text-xs text-gray-500">{s.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-gray-700">{s.gstin}</span>
                    </td>
                    <td className="px-4 py-3">{statusBadge(s.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => setSelected(s)} title="View"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900">
                          <Eye size={15} />
                        </button>
                        {s.status !== "APPROVED" && (
                          <button onClick={() => updateStatus(s.shopkeeperId, "APPROVED")}
                            disabled={updatingId === s.shopkeeperId} title="Approve"
                            className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 hover:text-green-700 disabled:opacity-40">
                            {updatingId === s.shopkeeperId ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
                          </button>
                        )}
                        {s.status !== "REJECTED" && (
                          <button onClick={() => updateStatus(s.shopkeeperId, "REJECTED")}
                            disabled={updatingId === s.shopkeeperId} title="Reject"
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 disabled:opacity-40">
                            <XCircle size={15} />
                          </button>
                        )}
                        <button onClick={() => setConfirmDelete(s)} title="Delete"
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#0D1527] px-5 py-4 flex items-start justify-between">
              <div>
                <p className="text-[#e77419] text-[10px] font-bold tracking-widest uppercase">Shopkeeper Details</p>
                <h3 className="text-white font-bold text-base mt-0.5">{selected.name}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/50 hover:text-white"><X size={18} /></button>
            </div>
            <div className="px-5 py-4 space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Shield size={15} className="text-gray-400" />
                <span className="font-mono">{selected.shopkeeperId}</span>
                {statusBadge(selected.status)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail size={15} className="text-gray-400" /><span>{selected.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone size={15} className="text-gray-400" /><span>{selected.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <Building2 size={15} className="text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">{selected.company || "(No company)"}</p>
                  <p className="text-xs text-gray-500">GSTIN: {selected.gstin}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <MapPin size={15} className="text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p>{selected.address}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {[selected.city, selected.state, selected.pincode].filter(Boolean).join(", ")}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                <p>Registered: {new Date(selected.createdAt).toLocaleString("en-IN")}</p>
                {selected.lastLoginAt && <p>Last login: {new Date(selected.lastLoginAt).toLocaleString("en-IN")}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-gray-900">Delete shopkeeper?</h3>
            <p className="mt-2 text-sm text-gray-600">
              You&apos;re about to permanently delete <strong>{confirmDelete.name}</strong> ({confirmDelete.shopkeeperId}). This cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={deleteShopkeeper} disabled={deleting}
                className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 inline-flex items-center gap-1.5">
                {deleting && <Loader2 size={13} className="animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
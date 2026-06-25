"use client";

// app/admin/service-areas/page.tsx
// Admin panel to manage pickup / dropoff service areas

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Search,
  MapPin,
  Package,
  Truck,
  ArrowUpDown,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ServiceArea {
  _id: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  pickupAvailable: boolean;
  dropoffAvailable: boolean;
  pickupDays: string;
  dropoffDays: string;
  pickupTimeSlot: string;
  dropoffTimeSlot: string;
  notes: string;
  isActive: boolean;
}

const EMPTY_FORM: Omit<ServiceArea, "_id"> = {
  city: "",
  state: "",
  country: "India",
  pincode: "",
  pickupAvailable: false,
  dropoffAvailable: false,
  pickupDays: "Mon–Sat",
  dropoffDays: "Mon–Sat",
  pickupTimeSlot: "9 AM – 6 PM",
  dropoffTimeSlot: "9 AM – 6 PM",
  notes: "",
  isActive: true,
};

export default function ServiceAreasAdminPage() {
  const [areas, setAreas] = useState<ServiceArea[]>([]);
  const [filtered, setFiltered] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "pickup" | "dropoff" | "both"
  >("all");

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<ServiceArea | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pickupOnly: 0,
    dropoffOnly: 0,
    both: 0,
  });

  // ── helpers ──────────────────────────────────────────────
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAreas = useCallback(async () => {
    setLoading(true);
    try {
      const [areasRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/admin/service-areas`),
        fetch(`${API_URL}/admin/service-areas/stats`),
      ]);
      const areasData = await areasRes.json();
      const statsData = await statsRes.json();
      if (areasData.success) {
        setAreas(areasData.data);
        setFiltered(areasData.data);
      }
      if (statsData.success) setStats(statsData.data);
    } catch {
      showToast("Failed to load service areas", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  // filter locally
  useEffect(() => {
    let list = [...areas];
    if (searchQ) {
      const r = new RegExp(searchQ, "i");
      list = list.filter(
        (a) =>
          r.test(a.city) ||
          r.test(a.state) ||
          r.test(a.pincode) ||
          r.test(a.country),
      );
    }
    if (filterType === "pickup") list = list.filter((a) => a.pickupAvailable);
    if (filterType === "dropoff") list = list.filter((a) => a.dropoffAvailable);
    if (filterType === "both")
      list = list.filter((a) => a.pickupAvailable && a.dropoffAvailable);
    setFiltered(list);
  }, [areas, searchQ, filterType]);

  // ── CRUD ─────────────────────────────────────────────────
  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (area: ServiceArea) => {
    setEditTarget(area);
    const { _id, ...rest } = area;
    setForm(rest);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.city.trim() || !form.state.trim()) {
      showToast("City and State are required", "error");
      return;
    }
    setSaving(true);
    try {
      const url = editTarget
        ? `${API_URL}/admin/service-areas/${editTarget._id}`
        : `${API_URL}/admin/service-areas`;
      const method = editTarget ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      showToast(data.message);
      setShowModal(false);
      fetchAreas();
    } catch (e: any) {
      showToast(e.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service area?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/service-areas/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      showToast("Deleted successfully");
      fetchAreas();
    } catch (e: any) {
      showToast(e.message || "Delete failed", "error");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/service-areas/${id}/toggle`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      showToast(data.message);
      fetchAreas();
    } catch (e: any) {
      showToast(e.message || "Toggle failed", "error");
    }
  };

  // ── render ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-semibold transition-all ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Pickup &amp; Dropoff Service Areas
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage cities where you offer pickup / dropoff services
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#f27a1a] hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Service Area
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total", value: stats.total, color: "bg-slate-800" },
            { label: "Active", value: stats.active, color: "bg-emerald-600" },
            {
              label: "Pickup Only",
              value: stats.pickupOnly,
              color: "bg-blue-600",
            },
            {
              label: "Dropoff Only",
              value: stats.dropoffOnly,
              color: "bg-purple-600",
            },
            { label: "Both", value: stats.both, color: "bg-[#f27a1a]" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-1"
            >
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                {s.label}
              </span>
              <span
                className={`text-2xl font-extrabold ${s.color.replace("bg-", "text-")}`}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search city, state, pincode…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "pickup", "dropoff", "both"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all capitalize ${
                  filterType === t
                    ? "bg-[#f27a1a] border-[#f27a1a] text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-semibold">No service areas found</p>
              <p className="text-sm mt-1">Add your first city to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 font-semibold text-gray-500">
                      City / State
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500">
                      Country
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500">
                      Pincode
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-500">
                      Pickup
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-500">
                      Dropoff
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500">
                      Schedule
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-500">
                      Status
                    </th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((area) => (
                    <tr
                      key={area._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        !area.isActive ? "opacity-50" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="font-bold text-gray-900">
                          {area.city}
                        </div>
                        <div className="text-xs text-gray-500">
                          {area.state}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {area.country}
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-mono text-xs">
                        {area.pincode || "—"}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {area.pickupAvailable ? (
                          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg px-2.5 py-1 text-xs font-bold">
                            <Truck className="w-3 h-3" /> Yes
                          </span>
                        ) : (
                          <span className="text-gray-300 font-bold text-xs">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {area.dropoffAvailable ? (
                          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg px-2.5 py-1 text-xs font-bold">
                            <Package className="w-3 h-3" /> Yes
                          </span>
                        ) : (
                          <span className="text-gray-300 font-bold text-xs">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {area.pickupAvailable && (
                          <div className="text-xs text-gray-500">
                            <span className="font-semibold text-gray-700">
                              P:
                            </span>{" "}
                            {area.pickupDays}{" "}
                            {area.pickupTimeSlot && `· ${area.pickupTimeSlot}`}
                          </div>
                        )}
                        {area.dropoffAvailable && (
                          <div className="text-xs text-gray-500">
                            <span className="font-semibold text-gray-700">
                              D:
                            </span>{" "}
                            {area.dropoffDays}{" "}
                            {area.dropoffTimeSlot &&
                              `· ${area.dropoffTimeSlot}`}
                          </div>
                        )}
                        {!area.pickupAvailable && !area.dropoffAvailable && (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleToggle(area._id)}
                          className="focus:outline-none"
                          title={area.isActive ? "Deactivate" : "Activate"}
                        >
                          {area.isActive ? (
                            <ToggleRight className="w-6 h-6 text-emerald-500" />
                          ) : (
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(area)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(area._id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
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
        <p className="text-xs text-gray-400 text-right">
          {filtered.length} result(s)
        </p>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* modal header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
              <h2 className="text-lg font-extrabold text-gray-900">
                {editTarget ? "Edit Service Area" : "Add Service Area"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* modal body */}
            <div className="px-7 py-6 space-y-5">
              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    placeholder="e.g. Maharashtra"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Country
                  </label>
                  <input
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                    placeholder="India"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Pincode / ZIP
                  </label>
                  <input
                    value={form.pincode}
                    onChange={(e) =>
                      setForm({ ...form, pincode: e.target.value })
                    }
                    placeholder="e.g. 400001"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-100" />

              {/* Pickup */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.pickupAvailable}
                    onChange={(e) =>
                      setForm({ ...form, pickupAvailable: e.target.checked })
                    }
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span className="font-bold text-blue-700 flex items-center gap-1.5">
                    <Truck className="w-4 h-4" /> Pickup Available
                  </span>
                </label>
                {form.pickupAvailable && (
                  <div className="ml-7 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">
                        Pickup Days
                      </label>
                      <input
                        value={form.pickupDays}
                        onChange={(e) =>
                          setForm({ ...form, pickupDays: e.target.value })
                        }
                        placeholder="Mon–Sat"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">
                        Pickup Time Slot
                      </label>
                      <input
                        value={form.pickupTimeSlot}
                        onChange={(e) =>
                          setForm({ ...form, pickupTimeSlot: e.target.value })
                        }
                        placeholder="9 AM – 6 PM"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Dropoff */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.dropoffAvailable}
                    onChange={(e) =>
                      setForm({ ...form, dropoffAvailable: e.target.checked })
                    }
                    className="w-4 h-4 rounded accent-purple-600"
                  />
                  <span className="font-bold text-purple-700 flex items-center gap-1.5">
                    <Package className="w-4 h-4" /> Dropoff Available
                  </span>
                </label>
                {form.dropoffAvailable && (
                  <div className="ml-7 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">
                        Dropoff Days
                      </label>
                      <input
                        value={form.dropoffDays}
                        onChange={(e) =>
                          setForm({ ...form, dropoffDays: e.target.value })
                        }
                        placeholder="Mon–Sat"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">
                        Dropoff Time Slot
                      </label>
                      <input
                        value={form.dropoffTimeSlot}
                        onChange={(e) =>
                          setForm({ ...form, dropoffTimeSlot: e.target.value })
                        }
                        placeholder="9 AM – 6 PM"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Notes (optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any special instructions or remarks…"
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
                />
              </div>

              {/* Active toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-emerald-600"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Active (visible to customers)
                </span>
              </label>
            </div>

            {/* modal footer */}
            <div className="flex gap-3 px-7 pb-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#f27a1a] hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editTarget ? "Save Changes" : "Add Area"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

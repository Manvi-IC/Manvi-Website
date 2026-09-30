"use client";

import { useState } from "react";
import { X, Loader2, User, Phone, Mail, MapPin, Building2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

export const SHOPKEEPER_SESSION_KEY = "manvi_shopkeeper_session";

export type ShopkeeperSession = {
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
  status: string;
};

type Props = {
  onClose: () => void;
  onSuccess: (shopkeeper: ShopkeeperSession) => void;
};

export default function ShopkeeperLoginModal({ onClose, onSuccess }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", address: "",
    city: "", state: "", pincode: "", gstin: "", password: "",
  });

  const inputCls =
    "w-full bg-white text-slate-900 text-[14px] font-medium rounded-xl pl-10 pr-4 py-3 border border-slate-200 focus:outline-none placeholder:text-slate-400 focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/15 transition-all";
  const plainInputCls =
    "w-full bg-white text-slate-900 text-[14px] font-medium rounded-xl px-4 py-3 border border-slate-200 focus:outline-none placeholder:text-slate-400 focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/15 transition-all";
  const labelCls =
    "block text-slate-600 text-[11px] font-bold tracking-[0.12em] uppercase mb-1.5";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/shopkeeper/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-database": DB_NAME },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Login failed.");
        return;
      }
      onSuccess(data.shopkeeper);
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Name is required.");
    if (!/^\d{10}$/.test(form.phone.trim())) return setError("Phone must be exactly 10 digits.");
    if (!form.address.trim()) return setError("Address is required.");
    if (!form.gstin.trim()) return setError("GST number is required.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/shopkeeper/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-database": DB_NAME },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Registration failed.");
        return;
      }
      // Auto-login
      const loginRes = await fetch(`${API_URL}/shopkeeper/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-database": DB_NAME },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const loginData = await loginRes.json();
      if (loginData.success) {
        onSuccess(loginData.shopkeeper);
      } else {
        setError("Registered successfully. Please log in manually.");
        setMode("login");
        setLoginEmail(form.email);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#f9fafb] rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#0D1527] px-5 py-4 flex items-center justify-between shrink-0">
          <div>
            <p className="text-[#f27a1a] text-[10px] font-extrabold tracking-widest uppercase">Bulk Rates</p>
            <h3 className="text-white font-extrabold text-base leading-tight mt-0.5">
              {mode === "login" ? "Login to your account" : "Create your bulk account"}
            </h3>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/10 p-1">
            <X size={18} />
          </button>
        </div>

        <div className="flex border-b border-slate-200 shrink-0">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2.5 text-[13px] font-bold transition-colors ${
              mode === "login" ? "text-[#f27a1a] border-b-2 border-[#f27a1a] bg-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2.5 text-[13px] font-bold transition-colors ${
              mode === "register" ? "text-[#f27a1a] border-b-2 border-[#f27a1a] bg-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            New here? Register
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" required value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com" className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Password <span className="text-red-500">*</span></label>
                <input type="password" required value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Your password" className={plainInputCls} />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2.5 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="bg-[#f27a1a] hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
                {loading ? (<><Loader2 size={16} className="animate-spin" /> Logging in…</>) : ("Login")}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className={labelCls}>Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Phone <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" inputMode="numeric" pattern="[0-9]*" required maxLength={10}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      placeholder="10-digit mobile" className={inputCls} />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className={labelCls}>Company</label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Shop / Company" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>GST Number <span className="text-red-500">*</span></label>
                  <input type="text" required value={form.gstin}
                    onChange={(e) => setForm({ ...form, gstin: e.target.value.toUpperCase() })}
                    placeholder="22AAAAA0000A1Z5" className={plainInputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-3 text-gray-400" />
                  <textarea required rows={2} value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Street, area, landmark"
                    className="w-full bg-white text-slate-900 text-[14px] font-medium rounded-xl pl-10 pr-4 py-3 border border-slate-200 focus:outline-none placeholder:text-slate-400 focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/15 transition-all resize-none" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>City</label>
                  <input type="text" value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="City"
                    className="w-full bg-white text-slate-900 text-[13px] font-medium rounded-xl px-3 py-3 border border-slate-200 focus:outline-none placeholder:text-slate-400 focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/15 transition-all" />
                </div>
                <div>
                  <label className={labelCls}>State</label>
                  <input type="text" value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="State"
                    className="w-full bg-white text-slate-900 text-[13px] font-medium rounded-xl px-3 py-3 border border-slate-200 focus:outline-none placeholder:text-slate-400 focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/15 transition-all" />
                </div>
                <div>
                  <label className={labelCls}>Pincode</label>
                  <input type="text" inputMode="numeric" value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                    placeholder="141001"
                    className="w-full bg-white text-slate-900 text-[13px] font-medium rounded-xl px-3 py-3 border border-slate-200 focus:outline-none placeholder:text-slate-400 focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/15 transition-all" />
                </div>
              </div>

              <div>
                <label className={labelCls}>Password <span className="text-red-500">*</span></label>
                <input type="password" required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min 6 characters" className={plainInputCls} />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2.5 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="bg-[#f27a1a] hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
                {loading ? (<><Loader2 size={16} className="animate-spin" /> Creating account…</>) : ("Create account & continue")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
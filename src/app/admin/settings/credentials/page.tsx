"use client";

import { useState } from "react";
import {
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  KeyRound,
  AtSign,
} from "lucide-react";

const API_URL = process.env.NEXT_API_URL || "http://localhost:5000";

export default function CredentialsSettingsPage() {
  const [form, setForm] = useState({
    currentUsername: "",
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    // Client-side validation
    if (!form.currentUsername || !form.currentPassword) {
      setResult({
        success: false,
        message: "Please enter your current username and password",
      });
      return;
    }

    if (!form.newUsername && !form.newPassword) {
      setResult({
        success: false,
        message: "Please enter a new username or new password",
      });
      return;
    }

    if (form.newPassword) {
      if (form.newPassword.length < 6) {
        setResult({
          success: false,
          message: "New password must be at least 6 characters",
        });
        return;
      }
      if (form.newPassword !== form.confirmPassword) {
        setResult({
          success: false,
          message: "New password and confirm password do not match",
        });
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/admin/change-credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUsername: form.currentUsername,
          currentPassword: form.currentPassword,
          newUsername: form.newUsername || undefined,
          newPassword: form.newPassword || undefined,
        }),
      });

      const data = await res.json();
      setResult({
        success: !!data.success,
        message: data.message || (data.success ? "Updated" : "Failed"),
      });

      if (data.success) {
        setForm({
          currentUsername: "",
          currentPassword: "",
          newUsername: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err: any) {
      setResult({
        success: false,
        message: "Network error: " + err.message,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* ─── Page Header ─────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
            <ShieldCheck className="text-[#e77419]" size={24} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
              Admin Credentials
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Update your admin username and/or password
            </p>
          </div>
        </div>
      </div>

      {/* ─── Main Card ───────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Result banner */}
          {result && (
            <div
              className={`flex items-start gap-3 px-5 py-4 border-b ${
                result.success
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              {result.success ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm font-medium ${
                  result.success ? "text-green-800" : "text-red-800"
                }`}
              >
                {result.message}
              </p>
            </div>
          )}

          {/* ── Section 1: Current Credentials ───────── */}
          <div className="px-5 sm:px-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                <KeyRound size={14} className="text-gray-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Verify Current Credentials
                </h3>
                <p className="text-xs text-gray-500">
                  Confirm your identity before making changes
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Current Username */}
              <div>
                <label
                  htmlFor="currentUsername"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Current Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="currentUsername"
                    type="text"
                    name="currentUsername"
                    value={form.currentUsername}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                    placeholder="Enter current username"
                    className="w-full pl-10 pr-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e77419]/30 focus:border-[#e77419] transition-colors"
                  />
                </div>
              </div>

              {/* Current Password */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="currentPassword"
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    className="w-full pl-10 pr-11 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e77419]/30 focus:border-[#e77419] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((s) => !s)}
                    aria-label={
                      showCurrent ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 2: New Credentials ───────────── */}
          <div className="px-5 sm:px-6 py-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                <AtSign size={14} className="text-[#e77419]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  New Credentials
                </h3>
                <p className="text-xs text-gray-500">
                  Leave fields blank to keep them unchanged
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* New Username */}
              <div>
                <label
                  htmlFor="newUsername"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  New Username{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="newUsername"
                    type="text"
                    name="newUsername"
                    value={form.newUsername}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Leave blank to keep current"
                    className="w-full pl-10 pr-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e77419]/30 focus:border-[#e77419] transition-colors"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  New Password{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="Leave blank to keep current"
                    className="w-full pl-10 pr-11 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e77419]/30 focus:border-[#e77419] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((s) => !s)}
                    aria-label={showNew ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.newPassword && form.newPassword.length < 6 && (
                  <p className="mt-1.5 text-xs text-amber-600 flex items-center gap-1">
                    <AlertCircle size={12} />
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              {/* Confirm New Password — only when typing */}
              {form.newPassword && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      placeholder="Re-enter new password"
                      className="w-full pl-10 pr-11 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e77419]/30 focus:border-[#e77419] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {form.confirmPassword &&
                    form.newPassword !== form.confirmPassword && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} />
                        Passwords do not match
                      </p>
                    )}
                  {form.confirmPassword &&
                    form.newPassword === form.confirmPassword &&
                    form.newPassword.length >= 6 && (
                      <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Passwords match
                      </p>
                    )}
                </div>
              )}
            </div>
          </div>

          {/* ── Footer / Submit ───────────────────────── */}
          <div className="px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-gray-500 order-2 sm:order-1">
              Changes take effect on your next login.
            </p>
            <button
              type="submit"
              disabled={saving}
              className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 bg-[#e77419] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#d06817] active:bg-[#b85a13] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm w-full sm:w-auto"
            >
              {saving ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Updating...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Update Credentials
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ─── Info Banner ─────────────────────────────── */}
      <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 space-y-1 leading-relaxed">
          <p>
            <strong>Important:</strong> After changing your credentials, you
            will need to use the new username/password on your next login.
          </p>
          <p>
            Your current session will remain active, but if you log out you'll
            need the new credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
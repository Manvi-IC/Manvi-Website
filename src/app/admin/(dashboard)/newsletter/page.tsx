// app/admin/(dashboard)/newsletter/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Users,
  Send,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Trash2,
  Clock,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Subscriber {
  _id: string;
  email: string;
  firstName: string;
  source: string;
  brevoSynced: boolean;
  createdAt: string;
}

interface SendHistory {
  subject: string;
  sentAt: string;
  count: number;
  status: "success" | "error";
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [senderName, setSenderName] = useState("Manvi Logistics");
  const [senderEmail, setSenderEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [history, setHistory] = useState<SendHistory[]>([]);
  const [activeTab, setActiveTab] = useState<"compose" | "subscribers">(
    "compose"
  );

  const fetchSubscribers = async () => {
    setLoadingSubscribers(true);
    try {
      const res = await fetch(`${API_URL}/api/subscribers`);
      const data = await res.json();
      if (data.success) setSubscribers(data.data);
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
    const saved = localStorage.getItem("newsletter_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSend = async () => {
    if (!subject.trim() || !htmlContent.trim() || !senderEmail.trim()) {
      setSendResult({
        type: "error",
        message: "Please fill in Subject, Sender Email, and Email Body.",
      });
      return;
    }

    setSending(true);
    setSendResult(null);

    try {
      const res = await fetch(`${API_URL}/admin/newsletter/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          htmlContent: htmlContent.trim(),
          senderName: senderName.trim() || "Manvi Logistics",
          senderEmail: senderEmail.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSendResult({
          type: "success",
          message: `Campaign "${subject}" sent successfully to ${subscribers.length} subscriber(s)!`,
        });
        const newEntry: SendHistory = {
          subject,
          sentAt: new Date().toISOString(),
          count: subscribers.length,
          status: "success",
        };
        const updated = [newEntry, ...history].slice(0, 10);
        setHistory(updated);
        localStorage.setItem("newsletter_history", JSON.stringify(updated));
        setSubject("");
        setHtmlContent("");
      } else {
        setSendResult({
          type: "error",
          message: data.error || "Failed to send campaign. Check Brevo settings.",
        });
      }
    } catch {
      setSendResult({
        type: "error",
        message: "Network error. Make sure the server is running.",
      });
    } finally {
      setSending(false);
    }
  };

  const TEMPLATE_PROMOTIONAL = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
  <div style="background: #0D1527; padding: 24px; text-align: center;">
    <h1 style="color: #f27a1a; margin: 0; font-size: 24px;">Manvi Logistics</h1>
    <p style="color: #94a3b8; margin: 8px 0 0;">Your trusted shipping partner</p>
  </div>
  <div style="padding: 32px 24px;">
    <h2 style="color: #0f172a; margin-top: 0;">Special Offer for You! 🚀</h2>
    <p style="color: #475569; line-height: 1.6;">
      Hi there,<br><br>
      We have an exciting offer just for you. Write your promotional content here.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://manvilogistics.com" style="background: #f27a1a; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
        Get Started &rarr;
      </a>
    </div>
    <p style="color: #475569; line-height: 1.6;">
      Thank you for choosing Manvi Logistics.<br>
      &mdash; The Manvi Team
    </p>
  </div>
  <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
    <p style="color: #94a3b8; font-size: 12px; margin: 0;">
      You are receiving this because you subscribed on our blog.
    </p>
  </div>
</div>`;

  const TEMPLATE_SHIPPING_TIP = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
  <div style="background: #0D1527; padding: 24px; text-align: center;">
    <h1 style="color: #f27a1a; margin: 0; font-size: 24px;">Manvi Logistics</h1>
    <p style="color: #94a3b8; margin: 8px 0 0;">Shipping Tip of the Month</p>
  </div>
  <div style="padding: 32px 24px;">
    <h2 style="color: #0f172a; margin-top: 0;">This Month's Shipping Tip</h2>
    <p style="color: #475569; line-height: 1.6;">
      Hi there,<br><br>
      Here is a useful tip to help you ship smarter this month...
    </p>
    <div style="background: #fff7ed; border-left: 4px solid #f27a1a; padding: 16px; margin: 24px 0; border-radius: 4px;">
      <p style="color: #92400e; margin: 0; font-weight: bold;">Pro Tip:</p>
      <p style="color: #78350f; margin: 8px 0 0;">Write your tip content here.</p>
    </div>
    <p style="color: #475569; line-height: 1.6;">
      Happy shipping!<br>
      &mdash; The Manvi Team
    </p>
  </div>
  <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
    <p style="color: #94a3b8; font-size: 12px; margin: 0;">
      You are receiving this because you subscribed on our blog.
    </p>
  </div>
</div>`;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="text-[#f27a1a]" size={28} />
            Newsletter
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Send promotional emails to all subscribers via Brevo
          </p>
        </div>
        <div className="bg-[#0D1527] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <Users size={16} className="text-[#f27a1a]" />
          <span className="font-bold text-[#f27a1a]">{subscribers.length}</span>
          <span className="text-slate-400">
            subscriber{subscribers.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("compose")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "compose"
              ? "border-[#f27a1a] text-[#f27a1a]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Compose &amp; Send
        </button>
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "subscribers"
              ? "border-[#f27a1a] text-[#f27a1a]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Subscribers ({subscribers.length})
        </button>
      </div>

      {/* COMPOSE TAB */}
      {activeTab === "compose" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Compose Form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Templates */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-700 mb-3">
                Quick Templates
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setHtmlContent(TEMPLATE_PROMOTIONAL)}
                  className="px-3 py-1.5 text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  Promotional
                </button>
                <button
                  onClick={() => setHtmlContent(TEMPLATE_SHIPPING_TIP)}
                  className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Shipping Tip
                </button>
                <button
                  onClick={() => setHtmlContent("")}
                  className="px-3 py-1.5 text-xs bg-slate-50 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Blank
                </button>
              </div>
            </div>

            {/* Sender Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
              <p className="text-sm font-medium text-slate-700">Sender Info</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Manvi Logistics"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    From Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="info@manvilogistics.com"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a]"
                  />
                </div>
              </div>
              <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                The sender email must be verified in Brevo (Settings &rarr; Senders, domains, IPs)
              </p>
            </div>

            {/* Subject */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject Line <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Special offer from Manvi Logistics!"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a]"
              />
              <p className="text-xs text-slate-400 mt-1">
                {subject.length}/150 characters
              </p>
            </div>

            {/* Body */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Body (HTML) <span className="text-red-400">*</span>
              </label>
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                rows={16}
                placeholder="Write your email HTML here, or pick a template above..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a] resize-y"
              />
              <p className="text-xs text-slate-400 mt-1">
                You can write plain HTML. Use templates above as a starting point.
              </p>
            </div>

            {/* Send Result */}
            {sendResult && (
              <div
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${
                  sendResult.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {sendResult.type === "success" ? (
                  <CheckCircle size={18} className="mt-0.5 flex-none" />
                ) : (
                  <AlertCircle size={18} className="mt-0.5 flex-none" />
                )}
                <p className="text-sm">{sendResult.message}</p>
              </div>
            )}

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={sending || subscribers.length === 0}
              className="w-full flex items-center justify-center gap-2 bg-[#f27a1a] hover:bg-[#db660c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
            >
              {sending ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Sending campaign...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send to All {subscribers.length} Subscriber
                  {subscribers.length !== 1 ? "s" : ""}
                </>
              )}
            </button>
          </div>

          {/* Right: Preview + History */}
          <div className="space-y-4">
            {/* Preview */}
            {htmlContent && (
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-700 mb-3">
                  Preview
                </p>
                <div
                  className="border border-slate-100 rounded-lg overflow-auto max-h-80 text-xs"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            )}

            {/* Send History */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                <Clock size={14} />
                Send History
              </p>
              {history.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">
                  No campaigns sent yet
                </p>
              ) : (
                <div className="space-y-2">
                  {history.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg"
                    >
                      <CheckCircle
                        size={14}
                        className="text-green-500 mt-0.5 flex-none"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-700 truncate">
                          {h.subject}
                        </p>
                        <p className="text-xs text-slate-400">
                          {h.count} recipients &middot;{" "}
                          {new Date(h.sentAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setHistory([]);
                      localStorage.removeItem("newsletter_history");
                    }}
                    className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 mt-2"
                  >
                    <Trash2 size={12} /> Clear history
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBSCRIBERS TAB */}
      {activeTab === "subscribers" && (
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-700">
              All Subscribers ({subscribers.length})
            </p>
            <button
              onClick={fetchSubscribers}
              disabled={loadingSubscribers}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              <RefreshCw
                size={13}
                className={loadingSubscribers ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {loadingSubscribers ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Loading subscribers...
            </div>
          ) : subscribers.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No subscribers yet. Share your blog!
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {subscribers.map((sub) => (
                <div
                  key={sub._id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0D1527] text-[#f27a1a] flex items-center justify-center text-xs font-bold uppercase">
                      {sub.email[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {sub.email}
                      </p>
                      <p className="text-xs text-slate-400">
                        {sub.firstName || "—"} &middot; via {sub.source}{" "}
                        &middot;{" "}
                        {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      sub.brevoSynced
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {sub.brevoSynced ? "Brevo synced" : "Pending sync"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

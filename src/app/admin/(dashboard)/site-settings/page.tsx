"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function SiteSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    marqueeText: "",
    showMarquee: true,
    offerTitle: "",
    offerSubtitle: "",
    offerEndDate: "",
    showOffer: true,
    countryServiceMapping: [] as { country: string, services: string[] }[],
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/site-settings");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Response is not JSON");
      }
      const data = await res.json();
      if (data.success && data.data) {
        setFormData({
          marqueeText: data.data.marqueeText || "",
          showMarquee: data.data.showMarquee ?? true,
          offerTitle: data.data.offerTitle || "",
          offerSubtitle: data.data.offerSubtitle || "",
          offerEndDate: data.data.offerEndDate 
            ? new Date(data.data.offerEndDate).toISOString().slice(0, 16) 
            : "",
          showOffer: data.data.showOffer ?? true,
          countryServiceMapping: data.data.countryServiceMapping || [],
        });
      }
    } catch (err) {
      console.warn("Failed to fetch site settings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'radio' && (value === 'true' || value === 'false') ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const payload = {
        ...formData,
        offerEndDate: formData.offerEndDate ? new Date(formData.offerEndDate).toISOString() : null,
      };

      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Response is not JSON");
      }
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Site settings updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update settings." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage dynamic content on your public website.
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          {/* Marquee Settings */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Top Marquee Strip</h2>
            <div className="grid grid-cols-1 gap-y-6">
              <div className="sm:col-span-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Show Marquee
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, showMarquee: !prev.showMarquee }))}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:ring-offset-2 ${
                      formData.showMarquee ? 'bg-[#e77419]' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={formData.showMarquee}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.showMarquee ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {formData.showMarquee ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="marqueeText" className="block text-sm font-medium text-gray-700 mb-1">
                  Marquee Text
                </label>
                <textarea
                  id="marqueeText"
                  name="marqueeText"
                  rows={4}
                  value={formData.marqueeText}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e77419] focus:border-[#e77419] sm:text-sm"
                  placeholder="Enter marquee text here..."
                />
              </div>
            </div>
          </div>

          {/* Offer Settings */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Limited-Time Offer</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Show Offer Box
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, showOffer: !prev.showOffer }))}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:ring-offset-2 ${
                      formData.showOffer ? 'bg-[#e77419]' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={formData.showOffer}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.showOffer ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {formData.showOffer ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="offerTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Title
                </label>
                <input
                  type="text"
                  id="offerTitle"
                  name="offerTitle"
                  value={formData.offerTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e77419] focus:border-[#e77419] sm:text-sm"
                  placeholder="Limited-Time Offer"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="offerSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Subtitle
                </label>
                <input
                  type="text"
                  id="offerSubtitle"
                  name="offerSubtitle"
                  value={formData.offerSubtitle}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e77419] focus:border-[#e77419] sm:text-sm"
                  placeholder="₹679/kg to USA; ends soon"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="offerEndDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Offer End Date
                </label>
                <input
                  type="datetime-local"
                  id="offerEndDate"
                  name="offerEndDate"
                  value={formData.offerEndDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e77419] focus:border-[#e77419] sm:text-sm"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#e77419] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center items-center text-sm font-medium text-white hover:bg-[#d06817] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e77419] disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

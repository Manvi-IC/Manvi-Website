"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { RangoliWatermark } from "@/components/DiwaliDecorations";
import {
  SearchableCountryDropdown,
  DESTINATIONS,
  EUROPE_COUNTRIES,
  INTERNATIONAL_COUNTRIES,
} from "@/components/GetQuote";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

interface DiwaliBookingFormProps {
  isDiwaliMode: boolean;
  setShowInqSuccessModal: (show: boolean) => void;
  setSuccessAnimationPhase: (phase: "idle" | "celebrating" | "modal") => void;
  setSubmittedInquiry: (inq: any) => void;
}

export default function DiwaliBookingForm({
  isDiwaliMode,
  setShowInqSuccessModal,
  setSuccessAnimationPhase,
  setSubmittedInquiry,
}: DiwaliBookingFormProps) {
  const [inqName, setInqName] = useState("");
  const [inqPhone, setInqPhone] = useState("");
  const [inqEmail, setInqEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [zoningCountry, setZoningCountry] = useState("");
  const [inqWeight, setInqWeight] = useState("");
  const [inqLoading, setInqLoading] = useState(false);
  const [inqSuccess, setInqSuccess] = useState(false);

  const destObj = DESTINATIONS.find((d) => d.value === destination);
  const requiresSubCountry = destObj?.requiresSubCountry ?? false;
  const subCountryOptions =
    destination === "EUROPE" ? EUROPE_COUNTRIES : INTERNATIONAL_COUNTRIES;

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInqLoading(true);

    const finalDest = requiresSubCountry ? zoningCountry : destination;

    const inquiryDetails = {
      name: inqName.trim() || "Diwali Customer",
      phone: inqPhone.trim(),
      email: inqEmail.trim(),
      destination: finalDest || "International",
      weight: inqWeight.trim(),
      submittedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const params = new URLSearchParams();
    params.append(
      "xnQsjsdp",
      "0865f832e9eff8ac8416c9074e4fe81d82b2f78105b16bc6675b9cd2e3f7dfad",
    );
    params.append("zc_gad", "");
    params.append(
      "xmIwtLD",
      "ca6104fc687d6c4afcb27e6c4f9bdef93a18aec2baa19548cd8ce05901d0a0de7d20fe8f7958b27d61877d5aaa686212",
    );
    params.append("actionType", "Q29udGFjdHM=");
    params.append("returnURL", "null");
    params.append("Last Name", inqName || "Diwali Customer");
    params.append("Phone", inqPhone);
    params.append("Email", inqEmail || "noemail@diwali.com");
    params.append("Title", "Diwali Campaign Inquiry");
    params.append("Department", finalDest || "International");
    params.append(
      "Description",
      `Diwali shipment pickup request. Approx weight: ${inqWeight ? `${inqWeight}kg` : "Not specified"}`,
    );
    params.append("Lead Source", "Diwali Campaign Page");

    try {
      await fetch("https://crm.zoho.in/crm/WebToContactForm", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      // Save to backend quote-enquiries for admin dashboard
      fetch(`${API_URL}/quote-enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-database": DB_NAME,
        },
        body: JSON.stringify({
          name: inqName.trim() || "Diwali Customer",
          phone: inqPhone.trim(),
          email: inqEmail.trim() || "not-provided@diwali-campaign.local",
          destination: finalDest || "International",
          actualWt: parseFloat(inqWeight) || 0,
          chargeableWt: parseFloat(inqWeight) || 0,
          service: "Diwali Pickup Request",
          sourcePage: "Diwali Campaign",
          notes: `Diwali Pickup Request (${inqWeight ? `${inqWeight}kg` : "weight unspecified"})`,
        }),
      }).catch((e) => console.warn("[Diwali Campaign] Quote save error:", e));

      setSubmittedInquiry(inquiryDetails);
      setInqSuccess(true);
      setShowInqSuccessModal(true);
      setSuccessAnimationPhase("celebrating");
    } catch (err) {
      console.error(err);
      setSubmittedInquiry(inquiryDetails);
      setInqSuccess(true);
      setShowInqSuccessModal(true);
      setSuccessAnimationPhase("celebrating");
    } finally {
      setInqLoading(false);
    }
  };

  return (
    <div
      className={`w-full rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-700 ease-in-out relative flex flex-col ${
        isDiwaliMode
          ? "bg-white shadow-md text-[#1F272F]"
          : "bg-white"
      }`}
    >
      {/* Background Watermark container with hidden overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl sm:rounded-2xl z-0">
        <div
          className={`absolute -top-10 -right-10 transition-opacity duration-700 ease-in-out ${
            isDiwaliMode ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!isDiwaliMode}
        >
          <RangoliWatermark size={180} opacity={0.12} />
        </div>
      </div>
      {inqSuccess ? (
        <div className="text-center py-6 sm:py-8">
          <div className="relative inline-flex items-center justify-center mb-2">
            <div className="absolute w-12 h-12 rounded-full bg-emerald-500/20 blur-md pointer-events-none" />
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 relative z-10" />
          </div>
          <h3
            className={`text-lg sm:text-xl font-bold mb-1 ${
              isDiwaliMode ? "text-[#1F272F]" : "text-gray-900"
            }`}
          >
            Diwali Booking Received!
          </h3>
          <p
            className={`text-xs sm:text-sm mb-4 max-w-sm mx-auto ${
              isDiwaliMode ? "text-[#58626c]" : "text-gray-500"
            }`}
          >
            Thank you! Our logistics coordinator will contact you shortly to
            schedule doorstep pickup.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setShowInqSuccessModal(true);
                setSuccessAnimationPhase("celebrating");
              }}
              className="text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
            >
              View Confirmation 🪔
            </button>
            <button
              type="button"
              onClick={() => {
                setInqSuccess(false);
                setInqName("");
                setInqPhone("");
                setInqEmail("");
                setDestination("");
                setZoningCountry("");
                setInqWeight("");
              }}
              className={`text-xs font-bold underline cursor-pointer px-2 py-1 ${
                isDiwaliMode ? "text-[#c4620c]" : "text-[#f27a1a]"
              }`}
            >
              Send another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleInquirySubmit}
          className="flex flex-col gap-2 sm:gap-4"
        >
          <div className="flex flex-col gap-0.5 relative z-10">
            <span
              className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${isDiwaliMode ? "text-[#ED7E23]" : "text-[#f27a1a]"}`}
            >
              Book Your Diwali Parcel Today
            </span>
            <h3
              className={`text-base sm:text-lg font-extrabold ${
                isDiwaliMode ? "text-[#1F272F]" : "text-[#1c1f2e]"
              }`}
            >
              Request Diwali Pickup
            </h3>
            <div className="flex flex-col gap-1">
              <div
                className={`flex items-start gap-1.5 text-[10px] sm:text-[11px] font-semibold leading-tight ${isDiwaliMode ? "text-[#58626c]" : "text-gray-500"}`}
              >
                <CheckCircle2
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 mt-[1px] ${isDiwaliMode ? "text-[#ED7E23]" : "text-emerald-500"}`}
                />
                Doorstep Pickup Across Delhi NCR, Punjab, Haryana & Gujarat
              </div>
              <div
                className={`flex items-start gap-1.5 text-[10px] sm:text-[11px] font-semibold leading-tight ${isDiwaliMode ? "text-[#58626c]" : "text-gray-500"}`}
              >
                <CheckCircle2
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 mt-[1px] ${isDiwaliMode ? "text-[#ED7E23]" : "text-emerald-500"}`}
                />
                Zero Customs Hassle with Complete Documentation
              </div>
              <div
                className={`flex items-start gap-1.5 text-[10px] sm:text-[11px] font-semibold leading-tight ${isDiwaliMode ? "text-[#58626c]" : "text-gray-500"}`}
              >
                <CheckCircle2
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 mt-[1px] ${isDiwaliMode ? "text-[#ED7E23]" : "text-emerald-500"}`}
                />
                Free Packaging
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <input
              type="text"
              required
              placeholder="Your Name*"
              value={inqName}
              onChange={(e) => setInqName(e.target.value)}
              className={`rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none transition-colors ${
                isDiwaliMode
                  ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] placeholder:text-[#909498] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                  : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
              }`}
            />
            <input
              type="tel"
              required
              placeholder="Contact Number*"
              value={inqPhone}
              onChange={(e) => setInqPhone(e.target.value)}
              className={`rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none transition-colors ${
                isDiwaliMode
                  ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] placeholder:text-[#909498] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                  : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <div className="relative">
              <select
                required
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setZoningCountry("");
                }}
                className={`w-full rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none transition-colors appearance-none ${
                  isDiwaliMode
                    ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                    : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
                } ${!destination ? (isDiwaliMode ? "text-[#909498]" : "text-gray-400") : ""}`}
              >
                <option value="" disabled hidden>
                  Destination Country*
                </option>
                {DESTINATIONS.map((d) => (
                  <option key={d.value} value={d.value} className="text-[#333]">
                    {d.flag} {d.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isDiwaliMode ? "text-[#909498]" : "text-gray-400"
                }`}
              />
            </div>

            <input
              type="text"
              placeholder="Approx Weight (kg)"
              value={inqWeight}
              onChange={(e) => setInqWeight(e.target.value)}
              className={`rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none transition-colors ${
                isDiwaliMode
                  ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] placeholder:text-[#909498] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                  : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
              }`}
            />

            {requiresSubCountry && (
              <div className="col-span-1 sm:col-span-2 relative">
                <SearchableCountryDropdown
                  countries={subCountryOptions}
                  value={zoningCountry}
                  onChange={(val) => {
                    setZoningCountry(val);
                  }}
                  placeholder={
                    destination === "EUROPE"
                      ? "Select European Country"
                      : "Select Country"
                  }
                  className={`w-full flex items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium cursor-text transition-colors ${
                    isDiwaliMode
                      ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] focus-within:border-[#c4620c] focus-within:ring-2 focus-within:ring-[#ED7E23]/25"
                      : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus-within:border-orange-500"
                  }`}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={inqLoading}
            className={`disabled:opacity-70 font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1 ${
              isDiwaliMode
                ? "bg-gradient-to-b from-[#f79a45] to-[#ED7E23] text-[#1F272F] shadow-[0_10px_30px_-8px_rgba(237,126,35,0.6),inset_0_1px_0_#ffd9b5] hover:scale-[1.01]"
                : "bg-[#f27a1a] hover:bg-orange-600 text-white"
            }`}
          >
            {inqLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Submit Diwali Pickup Request"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

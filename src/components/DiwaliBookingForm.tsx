"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { RangoliWatermark } from "@/components/DiwaliDecorations";

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
  const [inqDest, setInqDest] = useState("");
  const [inqWeight, setInqWeight] = useState("");
  const [inqLoading, setInqLoading] = useState(false);
  const [inqSuccess, setInqSuccess] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInqLoading(true);

    const inquiryDetails = {
      name: inqName.trim() || "Diwali Customer",
      phone: inqPhone.trim(),
      email: inqEmail.trim(),
      destination: inqDest.trim() || "International",
      weight: inqWeight.trim(),
      submittedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const params = new URLSearchParams();
    params.append(
      "xnQsjsdp",
      "0865f832e9eff8ac8416c9074e4fe81d82b2f78105b16bc6675b9cd2e3f7dfad"
    );
    params.append("zc_gad", "");
    params.append(
      "xmIwtLD",
      "ca6104fc687d6c4afcb27e6c4f9bdef93a18aec2baa19548cd8ce05901d0a0de7d20fe8f7958b27d61877d5aaa686212"
    );
    params.append("actionType", "Q29udGFjdHM=");
    params.append("returnURL", "null");
    params.append("Last Name", inqName || "Diwali Customer");
    params.append("Phone", inqPhone);
    params.append("Email", inqEmail || "noemail@diwali.com");
    params.append("Title", "Diwali Campaign Inquiry");
    params.append("Department", inqDest || "International");
    params.append(
      "Description",
      `Diwali shipment pickup request. Approx weight: ${inqWeight ? `${inqWeight}kg` : "Not specified"}`
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
          destination: inqDest.trim() || "International",
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
      className={`lg:col-span-6 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm transition-all duration-700 ease-in-out relative overflow-hidden ${
        isDiwaliMode
          ? "bg-white border border-[#ED7E23]/35 shadow-md text-[#1F272F]"
          : "bg-white border border-gray-200/80"
      }`}
    >
      <div
        className={`absolute -top-10 -right-10 pointer-events-none transition-opacity duration-700 ease-in-out ${
          isDiwaliMode ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!isDiwaliMode}
      >
        <RangoliWatermark size={180} opacity={0.12} />
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
            Thank you! Our logistics coordinator will contact you shortly to schedule doorstep pickup.
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
                setInqDest("");
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
        <form onSubmit={handleInquirySubmit} className="flex flex-col gap-3 sm:gap-4">
          <h3
            className={`text-base sm:text-lg font-bold mb-1 ${
              isDiwaliMode ? "text-[#1F272F]" : "text-[#1c1f2e]"
            }`}
          >
            Request Diwali Pickup
          </h3>

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
            <input
              type="text"
              required
              placeholder="Destination Country (e.g. USA)*"
              value={inqDest}
              onChange={(e) => setInqDest(e.target.value)}
              className={`rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:outline-none transition-colors ${
                isDiwaliMode
                  ? "bg-white border-[1.5px] border-[#B4683F]/45 text-[#1F272F] placeholder:text-[#909498] focus:border-[#c4620c] focus:ring-2 focus:ring-[#ED7E23]/25"
                  : "bg-[#f8f9fa] border border-gray-200 text-[#333] focus:border-orange-500"
              }`}
            />
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

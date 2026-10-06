"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiwaliCampaignPage from "@/components/DiwaliCampaignPage";

export default function DiwaliPageContent() {
  const [isDiwaliMode, setIsDiwaliMode] = useState(true);

  return (
    <div
      className={`min-h-screen font-sans flex flex-col antialiased bg-[#faf5ea] transition-colors duration-700 relative ${
        isDiwaliMode ? "text-[#1F272F]" : "text-[#0f172a]"
      }`}
    >
      {/* Smooth Festive Background Gradient Crossfade Layer */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ease-in-out z-0 ${
          isDiwaliMode ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(130% 92% at 50% 0%, #ffffff 0%, #F0F3F3 46%, #E8DDD0 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header isDiwaliMode={isDiwaliMode} />
        <DiwaliCampaignPage
          isDiwaliMode={isDiwaliMode}
          setIsDiwaliMode={setIsDiwaliMode}
        />
        <Footer isDiwaliMode={isDiwaliMode} />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiwaliCampaignPage from "@/components/DiwaliCampaignPage";

export default function DiwaliPageContent() {
  const [isDiwaliMode, setIsDiwaliMode] = useState(true);

  return (
    <div
      className={`min-h-screen font-sans flex flex-col antialiased transition-colors duration-300 ${
        isDiwaliMode ? "bg-[#1E1109] text-white" : "bg-[#faf5ea] text-[#0f172a]"
      }`}
    >
      <Header isDiwaliMode={isDiwaliMode} />
      <DiwaliCampaignPage
        isDiwaliMode={isDiwaliMode}
        setIsDiwaliMode={setIsDiwaliMode}
      />
      <Footer isDiwaliMode={isDiwaliMode} />
    </div>
  );
}

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
        isDiwaliMode ? "text-[#1F272F]" : "bg-[#faf5ea] text-[#0f172a]"
      }`}
      style={
        isDiwaliMode
          ? {
              background:
                "radial-gradient(130% 92% at 50% 0%, #ffffff 0%, #F0F3F3 46%, #E8DDD0 100%)",
              backgroundAttachment: "fixed",
            }
          : undefined
      }
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

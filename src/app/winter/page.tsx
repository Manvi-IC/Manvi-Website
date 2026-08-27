import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WinterPage from "@/components/WinterPage";

export const metadata: Metadata = {
  title: "Send Winter Home — Manvi International Courier",
  description:
    "This winter, send warmth to your family abroad. Sweaters, homemade food, dry fruits, blankets and festive gifts — we pick up from your doorstep in India and deliver to their door worldwide, safe and in time for the season.",
  openGraph: {
    title: "Send Winter Home — Manvi International Courier",
    description:
      "This winter, send warmth to your family abroad. Sweaters, homemade food, dry fruits, blankets and festive gifts — we pick up from your doorstep in India and deliver to their door worldwide, safe and in time for the season.",
    url: "https://www.manvicourier.com/winter",
    siteName: "Manvi International Courier",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />
      <WinterPage />
      <Footer />
    </div>
  );
}

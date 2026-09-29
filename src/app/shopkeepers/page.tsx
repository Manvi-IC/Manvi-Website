import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopkeeperPage from "@/components/ShopkeeperPage";

export const metadata: Metadata = {
  title: "Export From India, Shipped Smarter — Manvi International Courier",
  description:
    "Already exporting from India? Manvi picks up from your doorstep, packs export-ready, clears customs and delivers worldwide through DHL, FedEx, UPS & Aramex — often at rates that beat what you pay today. Compare your rate on WhatsApp.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f4eee3] text-[#20293f] font-sans flex flex-col antialiased">
      <Header />
      <ShopkeeperPage />
      <Footer />
    </div>
  );
}

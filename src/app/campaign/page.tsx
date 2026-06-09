import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CampaignPage from "@/components/CampaignPage";

export const metadata = {
  title: "Campaign, Manvi International Courier",
  description:
    "Send your parcel from India to the USA, UK, Canada, Australia and worldwide. Doorstep pickup in Delhi. Customs handled. Real-time tracking.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />
      <CampaignPage />
      <Footer />
    </div>
  );
}
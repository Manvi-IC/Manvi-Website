import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WinterCampaignPage from "@/components/WinterCampaignPage";

export const metadata = {
  title: "Winter Campaign | Manvi International Courier",
  description:
    "Send warm winter care packages, pinnis, dry fruits, and woollens from India to USA, UK, Canada, Australia, and worldwide with express delivery and doorstep pickup.",
};

export default function WinterPage() {
  return (
    <div className="min-h-screen bg-[#faf5ea] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />
      <WinterCampaignPage />
      <Footer />
    </div>
  );
}

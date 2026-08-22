import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiwaliCampaignPage from "@/components/DiwaliCampaignPage";

export const metadata = {
  title: "Diwali Campaign | Manvi International Courier",
  description:
    "Send Diwali sweets, faral, diyas, hampers, and festive gifts from India to USA, UK, Canada, Australia, and worldwide with guaranteed festive delivery.",
};

export default function DiwaliPage() {
  return (
    <div className="min-h-screen bg-[#faf5ea] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />
      <DiwaliCampaignPage />
      <Footer />
    </div>
  );
}

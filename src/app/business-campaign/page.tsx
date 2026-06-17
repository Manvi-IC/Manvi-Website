import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessCampaignPage from "@/components/BusinessCampaignPage";

export const metadata = {
  title: "B2B Sourcing from India, Manvi International Courier",
  description:
    "Source products from India for your business. Delivered worldwide with lowest B2B shipping rates. Customs cleared & hassle-free.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />
      <BusinessCampaignPage />
      <Footer />
    </div>
  );
}

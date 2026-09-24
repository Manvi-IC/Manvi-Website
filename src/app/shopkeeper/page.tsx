import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopkeeperPage from "@/components/ShopkeeperPage";

export const metadata: Metadata = {
  title: "Export From India, Shipped Smarter — Manvi International Courier",
  description:
    "Already exporting from India? Manvi picks up from your doorstep, packs export-ready, clears customs and delivers worldwide through DHL, FedEx, UPS & Aramex — often at rates that beat what you pay today. Compare your rate on WhatsApp.",
  openGraph: {
    title: "Export From India, Shipped Smarter — Manvi International Courier",
    description:
      "Already exporting from India? Manvi picks up from your doorstep, packs export-ready, clears customs and delivers worldwide through DHL, FedEx, UPS & Aramex.",
    url: "https://www.manvicourier.com/shopkeeper",
    siteName: "Manvi International Courier",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Script id="shopkeeper-gclid-cookie" strategy="beforeInteractive">
        {`
          function setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
          }

          function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
          }

          const gclid = getQueryParam('gclid');

          if (gclid) {
            setCookie('gclid_cookie', gclid, 30);
          }
        `}
      </Script>

      <div className="min-h-screen bg-[#f4eee3] text-[#20293f] font-sans flex flex-col antialiased">
        <Header />
        <ShopkeeperPage />
        <Footer />
      </div>

      <Script id="shopkeeper-gclid-populate" strategy="afterInteractive">
        {`
          function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');

            for (let i = 0; i < ca.length; i++) {
              let c = ca[i].trim();
              if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
            }

            return "";
          }

          window.addEventListener('DOMContentLoaded', () => {
            const savedGclid = getCookie('gclid_cookie');

            if (savedGclid) {
              const gclidInput = document.querySelector('input[name*="Google_Click_ID"]')
                || document.querySelector('input[name*="GCLID"]')
                || document.querySelector('input[type="hidden"]');

              if (gclidInput) {
                gclidInput.value = savedGclid;
              }
            }
          });
        `}
      </Script>
    </>
  );
}

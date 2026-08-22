import type { Metadata } from "next";
import { Geist, Geist_Mono, League_Spartan } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://m-website-alpha.vercel.app"),
  title: {
    template: "%s | Manvi International Courier",
    default: "Manvi International Courier",
  },
  description:
    "Reliable and fast international courier & logistics services delivering worldwide including USA, Canada, UK, Europe, and Australia.",
  openGraph: {
    type: "website",
    url: "https://m-website-alpha.vercel.app",
    siteName: "Manvi International Courier",
    images: [
      {
        url: "/opengraph2.png",
        alt: "Manvi International Courier",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-T4NM3C9K";
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-5DBZNCNXBY";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${leagueSpartan.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Manvi International Courier",
              "image": "https://www.manvicourier.com/logo.png",
              "@id": "https://www.manvicourier.com",
              "url": "https://www.manvicourier.com",
              "telephone": "+917070506070",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "C1034, A 2nd Floor, Harijan Basti, Palam Extn, Part-1 Ramphal Chowk",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110045",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.5355,
                "longitude": 77.391
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "10:00",
                "closes": "21:00"
              },
              "sameAs": [
                "https://www.facebook.com/p/Manvi-International-Courier-61575480958807/",
                "https://www.instagram.com/manviinternational/"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
        <LanguageProvider>{children}</LanguageProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
            gtag('config', 'AW-16880308122');
            gtag('config', 'AW-16880308122/Ek21CIif9tccEJqflPE-', {
              'phone_conversion_number': '7070506070'
            });
          `}
        </Script>
      </body>
    </html>
  );
}


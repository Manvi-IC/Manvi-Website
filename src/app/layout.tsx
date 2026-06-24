import type { Metadata } from "next";
import { Geist, Geist_Mono, League_Spartan } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["700"],
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
        // width: 1200,
        // height: 630,
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${leagueSpartan.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
        {(() => {
          const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-5DBZNCNXBY";
          return (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${gaId}');
                `}
              </Script>
            </>
          );
        })()}
      </body>
    </html>
  );
}

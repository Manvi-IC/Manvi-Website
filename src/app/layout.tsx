import type { Metadata } from "next";
import { Geist, Geist_Mono, League_Spartan } from "next/font/google";
import "./globals.css";

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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

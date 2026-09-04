import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nadeemtourandtravels.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NADEEM TOUR & TRAVELS | Visa Assistance, Flights, Hotels & Holiday Packages",
    template: "%s | Nadeem Tour & Travels",
  },
  description:
    "Professional visa assistance for USA, Schengen, Dubai, Saudi Arabia & more — plus flights, hotels and international holiday packages. Your Journey. Our Expertise.",
  keywords: [
    "visa assistance",
    "USA visa",
    "Schengen visa",
    "Dubai visa",
    "flight booking",
    "holiday packages",
    "Nadeem Tour and Travels",
  ],
  openGraph: {
    type: "website",
    siteName: "Nadeem Tour & Travels",
    title: "NADEEM TOUR & TRAVELS — Your Journey. Our Expertise.",
    description:
      "Professional assistance for visa applications, travel planning, flights, hotels and international journeys.",
  },
};

export const viewport: Viewport = {
  themeColor: "#060d1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-navy-950 font-sans text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}

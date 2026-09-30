import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { StoreProvider } from "@/context/StoreProvider";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://naturaa.demo"),
  title: {
    default: "Naturaa — Organic Botanical Hair & Skincare",
    template: "%s · Naturaa",
  },
  description:
    "Premium organic, plant-based haircare and skincare made with natural ingredients. Clean, cruelty-free, and dermatologically tested.",
  keywords: [
    "organic",
    "botanical",
    "natural haircare",
    "skincare",
    "herbal",
    "cruelty-free",
  ],
  openGraph: {
    title: "Naturaa — Organic Botanical Hair & Skincare",
    description:
      "Premium organic, plant-based haircare and skincare made with natural ingredients.",
    type: "website",
    siteName: "Naturaa",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

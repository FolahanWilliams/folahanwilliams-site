import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { seo } from "@/content/content";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  // NOTE: do NOT pass `axes: ["opsz", ...]` — `opsz` is a DEFAULT axis for
  // Fraunces in next/font/google and listing it throws at build
  // ("opsz is a default axis, cannot be configured"). Omitting `axes`
  // gives the full variable range, which is all we need (weight is set in CSS).
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: "%s · Folahan Williams",
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: "Folahan Williams",
  authors: [{ name: "Folahan Williams", url: seo.siteUrl }],
  creator: "Folahan Williams",
  publisher: "Folahan Williams",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: seo.siteUrl,
    siteName: "Folahan Williams",
    title: seo.title,
    description: seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { content } from "@/content/content";
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
  metadataBase: new URL("https://folahanwilliams.vercel.app"),
  title: "Folahan Williams",
  description: content.heroLine.replace(/\s*\[DRAFT[^\]]*\]/g, ""), // marker-agnostic strip
  openGraph: { title: "Folahan Williams", description: "How people think and decide.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

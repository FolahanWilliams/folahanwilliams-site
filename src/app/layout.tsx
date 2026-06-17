import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
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
  title: "Folahan Williams",
  description: "I'm fascinated by how people think and decide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

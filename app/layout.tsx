import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jb = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://techwiredsolutions.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Techwired Solutions — a journey through what we build",
    template: "%s · Techwired Solutions",
  },
  description:
    "Techwired Solutions is a technology company that builds and runs its own products — Linkypot, Krisearch, Gharbari — and ships for a few clients each year.",
  keywords: [
    "Techwired Solutions",
    "technology company",
    "product studio",
    "Linkypot",
    "Krisearch",
    "Gharbari",
  ],
  authors: [{ name: "Techwired Solutions" }],
  creator: "Techwired Solutions",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Techwired Solutions",
    title: "Techwired Solutions",
    description: "A technology company that builds and runs its own products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Techwired Solutions",
    description: "A technology company that builds and runs its own products.",
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${hanken.variable} ${jb.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}

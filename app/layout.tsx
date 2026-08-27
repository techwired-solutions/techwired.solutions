import type { Metadata } from "next";
import { Inter, Anton, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://techwiredsolutions.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Techwired Solutions — a technology company from Kathmandu",
    template: "%s · Techwired Solutions",
  },
  description:
    "Techwired Solutions is a Nepal-based technology company. We design, build, and operate our own products — Linkypot, Krisearch, Gharbari — and ship digital products for a handful of clients.",
  keywords: [
    "Techwired Solutions",
    "technology company Nepal",
    "venture studio Kathmandu",
    "web development Nepal",
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
    title: "Techwired Solutions — a technology company from Kathmandu",
    description:
      "We design, build, and operate our own products — and ship digital products for a handful of clients.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Techwired Solutions",
    description:
      "A Nepal-based technology company building its own products and shipping for clients.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${anton.variable} ${caveat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

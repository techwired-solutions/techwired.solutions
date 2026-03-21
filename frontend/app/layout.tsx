import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techwired Solutions — Powering Your Digital Future",
  description: "Nepal-based full-service digital agency providing web development, mobile apps, domain registration, hosting, graphics design, branding, video creation, social media marketing, SEO, and complete digital transformation services.",
  keywords: ["web development", "mobile apps", "digital agency", "Nepal", "hosting", "branding", "SEO", "social media marketing"],
  authors: [{ name: "Techwired Solutions" }],
  openGraph: {
    title: "Techwired Solutions — Powering Your Digital Future",
    description: "Complete digital solutions from domain to deployment",
    type: "website",
  },
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

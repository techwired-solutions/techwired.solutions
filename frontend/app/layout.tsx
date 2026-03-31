import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Techwired Solutions — Powering Your Digital Future",
  description:
    "Nepal-based full-service digital agency providing web development, mobile apps, domain registration, hosting, graphics design, branding, video creation, social media marketing, SEO, and complete digital transformation services.",
  keywords: [
    "web development", "mobile apps", "digital agency", "Nepal",
    "hosting", "branding", "SEO", "social media marketing",
  ],
  authors: [{ name: "Techwired Solutions" }],
  openGraph: {
    title: "Techwired Solutions — Powering Your Digital Future",
    description: "Complete digital solutions from domain to deployment",
    type: "website",
  },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.variable} ${syne.variable} antialiased bg-[#0A0A0F] text-[#F1F5F9]`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

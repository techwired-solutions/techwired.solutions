import type { LucideIcon } from "lucide-react";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";

export const site = {
  name: "Techwired Solutions",
  domain: "techwiredsolutions.com.np",
  email: "hello@techwiredsolutions.com.np",
  github: "https://github.com/techwired-solutions",
  founder: "Sudip Parajuli",
  tagline: "We build and run our own products.",
};

export const nav = [
  { label: "Products", href: "#products" },
  { label: "Approach", href: "#approach" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

/* ---- Hero: one sky, four times of day (a re-light, not a new photo) --- */

export type ModeId = "sunrise" | "day" | "sunset" | "night";

export type Mode = {
  id: ModeId;
  label: string;
  icon: LucideIcon;
  /* CSS filter applied to the single sky image */
  filter: string;
  /* extra wash laid over the sky */
  wash: string;
  /* light colour fed to the 3D glass */
  light: string;
  /* ambient colour fed to the 3D glass */
  ambient: string;
};

export const modes: Mode[] = [
  {
    id: "sunrise",
    label: "Sunrise",
    icon: Sunrise,
    filter: "saturate(1.05) hue-rotate(-14deg) brightness(1.02) contrast(1.02)",
    wash: "linear-gradient(180deg, rgba(80,60,110,0.24) 0%, rgba(255,214,170,0.10) 40%, rgba(255,200,160,0.16) 100%)",
    light: "#ffd9b8",
    ambient: "#8a93c4",
  },
  {
    id: "day",
    label: "Day",
    icon: Sun,
    filter: "saturate(1.14) contrast(1.05)",
    wash: "linear-gradient(180deg, rgba(20,40,80,0.14) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 64%, rgba(66,97,136,0.20) 100%)",
    light: "#ffffff",
    ambient: "#bcd0ea",
  },
  {
    id: "sunset",
    label: "Sunset",
    icon: Sunset,
    filter: "saturate(1.4) hue-rotate(-30deg) brightness(0.92) contrast(1.08)",
    wash: "linear-gradient(180deg, rgba(60,20,70,0.34) 0%, rgba(255,120,40,0.16) 50%, rgba(120,40,90,0.30) 100%)",
    light: "#ff9d5c",
    ambient: "#7a4b6e",
  },
  {
    id: "night",
    label: "Night",
    icon: Moon,
    filter: "saturate(0.5) brightness(0.34) contrast(1.12) hue-rotate(8deg)",
    wash: "linear-gradient(180deg, rgba(10,20,50,0.45), rgba(4,10,30,0.60))",
    light: "#8fb3ff",
    ambient: "#26325c",
  },
];

/* ---- Products (the focus) ---------------------------------------- */

export type Product = {
  name: string;
  tag: string;
  blurb: string;
  href: string;
  hrefLabel: string;
  image: string;
};

export const products: Product[] = [
  {
    name: "Linkypot",
    tag: "Digital business cards",
    blurb:
      "One QR code that replaces every link a business hands a customer — menu, reviews, contact, socials, Wi-Fi. Works on any phone, no app to install.",
    href: "https://linkypot.com",
    hrefLabel: "linkypot.com",
    image: "/images/work/linkypot.jpg",
  },
  {
    name: "Krisearch",
    tag: "Agriculture community",
    blurb:
      "A knowledge and community platform for Nepali farmers — verified crop advice, tools, local prices, and answers from people who actually farm.",
    href: "https://krisearch.vercel.app",
    hrefLabel: "krisearch.vercel.app",
    image: "/images/work/krisearch.jpg",
  },
  {
    name: "Gharbari",
    tag: "Real estate",
    blurb:
      "A neighborly way to connect buyers, renters, and owners — post what you're looking for, or the place you have, without the noise of listing portals.",
    href: "https://gharbari-coral.vercel.app",
    hrefLabel: "gharbari-coral.vercel.app",
    image: "/images/work/gharbari.jpg",
  },
];

/* Product names loop under the hero */
export const roster = products.map((p) => p.name);

/* ---- Approach (glass steps) ------------------------------------- */

export const approach: { k: string; title: string; body: string }[] = [
  {
    k: "01",
    title: "Build",
    body: "We start our own products from a real problem and ship the first version fast — design, engineering, and infrastructure in one team.",
  },
  {
    k: "02",
    title: "Run",
    body: "Launch is the start. We operate what we build — support, uptime, iteration — so the product keeps earning its place.",
  },
  {
    k: "03",
    title: "Grow",
    body: "Analytics, technical SEO, and performance work that compounds. The unglamorous part that decides whether a product lasts.",
  },
];

/* ---- Client work (low emphasis strip) -------------------------- */

export type WorkItem = {
  name: string;
  tag: string;
  href: string;
  hrefLabel: string;
};

export const work: WorkItem[] = [
  {
    name: "EasyMoto",
    tag: "Motorbike rental platform",
    href: "https://easymoto.com.np",
    hrefLabel: "easymoto.com.np",
  },
  {
    name: "ChillPill Gaming Cafe",
    tag: "PlayStation cafe site & owner console",
    href: "https://chillpill-gaming-cafe.vercel.app",
    hrefLabel: "chillpill-gaming-cafe.vercel.app",
  },
  {
    name: "Amicus Institute of Law",
    tag: "Law school website",
    href: "https://amicus.com.np",
    hrefLabel: "amicus.com.np",
  },
  {
    name: "Aryal Farm",
    tag: "Farm-to-business dairy supply",
    href: "https://aryalfarm.com.np",
    hrefLabel: "aryalfarm.com.np",
  },
];

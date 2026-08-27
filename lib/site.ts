import type { LucideIcon } from "lucide-react";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";

export const site = {
  name: "Techwired Solutions",
  domain: "techwiredsolutions.com.np",
  email: "hello@techwiredsolutions.com.np",
  github: "https://github.com/techwired-solutions",
  founder: "Sudip Parajuli",
  tagline: "A technology company that builds and runs its own products.",
};

export const nav = [
  { label: "Products", href: "#products" },
  { label: "Approach", href: "#approach" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

/* ---- Hero sky modes (time of day) ---------------------------------- */

export type ModeId = "sunrise" | "day" | "sunset" | "night";

export const modes: {
  id: ModeId;
  label: string;
  icon: LucideIcon;
  image: string;
  /* nav / hero foreground tint while this sky is active */
  fg: string;
  /* eyebrow + accents over the sky */
  accent: string;
}[] = [
  {
    id: "sunrise",
    label: "Sunrise",
    icon: Sunrise,
    image: "/images/sky/sunrise.jpg",
    fg: "#1b1b1b",
    accent: "#7c5f8f",
  },
  {
    id: "day",
    label: "Day",
    icon: Sun,
    image: "/images/sky/day.jpg",
    fg: "#1b1b1b",
    accent: "#2b6cb0",
  },
  {
    id: "sunset",
    label: "Sunset",
    icon: Sunset,
    image: "/images/sky/sunset.jpg",
    fg: "#ffffff",
    accent: "#ffd9b0",
  },
  {
    id: "night",
    label: "Night",
    icon: Moon,
    image: "/images/sky/night.jpg",
    fg: "#ffffff",
    accent: "#9db8e8",
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

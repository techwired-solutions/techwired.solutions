import type { LucideIcon } from "lucide-react";
import { Boxes, Globe, Shapes, LineChart } from "lucide-react";

export const site = {
  name: "Techwired Solutions",
  domain: "techwiredsolutions.com.np",
  email: "hello@techwiredsolutions.com.np",
  location: "Kathmandu, Nepal",
  github: "https://github.com/techwired-solutions",
  founder: "Sudip Parajuli",
};

export const nav = [
  { label: "Companies", href: "#companies" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* Wordmarks for the quiet marquee under the hero */
export const roster = [
  "Linkypot",
  "Krisearch",
  "Gharbari",
  "EasyMoto",
  "ChillPill",
  "Amicus",
  "Aryal Farm",
];

export type Capability = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const capabilities: Capability[] = [
  {
    title: "Product studio",
    body: "We build and run our own products end to end — research, design, engineering, infrastructure, and the growth work that keeps them alive.",
    icon: Boxes,
  },
  {
    title: "Client websites & apps",
    body: "Marketing sites, web apps, and booking platforms for businesses that need something considered, fast, and easy to maintain.",
    icon: Globe,
  },
  {
    title: "Brand & interface",
    body: "Identity, design systems, and interfaces — the difference between software that works and software that feels finished.",
    icon: Shapes,
  },
  {
    title: "Growth & SEO",
    body: "Technical SEO, analytics, performance budgets, and the unglamorous work that compounds long after launch.",
    icon: LineChart,
  },
];

export type Venture = {
  name: string;
  tag: string;
  blurb: string;
  href: string;
  hrefLabel: string;
  image: string;
};

export const ventures: Venture[] = [
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
      "A neighborly way to connect buyers, renters, and owners — post what you are looking for, or the place you have, without the noise of listing portals.",
    href: "https://gharbari-coral.vercel.app",
    hrefLabel: "gharbari-coral.vercel.app",
    image: "/images/work/gharbari.jpg",
  },
];

export type WorkItem = {
  name: string;
  tag: string;
  href: string | null;
  hrefLabel: string;
  image: string;
};

export const work: WorkItem[] = [
  {
    name: "EasyMoto",
    tag: "Motorbike rental platform",
    href: "https://easymoto.com.np",
    hrefLabel: "easymoto.com.np",
    image: "/images/work/easymoto.jpg",
  },
  {
    name: "ChillPill Gaming Cafe",
    tag: "PlayStation cafe site & owner console",
    href: "https://chillpillgamingcafe.vercel.app",
    hrefLabel: "chillpillgamingcafe.vercel.app",
    image: "/images/work/chillpill.jpg",
  },
  {
    name: "Amicus Institute of Law",
    tag: "Law school website",
    href: "https://amicus.com.np",
    hrefLabel: "amicus.com.np",
    image: "/images/work/amicus.jpg",
  },
  {
    name: "Aryal Farm",
    tag: "Farm-to-business dairy supply",
    href: "https://aryalfarm.com.np",
    hrefLabel: "aryalfarm.com.np",
    image: "/images/work/aryalfarm.jpg",
  },
];

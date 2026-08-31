export const site = {
  name: "Techwired Solutions",
  domain: "techwiredsolutions.com.np",
  email: "hello@techwiredsolutions.com.np",
  github: "https://github.com/techwired-solutions",
  founder: "Sudip Parajuli",
  tagline: "We build and run our own products.",
};

export type Product = {
  name: string;
  tag: string;
  blurb: string;
  forWhom: string;
  why: string;
  href: string;
  hrefLabel: string;
  shot: string;
  aura: string;
};

export const products: Product[] = [
  {
    name: "Linkypot",
    tag: "Digital business cards",
    blurb:
      "One QR code that replaces every link a business hands a customer — menu, reviews, contact, socials, Wi-Fi. Works on any phone, no app to install.",
    forWhom:
      "Cafés, salons, clinics, shops — any small business with a counter and a wall covered in QR codes.",
    why: "Owners were printing five different codes and taping them up. Linkypot is one code, one page, editable from your phone — so the code on the wall never goes stale.",
    href: "https://linkypot.com",
    hrefLabel: "linkypot.com",
    shot: "/images/work/linkypot.jpg",
    aura: "/journey/auras/linkypot.jpg",
  },
  {
    name: "Krisearch",
    tag: "Agriculture community",
    blurb:
      "A knowledge and community platform for Nepali farmers — verified crop advice, tools, local prices, and answers from people who actually farm.",
    forWhom:
      "Smallholder farmers across Nepal, and the extension workers and agronomists who support them.",
    why: "Good crop advice was trapped in Facebook groups and paid consultants. Krisearch puts it in one place, in Nepali, answered by people who work the land.",
    href: "https://krisearch.vercel.app",
    hrefLabel: "krisearch.vercel.app",
    shot: "/images/work/krisearch.jpg",
    aura: "/journey/auras/krisearch.jpg",
  },
  {
    name: "Gharbari",
    tag: "Real estate, without the noise",
    blurb:
      "A neighborly way to connect buyers, renters, and owners — post what you're looking for, or the place you have, without the noise of listing portals.",
    forWhom:
      "Anyone renting, buying, or letting a home — especially people priced out of the big listing sites.",
    why: "Listing portals reward whoever pays for placement. Gharbari just connects the person looking with the person who has it, and stays out of the way.",
    href: "https://gharbari-coral.vercel.app",
    hrefLabel: "gharbari-coral.vercel.app",
    shot: "/images/work/gharbari.jpg",
    aura: "/journey/auras/gharbari.jpg",
  },
];

export type WorkItem = { name: string; tag: string; href: string };

export const work: WorkItem[] = [
  { name: "EasyMoto", tag: "Motorbike rental platform", href: "https://easymoto.com.np" },
  {
    name: "ChillPill Gaming Cafe",
    tag: "PlayStation cafe site & owner console",
    href: "https://chillpill-gaming-cafe.vercel.app",
  },
  { name: "Amicus Institute of Law", tag: "Law school website", href: "https://amicus.com.np" },
  { name: "Aryal Farm", tag: "Farm-to-business dairy supply", href: "https://aryalfarm.com.np" },
];

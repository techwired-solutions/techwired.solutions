import { products, work } from "@/lib/site";

/* Positioned by the global scroll progress var `--s` (0..1).
   `range` = [fadeInStart, fullyIn, startFadeOut, fullyOut].
   Ranges overlap so there is no dead air between beats. */

export type Beat =
  | { kind: "tagline"; range: [number, number, number, number]; text: string }
  | {
      kind: "statement";
      range: [number, number, number, number];
      lines: string[];
      emphasis?: string;
      align?: "center" | "left";
    }
  | {
      kind: "product";
      range: [number, number, number, number];
      index: 0 | 1 | 2;
      side: "left" | "right";
    }
  | { kind: "steps"; range: [number, number, number, number] }
  | { kind: "stats"; range: [number, number, number, number] }
  | { kind: "list"; range: [number, number, number, number] };

export const beats: Beat[] = [
  {
    kind: "tagline",
    range: [0.02, 0.045, 0.085, 0.115],
    text: "A pulse of light, sent to build something.",
  },
  {
    kind: "statement",
    range: [0.105, 0.145, 0.2, 0.235],
    lines: ["Everything", "starts as", "a signal"],
    emphasis: "signal",
  },
  {
    kind: "statement",
    range: [0.235, 0.275, 0.32, 0.35],
    lines: ["We make", "the things", "we believe in"],
    emphasis: "believe",
  },
  {
    kind: "stats",
    range: [0.345, 0.375, 0.415, 0.44],
  },
  {
    kind: "product",
    range: [0.4, 0.435, 0.465, 0.49],
    index: 0,
    side: "right",
  },
  {
    kind: "product",
    range: [0.49, 0.525, 0.555, 0.58],
    index: 1,
    side: "left",
  },
  {
    kind: "product",
    range: [0.585, 0.62, 0.65, 0.675],
    index: 2,
    side: "right",
  },
  {
    kind: "steps",
    range: [0.675, 0.71, 0.75, 0.775],
  },
  {
    kind: "list",
    range: [0.775, 0.81, 0.85, 0.878],
  },
  {
    kind: "statement",
    range: [0.875, 0.915, 0.965, 0.992],
    lines: ["Software", "we're proud", "to keep", "our name on"],
    emphasis: "proud",
    align: "left",
  },
  {
    kind: "tagline",
    range: [0.965, 0.99, 1, 1],
    text: "The signal comes to rest.",
  },
];

export const steps = [
  {
    k: "01",
    title: "Build",
    body: "We start from a real problem and ship the first version fast — design, engineering, and infrastructure in one team.",
  },
  {
    k: "02",
    title: "Run",
    body: "Launch is the start. We operate what we build — support, uptime, iteration — so the product keeps earning its place.",
  },
  {
    k: "03",
    title: "Grow",
    body: "Analytics, technical SEO, and the unglamorous work that compounds — the part that decides whether a product lasts.",
  },
];

export const stats = [
  { n: "3", label: "products in market" },
  { n: "4+", label: "client launches" },
  { n: "100%", label: "built & run remotely" },
];

export const chapters = [
  { at: 0.0, no: "01", name: "Ignition" },
  { at: 0.11, no: "02", name: "The Wire" },
  { at: 0.23, no: "03", name: "Breakthrough" },
  { at: 0.35, no: "04", name: "Linkypot" },
  { at: 0.46, no: "05", name: "Krisearch" },
  { at: 0.57, no: "06", name: "Gharbari" },
  { at: 0.675, no: "07", name: "The Constellation" },
  { at: 0.79, no: "08", name: "The Horizon" },
  { at: 0.9, no: "09", name: "Arrival" },
];

export { products, work };

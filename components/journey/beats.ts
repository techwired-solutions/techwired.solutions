import { products, work } from "@/lib/site";

/* Positioned by the global scroll progress var `--s` (0..1).
   `range` = [fadeInStart, fullyIn, startFadeOut, fullyOut].
   Ranges are tuned so beats overlap slightly — never dead air, never two
   full-screen statements on top of each other. */

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
  | { kind: "list"; range: [number, number, number, number] }
  | { kind: "community"; range: [number, number, number, number] };

export const beats: Beat[] = [
  {
    kind: "tagline",
    range: [0.02, 0.045, 0.085, 0.115],
    text: "We build software — then we run it.",
  },
  {
    kind: "statement",
    range: [0.105, 0.145, 0.2, 0.235],
    lines: ["Everything", "starts as", "a signal"],
    emphasis: "signal",
  },
  {
    kind: "statement",
    range: [0.235, 0.275, 0.315, 0.345],
    lines: ["We make", "the things", "we believe in"],
    emphasis: "believe",
  },
  {
    kind: "stats",
    range: [0.335, 0.365, 0.395, 0.415],
  },
  {
    kind: "product",
    range: [0.385, 0.42, 0.47, 0.495],
    index: 0,
    side: "right",
  },
  {
    kind: "product",
    range: [0.495, 0.53, 0.575, 0.6],
    index: 1,
    side: "left",
  },
  {
    kind: "product",
    range: [0.6, 0.635, 0.675, 0.7],
    index: 2,
    side: "right",
  },
  {
    kind: "steps",
    range: [0.695, 0.73, 0.765, 0.79],
  },
  {
    kind: "list",
    range: [0.785, 0.815, 0.84, 0.86],
  },
  {
    kind: "statement",
    range: [0.85, 0.88, 0.905, 0.925],
    lines: ["Software", "we're proud", "to keep", "our name on"],
    emphasis: "proud",
    align: "left",
  },
  {
    kind: "community",
    range: [0.92, 0.95, 0.985, 0.998],
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
  { at: 0.105, no: "02", name: "The Wire" },
  { at: 0.235, no: "03", name: "Breakthrough" },
  { at: 0.37, no: "04", name: "Linkypot" },
  { at: 0.49, no: "05", name: "Krisearch" },
  { at: 0.595, no: "06", name: "Gharbari" },
  { at: 0.69, no: "07", name: "The Constellation" },
  { at: 0.83, no: "08", name: "The Horizon" },
  { at: 0.915, no: "09", name: "Arrival" },
];

export { products, work };

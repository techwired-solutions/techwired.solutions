import { products, work } from "@/lib/site";

/* Positioned by the global scroll progress var `--s` (0..1).
   `range` = [fadeInStart, fullyIn, startFadeOut, fullyOut].
   Ranges are sequential — one beat finishes before the next begins. */

export type Beat =
  | { kind: "intro"; range: [number, number, number, number] }
  | {
      kind: "statement";
      range: [number, number, number, number];
      lines: string[];
      emphasis?: string;
      align?: "center" | "left";
    }
  | { kind: "pillars"; range: [number, number, number, number] }
  | { kind: "steps"; range: [number, number, number, number] }
  | { kind: "capability"; range: [number, number, number, number] }
  | {
      kind: "product";
      range: [number, number, number, number];
      index: 0 | 1 | 2;
      side: "left" | "right";
    }
  | { kind: "list"; range: [number, number, number, number] };

export const beats: Beat[] = [
  { kind: "intro", range: [0.035, 0.07, 0.12, 0.15] },
  { kind: "pillars", range: [0.15, 0.175, 0.42, 0.445] },
  { kind: "steps", range: [0.42, 0.455, 0.5, 0.525] },
  { kind: "capability", range: [0.52, 0.55, 0.615, 0.64] },
  { kind: "product", range: [0.635, 0.67, 0.715, 0.74], index: 0, side: "right" },
  { kind: "product", range: [0.74, 0.775, 0.82, 0.845], index: 1, side: "left" },
  { kind: "product", range: [0.845, 0.88, 0.915, 0.935], index: 2, side: "right" },
  { kind: "list", range: [0.93, 0.95, 0.968, 0.978] },
  {
    kind: "statement",
    range: [0.972, 0.99, 1.0, 1.0],
    lines: ["Software", "we're proud", "to keep", "our name on"],
    emphasis: "proud",
    align: "left",
  },
];

export const pillars = [
  {
    word: "Understand",
    body: "Every product starts from a problem we have felt ourselves — not a gap on a slide. We build the thing we wished already existed, then check it against real people early.",
  },
  {
    word: "Build",
    body: "One small team doing design, engineering, and infrastructure together. A real first version in weeks, not quarters — rough where it can be, solid where it counts.",
  },
  {
    word: "Run",
    body: "Launch is the beginning. We operate what we ship — uptime, support, the slow iteration that turns a release into a product people keep coming back to.",
  },
  {
    word: "Grow",
    body: "Analytics, technical SEO, performance budgets — the quiet, compounding work that decides whether a product is still useful two years from now.",
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

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Supabase",
  "Prisma",
  "Vercel",
  "Cloudflare",
  "Framer Motion",
  "Figma",
];

export const chapters = [
  { at: 0.0, no: "01", name: "Ignition" },
  { at: 0.1, no: "02", name: "The Wire" },
  { at: 0.15, no: "03", name: "The Method" },
  { at: 0.43, no: "04", name: "How We Work" },
  { at: 0.635, no: "05", name: "Linkypot" },
  { at: 0.74, no: "06", name: "Krisearch" },
  { at: 0.845, no: "07", name: "Gharbari" },
  { at: 0.93, no: "08", name: "The Constellation" },
  { at: 0.97, no: "09", name: "Arrival" },
];

export { products, work };

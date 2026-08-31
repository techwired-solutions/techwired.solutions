import { products, work } from "@/lib/site";

/* Positioned by the global scroll progress var `--s` (0..1).
   `range` = [fadeInStart, fullyIn, startFadeOut, fullyOut]. Ranges overlap
   slightly so there is never dead air and never two full-screen headlines. */

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
  | {
      kind: "product";
      range: [number, number, number, number];
      index: 0 | 1 | 2;
      side: "left" | "right";
    }
  | { kind: "stats"; range: [number, number, number, number] }
  | { kind: "stack"; range: [number, number, number, number] }
  | { kind: "list"; range: [number, number, number, number] }
  | { kind: "community"; range: [number, number, number, number] };

export const beats: Beat[] = [
  { kind: "intro", range: [0.035, 0.07, 0.125, 0.155] },
  {
    kind: "statement",
    range: [0.15, 0.185, 0.225, 0.25],
    lines: ["We make", "the things", "we believe in"],
    emphasis: "believe",
  },
  { kind: "pillars", range: [0.25, 0.275, 0.47, 0.49] },
  { kind: "stats", range: [0.485, 0.51, 0.54, 0.56] },
  { kind: "product", range: [0.555, 0.59, 0.635, 0.66], index: 0, side: "right" },
  { kind: "product", range: [0.66, 0.695, 0.74, 0.765], index: 1, side: "left" },
  { kind: "product", range: [0.765, 0.8, 0.845, 0.87], index: 2, side: "right" },
  { kind: "stack", range: [0.865, 0.89, 0.915, 0.93] },
  { kind: "list", range: [0.925, 0.945, 0.965, 0.978] },
  { kind: "community", range: [0.955, 0.975, 0.997, 1.0] },
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
  { at: 0.22, no: "03", name: "Breakthrough" },
  { at: 0.36, no: "04", name: "The Method" },
  { at: 0.55, no: "05", name: "Linkypot" },
  { at: 0.66, no: "06", name: "Krisearch" },
  { at: 0.765, no: "07", name: "Gharbari" },
  { at: 0.87, no: "08", name: "The Horizon" },
  { at: 0.955, no: "09", name: "Arrival" },
];

export { products, work };

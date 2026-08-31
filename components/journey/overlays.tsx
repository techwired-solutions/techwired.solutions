"use client";

import Image from "next/image";
import {
  beats,
  pillars,
  stats,
  stack,
  products,
  work,
  type Beat,
} from "./beats";
/* --- CSS math driven by the global `--s` (0..1) --------------------- */
const inRange = (a: number, b: number) =>
  `clamp(0, calc((var(--s,0) - ${a}) / ${Math.max(b - a, 0.0001).toFixed(4)}), 1)`;
const outRange = (c: number, d: number) => `calc(1 - ${inRange(c, d)})`;
const win = (a: number, b: number, c: number, d: number) =>
  `min(${inRange(a, b)}, ${outRange(c, d)})`;
const winR = ([a, b, c, d]: number[]) => win(a, b, c, d);
const rise = ([a, b, c, d]: number[], px = 42) =>
  `translateY(calc((1 - ${inRange(a, b)}) * ${px}px - ${inRange(c, d)} * ${px}px))`;
const soften = ([a, b]: number[]) =>
  `blur(calc((1 - ${inRange(a, b)}) * 6px))`;
const lineRise = ([a, b]: number[], i: number, n: number) => {
  const span = b - a;
  const lo = a + span * (i / (n + 1));
  const hi = a + span * ((i + 2) / (n + 1));
  return `translateY(calc((1 - ${inRange(lo, hi)}) * 120%))`;
};

export function BeatLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      {beats.map((beat, i) => (
        <BeatView key={i} beat={beat} />
      ))}
    </div>
  );
}

function Emph({ line, word }: { line: string; word?: string }) {
  if (!word || !line.toLowerCase().includes(word.toLowerCase())) return <>{line}</>;
  return (
    <>
      {line.split(new RegExp(`(${word})`, "i")).map((chunk, ci) =>
        chunk.toLowerCase() === word.toLowerCase() ? (
          <em key={ci}>{chunk}</em>
        ) : (
          <span key={ci}>{chunk}</span>
        ),
      )}
    </>
  );
}

function BeatView({ beat }: { beat: Beat }) {
  const r = beat.range;

  if (beat.kind === "intro") {
    return (
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 44% at 50% 50%, rgba(6,9,20,0.82), rgba(6,9,20,0) 100%)",
            opacity: winR(r),
          }}
        />
        <div
          className="relative flex max-w-[880px] flex-col items-center gap-6 text-center"
          style={{ opacity: winR(r), transform: rise(r, 34) }}
        >
          <span className="u-mono text-[11px] tracking-[0.34em] text-teal">
            Techwired Solutions
          </span>
          <p className="text-[clamp(1.5rem,4.4vw,2.9rem)] font-medium leading-[1.16] text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]">
            A technology company that designs, builds, and{" "}
            <span className="text-teal">runs its own software</span>.
          </p>
          <p className="max-w-[52ch] text-[14px] leading-[1.65] text-muted">
            Linkypot, Krisearch and Gharbari are ours — built from problems we
            felt, and kept running long after launch. A few client projects each
            year are the exception, not the business.
          </p>
        </div>
      </div>
    );
  }

  if (beat.kind === "statement") {
    const left = beat.align === "left";
    const n = beat.lines.length;
    return (
      <div
        className={
          "absolute inset-0 flex flex-col justify-center px-6 sm:px-14 " +
          (left ? "items-start" : "items-center text-center")
        }
      >
        <div
          className="absolute inset-0"
          style={{
            background: left
              ? "linear-gradient(90deg, rgba(6,9,20,0.88), rgba(6,9,20,0.3) 52%, rgba(6,9,20,0) 82%)"
              : "radial-gradient(64% 52% at 50% 50%, rgba(6,9,20,0.84), rgba(6,9,20,0.12) 78%, rgba(6,9,20,0) 100%)",
            opacity: winR(r),
          }}
        />
        <h2
          className="relative u-poster text-[clamp(2.8rem,11.5vw,9rem)] text-ink [text-shadow:0_4px_44px_rgba(0,0,0,0.55)]"
          style={{
            opacity: outRange(r[2], r[3]),
            transform: `translateY(calc(${inRange(r[2], r[3])} * -44px))`,
            filter: soften(r),
          }}
        >
          {beat.lines.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.06em] leading-[0.98]">
              <span
                className="block will-change-transform"
                style={{ transform: lineRise(r, li, n) }}
              >
                <Emph line={line} word={beat.emphasis} />
              </span>
            </span>
          ))}
        </h2>
      </div>
    );
  }

  if (beat.kind === "pillars") {
    const [, B, C] = r;
    const n = pillars.length;
    const span = C - B;
    return (
      <div className="absolute inset-0">
        {pillars.map((p, i) => {
          const s0 = B + span * (i / n);
          const s1 = B + span * ((i + 1) / n);
          const L = (t0: number, t1: number) =>
            inRange(s0 + (s1 - s0) * t0, s0 + (s1 - s0) * t1);
          return (
            <div
              key={p.word}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center sm:gap-10"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(66% 58% at 50% 50%, rgba(6,9,20,0.88), rgba(6,9,20,0.12) 82%, rgba(6,9,20,0) 100%)",
                  opacity: `min(${L(0, 0.1)}, calc(1 - ${L(0.9, 1)}))`,
                }}
              />
              {/* WORD — holds at centre, then rises up and fades away */}
              <span
                className="relative u-poster text-[clamp(3rem,13vw,10rem)] leading-none text-ink [text-shadow:0_4px_44px_rgba(0,0,0,0.5)]"
                style={{
                  opacity: `min(${L(0, 0.08)}, calc(1 - ${L(0.5, 0.8)}))`,
                  transform: `translateY(calc(${L(0.26, 0.82)} * -32vh))`,
                  willChange: "transform, opacity",
                }}
              >
                {p.word}
              </span>
              {/* PARAGRAPH — pops in from depth, below where the word was */}
              <p
                className="relative max-w-[36ch] text-[clamp(1.05rem,2.5vw,1.55rem)] font-medium leading-[1.4] text-ink [text-shadow:0_2px_28px_rgba(0,0,0,0.72)]"
                style={{
                  opacity: `min(${L(0.3, 0.52)}, calc(1 - ${L(0.85, 1)}))`,
                  transform: `translateY(calc((1 - ${L(0.3, 0.54)}) * 8vh + ${L(0.85, 1)} * -20vh)) scale(calc(0.55 + ${L(0.3, 0.54)} * 0.45))`,
                  filter: `blur(calc((1 - ${L(0.3, 0.52)}) * 16px))`,
                  willChange: "transform, opacity, filter",
                }}
              >
                {p.body}
              </p>
              <span
                className="relative u-mono text-[10px] tracking-[0.28em] text-teal"
                style={{ opacity: `min(${L(0, 0.16)}, calc(1 - ${L(0.86, 1)}))` }}
              >
                {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  if (beat.kind === "capability") {
    const row = [...stack, ...stack];
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 sm:gap-16">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,9,20,0.7), rgba(6,9,20,0.84))",
            opacity: winR(r),
          }}
        />
        <div
          className="relative flex flex-col items-center gap-7 sm:flex-row sm:gap-16"
          style={{
            opacity: winR(r),
            transform: rise([r[0], r[1], r[2], r[3]], 24),
          }}
        >
          {stats.map((st) => (
            <div key={st.label} className="flex flex-col items-center gap-1 text-center">
              <span className="u-poster text-[clamp(2.8rem,7.5vw,5.5rem)] text-ink [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
                {st.n}
              </span>
              <span className="u-mono text-[10px] tracking-[0.16em] text-teal">
                {st.label}
              </span>
            </div>
          ))}
        </div>

        <div className="relative flex w-full flex-col items-center gap-5">
          <span
            className="u-mono text-[10px] tracking-[0.3em] text-white/55"
            style={{ opacity: winR([r[0] + 0.01, r[1] + 0.01, r[2], r[3]]) }}
          >
            What we build with
          </span>
          <div
            className="w-full overflow-hidden"
            style={{
              opacity: winR([r[0] + 0.01, r[1] + 0.01, r[2], r[3]]),
              maskImage:
                "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
            }}
          >
            <ul className="marquee-track flex w-max items-center gap-12 whitespace-nowrap pr-12">
              {row.map((tech, i) => (
                <li
                  key={`${tech}-${i}`}
                  className="u-poster text-[clamp(1.6rem,4vw,2.8rem)] text-ink/28"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (beat.kind === "product") {
    const p = products[beat.index];
    const left = beat.side === "left";
    return (
      <div className="absolute inset-0 flex items-center px-6 sm:px-12">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,9,20,0.58), rgba(6,9,20,0.8))",
            opacity: winR(r),
          }}
        />
        <div
          className={
            "relative mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:gap-16 " +
            (left
              ? "lg:grid-cols-[minmax(0,420px)_1fr]"
              : "lg:grid-cols-[1fr_minmax(0,420px)]")
          }
        >
          <div
            className={
              "flex flex-col gap-5 " + (left ? "lg:order-2" : "lg:order-1")
            }
            style={{
              opacity: winR(r),
              transform: rise([r[0], r[1] + 0.01, r[2], r[3]], 30),
            }}
          >
            <span className="u-mono text-[11px] tracking-[0.2em] text-teal">
              {p.tag}
            </span>
            <h3 className="u-poster text-[clamp(2.4rem,7vw,5.2rem)] leading-[0.9] text-ink [text-shadow:0_4px_30px_rgba(0,0,0,0.6)]">
              {p.name}
            </h3>
            <p className="max-w-[46ch] text-[15px] leading-[1.6] text-ink/85">
              {p.blurb}
            </p>
            <div className="mt-1 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="u-mono text-[10px] tracking-[0.16em] text-faint">
                  Who it&apos;s for
                </span>
                <p className="text-[13px] leading-[1.55] text-muted">
                  {p.forWhom}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="u-mono text-[10px] tracking-[0.16em] text-faint">
                  Why we built it
                </span>
                <p className="text-[13px] leading-[1.55] text-muted">{p.why}</p>
              </div>
            </div>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep pointer-events-auto mt-1 w-fit u-mono text-[11px] tracking-[0.12em]"
            >
              {p.hrefLabel} ↗
            </a>
          </div>

          <div
            className={
              "glass-strong pointer-events-auto relative overflow-hidden rounded-lg shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] " +
              (left ? "lg:order-1" : "lg:order-2")
            }
            style={{
              opacity: winR([r[0] + 0.015, r[1] + 0.02, r[2], r[3]]),
              transform: rise([r[0] + 0.015, r[1] + 0.03, r[2], r[3]], 36),
            }}
          >
            <div className="relative aspect-[16/11] border-b border-white/10">
              <Image
                src={p.shot}
                alt={`${p.name} — screenshot`}
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
            </div>
            <div className="p-4">
              <span className="u-mono text-[10px] tracking-[0.16em] text-teal">
                Live now · {p.hrefLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (beat.kind === "list") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div
          className="absolute left-1/2 top-1/2 h-[88vh] w-[min(920px,96vw)] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(46% 42% at 50% 50%, rgba(6,9,20,0.95), rgba(6,9,20,0.55) 62%, rgba(6,9,20,0) 100%)",
            opacity: inRange(r[0], r[1]),
          }}
        />
        <span
          className="relative u-mono text-[11px] tracking-[0.3em] text-white/60"
          style={{ opacity: winR(r) }}
        >
          Also built for
        </span>
        <ul className="relative flex flex-col items-center gap-3">
          {work.map((w, wi) => (
            <li
              key={w.name}
              className="pointer-events-auto flex flex-col items-center gap-0.5"
              style={{
                opacity: winR([
                  r[0] + 0.004 + wi * 0.005,
                  r[1] + wi * 0.005,
                  r[2],
                  r[3],
                ]),
                transform: rise(
                  [r[0] + wi * 0.005, r[1] + 0.008 + wi * 0.005, r[2], r[3]],
                  18,
                ),
              }}
            >
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="u-poster text-[clamp(1.5rem,4.6vw,2.7rem)] text-ink transition-colors hover:text-teal [text-shadow:0_2px_22px_rgba(0,0,0,0.8)]"
              >
                {w.name}
              </a>
              <span className="u-mono text-[9px] tracking-[0.14em] text-muted">
                {w.tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}

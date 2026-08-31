"use client";

import Image from "next/image";
import { beats, steps, stats, products, work, type Beat } from "./beats";
import { site } from "@/lib/site";

/* --- CSS math driven by the global `--s` (0..1) --------------------- */
const clampN = (a: string, mid: string, b: string) => `clamp(${a}, ${mid}, ${b})`;
const inRange = (a: number, b: number) =>
  clampN("0", `calc((var(--s,0) - ${a}) / ${(b - a).toFixed(4)})`, "1");
const outRange = (c: number, d: number) => `calc(1 - ${inRange(c, d)})`;
const win = (a: number, b: number, c: number, d: number) =>
  `min(${inRange(a, b)}, ${outRange(c, d)})`;
const winR = ([a, b, c, d]: number[]) => win(a, b, c, d);
const rise = ([a, b, c, d]: number[], px = 42) =>
  `translateY(calc((1 - ${inRange(a, b)}) * ${px}px - ${inRange(c, d)} * ${px}px))`;
const soften = ([a, b]: number[]) =>
  `blur(calc((1 - ${inRange(a, b)}) * 6px))`;

/* per-line "wipe up from below" — line i of n, staggered inside the fade-in */
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

  if (beat.kind === "tagline") {
    return (
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(42% 28% at 50% 50%, rgba(6,9,20,0.74), rgba(6,9,20,0) 100%)",
            opacity: winR(r),
          }}
        />
        <p
          className="relative max-w-[22ch] text-center text-[clamp(1.2rem,2.8vw,1.9rem)] font-medium leading-snug text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.7)]"
          style={{ opacity: winR(r), transform: rise(r, 26) }}
        >
          {beat.text}
        </p>
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
            transform: `translateY(calc(-${inRange(r[2], r[3])} * 44px))`,
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

  if (beat.kind === "product") {
    const p = products[beat.index];
    const left = beat.side === "left";
    return (
      <div className="absolute inset-0 flex items-center px-6 sm:px-12">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,9,20,0.55), rgba(6,9,20,0.78))",
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
          {/* text column */}
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

          {/* card */}
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

  if (beat.kind === "stats") {
    return (
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 42% at 50% 50%, rgba(6,9,20,0.78), rgba(6,9,20,0) 100%)",
            opacity: winR(r),
          }}
        />
        <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:gap-16">
          {stats.map((st, si) => (
            <div
              key={st.label}
              className="flex flex-col items-center gap-1 text-center"
              style={{
                opacity: winR([r[0] + si * 0.008, r[1] + si * 0.008, r[2], r[3]]),
                transform: rise(
                  [r[0] + si * 0.008, r[1] + 0.012 + si * 0.008, r[2], r[3]],
                  22,
                ),
              }}
            >
              <span className="u-poster text-[clamp(3rem,8vw,6rem)] text-ink [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
                {st.n}
              </span>
              <span className="u-mono text-[10px] tracking-[0.16em] text-teal">
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (beat.kind === "steps") {
    return (
      <div className="absolute inset-0 flex flex-col justify-center gap-8 px-6 sm:px-14">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,9,20,0.84), rgba(6,9,20,0.36) 60%, rgba(6,9,20,0.12) 100%)",
            opacity: winR(r),
          }}
        />
        <h2
          className="relative u-poster text-[clamp(2.4rem,8.5vw,6.5rem)] text-ink [text-shadow:0_4px_36px_rgba(0,0,0,0.55)]"
          style={{ opacity: winR(r), transform: rise(r, 40), filter: soften(r) }}
        >
          Build it. <em>Run</em> it. Grow it.
        </h2>
        <div className="relative grid max-w-[1000px] gap-5 sm:grid-cols-3">
          {steps.map((s, si) => (
            <div
              key={s.k}
              className="glass flex flex-col gap-2 rounded-lg p-5"
              style={{
                opacity: winR([
                  r[0] + 0.008 + si * 0.01,
                  r[1] + si * 0.01,
                  r[2],
                  r[3],
                ]),
                transform: rise(
                  [r[0] + si * 0.01, r[1] + 0.016 + si * 0.01, r[2], r[3]],
                  26,
                ),
              }}
            >
              <span className="u-poster text-[2rem] text-teal/50">{s.k}</span>
              <h3 className="u-mono text-[12px] tracking-[0.14em] text-ink">
                {s.title}
              </h3>
              <p className="text-[13px] leading-[1.55] text-muted">{s.body}</p>
            </div>
          ))}
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
                  r[0] + 0.006 + wi * 0.008,
                  r[1] + wi * 0.008,
                  r[2],
                  r[3],
                ]),
                transform: rise(
                  [r[0] + wi * 0.008, r[1] + 0.012 + wi * 0.008, r[2], r[3]],
                  20,
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

  if (beat.kind === "community") {
    return <Community range={r} />;
  }

  return null;
}

function Community({ range: r }: { range: number[] }) {
  function suggest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const idea = (
      new FormData(e.currentTarget).get("idea") as string
    )?.trim();
    if (!idea) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "A product for the community",
    )}&body=${encodeURIComponent(idea)}`;
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 50%, rgba(6,9,20,0.88), rgba(6,9,20,0.35) 85%, rgba(6,9,20,0.1) 100%)",
          opacity: winR(r),
        }}
      />
      <div
        className="pointer-events-auto relative flex w-full max-w-[640px] flex-col gap-5 text-center"
        style={{ opacity: winR(r), transform: rise(r, 34) }}
      >
        <span className="u-mono text-[11px] tracking-[0.3em] text-teal">
          A product for the people
        </span>
        <h2 className="u-poster text-[clamp(2rem,6.5vw,4.2rem)] leading-[0.95] text-ink">
          What should we build for everyone?
        </h2>
        <p className="mx-auto max-w-[48ch] text-[14px] leading-[1.6] text-muted">
          One thing we make each year isn&apos;t for revenue — a tool the public
          actually needs, built with the community, kept free. Tell us what it
          should be.
        </p>
        <form onSubmit={suggest} className="mx-auto flex w-full max-w-[520px] flex-col gap-3 sm:flex-row">
          <input
            name="idea"
            required
            placeholder="A tool that would help people if it existed…"
            className="w-full rounded-sm border border-white/15 bg-white/[0.05] px-3 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-faint focus:border-teal"
          />
          <button type="submit" className="btn btn-primary shrink-0 justify-center">
            Suggest it
          </button>
        </form>
      </div>
    </div>
  );
}

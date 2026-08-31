"use client";

import Image from "next/image";
import { beats, steps, stats, products, work, type Beat } from "./beats";
import { site } from "@/lib/site";

/* --- CSS math driven by the global `--s` (0..1) --------------------- */
const inRange = (a: number, b: number) =>
  `clamp(0, calc((var(--s,0) - ${a}) / ${(b - a).toFixed(4)}), 1)`;
const outRange = (c: number, d: number) => `calc(1 - ${inRange(c, d)})`;
const win = ([a, , c, d]: number[], b: number) =>
  `min(${inRange(a, b)}, ${outRange(c, d)})`;
const rise = ([a, b, c, d]: number[], px = 42) =>
  `translateY(calc((1 - ${inRange(a, b)}) * ${px}px - ${inRange(c, d)} * ${px}px))`;
const soften = ([a, b]: number[]) =>
  `blur(calc((1 - ${inRange(a, b)}) * 7px))`;

export function BeatLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      {beats.map((beat, i) => (
        <BeatView key={i} beat={beat} />
      ))}
    </div>
  );
}

function BeatView({ beat }: { beat: Beat }) {
  const r = beat.range;
  const b = r[1];

  if (beat.kind === "tagline") {
    return (
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 26% at 50% 50%, rgba(6,9,20,0.72), rgba(6,9,20,0) 100%)",
            opacity: win(r, b),
          }}
        />
        <p
          className="relative max-w-[24ch] text-center text-[clamp(1.15rem,2.6vw,1.7rem)] leading-snug text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.7)]"
          style={{
            opacity: win(r, b),
            transform: rise(r, 30),
          }}
        >
          {beat.text}
        </p>
      </div>
    );
  }

  if (beat.kind === "statement") {
    const align = beat.align ?? "center";
    return (
      <div
        className={
          "absolute inset-0 flex flex-col justify-center px-6 sm:px-14 " +
          (align === "left" ? "items-start" : "items-center text-center")
        }
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              align === "left"
                ? "linear-gradient(90deg, rgba(6,9,20,0.86), rgba(6,9,20,0.3) 52%, rgba(6,9,20,0) 82%)"
                : "radial-gradient(62% 50% at 50% 50%, rgba(6,9,20,0.82), rgba(6,9,20,0.1) 78%, rgba(6,9,20,0) 100%)",
            opacity: win(r, b),
          }}
        />
        <h2
          className="relative u-poster text-[clamp(3rem,12.5vw,10rem)] text-ink [text-shadow:0_4px_40px_rgba(0,0,0,0.55)]"
          style={{ opacity: win(r, b), transform: rise(r, 50), filter: soften(r) }}
        >
          {beat.lines.map((line, li) => (
            <span key={li} className="block">
              {beat.emphasis && line.toLowerCase().includes(beat.emphasis) ? (
                <>
                  {line.split(new RegExp(`(${beat.emphasis})`, "i")).map((chunk, ci) =>
                    chunk.toLowerCase() === beat.emphasis!.toLowerCase() ? (
                      <em key={ci}>{chunk}</em>
                    ) : (
                      <span key={ci}>{chunk}</span>
                    ),
                  )}
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>
      </div>
    );
  }

  if (beat.kind === "product") {
    const p = products[beat.index];
    const onLeft = beat.side === "left";
    return (
      <div
        className={
          "absolute inset-0 flex flex-col justify-center gap-6 px-6 sm:px-14 " +
          (onLeft ? "items-start" : "items-end")
        }
      >
        <div
          className="absolute inset-0"
          style={{
            background: onLeft
              ? "linear-gradient(90deg, rgba(6,9,20,0.8), rgba(6,9,20,0.2) 46%, rgba(6,9,20,0) 70%)"
              : "linear-gradient(270deg, rgba(6,9,20,0.8), rgba(6,9,20,0.2) 46%, rgba(6,9,20,0) 70%)",
            opacity: win(r, b),
          }}
        />
        <span
          className="relative u-poster text-[clamp(2.6rem,9vw,7rem)] leading-[0.82] text-ink [text-shadow:0_4px_36px_rgba(0,0,0,0.7)]"
          style={{ opacity: win(r, b), transform: rise(r, 44), filter: soften(r) }}
        >
          {p.name}
        </span>

        <div
          className="glass-strong pointer-events-auto relative w-full max-w-[420px] overflow-hidden rounded-lg shadow-[0_40px_100px_-20px_rgba(0,0,0,0.75)]"
          style={{
            opacity: win([r[0] + 0.02, r[1] + 0.02, r[2], r[3]], b + 0.02),
            transform: rise([r[0] + 0.02, r[1] + 0.03, r[2], r[3]], 34),
          }}
        >
          <div className="relative aspect-[16/10] border-b border-white/10">
            <Image
              src={p.shot}
              alt={`${p.name} — screenshot`}
              fill
              sizes="420px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-3 p-5">
            <span className="u-mono text-[10px] tracking-[0.18em] text-teal">
              {p.tag}
            </span>
            <p className="text-[14px] leading-[1.55] text-muted">{p.blurb}</p>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep mt-1 w-fit u-mono text-[11px] tracking-[0.12em]"
            >
              {p.hrefLabel} ↗
            </a>
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
              "radial-gradient(60% 40% at 50% 50%, rgba(6,9,20,0.75), rgba(6,9,20,0) 100%)",
            opacity: win(r, b),
          }}
        />
        <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:gap-16">
          {stats.map((st, si) => (
            <div
              key={st.label}
              className="flex flex-col items-center gap-1 text-center"
              style={{
                opacity: win(
                  [r[0] + si * 0.01, r[1] + si * 0.01, r[2], r[3]],
                  b + si * 0.01,
                ),
                transform: rise(
                  [r[0] + si * 0.01, r[1] + 0.015 + si * 0.01, r[2], r[3]],
                  24,
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
      <div className="absolute inset-0 flex flex-col justify-center gap-10 px-6 sm:px-14">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,9,20,0.82), rgba(6,9,20,0.35) 60%, rgba(6,9,20,0.1) 100%)",
            opacity: win(r, b),
          }}
        />
        <h2
          className="relative u-poster text-[clamp(2.6rem,9vw,7rem)] text-ink [text-shadow:0_4px_36px_rgba(0,0,0,0.55)]"
          style={{ opacity: win(r, b), transform: rise(r, 44), filter: soften(r) }}
        >
          Build it. <em>Run</em> it. Grow it.
        </h2>
        <div className="relative grid max-w-[1000px] gap-6 sm:grid-cols-3">
          {steps.map((s, si) => (
            <div
              key={s.k}
              className="glass flex flex-col gap-2 rounded-lg p-5"
              style={{
                opacity: win(
                  [r[0] + 0.01 + si * 0.012, r[1] + si * 0.012, r[2], r[3]],
                  b + si * 0.012,
                ),
                transform: rise(
                  [r[0] + si * 0.012, r[1] + 0.02 + si * 0.012, r[2], r[3]],
                  28,
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
          className="absolute left-1/2 top-1/2 h-[86vh] w-[min(900px,96vw)] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(44% 40% at 50% 50%, rgba(6,9,20,0.95), rgba(6,9,20,0.6) 60%, rgba(6,9,20,0) 100%)",
            opacity: inRange(r[0], r[1]),
          }}
        />
        <span
          className="relative u-mono text-[11px] tracking-[0.3em] text-white/55"
          style={{ opacity: win(r, b) }}
        >
          Also built for
        </span>
        <ul className="relative flex flex-col items-center gap-3">
          {work.map((w, wi) => (
            <li
              key={w.name}
              className="pointer-events-auto flex flex-col items-center gap-0.5"
              style={{
                opacity: win(
                  [r[0] + 0.008 + wi * 0.01, r[1] + wi * 0.01, r[2], r[3]],
                  b + wi * 0.01,
                ),
                transform: rise(
                  [r[0] + wi * 0.01, r[1] + 0.015 + wi * 0.01, r[2], r[3]],
                  22,
                ),
              }}
            >
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="u-poster text-[clamp(1.5rem,4.5vw,2.6rem)] text-ink transition-colors hover:text-teal [text-shadow:0_2px_22px_rgba(0,0,0,0.75)]"
              >
                {w.name}
              </a>
              <span className="u-mono text-[9px] tracking-[0.14em] text-muted">
                {w.tag}
              </span>
            </li>
          ))}
        </ul>
        <span
          className="relative u-mono text-[10px] tracking-[0.22em] text-faint"
          style={{ opacity: win([r[0] + 0.04, r[1] + 0.04, r[2], r[3]], b + 0.04) }}
        >
          {site.tagline}
        </span>
      </div>
    );
  }

  return null;
}

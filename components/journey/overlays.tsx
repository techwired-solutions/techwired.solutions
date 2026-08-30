"use client";

import Image from "next/image";
import { products, work, site } from "@/lib/site";
import type { Overlay } from "./scenes";

/* Overlays read the scene's scroll progress from the CSS var `--p` (0..1)
   set on the .scene-pin ancestor — no React re-renders per frame.
   Ranges below are expressed with CSS clamp(). */

const fadeIn = (from: number, to: number) =>
  `clamp(0, calc((var(--p) - ${from}) / ${to - from}), 1)`;
const fadeOut = (from: number, to: number) => `calc(1 - ${fadeIn(from, to)})`;
const band = (a: number, b: number, c: number, d: number) =>
  `min(${fadeIn(a, b)}, ${fadeOut(c, d)})`;

export function SceneOverlay({ overlay }: { overlay: Overlay }) {
  switch (overlay.kind) {
    case "intro":
      return <Intro />;
    case "telemetry":
      return <Telemetry />;
    case "line":
      return <Line text={overlay.text} align={overlay.align ?? "center"} />;
    case "product":
      return <ProductPanel index={overlay.index} side={overlay.side} />;
    case "constellation":
      return <Constellation />;
    default:
      return null;
  }
}

function Intro() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p
        className="u-mono text-[12px] tracking-[0.4em] text-teal [text-shadow:0_0_24px_rgba(31,227,203,0.4)]"
        style={{ opacity: fadeOut(0.55, 0.8) }}
      >
        Techwired&nbsp;&nbsp;Solutions
      </p>
      <div
        className="u-mono text-[11px] tracking-[0.3em] text-white/45"
        style={{ opacity: fadeOut(0.4, 0.65) }}
      >
        scroll to begin ↓
      </div>
    </div>
  );
}

function Telemetry() {
  return (
    <div
      className="pointer-events-none absolute bottom-8 left-6 flex flex-col gap-1 sm:left-10"
      style={{ opacity: fadeIn(0.05, 0.2) }}
    >
      <span className="u-mono text-[10px] tracking-[0.2em] text-teal/70">
        signal · in transit
      </span>
      <span className="u-mono text-[10px] tracking-[0.2em] text-white/35">
        depth ▸ increasing
      </span>
    </div>
  );
}

function Line({
  text,
  align,
}: {
  text: string;
  align: "center" | "wide";
}) {
  return (
    <div
      className={
        "pointer-events-none absolute inset-0 flex items-center px-6 " +
        (align === "wide" ? "justify-start sm:px-12" : "justify-center text-center")
      }
    >
      <p
        className={
          "u-display text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.55)] " +
          (align === "wide"
            ? "max-w-[16ch] text-[clamp(2.4rem,8vw,7rem)]"
            : "max-w-[20ch] text-[clamp(1.9rem,5vw,3.6rem)]")
        }
        style={{ opacity: band(0.12, 0.28, 0.72, 0.92) }}
      >
        {text}
      </p>
    </div>
  );
}

function ProductPanel({
  index,
  side,
}: {
  index: 0 | 1 | 2;
  side: "left" | "right";
}) {
  const p = products[index];
  return (
    <div
      className={
        "pointer-events-none absolute inset-0 flex items-center px-5 sm:px-10 " +
        (side === "right" ? "justify-end" : "justify-start")
      }
    >
      <div
        className="pointer-events-auto w-full max-w-[380px] overflow-hidden rounded-lg border border-teal/25 bg-void/85 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        style={{
          opacity: band(0.32, 0.48, 0.86, 0.99),
          transform: `translateY(calc(${fadeOut(0.32, 0.5)} * 26px))`,
        }}
      >
        <div className="relative aspect-[16/10] border-b border-white/10">
          <Image
            src={p.shot}
            alt={`${p.name} — screenshot`}
            fill
            sizes="380px"
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col gap-2.5 p-5">
          <span className="u-mono text-[10px] tracking-[0.18em] text-teal">
            {p.tag}
          </span>
          <h3 className="u-display text-[24px] text-ink">{p.name}</h3>
          <p className="text-[13.5px] leading-[1.55] text-muted">{p.blurb}</p>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-1.5 border-b border-teal pb-0.5 text-[13px] font-medium text-teal transition-opacity hover:opacity-70"
          >
            {p.hrefLabel} ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function Constellation() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[min(820px,96vw)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(46% 42% at 50% 50%, rgba(6,9,20,0.94), rgba(6,9,20,0.55) 62%, rgba(6,9,20,0) 100%)",
          opacity: fadeIn(0.08, 0.25),
        }}
      />
      <span
        className="relative u-mono text-[11px] tracking-[0.28em] text-white/60"
        style={{ opacity: fadeIn(0.05, 0.2) }}
      >
        also built for
      </span>
      <ul className="relative flex flex-col items-center gap-3">
        {work.map((w, i) => (
          <li
            key={w.name}
            className="pointer-events-auto flex flex-col items-center gap-0.5"
            style={{ opacity: fadeIn(0.16 + i * 0.11, 0.3 + i * 0.11) }}
          >
            <a
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="u-display text-[clamp(1.2rem,3.2vw,1.9rem)] text-ink transition-colors hover:text-teal [text-shadow:0_2px_20px_rgba(0,0,0,0.7)]"
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
        className="relative u-mono text-[10px] tracking-[0.2em] text-faint"
        style={{ opacity: fadeIn(0.7, 0.85) }}
      >
        {site.tagline}
      </span>
    </div>
  );
}

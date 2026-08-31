"use client";

import { useEffect, useRef } from "react";
import { chapters } from "./beats";

/* Persistent instrument layer — chapter name + progress read-out.
   Always on screen so the pure-film moments still feel narrated. */
export function Chapters() {
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const loop = () => {
      const s =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--s"),
        ) || 0;
      if (pctRef.current)
        pctRef.current.textContent = String(Math.round(s * 100)).padStart(2, "0");
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-30 flex flex-col gap-1 sm:bottom-8 sm:left-10">
      <div className="relative h-[1.1em]">
        {chapters.map((c, i) => {
          const next = chapters[i + 1]?.at ?? 1.01;
          // visible only inside [c.at, next)
          const op = `calc(clamp(0, (var(--s,0) - ${c.at}) * 200, 1) * (1 - clamp(0, (var(--s,0) - ${
            next - 0.005
          }) * 200, 1)))`;
          return (
            <span
              key={c.no}
              className="absolute left-0 top-0 whitespace-nowrap u-mono text-[11px] tracking-[0.22em] text-ink [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]"
              style={{ opacity: op }}
            >
              <span className="text-teal">{c.no}</span> · {c.name}
            </span>
          );
        })}
      </div>
      <span className="u-mono text-[10px] tracking-[0.16em] text-faint">
        <span ref={pctRef}>00</span> / 100
      </span>
    </div>
  );
}

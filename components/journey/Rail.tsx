"use client";

import { useEffect, useRef } from "react";
import { scenes } from "./scenes";

export function Rail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const loop = () => {
      const d = document.documentElement;
      const p = d.scrollTop / (d.scrollHeight - d.clientHeight || 1);
      const pct = (p * 100).toFixed(2) + "%";
      if (fillRef.current) fillRef.current.style.height = pct;
      if (dotRef.current) dotRef.current.style.top = pct;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* mobile: hairline progress bar */}
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-teal via-blue to-gold md:hidden"
        style={{ transform: "scaleX(0)" }}
        aria-hidden
      />

      {/* desktop: left rail */}
      <div
        className="fixed left-6 top-0 z-40 hidden h-full w-[2px] md:block"
        aria-hidden
      >
        <div className="absolute inset-y-[6%] left-0 w-px bg-white/10" />
        <div
          ref={fillRef}
          className="absolute left-[-1px] top-0 w-[3px] bg-gradient-to-b from-teal via-blue to-gold"
          style={{ height: "0%", boxShadow: "0 0 12px rgba(31,227,203,0.5)" }}
        />
        {scenes.map((s, i) => (
          <span
            key={s.id}
            className="absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white/25"
            style={{ top: `${6 + (i / (scenes.length - 1)) * 88}%` }}
          />
        ))}
        <div
          ref={dotRef}
          className="absolute left-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            top: "0%",
            boxShadow:
              "0 0 0 3px rgba(31,227,203,0.35), 0 0 20px 3px rgba(31,227,203,0.6), 0 0 36px 9px rgba(255,180,84,0.22)",
          }}
        />
      </div>

      <a
        href="#contact"
        className="fixed bottom-6 right-6 z-50 rounded-pill border border-white/15 bg-void/60 px-4 py-2 u-mono text-[10px] tracking-[0.18em] text-white/60 backdrop-blur-md transition-colors hover:border-teal hover:text-ink"
      >
        skip to contact ↓
      </a>
    </>
  );
}

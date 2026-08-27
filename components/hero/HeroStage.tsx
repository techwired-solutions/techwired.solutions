"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { modes } from "@/lib/site";
import { useMode } from "./ModeContext";
import { GlassMark } from "./GlassMark";

export function HeroStage() {
  const { mode, setMode } = useMode();
  const spacer = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: spacer,
    offset: ["start start", "end start"],
  });
  // dock completes ~70% through the spacer
  const progress = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 1]);
  // sky drifts up a touch, then fades as content arrives
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const skyOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.35]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const railOpacity = useTransform(scrollYProgress, [0, 0.8, 0.95], [1, 1, 0]);

  return (
    <>
      {/* Fallback / reduced-motion sky (behind the WebGL canvas) */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ opacity: reduce ? 1 : skyOpacity }}
        aria-hidden
      >
        <motion.div className="absolute inset-0" style={{ y: reduce ? 0 : skyY }}>
          <Image
            src="/images/sky/sky.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: mode.filter, transition: "filter 700ms ease" }}
          />
        </motion.div>
      </motion.div>

      {/* Glass mark, fixed, docks toward the nav on scroll */}
      {!reduce && <GlassMark progress={progress} />}

      {/* Mode grade + top scrim, above the sky, below content */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[6]"
        style={{ opacity: reduce ? 1 : skyOpacity }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{ background: mode.wash, transition: "background 700ms ease" }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
      </motion.div>

      {/* Time-of-day rail */}
      <motion.div
        style={{ opacity: reduce ? 1 : railOpacity }}
        className="glass-strong fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-1.5 rounded-pill p-1.5 sm:right-6"
      >
        {modes.map((m) => {
          const on = m.id === mode.id;
          return (
            <button
              key={m.id}
              type="button"
              aria-label={m.label}
              aria-pressed={on}
              onClick={() => setMode(m.id)}
              className={
                "flex h-9 w-9 items-center justify-center rounded-full transition-colors " +
                (on
                  ? "bg-whiteout text-ink"
                  : "text-whiteout/75 hover:bg-white/15 hover:text-whiteout")
              }
            >
              <m.icon className="h-[17px] w-[17px]" strokeWidth={2} />
            </button>
          );
        })}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="fixed inset-x-0 bottom-7 z-30 flex justify-center"
        style={{ opacity: reduce ? 0 : hintOpacity }}
        aria-hidden
      >
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-white/70 [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]">
          Scroll
        </span>
      </motion.div>

      {/* The scroll distance that drives the dock */}
      <div ref={spacer} className="relative h-[155svh] w-full" aria-hidden />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { modes, site, type ModeId } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "tw-sky-mode";

export function Hero() {
  const [mode, setMode] = useState<ModeId>("day");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, 0.22]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 1, 0]);
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ModeId | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage on mount
      if (saved && modes.some((m) => m.id === saved)) setMode(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function pick(id: ModeId) {
    setMode(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }

  return (
    <section ref={ref} className="relative h-[116svh] min-h-[740px] w-full bg-page">
      {/* Sky */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {modes.map((m) => (
          <motion.div
            key={m.id}
            aria-hidden={m.id !== mode}
            className="absolute inset-0"
            style={{ y: reduce ? 0 : skyY }}
            initial={false}
            animate={{ opacity: m.id === mode ? 1 : 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={m.image}
              alt=""
              fill
              priority={m.id === "day"}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 42%" }}
            />
          </motion.div>
        ))}

        {/* scrims — nav legibility + overall depth + centre vignette */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/45 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 52%, rgba(0,0,0,0.28), rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Centre stack: wordmark + tagline + CTAs */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center text-whiteout [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
          <motion.div
            style={
              reduce
                ? undefined
                : { scale: wordScale, y: wordY, opacity: wordOpacity }
            }
            className="flex flex-col items-center"
          >
            <span
              data-text="Techwired"
              className="glasstext text-[clamp(3.25rem,15vw,12rem)]"
            >
              Techwired
            </span>
            <span className="mt-4 text-[clamp(0.8rem,2.4vw,1.25rem)] font-medium uppercase tracking-[0.55em] text-whiteout">
              Solutions
            </span>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { opacity: wordOpacity }}
            className="flex flex-col items-center gap-6"
          >
            <p className="max-w-[38ch] text-[clamp(15px,2vw,18px)] font-medium text-whiteout">
              {site.tagline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button as="a" href="#products" variant="glass">
                See our products
              </Button>
              <Button as="a" href="#contact" variant="glass">
                Start a project
              </Button>
            </div>
          </motion.div>

          {/* floating glass sphere */}
          <motion.div
            aria-hidden
            style={reduce ? undefined : { opacity: wordOpacity }}
            className="glass-strong pointer-events-none absolute right-[12%] top-[22%] hidden h-28 w-28 rounded-full md:block"
          />
        </div>

        {/* Mode toggles — right rail on desktop, bottom row on mobile */}
        <div className="glass-strong absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1 rounded-pill p-1 sm:bottom-auto sm:left-auto sm:right-6 sm:top-1/2 sm:-translate-x-0 sm:-translate-y-1/2 sm:flex-col sm:gap-1.5 sm:p-1.5">
          {modes.map((m) => {
            const on = m.id === mode;
            return (
              <button
                key={m.id}
                type="button"
                aria-label={m.label}
                aria-pressed={on}
                onClick={() => pick(m.id)}
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
        </div>
      </div>
    </section>
  );
}

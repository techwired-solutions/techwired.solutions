"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useMode } from "./ModeContext";

/* CSS-3D glass rendition of the "wired node" mark — three frosted-glass
   spheres joined by two rods, refracting the sky through backdrop-blur.
   `progress` (0..1) shrinks it and lifts it toward the nav. */
export function GlassMark({ progress }: { progress: MotionValue<number> }) {
  const { mode } = useMode();
  const night = mode.id === "night";

  const scale = useTransform(progress, [0, 1], [1, 0.14]);
  const y = useTransform(progress, [0, 1], ["0vh", "-43vh"]);
  const opacity = useTransform(progress, [0, 0.82, 1], [1, 1, 0]);
  const spin = useTransform(progress, [0, 1], [0, 20]);

  const node: React.CSSProperties = {
    background: night
      ? "radial-gradient(38% 34% at 30% 26%, rgba(255,255,255,0.95), rgba(150,170,235,0.32) 46%, rgba(28,40,92,0.34) 100%)"
      : "radial-gradient(38% 34% at 30% 26%, rgba(255,255,255,1), rgba(214,228,255,0.34) 46%, rgba(70,97,136,0.30) 100%)",
    boxShadow:
      "inset 0 3px 14px rgba(255,255,255,0.7), inset 0 -14px 30px rgba(30,50,100,0.42), inset 8px -6px 20px rgba(120,150,210,0.25), 0 24px 70px rgba(15,35,75,0.30)",
    border: "1px solid rgba(255,255,255,0.7)",
    backdropFilter: "blur(4px) brightness(1.05) saturate(1.1)",
    WebkitBackdropFilter: "blur(4px) brightness(1.05) saturate(1.1)",
  };

  const rodH: React.CSSProperties = {
    background: night
      ? "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(150,170,235,0.28) 42%, rgba(28,40,92,0.4))"
      : "linear-gradient(180deg, rgba(255,255,255,1), rgba(214,228,255,0.3) 42%, rgba(56,80,120,0.4))",
    boxShadow:
      "inset 0 3px 10px rgba(255,255,255,0.75), inset 0 -9px 20px rgba(30,50,100,0.45), 0 16px 44px rgba(15,35,75,0.26)",
    border: "1px solid rgba(255,255,255,0.66)",
    backdropFilter: "blur(4px) brightness(1.05) saturate(1.1)",
    WebkitBackdropFilter: "blur(4px) brightness(1.05) saturate(1.1)",
  };
  const rodV: React.CSSProperties = {
    ...rodH,
    background: night
      ? "linear-gradient(90deg, rgba(255,255,255,0.85), rgba(150,170,235,0.28) 42%, rgba(28,40,92,0.4))"
      : "linear-gradient(90deg, rgba(255,255,255,1), rgba(214,228,255,0.3) 42%, rgba(56,80,120,0.4))",
  };

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] flex items-center justify-center"
      style={{ opacity }}
    >
      <motion.div
        style={{ scale, y, rotate: spin }}
        className="relative -mt-[6vh]"
      >
        <div
          className="relative h-[min(72vw,60vh)] w-[min(72vw,60vh)] motion-safe:animate-[tw-float_10s_ease-in-out_infinite]"
          style={{ filter: "drop-shadow(0 30px 60px rgba(10,25,60,0.28))" }}
        >
          <span
            className="absolute left-[9%] top-[20%] h-[14%] w-[82%] rounded-full"
            style={rodH}
          />
          <span
            className="absolute left-[43%] top-[22%] h-[62%] w-[14%] rounded-full"
            style={rodV}
          />
          <span
            className="absolute left-0 top-[8%] aspect-square w-[30%] rounded-full"
            style={node}
          />
          <span
            className="absolute right-0 top-[8%] aspect-square w-[30%] rounded-full"
            style={node}
          />
          <span
            className="absolute bottom-[4%] left-[35%] aspect-square w-[30%] rounded-full"
            style={node}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

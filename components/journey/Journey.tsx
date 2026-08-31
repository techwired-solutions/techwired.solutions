"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { BeatLayer } from "./overlays";
import { Nav } from "./Nav";
import { Rail } from "./Rail";
import { Chapters } from "./Chapters";
import { Contact } from "./Contact";

const SCROLL_VH = 1350; // scroll distance the film is scrubbed across

export function Journey() {
  const [still, setStill] = useState(false);
  const [src, setSrc] = useState("/journey/journey.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const save = !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");
    const small =
      window.matchMedia("(max-width: 768px)").matches ||
      /(^|-)(2g|3g)$/.test(conn?.effectiveType ?? "");
    /* eslint-disable react-hooks/set-state-in-effect -- client-only capability check */
    setStill(rm || save);
    if (small) setSrc("/journey/journey-480.mp4");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const spacer = spacerRef.current;
    const video = videoRef.current;

    const lenis = still
      ? null
      : new Lenis({ autoRaf: false, lerp: 0.12, smoothWheel: true, anchors: true });
    if (lenis) (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    let primed = false;
    const prime = () => {
      if (primed || !video) return;
      primed = true;
      video.play().then(() => video.pause()).catch(() => {});
    };
    const evs = ["pointerdown", "touchstart", "wheel", "keydown"];
    evs.forEach((e) => window.addEventListener(e, prime, { once: true, passive: true }));

    const tick = (t: number) => {
      lenis?.raf(t);
      const travel = spacer
        ? spacer.offsetHeight - window.innerHeight
        : window.innerHeight * (SCROLL_VH / 100 - 1);
      const s = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      root.style.setProperty("--s", s.toFixed(5));
      root.style.setProperty("--k", Math.min(1, s / 0.05).toFixed(5));

      if (video && video.readyState >= 2 && Number.isFinite(video.duration)) {
        const target = s * (video.duration - 0.05);
        if (Math.abs(video.currentTime - target) > 1 / 24) {
          try {
            video.currentTime = target;
          } catch {
            /* seek not ready */
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      evs.forEach((e) => window.removeEventListener(e, prime));
    };
  }, [still]);

  return (
    <>
      {still ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="film" src="/journey/keyframes/05.jpg" alt="" aria-hidden="true" />
      ) : (
        <video
          ref={videoRef}
          className="film"
          src={src}
          poster="/journey/keyframes/00.jpg"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
      <div className="film-scrim" />

      <span id="top" aria-hidden="true" />
      <Nav />
      <BeatLayer />
      {!still && <Rail />}
      {!still && <Chapters />}

      <div ref={spacerRef} style={{ height: `${SCROLL_VH}svh` }} aria-hidden="true" />

      <Contact />
    </>
  );
}

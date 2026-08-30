"use client";

import { useEffect, useMemo, useState } from "react";
import type { RefObject } from "react";
import Lenis from "lenis";
import { scenes } from "./scenes";
import { Scene } from "./Scene";
import { Rail } from "./Rail";
import { Outro } from "./Outro";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function Journey() {
  const [still, setStill] = useState(false);
  const [mobile, setMobile] = useState(false);

  const sectionRefs = useMemo<RefObject<HTMLElement | null>[]>(
    () => scenes.map(() => ({ current: null })),
    [],
  );
  const pinRefs = useMemo<RefObject<HTMLDivElement | null>[]>(
    () => scenes.map(() => ({ current: null })),
    [],
  );
  const videoRefs = useMemo<RefObject<HTMLVideoElement | null>[]>(
    () => scenes.map(() => ({ current: null })),
    [],
  );

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const save = !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");
    /* eslint-disable react-hooks/set-state-in-effect -- device capability is only knowable on the client, after mount */
    setStill(rm || save);
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (still) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.11,
      smoothWheel: true,
      anchors: true,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    let activeIdx = -1;
    let primed = false;

    const prime = () => {
      if (primed) return;
      primed = true;
      videoRefs.forEach((r) => {
        const v = r.current;
        if (v) v.play().then(() => v.pause()).catch(() => {});
      });
    };
    ["pointerdown", "touchstart", "wheel", "keydown"].forEach((e) =>
      window.addEventListener(e, prime, { once: true, passive: true }),
    );

    const ensureLoaded = (i: number) => {
      const v = videoRefs[i]?.current;
      if (v && !v.getAttribute("src") && v.dataset.src) {
        v.src = v.dataset.src;
        v.preload = "auto";
        v.load();
      }
    };
    const unload = (i: number) => {
      const v = videoRefs[i]?.current;
      if (v && v.getAttribute("src")) {
        v.removeAttribute("src");
        v.load();
      }
    };
    const AHEAD = mobile ? 1 : 2;
    const BEHIND = 1;

    // warm the opening scenes right away
    [0, 1, 2].forEach((i) => setTimeout(() => ensureLoaded(i), i * 250));

    const tick = (t: number) => {
      lenis.raf(t);
      const vh = window.innerHeight;

      let newActive = 0;
      let activeP = 0;
      for (let i = 0; i < scenes.length; i++) {
        const sec = sectionRefs[i]?.current;
        const pin = pinRefs[i]?.current;
        if (!sec || !pin) continue;
        const r = sec.getBoundingClientRect();
        const span = r.height - vh;
        const p =
          span > 0 ? clamp(-r.top / span, 0, 1) : r.top <= 0 ? 1 : 0;
        pin.style.setProperty("--p", p.toFixed(4));
        if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) {
          newActive = i;
          activeP = p;
        }
      }

      // start pulling the next clip in well before we reach it
      if (activeP > 0.35) ensureLoaded(newActive + 1);

      if (newActive !== activeIdx) {
        for (let i = 0; i < scenes.length; i++) {
          if (i >= newActive - BEHIND && i <= newActive + AHEAD) ensureLoaded(i);
          else unload(i);
        }
        activeIdx = newActive;
      }

      const av = videoRefs[activeIdx]?.current;
      const sec = sectionRefs[activeIdx]?.current;
      if (av && sec && av.readyState >= 2) {
        const r = sec.getBoundingClientRect();
        const span = r.height - vh;
        const p = span > 0 ? clamp(-r.top / span, 0, 1) : 1;
        const dur = Number.isFinite(av.duration) ? av.duration : 8;
        const target = p * (dur - 0.06);
        if (Math.abs(av.currentTime - target) > 1 / 24) {
          try {
            av.currentTime = target;
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
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      ["pointerdown", "touchstart", "wheel", "keydown"].forEach((e) =>
        window.removeEventListener(e, prime),
      );
    };
  }, [still, mobile, sectionRefs, pinRefs, videoRefs]);

  return (
    <>
      {!still && <Rail />}
      <main>
        {scenes.map((s, i) => (
          <Scene
            key={s.id}
            scene={s}
            index={i}
            mobile={mobile}
            still={still}
            sectionRef={sectionRefs[i]}
            pinRef={pinRefs[i]}
            videoRef={videoRefs[i]}
          />
        ))}
        <Outro />
      </main>
    </>
  );
}

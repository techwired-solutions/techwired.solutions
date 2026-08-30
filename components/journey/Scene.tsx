"use client";

import Image from "next/image";
import type { RefObject } from "react";
import type { SceneDef } from "./scenes";
import { SceneOverlay } from "./overlays";

export function Scene({
  scene,
  index,
  mobile,
  still,
  sectionRef,
  pinRef,
  videoRef,
}: {
  scene: SceneDef;
  index: number;
  mobile: boolean;
  still: boolean; // reduced-motion / save-data → show a keyframe, no video
  sectionRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const src = mobile ? `${scene.clip}-sm.mp4` : `${scene.clip}.mp4`;

  if (still) {
    return (
      <section
        ref={sectionRef}
        id={scene.id}
        aria-label={`Scene ${scene.no} — ${scene.name}`}
        className="relative min-h-svh w-full"
      >
        <div ref={pinRef} className="relative h-svh w-full overflow-hidden" style={{ ["--p" as string]: "0.5" }}>
          <Image
            src={scene.posterOut}
            alt=""
            fill
            priority={index < 2}
            sizes="100vw"
            className="scene-video"
          />
          <div className="scrim-top" />
          <div className="scrim-bottom" />
          <SceneOverlay overlay={scene.overlay} />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={scene.id}
      aria-label={`Scene ${scene.no} — ${scene.name}`}
      className="relative w-full"
      style={{ height: `${Math.round(scene.hold * 100)}svh` }}
    >
      <div ref={pinRef} className="scene-pin" style={{ ["--p" as string]: "0" }}>
        <video
          ref={videoRef}
          className="scene-video"
          src={index < 2 ? src : undefined}
          data-src={src}
          poster={scene.poster}
          muted
          playsInline
          preload={index < 2 ? "auto" : "none"}
          tabIndex={-1}
          aria-hidden="true"
        />
        <div className="scrim-top" />
        <div className="scrim-bottom" />
        <SceneOverlay overlay={scene.overlay} />

        <span className="pointer-events-none absolute right-5 top-5 u-mono text-[10px] tracking-[0.22em] text-white/30 sm:right-8">
          {scene.no} · {scene.name}
        </span>
      </div>
    </section>
  );
}

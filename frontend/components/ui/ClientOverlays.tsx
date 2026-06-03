'use client';

import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), { ssr: false });

export default function ClientOverlays() {
  return (
    <>
      <SplashCursor
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1024}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        CURL={3}
        SHADING={true}
        TRANSPARENT={true}
      />
    </>
  );
}

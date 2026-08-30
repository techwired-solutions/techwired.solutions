export type Overlay =
  | { kind: "intro" }
  | { kind: "telemetry" }
  | { kind: "line"; text: string; align?: "center" | "wide" }
  | { kind: "product"; index: 0 | 1 | 2; side: "left" | "right" }
  | { kind: "constellation" }
  | { kind: "none" };

export type SceneDef = {
  id: string;
  no: string;
  name: string;
  clip: string; // /journey/clips/NN.mp4  (also NN-sm.mp4)
  poster: string; // start keyframe
  posterOut: string; // end keyframe (reduced-motion resting image)
  hold: number; // section height in viewport-heights
  overlay: Overlay;
};

export const scenes: SceneDef[] = [
  {
    id: "ignition",
    no: "01",
    name: "Ignition",
    clip: "/journey/clips/01",
    poster: "/journey/keyframes/00.jpg",
    posterOut: "/journey/keyframes/01.jpg",
    hold: 1.7,
    overlay: { kind: "intro" },
  },
  {
    id: "wire",
    no: "02",
    name: "The Wire",
    clip: "/journey/clips/02",
    poster: "/journey/keyframes/01.jpg",
    posterOut: "/journey/keyframes/02.jpg",
    hold: 2.3,
    overlay: { kind: "telemetry" },
  },
  {
    id: "breakthrough",
    no: "03",
    name: "Breakthrough",
    clip: "/journey/clips/03",
    poster: "/journey/keyframes/02.jpg",
    posterOut: "/journey/keyframes/03.jpg",
    hold: 1.9,
    overlay: { kind: "line", text: "We build and run our own products.", align: "center" },
  },
  {
    id: "linkypot",
    no: "04",
    name: "Linkypot",
    clip: "/journey/clips/04",
    poster: "/journey/keyframes/03.jpg",
    posterOut: "/journey/keyframes/04.jpg",
    hold: 2.5,
    overlay: { kind: "product", index: 0, side: "right" },
  },
  {
    id: "krisearch",
    no: "05",
    name: "Krisearch",
    clip: "/journey/clips/05",
    poster: "/journey/keyframes/04.jpg",
    posterOut: "/journey/keyframes/05.jpg",
    hold: 2.5,
    overlay: { kind: "product", index: 1, side: "left" },
  },
  {
    id: "gharbari",
    no: "06",
    name: "Gharbari",
    clip: "/journey/clips/06",
    poster: "/journey/keyframes/05.jpg",
    posterOut: "/journey/keyframes/06.jpg",
    hold: 2.5,
    overlay: { kind: "product", index: 2, side: "right" },
  },
  {
    id: "constellation",
    no: "07",
    name: "Constellation",
    clip: "/journey/clips/07",
    poster: "/journey/keyframes/06.jpg",
    posterOut: "/journey/keyframes/07.jpg",
    hold: 2,
    overlay: { kind: "constellation" },
  },
  {
    id: "horizon",
    no: "08",
    name: "Horizon",
    clip: "/journey/clips/08",
    poster: "/journey/keyframes/07.jpg",
    posterOut: "/journey/keyframes/08.jpg",
    hold: 1.9,
    overlay: {
      kind: "line",
      text: "Software we're proud to keep our name on.",
      align: "wide",
    },
  },
  {
    id: "arrival",
    no: "09",
    name: "Arrival",
    clip: "/journey/clips/09",
    poster: "/journey/keyframes/08.jpg",
    posterOut: "/journey/keyframes/09.jpg",
    hold: 1.6,
    overlay: { kind: "none" },
  },
];

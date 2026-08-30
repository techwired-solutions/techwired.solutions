# Techwired Solutions — "The Signal"

The [techwiredsolutions.com.np](https://techwiredsolutions.com.np) site as a
single scroll-driven journey: a pulse of light ignites in the void, races down a
wire, breaks into open sky, passes through the products we build (Linkypot,
Krisearch, Gharbari), and comes to rest at a contact form.

Nine full-bleed scenes, each an AI-generated video clip **scrubbed to scroll
position**. Concept + prompt sheet: [`docs/the-signal-journey`](https://claude.ai/code/artifact/55ecb77b-cb2c-4906-be0b-96be6621719d).

## Stack

- [Next.js 16](https://nextjs.org) · React 19 · Tailwind CSS v4
- [`lenis`](https://github.com/darkroomengineering/lenis) — smooth scroll
- Manual rAF loop maps scroll → `video.currentTime` and drives overlay reveals
  via a `--p` CSS var (no per-frame React renders)
- Fonts: Bricolage Grotesque / Hanken Grotesk / JetBrains Mono (Google Fonts)

## Assets

```
public/journey/
  clips/       01.mp4 … 09.mp4  (720p, seekable, no audio) + NN-sm.mp4 (480p mobile)
  keyframes/   00.jpg … 09.jpg  (scene boundary stills — posters + reduced-motion fallback)
  auras/       linkypot.jpg  krisearch.jpg  gharbari.jpg
```

Clips are re-encoded from the Flow/Veo exports with a dense keyframe interval
(`ffmpeg … -x264-params keyint=3`) so `currentTime` scrubbing stays smooth. Scene
copy, order, and hold lengths live in
[`components/journey/scenes.ts`](components/journey/scenes.ts).

If the repo gets heavy, the `clips/` folder can move to Vercel Blob or R2 and the
paths in `scenes.ts` updated.

## Develop

```bash
npm install
npm run dev
```

`npm run build` · `npm run lint`.

## Behaviour

- **Reduced-motion / save-data:** every scene falls back to its end keyframe as a
  static full-screen still; normal scroll, overlays still fade in.
- **Mobile:** 480p clips, shorter preload window.
- **Contact form:** `POST /api/contact` → Resend when `RESEND_API_KEY` is set,
  otherwise a `mailto:` fallback. See `.env.example`.

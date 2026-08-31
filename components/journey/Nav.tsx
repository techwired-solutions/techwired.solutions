"use client";

/* The wordmark starts screen-filling and centred, then — driven by `--k`
   (0 → 1 over the first sliver of scroll) — shrinks and docks to the top-left
   as the fixed logo. */

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-0 z-30">
      {/* docking wordmark */}
      <a
        href="#top"
        aria-label="Techwired Solutions — home"
        className="pointer-events-auto absolute whitespace-nowrap u-poster leading-[0.8] text-ink [text-shadow:0_4px_40px_rgba(0,0,0,0.45)]"
        style={{
          left: "calc((1 - var(--k,0)) * 50vw + var(--k,0) * clamp(20px, 4vw, 52px))",
          top: "calc((1 - var(--k,0)) * 38vh + var(--k,0) * 20px)",
          transform:
            "translate(calc((1 - var(--k,0)) * -50%), calc((1 - var(--k,0)) * -50%))",
          fontSize: "calc(1.35rem + (1 - var(--k,0)) * (15.5vw - 1.35rem))",
        }}
      >
        Techwired
      </a>

      {/* "Solutions" + strapline — only at the very top */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{
          top: "calc(38vh + 9vw)",
          opacity: "calc(1 - clamp(0, var(--s,0) * 33, 1))",
        }}
      >
        <p className="u-poster text-[clamp(1.5rem,6.5vw,4rem)] leading-none text-ink/75">
          Solutions
        </p>
        <p className="mt-5 u-mono text-[10px] tracking-[0.34em] text-teal">
          scroll to begin ↓
        </p>
      </div>

      <div
        className="pointer-events-auto absolute right-4 top-4 flex items-center gap-2 sm:right-8"
        style={{ opacity: "var(--k,0)" }}
      >
        <a href="#contact" className="btn btn-ghost hidden sm:inline-flex">
          Skip to contact
        </a>
        <a href="#contact" className="btn btn-primary">
          Start a project
        </a>
      </div>
    </header>
  );
}

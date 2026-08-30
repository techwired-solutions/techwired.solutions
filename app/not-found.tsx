import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-5 bg-void px-6 text-center">
      <span className="u-display text-[clamp(4rem,16vw,9rem)] text-ink">404</span>
      <p className="max-w-[34ch] text-[15px] text-muted">
        The signal doesn&apos;t reach this far. Head back to the start.
      </p>
      <Link
        href="/"
        className="rounded border border-teal px-4 py-2.5 u-mono text-[11px] tracking-[0.16em] text-teal transition-colors hover:bg-teal hover:text-void"
      >
        return
      </Link>
    </main>
  );
}

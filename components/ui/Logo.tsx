import { cn } from "@/lib/utils";

/* The "wired node" mark — a T built from three connected nodes.
   Strokes use currentColor so it inherits whatever text colour it sits in. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-7", className)}
    >
      <path
        d="M9 9.5H23M16 9.5V22.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="9.5" r="2.6" fill="currentColor" />
      <circle cx="23" cy="9.5" r="2.6" fill="currentColor" />
      <circle cx="16" cy="22.5" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 text-ink", className)}>
      <LogoMark />
      <span className="text-[15px] font-medium tracking-tight">
        Techwired&nbsp;Solutions
      </span>
    </span>
  );
}

"use client";

/* Progress rail — reads the global `--s`, no JS loop of its own. */
export function Rail() {
  return (
    <>
      {/* mobile: top hairline */}
      <div
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gradient-to-r from-teal via-blue to-gold md:hidden"
        style={{ transform: "scaleX(var(--s,0))" }}
        aria-hidden
      />
      {/* desktop: left rail */}
      <div className="fixed left-[26px] top-0 z-40 hidden h-full w-[2px] md:block" aria-hidden>
        <div className="absolute inset-y-[7%] left-0 w-px bg-white/10" />
        <div
          className="absolute left-[-1px] top-[7%] w-[3px] origin-top bg-gradient-to-b from-teal via-blue to-gold"
          style={{
            height: "86%",
            transform: "scaleY(var(--s,0))",
            boxShadow: "0 0 12px rgba(31,227,203,0.5)",
          }}
        />
        <div
          className="absolute left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-white"
          style={{
            top: "calc(7% + var(--s,0) * 86%)",
            marginTop: "-5px",
            boxShadow:
              "0 0 0 3px rgba(31,227,203,0.35), 0 0 20px 3px rgba(31,227,203,0.6), 0 0 34px 8px rgba(255,180,84,0.22)",
          }}
        />
      </div>
    </>
  );
}

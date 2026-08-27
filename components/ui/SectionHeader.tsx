import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/* Feature section header: small Control label + a heading that mixes
   upright (.tnt) with one cursive word. Centre-aligned on the dark canvas. */
export function SectionHeader({
  label,
  children,
  align = "center",
  className,
}: {
  label: string;
  children: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-twilight">
        {label}
      </span>
      <h2 className="tnt max-w-[18ch] text-[clamp(28px,5vw,52px)] text-whiteout sm:max-w-[22ch]">
        {children}
      </h2>
    </Reveal>
  );
}

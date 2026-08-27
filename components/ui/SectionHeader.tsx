import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/* Feature section header: small Control label + a heading that mixes
   upright (.tnt) with one cursive word. */
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
      <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-twilight-blue">
        {label}
      </span>
      <h2 className="tnt max-w-[18ch] text-[clamp(28px,5vw,52px)] sm:max-w-[24ch]">
        {children}
      </h2>
    </Reveal>
  );
}

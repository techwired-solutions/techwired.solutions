import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/* Poster-scale statement that bleeds to the viewport edges. */
export function Statement({
  children,
  tone = "night",
  className,
}: {
  children: React.ReactNode;
  tone?: "night" | "cream";
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative z-10 overflow-hidden px-5 py-28 sm:py-40",
        tone === "night" ? "bg-night text-whiteout" : "bg-page text-ink",
        className,
      )}
    >
      <Reveal className="mx-auto max-w-[1600px]">
        <p className="display text-[clamp(3rem,12vw,15rem)]">{children}</p>
      </Reveal>
    </section>
  );
}

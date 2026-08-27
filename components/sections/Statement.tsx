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
        "overflow-hidden px-6 py-24 sm:py-32",
        tone === "night" ? "bg-night text-whiteout" : "bg-page text-ink",
        className,
      )}
    >
      <Reveal className="mx-auto max-w-[1400px]">
        <p className="display text-[clamp(2.75rem,9vw,10rem)]">{children}</p>
      </Reveal>
    </section>
  );
}

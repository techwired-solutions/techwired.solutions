import { ArrowUpRight } from "lucide-react";
import { work } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  return (
    <section id="work" className="border-t border-ink/10 bg-page py-20 sm:py-24">
      <Container className="flex flex-col gap-10">
        <Reveal className="flex flex-col gap-3">
          <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-twilight-blue">
            Also built for
          </span>
          <p className="max-w-[52ch] text-[15px]">
            We take on a small number of client projects each year — usually
            businesses we&apos;d use ourselves.
          </p>
        </Reveal>

        <Reveal className="divide-y divide-ink/10 border-y border-ink/10">
          {work.map((w) => (
            <a
              key={w.name}
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 py-4 transition-colors hover:bg-ink/[0.03]"
            >
              <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="text-[17px] font-medium text-ink">{w.name}</span>
                <span className="text-[13px] text-ink/50">{w.tag}</span>
              </span>
              <span className="flex items-center gap-2 text-[13px] text-ink/45">
                <span className="hidden sm:inline">{w.hrefLabel}</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </span>
            </a>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { ventures } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { Reveal } from "@/components/ui/Reveal";

export function Ventures() {
  return (
    <section id="companies" className="py-24 sm:py-32">
      <Container className="flex flex-col gap-16 sm:gap-24">
        <SectionHeader label="Our companies">
          Products we design, build, and{" "}
          <span className="cursive text-[1.15em]">keep</span> running
        </SectionHeader>

        <div className="flex flex-col gap-16 sm:gap-24">
          {ventures.map((v, i) => (
            <Reveal
              key={v.name}
              className={cn(
                "grid items-center gap-8 sm:gap-12 lg:grid-cols-2",
              )}
            >
              <div
                className={cn(
                  "overflow-hidden rounded-image border border-white/10",
                  i % 2 === 1 && "lg:order-2",
                )}
              >
                <div className="relative aspect-[16/11]">
                  <Image
                    src={v.image}
                    alt={`${v.name} — screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div
                className={cn(
                  "flex flex-col items-start gap-4",
                  i % 2 === 1 && "lg:order-1",
                )}
              >
                <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-twilight">
                  {v.tag}
                </span>
                <h3 className="tnt text-[clamp(28px,4vw,40px)] text-whiteout">
                  {v.name}
                </h3>
                <p className="max-w-[42ch] text-[16px] leading-[1.55]">
                  {v.blurb}
                </p>
                <UnderlineLink href={v.href} external arrow className="mt-1">
                  {v.hrefLabel}
                </UnderlineLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

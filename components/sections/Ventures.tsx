import Image from "next/image";
import { ventures } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { Reveal } from "@/components/ui/Reveal";

export function Ventures() {
  return (
    <section id="companies" className="border-y border-black/10 bg-haze py-16 sm:py-24">
      <Container className="flex flex-col gap-12 sm:gap-16">
        <SectionHeader label="Our companies">
          Products we design, build, and{" "}
          <span className="cursive text-[1.15em]">keep</span> running
        </SectionHeader>

        <div className="flex flex-col gap-10 sm:gap-14">
          {ventures.map((v, i) => (
            <Reveal
              key={v.name}
              className={cn("grid items-center gap-6 sm:gap-12 lg:grid-cols-2")}
            >
              <div
                className={cn(
                  "overflow-hidden rounded-image border border-black/10 bg-whiteout",
                  i % 2 === 1 && "lg:order-2",
                )}
              >
                <div className="relative aspect-[16/10]">
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
                <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-twilight-blue">
                  {v.tag}
                </span>
                <h3 className="tnt text-[clamp(28px,4vw,40px)]">{v.name}</h3>
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

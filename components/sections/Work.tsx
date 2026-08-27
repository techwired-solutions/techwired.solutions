import Image from "next/image";
import { work } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  return (
    <section id="work" className="py-14 sm:py-20">
      <Container className="flex flex-col gap-14">
        <SectionHeader label="Selected work">
          Sites we&apos;ve built{" "}
          <span className="cursive text-[1.15em]">for others</span>
        </SectionHeader>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {work.map((item, i) => (
            <Reveal key={item.name} delay={(i % 2) * 0.06} className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-image border border-white/10">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={`${item.name} — screenshot`}
                    fill
                    sizes="(max-width: 640px) 100vw, 540px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-medium text-whiteout">
                  {item.name}
                </h3>
                <p className="text-[14px] text-white/55">{item.tag}</p>
              </div>
              {item.href && (
                <UnderlineLink href={item.href} external arrow>
                  {item.hrefLabel}
                </UnderlineLink>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

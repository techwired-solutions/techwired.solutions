import Image from "next/image";
import { products } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";

export function Products() {
  return (
    <section
      id="products"
      className="relative overflow-hidden bg-night py-24 text-whiteout sm:py-32"
    >
      {/* faint sky so the glass reads as glass */}
      <Image
        src="/images/sky/day.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-20"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-night/70" />

      <Container className="relative flex flex-col gap-14">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/55">
            What we build
          </span>
          <h2 className="tnt max-w-[22ch] text-[clamp(28px,5vw,52px)] text-whiteout">
            Three products we design, build, and{" "}
            <span className="cursive text-[1.15em]">keep</span> running
          </h2>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {products.map((p, i) => {
            const featured = i === 1;
            return (
              <Reveal
                key={p.name}
                delay={i * 0.08}
                className={cn(
                  "flex flex-col gap-5 rounded-xl p-5",
                  featured ? "glass-strong lg:-mt-6 lg:mb-6" : "glass",
                )}
              >
                <div className="overflow-hidden rounded-image border border-white/15">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={`${p.name} — screenshot`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 380px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/55">
                  {p.tag}
                </span>
                <h3 className="tnt text-[26px] text-whiteout">{p.name}</h3>
                <p className="text-[14px] leading-[1.6] text-white/70">
                  {p.blurb}
                </p>
                <UnderlineLink
                  href={p.href}
                  external
                  arrow
                  tone="whiteout"
                  className="mt-auto"
                >
                  {p.hrefLabel}
                </UnderlineLink>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

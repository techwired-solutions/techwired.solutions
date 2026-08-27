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
      className="relative z-10 overflow-hidden bg-night py-24 text-whiteout sm:py-32"
    >
      {/* faint sky so the glass reads as glass */}
      <Image
        src="/images/sky/sky.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-25"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-night/75" />

      <Container className="relative flex flex-col gap-16">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="text-[20px] font-medium text-white/60">
            Our products
          </span>
          <h2 className="tnt max-w-[20ch] text-[clamp(32px,5vw,56px)] text-whiteout">
            Designed, built, and{" "}
            <span className="cursive text-[1.15em]">kept</span> running by us
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
                  featured ? "glass-strong lg:-mt-8 lg:mb-8" : "glass",
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
                <h3 className="tnt text-[28px] text-whiteout">{p.name}</h3>
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

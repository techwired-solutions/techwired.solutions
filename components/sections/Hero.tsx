import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center pt-[72px]">
      <Container className="py-20 sm:py-28">
        <div className="flex max-w-[52rem] flex-col gap-8">
          <Reveal>
            <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-twilight">
              Techwired Solutions — Kathmandu, Nepal
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="display text-[clamp(3.25rem,12vw,8.5rem)]">
              Built in Nepal.
              <br />
              Shipped{" "}
              <span className="cursive text-[1.04em] leading-[0.7] text-whiteout">
                everywhere.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-[46ch] text-[clamp(16px,2.2vw,20px)] leading-[1.5]">
              Techwired Solutions is a technology company. We design, build, and
              operate our own products — Linkypot, Krisearch, Gharbari — and ship
              digital work for a handful of clients we believe in.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button as="a" href="#contact" variant="ghost" tone="onDark">
                Start a project
              </Button>
              <UnderlineLink href="#companies" tone="whiteout" arrow>
                See what we&apos;ve built
              </UnderlineLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

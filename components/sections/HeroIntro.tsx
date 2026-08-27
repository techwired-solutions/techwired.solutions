import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function HeroIntro() {
  return (
    <section className="relative z-10 flex min-h-[92svh] items-center bg-page">
      <Container className="flex flex-col items-center gap-8 py-24 text-center">
        <Reveal>
          <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-twilight-blue">
            Techwired Solutions
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="tnt max-w-[16ch] text-[clamp(2.5rem,6.5vw,4.5rem)]">
            We build the products we{" "}
            <span className="cursive text-[1.05em] text-signal-blue">use</span>{" "}
            ourselves
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-[52ch] text-[clamp(16px,2vw,20px)] leading-[1.5]">
            A technology company that designs, builds, and operates its own
            software — Linkypot, Krisearch, Gharbari — and ships for a few
            clients each year. We work remotely.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href="#products" variant="ghost">
              See our products
            </Button>
            <Button as="a" href="#contact" variant="solid">
              Start a project
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import { approach } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Approach() {
  return (
    <section id="approach" className="relative z-10 bg-page py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-twilight-blue">
            How we work
          </span>
          <h2 className="tnt max-w-[20ch] text-[clamp(28px,5vw,52px)]">
            Build it, run it,{" "}
            <span className="cursive text-[1.15em]">grow</span> it
          </h2>
        </Reveal>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-3">
          {approach.map((s, i) => (
            <Reveal
              key={s.k}
              delay={i * 0.08}
              className="flex flex-col gap-3 border-t border-ink/15 pt-5"
            >
              <span className="display text-[clamp(3rem,7vw,5.5rem)] text-ink/15">
                {s.k}
              </span>
              <h3 className="tnt text-[24px]">{s.title}</h3>
              <p className="text-[15px] leading-[1.6]">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

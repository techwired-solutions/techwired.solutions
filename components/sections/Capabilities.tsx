import { capabilities } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeader label="What we do">
          We take an idea from <span className="cursive text-[1.15em]">sketch</span>{" "}
          to shipped
        </SectionHeader>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => (
            <Reveal
              key={cap.title}
              delay={i * 0.06}
              className="flex flex-col gap-4 rounded-card bg-haze p-5 text-ink"
            >
              <cap.icon className="h-6 w-6 text-ink" strokeWidth={1.5} />
              <h3 className="text-[20px] font-medium leading-tight text-ink">
                {cap.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-ink/65">{cap.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

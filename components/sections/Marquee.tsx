import { roster } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Marquee() {
  const items = [...roster, ...roster, ...roster, ...roster];

  return (
    <section className="relative z-10 border-y border-ink/10 bg-page py-12">
      <Container>
        <p className="mb-8 text-center text-[13px] font-medium uppercase tracking-[0.18em] text-twilight-blue">
          In production
        </p>
      </Container>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
        }}
      >
        <ul className="marquee-track flex w-max items-center gap-16 whitespace-nowrap pr-16">
          {items.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="display text-[34px] text-ink/25"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

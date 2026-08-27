import { roster } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Marquee() {
  const items = [...roster, ...roster];

  return (
    <section className="border-y border-black/10 bg-haze py-10">
      <Container>
        <p className="mb-7 text-center text-[13px] font-medium uppercase tracking-[0.16em] text-ink/40">
          Products &amp; projects
        </p>
      </Container>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <ul className="marquee-track flex w-max items-center gap-14 whitespace-nowrap pr-14">
          {items.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="text-[18px] font-medium tracking-tight text-ink/55"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

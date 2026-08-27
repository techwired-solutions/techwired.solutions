import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const facts = [
  { k: "3", v: "products in market" },
  { k: "4+", v: "client launches" },
  { k: "Kathmandu", v: "where we're based" },
];

export function About() {
  return (
    <section id="about" className="py-14 sm:py-20">
      <Container className="flex flex-col gap-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-twilight">
              About
            </span>
            <h2 className="tnt text-[clamp(28px,5vw,52px)] text-whiteout">
              A small team that{" "}
              <span className="cursive text-[1.15em]">ships</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-5">
            <p className="max-w-[52ch] text-[16px] leading-[1.6]">
              Techwired Solutions started as the studio behind a set of products
              we wanted to use ourselves. Today we&apos;re a Kathmandu-based
              company of designers and engineers building for our own brands
              first, and for a few clients whose work we believe in.
            </p>
            <p className="max-w-[52ch] text-[16px] leading-[1.6]">
              We care about the parts that never show up in a screenshot — fast
              pages, honest copy, interfaces that stay out of the way, and code
              the next person can actually read.
            </p>
            <p className="text-[14px] text-white/45">
              Founded by {site.founder}.
            </p>
          </Reveal>
        </div>

        <Reveal className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.v} className="flex flex-col gap-1 bg-black p-6">
              <span className="tnt text-[28px] text-whiteout">{f.k}</span>
              <span className="text-[13px] uppercase tracking-[0.14em] text-white/45">
                {f.v}
              </span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

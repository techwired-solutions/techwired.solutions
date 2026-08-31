import Image from "next/image";
import { site, products } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-30 w-full overflow-hidden border-t border-white/10 bg-void"
    >
      <Image
        src="/journey/keyframes/09.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/90 to-void" />

      <div className="relative mx-auto flex max-w-[1100px] flex-col gap-14 px-6 py-24 sm:px-12 sm:py-32">
        <div className="flex flex-col gap-5">
          <span className="u-mono text-[11px] tracking-[0.3em] text-teal">
            End of the line
          </span>
          <h2 className="u-poster text-[clamp(2.6rem,8vw,6rem)] leading-[0.94] text-ink">
            Tell us what
            <br />
            you&apos;re building
          </h2>
          <p className="max-w-[52ch] text-[15px] leading-[1.6] text-muted">
            A product, a website, or a rescue of something half-finished. We work
            remotely and reply within a day or two.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="flex flex-col gap-3 u-mono text-[12px] tracking-[0.06em] text-muted">
            <a href={`mailto:${site.email}`} className="link-sweep w-fit">
              {site.email}
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit transition-colors hover:text-ink"
            >
              github.com/techwired-solutions
            </a>
            <span className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-faint">
              {products.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  {p.name}
                </a>
              ))}
            </span>
          </div>
          <ContactForm />
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-8 u-mono text-[10px] tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name} · built and run remotely
          </span>
          <span>{site.domain}</span>
        </div>
      </div>
    </section>
  );
}

import { Mail, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" className="py-14 sm:py-20">
      <Container>
        <Reveal className="grid gap-8 rounded-card bg-haze p-6 text-ink sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div className="flex flex-col gap-5">
            <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-twilight">
              Contact
            </span>
            <h2 className="tnt text-[clamp(28px,4.5vw,44px)] text-ink">
              Start a project
            </h2>
            <p className="max-w-[38ch] text-[16px] leading-[1.6] text-ink/65">
              Tell us what you&apos;re building — a product, a website, a rescue
              of something half-finished. We reply within a day or two.
            </p>

            <div className="mt-2 flex flex-col gap-3 text-[14px] text-ink/75">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} />
                {site.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" strokeWidth={1.75} />
                {site.location}
              </span>
            </div>
          </div>

          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}

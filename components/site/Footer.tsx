import { site, nav, ventures } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-haze py-16">
      <Container className="flex flex-col gap-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2.5 text-ink">
              <LogoMark />
              <span className="text-[15px] font-medium tracking-tight">
                Techwired Solutions
              </span>
            </span>
            <p className="max-w-[32ch] text-[14px] leading-[1.55] text-ink/50">
              A technology company from {site.location} — building its own
              products and shipping for clients.
            </p>
          </div>

          <FooterCol title="Company">
            {nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Companies">
            {ventures.map((v) => (
              <FooterLink key={v.name} href={v.href} external>
                {v.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Elsewhere">
            <FooterLink href={`mailto:${site.email}`}>Email</FooterLink>
            <FooterLink href={site.github} external>
              GitHub
            </FooterLink>
          </FooterCol>
        </div>

        <div className="flex flex-col gap-2 border-t border-black/10 pt-6 text-[13px] text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Techwired Solutions. All rights reserved.
          </span>
          <span>{site.domain}</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-ink/40">
        {title}
      </span>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-[14px] text-ink/65 transition-colors hover:text-ink"
    >
      {children}
    </a>
  );
}

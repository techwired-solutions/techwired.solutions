import { site, nav, products } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative z-10 bg-night-deep py-16 text-whiteout">
      <Container className="flex flex-col gap-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2.5 text-whiteout">
              <LogoMark />
              <span className="text-[15px] font-medium tracking-tight">
                Techwired Solutions
              </span>
            </span>
            <p className="max-w-[34ch] text-[14px] leading-[1.55] text-white/55">
              {site.tagline} Built and run remotely.
            </p>
          </div>

          <FooterCol title="Site">
            {nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Products">
            {products.map((p) => (
              <FooterLink key={p.name} href={p.href} external>
                {p.name}
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

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
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
      <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/35">
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
      className="text-[14px] text-white/60 transition-colors hover:text-whiteout"
    >
      {children}
    </a>
  );
}

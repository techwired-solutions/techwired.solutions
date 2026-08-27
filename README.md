# Techwired Solutions

Marketing site for [Techwired Solutions](https://techwiredsolutions.com.np) — a
technology company from Kathmandu that builds and operates its own products
(Linkypot, Krisearch, Gharbari) and ships digital work for clients.

Single-page site, dark "Air"-style design system: type-driven, flat surfaces,
ghost buttons, no gradients.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) · React 19
- Tailwind CSS v4
- `lucide-react` for icons · `framer-motion` for scroll reveals
- Deployed on Vercel

## Develop

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Contact form

`POST /api/contact` sends enquiries via [Resend](https://resend.com) when
`RESEND_API_KEY` is set. Without it the endpoint returns `503 not_configured`
and the form falls back to a `mailto:` link. See [`.env.example`](.env.example).

Set these in Vercel → Project → Settings → Environment Variables:

| Variable         | Notes                                             |
| ---------------- | ------------------------------------------------- |
| `RESEND_API_KEY` | optional; enables real email delivery             |
| `CONTACT_TO`     | recipient address (default `hello@…com.np`)       |
| `CONTACT_FROM`   | verified Resend sender                            |

## Structure

```
app/            routes, layout, /api/contact, robots + sitemap
components/
  site/         Nav, Footer
  sections/     Hero, Marquee, Capabilities, Ventures, Work, About, Contact
  ui/           Button, Container, Logo, Reveal, SectionHeader, UnderlineLink
lib/site.ts     all site copy + the companies / work lists
public/images/work/  site screenshots
```

Editing content — companies, client work, capabilities, contact details — is
done in [`lib/site.ts`](lib/site.ts).

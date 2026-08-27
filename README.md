# Techwired Solutions

Marketing site for [Techwired Solutions](https://techwiredsolutions.com.np) — a
technology company from Kathmandu that builds and operates its own products
(Linkypot, Krisearch, Gharbari) and ships digital work for clients.

Single-page site on the "Air" design system: warm cream canvas (#fff8dc), a
full-bleed photographic hero with a glass wordmark and four time-of-day sky
modes (Sunrise / Day / Sunset / Night, persisted in localStorage), poster-scale
compressed headlines, glass product cards, flat surfaces, no shadows.

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
  sections/     Hero, Marquee, Products, Statement, Approach, Work, Contact
  ui/           Button, Container, Logo, Reveal, UnderlineLink
lib/site.ts     all site copy — products, approach, client work, sky modes
public/images/sky/   the four hero sky photos
public/images/work/  product / client screenshots
```

Editing content — products, approach, client work, contact details — is done in
[`lib/site.ts`](lib/site.ts). Hero sky photos live in `public/images/sky/`
(`sunrise.jpg`, `day.jpg`, `sunset.jpg`, `night.jpg`).

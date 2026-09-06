# The Fractional CTO

Marketing site for The Fractional CTO: a single long landing page selling
fractional CTO retainers, technical audits, MVP builds and AI automation to
startups, growing businesses and the people who back them.

Next.js 14 (App Router), Tailwind, shadcn-style tokens, dark theme. Deploys as
a standalone Node server to Azure App Service.

## Run it

```bash
npm install
cp .env.example .env.local   # then edit
npm run dev                  # http://localhost:3002
```

Checks that CI runs:

```bash
npm run lint
npm run typecheck
npm run build
```

## Where things live

| What | Where |
| --- | --- |
| On/off switches, prices, booking link | Environment variables, read by `lib/config.ts` |
| Headlines, service copy, FAQ, process steps | `lib/content.ts` |
| Stats strip and bio (both PLACEHOLDER) | `lib/content.ts`, marked `PLACEHOLDER` |
| Photo | `public/about-placeholder.svg`, swap and update `about.photo` |
| Colours and type | `app/globals.css` (tokens), `tailwind.config.ts` |
| Page sections | `components/sections/*` |
| Contact form email | `app/api/contact/route.ts` via `lib/mailjet.ts` |
| Checklist download | `app/api/checklist/route.ts`, PDF in `public/` |
| Checklist source | `scripts/checklist.html`, rebuild with `npm run checklist:pdf` |
| SEO | `app/layout.tsx` metadata, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, JSON-LD in `app/page.tsx` |
| Azure deploy | `.github/workflows/deploy.yml` |

## Pricing switches

Each of the three tiers and the two fixed-scope offers has its own switches.
Every value has a sensible default, so nothing needs to be set to get the
full page.

```
TIER_ADVISOR_ENABLED=true        # hide the whole tier with false
TIER_ADVISOR_SHOW_PRICE=true     # keep the tier, hide the number
TIER_ADVISOR_PRICE=2500          # whole dollars per month
TIER_ADVISOR_NAME=Advisor        # optional rename
```

The same three exist for `TIER_FRACTIONAL_*` and `TIER_EMBEDDED_*`, and for
the one-offs as `ONEOFF_AUDIT_*` and `ONEOFF_MVP_*` where the price is a
"from" price. `LEAD_MAGNET_ENABLED` and `CONTACT_FORM_ENABLED` remove those
sections entirely.

The home page renders per request, so changing an App Service setting and
restarting the app is enough. No rebuild.

## Booking link

`BOOKING_URL` is where every "Book a discovery call" button goes. Until it
is set, the buttons scroll to the contact form. Set it to the Microsoft
Bookings page URL once that is created.

## Email

Both forms send through Mailjet's Send API v3.1 with `MAILJET_API_KEY`,
`MAILJET_SECRET_KEY` and `MAILJET_FROM_EMAIL`. The from address must be a
validated sender or domain in Mailjet. Enquiries go to `CONTACT_TO_EMAIL`
(defaults to `CONTACT_EMAIL`).

Without Mailjet configured the contact form shows a friendly error naming
the email address, and the checklist form still hands over the download
link. Both are logged as errors on the server so the gap is visible.

## Analytics

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and/or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
before `next build`. Nothing loads when they are unset. These are the only
build-time variables; in the workflow they come from repository variables.

## Deploying to Azure App Service

1. Create a Linux App Service on Node 22 named `the-fractional-cto` (or
   change `app-name` in the workflow). Startup command: `node server.js`.
2. Add the runtime settings from `.env.example` as application settings.
3. Add the `AZURE_CREDENTIALS` repository secret (service principal JSON).
4. Push to `main`. The workflow lints, typechecks, builds and deploys
   `.next/standalone`.

## Before launch

- Replace the stats in `lib/content.ts`.
- Replace the bio and photo in `lib/content.ts` and `public/`.
- Set `BOOKING_URL`.
- Set the Mailjet keys and validate the sender.
- Point the domain at the App Service. `thefractionalcto.com.au`, `.au` and
  `.co` were all available on 6 September 2026; `.com` was taken.

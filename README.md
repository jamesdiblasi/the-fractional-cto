# The Fractional CTO

Marketing site for The Fractional CTO: a single long landing page selling
fractional CTO retainers, technical audits, MVP builds and AI automation to
startups, growing businesses and the people who back them.

Next.js 14 (App Router), Tailwind, shadcn-style tokens. The design borrows
from designjoy.co: white ground, oversized Figtree headlines with tight
tracking, black pill buttons, one electric-blue accent, a featured plan with
"pause or cancel anytime" callouts, and a founder-led hero. No emoji. Deploys
as a standalone Node server to Azure App Service.

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
| Headlines, benefits, services, FAQ, how-it-works steps | `lib/content.ts` |
| Founder name and bio (PLACEHOLDER) | `lib/content.ts`, `founder`, marked `PLACEHOLDER` |
| Founder photo | `public/founder-placeholder.svg`; replace with a transparent cutout PNG or WebP and update `founder.photo` |
| Technology logo row | `lib/tech-logos.ts` (simple-icons paths), rendered by `components/sections/TechLogos.tsx` |
| Colours and type | `app/globals.css` (tokens), `tailwind.config.ts` |
| Page sections | `components/sections/*` |
| Keyword articles | `lib/articles/*.ts`, rendered by `app/articles` |
| Contact form email | `app/api/contact/route.ts` via `lib/mailjet.ts` |
| Checklist download | `app/api/checklist/route.ts`, PDF in `public/` |
| Checklist source | `scripts/checklist.html`, rebuild with `npm run checklist:pdf` |
| SEO | `app/layout.tsx` metadata, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, JSON-LD in `app/page.tsx` |
| Azure deploy | `.github/workflows/deploy.yml` |

## Articles

`/articles` and `/articles/<slug>` exist to be found in search, not browsed.
Nothing in the navigation or the footer links to them, by design. Discovery
is `sitemap.xml`, the `/articles` index, and the cross-links the articles make
to each other, so keep the `related` slugs pointing somewhere real.

One article is one file in `lib/articles/`, exporting an `Article`. Register
it in `lib/articles/index.ts` and the route, the metadata, the Article,
BreadcrumbList and FAQPage structured data and the sitemap entry all follow.
Body copy is plain data: a few block types, plus `**bold**` and
`[label](/href)` inline. See `lib/articles/types.ts` and `components/Prose.tsx`.

The dollar figures in the current set are indicative Australian market ranges
for 2026, written to be defensible rather than precise. Review them before
launch, and once a year after that.

## Pricing switches

There is one plan and three add-ons. The subscription is sold on throughput,
not time: unlimited requests handled one at a time. Nothing is priced by the
hour or the day, because the hero promises a flat fee for unlimited requests
and a day rate would contradict it. Every value has a sensible default, so
nothing needs to be set to get the full page.

```
PLAN_ENABLED=true            # hide the plan with false
PLAN_SHOW_PRICE=true         # keep the plan, hide the number
PLAN_PRICE=10000             # whole dollars per month
PLAN_COMPARE_PRICE=7500      # optional struck-through price, 0 = none
PLAN_NAME=Fractional CTO     # optional rename
```

The same switches exist for each add-on as `ADDON_PARALLEL_*`,
`ADDON_AUDIT_*` and `ADDON_MVP_*`. Parallel is a monthly extra that buys a
second request at a time; the other two are fixed-scope work whose price is a
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

The site runs on the `the-fractional-cto` web app in resource group
`leadgen`, on the shared `leadnet-plan` App Service plan (Linux, Node 22,
startup command `node server.js`). Its default host is
https://the-fractional-cto.azurewebsites.net.

### The domain

`thefractionalcto.au` is registered at GoDaddy (registered 10 September 2026,
auto-renewing) and its DNS is served by GoDaddy's nameservers. Four records
point it at the App Service, the same shape every other site in this
subscription uses:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `13.77.50.113` (the app's inbound IP) |
| CNAME | `www` | `the-fractional-cto.azurewebsites.net` |
| TXT | `asuid` | the app's `customDomainVerificationId` |
| TXT | `asuid.www` | the same value |

The two `asuid` records are what Azure checks before it will accept the
hostname; without them `az webapp config hostname add` fails. The apex has to
be an A record because GoDaddy will not serve a CNAME at the zone root, so if
the app's inbound IP ever changes — a different plan, a redeploy into another
scale unit — that A record has to change with it. Read the current one with
`az webapp show -g leadgen -n the-fractional-cto --query inboundIpAddress`.

Both hostnames carry a free App Service managed certificate, renewed by Azure.
`httpsOnly` is on, so plain HTTP is redirected.

Every push to `main` runs `.github/workflows/deploy.yml`, which lints,
typechecks, builds and deploys `.next/standalone`. It authenticates with the
OIDC federated credential Azure's Deployment Center created (the three
`AZUREAPPSERVICE_*` repository secrets). Runtime settings from
`.env.example` live in the web app's application settings and take effect on
restart, no rebuild needed.

## Before launch

- Replace the stats in `lib/content.ts`.
- Replace the bio and photo in `lib/content.ts` and `public/`.
- Set `BOOKING_URL`.
- Set the Mailjet keys and validate the sender.
- Set up mail for `@thefractionalcto.au`. The address in `CONTACT_EMAIL` does
  not exist yet, and Mailjet needs the domain validated before either form can
  send.

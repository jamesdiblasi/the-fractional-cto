# Google Ads search campaign

A paid search campaign for `thefractionalcto.au`, prepared 22 September
2026. Search only: no Search partners, no Display, no Performance Max. The
core campaign imports as enabled and spends from the moment the account has
billing; the research campaign imports paused. The campaign is defined as
data in `scripts/build-google-ads.mjs`; `npm run ads:csv` writes the import files in
this folder and fails the build if any headline, description or path is over
Google's character limit. Edit the script, not the CSVs.

## What the research found

Search volumes and cost-per-click were pulled from the Google Ads keyword
data behind DataForSEO on 22 September 2026, for Australia, in English.
Monthly volume is a twelve-month average. CPC is Google's top-of-page
estimate in Australian dollars, and blank where Google has too little data
to say.

The market for the core term is small. Everything with "fractional CTO" in
it adds up to a few hundred searches a month across the country, and the
neighbouring terms are either tiny or expensive and only partly ours.

| Keyword | Searches / month | CPC (AUD) | Competition | Fit |
| --- | ---: | ---: | --- | --- |
| fractional cto | 170 | 6.81 | Low | Exact match for the offer |
| fractional cto services | 20 | | Low | |
| fractional cto rates | 10 | 18.43 | Medium | Pricing is on the page |
| fractional cto cost | 10 | | Medium | |
| part time cto | 10 | | Low | |
| cto as a service | 10 | 9.77 | Low | |
| virtual cto | 40 | | Low | |
| outsourced cto | 10 | | Low | |
| interim cto | 10 | | Low | |
| cto consultant | 70 | 11.69 | Low | |
| virtual cio | 70 | 6.51 | Low | Same buyer, different title |
| fractional cio | 30 | 7.37 | Low | |
| it strategy consultant | 70 | | Low | |
| technical due diligence | 30 | | Low | Mixed with property surveys |
| software audit | 90 | 15.43 | Medium | |
| code audit | 10 | 34.45 | Medium | |
| code review services | 10 | 39.62 | Medium | |
| mvp development | 110 | 17.20 | Low | |
| build an mvp | 50 | 66.34 | Low | Expensive for the volume |
| mvp development company | 20 | 37.27 | Low | |
| software development cost | 40 | 15.92 | Low | |
| cost to build an app | 30 | 26.53 | High | Consumer intent, left out |
| software development agency | 590 | 42.30 | High | We are not one, left out |
| ai automation | 1,000 | 17.29 | Medium | Broad, exact match only |
| ai consultant | 1,000 | 23.29 | Medium | Broad, exact match only |
| ai automation agency | 390 | 12.05 | Medium | |
| ai consulting services | 170 | 23.61 | Low | |
| ai consultant australia | 110 | 27.76 | Medium | |
| ai automation consultant | 50 | 30.51 | Low | |
| ai automation services | 90 | 17.61 | Low | |
| ai agents for business | 70 | 18.03 | Medium | |
| ai automation for small business | 20 | 22.34 | Medium | Article keyword |
| business process automation | 260 | 34.14 | Low | Software-buyer intent, left out |
| workflow automation | 260 | 29.94 | Medium | Software-buyer intent, left out |
| cloud consultant | 90 | 11.84 | Low | |
| azure cost management | 70 | 45.99 | Low | Mostly people looking for the Azure tool |
| cloud cost optimisation | 30 | | Low | |
| reduce cloud costs | 10 | | | Article keyword |

The article keywords ("what does a fractional cto do", "when to hire a cto",
"technical due diligence checklist", "how to choose a software development
agency", "how much does an mvp cost") each show about ten searches a month.
They are cheap and on-topic, but they are questions, not shopping, so they
sit in a second campaign that starts paused.

What the suggestion pulls turned up sharing our words, and now sits in the
negative list: CTO jobs and salaries, "how to become a fractional CTO", the
ASX-listed company CTO, "CTO" as a medical and mental-health term, technical
due diligence for property and construction, and the NBA's most valuable
player.

## What that means for the plan

- **Budget small, match tight.** Exact and phrase match only, no broad
  match, until there are conversions for Google to learn from. At the volumes
  above, twenty-five dollars a day covers every relevant click in the
  country in the core groups, with some room for the AI and MVP groups.
- **Two campaigns, separate budgets.** "Fractional CTO" buys people looking
  for the service. "Research intent" buys people asking the questions the
  articles answer, lands them on the article, and starts paused.
- **Bid on clicks first, conversions later.** Maximise clicks with a CPC
  cap until the account has fifteen to thirty conversions in a month, then
  switch to maximise conversions. Switching earlier starves the algorithm.
- **Home page is the landing page** for every commercial group, with an
  anchor into the relevant section. The articles are landing pages only for
  the research campaign.
- **The AI group is the expensive one.** Its clicks cost two to four times
  the core group. It is capped at twelve dollars, which will put the ads
  lower on the page, and that is fine: the searcher who scrolls past the
  agencies to a plain offer is the one we want.

## Structure

| Campaign | Ad group | Landing | Max CPC (AUD) |
| --- | --- | --- | ---: |
| Search - AU - Fractional CTO | Fractional CTO | `/` | 8 |
| | CTO advisory | `/` | 8 |
| | Technical due diligence and audit | `/#services` | 12 |
| | MVP build | `/#services` | 12 |
| | AI and automation | `/#services` | 12 |
| | Cloud cost | `/#benefits` | 10 |
| Search - AU - Research intent | What a fractional CTO does | article | 5 |
| | Fractional vs full-time CTO | article | 5 |
| | When to hire a CTO | article | 5 |
| | Due diligence checklist | article | 5 |
| | Choosing an agency | article | 5 |

Every keyword is added twice, as exact and as phrase, so the search terms
report shows which spelling of the question people actually type. Each ad
group has one responsive search ad with eleven to fifteen headlines and four
descriptions; the ad copy is the site copy, shortened. Sitelinks, callouts
and a structured snippet are shared across both campaigns.

Campaign settings that matter and are easy to get wrong:

| Setting | Value | Why |
| --- | --- | --- |
| Networks | Google Search only | Search partners and Display expansion are off; both spend the budget on lower-intent traffic. |
| Location | Australia, **presence** | The default ("presence or interest") shows ads to people abroad reading about Australia. |
| Language | English | |
| Bidding | Maximise clicks, CPC cap 12 (core) / 6 (research) | Until there are conversions. |
| Budget | 25 / day core, 10 / day research | About 750 and 300 a month. |
| Ad rotation | Optimise | |
| Auto-tagging | On (account setting) | Adds the `gclid` the GA4 import needs. |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}` | For Plausible, and for reading GA4 without the Ads link. |
| Ad schedule | None to start | Bookings are 9 to 5 Melbourne, but searches are not. Revisit after a month. |
| Devices | All | Revisit after a month. |

## Conversions

Google Ads needs to know what a conversion is, or every bidding decision is
a guess. The site now fires three events from the browser
(`lib/analytics.ts`), with no personal data attached:

| Event | Fired when | Google Ads |
| --- | --- | --- |
| `book_call` | A time is booked through the calendar panel | Primary conversion |
| `enquiry` | The enquiry form is sent | Primary conversion |
| `checklist_download` | The checklist is requested | Secondary (observe, do not bid on) |

They reach Google Ads through GA4, which is already on the site (property
`555078917`, measurement ID `G-LPW096FJPE`, see the main README). No Google
Ads tag is added to the site, and no advertising cookie is set, so the
privacy page stays true.

Setup, once, in this order:

1. In GA4, Admin > Events: mark `book_call`, `enquiry` and
   `checklist_download` as key events. They appear in the list after the
   first time each fires, so trigger each one on the live site first.
2. In GA4, Admin > Product links > Google Ads: link the Ads account. Leave
   "Enable personalised advertising" off; it is not needed for conversion
   import and turning it on makes the privacy page wrong.
3. In Google Ads, Goals > Conversions > New > Import > Google Analytics 4:
   import the three key events. Set `book_call` and `enquiry` to Primary,
   `checklist_download` to Secondary. Count: one per click. Attribution:
   data-driven if offered, otherwise last click.
4. Give `book_call` a value (a hundred dollars is fine as a placeholder)
   so value-based bidding is possible later. Leave the others at zero.

## Launch checklist

Everything above is prepared; these are the steps that need the account.

- [ ] Create the Google Ads account under `jsdiblasi@gmail.com`, in AUD,
      Melbourne time zone. Both are permanent once set.
- [ ] Skip the "smart campaign" the sign-up flow pushes; switch to expert
      mode and create no campaign there.
- [ ] Add billing.
- [ ] Turn on auto-tagging (Settings > Account settings).
- [ ] Deploy this branch so the conversion events are live, then trigger
      each one once (book a slot, send an enquiry, request the checklist)
      and confirm they show in GA4's realtime report.
- [ ] Do the four GA4 and conversion-import steps above.
- [ ] Install Google Ads Editor, sign in, `npm run ads:csv`, and import the
      eight files in numbered order. Editor proposes a column mapping for
      each; check it, then Post.
- [ ] In the web console, confirm the campaign settings table above,
      especially the location target type and the two network boxes
      ("Include Google search partners" and "Include Google Display
      Network" both unticked), which Editor does not always carry across.
- [ ] Check ad strength on each responsive search ad. "Good" is enough;
      "Excellent" usually wants keyword-stuffed headlines.
- [ ] The core campaign imports enabled and starts spending once ads are
      approved. Leave the research campaign paused.
- [ ] Add a phone number to the site, or accept that there is no call asset.
      Founders in a hurry ring.

## First month

- **Day 3:** ads approved? Prices in ad copy are the usual reason for a
  disapproval; they must match the page. If `PLAN_SHOW_PRICE` is ever
  turned off, remove the two price headlines from the script.
- **Weekly:** search terms report. Add negatives for anything that is not a
  buyer; promote any converting phrase-match term to its own exact keyword.
  Expect the first two weeks to be mostly negatives.
- **Week 4:** compare cost per conversion by ad group. Pause any group over
  three hundred dollars a conversion; the subscription pays for a lot of
  clicks, but not for an unbounded number of them.
- **Fifteen to thirty conversions in a month:** switch the core campaign to
  maximise conversions, keep the CPC cap for the first fortnight, then
  remove it. Turn on the research campaign at the same time and give it a
  month.
- **Quarterly:** re-pull the volume table. The AI terms are moving fastest.

## Left out on purpose

- **Broad match.** Google will push it. Not until there is conversion data.
- **Display, Performance Max, YouTube.** Not for a service with a few
  hundred searches a month.
- **"software development agency" and "cost to build an app".** Higher
  volume, but the searcher wants a builder or a price for a consumer app.
  The agency article answers that searcher for free.
- **"business process automation" and "workflow automation" on their own.**
  Those searchers are mostly looking for software to buy.
- **Remarketing.** Would need the Google Ads tag, advertising cookies, and a
  consent banner. The privacy page currently promises none of those.
- **Countries outside Australia.** The FAQ says overseas clients are welcome,
  but the pricing is in AUD and the calendar is in Melbourne hours. Add New
  Zealand as a second location once Australia is converting.

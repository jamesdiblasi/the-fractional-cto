/**
 * Google Ads search campaign, as data, and the Google Ads Editor import files
 * that follow from it.
 *
 *   npm run ads:csv        writes docs/google-ads/*.csv
 *
 * The campaign definition lives here so the keywords, negatives and ad copy
 * are reviewed the way the site copy is: in a diff, not in a web console.
 * Each CSV is one entity type in Google Ads Editor's column names; in Editor
 * choose Account > Import > From file, pick a CSV, and confirm the column
 * mapping it proposes. Import in the order the files are numbered.
 *
 * Google's limits are checked here so a headline that is one character too
 * long fails the build, not the import: headlines 30 characters, descriptions
 * 90, paths 15, sitelink text 25, sitelink descriptions 35, callouts 25,
 * structured snippet values 25. Google also rejects prices in ad copy that do
 * not appear on the landing page, so the dollar figures below must match the
 * defaults in lib/config.ts (and be removed if PLAN_SHOW_PRICE is off).
 *
 * The research behind the keyword choice is in docs/google-ads/README.md.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = join(process.cwd(), 'docs', 'google-ads');
const SITE = 'https://thefractionalcto.au';

/**
 * Appended to every final URL. Google's auto-tagging adds the gclid that GA4
 * and the conversion import rely on; the UTM parameters are for Plausible and
 * for reading the GA4 acquisition reports without the Ads link.
 */
const URL_SUFFIX =
  'utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}';

// ---------------------------------------------------------------------------
// Campaigns
// ---------------------------------------------------------------------------

/**
 * Search only. "Google search" alone as the network leaves Search partners
 * and the Display Network unticked; Performance Max is a different campaign
 * type altogether and is never created here.
 *
 * Two campaigns so the budgets are separate. The first buys people who are
 * already looking for the service; the second buys people asking the
 * question the articles answer, and it starts paused: turn it on once the
 * first has conversion data to compare against.
 */
const campaigns = [
  {
    name: 'Search - AU - Fractional CTO',
    networks: 'Google search',
    status: 'Enabled', // live on import; the README checklist comes first
    budget: 25, // AUD per day, see README for the reasoning
    bidStrategy: 'Maximize clicks',
    maxCpcCap: 12, // Editor: "Maximum CPC bid limit" on the strategy
    languages: 'en',
    location: 'Australia',
  },
  {
    name: 'Search - AU - Research intent',
    networks: 'Google search',
    status: 'Paused',
    budget: 10,
    bidStrategy: 'Maximize clicks',
    maxCpcCap: 6,
    languages: 'en',
    location: 'Australia',
  },
];

// ---------------------------------------------------------------------------
// Ad groups: keywords and one responsive search ad each
// ---------------------------------------------------------------------------

/** Headlines every group can use. Groups add their own in front. */
const sharedHeadlines = [
  'Book a 15-Minute Intro Call',
  'Led by a Former CTO',
  'Plain-English Updates',
  'Australia-Based, Remote-First',
];

const sharedDescriptions = [
  'Fifteen minutes on a call, no slides and no pitch. Bring the decision that is stuck.',
];

const adGroups = [
  {
    campaign: campaigns[0].name,
    name: 'Fractional CTO',
    maxCpc: 8,
    finalUrl: `${SITE}/`,
    path: ['fractional-cto', 'subscription'],
    keywords: [
      'fractional cto',
      'fractional cto services',
      'fractional cto for startups',
      'fractional cto australia',
      'fractional cto melbourne',
      'fractional cto sydney',
      'fractional cto brisbane',
      'fractional cto perth',
      'fractional cto cost',
      'fractional cto rates',
      'fractional cto pricing',
      'hire a fractional cto',
      'find a fractional cto',
      'part time cto',
      'cto as a service',
      'outsourced cto',
      'outsourced cto services',
      'virtual cto',
      'virtual cto services',
      'interim cto',
      'cto for hire',
      'hire a cto',
    ],
    headlines: [
      'Fractional CTO for Australia',
      'A CTO Without Hiring One',
      'Fractional CTO on Subscription',
      'Flat Monthly Fee, No Lock-In',
      'Pause or Cancel Anytime',
      'Unlimited Requests, One Fee',
      'From $6,000 a Month',
      'Roadmap, Hires, Vendors, Board',
      'Has Sat in the CTO Chair',
      'No Recruiter Fees',
      'Start Within a Week',
    ],
    descriptions: [
      'Send any technical decision and get it handled: roadmap, architecture, hires, vendors.',
      'One flat monthly fee, unlimited requests handled one at a time. Pause or cancel anytime.',
      'Senior technical leadership for growing businesses, without the full-time hire.',
    ],
  },
  {
    campaign: campaigns[0].name,
    name: 'CTO advisory',
    maxCpc: 8,
    finalUrl: `${SITE}/`,
    path: ['cto', 'advisory'],
    keywords: [
      'cto consultant',
      'cto consulting',
      'cto consulting services',
      'cto advisory',
      'startup cto',
      'technology strategy consulting',
      'it strategy consultant',
      'technical advisor for startups',
      'startup technical advisor',
      'technology advisor small business',
      'fractional cio',
      'virtual cio',
      'virtual cio services',
    ],
    headlines: [
      'CTO Consulting for Founders',
      'A CTO on Your Side',
      'Technology Strategy, Plainly',
      'Fractional CTO on Subscription',
      'Flat Monthly Fee, No Lock-In',
      'Pause or Cancel Anytime',
      'Sanity-Check Any Quote',
      'Vendor and Cost Control',
      'Investor-Ready Technology',
      'Roadmap, Hires, Vendors, Board',
      'Has Sat in the CTO Chair',
    ],
    descriptions: [
      'Agencies build what you ask for. I help you decide what to ask for, and whether to build.',
      'Roadmap, architecture, hiring and vendors, owned by someone who has done the job before.',
      'One flat monthly fee, unlimited requests handled one at a time. Pause or cancel anytime.',
    ],
  },
  {
    campaign: campaigns[0].name,
    name: 'Technical due diligence and audit',
    maxCpc: 12,
    finalUrl: `${SITE}/#services`,
    path: ['technical', 'audit'],
    keywords: [
      'technical due diligence',
      'technical due diligence services',
      'technical due diligence consultant',
      'technical due diligence consulting services',
      'technical due diligence companies',
      'software due diligence',
      'software technical due diligence',
      'technical due diligence software',
      'tech due diligence',
      'technology due diligence',
      'startup technical due diligence',
      'm&a technical due diligence',
      'technical audit',
      'technical audit services',
      'software audit',
      'software audit services',
      'code audit',
      'code review services',
      'architecture review',
    ],
    headlines: [
      'Technical Due Diligence',
      'Technical Audit From $4,500',
      'Fixed-Price Technical Audit',
      'Plain-English Report',
      'Built for Raises and Sales',
      'Code, Architecture, Security',
      'Prioritised Fix List Included',
      'Read-Out With Your Leaders',
      'For Investors and Founders',
      'Software Due Diligence',
      'Fixed Scope, Quoted Up Front',
    ],
    descriptions: [
      'A fixed-scope review of your code, architecture, security and team, written for founders.',
      'Plain-English report with a prioritised fix list, plus a read-out call with your leaders.',
      'Used before raises, acquisitions and big rebuild decisions. Quoted before it starts.',
    ],
  },
  {
    campaign: campaigns[0].name,
    name: 'MVP build',
    maxCpc: 12,
    finalUrl: `${SITE}/#services`,
    path: ['mvp', 'build'],
    keywords: [
      'mvp development',
      'mvp development company',
      'mvp development agency',
      'mvp development services',
      'mvp development australia',
      'mvp development company australia',
      'mvp app development',
      'minimum viable product development',
      'build an mvp',
      'how much does an mvp cost',
      'mvp cost',
      'minimum viable product cost',
      'software development cost',
    ],
    headlines: [
      'MVP Build From $25,000',
      'MVP Scoped Before It Starts',
      'Working Demo Every Fortnight',
      'Small Senior Team, CTO-Led',
      'Production-Ready, Handed Over',
      'Fixed Milestones, No Surprises',
      'Discovery Workshop Included',
      'First Product, Built Right',
      'Know the Price Up Front',
      'Internal Tools and MVPs',
      'Not Sure You Should Build?',
    ],
    descriptions: [
      'Your first product or internal tool, scoped properly and built by a small senior team.',
      'Fixed milestones, a demo every fortnight, and a documented, production-ready handover.',
      'Know what you get before we start: a scoping workshop, then a quoted, fixed-scope build.',
    ],
  },
  {
    campaign: campaigns[0].name,
    name: 'AI and automation',
    maxCpc: 12,
    finalUrl: `${SITE}/#services`,
    path: ['ai', 'automation'],
    keywords: [
      'ai automation consultant',
      'ai automation agency',
      'ai automation services',
      'ai automation for small business',
      'ai automation small business',
      'ai consultant',
      'ai consultant australia',
      'ai consulting australia',
      'ai consulting services',
      'ai implementation consultant',
      'ai strategy consultant',
      'ai agents for business',
      'business process automation consultant',
      'business automation consultant',
      'workflow automation consultant',
      'workflow automation australia',
    ],
    headlines: [
      'AI Automation That Ships',
      'AI Automation Consultant',
      'Practical AI for Business',
      'AI Agents That Do Real Work',
      'Workflow Automation, Delivered',
      'Not Demos That Never Ship',
      'Plain English, No Hype',
      'Flat Monthly Fee, No Lock-In',
      'Pause or Cancel Anytime',
      'Integrations and Automation',
      'Start Within a Week',
    ],
    descriptions: [
      'Practical AI agents, automation and integrations that take real work off your plate.',
      'Pick the process worth automating first, then ship it. No hype, no demos that never land.',
      'Senior technical leadership on a flat monthly fee. Unlimited requests, cancel anytime.',
    ],
  },
  {
    campaign: campaigns[0].name,
    name: 'Cloud cost',
    maxCpc: 10,
    finalUrl: `${SITE}/#benefits`,
    path: ['cloud', 'costs'],
    keywords: [
      'cloud cost optimisation',
      'cloud cost optimization',
      'cloud cost optimisation services',
      'reduce cloud costs',
      'aws cost optimisation',
      'aws cost optimization',
      'aws cost optimization consultant',
      'azure cost optimisation',
      'azure cost management',
      'cloud spend review',
      'cloud consultant',
      'cloud bill too high',
    ],
    headlines: [
      'Cut Your Cloud Bill',
      'Cloud Cost Review',
      'AWS and Azure Cost Control',
      'Find Where the Money Goes',
      'Vendor and Cost Control',
      'Negotiated on Your Side',
      'Plain-English Findings',
      'Flat Monthly Fee, No Lock-In',
      'Pause or Cancel Anytime',
      'Cloud, Agencies, Contractors',
      'Fixed Fee, No Hourly Surprises',
    ],
    descriptions: [
      'Cloud bills, agencies and contractors reviewed and negotiated on your side of the table.',
      'Find where the cloud bill is going and what to do about it, in plain English.',
      'Senior technical leadership on a flat monthly fee. Unlimited requests, cancel anytime.',
    ],
  },

  // --- Research intent: the questions the articles answer -----------------
  {
    campaign: campaigns[1].name,
    name: 'What a fractional CTO does',
    maxCpc: 5,
    finalUrl: `${SITE}/articles/what-does-a-fractional-cto-do`,
    path: ['articles', 'fractional-cto'],
    keywords: [
      'what does a fractional cto do',
      'what is a fractional cto',
      'fractional cto responsibilities',
    ],
    headlines: [
      'What a Fractional CTO Does',
      'The Job, in Plain English',
      'Same Job, Fraction of the Week',
      'Roadmap, Hires, Vendors, Board',
      'A CTO Without Hiring One',
      'Fractional CTO on Subscription',
      'Pause or Cancel Anytime',
      'Written by a Former CTO',
    ],
    descriptions: [
      'A plain-English answer to what the role covers, what it does not, and when it fits.',
      'Setting direction, leading engineers, managing vendors, keeping cost and risk in check.',
      'Read the article, then book fifteen minutes if it sounds like the thing you need.',
    ],
  },
  {
    campaign: campaigns[1].name,
    name: 'Fractional vs full-time CTO',
    maxCpc: 5,
    finalUrl: `${SITE}/articles/fractional-cto-vs-full-time-cto`,
    path: ['articles', 'vs-full-time'],
    keywords: [
      'fractional cto vs full time cto',
      'part time cto vs full time cto',
      'when to hire a full time cto',
    ],
    headlines: [
      'Fractional or Full-Time CTO?',
      'Which One Now, and Which Later',
      'What Each One Really Costs',
      'CTO Salary vs Subscription',
      'The Order That Usually Works',
      'A CTO Without Hiring One',
      'Pause or Cancel Anytime',
      'Written by a Former CTO',
    ],
    descriptions: [
      'An honest comparison: cost, commitment, and the point where a full-time hire makes sense.',
      'Most go fractional first, then hire full-time once the team is big enough to need it.',
      'Read the article, then book fifteen minutes if it sounds like the thing you need.',
    ],
  },
  {
    campaign: campaigns[1].name,
    name: 'When to hire a CTO',
    maxCpc: 5,
    finalUrl: `${SITE}/articles/when-to-hire-a-cto`,
    path: ['articles', 'when-to-hire'],
    keywords: [
      'when to hire a cto',
      'do i need a cto',
      'startup cto hire',
      'first technical leader',
      'technical co-founder alternative',
    ],
    headlines: [
      'When to Hire a CTO',
      'And When Not To',
      'Do You Need a CTO Yet?',
      'The Middle Path Founders Miss',
      'A CTO Without Hiring One',
      'Fractional CTO on Subscription',
      'Pause or Cancel Anytime',
      'Written by a Former CTO',
    ],
    descriptions: [
      'The signals that say hire now, the ones that say not yet, and the option in between.',
      'Most founders hire too early or too late. Here is how to tell which you are about to do.',
      'Read the article, then book fifteen minutes if it sounds like the thing you need.',
    ],
  },
  {
    campaign: campaigns[1].name,
    name: 'Due diligence checklist',
    maxCpc: 5,
    finalUrl: `${SITE}/articles/technical-due-diligence-checklist`,
    path: ['articles', 'due-diligence'],
    keywords: [
      'technical due diligence checklist',
      'technical due diligence process',
      'technical due diligence questions',
      'what is technical due diligence',
      'technical audit before raise',
    ],
    headlines: [
      'Technical Due Diligence List',
      'What They Actually Look At',
      'Before the Raise, Not During',
      'The Most Common Expensive Find',
      'Technical Audit From $4,500',
      'For Investors and Founders',
      'Fixed Scope, Quoted Up Front',
      'Written by a Former CTO',
    ],
    descriptions: [
      'What investors and acquirers check in a technical review, and how to have answers ready.',
      'A checklist you can run yourself, or a fixed-price audit if you would rather not.',
      'Read the article, then book fifteen minutes if it sounds like the thing you need.',
    ],
  },
  {
    campaign: campaigns[1].name,
    name: 'Choosing an agency',
    maxCpc: 5,
    finalUrl: `${SITE}/articles/how-to-choose-a-software-development-agency`,
    path: ['articles', 'choose-agency'],
    keywords: [
      'how to choose a software development agency',
      'choosing a software development agency',
      'vet a development agency',
      'software development quote',
      'agency vs in-house development',
    ],
    headlines: [
      'How to Choose a Dev Agency',
      'Without Getting Burned',
      'Sanity-Check the Quote First',
      'Someone on Your Side',
      'The One That Costs the Most',
      'A CTO Without Hiring One',
      'Pause or Cancel Anytime',
      'Written by a Former CTO',
    ],
    descriptions: [
      'What to ask, what a fair quote looks like, and the signs a project is about to fail.',
      'An agency builds what you ask for. Someone on your side helps you decide what to ask for.',
      'Read the article, then book fifteen minutes if it sounds like the thing you need.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Negatives: what the research turned up sharing our words
// ---------------------------------------------------------------------------

/**
 * Applied to both campaigns. Phrase match, so "cto jobs" and "jobs for a
 * cto" both go. Each line traces to a real query in the DataForSEO pull:
 * job seekers, students, the ASX-listed CTO, medical and property uses of the
 * acronyms, and the sports meaning of MVP.
 */
const negatives = [
  // Job seekers and people studying for the role
  'jobs', 'job', 'careers', 'career', 'salary', 'salaries', 'resume', 'cv',
  'internship', 'graduate', 'course', 'courses', 'certification', 'degree',
  'university', 'how to become', 'become a', 'equity',
  // Definitions and freebies
  'meaning', 'definition', 'acronym', 'stand for', 'full form', 'abbreviation',
  'template', 'pdf', 'sample', 'example', 'free', 'reddit',
  // Other things called CTO
  'asx', 'share price', 'shares', 'stock', 'kelvin', 'lighting', 'industries',
  '4x4', 'brace', 'gel', 'water filter', 'stamps', 'mental health', 'medical',
  'consignment', 'coles', 'optus', 'atlassian', 'canva', 'ripple', 'rippling',
  // Property and construction due diligence
  'property', 'real estate', 'construction', 'building', 'rics', 'renewables',
  'survey', 'surveying',
  // The sporting MVP
  'nba', 'nfl', 'mlb', 'super bowl', 'ladder', 'odds', 'award', 'awards',
  'finals', 'nightclub', 'disease', 'syndrome',
  // Automation we do not do
  'industrial', 'rockwell', 'gate', 'home automation', 'plc',
  // Nearby services we do not sell
  'managed it services', 'it support', 'computer repair', 'web design',
  'wordpress', 'shopify', 'app store',
];

// ---------------------------------------------------------------------------
// Assets: sitelinks, callouts, structured snippet
// ---------------------------------------------------------------------------

const sitelinks = [
  { text: 'Pricing', url: `${SITE}/#pricing`, lines: ['One flat monthly fee', 'Pause or cancel anytime'] },
  { text: 'How it works', url: `${SITE}/#how-it-works`, lines: ['Subscribe, ask, done', 'Start within a week'] },
  { text: 'Technical audit', url: `${SITE}/#services`, lines: ['Fixed price, plain English', 'Built for raises and sales'] },
  { text: 'Book a call', url: `${SITE}/#booking`, lines: ['Fifteen minutes, no pitch', 'Pick a time that suits'] },
  { text: 'Free CTO checklist', url: `${SITE}/#checklist`, lines: ['Twenty questions to answer', 'About your technology'] },
  { text: 'Meet your CTO', url: `${SITE}/#about`, lines: ['Has sat in the CTO chair', 'Not just advised it'] },
];

const callouts = [
  'Pause or Cancel Anytime',
  'Flat Monthly Fee',
  'No Lock-In Contract',
  'Plain-English Updates',
  'Australia-Based',
  'Start Within a Week',
  'Led by a Former CTO',
  'Investor Ready',
];

const structuredSnippet = {
  header: 'Services',
  values: [
    'Fractional CTO',
    'Technical audit',
    'Due diligence',
    'MVP build',
    'AI automation',
    'Cloud cost review',
  ],
};

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

const errors = [];
function limit(kind, text, max) {
  if (text.length > max) errors.push(`${kind} over ${max} chars (${text.length}): "${text}"`);
  if (/[!]{2,}|[A-Z]{4,}/.test(text) && !/CTO|MVP|AWS|CIO|AI\b/.test(text)) {
    errors.push(`${kind} looks shouty, Google will disapprove it: "${text}"`);
  }
}

for (const g of adGroups) {
  const headlines = [...g.headlines, ...sharedHeadlines];
  const descriptions = [...g.descriptions, ...sharedDescriptions];
  if (headlines.length < 3 || headlines.length > 15) {
    errors.push(`${g.name}: ${headlines.length} headlines, need 3 to 15`);
  }
  if (descriptions.length < 2 || descriptions.length > 4) {
    errors.push(`${g.name}: ${descriptions.length} descriptions, need 2 to 4`);
  }
  if (new Set(headlines).size !== headlines.length) errors.push(`${g.name}: duplicate headline`);
  for (const h of headlines) limit(`${g.name} headline`, h, 30);
  for (const d of descriptions) limit(`${g.name} description`, d, 90);
  for (const p of g.path) limit(`${g.name} path`, p, 15);
  if (g.keywords.length === 0) errors.push(`${g.name}: no keywords`);
  for (const k of g.keywords) {
    if (k !== k.toLowerCase().trim()) errors.push(`keyword not normalised: "${k}"`);
  }
  g.resolved = { headlines, descriptions };
}
for (const s of sitelinks) {
  limit('sitelink text', s.text, 25);
  for (const l of s.lines) limit('sitelink description', l, 35);
}
for (const c of callouts) limit('callout', c, 25);
for (const v of structuredSnippet.values) limit('snippet value', v, 25);

const allKeywords = adGroups.flatMap((g) => g.keywords);
const dupes = allKeywords.filter((k, i) => allKeywords.indexOf(k) !== i);
if (dupes.length) errors.push(`keywords in more than one ad group: ${[...new Set(dupes)].join(', ')}`);
for (const n of negatives) {
  const hit = allKeywords.find((k) => ` ${k} `.includes(` ${n} `));
  if (hit) errors.push(`negative "${n}" would block keyword "${hit}"`);
}

if (errors.length) {
  console.error('Google Ads build failed:\n  ' + errors.join('\n  '));
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

function csv(rows) {
  const columns = [];
  for (const row of rows) for (const key of Object.keys(row)) if (!columns.includes(key)) columns.push(key);
  const cell = (v) => {
    const s = v === undefined || v === null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [columns.join(','), ...rows.map((r) => columns.map((c) => cell(r[c])).join(','))].join('\n') + '\n';
}

mkdirSync(OUT_DIR, { recursive: true });
const written = [];
function write(name, rows) {
  writeFileSync(join(OUT_DIR, name), csv(rows));
  written.push(`${name} (${rows.length} rows)`);
}

write(
  '1-campaigns.csv',
  campaigns.map((c) => ({
    Campaign: c.name,
    'Campaign Type': 'Search',
    Networks: c.networks,
    Budget: c.budget.toFixed(2),
    'Budget type': 'Daily',
    'Bid Strategy Type': c.bidStrategy,
    'Maximum CPC bid limit': c.maxCpcCap.toFixed(2),
    Languages: c.languages,
    Location: c.location,
    'Location target type': 'Presence',
    'Ad rotation': 'Optimize',
    'Final URL suffix': URL_SUFFIX,
    'Campaign Status': c.status,
  })),
);

write(
  '2-ad-groups.csv',
  adGroups.map((g) => ({
    Campaign: g.campaign,
    'Ad Group': g.name,
    'Ad Group Type': 'Standard',
    'Max CPC': g.maxCpc.toFixed(2),
    'Ad Group Status': 'Enabled',
  })),
);

write(
  '3-keywords.csv',
  adGroups.flatMap((g) =>
    g.keywords.flatMap((k) =>
      ['Exact', 'Phrase'].map((type) => ({
        Campaign: g.campaign,
        'Ad Group': g.name,
        Keyword: k,
        'Criterion Type': type,
        Status: 'Enabled',
      })),
    ),
  ),
);

write(
  '4-negative-keywords.csv',
  campaigns.flatMap((c) =>
    negatives.map((n) => ({
      Campaign: c.name,
      Keyword: n,
      'Criterion Type': 'Negative Phrase',
    })),
  ),
);

write(
  '5-ads.csv',
  adGroups.map((g) => {
    const row = {
      Campaign: g.campaign,
      'Ad Group': g.name,
      'Ad type': 'Responsive search ad',
      'Final URL': g.finalUrl,
      'Path 1': g.path[0],
      'Path 2': g.path[1],
    };
    g.resolved.headlines.forEach((h, i) => (row[`Headline ${i + 1}`] = h));
    g.resolved.descriptions.forEach((d, i) => (row[`Description ${i + 1}`] = d));
    row.Status = 'Enabled';
    return row;
  }),
);

write('6-sitelinks.csv', campaigns.flatMap((c) =>
  sitelinks.map((s) => ({
    Campaign: c.name,
    'Link text': s.text,
    'Final URL': s.url,
    'Description line 1': s.lines[0],
    'Description line 2': s.lines[1],
  })),
));

write('7-callouts.csv', campaigns.flatMap((c) =>
  callouts.map((text) => ({ Campaign: c.name, 'Callout text': text })),
));

write('8-structured-snippets.csv', campaigns.map((c) => ({
  Campaign: c.name,
  Header: structuredSnippet.header,
  Values: structuredSnippet.values.join(';'),
})));

console.log(`Wrote to docs/google-ads/:\n  ${written.join('\n  ')}`);
console.log(
  `${adGroups.length} ad groups, ${allKeywords.length} keywords x 2 match types, ${negatives.length} negatives`,
);

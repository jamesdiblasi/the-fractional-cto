import type { Article } from './types';

export const article: Article = {
  slug: 'how-much-does-an-mvp-cost',
  title: 'How much does an MVP cost to build?',
  headline: 'How much an MVP costs, and *what drives the number*.',
  description:
    'Realistic Australian ranges for a first product build, the five things that actually move the price, and how to get the same result for less.',
  primaryKeyword: 'how much does an MVP cost',
  keywords: [
    'MVP cost Australia',
    'cost to build an app',
    'minimum viable product cost',
    'software development cost',
    'MVP development',
  ],
  published: '2026-09-08',
  standfirst:
    'The same product gets quoted at 30,000 dollars and at 300,000 dollars. Both quotes can be honest. The difference is in what each one assumes you meant.',
  body: [
    {
      kind: 'p',
      text: 'MVP has come to mean two different things, which is why the quotes vary so wildly. To a founder it usually means the first version customers can pay for. To an agency it often means a smaller version of the full system you described. The second is three times the price of the first.',
    },
    { kind: 'h2', text: 'Rough ranges in the Australian market' },
    {
      kind: 'list',
      items: [
        '**25,000 to 60,000 dollars.** One clear workflow, one type of user, standard sign-in and payments, built mostly on existing platforms. Eight to twelve weeks.',
        '**60,000 to 150,000 dollars.** Several user types, real integrations with systems you do not control, non-trivial business rules. Three to five months.',
        '**150,000 dollars and up.** Regulated data, a native mobile app on both platforms, hardware, or genuine engineering novelty. Six months and beyond.',
      ],
    },
    {
      kind: 'p',
      text: 'Below about 25,000 dollars you are either buying very little software or buying somebody very junior. Occasionally that is exactly right. Know which one you are doing.',
    },
    { kind: 'h2', text: 'The five things that move the number' },
    { kind: 'h3', text: '1. How many user types there are' },
    {
      kind: 'p',
      text: 'One kind of user is one product. Add an administrator, a supplier and a customer and you have built three products that have to agree with each other. This is the single largest driver and the easiest to trim.',
    },
    { kind: 'h3', text: '2. Integrations with systems you do not control' },
    {
      kind: 'p',
      text: 'Anything that talks to an accounting package, a bank, a warehouse or a government service costs more than it looks, because their behaviour is not yours to fix. Budget generously or leave it out of version one.',
    },
    { kind: 'h3', text: '3. Whether it must be a native mobile app' },
    {
      kind: 'p',
      text: 'A responsive web application costs roughly half of two native apps and ships months earlier. Unless you need push notifications, offline use or camera and sensor access, start on the web.',
    },
    { kind: 'h3', text: '4. Who is building it' },
    {
      kind: 'p',
      text: 'A small senior team costs more per day and usually less per outcome. Cheap capacity with nobody steering it is the most reliable way to spend a hundred thousand dollars on something you rebuild. If you are choosing a builder, [read this first](/articles/how-to-choose-a-software-development-agency).',
    },
    { kind: 'h3', text: '5. How much you are willing to buy instead of build' },
    {
      kind: 'p',
      text: 'Authentication, payments, notifications, admin panels, file storage and analytics are solved problems. Every one you build yourself is weeks you spent on a thing that already exists and no customer will ever admire.',
    },
    {
      kind: 'callout',
      title: 'The cheapest MVP is the one you do not build',
      text: 'Plenty of first versions can be run for a month on a form, a spreadsheet and a person doing the work by hand. If nobody uses it that way, software will not save it, and you have found that out for a few hundred dollars.',
    },
    { kind: 'h2', text: 'What the quote should include and usually does not' },
    {
      kind: 'list',
      items: [
        'Hosting and third-party services for the first year. Small, but nobody mentions it.',
        'The bugs found in the first month after launch.',
        'Whatever you learn from the first ten customers, which is the point of building it at all.',
        'Someone available to change it once real usage starts. A product that ships and then freezes is a dead product.',
      ],
    },
    {
      kind: 'p',
      text: 'A sensible plan holds twenty to thirty per cent of the budget for after launch, because that is when you finally know what to build.',
    },
    { kind: 'h2', text: 'How to spend less without getting less' },
    {
      kind: 'steps',
      items: [
        'Write down the one workflow that makes you money. Build that. Everything else is version two.',
        'Cut the second user type. Run it manually for now.',
        'Choose boring, well-supported technology. Novelty is a cost with no upside at this stage.',
        'Insist on working software every fortnight, not status reports. It is the only honest measure of progress.',
        'Have someone independent review the scope before you sign. The cheapest change is the feature that was never quoted.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How long does it take to build an MVP?',
      a: 'A focused first version is eight to twelve weeks. Beyond about four months you are usually not building an MVP, you are building version one of a platform, and the scope should be challenged.',
    },
    {
      q: 'Is it cheaper to build an MVP offshore?',
      a: 'The day rate is lower and the total cost often is not, once management, rework and time zones are counted. Offshore works well when you have someone senior on your side directing it, and poorly when you do not.',
    },
    {
      q: 'Should I use no-code for my MVP?',
      a: 'Frequently, yes. No-code is excellent for proving demand and for internal tools. It runs out at complex logic, heavy data and fine-grained permissions, so plan for the point where you outgrow it.',
    },
  ],
  related: [
    'how-to-choose-a-software-development-agency',
    'fractional-cto-cost-australia',
    'ai-automation-for-small-business',
  ],
};

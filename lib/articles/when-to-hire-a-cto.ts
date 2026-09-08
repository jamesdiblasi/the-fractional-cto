import type { Article } from './types';

export const article: Article = {
  slug: 'when-to-hire-a-cto',
  title: 'When to hire a CTO for your startup',
  headline: 'When to hire a CTO, and *when not to*.',
  description:
    'Nine signals that your business has outgrown running technology by committee, and the three that mean you should wait a little longer.',
  primaryKeyword: 'when to hire a CTO',
  keywords: [
    'when to hire a CTO',
    'do I need a CTO',
    'startup CTO hire',
    'first technical leader',
    'technical co-founder alternative',
  ],
  published: '2026-09-08',
  standfirst:
    'Most founders hire a technology leader either a year too late or a year too early. The signals are readable well before it becomes obvious.',
  body: [
    {
      kind: 'p',
      text: 'The question is rarely whether you will need one. It is whether the cost of not having one has passed the cost of having one. Here is how to tell.',
    },
    { kind: 'h2', text: 'Nine signals you have waited long enough' },
    {
      kind: 'list',
      items: [
        '**Every technical decision routes through you, and you are not technical.** You are approving choices you cannot evaluate, and everyone in the room knows it.',
        '**Delivery estimates keep doubling.** Not once, as a pattern. That is usually an architecture problem wearing a scheduling costume.',
        '**You cannot tell whether your developers are good.** You like them. You have no idea whether the work is competent. Nobody in the business can tell you.',
        '**The cloud bill grows faster than revenue.** Nobody owns that number, so it grows.',
        '**A customer sent a security questionnaire and it stopped the deal.** Enterprise buyers ask this early now. Guessing at the answers is visible.',
        '**You are heading into a raise or a sale.** [Technical due diligence](/articles/technical-due-diligence-checklist) will find whatever is there. Better that you find it first.',
        '**An agency is quoting six figures and you have nobody to check the quote.** [Reading that quote properly](/articles/how-to-choose-a-software-development-agency) pays for a year of advice.',
        '**Your best developer has become a single point of failure.** One person holds the knowledge, and everyone quietly hopes they do not resign.',
        '**Roadmap conversations end in vibes.** Priorities move with whoever spoke most recently, usually the loudest customer.',
      ],
    },
    {
      kind: 'p',
      text: 'Three or more of these at once and the decision has already been made for you. The only remaining question is fractional or full-time.',
    },
    { kind: 'h2', text: 'Three signals you should wait' },
    {
      kind: 'list',
      items: [
        '**You have not found the product yet.** Before product-market fit, the job is finding customers, not building a platform. A technical leader hired too early builds beautiful infrastructure for a product that changes next quarter.',
        '**The technology is genuinely simple.** A website, a payment link and a spreadsheet is not an engineering organisation. Do not manufacture one.',
        '**You cannot fund eighteen months of it.** Hiring a senior leader you have to let go in nine months costs more than the salary. It costs the team.',
      ],
    },
    {
      kind: 'callout',
      title: 'The middle path most founders miss',
      text: 'The gap between "we need somebody" and "we can justify a full-time hire" is where fractional exists. It is a stage, not a compromise: months of decisions, at a cost you can stop.',
    },
    { kind: 'h2', text: 'What a technical co-founder does not solve' },
    {
      kind: 'p',
      text: 'Founders often answer this question by looking for a technical co-founder instead. Sometimes that is right. But equity is the most expensive currency you have, it does not come back if the fit is wrong, and a strong builder is not automatically a strong leader. Giving away fifteen per cent of the company to avoid a monthly invoice is a decision worth making slowly.',
    },
    { kind: 'h2', text: 'What to do in the next fortnight' },
    {
      kind: 'steps',
      items: [
        'Write down the last five technical decisions and who actually made them. If the honest answer is nobody, that is your answer.',
        'Add up what technology cost you last quarter: developers, agencies, cloud, licences, tools. Most founders are surprised by the total.',
        'Ask what you would do tomorrow if your main system went down for a day. If there is no answer, that is a risk, not an oversight.',
        'Get an independent read on what you have built before you spend more on it.',
      ],
    },
    {
      kind: 'p',
      text: 'If the answers make uncomfortable reading, that is normal and it is fixable. The businesses that get hurt are the ones that keep spending without ever asking.',
    },
  ],
  faqs: [
    {
      q: 'Do I need a CTO or a lead developer?',
      a: 'If the work is clear and you need it built well, a lead developer. If the question is what to build, who should build it and what it should cost, that is a CTO question and a lead developer is the wrong person to carry it.',
    },
    {
      q: 'At what stage do startups hire a CTO?',
      a: 'Most bring in a technical leader when engineering headcount reaches roughly five, when a raise is approaching, or when a failed build has made the gap obvious. The first two are cheaper reasons than the third.',
    },
    {
      q: 'Can a non-technical founder manage developers?',
      a: 'Day to day, yes. What is hard without a technical leader is judging quality, estimating properly, choosing an architecture and knowing when you are being told what you want to hear.',
    },
  ],
  related: [
    'fractional-cto-vs-full-time-cto',
    'what-does-a-fractional-cto-do',
    'technical-due-diligence-checklist',
  ],
};

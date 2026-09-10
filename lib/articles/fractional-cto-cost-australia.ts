import type { Article } from './types';

export const article: Article = {
  slug: 'fractional-cto-cost-australia',
  title: 'What does a fractional CTO cost in Australia?',
  headline: 'What a fractional CTO costs in Australia, *plainly*.',
  description:
    'Day rates, monthly retainers and subscriptions compared, with the pricing models that quietly work against you and the questions to ask before signing.',
  primaryKeyword: 'fractional CTO cost Australia',
  keywords: [
    'fractional CTO cost',
    'fractional CTO pricing',
    'part-time CTO rates Australia',
    'CTO day rate Australia',
    'fractional CTO retainer',
  ],
  published: '2026-09-08',
  standfirst:
    'Prices in this market range from 2,000 to 20,000 dollars a month for work that sounds identical on the website. The number matters less than what the number buys.',
  body: [
    {
      kind: 'p',
      text: 'Every fractional CTO page says the same three things and almost none of them say a price. So here are the ranges as they actually sit in the Australian market in 2026, and then the more useful part: how each pricing model behaves once you are inside it.',
    },
    { kind: 'h2', text: 'The three models you will be quoted' },
    { kind: 'h3', text: 'Day rate' },
    {
      kind: 'p',
      text: 'Between 1,500 and 3,000 dollars a day for someone genuinely senior, usually sold as one or two days a week. So 6,000 to 24,000 dollars a month depending on how many days you buy.',
    },
    {
      kind: 'p',
      text: 'The problem with day rates is structural. You are paying for attendance, so the incentive runs towards more days rather than fewer problems. It also means the meter is running every time you ask a quick question, which is exactly the moment you most want to ask.',
    },
    { kind: 'h3', text: 'Hourly' },
    {
      kind: 'p',
      text: 'Between 250 and 500 dollars an hour. Fine for a one-off opinion, poor for anything ongoing. Nobody sends the awkward two-line question to someone billing in six-minute increments, and the awkward two-line questions are where the money is saved.',
    },
    { kind: 'h3', text: 'Monthly subscription' },
    {
      kind: 'p',
      text: 'A flat fee, commonly 4,000 to 12,000 dollars a month, for unlimited requests handled one at a time. No timesheets. You send what you need, it gets worked through in order, and the invoice does not move.',
    },
    {
      kind: 'p',
      text: 'This is the model we sell, so treat that as disclosed bias. The reason for it is simple: it removes the hesitation. Clients who are not counting hours ask earlier, and problems asked about earlier are cheaper to fix.',
    },
    {
      kind: 'callout',
      title: 'The comparison that matters',
      text: 'A full-time CTO in Australia costs 300,000 to 400,000 dollars in year one once salary, superannuation, equity and recruiter fees are counted. A 10,000 dollar monthly retainer is 120,000 dollars a year, cancellable on a month of notice.',
    },
    { kind: 'h2', text: 'What moves the price' },
    {
      kind: 'list',
      items: [
        '**Actual seniority.** Someone who has run a team of fifty and carried a profit and loss prices differently from someone who was a lead developer last year. Both call themselves fractional CTOs.',
        '**Scope.** Advising on a roadmap is not the same as owning delivery, managing an agency and sitting in board meetings.',
        '**Responsiveness.** A guaranteed turnaround costs more than best effort, and is worth more when something is on fire.',
        '**Team size.** Five engineers to oversee is a different job from twenty-five.',
        '**Stage.** Pre-product work is judgement-heavy and fast. Post-revenue work carries risk, compliance and customer commitments.',
      ],
    },
    { kind: 'h2', text: 'Fixed-scope work, priced separately' },
    {
      kind: 'p',
      text: 'Two pieces of work are usually quoted on their own rather than folded into a retainer, because they have an end:',
    },
    {
      kind: 'list',
      items: [
        '**A technical audit or due diligence review**, commonly 4,500 to 15,000 dollars depending on the size of the estate. [What that review covers](/articles/technical-due-diligence-checklist).',
        '**An MVP or first product build**, commonly 25,000 dollars and up. [What drives that number](/articles/how-much-does-an-mvp-cost).',
      ],
    },
    { kind: 'h2', text: 'Questions to ask before you sign' },
    {
      kind: 'steps',
      items: [
        'What is the turnaround on a normal request, and what happens when it slips?',
        'How many other clients are you carrying right now?',
        'What is the notice period, and is there a lock-in term?',
        'Who does the work if you are unavailable for a fortnight?',
        'What is explicitly not included, so that I know where the extra invoices come from?',
        'Can I speak to a client who stopped working with you?',
      ],
    },
    {
      kind: 'p',
      text: 'The last one separates the market. Anyone doing this properly has clients who finished, usually because they grew into a full-time hire, and is happy for you to hear about it.',
    },
    { kind: 'h2', text: 'A note on cheap' },
    {
      kind: 'p',
      text: 'Under about 3,000 dollars a month you are buying a few hours of somebody who is stretched across too many clients. That is not automatically bad value, but be clear about what it is: an advisor you can ask questions of, not a leader who will own outcomes. The gap shows up on the week something breaks.',
    },
  ],
  faqs: [
    {
      q: 'How much does a fractional CTO cost per month in Australia?',
      a: 'Most engagements land between 4,000 and 12,000 dollars a month. Day-rate arrangements at one or two days a week work out between 6,000 and 24,000 dollars a month. Fixed-scope work such as an audit or an MVP is quoted separately.',
    },
    {
      q: 'Is a fractional CTO retainer better value than a day rate?',
      a: 'For ongoing work, usually yes. A flat fee removes the hesitation to ask, which is where most of the savings sit. Day rates make sense when you want a fixed, bounded commitment and nothing more.',
    },
    {
      q: 'Are fractional CTO fees tax deductible in Australia?',
      a: 'Professional services used to run your business are ordinarily deductible, and the fee usually sits in operating expenses rather than payroll. Confirm the treatment with your accountant, since it depends on your structure.',
    },
  ],
  related: [
    'fractional-cto-vs-full-time-cto',
    'how-much-does-an-mvp-cost',
    'what-does-a-fractional-cto-do',
  ],
};

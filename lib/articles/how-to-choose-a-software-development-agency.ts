import type { Article } from './types';

export const article: Article = {
  slug: 'how-to-choose-a-software-development-agency',
  title: 'How to choose a software development agency',
  headline: 'How to choose a development agency *without getting burned*.',
  description:
    'How to read a six-figure quote, the contract terms that decide who owns what, and the warning signs that show up before you sign rather than after.',
  primaryKeyword: 'how to choose a software development agency',
  keywords: [
    'choosing a software development agency',
    'software development quote',
    'vet a development agency',
    'agency vs in-house development',
    'software project failed',
  ],
  published: '2026-09-08',
  standfirst:
    'Most failed builds were visible in the quote. The trouble is that the quote is written in a language the buyer does not read, which is not an accident.',
  body: [
    {
      kind: 'p',
      text: 'Plenty of agencies are good. The problem is that the good ones and the bad ones produce documents that look identical to a founder who has not commissioned software before. Here is how to tell them apart before the money moves.',
    },
    { kind: 'h2', text: 'Read the quote properly' },
    {
      kind: 'p',
      text: 'A quote worth trusting is specific about what it excludes. A quote to be nervous about is a large number attached to a list of features.',
    },
    {
      kind: 'list',
      items: [
        '**Is the scope itemised, with an estimate per item?** One total for everything means nobody has thought it through, or nobody wants you to see the assumptions.',
        '**What happens when the estimate is wrong?** It will be. The answer should be a change process you agreed in advance, not a conversation in month four.',
        '**Who is actually doing the work?** The senior people in the pitch are often not the people writing the code. Ask for names, and ask what percentage of their week you are getting.',
        '**Is testing in the number, or extra?** If quality assurance is a line item you can decline, you are being sold a way to make the quote look smaller.',
        '**What happens after launch?** Support, hosting, and the bugs found in week one. An agency that has not priced this has not finished thinking.',
      ],
    },
    { kind: 'h2', text: 'The contract terms that matter' },
    {
      kind: 'list',
      items: [
        '**Intellectual property assigns to you on payment.** In writing, for all code, designs and infrastructure configuration. This is the term that ends deals in [due diligence](/articles/technical-due-diligence-checklist) when it is missing.',
        '**The code lives in your repository, in your account, from day one.** Not handed over at the end. Day one.',
        '**Cloud and third-party accounts are in your company name**, with your billing details and your admin access.',
        '**An exit clause with a handover obligation.** What you receive, in what state, and within how many days if you stop.',
        '**No lock-in through hosting.** If they host it and you cannot leave, the rate goes up later and you have no answer.',
      ],
    },
    {
      kind: 'callout',
      title: 'The one that costs the most',
      text: 'Code that only exists on the agency side, in accounts they own. Everything else can be argued about. That one leaves you with nothing to argue with.',
    },
    { kind: 'h2', text: 'Warning signs before you sign' },
    {
      kind: 'list',
      items: [
        'A fixed price for a scope nobody could estimate confidently. Somebody is going to lose money, and the contract decides who.',
        'No discovery phase offered, or one thrown in free. Free discovery is a sales meeting.',
        'Reference clients who are all still mid-project. Ask to speak to one who finished a year ago.',
        'The technology stack is the same for every client regardless of the problem.',
        'Pressure to sign this month for a discount that expires.',
        'No questions about your business model. If they have not asked how you make money, they are not designing for it.',
      ],
    },
    { kind: 'h2', text: 'What good looks like' },
    {
      kind: 'p',
      text: 'A good agency pushes back on your scope. They tell you which third of the feature list to cut, they demonstrate working software every fortnight rather than showing progress reports, and they are comfortable with someone technical on your side reviewing their work. That last point is a strong filter all by itself: an agency that resists independent review is telling you something.',
    },
    { kind: 'h2', text: 'Agency, contractors or in-house' },
    {
      kind: 'steps',
      items: [
        '**Agency** when the work is bounded, you want it delivered rather than managed, and you can afford to pay for coordination as well as code.',
        '**Contractors** when you have someone able to direct them daily. Without that, you are buying capacity with no steering.',
        '**In-house** when the software is the business and will keep changing forever. It is slower to start and cheaper to run.',
      ],
    },
    {
      kind: 'p',
      text: 'Whichever you choose, the failure mode is the same: nobody on your side of the table able to tell whether the work is good. That role costs a fraction of the build, and it is [what a fractional CTO does](/articles/what-does-a-fractional-cto-do) most days.',
    },
  ],
  faqs: [
    {
      q: 'How much should a software development agency cost in Australia?',
      a: 'Local senior developers through an agency typically bill between 1,200 and 2,000 dollars a day, with blended rates lower where junior staff do part of the work. Offshore is a third to a half of that, with more of your time spent on management.',
    },
    {
      q: 'Should I get a fixed price or time and materials?',
      a: 'Fixed price suits genuinely well-defined work. For anything exploratory, fixed price pushes the agency to defend scope rather than solve problems. Time and materials with a capped budget and a fortnightly demo usually works out better.',
    },
    {
      q: 'How do I know if my current agency is doing good work?',
      a: 'Have someone independent review the code, the architecture and the delivery pace. It takes days, not weeks, and it either buys you confidence or catches a problem while it is still cheap.',
    },
  ],
  related: [
    'technical-due-diligence-checklist',
    'how-much-does-an-mvp-cost',
    'what-does-a-fractional-cto-do',
  ],
};

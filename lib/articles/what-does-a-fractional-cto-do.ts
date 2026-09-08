import type { Article } from './types';

export const article: Article = {
  slug: 'what-does-a-fractional-cto-do',
  title: 'What does a fractional CTO do?',
  headline: 'What does a fractional CTO *actually do*?',
  description:
    'A fractional CTO owns the technical decisions a founder should not be making alone. Here is the real job, week by week, and what it is not.',
  primaryKeyword: 'what does a fractional CTO do',
  keywords: [
    'fractional CTO',
    'part-time CTO',
    'CTO as a service',
    'outsourced CTO',
    'fractional CTO responsibilities',
    'fractional CTO Australia',
  ],
  published: '2026-09-08',
  standfirst:
    'The title sounds vague because most people selling it describe strategy instead of work. The job is specific. It is the same job a full-time CTO does, compressed into the hours a business your size can actually use.',
  body: [
    {
      kind: 'p',
      text: 'A fractional CTO is a senior technology leader who owns your technical decisions on a part-time, ongoing basis. Not a consultant who writes a report and leaves. Not an agency who builds what you asked for without asking whether it should be built. Someone who sits on your side of the table, carries the decisions, and stays long enough to be wrong in public if they get one of them wrong.',
    },
    {
      kind: 'p',
      text: 'The confusion is fair. The market is full of people who describe the role in terms of strategy, vision and alignment. So here is the work itself.',
    },
    { kind: 'h2', text: 'The six things the job is made of' },
    { kind: 'h3', text: '1. Deciding what gets built, and what does not' },
    {
      kind: 'p',
      text: 'Most technology money is lost on work that should never have started. A fractional CTO turns a list of requests from sales, support and the board into a sequence: what ships this quarter, what waits, what comes off the list entirely. The deletions are usually worth more than the additions.',
    },
    {
      kind: 'h3',
      text: '2. Owning the architecture decisions that are expensive to reverse',
    },
    {
      kind: 'p',
      text: 'Which platform, which database, which parts to buy rather than build, where the data lives, how customers are kept separate from each other. These are cheap to decide on day one and eat six months of engineering time to change in year three. Someone who has already lived through the consequences of these calls decides them faster and better than a team learning as it goes.',
    },
    {
      kind: 'h3',
      text: '3. Hiring, vetting and managing the people who do the work',
    },
    {
      kind: 'p',
      text: 'Writing the role, sitting in the technical interview, checking whether the contractor you are about to sign is as senior as the rate suggests, and telling you honestly when a developer you like is not the developer you need. A founder without a technical background is hiring in a language they do not speak. This is the part that saves the most money.',
    },
    { kind: 'h3', text: '4. Controlling vendors and cost' },
    {
      kind: 'p',
      text: 'Reading the agency quote before you sign it. Asking why the cloud bill has grown forty per cent while revenue has not. Renegotiating a licence that renews on its own. Vendors price differently when the person reading the quote knows what the work costs to do.',
    },
    { kind: 'h3', text: '5. Keeping risk from becoming an incident' },
    {
      kind: 'p',
      text: 'Backups that have been tested rather than assumed, access removed when people leave, a plan for the day the main system is down, and enough security hygiene that a customer security questionnaire does not stall a deal. None of this is glamorous. All of it is noticed the moment it is missing.',
    },
    { kind: 'h3', text: '6. Translating, in both directions' },
    {
      kind: 'p',
      text: 'Explaining to the board what the engineering team is doing and why it takes as long as it does. Explaining to the engineering team what the business actually needs. A large part of the job is being the one person in the room who is fluent in both.',
    },
    {
      kind: 'callout',
      title: 'A useful test',
      text: 'If your last three technology decisions were made by whoever happened to be in the meeting, you do not have a technology leader. You have a queue of decisions waiting for one.',
    },
    { kind: 'h2', text: 'What a week looks like' },
    {
      kind: 'p',
      text: 'The shape moves with what is happening in the business, but a typical week on a retainer includes:',
    },
    {
      kind: 'list',
      items: [
        'A standing session with the founder or the leadership team, so decisions do not queue up for a month.',
        'Async questions answered as they arrive, in Slack or Teams, in hours rather than weeks.',
        'One substantial piece of work in flight: a roadmap, an architecture review, a hiring process, a vendor negotiation, a board paper.',
        'Time inside the delivery team, whether that team is employed, contracted or an agency, so the plan and the code stay in the same place.',
      ],
    },
    { kind: 'h2', text: 'What a fractional CTO is not' },
    {
      kind: 'list',
      items: [
        '**Not a developer.** If you need code written, you need engineers. A fractional CTO decides what they build and makes sure they are good.',
        '**Not an agency.** An agency is paid to build. That is a fine arrangement once somebody independent has confirmed the thing is worth building.',
        '**Not an advisor.** An advisor gives you an opinion once a quarter over coffee. A fractional CTO carries the decision and lives with it.',
        '**Not permanent.** The job includes knowing when the business has outgrown it, and helping you hire and onboard the full-time CTO who replaces it.',
      ],
    },
    { kind: 'h2', text: 'Who it works for' },
    {
      kind: 'p',
      text: 'The pattern is consistent. Businesses between roughly five and one hundred people, where technology is central enough that bad decisions hurt, but not yet large enough to justify a senior salary plus equity. Founders technical enough to know what they do not know. Companies heading into a raise, a sale or a rebuild, where somebody is about to ask hard questions about what has been built.',
    },
    {
      kind: 'p',
      text: 'If that sounds like you, the honest comparison is not fractional against full-time. It is fractional against carrying on with nobody in the seat, which is what most businesses that size are actually doing. See [fractional CTO versus a full-time hire](/articles/fractional-cto-vs-full-time-cto) for that comparison with the numbers in it.',
    },
  ],
  faqs: [
    {
      q: 'How many hours a month is a fractional CTO?',
      a: 'It depends who you buy from. Some sell days, some sell outcomes. Selling days rewards slowness, so the cleaner arrangement is a fixed monthly fee for unlimited requests, handled one at a time, with the turnaround stated up front.',
    },
    {
      q: 'Does a fractional CTO write code?',
      a: 'Rarely, and it is usually a warning sign when they write a lot of it. The value is in the decisions, the hiring and the oversight. Occasional hands-on work to prove an approach or unblock a team is reasonable. Being the main developer is not.',
    },
    {
      q: 'How is a fractional CTO different from a technical advisor?',
      a: 'An advisor gives opinions. A fractional CTO owns outcomes: sits in the delivery meetings, manages the vendors and the team, and answers for the result.',
    },
  ],
  related: [
    'fractional-cto-vs-full-time-cto',
    'when-to-hire-a-cto',
    'fractional-cto-cost-australia',
  ],
};

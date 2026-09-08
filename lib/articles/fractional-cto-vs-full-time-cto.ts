import type { Article } from './types';

export const article: Article = {
  slug: 'fractional-cto-vs-full-time-cto',
  title: 'Fractional CTO vs full-time CTO',
  headline: 'Fractional CTO or full-time CTO: *which one now*?',
  description:
    'The honest comparison: cost, speed, risk and what you give up either way. Plus the point at which a fractional CTO should hand over to a permanent hire.',
  primaryKeyword: 'fractional CTO vs full-time CTO',
  keywords: [
    'fractional CTO vs full time CTO',
    'part-time CTO vs full-time CTO',
    'hiring a CTO',
    'CTO salary Australia',
    'when to hire a full-time CTO',
  ],
  published: '2026-09-08',
  standfirst:
    'A full-time CTO is the right answer eventually. The question is whether it is the right answer this year, at your size, with the runway you have.',
  body: [
    {
      kind: 'p',
      text: 'Every founder who has been burned by a build asks the same thing: should we just hire a CTO? It is a fair instinct and often the wrong first move. Here is the comparison without the sales pitch on either side.',
    },
    { kind: 'h2', text: 'What each one costs' },
    {
      kind: 'p',
      text: 'In Australia a competent full-time CTO at a growing company sits somewhere between 220,000 and 320,000 dollars in base salary, plus superannuation, plus equity, plus recruiter fees of fifteen to twenty-five per cent of first-year salary if you use one. Call it 300,000 to 400,000 dollars in the first year, all in, before the person has decided anything.',
    },
    {
      kind: 'p',
      text: 'A fractional CTO on a monthly retainer typically runs between 4,000 and 12,000 dollars a month depending on scope and provider. The gap is not the headline, though. The gap is what happens if the hire is wrong.',
    },
    { kind: 'h2', text: 'The part nobody prices: hiring risk' },
    {
      kind: 'p',
      text: 'A search for a senior technology leader takes three to six months. Onboarding takes another three before the person is making real decisions. If the hire does not work out, and senior hires fail more often than anyone admits, you are twelve months and several hundred thousand dollars from where you started, with a team that has been through a leadership change for nothing.',
    },
    {
      kind: 'p',
      text: 'A non-technical founder hiring their first technology leader is also the person least equipped to assess one. That is the trap. You are being asked to judge depth in a field where you cannot yet tell confidence from competence.',
    },
    {
      kind: 'callout',
      title: 'The order that works',
      text: 'Bring in a fractional CTO, get the decisions moving, then use that person to write the role, sit in the interviews and onboard the permanent hire. You are no longer buying blind.',
    },
    { kind: 'h2', text: 'Where full-time wins' },
    {
      kind: 'list',
      items: [
        '**Team size.** Once you have more than about ten engineers, the management load alone is a full-time job. Fractional stops scaling there.',
        '**Deep domain immersion.** If the technology is the product and the product is unusually complex, someone in it every day will out-think someone in it two days a week.',
        '**Culture and retention.** Engineering culture is built by presence. A part-time leader can set standards but cannot be in every corridor conversation.',
        '**Investor expectation.** Some boards will not fund a Series A without a named, full-time technical leader. That is a real constraint even when it is not a rational one.',
      ],
    },
    { kind: 'h2', text: 'Where fractional wins' },
    {
      kind: 'list',
      items: [
        '**Speed.** Weeks to start, not two quarters. The decisions that are stuck get unstuck this month.',
        '**Seniority per dollar.** At a fractional rate you can afford someone who has already run a team of fifty. At a full-time salary at your stage, usually you cannot.',
        '**Reversibility.** If it is not working you stop. No redundancy, no equity unwind, no team-wide fallout.',
        '**Breadth.** Someone who works across several businesses has seen the vendor, the platform and the failure mode before. Pattern recognition is most of the value.',
      ],
    },
    { kind: 'h2', text: 'A rough rule' },
    {
      kind: 'steps',
      items: [
        'Under five engineers, no in-house senior technical voice: fractional, almost always.',
        'Five to fifteen engineers, growing: fractional, with a plan to hire full-time inside twelve to eighteen months.',
        'More than fifteen engineers, or technology is the entire product: full-time, and use a fractional CTO to help you hire the right one.',
      ],
    },
    { kind: 'h2', text: 'The handover is part of the job' },
    {
      kind: 'p',
      text: 'A fractional CTO who never tells you it is time to hire is selling a retainer, not doing the work. The end state is a permanent leader with a clean roadmap, a documented architecture, a team that has been assessed honestly and a set of decisions already made. That is a far better first ninety days than the one most new CTOs inherit.',
    },
    {
      kind: 'p',
      text: 'If you are still working out whether you need either yet, [the timing question is worth reading first](/articles/when-to-hire-a-cto). If it is the money you are weighing, [here is what a fractional CTO actually costs in Australia](/articles/fractional-cto-cost-australia).',
    },
  ],
  faqs: [
    {
      q: 'Is a fractional CTO cheaper than a full-time CTO?',
      a: 'Substantially, yes: typically a quarter to a half of the all-in cost of a full-time hire, with no recruiter fee, no equity and no redundancy exposure. The larger saving is avoiding a failed senior hire.',
    },
    {
      q: 'Will investors accept a fractional CTO?',
      a: 'At pre-seed and seed, generally yes, especially when the person is named and visible in diligence. At Series A and beyond, most boards expect a full-time technical leader, and a fractional CTO should be helping you hire one by then.',
    },
    {
      q: 'Can a fractional CTO become our full-time CTO?',
      a: 'Occasionally, and it is worth asking early. More often the right outcome is that they run the search, assess the candidates and hand over cleanly.',
    },
  ],
  related: [
    'what-does-a-fractional-cto-do',
    'fractional-cto-cost-australia',
    'when-to-hire-a-cto',
  ],
};

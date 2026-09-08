import type { Article } from './types';

export const article: Article = {
  slug: 'technical-due-diligence-checklist',
  title: 'Technical due diligence checklist',
  headline: 'Technical due diligence: *what they actually look at*.',
  description:
    'The checklist investors and acquirers work through, the findings that reprice a deal, and how to fix the expensive ones before anyone asks.',
  primaryKeyword: 'technical due diligence checklist',
  keywords: [
    'technical due diligence',
    'technical due diligence checklist',
    'software due diligence',
    'tech DD for investors',
    'technical audit before raise',
  ],
  published: '2026-09-08',
  standfirst:
    'Technical due diligence is not an audit of your code. It is an assessment of how much risk a buyer is taking on, and every finding has a price attached.',
  body: [
    {
      kind: 'p',
      text: 'When an investor or acquirer sends in a technical reviewer, they are answering one question: if we put money in, what breaks, what does it cost to fix, and how long is this team going to be paying for decisions made three years ago. Everything below rolls up into that.',
    },
    { kind: 'h2', text: 'Ownership and licensing' },
    {
      kind: 'p',
      text: 'The first thing checked, and the one that most often stops a deal outright.',
    },
    {
      kind: 'list',
      items: [
        'Every contractor and agency who touched the code has a signed agreement assigning intellectual property to the company. Not an invoice. An assignment.',
        'Founders who wrote code while employed elsewhere have clean ownership of it.',
        'Open-source licences in use are compatible with a commercial product. Copyleft licences in a product you intend to sell are a genuine problem.',
        'Domains, cloud accounts, app store listings and repositories are owned by the company, not by a personal account belonging to a former developer.',
      ],
    },
    {
      kind: 'callout',
      title: 'The most common expensive finding',
      text: 'An offshore team built the first version, was paid by invoice, and never signed an assignment. The company does not own its own product. It is fixable, but it is fixable much more cheaply before the term sheet than after.',
    },
    { kind: 'h2', text: 'Architecture and scale' },
    {
      kind: 'list',
      items: [
        'Does the design support ten times the current load without a rebuild, and what specifically would break first?',
        'Is customer data properly separated? Multi-tenant mistakes are hard to unpick later.',
        'How many parts of the system can only be changed by one person?',
        'What is running on end-of-life software or an unsupported framework version?',
        'Where is the single point of failure, and what happens when it fails?',
      ],
    },
    { kind: 'h2', text: 'Code quality, judged commercially' },
    {
      kind: 'p',
      text: 'Nobody expects perfection at your stage. Reviewers look for the signals that predict future cost: automated tests around the parts that matter, a deployment that does not require a specific person, dependencies that have been updated this year, and a codebase a new engineer can be productive in within a fortnight.',
    },
    { kind: 'h2', text: 'Security and privacy' },
    {
      kind: 'list',
      items: [
        'Access control: who can reach production, and is it removed when people leave?',
        'Secrets management: no credentials in the code repository, and the ones that leaked have been rotated.',
        'Data handling: what personal information you hold, where it lives, and whether it crosses borders.',
        'Australian Privacy Act obligations, and the notifiable data breach scheme if you hold personal information.',
        'Backups that have been restored in a test, not backups that merely exist.',
        'A written incident response plan, even a short one.',
      ],
    },
    { kind: 'h2', text: 'Team and key-person risk' },
    {
      kind: 'p',
      text: 'Reviewers will ask who wrote most of the system, whether that person is still here, and what happens if they leave. They will look at how much knowledge is documented rather than remembered. A strong product with one irreplaceable engineer is discounted, and correctly so.',
    },
    { kind: 'h2', text: 'Cost and vendor exposure' },
    {
      kind: 'list',
      items: [
        'Cloud spend per customer, and whether it improves or worsens as you grow.',
        'Contracts that auto-renew, and anything with an exit fee.',
        'Dependence on a single vendor with no realistic migration path.',
        'Licences priced per seat that will bite at the scale in your forecast.',
      ],
    },
    { kind: 'h2', text: 'How to prepare, in order' },
    {
      kind: 'steps',
      items: [
        'Collect every contractor and agency agreement and confirm IP assignment in each one. Fix the gaps now.',
        'Write a one-page architecture summary a non-engineer can follow.',
        'List your known technical debt yourself, with an estimate to fix each item. Volunteering the list reads as competence; having it found reads as risk.',
        'Test a restore from backup and write down the date you did it.',
        'Remove access for everyone who has left.',
        'Have someone independent run the review before the investor does.',
      ],
    },
    {
      kind: 'p',
      text: 'That last step is the whole point. Findings you raise yourself, with a plan attached, are diligence going well. The same findings surfaced by the buyer become price negotiations. If you are weighing whether an independent review is worth it, [the pricing article covers what one costs](/articles/fractional-cto-cost-australia).',
    },
  ],
  faqs: [
    {
      q: 'How long does technical due diligence take?',
      a: 'For an early-stage company, typically one to three weeks: document review, interviews with the engineering team, a code and architecture review, and a written report. Larger estates run longer.',
    },
    {
      q: 'What fails technical due diligence most often?',
      a: 'Unclear intellectual property ownership, usually from contractors who were paid but never signed an assignment. After that: key-person risk, undocumented architecture and security hygiene.',
    },
    {
      q: 'Should we run our own technical audit before raising?',
      a: 'Yes, if a raise or sale is within a year. Findings you present with a remediation plan cost you far less than findings the other side discovers.',
    },
  ],
  related: [
    'when-to-hire-a-cto',
    'how-to-choose-a-software-development-agency',
    'what-does-a-fractional-cto-do',
  ],
};

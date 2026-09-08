import type { Article } from './types';

export const article: Article = {
  slug: 'ai-automation-for-small-business',
  title: 'AI automation for small business',
  headline: 'AI automation that *actually ships*.',
  description:
    'Where AI pays for itself in a small business, where it quietly does not, and how to run a two-week trial before committing to anything.',
  primaryKeyword: 'AI automation for small business',
  keywords: [
    'AI automation small business',
    'business process automation',
    'AI agents for business',
    'workflow automation Australia',
    'AI implementation strategy',
  ],
  published: '2026-09-08',
  standfirst:
    'Most AI projects in small businesses fail for the same unglamorous reason: nobody could say what the thing was supposed to replace.',
  body: [
    {
      kind: 'p',
      text: 'The demonstrations are genuinely impressive and the pilots genuinely stall. The gap is not the technology. It is that a demonstration only has to work once, and a business process has to work on the awkward twenty per cent of cases nobody mentioned.',
    },
    { kind: 'h2', text: 'Where it reliably pays' },
    {
      kind: 'p',
      text: 'The wins are consistent, and duller than the marketing suggests. They share a shape: high volume, low variation, a human still checking the output.',
    },
    {
      kind: 'list',
      items: [
        '**Getting information out of documents.** Invoices, purchase orders, forms, contracts. Anyone retyping a PDF into a system is a business case with a person attached.',
        '**First-line support.** Answering the same forty questions from your own documentation, and handing over cleanly when it does not know. The handover matters more than the answers.',
        '**Drafting, not sending.** Quotes, proposals, reports and follow-ups drafted in seconds, edited by a person, sent by a person.',
        '**Sorting and routing.** Incoming email, tickets and leads categorised and sent to the right place. Small saving per item, large volume.',
        '**Summarising the pile.** Call notes, meeting recordings, long threads. Reading time is a real cost and nobody tracks it.',
        '**Search across everything you already know.** Staff finding the right policy or specification without asking the one person who remembers.',
      ],
    },
    { kind: 'h2', text: 'Where it usually disappoints' },
    {
      kind: 'list',
      items: [
        'Anything where a wrong answer is expensive and nobody checks the output.',
        'Work that depends on knowledge held in one person and never written down. There is nothing to learn from.',
        'Processes that are broken already. Automating a bad process gives you a faster bad process.',
        'Decisions you have to justify to a regulator or a customer with a specific reason.',
        'Anything requiring perfect accuracy. These systems are extremely good and not exact.',
      ],
    },
    {
      kind: 'callout',
      title: 'The question that filters everything',
      text: 'What does this replace, how many times a week does it happen, and what does it cost when it goes wrong? If those three cannot be answered in a sentence each, the project is not ready.',
    },
    { kind: 'h2', text: 'How to run a two-week trial' },
    {
      kind: 'steps',
      items: [
        'Pick one process that happens at least twenty times a week and annoys somebody.',
        'Measure it as it is: minutes per instance, error rate, who does it.',
        'Build the smallest version that handles the common cases. Off-the-shelf tools first. Custom only when nothing fits.',
        'Run it beside the current process for two weeks. Do not switch anything off.',
        'Compare against the measurement. Include the time spent checking the output, because that time is real.',
        'Keep it, fix it, or stop. Stopping after two weeks is a good outcome, not a failure.',
      ],
    },
    { kind: 'h2', text: 'Buy before you build' },
    {
      kind: 'p',
      text: 'Most of what a small business needs already exists inside tools you pay for. The accounting package, the customer system and the help desk have all shipped AI features. Turn those on first. Custom work is worth it when the process is specific to how you compete, and rarely otherwise.',
    },
    { kind: 'h2', text: 'The parts people skip' },
    {
      kind: 'list',
      items: [
        '**Where your data goes.** If customer information leaves the country or gets used for training, you need to know before you turn it on, not after. Australian privacy obligations do not pause for a pilot.',
        '**Who owns it on Tuesday.** Automation without an owner rots quietly and everyone stops trusting it.',
        '**What the staff think.** Automation introduced without explanation reads as a redundancy plan. Say what it replaces and what it does not.',
        '**Running cost.** Usage-based pricing scales with success. Model the bill at ten times the volume before you commit.',
      ],
    },
    {
      kind: 'p',
      text: 'None of this needs a strategy document. It needs one process, measured before and after, and someone honest about the result. If you would rather not run that experiment alone, [that is the kind of request a retainer is for](/#pricing).',
    },
  ],
  faqs: [
    {
      q: 'How much does AI automation cost for a small business?',
      a: 'Existing tools with AI features already included cost nothing extra. A focused custom automation typically runs 5,000 to 30,000 dollars to build, plus usage costs that scale with volume. Anything quoted far above that deserves a hard look at the scope.',
    },
    {
      q: 'What should we automate first?',
      a: 'The highest-volume task where a person is retyping information from one place into another. It is measurable, low risk, and the saving is obvious to everyone watching.',
    },
    {
      q: 'Is our data safe with AI tools?',
      a: 'It depends entirely on the vendor and the plan. Business tiers of the major providers generally do not train on your data, while free tiers often may. Check the terms for the specific plan, and check where the data is stored.',
    },
  ],
  related: [
    'how-much-does-an-mvp-cost',
    'what-does-a-fractional-cto-do',
    'reduce-cloud-costs',
  ],
};

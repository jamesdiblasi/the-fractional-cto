import type { Article } from './types';

export const article: Article = {
  slug: 'reduce-cloud-costs',
  title: 'How to reduce cloud costs',
  headline: 'Your cloud bill is *too high*. Here is where.',
  description:
    'The eight places cloud spend hides, what to cut in the first week, and how to stop the bill growing faster than revenue again.',
  primaryKeyword: 'how to reduce cloud costs',
  keywords: [
    'reduce cloud costs',
    'AWS cost optimisation',
    'Azure cost management',
    'cloud spend review',
    'cloud bill too high',
  ],
  published: '2026-09-08',
  standfirst:
    'Cloud bills grow because nobody owns the number. Almost every business that has not looked in a year is paying between twenty and forty per cent more than it needs to.',
  body: [
    {
      kind: 'p',
      text: 'This is not about switching providers or rewriting anything. It is about the same workload costing less, which for most businesses is a week of attention and a permanent saving.',
    },
    { kind: 'h2', text: 'Where the money actually goes' },
    { kind: 'h3', text: '1. Things nobody turned off' },
    {
      kind: 'p',
      text: 'Test environments from a project that finished, servers from a migration completed two years ago, disks left behind when the machines they belonged to were deleted. This is the largest and least interesting category, and it is usually the first ten per cent.',
    },
    { kind: 'h3', text: '2. Machines sized for a launch that never came' },
    {
      kind: 'p',
      text: 'Somebody picked a size on day one, guessed high, and nobody revisited it. Look at actual processor and memory use over thirty days. Sustained use under ten per cent means the machine is at least two sizes too big.',
    },
    { kind: 'h3', text: '3. Paying on demand for something that runs constantly' },
    {
      kind: 'p',
      text: 'Every major provider discounts committed usage heavily, commonly thirty to sixty per cent for a one or three year commitment. If a system has run every day for a year, paying the casual rate for it is a choice.',
    },
    { kind: 'h3', text: '4. Environments that run overnight and at weekends' },
    {
      kind: 'p',
      text: 'Development and test environments used during business hours cost the same at three in the morning. Shutting them outside working hours removes roughly two-thirds of their cost, and it is a scheduled task, not a project.',
    },
    { kind: 'h3', text: '5. Storage nobody has looked at' },
    {
      kind: 'p',
      text: 'Backups kept forever, logs kept forever, files on premium storage that have not been read in two years. Retention rules and cheaper storage tiers for cold data are usually a quick, safe saving.',
    },
    { kind: 'h3', text: '6. Data moving between places' },
    {
      kind: 'p',
      text: 'Transferring data out of a provider, or between regions, is charged and rarely noticed. It is often a design accident: two systems that talk constantly, sitting in different regions for no reason anybody remembers.',
    },
    { kind: 'h3', text: '7. Licences bought per seat and never trimmed' },
    {
      kind: 'p',
      text: 'Not strictly cloud infrastructure, but it sits in the same bill and follows the same pattern. Count active users against paid seats. The gap is people who left.',
    },
    { kind: 'h3', text: '8. The managed service you outgrew, or never grew into' },
    {
      kind: 'p',
      text: 'Premium tiers chosen for a load that never arrived. Or the reverse: paying for a database ten times the size of the data in it.',
    },
    {
      kind: 'callout',
      title: 'Before touching anything',
      text: 'Turn on cost allocation tags and get the bill broken down by environment and by system. Cutting without knowing what the line item does is how a Saturday outage happens.',
    },
    { kind: 'h2', text: 'A sensible first week' },
    {
      kind: 'steps',
      items: [
        'Export twelve months of billing and sort by cost. The top ten line items are usually most of the bill.',
        'List everything running and ask, for each one, who uses it. Anything nobody can name gets a shutdown date, not a deletion.',
        'Right-size the obvious over-provisioning based on thirty days of usage.',
        'Schedule non-production environments to stop outside business hours.',
        'Apply retention rules to logs and backups, and move cold data to a cheaper tier.',
        'Only then buy commitments, once the shape of what you actually run is stable.',
      ],
    },
    {
      kind: 'p',
      text: 'The order matters. Committing to a three-year term on infrastructure you were about to switch off is a common and expensive mistake.',
    },
    { kind: 'h2', text: 'Stopping it coming back' },
    {
      kind: 'list',
      items: [
        '**One named owner for the bill.** Not a committee. A person who sees the number monthly.',
        '**A budget alert that reaches a human**, set at a threshold that means something rather than at the number you are already spending.',
        '**A monthly line in the leadership pack**: cloud cost, and cloud cost per customer. The second number is the one that tells you whether growth is working.',
        '**Tags enforced at creation.** Anything untagged has no owner, and anything with no owner grows.',
      ],
    },
    {
      kind: 'p',
      text: 'Cost per customer is the metric worth arguing about. A bill that grows while that number falls is a business scaling properly. A bill that grows while that number holds steady is a bill that will hurt at ten times the size. It is also one of the first things [technical due diligence](/articles/technical-due-diligence-checklist) checks.',
    },
  ],
  faqs: [
    {
      q: 'How much can a typical business save on cloud costs?',
      a: 'A first pass over an estate that has not been reviewed in a year commonly finds twenty to forty per cent, most of it from unused resources, over-provisioned machines and non-production environments running around the clock.',
    },
    {
      q: 'Should we move off the cloud to save money?',
      a: 'Rarely the right first move. Most bills are high because of how the cloud is being used, not because it is the cloud. Fix the waste first, then judge whether the remaining spend justifies a move.',
    },
    {
      q: 'Do reserved instances or savings plans make sense for a small business?',
      a: 'Yes, for anything that has run every day for a year, and typically at one year rather than three. Commit only to the stable base of your usage, not the peak.',
    },
  ],
  related: [
    'what-does-a-fractional-cto-do',
    'technical-due-diligence-checklist',
    'ai-automation-for-small-business',
  ],
};

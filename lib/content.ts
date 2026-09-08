/**
 * Copy that is not an on/off switch. Edit freely.
 *
 * Voice: bold, short, plain. No emoji. No contractions. Say the thing, then
 * stop. Anything marked PLACEHOLDER is waiting on real detail from the owner.
 *
 * *Asterisks* around a phrase in a headline set it in the italic serif. See
 * components/Emphasis.tsx. A word or two per headline, no more.
 */

export const hero = {
  headline: 'A CTO for growing businesses, *without hiring one*.',
  subheadline:
    'Send any technical decision and get it handled: the roadmap, the architecture, the hires, the vendors, the board update. Unlimited requests, one flat monthly fee, pause or cancel anytime.',
  primaryCta: 'Book a 15-min intro call',
  secondaryCta: 'See pricing',
  /** Small caption on the founder photo. Uses founder.firstName. */
  photoCaption: 'Your CTO',
};

export const logoRow = {
  label: 'Built on the tools you already use',
};

export const howItWorks = {
  title: 'One subscription. Every technical decision *handled*.',
  intro:
    'No agencies to manage, no recruiter fees, no six-month hire. Subscribe, send what you need, get it done.',
  steps: [
    {
      title: 'Subscribe',
      body: 'Choose your plan. We start within a week with a short technical snapshot of where you are at today.',
    },
    {
      title: 'Ask',
      body: 'Give us your hardest problems to solve. Send through anything technical, business, process or otherwise. A quote to sanity-check, a hire to interview, a roadmap to write, a board paper to draft.',
    },
    {
      title: 'Done',
      body: 'Decisions made, work shipped, updates in plain English. Most requests turned around within days.',
    },
  ],
};

export const benefits = {
  title: 'Membership benefits',
  intro: 'What comes with every plan, whichever size you pick.',
  items: [
    {
      title: 'Fixed monthly fee',
      body: 'One number on the invoice. No hourly surprises, no scope creep.',
    },
    {
      title: 'Pause or cancel anytime',
      body: 'Quiet month? Pause. Done? Cancel. A month of notice, nothing else.',
    },
    {
      title: 'Plain-English updates',
      body: 'A monthly note you can forward to the board without translating it.',
    },
    {
      title: 'Investor ready',
      body: 'Technical due diligence answered before anyone asks.',
    },
    {
      title: 'Vendor and cost control',
      body: 'Cloud bills, agencies and contractors reviewed and negotiated on your side.',
    },
    {
      title: 'Hire when you are ready',
      body: 'When you outgrow me, I help you find and onboard your permanent CTO.',
    },
  ],
};

export const services = {
  title: 'Four ways to work together.',
  intro:
    'Most clients start with one and move between them as the business changes.',
  items: [
    {
      title: 'Fractional CTO retainer',
      body: 'Ongoing, part-time technical leadership. Roadmap, architecture, hiring, vendors and the board update, owned by someone who has done it before.',
    },
    {
      title: 'Technical audit and due diligence',
      body: 'A fixed-price, plain-English review of what you have built and who built it. Used before raises, acquisitions and big rebuild decisions.',
    },
    {
      title: 'MVP and product build',
      body: 'Your first product or internal tool, scoped properly and delivered by a small senior team, with a working demo every fortnight.',
    },
    {
      title: 'AI and automation',
      body: 'Practical AI agents, workflow automation and integrations that take real work off your plate, not demos that never ship.',
    },
  ],
};

export const pricing = {
  title: 'One price, *no surprises*.',
  intro:
    'One monthly fee, unlimited requests, handled one at a time. Pause or cancel with a month of notice. Add-ons are optional, and fixed-scope work is quoted before it starts. All prices in Australian dollars.',
  ctaLabel: 'Get started',
  addOnCtaLabel: 'Enquire',
  callouts: [
    {
      title: 'Pause anytime',
      body: 'Quiet patch? Pause the subscription and pick it back up when you are ready.',
    },
    {
      title: 'Try it for a month',
      body: 'Not sure yet? Run one month. If it is not the right fit, walk away.',
    },
  ],
  addOnTitle: 'Add-ons',
  addOnIntro: 'Optional, and never required to get started.',
  recurringSuffix: '/month',
  fromLabel: 'From',
  priceHidden: 'Priced on the call',
};

export const founder = {
  eyebrow: 'Meet your CTO',
  firstName: 'James',
  name: 'James Di Blasi',
  title: 'Founder and principal, The Fractional CTO',
  headline: 'Hey, I am James. I have *sat in the CTO chair*, not just advised it.',
  /**
   * Still to land: the consultancy by name, and one number (team size, exit,
   * a programme cost cut). An unnamed firm and no figures is the weakest part
   * of this section.
   */
  paragraphs: [
    'I joined a Microsoft consultancy when it was barely a company and helped grow it until it sold. More than a decade of building the thing, not presenting about it: hiring, shipping, and making the calls that get expensive when you get them wrong.',
    'Along the way I have helped CIOs and CTOs solve their hardest problems, across banking, insurance, professional services and consumer brands. Same problems as yours, more zeros.',
    'Bring me your hardest problem, business or technical or somewhere in between. Together we work out where the answer actually sits: in the technology, in the process, or in the people. Usually it is all three.',
  ],
  /** Path under public/. Compressed from the original shoot; see README. */
  photo: '/founder.webp',
};

export const leadMagnet = {
  eyebrow: 'Free download',
  title: 'The CTO Readiness Checklist',
  body: 'Twenty questions every founder should be able to answer about their technology. Answer them all and you probably do not need me. Get stuck and you know where to start.',
  cta: 'Send me the checklist',
  file: '/cto-readiness-checklist.pdf',
};

export const faqs = {
  title: 'Questions founders ask first.',
  items: [
    {
      q: 'What does a fractional CTO actually do?',
      a: 'The same job a full-time CTO does, for a fraction of the week. Setting technical direction, leading the engineering team, choosing and managing vendors, keeping costs and risks in check, and explaining it all to the rest of the leadership team in plain language.',
    },
    {
      q: 'How is this different from hiring an agency?',
      a: 'An agency builds what you ask for. I help you work out what to ask for, whether to build it at all, and who should build it. If a build is the answer I can lead it, but I sit on your side of the table.',
    },
    {
      q: 'What does pause or cancel actually mean?',
      a: 'Exactly what it says. Give a month of notice and the subscription pauses or stops. No lock-in contract, no exit fee. Most clients stay because it is working, not because they have to.',
    },
    {
      q: 'Do you work with businesses outside Australia?',
      a: 'Yes. I am based in Australia and work remotely, so time zones across Australia, New Zealand, Asia and the US west coast overlap well. Pricing is in Australian dollars.',
    },
    {
      q: 'How fast do requests get turned around?',
      a: 'Most within a few days. Bigger pieces like a roadmap or an audit get a date up front. You always know what is being worked on and when it lands.',
    },
    {
      q: 'Can you help us hire a full-time CTO later?',
      a: 'Yes, and I would encourage it once the business is ready. Part of the job is knowing when you have outgrown me and helping you find and onboard the right person.',
    },
    {
      q: 'We are not technical at all. Is that a problem?',
      a: 'It is most of my clients. Everything I write and say is in plain English, and there are no silly questions.',
    },
  ],
};

export const booking = {
  title: 'Find a time that works.',
  /** Set in the accent italic, on its own line. */
  titleAccent: '(I can work around you)',
  body: 'Fifteen minutes on a call, no slides and no pitch. Bring the decision that is currently stuck and we will talk it through.',
  note: 'Times are shown in your local timezone.',
  clockLabel: 'Time format',
  noDayLabel: 'Pick a day',
};

export const enquiry = {
  title: 'Rather put it in writing?',
  body: 'Send a few lines about where the business is and what is getting in the way. I read every one myself and reply within a business day.',
};

export const footer = {
  blurb:
    'Senior technical leadership on subscription for startups, growing businesses and the people who back them.',
  location: 'Australia-based, remote-first.',
};

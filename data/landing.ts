export type LandingPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  checklist: { heading: string; items: string[] };
  faqs: { q: string; a: string }[];
  services: string[];
};

export const landingPages: LandingPage[] = [
  {
    slug: "lead-generation-agency",
    metaTitle: "Lead Generation Agency in Chandigarh, Mohali & Across India",
    metaDescription:
      "Zenyro is a lead generation agency based in the Chandigarh Tricity, building qualified-lead systems for businesses across India: campaigns, landing pages, AI qualification and CRM.",
    eyebrow: "Lead generation agency · Chandigarh Tricity",
    headline: "Lead generation measured in customers, not form fills.",
    intro:
      "Based in the Chandigarh Tricity and working with businesses across India, Zenyro builds lead generation systems that you own: the offer, the landing page, the campaigns, the qualification and the hand-off to sales.",
    sections: [
      {
        heading: "Why most lead generation disappoints",
        body: [
          "The usual model pays an agency to produce leads, so it produces as many as possible. Cheap leads look good in a monthly report and waste your sales team's week.",
          "We define a qualified lead with your sales team before launch, score every enquiry against that definition, and report on cost per qualified lead and cost per customer. The incentive is aligned with what you actually want: revenue.",
        ],
      },
      {
        heading: "Local knowledge, national reach",
        body: [
          "Many of the businesses we work with in Chandigarh, Mohali and Panchkula sell beyond the Tricity, into Punjab, Haryana, Himachal and Delhi NCR, or nationally. We plan campaigns by geography, language and buying behaviour, rather than copying one national template.",
          "Meetings can happen in person in the Tricity or remotely for clients elsewhere in India and abroad.",
        ],
      },
      {
        heading: "What you own at the end",
        body: [
          "Ad accounts, landing pages, CRM data, automations and reporting are all set up in your name. If you ever stop working with us, the system keeps running.",
        ],
      },
    ],
    checklist: {
      heading: "Questions to ask any lead generation agency",
      items: [
        "Will leads be exclusive to my business?",
        "How do you define and measure a qualified lead?",
        "Will I own the ad accounts and data?",
        "Can I see cost per customer by channel, not just cost per lead?",
        "What happens in the first 30 days?",
      ],
    },
    faqs: [
      { q: "Do you only work with businesses in Chandigarh and Mohali?", a: "No. We are based in the Chandigarh Tricity and work with clients across India and internationally. Local businesses can meet us in person." },
      { q: "Which industries do you generate leads for?", a: "Our systems are designed for real estate, hospitality, healthcare, interior design and premium retail, education and professional services, and home improvement, though the approach works for most high-value services." },
      { q: "How is pricing structured?", a: "Usually a setup fee for building the system and a monthly fee for running and improving it. Ad spend is paid directly to the platforms from your own account." },
    ],
    services: ["lead-generation", "performance-marketing", "crm-automation"],
  },
  {
    slug: "ai-automation-agency",
    metaTitle: "AI Automation Agency India: WhatsApp, Voice & Sales Automation",
    metaDescription:
      "AI automation for Indian businesses: WhatsApp assistants, AI voice agents, lead qualification and workflow automation built on your existing tools, with human oversight.",
    eyebrow: "AI automation agency · India",
    headline: "Automation that your customers actually like.",
    intro:
      "Indian customers expect quick replies on WhatsApp, in the language they are comfortable with. We build AI assistants and automations that respond instantly, qualify properly and hand over to your team at the right moment.",
    sections: [
      {
        heading: "Where AI automation pays back first",
        body: [
          "The fastest returns usually come from three places: replying to new enquiries within a minute, following up consistently until the customer decides, and removing repetitive admin such as data entry, reminders and status updates.",
          "We start with an audit of your enquiries and workflows and rank opportunities by expected payoff, so the first automation you build is the one most likely to pay for itself.",
        ],
      },
      {
        heading: "Built for how India communicates",
        body: [
          "Assistants can converse in English, Hindi and Hinglish, understand voice notes, and work on the official WhatsApp Business Platform so your number stays compliant.",
          "We design flows for real behaviour: customers who reply days later, forward messages to family members, or switch from chat to a phone call halfway through.",
        ],
      },
      {
        heading: "Responsible by default",
        body: [
          "Every assistant answers only from information you approve, hands over when unsure, and keeps a log of every conversation. Personal data is handled in line with India's Digital Personal Data Protection Act.",
        ],
      },
    ],
    checklist: {
      heading: "Signs you are ready for AI automation",
      items: [
        "You receive more than 100 enquiries a month",
        "The same questions are answered many times a day",
        "Leads wait more than an hour for a first reply",
        "Follow-ups depend on someone remembering",
        "Staff copy data between apps by hand",
      ],
    },
    faqs: [
      { q: "Is AI automation expensive to run?", a: "Running costs depend on message and call volume. For most small and mid-sized businesses, platform and AI usage costs are modest compared with the staff time saved. We estimate them during the audit." },
      { q: "Which tools do you build with?", a: "We use the official WhatsApp Business Platform, leading AI models, and automation tools such as n8n, Make or custom code, connected to your CRM and calendar." },
      { q: "Can we turn it off?", a: "Yes. Every automation has a clear off switch and a fallback to your team." },
    ],
    services: ["ai-automation", "crm-automation", "lead-generation"],
  },
  {
    slug: "ai-marketing-agency",
    metaTitle: "AI Marketing Agency: Faster Campaigns, Smarter Follow-Up",
    metaDescription:
      "An AI marketing agency that uses AI where it improves results: faster creative testing, smarter audience insight and automated follow-up, guided by experienced marketers.",
    eyebrow: "AI marketing agency",
    headline: "AI where it helps. People where it matters.",
    intro:
      "AI is changing how marketing is produced and measured, but it does not replace judgment about your market, your offer or your brand. We use AI to test more ideas, learn faster and follow up better, with experienced marketers deciding what goes live.",
    sections: [
      {
        heading: "What AI actually improves in marketing",
        body: [
          "Creative testing: generating and organising many ad variations so testing cycles take days rather than weeks.",
          "Insight: summarising sales calls, reviews and enquiries to find the words customers use and the objections they raise.",
          "Follow-up: replying instantly and personally to every lead, at any hour, which is often where the largest revenue gain is hiding.",
        ],
      },
      {
        heading: "What we do not hand to AI",
        body: [
          "Strategy, positioning, brand voice and final approval stay with people. We do not publish unreviewed AI content, and we do not use AI to fake reviews, testimonials or results.",
        ],
      },
      {
        heading: "How engagements run",
        body: [
          "We begin with your current marketing and sales data, identify the stage of the funnel losing the most value, and apply AI there first. Each change is measured against a baseline so you can see what it contributed.",
        ],
      },
    ],
    checklist: {
      heading: "Where to start with AI marketing",
      items: [
        "Response time to new enquiries",
        "Number of ad creatives tested each month",
        "Quality of customer insight in your messaging",
        "Consistency of follow-up and nurture",
        "Tracking from ad click to closed sale",
      ],
    },
    faqs: [
      { q: "Will AI-generated ads look generic?", a: "Not if they are directed well. AI helps us produce variations quickly, but concepts, brand standards and final selection are handled by our team." },
      { q: "Do you use our customer data to train AI models?", a: "No. Your data is used only to serve your business, within your accounts, and is not used to train public models." },
      { q: "Is this different from performance marketing?", a: "It includes performance marketing, plus AI-powered creative production, insight and automated follow-up, managed as one system." },
    ],
    services: ["performance-marketing", "ai-automation", "website-development"],
  },
  {
    slug: "performance-marketing-agency",
    metaTitle: "Performance Marketing Agency in Mohali & Chandigarh",
    metaDescription:
      "Performance marketing from the Chandigarh Tricity: Meta and Google Ads managed against qualified leads and revenue, with CRM-connected tracking and transparent weekly reporting.",
    eyebrow: "Performance marketing agency · Mohali & Chandigarh",
    headline: "Every rupee tracked to a result.",
    intro:
      "Performance marketing should mean exactly that: spend held accountable to performance. From our base in the Chandigarh Tricity we manage Meta and Google Ads for businesses across India, with tracking that follows each lead through to the sale.",
    sections: [
      {
        heading: "Measurement before media",
        body: [
          "Before increasing spend, we make sure the numbers can be trusted: server-side conversion tracking, offline conversions from your CRM, and consistent attribution across platforms.",
          "Most accounts we audit are optimising toward the wrong signal, usually form submissions rather than qualified leads or sales.",
        ],
      },
      {
        heading: "Creative is the main lever",
        body: [
          "Targeting options on Meta and Google have narrowed, so creative now does most of the targeting. We run a structured creative testing programme each month, with clear hypotheses and kill rules.",
        ],
      },
      {
        heading: "Reporting you can read in two minutes",
        body: [
          "Each week you receive a short summary: what we spent, what it produced in leads, qualified leads and sales, what we learned and what we are changing next.",
        ],
      },
    ],
    checklist: {
      heading: "Audit your current ad accounts",
      items: [
        "Are conversions imported from your CRM?",
        "Is the Meta Conversions API set up?",
        "How many new creatives were tested last month?",
        "Does each campaign have its own landing page?",
        "Do you know your cost per customer by campaign?",
      ],
    },
    faqs: [
      { q: "What is the minimum ad budget?", a: "We recommend at least ₹50,000 per month in media spend for meaningful optimisation. Smaller budgets can work in focused local campaigns." },
      { q: "Do you lock clients into long contracts?", a: "Engagements typically start with a three-month period, because that is the minimum time needed to test and optimise properly. After that, they run month to month." },
      { q: "Can we meet in person?", a: "Yes, for businesses in Chandigarh, Mohali and Panchkula. Clients elsewhere work with us over video calls." },
    ],
    services: ["performance-marketing", "lead-generation", "local-seo"],
  },
];

export function getLanding(slug: string) {
  return landingPages.find((p) => p.slug === slug);
}

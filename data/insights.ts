export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string; // ISO date
  readingMinutes: number;
  /** Simple structured body: paragraphs, subheadings and lists. */
  body: ({ type: "p"; text: string } | { type: "h2"; text: string } | { type: "ul"; items: string[] })[];
};

export const articles: Article[] = [
  {
    slug: "seo-aeo-geo-explained",
    title: "SEO, AEO and GEO: what changes when search starts answering",
    description:
      "Search results now include direct answers and AI-generated summaries. What each discipline means, what stays the same, and where a business should start.",
    category: "Search growth",
    published: "2026-10-20",
    readingMinutes: 7,
    body: [
      { type: "p", text: "For twenty years, being found online meant ranking in a list of ten blue links. That list still matters, but more searches now end with a direct answer, a featured snippet or an AI-generated summary that cites a handful of sources. Three overlapping disciplines have emerged to describe the work involved." },
      { type: "h2", text: "SEO: being eligible and competitive" },
      { type: "p", text: "Search engine optimisation remains the foundation. Pages must be crawlable, fast and clearly about something. They need to answer the search better than competitors, and the site needs enough authority for search engines to trust it. Without this, nothing else works." },
      { type: "h2", text: "AEO: being the answer" },
      { type: "p", text: "Answer engine optimisation focuses on questions. When someone asks how long an interior project takes or what a dental implant involves, the result is often a short, direct answer. AEO structures content so that answer is easy to find and quote: the question as a heading, a clear answer first, and the detail after." },
      { type: "h2", text: "GEO: being represented in AI search" },
      { type: "p", text: "Generative engine optimisation is about how AI assistants and AI-powered search describe and cite your brand. These systems draw on many sources, so the work is broader: consistent business facts across the web, genuine expert content, coverage on sources your industry trusts, and pages that can be read without heavy JavaScript." },
      { type: "h2", text: "What does not change" },
      { type: "ul", items: [
        "There is no special file or markup that guarantees inclusion in AI answers.",
        "Accurate, specific, useful content beats volume.",
        "Credibility comes from real expertise and real mentions, not tricks.",
        "Measurement still matters: Search Console for search, and a documented set of questions and prompts checked over time for answers and AI.",
      ] },
      { type: "h2", text: "Where to start" },
      { type: "p", text: "Fix the technical foundations first, then rewrite your most valuable pages answer-first, then make sure your business details are consistent everywhere they appear. That order improves all three at once." },
    ],
  },
  {
    slug: "redesign-without-losing-rankings",
    title: "How to redesign a website without losing Google rankings",
    description:
      "Most ranking drops after a redesign are avoidable. A practical checklist for content, URLs, redirects and the weeks after launch.",
    category: "Websites",
    published: "2026-10-13",
    readingMinutes: 6,
    body: [
      { type: "p", text: "A redesign is one of the riskiest moments for organic traffic. Pages disappear, URLs change, content is trimmed, and internal links break, all at once. Search engines then have to work out what happened. With a plan, most of that risk can be removed." },
      { type: "h2", text: "Before design starts" },
      { type: "ul", items: [
        "Export every URL that receives organic traffic or has links pointing to it, from Search Console and analytics.",
        "Note which pages bring in enquiries, not just visits.",
        "Record current titles, headings and structured data for important pages.",
      ] },
      { type: "h2", text: "During the build" },
      { type: "p", text: "Keep valuable content. Shorter is not always better: a page that ranks because it answers a question thoroughly will lose ground if the answer is cut. Map every old URL to its closest new equivalent, and only remove a page when nothing on the new site serves the same purpose." },
      { type: "h2", text: "At launch" },
      { type: "ul", items: [
        "Use permanent (301) redirects from every old URL to its new equivalent, without chains.",
        "Update internal links to point directly at new URLs.",
        "Submit the new XML sitemap in Search Console.",
        "Check that staging rules such as noindex or password protection are removed.",
      ] },
      { type: "h2", text: "In the weeks after" },
      { type: "p", text: "Watch Search Console for 404 errors, coverage changes and drops on key queries. Some fluctuation is normal for a few weeks; a sustained drop on specific pages usually points to a missing redirect or missing content that can be fixed quickly." },
    ],
  },
  {
    slug: "whatsapp-lead-qualification-real-estate",
    title: "Qualifying real estate leads on WhatsApp without losing the personal touch",
    description:
      "Property buyers enquire with many projects at once. How developers and brokers can reply instantly, qualify properly and still feel human.",
    category: "Sales automation",
    published: "2026-09-29",
    readingMinutes: 6,
    body: [
      { type: "p", text: "A buyer interested in a new project rarely enquires with only one developer. They send the same message to several, often late in the evening, and give their attention to whoever replies first with something useful. For sales teams, the challenge is replying fast without sending generic messages that buyers ignore." },
      { type: "h2", text: "The first reply" },
      { type: "p", text: "A good first reply confirms the project the buyer asked about, answers their question if they asked one, and asks one or two qualifying questions, usually configuration and budget. It should take seconds, not hours." },
      { type: "h2", text: "Questions that actually qualify" },
      { type: "ul", items: [
        "Which configuration are you considering?",
        "What budget range are you working with?",
        "When are you hoping to move or invest?",
        "Will you need a home loan, and is it pre-approved?",
      ] },
      { type: "p", text: "Ask them conversationally, one at a time, and stop when you have enough to decide the next step. Buyers who share budget and timeline are far more likely to visit." },
      { type: "h2", text: "Hand-off to a person" },
      { type: "p", text: "Automation should end in a human conversation for qualified buyers: a site-visit slot or a call with an advisor who already has the conversation summary. Buyers should always be able to ask for a person, and the assistant should say clearly when it is a virtual assistant." },
      { type: "h2", text: "Staying compliant" },
      { type: "p", text: "Use the official WhatsApp Business Platform, send promotional messages only to people who opted in, and make sure project details and RERA information shared in chat match the approved documents." },
    ],
  },
  {
    slug: "speed-to-lead",
    title: "Speed to lead: why the first reply decides most sales",
    description:
      "Buyers contact several businesses at once and tend to choose the one that responds first and helpfully. Here is how to reply to every enquiry within a minute without hiring more staff.",
    category: "Sales automation",
    published: "2026-10-06",
    readingMinutes: 6,
    body: [
      { type: "p", text: "When someone fills in a form or sends a WhatsApp message, they are rarely contacting only you. They are comparing options, often on their phone, often outside office hours. The business that replies first with something useful has the best chance of starting a real conversation." },
      { type: "p", text: "Yet many businesses take hours, sometimes days, to respond. The reason is rarely laziness. Enquiries arrive in many places, the team is busy serving existing customers, and nobody owns the first reply." },
      { type: "h2", text: "Measure your real response time" },
      { type: "p", text: "Before changing anything, measure. Take the last 50 enquiries and note when each arrived and when the first meaningful reply was sent. Separate business hours from evenings and weekends. Most teams are surprised by the result." },
      { type: "h2", text: "What a good first reply contains" },
      { type: "ul", items: [
        "A direct answer to the question they asked, if there was one.",
        "One or two qualifying questions, such as budget, timeline or location.",
        "A clear next step: a call, a visit, a quote or a booking link.",
        "A human name or an honest note that a virtual assistant is replying.",
      ] },
      { type: "h2", text: "Automating it responsibly" },
      { type: "p", text: "An AI assistant can send that first reply in seconds, in the customer's preferred language, and collect the details your team needs. The key is to limit it to approved information, hand over to a person when it is unsure, and log every conversation so quality can be reviewed." },
      { type: "p", text: "Start with one channel, usually WhatsApp or website chat, run it alongside your team for two weeks, then expand once the replies are consistently good." },
    ],
  },
  {
    slug: "whatsapp-automation-guide",
    title: "WhatsApp automation for businesses: a practical guide",
    description:
      "What the official WhatsApp Business Platform allows, where automation helps, and the mistakes that get business numbers restricted.",
    category: "WhatsApp",
    published: "2026-09-22",
    readingMinutes: 8,
    body: [
      { type: "p", text: "For most Indian customers, WhatsApp is the most comfortable way to talk to a business. That makes it the most valuable channel to automate, and the one where mistakes are most visible." },
      { type: "h2", text: "App, Business App or Business Platform?" },
      { type: "p", text: "The free WhatsApp Business App is designed for a person replying from a phone. Automation at scale needs the WhatsApp Business Platform, accessed through Meta or an approved provider. It supports multiple agents, integrations with your CRM, and AI assistants, and it keeps your number compliant." },
      { type: "p", text: "Unofficial tools that automate the regular app risk getting your number banned. Avoid them for any number your business depends on." },
      { type: "h2", text: "Where automation helps most" },
      { type: "ul", items: [
        "Instant replies to new enquiries from ads, your website or QR codes.",
        "Qualification questions before a sales call.",
        "Appointment booking, confirmations and reminders.",
        "Order, delivery and service status updates.",
        "Collecting documents or photos needed for a quote.",
      ] },
      { type: "h2", text: "Rules worth knowing" },
      { type: "p", text: "Businesses can reply freely within 24 hours of a customer's last message. Outside that window, you must use pre-approved message templates, and customers must have opted in to receive them. Marketing templates are charged differently from service conversations, so plan campaigns with costs in mind." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Sending promotional broadcasts to people who never opted in.",
        "Long menu trees instead of natural conversation.",
        "No easy way to reach a human.",
        "Conversations that never reach the CRM, so sales has no context.",
      ] },
    ],
  },
  {
    slug: "measure-cost-per-customer",
    title: "Stop optimising for cost per lead. Measure cost per customer.",
    description:
      "Cheap leads can be the most expensive part of your marketing. How to connect ad platforms to your CRM and optimise for the outcome that matters.",
    category: "Performance marketing",
    published: "2026-09-08",
    readingMinutes: 7,
    body: [
      { type: "p", text: "Ad platforms optimise toward whatever signal you give them. If that signal is a form submission, they will find people who like filling in forms. Those are not always people who buy." },
      { type: "h2", text: "The three numbers that matter" },
      { type: "ul", items: [
        "Cost per qualified lead: spend divided by leads that meet your sales criteria.",
        "Lead-to-customer rate: the share of qualified leads that become paying customers.",
        "Cost per customer: spend divided by new customers, by channel and campaign.",
      ] },
      { type: "h2", text: "Connecting the CRM to the ad platforms" },
      { type: "p", text: "Both Meta and Google accept offline conversion data. When a lead is marked qualified or won in your CRM, that event can be sent back to the platform, matched to the original click, and used for optimisation. Over a few weeks, campaigns shift toward the audiences and creatives that produce customers." },
      { type: "h2", text: "A simple starting point" },
      { type: "p", text: "Add a lead status field in your CRM with three or four values, make sure every lead has a source, and review cost per customer by campaign once a month. Even this basic discipline changes how budget is allocated." },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

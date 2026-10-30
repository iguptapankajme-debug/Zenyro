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

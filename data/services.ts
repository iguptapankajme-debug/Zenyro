export type Discipline = "build" | "grow" | "convert";

export type Service = {
  slug: string;
  name: string;
  discipline: Discipline;
  serviceType: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  /** Problems this service solves, in the client's own words. */
  problems: string[];
  included: { title: string; body: string }[];
  approach: { title: string; body: string }[];
  /** What the client receives at the end of an engagement. */
  deliverables: string[];
  fitFor: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const disciplines: Record<
  Discipline,
  { index: string; title: string; claim: string; summary: string; items: string[] }
> = {
  build: {
    index: "01",
    title: "Build",
    claim: "Digital experiences that convert.",
    summary:
      "Websites, landing pages and applications engineered around one job: turning visitors into enquiries. Fast on mid-range phones, measured from day one.",
    items: [
      "Premium Website Development",
      "Conversion Landing Pages",
      "CRM Integrations",
      "AI-Powered Applications",
      "Business Automation",
    ],
  },
  grow: {
    index: "02",
    title: "Grow",
    claim: "Customer acquisition, engineered.",
    summary:
      "Paid and organic acquisition run as one system. Every rupee is tracked from the first click to the closed deal, so budget moves to what actually sells.",
    items: ["Meta Advertising", "Google Ads", "Performance Marketing", "Local SEO", "Conversion Optimization"],
  },
  convert: {
    index: "03",
    title: "Convert",
    claim: "Turn conversations into customers.",
    summary:
      "AI assistants that reply in seconds, qualify every enquiry, follow up without forgetting and put booked appointments in your team's calendar.",
    items: [
      "AI Lead Qualification",
      "WhatsApp Automation",
      "AI Voice Assistants",
      "Appointment Booking",
      "Sales Pipeline Automation",
    ],
  },
};

export const services: Service[] = [
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    discipline: "grow",
    serviceType: "Performance marketing",
    metaTitle: "Performance Marketing Agency for Meta & Google Ads",
    metaDescription:
      "Meta and Google Ads managed against cost per qualified lead and revenue, not clicks. Full-funnel tracking, creative testing and weekly reporting from Zenyro.",
    headline: "Ad spend that answers to revenue.",
    intro:
      "Most ad accounts are optimised for the cheapest lead, which is rarely the best customer. We set up tracking that follows each lead into your CRM, then optimise Meta and Google campaigns toward the enquiries that actually become sales.",
    problems: [
      "Leads are cheap, but most never pick up the phone.",
      "You cannot tell which campaign produced your last ten customers.",
      "Agencies report impressions and clicks while sales stay flat.",
      "Creative goes stale and costs creep up every month.",
    ],
    included: [
      { title: "Account and tracking audit", body: "Pixel, Conversions API, Google Ads conversion tags and GA4 events checked and rebuilt where needed, including offline conversion import from your CRM." },
      { title: "Campaign architecture", body: "Campaigns structured by intent and margin, not by habit. Prospecting, retargeting and search are budgeted against their real cost per customer." },
      { title: "Creative testing system", body: "A steady pipeline of ad concepts, hooks and formats, tested in controlled batches so winners are found quickly and losers are cut early." },
      { title: "Landing page alignment", body: "Every campaign points at a page built for that exact offer and audience. We build or adjust these pages as part of the engagement." },
      { title: "Lead quality feedback loop", body: "Sales outcomes flow back to the ad platforms, so their algorithms learn from customers rather than form fills." },
    ],
    approach: [
      { title: "Weeks 1–2: Measure", body: "Fix tracking, connect the CRM, and establish the true baseline cost per qualified lead." },
      { title: "Weeks 3–6: Restructure", body: "Launch the new account structure and first creative batches alongside existing campaigns." },
      { title: "Ongoing: Compound", body: "Weekly optimisation, monthly creative refresh and budget shifts toward the channels that close." },
    ],
    deliverables: [
      "Rebuilt conversion tracking with CRM feedback",
      "Campaign structure document",
      "Monthly creative test plan",
      "Weekly performance summary in plain language",
      "Live dashboard showing spend, leads, qualified leads and sales",
    ],
    fitFor: [
      "Businesses spending ₹50,000 or more per month on ads, or ready to",
      "Sales teams that can follow up on leads within a day",
      "Offers with a clear customer value",
    ],
    faqs: [
      { q: "What budget do you need to start?", a: "We work best with businesses spending at least ₹50,000 per month on media, because below that it takes too long to gather enough data to optimise with confidence. Our management fee is separate from ad spend." },
      { q: "Do you guarantee results?", a: "No honest agency can guarantee a cost per lead or a revenue figure, because markets, offers and sales follow-up all affect the outcome. We commit to transparent tracking, a clear test plan and weekly reporting so you can judge the work on real numbers." },
      { q: "Who owns the ad accounts?", a: "You do. We work inside your Meta Business Manager and Google Ads accounts with partner access, so all data and history stay with your business." },
    ],
    related: ["lead-generation", "local-seo", "website-development"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    discipline: "convert",
    serviceType: "AI business automation",
    metaTitle: "AI Automation Agency: WhatsApp, Voice & Workflow Automation",
    metaDescription:
      "AI assistants and automated workflows for enquiry handling, WhatsApp, voice calls and back-office tasks. Built on your tools, with human approval where it matters.",
    headline: "Your best salesperson, available at 2 a.m.",
    intro:
      "Enquiries arrive at all hours, through WhatsApp, website chat, calls and forms. We build AI assistants that respond in seconds, ask the right qualifying questions in your brand voice, and hand warm leads to your team with full context.",
    problems: [
      "Leads wait hours for a reply and go cold, or go to a competitor.",
      "Your team spends the day answering the same ten questions.",
      "Follow-ups depend on someone remembering to send them.",
      "Calls after hours go to voicemail and are never returned.",
    ],
    included: [
      { title: "AI chat and WhatsApp assistants", body: "Trained on your services, pricing rules and FAQs. Replies in English, Hindi or Hinglish, and escalates to a person when a question falls outside its brief." },
      { title: "AI voice assistants", body: "Answers inbound calls or returns missed calls, qualifies the caller and books a slot. Every call is transcribed and logged." },
      { title: "Follow-up sequences", body: "Timed WhatsApp, SMS and email follow-ups that stop automatically when the lead replies or books." },
      { title: "Workflow automation", body: "Quotes, onboarding documents, reminders and internal notifications connected across your apps, using tools such as n8n, Make or custom code." },
      { title: "Guardrails and oversight", body: "Approval steps for sensitive actions, conversation logs, and alerts when the assistant is unsure." },
    ],
    approach: [
      { title: "Map", body: "We review real conversations and call recordings to learn how your best people qualify and sell." },
      { title: "Build and test", body: "The assistant is built on your accounts and tested against real past enquiries before it speaks to a single customer." },
      { title: "Shadow, then launch", body: "It runs alongside your team with approvals turned on. Once accuracy holds, approvals are relaxed step by step." },
    ],
    deliverables: [
      "AI assistant deployed on chosen channels",
      "Knowledge base and conversation rules document",
      "Automated follow-up sequences",
      "CRM integration with conversation summaries",
      "Monitoring dashboard and alerting",
    ],
    fitFor: [
      "Businesses receiving 100 or more enquiries per month",
      "Teams losing leads to slow response or after-hours enquiries",
      "Operations with repetitive, rule-based admin",
    ],
    faqs: [
      { q: "Will customers know they are talking to AI?", a: "We recommend being open about it. Assistants introduce themselves as a virtual assistant and offer a human at any point. Customers mostly care about getting a fast, accurate answer." },
      { q: "Which WhatsApp setup do you use?", a: "We use the official WhatsApp Business Platform through Meta or an approved provider, which keeps your number compliant and avoids the bans that unofficial tools risk." },
      { q: "What happens if the AI gives a wrong answer?", a: "Assistants only answer from approved information, hand over when unsure, and log every conversation. Sensitive actions such as discounts or cancellations always need a person to approve." },
    ],
    related: ["crm-automation", "lead-generation", "website-development"],
  },
  {
    slug: "website-development",
    name: "Website Development",
    discipline: "build",
    serviceType: "Website development",
    metaTitle: "Website Development Agency for High-Converting Business Sites",
    metaDescription:
      "Fast, premium websites and landing pages built in Next.js, designed to convert visitors into enquiries and to load quickly on mid-range phones and Indian mobile networks.",
    headline: "A website that earns its keep.",
    intro:
      "A beautiful website that does not produce enquiries is an expensive brochure. We design and engineer sites around the decisions your buyers need to make, then make them fast enough to load comfortably on a mid-range Android phone on a 4G connection.",
    problems: [
      "Your site looks dated next to competitors who charge more.",
      "Visitors arrive from ads and leave without enquiring.",
      "Pages are slow on mobile, and Google rankings show it.",
      "Every small change needs a developer and a week.",
    ],
    included: [
      { title: "Positioning and page architecture", body: "We define who the site is for, what they need to believe, and the order in which each page should make that case." },
      { title: "Custom design", body: "An original visual identity for the web: typography, layout and motion designed for your brand, not adapted from a template." },
      { title: "Engineering for speed", body: "Built with Next.js and server rendering, optimised images and minimal JavaScript, targeting good Core Web Vitals on real devices." },
      { title: "Conversion paths", body: "Forms, WhatsApp, call and booking options placed where intent is highest, with every submission tracked." },
      { title: "Editable content", body: "A headless CMS or simple content files, so your team can update pages, case studies and articles without a developer." },
    ],
    approach: [
      { title: "Discover", body: "Customer interviews, competitor review and analytics audit." },
      { title: "Design", body: "Key pages designed at full fidelity, reviewed on real phones before build." },
      { title: "Engineer and launch", body: "Build, content migration, redirects, tracking and performance testing before going live." },
    ],
    deliverables: [
      "Custom-designed, responsive website",
      "Technical SEO foundation: metadata, sitemap, structured data and redirects",
      "Analytics and conversion tracking",
      "CMS or content workflow with training",
      "Performance report at launch",
    ],
    fitFor: [
      "Established businesses whose website undersells them",
      "Companies about to invest in paid advertising",
      "Brands launching a new product, project or location",
    ],
    faqs: [
      { q: "How long does a website take?", a: "A focused landing page takes two to three weeks. A full business website usually takes six to ten weeks, depending on the number of pages and how quickly content is ready." },
      { q: "Do you use WordPress?", a: "We usually build in Next.js because it gives us more control over speed and design. If your team relies on WordPress, we can build a headless setup so editors keep a familiar interface." },
      { q: "Will my existing Google rankings be affected?", a: "We map every existing URL, set permanent redirects and keep valuable content, so search rankings are protected during the move." },
    ],
    related: ["lead-generation", "local-seo", "performance-marketing"],
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    discipline: "grow",
    serviceType: "Lead generation",
    metaTitle: "Lead Generation Agency: Qualified Leads, Not Form Fills",
    metaDescription:
      "End-to-end lead generation: offer design, landing pages, paid acquisition and AI qualification, so your sales team spends time only on buyers who are ready.",
    headline: "Fewer, better conversations.",
    intro:
      "Lead generation fails in the gaps between teams: the ad agency hands over leads, the website loses half of them, and sales calls the rest two days late. We run the whole path as one system, from the offer to the booked meeting.",
    problems: [
      "Sales complains that leads are junk; marketing says sales does not follow up.",
      "Lead volume swings month to month with no clear reason.",
      "You buy leads from portals that also sell them to competitors.",
      "Nobody knows the real cost of acquiring a customer.",
    ],
    included: [
      { title: "Offer and funnel design", body: "We shape an entry offer that serious buyers want, such as a site visit, consultation, sample or audit, and design the funnel around it." },
      { title: "Acquisition", body: "Meta, Google and LinkedIn campaigns, plus organic channels where they suit your buyer." },
      { title: "Qualification", body: "Forms and AI assistants that ask budget, timeline and need, then score each lead before it reaches sales." },
      { title: "Speed to lead", body: "Instant replies and routing rules so hot leads reach the right person within minutes." },
      { title: "Closed-loop reporting", body: "Every lead tracked to outcome, so you see cost per qualified lead and cost per customer by channel." },
    ],
    approach: [
      { title: "Define the qualified lead", body: "Agree with your sales team exactly what a good lead looks like, and score against it." },
      { title: "Build the path", body: "Offer, landing page, campaigns, qualification and routing launched together." },
      { title: "Tune the whole system", body: "Improve the weakest stage first, whether that is ads, page, qualification or follow-up." },
    ],
    deliverables: [
      "Lead scoring model agreed with sales",
      "Landing pages and qualification flows",
      "Campaigns across chosen channels",
      "Lead routing and instant response",
      "Monthly cost-per-customer report",
    ],
    fitFor: [
      "B2B and high-ticket B2C businesses",
      "Sales teams with capacity but inconsistent pipeline",
      "Companies replacing portal or bought leads",
    ],
    faqs: [
      { q: "Do you sell leads?", a: "No. We build and run a lead generation system that belongs to you. Leads come to your business only and are never shared or resold." },
      { q: "How do you define a qualified lead?", a: "Together with your sales team, before launch. Typically it combines budget, timeline, location and need. Leads are scored against those criteria automatically." },
      { q: "How soon will we see leads?", a: "Campaigns usually start producing enquiries within the first one to two weeks after launch. The first month is mainly about learning which audiences and messages produce qualified leads." },
    ],
    related: ["performance-marketing", "ai-automation", "crm-automation"],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    discipline: "grow",
    serviceType: "Local search engine optimisation",
    metaTitle: "Local SEO Services: Rank in Google Maps & Local Search",
    metaDescription:
      "Local SEO for businesses that serve a city or region: Google Business Profile optimisation, location pages, reviews workflow and technical fixes that help you appear in the map pack.",
    headline: "Be the first name nearby.",
    intro:
      "When someone searches for a clinic, interior designer or builder near them, the map results take most of the clicks. Local SEO makes sure your business appears there with accurate information, strong reviews and pages that prove you serve that area.",
    problems: [
      "Competitors with worse service appear above you on Google Maps.",
      "Your Google Business Profile is incomplete or out of date.",
      "You serve several areas but only rank in one.",
      "Reviews arrive slowly and inconsistently.",
    ],
    included: [
      { title: "Google Business Profile", body: "Categories, services, photos, products and posts optimised and kept current, with call and direction tracking." },
      { title: "Location and service pages", body: "Genuinely useful pages for the areas and services you cover, written for people in that location rather than for keywords." },
      { title: "Reviews workflow", body: "An automated, policy-compliant way to ask happy customers for reviews at the right moment, plus reply templates." },
      { title: "Citations and consistency", body: "Business name, address and phone number made consistent across directories and maps." },
      { title: "Technical SEO", body: "Speed, mobile usability, structured data and indexing issues fixed on your site." },
    ],
    approach: [
      { title: "Audit", body: "Rankings across a grid of locations, profile health, competitors and technical issues." },
      { title: "Fix foundations", body: "Profile, citations, technical issues and core pages improved first." },
      { title: "Build authority", body: "Reviews, local content and links built steadily month by month." },
    ],
    deliverables: [
      "Local ranking grid report",
      "Optimised Google Business Profile",
      "Location and service pages",
      "Automated review request flow",
      "Monthly ranking and calls report",
    ],
    fitFor: [
      "Clinics, showrooms, studios and service businesses",
      "Multi-location businesses",
      "Businesses where most customers come from within a few kilometres",
    ],
    faqs: [
      { q: "How long does local SEO take?", a: "Profile and technical fixes can improve visibility within weeks. Competitive categories usually take three to six months of steady work to move into the top map results." },
      { q: "Can you remove negative reviews?", a: "We cannot remove genuine reviews, and nobody should promise to. We help you respond well, and we build a steady flow of reviews from satisfied customers so your rating reflects your real service." },
      { q: "Do you create fake location pages?", a: "No. We only create pages for areas you genuinely serve, with content specific to that area. Thin duplicate city pages can harm rankings." },
    ],
    related: ["website-development", "performance-marketing", "lead-generation"],
  },
  {
    slug: "crm-automation",
    name: "CRM Automation",
    discipline: "build",
    serviceType: "CRM implementation and automation",
    metaTitle: "CRM Automation & Sales Pipeline Setup",
    metaDescription:
      "CRM setup and sales pipeline automation for HubSpot, Zoho, Salesforce and more. Every lead captured, scored, assigned and followed up automatically.",
    headline: "No lead left in a spreadsheet.",
    intro:
      "If leads live in WhatsApp chats, inboxes and spreadsheets, some will be forgotten. We set up a CRM your team will actually use, connect every lead source to it, and automate the routine steps between first enquiry and signed deal.",
    problems: [
      "Leads come from five places and nobody has the full picture.",
      "Follow-ups slip when the team is busy.",
      "Managers cannot see the pipeline without asking around.",
      "You paid for a CRM that nobody updates.",
    ],
    included: [
      { title: "CRM selection and setup", body: "We recommend and configure the right CRM for your size and budget, such as HubSpot, Zoho, Salesforce, Pipedrive or LeadSquared." },
      { title: "Lead capture", body: "Website forms, ad platforms, WhatsApp, calls and portals connected so every lead lands in one place automatically." },
      { title: "Pipeline automation", body: "Assignment rules, task reminders, stage-based follow-ups and alerts for deals that go quiet." },
      { title: "AI enrichment", body: "Conversation summaries, lead scores and next-step suggestions written into each record." },
      { title: "Reporting", body: "Dashboards for pipeline value, conversion by stage and response time, by person and by source." },
    ],
    approach: [
      { title: "Map your sales process", body: "We document how deals really move today, including the informal steps." },
      { title: "Configure and connect", body: "Pipeline, fields, automations and integrations built and tested with sample data." },
      { title: "Adopt", body: "Team training, simple daily habits and a 30-day check-in to fix friction." },
    ],
    deliverables: [
      "Configured CRM with your pipeline stages",
      "All lead sources connected",
      "Automated follow-ups and task rules",
      "Sales dashboards",
      "Team training and recorded walkthroughs",
    ],
    fitFor: [
      "Teams of 2 to 50 sales or service staff",
      "Businesses with leads scattered across tools",
      "Companies preparing to scale paid acquisition",
    ],
    faqs: [
      { q: "Can you work with our existing CRM?", a: "Yes. In most cases we improve the CRM you already pay for. We only recommend switching when the current tool cannot support your process." },
      { q: "Do you migrate our existing data?", a: "Yes. We clean and import existing contacts, deals and history so your team starts with a complete picture." },
      { q: "Will my team actually use it?", a: "Adoption is part of the project. We keep data entry to a minimum by automating it, and we train the team on a short daily routine." },
    ],
    related: ["ai-automation", "lead-generation", "website-development"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

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
  /** Search services render an illustrative search interface and visibility demo on their page. */
  search?: "seo" | "aeo" | "geo";
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
      "Paid and organic acquisition run as one system: ads, search engines and AI discovery, tracked from the first click to the closed deal.",
    items: ["Performance Marketing", "SEO: Rank where customers search", "AEO: Become the answer", "GEO: Get discovered in AI search", "Local SEO"],
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
    related: ["lead-generation", "seo", "website-development"],
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
    slug: "nextjs-development",
    name: "Next.js Development",
    discipline: "build",
    serviceType: "Next.js development",
    metaTitle: "Next.js Development Agency for Fast, SEO-Ready Websites",
    metaDescription:
      "Next.js development for marketing sites, landing pages and web apps: server rendering, strong Core Web Vitals, headless CMS and integrations, built by a team that also runs your growth.",
    headline: "Next.js Development Agency",
    intro:
      "Next.js lets a website be both fast and genuinely custom: pages rendered on the server for search engines, minimal JavaScript for visitors on mid-range phones, and room for real application features when you need them. We build Next.js sites and apps that are designed to convert and engineered to stay fast.",
    problems: [
      "Your current site is slow on mobile and scores poorly in Core Web Vitals.",
      "A page builder or theme limits the design and adds weight to every page.",
      "Marketing needs landing pages faster than developers can ship them.",
      "You need logins, dashboards or integrations that a brochure CMS can't handle.",
    ],
    included: [
      { title: "Architecture and rendering strategy", body: "Static, server-rendered and client components chosen page by page, so content is indexable and interactivity is only shipped where it earns its weight." },
      { title: "Headless CMS integration", body: "Sanity, Contentful, WordPress or another headless CMS so your team edits content without touching code." },
      { title: "Performance engineering", body: "Optimised images and fonts, code splitting, caching and Core Web Vitals monitoring, tested on real mid-range Android devices." },
      { title: "Technical SEO built in", body: "Metadata, canonical URLs, sitemaps, structured data and redirects handled in code from day one." },
      { title: "Integrations and APIs", body: "CRMs, booking tools, payment gateways, analytics and AI services connected through secure server-side routes." },
      { title: "Deployment and hosting", body: "Vercel or your preferred cloud, with preview deployments for every change and rollback in one click." },
    ],
    approach: [
      { title: "Plan", body: "Map content, data and integrations; choose rendering and CMS approach per page type." },
      { title: "Build", body: "Component library, page templates and integrations, reviewed on preview links every week." },
      { title: "Launch and measure", body: "Redirects, performance and SEO checks, then Core Web Vitals monitoring after go-live." },
    ],
    deliverables: [
      "Next.js codebase in your repository",
      "Reusable component library",
      "CMS setup with editor training",
      "Performance and SEO launch report",
      "Documentation for future developers",
    ],
    fitFor: [
      "Businesses moving off slow themes or page builders",
      "Marketing teams running frequent campaigns and landing pages",
      "Products that combine a marketing site with app features",
    ],
    faqs: [
      { q: "Is Next.js good for SEO?", a: "Yes, when it is used well. Server-rendered or static pages deliver complete HTML to search engines, and good Core Web Vitals help user experience. Poorly built Next.js sites that render everything in the browser can still struggle, which is why rendering strategy matters." },
      { q: "Can my team edit content without a developer?", a: "Yes. We connect a headless CMS so editors can update pages, articles and media with previews before publishing." },
      { q: "Do I own the code?", a: "Yes. The code lives in your own repository and hosting account, documented so any competent developer can continue the work." },
    ],
    related: ["website-development", "website-redesign", "seo"],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    discipline: "build",
    serviceType: "Website redesign",
    metaTitle: "Website Redesign Services Without Losing Your Rankings",
    metaDescription:
      "Website redesign that improves conversions and speed while protecting search rankings: content and URL mapping, redirects, performance and launch monitoring.",
    headline: "Redesign without starting from zero.",
    intro:
      "A redesign should keep what already works (rankings, valuable content, enquiry paths) and fix what doesn't. We start from your analytics and search data, map every important URL, and redesign around the pages and journeys that bring in customers.",
    problems: [
      "The site looks dated next to competitors.",
      "Traffic exists, but too few visitors enquire.",
      "Previous redesigns lost search rankings or broke links.",
      "Nobody knows which pages actually matter.",
    ],
    included: [
      { title: "Audit before design", body: "Analytics, Search Console, heatmaps and a technical SEO crawl show which pages earn traffic and enquiries, and where visitors drop off." },
      { title: "Content and URL mapping", body: "Every valuable page is kept, merged or improved, with a one-to-one redirect map so links and rankings carry over." },
      { title: "Conversion-focused redesign", body: "Clearer offers, stronger proof and shorter enquiry paths, designed for mobile first." },
      { title: "Performance upgrade", body: "A lighter, faster build so the new site loads quickly on real phones." },
      { title: "Launch monitoring", body: "Search Console, rankings, 404s and enquiries tracked closely for the weeks after launch, with fixes applied quickly." },
    ],
    approach: [
      { title: "Diagnose", body: "Data review, crawl and stakeholder interviews; agree success metrics." },
      { title: "Redesign and rebuild", body: "New design and build, with content migrated and improved page by page." },
      { title: "Migrate safely", body: "Redirects, metadata and tracking verified on staging before switching over." },
    ],
    deliverables: [
      "Pre-redesign audit and page inventory",
      "Redirect map for every changed URL",
      "Redesigned, faster website",
      "Post-launch monitoring report",
    ],
    fitFor: [
      "Established sites with existing traffic and rankings",
      "Businesses whose website no longer matches their positioning",
      "Teams planning a rebrand or platform change",
    ],
    faqs: [
      { q: "Will a redesign hurt my Google rankings?", a: "It can if URLs, content or internal links change without a plan. We map every important URL, preserve valuable content and set permanent redirects, then monitor Search Console closely after launch to catch issues early." },
      { q: "Can you redesign without changing platform?", a: "Yes. Sometimes the right answer is a redesign on your current CMS. We recommend a platform change only when the current one limits speed, design or editing." },
      { q: "How long does a redesign take?", a: "Most business websites take six to twelve weeks, depending on page count, content changes and integrations. The website cost calculator gives a first estimate." },
    ],
    related: ["website-development", "nextjs-development", "seo"],
  },
  {
    slug: "seo",
    name: "SEO",
    discipline: "grow",
    search: "seo",
    serviceType: "Search engine optimisation",
    metaTitle: "SEO Services That Drive Organic Growth",
    metaDescription:
      "Technical SEO, on-page and local SEO, programmatic SEO, content strategy, internal linking and digital PR, measured in Search Console and tied to enquiries.",
    headline: "SEO Services That Drive Organic Growth",
    intro:
      "Rank where customers search. We fix what stops search engines from understanding your site, build pages that match real search intent, and earn the authority that moves rankings, then measure it all against enquiries, not just traffic.",
    problems: [
      "Competitors with weaker offers outrank you for the searches that matter.",
      "Traffic grows but enquiries don't.",
      "Pages exist but Google doesn't index them, or indexes the wrong ones.",
      "Nobody can explain what last year's SEO spend produced.",
    ],
    included: [
      { title: "Technical SEO", body: "Crawling, indexing, canonicals, redirects, sitemaps, structured data and JavaScript rendering audited and fixed, so every important page can be found and understood." },
      { title: "On-page SEO", body: "Titles, headings, copy and media aligned to what searchers actually want, page by page, without keyword stuffing." },
      { title: "Local SEO", body: "Google Business Profile, location pages and reviews workflows for businesses that serve a city or region." },
      { title: "Programmatic SEO", body: "Templated pages built from real data, such as projects, locations or product ranges, each with genuinely useful, differentiated content." },
      { title: "Content strategy", body: "A topic map built from search demand and sales conversations, prioritised by business value, then written by people who know the subject." },
      { title: "Internal linking", body: "Site architecture and links that pass authority to the pages that sell and help visitors find the next step." },
      { title: "Digital PR", body: "Original data, expert commentary and partnerships that earn relevant links and mentions. No paid link schemes." },
      { title: "Search Console analysis", body: "Queries, pages, indexing and click-through data reviewed monthly to find quick wins and declining pages." },
      { title: "Core Web Vitals", body: "Loading, responsiveness and layout stability improved on real devices, because speed affects both rankings and conversions." },
    ],
    approach: [
      { title: "Audit", body: "Technical crawl, Search Console and analytics review, competitor gap analysis and a prioritised fix list." },
      { title: "Foundations", body: "Technical fixes, site architecture, internal links and the highest-value page improvements first." },
      { title: "Growth", body: "Monthly content, digital PR and optimisation cycles, reported against clicks, enquiries and revenue." },
    ],
    deliverables: [
      "Technical SEO audit with prioritised fixes",
      "Keyword and topic map tied to business value",
      "Optimised pages and new content each month",
      "Monthly Search Console and enquiry reporting",
    ],
    fitFor: [
      "Businesses whose customers research on Google before buying",
      "Sites with traffic that does not convert, or no traffic at all",
      "Brands planning new locations, products or projects",
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Technical fixes can improve indexing within weeks. Meaningful ranking and traffic growth in competitive markets usually takes three to six months of consistent work. We report progress monthly so you can see leading indicators before rankings move." },
      { q: "Can you guarantee first-page rankings?", a: "No. Search engines decide rankings, and anyone guaranteeing positions is either targeting searches nobody makes or taking risks with your site. We commit to a clear plan, quality work and transparent reporting." },
      { q: "Do you build links?", a: "We earn links through digital PR, original data and partnerships. We do not buy links or use private blog networks, which can lead to penalties." },
    ],
    related: ["aeo", "geo", "local-seo"],
  },
  {
    slug: "aeo",
    name: "AEO",
    discipline: "grow",
    search: "aeo",
    serviceType: "Answer engine optimisation",
    metaTitle: "Answer Engine Optimization (AEO) Services",
    metaDescription:
      "Answer engine optimisation: question-based content strategy, clear factual answers, entity clarity and structured data where relevant, so your business can become the answer.",
    headline: "Answer Engine Optimization Services",
    intro:
      "Become the answer. More searches now end with a direct answer, a featured snippet or a voice reply. AEO makes your expertise easy to find, understand and quote: clear questions, clear answers, and well-structured information about your business.",
    problems: [
      "Customers ask detailed questions, and your site answers none of them clearly.",
      "Competitors appear in answer boxes and “People also ask” results instead of you.",
      "Important facts about your business are scattered, outdated or contradictory.",
      "Your best expertise is locked in sales calls rather than published.",
    ],
    included: [
      { title: "Answer-focused content architecture", body: "Pages organised around the questions buyers ask at each stage, with the answer first and the detail after." },
      { title: "Search intent analysis", body: "We separate quick-answer questions from research and buying queries, and design the right page for each." },
      { title: "Question-based content strategy", body: "Questions gathered from search data, sales calls, support tickets and reviews, then prioritised by value." },
      { title: "Clear, factual explanations", body: "Concise, accurate answers written or reviewed by subject experts, with dates, figures and sources where they matter." },
      { title: "Structured data where relevant", body: "Schema markup that accurately describes visible content, such as organisation, services, articles and FAQs, never markup for content that isn't on the page." },
      { title: "Entity clarity", body: "Consistent business name, services, locations and expertise across your site, profiles and directories, so systems can recognise who you are." },
      { title: "Content quality improvement", body: "Existing pages rewritten for clarity: shorter answers, better structure, fewer vague claims." },
      { title: "Answer visibility monitoring", body: "A tracked set of priority questions, checked on a schedule to record where your pages appear as answers and where competitors do." },
    ],
    approach: [
      { title: "Question research", body: "Build the question set from search data and real customer conversations." },
      { title: "Answer design", body: "Restructure key pages and create new answer content with subject-matter experts." },
      { title: "Monitor and refine", body: "Track priority questions monthly and improve the answers that are not yet chosen." },
    ],
    deliverables: [
      "Prioritised question map by buying stage",
      "Answer-first page templates",
      "New and rewritten answer content",
      "Structured data review and implementation",
      "Monthly answer visibility log for tracked questions",
    ],
    fitFor: [
      "Expertise-led businesses: clinics, consultants, educators, designers",
      "Brands that answer the same customer questions every day",
      "Companies already investing in SEO who want more from existing content",
    ],
    faqs: [
      { q: "How is AEO different from SEO?", a: "AEO is part of good SEO with a sharper focus: making specific answers easy to find, trust and quote. It shares the same foundations, including crawlable pages, quality content and authority, which is why we usually run them together." },
      { q: "Does adding FAQ schema guarantee answer boxes?", a: "No. Structured data helps systems understand content but does not guarantee any placement, and search engines limit how some rich results appear. We use markup only where it accurately describes visible content." },
      { q: "How do you measure AEO?", a: "We track a defined set of priority questions over time, recording whether and where your pages appear, alongside Search Console clicks and enquiries from the related pages." },
    ],
    related: ["seo", "geo", "website-development"],
  },
  {
    slug: "geo",
    name: "GEO",
    discipline: "grow",
    search: "geo",
    serviceType: "Generative engine optimisation",
    metaTitle: "Generative Engine Optimization (GEO) Services",
    metaDescription:
      "Generative engine optimisation: AI search visibility audits, brand entity consistency, expert content, source citation analysis and monitoring across generative search experiences.",
    headline: "Generative Engine Optimization Services",
    intro:
      "Get discovered in AI search. People increasingly ask AI assistants and AI-powered search for recommendations. GEO improves how accurately and how often your brand is represented there, by strengthening the signals these systems draw on: clear facts, credible sources, expert content and a consistent presence across the web.",
    problems: [
      "AI assistants describe your business inaccurately, or not at all.",
      "Competitors are mentioned when buyers ask for recommendations in your category.",
      "You don't know which sources AI search relies on for your industry.",
      "Nobody is measuring AI search, so it's invisible in your reporting.",
    ],
    included: [
      { title: "AI search visibility audits", body: "A documented sample of buyer prompts run across major generative search experiences, recording whether your brand appears, how it is described and which sources are cited." },
      { title: "Generative search discovery research", body: "The questions and comparisons buyers actually make, mapped to the content and sources that shape the responses." },
      { title: "Brand entity consistency", body: "Name, services, locations, leadership and facts aligned across your site, profiles, directories and knowledge sources." },
      { title: "Expert-led content development", body: "Original, specific content from your team's real expertise: data, explanations and comparisons that are worth citing." },
      { title: "Source citation analysis", body: "Which publications, directories and pages are cited in your category, and where your brand is missing from them." },
      { title: "Digital authority development", body: "Earned coverage, reviews and mentions on the sources that matter in your market." },
      { title: "Generative search monitoring", body: "The same prompt set re-run on a schedule with a documented method, so changes are tracked over time rather than guessed." },
      { title: "Competitor visibility comparisons", body: "How often, and how, competitors appear for the same prompts, and what sources support them." },
      { title: "Technical crawlability", body: "Making sure important pages can be crawled and read: server rendering, clean HTML, sensible robots rules and fast pages." },
    ],
    approach: [
      { title: "Baseline", body: "Audit a defined prompt set and record current visibility, accuracy and cited sources." },
      { title: "Strengthen signals", body: "Fix entity inconsistencies, publish expert content and pursue coverage on the sources that are cited." },
      { title: "Monitor", body: "Re-run the prompt set monthly with the same method and report what changed." },
    ],
    deliverables: [
      "AI search visibility audit with documented method",
      "Source and citation map for your category",
      "Entity consistency fixes across key profiles",
      "Expert content and digital PR plan",
      "Monthly monitoring report against the baseline",
    ],
    fitFor: [
      "Brands whose buyers ask AI assistants for recommendations",
      "Businesses with strong expertise but little online authority",
      "Teams that already invest in SEO and want AI search measured too",
    ],
    faqs: [
      { q: "Can you guarantee my brand will appear in AI answers?", a: "No. Generative systems decide what to include, their responses vary between sessions and users, and they change often. What we can do is strengthen the signals they rely on and measure the results consistently." },
      { q: "Do I need an llms.txt file or special markup for AI search?", a: "There is no single file or markup that guarantees visibility in AI search. Clear, crawlable, accurate content, consistent business information and genuine authority matter far more. We may recommend such files where they are low-cost and sensible, but never as a guarantee." },
      { q: "How do you measure AI search visibility?", a: "With a documented prompt set run on a fixed schedule, recording mentions, descriptions and cited sources, plus referral sessions from AI platforms in your analytics. We report these as observations, not as a single proprietary score." },
    ],
    related: ["seo", "aeo", "performance-marketing"],
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
    related: ["seo", "aeo", "website-development"],
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

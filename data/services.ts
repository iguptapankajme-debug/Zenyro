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
    title: "SEO",
    claim: "Rank where customers search.",
    summary:
      "Technical foundations, pages built around real search intent, local visibility and the authority that moves rankings on Google and Bing.",
    items: ["Technical SEO", "On-page SEO", "Local SEO & Google Maps", "Site migrations", "Search Console reporting"],
  },
  grow: {
    index: "02",
    title: "AEO",
    claim: "Become the answer.",
    summary:
      "Content structured so Google's featured snippets, AI Overviews and voice assistants can lift your answer directly, with your brand attached.",
    items: ["Answer-first content", "FAQ and how-to structure", "Structured data", "Content refreshes", "Digital PR"],
  },
  convert: {
    index: "03",
    title: "GEO",
    claim: "Get recommended by AI.",
    summary:
      "Visibility in ChatGPT, Perplexity, Gemini, Claude and Copilot: clear entity facts, citable sources and consistent mentions, tracked prompt by prompt.",
    items: ["AI visibility tracking", "Entity and brand facts", "Citation building", "AI crawler access", "Prompt-level reporting"],
  },
};

const allServices: Service[] = [
  {
    slug: "seo",
    name: "SEO",
    discipline: "build",
    search: "seo",
    serviceType: "Search engine optimisation",
    metaTitle: "SEO Services & SEO Company for Organic Growth",
    metaDescription:
      "Technical SEO, on-page and local SEO, programmatic SEO, content strategy, internal linking and digital PR, measured in Search Console and tied to enquiries.",
    headline: "SEO that turns searches into customers",
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
      { q: "What are SEO services?", a: "SEO services are the work of improving a website's rankings in search engines: technical fixes, keyword research, page and content improvements, link building and reporting. Zenyro also covers AEO and GEO so you're visible in AI answers." },
      { q: "What is an SEO company?", a: "An SEO company (or SEO agency) is a team that plans and does search engine optimisation for clients and reports on rankings, traffic and enquiries. See [what is SEO](/insights/what-is-seo)." },
      { q: "Is search marketing the same as SEO?", a: "Search marketing covers both paid search ads and SEO. Zenyro focuses on organic search. See [SEO vs SEM](/insights/seo-vs-sem)." },
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
    metaTitle: "AEO Agency: Answer Engine Optimization Services",
    metaDescription:
      "Answer engine optimisation (AEO): question-led content, clear answers and structured data so featured snippets and AI Overviews quote you.",
    headline: "Answer engine optimisation: become the answer",
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
      { q: "What is an AEO agency?", a: "An AEO agency structures your content so search features and AI assistants quote it as the direct answer, and tracks those appearances. See [what is AEO](/insights/what-is-aeo)." },
      { q: "What do answer engine optimization services include?", a: "Question research, answer-first rewrites of key pages, FAQ and schema implementation, entity and author signals, and monthly tracking of snippets, AI Overviews and AI answers." },
      { q: "How much do AEO services cost?", a: "Zenyro includes AEO in plans from US$799 a month alongside SEO and GEO. See [AEO and GEO costs](/insights/aeo-geo-cost)." },
      { q: "How is AEO different from SEO?", a: "AEO is part of good SEO with a sharper focus: making specific answers easy to find, trust and quote. It shares the same foundations, including crawlable pages, quality content and authority, which is why we usually run them together." },
      { q: "Does adding FAQ schema guarantee answer boxes?", a: "No. Structured data helps systems understand content but does not guarantee any placement, and search engines limit how some rich results appear. We use markup only where it accurately describes visible content." },
      { q: "How do you measure AEO?", a: "We track a defined set of priority questions over time, recording whether and where your pages appear, alongside Search Console clicks and enquiries from the related pages." },
    ],
    related: ["seo", "geo", "content-digital-pr"],
  },
  {
    slug: "geo",
    name: "GEO",
    discipline: "convert",
    search: "geo",
    serviceType: "Generative engine optimisation",
    metaTitle: "GEO Agency: Generative Engine Optimization Services",
    metaDescription:
      "Generative engine optimisation (GEO): get recommended by ChatGPT, Perplexity, Gemini and Claude, with prompt-level AI visibility tracking.",
    headline: "Generative engine optimisation: get recommended by AI",
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
      { q: "What is a GEO agency?", a: "A GEO (generative engine optimisation) agency helps brands get named, described accurately and cited by AI assistants such as ChatGPT, Perplexity, Gemini, Claude and Copilot." },
      { q: "What are generative engine optimization services?", a: "Prompt research and tracking, AI crawler and technical fixes, entity consistency, answer-first content, and earning mentions on the sources AI assistants cite. See [how to do GEO](/insights/how-to-do-geo)." },
      { q: "What is an AI SEO agency?", a: "Usually an agency that combines SEO with AI search visibility (AEO and GEO). Zenyro runs all three as one programme." },
      { q: "Can you guarantee my brand will appear in AI answers?", a: "No. Generative systems decide what to include, their responses vary between sessions and users, and they change often. What we can do is strengthen the signals they rely on and measure the results consistently." },
      { q: "Do I need an llms.txt file or special markup for AI search?", a: "There is no single file or markup that guarantees visibility in AI search. Clear, crawlable, accurate content, consistent business information and genuine authority matter far more. We may recommend such files where they are low-cost and sensible, but never as a guarantee." },
      { q: "How do you measure AI search visibility?", a: "With a documented prompt set run on a fixed schedule, recording mentions, descriptions and cited sources, plus referral sessions from AI platforms in your analytics. We report these as observations, not as a single proprietary score." },
    ],
    related: ["seo", "aeo", "content-digital-pr"],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    discipline: "build",
    serviceType: "Local search engine optimisation",
    metaTitle: "Local SEO Services: Rank in Google Maps & Local Search",
    metaDescription:
      "Local SEO for businesses serving a city or region: Google Business Profile, location pages, reviews and fixes that get you into the map pack.",
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
    related: ["seo", "aeo", "technical-seo"],
  },
  {
    slug: "technical-seo",
    name: "Technical SEO",
    discipline: "build",
    search: "seo",
    serviceType: "Technical search engine optimisation",
    metaTitle: "Technical SEO Services: Crawling, Indexing & Core Web Vitals",
    metaDescription:
      "Technical SEO audits and fixes: indexing, site architecture, structured data, JavaScript rendering, Core Web Vitals and AI crawler access.",
    headline: "Technical SEO that lets search engines and AI read every page",
    intro:
      "Great content can't rank if crawlers can't reach it, understand it or trust it. We audit and fix the technical foundations, from indexing and site architecture to structured data, speed and AI crawler access, then verify every fix in Search Console.",
    problems: [
      "Important pages aren't indexed, or the wrong versions are.",
      "A redesign or migration lost rankings and nobody knows why.",
      "The site is slow on phones and Core Web Vitals fail.",
      "AI crawlers are blocked, or can't read pages built in JavaScript.",
    ],
    included: [
      { title: "Crawl and indexing audit", body: "Every URL crawled and compared with what Google has indexed, with duplicate, orphaned and blocked pages found and fixed." },
      { title: "Site architecture", body: "URL structure, navigation and internal links organised so authority flows to the pages that matter." },
      { title: "Structured data", body: "Schema for your organisation, services, products, locations, articles and FAQs, validated and kept accurate." },
      { title: "JavaScript rendering", body: "Server-rendered or pre-rendered pages so search engines and AI crawlers see the real content." },
      { title: "Core Web Vitals", body: "Loading, responsiveness and layout stability improved on mid-range phones, measured with real-user data." },
      { title: "AI crawler access", body: "robots.txt, llms.txt and server rules reviewed so GPTBot, PerplexityBot, Google-Extended and others can read what you want them to." },
      { title: "Migrations and redesigns", body: "Redirect maps, pre-launch checks and post-launch monitoring so a new site keeps the rankings the old one earned." },
      { title: "International and local setup", body: "hreflang, regional pages and location data configured correctly for multi-city or multi-country sites." },
    ],
    approach: [
      { title: "Crawl", body: "A full crawl, Search Console and log review, and a prioritised list ranked by impact and effort." },
      { title: "Fix", body: "We implement fixes directly or with your developers, starting with what blocks indexing and revenue pages." },
      { title: "Verify", body: "Every fix is re-crawled and checked in Search Console, and monitoring alerts catch regressions." },
    ],
    deliverables: [
      "Technical audit with a prioritised fix list",
      "Implemented fixes, verified in Search Console",
      "Structured data and AI crawler configuration",
      "Monthly technical health report",
    ],
    fitFor: [
      "Large or fast-growing sites with indexing problems",
      "Businesses planning a redesign, migration or replatform",
      "Sites built on JavaScript frameworks",
    ],
    faqs: [
      { q: "Do you need access to our website code?", a: "It helps. We can implement many fixes in your CMS ourselves, and for code changes we work with your developers or make the changes directly if you prefer." },
      { q: "Will a redesign hurt our rankings?", a: "It doesn't have to. With a redirect map, pre-launch checks and monitoring after launch, most migrations keep their rankings. Problems usually come from skipping those steps." },
      { q: "What is llms.txt, and do we need it?", a: "It's a plain-text summary of your site written for AI assistants. It's not a ranking factor, but it's quick to add and can help AI tools describe you accurately." },
    ],
    related: ["seo", "geo", "content-digital-pr"],
  },
  {
    slug: "content-digital-pr",
    name: "Content & Digital PR",
    discipline: "grow",
    search: "aeo",
    serviceType: "SEO content and digital PR",
    metaTitle: "Digital PR & SEO Content Services That Get Cited",
    metaDescription:
      "SEO content strategy, expert articles, content refreshes and digital PR that earns links and mentions, built to rank and be cited by AI.",
    headline: "Content that ranks on Google and gets cited by AI",
    intro:
      "Search engines and AI assistants both reward the clearest, most credible answer. We plan content from real search demand, write it with people who know the subject, refresh what's slipping, and earn the links and mentions that build authority.",
    problems: [
      "Blog posts get published but never rank.",
      "Competitors are quoted in AI answers and you're not.",
      "Old pages are slowly losing traffic.",
      "Nobody links to the site or mentions the brand.",
    ],
    included: [
      { title: "Topic and keyword strategy", body: "A content map built from search demand, customer questions and AI prompts, prioritised by business value." },
      { title: "Expert content", body: "Service pages, guides and comparisons written with subject experts, structured so the answer comes first." },
      { title: "Content refreshes", body: "Declining pages updated with current facts, better structure and stronger internal links." },
      { title: "Answer-ready formatting", body: "Clear definitions, steps, tables and FAQs that search engines and AI assistants can quote accurately." },
      { title: "Digital PR", body: "Original data, expert commentary and stories that earn coverage and links from relevant publications." },
      { title: "Brand mentions", body: "Accurate, consistent listings and mentions on the directories, forums and review sites AI assistants read." },
      { title: "Author credibility", body: "Author profiles, credentials and sources that show real expertise, important for health, finance and legal topics." },
    ],
    approach: [
      { title: "Plan", body: "Topic map, content audit and a quarterly calendar agreed with you." },
      { title: "Create", body: "Briefs, expert input, writing, editing and on-page optimisation, then publishing." },
      { title: "Amplify", body: "Digital PR, outreach and mention building, with rankings, citations and enquiries reported monthly." },
    ],
    deliverables: [
      "Topic map and quarterly content calendar",
      "New and refreshed pages every month",
      "Digital PR campaigns and earned links",
      "Monthly ranking, citation and enquiry report",
    ],
    fitFor: [
      "Businesses whose customers research before they buy",
      "Brands that want to be quoted by AI assistants",
      "Sites with old content that has started to slip",
    ],
    faqs: [
      { q: "What are digital PR services?", a: "Digital PR earns coverage, links and mentions on news sites, trade publications and blogs through data, expert commentary and stories, which builds both SEO authority and AI citations." },
      { q: "Do you use AI to write content?", a: "We use AI for research and drafts where it helps, but every page is shaped, fact-checked and edited by people, with input from your experts. Thin, generic AI content tends to rank poorly and isn't quoted." },
      { q: "Do you buy links?", a: "No. We earn links through digital PR, original data and relationships. Paid link schemes risk penalties." },
      { q: "How much content do we need?", a: "Less than you might think. A smaller number of genuinely useful, well-structured pages usually outperforms a high volume of thin posts." },
    ],
    related: ["seo", "aeo", "geo"],
  },
  {
    slug: "international-seo",
    name: "International SEO",
    discipline: "build",
    search: "seo",
    serviceType: "International search engine optimisation",
    metaTitle: "International SEO Agency & Consultant Services",
    metaDescription:
      "International SEO for businesses selling abroad: country targeting, hreflang, localised keyword research and content, and AI visibility.",
    headline: "International SEO that ranks you in every market you sell to",
    intro:
      "Ranking in one country doesn't carry over to the next. Each market has its own searches, competitors, spelling and trusted sources. We set up your site to target each country correctly, research what buyers there actually search and ask, and build the pages and authority to win there.",
    problems: [
      "You rank at home but are invisible in the US, UK or UAE.",
      "The wrong country or language version shows in search results.",
      "Content is translated word for word and doesn't match local searches.",
      "AI assistants recommend local competitors in your target markets.",
    ],
    included: [
      { title: "Market and keyword research", body: "Search demand, competitors and phrasing researched country by country, not translated from one market." },
      { title: "Site structure and hreflang", body: "Subfolders, subdomains or country domains chosen and configured, with hreflang so each searcher sees the right version." },
      { title: "Localised content", body: "Pages written for each market's spelling, currency, units, regulations and examples." },
      { title: "Country-level authority", body: "Mentions and links from publications, directories and associations each market trusts." },
      { title: "AI visibility by market", body: "The prompts buyers use in each country tracked across ChatGPT, Perplexity and Gemini." },
      { title: "Reporting by country", body: "Rankings, organic traffic and enquiries reported separately for each market." },
    ],
    approach: [
      { title: "Prioritise", body: "We size the opportunity in each market and pick where to start, based on demand, competition and your margins." },
      { title: "Set up", body: "Structure, hreflang and technical targeting first, so every page we publish lands in the right country." },
      { title: "Expand", body: "Localised pages and authority market by market, measured separately so you can see what each country returns." },
    ],
    deliverables: [
      "Market prioritisation and keyword research per country",
      "hreflang and international site structure, implemented",
      "Localised pages for each target market",
      "Monthly report by country: rankings, AI visibility, enquiries",
    ],
    fitFor: [
      "Exporters and manufacturers selling abroad",
      "SaaS and service businesses entering new countries",
      "Brands with several country or language sites",
    ],
    faqs: [
      { q: "What does an international SEO consultant do?", a: "They choose the right site structure for each market, implement hreflang, research keywords per country, localise content and build authority in each market. See our [international SEO guide](/insights/international-seo-guide)." },
      { q: "Should we use country domains, subdomains or subfolders?", a: "For most businesses, subfolders on one strong domain (for example /uk/ and /us/) are the easiest to grow and maintain. Country domains can make sense for large brands with local teams. We recommend based on your situation." },
      { q: "Do we need separate content for the UK and US?", a: "Often, yes, for your most important pages. Spelling, terms, prices and examples differ, and search engines treat near-duplicates carefully. hreflang tells them which version belongs to which country." },
      { q: "Can you handle languages other than English?", a: "We plan structure, keywords and hreflang for any language and work with native-speaking writers or your own team for the copy." },
    ],
    related: ["technical-seo", "geo", "content-digital-pr"],
  },
  {
    slug: "ecommerce-seo",
    name: "E-commerce SEO",
    discipline: "build",
    search: "seo",
    serviceType: "E-commerce search engine optimisation",
    metaTitle: "Ecommerce SEO Agency: Services & Packages",
    metaDescription:
      "E-commerce SEO for online stores: category and product pages, product schema, faceted navigation, free Shopping listings and AI visibility.",
    headline: "E-commerce SEO that gets your products found and chosen",
    intro:
      "Shoppers search Google, scroll free product listings and increasingly ask ChatGPT or Perplexity what to buy. We make your categories and products rank, show rich results and appear in AI shopping answers, so fewer sales depend on ads.",
    problems: [
      "Category pages don't rank, so you depend on paid ads.",
      "Thousands of filter and variant URLs waste crawl budget.",
      "Product pages are thin copies of the manufacturer's description.",
      "AI shopping answers recommend competitors' products, not yours.",
    ],
    included: [
      { title: "Category strategy", body: "Category and collection pages built around how shoppers search, with copy, internal links and filters that help them rank." },
      { title: "Product page optimisation", body: "Unique titles, descriptions, specifications, FAQs and reviews on the products that matter most." },
      { title: "Product structured data", body: "Product, Offer, Review and merchant listing schema so prices, stock and ratings show in results." },
      { title: "Faceted navigation and crawl", body: "Filters, variants and pagination controlled so search engines spend their time on pages that sell." },
      { title: "Free listings and feeds", body: "Merchant Center free listings and product feeds kept accurate, so you appear in the Shopping tab without ad spend." },
      { title: "AI shopping visibility", body: "Clear product facts, comparisons and reviews that ChatGPT, Perplexity and Google's AI answers can cite." },
    ],
    approach: [
      { title: "Audit", body: "Crawl, indexing, category and product performance reviewed to find the pages with the most revenue upside." },
      { title: "Fix and structure", body: "Technical and schema fixes first, then category pages, then the products that sell best." },
      { title: "Grow", body: "Buying guides, comparisons and digital PR that earn links and get cited in AI answers." },
    ],
    deliverables: [
      "E-commerce SEO audit with revenue-ranked priorities",
      "Optimised category and product templates",
      "Product schema and Merchant Center setup",
      "Monthly report: rankings, organic revenue, AI visibility",
    ],
    fitFor: [
      "Shopify, WooCommerce and custom online stores",
      "D2C brands that want less dependence on ads",
      "Catalogues with hundreds or thousands of products",
    ],
    faqs: [
      { q: "What do ecommerce SEO packages include?", a: "Typically a technical audit, category and product page optimisation, product schema, Merchant Center setup, content such as buying guides, link building and monthly reporting. See [pricing](/pricing)." },
      { q: "What does an ecommerce SEO agency do?", a: "It makes an online store's categories and products rank in Google and appear in free Shopping listings and AI shopping answers, reducing dependence on paid ads." },
      { q: "Which platforms do you work with?", a: "Shopify, WooCommerce, Magento and custom builds. The principles are the same; the implementation differs by platform." },
      { q: "Can SEO replace our ads?", a: "Rarely all of them, but strong organic rankings and free listings reduce how much of your revenue depends on paid clicks, and they keep working when spend stops." },
      { q: "How do products show up in ChatGPT?", a: "AI assistants draw on product pages, reviews, comparison articles and merchant feeds. Clear specifications, honest comparisons and consistent product data make you easier to recommend." },
    ],
    related: ["technical-seo", "content-digital-pr", "geo"],
  },
  {
    slug: "enterprise-seo",
    name: "Enterprise SEO",
    discipline: "build",
    search: "seo",
    serviceType: "Enterprise search engine optimisation",
    metaTitle: "Enterprise SEO Services & Consultant",
    metaDescription:
      "Enterprise SEO consulting for large and complex websites: technical SEO at scale, content governance, international targeting and AI visibility across ChatGPT and Gemini.",
    headline: "Enterprise SEO for large, complex websites",
    intro:
      "Large sites win or lose search at scale: thousands of templates, many teams, several markets and constant releases. We bring technical rigour, clear prioritisation and governance, and extend it to AI search, so your brand is found and recommended everywhere customers look.",
    problems: [
      "Releases regularly break indexing, redirects or structured data.",
      "Thousands of pages compete with each other or sit unindexed.",
      "Several teams and markets publish without shared SEO standards.",
      "Leadership asks about AI search and nobody owns the answer.",
    ],
    included: [
      { title: "Technical SEO at scale", body: "Crawl and log-file analysis, indexation management, faceted navigation, rendering and Core Web Vitals across templates." },
      { title: "Prioritisation by revenue", body: "Opportunities sized by search demand and commercial value, so engineering time goes where it pays." },
      { title: "SEO governance", body: "Standards, release checklists and monitoring so changes don't undo past gains." },
      { title: "International and multi-brand", body: "hreflang, regional sites and brand architecture managed across markets." },
      { title: "Content and authority", body: "Template-level content improvements, topic coverage and digital PR at scale." },
      { title: "AI visibility programme", body: "Prompt tracking across AI engines, entity management and citation building for the whole brand portfolio." },
    ],
    approach: [
      { title: "Diagnose", body: "A full technical and content audit with log analysis and a revenue-ranked roadmap." },
      { title: "Embed", body: "Work inside your sprint process with tickets, acceptance criteria and release checks." },
      { title: "Scale", body: "Templates, governance and reporting that let every team improve search without us in every meeting." },
    ],
    deliverables: [
      "Enterprise technical audit and revenue-ranked roadmap",
      "Release checklists and automated SEO monitoring",
      "International and AI visibility programme",
      "Executive and team-level monthly reporting",
    ],
    fitFor: [
      "Sites with tens of thousands of pages or more",
      "Brands operating in several countries or languages",
      "In-house SEO teams that need senior support",
    ],
    faqs: [
      { q: "What makes enterprise SEO different?", a: "Scale and coordination. The fundamentals are the same, but changes happen through templates, engineering sprints and many teams, so prioritisation and governance matter as much as tactics." },
      { q: "Do you work alongside in-house teams?", a: "Yes. Most enterprise clients have marketing and engineering teams; we provide senior strategy, technical depth and extra capacity." },
      { q: "How do you choose an enterprise SEO consultant?", a: "Look for experience with sites of your size and platform, a clear process for working with engineering, and honest reporting. Our [agency buyer's guide](/insights/how-to-choose-seo-aeo-geo-agency) lists questions to ask." },
    ],
    related: ["technical-seo", "international-seo", "geo"],
  },
];

/** Zenyro is a search agency: only these services are published on the site. */
export const searchServiceSlugs = ["seo", "local-seo", "technical-seo", "international-seo", "ecommerce-seo", "enterprise-seo", "aeo", "geo", "content-digital-pr"] as const;

/** The published services, in menu order. */
export const services: Service[] = searchServiceSlugs.map((slug) => allServices.find((s) => s.slug === slug)!);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

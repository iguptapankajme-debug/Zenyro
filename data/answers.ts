/**
 * Short, self-contained answers shown at the top of key pages. Each is written to be quoted on its own
 * by Google's AI Overviews, featured snippets and AI assistants: the answer first, 40 to 70 words,
 * plain English, no claims we can't back up.
 */
export type QuickAnswer = { q: string; a: string; facts: string[] };

/** When these answers were last reviewed. Shown on the page and used as dateModified. */
export const answersReviewed = "2026-11-17";

export const serviceAnswers: Record<string, QuickAnswer> = {
  seo: {
    q: "What is SEO?",
    a: "SEO (search engine optimisation) is the work of making a website easy for Google and Bing to crawl, understand and trust, so its pages rank for the searches customers make. It covers technical fixes, pages built around real search intent, local visibility on Google Maps and earning links and mentions from other sites.",
    facts: ["Results usually build over three to six months", "Measured in Search Console clicks, rankings and enquiries", "The foundation that AI search tools also rely on"],
  },
  aeo: {
    q: "What is AEO (answer engine optimisation)?",
    a: "AEO is structuring your content so search engines and assistants can lift your answer directly: in Google's featured snippets, AI Overviews, People Also Ask and voice results. It means answering each question clearly in the first lines of a page, using headings that match real questions, and adding structured data such as FAQ markup.",
    facts: ["Targets featured snippets, AI Overviews and voice answers", "Answer first, detail second", "Builds on solid SEO rather than replacing it"],
  },
  geo: {
    q: "What is GEO (generative engine optimisation)?",
    a: "GEO is improving how often AI assistants such as ChatGPT, Perplexity, Gemini and Claude mention, cite and recommend your business. It combines clear, crawlable pages that AI crawlers can read, accurate structured data about your company, and a reputation on the third-party sources these assistants trust, such as reviews, directories and press.",
    facts: ["Measured by tracking a fixed set of prompts across AI engines", "Depends on what other sites say about you, not only your own", "No one can guarantee an AI mention"],
  },
  "local-seo": {
    q: "What is local SEO?",
    a: "Local SEO helps a business appear when people nearby search for what it offers, especially in Google Maps and the local pack. It covers a complete, active Google Business Profile, consistent name, address and phone details across directories, genuine reviews, and location pages with real local detail for every area you serve.",
    facts: ["Google Business Profile is the single biggest lever", "One location page per branch or service area", "Reviews influence both rankings and AI recommendations"],
  },
  "technical-seo": {
    q: "What is technical SEO?",
    a: "Technical SEO makes sure search engines and AI crawlers can find, render and index every important page quickly. It covers site speed and Core Web Vitals, crawlability, indexing, redirects, canonical tags, structured data, internationalisation with hreflang, and fixing errors reported in Google Search Console.",
    facts: ["Starts with a crawl of the whole site", "Fixes are prioritised by traffic impact", "Includes access for AI crawlers such as GPTBot and ClaudeBot"],
  },
  "content-digital-pr": {
    q: "What are content and digital PR for SEO?",
    a: "Content and digital PR earn visibility by publishing genuinely useful pages on your own site and getting your expertise quoted on other respected sites. Strong content answers the questions buyers ask; digital PR earns the links and mentions that raise your authority with Google and make AI assistants more likely to cite you.",
    facts: ["Content is planned from real search and prompt data", "PR targets publications your buyers and AI tools read", "Every piece is written or reviewed by people"],
  },
  "international-seo": {
    q: "What is international SEO?",
    a: "International SEO helps one website rank in several countries or languages. It means choosing the right structure (country folders or domains), using hreflang so Google shows each visitor the right version, localising content and prices rather than just translating them, and earning authority in each market you sell into.",
    facts: ["Hreflang and site structure come first", "Localised, not machine-translated, content", "Separate tracking for every country"],
  },
  "ecommerce-seo": {
    q: "What is e-commerce SEO?",
    a: "E-commerce SEO grows organic sales for online shops by making category and product pages rank for buying searches. It covers clean faceted navigation, unique product and category copy, product structured data for prices and reviews, fast pages, and content that answers pre-purchase questions so shoppers and AI shopping assistants choose you.",
    facts: ["Category pages usually drive the most organic revenue", "Product schema enables price and review details in results", "Measured in organic revenue, not just traffic"],
  },
  "enterprise-seo": {
    q: "What is enterprise SEO?",
    a: "Enterprise SEO is search optimisation for large websites with thousands of pages, several teams and often several markets. It focuses on systems rather than single pages: templates, internal linking at scale, crawl budget, governance so releases don't break rankings, and reporting that ties organic search to revenue for each business unit.",
    facts: ["Template fixes that improve thousands of pages at once", "SEO checks built into release processes", "Reporting by market, brand and business unit"],
  },
};

export const industryAnswers: Record<string, QuickAnswer> = {
  "real-estate": {
    q: "How does SEO work for real estate businesses?",
    a: "Real estate SEO wins buyers and tenants before they reach the big portals. It focuses on area and development pages that answer what buyers ask, a strong Google Business Profile for each office, fast listing pages with property structured data, and a reputation on the review sites and press that AI assistants check when asked who to trust.",
    facts: ["Area guides and development pages beat generic listings", "Portals dominate listings; you win on expertise and trust", "AI assistants are asked which developers and agents to trust"],
  },
  hospitality: {
    q: "How does SEO work for hotels and hospitality?",
    a: "Hotel SEO grows direct bookings so you rely less on booking platforms. It means ranking for experience searches such as spa breaks or wedding venues, a complete Google Business Profile with photos and reviews, hotel structured data, and being described accurately on the travel sites and guides AI assistants use when planning trips.",
    facts: ["Direct bookings avoid platform commission", "Experience and occasion searches convert well", "Reviews shape both Google and AI recommendations"],
  },
  healthcare: {
    q: "How does SEO work for healthcare providers?",
    a: "Healthcare SEO helps patients find a clinic or practice they can trust. It needs accurate, medically reviewed treatment pages with named clinicians, a Google Business Profile for each location, genuine patient reviews, and compliance with local advertising rules for health information. Google holds health content to a higher standard of expertise and trust.",
    facts: ["Content reviewed by qualified clinicians", "One location page and profile per clinic", "Follows local rules for health advertising"],
  },
  "interior-design": {
    q: "How does SEO work for interior designers and premium retail?",
    a: "SEO for interior design and premium retail turns visual work into searchable proof. It means project pages with the location, style and budget people search for, image optimisation, showroom pages with Google Business Profiles, and features in design publications that both Google and AI assistants treat as signs of quality.",
    facts: ["Project case pages rank for style and location searches", "Images need descriptive text to be found", "Press features build authority"],
  },
  education: {
    q: "How does SEO work for education and professional services?",
    a: "SEO for education and professional services wins students and clients who research carefully before they choose. It focuses on course and service pages that answer cost, outcome and eligibility questions, expert profiles that show credentials, reviews, and comparison content, because these buyers often ask AI assistants to shortlist providers.",
    facts: ["Cost, outcome and eligibility questions come first", "Visible credentials build trust", "Long research journeys need content at every stage"],
  },
  "home-improvement": {
    q: "How does SEO work for home improvement businesses?",
    a: "Home improvement SEO wins local jobs from people searching for a service in their area. It relies on a strong Google Business Profile and reviews, one page per service and per area served, clear pricing guidance, and project galleries, so you appear in the map pack and in AI answers about who to hire nearby.",
    facts: ["Map pack visibility drives most enquiries", "One page per service and service area", "Price guidance answers the first question buyers ask"],
  },
  "travel-tourism": {
    q: "How does SEO work for travel, taxi and tour operators?",
    a: "Travel SEO captures people while they plan: route, transfer, tour and itinerary searches. It needs pages for each route and experience with clear prices and times, a Google Business Profile, reviews on the travel sites people trust, and itinerary-style content that AI assistants can quote when asked to plan a trip.",
    facts: ["One page per route, tour or transfer", "Reviews on trusted travel sites matter", "Itinerary content is often quoted by AI planners"],
  },
  "financial-services": {
    q: "How does SEO work for financial services firms?",
    a: "Financial services SEO earns trust in a sector where Google and AI assistants are cautious. It needs accurate, compliant pages written or reviewed by qualified people, clear explanations of fees and processes, author credentials, and mentions on respected finance publications and directories, so the firm appears when people ask who to trust.",
    facts: ["Content reviewed by qualified professionals", "Clear fees and process pages", "Compliant with financial promotion rules"],
  },
  b2b: {
    q: "How does SEO work for B2B companies?",
    a: "B2B SEO reaches buyers during long research cycles before they contact sales. It focuses on solution and use-case pages, comparison and alternative pages, specialist content for each decision-maker, and mentions on industry sites and review platforms, since buyers increasingly ask AI assistants to shortlist vendors.",
    facts: ["Comparison and alternatives pages capture late-stage buyers", "Content for each role in the buying group", "Measured in qualified pipeline, not traffic"],
  },
  "saas-and-technology": {
    q: "How does SEO work for SaaS and technology companies?",
    a: "SaaS SEO turns searches for problems, categories and alternatives into trials and demos. It covers category and feature pages, honest comparison pages, integration pages, documentation that ranks, and presence on review sites like G2, because AI assistants lean on these sources when recommending software.",
    facts: ["Alternatives and comparison pages are high intent", "Integration pages capture long-tail demand", "Review-site presence feeds AI recommendations"],
  },
  manufacturing: {
    q: "How does SEO work for manufacturers?",
    a: "Manufacturing SEO helps engineers and buyers find you when they search for a capability, material, certification or part. It needs capability pages with specifications, certifications and industries served, technical content that answers sourcing questions, and listings on supplier directories, which AI assistants use to name suppliers.",
    facts: ["Capability and certification pages rank for sourcing searches", "Specifications in plain text, not just PDFs", "Supplier directories feed AI answers"],
  },
  legal: {
    q: "How does SEO work for law firms?",
    a: "Law firm SEO wins clients searching for a lawyer for a specific problem in their area. It needs practice-area pages that explain the process and costs, lawyer profiles with credentials, a Google Business Profile for each office, reviews, and compliance with legal advertising rules. Google treats legal content as high-stakes, so expertise must be visible.",
    facts: ["One page per practice area and office", "Named lawyers with visible credentials", "Follows professional advertising rules"],
  },
};

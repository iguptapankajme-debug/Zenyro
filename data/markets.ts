/**
 * International markets Zenyro serves remotely. Copy is honest about location: Zenyro is based in
 * India and works with businesses in these countries remotely, in their working hours.
 */
export type Market = {
  slug: string;
  country: string;
  code: string;
  /** IANA zone used for the live local clock. */
  zone: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  landscape: string[];
  platforms: string[];
  hours: string;
  searches: string[];
  faqs: { q: string; a: string }[];
};

const common = (country: string) => [
  { q: `Do you need to be based in ${country} to do SEO for ${country} businesses?`, a: `No. Rankings and AI answers depend on your website, your listings and what trusted sources say about you, not on where your agency sits. We research ${country} search behaviour and competitors directly, and every page we write is checked for local spelling, terms and intent.` },
  { q: "How do we communicate?", a: "A shared project board, a written weekly update and a monthly report with rankings, AI visibility and enquiries. Calls are scheduled in your working hours." },
  { q: "Do you lock clients into long contracts?", a: "No. Work is scoped month to month with a clear plan. Most search programmes need three to six months to show their full effect, and we say that up front." },
];

export const markets: Market[] = [
  {
    slug: "united-states", country: "United States", code: "US", zone: "America/New_York", city: "New York",
    metaTitle: "SEO, AEO & GEO Agency for US Businesses",
    metaDescription: "Zenyro helps US businesses rank on Google, appear in AI Overviews and get recommended by ChatGPT, Perplexity, Gemini and Copilot. Remote team, calls in your hours.",
    headline: "Get found by American customers on Google and in AI answers.",
    intro: "US buyers compare you on Google, Maps and review sites, then increasingly ask ChatGPT, Perplexity or Copilot for a shortlist. We make sure you show up, and come across well, in all of them.",
    landscape: [
      "Google still sends most search traffic in the US, but more queries now end in an AI Overview, and a growing share of research happens inside ChatGPT, Perplexity and Copilot. Bing matters more than its market share suggests, because several AI assistants draw on its index.",
      "For local businesses, Google Business Profile, reviews and consistent listings on sites like Yelp, BBB and Apple Maps decide who appears in the map pack and who AI assistants name. For national and B2B brands, it's comparison content, clear pricing and mentions in industry publications.",
    ],
    platforms: ["Google Search", "AI Overviews", "Google Maps", "ChatGPT", "Perplexity", "Bing & Copilot", "Gemini", "Apple Maps", "Yelp"],
    hours: "We overlap with US mornings (our evening). Calls are booked in Eastern, Central or Pacific time.",
    searches: ["best personal injury lawyer in Austin", "emergency dentist open Sunday near me", "Which CRM is best for small law firms?", "top-rated roofing company in Phoenix", "What's the best project management tool for agencies?"],
    faqs: [
      { q: "Do you work with US local businesses or only national brands?", a: "Both. For local businesses we focus on Google Business Profile, location pages, reviews and listings. For national and SaaS brands, on comparison and solution pages, technical SEO and earning mentions on the sources AI assistants cite." },
      ...common("the US"),
    ],
  },
  {
    slug: "united-kingdom", country: "United Kingdom", code: "UK", zone: "Europe/London", city: "London",
    metaTitle: "SEO, AEO & GEO Agency for UK Businesses",
    metaDescription: "Zenyro helps UK businesses rank on Google, win featured snippets and AI Overviews, and get recommended by ChatGPT and Gemini. UK English copy, calls in UK hours.",
    headline: "Get found by UK customers on Google and in AI answers.",
    intro: "From London to Leeds, customers search Google, check reviews, then ask an AI assistant to narrow it down. We get your business ranking, quoted and recommended, written in proper UK English.",
    landscape: [
      "Google dominates UK search, and AI Overviews now answer many questions before anyone clicks. ChatGPT and Gemini are increasingly used to shortlist suppliers, from accountants and solicitors to tradespeople and clinics.",
      "Trust signals carry real weight in the UK: Google reviews, Trustpilot, Checkatrade or Yell profiles, Companies House details and regulator listings. We make sure these are consistent, so search engines and assistants describe you accurately.",
    ],
    platforms: ["Google Search", "AI Overviews", "Google Maps", "ChatGPT", "Gemini", "Perplexity", "Bing & Copilot", "Trustpilot"],
    hours: "UK mornings overlap fully with our afternoon, so calls and quick turnarounds happen the same working day.",
    searches: ["dentist in Manchester accepting new NHS patients", "best accountant for contractors in London", "Which solicitors in Bristol handle commercial leases?", "emergency electrician Birmingham", "Who are the best kitchen fitters in Leeds?"],
    faqs: [
      { q: "Will the content read as British?", a: "Yes. We write in UK English, use UK terms and prices in pounds, and match how UK customers phrase their searches." },
      ...common("the UK"),
    ],
  },
  {
    slug: "uae", country: "United Arab Emirates", code: "UAE", zone: "Asia/Dubai", city: "Dubai",
    metaTitle: "SEO, AEO & GEO Agency for UAE Businesses",
    metaDescription: "Zenyro helps businesses in Dubai, Abu Dhabi and across the UAE rank on Google, appear in AI Overviews and get recommended by ChatGPT. Near-identical working hours.",
    headline: "Get found by customers in Dubai, Abu Dhabi and across the UAE.",
    intro: "UAE customers search in English and Arabic, compare on Google Maps and increasingly ask ChatGPT for recommendations. We build the pages, listings and signals that put you on that list.",
    landscape: [
      "Search in the UAE is mobile-first and bilingual, with much of it local: clinics, real estate, education, hospitality and professional services in specific areas such as Dubai Marina, JLT or Al Reem Island. Google Maps and reviews decide a lot of first contacts.",
      "International buyers and investors often research UAE companies through AI assistants before they make contact. Clear facts about your licences, locations and services, published consistently, make you easier to recommend.",
    ],
    platforms: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "Gemini", "Perplexity", "Bing & Copilot"],
    hours: "The UAE is 90 minutes behind India, so our working days overlap almost completely.",
    searches: ["best dental clinic in Dubai Marina", "company formation in Dubai free zone", "Which British curriculum schools in Abu Dhabi have places?", "property management company JVC", "Best physiotherapy clinic in Sharjah?"],
    faqs: [
      { q: "Can you handle Arabic content?", a: "We plan bilingual site structure, keywords and hreflang, and work with your Arabic copywriter or a native-speaking partner for the Arabic pages, so both languages rank." },
      ...common("the UAE"),
    ],
  },
  {
    slug: "canada", country: "Canada", code: "CA", zone: "America/Toronto", city: "Toronto",
    metaTitle: "SEO, AEO & GEO Agency for Canadian Businesses",
    metaDescription: "Zenyro helps Canadian businesses rank on Google, appear in AI Overviews and get recommended by ChatGPT and Perplexity, across Toronto, Vancouver, Calgary and beyond.",
    headline: "Get found by Canadian customers on Google and in AI answers.",
    intro: "Canadian customers search locally, compare reviews and ask AI assistants for shortlists. We help you rank city by city and become the business those assistants recommend.",
    landscape: [
      "Canada is a set of distinct local markets: what wins in Toronto differs from Vancouver or Calgary. Location pages, Google Business Profile and local reviews do a lot of the work for service businesses.",
      "For businesses serving Quebec, French-language pages and correct hreflang matter. For national brands, clear comparison content and mentions in Canadian publications help both rankings and AI recommendations.",
    ],
    platforms: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "Perplexity", "Bing & Copilot", "Gemini"],
    hours: "We overlap with Canadian mornings (our evening). Calls are booked in Eastern or Pacific time.",
    searches: ["immigration consultant in Brampton", "best family dentist in Calgary", "Which accounting firms in Toronto work with startups?", "home renovation contractor Vancouver", "top-rated physiotherapy Mississauga"],
    faqs: [
      { q: "Do you support French-language SEO for Quebec?", a: "We plan the structure, keywords and hreflang for English and French pages, and work with a native French writer or your team on the French copy." },
      ...common("Canada"),
    ],
  },
  {
    slug: "australia", country: "Australia", code: "AU", zone: "Australia/Sydney", city: "Sydney",
    metaTitle: "SEO, AEO & GEO Agency for Australian Businesses",
    metaDescription: "Zenyro helps Australian businesses rank on Google, appear in AI Overviews and get recommended by ChatGPT and Gemini, from Sydney and Melbourne to Brisbane and Perth.",
    headline: "Get found by Australian customers on Google and in AI answers.",
    intro: "Google is how most Australians find a business, and AI assistants are fast becoming how they choose one. We make sure you're ranked, quoted and recommended.",
    landscape: [
      "Google holds a very large share of Australian search, so Google Search, Maps and AI Overviews are where most first impressions happen. Reviews on Google and platforms such as ProductReview or hipages shape who gets the call.",
      "Many Australian service businesses cover several suburbs or cities. Well-built location and service pages, with genuine local detail, help you rank across your whole service area rather than just your postcode.",
    ],
    platforms: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "Gemini", "Perplexity", "Bing & Copilot"],
    hours: "Australian afternoons overlap with our mornings, so we respond within your working day.",
    searches: ["emergency plumber Parramatta", "best cosmetic dentist Melbourne", "Which conveyancers in Brisbane are fixed fee?", "solar installer Perth reviews", "Who's the best builder for a granny flat in Sydney?"],
    faqs: [
      { q: "Will you write in Australian English?", a: "Yes. Spelling, terms and examples are Australian, and pages are built around how Australians phrase their searches." },
      ...common("Australia"),
    ],
  },
  {
    slug: "singapore", country: "Singapore", code: "SG", zone: "Asia/Singapore", city: "Singapore",
    metaTitle: "SEO, AEO & GEO Agency for Singapore Businesses",
    metaDescription: "Zenyro helps Singapore businesses rank on Google, appear in AI Overviews and get recommended by ChatGPT, Perplexity and Gemini. Working hours overlap almost fully.",
    headline: "Get found by customers in Singapore on Google and in AI answers.",
    intro: "Singapore is one of the most connected markets in the world, and among the quickest to adopt AI assistants. We help you rank, become the cited answer and stay on the shortlist.",
    landscape: [
      "Singapore searchers are mobile-first and research-heavy, comparing reviews, prices and credentials before they enquire. Clear, well-structured service pages and strong Google reviews make the difference.",
      "Many Singapore businesses also sell into Malaysia, Indonesia and the wider region. We can structure your site for several markets so each country sees the right pages.",
    ],
    platforms: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "Perplexity", "Gemini", "Bing & Copilot"],
    hours: "Singapore is two and a half hours ahead of India, so our working days overlap almost fully.",
    searches: ["best tuition centre for PSLE maths", "corporate secretarial services Singapore", "Which aesthetic clinics in Orchard are MOH-licensed?", "interior designer for HDB BTO", "best physiotherapist in Tampines"],
    faqs: [
      { q: "Can you handle SEO for several Southeast Asian countries?", a: "Yes. We plan country targeting and hreflang so Singapore, Malaysia and other markets each see the right pages, and track rankings and AI visibility per country." },
      ...common("Singapore"),
    ],
  },
];

export function getMarket(slug: string) {
  return markets.find((m) => m.slug === slug);
}

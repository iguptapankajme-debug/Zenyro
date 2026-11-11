/**
 * US state pages (under /markets/united-states/[state]): the markets with the most location demand in
 * our keyword research. Each entry carries state-specific facts so pages are genuinely different:
 * cities, industries, local business press and directories, time zone and the prompts buyers use.
 * Zenyro serves these states remotely; copy never implies a local office.
 */
export type UsState = {
  slug: string;
  name: string;
  code: string;
  zone: string;
  zoneLabel: string;
  cities: string[];
  /** Two short, state-specific paragraphs about how businesses there win customers through search. */
  landscape: [string, string];
  industries: { name: string; note: string; href?: string }[];
  /** Prompts we'd track for businesses in this state. */
  prompts: string[];
  /** Local sources AI assistants and buyers use: business press, directories, review sites. */
  sources: string[];
  /** One state-specific FAQ. */
  faq: { q: string; a: string };
};

export const usStates: UsState[] = [
  {
    slug: "new-york", name: "New York", code: "NY", zone: "America/New_York", zoneLabel: "Eastern Time",
    cities: ["New York City", "Brooklyn", "Long Island", "Buffalo", "Rochester", "Albany"],
    landscape: [
      "New York City is one of the most competitive search markets in the world: thousands of firms in finance, law, healthcare, media and professional services chase the same high-value searches, and buyers increasingly ask ChatGPT and Perplexity for a shortlist before they visit any website.",
      "Outside the city, Long Island, the Hudson Valley, Buffalo and Rochester behave like strong regional markets where Google Maps, reviews and clear service pages decide most first calls. Winning in New York means competing nationally on authority and locally on relevance, often for the same business.",
    ],
    industries: [
      { name: "Financial services", note: "Banks, fintech, wealth managers and advisers competing for high-trust, high-value searches.", href: "/industries/financial-services" },
      { name: "Legal", note: "Dense competition for practice-area and borough-level searches.", href: "/industries/legal" },
      { name: "Healthcare", note: "Practices and specialist clinics across the five boroughs and Long Island.", href: "/industries/healthcare" },
      { name: "SaaS and media", note: "Startups and media companies competing for category and comparison searches.", href: "/industries/saas-and-technology" },
    ],
    prompts: ["best AI SEO agency in New York", "which accounting firms in Manhattan work with startups", "best employment lawyer in Brooklyn", "top fintech apps for small businesses in New York", "dermatologist on the Upper East Side with good reviews"],
    sources: ["Crain's New York Business", "Built In NYC", "Google Business Profile and Yelp reviews", "Clutch and DesignRush agency listings", "Avvo and Super Lawyers for law firms"],
    faq: { q: "Is New York too competitive for a smaller business to rank?", a: "Not if you target precisely. Borough, neighbourhood and niche searches are far more winnable than \"lawyer New York\", and AI assistants often recommend specialists who explain their niche clearly." },
  },
  {
    slug: "california", name: "California", code: "CA", zone: "America/Los_Angeles", zoneLabel: "Pacific Time",
    cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Irvine", "Sacramento"],
    landscape: [
      "California combines the world's most crowded tech market in the Bay Area with huge consumer markets in Los Angeles, Orange County and San Diego. Software buyers in San Francisco research almost entirely through search, review sites and AI assistants, while consumers in Southern California lean on Google Maps and reviews.",
      "Because AI tools are adopted early here, being described accurately by ChatGPT, Perplexity and Gemini matters sooner than in many states. Category pages, comparisons and a strong review presence carry more weight than location pages alone.",
    ],
    industries: [
      { name: "SaaS and AI companies", note: "Bay Area and LA startups competing for \"best tool for\" searches and AI recommendations.", href: "/industries/saas-and-technology" },
      { name: "E-commerce and DTC brands", note: "Los Angeles and Orange County brands reducing dependence on paid social.", href: "/services/ecommerce-seo" },
      { name: "Healthcare and life sciences", note: "Biotech in San Diego and the Bay Area, practices statewide.", href: "/industries/healthcare" },
      { name: "Real estate", note: "High-value property searches in coastal metros.", href: "/industries/real-estate" },
    ],
    prompts: ["best generative engine optimization agency in San Francisco", "top DTC skincare brands made in Los Angeles", "which San Diego biotech CROs handle phase 1 trials", "best family dentist in Irvine", "AI SEO agency for B2B SaaS in California"],
    sources: ["San Francisco Business Times and Los Angeles Business Journal", "G2 and Capterra for software", "Yelp and Google reviews", "TechCrunch and industry newsletters", "Clutch agency listings"],
    faq: { q: "Do you work with California tech startups?", a: "Yes. Early-stage SaaS and AI companies benefit most from building clear category pages, comparisons and review-site presence before competitors lock in AI recommendations." },
  },
  {
    slug: "texas", name: "Texas", code: "TX", zone: "America/Chicago", zoneLabel: "Central Time",
    cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "Plano"],
    landscape: [
      "Texas is several large markets in one: energy and industry in Houston, finance and corporate headquarters in Dallas-Fort Worth, technology in Austin and healthcare and military services in San Antonio. Each metro has its own competitors, so state-wide pages rarely win on their own.",
      "Fast population growth means many customers are new to their area and rely on Google Maps, reviews and AI assistants to choose providers. Businesses that publish clear, local, specific pages for each metro tend to outrank larger brands with generic content.",
    ],
    industries: [
      { name: "Manufacturing and energy", note: "Industrial suppliers and engineering firms around Houston and DFW.", href: "/industries/manufacturing" },
      { name: "Home services", note: "Roofing, HVAC, solar and remodelling across fast-growing suburbs.", href: "/industries/home-improvement" },
      { name: "Healthcare", note: "Practices and specialist groups competing metro by metro.", href: "/industries/healthcare" },
      { name: "B2B and SaaS", note: "Austin and Dallas companies competing nationally.", href: "/industries/b2b" },
    ],
    prompts: ["AI search optimization agency in Dallas", "best roofing company in Plano after hail damage", "which Houston manufacturers do custom steel fabrication", "best pediatric dentist in Austin", "affordable AEO services for small businesses in North Dallas"],
    sources: ["Dallas Business Journal, Houston Business Journal and Austin Business Journal", "Google Business Profile and BBB", "Nextdoor recommendations", "Industry directories such as Thomasnet", "Clutch and Semrush agency listings"],
    faq: { q: "Should a Texas business have separate pages for each city?", a: "Yes, if you genuinely serve several metros. A page for Houston, Dallas and Austin with real local detail outperforms one statewide page, as long as each page is substantially different." },
  },
  {
    slug: "florida", name: "Florida", code: "FL", zone: "America/New_York", zoneLabel: "Eastern Time",
    cities: ["Miami", "Tampa", "Orlando", "Jacksonville", "Fort Lauderdale", "Boca Raton"],
    landscape: [
      "Florida's search demand is shaped by tourism, real estate, healthcare and a large retiree and seasonal population. Many searches come from people outside the state planning a move, a trip or a second home, so content needs to answer out-of-state questions as well as local ones.",
      "South Florida is also bilingual, and Spanish-language searches matter for many service businesses. Combining English and Spanish pages with correct hreflang, plus strong Maps visibility, is a common route to winning here.",
    ],
    industries: [
      { name: "Real estate", note: "Agents, developers and property managers serving local and relocating buyers.", href: "/industries/real-estate" },
      { name: "Hospitality and travel", note: "Hotels, venues and tour operators competing with booking platforms.", href: "/industries/hospitality" },
      { name: "Healthcare", note: "Practices serving a large retiree population and medical tourism.", href: "/industries/healthcare" },
      { name: "Legal", note: "Personal injury, immigration and estate planning firms.", href: "/industries/legal" },
    ],
    prompts: ["generative engine optimization agency in Tampa", "best immigration lawyer in Miami who speaks Spanish", "moving to Orlando with kids, which neighborhoods", "best boutique hotel in Fort Lauderdale near the beach", "estate planning attorney in Boca Raton"],
    sources: ["South Florida Business Journal and Tampa Bay Business Journal", "Google and TripAdvisor reviews", "Realtor.com and Zillow profiles", "Avvo and the Florida Bar directory", "Clutch agency listings"],
    faq: { q: "Can you handle Spanish-language SEO for Florida?", a: "We plan English and Spanish site structure, keywords and hreflang, and work with native Spanish writers or your team on the Spanish pages." },
  },
  {
    slug: "illinois", name: "Illinois", code: "IL", zone: "America/Chicago", zoneLabel: "Central Time",
    cities: ["Chicago", "Naperville", "Aurora", "Evanston", "Schaumburg", "Springfield"],
    landscape: [
      "Chicago anchors a diverse economy: finance and trading, logistics, manufacturing, healthcare and a large professional services sector. B2B buyers here research carefully, compare vendors and increasingly ask AI assistants which providers specialise in their industry.",
      "The suburbs around Naperville, Schaumburg and Evanston are strong local markets in their own right. Businesses serving the whole Chicagoland area need both neighbourhood-level local SEO and authority content that competes nationally.",
    ],
    industries: [
      { name: "B2B and professional services", note: "Consultancies, accountants and agencies competing for specialist searches.", href: "/industries/b2b" },
      { name: "Manufacturing and logistics", note: "Suppliers and 3PLs across the Chicago region.", href: "/industries/manufacturing" },
      { name: "Financial services", note: "Trading, wealth and insurance firms with high-trust searches.", href: "/industries/financial-services" },
      { name: "Healthcare", note: "Hospital systems and specialist practices.", href: "/industries/healthcare" },
    ],
    prompts: ["best SEO agency in Chicago for B2B companies", "which Chicago 3PLs handle e-commerce fulfilment", "financial services marketing agency in Chicago", "best orthopedic surgeon in Naperville", "top accounting firms in Chicago for manufacturers"],
    sources: ["Crain's Chicago Business", "Built In Chicago", "Google Business Profile and Yelp", "Thomasnet and industry associations", "Clutch agency listings"],
    faq: { q: "Do Chicago B2B companies need AI visibility work?", a: "Increasingly. Procurement and operations teams ask AI assistants for vendor shortlists, and companies with clear specialisms and third-party mentions are the ones named." },
  },
  {
    slug: "pennsylvania", name: "Pennsylvania", code: "PA", zone: "America/New_York", zoneLabel: "Eastern Time",
    cities: ["Philadelphia", "Pittsburgh", "Allentown", "Harrisburg", "King of Prussia", "Lancaster"],
    landscape: [
      "Pennsylvania's two big metros have distinct strengths: Philadelphia in pharma, life sciences, healthcare and professional services, and Pittsburgh in robotics, AI research, healthcare and advanced manufacturing. Buyers in both research heavily before contacting a vendor.",
      "Life sciences and healthcare content is held to high standards by search engines and AI assistants, so expert authorship, references and compliance-aware writing matter. Manufacturing firms win with specification-rich product pages rather than brochure sites.",
    ],
    industries: [
      { name: "Pharma and life sciences", note: "Philadelphia-area companies needing compliant, expert content.", href: "/industries/healthcare" },
      { name: "Manufacturing", note: "Industrial and advanced manufacturing across the state.", href: "/industries/manufacturing" },
      { name: "SaaS and robotics", note: "Pittsburgh technology companies competing nationally.", href: "/industries/saas-and-technology" },
      { name: "Legal and professional services", note: "Firms in Philadelphia and Pittsburgh.", href: "/industries/legal" },
    ],
    prompts: ["generative engine optimization agency in Pittsburgh", "content strategy agency in Philadelphia for pharma", "which Pittsburgh robotics companies build warehouse automation", "best personal injury lawyer in Philadelphia", "contract manufacturers near Allentown"],
    sources: ["Philadelphia Business Journal and Pittsburgh Business Times", "Industry associations and trade media", "Google Business Profile and Healthgrades", "Thomasnet", "Clutch agency listings"],
    faq: { q: "Can you write compliant content for pharma and life sciences?", a: "We write evidence-based, referenced content and work within your medical, legal and regulatory review process. We don't make unsupported claims." },
  },
  {
    slug: "massachusetts", name: "Massachusetts", code: "MA", zone: "America/New_York", zoneLabel: "Eastern Time",
    cities: ["Boston", "Cambridge", "Worcester", "Springfield", "Waltham", "Burlington"],
    landscape: [
      "Massachusetts is dominated by Boston and Cambridge: biotech, healthcare, higher education, financial services and B2B software. Audiences are highly educated and research-driven, so depth, evidence and expert authorship carry more weight than in most markets.",
      "Many Boston-area companies sell nationally or globally, which makes AI visibility and category authority as important as local search. The Route 128 tech corridor around Waltham and Burlington is a B2B market in its own right.",
    ],
    industries: [
      { name: "Biotech and life sciences", note: "Cambridge and Boston companies with expert audiences.", href: "/industries/healthcare" },
      { name: "B2B SaaS", note: "Route 128 software companies competing nationally.", href: "/industries/saas-and-technology" },
      { name: "Financial services", note: "Asset managers and fintech in Boston.", href: "/industries/financial-services" },
      { name: "Education", note: "Universities, schools and education companies.", href: "/industries/education" },
    ],
    prompts: ["B2B marketing agency in Massachusetts", "financial services marketing agency in Boston", "which Cambridge CROs specialise in gene therapy", "best private school in Boston for STEM", "top HR software companies in Waltham"],
    sources: ["Boston Business Journal and BostInno", "Built In Boston", "MassBio and industry associations", "Google Business Profile", "Clutch agency listings"],
    faq: { q: "Does expertise matter more in Boston?", a: "For biotech, healthcare and finance, yes. Search engines and AI assistants favour content with named experts, references and clear credentials, and Boston audiences expect it." },
  },
  {
    slug: "georgia", name: "Georgia", code: "GA", zone: "America/New_York", zoneLabel: "Eastern Time",
    cities: ["Atlanta", "Savannah", "Augusta", "Alpharetta", "Marietta", "Athens"],
    landscape: [
      "Atlanta is the economic centre of the Southeast, with strengths in fintech and payments, logistics, healthcare, media and corporate headquarters. Alpharetta and the northern suburbs host many technology and B2B companies.",
      "Savannah's port drives logistics and manufacturing, while metro Atlanta's sprawl makes neighbourhood and suburb-level local SEO important for service businesses. International companies entering the US Southeast often start here.",
    ],
    industries: [
      { name: "Fintech and payments", note: "Atlanta's payments and financial technology sector.", href: "/industries/financial-services" },
      { name: "Logistics and manufacturing", note: "Port-related and distribution businesses.", href: "/industries/manufacturing" },
      { name: "B2B and SaaS", note: "Alpharetta and Midtown technology companies.", href: "/industries/b2b" },
      { name: "Healthcare", note: "Practices and health systems across metro Atlanta.", href: "/industries/healthcare" },
    ],
    prompts: ["international SEO services in Atlanta", "ecommerce SEO agency in Georgia", "best payment processing companies in Atlanta", "freight forwarders near the Port of Savannah", "best pediatrician in Alpharetta"],
    sources: ["Atlanta Business Chronicle", "Hypepotamus and Atlanta tech media", "Google Business Profile and Yelp", "Industry directories", "Clutch agency listings"],
    faq: { q: "Do you help international companies entering the US through Atlanta?", a: "Yes. We set up US-specific pages, local listings and hreflang alongside your existing sites. See our international SEO service." },
  },
  {
    slug: "washington", name: "Washington", code: "WA", zone: "America/Los_Angeles", zoneLabel: "Pacific Time",
    cities: ["Seattle", "Bellevue", "Redmond", "Tacoma", "Spokane", "Vancouver"],
    landscape: [
      "The Seattle area is home to some of the world's largest technology and e-commerce companies and a dense ecosystem of startups, cloud and AI businesses around them. Buyers here are technical, sceptical of marketing language and quick to use AI assistants for research.",
      "Beyond tech, Washington has strong aerospace, healthcare, outdoor retail and hospitality sectors. Bellevue and Redmond behave like their own B2B markets, while Spokane and Tacoma are regional service markets driven by Maps and reviews.",
    ],
    industries: [
      { name: "SaaS, cloud and AI", note: "Seattle-area technology companies competing globally.", href: "/industries/saas-and-technology" },
      { name: "E-commerce and retail", note: "Online brands and outdoor retailers.", href: "/services/ecommerce-seo" },
      { name: "Manufacturing and aerospace", note: "Suppliers across the Puget Sound region.", href: "/industries/manufacturing" },
      { name: "Healthcare", note: "Practices and health systems statewide.", href: "/industries/healthcare" },
    ],
    prompts: ["generative engine optimization agency in Seattle", "international SEO services in Seattle", "best data warehouse tools for startups", "aerospace machining suppliers near Everett", "best physical therapist in Bellevue"],
    sources: ["Puget Sound Business Journal", "GeekWire", "G2 and developer communities", "Google Business Profile", "Clutch agency listings"],
    faq: { q: "How do technical buyers in Seattle respond to marketing content?", a: "They reward specifics: documentation, benchmarks, honest comparisons and pricing clarity. That's also what AI assistants quote." },
  },
  {
    slug: "minnesota", name: "Minnesota", code: "MN", zone: "America/Chicago", zoneLabel: "Central Time",
    cities: ["Minneapolis", "Saint Paul", "Bloomington", "Rochester", "Duluth", "Eden Prairie"],
    landscape: [
      "Minnesota has a remarkable concentration of large companies for its size, especially in healthcare and medical devices, retail, food and agribusiness, and financial services. The Twin Cities are home to many corporate headquarters and the agencies and suppliers that serve them.",
      "Medical device and health companies around Minneapolis and Rochester face strict content standards, while B2B suppliers compete for national accounts. Structured data and clear entity information are particularly useful in these regulated, technical categories.",
    ],
    industries: [
      { name: "Medical devices and healthcare", note: "Med tech companies and health systems in the Twin Cities and Rochester.", href: "/industries/healthcare" },
      { name: "Retail and e-commerce", note: "Brands and retailers headquartered in the state.", href: "/services/ecommerce-seo" },
      { name: "B2B and manufacturing", note: "Suppliers to national and global customers.", href: "/industries/manufacturing" },
      { name: "Financial services", note: "Banks, insurers and wealth managers.", href: "/industries/financial-services" },
    ],
    prompts: ["AEO services in Minneapolis for structured data and schema", "GEO agency in Minneapolis with healthcare experience", "medical device contract manufacturers in Minnesota", "best orthodontist in Eden Prairie", "insurance agencies in Saint Paul for small businesses"],
    sources: ["Minneapolis/St. Paul Business Journal and Star Tribune business", "Medical Alley and industry associations", "Google Business Profile", "Thomasnet", "Clutch agency listings"],
    faq: { q: "Can you implement schema and structured data for us?", a: "Yes. Structured data is part of every plan: Organization, Service, Product, Article and FAQ markup, validated and kept accurate. See schema markup for AEO in our guides." },
  },
  {
    slug: "tennessee", name: "Tennessee", code: "TN", zone: "America/Chicago", zoneLabel: "Central Time",
    cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Franklin", "Murfreesboro"],
    landscape: [
      "Nashville is a national centre for healthcare management, alongside music, entertainment and a fast-growing technology and professional services scene. Memphis is a logistics hub, while Knoxville and Chattanooga have strong manufacturing and outdoor economies.",
      "Rapid growth around Nashville, Franklin and Murfreesboro brings many new residents searching for providers for the first time, which makes local SEO, reviews and AI recommendations especially valuable for service businesses.",
    ],
    industries: [
      { name: "Healthcare management", note: "Nashville's health services and healthcare technology sector.", href: "/industries/healthcare" },
      { name: "Logistics and manufacturing", note: "Memphis distribution and East Tennessee manufacturing.", href: "/industries/manufacturing" },
      { name: "Home services and real estate", note: "Fast-growing Middle Tennessee suburbs.", href: "/industries/home-improvement" },
      { name: "Hospitality", note: "Hotels, venues and tourism in Nashville and the Smokies.", href: "/industries/hospitality" },
    ],
    prompts: ["generative engine optimization in Nashville", "best SEM and SEO agency for ecommerce in Nashville", "healthcare revenue cycle companies in Nashville", "best home builder in Franklin TN", "3PL warehouses in Memphis for e-commerce"],
    sources: ["Nashville Business Journal and Memphis Business Journal", "Google Business Profile and Nextdoor", "Healthcare industry associations", "Industry directories", "Clutch agency listings"],
    faq: { q: "Do new residents really use AI to choose providers?", a: "Increasingly. People who've just moved don't have local recommendations, so they rely on Google Maps, reviews and AI assistants to build a shortlist." },
  },
  {
    slug: "washington-dc", name: "Washington, DC", code: "DC", zone: "America/New_York", zoneLabel: "Eastern Time",
    cities: ["Washington", "Arlington", "Alexandria", "Bethesda", "Tysons", "Reston"],
    landscape: [
      "The Washington, DC area is shaped by government, government contractors, associations, policy organisations, law firms and a large technology and cybersecurity sector across Northern Virginia and Maryland. Many buyers are procurement teams and senior professionals researching carefully.",
      "Enterprise and B2B organisations here often have large, complex websites with many stakeholders, which makes technical SEO, governance and accurate entity information central. Associations and nonprofits also compete for informational and policy searches.",
    ],
    industries: [
      { name: "Government contractors and B2B", note: "Firms selling to agencies and large organisations.", href: "/industries/b2b" },
      { name: "Legal and policy", note: "Law firms, associations and advocacy groups.", href: "/industries/legal" },
      { name: "Cybersecurity and SaaS", note: "Northern Virginia technology companies.", href: "/industries/saas-and-technology" },
      { name: "Enterprise organisations", note: "Large, complex websites with many teams.", href: "/services/enterprise-seo" },
    ],
    prompts: ["generative engine optimization services in Washington DC", "enterprise SEO in Washington DC", "best cybersecurity firms for federal contractors", "employment law firms in Arlington", "which associations represent healthcare IT companies"],
    sources: ["Washington Business Journal", "Washington Technology and federal IT media", "Google Business Profile", "Legal directories", "Clutch agency listings"],
    faq: { q: "Do you work with large, complex organisational websites?", a: "Yes. Our enterprise SEO service covers technical SEO at scale, governance and AI visibility for organisations with many teams and thousands of pages." },
  },
];

export function getUsState(slug: string) {
  return usStates.find((s) => s.slug === slug);
}

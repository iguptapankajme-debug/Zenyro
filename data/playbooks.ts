import { industries } from "./industries";

/**
 * Playbooks: example SEO, AEO and GEO strategies for each industry in each key market (12 industries
 * x US, UK and UAE). They are clearly labelled examples of how we would approach the work, not client
 * case studies, and contain no client results. Each pairing carries its own market note, sources and
 * localised searches so the pages are genuinely different.
 */
export type PlaybookMarket = { key: "us" | "uk" | "uae"; name: string; inName: string; code: string; cities: string[]; currency: "USD" | "GBP" | "AED"; marketSlug: string };

export const playbookMarkets: PlaybookMarket[] = [
  { key: "us", name: "United States", inName: "the US", code: "US", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"], currency: "USD", marketSlug: "united-states" },
  { key: "uk", name: "United Kingdom", inName: "the UK", code: "UK", cities: ["London", "Manchester", "Birmingham", "Leeds", "Bristol"], currency: "GBP", marketSlug: "united-kingdom" },
  { key: "uae", name: "United Arab Emirates", inName: "the UAE", code: "UAE", cities: ["Dubai", "Abu Dhabi", "Sharjah"], currency: "AED", marketSlug: "uae" },
];

/** How buyers in each industry phrase searches; {city} is filled per market. */
const queries: Record<string, string[]> = {
  "real-estate": ["new apartments in {city}", "best real estate agent in {city}", "is {city} a good place to buy property", "off-plan projects in {city} with payment plans"],
  hospitality: ["boutique hotel in {city}", "best wedding venue near {city}", "family-friendly hotels in {city} with a pool", "where to stay in {city} for a weekend"],
  healthcare: ["best dental clinic in {city}", "dermatologist in {city} with good reviews", "how much does IVF cost in {city}", "private physiotherapy in {city}"],
  "interior-design": ["interior designer in {city}", "kitchen renovation cost in {city}", "luxury furniture showroom in {city}", "best interior design firms in {city} for apartments"],
  education: ["best international schools in {city}", "IELTS preparation course in {city}", "MBA admissions consultant in {city}", "tutoring centre in {city} for maths"],
  "home-improvement": ["roofing contractor in {city}", "solar panel installation cost in {city}", "best kitchen remodel company in {city}", "emergency plumber in {city}"],
  "travel-tourism": ["private airport transfer in {city}", "best tour operator for {city} day trips", "family holiday packages from {city}", "luxury travel agent in {city}"],
  "financial-services": ["financial adviser in {city}", "accountant for small businesses in {city}", "best wealth manager in {city}", "mortgage broker in {city}"],
  b2b: ["managed IT services in {city}", "B2B lead generation agency in {city}", "best payroll provider for companies in {city}", "logistics companies in {city}"],
  "saas-and-technology": ["best CRM for small businesses", "project management software for agencies", "best HR software for companies in {city}", "cybersecurity company in {city}"],
  manufacturing: ["contract manufacturer near {city}", "CNC machining services in {city}", "industrial packaging suppliers in {city}", "metal fabrication company in {city}"],
  legal: ["employment lawyer in {city}", "immigration lawyer in {city}", "best corporate law firm in {city}", "how to choose a divorce lawyer in {city}"],
};

/** Market-specific note and sources for each industry. */
const local: Record<string, Record<PlaybookMarket["key"], { note: string; sources: string[] }>> = {
  "real-estate": {
    us: { note: "US buyers start on Zillow, Realtor.com and Redfin, so agents and developers win with neighbourhood guides and listing pages those portals can't match for depth.", sources: ["Zillow and Realtor.com profiles", "Local news and neighbourhood guides", "Google Business Profile reviews"] },
    uk: { note: "Rightmove and Zoopla dominate UK property searches, so agents and developers win with area guides, valuation pages and answers to buying questions the portals don't cover.", sources: ["Rightmove and Zoopla listings", "Local press and property publications", "Google reviews and Trustpilot"] },
    uae: { note: "Bayut and Property Finder lead UAE property searches, and many buyers research from abroad in English, Arabic, Russian or Hindi, so community guides and investor FAQs matter.", sources: ["Bayut and Property Finder", "Gulf News and Khaleej Times property sections", "Developer and RERA-registered broker listings"] },
  },
  hospitality: {
    us: { note: "US travellers compare on Google Hotels, TripAdvisor and booking platforms; direct-booking pages, reviews and local guides recover commission.", sources: ["TripAdvisor and Google Hotels", "Local tourism boards", "Travel media and newsletters"] },
    uk: { note: "UK guests compare on Booking.com, TripAdvisor and Google; country-house, wedding and spa searches reward detailed, image-rich pages.", sources: ["TripAdvisor and Google reviews", "VisitBritain and regional tourism sites", "Hitched and wedding directories"] },
    uae: { note: "UAE hotels compete with OTAs for international visitors planning with AI assistants; staycation, brunch and family searches are strong local demand.", sources: ["TripAdvisor and Google Hotels", "Time Out Dubai and What's On", "Visit Dubai and Abu Dhabi tourism sites"] },
  },
  healthcare: {
    us: { note: "US patients compare on Google, Healthgrades and Zocdoc; insurance acceptance, credentials and clear treatment pages decide the call.", sources: ["Healthgrades and Zocdoc", "Google Business Profile", "Hospital and insurer directories"] },
    uk: { note: "UK patients weigh NHS options against private care; pricing transparency, CQC information and treatment explainers win private enquiries.", sources: ["NHS website and CQC listings", "Doctify and Top Doctors", "Google reviews"] },
    uae: { note: "UAE patients choose between many private clinics; DHA and DoH rules govern health content, and bilingual treatment pages win local and medical-tourism searches.", sources: ["DHA and DoH licensed provider listings", "Google reviews", "Gulf News health and clinic directories"] },
  },
  "interior-design": {
    us: { note: "US homeowners browse Houzz and Instagram, then search locally; project pages with budgets and timelines convert browsers into consultations.", sources: ["Houzz profiles and reviews", "Architectural Digest and design media", "Google Business Profile"] },
    uk: { note: "UK clients search by room and style and compare portfolios on Houzz; planning and renovation cost questions are strong research topics.", sources: ["Houzz UK", "House & Garden and design press", "Google reviews"] },
    uae: { note: "UAE clients furnish new apartments and villas by community; fit-out and furniture searches spike with new handovers.", sources: ["Houzz and Instagram portfolios", "Dubai Design District listings", "Google reviews"] },
  },
  education: {
    us: { note: "US families and students compare programmes on review and ranking sites; outcomes, fees and admissions FAQs are the deciding content.", sources: ["Niche and GreatSchools", "Course directories", "Google reviews"] },
    uk: { note: "UK parents use Ofsted reports and league tables; independent schools and tutors win with clear fees, results policies and admissions pages.", sources: ["Ofsted and school guides", "The Good Schools Guide", "Google reviews"] },
    uae: { note: "UAE parents compare schools by curriculum, KHDA or ADEK rating and fees; expat families rely heavily on AI assistants and comparison sites.", sources: ["KHDA and ADEK inspection reports", "WhichSchoolAdvisor", "Google reviews"] },
  },
  "home-improvement": {
    us: { note: "US homeowners use Google Local Services, Angi and Nextdoor; reviews, licensing and transparent pricing win the call.", sources: ["Angi and Yelp", "Nextdoor recommendations", "BBB and Google reviews"] },
    uk: { note: "UK homeowners check Checkatrade, Trustpilot and Google; accreditations and clear quotes matter for trades.", sources: ["Checkatrade and Rated People", "Trustpilot", "Google reviews"] },
    uae: { note: "UAE residents search for maintenance, AC and fit-out by community; fast response and WhatsApp-friendly pages win.", sources: ["ServiceMarket and similar platforms", "Google reviews", "Community groups"] },
  },
  "travel-tourism": {
    us: { note: "US travellers plan with search and AI assistants; detailed itineraries and transparent pricing outrank generic packages.", sources: ["TripAdvisor", "Travel media", "Google reviews"] },
    uk: { note: "UK travellers compare packages and tour operators carefully; ATOL protection and clear itineraries build trust.", sources: ["TripAdvisor and Feefo reviews", "ABTA and ATOL listings", "Travel press"] },
    uae: { note: "UAE residents plan short-haul holidays and visitors book desert and city tours; multilingual pages and fast booking matter.", sources: ["TripAdvisor and GetYourGuide", "Visit Dubai", "Google reviews"] },
  },
  "financial-services": {
    us: { note: "US prospects research advisers, accountants and lenders carefully; credentials, regulatory disclosures and plain-English explainers drive enquiries.", sources: ["FINRA BrokerCheck and SEC adviser listings", "NerdWallet and comparison sites", "Google reviews"] },
    uk: { note: "UK prospects check FCA status and reviews; clear fee explanations and expert guidance win high-trust searches.", sources: ["FCA Register", "VouchedFor and Unbiased", "Trustpilot"] },
    uae: { note: "UAE prospects compare firms regulated by DFSA, ADGM's FSRA or the Central Bank; bilingual explainers on setup, tax and banking are in demand.", sources: ["DFSA and FSRA public registers", "Arabian Business and Zawya", "Google reviews"] },
  },
  b2b: {
    us: { note: "US B2B buyers shortlist through search, G2, analyst content and AI assistants before talking to sales.", sources: ["G2 and industry review sites", "Trade publications", "LinkedIn"] },
    uk: { note: "UK B2B buyers rely on search, industry press and peer reviews; case-based content and clear pricing models shorten cycles.", sources: ["Industry trade press", "Clutch and review platforms", "LinkedIn"] },
    uae: { note: "UAE B2B buyers include government entities and free-zone companies; credibility signals, licences and bilingual capability statements matter.", sources: ["Dubai Chamber and free-zone directories", "Arabian Business and Zawya", "LinkedIn"] },
  },
  "saas-and-technology": {
    us: { note: "US software buyers compare on G2 and Capterra and ask AI assistants for shortlists; comparison and integration pages win evaluation searches.", sources: ["G2 and Capterra", "TechCrunch and newsletters", "Reddit and developer communities"] },
    uk: { note: "UK buyers want GDPR and UK data-hosting clarity alongside features; comparisons and case-based pages win.", sources: ["G2 and Capterra", "UK tech press", "Communities and Slack groups"] },
    uae: { note: "UAE buyers ask about data residency, Arabic support and local partners; regional pages and partner listings matter.", sources: ["G2 and regional partner directories", "Arabian Business tech", "LinkedIn"] },
  },
  manufacturing: {
    us: { note: "US engineers and buyers search by specification and certification; Thomasnet presence and spec-rich product pages generate RFQs.", sources: ["Thomasnet", "Industry associations", "Trade publications"] },
    uk: { note: "UK buyers look for capability, accreditation and lead times; Made in Britain and sector directories help credibility.", sources: ["Made in Britain and sector directories", "The Manufacturer and trade press", "LinkedIn"] },
    uae: { note: "UAE industrial buyers source locally and across the GCC; ICV certification, free-zone status and bilingual catalogues matter.", sources: ["Industrial free-zone directories", "Trade fairs and chambers", "LinkedIn"] },
  },
  legal: {
    us: { note: "US clients compare lawyers on Avvo, Justia and Google; practice-area depth, bar admissions and reviews decide the call.", sources: ["Avvo, Justia and Super Lawyers", "State bar directories", "Google reviews"] },
    uk: { note: "UK clients check the Law Society, SRA and rankings; clear fee information and practice-area guides win.", sources: ["Law Society Find a Solicitor and SRA", "Chambers and The Legal 500", "Google reviews"] },
    uae: { note: "UAE clients look for licensed advocates and legal consultants by practice area; bilingual guides on company, employment and property law are in demand.", sources: ["The Legal 500 EMEA and Chambers Global", "Gulf News and Khaleej Times legal sections", "Google reviews"] },
  },
};

export type Playbook = {
  slug: string;
  industrySlug: string;
  industryName: string;
  market: PlaybookMarket;
  note: string;
  sources: string[];
  searches: string[];
};

export const playbooks: Playbook[] = playbookMarkets.flatMap((m) =>
  industries.filter((i) => local[i.slug]).map((i) => ({
    slug: `${i.slug}-${m.key}`,
    industrySlug: i.slug,
    industryName: i.name,
    market: m,
    note: local[i.slug]![m.key].note,
    sources: local[i.slug]![m.key].sources,
    searches: (queries[i.slug] ?? []).map((q, n) => q.replace("{city}", m.cities[n % m.cities.length]!)),
  })),
);

export function getPlaybook(slug: string) {
  return playbooks.find((p) => p.slug === slug);
}

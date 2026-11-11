export type IndustryArt = "skyline" | "arches" | "pulse" | "planes" | "lattice" | "courses" | "auction" | "ridge" | "switchback" | "ledger" | "network" | "flight";

export type Industry = {
  slug: string;
  name: string;
  short: string;
  art: IndustryArt;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  challenges: string[];
  solutions: { title: string; body: string }[];
  /** A sketch of the system Zenyro would typically build for this sector. */
  system: string[];
  channels: string[];
  faqs: { q: string; a: string }[];
  services: string[];
  /** Search growth (SEO, AEO, GEO) specific to this sector. */
  search: { title: string; body: string; points: string[] };
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    short: "Developers, channel partners and brokerages",
    art: "skyline",
    metaTitle: "Real Estate SEO Agency: Rank Projects on Google & AI Search",
    metaDescription: "Real estate SEO for developers and brokers: project and locality pages, Google Maps, answers to buyer questions, and AI visibility in ChatGPT.",
    headline: "Get your projects found before buyers reach the portals.",
    intro: "Buyers research locations, builders and price bands for months, on Google, Maps and increasingly ChatGPT. We make every project, locality and configuration easy to find, clearly answered and accurately described when buyers ask AI for options.",
    challenges: ["Portals outrank the developer's own project pages.", "Locality and configuration searches go to aggregators.", "AI assistants describe projects with outdated or wrong details.", "No clear view of which searches bring serious buyers."],
    solutions: [{ title: "Project and locality pages", body: "A fast page per project and locality with floor plans, price bands, completion dates and regulatory details where required." }, { title: "Buyer-question content", body: "Clear answers on loans, possession, amenities and comparisons, structured for featured snippets and AI Overviews." }, { title: "Maps and listings", body: "Accurate Google Business Profiles for site offices and consistent project facts across portals and directories." }, { title: "AI visibility", body: "Prompt tracking for searches like 'best new developments in Dubai Marina', with the facts and mentions that get you named." }],
    system: ["SEO audit and project page plan", "Project, locality and configuration pages", "Buyer FAQ and comparison content", "Maps, listings and project facts", "Monthly rankings and AI visibility report"],
    channels: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "Perplexity"],
    faqs: [{ q: "Can SEO compete with property portals?", a: "For your own project and brand searches, yes, and for many locality and configuration searches too. Specific, well-structured pages with real data often outrank portal listings." }, { q: "Do you follow RERA advertising rules?", a: "Yes. Pages display RERA registration details where required, and we avoid claims that aren't supported by approved project documents." }],
    services: ["seo", "local-seo", "geo"],
    search: {
      title: "Found by buyers on Google and in AI answers.",
      body: "Buyers research locations, builders and price bands for months before they enquire. We make each project, locality and configuration easy to find in search, clearly answered, and accurately described when buyers ask AI assistants for options.",
      points: ["Project and locality pages built on real data, with RERA details where required", "Answers to buyer questions on possession, loans and amenities", "Consistent developer and project facts across portals and profiles"],
    },
  },
  {
    slug: "hospitality",
    name: "Luxury Hotels & Hospitality",
    short: "Boutique hotels, resorts, venues and fine dining",
    art: "arches",
    metaTitle: "Hotel SEO Agency: More Direct Bookings from Google & AI",
    metaDescription: "SEO for hotels, resorts and venues: rank for the stays and events guests search for, win Google Maps, and get recommended by ChatGPT and AI Overviews.",
    headline: "More guests who find you directly, not through a portal.",
    intro: "Travellers and event planners search Google, Maps and AI assistants before they ever open a booking site. We make your property the one they find: rooms, weddings, events and experiences ranked, answered and recommended.",
    challenges: ["Travel portals outrank the property's own website.", "Wedding and event searches go to listing sites.", "The Google Business Profile is incomplete or out of date.", "AI assistants recommend competitors for 'best stay near…' questions."],
    solutions: [{ title: "Rooms, events and experience pages", body: "A page for every room type, venue and experience, with real photos, inclusions and answers to guests' questions." }, { title: "Local and Maps SEO", body: "A complete Google Business Profile, accurate details everywhere, and a steady flow of genuine reviews." }, { title: "Destination content", body: "Guides to the area, seasons and things to do that rank for the searches guests make while planning." }, { title: "AI visibility", body: "Tracking and improving how ChatGPT, Gemini and AI Overviews describe and recommend your property." }],
    system: ["SEO and listings audit", "Room, venue and experience pages", "Destination and seasonal content", "Google Business Profile and reviews", "Monthly rankings and AI visibility report"],
    channels: ["Google Search", "Google Maps", "Google Hotels", "ChatGPT", "Perplexity"],
    faqs: [{ q: "Can SEO really reduce dependence on booking portals?", a: "It grows the share of guests who find you directly. Portals will still bring some bookings, but your own pages can rank for your brand, your area and the experiences you offer." }, { q: "How do we appear in AI recommendations for hotels?", a: "Clear, consistent facts about your property, genuine reviews, and mentions on travel guides and local sources make you much easier for AI assistants to recommend." }],
    services: ["seo", "local-seo", "geo"],
    search: {
      title: "More guests finding you directly.",
      body: "Guests compare on search, maps and AI travel answers before they book. We strengthen your own website and listings so more of that research ends in a direct booking or event enquiry.",
      points: ["Room, venue and destination pages that rank for real stay and event searches", "Accurate, consistent property facts across maps, OTAs and travel sources", "Wedding and event content that answers planners’ questions directly"],
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare & Clinics",
    short: "Clinics, diagnostic centres, dental and aesthetics",
    art: "pulse",
    metaTitle: "Healthcare SEO Agency: Clinics Found on Google, Maps & AI",
    metaDescription: "Healthcare SEO for clinics and hospitals: treatment pages, Google Maps for every branch, trustworthy medical content and AI visibility.",
    headline: "Be the clinic patients find, trust and choose.",
    intro: "Patients search for a treatment and a nearby clinic, read reviews, and increasingly ask AI assistants for a recommendation. We make every branch and treatment easy to find, explain it clearly and credibly, and keep your details accurate everywhere.",
    challenges: ["Competitors appear in the Maps top three for 'near me' searches.", "Treatment pages are thin, so patients go elsewhere for answers.", "Branch details are inconsistent across directories.", "Medical content lacks the expert credentials search engines expect."],
    solutions: [{ title: "Branch and treatment pages", body: "A page for each branch and treatment answering cost, duration, recovery and what to expect." }, { title: "Local SEO for every branch", body: "Complete Google Business Profiles, consistent listings on health directories, and a reviews workflow." }, { title: "Credible medical content", body: "Content reviewed by your doctors, with author credentials and sources, as search engines expect for health topics." }, { title: "AI visibility", body: "Prompt tracking for 'best clinic for…' questions across ChatGPT, Gemini and AI Overviews." }],
    system: ["SEO and listings audit", "Branch and treatment pages", "Doctor-reviewed content", "Maps, directories and reviews", "Monthly rankings and AI visibility report"],
    channels: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "Health directories"],
    faqs: [{ q: "Do you follow medical advertising guidelines?", a: "Yes. We avoid guarantees and unsupported claims, and medical content is reviewed by your clinicians before publishing." }, { q: "Can you manage SEO for many branches?", a: "Yes. Each branch gets its own Google Business Profile and location page, managed and reported together." }],
    services: ["local-seo", "seo", "content-digital-pr"],
    search: {
      title: "Trusted answers patients can find.",
      body: "Patients search symptoms, treatments and nearby clinics. We help clinics appear for the right local searches with accurate, responsibly written information reviewed by qualified clinicians.",
      points: ["Clinician-reviewed treatment and condition pages", "Doctor and location profiles kept consistent across maps and directories", "Clear answers to common patient questions on cost, preparation and recovery"],
    },
  },
  {
    slug: "interior-design",
    name: "Interior Design & Premium Retail",
    short: "Interior studios, furniture, lighting and luxury showrooms",
    art: "planes",
    metaTitle: "SEO for Interior Designers & Premium Retail Brands",
    metaDescription: "SEO for interior studios and premium retail: room, style and locality pages, portfolio SEO, Google Maps and AI visibility.",
    headline: "Found for every room, style and locality your clients search.",
    intro: "Clients search by room, style, budget and area, browse portfolios, and now ask AI assistants for recommendations. We turn your services, projects and showrooms into pages that rank, answer and get you named.",
    challenges: ["One generic services page can't rank for specific searches.", "Portfolio projects are images that search engines can't read.", "Showrooms are hard to find on Google Maps.", "AI assistants recommend larger competitors by default."],
    solutions: [{ title: "Service, style and locality pages", body: "A page for each service, room type and area, with real projects, materials and budget guidance." }, { title: "Portfolio SEO", body: "Projects written up with room, style, budget band and location so they rank and can be cited." }, { title: "Showroom local SEO", body: "Complete Google Business Profiles, photos, products and reviews for every showroom." }, { title: "AI visibility", body: "Clear facts and mentions so AI assistants recommend you for the clients you want." }],
    system: ["Keyword and topic map", "Service, style and locality pages", "Portfolio write-ups", "Showroom Maps profiles and reviews", "Monthly rankings and AI visibility report"],
    channels: ["Google Search", "Google Maps", "Google Images", "ChatGPT", "Pinterest search"],
    faqs: [{ q: "Do portfolio pages help SEO?", a: "Yes, when each project has a written description, location, style and budget band, not just images. That gives search engines and AI assistants something to understand and quote." }, { q: "Can you help a showroom appear in Maps?", a: "Yes. A complete, accurate Google Business Profile with products, photos and genuine reviews is usually the biggest local win." }],
    services: ["seo", "local-seo", "geo"],
    search: {
      title: "Found for every room, style and locality.",
      body: "Homeowners search for ideas, costs and studios long before they visit. We turn your portfolio, materials and expertise into pages and answers that bring the right clients to your studio or showroom.",
      points: ["Project and style pages built from your real portfolio", "Cost, timeline and material explainers that answer buying questions", "Showroom and brand information kept consistent for local and AI search"],
    },
  },
  {
    slug: "education",
    name: "Education & Professional Services",
    short: "Institutes, coaching, consultancies and firms",
    art: "lattice",
    metaTitle: "Education SEO Agency: Schools, Institutes & Courses",
    metaDescription: "Education SEO for schools, institutes and colleges: course and admission pages, Maps for every campus, and AI visibility for 'best school' prompts.",
    headline: "Rank every course, campus and admission question.",
    intro: "Students and parents compare courses, fees, results and locations for weeks, on Google, Maps and AI assistants. We make every course and campus easy to find, answer their questions clearly and keep your details accurate everywhere.",
    challenges: ["Every course is on one page, so none of them rank.", "Campus listings are incomplete on Google Maps.", "Parents' questions about fees and admissions go unanswered.", "AI assistants recommend other institutes for 'best coaching' prompts."],
    solutions: [{ title: "Course and batch pages", body: "A page per course with fees, timings, faculty, eligibility and demo-class details." }, { title: "Campus local SEO", body: "A complete Google Business Profile for every campus, with photos, timings and reviews." }, { title: "Admissions content", body: "Answers to parents' and students' questions, timed to the admission cycle." }, { title: "AI visibility", body: "Tracking 'best school' and 'best coaching' prompts and building the facts and mentions that get you named." }],
    system: ["SEO audit and course page plan", "Course, batch and campus pages", "Admissions and exam content", "Maps profiles and reviews", "Monthly rankings and AI visibility report"],
    channels: ["Google Search", "Google Maps", "YouTube search", "ChatGPT", "Education directories"],
    faqs: [{ q: "When should a school start SEO before admissions?", a: "Ideally three to six months before the admission season, so new pages have time to rank." }, { q: "Can you make claims about results?", a: "Only results you can verify and are allowed to publish. We avoid guarantees and misleading comparisons." }],
    services: ["seo", "local-seo", "content-digital-pr"],
    search: {
      title: "The institute parents and students find first.",
      body: "Students and parents compare programs, eligibility and outcomes across search and AI assistants. We make your programs clear, comparable and correctly described wherever they research.",
      points: ["Program pages with eligibility, fees and outcomes stated plainly", "Answers to admission and career questions written with your faculty", "Consistent institution facts across directories and education portals"],
    },
  },
  {
    slug: "home-improvement",
    name: "Home Improvement & Building Materials",
    short: "Tiles, sanitaryware, modular kitchens, solar and contractors",
    art: "courses",
    metaTitle: "SEO for Home Improvement & Building Materials Businesses",
    metaDescription: "SEO for dealers, manufacturers and contractors: product and spec pages, dealer locations on Maps, buying guides and AI visibility.",
    headline: "Found by homeowners, contractors and buyers comparing options.",
    intro: "Buyers search by product, specification and area, and compare dealers before they visit. We make your products, dealers and expertise easy to find on Google, Maps and AI assistants.",
    challenges: ["Products exist only in PDF catalogues.", "Dealer and showroom locations are hard to find on Maps.", "Buyers can't find answers to installation and maintenance questions.", "AI assistants don't know which products you make."],
    solutions: [{ title: "Product and specification pages", body: "Crawlable product pages with specifications, certifications and uses, structured for comparison searches." }, { title: "Dealer location pages", body: "Location pages and Google Business Profiles for every dealer and showroom." }, { title: "Buying guides", body: "Clear guides on choosing, installing and maintaining products that rank and get quoted." }, { title: "AI visibility", body: "Product facts and structured data so AI assistants can describe and recommend what you make." }],
    system: ["Product data and SEO audit", "Product and category pages", "Dealer and showroom pages", "Buying guides and FAQs", "Monthly rankings and AI visibility report"],
    channels: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "B2B directories"],
    faqs: [{ q: "Is SEO worth it for a B2B building materials business?", a: "Yes. Contractors and buyers search by product and specification, and clear product pages win those searches and feed AI answers." }, { q: "Can you help our dealers appear locally?", a: "Yes. We set up and manage dealer location pages and Google Business Profiles so each dealer can be found nearby." }],
    services: ["seo", "technical-seo", "local-seo"],
    search: {
      title: "Found by buyers, contractors and dealers.",
      body: "Homeowners and contractors search product types, specifications and local dealers. We connect product information, dealer locations and buying guides so searches turn into quote requests.",
      points: ["Product and specification pages structured for comparison searches", "Dealer and showroom location pages with genuine local detail", "Buying guides that answer installation and maintenance questions"],
    },
  },
  {
    slug: "travel-tourism",
    name: "Travel, Taxi & Tour Operators",
    short: "Taxi services, tour operators, homestays and travel planners",
    art: "switchback",
    metaTitle: "Travel SEO Agency for Taxi, Tour & Travel Businesses",
    metaDescription: "Travel SEO for taxi services and tour operators: route and package pages that rank, Google Maps, and AI visibility for trip planning.",
    headline: "Found for every route, package and trip question.",
    intro: "Travellers search a route or destination, compare operators and increasingly ask AI to plan the trip. We make your routes, packages and expertise the answer, on Google, Maps and AI assistants.",
    challenges: ["Aggregators outrank operators for route searches.", "Few route, package and destination pages exist.", "Seasonal demand isn't matched with timely content.", "AI trip plans recommend other operators."],
    solutions: [{ title: "Route and package pages", body: "A page for every popular route and package with distance, time, vehicles and inclusions." }, { title: "Destination guides", body: "Seasonal, practical guides that answer what travellers ask before they book." }, { title: "Maps and reviews", body: "A complete Google Business Profile with real vehicles, drivers and genuine reviews." }, { title: "AI visibility", body: "Facts and mentions that get you named in AI trip plans and 'best operator' answers." }],
    system: ["SEO audit and route map", "Route and package pages", "Destination and seasonal guides", "Maps profile and reviews", "Monthly rankings and AI visibility report"],
    channels: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "YouTube search"],
    faqs: [{ q: "Can SEO help us depend less on aggregators?", a: "Yes. Your own route and package pages can rank for the trips travellers search, and a strong Maps presence brings direct calls." }, { q: "When should we publish seasonal content?", a: "Six to ten weeks before each peak, so pages have time to rank before travellers start planning." }],
    services: ["seo", "local-seo", "geo"],
    search: {
      title: "Found when travellers plan the trip.",
      body: "Travellers ask Google and AI assistants things like \"airport transfer from Heathrow to Oxford\" or \"best 4-day Scottish Highlands itinerary\". We make your routes, packages and prices clear enough to be found, quoted and recommended.",
      points: ["Route pages with distance, time, vehicles and inclusions", "Destination guides that answer seasonal and road-condition questions", "Consistent business details across Google, directories and social profiles"],
    },
  },
  {
    slug: "financial-services",
    name: "Financial & Advisory Services",
    short: "Loan and debt advisors, auction platforms, CA and consulting firms",
    art: "ledger",
    metaTitle: "SEO for Financial & Advisory Firms: Google & AI Search",
    metaDescription: "SEO for advisory firms and financial platforms: answer-first explainers, expert credibility and AI visibility for high-intent questions.",
    headline: "The clear, trusted answer to your clients' biggest questions.",
    intro: "People with financial questions research carefully on Google and AI assistants before they contact anyone. We make your expertise the answer they find: clear explainers, visible credentials and accurate information everywhere.",
    challenges: ["Prospects find generic answers from large publishers, not you.", "Pages don't explain processes, eligibility or timelines plainly.", "Expert credentials aren't visible to search engines.", "AI assistants rarely cite smaller specialist firms."],
    solutions: [{ title: "Answer-first explainers", body: "Plain-language guides to processes, eligibility, documents and timelines, structured for snippets and AI Overviews." }, { title: "Expert credibility", body: "Author profiles, credentials, sources and firm details that search engines and AI assistants can verify." }, { title: "Searchable listings and tools", body: "For platforms such as auction or listing sites: fast, crawlable, filterable pages that rank." }, { title: "AI visibility", body: "Tracking high-intent financial prompts and building the facts and citations that get you named." }],
    system: ["SEO and content audit", "Answer-first explainers", "Author and firm credibility", "Listings, mentions and citations", "Monthly rankings and AI visibility report"],
    channels: ["Google Search", "AI Overviews", "ChatGPT", "Perplexity", "Industry directories"],
    faqs: [{ q: "Can you market financial services responsibly?", a: "Yes. We avoid guarantees and unsupported claims, include required disclosures, and keep content accurate and reviewed." }, { q: "Why does expertise matter so much for financial SEO?", a: "Search engines and AI assistants hold money topics to a higher standard. Visible credentials, sources and accuracy are what earn rankings and citations." }],
    services: ["seo", "content-digital-pr", "geo"],
    search: {
      title: "The credible answer for high-stakes questions.",
      body: "Prospects ask detailed questions before they trust anyone with their situation. We make your expertise show up as the clear, credible answer in search results and AI assistants.",
      points: ["Explainers for high-intent questions, reviewed for accuracy", "Author and firm credentials marked up clearly", "Consistent firm details across directories, profiles and the website"],
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

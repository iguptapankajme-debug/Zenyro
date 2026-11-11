import type { IndustryArt } from "./industries";

/**
 * Portfolio entries.
 *  - kind "project":    a live website, linked directly. Descriptions stay factual and sector-level.
 *  - kind "concept":    a clearly labelled concept demonstration (not a client project).
 *  - kind "case-study": a full write-up; only include outcomes the client has verified and approved.
 */
export type WorkItem = {
  slug: string;
  kind: "project" | "concept" | "case-study";
  /** Live site for "project" entries. */
  url?: string;
  /** Optional real screenshot in /public (e.g. "/images/work/client.jpg", 16:9). Cover artwork is used until set. */
  image?: string;
  title: string;
  /** One short value statement for the showcase. */
  summary: string;
  client: string;
  industry: string;
  art: IndustryArt;
  challenge?: string;
  services: string[];
  solution?: string;
  /** Verified outcomes only. Leave empty for concepts. */
  outcomes: string[];
  /**
   * Live projects: headline results, shown on the work cards once filled in. Only add figures the
   * client has confirmed and is happy to publish, e.g. { value: "3x", label: "WhatsApp enquiries" }.
   */
  results?: { value: string; label: string }[];
  /** Concepts: the system walked through from first touch to booked outcome. */
  flow?: FlowStep[];
  /** What the example demonstrates, used by the filters on the Work page. */
  categories?: ExampleCategory[];
};

export type ExampleCategory = "seo" | "aeo" | "geo";
export const exampleCategories: { key: ExampleCategory; label: string }[] = [
  { key: "seo", label: "SEO" },
  { key: "aeo", label: "AEO" },
  { key: "geo", label: "GEO" },
];

/** What the animated mock screen shows at one stage of a system walkthrough. */
export type FlowScreen =
  | { type: "ad"; brand: string; headline: string; cta: string }
  | { type: "page"; url: string; heading: string; chips: string[]; cta: string }
  | { type: "chat"; name: string; messages: { from: "customer" | "assistant"; text: string }[] }
  | { type: "checklist"; title: string; rows: [string, string][]; badge: string }
  | { type: "calendar"; title: string; day: number; time: number; slot: string; note: string }
  | { type: "notify"; items: { time: string; text: string }[]; done?: string }
  | { type: "map"; query: string; places: string[] }
  | { type: "serp"; query: string; results: { title: string; url: string; text: string; ours?: boolean }[] }
  | { type: "answer"; question: string; answer: string; sources: string[] };

export type FlowStep = { node: string; title: string; body: string; screen: FlowScreen };

export const work: WorkItem[] = [
  {
    slug: "dental-local-seo",
    kind: "concept",
    categories: ["seo", "geo"],
    title: "Local SEO for a multi-branch dental clinic",
    summary: "Every branch in the Maps top three, a page for every treatment, and named when patients ask AI for a dentist.",
    client: "Concept for a multi-location dental clinic",
    industry: "Healthcare",
    art: "pulse",
    challenge: "Patients search 'dentist near me' and ask AI assistants for recommendations, but the clinic has one generic website page and incomplete Google profiles for its branches.",
    services: ["Google Business Profiles", "Branch and treatment pages", "Reviews workflow", "AI visibility tracking"],
    solution: "A complete, consistent Google Business Profile for every branch, a page for each branch and treatment, a steady reviews workflow, and prompt-level tracking across ChatGPT, Gemini and AI Overviews.",
    outcomes: [],
    flow: [
      { node: "Profiles", title: "Every branch on the map", body: "A complete Google Business Profile for each branch: categories, services, hours, photos and questions answered.", screen: { type: "map", query: "dentist near me", places: ["Smile Studio · Midtown", "Smile Studio · Upper East Side", "Smile Studio · Brooklyn Heights"] } },
      { node: "Pages", title: "A page for every branch and treatment", body: "Branch pages with address, directions and doctors; treatment pages that answer cost, duration and recovery questions.", screen: { type: "page", url: "smilestudio.com/root-canal", heading: "Root canal treatment, explained", chips: ["Cost", "Duration", "Recovery"], cta: "Book a consultation" } },
      { node: "Rankings", title: "In the local pack for treatment searches", body: "Branch and treatment pages compete for the exact searches patients make, area by area.", screen: { type: "serp", query: "root canal treatment midtown manhattan", results: [{ title: "Root Canal Treatment in Midtown Manhattan | Smile Studio", url: "smilestudio.com › root-canal", text: "Painless, single-visit root canals with clear pricing and same-week appointments.", ours: true }, { title: "What is a root canal?", url: "health.example › dental", text: "A guide to the procedure." }, { title: "Dentists in Midtown", url: "directory.example › dentists", text: "Compare clinics and reviews." }] } },
      { node: "AI answers", title: "Recommended when patients ask AI", body: "Consistent facts and genuine reviews make the clinic easy for AI assistants to recommend accurately.", screen: { type: "answer", question: "Which dental clinic in Midtown is good for root canal treatment?", answer: "Smile Studio in Midtown is well reviewed for root canal treatment, with clear pricing and appointments the same week.", sources: ["smilestudio.com", "Google Business Profile", "Healthgrades listing"] } },
      { node: "Reviews", title: "A steady flow of genuine reviews", body: "Every patient gets a simple review request after a visit, and every review gets a reply.", screen: { type: "notify", items: [{ time: "After visit", text: "Thank you for visiting Smile Studio today. Would you share a quick review of your experience?" }, { time: "Reply posted", text: "Thank you, Priya! We're glad the treatment went smoothly." }], done: "Review published" } },
    ],
  },
  {
    slug: "interiors-search-growth",
    kind: "concept",
    categories: ["seo", "aeo", "geo"],
    title: "Search growth for an interiors studio",
    summary: "Found for every room, style and locality a client searches, and named when they ask AI for a designer.",
    client: "Concept for a residential interiors studio",
    industry: "Interior Design",
    art: "planes",
    challenge: "Clients search by room, style and locality, but the studio has one generic services page and a portfolio that search engines can't read.",
    services: ["Keyword and topic map", "Service and locality pages", "Portfolio SEO", "AEO and GEO"],
    solution: "A keyword map by room, style and area; a page for each service and locality; portfolio projects written up with room, budget band and materials; and clear answers that AI assistants can quote.",
    outcomes: [],
    flow: [
      { node: "Keyword map", title: "Map what clients actually search", body: "Rooms, styles, budgets and localities grouped into topics, each with a page that answers it.", screen: { type: "checklist", title: "Topic map", rows: [["Modular kitchens", "12 searches"], ["Living room design", "9 searches"], ["Sector-level pages", "6 areas"], ["Budget guides", "4 pages"]], badge: "Content plan ready" } },
      { node: "Service pages", title: "A page for every service and area", body: "Fast pages with real projects, materials and price bands, so each search lands somewhere specific.", screen: { type: "page", url: "studio.co.uk/kitchens", heading: "Bespoke kitchens, designed to fit", chips: ["L-shaped", "Island", "Galley"], cta: "Book a design visit" } },
      { node: "Google", title: "Ranking for the searches that matter", body: "Service, locality and project pages compete for specific searches instead of one page chasing everything.", screen: { type: "serp", query: "kitchen designer near me", results: [{ title: "Bespoke Kitchens, Designed to Fit | Studio", url: "studio.co.uk › kitchens", text: "L-shaped, island and galley kitchens with real projects, materials and price bands.", ours: true }, { title: "Kitchen design ideas for small homes", url: "magazine.example › kitchens", text: "Inspiration and layouts for compact kitchens." }, { title: "Interior designers in your area", url: "directory.example › interiors", text: "Compare local studios and reviews." }] } },
      { node: "AI answers", title: "Named when clients ask AI", body: "Clear, consistent facts about services, areas and process make the studio easy for AI assistants to recommend accurately.", screen: { type: "answer", question: "Who designs bespoke kitchens in Islington, London?", answer: "Studio designs L-shaped, island and galley kitchens across north London, with a free design visit and fixed-price quotes.", sources: ["studio.co.uk", "Google Business Profile", "Houzz profile"] } },
      { node: "Tracking", title: "Every room and locality tracked", body: "Rankings, Maps actions and AI mentions are tracked for each topic, so next month's content goes where demand is.", screen: { type: "checklist", title: "Monthly organic report", rows: [["Keywords in top 10", "Tracked"], ["Maps actions", "Tracked"], ["AI mentions", "By prompt"], ["Next topics", "Planned"]], badge: "Report sent" } },
    ],
  },
  {
    slug: "institute-course-seo",
    kind: "concept",
    categories: ["seo", "aeo"],
    title: "Rank every course for a coaching institute",
    summary: "A page for every course and batch, found in Maps and search, and cited when students ask AI.",
    client: "Concept for a multi-branch coaching institute",
    industry: "Education",
    art: "courses",
    challenge: "Students search for a specific exam, batch timing and branch, but the website lists everything on one page and enquiries arrive as unanswered calls.",
    services: ["Course and batch pages", "Local SEO for each branch", "AEO for exam questions", "AI visibility tracking"],
    solution: "A page per course with fees, batches and results policy; a Google Business Profile per branch; and answers to common exam questions that AI assistants can cite.",
    outcomes: [],
    flow: [
      { node: "Course pages", title: "One page per course and batch", body: "Fees, timings, faculty and demo-class details on a fast page for each course.", screen: { type: "page", url: "institute.sg/ielts-coaching", heading: "IELTS coaching, morning and evening batches", chips: ["Weekday", "Weekend", "Online"], cta: "Book a free demo class" } },
      { node: "Maps", title: "Every branch found locally", body: "Complete, accurate profiles for each branch, with photos, timings and reviews.", screen: { type: "map", query: "IELTS coaching near me", places: ["Institute · Orchard", "Institute · Tampines", "Institute · Jurong East"] } },
      { node: "Search", title: "Ranking for exam and batch searches", body: "Course pages compete for the exact searches students type, not just the institute's name.", screen: { type: "serp", query: "IELTS weekend class Singapore", results: [{ title: "IELTS Coaching: Weekend Batches | Institute", url: "institute.sg › ielts-coaching", text: "Weekend and evening batches, small groups and a free demo class.", ours: true }, { title: "IELTS exam dates and fees", url: "exam-board.example › ielts", text: "Official test dates and registration." }, { title: "IELTS preparation tips", url: "blog.example › ielts", text: "How to prepare in eight weeks." }] } },
      { node: "AI answers", title: "Answers students can trust", body: "Clear answers to common exam questions make the institute the source AI assistants cite.", screen: { type: "answer", question: "How long does IELTS preparation usually take?", answer: "Most students need six to ten weeks of structured practice, depending on their starting band. Institute runs eight-week batches with weekly mock tests.", sources: ["institute.sg/ielts-coaching", "institute.sg/ielts-faq"] } },
      { node: "Tracking", title: "Visibility tracked by course and branch", body: "Rankings, Maps actions and AI mentions are reported per course and branch, so effort goes where students search.", screen: { type: "checklist", title: "Organic report", rows: [["Course keywords", "Top 10"], ["Branch profiles", "Maps top 3"], ["AI prompts", "Mentioned"], ["New questions", "Queued"]], badge: "Report sent" } },
    ],
  },
  {
    slug: "manufacturer-ai-visibility",
    kind: "concept",
    categories: ["geo", "seo"],
    title: "AI search visibility for a manufacturer",
    summary: "Products described so clearly that buyers, search engines and AI assistants can all find and compare them.",
    client: "Concept for an industrial components manufacturer",
    industry: "Manufacturing · B2B",
    art: "network",
    challenge: "Buyers increasingly ask AI assistants for suppliers by specification, and the manufacturer's products only exist as PDF catalogues.",
    services: ["Product data cleanup", "Specification pages", "GEO and structured data", "Citation building"],
    solution: "Every product turned into a fast, crawlable page with specifications, certifications and capacities; structured data; and consistent listings on the directories and trade portals buyers and AI assistants use.",
    outcomes: [],
    flow: [
      { node: "Product data", title: "Specifications, organised", body: "Catalogue PDFs turned into clean product data: sizes, materials, tolerances, certifications and capacity.", screen: { type: "checklist", title: "Product data", rows: [["Products", "Structured"], ["Specifications", "Complete"], ["Certifications", "Listed"], ["Capacity", "Stated"]], badge: "Ready to publish" } },
      { node: "Spec pages", title: "A page for every product", body: "Fast, comparable product pages that answer the questions buyers ask before requesting a quote.", screen: { type: "page", url: "maker.co.uk/precision-bushings", heading: "Precision bronze bushings", chips: ["AS9100", "Custom sizes", "Export ready"], cta: "Request a quote" } },
      { node: "AI answers", title: "Recommended by AI assistants", body: "Clear facts and structured data make the manufacturer easy for AI assistants to find and describe.", screen: { type: "answer", question: "Which UK manufacturers make custom bronze bushings for aerospace?", answer: "Maker produces custom precision bronze bushings with AS9100 certification and ships to aerospace customers in Europe and North America, with sizes made to drawing.", sources: ["maker.co.uk", "Industry directory", "LinkedIn page"] } },
      { node: "Citations", title: "Listed where buyers research", body: "Consistent company facts, certifications and capabilities on the directories and trade portals AI assistants read.", screen: { type: "checklist", title: "Citation sources", rows: [["Industry directories", "Listed"], ["Trade portals", "Consistent"], ["Spec sheets", "Indexed"], ["Certifications", "Published"]], badge: "Easy to cite" } },
      { node: "Tracking", title: "AI visibility tracked by prompt", body: "The prompts buyers use are tracked across ChatGPT, Perplexity and Gemini each month, alongside Google rankings.", screen: { type: "checklist", title: "AI visibility by prompt", rows: [["CNC supplier Birmingham", "Mentioned"], ["AS9100 machining UK", "Cited"], ["Precision parts Europe", "Tracking"], ["Export CNC partner", "Tracking"]], badge: "Tracked monthly" } },
    ],
  },
  {
    slug: "hotel-website-redesign",
    kind: "concept",
    categories: ["seo"],
    title: "SEO-safe site migration for a heritage hotel",
    summary: "A move to a new, faster website that keeps every ranking the old one earned.",
    client: "Concept for a heritage hotel",
    industry: "Hospitality",
    art: "arches",
    challenge: "The old website is slow and dated, but it ranks for valuable searches. A careless redesign could lose that traffic overnight.",
    services: ["SEO audit before migration", "Redirect mapping", "Core Web Vitals", "Post-launch monitoring"],
    solution: "Every ranking page audited and mapped before the migration; redirects for every changed address; Core Web Vitals fixed; and post-launch monitoring of rankings and organic traffic.",
    outcomes: [],
    flow: [
      { node: "Audit", title: "Know what ranks before changing anything", body: "Every page that brings visitors from search is listed, with its keywords and links.", screen: { type: "checklist", title: "Pre-launch audit", rows: [["Ranking pages", "Listed"], ["Backlinks", "Mapped"], ["Page speed", "Measured"], ["Tracking", "In place"]], badge: "Safe to redesign" } },
      { node: "Redirects", title: "Every old address has a new home", body: "Old addresses point to their new equivalents, so search engines and bookmarks never hit a dead end.", screen: { type: "checklist", title: "Redirect map", rows: [["/rooms.html", "/rooms"], ["/weddings.php", "/weddings"], ["/gallery-2019", "/gallery"], ["/contact-us", "/contact"]], badge: "All redirects tested" } },
      { node: "Speed", title: "Faster pages, same rankings", body: "Core Web Vitals are fixed before launch, so the new site loads quickly on phones and keeps every signal the old one earned.", screen: { type: "checklist", title: "Core Web Vitals", rows: [["LCP", "Good"], ["INP", "Good"], ["CLS", "Good"], ["Mobile usability", "Passing"]], badge: "Ready to launch" } },
      { node: "Rankings kept", title: "Still found after launch", body: "Rankings are tracked daily after launch, and any drop is investigated straight away.", screen: { type: "serp", query: "heritage hotel wedding venue", results: [{ title: "Weddings at the Manor | Cotswolds Venue", url: "themanorhotel.co.uk › weddings", text: "Gardens, a walled courtyard and a great hall for weddings of every size.", ours: true }, { title: "Top wedding venues guide", url: "weddings.example › venues", text: "Compare venues by city and budget." }, { title: "Country house hotels in the Cotswolds", url: "travel.example › heritage", text: "A guide to palace stays." }] } },
      { node: "Report", title: "Organic traffic, protected and growing", body: "A monthly report compares rankings, organic clicks and direct-booking enquiries with the pre-launch baseline.", screen: { type: "checklist", title: "Post-launch report", rows: [["Ranking pages", "All kept"], ["Organic clicks", "vs. baseline"], ["Core Web Vitals", "Passing"], ["Direct enquiries", "Tracked"]], badge: "Migration complete" } },
    ],
  },
  {
    slug: "advisory-nurture",
    kind: "concept",
    categories: ["aeo", "geo"],
    title: "AEO and GEO for a financial advisory firm",
    summary: "Clear, credible answers that rank for high-intent questions and get cited by AI assistants.",
    client: "Concept for a UK contractor tax advisory",
    industry: "Financial Services",
    art: "ledger",
    challenge: "Contractors research IR35 and tax questions for weeks and only enquire once they trust the answer.",
    services: ["Answer-first content", "AEO and GEO", "E-E-A-T and author profiles", "Ranking tracking"],
    solution: "Plain-language explainers for high-intent questions, author profiles and credentials that search engines can verify, and tracking of rankings and AI citations for each topic.",
    outcomes: [],
    flow: [
      { node: "AI answers", title: "The clear answer, with your name on it", body: "Explainers written for the questions prospects ask Google and AI assistants.", screen: { type: "answer", question: "What is IR35 and does it apply to me?", answer: "IR35 is UK tax legislation that decides whether a contractor should be taxed like an employee. Advisory explains the tests, who decides status and what to do in its IR35 guide.", sources: ["advisory.co.uk/ir35-guide", "advisory.co.uk/faq"] } },
      { node: "Explainer", title: "Pages that answer before they sell", body: "Process, documents, timelines and fees approach explained plainly, with a quiet call to action.", screen: { type: "page", url: "advisory.co.uk/ir35-guide", heading: "IR35, explained", chips: ["Status tests", "Who decides", "Next steps"], cta: "Book a confidential call" } },
      { node: "Credibility", title: "Expertise that search engines and AI can verify", body: "Author profiles, credentials, sources and consistent firm details, important for financial topics.", screen: { type: "checklist", title: "Trust signals", rows: [["Author bios", "Published"], ["Credentials", "Listed"], ["Sources", "Cited"], ["Firm details", "Consistent"]], badge: "Ready to be cited" } },
      { node: "Rankings", title: "Ranking for high-intent questions", body: "Explainer pages compete for the specific questions prospects search before they look for an advisor.", screen: { type: "serp", query: "ir35 status check contractor", results: [{ title: "IR35, Explained: Status Tests and Next Steps | Advisory", url: "advisory.co.uk › ir35-guide", text: "How status is decided, who is responsible and what contractors should do next.", ours: true }, { title: "Check employment status for tax", url: "gov.example › ir35", text: "The official status tool and guidance." }, { title: "IR35 rule changes", url: "news.example › finance", text: "Recent changes explained." }] } },
      { node: "Tracking", title: "Rankings and citations, topic by topic", body: "Each explainer is tracked for Google rankings, AI Overview appearances and AI assistant citations.", screen: { type: "checklist", title: "Organic report", rows: [["IR35 guide", "Top 3"], ["AI Overview", "Cited"], ["ChatGPT answers", "Mentioned"], ["Organic enquiries", "Tracked"]], badge: "Report sent" } },
    ],
  },
];

/** Client projects, once real ones with permission to publish are added (kind "project" or "case-study"). */
export const projects = () => work.filter((w) => w.kind === "project");
/** Published examples: concepts tagged with at least one search pillar. */
export const concepts = () => work.filter((w) => w.kind === "concept" && (w.categories?.length ?? 0) > 0);

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}

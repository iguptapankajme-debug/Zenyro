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
  /** Optional real screenshot in /public (e.g. "/images/work/eauctionhunt.jpg", 16:9). Cover artwork is used until set. */
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
  // Live projects. Zenyro delivered the website, SEO, AEO, GEO and social media for each.
  {
    slug: "eauctionhunt",
    kind: "project",
    url: "https://eauctionhunt.com",
    title: "eAuctionHunt",
    summary: "A search platform for verified bank, government and NCLT auction notices across India, filterable by city, asset type, bank and reserve price.",
    client: "eauctionhunt.com",
    industry: "Real estate · Bank auctions",
    image: "/images/work/eauctionhunt.webp",
    art: "auction",
    services: ["Website", "SEO", "AEO", "GEO", "Social media"],
    outcomes: [],
  },
  {
    slug: "himachal-cab-expert",
    kind: "project",
    url: "https://himachalcabexpert.com",
    title: "Himachal Cab Expert",
    summary: "Private taxis and airport transfers to Shimla, Manali and Dharamshala, with instant quotes for one-way, round-trip and multi-day tours.",
    client: "himachalcabexpert.com",
    industry: "Travel · Taxi service",
    image: "/images/work/himachal-cab-expert.webp",
    art: "switchback",
    services: ["Website", "SEO", "AEO", "GEO", "Social media"],
    outcomes: [],
  },
  {
    slug: "npa-experts",
    kind: "project",
    url: "https://npaexperts.in",
    title: "NPA Experts",
    summary: "Confidential OTS, SARFAESI, DRT and loan-restructuring advisory for individuals, MSMEs and businesses across India.",
    client: "npaexperts.in",
    industry: "Financial services · NPA resolution",
    image: "/images/work/npa-experts.webp",
    art: "ledger",
    services: ["Website", "SEO", "AEO", "GEO", "Social media"],
    outcomes: [],
  },
  {
    slug: "himachal-taxi-and-tours",
    kind: "project",
    url: "https://himachaltaxiandtours.com",
    title: "Himachal Taxi & Tours",
    summary: "Fixed-fare outstation cabs, airport transfers and sightseeing across Himachal Pradesh, with an instant quote builder.",
    client: "himachaltaxiandtours.com",
    industry: "Travel · Tours",
    image: "/images/work/himachal-taxi-and-tours.webp",
    art: "ridge",
    services: ["Website", "SEO", "AEO", "GEO", "Social media"],
    outcomes: [],
  },
  {
    slug: "msme-help",
    kind: "project",
    url: "https://msme.help",
    title: "MSME.help",
    summary: "Help and services for India's micro, small and medium enterprises.",
    client: "msme.help",
    industry: "Business services",
    art: "network",
    services: ["Website", "SEO", "AEO", "GEO", "Social media"],
    outcomes: [],
  },
  {
    slug: "travel-to-abroad",
    kind: "project",
    url: "https://traveltoabroad.in",
    title: "Travel to Abroad",
    summary: "Planning help for international travel from India.",
    client: "traveltoabroad.in",
    industry: "Travel · International",
    art: "flight",
    services: ["Website", "SEO", "AEO", "GEO", "Social media"],
    outcomes: [],
  },
  {
    slug: "residential-launch-engine",
    kind: "concept",
    categories: [],
    title: "Residential launch engine",
    summary: "Turning a tower launch into a steady calendar of qualified site visits.",
    client: "Concept for a premium residential developer",
    industry: "Real Estate",
    art: "skyline",
    challenge:
      "A new tower launch needs a steady flow of site visits from buyers within budget, rather than a burst of portal leads that go cold in days.",
    services: ["Project landing page", "Meta & Google Ads", "WhatsApp AI qualification", "Site-visit booking"],
    solution:
      "A dedicated launch page with price bands and floor plans, campaigns segmented by configuration, and a WhatsApp assistant that replies within a minute, qualifies budget and timeline, and books a site-visit slot directly into the sales calendar.",
    outcomes: [],
    flow: [
      {
        node: "Ads",
        title: "Campaigns by configuration",
        body: "Meta and Google campaigns split by 2 BHK, 3 BHK and penthouse, so each buyer sees the home that fits their budget.",
        screen: { type: "ad", brand: "The Residences", headline: "3 BHK sky homes. Site visits open this weekend.", cta: "View floor plans" },
      },
      {
        node: "Launch page",
        title: "A launch page that answers first",
        body: "Price bands, floor plans and amenities on one fast page, with a single action: book a site visit.",
        screen: { type: "page", url: "theresidences.in", heading: "Sky homes above the city", chips: ["2 BHK", "3 BHK", "Penthouse"], cta: "Book a site visit" },
      },
      {
        node: "WhatsApp AI",
        title: "A reply inside a minute",
        body: "Every enquiry gets a WhatsApp reply straight away, day or night, in the buyer's own language.",
        screen: {
          type: "chat",
          name: "The Residences",
          messages: [
            { from: "customer", text: "Hi, is the 3 BHK still available?" },
            { from: "assistant", text: "Yes, a few 3 BHK homes are open on floors 12 to 18. Can I ask two quick questions to suggest the right one?" },
            { from: "customer", text: "Sure" },
            { from: "assistant", text: "What budget range are you considering, and when would you like to move in?" },
          ],
        },
      },
      {
        node: "Qualify",
        title: "Budget and timeline, captured",
        body: "The assistant records configuration, budget and move-in timeline, and passes serious buyers to the sales team.",
        screen: { type: "checklist", title: "Buyer profile", rows: [["Configuration", "3 BHK"], ["Budget", "Within range"], ["Move-in", "6 to 12 months"], ["Visit", "This weekend"]], badge: "Qualified buyer" },
      },
      {
        node: "Site visit",
        title: "Booked into the sales calendar",
        body: "The buyer picks a slot, the visit lands in the sales calendar, and reminders go out automatically.",
        screen: { type: "calendar", title: "Sales calendar", day: 5, time: 1, slot: "Sat · 11:00", note: "Site visit confirmed · reminder set" },
      },
    ],
  },
  {
    slug: "boutique-hotel-direct",
    kind: "concept",
    categories: [],
    title: "Direct booking and events system",
    summary: "More direct bookings, and no wedding enquiry left waiting overnight.",
    client: "Concept for a boutique hill-station resort",
    industry: "Hospitality",
    art: "arches",
    challenge:
      "Most rooms are sold through online travel agencies, and wedding enquiries arrive by email at night and wait until morning.",
    services: ["Direct booking website", "Remarketing", "Event enquiry assistant", "Guest messaging"],
    solution:
      "An image-led website with a clear direct-booking incentive, remarketing to visitors who checked dates, and an events assistant that captures date, guest count and budget before scheduling a call with the events manager.",
    outcomes: [],
    flow: [
      {
        node: "Direct site",
        title: "A reason to book direct",
        body: "An image-led website with a clear direct-booking perk, so guests who found you on a travel agency still book with you.",
        screen: { type: "page", url: "theridgeresort.in", heading: "Mountain suites, booked direct", chips: ["Best rate", "Free breakfast", "Late checkout"], cta: "Check dates" },
      },
      {
        node: "Remarketing",
        title: "Bring back the date-checkers",
        body: "Visitors who checked dates but didn't book see the direct-booking perk again on Instagram and Google.",
        screen: { type: "ad", brand: "The Ridge Resort", headline: "Your dates are still open. Breakfast is on us when you book direct.", cta: "Complete booking" },
      },
      {
        node: "Events AI",
        title: "The 11:48 pm wedding enquiry, answered",
        body: "Wedding and event enquiries get an instant, warm reply at any hour instead of waiting until morning.",
        screen: {
          type: "chat",
          name: "The Ridge · Events",
          messages: [
            { from: "customer", text: "Hi! We're planning a wedding in February. Do you host?" },
            { from: "assistant", text: "Congratulations! Yes, we host weddings on the lawn and in the ballroom. May I ask a few details?" },
            { from: "customer", text: "Of course" },
            { from: "assistant", text: "Which dates are you considering, and roughly how many guests?" },
          ],
        },
      },
      {
        node: "Event brief",
        title: "Date, guests and budget, captured",
        body: "The assistant builds a complete event brief, so the events manager starts the call already knowing the details.",
        screen: { type: "checklist", title: "Event brief", rows: [["Event", "Wedding"], ["Dates", "14 to 16 Feb"], ["Guests", "180 to 220"], ["Budget", "Shared"]], badge: "Ready for events team" },
      },
      {
        node: "Events call",
        title: "A call with the events manager",
        body: "The couple picks a time and the call lands in the events manager's calendar with the brief attached.",
        screen: { type: "calendar", title: "Events manager", day: 1, time: 0, slot: "Tue · 10:00", note: "Call booked · brief sent to events manager" },
      },
      {
        node: "Guest care",
        title: "Before and after the stay",
        body: "Pre-arrival messages, add-ons and a review request after checkout, all over WhatsApp.",
        screen: {
          type: "notify",
          items: [
            { time: "2 days before", text: "Your suite is ready from 2 pm on Friday. Would you like an airport pickup?" },
            { time: "After checkout", text: "We hope you loved your stay! Would you share a quick review?" },
          ],
          done: "Guest journey complete",
        },
      },
    ],
  },
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
      { node: "Profiles", title: "Every branch on the map", body: "A complete Google Business Profile for each branch: categories, services, hours, photos and questions answered.", screen: { type: "map", query: "dentist near me", places: ["Smile Studio · Sector 17", "Smile Studio · Model Town", "Smile Studio · Civil Lines"] } },
      { node: "Pages", title: "A page for every branch and treatment", body: "Branch pages with address, directions and doctors; treatment pages that answer cost, duration and recovery questions.", screen: { type: "page", url: "smilestudio.in/root-canal", heading: "Root canal treatment, explained", chips: ["Cost", "Duration", "Recovery"], cta: "Book a consultation" } },
      { node: "Rankings", title: "In the local pack for treatment searches", body: "Branch and treatment pages compete for the exact searches patients make, area by area.", screen: { type: "serp", query: "root canal treatment model town", results: [{ title: "Root Canal Treatment in Model Town | Smile Studio", url: "smilestudio.in › root-canal", text: "Painless, single-visit root canals with clear pricing and same-week appointments.", ours: true }, { title: "What is a root canal?", url: "health.example › dental", text: "A guide to the procedure." }, { title: "Dentists in Model Town", url: "directory.example › dentists", text: "Compare clinics and reviews." }] } },
      { node: "AI answers", title: "Recommended when patients ask AI", body: "Consistent facts and genuine reviews make the clinic easy for AI assistants to recommend accurately.", screen: { type: "answer", question: "Which dental clinic in Model Town is good for root canal treatment?", answer: "Smile Studio in Model Town is well reviewed for root canal treatment, with clear pricing and appointments the same week.", sources: ["smilestudio.in", "Google Business Profile", "Health directory listing"] } },
      { node: "Reviews", title: "A steady flow of genuine reviews", body: "Every patient gets a simple review request after a visit, and every review gets a reply.", screen: { type: "notify", items: [{ time: "After visit", text: "Thank you for visiting Smile Studio today. Would you share a quick review of your experience?" }, { time: "Reply posted", text: "Thank you, Priya! We're glad the treatment went smoothly." }], done: "Review published" } },
    ],
  },
  // ---------- More examples: SEO, websites and automation ----------
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
      { node: "Service pages", title: "A page for every service and area", body: "Fast pages with real projects, materials and price bands, so each search lands somewhere specific.", screen: { type: "page", url: "studio.in/modular-kitchens", heading: "Modular kitchens, designed to fit", chips: ["L-shaped", "Island", "Parallel"], cta: "Book a design visit" } },
      { node: "Google", title: "Ranking for the searches that matter", body: "Service, locality and project pages compete for specific searches instead of one page chasing everything.", screen: { type: "serp", query: "modular kitchen designer near me", results: [{ title: "Modular Kitchens, Designed to Fit | Studio", url: "studio.in › modular-kitchens", text: "L-shaped, island and parallel kitchens with real projects, materials and price bands.", ours: true }, { title: "Kitchen design ideas for small homes", url: "magazine.example › kitchens", text: "Inspiration and layouts for compact kitchens." }, { title: "Interior designers in your area", url: "directory.example › interiors", text: "Compare local studios and reviews." }] } },
      { node: "AI answers", title: "Named when clients ask AI", body: "Clear, consistent facts about services, areas and process make the studio easy for AI assistants to recommend accurately.", screen: { type: "answer", question: "Who designs modular kitchens in Sector 70 Mohali?", answer: "Studio designs L-shaped, island and parallel modular kitchens across Mohali and Chandigarh, with a free design visit and fixed-price quotes.", sources: ["studio.in", "Google Business Profile", "Design directory listing"] } },
      { node: "Enquiry", title: "Enquiries that arrive ready", body: "The enquiry captures room, size, style and budget before the first call.", screen: { type: "chat", name: "Studio · Design desk", messages: [{ from: "customer", text: "Hi, I'm looking for a modular kitchen for a 3 BHK in Sector 70." }, { from: "assistant", text: "Lovely! Do you have a style in mind, and roughly what budget are you planning?" }, { from: "customer", text: "Modern, around mid-range." }, { from: "assistant", text: "Perfect. Shall I book a free design visit this weekend?" }] } },
    ],
  },
  {
    slug: "institute-course-seo",
    kind: "concept",
    categories: ["seo", "aeo"],
    title: "Rank every course for a coaching institute",
    summary: "A page for every course and batch, found in Maps and search, with counselling booked straight away.",
    client: "Concept for a multi-branch coaching institute",
    industry: "Education",
    art: "courses",
    challenge: "Students search for a specific exam, batch timing and branch, but the website lists everything on one page and enquiries arrive as unanswered calls.",
    services: ["Course and batch pages", "Local SEO for each branch", "AEO for exam questions", "Counselling booking"],
    solution: "A page per course with fees, batches and results policy; a Google Business Profile per branch; answers to common exam questions; and counselling sessions booked online.",
    outcomes: [],
    flow: [
      { node: "Course pages", title: "One page per course and batch", body: "Fees, timings, faculty and demo-class details on a fast page for each course.", screen: { type: "page", url: "institute.in/ielts-coaching", heading: "IELTS coaching, morning and evening batches", chips: ["Weekday", "Weekend", "Online"], cta: "Book a free demo class" } },
      { node: "Maps", title: "Every branch found locally", body: "Complete, accurate profiles for each branch, with photos, timings and reviews.", screen: { type: "map", query: "IELTS coaching near me", places: ["Institute · Sector 34", "Institute · Phase 7 Mohali", "Institute · Panchkula"] } },
      { node: "Search", title: "Ranking for exam and batch searches", body: "Course pages compete for the exact searches students type, not just the institute's name.", screen: { type: "serp", query: "IELTS weekend batch Chandigarh", results: [{ title: "IELTS Coaching: Weekend Batches | Institute", url: "institute.in › ielts-coaching", text: "Weekend and evening batches, small groups and a free demo class.", ours: true }, { title: "IELTS exam dates and fees", url: "exam-board.example › ielts", text: "Official test dates and registration." }, { title: "IELTS preparation tips", url: "blog.example › ielts", text: "How to prepare in eight weeks." }] } },
      { node: "AI answers", title: "Answers students can trust", body: "Clear answers to common exam questions make the institute the source AI assistants cite.", screen: { type: "answer", question: "How long does IELTS preparation usually take?", answer: "Most students need six to ten weeks of structured practice, depending on their starting band. Institute runs eight-week batches with weekly mock tests.", sources: ["institute.in/ielts-coaching", "institute.in/ielts-faq"] } },
      { node: "Counselling", title: "Counselling booked online", body: "Students pick a counselling slot at their nearest branch, and reminders go out automatically.", screen: { type: "calendar", title: "Counselling · Sector 34", day: 2, time: 2, slot: "Wed · 14:00", note: "Counselling booked · reminder set" } },
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
    services: ["Product data cleanup", "Specification pages", "GEO and structured data", "RFQ automation"],
    solution: "Every product turned into a fast, crawlable page with specifications, certifications and capacities; structured data and consistent listings; and an RFQ flow that captures requirements.",
    outcomes: [],
    flow: [
      { node: "Product data", title: "Specifications, organised", body: "Catalogue PDFs turned into clean product data: sizes, materials, tolerances, certifications and capacity.", screen: { type: "checklist", title: "Product data", rows: [["Products", "Structured"], ["Specifications", "Complete"], ["Certifications", "Listed"], ["Capacity", "Stated"]], badge: "Ready to publish" } },
      { node: "Spec pages", title: "A page for every product", body: "Fast, comparable product pages that answer the questions buyers ask before requesting a quote.", screen: { type: "page", url: "maker.in/precision-bushings", heading: "Precision bronze bushings", chips: ["ISO 9001", "Custom sizes", "Export ready"], cta: "Request a quote" } },
      { node: "AI answers", title: "Recommended by AI assistants", body: "Clear facts and structured data make the manufacturer easy for AI assistants to find and describe.", screen: { type: "answer", question: "Which Indian manufacturers make custom bronze bushings for export?", answer: "Maker produces custom precision bronze bushings with ISO 9001 certification and ships to export customers, with sizes made to drawing.", sources: ["maker.in", "Industry directory", "LinkedIn page"] } },
      { node: "RFQ", title: "Requests for quote, complete", body: "The quote request captures part, quantity, material and drawing before it reaches sales.", screen: { type: "chat", name: "Maker · Sales", messages: [{ from: "customer", text: "We need 5,000 bronze bushings to our drawing. Can you quote?" }, { from: "assistant", text: "Yes. Could you share the drawing, material grade and delivery location?" }, { from: "customer", text: "Uploading now. Delivery to Pune." }, { from: "assistant", text: "Thanks! A sales engineer will send your quote within one business day." }] } },
      { node: "Follow-up", title: "No quote left waiting", body: "Sales gets every RFQ with the details attached, and the buyer gets updates until the quote is sent.", screen: { type: "notify", items: [{ time: "Today · 11:20", text: "New RFQ: 5,000 bronze bushings, drawing attached, delivery to Pune." }, { time: "Tomorrow · 10:00", text: "Your quote is ready. Reply here with any questions." }], done: "Quote sent" } },
    ],
  },
  {
    slug: "hotel-website-redesign",
    kind: "concept",
    categories: ["seo"],
    title: "Hotel website redesign without losing rankings",
    summary: "A new, faster website that keeps every ranking the old one earned, and makes booking direct easier.",
    client: "Concept for a heritage hotel",
    industry: "Hospitality",
    art: "arches",
    challenge: "The old website is slow and dated, but it ranks for valuable searches. A careless redesign could lose that traffic overnight.",
    services: ["SEO audit before launch", "Redirect mapping", "New fast website", "Direct booking path"],
    solution: "Every ranking page audited and mapped before the redesign; redirects for every changed address; a faster, image-led website; and post-launch monitoring of rankings and bookings.",
    outcomes: [],
    flow: [
      { node: "Audit", title: "Know what ranks before changing anything", body: "Every page that brings visitors from search is listed, with its keywords and links.", screen: { type: "checklist", title: "Pre-launch audit", rows: [["Ranking pages", "Listed"], ["Backlinks", "Mapped"], ["Page speed", "Measured"], ["Tracking", "In place"]], badge: "Safe to redesign" } },
      { node: "Redirects", title: "Every old address has a new home", body: "Old addresses point to their new equivalents, so search engines and bookmarks never hit a dead end.", screen: { type: "checklist", title: "Redirect map", rows: [["/rooms.html", "/rooms"], ["/weddings.php", "/weddings"], ["/gallery-2019", "/gallery"], ["/contact-us", "/contact"]], badge: "All redirects tested" } },
      { node: "New site", title: "Faster, image-led, easier to book", body: "A new design that loads quickly on phones and puts dates and direct-booking perks up front.", screen: { type: "page", url: "heritagehotel.in", heading: "A palace stay, booked direct", chips: ["Best rate", "Breakfast", "Late checkout"], cta: "Check availability" } },
      { node: "Rankings kept", title: "Still found after launch", body: "Rankings are tracked daily after launch, and any drop is investigated straight away.", screen: { type: "serp", query: "heritage hotel wedding venue", results: [{ title: "Weddings at the Heritage Hotel | Palace Venue", url: "heritagehotel.in › weddings", text: "Lawns, courtyards and palace halls for weddings of every size.", ours: true }, { title: "Top wedding venues guide", url: "weddings.example › venues", text: "Compare venues by city and budget." }, { title: "Heritage hotels in Rajasthan", url: "travel.example › heritage", text: "A guide to palace stays." }] } },
      { node: "Bookings", title: "More guests booking direct", body: "Dates, rooms and offers in a short booking path, with confirmation and pre-arrival messages.", screen: { type: "calendar", title: "Room calendar", day: 4, time: 1, slot: "Fri · Check-in", note: "Direct booking confirmed" } },
    ],
  },
  {
    slug: "travel-quote-website",
    kind: "concept",
    categories: [],
    title: "Taxi and tour website with instant quotes",
    summary: "Route pages that rank, and a quote on WhatsApp within a minute of asking.",
    client: "Concept for a hill-station taxi and tour operator",
    industry: "Travel",
    art: "switchback",
    challenge: "Travellers compare three operators and book whoever quotes first, but quotes are sent by hand, hours later.",
    services: ["Route and package pages", "Instant quote form", "WhatsApp automation", "Review requests"],
    solution: "A page for every popular route and package; a short quote form that sends a price on WhatsApp straight away; booking confirmation; and a review request after the trip.",
    outcomes: [],
    flow: [
      { node: "Route pages", title: "A page for every route", body: "Distance, travel time, vehicles and inclusions for each popular route.", screen: { type: "page", url: "hilltaxi.in/chandigarh-to-manali", heading: "Chandigarh to Manali taxi", chips: ["Sedan", "SUV", "Tempo Traveller"], cta: "Get an instant quote" } },
      { node: "Search", title: "Found for the exact trip", body: "Route pages compete for the searches travellers type, one route at a time.", screen: { type: "serp", query: "chandigarh to manali taxi", results: [{ title: "Chandigarh to Manali Taxi: Fixed Fares | Hill Taxi", url: "hilltaxi.in › chandigarh-to-manali", text: "Sedan, SUV and Tempo Traveller with fixed fares and verified drivers.", ours: true }, { title: "Manali travel guide", url: "travel.example › manali", text: "When to go and what to see." }, { title: "Bus tickets to Manali", url: "bus.example › manali", text: "Compare overnight buses." }] } },
      { node: "Instant quote", title: "A price on WhatsApp in a minute", body: "Pickup, drop, date and vehicle captured, and a quote sent straight away.", screen: { type: "chat", name: "Hill Taxi", messages: [{ from: "customer", text: "Need an SUV from Chandigarh to Manali on 12 Dec, 4 people." }, { from: "assistant", text: "Sure! SUV, Chandigarh to Manali, 12 Dec: fixed fare including tolls and driver allowance. Shall I hold it for you?" }, { from: "customer", text: "Yes please" }, { from: "assistant", text: "Done. Your booking is confirmed. Driver details will come the evening before." }] } },
      { node: "Booking", title: "Confirmed and reminded", body: "The booking lands in the dispatch calendar, and the traveller gets driver details the evening before.", screen: { type: "calendar", title: "Dispatch calendar", day: 3, time: 0, slot: "Thu · 06:00 pickup", note: "SUV assigned · driver details sent" } },
      { node: "Reviews", title: "A review after every trip", body: "A friendly review request after the trip builds the reviews that win the next comparison.", screen: { type: "notify", items: [{ time: "Day after trip", text: "Hope you enjoyed Manali! Would you leave a quick review for your driver?" }], done: "Review received" } },
    ],
  },
  {
    slug: "dealer-lead-routing",
    kind: "concept",
    categories: [],
    title: "Lead routing for a home improvement dealer",
    summary: "Every enquiry qualified, assigned to the right salesperson and followed up until a measurement visit is booked.",
    client: "Concept for a doors, windows and flooring dealer",
    industry: "Home Improvement",
    art: "lattice",
    challenge: "Enquiries from ads, calls and walk-ins land in different places; some are followed up twice, others never.",
    services: ["Lead capture from every channel", "WhatsApp qualification", "CRM routing", "Follow-up sequences"],
    solution: "All enquiries flow into one CRM, are qualified on WhatsApp by product and project stage, assigned by area and product to a salesperson, and followed up automatically until a site measurement is booked.",
    outcomes: [],
    flow: [
      { node: "Ads", title: "Campaigns by product", body: "Separate campaigns for doors, windows and flooring, each with its own landing page.", screen: { type: "ad", brand: "Dealer Home Solutions", headline: "uPVC windows that keep out dust and noise. Free site measurement.", cta: "Book a free measurement" } },
      { node: "Qualify", title: "The right questions, instantly", body: "Product, project stage, area and timeline are captured on WhatsApp before a salesperson calls.", screen: { type: "chat", name: "Dealer · Enquiries", messages: [{ from: "customer", text: "Need a quote for windows for a new house." }, { from: "assistant", text: "Happy to help! How many windows roughly, and is the house under construction or ready?" }, { from: "customer", text: "About 14, construction is at plastering stage." }, { from: "assistant", text: "Perfect timing. Which area is the site in?" }] } },
      { node: "Lead profile", title: "A complete lead profile", body: "Every enquiry arrives in the CRM with the details sales needs.", screen: { type: "checklist", title: "Lead profile", rows: [["Product", "uPVC windows"], ["Quantity", "About 14"], ["Stage", "Plastering"], ["Area", "Kharar"]], badge: "Hot lead" } },
      { node: "Routing", title: "Assigned to the right person", body: "Leads are assigned by area and product, and the salesperson is notified straight away.", screen: { type: "notify", items: [{ time: "Now", text: "New hot lead assigned to you: uPVC windows, 14 units, Kharar, plastering stage." }, { time: "In 2 hours", text: "Reminder: call the Kharar windows lead if you haven't yet." }], done: "Lead contacted" } },
      { node: "Measurement", title: "Site measurement booked", body: "The customer picks a slot for a free measurement, and reminders cut no-shows.", screen: { type: "calendar", title: "Measurement visits", day: 5, time: 2, slot: "Sat · 14:00", note: "Measurement booked · reminder set" } },
    ],
  },
  {
    slug: "advisory-nurture",
    kind: "concept",
    categories: ["aeo", "geo"],
    title: "Trusted enquiries for a financial advisory firm",
    summary: "Clear answers that earn trust, a confidential enquiry flow and patient follow-up for long decisions.",
    client: "Concept for a debt and loan advisory firm",
    industry: "Financial Services",
    art: "ledger",
    challenge: "Prospects research for weeks, worry about privacy and rarely enquire on a first visit.",
    services: ["Answer-first content", "AEO and GEO", "Confidential enquiry flow", "Nurture sequences"],
    solution: "Plain-language explainers for high-intent questions, a short confidential enquiry flow, consultations booked online, and helpful follow-up that respects privacy.",
    outcomes: [],
    flow: [
      { node: "AI answers", title: "The clear answer, with your name on it", body: "Explainers written for the questions prospects ask Google and AI assistants.", screen: { type: "answer", question: "What is a one-time settlement for a business loan?", answer: "A one-time settlement (OTS) is an agreement with the lender to close a loan by paying an agreed amount. Advisory explains eligibility, documents and steps in its OTS guide.", sources: ["advisory.in/ots-guide", "advisory.in/faq"] } },
      { node: "Explainer", title: "Pages that answer before they sell", body: "Process, documents, timelines and fees approach explained plainly, with a quiet call to action.", screen: { type: "page", url: "advisory.in/ots-guide", heading: "One-time settlement, explained", chips: ["Eligibility", "Documents", "Timeline"], cta: "Book a confidential call" } },
      { node: "Credibility", title: "Expertise that search engines and AI can verify", body: "Author profiles, credentials, sources and consistent firm details, important for financial topics.", screen: { type: "checklist", title: "Trust signals", rows: [["Author bios", "Published"], ["Credentials", "Listed"], ["Sources", "Cited"], ["Firm details", "Consistent"]], badge: "Ready to be cited" } },
      { node: "Rankings", title: "Ranking for high-intent questions", body: "Explainer pages compete for the specific questions prospects search before they look for an advisor.", screen: { type: "serp", query: "one time settlement business loan process", results: [{ title: "One-Time Settlement, Explained: Eligibility and Steps | Advisory", url: "advisory.in › ots-guide", text: "Who qualifies, which documents you need and how long the process takes.", ours: true }, { title: "Business loan restructuring", url: "bank.example › loans", text: "Options for existing borrowers." }, { title: "OTS rules", url: "news.example › finance", text: "Recent changes explained." }] } },
      { node: "Enquiries", title: "Enquiries from people who already trust you", body: "Visitors who found the answer on Google or in AI book a consultation from the same page.", screen: { type: "calendar", title: "Consultations", day: 1, time: 3, slot: "Tue · 16:00", note: "Booked from the OTS guide" } },
    ],
  },
];

/**
 * Live client projects are kept in the data but hidden from the site while this is false.
 * Set it to true to show them again on the Work page, the homepage and the city pages.
 */
export const showLiveProjects = false;

export const projects = () => (showLiveProjects ? work.filter((w) => w.kind === "project") : []);
/** Published examples: concepts tagged with at least one search pillar. */
export const concepts = () => work.filter((w) => w.kind === "concept" && (w.categories?.length ?? 0) > 0);

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}

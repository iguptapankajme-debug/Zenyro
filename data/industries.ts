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
    metaTitle: "Real Estate Lead Generation & Automation Agency",
    metaDescription:
      "Real estate lead generation for developers and brokers: project launch campaigns, site-visit booking, WhatsApp follow-up and AI lead qualification.",
    headline: "From enquiry to site visit, faster.",
    intro:
      "Property buyers enquire with several projects at once and remember the one that called back first. We help developers and brokers reply instantly, qualify by budget and timeline, and fill the site-visit calendar with serious buyers.",
    challenges: [
      "Portal leads are shared with competitors and go cold within hours.",
      "Sales teams waste site visits on buyers outside budget.",
      "Launch campaigns spike, then the pipeline goes quiet.",
      "No clear view of which channel produces bookings, not just enquiries.",
    ],
    solutions: [
      { title: "Project launch funnels", body: "Dedicated landing pages per project with floor plans, price bands and location highlights, paired with Meta and Google campaigns." },
      { title: "Instant WhatsApp qualification", body: "Every enquiry gets a reply within a minute, with questions on budget, configuration, timeline and financing." },
      { title: "Site-visit booking", body: "Qualified buyers pick a slot directly; reminders reduce no-shows." },
      { title: "Nurture for long cycles", body: "Construction updates, offers and possession news keep warm buyers engaged for months." },
    ],
    system: ["Meta and Google ads per project", "Project landing page", "WhatsApp AI qualification", "CRM with sales assignment", "Site-visit calendar and reminders"],
    channels: ["Meta Ads", "Google Search", "WhatsApp", "Property portals", "CRM"],
    faqs: [
      { q: "Can you work with leads from property portals?", a: "Yes. Portal leads can be pulled into the same qualification and follow-up flow, so they get the same instant response as your own campaign leads." },
      { q: "Do you follow RERA advertising rules?", a: "Campaigns and pages display RERA registration details where required, and we avoid claims that are not supported by the approved project documents." },
    ],
    services: ["performance-marketing", "ai-automation", "crm-automation"],
    search: {
      title: "Real Estate SEO & AI Search Visibility",
      body: "Buyers research locations, builders and price bands for months before they enquire. We make each project, locality and configuration easy to find in search, clearly answered, and accurately described when buyers ask AI assistants for options.",
      points: ["Project and locality pages built on real data, with RERA details where required", "Answers to buyer questions on possession, loans and amenities", "Consistent developer and project facts across portals and profiles"],
    },
  },
  {
    slug: "hospitality",
    name: "Luxury Hotels & Hospitality",
    short: "Boutique hotels, resorts, venues and fine dining",
    art: "arches",
    metaTitle: "Hotel Marketing Agency: Direct Bookings & Event Enquiries",
    metaDescription:
      "Marketing and automation for hotels, resorts and venues: grow direct bookings, capture wedding and event enquiries and answer guests instantly on WhatsApp.",
    headline: "More direct bookings. Fewer missed enquiries.",
    intro:
      "Online travel agencies take a large commission on every room, and event enquiries often arrive at night when the sales office is closed. We help hotels and venues grow direct revenue and respond to every guest within minutes.",
    challenges: [
      "Heavy dependence on OTA bookings and their commissions.",
      "Wedding and corporate event enquiries handled slowly by email.",
      "Guests asking the same questions on Instagram and WhatsApp.",
      "A website that looks less premium than the property itself.",
    ],
    solutions: [
      { title: "Direct booking website", body: "A fast, image-led site with a clear booking path and offers that give guests a reason to book direct." },
      { title: "Event enquiry engine", body: "Dedicated pages for weddings and corporate events, with an assistant that captures date, guest count and budget, then books a call with the events team." },
      { title: "Guest messaging assistant", body: "Answers questions on rooms, amenities, policies and directions across WhatsApp and Instagram, any time of day." },
      { title: "Remarketing", body: "Campaigns that bring back visitors who checked dates but did not book." },
    ],
    system: ["Direct booking website", "Meta and Google remarketing", "Event enquiry assistant", "Sales office CRM", "Guest messaging on WhatsApp"],
    channels: ["Google Hotel Ads", "Meta Ads", "Instagram", "WhatsApp", "Booking engine"],
    faqs: [
      { q: "Do you replace our booking engine?", a: "No. We integrate with your existing booking engine and channel manager, and improve the website and campaigns that send guests to it." },
      { q: "Can the assistant handle multiple languages?", a: "Yes. Guest assistants can reply in English, Hindi and other major languages, and hand over to staff for special requests." },
    ],
    services: ["website-development", "performance-marketing", "ai-automation"],
    search: {
      title: "Hotel SEO & Direct Booking Growth",
      body: "Guests compare on search, maps and AI travel answers before they book. We strengthen your own website and listings so more of that research ends in a direct booking or event enquiry.",
      points: ["Room, venue and destination pages that rank for real stay and event searches", "Accurate, consistent property facts across maps, OTAs and travel sources", "Wedding and event content that answers planners’ questions directly"],
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare & Clinics",
    short: "Clinics, diagnostic centres, dental and aesthetics",
    art: "pulse",
    metaTitle: "Healthcare Marketing & Patient Appointment Automation",
    metaDescription:
      "Ethical healthcare marketing for clinics: local SEO, appointment booking automation, WhatsApp reminders and patient enquiry handling that protects privacy.",
    headline: "Full appointment books, handled with care.",
    intro:
      "Patients choose clinics they can find easily, trust quickly and book without friction. We help clinics appear in local search, answer enquiries promptly and reduce no-shows, while keeping marketing ethical and patient data protected.",
    challenges: [
      "Front-desk staff overwhelmed by calls and WhatsApp messages.",
      "Missed calls after hours become lost appointments.",
      "No-shows leave expensive gaps in the doctor's schedule.",
      "Strict rules on what healthcare advertising can claim.",
    ],
    solutions: [
      { title: "Local search presence", body: "Optimised Google Business Profiles for each location and doctor, with accurate services, timings and reviews." },
      { title: "Appointment assistant", body: "Books, reschedules and confirms appointments over WhatsApp and phone, and routes clinical questions to staff." },
      { title: "Reminders and recalls", body: "Automated reminders before visits and recall messages for follow-up care." },
      { title: "Compliant campaigns", body: "Ads and pages that inform without making prohibited claims or showing misleading before-and-after content." },
    ],
    system: ["Google Business Profiles", "Treatment pages", "WhatsApp booking assistant", "Clinic management integration", "Reminder and recall flows"],
    channels: ["Google Maps", "Google Search", "WhatsApp", "Meta Ads", "Clinic software"],
    faqs: [
      { q: "Does the AI give medical advice?", a: "No. Assistants handle bookings, timings, directions and general information approved by the clinic. Anything clinical is passed to qualified staff." },
      { q: "How is patient data protected?", a: "We collect only what is needed for booking, store it in your own systems, restrict access, and follow India's Digital Personal Data Protection Act requirements." },
    ],
    services: ["local-seo", "ai-automation", "website-development"],
    search: {
      title: "Healthcare Search Visibility",
      body: "Patients search symptoms, treatments and nearby clinics. We help clinics appear for the right local searches with accurate, responsibly written information reviewed by qualified clinicians.",
      points: ["Clinician-reviewed treatment and condition pages", "Doctor and location profiles kept consistent across maps and directories", "Clear answers to common patient questions on cost, preparation and recovery"],
    },
  },
  {
    slug: "interior-design",
    name: "Interior Design & Premium Retail",
    short: "Interior studios, furniture, lighting and luxury showrooms",
    art: "planes",
    metaTitle: "Interior Design Lead Generation & Showroom Marketing",
    metaDescription:
      "Lead generation for interior designers and premium showrooms: portfolio-led websites, high-intent ad campaigns and consultation booking with budget qualification.",
    headline: "Attract clients who value design.",
    intro:
      "Premium design businesses lose time on enquiries that were never a fit. We build portfolio-led websites and campaigns that attract the right homeowners and businesses, then qualify scope and budget before the first meeting.",
    challenges: [
      "Many enquiries are price shoppers outside your budget range.",
      "The portfolio is on Instagram, not organised to sell.",
      "Showroom footfall is hard to link to marketing spend.",
      "Long decision cycles with several family members involved.",
    ],
    solutions: [
      { title: "Portfolio website", body: "Projects presented as stories with scope, timeline and style, organised so visitors can find work like theirs." },
      { title: "Budget-qualified enquiries", body: "Forms and assistants ask property type, area, scope and budget band before booking a consultation." },
      { title: "Showroom visit tracking", body: "Offers and booking links that connect store visits back to the campaign that produced them." },
      { title: "Nurture content", body: "Material guides, project walkthroughs and design ideas sent over time to keep your studio in mind." },
    ],
    system: ["Portfolio website", "Meta and Pinterest campaigns", "Qualification assistant", "Consultation booking", "CRM nurture"],
    channels: ["Instagram", "Meta Ads", "Google Search", "Pinterest", "WhatsApp"],
    faqs: [
      { q: "Can you work with the photos we already have?", a: "Yes. We curate and present existing project photography and advise where a professional shoot would make the biggest difference." },
      { q: "How do you filter out low-budget enquiries?", a: "We state starting budgets or typical project ranges clearly and ask for scope and budget before booking. This usually reduces enquiry volume slightly but improves meeting quality." },
    ],
    services: ["website-development", "lead-generation", "performance-marketing"],
    search: {
      title: "Interior Design & Premium Retail Search Growth",
      body: "Homeowners search for ideas, costs and studios long before they visit. We turn your portfolio, materials and expertise into pages and answers that bring the right clients to your studio or showroom.",
      points: ["Project and style pages built from your real portfolio", "Cost, timeline and material explainers that answer buying questions", "Showroom and brand information kept consistent for local and AI search"],
    },
  },
  {
    slug: "education",
    name: "Education & Professional Services",
    short: "Institutes, coaching, consultancies and firms",
    art: "lattice",
    metaTitle: "Education & Professional Services Marketing Agency",
    metaDescription:
      "Admissions and client acquisition for institutes, coaching centres, consultancies and professional firms: counselling-call booking, nurture sequences and lead scoring.",
    headline: "Turn interest into enrolments and engagements.",
    intro:
      "Students and clients research for weeks before deciding. We make sure every enquiry receives a fast, helpful reply, a counselling or consultation slot, and useful follow-ups until they are ready to commit.",
    challenges: [
      "Admission seasons create enquiry spikes the team cannot handle.",
      "Counsellors call leads who are not eligible or not serious.",
      "Webinars and events produce sign-ups but few conversions.",
      "Professional firms rely only on referrals.",
    ],
    solutions: [
      { title: "Course and service pages", body: "Clear pages for each program or service with eligibility, outcomes, fees and next steps." },
      { title: "Eligibility screening", body: "Assistants check eligibility, interests and timeline, then book a counselling or consultation call." },
      { title: "Webinar and event funnels", body: "Registration, reminders, replay delivery and follow-up handled automatically." },
      { title: "Lead scoring", body: "Counsellors see the most promising enquiries first, based on fit and engagement." },
    ],
    system: ["Program landing pages", "Google and Meta campaigns", "Eligibility assistant", "Counselling call booking", "Nurture sequences"],
    channels: ["Google Search", "Meta Ads", "YouTube", "WhatsApp", "Email"],
    faqs: [
      { q: "Can you handle seasonal admission peaks?", a: "Yes. Automated replies and screening scale instantly, so peak volume does not depend on hiring temporary staff." },
      { q: "Do you make placement or result claims in ads?", a: "Only if you can substantiate them with documented data. We avoid unverifiable claims, which also protects you from platform and regulatory issues." },
    ],
    services: ["lead-generation", "ai-automation", "crm-automation"],
    search: {
      title: "Education Search Visibility",
      body: "Students and parents compare programs, eligibility and outcomes across search and AI assistants. We make your programs clear, comparable and correctly described wherever they research.",
      points: ["Program pages with eligibility, fees and outcomes stated plainly", "Answers to admission and career questions written with your faculty", "Consistent institution facts across directories and education portals"],
    },
  },
  {
    slug: "home-improvement",
    name: "Home Improvement & Building Materials",
    short: "Tiles, sanitaryware, modular kitchens, solar and contractors",
    art: "courses",
    metaTitle: "Lead Generation for Building Materials & Home Improvement",
    metaDescription:
      "Lead generation for building materials brands, dealers and contractors: local campaigns, dealer lead routing, quote automation and showroom visit booking.",
    headline: "Win the project before the tender.",
    intro:
      "Home improvement buyers compare quotes from several suppliers in a short window. We help manufacturers, dealers and contractors capture these projects early, route leads to the right dealer or team, and send quotes faster than competitors.",
    challenges: [
      "Leads arrive without project size or location detail.",
      "Manufacturers struggle to pass leads to dealers and track the outcome.",
      "Quotes take days because information is incomplete.",
      "Architects and contractors are hard to reach with ads.",
    ],
    solutions: [
      { title: "Local demand campaigns", body: "Search and Meta campaigns targeted by city and project type, pointing to product-specific pages." },
      { title: "Dealer lead routing", body: "Leads assigned automatically to the nearest dealer, with follow-up tracking and reminders." },
      { title: "Quote automation", body: "Assistants collect measurements, photos and preferences so your team can send accurate quotes quickly." },
      { title: "Trade programs", body: "Dedicated pages and nurture for architects, builders and contractors." },
    ],
    system: ["City and product campaigns", "Product landing pages", "Quote request assistant", "Dealer routing in CRM", "Outcome tracking"],
    channels: ["Google Search", "Meta Ads", "Google Maps", "WhatsApp", "Dealer CRM"],
    faqs: [
      { q: "Can leads be shared with our dealer network?", a: "Yes. We route leads by location and product to dealers, notify them instantly and track whether they followed up." },
      { q: "Do you work with B2B trade buyers too?", a: "Yes. We build separate journeys for homeowners and for trade buyers such as architects and contractors, because their needs and timelines differ." },
    ],
    services: ["lead-generation", "crm-automation", "local-seo"],
    search: {
      title: "Home Improvement & Building Materials SEO",
      body: "Homeowners and contractors search product types, specifications and local dealers. We connect product information, dealer locations and buying guides so searches turn into quote requests.",
      points: ["Product and specification pages structured for comparison searches", "Dealer and showroom location pages with genuine local detail", "Buying guides that answer installation and maintenance questions"],
    },
  },
  {
    slug: "travel-tourism",
    name: "Travel, Taxi & Tour Operators",
    short: "Taxi services, tour operators, homestays and travel planners",
    art: "switchback",
    metaTitle: "Travel & Taxi Marketing Agency: Bookings from Search & WhatsApp",
    metaDescription:
      "Marketing for taxi services, tour operators and travel planners: route pages that rank, instant WhatsApp quotes, Google Maps visibility and AI search answers.",
    headline: "Booked before they call the next operator.",
    intro:
      "Travellers search a route, open three operators and book whoever quotes first and sounds reliable. We build travel businesses a fast site with route and package pages, instant quotes on WhatsApp, and the reviews and map presence that win the comparison.",
    challenges: [
      "Bookings depend on aggregators and travel portals that take a cut and own the customer.",
      "Quote requests arrive at night or on the road, and are answered hours later.",
      "Seasonal demand: snow, holidays and wedding seasons spike, then the phone goes quiet.",
      "Few route, destination and package pages, so searches for specific trips go to competitors.",
    ],
    solutions: [
      { title: "Route and package pages", body: "A page for every popular route and package, with distance, travel time, vehicle options and what is included, written to answer the questions travellers actually search." },
      { title: "Instant quote on WhatsApp", body: "Pickup, drop, date and vehicle captured in a short form or chat, with a quote sent straight away and the booking confirmed by your team." },
      { title: "Maps and reviews", body: "A complete Google Business Profile, photos of real vehicles and drivers, and a simple way for happy travellers to leave a review after the trip." },
      { title: "Season-ready campaigns", body: "Search and social campaigns timed to snow, holiday and wedding seasons, switched off when demand is already full." },
    ],
    system: ["Route and package pages", "Google Business Profile and reviews", "Instant quote form and WhatsApp", "Booking confirmation and reminders", "Post-trip review request"],
    channels: ["Google Search", "Google Maps", "WhatsApp", "Instagram", "YouTube"],
    faqs: [
      { q: "Can you help us get fewer bookings through aggregators?", a: "Yes. We grow the share of bookings that come directly through your own site, Google profile and WhatsApp, so you keep the margin and the customer relationship. Aggregators can still fill gaps." },
      { q: "We already have a website. Do we need a new one?", a: "Not always. We start by checking speed, route coverage and the quote flow. Often adding route pages and an instant quote is enough to make a difference." },
    ],
    services: ["local-seo", "website-development", "ai-automation"],
    search: {
      title: "Travel SEO & AI Search Visibility",
      body: "Travellers ask Google and AI assistants things like \"taxi from Chandigarh to Manali\" or \"best 4-day Himachal itinerary\". We make your routes, packages and prices clear enough to be found, quoted and recommended.",
      points: ["Route pages with distance, time, vehicles and inclusions", "Destination guides that answer seasonal and road-condition questions", "Consistent business details across Google, directories and social profiles"],
    },
  },
  {
    slug: "financial-services",
    name: "Financial & Advisory Services",
    short: "Loan and debt advisors, auction platforms, CA and consulting firms",
    art: "ledger",
    metaTitle: "Marketing for Financial & Advisory Firms: Trusted Leads",
    metaDescription:
      "Lead generation for financial and advisory firms: credible websites, SEO and AI search for high-intent questions, confidential enquiry handling and qualification.",
    headline: "Trusted enough to call. Clear enough to choose.",
    intro:
      "People looking for financial help are anxious, careful and comparing options. They need clear answers and confidence before they share their details. We build advisory firms a credible presence, answer the questions they search, and handle every enquiry quickly and discreetly.",
    challenges: [
      "Prospects research for weeks and rarely enquire on a first visit.",
      "Generic pages that don't explain processes, timelines or fees in plain language.",
      "Enquiries that are urgent for the client but sit in an inbox.",
      "Advertising rules and sensitivity limit what can be promised or shown.",
    ],
    solutions: [
      { title: "Answer-first content", body: "Clear explainers on processes, eligibility, documents and timelines, written for the questions prospects ask Google and AI assistants." },
      { title: "Confidential enquiry flow", body: "A short, reassuring form or WhatsApp chat that captures the essentials and books a consultation, with the details kept private." },
      { title: "Credibility everywhere", body: "Team credentials, process, fees approach and real, permitted client feedback presented consistently across the site and profiles." },
      { title: "Searchable tools and listings", body: "For platforms such as auction or listing sites: fast, filterable pages that search engines can crawl and users can share." },
    ],
    system: ["Credible website with process and FAQs", "SEO and AI search content", "Confidential enquiry form and WhatsApp", "Qualification and consultation booking", "Nurture for long decisions"],
    channels: ["Google Search", "AI assistants", "WhatsApp", "LinkedIn", "Email"],
    faqs: [
      { q: "Can you market financial services responsibly?", a: "Yes. We avoid guarantees and claims that cannot be supported, include required disclosures, and keep testimonials to what clients have agreed to share." },
      { q: "Our clients value privacy. How do you handle enquiries?", a: "Forms collect only what is needed, data goes to your own accounts, and automated replies never repeat sensitive details back in public channels." },
    ],
    services: ["seo", "geo", "lead-generation"],
    search: {
      title: "Financial Services SEO & AI Search Visibility",
      body: "Prospects ask detailed questions before they trust anyone with their situation. We make your expertise show up as the clear, credible answer in search results and AI assistants.",
      points: ["Explainers for high-intent questions, reviewed for accuracy", "Author and firm credentials marked up clearly", "Consistent firm details across directories, profiles and the website"],
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

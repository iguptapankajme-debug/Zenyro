/**
 * "Service in city" pages for the Tricity, where Zenyro is based: the searches business owners
 * make when they are ready to hire ("SEO company in Chandigarh"). Each entry has its own local
 * angle and examples; the service details (what's included) come from data/services.ts.
 */
export type LocalService = {
  city: string; // location slug in data/locations.ts
  service: string; // service slug in data/services.ts
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Why this service works differently in this city. */
  angle: string[];
  /** Example local searches or prompts this service targets. */
  searches: string[];
  faq: { q: string; a: string };
};

export const localServices: LocalService[] = [
  // ---------- Chandigarh ----------
  {
    city: "chandigarh",
    service: "seo",
    h1: "SEO company in Chandigarh, built for Google and AI search.",
    metaTitle: "SEO Company in Chandigarh: Local SEO, AEO & GEO",
    metaDescription:
      "Chandigarh SEO from a local team: sector-level local SEO, Google Business Profile, technical SEO and content, plus AEO and GEO so AI assistants recommend you.",
    intro:
      "Most Chandigarh searches include a sector, a landmark or 'near me'. We build the pages, profiles and answers that win those searches, and make sure AI assistants describe your business accurately too.",
    angle: [
      "Chandigarh's sector grid makes local SEO unusually precise. Customers search 'physiotherapist Sector 35' or 'café near Sector 17 plaza', so a single generic page rarely ranks. We build location and service pages that match how people actually search here.",
      "Competition is high in healthcare, education, real estate and home interiors, and many competitors still have slow sites and incomplete profiles. Technical fixes, genuine local content and steady reviews usually move results within months.",
      "We report weekly in plain language: rankings for the searches that matter, calls and directions from Maps, and enquiries from organic search.",
    ],
    searches: ["SEO company in Chandigarh", "dentist Sector 22 Chandigarh", "best coaching institute in Sector 34", "interior designer Chandigarh near me"],
    faq: { q: "How much does SEO cost in Chandigarh?", a: "It depends on how competitive your searches are and how much content and technical work is needed. After a free audit we give a fixed monthly scope and quote, with no long lock-in." },
  },
  {
    city: "chandigarh",
    service: "website-development",
    h1: "Website development in Chandigarh that turns visits into enquiries.",
    metaTitle: "Website Development Company in Chandigarh: Fast, Conversion-Focused",
    metaDescription:
      "Custom website development in Chandigarh: fast Next.js sites that load in a blink on mobile data, rank well and turn visitors into enquiries on WhatsApp and forms.",
    intro:
      "Your website is where Chandigarh customers decide whether to call you or the next result. We design and build fast, premium sites that answer their questions and make enquiring effortless.",
    angle: [
      "Chandigarh buyers expect quality. A clinic, school or showroom with a dated, slow website loses trust before the first call. We design sites that look as good as your business and load quickly on mid-range phones.",
      "Every site is built for search from day one: clean structure, local pages, schema markup and Core Web Vitals that pass, so it supports SEO rather than holding it back.",
      "Enquiries go straight to WhatsApp, email or your CRM with the details already captured, so your team can reply in minutes.",
    ],
    searches: ["website development company Chandigarh", "website designer near me Chandigarh", "Next.js developer Chandigarh", "website for clinic in Chandigarh"],
    faq: { q: "How long does a website take?", a: "Most business websites go live in three to six weeks, depending on the number of pages and how quickly content is ready. Larger builds are planned in phases." },
  },
  {
    city: "chandigarh",
    service: "performance-marketing",
    h1: "Google and Meta ads in Chandigarh, measured on customers.",
    metaTitle: "Performance Marketing Agency in Chandigarh: Google & Meta Ads",
    metaDescription:
      "Google Ads and Meta Ads management in Chandigarh, connected to WhatsApp qualification and CRM, so you pay for customers, not just clicks and form fills.",
    intro:
      "Ads in the Tricity can fill your inbox with leads that never answer the phone. We connect every campaign to instant follow-up and qualification, and judge it on cost per customer.",
    angle: [
      "Tricity targeting is small and specific: a few sectors, nearby towns and the right age and interest groups. Tight geography and clear offers keep spend focused on people who can actually visit or buy.",
      "We pair each campaign with a landing page built for it and an instant WhatsApp reply, because the first response decides most local sales.",
      "Real outcomes, such as appointments, site visits and sales, are fed back to Google and Meta so the platforms learn to find more of the right people.",
    ],
    searches: ["Google Ads agency Chandigarh", "Facebook ads expert Chandigarh", "lead generation for real estate Chandigarh", "PPC company in Chandigarh"],
    faq: { q: "What budget do we need for ads in Chandigarh?", a: "Many local businesses start with a modest monthly spend and grow it once cost per customer is clear. We recommend a starting budget after reviewing your market and goals." },
  },
  {
    city: "chandigarh",
    service: "social-media-marketing",
    h1: "Social media marketing in Chandigarh that brings real enquiries.",
    metaTitle: "Social Media Marketing Agency in Chandigarh: Instagram, Facebook & YouTube",
    metaDescription:
      "Social media marketing in Chandigarh: content strategy, Reels and short video, Instagram, Facebook, LinkedIn and YouTube, and paid social, measured on enquiries.",
    intro:
      "Chandigarh is one of India's most Instagram-active cities. We create content that reflects your business honestly, grow the right local audience and connect every DM to a fast reply.",
    angle: [
      "Local audiences respond to real people and places: your team, your space, your customers' results (with permission). We plan and shoot content that feels like Chandigarh, not stock templates.",
      "Reels and short video drive discovery, but enquiries come from clear offers and fast responses. Every profile is connected to WhatsApp and tracked to leads.",
      "Paid social amplifies the posts that are already working, targeted to the sectors and nearby towns you actually serve.",
    ],
    searches: ["social media agency Chandigarh", "Instagram marketing Chandigarh", "Reels video shoot Chandigarh", "social media manager for clinic Chandigarh"],
    faq: { q: "Do you shoot content in Chandigarh?", a: "Yes. Being local, we can plan and shoot at your premises, and combine that with content your team captures day to day." },
  },
  {
    city: "chandigarh",
    service: "ai-automation",
    h1: "WhatsApp and AI automation for Chandigarh businesses.",
    metaTitle: "AI Automation & WhatsApp Chatbot Agency in Chandigarh",
    metaDescription:
      "WhatsApp automation and AI assistants for Chandigarh businesses: instant replies, lead qualification, appointment booking, reminders and CRM sync.",
    intro:
      "Your customers message on WhatsApp at all hours. We set up assistants that reply instantly, ask the right questions, book appointments and hand serious enquiries to your team.",
    angle: [
      "Chandigarh clinics, institutes and showrooms often miss evening and weekend enquiries. An assistant that answers in seconds, in English, Hindi or Punjabi, keeps those customers from moving on.",
      "Automation follows your rules: what it can answer, when it hands over to a person, and how bookings land in your calendar or software.",
      "Everything runs on your own WhatsApp Business account and CRM, documented, so you stay in control.",
    ],
    searches: ["WhatsApp chatbot Chandigarh", "AI automation company Chandigarh", "appointment booking automation clinic", "CRM integration Chandigarh"],
    faq: { q: "Will customers know they're talking to an assistant?", a: "We recommend being upfront. Customers mainly care about a fast, accurate answer, and the assistant hands over to a person whenever it should." },
  },
  // ---------- Mohali ----------
  {
    city: "mohali",
    service: "seo",
    h1: "SEO company in Mohali for search, Maps and AI answers.",
    metaTitle: "SEO Company in Mohali: Local SEO, Technical SEO & GEO",
    metaDescription:
      "SEO in Mohali from a Tricity team: local SEO for each sector and branch, technical SEO, content and GEO so AI assistants recommend your business.",
    intro:
      "Mohali's newer sectors and Aerocity belt are full of customers who don't yet know local names. We make sure they find you first in Google, Maps and AI answers.",
    angle: [
      "New residents search by sector and landmark: 'school near Sector 70', 'hospital near airport road'. We build pages and profiles for the exact areas you serve, not just 'Mohali' in general.",
      "Healthcare, education and real estate are crowded here. Clear service pages, structured data and genuine reviews make the difference when competitors look alike.",
      "For IT and service companies in Mohali, we also run B2B SEO aimed at buyers in India and abroad.",
    ],
    searches: ["SEO company in Mohali", "hospital near Mohali airport road", "IT company SEO India", "school in Sector 70 Mohali"],
    faq: { q: "Can you do SEO for a Mohali IT company targeting overseas clients?", a: "Yes. We combine technical SEO, service and case-study pages written for international buyers, and GEO so AI assistants can find and describe your services." },
  },
  {
    city: "mohali",
    service: "website-development",
    h1: "Website development in Mohali, fast and built to convert.",
    metaTitle: "Website Development Company in Mohali: Custom, Fast, SEO-Ready",
    metaDescription:
      "Custom website development in Mohali for hospitals, institutes, real estate and service companies: fast, accessible, SEO-ready sites connected to WhatsApp and CRM.",
    intro:
      "From project launch pages to hospital and institute websites, we build Mohali businesses sites that load fast, rank well and turn visitors into enquiries.",
    angle: [
      "Real estate projects in Mohali need launch pages with floor plans, price bands and RERA details that load instantly from an ad. We build them to be clear, fast and compliant.",
      "Hospitals and institutes need many pages, for departments, doctors, courses and fees, that stay easy to update. We build on a structure your team can manage.",
      "Every form and button connects to WhatsApp or your CRM, so enquiries never wait in an inbox.",
    ],
    searches: ["website development company Mohali", "real estate landing page Mohali", "hospital website design", "web developer in Mohali"],
    faq: { q: "Can our team update the website ourselves?", a: "Yes. We set up the content you change often, such as doctors, courses, projects or offers, so it can be edited without a developer." },
  },
  {
    city: "mohali",
    service: "performance-marketing",
    h1: "Google and Meta ads in Mohali that fill calendars, not inboxes.",
    metaTitle: "Performance Marketing Agency in Mohali: Google & Meta Ads",
    metaDescription:
      "Google and Meta ads for Mohali real estate, healthcare and education, connected to WhatsApp qualification and booking so you can see cost per customer.",
    intro:
      "Mohali's busiest advertisers, from projects and hospitals to institutes, compete for the same audiences. We make each rupee count by connecting ads to instant qualification and booking.",
    angle: [
      "For real estate, campaigns are split by configuration and budget, and every lead is qualified on WhatsApp before a site visit is booked.",
      "For hospitals and clinics, campaigns focus on specific treatments and departments, with appointment booking and reminders built in.",
      "For institutes, campaigns follow the admission cycle and send enquiries straight to counsellors with course interest already captured.",
    ],
    searches: ["real estate ads agency Mohali", "Google Ads for hospitals", "admission campaign for institute Mohali", "Meta ads agency Mohali"],
    faq: { q: "How quickly will ads bring leads?", a: "Ads can bring enquiries within days of launch. The first few weeks are about learning which audiences and offers bring customers, not just leads." },
  },
  {
    city: "mohali",
    service: "social-media-marketing",
    h1: "Social media marketing in Mohali for brands people trust.",
    metaTitle: "Social Media Marketing Agency in Mohali: Instagram, Reels & Paid Social",
    metaDescription:
      "Social media marketing for Mohali businesses: strategy, Reels and short video, Instagram, Facebook, LinkedIn and YouTube, and paid social measured on enquiries.",
    intro:
      "From new restaurants in Phase 3B2 to hospitals and IT companies, Mohali businesses win on social media with consistent, honest content and fast replies.",
    angle: [
      "Consumer businesses grow with Reels, local creators and Instagram offers aimed at nearby sectors. Service and IT companies grow on LinkedIn and YouTube with expertise and team stories.",
      "Every channel connects to WhatsApp, email or your CRM, so interest turns into conversations.",
      "Monthly reports show reach and engagement, and more importantly enquiries and bookings that came from social.",
    ],
    searches: ["social media agency Mohali", "LinkedIn marketing for IT company", "Instagram marketing for restaurant Mohali", "Reels production Mohali"],
    faq: { q: "Do you manage LinkedIn for B2B companies?", a: "Yes. We plan founder and company content, case studies and hiring posts, and connect them to a clear enquiry path." },
  },
  {
    city: "mohali",
    service: "ai-automation",
    h1: "WhatsApp and AI automation for Mohali businesses.",
    metaTitle: "AI Automation & WhatsApp Automation Agency in Mohali",
    metaDescription:
      "AI assistants and WhatsApp automation for Mohali hospitals, institutes and real estate: instant replies, qualification, booking, reminders and CRM sync.",
    intro:
      "Enquiries arrive at night, at weekends and in bursts after a campaign. We set up assistants that answer instantly, qualify and book, and pass serious leads to your team.",
    angle: [
      "Real estate: budget, configuration and timeline captured in the first chat, with a site visit booked into the sales calendar.",
      "Healthcare: appointment booking, rescheduling and reminders connected to your scheduling software.",
      "Education: course questions answered, counselling sessions booked and follow-ups sent automatically, with counsellors stepping in when needed.",
    ],
    searches: ["WhatsApp automation Mohali", "AI chatbot for hospital", "lead qualification automation real estate", "AI automation company Mohali"],
    faq: { q: "Can it connect to our existing CRM or hospital software?", a: "Usually, yes. We integrate with common CRMs and scheduling systems, or use simple bridges where a direct integration isn't available." },
  },
  // ---------- Panchkula ----------
  {
    city: "panchkula",
    service: "seo",
    h1: "SEO company in Panchkula for local search and AI answers.",
    metaTitle: "SEO Company in Panchkula: Local SEO & Google Maps",
    metaDescription:
      "Local SEO in Panchkula: Google Business Profile, sector-level pages, reviews, technical SEO and GEO so customers and AI assistants find your business first.",
    intro:
      "Panchkula customers choose from the first few Maps results for their sector. We make sure your business is one of them, with accurate details that AI assistants repeat correctly.",
    angle: [
      "Most Panchkula searches are hyper-local: 'clinic in Sector 9', 'school near Sector 20', 'AC repair Panchkula'. Profiles and pages built for the exact sectors you serve beat generic city pages.",
      "Reviews and photos carry a lot of weight in a community-driven city. We help you ask for reviews consistently and respond to them well.",
      "For venues and resorts towards Morni and the hills, we also target travellers searching from the Tricity and beyond.",
    ],
    searches: ["SEO services in Panchkula", "clinic in Sector 9 Panchkula", "resort near Morni Hills", "AC repair service Panchkula"],
    faq: { q: "How long until we see local SEO results?", a: "Google Business Profile improvements can show within weeks. Ranking for competitive searches usually takes a few months of consistent work." },
  },
  {
    city: "panchkula",
    service: "website-development",
    h1: "Website development in Panchkula for local businesses.",
    metaTitle: "Website Development Company in Panchkula: Fast & Mobile-First",
    metaDescription:
      "Website development in Panchkula: fast, mobile-first websites for clinics, schools, venues and local services, built for Google and connected to WhatsApp.",
    intro:
      "A clear, fast website makes a small Panchkula business look as trustworthy as the big names. We build sites that load quickly on phones and make enquiring simple.",
    angle: [
      "Many Panchkula businesses still rely on a Facebook page or an old template site. A focused, fast website with clear services, prices or packages and a WhatsApp button often doubles as your best salesperson.",
      "Venues and resorts need image-led sites that show the space properly and capture event details in the first enquiry.",
      "Every site is set up for local SEO from day one, so it supports your Maps visibility.",
    ],
    searches: ["website designer Panchkula", "website for school Panchkula", "wedding venue website design", "web development company near me"],
    faq: { q: "We're a small business. Is a custom website worth it?", a: "Often a smaller, well-built site is the right choice. We scope it to what will bring enquiries, not to the most pages possible." },
  },
  {
    city: "panchkula",
    service: "performance-marketing",
    h1: "Google and Meta ads for Panchkula businesses.",
    metaTitle: "Google Ads & Facebook Ads Agency in Panchkula",
    metaDescription:
      "Google and Meta ads for Panchkula businesses, targeted to the sectors and towns you serve, with instant WhatsApp follow-up and clear cost-per-customer reporting.",
    intro:
      "Small, well-targeted campaigns work well in Panchkula. We focus your budget on the sectors and nearby towns you actually serve and make sure every lead gets a fast reply.",
    angle: [
      "Geographic targeting is tight: specific sectors, Panchkula extension, Pinjore and nearby Tricity areas, so spend isn't wasted on people too far away.",
      "Venues and resorts run seasonal campaigns for weddings, parties and weekend getaways, timed to when people plan.",
      "Every campaign reports on bookings and customers, not only clicks.",
    ],
    searches: ["Facebook ads agency Panchkula", "Google Ads for local business", "wedding venue marketing Panchkula", "PPC services Panchkula"],
    faq: { q: "Can we start small?", a: "Yes. A small, focused campaign with a clear offer and fast follow-up is often the best way to start, then grow what works." },
  },
  {
    city: "panchkula",
    service: "social-media-marketing",
    h1: "Social media marketing in Panchkula that builds a local following.",
    metaTitle: "Social Media Marketing Agency in Panchkula: Instagram & Facebook",
    metaDescription:
      "Instagram, Facebook and YouTube marketing for Panchkula businesses: local content, Reels, community building and paid social connected to WhatsApp enquiries.",
    intro:
      "Panchkula is a close-knit city where recommendations travel fast on Instagram and WhatsApp groups. We help local businesses build a following that turns into customers.",
    angle: [
      "Content that shows real people, real work and real customers (with permission) builds trust faster than polished ads.",
      "Local offers and events, promoted to nearby sectors, bring people through the door.",
      "Every DM and comment is routed to a fast reply, so interest doesn't fade.",
    ],
    searches: ["social media marketing Panchkula", "Instagram page management Panchkula", "Reels for gym Panchkula", "social media for school"],
    faq: { q: "Which platform matters most here?", a: "For most local businesses, Instagram and Facebook first, with YouTube for businesses that explain or demonstrate their work." },
  },
  {
    city: "panchkula",
    service: "ai-automation",
    h1: "WhatsApp and AI automation for Panchkula businesses.",
    metaTitle: "WhatsApp Automation & AI Chatbot for Panchkula Businesses",
    metaDescription:
      "WhatsApp automation for Panchkula clinics, schools, venues and services: instant replies, booking, reminders and follow-ups, with your team in control.",
    intro:
      "Small teams can't answer every message instantly. A WhatsApp assistant can, and it books appointments and visits while you focus on the work.",
    angle: [
      "Clinics and salons: booking, rescheduling and reminders, so fewer slots go empty.",
      "Schools and academies: fee, timing and admission questions answered, with visits booked for interested parents.",
      "Venues: event date, guest count and budget captured before a call with your manager.",
    ],
    searches: ["WhatsApp chatbot Panchkula", "appointment reminder WhatsApp", "booking automation for salon", "AI assistant for school enquiries"],
    faq: { q: "Is WhatsApp automation expensive for a small business?", a: "Setup is a one-time project and running costs are usually modest. We size it to your enquiry volume." },
  },
];

export function getLocalService(city: string, service: string) {
  return localServices.find((l) => l.city === city && l.service === service);
}

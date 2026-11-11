
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

const allLocalServices: LocalService[] = [
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
];

/** Only search services are published as city pages. */
export const localServices = allLocalServices;

export function getLocalService(city: string, service: string) {
  return localServices.find((l) => l.city === city && l.service === service);
}

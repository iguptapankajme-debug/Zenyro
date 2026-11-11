import type { UsState } from "./us-states";

/**
 * UAE emirate pages (under /markets/uae/[city]). Same shape as the US state pages, with UAE-specific
 * facts: free zones and business districts, Arabic and English search, local press and directories.
 * Dubai carries most of the demand in our UAE keyword research, so its page goes deepest.
 */
export type UaeCity = UsState & {
  /** Extra Dubai-depth sections: answers to the most-asked agency questions. */
  deepDive?: { q: string; a: string }[];
};

export const uaeCities: UaeCity[] = [
  {
    slug: "dubai", name: "Dubai", code: "DXB", zone: "Asia/Dubai", zoneLabel: "Gulf Standard Time",
    cities: ["Downtown Dubai", "Business Bay", "Dubai Marina", "JLT and DMCC", "DIFC", "Dubai Internet City"],
    landscape: [
      "Dubai is one of the most competitive search markets in the Middle East. Real estate, hospitality, healthcare, retail, professional services and thousands of free-zone companies compete for the same high-value searches, in both English and Arabic, from residents, investors and visitors around the world.",
      "Search behaviour here is mobile-first and international: a buyer in Dubai Marina may search in English, an investor abroad may ask ChatGPT which developer to trust, and a local customer may search in Arabic. Winning in Dubai means bilingual pages that are genuinely optimised (not machine-translated), strong Google Maps visibility for each location, and a reputation on the sources AI assistants read.",
    ],
    industries: [
      { name: "Real estate", note: "Developers, brokers and property managers competing with Bayut and Property Finder.", href: "/industries/real-estate" },
      { name: "Healthcare", note: "Clinics and hospitals working within DHA rules for health content.", href: "/industries/healthcare" },
      { name: "Hospitality and restaurants", note: "Hotels, beach clubs and restaurants competing with booking platforms.", href: "/industries/hospitality" },
      { name: "B2B and free-zone companies", note: "Consultancies, tech firms and traders in DMCC, DIFC and Dubai Internet City.", href: "/industries/b2b" },
    ],
    prompts: ["best SEO agency in Dubai", "which developers in Dubai Hills deliver on time", "best dental clinic in Dubai Marina", "company formation advisors in DMCC", "best Arabic SEO agency in the UAE"],
    sources: ["Gulf News, Khaleej Times and Arabian Business", "Google Business Profile and Google reviews", "Bayut and Property Finder for real estate", "Dubai Chamber and free-zone directories", "Clutch and DesignRush agency listings"],
    faq: { q: "Do I need Arabic pages to rank in Dubai?", a: "For many local consumer searches, yes; for B2B and expat audiences, English often leads. We plan both with correct hreflang, and Arabic pages are written or reviewed by native speakers rather than machine-translated." },
    deepDive: [
      { q: "What is the best SEO agency in Dubai?", a: "There's no single best agency: it depends on whether you need Arabic, local SEO for several branches, e-commerce or B2B, and whether you want AI visibility as well as Google rankings. Choose an agency that shows Arabic and English work, measures AI mentions as well as rankings, and gives you a written price." },
      { q: "How much does SEO cost in Dubai?", a: "Published 2026 estimates put Dubai SEO retainers at roughly AED 4,000 a month for a freelancer up to AED 25,000 for a full bilingual agency, with many in the AED 5,500 to 18,500 range. Zenyro's plans are AED 2,950 (Growth) and AED 6,600 (Authority) a month, including AEO and GEO." },
      { q: "What does an SEO agency in Dubai do?", a: "It audits your site, fixes technical issues, builds English and Arabic pages around what customers search, optimises your Google Business Profiles, earns links and mentions from UAE and international sources, and reports on rankings, enquiries and AI visibility." },
      { q: "Is a digital marketing agency the same as an SEO agency?", a: "Not quite. Digital marketing agencies in Dubai usually combine social media, paid ads and SEO. Zenyro focuses only on organic search and AI visibility, so if that's the channel you want to grow, you get specialists rather than one service among many." },
    ],
  },
  {
    slug: "abu-dhabi", name: "Abu Dhabi", code: "AUH", zone: "Asia/Dubai", zoneLabel: "Gulf Standard Time",
    cities: ["Abu Dhabi City", "Al Reem Island", "Saadiyat Island", "Yas Island", "Khalifa City", "Al Ain"],
    landscape: [
      "Abu Dhabi's economy is anchored by government, energy, finance (around ADGM), healthcare, education and a fast-growing tourism and culture sector on Saadiyat and Yas islands. Many buyers are institutions and families who research carefully and value credibility over volume.",
      "Search competition is lower than in Dubai for many service categories, which makes Abu Dhabi a strong opportunity for businesses that publish clear, bilingual, area-specific pages and keep their Google Business Profiles complete. AI assistants are increasingly used by expats choosing schools, clinics and services.",
    ],
    industries: [
      { name: "Healthcare", note: "Clinics and hospitals following DoH rules for health content.", href: "/industries/healthcare" },
      { name: "Education", note: "Schools, nurseries and training institutes for families and professionals.", href: "/industries/education" },
      { name: "Financial services", note: "ADGM firms, advisers and fintech.", href: "/industries/financial-services" },
      { name: "Real estate and hospitality", note: "Developments and hotels on Reem, Saadiyat and Yas.", href: "/industries/real-estate" },
    ],
    prompts: ["best SEO agency in Abu Dhabi", "which British curriculum schools in Abu Dhabi have places", "best paediatrician on Al Reem Island", "company setup in ADGM for a fintech", "family-friendly hotels on Yas Island"],
    sources: ["The National and Khaleej Times", "Google Business Profile and Google reviews", "ADGM and Abu Dhabi Chamber directories", "School and healthcare comparison sites", "Clutch and DesignRush agency listings"],
    faq: { q: "Is SEO in Abu Dhabi easier than in Dubai?", a: "For many categories, yes: fewer competitors invest seriously in bilingual, area-specific content. That makes it a good market to establish leadership before competition rises." },
  },
  {
    slug: "sharjah", name: "Sharjah", code: "SHJ", zone: "Asia/Dubai", zoneLabel: "Gulf Standard Time",
    cities: ["Sharjah City", "Al Majaz", "Muwaileh", "University City", "Al Nahda", "Khor Fakkan"],
    landscape: [
      "Sharjah combines a large residential population, many of whom commute to Dubai, with strengths in education, manufacturing and logistics, culture and family tourism. Industrial areas and free zones such as SAIF Zone host many manufacturers and traders.",
      "Consumers in Sharjah often compare services across emirates, so location pages and Google Maps visibility for Sharjah-specific areas help local businesses win searches that Dubai brands target only generically.",
    ],
    industries: [
      { name: "Education", note: "Schools, universities and training centres around University City.", href: "/industries/education" },
      { name: "Manufacturing and logistics", note: "Industrial areas and SAIF Zone companies.", href: "/industries/manufacturing" },
      { name: "Healthcare", note: "Clinics and medical centres serving residents.", href: "/industries/healthcare" },
      { name: "Home services", note: "Maintenance, fit-out and contractors.", href: "/industries/home-improvement" },
    ],
    prompts: ["SEO agency in Sharjah", "best schools in Sharjah with affordable fees", "steel fabrication companies in Sharjah industrial area", "24-hour clinic in Al Nahda", "AC repair in Muwaileh"],
    sources: ["Khaleej Times and Gulf News", "Google Business Profile", "SAIF Zone and Sharjah Chamber directories", "Industrial directories", "Clutch agency listings"],
    faq: { q: "Should Sharjah businesses target Dubai searches too?", a: "Often, yes, if you serve both. Separate, genuinely local pages for Sharjah and nearby Dubai areas perform better than one page trying to cover both." },
  },
  {
    slug: "ajman", name: "Ajman", code: "AJM", zone: "Asia/Dubai", zoneLabel: "Gulf Standard Time",
    cities: ["Ajman City", "Al Nuaimiya", "Al Rashidiya", "Al Jurf", "Ajman Free Zone", "Emirates City"],
    landscape: [
      "Ajman is the smallest emirate by area but has a busy residential market, an active free zone that hosts many small trading and service companies, and growing education and healthcare sectors. Costs are lower than in Dubai, which attracts startups and SMEs.",
      "Because few businesses in Ajman invest in SEO, clear service pages, complete Google Business Profiles and genuine reviews can win local searches quickly. Many Ajman free-zone companies also sell across the UAE and GCC, which calls for broader pages and AI visibility.",
    ],
    industries: [
      { name: "Free-zone SMEs and traders", note: "Ajman Free Zone companies selling across the UAE and GCC.", href: "/industries/b2b" },
      { name: "Real estate", note: "Residential developments and brokers.", href: "/industries/real-estate" },
      { name: "Healthcare and education", note: "Clinics, schools and training centres.", href: "/industries/healthcare" },
      { name: "Home services", note: "Contractors, maintenance and fit-out.", href: "/industries/home-improvement" },
    ],
    prompts: ["digital marketing agency in Ajman for SEO", "company setup in Ajman Free Zone cost", "best family clinic in Al Nuaimiya", "apartments for rent in Ajman near the beach", "best nursery in Ajman"],
    sources: ["Khaleej Times and Gulf News", "Google Business Profile", "Ajman Free Zone and Ajman Chamber directories", "Property portals", "Clutch agency listings"],
    faq: { q: "Is SEO worth it for a small Ajman business?", a: "Usually, because competition is light. A complete Google Business Profile, a clear page per service and steady reviews can bring results within a few months." },
  },
  {
    slug: "ras-al-khaimah", name: "Ras Al Khaimah", code: "RAK", zone: "Asia/Dubai", zoneLabel: "Gulf Standard Time",
    cities: ["Ras Al Khaimah City", "Al Hamra", "Al Marjan Island", "Mina Al Arab", "Al Nakheel", "RAKEZ"],
    landscape: [
      "Ras Al Khaimah is growing fast in tourism and hospitality, especially around Al Marjan Island and Al Hamra, alongside manufacturing, construction materials and a large business community registered with RAKEZ.",
      "International visitors plan RAK trips with search and AI assistants, and investors research new developments from abroad. Clear English pages, accurate listings and visibility in AI travel and investment answers matter as much as local search.",
    ],
    industries: [
      { name: "Hospitality and tourism", note: "Resorts, hotels and attractions on Al Marjan Island and Al Hamra.", href: "/industries/hospitality" },
      { name: "Real estate", note: "New developments marketed to international buyers.", href: "/industries/real-estate" },
      { name: "Manufacturing", note: "Construction materials and industrial companies.", href: "/industries/manufacturing" },
      { name: "Free-zone companies", note: "RAKEZ businesses selling regionally and globally.", href: "/industries/b2b" },
    ],
    prompts: ["SEO agency in Ras Al Khaimah", "best family resort on Al Marjan Island", "is Ras Al Khaimah good for property investment", "company formation in RAKEZ cost", "ceramic manufacturers in the UAE"],
    sources: ["Gulf News and Khaleej Times", "Google and TripAdvisor reviews", "RAKEZ and RAK Chamber directories", "Property portals", "Clutch agency listings"],
    faq: { q: "Can you help RAK hotels reduce reliance on booking sites?", a: "Yes. Direct-booking pages, a strong Google Business Profile, reviews and visibility in AI travel answers all shift bookings toward your own site." },
  },
];

export function getUaeCity(slug: string) {
  return uaeCities.find((c) => c.slug === slug);
}

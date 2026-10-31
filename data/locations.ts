/**
 * City pages. Each one is written for its own market: what local customers search for, which
 * sectors matter there, and how search, AI answers and WhatsApp fit together. Keep them specific;
 * near-identical city pages help nobody and are ignored by search engines.
 */
export type Location = {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  /** Two or three short paragraphs on the local market. */
  market: string[];
  /** Industry slugs most relevant to this city (data/industries.ts). */
  sectors: string[];
  /** Example searches and AI prompts local customers use. */
  searches: string[];
  /** Live projects (data/work.ts slugs) serving this area. */
  work?: string[];
  faqs: { q: string; a: string }[];
};

export const locations: Location[] = [
  {
    slug: "chandigarh",
    city: "Chandigarh",
    region: "Chandigarh Tricity",
    metaTitle: "Digital Marketing & AI Growth Agency in Chandigarh",
    metaDescription:
      "Zenyro is a Chandigarh-based growth agency: websites, local SEO, AEO and GEO for AI search, performance marketing and WhatsApp automation for Tricity businesses.",
    headline: "Chandigarh's growth agency for the AI search era.",
    intro:
      "We are based in the Tricity and work with businesses that want more enquiries, not more reports. Fast websites, local search and AI answers that name you, and WhatsApp follow-up that replies in minutes.",
    market: [
      "Chandigarh customers compare carefully. Whether they are choosing a clinic in Sector 35, a coaching institute, a furniture showroom or a builder in the periphery, most of them search, read reviews and message two or three businesses before deciding.",
      "That makes three things decide who wins: showing up in Maps and organic results for sector-level searches, being the business AI assistants recommend when someone asks for the best option nearby, and replying first when the enquiry arrives.",
      "Being local helps. We can visit, photograph and understand your business in person, and the same team builds your website, runs your campaigns and sets up your automation.",
    ],
    sectors: ["healthcare", "education", "real-estate", "interior-design"],
    searches: ["best dentist in Sector 22 Chandigarh", "IELTS coaching near me", "3 BHK flats in Chandigarh periphery", "modular kitchen showroom Chandigarh", "Which clinics in Chandigarh are open on Sunday?"],
    faqs: [
      { q: "Do you only work with Chandigarh businesses?", a: "No. We are based in the Tricity and work with clients across India and abroad, but we know the local market well and can meet in person here." },
      { q: "How long does local SEO take to show results in Chandigarh?", a: "Fixes to your Google Business Profile and website can show within weeks. Ranking for competitive sector-level searches usually takes a few months of steady work. We report progress weekly, without guarantees." },
      { q: "Can you help us appear in ChatGPT or Google AI Overviews?", a: "We can make you much easier to find, cite and describe accurately: clear service pages, consistent business details and answers to real customer questions. No one can guarantee AI mentions, and we won't pretend to." },
    ],
  },
  {
    slug: "mohali",
    city: "Mohali",
    region: "Punjab",
    metaTitle: "Digital Marketing Agency in Mohali: SEO, AI Search & Lead Generation",
    metaDescription:
      "Growth systems for Mohali businesses: websites, local SEO and AI search visibility, performance marketing and instant WhatsApp follow-up, from a Tricity team.",
    headline: "More enquiries for Mohali businesses, answered faster.",
    intro:
      "Mohali has grown fast: new residential sectors, IT and service companies, hospitals and a busy airport corridor. We help businesses here get found for the searches that matter and turn those enquiries into appointments and site visits.",
    market: [
      "Much of Mohali's demand is new: families moving into new sectors, professionals relocating for work, and patients travelling in for specialist care. These customers don't know local names yet, so they rely heavily on Google, Maps and increasingly AI assistants to choose.",
      "Real estate, healthcare and education are especially competitive. Project launches, hospital departments and institutes all chase the same searches, and the business that answers the enquiry first usually gets the visit.",
      "We build pages that explain each project, department or course clearly, keep business details consistent everywhere, and connect every form and ad to an instant WhatsApp reply.",
    ],
    sectors: ["real-estate", "healthcare", "education", "home-improvement"],
    searches: ["new projects in Aerocity Mohali", "multispeciality hospital near Mohali airport", "best school in Sector 70 Mohali", "home interiors company Mohali", "Is Mohali or Zirakpur better for buying a flat?"],
    faqs: [
      { q: "Can you run lead generation for a real estate project in Mohali?", a: "Yes. A typical setup is a project landing page, Meta and Google campaigns by configuration, WhatsApp qualification by budget and timeline, and site-visit booking with reminders." },
      { q: "Do you handle Google Business Profiles for multiple branches?", a: "Yes. Each branch gets its own complete, accurate profile and a matching location page on your website." },
    ],
  },
  {
    slug: "panchkula",
    city: "Panchkula",
    region: "Haryana",
    metaTitle: "Digital Marketing Agency in Panchkula: Local SEO & AI Search",
    metaDescription:
      "Local SEO, AI search visibility, websites and WhatsApp automation for Panchkula businesses, from a Chandigarh Tricity growth agency.",
    headline: "Be the Panchkula business people find first.",
    intro:
      "Panchkula is a city of neighbourhood decisions: the nearest good clinic, school, salon, gym or contractor. We help local businesses win those searches and reply to every enquiry while the customer is still deciding.",
    market: [
      "Most Panchkula customers search with a sector or landmark in mind and choose from the first few results in Maps. Accurate profiles, real photos, recent reviews and a quick reply decide most of those choices.",
      "Panchkula is also the gateway to the hills. Hospitality, wedding venues and travel businesses on the Morni and Himachal routes compete for travellers searching from the Tricity and beyond.",
      "We keep it practical: a fast mobile site, complete local profiles, answers to the questions people ask, and a WhatsApp flow that books the appointment or visit.",
    ],
    sectors: ["healthcare", "education", "hospitality", "home-improvement"],
    searches: ["physiotherapist in Sector 9 Panchkula", "play school near me Panchkula", "wedding venue Panchkula", "resort near Morni Hills", "Who repairs AC in Panchkula on weekends?"],
    faqs: [
      { q: "Is local SEO worth it for a small business in Panchkula?", a: "Usually, yes. Local searches carry strong intent, and many competitors still have incomplete profiles and slow websites, so careful work stands out." },
      { q: "Can you also help with Instagram and Facebook?", a: "Yes. Social media is part of our growth services, and we connect it to the same enquiry and follow-up flow as search." },
    ],
  },
  {
    slug: "ludhiana",
    city: "Ludhiana",
    region: "Punjab",
    metaTitle: "Digital Marketing Agency for Ludhiana Businesses & Manufacturers",
    metaDescription:
      "B2B lead generation, SEO and AI search visibility, websites and WhatsApp automation for Ludhiana manufacturers, exporters, dealers and retailers.",
    headline: "Digital growth for Ludhiana's makers and traders.",
    intro:
      "Ludhiana runs on manufacturing, trading and family businesses: hosiery and textiles, cycle and auto parts, machine tools and a large retail market. We help these businesses win buyers who now search, compare and message before they ever call.",
    market: [
      "B2B buyers increasingly start with a search or an AI assistant: suppliers for a part, manufacturers for a garment category, dealers in a district. If your products, capacities and certifications aren't clearly described online, those enquiries go to whoever's are.",
      "Many Ludhiana businesses rely on directories and personal networks. Those still matter, but a fast catalogue website, product pages that answer specification questions and an organised WhatsApp enquiry flow add a channel you fully own.",
      "For retailers and showrooms, the same principles apply locally: Maps visibility, real photos and quick replies on WhatsApp.",
    ],
    sectors: ["home-improvement", "interior-design", "education", "financial-services"],
    searches: ["hosiery manufacturer Ludhiana", "bicycle parts supplier Punjab", "industrial machine tools Ludhiana", "wholesale woollen garments Ludhiana", "Which Ludhiana manufacturers export knitwear?"],
    faqs: [
      { q: "Can you generate B2B leads for a manufacturer?", a: "Yes. We build product and category pages that answer buyer questions, run targeted search campaigns, and route enquiries to your sales team on WhatsApp or email with the details already captured." },
      { q: "Do you work with Ludhiana businesses remotely?", a: "Yes. Ludhiana is within easy reach of our Tricity base for a visit when it helps, and day-to-day work happens over calls and WhatsApp." },
    ],
  },
  {
    slug: "shimla",
    city: "Shimla",
    region: "Himachal Pradesh",
    metaTitle: "Digital Marketing for Shimla & Himachal Travel and Hospitality",
    metaDescription:
      "Direct bookings for Himachal hotels, homestays, taxi and tour operators: route and package pages, Google Maps visibility, AI search answers and instant WhatsApp quotes.",
    headline: "More direct bookings for Himachal travel businesses.",
    intro:
      "Tourism drives Shimla and the hills, and travellers decide fast: a route, a vehicle, a room, a quote. We build travel and hospitality businesses the pages, profiles and WhatsApp flows that turn those searches into direct bookings.",
    market: [
      "Visitors plan from Delhi, Chandigarh and Punjab, usually on a phone. They search routes and stays, compare two or three operators, and book whoever responds first with a clear price.",
      "Demand is seasonal: summer holidays, snowfall and wedding seasons bring spikes, and quiet months follow. Campaigns and content should follow the same calendar, and every enquiry in the peak needs an instant answer.",
      "We already build and grow websites for Himachal taxi and tour operators, so we know the routes, the questions travellers ask and what it takes to stand out from aggregators.",
    ],
    sectors: ["travel-tourism", "hospitality"],
    searches: ["taxi from Chandigarh to Shimla", "Shimla Manali tour package for family", "homestay in Shimla with mountain view", "Is there snow in Shimla in December?", "best cab service for Kufri and Narkanda"],
    work: ["himachal-cab-expert", "himachal-taxi-and-tours"],
    faqs: [
      { q: "Can you help us depend less on travel portals?", a: "Yes. We grow direct bookings through your website, Google profile and WhatsApp, so more of each booking's margin and the customer relationship stay with you." },
      { q: "What do you build for a taxi or tour operator?", a: "Typically route and package pages, an instant quote form with WhatsApp, a complete Google Business Profile with real photos and reviews, and seasonal campaigns. See our Himachal travel projects on the Work page." },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

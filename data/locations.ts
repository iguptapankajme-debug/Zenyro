/**
 * City pages. Each one is written for its own market: what local customers search for, which
 * sectors matter there, and how search, maps and AI answers fit together. Keep them specific;
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
  faqs: { q: string; a: string }[];
};

export const locations: Location[] = [
  {
    slug: "chandigarh",
    city: "Chandigarh",
    region: "Chandigarh Tricity",
    metaTitle: "SEO Agency in Chandigarh: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Chandigarh: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Chandigarh's SEO agency for the AI search era.",
    intro:
      "We are based in the Tricity and work with businesses that want more enquiries, not more reports. Local rankings, Google Maps visibility and AI answers that name you, measured on enquiries.",
    market: [
      "Chandigarh customers compare carefully. Whether they are choosing a clinic in Sector 35, a coaching institute, a furniture showroom or a builder in the periphery, most of them search, read reviews and message two or three businesses before deciding.",
      "That makes three things decide who wins: showing up in Maps and organic results for sector-level searches, being the business AI assistants recommend when someone asks for the best option nearby, and replying first when the enquiry arrives.",
      "Being local helps. We can visit, photograph and understand your business in person, and see exactly what customers see when they search for businesses like yours.",
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
    metaTitle: "SEO Agency in Mohali: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Mohali: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "More enquiries for Mohali businesses, answered faster.",
    intro:
      "Mohali has grown fast: new residential sectors, IT and service companies, hospitals and a busy airport corridor. We help businesses here get found for the searches that matter and turn those enquiries into appointments and site visits.",
    market: [
      "Much of Mohali's demand is new: families moving into new sectors, professionals relocating for work, and patients travelling in for specialist care. These customers don't know local names yet, so they rely heavily on Google, Maps and increasingly AI assistants to choose.",
      "Real estate, healthcare and education are especially competitive. Project launches, hospital departments and institutes all chase the same searches, and the business that answers the enquiry first usually gets the visit.",
      "We build pages that explain each project, department or course clearly, keep business details consistent everywhere, and make sure AI assistants describe you accurately.",
    ],
    sectors: ["real-estate", "healthcare", "education", "home-improvement"],
    searches: ["new projects in Aerocity Mohali", "multispeciality hospital near Mohali airport", "best school in Sector 70 Mohali", "home interiors company Mohali", "Is Mohali or Zirakpur better for buying a flat?"],
    faqs: [
      { q: "Can you do SEO for a real estate project in Mohali?", a: "Yes. A typical programme covers project and locality pages with price bands and RERA details, Google Business Profile and Maps visibility, answers to buyer questions on possession and loans, and AI visibility for prompts like 'best new projects in Mohali'." },
      { q: "Do you handle Google Business Profiles for multiple branches?", a: "Yes. Each branch gets its own complete, accurate profile and a matching location page on your website." },
    ],
  },
  {
    slug: "panchkula",
    city: "Panchkula",
    region: "Haryana",
    metaTitle: "SEO Agency in Panchkula: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Panchkula: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Be the Panchkula business people find first.",
    intro:
      "Panchkula is a city of neighbourhood decisions: the nearest good clinic, school, salon, gym or contractor. We help local businesses win those searches and earn their trust before they pick up the phone.",
    market: [
      "Most Panchkula customers search with a sector or landmark in mind and choose from the first few results in Maps. Accurate profiles, real photos, recent reviews and a quick reply decide most of those choices.",
      "Panchkula is also the gateway to the hills. Hospitality, wedding venues and travel businesses on the Morni and Himachal routes compete for travellers searching from the Tricity and beyond.",
      "We keep it practical: a fast mobile site, complete local profiles, answers to the questions people ask, and the reviews that win the click.",
    ],
    sectors: ["healthcare", "education", "hospitality", "home-improvement"],
    searches: ["physiotherapist in Sector 9 Panchkula", "play school near me Panchkula", "wedding venue Panchkula", "resort near Morni Hills", "Who repairs AC in Panchkula on weekends?"],
    faqs: [
      { q: "Is local SEO worth it for a small business in Panchkula?", a: "Usually, yes. Local searches carry strong intent, and many competitors still have incomplete profiles and slow websites, so careful work stands out." },
      { q: "Do AI assistants recommend local Panchkula businesses?", a: "Increasingly, yes. People ask ChatGPT and Gemini for a good clinic, school or contractor nearby. Accurate profiles, clear service pages and genuine reviews make you much easier to recommend." },
    ],
  },
  {
    slug: "ludhiana",
    city: "Ludhiana",
    region: "Punjab",
    metaTitle: "SEO Agency in Ludhiana: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Ludhiana: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Digital growth for Ludhiana's makers and traders.",
    intro:
      "Ludhiana runs on manufacturing, trading and family businesses: hosiery and textiles, cycle and auto parts, machine tools and a large retail market. We help these businesses win buyers who now search, compare and message before they ever call.",
    market: [
      "B2B buyers increasingly start with a search or an AI assistant: suppliers for a part, manufacturers for a garment category, dealers in a district. If your products, capacities and certifications aren't clearly described online, those enquiries go to whoever's are.",
      "Many Ludhiana businesses rely on directories and personal networks. Those still matter, but product pages that answer specification questions, clear category pages and accurate business listings add a search channel you fully own.",
      "For retailers and showrooms, the same principles apply locally: Maps visibility, real photos and genuine reviews.",
    ],
    sectors: ["home-improvement", "interior-design", "education", "financial-services"],
    searches: ["hosiery manufacturer Ludhiana", "bicycle parts supplier Punjab", "industrial machine tools Ludhiana", "wholesale woollen garments Ludhiana", "Which Ludhiana manufacturers export knitwear?"],
    faqs: [
      { q: "Can SEO bring B2B enquiries for a manufacturer?", a: "Yes. Buyers search by product and specification. We build product and category pages that answer their questions, add structured data, and make sure AI assistants can find and describe your capabilities when buyers ask for suppliers." },
      { q: "Do you work with Ludhiana businesses remotely?", a: "Yes. Ludhiana is within easy reach of our Tricity base for a visit when it helps, and day-to-day work happens over calls and email." },
    ],
  },
  {
    slug: "shimla",
    city: "Shimla",
    region: "Himachal Pradesh",
    metaTitle: "SEO Agency in Shimla: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Shimla: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "More direct bookings for Himachal travel businesses.",
    intro:
      "Tourism drives Shimla and the hills, and travellers decide fast: a route, a vehicle, a room, a quote. We help travel and hospitality businesses win those searches with route and package pages, complete Maps profiles and answers AI assistants can quote.",
    market: [
      "Visitors plan from Delhi, Chandigarh and Punjab, usually on a phone. They search routes and stays, compare two or three operators, and book whoever responds first with a clear price.",
      "Demand is seasonal: summer holidays, snowfall and wedding seasons bring spikes, and quiet months follow. Content should follow the same calendar, and every enquiry in the peak needs an instant answer.",
      "We know the routes, the seasons and the questions travellers ask, and what it takes for an operator to stand out from aggregators.",
    ],
    sectors: ["travel-tourism", "hospitality"],
    searches: ["taxi from Chandigarh to Shimla", "Shimla Manali tour package for family", "homestay in Shimla with mountain view", "Is there snow in Shimla in December?", "best cab service for Kufri and Narkanda"],
    faqs: [
      { q: "Can SEO help us depend less on travel portals?", a: "Yes. Ranking your own route, package and property pages, and a strong Google Business Profile, grow the share of travellers who find and book you directly." },
      { q: "What does SEO for a taxi or tour operator involve?", a: "Typically a page for every popular route and package, a complete Google Business Profile with real photos and reviews, seasonal content for snow and holiday periods, and AI visibility for questions like 'best taxi from Chandigarh to Shimla'." },
    ],
  },
  {
    slug: "zirakpur",
    city: "Zirakpur",
    region: "Punjab",
    metaTitle: "SEO Agency in Zirakpur: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Zirakpur: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Zirakpur is growing fast. Make sure buyers find you first.",
    intro:
      "Zirakpur has become one of the busiest residential and retail corridors around Chandigarh, along the airport road and the highways to Delhi, Shimla and Patiala. We help businesses here turn that flow of new residents and through-traffic into enquiries.",
    market: [
      "New housing societies keep bringing families who don't yet have a local dentist, school, gym, salon or interior designer. They search Maps by society name or highway landmark and pick from the first few results.",
      "Real estate dominates advertising here, with many projects competing for the same buyers. Clear project and locality pages, honest price bands and accurate Maps listings are what separate the projects buyers find from the ones they scroll past.",
      "Showrooms and restaurants on the highway also compete for travellers searching on the move, where Maps visibility, photos and opening hours matter more than anything else.",
    ],
    sectors: ["real-estate", "home-improvement", "healthcare", "interior-design"],
    searches: ["3 BHK flats in Zirakpur under budget", "dentist near VIP Road Zirakpur", "furniture showroom Zirakpur highway", "best restaurant on Zirakpur Patiala road", "Is Zirakpur good for buying a flat?"],
    faqs: [
      { q: "Can SEO help a Zirakpur real estate project?", a: "Yes. Project, configuration and locality pages that answer buyer questions, Google Maps visibility and consistent project facts help buyers find you on Google and in AI answers, not only on portals." },
      { q: "Do you work with small shops and clinics too?", a: "Yes. For local businesses the biggest wins are usually a complete Google Business Profile, a fast mobile site and genuine reviews." },
    ],
  },
  {
    slug: "kharar",
    city: "Kharar",
    region: "Punjab",
    metaTitle: "SEO Agency in Kharar: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Kharar: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Get found by Kharar's new residents and students.",
    intro:
      "Kharar and the Landran and Sunny Enclave belt have filled with new homes, student housing, coaching centres and shops. We help local businesses show up when these new customers search, and choose you over the next result.",
    market: [
      "A large share of Kharar's customers are new to the area: students near the universities, young families in new societies and professionals commuting to Mohali and Chandigarh. They rely on search and Maps rather than word of mouth.",
      "Education, PG and hostel accommodation, real estate and everyday services are the busiest categories. Students in particular compare on Instagram and Google reviews before they visit.",
      "We focus on the basics that win locally: accurate profiles, real photos and reviews, and simple pages that answer fees and availability questions.",
    ],
    sectors: ["education", "real-estate", "healthcare", "home-improvement"],
    searches: ["PG for girls near Kharar", "IELTS coaching Kharar", "2 BHK flats Sunny Enclave", "clinic open late in Kharar", "best coaching institute near Landran"],
    faqs: [
      { q: "Can you market a coaching institute or PG in Kharar?", a: "Yes. We build pages for each course or room type with fees and facilities, and grow Google and Maps visibility so students find you when they search." },
      { q: "Do students use AI assistants to choose a coaching centre or PG?", a: "More and more. Students ask ChatGPT and Gemini for the best options nearby, and those answers draw on Google listings, reviews and clear pages about fees and facilities, the same foundations that win local search." },
    ],
  },
  {
    slug: "amritsar",
    city: "Amritsar",
    region: "Punjab",
    metaTitle: "SEO Agency in Amritsar: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Amritsar: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Amritsar welcomes millions. Make sure they book with you.",
    intro:
      "Amritsar receives pilgrims and tourists from across India and the world, all year round. We help hotels, guest houses, tour operators, restaurants and retailers win those searches and turn them into direct bookings and orders.",
    market: [
      "Visitors plan trips around the Golden Temple, the Wagah border ceremony and the old city, usually on a phone and often in a hurry. They search for stays near specific landmarks, compare prices and book whoever answers clearly and quickly.",
      "Travel portals take a large share of hotel bookings. Ranking your own site for the searches travellers make, and a strong Google profile, help properties win more direct bookings.",
      "Beyond tourism, Amritsar has a large trading and retail market, from textiles and phulkari to food brands, where product searches increasingly drive orders from outside the city.",
    ],
    sectors: ["hospitality", "travel-tourism", "healthcare", "education"],
    searches: ["hotel near Golden Temple with parking", "Amritsar Wagah border taxi", "best Amritsari kulcha near me", "phulkari dupatta online Amritsar", "How many days are enough for Amritsar?"],
    faqs: [
      { q: "Can you help an Amritsar hotel get more direct bookings?", a: "Yes. We improve the website's booking path, give guests a clear reason to book direct, strengthen your Google profile and reviews, and rank for the landmark searches guests make." },
      { q: "Can SEO help us sell products outside Amritsar?", a: "Yes. Product and category pages that rank, with clear details and structured data, can bring buyers from across India searching for what you make." },
    ],
  },
  {
    slug: "jalandhar",
    city: "Jalandhar",
    region: "Punjab",
    metaTitle: "SEO Agency in Jalandhar: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Jalandhar: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "From sports goods to study abroad, get Jalandhar found.",
    intro:
      "Jalandhar is known worldwide for sports goods and leather, and across Punjab for education, healthcare and immigration services. We help these businesses win buyers and students who now search, compare and message before they call.",
    market: [
      "Manufacturers and exporters increasingly get first contact from online searches and AI assistants: buyers looking for cricket bats, footballs, fitness equipment or hand tools by specification. Clear product pages and fast replies win those enquiries.",
      "Immigration, IELTS and study-abroad consultants compete hard for the same students. Trust signals, honest information on processes and fees, and clear answers to common questions matter far more than flashy marketing.",
      "Hospitals and specialist clinics draw patients from across the Doaba region, who search by specialty and read reviews before travelling.",
    ],
    sectors: ["education", "healthcare", "home-improvement", "financial-services"],
    searches: ["cricket bat manufacturer Jalandhar", "sports goods exporter India", "study visa consultant Jalandhar", "IVF centre in Jalandhar", "Which Jalandhar consultants handle Canada study visas?"],
    faqs: [
      { q: "Can you generate export enquiries for a Jalandhar manufacturer?", a: "Yes. We build product and category pages for international search, add structured data, and make sure AI assistants can describe your products when buyers ask for suppliers." },
      { q: "Do you work with immigration and study-abroad consultants?", a: "Yes, with care. We avoid guarantees about visas or outcomes, and focus on clear information, credible content and fast, organised follow-up." },
    ],
  },
  {
    slug: "patiala",
    city: "Patiala",
    region: "Punjab",
    metaTitle: "SEO Agency in Patiala: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Patiala: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Be Patiala's first choice in search.",
    intro:
      "Patiala combines a historic city centre with growing residential areas, universities and medical institutions. We help local businesses win the searches that bring customers through the door.",
    market: [
      "Patiala's customers include students and families from across the Malwa region who travel in for education, healthcare and shopping. They search by specialty, course or product and choose from the first few Maps results.",
      "Retail is a big part of the city's identity, from Patiala salwar suits and juttis to jewellery, and much of that buying now starts on Instagram and Google before a visit.",
      "We keep it practical: complete profiles for every branch, pages that answer the real questions, and the reviews that win the click.",
    ],
    sectors: ["education", "healthcare", "real-estate", "interior-design"],
    searches: ["Patiala salwar suit shop near me", "orthopaedic doctor in Patiala", "coaching for PCS exam Patiala", "new colonies on Patiala bypass", "Where to buy Patiala jutti online?"],
    faqs: [
      { q: "Can SEO help a Patiala retail store?", a: "Yes. Maps visibility, product pages and genuine reviews bring nearby shoppers in, and product searches can bring buyers from outside Patiala too." },
      { q: "Do you meet clients in Patiala?", a: "Patiala is close to our Tricity base, so we can visit when it helps. Day-to-day work happens over calls and email." },
    ],
  },
  {
    slug: "ambala",
    city: "Ambala",
    region: "Haryana",
    metaTitle: "SEO Agency in Ambala: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Ambala: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Ambala makes it. Make sure buyers can find it.",
    intro:
      "Ambala is one of India's best-known centres for scientific and laboratory instruments, and a major wholesale market on the Grand Trunk Road. We help its manufacturers and traders win buyers who now search and compare online.",
    market: [
      "Schools, colleges, labs and distributors search for specific instruments and specifications. Many Ambala makers still rely on directories and old catalogues, so a fast, well-structured product website stands out quickly.",
      "Wholesalers and traders in Ambala Cantt and the city serve a wide region and increasingly get found through product searches. Clear, crawlable catalogue pages put them in front of new buyers.",
      "Local clinics, schools and coaching centres compete on Maps and reviews, where complete profiles and fast replies make the difference.",
    ],
    sectors: ["education", "home-improvement", "healthcare", "financial-services"],
    searches: ["laboratory glassware manufacturer Ambala", "scientific instruments supplier India", "microscope manufacturer Ambala Cantt", "wholesale market in Ambala", "Which companies make lab equipment in Ambala?"],
    faqs: [
      { q: "Can you build a product catalogue website for a manufacturer?", a: "Yes. Fast, searchable category and product pages with specifications, plus an enquiry or quote flow that sends complete requirements to your team." },
      { q: "Will it help us get international buyers?", a: "It can. Clear product pages and international SEO make you easier to find, and AI assistants rely on the same clear information when buyers ask for suppliers." },
    ],
  },
  {
    slug: "karnal",
    city: "Karnal",
    region: "Haryana",
    metaTitle: "SEO Agency in Karnal: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Karnal: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "More enquiries for Karnal businesses, answered faster.",
    intro:
      "Karnal sits on the national highway between Delhi and Chandigarh, with a strong agricultural and dairy economy and fast-growing residential sectors. We help local businesses get found and turn searches into calls and visits.",
    market: [
      "Agriculture and dairy shape much of the local economy, from equipment and seed dealers to feed and milk processing. Farmers and dealers increasingly search Google and YouTube for products and suppliers before buying.",
      "New sectors and townships bring families who need schools, clinics, gyms and home services, and they choose from search and Maps.",
      "Highway businesses, from dhabas and restaurants to showrooms, compete for travellers searching on the move, where profiles, photos and reviews decide most visits.",
    ],
    sectors: ["home-improvement", "education", "healthcare", "real-estate"],
    searches: ["tractor parts dealer Karnal", "dairy equipment supplier Haryana", "best school in Sector 13 Karnal", "dhaba on Karnal highway", "Which hospitals in Karnal have a cardiologist?"],
    faqs: [
      { q: "Can SEO help an agri or dairy business reach more buyers?", a: "Yes. Product pages and practical guides that answer the questions dealers and farmers search for, plus accurate listings, bring steady enquiries from across the region." },
      { q: "Do you handle Google Business Profiles for highway businesses?", a: "Yes. Accurate hours, photos, menus or products, and a steady flow of reviews make a big difference for travellers deciding where to stop." },
    ],
  },
  {
    slug: "dehradun",
    city: "Dehradun",
    region: "Uttarakhand",
    metaTitle: "SEO Agency in Dehradun: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Dehradun: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Get Dehradun's students, families and travellers to choose you.",
    intro:
      "Dehradun is known for its schools and institutes, and as the gateway to Mussoorie, Rishikesh and the Char Dham routes. We help education, hospitality and local businesses win the searches that bring admissions, bookings and visits.",
    market: [
      "Parents across India research Dehradun's schools for months, comparing boarding facilities, curriculum, fees and reviews. Clear admission pages and responsive enquiry handling matter more than advertising volume.",
      "Travellers heading to the hills search for stays, taxis and packages, often in the same week they travel. Route pages, honest pricing and a strong Maps profile win those searches.",
      "A growing residential market and retirees moving to the valley also drive demand for real estate, healthcare and home services.",
    ],
    sectors: ["education", "hospitality", "travel-tourism", "real-estate"],
    searches: ["best boarding school in Dehradun fees", "Dehradun to Mussoorie taxi", "homestay near Rajpur Road", "Char Dham yatra package from Dehradun", "Which Dehradun schools offer IB?"],
    faqs: [
      { q: "Can you help a Dehradun school with admissions enquiries?", a: "Yes. Clear admission and fee pages, answers to parents' common questions, content timed to the admission cycle, and AI visibility for 'best school' prompts." },
      { q: "Do you work with travel operators for Char Dham and Mussoorie?", a: "Yes. Route and package pages, Google profile and reviews, and seasonal content that answers road, weather and timing questions." },
    ],
  },
  {
    slug: "manali",
    city: "Manali",
    region: "Himachal Pradesh",
    metaTitle: "SEO Agency in Manali: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Manali: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Fill your Manali rooms and tours with direct bookings.",
    intro:
      "Manali draws honeymooners, families, bikers and adventure travellers, with Solang Valley, Atal Tunnel and the road to Lahaul and Ladakh. We help hotels, homestays and operators win those bookings directly instead of through portals.",
    market: [
      "Travellers compare dozens of similar stays and packages. Real photos, clear inclusions, recent reviews and pages that answer their questions are what make them choose one over another.",
      "Seasonality is extreme: summer holidays, snowfall and New Year peak hard, while the monsoon and shoulder months are quiet. Content should follow that calendar, published before each peak so it ranks in time.",
      "Adventure operators for paragliding, rafting, skiing and bike trips compete for the same visitors, so clear safety information and booking flows build trust.",
    ],
    sectors: ["travel-tourism", "hospitality"],
    searches: ["homestay in Old Manali with view", "Manali honeymoon package 4 days", "Solang Valley paragliding price", "Manali to Atal Tunnel taxi", "Is Rohtang Pass open in May?"],
    faqs: [
      { q: "Can SEO help a Manali homestay depend less on booking portals?", a: "Yes. Ranking your own pages for the stays travellers search for, a strong Google profile and genuine reviews all grow the share of bookings that come to you directly." },
      { q: "Do you work with adventure and tour operators?", a: "Yes. Package and activity pages with prices, inclusions and safety details, plus seasonal content that answers what travellers ask." },
    ],
  },
  {
    slug: "dharamshala",
    city: "Dharamshala",
    region: "Himachal Pradesh",
    metaTitle: "SEO Agency in Dharamshala: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Dharamshala: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Be the stay, café or trek that Dharamshala visitors pick.",
    intro:
      "Dharamshala and McLeod Ganj attract spiritual travellers, trekkers, cricket fans and remote workers from India and abroad. We help local hospitality and tour businesses win those searches and bookings directly.",
    market: [
      "Visitors here often stay longer and plan more: Triund and Indrahar treks, monasteries, meditation courses and workations. Detailed, honest pages answer their questions and win their trust.",
      "Many guests are international, searching in English on Google, Maps and AI assistants. Clear information, good photos and reviews help them choose from far away.",
      "Cafés and small hotels compete in a dense area, so Maps visibility, accurate hours and recent reviews matter as much as the website.",
    ],
    sectors: ["hospitality", "travel-tourism"],
    searches: ["Triund trek guide from McLeod Ganj", "homestay in Dharamkot for a month", "best café in McLeod Ganj", "Dharamshala cricket stadium hotel", "Is Triund trek safe in winter?"],
    faqs: [
      { q: "Can you help with international guests?", a: "Yes. We write clear English pages, keep your Google profile complete, and make sure AI assistants can find accurate information about your stay or tours." },
      { q: "Do you help cafés and restaurants?", a: "Yes. For cafés, Maps, photos, menus, reviews and Instagram usually matter most, and we keep your listings accurate everywhere AI assistants look." },
    ],
  },
  {
    slug: "delhi-ncr",
    city: "Delhi NCR",
    region: "Delhi, Gurugram & Noida",
    metaTitle: "SEO Agency in Delhi NCR: Local SEO, AEO & GEO",
    metaDescription:
      "SEO in Delhi NCR: rank on Google and Maps, win AI Overview answers and get recommended by ChatGPT and Gemini. Free AI visibility audit.",
    headline: "Win Delhi NCR searches without outspending everyone.",
    intro:
      "Delhi NCR is India's most competitive market for almost every category. Big budgets chase the same searches, so the businesses that win organically are the ones with the clearest pages, the strongest local signals and the facts AI assistants can trust.",
    market: [
      "Advertising costs in NCR are high, which makes organic visibility on Google, Maps and AI answers one of the most valuable channels a business can build.",
      "AI search is changing how NCR buyers shortlist: professionals ask ChatGPT and Google AI Overviews for the best clinic, school, builder or agency. Clear, consistent, well-structured information makes you easier to recommend.",
      "We work with NCR businesses remotely and in person when it helps, covering SEO, AEO and GEO as one programme.",
    ],
    sectors: ["real-estate", "healthcare", "education", "interior-design"],
    searches: ["luxury apartments Golf Course Road Gurugram", "dermatologist in South Delhi", "modular kitchen company Noida", "best preschool in Dwarka", "Which hospitals in Gurugram are best for knee replacement?"],
    faqs: [
      { q: "You're based in the Tricity. Can you work with NCR businesses?", a: "Yes. Most of our work happens over calls and email, and we travel to NCR when meeting in person helps." },
      { q: "How do you compete with bigger brands in NCR search?", a: "By targeting specific, high-intent searches bigger brands neglect, building genuinely better pages for them, and earning local and industry mentions that make you easy for Google and AI assistants to recommend." },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

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
};

/** What the animated mock screen shows at one stage of a system walkthrough. */
export type FlowScreen =
  | { type: "ad"; brand: string; headline: string; cta: string }
  | { type: "page"; url: string; heading: string; chips: string[]; cta: string }
  | { type: "chat"; name: string; messages: { from: "customer" | "assistant"; text: string }[] }
  | { type: "checklist"; title: string; rows: [string, string][]; badge: string }
  | { type: "calendar"; title: string; day: number; time: number; slot: string; note: string }
  | { type: "notify"; items: { time: string; text: string }[]; done?: string }
  | { type: "map"; query: string; places: string[] };

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
    slug: "clinic-appointment-flow",
    kind: "concept",
    title: "Appointment and recall automation",
    summary: "An appointment book that fills itself, day and night.",
    client: "Concept for a multi-location dental clinic",
    industry: "Healthcare",
    art: "pulse",
    challenge:
      "Front-desk staff juggle phones and WhatsApp, after-hours calls go unanswered, and no-shows leave gaps in the schedule.",
    services: ["Local SEO", "WhatsApp booking assistant", "Reminders & recalls", "Clinic software integration"],
    solution:
      "Optimised Google Business Profiles for each branch, an assistant that books and reschedules appointments at any hour, and reminder and recall flows connected to the clinic's scheduling system.",
    outcomes: [],
    flow: [
      {
        node: "Local search",
        title: "Found on the map for every branch",
        body: "An optimised Google Business Profile for each branch, so a search for a dentist nearby leads to the closest clinic.",
        screen: { type: "map", query: "dentist near me", places: ["Smile Studio · Sector 17", "Smile Studio · Model Town", "Smile Studio · Civil Lines"] },
      },
      {
        node: "Booking AI",
        title: "Booked at 10 pm, no front desk needed",
        body: "Patients book, reschedule or cancel on WhatsApp at any hour, with the assistant offering real open slots.",
        screen: {
          type: "chat",
          name: "Smile Studio",
          messages: [
            { from: "customer", text: "Can I get a cleaning appointment tomorrow?" },
            { from: "assistant", text: "Of course. At Model Town tomorrow I have 10:30 am or 4:00 pm. Which suits you?" },
            { from: "customer", text: "4:00 please" },
            { from: "assistant", text: "Done! You're booked for 4:00 pm tomorrow. I'll send a reminder in the morning." },
          ],
        },
      },
      {
        node: "Clinic system",
        title: "Written straight into the schedule",
        body: "Appointments, reschedules and cancellations sync to the clinic's scheduling software, so the front desk sees them instantly.",
        screen: { type: "calendar", title: "Model Town · Chair 2", day: 1, time: 3, slot: "Tue · 16:00", note: "Synced to clinic software" },
      },
      {
        node: "Reminders",
        title: "Reminders before every visit",
        body: "A WhatsApp reminder the day before and on the morning, with one-tap rescheduling if plans change.",
        screen: {
          type: "notify",
          items: [
            { time: "Mon · 6:00 pm", text: "Reminder: cleaning tomorrow at 4:00 pm, Model Town. Reply 1 to confirm or 2 to reschedule." },
            { time: "Tue · 9:00 am", text: "See you at 4:00 pm today. Parking is available behind the clinic." },
          ],
          done: "Confirmed by patient",
        },
      },
      {
        node: "Recall",
        title: "Recalls that bring patients back",
        body: "Six months later the patient is invited back for a check-up, and can book again in the same chat.",
        screen: {
          type: "notify",
          items: [{ time: "6 months later", text: "It's been six months since your last check-up. Shall I find you a slot this week?" }],
          done: "Check-up booked again",
        },
      },
    ],
  },
];

export const projects = () => work.filter((w) => w.kind === "project");
export const concepts = () => work.filter((w) => w.kind === "concept");

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}

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
};

export const work: WorkItem[] = [
  // Live projects. TODO(owner): confirm each description and the services Zenyro provided.
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
    services: ["Website design & development"],
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
    services: ["Website design & development"],
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
    services: ["Website design & development"],
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
    services: ["Website design & development"],
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
    services: ["Website design & development"],
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
    services: ["Website design & development"],
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
  },
];

export const projects = () => work.filter((w) => w.kind === "project");
export const concepts = () => work.filter((w) => w.kind === "concept");

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}

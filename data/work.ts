import type { IndustryArt } from "./industries";

/**
 * Portfolio entries. Zenyro has not published client case studies yet, so every entry below is a
 * clearly labelled concept demonstration. When a real project is ready, add it with
 * kind: "case-study" and only include outcomes that the client has verified and approved.
 */
export type WorkItem = {
  slug: string;
  kind: "concept" | "case-study";
  title: string;
  client: string;
  industry: string;
  art: IndustryArt;
  challenge: string;
  services: string[];
  solution: string;
  /** Verified outcomes only. Leave empty for concepts. */
  outcomes: string[];
};

export const work: WorkItem[] = [
  {
    slug: "residential-launch-engine",
    kind: "concept",
    title: "Residential launch engine",
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

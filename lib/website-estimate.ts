import {
  bookingOptions,
  contentOptions,
  designLevels,
  ecommerceOptions,
  features as featureOptions,
  industries,
  MIN_WEEKS,
  pageCounts,
  phaseShares,
  pricingMeta,
  timelines,
  URGENT_COMPRESSION,
  websiteTypes,
  type Range,
} from "../data/pricing.ts";

export type EstimateInput = {
  industry: string;
  type: string;
  pages: string;
  features: string[];
  booking: string;
  ecommerce: string;
  design: string;
  content: string;
  timeline: string;
};

export type Estimate = {
  budget: Range;
  weeks: Range;
  phases: { name: string; weeks: Range; outcome: string }[];
  technology: { name: string; reason: string }[];
  suggestedFeatures: string[];
  assumptions: string[];
  lineItems: { label: string; cost: Range }[];
};

const find = <T extends { id: string }>(list: T[], id: string) => list.find((o) => o.id === id);
const round = (n: number) => Math.round(n / pricingMeta.roundTo) * pricingMeta.roundTo;

/** Feature work largely runs in parallel with page build, so only half of each feature's weeks extend the timeline. */
const FEATURE_WEEK_SHARE = 0.5;

const industryFeatures: Record<string, string[]> = {
  "real-estate": ["Project pages with floor plans and price bands", "WhatsApp enquiry with qualification", "Site-visit booking"],
  hospitality: ["Direct booking engine integration", "Wedding and events enquiry flow", "Image-led room and venue pages"],
  healthcare: ["Doctor and treatment pages reviewed by clinicians", "Appointment booking with reminders", "Location pages for each clinic"],
  education: ["Program pages with eligibility and fees", "Counselling call booking", "Lead scoring for admissions"],
  "interior-retail": ["Portfolio organised by style and project type", "Consultation booking with budget qualification", "Showroom location and visit booking"],
  "home-improvement": ["Product and specification pages", "Dealer locator", "Quote request with photo upload"],
  professional: ["Service pages with clear outcomes", "Case studies", "Consultation booking"],
  other: ["Clear service pages", "Enquiry tracking", "Fast mobile performance"],
};

export function estimateWebsite(input: EstimateInput): Estimate {
  const type = find(websiteTypes, input.type) ?? websiteTypes[1]!;
  const pages = find(pageCounts, input.pages) ?? pageCounts[0]!;
  const booking = find(bookingOptions, input.booking) ?? bookingOptions[0]!;
  const ecommerce = find(ecommerceOptions, input.ecommerce) ?? ecommerceOptions[0]!;
  const design = find(designLevels, input.design) ?? designLevels[1]!;
  const content = find(contentOptions, input.content) ?? contentOptions[0]!;
  const timeline = find(timelines, input.timeline) ?? timelines[1]!;
  const industry = find(industries, input.industry) ?? industries[industries.length - 1]!;
  const selected = input.features.map((id) => find(featureOptions, id)).filter((f): f is (typeof featureOptions)[number] => !!f);

  const items: { label: string; cost: Range; weeks: Range; parallel?: boolean }[] = [
    { label: type.label, cost: type.cost, weeks: type.weeks },
    { label: pages.label, cost: pages.cost, weeks: pages.weeks },
    ...selected.map((f) => ({ label: f.label, cost: f.cost, weeks: f.weeks, parallel: true })),
    { label: booking.label, cost: booking.cost, weeks: booking.weeks },
    { label: ecommerce.label, cost: ecommerce.cost, weeks: ecommerce.weeks },
    { label: content.label, cost: content.cost, weeks: content.weeks },
  ];

  const sub: Range = items.reduce<Range>((acc, i) => [acc[0] + i.cost[0], acc[1] + i.cost[1]], [0, 0]);
  const multiplier = (k: 0 | 1) => design.factor[k] * timeline.factor[k] * (1 + industry.adjust);
  const budget: Range = [round(sub[0] * multiplier(0)), round(sub[1] * multiplier(1))];
  if (budget[1] < budget[0]) budget[1] = budget[0];

  let weeks: Range = items.reduce<Range>(
    (acc, i) => [acc[0] + i.weeks[0] * (i.parallel ? FEATURE_WEEK_SHARE : 1), acc[1] + i.weeks[1] * (i.parallel ? FEATURE_WEEK_SHARE : 1)],
    [0, 0],
  );
  weeks = [weeks[0] + design.weeks[0] + timeline.weeks[0], weeks[1] + design.weeks[1] + timeline.weeks[1]];
  if (timeline.id === "fast") weeks = [weeks[0] * URGENT_COMPRESSION, weeks[1] * URGENT_COMPRESSION];
  weeks = [Math.max(MIN_WEEKS, Math.round(weeks[0])), Math.max(MIN_WEEKS, Math.round(weeks[1]))];
  if (weeks[1] < weeks[0]) weeks[1] = weeks[0];

  const phases = phaseShares.map((p) => ({
    name: p.name,
    outcome: p.outcome,
    weeks: [Math.max(0.5, Math.round(weeks[0] * p.share * 2) / 2), Math.max(0.5, Math.round(weeks[1] * p.share * 2) / 2)] as Range,
  }));

  return {
    budget,
    weeks,
    phases,
    technology: recommendTechnology(input),
    suggestedFeatures: (industryFeatures[industry.id] ?? industryFeatures.other!).filter(Boolean),
    assumptions: buildAssumptions(input, industry.note),
    lineItems: items.filter((i) => i.cost[1] > 0).map((i) => ({ label: i.label, cost: i.cost })),
  };
}

function recommendTechnology(input: EstimateInput): { name: string; reason: string }[] {
  const tech: { name: string; reason: string }[] = [];
  if (input.ecommerce === "large") {
    tech.push({ name: "Shopify Plus or headless commerce with Next.js", reason: "Large catalogues need robust inventory, payments and integrations." });
  } else if (input.ecommerce !== "none" || input.type === "ecommerce") {
    tech.push({ name: "Shopify, or Next.js with a commerce backend", reason: "Reliable checkout and payments with room for a custom storefront." });
  } else if (input.type === "app") {
    tech.push({ name: "Next.js with a managed database (e.g. Supabase or PostgreSQL)", reason: "Secure accounts, dashboards and custom workflows in one codebase." });
  } else if (input.type === "landing") {
    tech.push({ name: "Next.js static site on Vercel", reason: "Near-instant loading for paid traffic and easy A/B variations." });
  } else {
    tech.push({ name: "Next.js on Vercel", reason: "Fast, search-friendly pages with server rendering and strong Core Web Vitals." });
  }
  if (input.features.includes("cms") || input.features.includes("blog") || input.type === "content") {
    tech.push({ name: "Headless CMS (e.g. Sanity, Contentful or WordPress headless)", reason: "Your team edits pages and articles without a developer." });
  }
  if (input.features.includes("forms-crm")) tech.push({ name: "CRM integration (HubSpot, Zoho or similar)", reason: "Every enquiry lands in your sales pipeline with its source." });
  if (input.features.includes("ai-assistant")) tech.push({ name: "AI assistant with approved knowledge base", reason: "Answers questions and qualifies leads, with hand-off to your team." });
  if (input.booking === "appointments" || input.booking === "scheduler") tech.push({ name: "Cal.com or Calendly integration", reason: "Visitors book directly into your calendar with reminders." });
  if (input.booking === "hotel-engine") tech.push({ name: "Your booking engine or channel manager", reason: "Direct bookings without replacing systems your team already uses." });
  if (input.design === "immersive") tech.push({ name: "React Three Fiber (WebGL)", reason: "Interactive 3D, loaded only on capable devices to protect speed." });
  return tech;
}

function buildAssumptions(input: EstimateInput, industryNote?: string) {
  const a = [
    "Prices are indicative ranges in Indian rupees, excluding GST, and are not a quotation.",
    "Domain, hosting, paid plugins, third-party subscriptions and advertising spend are not included.",
    "Assumes two rounds of design revisions and timely feedback and content from your team.",
    "A fixed quote follows a short discovery call and written scope.",
    `Pricing rules version ${pricingMeta.version}.`,
  ];
  if (input.content === "ready") a.push("Assumes final copy and images are supplied before development starts.");
  if (input.timeline === "fast") a.push("Urgent delivery depends on team availability at the time of booking.");
  if (industryNote) a.push(industryNote);
  return a;
}

export const formatInr = (n: number) => "₹" + n.toLocaleString("en-IN");
export const formatRange = (r: Range) => `${formatInr(r[0])} – ${formatInr(r[1])}`;
export const formatWeeks = (r: Range) => (r[0] === r[1] ? `${r[0]} weeks` : `${r[0]}–${r[1]} weeks`);

/** Plain-text project brief the visitor can download. */
export function estimateToMarkdown(input: EstimateInput, e: Estimate, toolUrl: string) {
  const label = <T extends { id: string; label: string }>(list: T[], id: string) => list.find((o) => o.id === id)?.label ?? id;
  const lines = [
    "# Website project brief",
    "",
    `Generated with the Zenyro website cost calculator (pricing rules ${pricingMeta.version}).`,
    "This is an indicative estimate, not a quotation.",
    "",
    "## Project",
    `- Industry: ${label(industries, input.industry)}`,
    `- Website type: ${label(websiteTypes, input.type)}`,
    `- Pages: ${label(pageCounts, input.pages)}`,
    `- Features: ${input.features.map((f) => label(featureOptions, f)).join(", ") || "None selected"}`,
    `- Booking: ${label(bookingOptions, input.booking)}`,
    `- E-commerce: ${label(ecommerceOptions, input.ecommerce)}`,
    `- Design: ${label(designLevels, input.design)}`,
    `- Content: ${label(contentOptions, input.content)}`,
    `- Timeline preference: ${label(timelines, input.timeline)}`,
    "",
    "## Estimate",
    `- Budget range: ${formatRange(e.budget)} (excluding GST)`,
    `- Timeline: ${formatWeeks(e.weeks)}`,
    "",
    "## Phases",
    ...e.phases.map((p) => `- ${p.name} (${formatWeeks(p.weeks)}): ${p.outcome}`),
    "",
    "## Recommended technology",
    ...e.technology.map((t) => `- ${t.name}: ${t.reason}`),
    "",
    "## Features to consider",
    ...e.suggestedFeatures.map((f) => `- ${f}`),
    "",
    "## Assumptions",
    ...e.assumptions.map((a) => `- ${a}`),
    "",
    `Request a custom proposal: ${toolUrl}`,
  ];
  return lines.join("\n");
}

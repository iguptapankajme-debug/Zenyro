import { z } from "zod";

/** Inputs for the website brief generator. Every value is bounded so it can be passed safely to templates and AI. */
export const briefIndustries = [
  ["real-estate", "Real estate"], ["hospitality", "Hotels & hospitality"], ["healthcare", "Healthcare & clinics"], ["education", "Education"],
  ["interior-retail", "Interior design & premium retail"], ["home-improvement", "Home improvement & building materials"],
  ["professional", "Professional services"], ["other", "Other"],
] as const;
export const briefObjectives = [
  ["leads", "Generate enquiries"], ["sell", "Sell online"], ["bookings", "Take bookings"], ["credibility", "Build credibility"],
  ["recruit", "Recruit people"], ["support", "Inform and support customers"],
] as const;
export const briefFeatures = [
  ["cms", "Editable content"], ["blog", "Blog or insights"], ["crm", "CRM integration"], ["whatsapp", "WhatsApp chat"],
  ["ai-assistant", "AI chat assistant"], ["multilingual", "Multiple languages"], ["accounts", "Customer accounts"],
  ["booking", "Online booking"], ["payments", "Online payments"], ["search", "Site search"],
] as const;
export const briefBudgets = [
  ["under-1l", "Under ₹1 lakh"], ["1-3l", "₹1–3 lakh"], ["3-7l", "₹3–7 lakh"], ["7l-plus", "Above ₹7 lakh"], ["unsure", "Not sure yet"],
] as const;
export const briefDesigns = [
  ["minimal", "Clean and minimal"], ["editorial", "Editorial and premium"], ["bold", "Bold and energetic"], ["warm", "Warm and approachable"], ["immersive", "Immersive and interactive"],
] as const;
export const briefTimelines = [
  ["asap", "Within a month"], ["1-3m", "1–3 months"], ["3-6m", "3–6 months"], ["flexible", "Flexible"],
] as const;
export const briefReach = [["local", "One city or region"], ["national", "Across the country"], ["international", "International"]] as const;

const ids = <T extends readonly (readonly [string, string])[]>(list: T) => list.map(([id]) => id) as [T[number][0], ...T[number][0][]];
const label = (list: readonly (readonly [string, string])[], id: string) => list.find(([k]) => k === id)?.[1] ?? id;
const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a");

export const briefInputSchema = z.object({
  businessName: z.string().trim().max(80).default(""),
  industry: z.enum(ids(briefIndustries)),
  description: z.string().trim().min(10, "Tell us a little about the business (at least 10 characters).").max(500),
  audience: z.string().trim().min(5, "Describe your customers in a few words.").max(300),
  reach: z.enum(ids(briefReach)),
  objectives: z.array(z.enum(ids(briefObjectives))).min(1, "Choose at least one objective.").max(6),
  features: z.array(z.enum(ids(briefFeatures))).max(10),
  budget: z.enum(ids(briefBudgets)),
  design: z.enum(ids(briefDesigns)),
  timeline: z.enum(ids(briefTimelines)),
});
export type BriefInput = z.infer<typeof briefInputSchema>;

export const briefSchema = z.object({
  title: z.string(),
  summary: z.string(),
  audience: z.string(),
  goals: z.array(z.string()),
  pages: z.array(z.object({ name: z.string(), purpose: z.string() })),
  features: z.array(z.object({ name: z.string(), specification: z.string() })),
  technology: z.array(z.object({ option: z.string(), bestFor: z.string() })),
  seo: z.array(z.string()),
  complexity: z.object({ level: z.enum(["Low", "Medium", "High"]), reason: z.string() }),
  phases: z.array(z.object({ name: z.string(), duration: z.string(), outcome: z.string() })),
  nextSteps: z.array(z.string()),
});
export type Brief = z.infer<typeof briefSchema>;

const industryPages: Record<string, [string, string][]> = {
  "real-estate": [["Projects", "Every current and upcoming project with status, location and price band"], ["Project detail", "Floor plans, amenities, RERA details, location map and enquiry"], ["Locations", "Neighbourhood guides that answer buyers' location questions"]],
  hospitality: [["Rooms & suites", "Room types with photos, amenities and direct booking"], ["Weddings & events", "Venues, capacities and an event enquiry flow"], ["Gallery", "Image-led tour of the property"]],
  healthcare: [["Treatments", "Clinician-reviewed explanations of each treatment"], ["Doctors", "Profiles with qualifications and consultation timings"], ["Locations", "Address, timings and directions for each clinic"]],
  education: [["Programs", "Each program with eligibility, duration, fees and outcomes"], ["Admissions", "Process, dates and a counselling-call booking"], ["Faculty", "Profiles that build trust in teaching quality"]],
  "interior-retail": [["Portfolio", "Projects organised by style, space and budget band"], ["Process", "How a project runs, from consultation to handover"], ["Showroom", "Location, timings and visit booking"]],
  "home-improvement": [["Products", "Ranges with specifications and finishes"], ["Dealer locator", "Find the nearest dealer or showroom"], ["Request a quote", "Measurements, photos and preferences in one form"]],
  professional: [["Services", "One page per service with outcomes and process"], ["Case studies", "Problems solved and approach taken"], ["Insights", "Expert articles that answer client questions"]],
  other: [["Services", "Clear pages for what you offer"], ["How it works", "Your process in simple steps"]],
};

const objectivePages: Record<string, [string, string][]> = {
  leads: [["Contact & enquiry", "Short form, WhatsApp and call options with response promise"]],
  sell: [["Shop", "Product listing with filters"], ["Product page", "Photos, specifications, price and add to cart"], ["Cart & checkout", "Secure payment and order confirmation"], ["Shipping & returns", "Policies that reduce purchase hesitation"]],
  bookings: [["Book now", "Availability and booking in a few steps"]],
  credibility: [["About & team", "Story, people and credentials"], ["Reviews", "Genuine customer feedback from verifiable sources"]],
  recruit: [["Careers", "Open roles, culture and application form"]],
  support: [["FAQ & help", "Answers to common questions, written answer-first"], ["Resources", "Guides and downloads"]],
};

const featureSpecs: Record<string, string> = {
  cms: "Headless CMS with page, section and media editing, preview before publishing and role-based access.",
  blog: "Article templates with categories, author profiles, related posts and structured data.",
  crm: "Every form and chat enquiry sent to the CRM with source, page and campaign attribution.",
  whatsapp: "Click-to-WhatsApp on key pages, with pre-filled messages that identify the page the visitor came from.",
  "ai-assistant": "AI assistant answering only from approved content, qualifying enquiries and handing over to staff when unsure.",
  multilingual: "Translated content with language switcher and hreflang tags; URLs per language.",
  accounts: "Secure sign-in, profile, order or booking history; passwordless or OTP login.",
  booking: "Real-time availability, confirmation messages and reminders; syncs with the team calendar.",
  payments: "Payment gateway (e.g. Razorpay or Stripe) with GST-ready invoices and refunds.",
  search: "Instant site search across pages, products or articles, with typo tolerance.",
};

export function generateBrief(input: BriefInput): Brief {
  const name = input.businessName || `Your ${label(briefIndustries, input.industry).toLowerCase()} business`;
  const pages: { name: string; purpose: string }[] = [
    { name: "Home", purpose: "Explain the offer in one screen and lead visitors to the most valuable next step" },
    ...(industryPages[input.industry] ?? industryPages.other!).map(([n, p]) => ({ name: n, purpose: p })),
    ...input.objectives.flatMap((o) => (objectivePages[o] ?? []).map(([n, p]) => ({ name: n, purpose: p }))),
    { name: "About", purpose: "Who you are and why customers can trust you" },
    { name: "Privacy & terms", purpose: "Legal pages covering data collection and use" },
  ];
  const seen = new Set<string>();
  const uniquePages = pages.filter((p) => (seen.has(p.name) ? false : (seen.add(p.name), true)));

  const featureList = [...input.features];
  if (input.objectives.includes("sell") && !featureList.includes("payments")) featureList.push("payments");
  if (input.objectives.includes("bookings") && !featureList.includes("booking")) featureList.push("booking");
  if (input.objectives.includes("leads") && !featureList.includes("crm")) featureList.push("crm");
  const features = featureList.map((f) => ({ name: label(briefFeatures, f), specification: featureSpecs[f] ?? "" }));
  features.push({ name: "Analytics & conversion tracking", specification: "Privacy-friendly analytics with events for enquiries, bookings or purchases, and campaign attribution." });

  const score = featureList.length + (featureList.includes("accounts") ? 3 : 0) + (featureList.includes("payments") ? 3 : 0) + (input.design === "immersive" ? 3 : 0) + (uniquePages.length > 12 ? 2 : 0);
  const level: Brief["complexity"]["level"] = score >= 9 ? "High" : score >= 5 ? "Medium" : "Low";
  const drivers = [
    featureList.includes("payments") && "online payments",
    featureList.includes("accounts") && "customer accounts",
    input.design === "immersive" && "immersive design",
    featureList.includes("ai-assistant") && "an AI assistant",
    featureList.includes("multilingual") && "multiple languages",
    uniquePages.length > 12 && `${uniquePages.length} page types`,
  ].filter(Boolean) as string[];

  const technology: Brief["technology"] = featureList.includes("payments")
    ? [
        { option: "Shopify (optionally with a custom Next.js storefront)", bestFor: "Reliable checkout, inventory and payments with low maintenance." },
        { option: "Next.js with a headless commerce backend", bestFor: "Full design freedom and speed when the catalogue or checkout is unusual." },
      ]
    : [
        { option: "Next.js with a headless CMS", bestFor: "Fast, search-friendly pages, custom design and easy editing for your team." },
        { option: "WordPress (headless or classic)", bestFor: "Teams already trained on WordPress who prioritise familiar editing over custom performance." },
      ];
  if (featureList.includes("accounts")) technology.push({ option: "Managed database and auth (e.g. Supabase)", bestFor: "Secure logins and customer data without running your own servers." });

  const seo = [
    "One clear search intent per page, with unique titles, descriptions and a single H1.",
    "Server-rendered HTML, XML sitemap, robots.txt and canonical URLs from launch.",
    "Fast mobile performance (good Core Web Vitals) on mid-range phones.",
    "Accurate structured data for the organisation and key content types.",
  ];
  if (input.reach === "local") seo.push("Local SEO: Google Business Profile, consistent business details and genuine location pages.");
  if (input.reach === "international" || featureList.includes("multilingual")) seo.push("International SEO: language or country URLs with hreflang tags.");
  if (input.industry === "healthcare") seo.push("Medical content reviewed by qualified clinicians, with author credentials shown.");
  if (input.objectives.includes("support")) seo.push("Answer-first FAQ and help content that can be quoted by answer engines and AI search.");

  const weeks = level === "High" ? [12, 16] : level === "Medium" ? [7, 10] : [4, 6];
  const split = (share: number) => `${Math.max(1, Math.round(weeks[0]! * share))}–${Math.max(1, Math.round(weeks[1]! * share))} weeks`;

  return {
    title: `${name}: website development brief`,
    summary: `${name} needs ${article(label(briefDesigns, input.design))} ${label(briefDesigns, input.design).toLowerCase()} website focused on ${input.objectives.map((o) => label(briefObjectives, o).toLowerCase()).join(", ")}. ${input.description}`,
    audience: `${input.audience} Reach: ${label(briefReach, input.reach).toLowerCase()}.`,
    goals: input.objectives.map((o) => label(briefObjectives, o)),
    pages: uniquePages,
    features,
    technology,
    seo,
    complexity: { level, reason: drivers.length ? `Driven by ${drivers.join(", ")}.` : "A focused site with standard features." },
    phases: [
      { name: "Discovery", duration: split(0.15), outcome: "Agreed sitemap, content plan and success metrics" },
      { name: "Design", duration: split(0.25), outcome: "Approved designs for key pages on mobile and desktop" },
      { name: "Build & content", duration: split(0.4), outcome: "Working site with integrations and content loaded" },
      { name: "Test & launch", duration: split(0.2), outcome: "QA, performance and SEO checks, then go-live" },
    ],
    nextSteps: [
      `Confirm the budget range (${label(briefBudgets, input.budget)}) against the scope and complexity above.`,
      `Agree a launch date (${label(briefTimelines, input.timeline).toLowerCase()}) and who supplies content.`,
      "Collect brand assets, existing analytics access and examples of websites you like.",
    ],
  };
}

export function briefToMarkdown(b: Brief) {
  return [
    `# ${b.title}`,
    "",
    b.summary,
    "",
    "## Audience", b.audience,
    "", "## Goals", ...b.goals.map((g) => `- ${g}`),
    "", "## Recommended pages", ...b.pages.map((p) => `- **${p.name}**: ${p.purpose}`),
    "", "## Feature specifications", ...b.features.map((f) => `- **${f.name}**: ${f.specification}`),
    "", "## Technology options", ...b.technology.map((t) => `- **${t.option}**: ${t.bestFor}`),
    "", "## SEO considerations", ...b.seo.map((s) => `- ${s}`),
    "", `## Estimated complexity: ${b.complexity.level}`, b.complexity.reason,
    "", "## Implementation phases", ...b.phases.map((p) => `- **${p.name}** (${p.duration}): ${p.outcome}`),
    "", "## Next steps", ...b.nextSteps.map((s) => `- ${s}`),
    "", "Generated with the Zenyro website brief generator.",
  ].join("\n");
}

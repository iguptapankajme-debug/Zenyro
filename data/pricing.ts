/**
 * WEBSITE COST CALCULATOR: PRICING RULES
 *
 * Edit this file to change the estimates shown by /tools/website-cost-calculator.
 * Every amount is in Indian rupees (excluding GST) and every rule is a min–max range, so the
 * calculator always shows an honest band rather than a single number.
 *
 *   cost:   [min, max] added to the estimate
 *   weeks:  [min, max] added to the delivery timeline
 *   factor: multiplier applied to the subtotal (design and timeline only)
 *
 * The engine in lib/website-estimate.ts sums the selected rules, applies the multipliers and
 * rounds the result to the nearest ROUND_TO. Nothing is random.
 */

export const pricingMeta = {
  currency: "INR",
  roundTo: 5000,
  /** Shown with every estimate. */
  version: "2026-10",
};

export type Range = [number, number];
export type Option = { id: string; label: string; hint?: string; cost: Range; weeks: Range };
export type FactorOption = { id: string; label: string; hint?: string; factor: Range; weeks: Range };

export const industries: { id: string; label: string; adjust: number; note?: string }[] = [
  { id: "real-estate", label: "Real estate", adjust: 0 },
  { id: "hospitality", label: "Hotels & hospitality", adjust: 0 },
  { id: "healthcare", label: "Healthcare & clinics", adjust: 0.1, note: "Includes extra review for medical content and patient data handling." },
  { id: "education", label: "Education", adjust: 0 },
  { id: "interior-retail", label: "Interior design & premium retail", adjust: 0 },
  { id: "home-improvement", label: "Home improvement & building materials", adjust: 0 },
  { id: "professional", label: "Professional services", adjust: 0 },
  { id: "other", label: "Other", adjust: 0 },
];

export const websiteTypes: Option[] = [
  { id: "landing", label: "Landing page", hint: "One focused page for a campaign or launch", cost: [25000, 60000], weeks: [2, 3] },
  { id: "business", label: "Business website", hint: "Services, about, contact and enquiry paths", cost: [80000, 180000], weeks: [5, 8] },
  { id: "content", label: "Content-rich website", hint: "Many pages, articles, resources or locations", cost: [150000, 350000], weeks: [7, 10] },
  { id: "ecommerce", label: "Online store", hint: "Products, cart and payments", cost: [200000, 500000], weeks: [8, 12] },
  { id: "app", label: "Web app or portal", hint: "Logins, dashboards and custom workflows", cost: [400000, 1000000], weeks: [10, 16] },
];

export const pageCounts: Option[] = [
  { id: "1-5", label: "1–5 pages", cost: [0, 0], weeks: [0, 0] },
  { id: "6-15", label: "6–15 pages", cost: [30000, 60000], weeks: [1, 1] },
  { id: "16-30", label: "16–30 pages", cost: [70000, 140000], weeks: [2, 2] },
  { id: "30+", label: "More than 30 pages", cost: [150000, 300000], weeks: [3, 4] },
];

export const features: Option[] = [
  { id: "cms", label: "Editable content (CMS)", cost: [25000, 50000], weeks: [1, 1] },
  { id: "blog", label: "Blog or insights", cost: [15000, 30000], weeks: [0, 1] },
  { id: "forms-crm", label: "Lead forms + CRM integration", cost: [25000, 60000], weeks: [1, 1] },
  { id: "whatsapp", label: "WhatsApp chat", cost: [10000, 25000], weeks: [0, 0] },
  { id: "ai-assistant", label: "AI chat assistant", cost: [60000, 150000], weeks: [2, 3] },
  { id: "multilingual", label: "Multiple languages", cost: [40000, 90000], weeks: [1, 2] },
  { id: "search", label: "Site search", cost: [20000, 50000], weeks: [0, 1] },
  { id: "accounts", label: "Customer login / accounts", cost: [60000, 150000], weeks: [2, 3] },
  { id: "seo", label: "Technical SEO foundation", cost: [25000, 50000], weeks: [0, 1] },
  { id: "analytics", label: "Analytics & conversion tracking", cost: [15000, 30000], weeks: [0, 0] },
];

export const bookingOptions: Option[] = [
  { id: "none", label: "No booking needed", cost: [0, 0], weeks: [0, 0] },
  { id: "scheduler", label: "Simple scheduling", hint: "Calendar link for calls or visits", cost: [10000, 25000], weeks: [0, 0] },
  { id: "appointments", label: "Appointment system", hint: "Slots, confirmations and reminders", cost: [50000, 120000], weeks: [1, 2] },
  { id: "hotel-engine", label: "Hotel booking engine", hint: "Integrate your booking engine or channel manager", cost: [40000, 100000], weeks: [1, 2] },
];

export const ecommerceOptions: Option[] = [
  { id: "none", label: "No online sales", cost: [0, 0], weeks: [0, 0] },
  { id: "small", label: "Small catalogue", hint: "Up to 50 products", cost: [60000, 150000], weeks: [2, 3] },
  { id: "medium", label: "Medium catalogue", hint: "50–500 products", cost: [150000, 300000], weeks: [3, 5] },
  { id: "large", label: "Large catalogue", hint: "500+ products, integrations", cost: [300000, 600000], weeks: [5, 8] },
];

export const designLevels: FactorOption[] = [
  { id: "template", label: "Adapted template", hint: "Fastest, least distinctive", factor: [0.75, 0.85], weeks: [-1, -1] },
  { id: "custom", label: "Custom design", hint: "Designed for your brand", factor: [1, 1], weeks: [0, 0] },
  { id: "premium", label: "Premium custom", hint: "Editorial layouts and refined motion", factor: [1.25, 1.4], weeks: [1, 2] },
  { id: "immersive", label: "Immersive", hint: "Interactive 3D or WebGL experiences", factor: [1.6, 1.9], weeks: [2, 4] },
];

export const contentOptions: Option[] = [
  { id: "ready", label: "We have all content", cost: [0, 0], weeks: [0, 0] },
  { id: "copy", label: "Copywriting needed", hint: "SEO-aware copy for every page", cost: [30000, 80000], weeks: [1, 2] },
  { id: "media", label: "Photos / visuals needed", hint: "Sourcing, editing or a shoot brief", cost: [20000, 60000], weeks: [1, 1] },
  { id: "full", label: "Copy and visuals", cost: [50000, 130000], weeks: [1, 2] },
];

export const timelines: FactorOption[] = [
  { id: "flexible", label: "Flexible", hint: "We can schedule efficiently", factor: [0.95, 0.95], weeks: [1, 2] },
  { id: "standard", label: "Standard", hint: "Normal delivery", factor: [1, 1], weeks: [0, 0] },
  { id: "fast", label: "Urgent", hint: "Extra team capacity to compress the schedule", factor: [1.2, 1.3], weeks: [0, 0] },
];

/** Urgent projects compress the build timeline to this share of the standard duration (never below MIN_WEEKS). */
export const URGENT_COMPRESSION = 0.7;
export const MIN_WEEKS = 2;

/** How the overall timeline is split across phases. Shares must add up to 1. */
export const phaseShares: { name: string; share: number; outcome: string }[] = [
  { name: "Discovery & planning", share: 0.15, outcome: "Sitemap, content plan, technical plan" },
  { name: "Design", share: 0.25, outcome: "Approved page designs for desktop and mobile" },
  { name: "Development", share: 0.4, outcome: "Built, connected and content-loaded site" },
  { name: "Testing & launch", share: 0.2, outcome: "QA, speed and SEO checks, go-live" },
];

/**
 * Zenyro's two monthly plans, priced per market. Fixed local prices (not live exchange rates),
 * rounded to read naturally in each currency. Prices exclude local taxes such as VAT or GST.
 */
export type Currency = "USD" | "GBP" | "EUR" | "AED" | "CAD" | "AUD" | "SGD" | "INR";

export const currencies: { code: Currency; label: string; locale: string }[] = [
  { code: "USD", label: "US $", locale: "en-US" },
  { code: "GBP", label: "UK £", locale: "en-GB" },
  { code: "EUR", label: "EU €", locale: "en-IE" },
  { code: "AED", label: "AED", locale: "en-AE" },
  { code: "CAD", label: "CA $", locale: "en-CA" },
  { code: "AUD", label: "AU $", locale: "en-AU" },
  { code: "SGD", label: "SG $", locale: "en-SG" },
  { code: "INR", label: "₹ INR", locale: "en-IN" },
];

export type Plan = {
  key: "growth" | "authority";
  name: string;
  tagline: string;
  for: string;
  price: Record<Currency, number>;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    key: "growth",
    name: "Growth",
    tagline: "Rank on Google and start showing up in AI answers.",
    for: "Local and growing businesses competing in one city or region",
    price: { USD: 799, GBP: 649, EUR: 749, AED: 2950, CAD: 1099, AUD: 1249, SGD: 1079, INR: 39999 },
    features: [
      "Technical SEO audit and fixes",
      "Google Business Profile management (1 location)",
      "4 optimised pages or articles a month",
      "50 tracked keywords on Google",
      "AI visibility tracking: 25 prompts in ChatGPT, Gemini, Perplexity and AI Overviews",
      "Structured data and AI crawler setup",
      "Monthly report and strategy call",
    ],
  },
  {
    key: "authority",
    name: "Authority",
    tagline: "Own your category on Google and get recommended by AI.",
    for: "Brands competing nationally or across several countries",
    price: { USD: 1799, GBP: 1449, EUR: 1649, AED: 6600, CAD: 2449, AUD: 2749, SGD: 2399, INR: 89999 },
    featured: true,
    features: [
      "Everything in Growth",
      "10 optimised pages or articles a month",
      "200 tracked keywords, up to 3 countries or 5 locations",
      "AI visibility tracking: 100 prompts across 6 AI engines",
      "Entity, brand-fact and citation building for GEO",
      "Digital PR and authority links",
      "International or e-commerce SEO setup",
      "Dedicated strategist and fortnightly calls",
    ],
  },
];

export const planTerms = ["No setup fee", "Month to month", "Cancel with 30 days' notice"];

/** Industry surveys put the average agency SEO retainer at about this, in USD per month. */
export const typicalAgencyRetainerUSD = 3200;

/** A sensible default currency from the visitor's time zone. */
export function guessCurrency(timeZone: string): Currency {
  if (timeZone === "Europe/London") return "GBP";
  if (timeZone.startsWith("Europe/")) return "EUR";
  if (timeZone === "Asia/Dubai") return "AED";
  if (timeZone === "Asia/Singapore") return "SGD";
  if (timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta") return "INR";
  if (timeZone.startsWith("Australia/")) return "AUD";
  if (["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax", "America/Regina", "America/St_Johns", "America/Montreal"].includes(timeZone)) return "CAD";
  return "USD";
}

export function formatPrice(amount: number, code: Currency) {
  const c = currencies.find((x) => x.code === code)!;
  return new Intl.NumberFormat(c.locale, { style: "currency", currency: code, maximumFractionDigits: 0 }).format(amount);
}

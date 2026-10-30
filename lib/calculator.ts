export type CalculatorInput = {
  /** Monthly advertising budget, in the selected currency. */
  budget: number;
  /** Average cost per lead, in the selected currency. */
  costPerLead: number;
  /** Lead-to-customer conversion rate, as a percentage (e.g. 8 for 8%). */
  conversionRate: number;
  /** Average revenue per new customer, in the selected currency. */
  customerValue: number;
  /** Relative improvement to the conversion rate, as a percentage (e.g. 25 for +25%). */
  improvement: number;
};

export type CalculatorResult = {
  enquiries: number;
  customers: number;
  revenue: number;
  improvedConversionRate: number;
  improvedCustomers: number;
  improvedRevenue: number;
  additionalRevenue: number;
  /** Return on ad spend before and after, as multiples of budget. */
  roas: number;
  improvedRoas: number;
};

const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/**
 * Projection model. Ad budget and cost per lead are held constant, so the number of enquiries
 * does not change; the improvement is applied to the lead-to-customer conversion rate only.
 * The improved rate is capped at 100%.
 */
export function project(input: CalculatorInput): CalculatorResult {
  const budget = safe(input.budget);
  const cpl = safe(input.costPerLead);
  const rate = Math.min(safe(input.conversionRate), 100) / 100;
  const value = safe(input.customerValue);
  const lift = safe(input.improvement) / 100;

  const enquiries = cpl > 0 ? budget / cpl : 0;
  const customers = enquiries * rate;
  const revenue = customers * value;

  const improvedRate = Math.min(rate * (1 + lift), 1);
  const improvedCustomers = enquiries * improvedRate;
  const improvedRevenue = improvedCustomers * value;

  return {
    enquiries,
    customers,
    revenue,
    improvedConversionRate: improvedRate * 100,
    improvedCustomers,
    improvedRevenue,
    additionalRevenue: improvedRevenue - revenue,
    roas: budget > 0 ? revenue / budget : 0,
    improvedRoas: budget > 0 ? improvedRevenue / budget : 0,
  };
}

export const currencies = {
  INR: { symbol: "₹", locale: "en-IN" },
  USD: { symbol: "$", locale: "en-US" },
  AED: { symbol: "AED ", locale: "en-AE" },
  GBP: { symbol: "£", locale: "en-GB" },
} as const;

export type CurrencyCode = keyof typeof currencies;

export function formatMoney(value: number, code: CurrencyCode) {
  const { symbol, locale } = currencies[code];
  return symbol + Math.round(value).toLocaleString(locale);
}

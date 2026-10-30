import { test } from "node:test";
import assert from "node:assert/strict";
import { project } from "../lib/calculator.ts";

test("baseline projection", () => {
  const r = project({ budget: 100000, costPerLead: 400, conversionRate: 8, customerValue: 50000, improvement: 25 });
  assert.equal(r.enquiries, 250);
  assert.equal(r.customers, 20);
  assert.equal(r.revenue, 1000000);
  assert.equal(r.improvedConversionRate, 10);
  assert.equal(r.improvedCustomers, 25);
  assert.equal(r.improvedRevenue, 1250000);
  assert.equal(r.additionalRevenue, 250000);
  assert.equal(r.roas, 10);
});

test("improved rate is capped at 100%", () => {
  const r = project({ budget: 1000, costPerLead: 10, conversionRate: 90, customerValue: 1, improvement: 50 });
  assert.equal(r.improvedConversionRate, 100);
  assert.equal(r.improvedCustomers, 100);
});

test("invalid and zero inputs never produce NaN or Infinity", () => {
  const r = project({ budget: 5000, costPerLead: 0, conversionRate: Number.NaN, customerValue: -5, improvement: 10 });
  for (const v of Object.values(r)) assert.ok(Number.isFinite(v));
  assert.equal(r.enquiries, 0);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { estimateWebsite, type EstimateInput } from "../lib/website-estimate.ts";

const base: EstimateInput = {
  industry: "real-estate", type: "business", pages: "1-5", features: [], booking: "none",
  ecommerce: "none", design: "custom", content: "ready", timeline: "standard",
};

test("a plain business website equals its base rule", () => {
  const e = estimateWebsite(base);
  assert.deepEqual(e.budget, [80000, 180000]);
  assert.deepEqual(e.weeks, [5, 8]);
});

test("features, pages and content add their ranges", () => {
  const e = estimateWebsite({ ...base, pages: "6-15", features: ["cms", "forms-crm"], content: "copy" });
  // 80k+30k+25k+25k+30k = 190k ; 180k+60k+50k+60k+80k = 430k
  assert.deepEqual(e.budget, [190000, 430000]);
});

test("design and urgent timeline multiply, and urgent compresses weeks", () => {
  const e = estimateWebsite({ ...base, design: "premium", timeline: "fast" });
  // 80k*1.25*1.2 = 120k ; 180k*1.4*1.3 = 327.6k -> 330k
  assert.deepEqual(e.budget, [120000, 330000]);
  // weeks (5+1)*0.7=4.2->4 ; (8+2)*0.7=7
  assert.deepEqual(e.weeks, [4, 7]);
});

test("healthcare adds its compliance adjustment", () => {
  const e = estimateWebsite({ ...base, industry: "healthcare" });
  assert.deepEqual(e.budget, [90000, 200000]); // 88k->90k ; 198k->200k
});

test("unknown ids fall back safely and ranges stay ordered", () => {
  const e = estimateWebsite({ ...base, type: "nope", design: "nope", features: ["bogus"] });
  assert.ok(e.budget[0] > 0 && e.budget[1] >= e.budget[0]);
  assert.ok(e.weeks[1] >= e.weeks[0] && e.weeks[0] >= 2);
});

test("phases cover the timeline", () => {
  const e = estimateWebsite(base);
  assert.equal(e.phases.length, 4);
  for (const p of e.phases) assert.ok(p.weeks[0] >= 0.5);
});

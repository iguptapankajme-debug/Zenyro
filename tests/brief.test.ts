import { test } from "node:test";
import assert from "node:assert/strict";
import { briefInputSchema, generateBrief } from "../lib/brief.ts";

const base = {
  businessName: "Sample Studio", industry: "interior-retail", description: "Premium interior design for apartments.",
  audience: "Homeowners buying new 3BHK flats.", reach: "local", objectives: ["leads"], features: [], budget: "1-3l", design: "editorial", timeline: "1-3m",
};

test("valid input produces a complete brief", () => {
  const b = generateBrief(briefInputSchema.parse(base));
  assert.ok(b.pages.some((p) => p.name === "Portfolio"));
  assert.ok(b.features.some((f) => f.name === "CRM integration"), "leads objective adds CRM");
  assert.equal(b.complexity.level, "Low");
  assert.ok(b.seo.some((s) => s.startsWith("Local SEO")));
  assert.equal(b.phases.length, 4);
});

test("selling online with accounts raises complexity and adds commerce pages", () => {
  const b = generateBrief(briefInputSchema.parse({ ...base, objectives: ["sell"], features: ["accounts", "multilingual", "ai-assistant"], design: "immersive", reach: "international" }));
  assert.equal(b.complexity.level, "High");
  assert.ok(b.pages.some((p) => p.name === "Cart & checkout"));
  assert.ok(b.technology[0]!.option.startsWith("Shopify"));
  assert.ok(b.seo.some((s) => s.includes("hreflang")));
});

test("invalid input is rejected", () => {
  assert.equal(briefInputSchema.safeParse({ ...base, industry: "casino" }).success, false);
  assert.equal(briefInputSchema.safeParse({ ...base, objectives: [] }).success, false);
  assert.equal(briefInputSchema.safeParse({ ...base, description: "x".repeat(600) }).success, false);
});

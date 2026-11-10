import { test } from "node:test";
import assert from "node:assert/strict";
import { analyse, botAllowed, parseRobots, schemaTypes } from "../lib/ai-check.ts";
import { isPublicAddress, normaliseUrl } from "../lib/net-guard.ts";

const good = `<!doctype html><html lang="en"><head>
<title>Acme Dental Clinic in Mohali | Family Dentist</title>
<meta name="description" content="Family dental clinic in Mohali offering check-ups, root canals, implants and children's dentistry, open six days a week.">
<meta name="viewport" content="width=device-width">
<meta property="og:title" content="Acme Dental"><meta property="og:image" content="/og.png">
<link rel="canonical" href="https://acme.example/">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Dentist","name":"Acme"},{"@type":"FAQPage","mainEntity":[]}]}</script>
</head><body><h1>Acme Dental</h1><p>${"word ".repeat(300)}</p></body></html>`;

test("robots: specific group overrides wildcard; longest match wins", () => {
  const g = parseRobots("User-agent: *\nDisallow: /admin\n\nUser-agent: GPTBot\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: PerplexityBot\nDisallow: /\nAllow: /$\n");
  assert.equal(botAllowed(g, "GPTBot"), false);
  assert.equal(botAllowed(g, "ClaudeBot"), false);
  assert.equal(botAllowed(g, "Googlebot"), true);
  assert.equal(botAllowed(g, "PerplexityBot"), true);
  assert.equal(botAllowed(parseRobots("User-agent: *\nDisallow:\n"), "GPTBot"), true);
  assert.equal(botAllowed(parseRobots("User-agent: *\nDisallow: /\n"), "Bingbot"), false);
});

test("schema types are collected from nested graphs", () => {
  assert.deepEqual(schemaTypes(good).sort(), ["Dentist", "FAQPage"]);
  assert.deepEqual(schemaTypes('<script type="application/ld+json">{bad</script>'), []);
});

test("a well-built page scores 100; blocked AI bots and noindex cost points", () => {
  const ok = analyse({ url: "https://acme.example/", html: good, robots: "User-agent: *\nAllow: /\nSitemap: https://acme.example/sitemap.xml", llms: true, sitemap: true });
  assert.equal(ok.score, 100);
  const bad = analyse({ url: "http://acme.example/", html: good.replace("<head>", '<head><meta name="robots" content="noindex">'), robots: "User-agent: GPTBot\nDisallow: /", llms: false, sitemap: false });
  assert.ok(bad.score < 70, `score ${bad.score}`);
  assert.equal(bad.checks.find((c) => c.id === "ai-bots")!.pass, false);
  assert.equal(bad.checks.find((c) => c.id === "index")!.pass, false);
});

test("network guard rejects private and reserved addresses", () => {
  for (const ip of ["127.0.0.1", "10.1.2.3", "172.20.0.1", "192.168.1.1", "169.254.169.254", "100.64.0.1", "0.0.0.0", "::1", "fd00::1", "fe80::1", "::ffff:127.0.0.1", "224.0.0.1"]) {
    assert.equal(isPublicAddress(ip), false, ip);
  }
  for (const ip of ["8.8.8.8", "76.76.21.21", "2606:4700::1111"]) assert.equal(isPublicAddress(ip), true, ip);
});

test("URL normalising rejects private IP literals, odd ports and schemes", () => {
  for (const u of ["http://169.254.169.254/latest", "127.0.0.1", "http://[::1]/", "http://10.0.0.5", "localhost", "ftp://x.com", "https://x.com:8080", "https://user:pw@x.com"]) {
    assert.equal(normaliseUrl(u), null, u);
  }
  assert.equal(normaliseUrl("Example.com/path")?.hostname, "example.com");
  assert.equal(normaliseUrl("8.8.8.8")?.hostname, "8.8.8.8");
});

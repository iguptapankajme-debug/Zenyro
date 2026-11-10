/**
 * AI readiness analysis: given a site's homepage HTML, robots.txt and a couple of well-known files,
 * score how easy the site is for Google and AI assistants to crawl, understand and cite.
 * Pure functions only (no network), so it can be unit-tested and reused.
 */

export type CheckGroup = "access" | "answers" | "basics";
export type Check = { id: string; group: CheckGroup; label: string; pass: boolean; detail: string; weight: number };
export type BotStatus = { bot: string; owner: string; allowed: boolean };
export type AiCheckResult = { url: string; score: number; checks: Check[]; bots: BotStatus[] };

export type AiCheckInput = {
  url: string;
  html: string;
  robots: string | null;
  llms: boolean;
  sitemap: boolean;
};

export const aiBots: { bot: string; owner: string }[] = [
  { bot: "GPTBot", owner: "OpenAI (training)" },
  { bot: "OAI-SearchBot", owner: "ChatGPT search" },
  { bot: "ChatGPT-User", owner: "ChatGPT browsing" },
  { bot: "ClaudeBot", owner: "Anthropic Claude" },
  { bot: "PerplexityBot", owner: "Perplexity" },
  { bot: "Google-Extended", owner: "Google Gemini" },
  { bot: "Googlebot", owner: "Google Search" },
  { bot: "Bingbot", owner: "Bing & Copilot" },
];

type Group = { agents: string[]; rules: { allow: boolean; path: string }[] };

export function parseRobots(text: string): Group[] {
  const groups: Group[] = [];
  let cur: Group | null = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = /^([a-z-]+)\s*:\s*(.*)$/i.exec(line);
    if (!m) continue;
    const key = m[1]!.toLowerCase();
    const val = m[2]!.trim();
    if (key === "user-agent") {
      if (!cur || !lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (cur && (key === "allow" || key === "disallow")) cur.rules.push({ allow: key === "allow", path: val });
    }
  }
  return groups;
}

/** Whether a crawler may fetch the homepage, per robots.txt longest-match rules. */
export function botAllowed(groups: Group[], bot: string): boolean {
  const name = bot.toLowerCase();
  const own = groups.filter((g) => g.agents.some((a) => a !== "*" && name.includes(a)));
  const group = own.length ? own : groups.filter((g) => g.agents.includes("*"));
  let best: { allow: boolean; len: number } | null = null;
  for (const g of group) {
    for (const r of g.rules) {
      if (!r.path) continue; // "Disallow:" with no path allows everything
      const p = r.path.replace(/\*$/, "").replace(/\$$/, "");
      if (!"/".startsWith(p) && p !== "/") continue;
      if (!best || p.length > best.len || (p.length === best.len && r.allow)) best = { allow: r.allow, len: p.length };
    }
  }
  return best ? best.allow : true;
}

const first = (html: string, re: RegExp) => re.exec(html)?.[1]?.trim() ?? "";
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
const meta = (html: string, attr: "name" | "property", key: string) => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const t of tags) {
    const k = new RegExp(`\\b${attr}\\s*=\\s*["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i");
    if (k.test(t)) return decode(first(t, /\bcontent\s*=\s*["']([^"']*)["']/i));
  }
  return "";
};

/** Every schema.org @type found in the page's JSON-LD blocks. */
export function schemaTypes(html: string): string[] {
  const types = new Set<string>();
  const blocks = html.match(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) return v.forEach(walk);
    if (v && typeof v === "object") {
      const t = (v as Record<string, unknown>)["@type"];
      if (typeof t === "string") types.add(t);
      if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
      Object.values(v).forEach(walk);
    }
  };
  for (const b of blocks) {
    const body = b.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "");
    try { walk(JSON.parse(body)); } catch { /* invalid JSON-LD is reported as missing */ }
  }
  return [...types];
}

const entityTypes = ["Organization", "LocalBusiness", "ProfessionalService", "Corporation", "Store", "Restaurant", "MedicalBusiness", "Dentist", "LegalService", "EducationalOrganization", "HomeAndConstructionBusiness", "AutoDealer", "RealEstateAgent", "Hotel", "TravelAgency"];

export function analyse(input: AiCheckInput): AiCheckResult {
  const { html, url } = input;
  const groups = parseRobots(input.robots ?? "");
  const bots = aiBots.map((b) => ({ ...b, allowed: botAllowed(groups, b.bot) }));
  const aiAllowed = bots.filter((b) => b.bot !== "Googlebot" && b.bot !== "Bingbot");
  const blocked = aiAllowed.filter((b) => !b.allowed);
  const searchOk = bots.filter((b) => b.bot === "Googlebot" || b.bot === "Bingbot").every((b) => b.allowed);

  const title = decode(first(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const desc = meta(html, "name", "description");
  const robotsMeta = `${meta(html, "name", "robots")} ${meta(html, "name", "googlebot")}`.toLowerCase();
  const h1s = (html.match(/<h1\b/gi) ?? []).length;
  const canonical = /<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/i.test(html);
  const types = schemaTypes(html);
  const entity = types.find((t) => entityTypes.includes(t));
  const faq = types.includes("FAQPage") || types.includes("QAPage");
  const og = !!meta(html, "property", "og:title") && !!meta(html, "property", "og:image");
  const lang = first(html, /<html\b[^>]*\blang\s*=\s*["']([^"']+)["']/i);
  const viewport = !!meta(html, "name", "viewport");
  const words = decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/gi, " ")).split(" ").filter(Boolean).length;

  const checks: Check[] = [
    { id: "ai-bots", group: "access", weight: 18, label: "AI assistants can read your site", pass: blocked.length === 0,
      detail: blocked.length ? `robots.txt blocks ${blocked.map((b) => b.bot).join(", ")}.` : "No AI crawler is blocked in robots.txt." },
    { id: "search-bots", group: "access", weight: 12, label: "Google and Bing can crawl your homepage", pass: searchOk,
      detail: searchOk ? "Googlebot and Bingbot are allowed." : "robots.txt blocks Googlebot or Bingbot from your homepage." },
    { id: "index", group: "access", weight: 12, label: "Homepage can be indexed", pass: !/noindex/.test(robotsMeta),
      detail: /noindex/.test(robotsMeta) ? "A robots meta tag says noindex: search engines will drop this page." : "No noindex directive found." },
    { id: "https", group: "access", weight: 4, label: "Served securely over HTTPS", pass: url.startsWith("https://"),
      detail: url.startsWith("https://") ? "The site loads over HTTPS." : "The site does not load over HTTPS." },
    { id: "sitemap", group: "access", weight: 6, label: "XML sitemap available", pass: input.sitemap || /^\s*sitemap\s*:/im.test(input.robots ?? ""),
      detail: input.sitemap || /^\s*sitemap\s*:/im.test(input.robots ?? "") ? "A sitemap was found." : "No sitemap at /sitemap.xml or in robots.txt." },
    { id: "llms", group: "access", weight: 4, label: "llms.txt summary for AI assistants", pass: input.llms,
      detail: input.llms ? "An /llms.txt file was found." : "No /llms.txt. It is optional, but gives assistants a clean summary of your business." },

    { id: "entity", group: "answers", weight: 10, label: "Business identity in structured data", pass: !!entity,
      detail: entity ? `Found ${entity} schema.` : "No Organization or LocalBusiness schema, so engines must guess who you are." },
    { id: "schema", group: "answers", weight: 6, label: "Structured data (JSON-LD)", pass: types.length > 0,
      detail: types.length ? `Types found: ${types.slice(0, 6).join(", ")}${types.length > 6 ? "…" : ""}.` : "No valid JSON-LD found on the homepage." },
    { id: "faq", group: "answers", weight: 5, label: "Question-and-answer content marked up", pass: faq,
      detail: faq ? "FAQ schema found." : "No FAQPage schema. Clear Q&A blocks are easy for answer engines to quote." },
    { id: "content", group: "answers", weight: 5, label: "Enough readable text in the HTML", pass: words >= 250,
      detail: `About ${words.toLocaleString("en")} words are readable without running JavaScript${words < 250 ? ", which is thin for AI crawlers that don't render scripts" : ""}.` },

    { id: "title", group: "basics", weight: 6, label: "Descriptive page title", pass: title.length >= 15 && title.length <= 70,
      detail: title ? `“${title.slice(0, 90)}” (${title.length} characters).` : "No <title> tag found." },
    { id: "description", group: "basics", weight: 5, label: "Meta description", pass: desc.length >= 50 && desc.length <= 170,
      detail: desc ? `${desc.length} characters${desc.length > 170 ? ", likely to be cut off" : desc.length < 50 ? ", too short to describe you" : ""}.` : "No meta description found." },
    { id: "h1", group: "basics", weight: 4, label: "One clear main heading (H1)", pass: h1s === 1,
      detail: h1s === 1 ? "Exactly one H1." : h1s === 0 ? "No H1 heading found." : `${h1s} H1 headings found; one is clearer.` },
    { id: "canonical", group: "basics", weight: 3, label: "Canonical URL set", pass: canonical,
      detail: canonical ? "A canonical link is set." : "No canonical link, which can split rankings across duplicate URLs." },
    { id: "og", group: "basics", weight: 3, label: "Social preview (Open Graph)", pass: og,
      detail: og ? "og:title and og:image are set." : "Missing og:title or og:image, so shared links look bare." },
    { id: "lang", group: "basics", weight: 2, label: "Page language declared", pass: !!lang, detail: lang ? `lang="${lang}".` : "No lang attribute on <html>." },
    { id: "viewport", group: "basics", weight: 2, label: "Mobile viewport", pass: viewport, detail: viewport ? "Viewport meta tag is set." : "No viewport meta tag; the page may not be mobile-friendly." },
  ];

  const total = checks.reduce((n, c) => n + c.weight, 0);
  const got = checks.reduce((n, c) => n + (c.pass ? c.weight : 0), 0);
  return { url, score: Math.round((got / total) * 100), checks, bots };
}

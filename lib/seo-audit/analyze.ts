import "server-only";
import { parse, type HTMLElement } from "node-html-parser";
import { AuditFetchError, safeFetch, type SafeResponse } from "./safe-fetch";

export type CheckStatus = "pass" | "warn" | "fail" | "info";
export type Check = { id: string; category: Category; title: string; status: CheckStatus; evidence: string; recommendation?: string };
export type Category = "Crawling & indexing" | "On-page" | "Structured data" | "Images" | "Performance";

export type Performance =
  | { available: true; source: "PageSpeed Insights (mobile)"; score: number | null; lab: Record<string, string>; field: Record<string, string> | null }
  | { available: false; reason: string };

export type AuditReport = {
  requestedUrl: string;
  finalUrl: string;
  fetchedAt: string;
  responseMs: number;
  checks: Check[];
  performance: Performance;
  scope: string;
};

const truncate = (s: string, n = 140) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const text = (el: HTMLElement | null | undefined) => (el?.text ?? "").replace(/\s+/g, " ").trim();

function robotsDirectives(res: SafeResponse, root: HTMLElement) {
  const meta = root.querySelectorAll('meta[name="robots"], meta[name="googlebot"]').map((m) => (m.getAttribute("content") ?? "").toLowerCase());
  const header = String(res.headers["x-robots-tag"] ?? "").toLowerCase();
  return { meta: meta.join(", "), header };
}

/** Minimal robots.txt reader: does the "*" group disallow the whole site, and which sitemaps are declared. */
function readRobots(body: string) {
  const lines = body.split(/\r?\n/).map((l) => l.replace(/#.*/, "").trim()).filter(Boolean);
  const sitemaps: string[] = [];
  let inStar = false;
  let blocksAll = false;
  let lastWasAgent = false;
  for (const line of lines) {
    const [rawKey, ...rest] = line.split(":");
    const key = (rawKey ?? "").trim().toLowerCase();
    const value = rest.join(":").trim();
    if (key === "sitemap" && value) sitemaps.push(value);
    if (key === "user-agent") {
      inStar = lastWasAgent ? inStar || value === "*" : value === "*";
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (inStar && key === "disallow" && value === "/") blocksAll = true;
  }
  return { sitemaps, blocksAll };
}

async function fetchOptional(url: URL, maxBytes = 1_000_000) {
  try {
    return await safeFetch(url, { timeout: 8000, maxBytes });
  } catch {
    return null;
  }
}

async function pageSpeed(url: string): Promise<Performance> {
  const key = process.env.PAGESPEED_API_KEY;
  if (!key) return { available: false, reason: "Performance data isn't available because the PageSpeed Insights API is not configured on this site." };
  try {
    const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    api.searchParams.set("url", url);
    api.searchParams.set("strategy", "mobile");
    api.searchParams.set("category", "performance");
    api.searchParams.set("key", key);
    const res = await fetch(api, { signal: AbortSignal.timeout(45_000), cache: "no-store" });
    if (!res.ok) return { available: false, reason: `PageSpeed Insights could not analyse this page (status ${res.status}).` };
    const data = (await res.json()) as {
      lighthouseResult?: { categories?: { performance?: { score?: number } }; audits?: Record<string, { displayValue?: string }> };
      loadingExperience?: { metrics?: Record<string, { percentile?: number; category?: string }> };
    };
    const audits = data.lighthouseResult?.audits ?? {};
    const lab: Record<string, string> = {};
    for (const [k, label] of [["largest-contentful-paint", "LCP"], ["cumulative-layout-shift", "CLS"], ["total-blocking-time", "TBT"], ["first-contentful-paint", "FCP"], ["speed-index", "Speed Index"]] as const) {
      const v = audits[k]?.displayValue;
      if (v) lab[label] = v;
    }
    const m = data.loadingExperience?.metrics;
    let field: Record<string, string> | null = null;
    if (m && Object.keys(m).length) {
      field = {};
      const lcp = m.LARGEST_CONTENTFUL_PAINT_MS;
      const inp = m.INTERACTION_TO_NEXT_PAINT;
      const cls = m.CUMULATIVE_LAYOUT_SHIFT_SCORE;
      if (lcp?.percentile != null) field["LCP (p75)"] = `${(lcp.percentile / 1000).toFixed(1)} s · ${lcp.category ?? ""}`;
      if (inp?.percentile != null) field["INP (p75)"] = `${inp.percentile} ms · ${inp.category ?? ""}`;
      if (cls?.percentile != null) field["CLS (p75)"] = `${(cls.percentile / 100).toFixed(2)} · ${cls.category ?? ""}`;
    }
    const score = data.lighthouseResult?.categories?.performance?.score;
    return { available: true, source: "PageSpeed Insights (mobile)", score: score == null ? null : Math.round(score * 100), lab, field };
  } catch {
    return { available: false, reason: "PageSpeed Insights did not respond in time. Try again later." };
  }
}

export async function auditUrl(target: URL): Promise<AuditReport> {
  const res = await safeFetch(target);
  const final = new URL(res.url);
  const contentType = String(res.headers["content-type"] ?? "");
  if (!/text\/html|application\/xhtml/i.test(contentType)) {
    throw new AuditFetchError(`That address returned ${contentType || "an unknown content type"}, not a web page.`, "invalid_url");
  }
  const root = parse(res.body, { comment: false, blockTextElements: { script: true, style: false, noscript: false, pre: true } });
  const checks: Check[] = [];
  const add = (c: Check) => checks.push(c);

  // ---- Crawling & indexing
  add(
    final.protocol === "https:"
      ? { id: "https", category: "Crawling & indexing", title: "HTTPS", status: "pass", evidence: res.redirects.some((r) => r.startsWith("http:")) ? "The page redirects from http to https." : "The page is served over https." }
      : { id: "https", category: "Crawling & indexing", title: "HTTPS", status: "fail", evidence: "The final page is served over plain http.", recommendation: "Install a TLS certificate and permanently redirect all http URLs to https." },
  );
  add(
    res.status >= 200 && res.status < 300
      ? { id: "status", category: "Crawling & indexing", title: "Page responds successfully", status: "pass", evidence: `HTTP ${res.status}${res.redirects.length ? ` after ${res.redirects.length} redirect${res.redirects.length > 1 ? "s" : ""}` : ""}.` }
      : { id: "status", category: "Crawling & indexing", title: "Page responds successfully", status: "fail", evidence: `HTTP ${res.status}.`, recommendation: "Make sure the page returns a 200 status for visitors and search engines." },
  );
  if (res.redirects.length > 1) {
    add({ id: "redirect-chain", category: "Crawling & indexing", title: "Redirect chain", status: "warn", evidence: `${res.redirects.length} redirects before the final page.`, recommendation: "Link and redirect directly to the final URL to save crawl budget and load time." });
  }

  const robots = robotsDirectives(res, root);
  const noindex = /noindex|none/.test(robots.meta) || /noindex|none/.test(robots.header);
  add(
    noindex
      ? { id: "robots-meta", category: "Crawling & indexing", title: "Indexing allowed", status: "fail", evidence: `Robots directives: ${[robots.meta, robots.header && `X-Robots-Tag: ${robots.header}`].filter(Boolean).join("; ")}.`, recommendation: "Remove noindex if this page should appear in search results." }
      : { id: "robots-meta", category: "Crawling & indexing", title: "Indexing allowed", status: "pass", evidence: robots.meta || robots.header ? `Robots directives: ${[robots.meta, robots.header].filter(Boolean).join("; ")}.` : "No noindex directive found in meta tags or headers." },
  );

  const robotsRes = await fetchOptional(new URL("/robots.txt", final.origin), 500_000);
  let sitemapCandidates: string[] = [];
  if (robotsRes && robotsRes.status === 200 && !/text\/html/i.test(String(robotsRes.headers["content-type"] ?? ""))) {
    const parsed = readRobots(robotsRes.body);
    sitemapCandidates = parsed.sitemaps;
    add(
      parsed.blocksAll
        ? { id: "robots-txt", category: "Crawling & indexing", title: "robots.txt", status: "fail", evidence: "robots.txt contains “Disallow: /” for all user agents.", recommendation: "Remove the site-wide disallow unless you intend to block all crawling." }
        : { id: "robots-txt", category: "Crawling & indexing", title: "robots.txt", status: "pass", evidence: `Found at ${final.origin}/robots.txt${parsed.sitemaps.length ? `, declaring ${parsed.sitemaps.length} sitemap${parsed.sitemaps.length > 1 ? "s" : ""}` : ""}.` },
    );
  } else {
    add({ id: "robots-txt", category: "Crawling & indexing", title: "robots.txt", status: "warn", evidence: robotsRes ? `robots.txt returned HTTP ${robotsRes.status}.` : "robots.txt could not be retrieved.", recommendation: "Publish a robots.txt that allows crawling and lists your sitemap." });
  }

  if (!sitemapCandidates.length) sitemapCandidates = [new URL("/sitemap.xml", final.origin).href];
  let sitemapFound = "";
  for (const candidate of sitemapCandidates.slice(0, 3)) {
    let u: URL;
    try { u = new URL(candidate); } catch { continue; }
    const sm = await fetchOptional(u, 3_000_000);
    if (sm && sm.status === 200 && /<(urlset|sitemapindex)[\s>]/i.test(sm.body)) { sitemapFound = u.href; break; }
  }
  add(
    sitemapFound
      ? { id: "sitemap", category: "Crawling & indexing", title: "XML sitemap", status: "pass", evidence: `Accessible at ${truncate(sitemapFound, 100)}.` }
      : { id: "sitemap", category: "Crawling & indexing", title: "XML sitemap", status: "warn", evidence: `No valid XML sitemap found at ${sitemapCandidates.slice(0, 3).map((s) => truncate(s, 60)).join(", ")}.`, recommendation: "Publish an XML sitemap, reference it in robots.txt and submit it in Google Search Console." },
  );

  const canonicalHref = root.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim();
  if (!canonicalHref) {
    add({ id: "canonical", category: "Crawling & indexing", title: "Canonical URL", status: "warn", evidence: "No canonical link element found.", recommendation: "Add a self-referencing canonical URL to consolidate duplicate versions of the page." });
  } else {
    let resolved: URL | null = null;
    try { resolved = new URL(canonicalHref, final); } catch { /* invalid */ }
    if (!resolved) add({ id: "canonical", category: "Crawling & indexing", title: "Canonical URL", status: "fail", evidence: `Canonical value is not a valid URL: “${truncate(canonicalHref, 80)}”.`, recommendation: "Use an absolute, valid URL in the canonical tag." });
    else if (resolved.host !== final.host) add({ id: "canonical", category: "Crawling & indexing", title: "Canonical URL", status: "warn", evidence: `Canonical points to another host: ${truncate(resolved.href, 90)}.`, recommendation: "Confirm this is intended; a cross-domain canonical asks search engines to index the other site instead." });
    else add({ id: "canonical", category: "Crawling & indexing", title: "Canonical URL", status: "pass", evidence: `${truncate(resolved.href, 100)}${resolved.href.replace(/\/$/, "") === final.href.replace(/\/$/, "") ? " (self-referencing)" : ""}.` });
  }

  // ---- On-page
  const title = text(root.querySelector("head title") ?? root.querySelector("title"));
  if (!title) add({ id: "title", category: "On-page", title: "Title tag", status: "fail", evidence: "No title tag found.", recommendation: "Add a unique, descriptive title of roughly 30–60 characters." });
  else add({ id: "title", category: "On-page", title: "Title tag", status: title.length < 15 || title.length > 65 ? "warn" : "pass", evidence: `“${truncate(title, 90)}” (${title.length} characters).`, recommendation: title.length < 15 || title.length > 65 ? "Aim for roughly 30–60 characters so the title is descriptive and not truncated in results." : undefined });

  const desc = (root.querySelector('meta[name="description"]')?.getAttribute("content") ?? "").trim();
  if (!desc) add({ id: "description", category: "On-page", title: "Meta description", status: "warn", evidence: "No meta description found.", recommendation: "Write a unique summary of roughly 70–160 characters that encourages the click." });
  else add({ id: "description", category: "On-page", title: "Meta description", status: desc.length < 50 || desc.length > 170 ? "warn" : "pass", evidence: `“${truncate(desc, 120)}” (${desc.length} characters).`, recommendation: desc.length < 50 || desc.length > 170 ? "Aim for roughly 70–160 characters." : undefined });

  const h1s = root.querySelectorAll("h1").map(text).filter(Boolean);
  add(
    h1s.length === 1
      ? { id: "h1", category: "On-page", title: "Main heading (H1)", status: "pass", evidence: `“${truncate(h1s[0]!, 90)}”.` }
      : h1s.length === 0
        ? { id: "h1", category: "On-page", title: "Main heading (H1)", status: "fail", evidence: "No H1 heading found in the HTML.", recommendation: "Give the page one clear H1 that states what it is about. If the heading is added by JavaScript, also render it on the server." }
        : { id: "h1", category: "On-page", title: "Main heading (H1)", status: "warn", evidence: `${h1s.length} H1 headings: ${h1s.slice(0, 3).map((h) => `“${truncate(h, 40)}”`).join(", ")}.`, recommendation: "Use a single H1 for the main topic and H2–H4 for sections." },
  );

  const levels = root.querySelectorAll("h1, h2, h3, h4, h5, h6").map((h) => Number(h.tagName.slice(1)));
  const skips: string[] = [];
  for (let i = 1; i < levels.length; i++) if (levels[i]! - levels[i - 1]! > 1) skips.push(`H${levels[i - 1]} → H${levels[i]}`);
  add(
    skips.length
      ? { id: "heading-order", category: "On-page", title: "Heading structure", status: "warn", evidence: `${levels.length} headings; skipped levels: ${[...new Set(skips)].slice(0, 4).join(", ")}.`, recommendation: "Nest headings in order (H2 inside H1, H3 inside H2) so the outline is clear to readers and search engines." }
      : { id: "heading-order", category: "On-page", title: "Heading structure", status: levels.length ? "pass" : "warn", evidence: levels.length ? `${levels.length} headings in a logical order.` : "No headings found.", recommendation: levels.length ? undefined : "Structure content with descriptive headings." },
  );

  const lang = root.querySelector("html")?.getAttribute("lang");
  add(lang ? { id: "lang", category: "On-page", title: "Language declared", status: "pass", evidence: `lang="${truncate(lang, 20)}".` } : { id: "lang", category: "On-page", title: "Language declared", status: "warn", evidence: "The html element has no lang attribute.", recommendation: "Add lang (for example lang=\"en-IN\") to help search engines and screen readers." });

  const viewport = root.querySelector('meta[name="viewport"]')?.getAttribute("content");
  add(viewport ? { id: "viewport", category: "On-page", title: "Mobile viewport", status: "pass", evidence: `“${truncate(viewport, 80)}”.` } : { id: "viewport", category: "On-page", title: "Mobile viewport", status: "fail", evidence: "No viewport meta tag.", recommendation: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> so the page renders correctly on phones." });

  const ogTitle = root.querySelector('meta[property="og:title"]');
  const ogImage = root.querySelector('meta[property="og:image"]');
  add(ogTitle && ogImage ? { id: "og", category: "On-page", title: "Social sharing tags", status: "pass", evidence: "og:title and og:image are present." } : { id: "og", category: "On-page", title: "Social sharing tags", status: "info", evidence: `Missing: ${[!ogTitle && "og:title", !ogImage && "og:image"].filter(Boolean).join(", ")}.`, recommendation: "Add Open Graph tags so links shared on social and messaging apps show a proper preview." });

  // ---- Structured data
  const blocks = root.querySelectorAll('script[type="application/ld+json"]');
  const types: string[] = [];
  let invalid = 0;
  for (const b of blocks) {
    try {
      const data = JSON.parse(b.text) as unknown;
      const collect = (v: unknown) => {
        if (Array.isArray(v)) v.forEach(collect);
        else if (v && typeof v === "object") {
          const o = v as Record<string, unknown>;
          if (o["@type"]) types.push(...(Array.isArray(o["@type"]) ? (o["@type"] as string[]) : [String(o["@type"])]));
          if (o["@graph"]) collect(o["@graph"]);
        }
      };
      collect(data);
    } catch {
      invalid++;
    }
  }
  if (!blocks.length) add({ id: "jsonld", category: "Structured data", title: "Structured data (JSON-LD)", status: "info", evidence: "No JSON-LD structured data found.", recommendation: "Structured data isn't required, but describing your organisation, services or articles accurately can make eligible rich results possible." });
  else if (invalid) add({ id: "jsonld", category: "Structured data", title: "Structured data (JSON-LD)", status: "warn", evidence: `${blocks.length} block${blocks.length > 1 ? "s" : ""}, ${invalid} could not be parsed as JSON.`, recommendation: "Fix the invalid JSON and validate with Google's Rich Results Test." });
  else add({ id: "jsonld", category: "Structured data", title: "Structured data (JSON-LD)", status: "pass", evidence: `${blocks.length} block${blocks.length > 1 ? "s" : ""}: ${[...new Set(types)].slice(0, 8).join(", ") || "no @type found"}.`, recommendation: "This check confirms the markup parses; validate eligibility with Google's Rich Results Test." });

  // ---- Images
  const imgs = root.querySelectorAll("img");
  if (!imgs.length) {
    add({ id: "images", category: "Images", title: "Images", status: "info", evidence: "No <img> elements found in the HTML." });
  } else {
    const noAlt = imgs.filter((i) => i.getAttribute("alt") === undefined).length;
    const noSize = imgs.filter((i) => !i.getAttribute("width") || !i.getAttribute("height")).length;
    const lazy = imgs.filter((i) => i.getAttribute("loading") === "lazy").length;
    const srcs = imgs.map((i) => i.getAttribute("src") ?? "");
    const modern = srcs.filter((s) => /\.(webp|avif)(\?|$)|[?&](fm|format)=(webp|avif)|\/_next\/image/i.test(s)).length + root.querySelectorAll('picture source[type="image/webp"], picture source[type="image/avif"]').length;
    add({ id: "alt", category: "Images", title: "Image alt text", status: noAlt ? "warn" : "pass", evidence: `${imgs.length} images, ${noAlt} without an alt attribute.`, recommendation: noAlt ? "Add descriptive alt text to meaningful images, and alt=\"\" to decorative ones." : undefined });
    add({ id: "dimensions", category: "Images", title: "Image dimensions", status: noSize > 0 ? "warn" : "pass", evidence: `${noSize} of ${imgs.length} images have no width and height attributes.`, recommendation: noSize ? "Set width and height (or a CSS aspect ratio) to prevent layout shift while images load." : undefined });
    add({ id: "formats", category: "Images", title: "Modern image formats", status: modern ? "pass" : "info", evidence: `${Math.min(modern, imgs.length)} of ${imgs.length} images detectably use WebP/AVIF or an image optimiser; ${lazy} use native lazy loading.`, recommendation: modern ? undefined : "Serve WebP or AVIF and lazy-load images below the first screen." });
  }

  // ---- Performance
  const bytes = Buffer.byteLength(res.body, "utf8");
  add({ id: "html-size", category: "Performance", title: "HTML size", status: bytes > 500_000 ? "warn" : "pass", evidence: `${Math.round(bytes / 1024)} KB of HTML.`, recommendation: bytes > 500_000 ? "Large HTML slows the first render; trim inline data and unused markup." : undefined });
  add({ id: "ttfb", category: "Performance", title: "Response time (single sample)", status: res.ms > 1800 ? "warn" : "info", evidence: `${res.ms} ms for the final request from our server. One measurement from one location, not a field metric.`, recommendation: res.ms > 1800 ? "Investigate server response time, caching and CDN configuration." : undefined });

  const performance = await pageSpeed(final.href);

  return {
    requestedUrl: target.href,
    finalUrl: final.href,
    fetchedAt: new Date().toISOString(),
    responseMs: res.ms,
    checks,
    performance,
    scope: `This report checks ${checks.length} signals on one page using its server-rendered HTML${performance.available ? ", plus PageSpeed Insights performance data" : ""}. It is not a complete technical SEO audit: it does not crawl other pages, render JavaScript, review content quality, backlinks or Search Console data.`,
  };
}

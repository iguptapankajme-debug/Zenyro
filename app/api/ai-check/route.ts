import { NextResponse } from "next/server";
import { analyse } from "@/lib/ai-check";
import { normaliseUrl } from "@/lib/net-guard";
import { rateLimit } from "@/lib/rate-limit";
import { safeFetch } from "@/lib/safe-fetch";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST { url } → AI readiness score for that site's homepage. */
export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(`ai-check:${ip}`, 12, 10 * 60 * 1000).ok) {
    return NextResponse.json({ error: "Too many checks from your network. Please try again in a few minutes." }, { status: 429 });
  }
  const body = (await req.json().catch(() => null)) as { url?: unknown } | null;
  const target = typeof body?.url === "string" ? normaliseUrl(body.url) : null;
  if (!target) return NextResponse.json({ error: "Enter a website address, like yourbusiness.com." }, { status: 400 });

  let page;
  try {
    page = await safeFetch(new URL("/", target));
  } catch (e) {
    const msg = e instanceof Error && e.message === "blocked-address" ? "That address can't be checked." : "We couldn't reach that website. Check the address and try again.";
    return NextResponse.json({ error: msg }, { status: 422 });
  }
  if (page.status >= 400 || !/html/i.test(page.type)) {
    return NextResponse.json({ error: `The homepage returned ${page.status >= 400 ? `an error (${page.status})` : "something other than a web page"}.` }, { status: 422 });
  }
  const origin = new URL(page.url).origin;
  const get = (path: string) => safeFetch(`${origin}${path}`, { maxBytes: 200_000, timeoutMs: 5000 }).catch(() => null);
  const [robots, llms, sitemap] = await Promise.all([get("/robots.txt"), get("/llms.txt"), get("/sitemap.xml")]);
  const ok = (r: Awaited<ReturnType<typeof get>>) => !!r && r.status >= 200 && r.status < 300;

  const result = analyse({
    url: page.url,
    html: page.body,
    robots: ok(robots) && !/html/i.test(robots!.type) ? robots!.body : null,
    llms: ok(llms) && !/html/i.test(llms!.type) && llms!.body.trim().length > 20,
    sitemap: ok(sitemap) && /<(urlset|sitemapindex)\b/i.test(sitemap!.body),
  });
  return NextResponse.json(result, { headers: { "cache-control": "no-store" } });
}

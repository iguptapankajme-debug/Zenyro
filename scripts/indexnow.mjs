/**
 * Submits every URL in the sitemap to IndexNow (Bing, Yandex, Seznam, Naver) after a production
 * deploy, so new and updated pages reach Bing quickly. Bing's index also feeds ChatGPT search and
 * Copilot. Runs from the Vercel build only in production and never fails the build.
 */
const KEY = "96fdf27ca9a01c2b9ca2e002e70c7654";
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://zenyro.in").replace(/\/$/, "");

if (process.env.VERCEL_ENV !== "production") {
  console.log("[indexnow] skipped (not a production deploy)");
  process.exit(0);
}
try {
  const { readFile } = await import("node:fs/promises");
  const xml = await readFile(".next/server/app/sitemap.xml.body", "utf8").catch(() => "");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urls.length) { console.log("[indexnow] no sitemap URLs found"); process.exit(0); }
  const host = new URL(SITE).host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
    signal: AbortSignal.timeout(10000),
  });
  console.log(`[indexnow] submitted ${urls.length} URLs: HTTP ${res.status}`);
} catch (e) {
  console.log("[indexnow] failed, continuing:", e instanceof Error ? e.message : e);
}

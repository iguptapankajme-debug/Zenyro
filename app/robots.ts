export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Every crawler may read the public site. AI crawlers are also named explicitly, so the welcome is
 * unambiguous: search and answer bots (ChatGPT search, Perplexity, Claude, Copilot, Gemini) and the
 * training crawlers, because being understood by the models helps them describe Zenyro accurately.
 */
const aiCrawlers = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Googlebot", "Bingbot",
  "Applebot", "Applebot-Extended",
  "Meta-ExternalAgent", "Amazonbot", "DuckAssistBot", "MistralAI-User", "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/admin"];
  return {
    rules: [
      { userAgent: aiCrawlers, allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

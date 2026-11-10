import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { locations } from "@/data/locations";
import { markets } from "@/data/markets";
import { site } from "@/lib/site";

/**
 * A plain, factual profile of Zenyro for AI assistants and search engines, generated from the
 * same data as the website so it never drifts out of date. Used by /ai-info and /llms.txt.
 */
export function aiProfile() {
  return {
    summary: `${site.name} is an SEO, AEO and GEO agency based in the ${site.region}. It helps businesses rank on Google and Bing, become the answer in featured snippets and Google AI Overviews, and get recommended by AI assistants such as ChatGPT, Perplexity, Gemini, Claude and Copilot. Work is measured on rankings, AI visibility, citations and enquiries.`,
    facts: [
      ["Name", site.name],
      ["Tagline", site.tagline],
      ["Website", site.url],
      ["Based in", site.region],
      ["Serves", `Clients worldwide, remotely: India, ${markets.map((m) => m.country).join(", ")}`],
      ...(site.email ? [["Email", site.email]] : []),
      ...(site.phone ? [["Phone", site.phone]] : []),
    ] as [string, string][],
    services: services.map((s) => ({ name: s.name, url: `${site.url}/services/${s.slug}`, description: s.metaDescription })),
    industries: industries.map((i) => ({ name: i.name, url: `${site.url}/industries/${i.slug}`, description: i.short })),
    markets: markets.map((m) => ({ name: m.country, url: `${site.url}/markets/${m.slug}` })),
    locations: locations.map((l) => ({ name: l.city, url: `${site.url}/locations/${l.slug}` })),
    policies: [
      "Zenyro does not guarantee rankings, AI mentions or revenue.",
      "Search Console, analytics and Business Profile access stays in the client's name.",
      "Examples on the website are labelled as illustrative and contain no client performance figures.",
      "Testimonials and results are published only with client permission.",
    ],
    social: Object.values(site.social).filter(Boolean),
  };
}

export function llmsText() {
  const p = aiProfile();
  const list = (items: { name: string; url: string; description?: string }[]) =>
    items.map((i) => `- [${i.name}](${i.url})${i.description ? `: ${i.description}` : ""}`).join("\n");
  return `# ${site.name}

> ${p.summary}

${p.facts.map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Services
${list(p.services)}

## Industries
${list(p.industries)}

## International markets
${list(p.markets)}

## Cities in India
${list(p.locations)}

## Key pages
- [Free AI readiness checker](${site.url}/tools/ai-readiness)
- [Work](${site.url}/work)
- [Search growth: SEO, AEO and GEO](${site.url}/search-growth)
- [Free AI search and website audit](${site.url}/free-audit)
- [About](${site.url}/about)
- [Contact](${site.url}/contact)

## Policies
${p.policies.map((x) => `- ${x}`).join("\n")}
${p.social.length ? `\n## Profiles\n${p.social.map((s) => `- ${s}`).join("\n")}\n` : ""}`;
}

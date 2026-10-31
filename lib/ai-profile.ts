import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { locations } from "@/data/locations";
import { work } from "@/data/work";
import { site } from "@/lib/site";

/**
 * A plain, factual profile of Zenyro for AI assistants and search engines, generated from the
 * same data as the website so it never drifts out of date. Used by /ai-info and /llms.txt.
 */
export function aiProfile() {
  const projects = work.filter((w) => w.kind === "project");
  return {
    summary: `${site.name} is an AI growth agency based in the ${site.region}. It builds conversion-focused websites, runs performance marketing and search growth (SEO, AEO and GEO), manages social media, and automates sales follow-up with AI, mainly on WhatsApp. Work is measured on qualified leads and cost per customer rather than clicks.`,
    facts: [
      ["Name", site.name],
      ["Tagline", site.tagline],
      ["Website", site.url],
      ["Based in", site.region],
      ["Serves", "Clients across India and abroad, including the UAE, UK and US"],
      ...(site.email ? [["Email", site.email]] : []),
      ...(site.phone ? [["Phone", site.phone]] : []),
    ] as [string, string][],
    services: services.map((s) => ({ name: s.name, url: `${site.url}/services/${s.slug}`, description: s.metaDescription })),
    industries: industries.map((i) => ({ name: i.name, url: `${site.url}/industries/${i.slug}`, description: i.short })),
    locations: locations.map((l) => ({ name: l.city, url: `${site.url}/locations/${l.slug}` })),
    projects: projects.map((p) => ({ name: p.title, url: p.url!, description: p.summary })),
    policies: [
      "Zenyro does not guarantee rankings, AI mentions or revenue.",
      "Accounts, data, code and automations are set up in the client's name.",
      "Concept demonstrations on the website are labelled as concepts and contain no performance figures.",
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

## Locations
${list(p.locations)}

## Live projects (websites built and grown by Zenyro)
${list(p.projects)}

## Key pages
- [Work](${site.url}/work)
- [Search growth: SEO, AEO and GEO](${site.url}/search-growth)
- [Free AI search and website audit](${site.url}/free-audit)
- [About](${site.url}/about)
- [Contact](${site.url}/contact)

## Policies
${p.policies.map((x) => `- ${x}`).join("\n")}
${p.social.length ? `\n## Profiles\n${p.social.map((s) => `- ${s}`).join("\n")}\n` : ""}`;
}

import { llmsText } from "@/lib/ai-profile";
import { services } from "@/data/services";
import { markets } from "@/data/markets";
import { articles, type Article } from "@/data/insights";
import { glossary } from "@/data/glossary";
import { plans, planTerms } from "@/data/pricing";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const strip = (t: string) => t.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, `$1 (${site.url}$2)`);

function articleMd(a: Article) {
  const out = [`### ${a.title}`, `${site.url}/insights/${a.slug}`, "", a.description, ""];
  if (a.takeaways) out.push("Key takeaways:", ...a.takeaways.map((t) => `- ${strip(t)}`), "");
  for (const b of a.body) {
    if (b.type === "h2") out.push(`#### ${b.text}`);
    else if (b.type === "h3") out.push(`##### ${b.text}`);
    else if (b.type === "p") out.push(strip(b.text));
    else if (b.type === "ul" || b.type === "ol") out.push(...b.items.map((it, i) => `${b.type === "ol" ? `${i + 1}.` : "-"} ${strip(it)}`));
    else if (b.type === "table") out.push(`| ${b.head.join(" | ")} |`, `| ${b.head.map(() => "---").join(" | ")} |`, ...b.rows.map((r) => `| ${r.map(strip).join(" | ")} |`));
    else if (b.type === "callout") out.push(`> ${b.title}: ${strip(b.text)}`);
    out.push("");
  }
  if (a.faqs) out.push(...a.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""]));
  return out.join("\n");
}

/** /llms-full.txt: the site's key content in one markdown file for AI assistants. */
export function GET() {
  const parts = [
    llmsText(),
    "## Pricing",
    ...plans.map((p) => `### ${p.name}: from US$${p.price.USD.toLocaleString("en-US")} a month\n${p.tagline} For: ${p.for}.\n${p.features.map((f) => `- ${f}`).join("\n")}`),
    `Terms: ${planTerms.join("; ")}. Prices are also shown in GBP, EUR, AED, CAD, AUD, SGD and INR at ${site.url}/pricing.`,
    "",
    "## Services in detail",
    ...services.map((s) => [
      `### ${s.name}`, `${site.url}/services/${s.slug}`, "", s.intro, "",
      "What's included:", ...s.included.map((i) => `- ${i.title}: ${i.body}`), "",
      ...s.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""]),
    ].join("\n")),
    "## Markets",
    ...markets.map((m) => `### ${m.country}\n${site.url}/markets/${m.slug}\n\n${m.intro}\n\n${m.landscape.join("\n\n")}\n\nWorking hours: ${m.hours}`),
    "",
    "## Guides and articles",
    ...articles.map(articleMd),
    "## Glossary",
    ...glossary.map((g) => `- ${g.term}: ${g.definition}`),
  ];
  return new Response(parts.join("\n\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}

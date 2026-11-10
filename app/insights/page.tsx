import { PageHero } from "@/components/layout/page-hero";
import { LinkList } from "@/components/sections/link-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { articles } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights on SEO, AEO, GEO and AI Search",
  description: "Practical articles on SEO, local SEO, answer engine optimisation and getting recommended by ChatGPT, Perplexity, Gemini and other AI assistants.",
  path: "/insights",
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Insights"
        title={<>Notes on <Em>search and AI.</Em></>}
        intro="Practical writing on ranking on Google, becoming the answer, and getting recommended by AI assistants. No fluff, no trend-chasing."
      />
      <LinkList
        items={articles.map((a) => ({
          title: a.title,
          body: a.description,
          href: `/insights/${a.slug}`,
          meta: `${a.category} · ${fmt(a.published)}`,
        }))}
      />
      <ContactCta />
    </>
  );
}

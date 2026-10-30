import { PageHero } from "@/components/layout/page-hero";
import { LinkList } from "@/components/sections/link-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { articles } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights on Growth, AI Automation & Performance Marketing",
  description: "Practical articles on speed to lead, WhatsApp automation, performance marketing measurement and AI for business growth.",
  path: "/insights",
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Insights"
        title={<>Notes from <Em>the engine room.</Em></>}
        intro="Practical writing on acquiring customers, automating sales and measuring what matters. No fluff, no trend-chasing."
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

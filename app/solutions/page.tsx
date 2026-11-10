import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { SolutionsExplorer } from "@/components/solutions/solutions-explorer";
import { Em } from "@/components/ui/section-heading";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO by Industry: Search Programmes by Sector",
  description:
    "SEO, AEO and GEO programmes for real estate, hospitality, healthcare, interior design, education, home improvement, travel and financial services.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/solutions" }]}
        eyebrow="Industries"
        title={<>Search growth, <Em>sector by sector.</Em></>}
        intro="Every sector searches differently. These are the SEO, AEO and GEO programmes we run for eight industries where a single customer is worth a real conversation."
      />
      <section className="py-12 md:py-20" aria-label="Industries">
        <div className="shell">
          <SolutionsExplorer
            items={industries.map((i) => ({
              slug: i.slug,
              name: i.name,
              short: i.short,
              headline: i.headline,
              challenges: i.challenges,
              solutions: i.solutions.map((s) => s.title),
            }))}
          />
        </div>
      </section>
      <ContactCta />
    </>
  );
}

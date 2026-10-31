import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { SolutionsExplorer } from "@/components/solutions/solutions-explorer";
import { Em } from "@/components/ui/section-heading";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industry Solutions: Growth Systems by Sector",
  description:
    "Growth systems designed for real estate, hospitality, healthcare, interior design and premium retail, education and professional services, and home improvement.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Solutions", path: "/solutions" }]}
        eyebrow="Industry solutions"
        title={<>Built for businesses <Em>ready to scale.</Em></>}
        intro="Every sector buys differently. These are the growth systems we design for eight industries where a single customer is worth a real conversation."
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

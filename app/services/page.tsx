import { PageHero } from "@/components/layout/page-hero";
import { LinkList } from "@/components/sections/link-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { disciplines, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO, AEO & GEO Services",
  description:
    "Zenyro's search services: SEO, local SEO, technical SEO, answer engine optimisation, content and digital PR, and generative engine optimisation for AI search.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title={<>Get found on Google, <Em>in answers and in AI.</Em></>}
        intro="Six search services across three pillars: SEO to rank, AEO to become the answer, GEO to be recommended by AI. They share one set of foundations, so we run them as one programme."
      />
      <LinkList
        eyebrow="All services"
        items={services.map((s) => ({
          title: s.name,
          body: s.headline + " " + s.intro.split(". ")[0] + ".",
          href: `/services/${s.slug}`,
          meta: `${disciplines[s.discipline].index} · ${disciplines[s.discipline].title}`,
        }))}
      />
      <ContactCta />
    </>
  );
}

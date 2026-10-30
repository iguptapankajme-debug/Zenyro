import { PageHero } from "@/components/layout/page-hero";
import { LinkList } from "@/components/sections/link-grid";
import { Disciplines } from "@/components/sections/disciplines";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { disciplines, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services: Websites, Performance Marketing & AI Automation",
  description:
    "Zenyro's services: website development, performance marketing, lead generation, local SEO, CRM automation and AI automation, run together as one growth system.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title={<>Everything between a stranger and <Em>a customer.</Em></>}
        intro="Six services, three disciplines, one team. Pick the one you need most today; we design it to connect with the rest later."
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
      <Disciplines />
      <ContactCta />
    </>
  );
}

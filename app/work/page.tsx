import { PageHero } from "@/components/layout/page-hero";
import { WorkShowcase } from "@/components/sections/work-showcase";
import { concepts, projects } from "@/data/work";
import { ProjectGrid } from "@/components/sections/project-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work: Websites and Growth Systems by Zenyro",
  description:
    "Live websites built by Zenyro for travel, financial services, auctions and MSME businesses, plus concept demonstrations of the growth systems we build.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", path: "/work" }]}
        eyebrow="Work"
        title={<>Work that moves <Em>business forward.</Em></>}
        intro="Live websites we've launched, followed by concept demonstrations of the growth systems we build."
      />
      <section className="py-20 md:py-28" aria-labelledby="live-title">
        <div className="shell">
          <p className="eyebrow mb-6">Live projects</p>
          <h2 id="live-title" className="display-md mb-12 max-w-2xl">Launched and live.</h2>
          <ProjectGrid items={projects()} headingLevel="h3" />
        </div>
      </section>
      <section className="border-t border-line py-20 md:py-28" aria-labelledby="concepts-title">
        <div className="shell">
          <p className="eyebrow mb-6">Concept demonstrations</p>
          <h2 id="concepts-title" className="display-md max-w-2xl">How we approach a growth system.</h2>
          <p className="mb-12 mt-6 max-w-2xl rounded-2xl border border-line bg-ink-2 p-5 text-[0.9rem] leading-relaxed text-muted">
            <span className="font-medium text-paper">About these examples.</span> Each one is a concept created by Zenyro to illustrate our
            work. None of them describe a real client, and they contain no performance figures.
          </p>
          <WorkShowcase items={concepts()} headingLevel="h3" />
        </div>
      </section>
      <ContactCta />
    </>
  );
}

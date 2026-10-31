import { PageHero } from "@/components/layout/page-hero";
import { SystemFlow } from "@/components/sections/system-flow";
import { concepts, projects } from "@/data/work";
import { ProjectGrid } from "@/components/sections/project-grid";
import { ProjectReel } from "@/components/sections/project-reel";
import { ContactCta } from "@/components/sections/contact-cta";
import { Testimonials } from "@/components/sections/testimonials";
import { Em } from "@/components/ui/section-heading";
import { ShaderCanvas } from "@/components/webgl/shader-canvas";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work: Websites and Growth Systems by Zenyro",
  description:
    "Websites built by Zenyro and grown with SEO, AEO, GEO and social media for travel, financial services, auctions and MSME businesses.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", path: "/work" }]}
        eyebrow="Work"
        shader="warp"
        title={<>Work that moves <Em>business forward.</Em></>}
        intro="Websites we've built and grow with SEO, AEO, GEO and social media, followed by concept demonstrations of the systems we build."
      />
      <ProjectReel items={projects()} title={<>Launched <Em>and live.</Em></>} backdrop />
      <section className="relative isolate overflow-hidden border-t border-line py-20 md:py-28" aria-labelledby="live-title">
        <ShaderCanvas shader="grid" intensity={0.7} className="-z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="shell">
          <p className="eyebrow mb-6">All live projects</p>
          <h2 id="live-title" className="display-md mb-12 max-w-2xl">Every project at a glance.</h2>
          <ProjectGrid items={projects()} headingLevel="h3" />
        </div>
      </section>
      <section className="border-t border-line" aria-labelledby="concepts-title">
        <div className="relative isolate overflow-hidden pb-12 pt-20 md:pt-28">
          <ShaderCanvas shader="ember" intensity={0.6} className="-z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="shell">
            <p className="eyebrow mb-6">Concept demonstrations</p>
            <h2 id="concepts-title" className="display-md max-w-3xl">How we approach a growth system, <Em>start to finish.</Em></h2>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
              Scroll through each system stage by stage: where the customer first finds the business, how the AI assistant answers and
              qualifies them, and how the booking lands in the team&apos;s calendar.
            </p>
            <p className="mt-6 max-w-2xl rounded-2xl border border-line bg-ink-2 p-5 text-[0.9rem] leading-relaxed text-muted">
              <span className="font-medium text-paper">About these examples.</span> Each one is a concept created by Zenyro to illustrate our
              work. None of them describe a real client, and they contain no performance figures.
            </p>
          </div>
        </div>
        {concepts().map((w, i, all) => (
          <SystemFlow key={w.slug} item={w} index={i} total={all.length} headingLevel="h3" />
        ))}
      </section>
      <Testimonials />
      <ContactCta />
    </>
  );
}

import { PageHero } from "@/components/layout/page-hero";
import { SystemFlow } from "@/components/sections/system-flow";
import { concepts, getWork, projects } from "@/data/work";
import { ProjectGrid } from "@/components/sections/project-grid";
import { ProjectReel } from "@/components/sections/project-reel";
import { ExampleGrid } from "@/components/sections/example-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { Testimonials } from "@/components/sections/testimonials";
import { Em } from "@/components/ui/section-heading";
import { ShaderCanvas } from "@/components/webgl/shader-canvas";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Examples: SEO, AEO and GEO Programmes by Zenyro",
  description:
    "Worked examples of the search programmes Zenyro runs: SEO, local SEO, answer engine optimisation and AI visibility (GEO), each walked through stage by stage.",
  path: "/work",
});

/** One walkthrough per discipline, shown in full on this page. */
const featured = ["dental-local-seo", "interiors-search-growth", "manufacturer-ai-visibility"];

export default function WorkPage() {
  const live = projects();
  const examples = concepts();
  const walkthroughs = featured.map(getWork).filter((w) => !!w);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", path: "/work" }]}
        eyebrow="Examples"
        shader="warp"
        title={<>See how search programmes <Em>work.</Em></>}
        intro="Worked examples of how we get businesses found: ranking on Google, becoming the answer in AI Overviews, and getting recommended by ChatGPT, Perplexity and Gemini."
      />

      <section className="relative isolate overflow-hidden py-20 md:py-28" aria-labelledby="examples-title">
        <ShaderCanvas shader="grid" intensity={0.7} className="-z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="shell">
          <p className="eyebrow mb-6">{examples.length} examples</p>
          <h2 id="examples-title" className="display-md max-w-3xl">SEO, AEO and <Em>GEO.</Em></h2>
          <p className="mb-10 mt-6 max-w-2xl rounded-2xl border border-line bg-ink-2 p-5 text-[0.9rem] leading-relaxed text-muted">
            <span className="font-medium text-paper">About these examples.</span> Each one is created by Zenyro to show how we approach a kind of
            business. Names are illustrative, none of them describe a real client, and they contain no performance figures.
          </p>
          <ExampleGrid items={examples} />
        </div>
      </section>

      {live.length > 0 && (
        <>
          <ProjectReel items={live} title={<>Launched <Em>and live.</Em></>} backdrop />
          <section className="border-t border-line py-20 md:py-28" aria-labelledby="live-title">
            <div className="shell">
              <p className="eyebrow mb-6">All live projects</p>
              <h2 id="live-title" className="display-md mb-12 max-w-2xl">Every project at a glance.</h2>
              <ProjectGrid items={live} headingLevel="h3" />
            </div>
          </section>
        </>
      )}

      <section className="border-t border-line" aria-labelledby="walkthroughs-title">
        <div className="relative isolate overflow-hidden pb-12 pt-20 md:pt-28">
          <ShaderCanvas shader="ember" intensity={0.6} className="-z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="shell">
            <p className="eyebrow mb-6">Walkthroughs</p>
            <h2 id="walkthroughs-title" className="display-md max-w-3xl">Three programmes, <Em>start to finish.</Em></h2>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
              Scroll through each one stage by stage. Every example above has its own walkthrough too.
            </p>
          </div>
        </div>
        {walkthroughs.map((w, i, all) => (
          <SystemFlow key={w.slug} item={w} index={i} total={all.length} headingLevel="h3" />
        ))}
      </section>
      <Testimonials />
      <ContactCta />
    </>
  );
}

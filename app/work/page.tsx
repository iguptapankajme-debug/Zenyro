import { PageHero } from "@/components/layout/page-hero";
import { WorkPanels } from "@/components/sections/selected-work";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work: Concept Demonstrations of Our Growth Systems",
  description:
    "Concept demonstrations of the growth systems Zenyro builds for real estate, hospitality and healthcare. Verified client case studies will be published as projects launch.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", path: "/work" }]}
        eyebrow="Work"
        title={<>Work that moves <Em>business forward.</Em></>}
        intro="We will only publish results our clients have verified. Until then, these concept demonstrations show exactly how we approach a brief: the problem, the system and the services involved."
      />
      <section className="py-20 md:py-28" aria-label="Concept demonstrations">
        <div className="shell">
          <p className="mb-10 max-w-2xl rounded-2xl border border-line bg-ink-2 p-5 text-[0.9rem] leading-relaxed text-muted">
            <span className="font-medium text-paper">About these examples.</span> Each one is a concept created by Zenyro to illustrate our
            work. None of them describe a real client, and they contain no performance figures.
          </p>
          <WorkPanels headingLevel="h2" />
        </div>
      </section>
      <ContactCta />
    </>
  );
}

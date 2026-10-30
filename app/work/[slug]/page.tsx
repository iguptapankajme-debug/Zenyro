import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { WorkPanels } from "@/components/sections/selected-work";
import { ContactCta } from "@/components/sections/contact-cta";
import { SystemFlow } from "@/components/sections/system-flow";
import { getWork, work } from "@/data/work";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return work.filter((w) => w.kind !== "project").map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const w = getWork((await params).slug);
  if (!w) return {};
  return buildMetadata({
    title: `${w.title}: ${w.kind === "concept" ? "Concept Demonstration" : "Case Study"}`,
    description: `${w.summary} ${w.kind === "concept" ? "A concept demonstration by Zenyro, not a client project." : ""}`.trim(),
    path: `/work/${w.slug}`,
  });
}

export default async function WorkItemPage({ params }: Props) {
  const w = getWork((await params).slug);
  if (!w || w.kind === "project") notFound();
  const others = work.filter((x) => x.slug !== w.slug && x.kind !== "project");
  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", path: "/work" }, { name: w.title, path: `/work/${w.slug}` }]}
        eyebrow={`${w.industry} · ${w.kind === "concept" ? "Concept demonstration" : "Case study"}`}
        title={w.title}
        intro={w.summary}
      />
      {w.flow && (
        <section aria-labelledby="flow-title" className="pt-20 md:pt-28">
          <div className="shell mb-10">
            <p className="eyebrow mb-6">How the system works</p>
            <h2 id="flow-title" className="display-md max-w-3xl">From first touch to booked, stage by stage.</h2>
          </div>
          <SystemFlow item={w} index={work.filter((x) => x.kind === w.kind).indexOf(w)} total={work.filter((x) => x.kind === w.kind).length} headingLevel="h3" link={false} />
        </section>
      )}
      <section className="py-20 md:py-28">
        <div className="shell">
          {w.kind === "concept" && (
            <p className="mb-10 max-w-2xl rounded-2xl border border-line bg-ink-2 p-5 text-[0.9rem] leading-relaxed text-muted">
              <span className="font-medium text-paper">This is a concept.</span> It was created by Zenyro to show how we would approach this kind of
              brief. It does not describe a real client and contains no performance figures.
            </p>
          )}
          <WorkPanels items={[w]} headingLevel="h2" />
          <nav aria-label="More work" className="mt-16 border-t border-line pt-10">
            <p className="eyebrow mb-6">More work</p>
            <ul className="grid gap-4 md:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/work/${o.slug}`} className="inline-flex items-center gap-2 text-[1.3rem] font-medium">
                    <span className="link-u">{o.title}</span> <ArrowUpRight aria-hidden="true" className="size-4 text-ember" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

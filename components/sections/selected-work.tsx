import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, work } from "@/data/work";
import { IndustryArt } from "@/components/ui/industry-art";
import { Em } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { ProjectReel } from "./project-reel";

export function WorkPanels({ items = work, headingLevel = "h3" }: { items?: typeof work; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-6">
      {items.map((w, i) => (
        <article key={w.slug} id={w.slug} className="group grid scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 lg:grid-cols-12" data-reveal>
          <div className={cn("relative aspect-[16/10] overflow-hidden border-b border-line lg:col-span-7 lg:aspect-auto lg:min-h-[30rem] lg:border-b-0", i % 2 ? "lg:order-2 lg:border-l" : "lg:border-r")}>
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]">
              <IndustryArt art={w.art} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <span className="absolute left-5 top-5 rounded-full bg-paper px-3 py-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink">
              {w.kind === "concept" ? "Concept demonstration" : "Case study"}
            </span>
            <p className="absolute bottom-5 left-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">{w.industry}</p>
          </div>
          <div className="flex flex-col p-7 sm:p-10 lg:col-span-5">
            <p className="text-[0.85rem] text-muted">{w.client}</p>
            <H className="mt-2 text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">{w.title}</H>
            <dl className="mt-8 grid gap-5 text-[0.92rem]">
              <div>
                <dt className="eyebrow mb-2">Challenge</dt>
                <dd className="leading-relaxed text-muted">{w.challenge}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Solution</dt>
                <dd className="leading-relaxed text-muted">{w.solution}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Services</dt>
                <dd className="flex flex-wrap gap-2">
                  {w.services.map((s) => <span key={s} className="rounded-full border border-line-2 px-3 py-1 text-[0.78rem]">{s}</span>)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Outcomes</dt>
                <dd className="leading-relaxed text-muted">
                  {w.outcomes.length ? (
                    <ul className="grid gap-1">{w.outcomes.map((o) => <li key={o} className="text-paper">{o}</li>)}</ul>
                  ) : (
                    "This is a concept, so there are no results to report. Verified client results will be published here once projects go live."
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}

export function SelectedWork() {
  return (
    <div className="border-t border-line">
      <ProjectReel items={projects()} title={<>Work that moves <Em>business forward.</Em></>} />
      <div className="shell pb-24">
        <Link href="/work" className="group inline-flex items-center gap-2 text-[1rem] font-medium">
          <span className="link-u">All work and concept demonstrations</span>
          <ArrowUpRight aria-hidden="true" className="size-4 text-ember" />
        </Link>
      </div>
    </div>
  );
}

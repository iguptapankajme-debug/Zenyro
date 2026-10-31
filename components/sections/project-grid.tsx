"use client";

import { ArrowUpRight } from "lucide-react";
import type { WorkItem } from "@/data/work";
import { IndustryArt } from "@/components/ui/industry-art";
import { DistortImage } from "@/components/webgl/distort-image";

/** Grid of live projects. Each card opens the live site in a new tab. */
export function ProjectGrid({ items, headingLevel = "h3" }: { items: WorkItem[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {items.map((w, i) => (
        <li key={w.slug} data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties}>
          <a
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            onPointerMove={onMove}
            className="work-panel group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 transition-colors duration-500 hover:border-ember/60"
          >
            <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-ink">
              <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.07]">
                {w.image ? (
                  <DistortImage src={w.image} alt={`${w.title} website`} sizes="(min-width: 768px) 50vw, 100vw" className="absolute inset-0" />
                ) : (
                  <IndustryArt art={w.art} />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ink">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Live project
              </span>
              <span className="absolute bottom-4 left-4 font-mono text-[0.7rem] text-muted">{w.client}</span>
              <span aria-hidden="true" className="work-cursor pointer-events-none absolute left-0 top-0 hidden size-20 items-center justify-center rounded-full bg-ember font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ember-ink md:flex">
                Visit
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ember">{w.industry}</p>
              <H className="mt-3 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em]">{w.title}</H>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{w.summary}</p>
              {w.results?.length ? (
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
                  {w.results.map((r) => (
                    <div key={r.label}>
                      <dt className="sr-only">{r.label}</dt>
                      <dd className="text-[1.8rem] font-semibold leading-none tracking-[-0.04em] text-ember">{r.value}</dd>
                      <dd className="mt-1.5 text-[0.78rem] leading-snug text-muted">{r.label}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                <ul className="flex flex-wrap gap-2">{w.services.map((s) => <li key={s} className="rounded-full border border-line-2 px-3 py-1 text-[0.75rem] text-muted">{s}</li>)}</ul>
                <span className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium">
                  Visit site <ArrowUpRight aria-hidden="true" className="size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(opens {w.client} in a new tab)</span>
                </span>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

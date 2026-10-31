"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { exampleCategories, type ExampleCategory, type WorkItem } from "@/data/work";
import { IndustryArt } from "@/components/ui/industry-art";
import { cn } from "@/lib/cn";

/**
 * Filterable gallery of example systems (concept demonstrations). Each card opens the example's
 * own page, where the system is walked through stage by stage.
 */
export function ExampleGrid({ items, filters = true, headingLevel = "h3" }: { items: WorkItem[]; filters?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const [active, setActive] = useState<ExampleCategory | "all">("all");
  const shown = active === "all" ? items : items.filter((w) => w.categories?.includes(active));
  const label = (k: ExampleCategory) => exampleCategories.find((c) => c.key === k)?.label ?? k;

  return (
    <div>
      {filters && (
        <div role="group" aria-label="Filter examples" className="mb-10 flex flex-wrap gap-2">
          {[{ key: "all" as const, label: "All examples" }, ...exampleCategories].map((c) => {
            const count = c.key === "all" ? items.length : items.filter((w) => w.categories?.includes(c.key)).length;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={active === c.key}
                onClick={() => setActive(c.key)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-[0.9rem] transition-colors",
                  active === c.key ? "border-ember bg-ember text-ember-ink" : "border-line-2 text-muted hover:border-paper hover:text-paper",
                )}
              >
                {c.label}
                <span className={cn("font-mono text-[0.7rem]", active === c.key ? "text-ember-ink/70" : "text-dim")}>{count}</span>
              </button>
            );
          })}
        </div>
      )}
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((w) => (
          <li key={w.slug} className="blur-swap">
            <Link
              href={`/work/${w.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 transition-colors duration-500 hover:border-ember/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]">
                  <IndustryArt art={w.art} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1.5 font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] text-ink">Example</span>
                <span className="absolute bottom-4 left-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{w.industry}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <ul className="flex flex-wrap gap-1.5" aria-label="Demonstrates">
                  {w.categories?.map((c) => (
                    <li key={c} className="rounded-full border border-line-2 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ember">{label(c)}</li>
                  ))}
                </ul>
                <H className="mt-4 text-[1.35rem] font-semibold leading-[1.1] tracking-[-0.03em]">{w.title}</H>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{w.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.9rem] font-medium">
                  <span className="link-u">See how it works</span>
                  <ArrowUpRight aria-hidden="true" className="size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

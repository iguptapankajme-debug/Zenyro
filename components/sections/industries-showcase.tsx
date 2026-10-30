"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/data/industries";
import { IndustryArt } from "@/components/ui/industry-art";
import { cn } from "@/lib/cn";

/** Desktop: an oversized index of industries with a live preview panel. Phones: stacked, fully expanded entries. */
export function IndustriesShowcase() {
  const [active, setActive] = useState(0);
  const current = industries[active]!;

  return (
    <>
      <div className="mt-16 hidden gap-10 lg:grid lg:grid-cols-12">
        <ul className="lg:col-span-6">
          {industries.map((ind, i) => (
            <li key={ind.slug} className="border-b border-line first:border-t">
              <Link
                href={`/industries/${ind.slug}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-center justify-between gap-6 py-6"
              >
                <span
                  className={cn(
                    "text-[clamp(1.6rem,2.6vw,2.6rem)] font-semibold uppercase leading-none tracking-[-0.04em] transition-[color,transform] duration-500 ease-out-expo",
                    i === active ? "translate-x-3 text-paper" : "text-dim",
                  )}
                >
                  {ind.name}
                </span>
                <ArrowUpRight aria-hidden="true" className={cn("size-6 shrink-0 transition-all duration-500", i === active ? "text-ember" : "text-line-2")} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-6">
          <div className="sticky top-28 overflow-hidden rounded-[1.75rem] border border-line bg-ink-2" aria-live="polite">
            <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
              {industries.map((ind, i) => (
                <div
                  key={ind.slug}
                  className={cn(
                    "absolute inset-0 transition-[opacity,clip-path,transform] duration-700 ease-out-expo",
                    i === active ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(0_0_100%_0)]",
                  )}
                >
                  <IndustryArt art={ind.art} />
                </div>
              ))}
              <span className="absolute left-5 top-5 rounded-full border border-line-2 bg-ink/70 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted backdrop-blur">
                {current.short}
              </span>
            </div>
            <div className="grid gap-6 p-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-4">The challenge</p>
                <ul className="grid gap-2.5 text-[0.9rem] leading-snug text-muted">
                  {current.challenges.slice(0, 3).map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-4">What we build</p>
                <ul className="grid gap-2.5 text-[0.9rem] leading-snug">
                  {current.solutions.map((s) => <li key={s.title}>{s.title}</li>)}
                </ul>
              </div>
              <Link href={`/industries/${current.slug}`} className="group inline-flex items-center gap-2 text-[0.95rem] font-medium text-ember sm:col-span-2">
                <span className="link-u">See the {current.name.toLowerCase()} growth system</span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-12 grid gap-4 lg:hidden">
        {industries.map((ind) => (
          <li key={ind.slug} className="overflow-hidden rounded-3xl border border-line bg-ink-2">
            <div className="aspect-[16/9] border-b border-line"><IndustryArt art={ind.art} /></div>
            <div className="p-6">
              <h3 className="text-[1.5rem] font-semibold uppercase tracking-[-0.03em]">{ind.name}</h3>
              <p className="mt-1 text-[0.85rem] text-muted">{ind.short}</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{ind.challenges[0]}</p>
              <Link href={`/industries/${ind.slug}`} className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ember">
                Explore solutions <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

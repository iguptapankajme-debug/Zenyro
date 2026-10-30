"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/data/industries";
import { IndustryArt } from "@/components/ui/industry-art";
import { cn } from "@/lib/cn";

/**
 * Editorial industry selector. Every industry is a real link (crawlable); on desktop, hovering or
 * focusing previews it, on touch screens the first tap selects it and the CTA navigates.
 */
export function IndustriesShowcase() {
  const [active, setActive] = useState(0);
  const current = industries[active]!;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, i: number) => {
    const touch = window.matchMedia("(hover: none)").matches;
    if (touch && i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  return (
    <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
      <ol className="lg:col-span-6">
        {industries.map((ind, i) => {
          const on = i === active;
          return (
            <li key={ind.slug} className="border-b border-line first:border-t">
              <Link
                href={`/industries/${ind.slug}`}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={(e) => onClick(e, i)}
                aria-current={on ? "true" : undefined}
                className="group flex items-baseline gap-5 py-5 lg:py-6"
              >
                <span className={cn("w-7 shrink-0 font-mono text-[0.72rem] transition-colors", on ? "text-ember" : "text-dim")}>0{i + 1}</span>
                <span
                  className={cn(
                    "flex-1 text-[clamp(1.5rem,3.2vw,3rem)] font-semibold uppercase leading-[0.95] tracking-[-0.045em] transition-[color,transform] duration-700 ease-out-expo",
                    on ? "translate-x-2 text-paper" : "text-[#63666e] group-hover:text-muted",
                  )}
                >
                  {ind.name}
                </span>
                <ArrowUpRight aria-hidden="true" className={cn("size-6 shrink-0 transition-all duration-500", on ? "-translate-y-0.5 text-ember" : "text-line-2")} />
              </Link>

              {/* Phones: the selected industry opens in place */}
              <div hidden={!on} className="pb-6 lg:hidden">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
                  <div className="ind-art absolute inset-0"><IndustryArt art={ind.art} /></div>
                </div>
                <p className="mt-4 text-[1.15rem] font-medium leading-snug">{ind.headline}</p>
                <Link href={`/industries/${ind.slug}`} className="mt-3 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ember">
                  Explore {ind.name} <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[1.75rem] border border-line bg-ink" aria-hidden="true">
            {industries.map((ind, i) => (
              <div
                key={ind.slug}
                className={cn(
                  "absolute inset-0 transition-[clip-path,opacity] duration-[900ms] ease-out-expo",
                  i === active ? "opacity-100 [clip-path:inset(0_0_0_0_round_0)]" : "opacity-0 [clip-path:inset(12%_12%_12%_12%_round_24px)]",
                )}
              >
                <div className={cn("ind-art absolute inset-0", i === active && "is-on")}>
                  <IndustryArt art={ind.art} />
                </div>
              </div>
            ))}
            <div key={current.slug} className="ind-sweep pointer-events-none absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-8 pt-24">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{current.short}</p>
              <p key={current.slug} className="mt-3 max-w-md animate-fade text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.035em]">{current.headline}</p>
            </div>
          </div>
          <Link
            href={`/industries/${current.slug}`}
            data-magnetic
            className="group mt-5 inline-flex h-12 items-center gap-3 rounded-full bg-paper px-6 text-[0.92rem] font-medium text-ink transition-colors hover:bg-ember hover:text-ember-ink"
          >
            Explore {current.name}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

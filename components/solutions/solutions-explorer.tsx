"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MorphStage } from "./morph-stage";
import { cn } from "@/lib/cn";

type Item = { slug: string; name: string; short: string; headline: string; challenges: string[]; solutions: string[] };

/**
 * Scroll-driven industry explorer. The industry nearest the middle of the viewport becomes
 * active; the sticky stage morphs one continuous shape into its emblem and swaps the label
 * with a short blur. All industry content stays in the page as real, crawlable text.
 */
export function SolutionsExplorer({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const current = items[active]!;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  const jump = (i: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    blocks.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Stage */}
      <div className="sticky top-[4.75rem] z-10 -mx-[var(--gutter)] h-[40vh] border-b border-line bg-ink px-[var(--gutter)] lg:order-2 lg:col-span-6 lg:mx-0 lg:h-[calc(100vh-8rem)] lg:border-0 lg:bg-transparent lg:px-0">
        <div className="relative h-full overflow-hidden lg:rounded-[2rem] lg:border lg:border-line lg:bg-[#050608]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:22px_22px] opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
          <MorphStage shape={items[active]!.slug} className="absolute inset-0" />
          <div className="pointer-events-none absolute left-5 top-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted lg:left-8 lg:top-8">
            <span key={current.slug} className="blur-swap inline-block text-ember">0{active + 1}</span> / 0{items.length}
          </div>
          <div className="pointer-events-none absolute inset-x-5 bottom-5 lg:inset-x-8 lg:bottom-8">
            <p key={`${current.slug}-n`} className="blur-swap text-[clamp(1.3rem,2.4vw,2.2rem)] font-semibold uppercase leading-none tracking-[-0.04em]">{current.name}</p>
            <p key={`${current.slug}-h`} className="blur-swap mt-2 hidden max-w-sm text-[0.95rem] text-muted [animation-delay:60ms] lg:block">{current.headline}</p>
          </div>
          <div className="absolute right-2 top-2 flex lg:right-5 lg:top-5" role="group" aria-label="Jump to industry">
            {items.map((it, i) => (
              <button key={it.slug} type="button" onClick={() => jump(i)} aria-label={`Show ${it.name}`} aria-current={i === active ? "true" : undefined}
                className="group flex h-9 min-w-6 items-center justify-center px-1">
                <span className={cn("block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-out-expo", i === active ? "w-6 bg-ember" : "w-1.5 bg-line-2 group-hover:bg-muted")} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Industries */}
      <ol className="lg:order-1 lg:col-span-6">
        {items.map((it, i) => (
          <li
            key={it.slug}
            ref={(el) => { blocks.current[i] = el; }}
            data-index={i}
            className="flex min-h-[62vh] flex-col justify-center border-b border-line py-14 lg:min-h-[78vh]"
          >
            <p className="font-mono text-[0.72rem] text-ember">0{i + 1}</p>
            <h2 className={cn("mt-4 text-[clamp(2.2rem,4.6vw,4.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] transition-colors duration-700", i === active ? "text-paper" : "text-[#63666e]")}>{it.name}</h2>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">{it.short}</p>
            <p className="mt-6 text-[1.35rem] font-medium leading-snug tracking-[-0.015em]">{it.headline}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-3">Challenges</p>
                <ul className="grid gap-2 text-[0.92rem] leading-snug text-muted">{it.challenges.slice(0, 2).map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
              <div>
                <p className="eyebrow mb-3">What we build</p>
                <ul className="grid gap-2 text-[0.92rem] leading-snug">{it.solutions.slice(0, 3).map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            </div>
            <Link href={`/industries/${it.slug}`} className="group mt-8 inline-flex w-fit items-center gap-2 font-medium text-ember">
              <span className="link-u">Explore {it.name}</span>
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

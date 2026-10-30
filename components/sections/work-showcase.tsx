"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { WorkItem } from "@/data/work";
import { IndustryArt } from "@/components/ui/industry-art";

/**
 * Full-width, image-led project panels: masked entrance, gentle scroll parallax on the image and
 * a cursor-following "Explore" label on fine pointers. Each panel links to the full write-up.
 */
export function WorkShowcase({ items, headingLevel = "h3" }: { items: WorkItem[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const arts = [...root.current!.querySelectorAll<HTMLElement>("[data-parallax]")];
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      for (const el of arts) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${(p * -8).toFixed(2)}%, 0) scale(1.18)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={root} className="grid gap-6 md:gap-10">
      {items.map((w, i) => (
        <article key={w.slug} data-reveal="mask">
          <Link
            href={`/work/${w.slug}`}
            onPointerMove={onMove}
            data-cursor
            className="work-panel group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-ink sm:aspect-[16/10] lg:aspect-[16/8]"
          >
            <div data-parallax className="absolute inset-0 will-change-transform [transform:scale(1.18)]">
              <div className="absolute inset-0 transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.05]">
                <IndustryArt art={w.art} />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

            <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
              <span className="rounded-full bg-paper px-3 py-1.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ink">
                {w.kind === "concept" ? "Concept demonstration" : "Case study"}
              </span>
              <span className="font-mono text-[0.7rem] text-muted">0{i + 1} / 0{items.length}</span>
            </div>

            <div className="absolute inset-x-5 bottom-6 grid gap-5 sm:inset-x-8 sm:bottom-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">{w.industry}</p>
                <H className="mt-3 text-[clamp(2.2rem,6vw,5.6rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em]">{w.title}</H>
              </div>
              <div className="md:col-span-4 md:text-right">
                <p className="text-[1rem] leading-snug text-muted md:ml-auto md:max-w-xs">{w.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[0.95rem] font-medium">
                  <span className="link-u">Explore project</span> <ArrowUpRight aria-hidden="true" className="size-4 text-ember" />
                </span>
              </div>
            </div>

            {/* Cursor-following label (fine pointers only) */}
            <span aria-hidden="true" className="work-cursor pointer-events-none absolute left-0 top-0 hidden size-24 items-center justify-center rounded-full bg-ember font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ember-ink md:flex">
              Explore
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}

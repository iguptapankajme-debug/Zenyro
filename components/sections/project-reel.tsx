"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { WorkItem } from "@/data/work";
import { IndustryArt } from "@/components/ui/industry-art";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ShaderCanvas } from "@/components/webgl/shader-canvas";
import { DistortImage } from "@/components/webgl/distort-image";

/**
 * Cinematic project reel.
 * Desktop: the section pins and vertical scroll drives the projects sideways as a 3D cover-flow;
 * the focused project comes forward, its browser frame types the live domain, the rest recede.
 * Phones and reduced motion: a native swipeable snap carousel. Every card links to the live site.
 */
export function ProjectReel({ items, title, backdrop = false }: { items: WorkItem[]; title: React.ReactNode; /** Scroll-reactive WebGL light streaks behind the reel. */ backdrop?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const slides = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const pinned = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

  useEffect(() => {
    const tr = track.current;
    if (!pinned) {
      tr?.style.removeProperty("transform");
      slides.current.forEach((el) => { el?.style.removeProperty("transform"); el?.style.removeProperty("opacity"); });
      return;
    }
    let raf = 0;
    let last = -1;
    const update = () => {
      const sec = section.current;
      const tr = track.current;
      if (!sec || !tr) return;
      const r = sec.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(Math.max(-r.top / Math.max(total, 1), 0), 1);
      const max = tr.scrollWidth - tr.clientWidth;
      tr.style.transform = `translate3d(${-p * max}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const pos = p * (items.length - 1);
      slides.current.forEach((el, i) => {
        if (!el) return;
        const d = i - pos;
        const ad = Math.min(Math.abs(d), 2);
        el.style.transform = `perspective(1600px) rotateY(${(-d * 6).toFixed(2)}deg) scale(${(1 - ad * 0.12).toFixed(3)})`;
        el.style.opacity = String(1 - ad * 0.38);
      });
      const a = Math.round(pos);
      if (a !== last) { last = a; setActive(a); }
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length, pinned]);

  return (
    <section
      ref={section}
      aria-labelledby="reel-title"
      className="relative"
      style={pinned ? { height: `${items.length * 70 + 40}vh` } : undefined}
    >
      <div className={cn("relative isolate overflow-hidden py-20 md:py-28", pinned && "sticky top-0 flex h-screen flex-col justify-center pb-6 pt-24")}>
        {backdrop && <ShaderCanvas shader="streaks" className="-z-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />}
        <div className="shell flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5">Selected work</p>
            <h2 id="reel-title" className={pinned ? "text-[clamp(2.2rem,3.8vw,3.8rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em]" : "display-lg"}>{title}</h2>
          </div>
          <div className="flex items-end gap-6">
            <p className="font-mono text-[clamp(2.4rem,4vw,3.6rem)] font-medium leading-none tabular-nums tracking-[-0.04em]" aria-live="polite">
              <span key={active} className="blur-swap inline-block text-ember">{String(active + 1).padStart(2, "0")}</span>
              <span className="text-dim"> / {String(items.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>

        <div className="relative mt-10 lg:mt-8">
          <div
            ref={track}
            className={cn(
              "flex gap-6 px-[var(--gutter)] lg:gap-20",
              pinned ? "" : "snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            <ol className="contents">
              {items.map((w, i) => (
                <li
                  key={w.slug}
                  ref={(el) => { slides.current[i] = el; }}
                  className="w-[86vw] shrink-0 snap-center sm:w-[70vw] lg:w-[min(50vw,52rem,calc((100vh-19rem)*1.6))]"
                  style={{ transformOrigin: "center center", transition: pinned ? "none" : undefined }}
                >
                  <a href={w.url} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`${w.title}: visit ${w.client} (opens in a new tab)`}>
                    {/* Browser frame */}
                    <div className="overflow-hidden rounded-[1.25rem] border border-line-2 bg-ink-2 shadow-[0_50px_100px_-50px_rgba(0,0,0,.9)] transition-colors duration-500 group-hover:border-ember/60">
                      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                        <span className="flex gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-line-2" /><span className="size-2.5 rounded-full bg-line-2" /><span className="size-2.5 rounded-full bg-line-2" /></span>
                        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-mono text-[0.72rem] text-muted">
                          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                          <span key={i === active ? `on-${w.slug}` : w.slug} className={cn("truncate", i === active && "reel-type")}>{w.client}</span>
                        </span>
                        <span className="hidden rounded-full border border-line-2 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted sm:inline">Live</span>
                      </div>
                      <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                        {w.image ? (
                          <DistortImage src={w.image} alt={`${w.title} website`} sizes="(min-width: 1024px) 58rem, 86vw" className="absolute inset-0 transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.04]" />
                        ) : (
                          <div className="absolute inset-0 transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.06]">
                            <IndustryArt art={w.art} />
                          </div>
                        )}
                        {!w.image && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                            <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">{String(i + 1).padStart(2, "0")} · {w.industry}</p>
                              <h3 className="mt-3 text-[clamp(2rem,4.8vw,4.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em]">{w.title}</h3>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap items-start justify-between gap-4 px-1">
                      <div className="max-w-xl">
                        {w.image && (
                          <>
                            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ember">{String(i + 1).padStart(2, "0")} · {w.industry}</p>
                            <h3 className="mb-2 mt-2 text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em]">{w.title}</h3>
                          </>
                        )}
                        <p className="text-[0.98rem] leading-relaxed text-muted">{w.summary}</p>
                        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="What we delivered">
                          {w.services.map((sv) => <li key={sv} className="rounded-full border border-line-2 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">{sv}</li>)}
                        </ul>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-[0.85rem] font-medium text-ink transition-colors group-hover:bg-ember group-hover:text-ember-ink">
                        Visit site <ArrowUpRight aria-hidden="true" className="size-4" />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ol>
            {/* Trailing space: flex containers ignore end padding when measuring scroll width. */}
            <div aria-hidden="true" className="w-px shrink-0 lg:w-[var(--gutter)]" />
          </div>
        </div>

        <div className="shell mt-6">
          <div className="relative h-px bg-line">
            <span ref={bar} aria-hidden="true" className={cn("absolute inset-0 origin-left bg-ember", pinned ? "[transform:scaleX(0)]" : "hidden")} />
          </div>
          <ul className="mt-4 hidden flex-wrap gap-x-6 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] lg:flex">
            {items.map((w, i) => (
              <li key={w.slug} className={cn("transition-colors duration-500", i === active ? "text-paper" : "text-dim")}>{w.title}</li>
            ))}
          </ul>
          {!pinned && <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-dim lg:hidden">Swipe to explore →</p>}
        </div>
      </div>
    </section>
  );
}

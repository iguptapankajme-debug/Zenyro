"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { WorkItem } from "@/data/work";
import type { Pt } from "@/components/solutions/morph-shapes";
import { FlowScreenView } from "./flow-screens";
import { ShaderCanvas, canAnimate } from "@/components/webgl/shader-canvas";
import { pathPoint, startFlowParticles } from "@/components/webgl/flow-particles";
import type { ShaderName } from "@/components/webgl/shaders";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";

/**
 * A concept system, walked through from first touch to booked outcome.
 * Desktop: the section pins and scroll drives the system stage by stage. Leads flow as WebGL light
 * along the pipeline to the live stage, the stage's mock screen plays its motion sequence, and the
 * step list on the left follows. Phones and reduced motion: the stages stack, each with its screen.
 */
const backdrop: Record<string, ShaderName> = { skyline: "grid", arches: "contour", pulse: "ember" };

type Props = {
  item: WorkItem;
  index: number;
  total: number;
  headingLevel?: "h2" | "h3";
  /** Show the link to the concept's own page. */
  link?: boolean;
};

const smooth = (x: number) => { const t = Math.min(Math.max(x, 0), 1); return t * t * (3 - 2 * t); };

export function SystemFlow({ item, index, total, headingLevel = "h3", link = true }: Props) {
  const H = headingLevel;
  const steps = item.flow ?? [];
  const n = steps.length;
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const head = useRef(0);
  const [active, setActive] = useState(0);
  const pinned = useMediaQuery("(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)");

  // Pipeline nodes in the strip's unit square: evenly spaced, alternating high and low.
  const nodes = useMemo<Pt[]>(() => Array.from({ length: n }, (_, i) => [0.07 + (i * 0.86) / Math.max(n - 1, 1), i % 2 ? 0.66 : 0.34]), [n]);
  const pathD = useMemo(() => {
    const pts = Array.from({ length: 121 }, (_, k) => pathPoint(nodes, k / 120));
    return pts.map((p, k) => `${k ? "L" : "M"}${(p[0] * 1000).toFixed(1)} ${(p[1] * 200).toFixed(1)}`).join(" ");
  }, [nodes]);

  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    let last = -1;
    const update = () => {
      const sec = section.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const p = Math.min(Math.max(-r.top / Math.max(r.height - window.innerHeight, 1), 0), 1);
      // The head dwells on each stage and travels between them in the middle of each scroll segment.
      const pos = p * (n - 1);
      const base = Math.min(Math.floor(pos), n - 1);
      const dpos = base + smooth((pos - base - 0.3) / 0.4);
      head.current = dpos / (n - 1);
      if (trail.current) trail.current.style.clipPath = `inset(0 ${((1 - (0.07 + head.current * 0.86)) * 100).toFixed(2)}% 0 0)`;
      const a = Math.round(dpos);
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
  }, [pinned, n]);

  useEffect(() => {
    if (!pinned || !canAnimate()) return;
    const el = canvas.current!;
    let stop: (() => void) | null = null;
    const gate = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting || stop) return;
      gate.disconnect();
      stop = startFlowParticles(el, nodes, () => head.current);
    }, { rootMargin: "300px" });
    gate.observe(el);
    return () => { gate.disconnect(); stop?.(); };
  }, [pinned, nodes]);

  const goTo = (i: number) => {
    const sec = section.current;
    if (!sec) return;
    const total = sec.offsetHeight - window.innerHeight;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (i / (n - 1)) * total + 2, behavior: "smooth" });
  };

  const intro = (
    <>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">
        Concept {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {item.industry}
      </p>
      <H className={cn("mt-4 font-semibold uppercase leading-[0.9] tracking-[-0.05em]", pinned ? "text-[clamp(2rem,3.2vw,3.4rem)]" : "text-[clamp(2.2rem,8vw,3.6rem)]")}>{item.title}</H>
      <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-muted">{item.summary}</p>
    </>
  );
  const explore = link && (
    <Link href={`/work/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium">
      <span className="link-u">Explore the full concept</span> <ArrowUpRight aria-hidden="true" className="size-4 text-ember" />
    </Link>
  );

  if (!pinned) {
    return (
      <section aria-label={item.title} className="border-t border-line py-16">
        <div className="shell">
          {intro}
          <ol className="mt-10 grid gap-10">
            {steps.map((s, i) => (
              <li key={s.node} className="grid gap-5 md:grid-cols-2 md:items-center">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ember">Step {String(i + 1).padStart(2, "0")} · {s.node}</p>
                  <p className="mt-2 text-[1.25rem] font-medium leading-snug">{s.title}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
                </div>
                <LazyScreen>{<FlowScreenView screen={s.screen} art={item.art} />}</LazyScreen>
              </li>
            ))}
          </ol>
          {explore}
        </div>
      </section>
    );
  }

  return (
    <section ref={section} aria-label={item.title} className="relative border-t border-line" style={{ height: `${n * 60 + 40}vh` }}>
      <div className="sticky top-0 flex h-screen items-center pb-6 pt-24">
        <div className="shell grid w-full items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {intro}
            <ol className="mt-8 grid">
              {steps.map((s, i) => (
                <li key={s.node} className={cn("border-l-2 pl-5 transition-colors duration-500", i === active ? "border-ember" : i < active ? "border-ember/30" : "border-line")}>
                  <button type="button" onClick={() => goTo(i)} aria-current={i === active ? "step" : undefined} className="flex w-full items-baseline gap-3 py-2 text-left">
                    <span className={cn("font-mono text-[0.7rem] tabular-nums transition-colors duration-500", i <= active ? "text-ember" : "text-dim")}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={cn("text-[1.02rem] font-medium transition-colors duration-500", i === active ? "text-paper" : "text-dim")}>{s.title}</span>
                  </button>
                  <div className={cn("grid transition-[grid-template-rows] duration-700 ease-out-expo", i === active ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <p className="overflow-hidden pb-1 pl-8 text-[0.9rem] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            {explore}
          </div>

          <div aria-hidden="true" className="lg:col-span-7">
            <div className="relative isolate flex h-[min(calc(100vh-9rem),44rem)] flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-2">
              <ShaderCanvas shader={backdrop[item.art] ?? "contour"} intensity={0.55} className="-z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
              <div className="flex items-center justify-between px-6 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
                <span className="text-muted">
                  Stage <span key={active} className="blur-swap inline-block text-paper">{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-2 text-dim"><span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />System running</span>
              </div>

              {/* Pipeline: dim full route, lit trail up to the live stage, WebGL lead stream, nodes. */}
              <div className="relative mx-6 mt-2 h-32 shrink-0">
                <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <path d={pathD} fill="none" stroke="var(--color-line-2)" strokeWidth="1.5" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
                </svg>
                <div ref={trail} className="absolute inset-0 [clip-path:inset(0_93%_0_0)]">
                  <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="h-full w-full">
                    <path d={pathD} fill="none" stroke="var(--color-ember)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
                <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
                {nodes.map(([x, y], i) => (
                  <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x * 100}%`, top: `${y * 100}%` }}>
                    <span
                      data-state={i === active ? "live" : i < active ? "done" : "next"}
                      className={cn(
                        "flow-node relative block size-3.5 rounded-full border-2 transition-all duration-500",
                        i === active ? "scale-125 border-ember bg-ember" : i < active ? "border-ember bg-ink" : "border-line-2 bg-ink",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.12em] transition-colors duration-500",
                        y < 0.5 ? "bottom-6" : "top-6",
                        i === active ? "text-paper" : i < active ? "text-muted" : "text-dim",
                      )}
                    >
                      {steps[i]!.node}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative grid min-h-0 flex-1 place-items-center px-6 pb-6">
                <div key={active} className="blur-swap grid w-full place-items-center">
                  <FlowScreenView screen={steps[active]!.screen} art={item.art} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Mounts its children (and so starts their motion) only once scrolled into view. */
function LazyScreen({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { rootMargin: "-10% 0px" });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="grid min-h-[18rem] place-items-center rounded-[1.5rem] border border-line bg-ink-2 p-5">
      {seen && children}
    </div>
  );
}

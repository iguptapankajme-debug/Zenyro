"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The five-step process as a timeline that draws itself as you scroll: the line fills, each node
 * lights up as the line reaches it, and its card rises in. Static and fully visible without JS.
 */
export function StepsTimeline({ steps }: { steps: { t: string; b: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(1);

  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const n = steps.length;
  return (
    <ol ref={ref} className="relative mt-12 grid gap-6 md:grid-cols-5 md:gap-4">
      {/* Track and fill: vertical on phones, horizontal from md up. */}
      <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-0.5 bg-line md:bottom-auto md:left-4 md:right-4 md:top-[15px] md:h-0.5 md:w-auto" />
      <span aria-hidden="true" className="absolute left-4 top-[15px] hidden h-0.5 origin-left bg-ember transition-transform duration-300 md:block" style={{ right: "1rem", transform: `scaleX(${p})` }} />
      <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-0.5 origin-top bg-ember transition-transform duration-300 md:hidden" style={{ transform: `scaleY(${p})` }} />
      {steps.map((s, i) => {
        const on = p >= (i / (n - 1)) * 0.92;
        return (
          <li key={s.t} className="relative pl-12 md:pl-0 md:pt-12">
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0 grid size-8 place-items-center rounded-full border font-mono text-[0.78rem] font-medium transition-all duration-500",
                on ? "scale-110 border-ember bg-ember text-ember-ink shadow-[0_0_0_6px_rgb(21_94_239/.12)]" : "border-line-2 bg-ink text-dim",
              )}
            >
              {i + 1}
            </span>
            <div className={cn("rounded-2xl border bg-ink p-5 transition-all duration-700", on ? "translate-y-0 border-line opacity-100" : "translate-y-3 border-line opacity-60")}>
              <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em]">{s.t}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{s.b}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

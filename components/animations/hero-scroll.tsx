"use client";

import { useEffect, useRef, useState } from "react";
import { setHeroTarget } from "@/components/3d/hero-state";
import { cn } from "@/lib/cn";

type Stage = { label: string; note: string };

/**
 * Maps scroll progress through the tall hero to the sculpture state (0–2) and the active
 * headline line. Writes to a shared object and a data attribute, so scrolling causes at most
 * one React update per stage change.
 */
export function HeroScroll({ stages }: { stages: Stage[] }) {
  const [stage, setStage] = useState(0);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const md = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    let last = -1;
    const update = () => {
      const r = hero.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = md.matches && total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
      setHeroTarget(p * 2);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const s = Math.min(Math.round(p * 2), 2);
      if (s !== last) {
        last = s;
        hero.dataset.stage = String(s);
        setStage(s);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const md = window.matchMedia("(min-width: 768px)").matches;
    if (!md) {
      setHeroTarget(i);
      hero.dataset.stage = String(i);
      setStage(i);
      return;
    }
    const total = hero.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: hero.offsetTop + (total * i) / 2, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="border-t border-line pt-5">
      <div className="relative mb-4 h-px bg-transparent">
        <span ref={bar} aria-hidden="true" className="absolute inset-0 hidden origin-left bg-ember [transform:scaleX(0)] md:block" />
      </div>
      <ul className="grid grid-cols-3 gap-4" aria-label="Zenyro disciplines">
        {stages.map((s, i) => (
          <li key={s.label}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={stage === i ? "step" : undefined}
              className="group flex w-full flex-col items-start gap-1 text-left font-mono text-[0.68rem] uppercase tracking-[0.14em]"
            >
              <span className={cn("transition-colors", stage === i ? "text-ember" : "text-muted group-hover:text-paper")}>0{i + 1} {s.label}</span>
              <span className="hidden normal-case tracking-normal text-dim sm:block">{s.note}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

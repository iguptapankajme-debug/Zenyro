"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Discipline } from "@/data/services";
import { Tilt } from "@/components/animations/tilt";
import { BuildVisual, ConvertVisual, GrowVisual } from "./discipline-visuals";
import { cn } from "@/lib/cn";

type Item = { key: Discipline; index: string; title: string; claim: string; summary: string; items: string[]; links: { name: string; href: string }[] };

const AUTO_MS = 6500;

export function DisciplineSystem({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const current = items[active]!;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.35 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  // Gently cycle through the disciplines until the visitor takes control.
  useEffect(() => {
    if (!auto || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [auto, inView, active, items.length]);

  const select = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div ref={root} className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
      <div className="min-w-0 lg:col-span-5">
        <div role="tablist" aria-label="Disciplines" aria-orientation="vertical" className="grid grid-cols-3 gap-2 lg:flex lg:flex-col lg:gap-0">
          {items.map((it, i) => (
            <button
              key={it.key}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`disc-tab-${it.key}`}
              aria-selected={active === i}
              aria-controls="disc-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className="group relative flex min-w-0 items-baseline gap-3 border-b border-line pb-3 text-left lg:py-5"
            >
              <span className={cn("hidden font-mono text-[0.7rem] transition-colors sm:inline", active === i ? "text-ember" : "text-dim")}>{it.index}</span>
              <span
                className={cn(
                  "text-[clamp(1.45rem,6.6vw,6rem)] font-semibold uppercase leading-[0.85] tracking-[-0.05em] transition-[color,transform] duration-700 ease-out-expo",
                  active === i ? "text-paper lg:translate-x-2" : "text-[#63666e] group-hover:text-muted",
                )}
              >
                {it.title}
              </span>
              {active === i && auto && inView && (
                <span aria-hidden="true" className="absolute bottom-[-1px] left-0 hidden h-px w-full origin-left bg-ember lg:block" style={{ animation: `progress ${AUTO_MS}ms linear both` }} />
              )}
            </button>
          ))}
        </div>

        <div id="disc-panel" role="tabpanel" aria-labelledby={`disc-tab-${current.key}`} className="mt-8">
          <p key={current.key} className="animate-fade text-[1.5rem] font-medium leading-tight tracking-[-0.02em]">{current.claim}</p>
          <ul key={`${current.key}-l`} className="mt-6 flex flex-wrap gap-2">
            {current.items.map((s, i) => (
              <li key={s} className="animate-fade rounded-full border border-line-2 px-3 py-1.5 text-[0.8rem] text-muted" style={{ animationDelay: `${80 + i * 50}ms` }}>{s}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {current.links.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1.5 text-[0.9rem]">
                <span className="link-u">{l.name}</span> <ArrowUpRight aria-hidden="true" className="size-3.5 text-ember" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="group/tilt lg:col-span-7">
        <Tilt className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 grain" max={5}>
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,107,53,.08),transparent_55%)]" />
          {items.map((it, i) => (
            <div
              key={it.key}
              data-active={active === i}
              aria-hidden={active !== i}
              className={cn(
                "disc-stage absolute inset-0 p-6 transition-[opacity,transform,filter] duration-700 ease-out-expo sm:p-10",
                active === i ? "opacity-100" : "pointer-events-none scale-[0.97] opacity-0 blur-[6px]",
              )}
            >
              {it.key === "build" && <BuildVisual />}
              {it.key === "grow" && <GrowVisual />}
              {it.key === "convert" && <ConvertVisual />}
            </div>
          ))}
          <p className="absolute bottom-5 left-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            {current.index} / {current.title}
          </p>
        </Tilt>
      </div>
    </div>
  );
}

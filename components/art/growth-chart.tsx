"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A search-performance chart in the style of Search Console: four KPI tiles that count up and two
 * lines (clicks and impressions) that draw when the chart scrolls into view. The data is a generated,
 * illustrative curve, labelled as such, never client data.
 */
const WEEKS = 26;
function series(seed: number, base: number, growth: number) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: WEEKS }, (_, i) => {
    const t = i / (WEEKS - 1);
    const trend = base * (1 + growth * t ** 2.2);
    const bump = i === 10 || i === 11 ? 1.18 : i > 22 ? 1.12 : 1;
    return trend * bump * (0.9 + rnd() * 0.18);
  });
}

const path = (data: number[], w: number, h: number) => {
  const max = Math.max(...data) * 1.08;
  return data.map((v, i) => `${i ? "L" : "M"}${((i / (data.length - 1)) * w).toFixed(1)} ${(h - (v / max) * h).toFixed(1)}`).join(" ");
};


function build(seed: number) {
  const clicks = series(7 + seed, 110 + (seed % 7) * 15, 4.5 + (seed % 5) * 0.4);
  const impressions = series(11 + seed, 4800 + (seed % 9) * 400, 3.8 + (seed % 4) * 0.4);
  const tiles = [
    { label: "Total clicks", to: clicks.reduce((a, b) => a + b, 0), fmt: (n: number) => `${(n / 1000).toFixed(1)}K`, cls: "bg-ember text-ember-ink", down: false },
    { label: "Total impressions", to: impressions.reduce((a, b) => a + b, 0), fmt: (n: number) => `${(n / 1000).toFixed(0)}K`, cls: "bg-[#5b3fd0] text-white", down: false },
    { label: "Average CTR", to: 2 + (seed % 6) * 0.15, fmt: (n: number) => `${n.toFixed(1)}%`, cls: "bg-ink text-paper", down: false },
    { label: "Average position", to: 9 + (seed % 7) * 0.6, fmt: (n: number) => n.toFixed(1), cls: "bg-ink text-paper", down: true },
  ];
  return { clicks, impressions, tiles };
}

export function GrowthChart({ className, seed = 0 }: { className?: string; seed?: number }) {
  const { clicks, impressions, tiles } = useMemo(() => build(seed), [seed]);
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { const t = setTimeout(() => setP(1), 0); return () => clearTimeout(t); }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min((t - t0) / 1800, 1);
        setP(1 - (1 - k) ** 3);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const W = 1000, H = 260;
  return (
    <div ref={ref} className={cn("overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_40px_80px_-50px_rgba(9,9,11,.4)]", className)}>
      <div className="grid grid-cols-2 border-b border-line sm:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className={cn("p-4 sm:p-5", t.cls)}>
            <p className="text-[0.78rem] opacity-90">{t.label}</p>
            <p className="mt-2 text-[clamp(1.5rem,3vw,2.2rem)] font-medium tabular-nums leading-none">
              {t.fmt(t.down ? 38 - (38 - t.to) * p : t.to * p)}
            </p>
          </div>
        ))}
      </div>
      <div className="relative p-4 sm:p-6">
        <div className="mb-2 flex justify-between font-mono text-[0.68rem] text-dim"><span>Clicks</span><span>Impressions</span></div>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-44 w-full sm:h-56" aria-hidden="true">
          {[0.25, 0.5, 0.75].map((y) => <line key={y} x1="0" x2={W} y1={H * y} y2={H * y} stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
          <path d={path(impressions, W, H)} fill="none" stroke="#5b3fd0" strokeWidth="2.5" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
          <path d={path(clicks, W, H)} fill="none" stroke="var(--color-ember)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
        </svg>
        <div className="mt-2 flex justify-between font-mono text-[0.68rem] text-dim"><span>Month 1</span><span>Month 3</span><span>Month 6</span></div>
        <p className="mt-4 text-right font-mono text-[0.64rem] uppercase tracking-[0.12em] text-dim">Illustrative example · not client data</p>
      </div>
    </div>
  );
}

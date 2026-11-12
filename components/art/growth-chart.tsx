"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * An interactive search-performance dashboard in the style of Google Search Console:
 * date ranges, metric tiles that toggle their lines, a hover crosshair with a tooltip, and
 * Queries / Pages / Countries tables with animated bars. Every number is generated from a seed and
 * labelled as illustrative: it is never client data.
 */

type Metric = "clicks" | "impressions" | "ctr" | "position";
const METRICS: { key: Metric; label: string; color: string }[] = [
  { key: "clicks", label: "Total clicks", color: "#155EEF" },
  { key: "impressions", label: "Total impressions", color: "#5B3FD0" },
  { key: "ctr", label: "Average CTR", color: "#0E9F6E" },
  { key: "position", label: "Average position", color: "#E8710A" },
];
const RANGES = [{ label: "3 months", weeks: 13 }, { label: "6 months", weeks: 26 }, { label: "12 months", weeks: 52 }] as const;
const TABS = ["Queries", "Pages", "Countries"] as const;

const DEFAULT_QUERIES = ["best seo agency", "how to rank on chatgpt", "ai overviews optimisation", "local seo services", "geo agency", "technical seo audit"];
const PAGES = ["/", "/services/seo", "/services/geo", "/pricing", "/insights/how-to-rank-in-chatgpt", "/free-audit"];
const COUNTRIES = ["United States", "United Kingdom", "United Arab Emirates", "India", "Canada", "Australia"];

function rng(seed: number) {
  let s = (seed % 2147483646) + 1;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

function build(seed: number, weeks: number, queries: readonly string[]) {
  const r = rng(seed * 7 + weeks);
  const cBase = 60 + (seed % 7) * 12, iBase = 3200 + (seed % 9) * 300;
  const clicks: number[] = [], impressions: number[] = [], position: number[] = [];
  for (let i = 0; i < weeks; i++) {
    const t = i / Math.max(weeks - 1, 1);
    const growth = 1 + 4.2 * t ** 1.9;
    impressions.push(iBase * (1 + 3.4 * t ** 1.6) * (0.9 + r() * 0.2));
    clicks.push(cBase * growth * (0.88 + r() * 0.24));
    position.push(Math.max(4.2, 31 - 22 * t ** 0.85 + (r() - 0.5) * 2.2));
  }
  const ctr = clicks.map((c, i) => (c / impressions[i]!) * 100);
  const series: Record<Metric, number[]> = { clicks, impressions, ctr, position };
  const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
  const totals: Record<Metric, number> = {
    clicks: sum(clicks), impressions: sum(impressions),
    ctr: (sum(clicks) / sum(impressions)) * 100,
    position: sum(position) / weeks,
  };
  const table = (names: readonly string[]) => {
    const shares = names.map((_, i) => (0.34 / (i + 1)) * (0.8 + r() * 0.4));
    return names.map((n, i) => {
      const c = totals.clicks * shares[i]!;
      const imp = c / (0.02 + r() * 0.05);
      return { name: n, clicks: c, impressions: imp, ctr: (c / imp) * 100, position: 1.8 + i * 1.6 + r() * 2 };
    }).sort((a, b) => b.clicks - a.clicks);
  };
  return {
    series, totals,
    tables: { Queries: table(queries.slice(0, 6)), Pages: table(PAGES), Countries: table(COUNTRIES) },
  };
}

const fmt = (m: Metric, n: number) =>
  m === "ctr" ? `${n.toFixed(1)}%`
  : m === "position" ? n.toFixed(1)
  : n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : Math.round(n).toLocaleString("en-US");

function weekLabel(i: number, weeks: number) {
  const d = new Date(Date.UTC(2026, 10, 2) - (weeks - 1 - i) * 7 * 864e5);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

export function GrowthChart({ className, seed = 0, queries = DEFAULT_QUERIES }: { className?: string; seed?: number; queries?: readonly string[] }) {
  const [range, setRange] = useState(1);
  const [on, setOn] = useState<Record<Metric, boolean>>({ clicks: true, impressions: true, ctr: false, position: false });
  const [tab, setTab] = useState<(typeof TABS)[number]>("Queries");
  const [hover, setHover] = useState<number | null>(null);
  const [p, setP] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const reduced = useRef(false);

  const weeks = RANGES[range]!.weeks;
  const data = useMemo(() => build(seed, weeks, queries), [seed, weeks, queries]);

  const animate = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (reduced.current) { setP(1); return; }
    setP(0);
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min((t - t0) / 1600, 1);
      setP(1 - (1 - k) ** 3);
      if (k < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      animate();
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf.current); };
  }, [animate]);

  const W = 1000, H = 240, PAD = 8;
  const x = (i: number) => (i / Math.max(weeks - 1, 1)) * W;
  const y = (m: Metric, v: number) => {
    const s = data.series[m];
    const lo = Math.min(...s), hi = Math.max(...s);
    const norm = (v - lo) / (hi - lo || 1);
    // Search Console plots position inverted: lower (better) is higher on the chart.
    return PAD + (m === "position" ? norm : 1 - norm) * (H - PAD * 2) * 0.92 + (H - PAD * 2) * 0.04;
  };
  const line = (m: Metric) => data.series[m].map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(m, v).toFixed(1)}`).join(" ");
  const activeKeys = METRICS.filter((mm) => on[mm.key]);
  const rows = data.tables[tab];
  const maxClicks = Math.max(...rows.map((rw) => rw.clicks));

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - b.left) / b.width) * (weeks - 1));
    setHover(Math.max(0, Math.min(weeks - 1, i)));
  };

  return (
    <div ref={ref} className={cn("w-full min-w-0 overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_40px_80px_-50px_rgba(9,9,11,.4)]", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2 text-[0.9rem] font-medium">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" /><path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2z" /><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 6 12 6z" /></svg>
          Performance on Search results
        </p>
        <div role="group" aria-label="Date range" className="flex gap-1 rounded-full border border-line bg-ink-2 p-0.5">
          {RANGES.map((rg, i) => (
            <button
              key={rg.label}
              type="button"
              aria-pressed={range === i}
              onClick={() => { setRange(i); setHover(null); animate(); }}
              className={cn("rounded-full px-3 py-1 font-mono text-[0.7rem] transition-colors", range === i ? "bg-ink text-paper shadow-sm" : "text-muted hover:text-paper")}
            >
              {rg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric tiles: click to toggle a line, like Search Console */}
      <div className="grid grid-cols-2 border-b border-line sm:grid-cols-4">
        {METRICS.map((mm) => {
          const active = on[mm.key];
          const target = data.totals[mm.key];
          const shown = mm.key === "position" ? 38 - (38 - target) * p : target * p;
          return (
            <button
              key={mm.key}
              type="button"
              aria-pressed={active}
              onClick={() => setOn((o) => ({ ...o, [mm.key]: !o[mm.key] }))}
              style={active ? { backgroundColor: mm.color } : undefined}
              className={cn("p-4 text-left transition-colors duration-300 sm:p-5", active ? "text-white" : "bg-ink text-paper hover:bg-ink-2")}
            >
              <span className="flex items-center gap-2 text-[0.78rem] opacity-90">
                <span aria-hidden="true" className={cn("grid size-3.5 place-items-center rounded-[3px] border", active ? "border-white bg-white" : "border-line-2")}>
                  {active && <svg viewBox="0 0 12 12" className="size-2.5"><path d="M2.5 6.2 5 8.6l4.5-5" fill="none" stroke={mm.color} strokeWidth="1.8" /></svg>}
                </span>
                {mm.label}
              </span>
              <span className="mt-2 block text-[clamp(1.4rem,2.8vw,2.1rem)] font-medium tabular-nums leading-none">{fmt(mm.key, shown)}</span>
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="relative px-4 pb-3 pt-5 sm:px-6">
        <div className="relative" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-44 w-full sm:h-56" aria-hidden="true">
            <defs>
              {activeKeys.map((mm) => (
                <linearGradient key={mm.key} id={`gc-${mm.key}-${seed}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={mm.color} stopOpacity=".16" />
                  <stop offset="1" stopColor={mm.color} stopOpacity="0" />
                </linearGradient>
              ))}
              <clipPath id={`gc-clip-${seed}`}><rect x="0" y="0" height={H} width={W * p} /></clipPath>
            </defs>
            {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
            <g clipPath={`url(#gc-clip-${seed})`}>
              {activeKeys.slice(0, 1).map((mm) => <path key={`a-${mm.key}`} d={`${line(mm.key)} L${W} ${H} L0 ${H}Z`} fill={`url(#gc-${mm.key}-${seed})`} />)}
              {activeKeys.map((mm) => <path key={mm.key} d={line(mm.key)} fill="none" stroke={mm.color} strokeWidth="2.4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />)}
            </g>
            {hover !== null && <line x1={x(hover)} x2={x(hover)} y1="0" y2={H} stroke="var(--color-line-2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />}
          </svg>
          {hover !== null && activeKeys.map((mm) => (
            <span key={mm.key} aria-hidden="true" className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow" style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(mm.key, data.series[mm.key][hover]!) / H) * 100}%`, backgroundColor: mm.color }} />
          ))}
          {hover !== null && activeKeys.length > 0 && (
            <div
              className="pointer-events-none absolute top-2 z-10 min-w-40 rounded-lg border border-line bg-ink px-3 py-2 text-[0.75rem] shadow-xl"
              style={hover > weeks / 2 ? { right: `${100 - (x(hover) / W) * 100 + 2}%` } : { left: `${(x(hover) / W) * 100 + 2}%` }}
            >
              <p className="mb-1 font-medium">Week of {weekLabel(hover, weeks)}</p>
              {activeKeys.map((mm) => (
                <p key={mm.key} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-muted"><span className="size-2 rounded-full" style={{ backgroundColor: mm.color }} />{mm.label.replace("Total ", "").replace("Average ", "")}</span>
                  <span className="tabular-nums">{fmt(mm.key, data.series[mm.key][hover]!)}</span>
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[0.66rem] text-dim">
          <span>{weekLabel(0, weeks)}</span><span>{weekLabel(Math.floor(weeks / 2), weeks)}</span><span>{weekLabel(weeks - 1, weeks)}</span>
        </div>
      </div>

      {/* Tables */}
      <div className="border-t border-line">
        <div role="tablist" aria-label="Breakdown" className="flex gap-1 overflow-x-auto px-3 pt-2 sm:px-4">
          {TABS.map((t) => (
            <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)}
              className={cn("border-b-2 px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors", tab === t ? "border-ember text-paper" : "border-transparent text-muted hover:text-paper")}>
              {t}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-[0.82rem]">
            <thead className="text-[0.72rem] text-dim">
              <tr className="border-b border-line">
                <th scope="col" className="px-4 py-2 font-normal sm:px-5">{tab === "Queries" ? "Top queries" : tab === "Pages" ? "Top pages" : "Country"}</th>
                <th scope="col" className="px-2 py-2 text-right font-normal">Clicks</th>
                <th scope="col" className="px-2 py-2 text-right font-normal">Impressions</th>
                <th scope="col" className="px-2 py-2 text-right font-normal">CTR</th>
                <th scope="col" className="px-4 py-2 text-right font-normal sm:px-5">Position</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((rw, i) => (
                <tr key={rw.name} className="border-b border-line last:border-0">
                  <th scope="row" className="relative px-4 py-2.5 font-normal sm:px-5">
                    <span aria-hidden="true" className="absolute inset-y-1 left-0 rounded-r bg-ember/[0.08] transition-[width] duration-700 ease-out" style={{ width: `${(rw.clicks / maxClicks) * 70 * p}%`, transitionDelay: `${i * 60}ms` }} />
                    <span className="relative">{rw.name}</span>
                  </th>
                  <td className="px-2 py-2.5 text-right tabular-nums">{fmt("clicks", rw.clicks * p)}</td>
                  <td className="px-2 py-2.5 text-right tabular-nums text-muted">{fmt("impressions", rw.impressions * p)}</td>
                  <td className="px-2 py-2.5 text-right tabular-nums text-muted">{fmt("ctr", rw.ctr)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted sm:px-5">{fmt("position", rw.position)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="border-t border-line px-4 py-2.5 text-right font-mono text-[0.62rem] uppercase tracking-[0.12em] text-dim sm:px-5">Illustrative example · not client data</p>
    </div>
  );
}

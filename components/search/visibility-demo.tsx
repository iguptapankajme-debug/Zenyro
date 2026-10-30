"use client";

import { useState } from "react";
import { useTween } from "@/hooks/use-tween";
import { cn } from "@/lib/cn";

type Metric = { label: string; value: number; suffix?: string; series: number[] };
type Tab = {
  key: string;
  label: string;
  source: string;
  metrics: Metric[];
  tableTitle: string;
  columns: [string, string, string];
  rows: [string, string, string][];
  note: string;
};

// Fictional sample data for a made-up business. Nothing here is a measured result.
const tabs: Tab[] = [
  {
    key: "google",
    label: "Google Search",
    source: "Google Search Console and Bing Webmaster Tools",
    metrics: [
      { label: "Organic clicks · 28 days", value: 1240, series: [40, 38, 45, 44, 52, 50, 58, 61, 60, 68, 72, 79] },
      { label: "Search impressions · 28 days", value: 38600, series: [20, 22, 21, 26, 28, 27, 31, 34, 36, 35, 40, 44] },
      { label: "Indexed pages", value: 142, series: [80, 84, 90, 96, 101, 108, 112, 119, 126, 131, 138, 142] },
      { label: "Queries with impressions", value: 1180, series: [30, 33, 35, 34, 39, 42, 44, 47, 52, 55, 58, 62] },
    ],
    tableTitle: "Top queries (sample)",
    columns: ["Query", "Clicks", "Avg. position"],
    rows: [["3bhk interior design chandigarh", "184", "4.2"], ["modular kitchen cost", "121", "7.9"], ["interior designer near me", "96", "9.4"]],
    note: "In a real engagement these numbers are read directly from Search Console and Bing Webmaster Tools.",
  },
  {
    key: "answers",
    label: "Answer Experiences",
    source: "Scheduled checks of a tracked question set, plus Search Console query filters",
    metrics: [
      { label: "Tracked questions", value: 40, series: [20, 20, 24, 24, 28, 28, 32, 32, 36, 36, 40, 40] },
      { label: "Questions answered by the site (latest check)", value: 9, series: [2, 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9] },
      { label: "Pages with answer-first structure", value: 26, series: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26] },
      { label: "Clicks from question queries · 28 days", value: 310, series: [10, 12, 11, 14, 16, 18, 17, 20, 23, 24, 27, 30] },
    ],
    tableTitle: "Tracked questions (sample)",
    columns: ["Question", "Site shown", "Last checked"],
    rows: [["How long does a 3BHK interior take?", "Yes", "Week 12"], ["What does a modular kitchen include?", "Yes", "Week 12"], ["How to choose an interior designer?", "Not yet", "Week 12"]],
    note: "Answer placements change often. Each check records what was observed on that date, not a permanent position.",
  },
  {
    key: "generative",
    label: "Generative AI Search",
    source: "A documented prompt set run on a schedule, plus AI referral sessions in analytics",
    metrics: [
      { label: "Prompts monitored", value: 60, series: [30, 30, 36, 36, 42, 42, 48, 48, 54, 54, 60, 60] },
      { label: "Observed citations (latest run)", value: 14, series: [3, 4, 4, 6, 6, 8, 9, 9, 11, 12, 13, 14] },
      { label: "Brand mentions (latest run)", value: 21, series: [6, 7, 8, 9, 10, 12, 13, 15, 16, 18, 19, 21] },
      { label: "AI referral sessions · 28 days", value: 180, series: [4, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 18] },
    ],
    tableTitle: "Sample prompts",
    columns: ["Prompt", "Mentioned", "Cited source"],
    rows: [["Best interior designers in Chandigarh", "Yes", "northlight-interiors.example"], ["How much does a 3BHK interior cost?", "No", "home-ideas.example"], ["Modular kitchen brands vs local studios", "Yes", "city-magazine.example"]],
    note: "Generative responses vary between sessions and users. Results are reported as observations from a fixed method, not as a single score.",
  },
];

function Spark({ series, active }: { series: number[]; active: boolean }) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const pts = series.map((v, i) => `${(i / (series.length - 1)) * 100},${36 - ((v - min) / (max - min || 1)) * 30}`).join(" ");
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-4 h-10 w-full" aria-hidden="true">
      <polygon points={`0,40 ${pts} 100,40`} fill="rgba(255,107,53,.10)" />
      <polyline points={pts} fill="none" stroke="var(--color-ember)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" pathLength={1} className={cn("spark", active && "is-on")} />
    </svg>
  );
}

function MetricCard({ m, active }: { m: Metric; active: boolean }) {
  const v = useTween(m.value, 900, 0);
  return (
    <div className="bg-ink p-5">
      <p className="text-[0.75rem] leading-snug text-muted">{m.label}</p>
      <p className="mt-2 text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tabular-nums tracking-[-0.03em]">{Math.round(v).toLocaleString("en-IN")}</p>
      <Spark series={m.series} active={active} />
    </div>
  );
}

export function VisibilityDemo({ initial = 0 }: { initial?: number }) {
  const [active, setActive] = useState(initial);
  const t = tabs[active]!;
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-[#050608]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div role="tablist" aria-label="Search experience" className="flex flex-wrap gap-1.5">
          {tabs.map((x, i) => (
            <button key={x.key} role="tab" type="button" aria-selected={active === i} aria-controls="vis-panel" onClick={() => setActive(i)}
              className={cn("rounded-full px-3.5 py-1.5 text-[0.8rem] transition-colors", active === i ? "bg-paper text-ink" : "border border-line-2 text-muted hover:text-paper")}>
              {x.label}
            </button>
          ))}
        </div>
        <span className="rounded-full border border-ember/60 px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ember">Illustrative sample data · not measured results</span>
      </div>

      <div id="vis-panel" role="tabpanel" aria-label={t.label} className="p-5 sm:p-6">
        <p className="text-[0.8rem] text-muted"><span className="text-paper">Real-engagement source:</span> {t.source}</p>
        <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.metrics.map((m) => <MetricCard key={`${t.key}-${m.label}`} m={m} active />)}
        </div>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[30rem] text-left text-[0.85rem]">
            <caption className="px-4 pt-4 text-left font-mono text-[0.62rem] uppercase tracking-[0.14em] text-dim">{t.tableTitle}</caption>
            <thead>
              <tr className="text-muted">{t.columns.map((c) => <th key={c} scope="col" className="px-4 py-3 font-normal">{c}</th>)}</tr>
            </thead>
            <tbody>
              {t.rows.map((r) => (
                <tr key={r[0]} className="animate-fade border-t border-line">
                  <td className="px-4 py-3">{r[0]}</td>
                  <td className={cn("px-4 py-3 tabular-nums", r[1] === "Yes" && "text-ember")}>{r[1]}</td>
                  <td className="px-4 py-3 text-muted">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[0.78rem] leading-relaxed text-dim">{t.note} The business, figures and sources shown are fictional.</p>
      </div>
    </div>
  );
}

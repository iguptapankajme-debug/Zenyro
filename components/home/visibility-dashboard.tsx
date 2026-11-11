"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, BarChart3, FileText, Link2, Search } from "lucide-react";
import { EngineIcon } from "./primitives";
import { cn } from "@/lib/cn";

/**
 * Illustrative dashboard: what a Zenyro client sees each month across Google and AI assistants.
 * All figures are example data for a sample business, labelled as such in the UI.
 */
const tabs = [
  { key: "ai", label: "AI visibility", icon: BarChart3 },
  { key: "google", label: "Google rankings", icon: Search },
  { key: "citations", label: "AI citations", icon: Link2 },
  { key: "content", label: "Content gaps", icon: FileText },
] as const;
type Tab = (typeof tabs)[number]["key"];

const brands = [
  { name: "Your brand", you: true, v: [38.2, 31.5, 27.9, 34.6] },
  { name: "Competitor A", v: [29.4, 22.1, 26.8, 19.7] },
  { name: "Competitor B", v: [12.3, 9.8, 11.2, 8.4] },
  { name: "Competitor C", v: [7.9, 10.4, 4.6, 6.1] },
];
const aiEngines = [
  { key: "chatgpt", name: "ChatGPT" },
  { key: "claude", name: "Claude" },
  { key: "gemini", name: "Gemini" },
  { key: "perplexity", name: "Perplexity" },
] as const;

function Delta({ v, down }: { v: string; down?: boolean }) {
  const I = down ? ArrowDownRight : ArrowUpRight;
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-[0.72rem] font-medium", down ? "text-red-700" : "text-emerald-700")}>
      <I aria-hidden="true" className="size-3" />{v}
    </span>
  );
}

function Kpi({ label, value, delta, down, active }: { label: string; value: string; delta: string; down?: boolean; active?: boolean }) {
  return (
    <div className={cn("relative border-line p-4", active && "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ember")}>
      <p className="text-[0.75rem] text-dim">{label}</p>
      <p className="mt-1 flex items-baseline gap-2 text-[1.5rem] font-medium tracking-[-0.03em]">{value} <Delta v={delta} down={down} /></p>
    </div>
  );
}

/** Smooth trend line for the visibility chart. */
function Trend() {
  const pts = [12, 14, 13, 17, 19, 18, 22, 24, 23, 27, 29, 32];
  const w = 520, h = 120;
  const xy = pts.map((p, i) => [(i / (pts.length - 1)) * w, h - (p / 36) * h] as const);
  const d = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h + 6}`} className="h-28 w-full" aria-hidden="true" preserveAspectRatio="none">
      {[0.25, 0.5, 0.75].map((f) => <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="var(--color-line)" strokeDasharray="3 4" />)}
      <path d={`${d} L${w} ${h} L0 ${h} Z`} fill="url(#trend-fill)" />
      <path d={d} fill="none" stroke="var(--color-ember)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <defs>
        <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#155eef" stopOpacity=".18" />
          <stop offset="1" stopColor="#155eef" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function heat(v: number) {
  const a = Math.min(v / 40, 1);
  return { backgroundColor: `rgba(22, 163, 74, ${(0.08 + a * 0.42).toFixed(2)})` };
}

function AiPanel() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 divide-line overflow-hidden rounded-xl border border-line sm:grid-cols-4 sm:divide-x">
        <Kpi label="AI visibility" value="32.4%" delta="2.4%" active />
        <Kpi label="Share of voice" value="19.8%" delta="1.2%" />
        <Kpi label="Avg. position" value="#1.4" delta="0.3" />
        <Kpi label="Mentions" value="628" delta="41" />
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="overflow-hidden rounded-xl border border-line lg:col-span-3">
          <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] border-b border-line bg-ink-2 text-[0.72rem] text-dim">
            <span className="px-3 py-2.5">Brand</span>
            {aiEngines.map((e) => (
              <span key={e.key} className="flex items-center gap-1.5 px-2 py-2.5"><EngineIcon name={e.key} className="size-3.5 text-paper" />{e.name}</span>
            ))}
          </div>
          {brands.map((b) => (
            <div key={b.name} className={cn("grid grid-cols-[1.4fr_repeat(4,1fr)] gap-1 border-b border-line px-1 py-1 text-[0.8rem] last:border-b-0", b.you && "bg-ember/[0.04]")}>
              <span className={cn("flex items-center gap-2 px-2", b.you && "font-medium")}>
                <span className={cn("size-2 rounded-sm", b.you ? "bg-ember" : "bg-line-2")} />{b.name}
              </span>
              {b.v.map((v, i) => <span key={i} className="rounded px-2 py-1.5 font-mono text-[0.75rem] tabular-nums" style={heat(v)}>{v.toFixed(1)}%</span>)}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-line p-4 lg:col-span-2">
          <p className="text-[0.75rem] text-dim">Visibility trend, last 12 weeks</p>
          <Trend />
          <p className="mt-1 flex justify-between font-mono text-[0.62rem] text-dim"><span>Week 1</span><span>Week 12</span></p>
        </div>
      </div>
    </div>
  );
}

const keywords = [
  { q: "dentist near me", pos: 2, ch: "+5", vol: "Local" },
  { q: "teeth whitening cost", pos: 1, ch: "+3", vol: "High" },
  { q: "root canal treatment price", pos: 4, ch: "+8", vol: "High" },
  { q: "best dental clinic for kids", pos: 3, ch: "+2", vol: "Medium" },
  { q: "invisible braces vs metal braces", pos: 6, ch: "-1", vol: "Medium", down: true },
];

function GooglePanel() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-line sm:grid-cols-4 sm:divide-x sm:divide-line">
        <Kpi label="Organic clicks" value="4,812" delta="18%" active />
        <Kpi label="Keywords in top 3" value="126" delta="22" />
        <Kpi label="Maps calls" value="342" delta="12%" />
        <Kpi label="Indexed pages" value="98%" delta="6%" />
      </div>
      <div className="overflow-hidden rounded-xl border border-line">
        <div className="grid grid-cols-[2.2fr_0.7fr_0.7fr_0.8fr] border-b border-line bg-ink-2 px-3 py-2.5 text-[0.72rem] text-dim">
          <span>Search</span><span>Position</span><span>Change</span><span>Demand</span>
        </div>
        {keywords.map((k) => (
          <div key={k.q} className="grid grid-cols-[2.2fr_0.7fr_0.7fr_0.8fr] items-center border-b border-line px-3 py-2.5 text-[0.82rem] last:border-b-0">
            <span className="flex items-center gap-2"><Search aria-hidden="true" className="size-3.5 text-dim" />{k.q}</span>
            <span className="font-mono tabular-nums">#{k.pos}</span>
            <span><Delta v={k.ch.replace(/^[+-]/, "")} down={k.down} /></span>
            <span className="text-dim">{k.vol}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const citations = [
  { e: "chatgpt", n: "ChatGPT", prompt: "Which clinic in Austin is best for root canal treatment?", page: "/treatments/root-canal" },
  { e: "perplexity", n: "Perplexity", prompt: "How much does teeth whitening cost in Austin?", page: "/guides/teeth-whitening-cost" },
  { e: "overviews", n: "AI Overviews", prompt: "Is a root canal painful?", page: "/faq/root-canal" },
  { e: "gemini", n: "Gemini", prompt: "Dentists open on Sunday near South Congress", page: "/locations/south-congress" },
] as const;

function CitationsPanel() {
  return (
    <div className="grid gap-3">
      {citations.map((c) => (
        <div key={c.prompt} className="grid gap-2 rounded-xl border border-line p-4 sm:grid-cols-[9rem_1fr_auto] sm:items-center">
          <span className="flex items-center gap-2 text-[0.8rem] font-medium"><EngineIcon name={c.e} className="size-4" />{c.n}</span>
          <span className="text-[0.86rem]">&ldquo;{c.prompt}&rdquo;</span>
          <span className="flex items-center gap-2">
            <span className="rounded-md border border-line bg-ink-2 px-2 py-1 font-mono text-[0.68rem] text-muted">yourbrand.in{c.page}</span>
            <span className="rounded-md bg-emerald-100 px-2 py-1 text-[0.68rem] font-medium text-emerald-800">Cited</span>
          </span>
        </div>
      ))}
    </div>
  );
}

const gaps = [
  { topic: "Dental implant cost and EMI options", type: "Guide", why: "Asked often in ChatGPT, no page answers it", pri: "High" },
  { topic: "Clear aligners vs braces for adults", type: "Comparison", why: "Competitors cited in AI Overviews", pri: "High" },
  { topic: "Emergency dentist open late", type: "Location page", why: "Local searches with no matching page", pri: "Medium" },
  { topic: "What to expect at a first visit", type: "FAQ", why: "Common voice search question", pri: "Medium" },
];

function ContentPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="grid grid-cols-[2fr_0.9fr_2fr_0.6fr] border-b border-line bg-ink-2 px-3 py-2.5 text-[0.72rem] text-dim">
        <span>Topic</span><span>Format</span><span>Opportunity</span><span>Priority</span>
      </div>
      {gaps.map((g) => (
        <div key={g.topic} className="grid grid-cols-[2fr_0.9fr_2fr_0.6fr] items-center gap-2 border-b border-line px-3 py-3 text-[0.82rem] last:border-b-0">
          <span className="font-medium">{g.topic}</span>
          <span className="text-muted">{g.type}</span>
          <span className="text-muted">{g.why}</span>
          <span className={cn("w-fit rounded-md px-2 py-0.5 text-[0.68rem] font-medium", g.pri === "High" ? "bg-ember/10 text-ember" : "bg-ink-3 text-muted")}>{g.pri}</span>
        </div>
      ))}
    </div>
  );
}

export function VisibilityDashboard() {
  const [tab, setTab] = useState<Tab>("ai");
  return (
    <div>
      <div role="tablist" aria-label="Dashboard views" className="grid grid-cols-2 border-y border-line sm:grid-cols-4">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            role="tab"
            id={`dash-tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls="dash-panel"
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "flex min-h-12 items-center justify-center gap-2 border-line text-[0.88rem] transition-colors",
              i > 0 && "sm:border-l",
              i % 2 === 1 && "border-l sm:border-l",
              i > 1 && "border-t sm:border-t-0",
              tab === t.key ? "bg-ink font-medium text-paper" : "bg-ink-2/60 text-muted hover:text-paper",
            )}
          >
            <t.icon aria-hidden="true" className={cn("size-4", tab === t.key ? "text-ember" : "")} />
            {t.label}
          </button>
        ))}
      </div>
      <div className="relative px-3 pt-8 sm:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-t-2xl border border-b-0 border-line bg-ink shadow-[0_30px_80px_-30px_rgba(21,94,239,.35)]">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 text-[0.78rem]">
            <span className="flex min-w-0 items-center gap-2 text-muted">
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-ember text-[0.65rem] font-semibold text-ember-ink">Z</span>
              <span className="truncate">Example clinic <span className="text-dim">/</span> {tabs.find((t) => t.key === tab)!.label}</span>
            </span>
            <span className="shrink-0 rounded-md border border-dashed border-line-2 px-2 py-0.5 font-mono text-[0.62rem] text-dim">Illustrative example data</span>
          </div>
          <div id="dash-panel" role="tabpanel" aria-labelledby={`dash-tab-${tab}`} key={tab} className="blur-swap p-4 sm:p-6">
            {tab === "ai" && <AiPanel />}
            {tab === "google" && <GooglePanel />}
            {tab === "citations" && <CitationsPanel />}
            {tab === "content" && <ContentPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}

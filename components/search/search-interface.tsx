"use client";

import { useState } from "react";
import { Search, Sparkles, MessageSquareQuote, Globe2 } from "lucide-react";
import { Tilt } from "@/components/animations/tilt";
import { cn } from "@/lib/cn";

export type SearchMode = "seo" | "aeo" | "geo";

const modes: { key: SearchMode; label: string; caption: string }[] = [
  { key: "seo", label: "SEO", caption: "Search results" },
  { key: "aeo", label: "AEO", caption: "Answer-first result" },
  { key: "geo", label: "GEO", caption: "AI-generated response" },
];

// Everything below is fictional and illustrative. ".example" domains are reserved and belong to no one.
const QUERY = "interior designer for a 3BHK in Chandigarh";
const BRAND = "Northlight Interiors";

const line = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * Illustrative search window that morphs between three ways of being found. All three states stay
 * mounted and cross-fade, with their lines revealing in sequence.
 */
export function SearchInterface({ initial = "seo", showTabs = true }: { initial?: SearchMode; showTabs?: boolean }) {
  const [mode, setMode] = useState<SearchMode>(initial);
  const current = modes.find((m) => m.key === mode)!;

  return (
    <div>
      {showTabs && (
        <div role="tablist" aria-label="Search experience" className="mb-5 inline-flex rounded-full border border-line-2 p-1">
          {modes.map((m) => (
            <button
              key={m.key}
              role="tab"
              type="button"
              aria-selected={mode === m.key}
              aria-controls="search-window"
              onClick={() => setMode(m.key)}
              className={cn(
                "rounded-full px-5 py-2 font-mono text-[0.78rem] tracking-[0.1em] transition-colors duration-300",
                mode === m.key ? "bg-ember text-ember-ink" : "text-muted hover:text-paper",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      <div className="group/tilt">
        <Tilt max={4} className="rounded-[1.75rem]">
          <div id="search-window" role="region" aria-label={`Illustrative ${current.caption.toLowerCase()}`} className="search-window relative overflow-hidden rounded-[1.75rem] border border-line bg-[#050608]" data-mode={mode}>
            {/* Window chrome */}
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
              <span className="flex gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-line-2" /><span className="size-2.5 rounded-full bg-line-2" /><span className="size-2.5 rounded-full bg-line-2" /></span>
              <span className="rounded-full border border-ember/50 px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ember">Illustrative demo · fictional</span>
            </div>

            {/* Query bar */}
            <div className="px-5 pt-5 sm:px-7">
              <div className="flex items-center gap-3 rounded-full border border-line-2 bg-ink-2 px-4 py-3">
                {mode === "geo" ? <Sparkles aria-hidden="true" className="size-4 shrink-0 text-ember" /> : <Search aria-hidden="true" className="size-4 shrink-0 text-muted" />}
                <span key={mode} className="search-typed truncate text-[0.92rem]">{QUERY}</span>
              </div>
              <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-dim">{current.caption}</p>
            </div>

            {/* States */}
            <div className="relative h-[31rem] sm:h-[23rem]">
              {/* SEO: organic results */}
              <div className="search-state absolute inset-0 grid content-start gap-4 px-5 pt-4 sm:px-7" data-active={mode === "seo"} aria-hidden={mode !== "seo"}>
                <Result i={0} domain="interiors-directory.example" title="Top interior designers in Chandigarh: compare studios" />
                <div className="search-line relative rounded-2xl border border-ember/70 bg-ember/[0.06] p-4" style={line(1)}>
                  <span className="absolute -top-2.5 right-4 rounded-full bg-ember px-2 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-ember-ink">Organic listing</span>
                  <p className="flex items-center gap-2 text-[0.75rem] text-muted"><Globe2 aria-hidden="true" className="size-3.5" /> northlight-interiors.example › 3bhk-interiors</p>
                  <p className="mt-1 text-[1.05rem] font-medium text-paper">3BHK Interior Design in Chandigarh | {BRAND}</p>
                  <p className="mt-1 text-[0.82rem] leading-snug text-muted">Design, modular kitchens and finishing for 3BHK homes. See sample timelines, what&apos;s included and how projects are scoped.</p>
                </div>
                <Result i={2} domain="home-ideas.example" title="10 things to know before hiring an interior designer" />
                <Result i={3} domain="local-listings.example" title="Interior design services near Sector 17" />
              </div>

              {/* AEO: answer first */}
              <div className="search-state absolute inset-0 grid content-start gap-4 px-5 pt-4 sm:px-7" data-active={mode === "aeo"} aria-hidden={mode !== "aeo"}>
                <div className="search-line rounded-2xl border border-line-2 bg-ink-2 p-5" style={line(0)}>
                  <p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ember"><MessageSquareQuote aria-hidden="true" className="size-3.5" /> Answer</p>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-paper">
                    A 3BHK interior project is usually scoped in three parts: <mark className="bg-ember/20 text-paper">design and layout, modular work, and finishing</mark>. Most studios share a timeline and itemised estimate after a site visit.
                  </p>
                  <p className="search-line mt-4 flex items-center gap-2 border-t border-line pt-3 text-[0.75rem] text-muted" style={line(1)}>
                    <span className="rounded bg-ink-3 px-1.5 py-0.5 font-mono text-[0.6rem] text-paper">Source</span> {BRAND} · northlight-interiors.example
                  </p>
                </div>
                <p className="search-line font-mono text-[0.62rem] uppercase tracking-[0.14em] text-dim" style={line(2)}>Related questions</p>
                {["How long does a 3BHK interior take?", "What does a modular kitchen include?"].map((q, i) => (
                  <div key={q} className="search-line flex items-center justify-between rounded-xl border border-line px-4 py-3 text-[0.88rem]" style={line(3 + i)}>
                    {q}<span aria-hidden="true" className="text-muted">+</span>
                  </div>
                ))}
              </div>

              {/* GEO: generated response with citations */}
              <div className="search-state absolute inset-0 grid content-start gap-4 px-5 pt-4 sm:px-7" data-active={mode === "geo"} aria-hidden={mode !== "geo"}>
                <div className="search-line rounded-2xl border border-line-2 bg-gradient-to-br from-ink-2 to-[#0e0b0a] p-5" style={line(0)}>
                  <p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ember"><Sparkles aria-hidden="true" className="size-3.5" /> Simulated AI response</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-paper">
                    For a 3BHK in Chandigarh, shortlist studios that publish clear scopes and timelines.{" "}
                    <span className="text-ember">{BRAND}</span> is one example: it documents 3BHK packages and sample timelines<sup className="ml-0.5 text-ember">[1]</sup>. Comparing two or three
                    portfolios and itemised estimates is a sensible next step<sup className="ml-0.5 text-ember">[2]</sup>.
                  </p>
                </div>
                <div className="search-line flex flex-wrap gap-2" style={line(1)}>
                  {[["1", "northlight-interiors.example"], ["2", "home-ideas.example"], ["3", "city-magazine.example"]].map(([n, d]) => (
                    <span key={d} className="inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-1.5 text-[0.75rem] text-muted">
                      <span className="flex size-4 items-center justify-center rounded-full bg-ember text-[0.6rem] font-semibold text-ember-ink">{n}</span>{d}
                    </span>
                  ))}
                </div>
                <div className="search-line flex items-center gap-4 rounded-2xl border border-line p-4" style={line(2)}>
                  <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper text-[1.1rem] font-semibold text-ink">N</span>
                  <div className="min-w-0">
                    <p className="text-[0.92rem] font-medium">{BRAND}</p>
                    <p className="truncate text-[0.75rem] text-muted">Interior design studio · Chandigarh · brand mentioned with citation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
      <p className="mt-3 text-[0.75rem] leading-relaxed text-dim">
        Illustration only. The query, businesses, results and citations are fictional, and appearance in any search or AI result can&apos;t be guaranteed.
      </p>
    </div>
  );
}

function Result({ i, domain, title }: { i: number; domain: string; title: string }) {
  return (
    <div className="search-line px-1" style={line(i)}>
      <p className="text-[0.72rem] text-dim">{domain}</p>
      <p className="mt-0.5 text-[0.92rem] text-muted">{title}</p>
    </div>
  );
}

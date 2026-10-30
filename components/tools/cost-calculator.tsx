"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Download, RotateCcw, CalendarDays } from "lucide-react";
import {
  bookingOptions, contentOptions, designLevels, ecommerceOptions, features, industries, pageCounts, timelines, websiteTypes,
} from "@/data/pricing";
import { estimateToMarkdown, estimateWebsite, formatInr, formatRange, formatWeeks, type EstimateInput } from "@/lib/website-estimate";
import { ToolLeadForm } from "./tool-lead-form";
import { track } from "@/lib/analytics";
import { consultationHref, site } from "@/lib/site";
import { useTween } from "@/hooks/use-tween";
import { cn } from "@/lib/cn";

type Choice = { id: string; label: string; hint?: string };
type Step = { key: keyof EstimateInput; title: string; multi?: boolean; options: Choice[] };

const steps: Step[] = [
  { key: "industry", title: "What does your business do?", options: industries },
  { key: "type", title: "What kind of website do you need?", options: websiteTypes },
  { key: "pages", title: "Roughly how many pages?", options: pageCounts },
  { key: "features", title: "Which features do you need?", multi: true, options: features },
  { key: "booking", title: "Do customers need to book?", options: bookingOptions },
  { key: "ecommerce", title: "Will you sell online?", options: ecommerceOptions },
  { key: "design", title: "How distinctive should the design be?", options: designLevels },
  { key: "content", title: "What about content?", options: contentOptions },
  { key: "timeline", title: "How soon do you need it?", options: timelines },
];

const initial: EstimateInput = {
  industry: "", type: "", pages: "1-5", features: [], booking: "none", ecommerce: "none", design: "custom", content: "ready", timeline: "standard",
};

export function CostCalculator() {
  const [input, setInput] = useState<EstimateInput>(initial);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const s = steps[step]!;
  const ready = !!input.industry && !!input.type;
  const estimate = useMemo(() => estimateWebsite({ ...input, industry: input.industry || "other", type: input.type || "business" }), [input]);
  const lo = useTween(estimate.budget[0], 450);
  const hi = useTween(estimate.budget[1], 450);

  useEffect(() => track("Tool Opened", { tool: "website-cost-calculator" }), []);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [step, done]);

  const value = input[s.key];
  const isSelected = (id: string) => (Array.isArray(value) ? value.includes(id) : value === id);
  const choose = (id: string) => {
    setInput((prev) => {
      if (s.multi) {
        const list = prev[s.key] as string[];
        return { ...prev, [s.key]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id] };
      }
      const next = { ...prev, [s.key]: id };
      if (s.key === "type" && id === "ecommerce" && prev.ecommerce === "none") next.ecommerce = "small";
      return next;
    });
  };
  const canNext = s.multi || !!value;

  const finish = () => {
    setDone(true);
    track("Tool Completed", { tool: "website-cost-calculator", type: input.type, budget_band: band(estimate.budget[1]) });
  };

  const download = () => {
    const md = estimateToMarkdown(input, estimate, `${site.url}/tools/website-cost-calculator`);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "zenyro-website-brief.md";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  if (done) {
    const label = (list: Choice[], id: string) => list.find((o) => o.id === id)?.label ?? id;
    const summary = {
      industry: label(industries, input.industry),
      budget: formatRange(estimate.budget),
      timeline: formatWeeks(estimate.weeks),
      services: ["Website Development", ...input.features.map((f) => label(features, f))],
      websiteType: label(websiteTypes, input.type),
      pages: label(pageCounts, input.pages),
      booking: label(bookingOptions, input.booking),
      ecommerce: label(ecommerceOptions, input.ecommerce),
      design: label(designLevels, input.design),
      content: label(contentOptions, input.content),
      timelinePreference: label(timelines, input.timeline),
    };
    const maxWeeks = estimate.phases.reduce((t, p) => t + p.weeks[1], 0);
    const starts = estimate.phases.map((_, i) => estimate.phases.slice(0, i).reduce((t, p) => t + p.weeks[1], 0));
    return (
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-[1.75rem] border border-line bg-ink-2 p-7 sm:p-10">
            <h2 ref={heading} tabIndex={-1} className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted outline-none">Indicative estimate</h2>
            <p className="mt-4 text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[0.95] tabular-nums tracking-[-0.05em]">
              {formatInr(estimate.budget[0])}<span className="text-muted"> – </span><br className="sm:hidden" />{formatInr(estimate.budget[1])}
            </p>
            <p className="mt-3 text-[0.9rem] text-muted">Excluding GST. An estimate based on your answers, not a quotation.</p>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              <div className="bg-ink p-5"><p className="text-[0.75rem] text-muted">Timeline</p><p className="mt-1 text-[1.6rem] font-semibold tracking-[-0.03em]">{formatWeeks(estimate.weeks)}</p></div>
              <div className="bg-ink p-5"><p className="text-[0.75rem] text-muted">Website type</p><p className="mt-1 text-[1.15rem] font-semibold leading-tight">{summary.websiteType}</p></div>
            </div>

            <h3 className="mt-10 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Delivery phases</h3>
            <ol className="mt-4 grid gap-3">
              {estimate.phases.map((p, i) => {
                const left = (starts[i]! / maxWeeks) * 100;
                const width = Math.max((p.weeks[1] / maxWeeks) * 100, 6);
                return (
                  <li key={p.name}>
                    <div className="flex items-baseline justify-between gap-3 text-[0.88rem]"><span className="font-medium">{p.name}</span><span className="font-mono text-[0.72rem] text-muted">{formatWeeks(p.weeks)}</span></div>
                    <div className="relative mt-1.5 h-2 rounded-full bg-ink-3"><span className="phase-bar absolute top-0 h-full rounded-full bg-ember" style={{ left: `${Math.min(left, 94)}%`, width: `${Math.min(width, 100 - Math.min(left, 94))}%` }} /></div>
                    <p className="mt-1 text-[0.78rem] text-dim">{p.outcome}</p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Recommended technology</h3>
                <ul className="mt-4 grid gap-3">{estimate.technology.map((t) => <li key={t.name}><p className="text-[0.92rem] font-medium">{t.name}</p><p className="text-[0.8rem] leading-snug text-muted">{t.reason}</p></li>)}</ul>
              </div>
              <div>
                <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Worth considering</h3>
                <ul className="mt-4 grid gap-2">{estimate.suggestedFeatures.map((f) => <li key={f} className="flex gap-2 text-[0.88rem]"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />{f}</li>)}</ul>
              </div>
            </div>

            <details className="mt-10 border-t border-line pt-5 text-[0.85rem]">
              <summary className="cursor-pointer font-medium">What&apos;s included in this range</summary>
              <table className="mt-4 w-full text-left">
                <caption className="sr-only">Cost by line item before design and timeline multipliers</caption>
                <tbody>{estimate.lineItems.map((l) => <tr key={l.label} className="border-t border-line"><td className="py-2 pr-3">{l.label}</td><td className="py-2 text-right font-mono text-[0.78rem] tabular-nums text-muted">{formatRange(l.cost)}</td></tr>)}</tbody>
              </table>
              <p className="mt-3 text-[0.78rem] text-dim">Line items are before design, timeline and industry multipliers.</p>
            </details>
            <div className="mt-6 border-t border-line pt-5">
              <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Assumptions</h3>
              <ul className="mt-3 grid gap-1.5 text-[0.8rem] leading-relaxed text-muted">{estimate.assumptions.map((a) => <li key={a}>· {a}</li>)}</ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <button type="button" onClick={download} className="inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 text-[0.88rem] font-medium text-ink hover:bg-white"><Download aria-hidden="true" className="size-4" /> Download project brief</button>
              <a href={consultationHref} onClick={() => track("Consultation Booking Opened", { tool: "website-cost-calculator" })} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[0.88rem]"><CalendarDays aria-hidden="true" className="size-4" /> Book consultation</a>
              <button type="button" onClick={() => { setDone(false); setStep(0); }} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[0.88rem]"><RotateCcw aria-hidden="true" className="size-4" /> Edit answers</button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ToolLeadForm tool="website-cost-calculator" summary={summary} title="Get a fixed-price proposal." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">Step {step + 1} of {steps.length}</p>
            <div className="flex gap-1" aria-hidden="true">{steps.map((_, i) => <span key={i} className={cn("h-1 w-5 rounded-full transition-colors duration-500 sm:w-7", i <= step ? "bg-ember" : "bg-line-2")} />)}</div>
          </div>
          <h2 ref={heading} tabIndex={-1} className="mt-6 text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-tight tracking-[-0.035em] outline-none">{s.title}</h2>
          {s.multi && <p className="mt-2 text-[0.88rem] text-muted">Choose any that apply, or none.</p>}

          <div key={s.key} role={s.multi ? "group" : "radiogroup"} aria-label={s.title} className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {s.options.map((o, i) => {
              const on = isSelected(o.id);
              return (
                <button
                  key={o.id}
                  type="button"
                  role={s.multi ? "checkbox" : "radio"}
                  aria-checked={on}
                  onClick={() => choose(o.id)}
                  className={cn("tool-option group flex items-start gap-3 rounded-2xl border p-4 text-left transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5", on ? "border-ember bg-ember/[0.08]" : "border-line-2 hover:border-muted")}
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center border transition-colors", s.multi ? "rounded-md" : "rounded-full", on ? "border-ember bg-ember text-ember-ink" : "border-line-2")}>
                    {on && <Check aria-hidden="true" className="size-3.5" />}
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-medium">{o.label}</span>
                    {o.hint && <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">{o.hint}</span>}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-between gap-3">
            <button type="button" onClick={() => setStep((v) => Math.max(v - 1, 0))} disabled={step === 0} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[0.88rem] disabled:opacity-30">
              <ArrowLeft aria-hidden="true" className="size-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button type="button" onClick={() => setStep((v) => v + 1)} disabled={!canNext} className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-6 text-[0.88rem] font-medium text-ember-ink transition-colors hover:bg-ember-2 disabled:opacity-40">
                Next <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            ) : (
              <button type="button" onClick={finish} disabled={!ready} className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-6 text-[0.88rem] font-medium text-ember-ink transition-colors hover:bg-ember-2 disabled:opacity-40">
                See my estimate <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <aside className="lg:col-span-4" aria-label="Live estimate">
        <div className="rounded-[1.75rem] border border-line bg-[#050608] p-6 lg:sticky lg:top-28">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Live estimate</p>
          {ready ? (
            <>
              <p className="mt-3 text-[1.9rem] font-semibold leading-tight tabular-nums tracking-[-0.04em]" aria-live="polite">{formatInr(Math.round(lo / 1000) * 1000)}<span className="text-muted"> – </span>{formatInr(Math.round(hi / 1000) * 1000)}</p>
              <p className="mt-1 text-[0.85rem] text-muted">{formatWeeks(estimate.weeks)}</p>
            </>
          ) : (
            <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">Choose your industry and website type to see a live range.</p>
          )}
          <ol className="mt-6 grid gap-1.5 border-t border-line pt-5">
            {steps.map((st, i) => {
              const v = input[st.key];
              const text = Array.isArray(v) ? (v.length ? `${v.length} selected` : "None") : st.options.find((o) => o.id === v)?.label;
              return (
                <li key={st.key}>
                  <button type="button" onClick={() => setStep(i)} className={cn("flex w-full justify-between gap-3 rounded-lg px-2 py-1.5 text-left text-[0.8rem] transition-colors hover:bg-ink-3", i === step && "bg-ink-3")}>
                    <span className="text-muted">{st.title.replace(/\?$/, "")}</span>
                    <span className="shrink-0 text-right text-paper">{text || "—"}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </aside>
    </div>
  );
}

function band(max: number) {
  if (max <= 100000) return "under-1L";
  if (max <= 300000) return "1L-3L";
  if (max <= 700000) return "3L-7L";
  return "7L+";
}

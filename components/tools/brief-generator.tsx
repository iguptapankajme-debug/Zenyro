"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Download, Loader2, RotateCcw, Sparkles } from "lucide-react";
import {
  briefBudgets, briefDesigns, briefFeatures, briefIndustries, briefObjectives, briefReach, briefTimelines, briefToMarkdown, type Brief,
} from "@/lib/brief";
import { ToolLeadForm } from "./tool-lead-form";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Opts = readonly (readonly [string, string])[];
type Answers = {
  businessName: string; industry: string; description: string; audience: string; reach: string;
  objectives: string[]; features: string[]; budget: string; design: string; timeline: string;
};
const empty: Answers = { businessName: "", industry: "", description: "", audience: "", reach: "", objectives: [], features: [], budget: "", design: "", timeline: "" };

const steps = [
  { title: "Tell us about the business", valid: (a: Answers) => !!a.industry && a.description.trim().length >= 10 },
  { title: "Who are your customers?", valid: (a: Answers) => a.audience.trim().length >= 5 && !!a.reach },
  { title: "What should the website achieve?", valid: (a: Answers) => a.objectives.length > 0 },
  { title: "Which features do you need?", valid: () => true },
  { title: "What's your budget?", valid: (a: Answers) => !!a.budget },
  { title: "How should it feel?", valid: (a: Answers) => !!a.design },
  { title: "When do you need it?", valid: (a: Answers) => !!a.timeline },
];

function Tiles({ options, value, onChange, multi, label }: { options: Opts; value: string | string[]; onChange: (v: string) => void; multi?: boolean; label: string }) {
  return (
    <div role={multi ? "group" : "radiogroup"} aria-label={label} className="grid gap-2 sm:grid-cols-2">
      {options.map(([id, text]) => {
        const on = Array.isArray(value) ? value.includes(id) : value === id;
        return (
          <button key={id} type="button" role={multi ? "checkbox" : "radio"} aria-checked={on} onClick={() => onChange(id)}
            className={cn("flex items-center gap-3 rounded-2xl border p-4 text-left text-[0.95rem] transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5", on ? "border-ember bg-ember/[0.08]" : "border-line-2 hover:border-muted")}>
            <span className={cn("flex size-5 shrink-0 items-center justify-center border", multi ? "rounded-md" : "rounded-full", on ? "border-ember bg-ember text-ember-ink" : "border-line-2")}>
              {on && <Check aria-hidden="true" className="size-3.5" />}
            </span>
            {text}
          </button>
        );
      })}
    </div>
  );
}

const field = "w-full rounded-xl border border-line-2 bg-ink px-4 py-3 text-[1rem] placeholder:text-dim focus:border-ember focus:outline-none";

export function BriefGenerator() {
  const [a, setA] = useState<Answers>(empty);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ brief: Brief; source: "ai" | "template" } | null>(null);
  const [copied, setCopied] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const s = steps[step]!;

  useEffect(() => track("Tool Opened", { tool: "website-brief-generator" }), []);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [step, result]);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((p) => ({ ...p, [k]: v }));
  const toggle = (k: "objectives" | "features", id: string) => setA((p) => ({ ...p, [k]: p[k].includes(id) ? p[k].filter((x) => x !== id) : [...p[k], id] }));

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/brief", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(a) });
      const data = (await res.json().catch(() => ({}))) as { brief?: Brief; source?: "ai" | "template"; error?: string };
      if (!res.ok || !data.brief) setError(data.error ?? "We couldn't generate the brief. Please try again.");
      else {
        setResult({ brief: data.brief, source: data.source ?? "template" });
        track("Tool Completed", { tool: "website-brief-generator", source: data.source ?? "template", complexity: data.brief.complexity.level });
      }
    } catch {
      setError("We couldn't reach the brief generator. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const markdown = result ? briefToMarkdown(result.brief) : "";
  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const el = document.createElement("a");
    el.href = URL.createObjectURL(blob);
    el.download = "website-brief.md";
    el.click();
    setTimeout(() => URL.revokeObjectURL(el.href), 1000);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(markdown); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  };

  if (result) {
    const b = result.brief;
    const lbl = (list: Opts, id: string) => list.find(([k]) => k === id)?.[1] ?? id;
    return (
      <div className="grid gap-6 lg:grid-cols-12">
        <article className="min-w-0 rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-10 lg:col-span-8" aria-labelledby="brief-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              {result.source === "ai" ? <><Sparkles aria-hidden="true" className="size-3 text-ember" /> AI-assisted draft</> : "Template-based draft"}
            </span>
            <span className="rounded-full bg-ember/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ember">Complexity: {b.complexity.level}</span>
          </div>
          <h2 id="brief-title" ref={heading} tabIndex={-1} className="mt-6 text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-tight tracking-[-0.035em] outline-none">{b.title}</h2>
          <p className="mt-4 leading-relaxed text-muted">{b.summary}</p>

          <BriefSection title="Audience"><p>{b.audience}</p></BriefSection>
          <BriefSection title="Goals"><ul className="flex flex-wrap gap-2">{b.goals.map((g) => <li key={g} className="rounded-full border border-line-2 px-3 py-1 text-[0.85rem]">{g}</li>)}</ul></BriefSection>
          <BriefSection title="Recommended pages">
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {b.pages.map((p, i) => <li key={p.name} className="bg-ink p-4"><p className="font-medium"><span className="mr-2 font-mono text-[0.7rem] text-ember">{String(i + 1).padStart(2, "0")}</span>{p.name}</p><p className="mt-1 text-[0.82rem] leading-snug text-muted">{p.purpose}</p></li>)}
            </ol>
          </BriefSection>
          <BriefSection title="Feature specifications">
            <dl className="grid gap-3">{b.features.map((f) => <div key={f.name} className="border-b border-line pb-3"><dt className="font-medium">{f.name}</dt><dd className="mt-0.5 text-[0.88rem] text-muted">{f.specification}</dd></div>)}</dl>
          </BriefSection>
          <BriefSection title="Technology options">
            <ul className="grid gap-3">{b.technology.map((t) => <li key={t.option}><p className="font-medium">{t.option}</p><p className="text-[0.88rem] text-muted">{t.bestFor}</p></li>)}</ul>
          </BriefSection>
          <BriefSection title="SEO considerations"><ul className="grid gap-2">{b.seo.map((x) => <li key={x} className="flex gap-2 text-[0.92rem]"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-ember" />{x}</li>)}</ul></BriefSection>
          <BriefSection title="Estimated complexity"><p><span className="font-medium">{b.complexity.level}.</span> <span className="text-muted">{b.complexity.reason}</span></p></BriefSection>
          <BriefSection title="Implementation phases">
            <ol className="grid gap-3">{b.phases.map((p, i) => <li key={p.name} className="flex gap-4"><span className="font-mono text-[0.75rem] text-ember">0{i + 1}</span><div><p className="font-medium">{p.name} <span className="font-mono text-[0.72rem] text-muted">· {p.duration}</span></p><p className="text-[0.88rem] text-muted">{p.outcome}</p></div></li>)}</ol>
          </BriefSection>
          <BriefSection title="Next steps"><ul className="grid gap-1.5">{b.nextSteps.map((x) => <li key={x} className="text-[0.92rem]">→ {x}</li>)}</ul></BriefSection>

          <p className="mt-8 text-[0.78rem] text-dim">This brief is a planning aid based on your answers. Durations are estimates, not commitments.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" onClick={download} className="inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 text-[0.88rem] font-medium text-ink hover:bg-white"><Download aria-hidden="true" className="size-4" /> Download brief</button>
            <button type="button" onClick={copy} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[0.88rem]"><Copy aria-hidden="true" className="size-4" /> {copied ? "Copied" : "Copy as text"}</button>
            <button type="button" onClick={() => { setResult(null); setStep(0); }} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[0.88rem]"><RotateCcw aria-hidden="true" className="size-4" /> Edit answers</button>
          </div>
        </article>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <ToolLeadForm
              tool="website-brief-generator"
              title="Get a personalised development proposal."
              summary={{
                industry: lbl(briefIndustries, a.industry),
                budget: lbl(briefBudgets, a.budget),
                timeline: lbl(briefTimelines, a.timeline),
                services: ["Website Development", ...a.features.map((f) => lbl(briefFeatures, f))],
                complexity: b.complexity.level,
                pages: b.pages.map((p) => p.name),
                goals: b.goals,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">Question {step + 1} of {steps.length}</p>
          <div className="flex gap-1" aria-hidden="true">{steps.map((_, i) => <span key={i} className={cn("h-1 w-6 rounded-full transition-colors duration-500", i <= step ? "bg-ember" : "bg-line-2")} />)}</div>
        </div>
        <h2 ref={heading} tabIndex={-1} className="mt-6 text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em] outline-none">{s.title}</h2>

        <div key={step} className="mt-8 grid gap-5 animate-fade">
          {step === 0 && (
            <>
              <div className="grid gap-1.5"><label htmlFor="bg-name" className="text-[0.85rem] font-medium">Business name <span className="text-dim">(optional)</span></label><input id="bg-name" maxLength={80} value={a.businessName} onChange={(e) => set("businessName", e.target.value)} className={field} /></div>
              <div className="grid gap-2"><p className="text-[0.85rem] font-medium">Industry</p><Tiles label="Industry" options={briefIndustries} value={a.industry} onChange={(v) => set("industry", v)} /></div>
              <div className="grid gap-1.5"><label htmlFor="bg-desc" className="text-[0.85rem] font-medium">What do you offer?</label><textarea id="bg-desc" rows={3} maxLength={500} value={a.description} onChange={(e) => set("description", e.target.value)} placeholder="For example: we design and build modular kitchens and full home interiors in Chandigarh." className={cn(field, "resize-y")} /></div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="grid gap-1.5"><label htmlFor="bg-aud" className="text-[0.85rem] font-medium">Describe your ideal customers</label><textarea id="bg-aud" rows={3} maxLength={300} value={a.audience} onChange={(e) => set("audience", e.target.value)} placeholder="For example: families buying their first home, with budgets of ₹8–15 lakh for interiors." className={cn(field, "resize-y")} /></div>
              <div className="grid gap-2"><p className="text-[0.85rem] font-medium">Where are they?</p><Tiles label="Customer reach" options={briefReach} value={a.reach} onChange={(v) => set("reach", v)} /></div>
            </>
          )}
          {step === 2 && <Tiles multi label="Objectives" options={briefObjectives} value={a.objectives} onChange={(v) => toggle("objectives", v)} />}
          {step === 3 && <><p className="-mt-4 text-[0.88rem] text-muted">Choose any that apply.</p><Tiles multi label="Features" options={briefFeatures} value={a.features} onChange={(v) => toggle("features", v)} /></>}
          {step === 4 && <Tiles label="Budget" options={briefBudgets} value={a.budget} onChange={(v) => set("budget", v)} />}
          {step === 5 && <Tiles label="Design direction" options={briefDesigns} value={a.design} onChange={(v) => set("design", v)} />}
          {step === 6 && <Tiles label="Timeline" options={briefTimelines} value={a.timeline} onChange={(v) => set("timeline", v)} />}
        </div>

        {error && <p role="alert" className="mt-6 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-[0.9rem] text-red-200">{error}</p>}

        <div className="mt-10 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setStep((v) => Math.max(v - 1, 0))} disabled={step === 0 || loading} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[0.88rem] disabled:opacity-30"><ArrowLeft aria-hidden="true" className="size-4" /> Back</button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={() => setStep((v) => v + 1)} disabled={!s.valid(a)} className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-6 text-[0.88rem] font-medium text-ember-ink hover:bg-ember-2 disabled:opacity-40">Next <ArrowRight aria-hidden="true" className="size-4" /></button>
          ) : (
            <button type="button" onClick={generate} disabled={!s.valid(a) || loading} className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-6 text-[0.88rem] font-medium text-ember-ink hover:bg-ember-2 disabled:opacity-40">
              {loading ? <><Loader2 aria-hidden="true" className="size-4 animate-spin" /> Writing your brief…</> : <>Generate brief <Sparkles aria-hidden="true" className="size-4" /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function BriefSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-line pt-6">
      <h3 className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{title}</h3>
      {children}
    </section>
  );
}

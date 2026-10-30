"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Info, Loader2, Search, XCircle } from "lucide-react";
import type { AuditReport, CheckStatus } from "@/lib/seo-audit/analyze";
import { ToolLeadForm } from "./tool-lead-form";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const stages = ["Validating the address", "Fetching the page safely", "Reading robots.txt and sitemap", "Analysing tags and structure", "Checking performance data"];

const statusMeta: Record<CheckStatus, { label: string; icon: typeof CheckCircle2; cls: string }> = {
  pass: { label: "Pass", icon: CheckCircle2, cls: "text-emerald-400" },
  warn: { label: "Improve", icon: AlertTriangle, cls: "text-amber-300" },
  fail: { label: "Fix", icon: XCircle, cls: "text-red-400" },
  info: { label: "Note", icon: Info, cls: "text-muted" },
};

export function SeoAuditTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AuditReport | null>(null);
  const [filter, setFilter] = useState<"all" | "issues">("issues");
  const resultsRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => track("Tool Opened", { tool: "seo-audit" }), []);
  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setStage((s) => Math.min(s + 1, stages.length - 1)), 1600);
    return () => clearInterval(t);
  }, [loading]);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setReport(null);
    if (!url.trim()) { setError("Enter a website address, for example yourbusiness.com."); return; }
    setLoading(true);
    setStage(0);
    try {
      const res = await fetch("/api/seo-audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
      const data = (await res.json().catch(() => ({}))) as AuditReport & { error?: string };
      if (!res.ok || data.error) {
        setError(data.error ?? "The audit could not be completed. Please try again.");
      } else {
        setReport(data);
        track("Tool Completed", { tool: "seo-audit", issues: data.checks.filter((c) => c.status === "fail" || c.status === "warn").length });
        setTimeout(() => resultsRef.current?.focus(), 50);
      }
    } catch {
      setError("We couldn't reach the audit service. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const counts = useMemo(() => {
    const c = { pass: 0, warn: 0, fail: 0, info: 0 };
    report?.checks.forEach((x) => c[x.status]++);
    return c;
  }, [report]);

  const visible = report?.checks.filter((c) => filter === "all" || c.status === "fail" || c.status === "warn") ?? [];
  const grouped = visible.reduce<Record<string, typeof visible>>((acc, c) => ((acc[c.category] ??= []).push(c), acc), {});

  return (
    <div>
      <form onSubmit={run} className="rounded-[1.75rem] border border-line bg-ink-2 p-3 sm:p-4" aria-label="Run an SEO audit">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="audit-url" className="sr-only">Website address</label>
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-line-2 bg-ink px-4 focus-within:border-ember">
            <Search aria-hidden="true" className="size-5 shrink-0 text-muted" />
            <input
              id="audit-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              placeholder="yourbusiness.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-invalid={!!error || undefined}
              aria-describedby={error ? "audit-error" : "audit-help"}
              className="h-14 w-full bg-transparent text-[1.1rem] outline-none placeholder:text-dim"
            />
          </div>
          <button type="submit" disabled={loading} className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-ember px-7 font-medium text-ember-ink transition-colors hover:bg-ember-2 disabled:opacity-70">
            {loading ? <Loader2 aria-hidden="true" className="size-5 animate-spin" /> : null}
            {loading ? "Auditing…" : "Run free audit"}
            {!loading && <ArrowRight aria-hidden="true" className="size-4" />}
          </button>
        </div>
        <p id="audit-help" className="mt-3 px-2 text-[0.78rem] text-dim">Analyses one public page. No sign-up needed. Results aren&apos;t stored or published.</p>
        {error && <p id="audit-error" role="alert" className="mx-2 mt-3 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-[0.9rem] text-red-200">{error}</p>}
      </form>

      {loading && (
        <ol className="mt-8 grid gap-2" aria-live="polite">
          {stages.map((s, i) => (
            <li key={s} className={cn("flex items-center gap-3 text-[0.92rem] transition-colors", i < stage ? "text-muted" : i === stage ? "text-paper" : "text-dim")}>
              <span className={cn("flex size-5 items-center justify-center rounded-full border", i < stage ? "border-ember bg-ember text-ember-ink" : i === stage ? "border-ember" : "border-line-2")}>
                {i < stage ? <CheckCircle2 aria-hidden="true" className="size-3.5" /> : i === stage ? <span className="size-1.5 animate-pulse rounded-full bg-ember" /> : null}
              </span>
              {s}
            </li>
          ))}
        </ol>
      )}

      {report && (
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <div className="rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-8">
              <h2 ref={resultsRef} tabIndex={-1} className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted outline-none">Audit results</h2>
              <p className="mt-3 break-all text-[1.3rem] font-semibold tracking-[-0.02em]">{report.finalUrl}</p>
              <p className="mt-1 text-[0.8rem] text-dim">Checked {new Date(report.fetchedAt).toLocaleString("en-IN")}</p>

              <div className="mt-6 grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {(["fail", "warn", "pass", "info"] as const).map((k) => {
                  const M = statusMeta[k];
                  return (
                    <div key={k} className="bg-ink p-4">
                      <p className={cn("flex items-center gap-1.5 text-[0.75rem]", M.cls)}><M.icon aria-hidden="true" className="size-3.5" /> {M.label}</p>
                      <p className="mt-1 text-[1.9rem] font-semibold tabular-nums tracking-[-0.03em]">{counts[k]}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <div role="radiogroup" aria-label="Show" className="inline-flex rounded-full border border-line-2 p-1">
                  {(["issues", "all"] as const).map((f) => (
                    <button key={f} type="button" role="radio" aria-checked={filter === f} onClick={() => setFilter(f)} className={cn("rounded-full px-4 py-1.5 text-[0.8rem] transition-colors", filter === f ? "bg-paper text-ink" : "text-muted hover:text-paper")}>
                      {f === "issues" ? `Issues (${counts.fail + counts.warn})` : `All checks (${report.checks.length})`}
                    </button>
                  ))}
                </div>
              </div>

              {visible.length === 0 && <p className="mt-6 text-muted">No issues found in the checks we ran. Switch to “All checks” to see the evidence.</p>}
              {Object.entries(grouped).map(([cat, list]) => (
                <section key={cat} className="mt-8" aria-label={cat}>
                  <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{cat}</h3>
                  <ul className="mt-3 grid gap-2">
                    {list.map((c) => {
                      const M = statusMeta[c.status];
                      return (
                        <li key={c.id} className="audit-row rounded-2xl border border-line bg-ink p-4">
                          <div className="flex items-start gap-3">
                            <M.icon aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", M.cls)} />
                            <div className="min-w-0 flex-1">
                              <p className="flex flex-wrap items-baseline gap-x-3 font-medium">
                                {c.title}
                                <span className={cn("font-mono text-[0.62rem] uppercase tracking-[0.12em]", M.cls)}>{M.label}</span>
                              </p>
                              <p className="mt-1 break-words text-[0.85rem] text-muted"><span className="text-dim">Evidence:</span> {c.evidence}</p>
                              {c.recommendation && <p className="mt-1.5 text-[0.85rem]"><span className="text-ember">Recommendation:</span> {c.recommendation}</p>}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}

              <section className="mt-8" aria-label="Performance">
                <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Core Web Vitals &amp; performance</h3>
                {report.performance.available ? (
                  <div className="mt-3 rounded-2xl border border-line bg-ink p-5">
                    <p className="text-[0.85rem] text-muted">{report.performance.source}{report.performance.score != null && <> · Lab performance score <span className="font-semibold text-paper">{report.performance.score}</span>/100</>}</p>
                    <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {Object.entries(report.performance.lab).map(([k, v]) => <div key={k}><dt className="text-[0.72rem] text-dim">{k} (lab)</dt><dd className="font-medium">{v}</dd></div>)}
                      {report.performance.field && Object.entries(report.performance.field).map(([k, v]) => <div key={k}><dt className="text-[0.72rem] text-dim">{k} (real users)</dt><dd className="font-medium">{v}</dd></div>)}
                    </dl>
                    {!report.performance.field && <p className="mt-3 text-[0.78rem] text-dim">No real-user (field) data is available for this page.</p>}
                  </div>
                ) : (
                  <p className="mt-3 rounded-2xl border border-line bg-ink p-5 text-[0.88rem] text-muted">{report.performance.reason}</p>
                )}
              </section>

              <p className="mt-8 border-t border-line pt-5 text-[0.8rem] leading-relaxed text-dim">{report.scope}</p>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ToolLeadForm
                tool="seo-audit"
                defaultIntent="consultation"
                title="Request a Zenyro SEO consultation."
                summary={{
                  website: report.finalUrl,
                  services: ["SEO"],
                  checkedAt: report.fetchedAt,
                  counts,
                  issues: report.checks.filter((c) => c.status === "fail" || c.status === "warn").map((c) => `${c.title}: ${c.evidence}`).slice(0, 15),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

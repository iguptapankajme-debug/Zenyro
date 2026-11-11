"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, Globe, Loader2, X } from "lucide-react";
import type { AiCheckResult, CheckGroup } from "@/lib/ai-check";
import { Icon3D, type Icon3DName } from "@/components/home/primitives";
import { cn } from "@/lib/cn";

const groups: { key: CheckGroup; title: string; blurb: string }[] = [
  { key: "access", title: "Can engines reach you?", blurb: "Crawling, indexing and AI crawler access" },
  { key: "answers", title: "Can AI understand and quote you?", blurb: "Structured data, entity facts and answerable content" },
  { key: "basics", title: "Search fundamentals", blurb: "The on-page signals every engine reads" },
];
const botIcon: Record<string, Icon3DName | undefined> = { GPTBot: "chatgpt", "OAI-SearchBot": "chatgpt", "ChatGPT-User": "chatgpt", ClaudeBot: "claude", PerplexityBot: "perplexity", "Google-Extended": "gemini", Googlebot: "globe" };
const grade = (s: number) => (s >= 85 ? ["Strong", "text-emerald-700", "#047857"] : s >= 65 ? ["Good, with gaps", "text-amber-700", "#b45309"] : ["Needs work", "text-red-700", "#b91c1c"]) as [string, string, string];
const stages = ["Fetching your homepage", "Reading robots.txt", "Checking AI crawler access", "Parsing structured data", "Scoring"];

export function AiReadinessChecker({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AiCheckResult | null>(null);
  const out = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const run = async (target: string) => {
    if (!target.trim() || busy) return;
    setBusy(true); setError(""); setResult(null); setStage(0);
    const t = setInterval(() => setStage((n) => Math.min(n + 1, stages.length - 1)), 900);
    try {
      const res = await fetch("/api/ai-check", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url: target }) });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong. Please try again.");
      else { setResult(data); requestAnimationFrame(() => out.current?.scrollIntoView({ behavior: "smooth", block: "start" })); }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      clearInterval(t); setBusy(false);
    }
  };

  // Deep link: /tools/ai-readiness?url=example.com runs straight away.
  useEffect(() => {
    if (compact) return;
    const q = new URLSearchParams(window.location.search).get("url");
    if (!q) return;
    const t = setTimeout(() => { setUrl(q); void run(q); }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (compact) { router.push(`/tools/ai-readiness?url=${encodeURIComponent(url.trim())}`); return; }
    void run(url);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={cn("flex flex-col gap-2 rounded-2xl border border-line bg-ink p-2 shadow-[0_24px_60px_-36px_rgba(21,94,239,.6)] sm:flex-row", compact ? "max-w-xl" : "mx-auto max-w-2xl")}>
        <label className="flex flex-1 items-center gap-3 px-3">
          <Globe aria-hidden="true" className="size-5 shrink-0 text-dim" />
          <span className="sr-only">Your website address</span>
          <input
            type="text" inputMode="url" autoComplete="url" spellCheck={false} required
            value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="yourbusiness.com"
            className="h-12 w-full bg-transparent text-[1.05rem] outline-none placeholder:text-dim"
          />
        </label>
        <button type="submit" disabled={busy} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ember px-6 font-medium text-ember-ink transition-colors hover:bg-ember-2 disabled:opacity-70">
          {busy ? <><Loader2 aria-hidden="true" className="size-4 animate-spin" />Checking…</> : <>Check my site <ArrowRight aria-hidden="true" className="size-4" /></>}
        </button>
      </form>

      <div aria-live="polite" className={cn(compact ? "max-w-xl" : "mx-auto max-w-2xl")}>
        {busy && <p className="mt-4 flex items-center gap-2 text-[0.9rem] text-muted"><span className="size-1.5 animate-pulse rounded-full bg-ember" />{stages[stage]}…</p>}
        {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.92rem] text-red-800">{error}</p>}
      </div>

      {result && <Report r={result} refEl={out} />}
    </div>
  );
}

function Report({ r, refEl }: { r: AiCheckResult; refEl: React.RefObject<HTMLDivElement | null> }) {
  const [label, cls, color] = grade(r.score);
  const C = 2 * Math.PI * 52;
  const failed = r.checks.filter((c) => !c.pass).sort((a, b) => b.weight - a.weight);
  const host = new URL(r.url).hostname.replace(/^www\./, "");

  return (
    <div ref={refEl} className="fx-rise mt-14 scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Score */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-ink p-8 text-center lg:col-span-4">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-dim">AI readiness</p>
          <div className="relative mt-5 size-44">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-ink-3)" strokeWidth="10" />
              <circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - r.score / 100)} style={{ transition: "stroke-dashoffset 1.4s var(--ease-out-expo)" }} />
            </svg>
            <span className="absolute inset-0 grid place-items-center">
              <span><span className="block text-[3.2rem] font-semibold leading-none tracking-[-0.05em]">{r.score}</span><span className="text-[0.8rem] text-dim">out of 100</span></span>
            </span>
          </div>
          <p className={cn("mt-5 text-[1.1rem] font-semibold", cls)}>{label}</p>
          <p className="mt-1 break-all text-[0.88rem] text-muted">{host}</p>
        </div>

        {/* AI crawlers */}
        <div className="rounded-2xl border border-line bg-ink p-6 lg:col-span-8">
          <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em]">Who can read your site</h3>
          <p className="mt-1 text-[0.88rem] text-muted">From your robots.txt. A blocked assistant can&apos;t read your pages, so it can&apos;t recommend you from them.</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {r.bots.map((b) => {
              const icon = botIcon[b.bot];
              return (
                <li key={b.bot} className="flex items-center gap-3 rounded-xl border border-line bg-ink-2 px-3 py-2.5">
                  {icon ? <Icon3D name={icon} size={32} className="size-8" /> : <span className="grid size-8 place-items-center rounded-lg bg-ink-3 font-mono text-[0.7rem]">B</span>}
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[0.82rem]">{b.bot}</span>
                    <span className="block truncate text-[0.75rem] text-muted">{b.owner}</span>
                  </span>
                  <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.75rem] font-medium", b.allowed ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800")}>
                    {b.allowed ? <Check aria-hidden="true" className="size-3" /> : <X aria-hidden="true" className="size-3" />}{b.allowed ? "Allowed" : "Blocked"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Checks */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {groups.map((g) => {
          const list = r.checks.filter((c) => c.group === g.key);
          const passed = list.filter((c) => c.pass).length;
          return (
            <section key={g.key} className="rounded-2xl border border-line bg-ink p-6" aria-label={g.title}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em]">{g.title}</h3>
                  <p className="mt-1 text-[0.82rem] text-muted">{g.blurb}</p>
                </div>
                <span className="shrink-0 rounded-md bg-ink-3 px-2 py-0.5 font-mono text-[0.75rem]">{passed}/{list.length}</span>
              </div>
              <ul className="mt-5 grid gap-4">
                {list.map((c) => (
                  <li key={c.id} className="flex gap-3">
                    <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", c.pass ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800")}>
                      {c.pass ? <Check aria-hidden="true" className="size-3" /> : <X aria-hidden="true" className="size-3" />}
                      <span className="sr-only">{c.pass ? "Pass" : "Fail"}</span>
                    </span>
                    <span>
                      <span className="block text-[0.92rem] font-medium">{c.label}</span>
                      <span className="mt-0.5 block break-words text-[0.82rem] leading-snug text-muted">{c.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Next step */}
      <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-paper p-7 text-ink sm:p-9 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink/60">{failed.length ? `${failed.length} ${failed.length === 1 ? "thing" : "things"} to fix` : "Technically ready"}</p>
          <p className="mt-3 text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">
            {failed.length ? `Start with: ${failed[0]!.label.toLowerCase()}.` : "Your site is easy for AI to read. Now find out what AI actually says about you."}
          </p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
            This checks your homepage&apos;s technical readiness. A full audit covers what ChatGPT, Gemini and Perplexity actually say about you, your Google rankings against competitors, and a prioritised plan.
          </p>
        </div>
        <Link href="/free-audit" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-ember px-6 font-medium text-ember-ink">
          Get the full free audit <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <p className="mt-3 text-[0.78rem] text-dim">Automated check of public files (homepage, robots.txt, sitemap.xml, llms.txt). Nothing is stored.</p>
    </div>
  );
}

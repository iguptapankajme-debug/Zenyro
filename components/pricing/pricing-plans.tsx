"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { currencies, formatPrice, guessCurrency, plans, planTerms, type Currency } from "@/data/pricing";
import { cn } from "@/lib/cn";

const KEY = "zenyro-currency";

/** The two plans with a currency switcher. Starts in USD, then follows the visitor's region or saved choice. */
export function PricingPlans() {
  const [cur, setCur] = useState<Currency>("USD");

  useEffect(() => {
    const t = setTimeout(() => {
      let saved: string | null = null;
      try { saved = localStorage.getItem(KEY); } catch { /* storage unavailable */ }
      if (saved && currencies.some((c) => c.code === saved)) setCur(saved as Currency);
      else setCur(guessCurrency(Intl.DateTimeFormat().resolvedOptions().timeZone ?? ""));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const choose = (c: Currency) => {
    setCur(c);
    try { localStorage.setItem(KEY, c); } catch { /* storage unavailable */ }
  };

  return (
    <div>
      <div role="group" aria-label="Currency" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-xl border border-line bg-ink-2 p-1">
        {currencies.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => choose(c.code)}
            aria-pressed={cur === c.code}
            className={cn("rounded-lg px-3 py-1.5 font-mono text-[0.75rem] transition-colors", cur === c.code ? "bg-ink text-paper shadow-[0_1px_3px_rgba(9,9,11,.12)]" : "text-muted hover:text-paper")}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2">
        {plans.map((p) => (
          <article
            key={p.key}
            className={cn(
              "relative flex flex-col rounded-[1.5rem] border p-7 sm:p-9",
              p.featured ? "border-ember bg-ink shadow-[0_30px_80px_-40px_rgba(21,94,239,.6)]" : "border-line bg-ink-2",
            )}
          >
            {p.featured && <span className="absolute -top-3 left-8 rounded-md bg-ember px-2.5 py-0.5 font-mono text-[0.7rem] text-ember-ink">Recommended</span>}
            <h3 className="text-[1.6rem] font-semibold tracking-[-0.03em]">{p.name}</h3>
            <p className="mt-1 text-[0.95rem] text-muted">{p.tagline}</p>
            <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
              <span key={cur} className="blur-swap text-[clamp(2.4rem,6vw,3rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">{formatPrice(p.price[cur], cur)}</span>
              <span className="text-[0.95rem] text-muted">/ month</span>
            </p>
            <p className="mt-3 text-[0.85rem] text-muted">{p.for}</p>
            <ul className="mt-7 grid flex-1 gap-3 border-t border-dashed border-line-2 pt-7 text-[0.95rem]">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />{f}</li>
              ))}
            </ul>
            <Link
              href="/free-audit"
              className={cn(
                "mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 font-medium transition-colors",
                p.featured ? "bg-ember text-ember-ink hover:bg-ember-2" : "border border-line-2 bg-ink hover:border-paper",
              )}
            >
              Start with a free audit <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </article>
        ))}
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.88rem] text-muted">
        {planTerms.map((t) => <li key={t} className="flex items-center gap-2"><Check aria-hidden="true" className="size-3.5 text-ember" />{t}</li>)}
        <li>Prices exclude local taxes.</li>
      </ul>
    </div>
  );
}

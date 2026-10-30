"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { currencies, formatMoney, project, type CurrencyCode } from "@/lib/calculator";
import { cn } from "@/lib/cn";

type FieldKey = "budget" | "costPerLead" | "conversionRate" | "customerValue" | "improvement";

const fields: { key: FieldKey; label: string; hint: string; min: number; max: number; step: number; money?: boolean; suffix?: string }[] = [
  { key: "budget", label: "Monthly ad budget", hint: "Media spend only, before agency fees.", min: 10000, max: 2000000, step: 5000, money: true },
  { key: "costPerLead", label: "Cost per lead", hint: "What one enquiry costs you today.", min: 50, max: 10000, step: 50, money: true },
  { key: "conversionRate", label: "Lead-to-customer rate", hint: "Out of 100 leads, how many buy?", min: 0.5, max: 50, step: 0.5, suffix: "%" },
  { key: "customerValue", label: "Average customer value", hint: "Revenue from one new customer.", min: 1000, max: 10000000, step: 1000, money: true },
  { key: "improvement", label: "Conversion improvement", hint: "Relative lift, e.g. 8% → 10% is +25%.", min: 0, max: 100, step: 5, suffix: "%" },
];

const defaults: Record<FieldKey, number> = { budget: 100000, costPerLead: 400, conversionRate: 8, customerValue: 50000, improvement: 25 };
const num = (n: number, digits = 0) => n.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

/** Tweens a displayed number toward its target so results count rather than jump. */
function useTween(target: number, ms = 550) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  const shown = useRef(target);
  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
    from.current = shown.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = duration ? Math.min((t - start) / duration, 1) : 1;
      const eased = 1 - Math.pow(1 - k, 4);
      const v = from.current + (target - from.current) * eased;
      shown.current = v;
      setValue(v);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

export function GrowthCalculator() {
  const id = useId();
  const [values, setValues] = useState(defaults);
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const r = useMemo(() => project(values), [values]);

  const extra = useTween(r.additionalRevenue);
  const enquiries = useTween(r.enquiries);
  const customers = useTween(r.customers);
  const revenue = useTween(r.revenue);

  const set = (k: FieldKey, v: string) => {
    const n = Number(v);
    setValues((prev) => ({ ...prev, [k]: Number.isFinite(n) ? n : 0 }));
  };
  const maxRevenue = Math.max(r.improvedRevenue, 1);

  return (
    <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-12">
      <form className="rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-8 lg:col-span-5" onSubmit={(e) => e.preventDefault()} aria-label="Growth calculator inputs">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">Your numbers</p>
          <div className="flex rounded-full border border-line-2 p-1" role="radiogroup" aria-label="Currency">
            {(Object.keys(currencies) as CurrencyCode[]).map((c) => (
              <button key={c} type="button" role="radio" aria-checked={currency === c} onClick={() => setCurrency(c)}
                className={cn("rounded-full px-2.5 py-1 font-mono text-[0.68rem] transition-colors", currency === c ? "bg-paper text-ink" : "text-muted hover:text-paper")}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 grid">
          {fields.map((f) => {
            const v = values[f.key];
            const pct = Math.min(Math.max(((v - f.min) / (f.max - f.min)) * 100, 0), 100);
            return (
              <div key={f.key} className="border-t border-line py-5">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <label htmlFor={`${id}-${f.key}`} className="text-[0.92rem] font-medium">{f.label}</label>
                    <p id={`${id}-${f.key}-hint`} className="mt-0.5 text-[0.75rem] text-muted">{f.hint}</p>
                  </div>
                  <div className="flex shrink-0 items-baseline border-b border-line-2 focus-within:border-ember">
                    {f.money && <span className="font-mono text-[0.9rem] text-muted">{currencies[currency].symbol.trim()}</span>}
                    <input id={`${id}-${f.key}`} type="number" inputMode="decimal" min={0} step={f.step} value={v} aria-describedby={`${id}-${f.key}-hint`}
                      onChange={(e) => set(f.key, e.target.value)}
                      className="w-28 bg-transparent py-1 text-right text-[1.35rem] font-semibold tabular-nums tracking-[-0.02em] outline-none" />
                    {f.suffix && <span className="font-mono text-[0.9rem] text-muted">{f.suffix}</span>}
                  </div>
                </div>
                <input type="range" aria-label={`${f.label} slider`} min={f.min} max={f.max} step={f.step} value={Math.min(Math.max(v, f.min), f.max)}
                  onChange={(e) => set(f.key, e.target.value)} className="calc-range mt-4 w-full" style={{ "--p": `${pct}%` } as React.CSSProperties} />
              </div>
            );
          })}
        </div>
      </form>

      <div className="flex flex-col gap-6 lg:col-span-7" aria-live="polite">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ember p-7 text-ember-ink sm:p-10">
          <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full border border-ember-ink/15" />
          <div aria-hidden="true" className="absolute -right-4 -top-4 size-40 rounded-full border border-ember-ink/15" />
          <p className="relative font-mono text-[0.7rem] uppercase tracking-[0.14em]">Illustrative additional revenue / month</p>
          <p className="relative mt-4 break-words text-[clamp(3rem,8vw,6.6rem)] font-semibold leading-[0.9] tabular-nums tracking-[-0.055em]">
            +{formatMoney(extra, currency)}
          </p>
          <p className="relative mt-5 max-w-lg text-[0.95rem]">
            {num(r.improvedCustomers - r.customers, 1)} more customers a month at a {num(r.improvedConversionRate, 1)}% conversion rate,
            about +{formatMoney(r.additionalRevenue * 12, currency)} a year.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-3">
          {[
            ["Enquiries / month", num(enquiries)],
            ["Customers / month", num(customers, 1)],
            ["Revenue / month", formatMoney(revenue, currency)],
          ].map(([k, v], i) => (
            <div key={k} className={cn("bg-ink p-6", i === 2 && "col-span-2 sm:col-span-1")}>
              <p className="text-[0.75rem] text-muted">{k}</p>
              <p className="mt-2 break-words text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tabular-nums tracking-[-0.035em]">{v}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[1.75rem] border border-line p-6">
          <div className="grid gap-3" aria-hidden="true">
            {[["Today", r.revenue, "bg-line-2"], ["Improved", r.improvedRevenue, "bg-ember"]].map(([label, val, cls]) => (
              <div key={label as string} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">{label as string}</span>
                <span className="h-2.5 overflow-hidden rounded-full bg-ink-3">
                  <span className={`block h-full rounded-full transition-[width] duration-700 ease-out-expo ${cls}`} style={{ width: `${((val as number) / maxRevenue) * 100}%` }} />
                </span>
              </div>
            ))}
          </div>
          <details className="mt-5 border-t border-line pt-4 text-[0.82rem] leading-relaxed text-muted">
            <summary className="cursor-pointer text-paper">How this is calculated</summary>
            <ul className="mt-3 grid gap-1 font-mono text-[0.75rem]">
              <li>Enquiries = budget ÷ cost per lead</li>
              <li>Customers = enquiries × conversion rate</li>
              <li>Revenue = customers × average customer value</li>
              <li>Improved rate = conversion rate × (1 + improvement), capped at 100%</li>
              <li>Additional revenue = improved revenue − current revenue</li>
            </ul>
          </details>
          <p className="mt-4 text-[0.78rem] leading-relaxed text-dim">
            These figures are projections based only on the numbers you enter, not a guarantee or a forecast of results.
            Budget and cost per lead are held constant. Actual results depend on your market, offer, pricing, sales process and other factors.
          </p>
        </div>
      </div>
    </div>
  );
}

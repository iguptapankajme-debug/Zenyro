"use client";

import { useId, useMemo, useState } from "react";
import { currencies, formatMoney, project, type CurrencyCode } from "@/lib/calculator";

type FieldKey = "budget" | "costPerLead" | "conversionRate" | "customerValue" | "improvement";

const fields: { key: FieldKey; label: string; hint: string; min: number; max: number; step: number; money?: boolean; suffix?: string }[] = [
  { key: "budget", label: "Monthly advertising budget", hint: "Media spend only, before agency fees.", min: 10000, max: 2000000, step: 5000, money: true },
  { key: "costPerLead", label: "Estimated cost per lead", hint: "What one enquiry costs you today.", min: 50, max: 10000, step: 50, money: true },
  { key: "conversionRate", label: "Lead-to-customer conversion rate", hint: "Out of 100 leads, how many buy?", min: 0.5, max: 50, step: 0.5, suffix: "%" },
  { key: "customerValue", label: "Average customer value", hint: "Revenue from one new customer.", min: 1000, max: 10000000, step: 1000, money: true },
  { key: "improvement", label: "Expected conversion improvement", hint: "Relative lift, e.g. 8% → 10% is +25%.", min: 0, max: 100, step: 5, suffix: "%" },
];

const defaults: Record<FieldKey, number> = { budget: 100000, costPerLead: 400, conversionRate: 8, customerValue: 50000, improvement: 25 };

const num = (n: number, digits = 0) => n.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

export function GrowthCalculator() {
  const id = useId();
  const [values, setValues] = useState(defaults);
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const r = useMemo(() => project(values), [values]);

  const set = (k: FieldKey, v: string) => {
    const n = Number(v);
    setValues((prev) => ({ ...prev, [k]: Number.isFinite(n) ? n : 0 }));
  };

  const maxRevenue = Math.max(r.improvedRevenue, 1);

  return (
    <div className="mt-16 grid gap-8 lg:grid-cols-12">
      <form className="rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-8 lg:col-span-6" onSubmit={(e) => e.preventDefault()} aria-label="Growth calculator inputs">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
          <p className="eyebrow">Your numbers</p>
          <label className="flex items-center gap-2 text-[0.8rem] text-muted" htmlFor={`${id}-cur`}>
            Currency
            <select id={`${id}-cur`} value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)} className="rounded-full border border-line-2 bg-ink px-3 py-1.5 text-paper">
              {Object.keys(currencies).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <div className="grid">
          {fields.map((f) => {
            const v = values[f.key];
            const pct = Math.min(Math.max(((v - f.min) / (f.max - f.min)) * 100, 0), 100);
            return (
              <div key={f.key} className="border-b border-line py-5 last:border-b-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <label htmlFor={`${id}-${f.key}`} className="text-[0.95rem] font-medium">{f.label}</label>
                    <p id={`${id}-${f.key}-hint`} className="mt-0.5 text-[0.78rem] text-muted">{f.hint}</p>
                  </div>
                  <div className="flex shrink-0 items-center rounded-full border border-line-2 bg-ink pl-3 pr-1 focus-within:border-ember">
                    {f.money && <span className="font-mono text-[0.85rem] text-muted">{currencies[currency].symbol.trim()}</span>}
                    <input
                      id={`${id}-${f.key}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={f.step}
                      value={v}
                      aria-describedby={`${id}-${f.key}-hint`}
                      onChange={(e) => set(f.key, e.target.value)}
                      className="w-24 bg-transparent px-2 py-2 text-right font-mono text-[0.9rem] tabular-nums outline-none sm:w-28"
                    />
                    {f.suffix && <span className="pr-2 font-mono text-[0.85rem] text-muted">{f.suffix}</span>}
                  </div>
                </div>
                <input
                  type="range"
                  aria-label={`${f.label} slider`}
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={Math.min(Math.max(v, f.min), f.max)}
                  onChange={(e) => set(f.key, e.target.value)}
                  className="calc-range mt-4 w-full"
                  style={{ "--p": `${pct}%` } as React.CSSProperties}
                />
              </div>
            );
          })}
        </div>
      </form>

      <div className="flex flex-col rounded-[1.75rem] border border-line bg-ink p-6 sm:p-8 lg:col-span-6" aria-live="polite">
        <p className="eyebrow">Projection</p>
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {[
            ["Monthly enquiries", num(r.enquiries)],
            ["Customers per month", num(r.customers, 1)],
          ].map(([k, v]) => (
            <div key={k} className="bg-ink p-5">
              <p className="text-[0.78rem] text-muted">{k}</p>
              <p className="mt-2 text-[clamp(1.6rem,3vw,2.3rem)] font-semibold tabular-nums tracking-[-0.03em]">{v}</p>
            </div>
          ))}
          <div className="col-span-2 bg-ink p-5">
            <p className="text-[0.78rem] text-muted">Estimated monthly revenue from ads</p>
            <p className="mt-2 text-[clamp(1.6rem,3vw,2.3rem)] font-semibold tabular-nums tracking-[-0.03em]">{formatMoney(r.revenue, currency)}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-ember p-6 text-ember-ink">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em]">Illustrative additional revenue / month</p>
          <p className="mt-3 break-words text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-none tabular-nums tracking-[-0.045em]">
            +{formatMoney(r.additionalRevenue, currency)}
          </p>
          <p className="mt-3 text-[0.85rem]">
            {num(r.improvedCustomers - r.customers, 1)} more customers a month at a {num(r.improvedConversionRate, 1)}% conversion rate.
            That is about +{formatMoney(r.additionalRevenue * 12, currency)} over a year.
          </p>
        </div>

        <div className="mt-6 grid gap-3" aria-hidden="true">
          {[
            ["Today", r.revenue, "bg-line-2"],
            ["Improved", r.improvedRevenue, "bg-ember"],
          ].map(([label, val, cls]) => (
            <div key={label as string} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">{label as string}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-ink-3">
                <span className={`block h-full rounded-full transition-[width] duration-500 ${cls}`} style={{ width: `${((val as number) / maxRevenue) * 100}%` }} />
              </span>
            </div>
          ))}
        </div>

        <details className="mt-6 border-t border-line pt-4 text-[0.82rem] leading-relaxed text-muted">
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
  );
}

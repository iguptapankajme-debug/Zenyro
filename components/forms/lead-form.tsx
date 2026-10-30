"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { submitLead } from "@/app/actions/lead";
import { budgetOptions, industryOptions, type LeadFormState } from "@/lib/lead-schema";
import { cn } from "@/lib/cn";

const initial: LeadFormState = { status: "idle" };

const inputCls =
  "w-full rounded-xl border bg-ink px-4 py-3.5 text-[1rem] text-paper placeholder:text-dim transition-colors focus:border-ember focus:outline-none aria-[invalid=true]:border-red-400/80";

function Field({
  id, label, error, optional, children,
}: { id: string; label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between text-[0.85rem] font-medium">
        {label}
        {optional && <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-dim">Optional</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="text-[0.8rem] text-red-300">{error}</p>}
    </div>
  );
}

export function LeadForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  const pathname = usePathname();
  const [startedAt] = useState(() => Date.now());
  const statusRef = useRef<HTMLDivElement>(null);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} className="rounded-[1.75rem] border border-line bg-ink-2 p-8 sm:p-12" role="status">
        <span className="flex size-12 items-center justify-center rounded-full bg-ember text-ember-ink"><Check aria-hidden="true" className="size-6" /></span>
        <h3 className="mt-6 text-[2rem] font-semibold tracking-[-0.03em]">Enquiry received.</h3>
        <p className="mt-3 max-w-md text-muted">{state.message}</p>
        <p className="mt-6 text-[0.9rem] text-muted">While you wait, you can <Link href="/insights" className="link-u text-paper">read our latest insights</Link>.</p>
      </div>
    );
  }

  const aria = (k: keyof typeof e) => ({ "aria-invalid": !!e[k] || undefined, "aria-describedby": e[k] ? `lf-${k}-error` : undefined });

  return (
    <form key={state.at ?? 0} action={action} noValidate className="rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-10" aria-describedby="lf-status">
      <div
        ref={statusRef}
        tabIndex={-1}
        id="lf-status"
        aria-live="polite"
        className={cn("mb-6 rounded-xl border px-4 py-3 text-[0.9rem] outline-none", state.status === "error" ? "border-red-400/50 bg-red-500/10 text-red-200" : "hidden")}
      >
        {state.message}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="lf-name" label="Name" error={e.name}>
          <input id="lf-name" name="name" autoComplete="name" required defaultValue={v.name} className={cn(inputCls, "border-line-2")} {...aria("name")} />
        </Field>
        <Field id="lf-business" label="Business name" error={e.business}>
          <input id="lf-business" name="business" autoComplete="organization" required defaultValue={v.business} className={cn(inputCls, "border-line-2")} {...aria("business")} />
        </Field>
        <Field id="lf-email" label="Email" error={e.email}>
          <input id="lf-email" name="email" type="email" autoComplete="email" required defaultValue={v.email} className={cn(inputCls, "border-line-2")} {...aria("email")} />
        </Field>
        <Field id="lf-phone" label="Phone" optional error={e.phone}>
          <input id="lf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v.phone} placeholder="+91" className={cn(inputCls, "border-line-2")} {...aria("phone")} />
        </Field>
        <Field id="lf-website" label="Website" optional error={e.website}>
          <input id="lf-website" name="website" type="text" inputMode="url" autoComplete="url" defaultValue={v.website} placeholder="yourbusiness.com" className={cn(inputCls, "border-line-2")} {...aria("website")} />
        </Field>
        <Field id="lf-industry" label="Industry" error={e.industry}>
          <select id="lf-industry" name="industry" required defaultValue={v.industry ?? ""} className={cn(inputCls, "border-line-2")} {...aria("industry")}>
            <option value="" disabled>Select your industry</option>
            {industryOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="lf-budget" label="Monthly marketing budget" error={e.budget}>
            <select id="lf-budget" name="budget" required defaultValue={v.budget ?? ""} className={cn(inputCls, "border-line-2")} {...aria("budget")}>
              <option value="" disabled>Select a range</option>
              {budgetOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="lf-challenge" label="Primary growth challenge" error={e.challenge}>
            <textarea id="lf-challenge" name="challenge" rows={4} required defaultValue={v.challenge} placeholder="For example: we get enquiries from ads but most never pick up the phone." className={cn(inputCls, "resize-y border-line-2")} {...aria("challenge")} />
          </Field>
        </div>
      </div>

      {/* Spam protection: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="lf-company-url">Leave this field empty</label>
        <input id="lf-company-url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="started_at" value={startedAt} />
      <input type="hidden" name="page" value={pathname} />

      <div className="mt-6 grid gap-2">
        <label className="flex items-start gap-3 text-[0.85rem] leading-relaxed text-muted">
          <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-[var(--color-ember)]" {...aria("consent")} />
          <span>
            I agree that Zenyro may contact me about this enquiry and store my details as described in the{" "}
            <Link href="/privacy" className="link-u text-paper">privacy notice</Link>.
          </span>
        </label>
        {e.consent && <p id="lf-consent-error" className="text-[0.8rem] text-red-300">{e.consent}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        data-magnetic
        className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-ember px-8 font-medium text-ember-ink transition-colors hover:bg-ember-2 disabled:opacity-70 sm:w-auto"
      >
        {pending ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : null}
        {pending ? "Sending…" : "Tell Us About Your Project"}
        {!pending && <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />}
      </button>
    </form>
  );
}

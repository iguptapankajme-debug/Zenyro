"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { budgetOptions, industryOptions, leadSchema, type LeadField } from "@/lib/lead-schema";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

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

/**
 * Enquiry form. Nothing is sent to a server: after the details are checked, the visitor's own
 * email app opens with a message to Zenyro already written, ready to send.
 */
export function LeadForm() {
  const pathname = usePathname();
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({});
  const [mailto, setMailto] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const to = site.email;

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.currentTarget)) as Record<string, string>;
    const parsed = leadSchema.safeParse({ ...data, consent: data.consent ?? "" });
    if (!parsed.success) {
      const next: Partial<Record<LeadField, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as LeadField;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      ev.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    setErrors({});
    const l = parsed.data;
    const subject = `New enquiry: ${l.business} (${l.name})`;
    const body = [
      `Name: ${l.name}`,
      `Business: ${l.business}`,
      `Email: ${l.email}`,
      l.phone ? `Phone: ${l.phone}` : null,
      l.website ? `Website: ${l.website}` : null,
      `Industry: ${l.industry}`,
      `Monthly marketing budget: ${l.budget}`,
      "",
      "Primary growth challenge:",
      l.challenge,
      "",
      `Sent from: ${site.url}${pathname}`,
    ]
      .filter((x) => x !== null)
      .join("\n");
    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailto(href);
    track("Contact Submitted");
    window.location.href = href;
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (mailto) {
    return (
      <div ref={statusRef} tabIndex={-1} className="rounded-[1.75rem] border border-line bg-ink-2 p-8 outline-none sm:p-12" role="status">
        <span className="flex size-12 items-center justify-center rounded-full bg-ember text-ember-ink"><Check aria-hidden="true" className="size-6" /></span>
        <h3 className="mt-6 text-[2rem] font-semibold tracking-[-0.03em]">Your email is ready.</h3>
        <p className="mt-3 max-w-md text-muted">
          Your email app should have opened with your enquiry already written. Press <strong className="text-paper">Send</strong> and we&apos;ll reply within one business day.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={mailto} className="inline-flex h-12 items-center gap-2 rounded-full bg-ember px-6 font-medium text-ember-ink hover:bg-ember-2">
            <Mail aria-hidden="true" className="size-4" /> Open the email again
          </a>
          <button type="button" onClick={() => setMailto(null)} className="inline-flex h-12 items-center rounded-full border border-line-2 px-6 hover:border-ember">
            Edit details
          </button>
        </div>
        <p className="mt-6 text-[0.9rem] text-muted">
          Nothing opened? Email us directly at{" "}
          <a href={`mailto:${to}`} className="link-u text-paper">{to}</a>.
        </p>
      </div>
    );
  }

  const aria = (k: LeadField) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `lf-${k}-error` : undefined });
  const e = errors;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="lf-name" label="Name" error={e.name}>
          <input id="lf-name" name="name" autoComplete="name" required className={cn(inputCls, "border-line-2")} {...aria("name")} />
        </Field>
        <Field id="lf-business" label="Business name" error={e.business}>
          <input id="lf-business" name="business" autoComplete="organization" required className={cn(inputCls, "border-line-2")} {...aria("business")} />
        </Field>
        <Field id="lf-email" label="Email" error={e.email}>
          <input id="lf-email" name="email" type="email" autoComplete="email" required className={cn(inputCls, "border-line-2")} {...aria("email")} />
        </Field>
        <Field id="lf-phone" label="Phone" optional error={e.phone}>
          <input id="lf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" className={cn(inputCls, "border-line-2")} {...aria("phone")} />
        </Field>
        <Field id="lf-website" label="Website" optional error={e.website}>
          <input id="lf-website" name="website" type="text" inputMode="url" autoComplete="url" placeholder="yourbusiness.com" className={cn(inputCls, "border-line-2")} {...aria("website")} />
        </Field>
        <Field id="lf-industry" label="Industry" error={e.industry}>
          <select id="lf-industry" name="industry" required defaultValue="" className={cn(inputCls, "border-line-2")} {...aria("industry")}>
            <option value="" disabled>Select your industry</option>
            {industryOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="lf-budget" label="Monthly marketing budget" error={e.budget}>
            <select id="lf-budget" name="budget" required defaultValue="" className={cn(inputCls, "border-line-2")} {...aria("budget")}>
              <option value="" disabled>Select a range</option>
              {budgetOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="lf-challenge" label="Primary growth challenge" error={e.challenge}>
            <textarea id="lf-challenge" name="challenge" rows={4} required placeholder="For example: we get enquiries from ads but most never pick up the phone." className={cn(inputCls, "resize-y border-line-2")} {...aria("challenge")} />
          </Field>
        </div>
      </div>

      <div className="mt-6 grid gap-2">
        <label className="flex items-start gap-3 text-[0.85rem] leading-relaxed text-muted">
          <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-[var(--color-ember)]" {...aria("consent")} />
          <span>
            I agree that Zenyro may contact me about this enquiry, as described in the{" "}
            <Link href="/privacy" className="link-u text-paper">privacy notice</Link>.
          </span>
        </label>
        {e.consent && <p id="lf-consent-error" className="text-[0.8rem] text-red-300">{e.consent}</p>}
      </div>

      <button
        type="submit"
        data-magnetic
        className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-ember px-8 font-medium text-ember-ink transition-colors hover:bg-ember-2 sm:w-auto"
      >
        Send Enquiry by Email
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="mt-4 text-[0.82rem] text-dim">
        This opens your email app with your enquiry written to <span className="text-muted">{to}</span>. Just press Send.
      </p>
    </form>
  );
}

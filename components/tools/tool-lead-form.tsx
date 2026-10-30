"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { submitToolLead } from "@/app/actions/tool-lead";
import type { ToolKey, ToolLeadState } from "@/lib/tool-lead-schema";
import { AttributionFields } from "@/components/analytics/attribution-fields";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const initial: ToolLeadState = { status: "idle" };
const inputCls =
  "w-full rounded-xl border border-line-2 bg-ink px-4 py-3 text-[0.98rem] text-paper placeholder:text-dim focus:border-ember focus:outline-none aria-[invalid=true]:border-red-400/80";

type Props = {
  tool: ToolKey;
  /** Tool output sent with the request. Keep it compact and free of anything the visitor didn't choose to share. */
  summary: Record<string, unknown>;
  defaultIntent?: "proposal" | "consultation";
  title?: string;
};

/**
 * Enquiry panel shared by the free tools. Results are always visible without it; contact details
 * are only requested when the visitor asks for a proposal or consultation.
 */
export function ToolLeadForm({ tool, summary, defaultIntent = "proposal", title = "Want this turned into a real plan?" }: Props) {
  const [state, action, pending] = useActionState(submitToolLead, initial);
  const [intent, setIntent] = useState<"proposal" | "consultation">(defaultIntent);
  const [startedAt] = useState(() => Date.now());
  const pathname = usePathname();
  const statusRef = useRef<HTMLDivElement>(null);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
    if (state.status === "success") track(intent === "proposal" ? "Proposal Requested" : "Consultation Requested", { tool });
  }, [state, intent, tool]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[1.75rem] border border-ember/40 bg-ink-2 p-8">
        <span className="flex size-11 items-center justify-center rounded-full bg-ember text-ember-ink"><Check aria-hidden="true" className="size-5" /></span>
        <p className="mt-5 text-[1.6rem] font-semibold tracking-[-0.03em]">Request received.</p>
        <p className="mt-2 max-w-md text-muted">{state.message}</p>
      </div>
    );
  }

  const aria = (k: keyof typeof e) => ({ "aria-invalid": !!e[k] || undefined, "aria-describedby": e[k] ? `tl-${k}-error` : undefined });

  return (
    <form action={action} noValidate className="rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-8">
      <p className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">{title}</p>
      <p className="mt-2 text-[0.92rem] text-muted">Your results are attached automatically. No obligation.</p>

      <div role="radiogroup" aria-label="What would you like?" className="mt-6 grid grid-cols-2 gap-2">
        {(["proposal", "consultation"] as const).map((k) => (
          <label key={k} className={cn("cursor-pointer rounded-xl border px-4 py-3 text-[0.9rem] transition-colors", intent === k ? "border-ember bg-ember/10 text-paper" : "border-line-2 text-muted hover:text-paper")}>
            <input type="radio" name="intent" value={k} checked={intent === k} onChange={() => setIntent(k)} className="sr-only" />
            <span className="block font-medium">{k === "proposal" ? "Custom proposal" : "Consultation call"}</span>
            <span className="mt-0.5 block text-[0.75rem] text-dim">{k === "proposal" ? "Scope, price and timeline" : "30 minutes with our team"}</span>
          </label>
        ))}
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className={cn("mt-5 rounded-xl border px-4 py-3 text-[0.88rem] outline-none", state.status === "error" ? "border-red-400/50 bg-red-500/10 text-red-200" : "hidden")}>
        {state.message}
      </div>

      <div key={state.at ?? 0} className="mt-5 grid gap-4 sm:grid-cols-2">
        {([
          ["name", "Name", "text", "name"],
          ["business", "Business name", "text", "organization"],
          ["email", "Email", "email", "email"],
          ["phone", "Phone (optional)", "tel", "tel"],
        ] as const).map(([k, label, type, ac]) => (
          <div key={k} className="grid gap-1.5">
            <label htmlFor={`tl-${k}`} className="text-[0.82rem] font-medium">{label}</label>
            <input id={`tl-${k}`} name={k} type={type} autoComplete={ac} defaultValue={v[k]} className={inputCls} {...aria(k)} />
            {e[k] && <p id={`tl-${k}-error`} className="text-[0.78rem] text-red-300">{e[k]}</p>}
          </div>
        ))}
        <div className="grid gap-1.5 sm:col-span-2">
          <label htmlFor="tl-message" className="text-[0.82rem] font-medium">Anything else? (optional)</label>
          <textarea id="tl-message" name="message" rows={3} defaultValue={v.message} className={cn(inputCls, "resize-y")} />
        </div>
      </div>

      <input type="hidden" name="tool" value={tool} />
      <input type="hidden" name="summary" value={JSON.stringify(summary)} />
      <input type="hidden" name="started_at" value={startedAt} />
      <input type="hidden" name="page" value={pathname} />
      <AttributionFields />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="tl-company-url">Leave this field empty</label>
        <input id="tl-company-url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-5 flex items-start gap-3 text-[0.82rem] leading-relaxed text-muted">
        <input type="checkbox" name="consent" className="mt-1 size-4 shrink-0 accent-[var(--color-ember)]" {...aria("consent")} />
        <span>I agree that Zenyro may contact me about this request and store my details and tool results as described in the <Link href="/privacy" className="link-u text-paper">privacy notice</Link>.</span>
      </label>
      {e.consent && <p id="tl-consent-error" className="mt-1 text-[0.78rem] text-red-300">{e.consent}</p>}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="group inline-flex h-12 items-center gap-2 rounded-full bg-ember px-6 font-medium text-ember-ink transition-colors hover:bg-ember-2 disabled:opacity-70">
          {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
          {pending ? "Sending…" : intent === "proposal" ? "Request custom proposal" : "Request consultation"}
          {!pending && <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />}
        </button>
        {site.bookingUrl && (
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("Consultation Booking Opened", { tool })} className="inline-flex items-center gap-1.5 text-[0.9rem]">
            <span className="link-u">Or book a time directly</span> <ArrowUpRight aria-hidden="true" className="size-4 text-ember" />
          </a>
        )}
      </div>
    </form>
  );
}

"use server";

import { headers } from "next/headers";
import { leadSchema, type LeadField, type LeadFormState } from "@/lib/lead-schema";
import { rateLimit } from "@/lib/rate-limit";
import { deliverLead } from "@/lib/leads";
import { readAttribution } from "@/lib/attribution-schema";

const MIN_FILL_MS = 2500;

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const raw = Object.fromEntries(
    ["name", "business", "email", "phone", "website", "industry", "budget", "challenge", "consent"].map((k) => [k, String(formData.get(k) ?? "")]),
  );
  const values = { ...raw, consent: undefined };

  // Spam traps: a hidden field humans never fill, and a minimum time on the form.
  const honeypot = String(formData.get("company_url") ?? "");
  const startedAt = Number(formData.get("started_at") ?? 0);
  // Spam traps respond as if successful so bots get no signal. The timing check runs after validation,
  // so a person who submits an incomplete form quickly still sees what to fix.
  const fakeSuccess: LeadFormState = { status: "success", message: "Thank you. We will be in touch within one business day." };
  if (honeypot) return fakeSuccess;

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const limited = rateLimit(`lead:${ip}`);
  if (!limited.ok) {
    return { status: "error", message: "Too many submissions from this connection. Please try again in a few minutes.", values, at: Date.now() };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<LeadField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as LeadField | undefined;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors, values, at: Date.now() };
  }

  if (startedAt && Date.now() - startedAt < MIN_FILL_MS) return fakeSuccess;

  const page = String(formData.get("page") ?? "").slice(0, 200);
  const { consent: _consent, challenge, ...rest } = parsed.data;
  void _consent;
  const result = await deliverLead(
    { ...rest, message: challenge, source: "contact-form", intent: "enquiry", attribution: readAttribution(formData) },
    { userAgent: h.get("user-agent") ?? "", page },
  );
  if (!result.ok) {
    return {
      status: "error",
      message: "We could not send your enquiry just now. Please try again, or email us directly.",
      values,
      at: Date.now(),
    };
  }

  return {
    status: "success",
    message: `Thank you, ${parsed.data.name.split(" ")[0]}. We have your details and will reply within one business day.`,
  };
}

"use server";

import { headers } from "next/headers";
import { toolLeadSchema, type ToolLeadField, type ToolLeadState } from "@/lib/tool-lead-schema";
import { readAttribution } from "@/lib/attribution-schema";
import { rateLimit } from "@/lib/rate-limit";
import { deliverLead } from "@/lib/leads";

const MIN_FILL_MS = 2000;

/** Pull a few structured fields out of the tool summary for the CRM, keeping the rest as details. */
function pick(summary: Record<string, unknown>, key: string) {
  const v = summary[key];
  return typeof v === "string" ? v.slice(0, 200) : undefined;
}

export async function submitToolLead(_prev: ToolLeadState, formData: FormData): Promise<ToolLeadState> {
  const keys = ["name", "business", "email", "phone", "message", "tool", "intent", "summary", "consent"];
  const raw = Object.fromEntries(keys.map((k) => [k, String(formData.get(k) ?? "")]));
  const values = { name: raw.name, business: raw.business, email: raw.email, phone: raw.phone, message: raw.message };

  const honeypot = String(formData.get("company_url") ?? "");
  const startedAt = Number(formData.get("started_at") ?? 0);
  // Spam traps: the hidden field always counts; the timing check applies once the fields are valid.
  const fakeSuccess: ToolLeadState = { status: "success", message: "Thank you. We will be in touch within one business day." };
  if (honeypot) return fakeSuccess;

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`tool-lead:${ip}`).ok) {
    return { status: "error", message: "Too many requests from this connection. Please try again in a few minutes.", values, at: Date.now() };
  }

  const parsed = toolLeadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<ToolLeadField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ToolLeadField | undefined;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors, values, at: Date.now() };
  }

  if (startedAt && Date.now() - startedAt < MIN_FILL_MS) return fakeSuccess;

  let summary: Record<string, unknown> = {};
  try {
    const value = JSON.parse(parsed.data.summary) as unknown;
    if (value && typeof value === "object" && !Array.isArray(value)) summary = value as Record<string, unknown>;
  } catch {
    // An unreadable summary is dropped rather than failing the enquiry.
  }
  const services = Array.isArray(summary.services) ? summary.services.filter((s): s is string => typeof s === "string").slice(0, 20) : [];

  const d = parsed.data;
  const result = await deliverLead(
    {
      name: d.name,
      business: d.business,
      email: d.email,
      phone: d.phone || undefined,
      website: pick(summary, "website"),
      industry: pick(summary, "industry"),
      budget: pick(summary, "budget"),
      message: d.message,
      source: d.tool,
      intent: d.intent,
      services,
      details: summary,
      attribution: readAttribution(formData),
    },
    { userAgent: h.get("user-agent") ?? "", page: String(formData.get("page") ?? "").slice(0, 200) },
  );
  if (!result.ok) {
    return { status: "error", message: "We could not send your request just now. Please try again, or email us directly.", values, at: Date.now() };
  }
  return {
    status: "success",
    message: `Thank you, ${d.name.split(" ")[0]}. We have your ${d.intent === "proposal" ? "proposal request" : "consultation request"} and will reply within one business day.`,
  };
}

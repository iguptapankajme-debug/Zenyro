import "server-only";
import type { Attribution } from "./attribution-schema";

export type LeadSource = "contact-form";
export type LeadIntent = "enquiry" | "proposal" | "consultation";

/** One normalised record for every enquiry, whichever form or tool it came from. */
export type LeadRecord = {
  name: string;
  business: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  budget?: string;
  message?: string;
  source: LeadSource;
  intent: LeadIntent;
  services?: string[];
  /** Optional structured context sent with the enquiry. */
  details?: Record<string, unknown>;
  attribution?: Attribution;
};

type Meta = { userAgent: string; page: string };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const sourceLabel: Record<LeadSource, string> = {
  "contact-form": "Contact form",
};

async function storeInSupabase(lead: LeadRecord, meta: Meta) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      name: lead.name,
      business: lead.business,
      email: lead.email,
      phone: lead.phone || null,
      website: lead.website || null,
      industry: lead.industry || "Not specified",
      budget: lead.budget || "Not specified",
      challenge: lead.message || "",
      source: lead.source,
      intent: lead.intent,
      services: lead.services ?? [],
      details: lead.details ?? {},
      utm_source: lead.attribution?.utm_source ?? null,
      utm_medium: lead.attribution?.utm_medium ?? null,
      utm_campaign: lead.attribution?.utm_campaign ?? null,
      referrer: lead.attribution?.referrer ?? null,
      landing_page: lead.attribution?.landing_page ?? null,
      source_page: meta.page,
      user_agent: meta.userAgent.slice(0, 300),
    }),
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
  return true;
}

async function notifyByEmail(lead: LeadRecord, meta: Meta) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;
  if (!key || !to || !from) return false;
  const rows: [string, string][] = [
    ["Source", `${sourceLabel[lead.source]} (${lead.intent})`],
    ["Name", lead.name],
    ["Business", lead.business],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ["Website", lead.website || "—"],
    ["Industry", lead.industry || "—"],
    ["Budget", lead.budget || "—"],
    ["Services", lead.services?.join(", ") || "—"],
    ["Message", lead.message || "—"],
    ["Attribution", Object.entries(lead.attribution ?? {}).map(([k, v]) => `${k}: ${v}`).join(" · ") || "—"],
    ["Page", meta.page],
  ];
  const details = lead.details && Object.keys(lead.details).length
    ? `<h3 style="font-family:sans-serif">Additional details</h3><pre style="white-space:pre-wrap;font-size:12px">${escape(JSON.stringify(lead.details, null, 2))}</pre>`
    : "";
  const html = `<h2 style="font-family:sans-serif">New Zenyro enquiry</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`)
    .join("")}</table>${details}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject: `New ${sourceLabel[lead.source].toLowerCase()} lead: ${lead.business}`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status}`);
  return true;
}

async function forwardToCrm(lead: LeadRecord, meta: Meta) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, consent: true, page: meta.page, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`CRM webhook failed: ${res.status}`);
  return true;
}

/**
 * Deliver a lead to every configured destination. Succeeds if at least one destination accepted it.
 * In development with nothing configured, the lead is logged so forms can be tested locally.
 */
export async function deliverLead(lead: LeadRecord, meta: Meta) {
  const results = await Promise.allSettled([storeInSupabase(lead, meta), notifyByEmail(lead, meta), forwardToCrm(lead, meta)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value);
  for (const r of results) if (r.status === "rejected") console.error("[lead]", r.reason);

  if (delivered) return { ok: true as const };
  const anyConfigured = results.some((r) => r.status === "rejected");
  if (!anyConfigured && process.env.NODE_ENV !== "production") {
    console.info("[lead] No destinations configured. Lead received:", { ...lead, ...meta });
    return { ok: true as const };
  }
  return { ok: false as const };
}

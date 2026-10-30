import "server-only";
import type { Lead } from "./lead-schema";

type Meta = { ip: string; userAgent: string; page: string };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function storeInSupabase(lead: Lead, meta: Meta) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: lead.name,
      business: lead.business,
      email: lead.email,
      phone: lead.phone || null,
      website: lead.website || null,
      industry: lead.industry,
      budget: lead.budget,
      challenge: lead.challenge,
      source_page: meta.page,
      user_agent: meta.userAgent.slice(0, 300),
    }),
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
  return true;
}

async function notifyByEmail(lead: Lead, meta: Meta) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;
  if (!key || !to || !from) return false;
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Business", lead.business],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ["Website", lead.website || "—"],
    ["Industry", lead.industry],
    ["Budget", lead.budget],
    ["Challenge", lead.challenge],
    ["Page", meta.page],
  ];
  const html = `<h2 style="font-family:sans-serif">New Zenyro enquiry</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`)
    .join("")}</table>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject: `New enquiry: ${lead.business} (${lead.industry})`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status}`);
  return true;
}

async function forwardToCrm(lead: Lead, meta: Meta) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, consent: true, source: "zenyro-website", page: meta.page, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`CRM webhook failed: ${res.status}`);
  return true;
}

/**
 * Deliver a lead to every configured destination. Succeeds if at least one destination accepted it.
 * In development with nothing configured, the lead is logged so the form can be tested locally.
 */
export async function deliverLead(lead: Lead, meta: Meta) {
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

import "server-only";
import { supabaseEnv } from "./supabase-env";

export const leadStatuses = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export type StoredLead = {
  id: string;
  created_at: string;
  name: string;
  business: string;
  email: string;
  phone: string | null;
  website: string | null;
  industry: string;
  budget: string;
  challenge: string;
  source: string;
  intent: string;
  services: string[];
  details: Record<string, unknown>;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_page: string | null;
  status: LeadStatus;
};

export function leadStoreConfigured() {
  return !!supabaseEnv();
}

function base() {
  return `${supabaseEnv()!.url}/rest/v1/leads`;
}
function headers() {
  const key = supabaseEnv()!.key;
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

export async function listLeads(filter: { status?: string; source?: string }) {
  const q = new URLSearchParams({ select: "*", order: "created_at.desc", limit: "200" });
  if (filter.status && (leadStatuses as readonly string[]).includes(filter.status)) q.set("status", `eq.${filter.status}`);
  if (filter.source && /^[a-z-]{2,40}$/.test(filter.source)) q.set("source", `eq.${filter.source}`);
  const res = await fetch(`${base()}?${q}`, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load leads (status ${res.status}).`);
  return (await res.json()) as StoredLead[];
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const now = new Date().toISOString();
  const body: Record<string, string> = { status, status_updated_at: now };
  if (status === "qualified") body.qualified_at = now;
  if (status === "won") body.won_at = now;
  const res = await fetch(`${base()}?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { ...headers(), Prefer: "return=minimal" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Could not update the lead (status ${res.status}).`);
}

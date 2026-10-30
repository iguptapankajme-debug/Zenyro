import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { leadStatuses, leadStoreConfigured, listLeads, type StoredLead } from "@/lib/admin-leads";
import { logout, setLeadStatus } from "../actions";

export const dynamic = "force-dynamic";

const sources = ["contact-form", "website-cost-calculator", "seo-audit", "website-brief-generator"];
const pretty = (s: string) => s.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

type Props = { searchParams: Promise<{ status?: string; source?: string }> };

export default async function AdminLeads({ searchParams }: Props) {
  if (!(await isAdmin())) redirect("/admin/login");
  const filter = await searchParams;
  let leads: StoredLead[] = [];
  let error = "";
  if (leadStoreConfigured()) {
    try {
      leads = await listLeads(filter);
    } catch (e) {
      error = e instanceof Error ? e.message : "Could not load leads.";
    }
  }
  const qs = (next: Record<string, string | undefined>) => {
    const p = new URLSearchParams(Object.entries({ ...filter, ...next }).filter(([, v]) => v) as [string, string][]);
    return `/admin/leads${p.size ? `?${p}` : ""}`;
  };

  return (
    <div className="shell">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Admin</p>
          <h1 className="text-[2.6rem] font-semibold tracking-[-0.04em]">Leads</h1>
        </div>
        <form action={logout}><button className="rounded-full border border-line-2 px-4 py-2 text-[0.85rem]">Sign out</button></form>
      </div>

      {!leadStoreConfigured() && <p className="mt-8 rounded-2xl border border-line p-5 text-muted">Lead storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY and run supabase/schema.sql to see leads here.</p>}
      {error && <p role="alert" className="mt-8 rounded-2xl border border-red-400/40 bg-red-500/10 p-5 text-red-200">{error}</p>}

      <nav aria-label="Filter leads" className="mt-8 grid gap-3">
        <div className="flex flex-wrap gap-2 text-[0.8rem]">
          <span className="py-1.5 text-dim">Status:</span>
          {["", ...leadStatuses].map((s) => <Link key={s || "all"} href={qs({ status: s || undefined })} aria-current={(filter.status ?? "") === s ? "page" : undefined} className="rounded-full border border-line-2 px-3 py-1.5 aria-[current=page]:border-ember aria-[current=page]:text-ember">{s ? pretty(s) : "All"}</Link>)}
        </div>
        <div className="flex flex-wrap gap-2 text-[0.8rem]">
          <span className="py-1.5 text-dim">Source:</span>
          {["", ...sources].map((s) => <Link key={s || "all"} href={qs({ source: s || undefined })} aria-current={(filter.source ?? "") === s ? "page" : undefined} className="rounded-full border border-line-2 px-3 py-1.5 aria-[current=page]:border-ember aria-[current=page]:text-ember">{s ? pretty(s) : "All"}</Link>)}
        </div>
      </nav>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[64rem] text-left text-[0.85rem]">
          <caption className="sr-only">Leads, newest first</caption>
          <thead className="bg-ink-2 text-muted">
            <tr>{["Submitted", "Contact", "Business", "Source / tool", "Budget", "Services", "Attribution", "Status"].map((h) => <th key={h} scope="col" className="px-4 py-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody>
            {leads.length === 0 && <tr><td colSpan={8} className="px-4 py-10 text-center text-muted">No leads match these filters.</td></tr>}
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-line align-top">
                <td className="px-4 py-3 whitespace-nowrap text-muted">{new Date(l.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                <td className="px-4 py-3"><p className="font-medium">{l.name}</p><p><a className="link-u" href={`mailto:${l.email}`}>{l.email}</a></p>{l.phone && <p className="text-muted">{l.phone}</p>}</td>
                <td className="px-4 py-3"><p>{l.business}</p><p className="text-muted">{l.industry}</p>{l.website && <p className="max-w-[14rem] truncate text-dim">{l.website}</p>}</td>
                <td className="px-4 py-3"><p>{pretty(l.source ?? "contact-form")}</p><p className="text-muted">{pretty(l.intent ?? "enquiry")}</p></td>
                <td className="px-4 py-3">{l.budget}</td>
                <td className="px-4 py-3 text-muted">{(l.services ?? []).slice(0, 4).join(", ") || "—"}</td>
                <td className="px-4 py-3 text-muted">{[l.utm_source, l.utm_medium, l.utm_campaign].filter(Boolean).join(" / ") || l.referrer || "Direct"}{l.landing_page && <p className="text-dim">{l.landing_page}</p>}</td>
                <td className="px-4 py-3">
                  <form action={setLeadStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={l.id} />
                    <label className="sr-only" htmlFor={`status-${l.id}`}>Status for {l.name}</label>
                    <select id={`status-${l.id}`} name="status" defaultValue={l.status} className="rounded-lg border border-line-2 bg-ink px-2 py-1.5">
                      {leadStatuses.map((s) => <option key={s} value={s}>{pretty(s)}</option>)}
                    </select>
                    <button className="rounded-lg border border-line-2 px-2.5 py-1.5 text-[0.78rem] hover:border-ember">Save</button>
                  </form>
                  {(l.challenge || Object.keys(l.details ?? {}).length > 0) && (
                    <details className="mt-2 max-w-xs text-[0.78rem] text-muted">
                      <summary className="cursor-pointer text-paper">Details</summary>
                      {l.challenge && <p className="mt-2 whitespace-pre-wrap">{l.challenge}</p>}
                      {Object.keys(l.details ?? {}).length > 0 && <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap text-[0.7rem]">{JSON.stringify(l.details, null, 2)}</pre>}
                    </details>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

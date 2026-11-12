import { site } from "@/lib/site";

/** Who runs this website and how to reach them: shown on the contact and policy pages. */
export function BusinessDetails({ className }: { className?: string }) {
  const rows: [string, React.ReactNode][] = [
    ["Business name", site.legalName || site.name],
    ["Trading as", site.legalName ? site.name : ""],
    ["Registered address", site.address || site.region],
    ["Email", site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : ""],
    ["Phone", site.phone ? <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a> : ""],
    ["GSTIN", site.gstin],
    ["Website", <a key="w" href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a>],
  ];
  return (
    <dl className={className ?? "my-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line text-[0.95rem] sm:grid-cols-[12rem_1fr]"}>
      {rows.filter(([, v]) => v).map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="bg-ink-2 px-4 py-3 font-medium text-paper">{k}</dt>
          <dd className="bg-ink px-4 py-3 text-muted">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

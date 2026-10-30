import Link from "next/link";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-dim">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-paper">{c.name}</span>
              ) : (
                <Link href={c.path} className="link-u hover:text-paper">{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}

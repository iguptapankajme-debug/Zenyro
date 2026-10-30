import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { getService } from "@/data/services";
import { tools, type ToolInfo } from "@/data/tools";
import { webApplicationSchema } from "@/lib/seo";

/** Shared layout for each free tool: hero, the interactive tool, explanatory content, FAQ and related links. */
export function ToolPage({ tool, children, about, faqs }: { tool: ToolInfo; children: ReactNode; about: ReactNode; faqs: { q: string; a: string }[] }) {
  const related = tool.services.map(getService).filter((s) => !!s);
  const others = tools.filter((t) => t.slug !== tool.slug);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Tools", path: "/tools" }, { name: tool.name, path: `/tools/${tool.slug}` }]}
        eyebrow="Free tool"
        title={tool.name}
        intro={tool.description}
        aside={<ul className="mt-6 flex flex-wrap gap-2">{tool.facts.map((f) => <li key={f} className="rounded-full border border-line-2 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{f}</li>)}</ul>}
      />
      <section className="py-14 md:py-20" aria-label={tool.name}>
        <div className="shell">{children}</div>
      </section>
      <section className="border-t border-line py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="prose-z lg:col-span-7">{about}</div>
          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-line p-7 lg:sticky lg:top-28">
              <p className="eyebrow mb-5">Related services</p>
              <ul className="grid gap-3">
                {related.map((s) => (
                  <li key={s.slug}><Link href={`/services/${s.slug}`} className="group flex items-center justify-between gap-3"><span><span className="block font-medium group-hover:text-ember">{s.name}</span><span className="block text-[0.85rem] text-muted">{s.headline}</span></span><ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-ember" /></Link></li>
                ))}
              </ul>
              <p className="eyebrow mb-5 mt-8">More free tools</p>
              <ul className="grid gap-2">{others.map((t) => <li key={t.slug}><Link href={`/tools/${t.slug}`} className="link-u">{t.name}</Link></li>)}</ul>
            </div>
          </aside>
        </div>
      </section>
      <Faq faqs={faqs} />
      <JsonLd data={webApplicationSchema({ name: tool.name, description: tool.metaDescription, path: `/tools/${tool.slug}` })} />
    </>
  );
}

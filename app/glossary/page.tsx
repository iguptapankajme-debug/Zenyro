import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";
import { glossary } from "@/data/glossary";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { slugify } from "@/lib/slugify";

export const metadata = buildMetadata({
  title: "SEO, AEO & GEO Glossary: Search and AI Terms Explained",
  description: "Plain-English definitions of SEO, AEO and GEO terms, from AI Overviews and hreflang to prompt tracking, E-E-A-T and llms.txt.",
  path: "/glossary",
});

export default function GlossaryPage() {
  const letters = [...new Set(glossary.map((t) => t.term[0]!.toUpperCase()))];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Glossary", path: "/glossary" }]}
        eyebrow="Glossary"
        title={<>Search and AI terms, <Em>in plain English.</Em></>}
        intro={`${glossary.length} definitions for the words you'll hear in SEO, AEO and GEO, each in a sentence or two.`}
      />
      <section className="py-16 md:py-24" aria-label="Terms">
        <div className="shell">
          <nav aria-label="Jump to letter" className="mb-10 flex flex-wrap gap-2">
            {letters.map((l) => <a key={l} href={`#letter-${l}`} className="grid size-9 place-items-center rounded-md border border-line font-mono text-[0.85rem] hover:border-ember hover:text-ember">{l}</a>)}
          </nav>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {glossary.map((t, i) => {
              const first = i === 0 || glossary[i - 1]!.term[0] !== t.term[0];
              return (
                <div key={t.term} id={slugify(t.term)} className="scroll-mt-28 bg-ink p-6">
                  <dt id={first ? `letter-${t.term[0]!.toUpperCase()}` : undefined} className="scroll-mt-28 text-[1.1rem] font-semibold tracking-[-0.02em]">{t.term}</dt>
                  <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {t.definition}
                    {t.href && <> <Link href={t.href} className="inline-flex items-center gap-1 font-medium text-paper"><span className="link-u">Learn more<span className="sr-only"> about {t.term}</span></span><ArrowUpRight aria-hidden="true" className="size-3.5 text-ember" /></Link></>}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "SEO, AEO and GEO glossary",
          url: absoluteUrl("/glossary"),
          hasDefinedTerm: glossary.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.definition, url: absoluteUrl(`/glossary#${slugify(t.term)}`) })),
        }}
      />
    </>
  );
}

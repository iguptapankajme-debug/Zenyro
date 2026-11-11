import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";
import { articles, pillars } from "@/data/insights";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Learn SEO, AEO and GEO: Guides to Search and AI Visibility",
  description: "Answer-first guides to SEO, answer engine optimisation (AEO) and generative engine optimisation (GEO): definitions, how-tos, comparisons, tools and pricing.",
  path: "/insights",
});

export default function InsightsPage() {
  const groups = pillars.map((p) => ({ ...p, items: articles.filter((a) => (p.categories as readonly string[]).includes(a.category)) }));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Learn"
        title={<>Learn SEO, AEO and <Em>GEO.</Em></>}
        intro={`${articles.length} answer-first guides to ranking on Google, becoming the answer, and getting recommended by AI assistants.`}
      />
      <nav aria-label="Topics" className="border-b border-line">
        <div className="shell flex flex-wrap gap-2 py-6">
          {groups.map((g) => (
            <a key={g.key} href={`#${g.key}`} className="rounded-lg border border-line bg-ink px-3 py-1.5 text-[0.88rem] hover:border-ember hover:text-ember">
              {g.title} <span className="ml-1 font-mono text-[0.75rem] text-dim">{g.items.length}</span>
            </a>
          ))}
        </div>
      </nav>
      {groups.map((g) => (
        <section key={g.key} id={g.key} className="scroll-mt-24 border-b border-line py-16 md:py-20" aria-labelledby={`${g.key}-title`}>
          <div className="shell grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id={`${g.key}-title`} className="text-[clamp(1.6rem,2.8vw,2.3rem)] font-semibold leading-tight tracking-[-0.03em]">{g.title}</h2>
              <p className="mt-3 text-muted">{g.intro}</p>
            </div>
            <ul className="grid gap-3 lg:col-span-8 md:grid-cols-2">
              {g.items.map((a) => (
                <li key={a.slug}>
                  <Link href={`/insights/${a.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-ink p-5 transition-colors hover:border-ember/60">
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-semibold leading-snug tracking-[-0.01em]">{a.title}</span>
                      <ArrowUpRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-2 line-clamp-2 text-[0.88rem] leading-relaxed text-muted">{a.description}</span>
                    <span className="mt-auto pt-3 font-mono text-[0.7rem] text-dim">{a.readingMinutes} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Learn SEO, AEO and GEO",
          url: absoluteUrl("/insights"),
          hasPart: articles.map((a) => ({ "@type": "Article", headline: a.title, url: absoluteUrl(`/insights/${a.slug}`) })),
        }}
      />
    </>
  );
}

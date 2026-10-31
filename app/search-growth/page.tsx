import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { SearchInterface } from "@/components/search/search-interface";
import { VisibilityDemo } from "@/components/search/visibility-demo";
import { Em } from "@/components/ui/section-heading";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Search Growth: SEO, AEO & GEO Services",
  description:
    "Be discovered across search engines, answer experiences and generative AI search. Zenyro combines SEO, answer engine optimization and generative engine optimization into one organic growth programme.",
  path: "/search-growth",
});

const pillars = [
  { slug: "seo", tag: "SEO", line: "Rank where customers search.", desc: "Technical SEO, content strategy, local and programmatic SEO." },
  { slug: "aeo", tag: "AEO", line: "Become the answer.", desc: "Answer-first content, clear structure and accurate business information." },
  { slug: "geo", tag: "GEO", line: "Get discovered in AI search.", desc: "Brand visibility and accurate representation in generative search." },
];

const faqs = [
  { q: "Are SEO, AEO and GEO separate things?", a: "They are closely related. All three depend on crawlable, accurate, genuinely useful content and real authority. AEO focuses on being chosen as a direct answer; GEO focuses on how generative AI search represents and cites your brand. We run them as one programme with shared foundations." },
  { q: "Is there a trick or file that gets a business into AI answers?", a: "No. Special markup or files such as llms.txt are not guaranteed requirements for generative search visibility. Clear information, consistent business facts, expert content and credible coverage matter far more." },
  { q: "How will we know it is working?", a: "Organic search is measured with Google Search Console and Bing Webmaster Tools. Answer and AI visibility are tracked with a documented set of questions and prompts checked on a schedule, plus AI referral sessions in analytics. Every report states where each number comes from." },
];

export default function SearchGrowthPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }, { name: "Search growth", path: "/search-growth" }]}
        eyebrow="SEO · AEO · GEO"
        title={<>Search is <Em>evolving.</Em></>}
        intro="Be discovered across search engines and AI-powered experiences. One organic growth programme, built on the same foundations: clear, crawlable, credible information."
        aside={<div className="mt-7"><ButtonLink href="/free-audit">Get a Free AI Search Audit</ButtonLink></div>}
      />

      <section className="py-20 md:py-28" aria-label="How search is changing">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
          <ol className="min-w-0 lg:col-span-5">
            {pillars.map((p, i) => {
              return (
                <li key={p.slug} className="border-b border-line first:border-t">
                  <Link href={`/services/${p.slug}`} className="group flex items-baseline gap-5 py-6">
                    <span className="font-mono text-[0.72rem] text-ember">0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block text-[clamp(2.4rem,5vw,4.4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] transition-colors group-hover:text-ember">{p.tag}</span>
                      <span className="mt-2 block text-[1.05rem] font-medium">{p.line}</span>
                      <span className="mt-1 block text-[0.9rem] text-muted">{p.desc}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="size-6 shrink-0 text-line-2 transition-colors group-hover:text-ember" />
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="min-w-0 lg:col-span-7">
            <SearchInterface />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24 md:py-32" aria-labelledby="visibility-title">
        <div className="shell">
          <p className="eyebrow mb-6">Measurement</p>
          <h2 id="visibility-title" className="display-md max-w-3xl">Visibility you can verify.</h2>
          <p className="lede mt-5">
            Every number in a Zenyro report names its source. This sample dashboard shows the kind of reporting we provide, using fictional data.
          </p>
          <div className="mt-12"><VisibilityDemo /></div>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-labelledby="industry-search-title">
        <div className="shell">
          <p className="eyebrow mb-6">By industry</p>
          <h2 id="industry-search-title" className="display-md max-w-3xl">Search growth for your sector.</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <li key={ind.slug} className="bg-ink">
                <Link href={`/industries/${ind.slug}#search-growth`} className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-ink-2">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{ind.name}</span>
                  <span className="text-[1.25rem] font-semibold leading-tight tracking-[-0.02em] group-hover:text-ember">{ind.search.title}</span>
                  <span className="text-[0.9rem] leading-relaxed text-muted">{ind.search.points[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq faqs={faqs} title="Search, answers and AI." />
      <ContactCta />
    </>
  );
}

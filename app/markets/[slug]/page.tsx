import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock, Search } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { LocalClock } from "@/components/markets/local-clock";
import { AiReadinessChecker } from "@/components/tools/ai-readiness-checker";
import { getMarket, markets } from "@/data/markets";
import { usStates } from "@/data/us-states";
import { uaeCities } from "@/data/uae-cities";
import { services } from "@/data/services";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getMarket((await params).slug);
  if (!m) return {};
  return buildMetadata({ title: m.metaTitle, description: m.metaDescription, path: `/markets/${m.slug}` });
}

export default async function MarketPage({ params }: Props) {
  const m = getMarket((await params).slug);
  if (!m) notFound();
  const path = `/markets/${m.slug}`;
  const name = `${["US", "UK", "UAE"].includes(m.code) ? "the " : ""}${m.country}`;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Markets", path: "/markets" }, { name: m.country, path }]}
        eyebrow={`${m.country} · SEO, AEO & GEO`}
        title={m.headline}
        intro={m.intro}
        aside={
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/free-audit">Get a free AI visibility audit</ButtonLink>
            <span className="inline-flex items-center gap-2 font-mono text-[0.78rem] text-muted"><Clock aria-hidden="true" className="size-3.5" />It&apos;s <LocalClock zone={m.zone} className="tabular-nums text-paper" /> in {m.city}</span>
          </div>
        }
      />

      <section className="py-20 md:py-28" aria-labelledby="landscape-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">The search landscape</p>
            <h2 id="landscape-title" className="display-md">How customers in {name} find a business.</h2>
          </div>
          <div className="prose-z lg:col-span-7">
            {m.landscape.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <ul className="not-prose mt-8 flex flex-wrap gap-2" aria-label="Where we get you found">
              {m.platforms.map((p) => <li key={p} className="rounded-md border border-line bg-ink-2 px-2.5 py-1 text-[0.82rem]">{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-20 md:py-28" aria-labelledby="services-title">
        <div className="shell">
          <p className="eyebrow mb-6">Services</p>
          <h2 id="services-title" className="display-md max-w-3xl">Everything you need to be found in {m.code}.</h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-ink p-6 transition-colors hover:border-ember/60">
                  <span className="text-[1.1rem] font-semibold tracking-[-0.02em]">{s.name}</span>
                  <span className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">{s.headline}</span>
                  <ArrowUpRight aria-hidden="true" className="mt-5 size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="searches-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Searches worth winning</p>
            <h2 id="searches-title" className="display-md">What customers type and ask.</h2>
            <p className="lede mt-6">Examples of searches and AI questions we build pages and answers for. Yours will depend on your business.</p>
          </div>
          <ul className="grid content-start gap-3 lg:col-span-7">
            {m.searches.map((q) => (
              <li key={q} className="flex items-center gap-3 rounded-2xl border border-line bg-ink-2 px-5 py-4 text-[1rem]">
                <Search aria-hidden="true" className="size-4 shrink-0 text-dim" />{q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28" aria-labelledby="check-title">
        <div className="shell">
          <p className="eyebrow mb-6">Free tool</p>
          <h2 id="check-title" className="display-md max-w-3xl">Can AI assistants read your website?</h2>
          <p className="lede mb-10 mt-6 max-w-2xl">Run our free AI readiness check: 17 signals, about ten seconds.</p>
          <AiReadinessChecker compact />
        </div>
      </section>

      {(m.slug === "united-states" || m.slug === "uae") && (
        <section className="border-t border-line py-16 md:py-24" aria-labelledby="states-title">
          <div className="shell">
            <p className="eyebrow mb-6">{m.slug === "uae" ? "Emirate guides" : "State guides"}</p>
            <h2 id="states-title" className="display-md max-w-3xl">SEO, AEO and GEO by {m.slug === "uae" ? "emirate" : "state"}.</h2>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(m.slug === "uae" ? uaeCities : usStates).map((st) => (
                <li key={st.slug}>
                  <Link href={`/markets/${m.slug}/${st.slug}`} className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-ember/60">
                    <span><span className="block font-medium">{st.name}</span><span className="block text-[0.8rem] text-muted">{st.cities.slice(0, 2).join(", ")}</span></span>
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-ember" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Faq faqs={m.faqs} title={`SEO in ${name}: questions.`} />
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `SEO, AEO & GEO for businesses in ${m.country}`,
          serviceType: "Search engine optimisation",
          description: m.metaDescription,
          url: absoluteUrl(path),
          areaServed: { "@type": "Country", name: m.country },
          provider: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check, Clock, Newspaper } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Icon3D, type Icon3DName } from "@/components/home/primitives";
import { LocalClock } from "@/components/markets/local-clock";
import { usStates, type UsState } from "@/data/us-states";
import { uaeCities, type UaeCity } from "@/data/uae-cities";
import { plans } from "@/data/pricing";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string; state: string }> };
type Region = UsState & Partial<Pick<UaeCity, "deepDive">>;

/** Regional pages per market: US states and UAE emirates share one template with market-specific pricing and wording. */
const MARKETS: Record<string, {
  country: string; regions: Region[]; others: string; kind: "State" | "City";
  money: (n: number) => string; priceKey: "USD" | "AED";
  priceRows: [string, string][]; priceNote: string;
  title: (r: Region) => string; costAnswer: (r: Region, g: string, a: string) => string;
}> = {
  "united-states": {
    country: "United States", regions: usStates, others: "Other US states", kind: "State",
    money: (n) => `US$${n.toLocaleString("en-US")}`, priceKey: "USD",
    priceRows: [["Typical agency in directories", "US$1,000 to $5,000 / month"], ["Average agency retainer", "About US$3,000 / month"]],
    priceNote: "Ranges from public agency directories and industry surveys; individual quotes vary.",
    title: (r) => `SEO, AEO & GEO Agency for ${r.name} Businesses`,
    costAnswer: (r, g, a) => `Agency directories commonly show US$1,000 to $5,000 a month for SEO and AI search work, and industry surveys put the average agency retainer around $3,000. Zenyro publishes its prices: Growth from ${g} and Authority from ${a} a month, covering SEO, AEO and GEO.`,
  },
  uae: {
    country: "United Arab Emirates", regions: uaeCities, others: "Other emirates", kind: "City",
    money: (n) => `AED ${n.toLocaleString("en-US")}`, priceKey: "AED",
    priceRows: [["Freelancer", "From about AED 4,000 / month"], ["Typical UAE agency", "AED 5,500 to 18,500 / month"], ["Full bilingual agency", "Up to about AED 25,000 / month"]],
    priceNote: "Ranges from published 2026 Dubai SEO pricing guides; genuine bilingual Arabic work often adds 20 to 30%.",
    title: (r) => `SEO Agency for ${r.name} Businesses: SEO, AEO & GEO`,
    costAnswer: (r, g, a) => `Published 2026 estimates put UAE SEO retainers at roughly AED 4,000 a month for a freelancer up to AED 25,000 for a full bilingual agency, with many between AED 5,500 and 18,500. Zenyro's plans are ${g} (Growth) and ${a} (Authority) a month, including AEO and GEO.`,
  },
};

const getRegion = (slug: string, state: string) => {
  const m = MARKETS[slug];
  const r = m?.regions.find((x) => x.slug === state);
  return m && r ? { m, s: r } : null;
};

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.entries(MARKETS).flatMap(([slug, m]) => m.regions.map((r) => ({ slug, state: r.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, state } = await params;
  const found = getRegion(slug, state);
  if (!found) return {};
  const { m, s } = found;
  return buildMetadata({
    title: m.title(s),
    description: `SEO, AEO and GEO for ${s.name} businesses in ${s.cities.slice(0, 3).join(", ")} and beyond: rank on Google, get recommended by AI. Plans from ${m.money(plans[0]!.price[m.priceKey])} a month.`.slice(0, 170),
    path: `/markets/${slug}/${s.slug}`,
  });
}

const engines: Icon3DName[] = ["chatgpt", "perplexity", "gemini", "claude", "globe"];

export default async function RegionPage({ params }: Props) {
  const { slug, state } = await params;
  const found = getRegion(slug, state);
  if (!found) notFound();
  const { m, s } = found;
  const path = `/markets/${slug}/${s.slug}`;
  const [growth, authority] = plans;
  const g = m.money(growth!.price[m.priceKey]);
  const a = m.money(authority!.price[m.priceKey]);

  const faqs = [
    ...(s.deepDive ?? []),
    { q: `Do you have an office in ${s.name}?`, a: `No. Zenyro is based in India and works remotely with ${s.name} businesses, with calls scheduled in ${s.zoneLabel}. Search engines and AI assistants rank your website and reputation, not your agency's address. We research ${s.name} competitors, directories and search behaviour directly.` },
    ...(s.deepDive ? [] : [{ q: `What is the best GEO or AEO agency in ${s.name}?`, a: `The best agency is the one that measures AI visibility with a fixed set of prompts across engines, explains its plan clearly and publishes or quotes transparent pricing. Ask any agency for a sample report showing mentions and citations by engine. Our [buyer's guide](/insights/how-to-choose-seo-aeo-geo-agency) lists the questions to ask.` }]),
    ...(s.deepDive ? [] : [{ q: `How much does SEO cost in ${s.name}?`, a: m.costAnswer(s, g, a) }]),
    { q: `Can you do local SEO for several ${s.name} locations?`, a: `Yes. Each location gets its own Google Business Profile optimisation and a location page with genuinely local detail, so you can rank in ${s.cities.slice(0, 3).join(", ")} and other metros you serve.` },
    s.faq,
  ];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Markets", path: "/markets" }, { name: m.country, path: `/markets/${slug}` }, { name: s.name, path }]}
        eyebrow={`${s.name} · SEO, AEO & GEO`}
        title={`SEO, AEO and GEO for ${s.name} businesses.`}
        intro={`Get found on Google and recommended by ChatGPT, Perplexity and Gemini in ${s.cities.slice(0, 3).join(", ")} and across ${s.name}, with a remote team working in ${s.zoneLabel} and prices you can see upfront.`}
        aside={
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/free-audit">Get a free AI visibility audit</ButtonLink>
            <span className="inline-flex items-center gap-2 font-mono text-[0.78rem] text-muted"><Clock aria-hidden="true" className="size-3.5" />It&apos;s <LocalClock zone={s.zone} className="tabular-nums text-paper" /> in {s.cities[0]}</span>
          </div>
        }
      />

      {/* Direct answer */}
      <section className="py-14 md:py-20" aria-labelledby="answer-title">
        <div className="shell">
          <div className="rounded-2xl border border-ember/30 bg-ember/[0.04] p-6 sm:p-8">
            <h2 id="answer-title" className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember">The short answer</h2>
            <p className="mt-4 max-w-4xl text-[1.15rem] leading-relaxed text-paper">
              To win customers in {s.name} through search in 2026, you need three things: pages that rank on Google for the searches people make in {s.cities.slice(0, 2).join(" and ")}, answers structured so Google&apos;s AI Overviews quote them, and a reputation on the sources AI assistants trust, such as {s.sources.slice(0, 2).join(" and ")}. Zenyro does all three as one programme, from {g} a month.
            </p>
          </div>
        </div>
      </section>

      {/* Landscape */}
      <section className="border-t border-line py-16 md:py-24" aria-labelledby="landscape-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">The {s.name} search landscape</p>
            <h2 id="landscape-title" className="display-md">How {s.name} customers find a business.</h2>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label={`Major ${s.name} markets`}>
              {s.cities.map((c) => <li key={c} className="rounded-md border border-line bg-ink-2 px-2.5 py-1 text-[0.85rem]">{c}</li>)}
            </ul>
          </div>
          <div className="prose-z lg:col-span-7">
            {s.landscape.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-t border-line bg-ink-2 py-16 md:py-24" aria-labelledby="industries-title">
        <div className="shell">
          <p className="eyebrow mb-6">Key sectors</p>
          <h2 id="industries-title" className="display-md max-w-3xl">Where search and AI visibility matter most in {s.name}.</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {s.industries.map((i) => (
              <li key={i.name}>
                <Link href={i.href ?? "/solutions"} className="group flex h-full flex-col rounded-2xl border border-line bg-ink p-6 transition-colors hover:border-ember/60">
                  <span className="flex items-center justify-between gap-3 text-[1.15rem] font-semibold tracking-[-0.02em]">{i.name}<ArrowUpRight aria-hidden="true" className="size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  <span className="mt-2 text-[0.92rem] leading-relaxed text-muted">{i.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prompts and sources */}
      <section className="border-t border-line py-16 md:py-24" aria-labelledby="prompts-title">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-6">What we&apos;d track</p>
            <h2 id="prompts-title" className="display-md">Questions {s.name} buyers ask AI.</h2>
            <ul className="mt-8 grid gap-3">
              {s.prompts.map((q, i) => (
                <li key={q} className="flex items-center gap-3 rounded-xl border border-line bg-ink px-3 py-3">
                  <Icon3D name={engines[i % engines.length]!} size={36} className="size-8 shrink-0" />
                  <span className="text-[0.95rem]">{q}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-6">Where AI looks</p>
            <h2 className="display-md">Sources that shape answers in {s.name}.</h2>
            <p className="mt-5 text-muted">AI assistants and buyers check these when deciding who to trust. We make sure your business is present and described consistently on the ones that matter for your category.</p>
            <ul className="mt-8 grid gap-2">
              {s.sources.map((src) => (
                <li key={src} className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 px-4 py-3 text-[0.95rem]"><Newspaper aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />{src}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing and choosing */}
      <section className="border-t border-line bg-ink-2 py-16 md:py-24" aria-labelledby="choose-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Pricing and choosing an agency</p>
            <h2 id="choose-title" className="display-md">How to choose an SEO, AEO or GEO agency in {s.name}.</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-ink">
              <table className="w-full text-left text-[0.92rem]">
                <tbody>
                  {m.priceRows.map(([k, v]) => (
                    <tr key={k} className="border-b border-line"><th scope="row" className="p-4 font-medium">{k}</th><td className="p-4 text-muted">{v}</td></tr>
                  ))}
                  <tr><th scope="row" className="p-4 font-medium text-ember">Zenyro</th><td className="p-4">{g} (Growth) or {a} (Authority) / month</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[0.8rem] text-dim">{m.priceNote}</p>
          </div>
          <div className="lg:col-span-7">
            <ol className="grid gap-3">
              {[
                ["Ask how they measure AI visibility", "Which prompts, which engines (ChatGPT, Perplexity, Gemini, AI Overviews), how often, and what the report shows."],
                ["Check they understand your market", `Do they know the ${s.name} directories, review sites and publications your buyers and AI assistants use?`],
                ["Look for a plan, not a package", "The first 90 days should come from an audit of your site and competitors, not a fixed list of deliverables."],
                ["Confirm ownership", "Search Console, analytics, Business Profiles and content should stay in your name."],
                ["Ask for prices in writing", "Many agencies only quote after a sales call. Compare scope, not just the monthly figure."],
                ["Avoid guarantees", "No one can guarantee rankings or ChatGPT mentions. Honest agencies say so."],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-4 rounded-2xl border border-line bg-ink p-5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ember/10 font-mono text-[0.78rem] text-ember">{i + 1}</span>
                  <span><span className="block font-semibold">{t}</span><span className="mt-1 block text-[0.92rem] leading-relaxed text-muted">{b}</span></span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem]">
              <Link href="/pricing" className="inline-flex items-center gap-1.5 font-medium"><span className="link-u">See full pricing</span><ArrowUpRight aria-hidden="true" className="size-4 text-ember" /></Link>
              <Link href="/insights/how-to-choose-seo-aeo-geo-agency" className="inline-flex items-center gap-1.5 text-muted hover:text-paper"><span className="link-u">Agency buyer&apos;s guide</span></Link>
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-line py-16 md:py-24" aria-labelledby="do-title">
        <div className="shell">
          <p className="eyebrow mb-6">What we do for {s.name} businesses</p>
          <h2 id="do-title" className="display-md max-w-3xl">One programme for Google and AI search.</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {[
              ["SEO", "Technical fixes, pages for every service and metro, and authority that moves Google rankings.", "/services/seo"],
              ["AEO", "Answer-first pages and structured data so AI Overviews and featured snippets quote you.", "/services/aeo"],
              ["GEO", "Prompt tracking across AI engines, consistent business facts and citations on the sources above.", "/services/geo"],
            ].map(([t, b, h]) => (
              <li key={t} className="bg-ink p-6">
                <p className="flex items-center gap-2 font-semibold"><Check aria-hidden="true" className="size-4 text-ember" />{t}</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{b}</p>
                <Link href={h!} className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-medium"><span className="link-u">{t} services</span><ArrowUpRight aria-hidden="true" className="size-3.5 text-ember" /></Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.92rem] text-muted">
            {m.others}: {m.regions.filter((x) => x.slug !== s.slug).map((x, i, arr) => (
              <span key={x.slug}><Link href={`/markets/${slug}/${x.slug}`} className="link-u text-paper">{x.name}</Link>{i < arr.length - 1 ? ", " : "."}</span>
            ))}
          </p>
        </div>
      </section>

      <Faq faqs={faqs} title={`SEO in ${s.name}: questions.`} />
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `SEO, AEO and GEO for ${s.name} businesses`,
          serviceType: "Search engine optimisation",
          url: absoluteUrl(path),
          areaServed: { "@type": m.kind, name: s.name, containedInPlace: { "@type": "Country", name: m.country } },
          provider: { "@id": `${site.url}/#organization` },
          offers: plans.map((p) => ({ "@type": "Offer", name: `${p.name} plan`, price: p.price[m.priceKey], priceCurrency: m.priceKey })),
        }}
      />
    </>
  );
}

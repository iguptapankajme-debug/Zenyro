import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check, Info, Newspaper } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Flag } from "@/components/ui/flag";
import { Icon3D, type Icon3DName } from "@/components/home/primitives";
import { GrowthChart } from "@/components/art/growth-chart";
import { Roadmap } from "@/components/art/roadmap";
import { getPlaybook, playbooks } from "@/data/playbooks";
import { getIndustry } from "@/data/industries";
import { plans, formatPrice } from "@/data/pricing";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return playbooks.map((p) => ({ slug: p.slug }));
}

const short = (name: string) => name.replace(/ &.*$/, "").replace(/ Companies$/, "");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPlaybook((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: `${short(p.industryName)} SEO, AEO & GEO in ${p.market.inName}: Playbook`,
    description: `How we'd grow a ${short(p.industryName).toLowerCase()} business in ${p.market.inName} on Google and AI search: target searches, a 12-week roadmap and the sources AI assistants cite.`,
    path: `/playbooks/${p.slug}`,
  });
}

const engines: Icon3DName[] = ["google", "chatgpt", "perplexity", "gemini", "bing", "claude", "copilot"];
const seedOf = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 997, 7);

export default async function PlaybookPage({ params }: Props) {
  const p = getPlaybook((await params).slug);
  if (!p) notFound();
  const ind = getIndustry(p.industrySlug)!;
  const m = p.market;
  const path = `/playbooks/${p.slug}`;
  const name = short(p.industryName);
  const [growth, authority] = plans;
  const steps = ind.system;
  const roadmap = [
    { label: steps[0] ?? "Audit and baseline", from: 1, to: 2 },
    { label: "Technical fixes and tracking", from: 2, to: 4 },
    { label: steps[1] ?? "Core pages", from: 3, to: 8 },
    { label: steps[2] ?? "Answer-first content", from: 5, to: 10 },
    { label: steps[3] ?? "Listings, mentions and citations", from: 6, to: 12 },
    { label: "Monthly reporting and AI visibility checks", from: 4, to: 12 },
  ];
  const sameIndustry = playbooks.filter((x) => x.industrySlug === p.industrySlug && x.slug !== p.slug);
  const sameMarket = playbooks.filter((x) => x.market.key === m.key && x.slug !== p.slug).slice(0, 6);

  const faqs = [
    { q: `How long does SEO take for a ${name.toLowerCase()} business in ${m.inName}?`, a: `Technical fixes and Google Business Profile improvements can show within weeks. Competitive rankings and consistent AI recommendations in ${m.cities.slice(0, 2).join(" and ")} usually take three to six months of steady work.` },
    { q: `How much does it cost?`, a: `Zenyro's plans cost ${formatPrice(growth!.price[m.currency], m.currency)} (Growth) or ${formatPrice(authority!.price[m.currency], m.currency)} (Authority) a month, covering SEO, AEO and GEO. No setup fee and no lock-in.` },
    { q: `Is this a case study?`, a: `No. It's an example playbook showing how we'd approach a ${name.toLowerCase()} business in ${m.inName}. The chart is illustrative and contains no client data. We publish real case studies only with client permission.` },
    ...ind.faqs.slice(0, 1),
  ];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Playbooks", path: "/playbooks" }, { name: `${name} · ${m.code}`, path }]}
        eyebrow={`Playbook · ${name} · ${m.name}`}
        title={`${name} SEO, AEO and GEO in ${m.inName}.`}
        intro={`An example 12-week plan for getting a ${name.toLowerCase()} business found on Google and recommended by AI assistants in ${m.cities.slice(0, 3).join(", ")} and across ${m.inName}.`}
        aside={
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Flag code={m.code} className="h-8 w-12" title={m.name} />
            <ButtonLink href="/free-audit">Get a free AI visibility audit</ButtonLink>
          </div>
        }
      />

      <div className="shell mt-10">
        <p className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 px-4 py-3 text-[0.88rem] text-muted">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />
          Example playbook: how we would approach this market. It is not a client case study, and the chart below is illustrative, not client data.
        </p>
      </div>

      <section className="py-16 md:py-20" aria-labelledby="context-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">The market</p>
            <h2 id="context-title" className="display-md">What makes {name.toLowerCase()} search different in {m.inName}.</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="lede">{p.note}</p>
            <ul className="mt-8 border-t border-line">
              {ind.challenges.map((c) => <li key={c} className="flex gap-4 border-b border-line py-4"><span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ember" />{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-16 md:py-20" aria-labelledby="searches-title">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-6">Target searches and prompts</p>
            <h2 id="searches-title" className="display-md">What {m.inName} customers search and ask.</h2>
            <ul className="mt-8 grid gap-3">
              {p.searches.map((q, i) => (
                <li key={q} className="flex items-center gap-3 rounded-xl border border-line bg-ink px-3 py-3">
                  <Icon3D name={engines[i % engines.length]!} size={36} className="size-8 shrink-0" />
                  <span className="text-[0.95rem]">{q}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-6">Where AI looks</p>
            <h2 className="display-md">Sources to win in {m.inName}.</h2>
            <ul className="mt-8 grid gap-2">
              {p.sources.map((s) => <li key={s} className="flex items-start gap-3 rounded-xl border border-line bg-ink px-4 py-3"><Newspaper aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />{s}</li>)}
              <li className="flex items-start gap-3 rounded-xl border border-line bg-ink px-4 py-3"><Newspaper aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />Your own site: answer-first service, location and FAQ pages with structured data</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-20" aria-labelledby="roadmap-title">
        <div className="shell">
          <p className="eyebrow mb-6">The plan</p>
          <h2 id="roadmap-title" className="display-md max-w-3xl">A 12-week roadmap.</h2>
          <Roadmap rows={roadmap} className="mt-10" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {ind.solutions.map((s) => (
              <li key={s.title} className="rounded-2xl border border-line bg-ink-2 p-6">
                <p className="flex items-center gap-2 font-semibold"><Check aria-hidden="true" className="size-4 text-ember" />{s.title}</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-20" aria-labelledby="measure-title">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">How we measure</p>
            <h2 id="measure-title" className="display-md">Progress you can see.</h2>
            <ul className="mt-6 grid gap-3 text-[0.95rem]">
              {["Rankings for the target searches above", "Clicks and impressions in Search Console", "AI mentions and citations by prompt and engine", `Enquiries from ${m.cities[0]} and beyond`].map((t) => (
                <li key={t} className="flex gap-2.5"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8"><GrowthChart seed={seedOf(p.slug)} /></div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-16" aria-labelledby="more-title">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="more-title" className="text-[1.3rem] font-semibold">{name} in other markets</h2>
            <ul className="mt-5 grid gap-2">
              {sameIndustry.map((x) => (
                <li key={x.slug}><Link href={`/playbooks/${x.slug}`} className="inline-flex items-center gap-2 font-medium"><Flag code={x.market.code} className="h-3.5 w-5" /><span className="link-u">{name} in {x.market.inName}</span><ArrowUpRight aria-hidden="true" className="size-3.5 text-ember" /></Link></li>
              ))}
              <li><Link href={`/industries/${p.industrySlug}`} className="inline-flex items-center gap-2 text-muted hover:text-paper"><span className="link-u">{p.industryName}: our approach</span></Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-[1.3rem] font-semibold">Other playbooks in {m.inName}</h2>
            <ul className="mt-5 grid gap-2">
              {sameMarket.map((x) => (
                <li key={x.slug}><Link href={`/playbooks/${x.slug}`} className="inline-flex items-center gap-2"><span className="link-u">{short(x.industryName)}</span><ArrowUpRight aria-hidden="true" className="size-3.5 text-ember" /></Link></li>
              ))}
              <li><Link href={`/markets/${m.marketSlug}`} className="inline-flex items-center gap-2 text-muted hover:text-paper"><span className="link-u">SEO, AEO and GEO in {m.inName}</span></Link></li>
            </ul>
          </div>
        </div>
      </section>

      <Faq faqs={faqs} title="Questions about this playbook." />
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${name} SEO, AEO and GEO in ${m.inName}: a 12-week playbook`,
          description: p.note,
          url: absoluteUrl(path),
          about: [{ "@type": "Thing", name: p.industryName }, { "@type": "Country", name: m.name }],
          author: { "@type": "Organization", name: `${site.name} search team`, url: site.url },
          publisher: { "@id": `${site.url}/#organization` },
          datePublished: "2026-11-11",
        }}
      />
    </>
  );
}

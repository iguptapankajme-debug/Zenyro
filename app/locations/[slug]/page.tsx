import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, MessageSquareText, Search, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { ProjectGrid } from "@/components/sections/project-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { getLocation, locations } from "@/data/locations";
import { getIndustry } from "@/data/industries";
import { work } from "@/data/work";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getLocation((await params).slug);
  if (!l) return {};
  return buildMetadata({ title: l.metaTitle, description: l.metaDescription, path: `/locations/${l.slug}` });
}

const pillars = [
  { icon: Search, title: "Found in search and Maps", body: "A fast website and complete Google Business Profile, built around the searches local customers make.", href: "/services/local-seo", link: "Local SEO services" },
  { icon: Sparkles, title: "Named in AI answers", body: "Clear, consistent information that ChatGPT, Perplexity and Google AI Overviews can find, cite and describe accurately.", href: "/services/geo", link: "GEO for AI search" },
  { icon: MessageSquareText, title: "Answered in minutes", body: "Every enquiry from search, ads or social gets an instant WhatsApp reply, qualification and a booked appointment or visit.", href: "/services/ai-automation", link: "WhatsApp and AI automation" },
];

export default async function LocationPage({ params }: Props) {
  const l = getLocation((await params).slug);
  if (!l) notFound();
  const sectors = l.sectors.map(getIndustry).filter((x) => !!x);
  const projects = work.filter((w) => l.work?.includes(w.slug));
  const path = `/locations/${l.slug}`;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", path: "/locations" }, { name: l.city, path }]}
        eyebrow={`${l.city} · ${l.region}`}
        title={l.headline}
        intro={l.intro}
        aside={
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/free-audit">Get a free local audit</ButtonLink>
          </div>
        }
      />

      <section className="py-20 md:py-28" aria-labelledby="market-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">The {l.city} market</p>
            <h2 id="market-title" className="display-md">How customers in {l.city} choose.</h2>
          </div>
          <div className="prose-z lg:col-span-7">
            {l.market.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-20 md:py-28" aria-labelledby="pillars-title">
        <div className="shell">
          <p className="eyebrow mb-6">What we build</p>
          <h2 id="pillars-title" className="display-md max-w-3xl">One system for {l.city} businesses: found, chosen, booked.</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.title} className="bg-ink-2 p-8" data-reveal>
                <p.icon aria-hidden="true" className="size-6 text-ember" />
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                <Link href={p.href} className="mt-5 inline-flex items-center gap-1.5 text-[0.9rem]">
                  <span className="link-u">{p.link}</span> <ArrowUpRight aria-hidden="true" className="size-3.5 text-ember" />
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
            <h2 id="searches-title" className="display-md">What {l.city} customers type and ask.</h2>
            <p className="lede mt-6">Examples of the searches and AI questions we build pages and answers for. Yours will depend on your business.</p>
          </div>
          <ul className="grid content-start gap-3 lg:col-span-7">
            {l.searches.map((q) => (
              <li key={q} className="flex items-center gap-3 rounded-2xl border border-line bg-ink-2 px-5 py-4 text-[1rem]" data-reveal>
                <Search aria-hidden="true" className="size-4 shrink-0 text-dim" />{q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {sectors.length > 0 && (
        <section className="border-t border-line py-20 md:py-28" aria-labelledby="sectors-title">
          <div className="shell">
            <p className="eyebrow mb-6">Sectors</p>
            <h2 id="sectors-title" className="display-md max-w-3xl">Growth systems for {l.city}&apos;s key sectors.</h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link href={`/industries/${s.slug}`} className="group flex h-full flex-col rounded-2xl border border-line p-6 transition-colors hover:border-ember/60">
                    <span className="text-[1.1rem] font-semibold tracking-[-0.02em]">{s.name}</span>
                    <span className="mt-2 flex-1 text-[0.9rem] text-muted">{s.short}</span>
                    <ArrowUpRight aria-hidden="true" className="mt-5 size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="border-t border-line py-20 md:py-28" aria-labelledby="local-work-title">
          <div className="shell">
            <p className="eyebrow mb-6">Live work</p>
            <h2 id="local-work-title" className="display-md mb-12 max-w-3xl">Projects serving this area.</h2>
            <ProjectGrid items={projects} headingLevel="h3" />
          </div>
        </section>
      )}

      <Faq faqs={l.faqs} title={`Working with Zenyro in ${l.city}.`} />
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: `${site.name}: ${l.metaTitle}`,
          description: l.metaDescription,
          url: absoluteUrl(path),
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "City", name: l.city, containedInPlace: { "@type": "AdministrativeArea", name: l.region } },
        }}
      />
    </>
  );
}

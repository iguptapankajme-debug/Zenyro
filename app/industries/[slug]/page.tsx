import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { LinkList } from "@/components/sections/link-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { IndustryArt } from "@/components/ui/industry-art";
import { JsonLd } from "@/components/ui/json-ld";
import { getIndustry, industries } from "@/data/industries";
import { getService } from "@/data/services";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { consultationHref } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return buildMetadata({ title: i.metaTitle, description: i.metaDescription, path: `/industries/${i.slug}` });
}

export default async function IndustryPage({ params }: Props) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const svc = ind.services.map(getService).filter((x) => !!x);
  const others = industries.filter((i) => i.slug !== ind.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Solutions", path: "/solutions" }, { name: ind.name, path: `/industries/${ind.slug}` }]}
        eyebrow={`Industry · ${ind.short}`}
        title={ind.headline}
        intro={ind.intro}
        aside={<div className="mt-8"><ButtonLink href={consultationHref}>Plan your growth system</ButtonLink></div>}
      />

      <section className="py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="overflow-hidden rounded-[1.75rem] border border-line lg:col-span-5">
            <div className="aspect-[4/3]"><IndustryArt art={ind.art} /></div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">The challenge</p>
            <h2 className="display-md">What holds {ind.name.toLowerCase()} businesses back.</h2>
            <ul className="mt-10 border-t border-line">
              {ind.challenges.map((c) => (
                <li key={c} className="flex gap-4 border-b border-line py-5 text-[1.05rem]" data-reveal>
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ember" />{c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24 md:py-32" aria-labelledby="solutions">
        <div className="shell">
          <p className="eyebrow mb-6">What we build</p>
          <h2 id="solutions" className="display-md max-w-3xl">Growth solutions for {ind.name.toLowerCase()}.</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
            {ind.solutions.map((s) => (
              <div key={s.title} className="bg-ink-2 p-8 md:p-10" data-reveal>
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h3 className="eyebrow mb-8">A typical system, in order</h3>
            <ol className="flex flex-col gap-3 md:flex-row md:items-stretch">
              {ind.system.map((step, i) => (
                <li key={step} className="relative flex flex-1 items-center gap-3 rounded-2xl border border-line bg-ink p-5 md:flex-col md:items-start">
                  <span className="font-mono text-[0.7rem] text-ember">0{i + 1}</span>
                  <span className="text-[0.95rem]">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[0.9rem] text-muted">
              Channels we usually connect: {ind.channels.join(", ")}.
            </p>
          </div>
        </div>
      </section>

      <section id="search-growth" className="scroll-mt-24 py-24 md:py-32" aria-labelledby="industry-search">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Search growth · SEO, AEO &amp; GEO</p>
            <h2 id="industry-search" className="display-md">{ind.search.title}</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="lede">{ind.search.body}</p>
            <ul className="mt-8 border-t border-line">
              {ind.search.points.map((pt) => (
                <li key={pt} className="flex gap-4 border-b border-line py-4"><span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ember" />{pt}</li>
              ))}
            </ul>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem]">
              <Link href="/services/seo" className="link-u">SEO services</Link>
              <Link href="/services/aeo" className="link-u">Answer engine optimization</Link>
              <Link href="/services/geo" className="link-u">Generative engine optimization</Link>
            </p>
          </div>
        </div>
      </section>

      <Faq faqs={ind.faqs} title={`${ind.name}: common questions.`} />
      <LinkList eyebrow="Services in this system" items={svc.map((s) => ({ title: s.name, body: s.headline, href: `/services/${s.slug}`, meta: "Service" }))} />
      <LinkList eyebrow="Other industries" items={others.map((o) => ({ title: o.name, body: o.headline, href: `/industries/${o.slug}`, meta: "Industry" }))} />
      <ContactCta />
      <JsonLd data={serviceSchema({ name: `Growth systems for ${ind.name}`, description: ind.metaDescription, path: `/industries/${ind.slug}`, serviceType: "Digital marketing and sales automation" })} />
    </>
  );
}

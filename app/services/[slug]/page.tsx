import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { LinkList } from "@/components/sections/link-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { disciplines, getService, services } from "@/data/services";
import { industries } from "@/data/industries";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { consultationHref } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const d = disciplines[s.discipline];
  const related = s.related.map(getService).filter((x) => !!x);
  const sectors = industries.filter((i) => i.services.includes(s.slug));

  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }]}
        eyebrow={`${d.index} ${d.title} · ${s.name}`}
        title={s.headline}
        intro={s.intro}
        aside={<div className="mt-8"><ButtonLink href={consultationHref}>Discuss your project</ButtonLink></div>}
      />

      <section className="py-24 md:py-32" aria-labelledby="problems">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">Sound familiar?</p>
            <h2 id="problems" className="display-md">What {s.name} should fix.</h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {s.problems.map((p) => (
              <li key={p} className="bg-ink p-7 text-[1.1rem] leading-snug tracking-[-0.01em]" data-reveal>
                <span aria-hidden="true" className="mb-4 block font-mono text-ember">“</span>{p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24 md:py-32" aria-labelledby="included">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">What&apos;s included</p>
            <h2 id="included" className="display-md">What we do for you.</h2>
          </div>
          <dl className="lg:col-span-8">
            {s.included.map((it) => (
              <div key={it.title} className="grid gap-2 border-b border-line py-7 first:border-t md:grid-cols-8 md:gap-8" data-reveal>
                <dt className="text-[1.2rem] font-medium tracking-[-0.015em] md:col-span-3">{it.title}</dt>
                <dd className="leading-relaxed text-muted md:col-span-5">{it.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-labelledby="approach">
        <div className="shell">
          <p className="eyebrow mb-6">How it runs</p>
          <h2 id="approach" className="display-md max-w-2xl">From kickoff to compounding results.</h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {s.approach.map((a, i) => (
              <li key={a.title} className="border-t border-ember pt-6" data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
                <span className="font-mono text-[0.75rem] text-ember">0{i + 1}</span>
                <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.02em]">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{a.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-20 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-line p-8">
              <h3 className="eyebrow mb-6">What you receive</h3>
              <ul className="grid gap-3">
                {s.deliverables.map((x) => <li key={x} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ember" />{x}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl border border-line p-8">
              <h3 className="eyebrow mb-6">A good fit for</h3>
              <ul className="grid gap-3">
                {s.fitFor.map((x) => <li key={x} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-line-2" />{x}</li>)}
              </ul>
              {sectors.length > 0 && (
                <p className="mt-6 border-t border-line pt-6 text-[0.9rem] text-muted">
                  Often part of our systems for{" "}
                  {sectors.map((i, k) => (
                    <span key={i.slug}>
                      <a href={`/industries/${i.slug}`} className="link-u text-paper">{i.name}</a>
                      {k < sectors.length - 2 ? ", " : k === sectors.length - 2 ? " and " : "."}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Faq faqs={s.faqs} />
      <LinkList
        eyebrow="Works well with"
        items={related.map((r) => ({ title: r.name, body: r.headline, href: `/services/${r.slug}`, meta: disciplines[r.discipline].title }))}
      />
      <ContactCta />
      <JsonLd data={serviceSchema({ name: s.name, description: s.metaDescription, path: `/services/${s.slug}`, serviceType: s.serviceType })} />
    </>
  );
}

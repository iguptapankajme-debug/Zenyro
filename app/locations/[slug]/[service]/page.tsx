import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check, Search } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { getLocalService, localServices } from "@/data/local-services";
import { getLocation } from "@/data/locations";
import { getService } from "@/data/services";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string; service: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return localServices.map((l) => ({ slug: l.city, service: l.service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, service } = await params;
  const ls = getLocalService(slug, service);
  if (!ls) return {};
  return buildMetadata({ title: ls.metaTitle, description: ls.metaDescription, path: `/locations/${slug}/${service}` });
}

export default async function LocalServicePage({ params }: Props) {
  const { slug, service } = await params;
  const ls = getLocalService(slug, service);
  const loc = getLocation(slug);
  const svc = getService(service);
  if (!ls || !loc || !svc) notFound();
  const path = `/locations/${slug}/${service}`;
  const siblings = localServices.filter((x) => x.city === slug && x.service !== service);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", path: "/locations" }, { name: loc.city, path: `/locations/${slug}` }, { name: svc.name, path }]}
        eyebrow={`${svc.name} · ${loc.city}`}
        title={ls.h1}
        intro={ls.intro}
        aside={
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/free-audit">Get a free audit</ButtonLink>
          </div>
        }
      />

      <section className="py-20 md:py-28" aria-labelledby="angle-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">{svc.name} in {loc.city}</p>
            <h2 id="angle-title" className="display-md">What works locally.</h2>
          </div>
          <div className="prose-z lg:col-span-7">
            {ls.angle.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-20 md:py-28" aria-labelledby="included-title">
        <div className="shell">
          <p className="eyebrow mb-6">What&apos;s included</p>
          <h2 id="included-title" className="display-md max-w-3xl">{svc.headline}</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
            {svc.included.map((it) => (
              <li key={it.title} className="flex gap-4 bg-ink-2 p-7" data-reveal>
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-ember" />
                <span>
                  <span className="block text-[1.1rem] font-semibold tracking-[-0.02em]">{it.title}</span>
                  <span className="mt-2 block leading-relaxed text-muted">{it.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href={`/services/${svc.slug}`} className="mt-8 inline-flex items-center gap-2 font-medium">
            <span className="link-u">Full details of our {svc.name} service</span> <ArrowUpRight aria-hidden="true" className="size-4 text-ember" />
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="local-searches-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Searches we target</p>
            <h2 id="local-searches-title" className="display-md">How {loc.city} customers look for this.</h2>
          </div>
          <ul className="grid content-start gap-3 lg:col-span-7">
            {ls.searches.map((q) => (
              <li key={q} className="flex items-center gap-3 rounded-2xl border border-line bg-ink-2 px-5 py-4 text-[1rem]" data-reveal>
                <Search aria-hidden="true" className="size-4 shrink-0 text-dim" />{q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {siblings.length > 0 && (
        <nav aria-label={`More services in ${loc.city}`} className="border-t border-line py-14">
          <div className="shell">
            <p className="eyebrow mb-6">More in {loc.city}</p>
            <ul className="flex flex-wrap gap-3">
              {siblings.map((x) => {
                const s = getService(x.service);
                return s ? (
                  <li key={x.service}>
                    <Link href={`/locations/${slug}/${x.service}`} className="inline-flex items-center gap-2 rounded-full border border-line-2 px-4 py-2.5 text-[0.9rem] transition-colors hover:border-ember">
                      {s.name} in {loc.city} <ArrowUpRight aria-hidden="true" className="size-3.5 text-ember" />
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </nav>
      )}

      <Faq faqs={[ls.faq, ...svc.faqs.slice(0, 3)]} title={`${svc.name} in ${loc.city}: questions.`} />
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${svc.name} in ${loc.city}`,
          serviceType: svc.serviceType,
          description: ls.metaDescription,
          url: absoluteUrl(path),
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "City", name: loc.city },
        }}
      />
    </>
  );
}

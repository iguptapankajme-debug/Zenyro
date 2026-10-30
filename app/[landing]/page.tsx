import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/sections/faq";
import { LinkList } from "@/components/sections/link-grid";
import { GrowthEngine } from "@/components/sections/growth-engine";
import { ContactCta } from "@/components/sections/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { getLanding, landingPages } from "@/data/landing";
import { getService } from "@/data/services";
import { getIndustry } from "@/data/industries";
import { RelevantTools } from "@/components/tools/relevant-tools";
import Link from "next/link";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { consultationHref } from "@/lib/site";

type Props = { params: Promise<{ landing: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return landingPages.map((p) => ({ landing: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getLanding((await params).landing);
  if (!p) return {};
  return buildMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/${p.slug}` });
}

export default async function LandingPage({ params }: Props) {
  const p = getLanding((await params).landing);
  if (!p) notFound();
  const svc = p.services.map(getService).filter((x) => !!x);

  return (
    <>
      <PageHero
        crumbs={[{ name: p.eyebrow.split(" · ")[0]!, path: `/${p.slug}` }]}
        eyebrow={p.eyebrow}
        title={p.headline}
        intro={p.intro}
        aside={<div className="mt-8"><ButtonLink href={consultationHref}>Book a Growth Consultation</ButtonLink></div>}
      />

      <section className="py-24 md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="prose-z lg:col-span-7">
            {p.sections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((b) => <p key={b}>{b}</p>)}
              </div>
            ))}
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-ink-2 p-8 lg:sticky lg:top-28">
              <h2 className="text-[1.3rem] font-semibold tracking-[-0.02em]">{p.checklist.heading}</h2>
              <ul className="mt-6 border-t border-line">
                {p.checklist.items.map((it) => (
                  <li key={it} className="flex gap-3 border-b border-line py-4 text-[0.95rem]">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />{it}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {p.tools && <RelevantTools keys={p.tools} />}
      {!p.tools && <GrowthEngine />}
      {p.industry && getIndustry(p.industry) && (
        <section className="border-t border-line py-16">
          <div className="shell flex flex-wrap items-center justify-between gap-4">
            <p className="text-[1.2rem] font-medium">Need more than a website? See the full growth system for {getIndustry(p.industry)!.name.toLowerCase()}.</p>
            <Link href={`/industries/${p.industry}`} className="link-u text-ember">Explore {getIndustry(p.industry)!.name}</Link>
          </div>
        </section>
      )}
      <Faq faqs={p.faqs} />
      <LinkList eyebrow="Related services" items={svc.map((s) => ({ title: s.name, body: s.headline, href: `/services/${s.slug}`, meta: "Service" }))} />
      <ContactCta />
      <JsonLd data={serviceSchema({ name: p.metaTitle, description: p.metaDescription, path: `/${p.slug}`, serviceType: p.eyebrow.split(" · ")[0]! })} />
    </>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { Em } from "@/components/ui/section-heading";
import { tools } from "@/data/tools";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Website & SEO Tools for Businesses",
  description: "Free tools from Zenyro: estimate your website cost, audit a page's SEO, and generate a website development brief. No sign-up required.",
  path: "/tools",
});

function Preview({ slug }: { slug: string }) {
  if (slug === "website-cost-calculator") {
    return (
      <div className="tool-preview flex h-full flex-col justify-center gap-4 p-8" aria-hidden="true">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">Estimated budget</span>
        <span className="text-[2.2rem] font-semibold tracking-[-0.04em]">₹1.2L – ₹2.6L</span>
        <div className="grid gap-2">
          {[34, 52, 78, 46].map((w, i) => <span key={i} className="tp-bar h-2 rounded-full bg-ember" style={{ width: `${w}%`, marginLeft: `${i * 12}%`, animationDelay: `${i * 140}ms` }} />)}
        </div>
      </div>
    );
  }
  if (slug === "seo-audit") {
    return (
      <div className="tool-preview grid h-full content-center gap-2.5 p-8" aria-hidden="true">
        {[["Title tag", "pass"], ["Canonical URL", "pass"], ["Image dimensions", "warn"], ["XML sitemap", "fail"], ["Structured data", "pass"]].map(([t, s], i) => (
          <span key={t} className="tp-row flex items-center justify-between rounded-xl border border-line bg-ink px-4 py-2.5 text-[0.82rem]" style={{ animationDelay: `${i * 120}ms` }}>
            {t}<span className={s === "pass" ? "text-emerald-400" : s === "warn" ? "text-amber-300" : "text-red-400"}>{s === "pass" ? "Pass" : s === "warn" ? "Improve" : "Fix"}</span>
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="tool-preview grid h-full content-center gap-3 p-8" aria-hidden="true">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">Website brief</span>
      {[90, 70, 82, 55, 76, 40].map((w, i) => <span key={i} className={`tp-bar h-2.5 rounded ${i === 0 ? "bg-paper" : "bg-line-2"}`} style={{ width: `${w}%`, animationDelay: `${i * 110}ms` }} />)}
      <span className="mt-2 inline-flex w-fit rounded-full bg-ember/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ember">Complexity: Medium</span>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Tools", path: "/tools" }]}
        eyebrow="Free tools"
        title={<>Plan smarter. <Em>Before you spend.</Em></>}
        intro="Professional planning tools for business owners. Free, fast and useful without sign-up."
      />
      <section className="py-16 md:py-24" aria-label="Tools">
        <div className="shell grid gap-6">
          {tools.map((t, i) => (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="group grid overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 transition-colors hover:border-line-2 lg:grid-cols-12" data-reveal={i > 0 ? "" : undefined}>
              <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-7">
                <div>
                  <p className="font-mono text-[0.7rem] text-ember">0{i + 1}</p>
                  <h2 className="mt-4 text-[clamp(2.2rem,5vw,4.4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]">{t.name}</h2>
                  <p className="mt-5 text-[1.2rem] font-medium tracking-[-0.015em]">{t.tagline}</p>
                  <p className="mt-2 max-w-lg text-muted">{t.description}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2">{t.facts.map((f) => <li key={f} className="rounded-full border border-line-2 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">{f}</li>)}</ul>
                  <span className="inline-flex items-center gap-2 font-medium text-ember">Open tool <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </div>
              </div>
              <div className="min-h-[16rem] border-t border-line bg-[#050608] grain lg:col-span-5 lg:border-l lg:border-t-0">
                <Preview slug={t.slug} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Zenyro free tools",
          itemListElement: tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: absoluteUrl(`/tools/${t.slug}`) })),
        }}
      />
    </>
  );
}

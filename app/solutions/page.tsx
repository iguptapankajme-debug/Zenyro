import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { Icon3D } from "@/components/home/primitives";
import { Em } from "@/components/ui/section-heading";
import { industries } from "@/data/industries";
import { industryAsks } from "@/data/industry-asks";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO by Industry: Search Programmes by Sector",
  description:
    "SEO, AEO and GEO programmes for real estate, hospitality, healthcare, interior design, education, home improvement, travel and financial services.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/solutions" }]}
        eyebrow="Industries"
        title={<>Search growth, <Em>sector by sector.</Em></>}
        intro="Every sector searches differently. These are the SEO, AEO and GEO programmes we run for eight industries where a single customer is worth a real conversation."
      />
      <section className="py-16 md:py-24" aria-label="Industries">
        <div className="shell">
          <ul className="grid gap-5 md:grid-cols-2">
            {industries.map((ind, n) => (
              <li key={ind.slug} className="min-w-0">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-line bg-ink p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/50 hover:shadow-[0_30px_60px_-40px_rgba(21,94,239,.45)] sm:p-8"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span>
                      <span className="font-mono text-[0.7rem] text-ember">{String(n + 1).padStart(2, "0")}</span>
                      <span className="mt-2 block text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">{ind.name}</span>
                      <span className="mt-1 block text-[0.9rem] text-muted">{ind.short}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-6 grid min-w-0 gap-2">
                    {(industryAsks[ind.slug] ?? []).slice(0, 2).map(([icon, q]) => (
                      <span key={q} className="flex min-w-0 items-center gap-2.5 rounded-xl border border-line bg-ink-2 px-2.5 py-2 text-[0.88rem]">
                        <Icon3D name={icon} size={28} className="size-7 shrink-0" />
                        <span className="min-w-0 truncate">{q}</span>
                      </span>
                    ))}
                  </span>
                  <span className="mt-6 grid flex-1 gap-2 border-t border-dashed border-line-2 pt-5 text-[0.9rem]">
                    {ind.solutions.slice(0, 3).map((s) => (
                      <span key={s.title} className="flex gap-2.5"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />{s.title}</span>
                    ))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

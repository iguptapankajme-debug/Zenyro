import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { IndustryArt } from "@/components/ui/industry-art";
import { Em } from "@/components/ui/section-heading";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata = buildMetadata({
  title: "Industry Solutions: Growth Systems by Sector",
  description:
    "Growth systems designed for real estate, hospitality, healthcare, interior design and premium retail, education and professional services, and home improvement.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Solutions", path: "/solutions" }]}
        eyebrow="Industry solutions"
        title={<>Built for businesses <Em>ready to scale.</Em></>}
        intro="Every sector buys differently. These are the growth systems we design for six industries where a single customer is worth a real conversation."
      />
      <section className="py-20 md:py-28">
        <div className="shell grid gap-6">
          {industries.map((ind, i) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="group grid overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 transition-colors hover:border-line-2 md:grid-cols-12"
              data-reveal
            >
              <div className={cn("relative aspect-[16/9] overflow-hidden border-b border-line md:col-span-5 md:aspect-auto md:min-h-[18rem] md:border-b-0", i % 2 ? "md:order-2 md:border-l" : "md:border-r")}>
                <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"><IndustryArt art={ind.art} /></div>
              </div>
              <div className="flex flex-col justify-between gap-8 p-7 sm:p-10 md:col-span-7">
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">{ind.short}</p>
                  <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em]">{ind.name}</h2>
                  <p className="mt-4 max-w-xl text-[1.05rem] text-paper">{ind.headline}</p>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{ind.challenges[0]}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-ember">
                  See the growth system <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}

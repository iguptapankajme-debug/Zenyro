import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { Flag } from "@/components/ui/flag";
import { playbookMarkets, playbooks } from "@/data/playbooks";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO, AEO & GEO Playbooks by Industry and Market",
  description: `${playbooks.length} example playbooks for getting found on Google and recommended by AI in the US, UK and UAE, by industry: target searches, 12-week roadmaps and sources.`,
  path: "/playbooks",
});

export default function PlaybooksPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Playbooks", path: "/playbooks" }]}
        eyebrow="Playbooks"
        title={<>How we&apos;d win <Em>your market.</Em></>}
        intro={`${playbooks.length} example strategies, one for each industry in the US, UK and UAE. Each shows the searches to win, a 12-week roadmap and the sources AI assistants cite. Examples, not client case studies.`}
      />
      {playbookMarkets.map((m) => (
        <section key={m.key} className="border-b border-line py-14 md:py-20" aria-labelledby={`pb-${m.key}`}>
          <div className="shell">
            <h2 id={`pb-${m.key}`} className="flex items-center gap-3 text-[clamp(1.6rem,2.8vw,2.3rem)] font-semibold tracking-[-0.03em]">
              <Flag code={m.code} className="h-7 w-10" />{m.name}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {playbooks.filter((p) => p.market.key === m.key).map((p) => (
                <li key={p.slug}>
                  <Link href={`/playbooks/${p.slug}`} className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-ink px-5 py-4 transition-colors hover:border-ember/60">
                    <span className="font-medium">{p.industryName}</span>
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <ContactCta />
    </>
  );
}

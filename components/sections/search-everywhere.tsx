import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { SearchInterface } from "@/components/search/search-interface";

/** Compact homepage section: one statement, one interactive search window, one CTA. */
export function SearchEverywhere() {
  return (
    <section className="border-t border-line py-28 md:py-36" aria-labelledby="search-title">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="min-w-0 lg:col-span-5">
          <p className="eyebrow mb-6">SEO · AEO · GEO</p>
          <h2 id="search-title" className="text-[clamp(2.7rem,4.6vw,5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em]">
            Search <span className="text-ember">everywhere.</span>
          </h2>
          <p className="mt-6 text-[1.35rem] font-medium tracking-[-0.02em]">Built for Google. Ready for AI discovery.</p>
          <ul className="mt-8 grid gap-3 border-t border-line pt-6 text-[0.95rem]">
            <li><Link href="/services/seo" className="link-u"><span className="font-mono text-ember">SEO</span>: rank where customers search</Link></li>
            <li><Link href="/services/aeo" className="link-u"><span className="font-mono text-ember">AEO</span>: become the answer</Link></li>
            <li><Link href="/services/geo" className="link-u"><span className="font-mono text-ember">GEO</span>: get discovered in AI search</Link></li>
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/free-audit" size="lg">Get a Free AI Search Audit</ButtonLink>
            <ButtonLink href="/search-growth" variant="ghost" icon="up-right" size="lg">Explore Search Growth</ButtonLink>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <SearchInterface />
        </div>
      </div>
    </section>
  );
}

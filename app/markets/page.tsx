import { PageHero } from "@/components/layout/page-hero";
import { MarketCards } from "@/components/markets/market-cards";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "International SEO, AEO & GEO: US, UK, UAE, Canada, Australia, Singapore",
  description: "Zenyro works with businesses worldwide to rank on Google and get recommended by ChatGPT, Perplexity and Gemini. A remote team with calls in your working hours.",
  path: "/markets",
});

export default function MarketsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Markets", path: "/markets" }]}
        eyebrow="International"
        title={<>One team. <Em>Every market.</Em></>}
        intro="We're based in India and work remotely with businesses around the world, in their language and their working hours. Pick your market to see how search and AI work there."
      />
      <section className="py-20 md:py-28" aria-label="Markets">
        <div className="shell"><MarketCards /></div>
      </section>
      <ContactCta />
    </>
  );
}

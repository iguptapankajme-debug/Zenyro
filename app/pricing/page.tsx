import { Check, Minus } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";
import { plans, typicalAgencyRetainerUSD } from "@/data/pricing";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Pricing: SEO, AEO & GEO Plans from $799 a Month",
  description: "Two clear monthly plans for SEO, AEO and GEO: Growth from $799 and Authority from $1,799 a month. No setup fee, month to month, priced in your currency.",
  path: "/pricing",
});

const rows: [string, string | boolean, string | boolean][] = [
  ["Monthly fee", "From $799", `$${typicalAgencyRetainerUSD.toLocaleString("en-US")}+ on average`],
  ["Setup fee", "None", "Often one month's fee"],
  ["Contract", "Month to month", "Often 6 to 12 months"],
  ["Google rankings (SEO)", true, true],
  ["AI Overviews and featured snippets (AEO)", true, "Sometimes"],
  ["ChatGPT, Perplexity and Gemini visibility (GEO)", true, false],
  ["Prompt-level AI visibility reporting", true, false],
  ["Free AI readiness checker and audit before you sign", true, false],
];

const faqs = [
  { q: "Why are your prices lower than many US and UK agencies?", a: "Our team is based in India, so our costs are lower. The work, the tools and the reporting are the same standard you'd expect from an agency in London or New York, and calls happen in your working hours." },
  { q: "Which plan should I choose?", a: "Growth suits a business competing in one city or region. Authority suits brands competing nationally or in several countries, or anyone who wants faster progress in AI answers. The free audit ends with a recommendation." },
  { q: "Is there a minimum term?", a: "No. Plans run month to month and you can cancel with 30 days' notice. SEO and AI visibility build over three to six months, so we recommend giving a plan at least that long." },
  { q: "Are taxes included?", a: "No. Prices exclude local taxes such as VAT or GST, which are added where they apply." },
  { q: "Do you offer one-off projects?", a: "Yes, for technical audits, site migrations and AI visibility audits. Ask for a quote through the contact page." },
  { q: "What if I need more than Authority includes?", a: "Larger catalogues, more countries or more content are priced as a custom plan after the audit." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Pricing", path: "/pricing" }]}
        eyebrow="Pricing"
        title={<>Two plans. <Em>No surprises.</Em></>}
        intro="SEO, AEO and GEO in one monthly plan, priced for international businesses. No setup fee, no lock-in, and prices shown in your currency."
      />

      <section className="py-20 md:py-28" aria-labelledby="plans-heading">
        <h2 id="plans-heading" className="sr-only">Plans and prices</h2>
        <div className="shell"><PricingPlans /></div>
      </section>

      <section className="border-t border-line py-20 md:py-28" aria-labelledby="compare-title">
        <div className="shell">
          <p className="eyebrow mb-6">Compare</p>
          <h2 id="compare-title" className="display-md max-w-3xl">Zenyro vs. a typical SEO agency.</h2>
          <div className="relative mt-12 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[36rem] text-left text-[0.95rem]">
              <thead className="bg-ink-2">
                <tr>
                  <th scope="col" className="p-5 font-medium text-muted"><span className="sr-only">Feature</span></th>
                  <th scope="col" className="p-5 font-semibold text-ember">Zenyro</th>
                  <th scope="col" className="p-5 font-medium text-muted">Typical agency</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([k, a, b]) => (
                  <tr key={k} className="border-t border-line">
                    <th scope="row" className="p-5 font-medium">{k}</th>
                    {[a, b].map((v, i) => (
                      <td key={i} className={i ? "p-5 text-muted" : "p-5"}>
                        {v === true ? <><Check aria-hidden="true" className="size-4 text-ember" /><span className="sr-only">Yes</span></>
                          : v === false ? <><Minus aria-hidden="true" className="size-4 text-dim" /><span className="sr-only">No</span></>
                          : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[0.82rem] text-dim">Typical-agency figures are averages from published industry surveys of SEO retainers; individual agencies vary.</p>
        </div>
      </section>

      <Faq faqs={faqs} title="Pricing questions." />
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "SEO, AEO and GEO",
          serviceType: "Search engine optimisation",
          url: absoluteUrl("/pricing"),
          provider: { "@id": `${site.url}/#organization` },
          offers: plans.map((p) => ({
            "@type": "Offer",
            name: `${p.name} plan`,
            description: p.tagline,
            price: p.price.USD,
            priceCurrency: "USD",
            priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.USD, priceCurrency: "USD", unitText: "MONTH" },
            url: absoluteUrl("/pricing"),
          })),
        }}
      />
    </>
  );
}

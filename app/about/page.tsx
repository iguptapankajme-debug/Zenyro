import { PageHero } from "@/components/layout/page-hero";
import { Process } from "@/components/sections/process";
import { ContactCta } from "@/components/sections/contact-cta";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { Em } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { GrowthShowcase } from "@/components/art/growth-showcase";

export const metadata = buildMetadata({
  title: "About Zenyro: An SEO, AEO & GEO Agency",
  description:
    "Zenyro is a search agency focused on one thing: getting businesses found on Google, in AI Overviews and in AI assistants like ChatGPT, Perplexity and Gemini.",
  path: "/about",
});

const beliefs = [
  { title: "One focus: search", body: "We only do SEO, AEO and GEO. Focus is how a small team goes deeper than a full-service agency." },
  { title: "Measure what pays", body: "Rankings and AI mentions are leading indicators. We report them, and tie them back to clicks, calls and enquiries." },
  { title: "AI with oversight", body: "We use AI where it is faster or better, and keep people in charge of strategy, brand and anything sensitive." },
  { title: "You own everything", body: "Content, profiles, Search Console and analytics are set up in your name. If we part ways, everything stays with you." },
  { title: "Honest by default", body: "No fake reviews, invented case studies or guaranteed results. If something will not work for your business, we say so." },
  { title: "No tricks", body: "No bought links, fake reviews or doorway pages. They work briefly, then cost you the rankings you built." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About Zenyro"
        title={<>Search is changing. <Em>We make sure you are found.</Em></>}
        intro={`Zenyro is an SEO, AEO and GEO agency based in the ${site.region}. We help businesses rank on Google, become the answer, and get recommended by AI assistants.`}
      />

      <section className="py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Why we exist</p>
            <h2 className="display-md">Good businesses are disappearing from the places customers now ask.</h2>
          </div>
          <div className="prose-z lg:col-span-7">
            <p>
              Customers still search Google, but they also read AI Overviews, ask ChatGPT for a shortlist and check Perplexity before they call.
              Many excellent businesses don&apos;t appear in any of those answers, because their websites, listings and content were built for a
              search engine that no longer works the way it did.
            </p>
            <p>
              Zenyro was started to fix that, and only that. We run SEO, answer engine optimisation and generative engine optimisation as one
              programme, measured on the outcome that matters: <strong>more of the right customers finding you first</strong>.
            </p>
            <p>
              We are deliberately focused on businesses where each customer is valuable and the buying decision is considered: real estate,
              hospitality, travel and tour operators, healthcare, financial and advisory services, interior design and premium retail,
              education, and home improvement.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24 md:py-32">
        <div className="shell">
          <p className="eyebrow mb-6">What we believe</p>
          <h2 className="display-md max-w-2xl">Six principles we work by.</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b) => (
              <div key={b.title} className="bg-ink-2 p-8" data-reveal>
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Team />

      <section className="py-24 md:py-32" aria-labelledby="compare-title">
        <div className="shell">
          <p className="eyebrow mb-6">How we&apos;re different</p>
          <h2 id="compare-title" className="display-md max-w-3xl">One accountable team instead of three vendors.</h2>
          <div className="mt-12 overflow-x-auto rounded-3xl border border-line">
            <table className="w-full min-w-[40rem] text-left text-[0.95rem]">
              <caption className="sr-only">Typical setup compared with Zenyro</caption>
              <thead className="bg-ink-2">
                <tr>
                  <th scope="col" className="px-6 py-4 font-normal text-muted">&nbsp;</th>
                  <th scope="col" className="px-6 py-4 font-medium text-muted">Typical setup</th>
                  <th scope="col" className="px-6 py-4 font-medium text-ember">Zenyro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Focus", "SEO as one of many services", "Search only: SEO, AEO and GEO"],
                  ["What gets measured", "Rankings and traffic", "Rankings, AI visibility, citations and enquiries"],
                  ["AI search", "Not tracked", "Tracked prompt by prompt across ChatGPT, Perplexity, Gemini and AI Overviews"],
                  ["Content", "Volume for its own sake", "Fewer, better pages that answer real questions"],
                  ["Ownership", "Accounts often held by the agency", "Everything on your accounts, documented"],
                  ["Reporting", "Monthly decks", "Short weekly updates in plain language"],
                ].map(([row, a, b]) => (
                  <tr key={row} className="border-t border-line">
                    <th scope="row" className="px-6 py-4 font-medium">{row}</th>
                    <td className="px-6 py-4 text-muted">{a}</td>
                    <td className="px-6 py-4">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Testimonials />
      <Process variant="full" />
      <GrowthShowcase title="How we show progress." />
      <ContactCta />
    </>
  );
}

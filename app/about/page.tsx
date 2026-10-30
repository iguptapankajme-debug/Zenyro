import { PageHero } from "@/components/layout/page-hero";
import { Process } from "@/components/sections/process";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Zenyro: An AI Growth Agency",
  description:
    "Zenyro combines web engineering, performance marketing and AI automation in one team, so businesses get a single growth system instead of three disconnected vendors.",
  path: "/about",
});

const beliefs = [
  { title: "One system, one team", body: "Websites, ads and sales automation fail at the hand-offs between vendors. We remove the hand-offs by building all three together." },
  { title: "Measure what pays", body: "We report cost per qualified lead and cost per customer, because those are the numbers that change a business." },
  { title: "AI with oversight", body: "We use AI where it is faster or better, and keep people in charge of strategy, brand and anything sensitive." },
  { title: "You own everything", body: "Accounts, data, code and automations are set up in your name. If we part ways, the system keeps running." },
  { title: "Honest by default", body: "No fake reviews, invented case studies or guaranteed results. If something will not work for your business, we say so." },
  { title: "Fast on real phones", body: "Most of your customers are on mid-range Android phones and mobile data. We design and test for them first." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About Zenyro"
        title={<>Growth is a system. <Em>We build the whole thing.</Em></>}
        intro={`Zenyro is an AI growth agency based in the ${site.region}. We help ambitious businesses acquire customers, automate sales and grow revenue.`}
      />

      <section className="py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Why we exist</p>
            <h2 className="display-md">Too many good businesses are held back by disconnected marketing.</h2>
          </div>
          <div className="prose-z lg:col-span-7">
            <p>
              A typical growing business hires one agency for its website, another for ads and a software vendor for its CRM. Each does its part.
              Nobody owns the result. Leads arrive and wait. Follow-ups slip. The ads optimise for form fills that never become customers.
            </p>
            <p>
              Zenyro was started to close those gaps. We bring web engineering, performance marketing and AI automation into one team and one
              plan, measured on the outcome that matters: <strong>new customers at a cost that makes sense</strong>.
            </p>
            <p>
              We are deliberately focused on businesses where each customer is valuable and the buying decision is considered: real estate,
              hospitality, healthcare, interior design and premium retail, education and professional services, and home improvement.
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

      <Process />
      <ContactCta />
    </>
  );
}

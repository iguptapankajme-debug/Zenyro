import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Disciplines } from "@/components/sections/disciplines";
import { SearchEverywhere } from "@/components/sections/search-everywhere";
import { GrowthEngine } from "@/components/sections/growth-engine";
import { IndustriesShowcase } from "@/components/sections/industries-showcase";
import { SelectedWork } from "@/components/sections/selected-work";
import { CapabilitiesDemo } from "@/components/sections/capabilities-demo";
import { Process } from "@/components/sections/process";
import { GrowthCalculator } from "@/components/calculator/growth-calculator";
import { ContactCta } from "@/components/sections/contact-cta";
import { CapabilityMarquee } from "@/components/sections/capability-marquee";
import { Engagements } from "@/components/sections/engagements";
import { Faq } from "@/components/sections/faq";
import { SectionHeading, Em } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Zenyro: AI Growth Agency for Websites, Ads & Sales Automation",
  description:
    "Zenyro helps businesses acquire customers and grow revenue with conversion-focused websites, performance marketing and AI sales automation. Build. Grow. Convert.",
  path: "/",
  absoluteTitle: true,
});

const homeFaqs = [
  { q: "What does Zenyro do?", a: "We build websites, run performance marketing and search growth (SEO, AEO and GEO), and automate sales follow-up with AI, all as one system measured on new customers rather than clicks." },
  { q: "Who do you work with?", a: "Mostly businesses where each customer is valuable and buyers research before deciding: real estate, hospitality, healthcare, interior design and premium retail, education and professional services, and home improvement." },
  { q: "Where are you based?", a: "In the Chandigarh Tricity, India. We work with clients across India and abroad, in person or over video calls." },
  { q: "How quickly can we start?", a: "A first conversation can usually happen within a few days. Launch Sprints and Automation Builds typically go live in three to eight weeks, depending on scope and how quickly content is ready." },
  { q: "Do you guarantee results?", a: "No honest agency can guarantee rankings, AI mentions or revenue. We commit to a clear plan, transparent tracking and weekly reporting, so you can judge the work on real numbers." },
  { q: "Who owns the website, ad accounts and data?", a: "You do. Everything is set up on your own accounts, documented, and keeps working if you ever stop working with us." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Disciplines />
      <SearchEverywhere />
      <GrowthEngine />

      <section className="py-28 md:py-36" aria-labelledby="industries-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Industry solutions"
            title={<span id="industries-title">Built for businesses <Em>ready to scale.</Em></span>}
            lede="Growth systems for six sectors where every customer is worth a real conversation."
          />
          <IndustriesShowcase />
        </div>
      </section>

      <CapabilityMarquee />

      <SelectedWork />

      <section className="border-y border-line bg-ink-2/50 py-28 md:py-40" aria-labelledby="capabilities-title">
        <div className="shell">
          <SectionHeading
            eyebrow="AI capabilities"
            title={<span id="capabilities-title">Intelligence built into <Em>every interaction.</Em></span>}
            lede="Watch one enquiry move through a Zenyro system. Pick a scenario and press Play."
          />
          <CapabilitiesDemo />
        </div>
      </section>

      <Process />

      <Engagements />

      <section className="border-t border-line py-28 md:py-36" aria-labelledby="calculator-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Growth calculator"
            title={<span id="calculator-title">What could better conversions mean for <Em>your business?</Em></span>}
            lede="Enter your numbers. Better lead handling often beats a bigger ad budget."
          />
          <GrowthCalculator />
        </div>
      </section>

      <Faq faqs={homeFaqs} title="Before you get in touch." />

      <ContactCta />
    </>
  );
}

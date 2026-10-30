import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Disciplines } from "@/components/sections/disciplines";
import { GrowthEngine } from "@/components/sections/growth-engine";
import { IndustriesShowcase } from "@/components/sections/industries-showcase";
import { SelectedWork } from "@/components/sections/selected-work";
import { CapabilitiesDemo } from "@/components/sections/capabilities-demo";
import { Process } from "@/components/sections/process";
import { GrowthCalculator } from "@/components/calculator/growth-calculator";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionHeading, Em } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Zenyro: AI Growth Agency for Websites, Ads & Sales Automation",
  description:
    "Zenyro helps businesses acquire customers and grow revenue with conversion-focused websites, performance marketing and AI sales automation. Build. Grow. Convert.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Disciplines />
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

      <ContactCta />
    </>
  );
}

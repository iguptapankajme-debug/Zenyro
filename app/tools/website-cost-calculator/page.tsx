import { ToolPage } from "@/components/tools/tool-page";
import { CostCalculator } from "@/components/tools/cost-calculator";
import { getTool } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getTool("website-cost-calculator");
export const metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: `/tools/${tool.slug}` });

const faqs = [
  { q: "How much does a business website cost in India?", a: "For a custom business website from a professional agency, budgets commonly start around ₹80,000 and rise with page count, features, design ambition and content needs. Online stores and web apps cost more. The calculator shows a range for your specific answers rather than a single average." },
  { q: "Is this estimate a quotation?", a: "No. It is an indicative range based on configurable pricing rules. A fixed quotation follows a short discovery call and a written scope, which confirms exactly what is included." },
  { q: "What is not included in the estimate?", a: "Domain names, hosting, paid plugins and subscriptions, third-party licences, advertising spend and GST are excluded. The assumptions panel lists everything the range is based on." },
  { q: "Do I need to share my contact details?", a: "No. The full estimate, timeline and downloadable brief are available without any contact details. You only share them if you request a proposal or consultation." },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      faqs={faqs}
      about={
        <>
          <h2>How the estimate is calculated</h2>
          <p>Each answer maps to a pricing rule maintained by the Zenyro team: a cost range and a time range for that piece of work. The calculator adds the rules you select, then applies multipliers for design ambition and urgency, and a small adjustment for regulated industries such as healthcare. Results are rounded to the nearest ₹5,000.</p>
          <p>Feature work often runs in parallel with page build, so features extend the timeline by roughly half of their own duration. Urgent projects compress the schedule with extra team capacity, which increases the budget.</p>
          <h2>What drives website cost the most</h2>
          <ul>
            <li><strong>Website type.</strong> A landing page and a customer portal are different projects, not different sizes of the same one.</li>
            <li><strong>Design ambition.</strong> Custom editorial design and interactive motion take more design and engineering time than an adapted template.</li>
            <li><strong>Integrations.</strong> Booking systems, CRMs, payments and AI assistants each add build and testing effort.</li>
            <li><strong>Content.</strong> Writing and sourcing images is real work, and often the main cause of delays when it is left until late.</li>
          </ul>
          <h2>Using the estimate</h2>
          <p>Download the project brief to compare agencies on the same scope, or request a proposal and we will turn it into a fixed price and timeline.</p>
        </>
      }
    >
      <CostCalculator />
    </ToolPage>
  );
}

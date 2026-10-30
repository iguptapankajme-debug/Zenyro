import Link from "next/link";
import { ToolPage } from "@/components/tools/tool-page";
import { BriefGenerator } from "@/components/tools/brief-generator";
import { getTool } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getTool("website-brief-generator");
export const metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: `/tools/${tool.slug}` });

const faqs = [
  { q: "What is a website brief?", a: "A website brief is a short document that explains what a website must achieve, who it is for, which pages and features it needs, and the constraints on budget and time. It lets agencies quote accurately and keeps a project focused." },
  { q: "Is the brief written by AI?", a: "Every brief starts from a structured template built from your answers. When an AI service is configured, it refines that draft to be more specific to your business. The result is labelled either AI-assisted or template-based." },
  { q: "Do I need to register?", a: "No. The full brief is shown immediately and can be downloaded or copied. Contact details are only needed if you ask for a personalised proposal." },
  { q: "What happens to my answers?", a: "Your answers are used to generate the brief and are not stored unless you request a proposal. Avoid entering confidential or personal information in the free-text fields." },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      faqs={faqs}
      about={
        <>
          <h2>Why start with a brief</h2>
          <p>Most website projects that go over budget were under-defined at the start. A clear brief forces the important decisions early: who the site is for, what it must make people do, and which features are essential rather than nice to have.</p>
          <h2>What your brief includes</h2>
          <ul>
            <li>Recommended pages, each with a stated purpose.</li>
            <li>Feature specifications written so a developer can estimate them.</li>
            <li>Technology options with the situations each suits best.</li>
            <li>SEO considerations for your reach, industry and goals.</li>
            <li>An estimated complexity level and implementation phases.</li>
          </ul>
          <h2>Next step</h2>
          <p>Share the brief with any agency you are speaking to, or request a personalised proposal from Zenyro. Want a budget too? Try the <Link href="/tools/website-cost-calculator">website cost calculator</Link>.</p>
        </>
      }
    >
      <BriefGenerator />
    </ToolPage>
  );
}

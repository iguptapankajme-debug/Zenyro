import { ToolPage } from "@/components/tools/tool-page";
import { SeoAuditTool } from "@/components/tools/seo-audit-tool";
import { getTool } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getTool("seo-audit");
export const metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: `/tools/${tool.slug}` });

const faqs = [
  { q: "Is this a complete SEO audit?", a: "No. It checks one page's server-rendered HTML, its robots.txt and sitemap, and performance data when available. A complete audit also crawls the whole site, renders JavaScript, reviews content quality, links and Search Console data, which is what a Zenyro SEO consultation covers." },
  { q: "Do you store the pages I audit?", a: "No. The page is fetched once to produce your report, and the results are not saved or published. If you request a consultation, the summary you choose to send is stored with your enquiry." },
  { q: "Why does the audit say my heading is missing when I can see it?", a: "The audit reads the HTML your server sends. If a heading or text is added later by JavaScript, some search engines may see it late or not at all. Rendering important content on the server is the safer approach." },
  { q: "Where does the performance data come from?", a: "When configured, performance figures come from Google's PageSpeed Insights API, including lab measurements and, where Google has enough visits, real-user Core Web Vitals. Otherwise the report says that performance data was not available." },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      faqs={faqs}
      about={
        <>
          <h2>What the audit checks</h2>
          <ul>
            <li><strong>Crawling and indexing:</strong> HTTPS, response status, redirect chains, robots meta tags and headers, robots.txt, XML sitemap and canonical URL.</li>
            <li><strong>On-page:</strong> title tag, meta description, H1 and heading order, language, mobile viewport and social sharing tags.</li>
            <li><strong>Structured data:</strong> whether JSON-LD is present and parses, and which types it declares.</li>
            <li><strong>Images:</strong> alt text, width and height attributes, modern formats and lazy loading.</li>
            <li><strong>Performance:</strong> HTML size, a single response-time sample, and PageSpeed Insights data when available.</li>
          </ul>
          <h2>How to use the findings</h2>
          <p>Start with anything marked <strong>Fix</strong>: these block indexing or seriously weaken the page. Then work through <strong>Improve</strong> items, page by page, beginning with the pages that bring in enquiries. Every finding shows the evidence we saw, so your developer can verify it.</p>
          <h2>Built to be safe</h2>
          <p>The audit only fetches public websites. Private and internal network addresses are refused, every redirect is re-checked, and requests have strict time and size limits.</p>
        </>
      }
    >
      <SeoAuditTool />
    </ToolPage>
  );
}

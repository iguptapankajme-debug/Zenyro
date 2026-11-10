import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AiReadinessChecker } from "@/components/tools/ai-readiness-checker";
import { Icon3D, PixelField, Rail } from "@/components/home/primitives";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { buildMetadata, webApplicationSchema } from "@/lib/seo";

const title = "Free AI Readiness Checker: Can ChatGPT Read Your Site?";
const description =
  "Check in seconds whether ChatGPT, Claude, Perplexity and Gemini can crawl your website, whether your business is described in structured data, and which SEO basics are missing. Free, no sign-up.";

export const metadata = buildMetadata({ title, description, path: "/tools/ai-readiness" });

const faqs = [
  { q: "What does the AI readiness checker test?", a: "It reads your homepage, robots.txt, sitemap.xml and llms.txt, then checks 17 signals: whether AI crawlers such as GPTBot, ClaudeBot, PerplexityBot and Google-Extended are allowed, whether your homepage can be indexed, whether your business is described in Organization or LocalBusiness schema, whether you have question-and-answer content, and the on-page basics every search engine reads." },
  { q: "Does a high score mean ChatGPT will recommend me?", a: "No. A high score means AI assistants can read and understand your site. Whether they recommend you also depends on your content, reviews and how often trusted sources mention you. Our free audit checks what assistants actually say about you." },
  { q: "Should I block GPTBot?", a: "It's your choice. GPTBot collects data for training; OAI-SearchBot and ChatGPT-User fetch pages for ChatGPT's answers and browsing. Many businesses block training but allow search crawlers so they can still be cited. The checker shows each one separately." },
  { q: "Do you store the websites I check?", a: "No. The check runs on public files and the result is shown only to you." },
];

export default function AiReadinessPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line pt-28 md:pt-32" aria-labelledby="tool-title">
        <div className="shell">
          <div className="relative isolate border-x border-line px-5 pb-16 pt-10 sm:px-8 md:pb-20">
            <PixelField cols={140} rows={44} seed={7} className="absolute inset-x-0 top-0 -z-10 h-full w-full opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <Breadcrumbs items={[{ name: "AI readiness checker", path: "/tools/ai-readiness" }]} />
            <div className="mt-10 text-center">
              <div aria-hidden="true" className="mb-6 flex justify-center">
                {(["chatgpt", "claude", "gemini", "perplexity"] as const).map((n, i) => (
                  <span key={n} className="orbit-float -mx-1" style={{ animationDelay: `${-i * 0.8}s` }}><Icon3D name={n} size={56} priority className="size-12 drop-shadow-[0_10px_14px_rgba(9,9,11,.14)] sm:size-14" /></span>
                ))}
              </div>
              <p className="eyebrow mx-auto mb-6">Free tool · no sign-up</p>
              <h1 id="tool-title" className="mx-auto max-w-4xl text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.05em]">
                Can AI assistants <span className="hl">read your website?</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-muted">
                Check whether ChatGPT, Claude, Perplexity and Gemini can crawl your site, understand your business and quote your pages. 17 checks, about ten seconds.
              </p>
            </div>
            <div className="mt-10"><AiReadinessChecker /></div>
          </div>
        </div>
      </section>

      <Rail labelledBy="why-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Why it matters</p>
            <h2 id="why-title" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.04em]">If an assistant can&apos;t read you, it can&apos;t recommend you.</h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:col-span-7">
            {[
              ["Access", "Many sites block AI crawlers by accident, through a security plugin, CDN rule or copied robots.txt."],
              ["Understanding", "Structured data tells engines exactly who you are, where you work and what you offer, instead of leaving them to guess."],
              ["Quotability", "Clear questions and direct answers are what AI Overviews and assistants lift into their replies."],
            ].map(([t, b]) => (
              <li key={t} className="bg-ink p-6"><p className="font-semibold">{t}</p><p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{b}</p></li>
            ))}
          </ul>
        </div>
      </Rail>

      <Faq faqs={faqs} title="About the checker." />
      <ContactCta />
      <JsonLd data={webApplicationSchema({ name: "Zenyro AI Readiness Checker", description, path: "/tools/ai-readiness" })} />
    </>
  );
}

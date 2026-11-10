import Link from "next/link";
import { ArrowUpRight, Check, Search, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Em } from "@/components/ui/section-heading";
import { Rail, PixelField, EngineChip, EngineMark, Icon3D, engines } from "@/components/home/primitives";
import { HeroOrbit, OrbitStack } from "@/components/home/hero-orbit";
import { AskAiDemo } from "@/components/home/ask-ai-demo";
import { AiReadinessChecker } from "@/components/tools/ai-readiness-checker";
import { MarketCards } from "@/components/markets/market-cards";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { VisibilityDashboard } from "@/components/home/visibility-dashboard";
import { ExampleGrid } from "@/components/sections/example-grid";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { concepts } from "@/data/work";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO, AEO & GEO Agency | Get Found on Google & ChatGPT | Zenyro",
  description:
    "Zenyro is an SEO, AEO and GEO agency. We help businesses rank on Google, become the answer in AI Overviews, and get recommended by ChatGPT, Perplexity and Gemini.",
  path: "/",
  absoluteTitle: true,
});

const homeFaqs = [
  { q: "What is the difference between SEO, AEO and GEO?", a: "SEO gets your pages ranking in Google and Bing results. AEO (answer engine optimisation) structures your content so Google's featured snippets, AI Overviews and voice assistants can lift your answer directly. GEO (generative engine optimisation) makes your business easy for ChatGPT, Perplexity, Gemini, Claude and Copilot to find, trust and recommend. They share the same foundations, so we run them as one programme." },
  { q: "Can you get my business mentioned in ChatGPT?", a: "We can make you much easier to find, cite and recommend: clear facts about your business, pages that answer real questions, consistent listings and mentions on the sources AI assistants read. Nobody can guarantee a mention, and we track progress prompt by prompt so you can see what's changing." },
  { q: "How do you measure results?", a: "Google rankings, organic clicks and Maps actions from Search Console and Google Business Profile, plus AI visibility: how often and how prominently you're mentioned for the prompts your customers use, and which of your pages are cited. Everything is tied back to enquiries." },
  { q: "How long does it take?", a: "Technical fixes and Google Business Profile improvements can show within weeks. Competitive rankings and steady AI visibility usually build over three to six months of consistent work." },
  { q: "How much does it cost?", a: "Two monthly plans: Growth from US$799 and Authority from US$1,799, shown in your currency on the pricing page. No setup fee, month to month." },
  { q: "Do you guarantee rankings?", a: "No honest agency can. We commit to a clear plan, quality work and transparent monthly reporting." },
  { q: "Where are you based, and do you work internationally?", a: "We are based in the Chandigarh Tricity, India, and work remotely with businesses in the United States, United Kingdom, UAE, Canada, Australia, Singapore and across India. Calls are scheduled in your working hours, and content is written in your market's English." },
];

const pillars = [
  {
    key: "SEO",
    title: "Rank on Google",
    body: "Technical foundations, pages built around real search intent, Google Maps visibility and authority that moves rankings.",
    href: "/services/seo",
    links: [["Technical SEO", "/services/technical-seo"], ["Local SEO", "/services/local-seo"]],
  },
  {
    key: "AEO",
    title: "Become the answer",
    body: "Content structured so featured snippets, AI Overviews and voice assistants lift your answer, with your brand attached.",
    href: "/services/aeo",
    links: [["Content & Digital PR", "/services/content-digital-pr"]],
  },
  {
    key: "GEO",
    title: "Get recommended by AI",
    body: "Clear entity facts, citable pages and consistent mentions so ChatGPT, Perplexity, Gemini and Claude recommend you.",
    href: "/services/geo",
    links: [["Free AI visibility audit", "/free-audit"]],
  },
] as const;

const steps = [
  { t: "Audit", b: "Technical crawl, Google rankings, and what AI assistants say about you today, compared with your competitors." },
  { t: "Fix the foundations", b: "Indexing, speed, structured data, AI crawler access and Google Business Profile, in order of impact." },
  { t: "Publish answer-first content", b: "Service, location and guide pages that answer real questions clearly enough to rank and be quoted." },
  { t: "Build authority and citations", b: "Digital PR, reviews, directory and forum mentions on the sources Google and AI assistants trust." },
  { t: "Track and report", b: "Monthly rankings, AI visibility by prompt and engine, citations and enquiries, in plain language." },
];


function SerpMini() {
  return (
    <div className="rounded-xl border border-line bg-ink p-3 text-[0.72rem]">
      <p className="flex items-center gap-1.5 rounded-md bg-ink-2 px-2 py-1.5 text-muted"><Search aria-hidden="true" className="size-3" />dentist in mohali</p>
      <div className="mt-2 rounded-md border border-ember/40 bg-ember/[0.04] p-2">
        <p className="font-mono text-[0.6rem] text-dim">yourclinic.in › mohali</p>
        <p className="font-medium text-ember">Dental Clinic in Mohali | Your Clinic</p>
      </div>
      <div className="mt-1.5 space-y-1.5 p-2"><span className="block h-1.5 w-3/4 rounded bg-ink-3" /><span className="block h-1.5 w-1/2 rounded bg-ink-3" /></div>
    </div>
  );
}
function AnswerMini() {
  return (
    <div className="rounded-xl border border-line bg-ink p-3 text-[0.72rem]">
      <p className="flex items-center gap-1.5 font-medium"><Sparkles aria-hidden="true" className="size-3 text-ember" />AI Overview</p>
      <p className="mt-2 leading-snug text-muted">A root canal usually takes one or two visits of 60–90 minutes, with local anaesthetic&hellip;</p>
      <p className="mt-2 w-fit rounded-md bg-ember/10 px-2 py-0.5 text-[0.62rem] font-medium text-ember">Source: yourclinic.in</p>
    </div>
  );
}
function ChatMini() {
  return (
    <div className="rounded-xl border border-line bg-ink p-3 text-[0.72rem]">
      <p className="ml-auto w-fit rounded-lg bg-ink-3 px-2 py-1">Best dentist for kids in Mohali?</p>
      <p className="mt-2 flex gap-1.5 leading-snug text-muted"><Icon3D name="chatgpt" size={20} className="mt-0.5 size-4 shrink-0" /><span>Parents often recommend <span className="rounded bg-amber-100 px-0.5 font-medium text-paper">Your Clinic</span> for its child-friendly team&hellip;</span></p>
    </div>
  );
}
const minis = { SEO: SerpMini, AEO: AnswerMini, GEO: ChatMini };

export default function Home() {
  const seoExamples = concepts().filter((w) => w.categories?.includes("seo")).slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line pt-28 md:pt-32" aria-labelledby="hero-title">
        <div className="shell">
          <div className="relative isolate border-x border-line px-5 pb-10 pt-12 text-center sm:px-8 md:pb-14 md:pt-24">
            <div aria-hidden="true" className="absolute left-1/2 top-[38%] -z-10 h-[26rem] w-[min(56rem,90%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(21_94_239/.14),transparent)]" />
            <HeroOrbit />
            <OrbitStack />
            <PixelField cols={150} rows={56} className="absolute inset-x-0 top-0 -z-10 h-full w-full opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <p className="eyebrow mx-auto mb-7">SEO · AEO · GEO agency</p>
            <h1 id="hero-title" className="mx-auto max-w-6xl text-[clamp(2.4rem,5.3vw,4.7rem)] font-semibold leading-[1.04] tracking-[-0.05em]">
              Get found on Google,{" "}
              <span className="inline-block size-[0.95em] translate-y-[-0.06em] align-middle">
                <Icon3D name="chatgpt" size={96} priority className="size-full -rotate-6 drop-shadow-[0_8px_14px_rgba(9,9,11,.18)]" />
              </span>{" "}
              ChatGPT and <span className="hl">every AI search</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-muted">
              Zenyro is a search agency. We help businesses rank on Google, become the answer in AI Overviews, and get recommended by
              ChatGPT, Perplexity and Gemini, so more customers find you first.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/free-audit" size="lg" icon="up-right">Get a free AI visibility audit</ButtonLink>
              <ButtonLink href="/tools/ai-readiness" variant="ghost" size="lg">Check my site free</ButtonLink>
            </div>
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2" aria-label="Where we get you found">
              {engines.slice(0, 7).map((e) => <li key={e.key}><EngineChip name={e.key} label={e.name} /></li>)}
            </ul>
          </div>
        </div>
        <div className="shell"><div className="border-x border-line"><VisibilityDashboard /></div></div>
      </section>

      {/* Shift statement */}
      <Rail labelledBy="shift-title" inner="text-center">
        <h2 id="shift-title" className="mx-auto max-w-4xl text-[clamp(2rem,4.4vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
          Customers now ask AI what to buy. <span className="hl">Be the business it recommends.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[1.08rem] leading-relaxed text-muted">
          People still search Google, but more and more of them ask ChatGPT, Perplexity or Gemini for a shortlist, and read an AI
          Overview before they click. If you aren&apos;t in those answers, you aren&apos;t on the list.
        </p>
        <div className="relative mx-auto mt-12 grid max-w-4xl overflow-hidden rounded-2xl border border-line text-left sm:grid-cols-3">
          {[
            ["Search", "Customers compare you on Google results and Maps before they call."],
            ["Answers", "AI Overviews and featured snippets answer the question on the results page."],
            ["Assistants", "ChatGPT, Perplexity and Gemini build a shortlist and name who to contact."],
          ].map(([t, b], i) => (
            <div key={t} className={`bg-ink p-6 ${i ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}>
              <p className="font-mono text-[0.72rem] text-ember">0{i + 1}</p>
              <p className="mt-3 text-[1.15rem] font-medium tracking-[-0.02em]">{t}</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{b}</p>
            </div>
          ))}
        </div>
      </Rail>

      {/* Ask any AI */}
      <Rail labelledBy="ask-title">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">See the difference</p>
            <h2 id="ask-title" className="text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
              Ask any AI about your market. <Em>Hear your name.</Em>
            </h2>
          </div>
          <p className="text-[1.05rem] leading-relaxed text-muted lg:col-span-5">
            This is what our work changes. Pick an assistant and compare the answer before and after: your business named first, and your pages cited as the source.
          </p>
        </div>
        <AskAiDemo />
      </Rail>

      {/* Pillars */}
      <Rail labelledBy="pillars-title">
        <p className="eyebrow mb-6">Services</p>
        <h2 id="pillars-title" className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
          Everything you need to win in <Em>search and AI</Em>
        </h2>
        <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted">One programme, three ways to be found, built on the same foundations: clear, crawlable, credible information.</p>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pillars.map((p) => {
            const Mini = minis[p.key];
            return (
              <article key={p.key} className="flex flex-col rounded-2xl border border-line bg-ink-2 p-6">
                <div className="rounded-xl border border-dashed border-line-2 bg-ink-2 p-4"><Mini /></div>
                <p className="mt-6 font-mono text-[0.75rem] text-ember">{p.key}</p>
                <h3 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.03em]">{p.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{p.body}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem]">
                  <Link href={p.href} className="inline-flex items-center gap-1.5 font-medium"><span className="link-u">{p.key} services</span><ArrowUpRight aria-hidden="true" className="size-4 text-ember" /></Link>
                  {p.links.map(([l, h]) => (
                    <Link key={h} href={h} className="inline-flex items-center gap-1.5 text-muted hover:text-paper"><span className="link-u">{l}</span></Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Rail>

      {/* Platforms grid */}
      <section className="border-b border-line" aria-labelledby="platforms-title">
        <div className="shell">
          <div className="grid border-x border-line lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-8 border-b border-line p-8 md:p-12 lg:col-span-4 lg:border-b-0 lg:border-r">
              <div>
                <h2 id="platforms-title" className="text-[1.6rem] font-medium leading-tight tracking-[-0.03em]">Optimised for every place <span className="text-muted">customers ask.</span></h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">Rankings, answers and recommendations across search engines, maps and AI assistants, tracked in one report.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/free-audit">Free AI audit</ButtonLink>
                <ButtonLink href="/search-growth" variant="ghost">How search is changing</ButtonLink>
              </div>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
              {engines.map((e, i) => (
                <li key={e.key} className={`group flex min-h-32 flex-col items-center justify-center gap-3 border-line p-4 text-center ${i % 5 ? "lg:border-l" : ""} ${i >= 5 ? "lg:border-t" : ""} border-b lg:border-b-0`}>
                  <EngineMark name={e.key} className="size-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]" />
                  <span className="text-[0.9rem] font-medium">{e.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Free checker */}
      <Rail labelledBy="checker-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">Free tool</p>
            <h2 id="checker-title" className="text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
              Can ChatGPT read your website? <Em>Find out in ten seconds.</Em>
            </h2>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              Our AI readiness checker tests 17 signals: whether GPTBot, ClaudeBot, PerplexityBot and Gemini can crawl you, whether your business is described in structured data, and the SEO basics.
            </p>
          </div>
          <div className="lg:col-span-6"><AiReadinessChecker compact /></div>
        </div>
      </Rail>

      {/* Global */}
      <Rail labelledBy="global-title">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6">Global</p>
            <h2 id="global-title" className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
              One team, <Em>working in your hours</Em>, wherever you are
            </h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted">Search behaviour, directories and trust signals differ by country. We plan for your market, write in your English, and report in your time zone.</p>
          </div>
          <Link href="/markets" className="inline-flex items-center gap-2 font-medium"><span className="link-u">All markets</span><ArrowUpRight aria-hidden="true" className="size-4 text-ember" /></Link>
        </div>
        <MarketCards />
      </Rail>

      {/* How it works */}
      <Rail id="how" labelledBy="how-title" inner="scroll-mt-24">
        <p className="eyebrow mb-6">How it works</p>
        <h2 id="how-title" className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
          From invisible to <Em>recommended</Em>, in five steps
        </h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.t} className="bg-ink p-6" data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
              <span className="grid size-8 place-items-center rounded-md bg-ember/10 font-mono text-[0.78rem] font-medium text-ember">{i + 1}</span>
              <h3 className="mt-5 text-[1.1rem] font-semibold tracking-[-0.02em]">{s.t}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{s.b}</p>
            </li>
          ))}
        </ol>
      </Rail>

      {/* Examples */}
      <Rail labelledBy="examples-home-title">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6">Examples</p>
            <h2 id="examples-home-title" className="max-w-2xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">See how a search programme <Em>works</Em></h2>
          </div>
          <Link href="/work" className="inline-flex items-center gap-2 font-medium"><span className="link-u">All examples</span><ArrowUpRight aria-hidden="true" className="size-4 text-ember" /></Link>
        </div>
        <ExampleGrid items={seoExamples} filters={false} />
      </Rail>

      {/* Industries */}
      <Rail labelledBy="industries-title">
        <p className="eyebrow mb-6">Industries</p>
        <h2 id="industries-title" className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">Search growth for businesses where <Em>every customer counts</Em></h2>
        <ul className="mt-12 grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <li key={ind.slug} className={`border-line ${i % 4 ? "lg:border-l" : ""} ${i % 2 ? "sm:border-l" : ""} ${i >= 4 ? "lg:border-t" : ""} ${i >= 2 ? "sm:border-t" : ""} ${i ? "border-t sm:border-t-0" : ""}`}>
              <Link href={`/industries/${ind.slug}`} className="group flex h-full flex-col gap-2 p-6 transition-colors hover:bg-ink-2">
                <span className="font-medium">{ind.name}</span>
                <span className="text-[0.88rem] leading-snug text-muted">{ind.short}</span>
                <ArrowUpRight aria-hidden="true" className="mt-auto size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Rail>

      {/* Audit band */}
      <section className="border-b border-line" aria-labelledby="audit-title">
        <div className="shell">
          <div className="border-x border-line p-3 sm:p-5">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-ember px-6 py-12 text-ember-ink sm:px-10 md:py-16 lg:px-14">
              <PixelField cols={110} rows={30} seed={5} className="absolute inset-0 -z-10 h-full w-full opacity-25 brightness-0 invert [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
              <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 size-[28rem] rounded-full border border-white/15" />
              <div aria-hidden="true" className="spin-slow absolute -right-10 -top-10 -z-10 size-[20rem] rounded-full border border-dashed border-white/25" />
              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="inline-flex items-center gap-2 rounded-md bg-white/15 px-2.5 py-1 font-mono text-[0.72rem]">Free · within three business days</p>
                  <h2 id="audit-title" className="mt-6 text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                    What does AI say about your business today?
                  </h2>
                  <ul className="mt-7 grid gap-3 text-[1rem] text-white/90 sm:grid-cols-2">
                    {["Your Google rankings vs. three competitors", "What ChatGPT, Gemini and Perplexity say", "Technical and AI-crawler issues", "A prioritised 90-day plan"].map((t) => (
                      <li key={t} className="flex gap-2.5"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />{t}</li>
                    ))}
                  </ul>
                  <Link href="/free-audit" className="mt-9 inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 font-medium text-ember shadow-[0_12px_30px_-12px_rgba(0,0,0,.45)] transition-transform hover:-translate-y-0.5">
                    Get my free audit <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
                <div className="relative mx-auto lg:col-span-5">
                  <div className="orbit-float"><Icon3D name="globe" size={360} className="h-auto w-[min(20rem,70vw)] drop-shadow-[0_40px_50px_rgba(0,0,0,.35)]" /></div>
                  {(["chatgpt", "gemini", "perplexity", "claude"] as const).map((n, k) => (
                    <span key={n} aria-hidden="true" className="orbit-float absolute" style={{ animationDelay: `${-k * 1.3}s`, ...[{ left: "-6%", top: "8%" }, { right: "-4%", top: "2%" }, { left: "-2%", bottom: "6%" }, { right: "0%", bottom: "12%" }][k] }}>
                      <Icon3D name={n} size={64} className="size-12 drop-shadow-[0_14px_18px_rgba(0,0,0,.3)] sm:size-16" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <Rail labelledBy="plans-title">
        <div className="text-center">
          <p className="eyebrow mx-auto mb-6">Pricing</p>
          <h2 id="plans-title" className="mx-auto max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
            Agency-grade SEO, AEO and GEO. <span className="text-muted">At about half the usual price.</span>
          </h2>
          <p className="mx-auto mb-10 mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted">Two plans, priced in your currency. No setup fee and no lock-in.</p>
        </div>
        <PricingPlans />
        <p className="mt-6 text-center"><Link href="/pricing" className="inline-flex items-center gap-2 font-medium"><span className="link-u">Compare plans and agencies</span><ArrowUpRight aria-hidden="true" className="size-4 text-ember" /></Link></p>
      </Rail>

      <Faq faqs={homeFaqs} title="Questions about SEO, AEO and GEO." />
      <ContactCta />
    </>
  );
}

import { ProcessLine } from "@/components/animations/process-line";
import { Em } from "@/components/ui/section-heading";

export const processSteps = [
  {
    n: "01",
    title: "Audit",
    when: "Week 1–2",
    line: "We find what stops you being found.",
    body: "A technical crawl, Search Console and Google Business Profile review, competitor gap analysis, and a baseline of what ChatGPT, Perplexity, Gemini and AI Overviews say about you today. You receive a prioritised plan.",
    items: ["Technical and content audit", "AI visibility baseline", "Prioritised search plan"],
  },
  {
    n: "02",
    title: "Fix",
    when: "Week 2–6",
    line: "We fix the foundations first.",
    body: "Indexing, site structure, speed, structured data, AI crawler access and business listings, in order of impact, implemented directly or with your developers and verified in Search Console.",
    items: ["Technical fixes", "Structured data and listings", "AI crawler access"],
  },
  {
    n: "03",
    title: "Publish",
    when: "Every month",
    line: "We publish pages that answer.",
    body: "Service, location and guide pages written answer-first with your experts, so they rank on Google, appear in featured snippets and AI Overviews, and can be cited by AI assistants.",
    items: ["Answer-first content", "Content refreshes", "Digital PR and mentions"],
  },
  {
    n: "04",
    title: "Track",
    when: "Every month",
    line: "We measure what matters.",
    body: "Rankings, organic clicks, Maps actions, AI visibility by prompt and engine, cited pages and enquiries, reported in plain language: what changed, what we learned, what's next.",
    items: ["Rankings and clicks", "AI visibility by prompt", "Plain-language reporting"],
  },
];

/**
 * Vertical timeline: four large words joined by one animated line. "compact" (homepage) shows a
 * one-line statement with the full detail in an expandable panel; "full" (About) shows it all.
 */
export function Process({ variant = "compact" }: { variant?: "compact" | "full" }) {
  return (
    <section className="py-28 md:py-40" aria-labelledby="process-title">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6">Our process</p>
            <h2 id="process-title" className="display-lg">
              Complex technology. <Em>Simple execution.</Em>
            </h2>
          </div>
        </div>
        <ProcessLine className="lg:col-span-7">
          <ol className="grid gap-16 md:gap-24">
            {processSteps.map((s) => (
              <li key={s.n} className="process-step relative pl-12 md:pl-16" data-reveal>
                <span aria-hidden="true" className="process-dot absolute left-0 top-[0.6em] flex size-[25px] items-center justify-center rounded-full border border-line-2 bg-ink">
                  <span className="size-1.5 rounded-full bg-ember" />
                </span>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted"><span className="text-ember">{s.n}</span> · {s.when}</p>
                <h3 className="mt-2 text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.85] tracking-[-0.055em]">{s.title}</h3>
                <p className="mt-4 text-[1.25rem] font-medium tracking-[-0.015em] text-paper">{s.line}</p>
                {variant === "full" ? (
                  <ProcessDetail step={s} />
                ) : (
                  <details className="group mt-4">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted hover:text-paper [&::-webkit-details-marker]:hidden">
                      <span className="relative size-3.5">
                        <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                        <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform group-open:scale-y-0" />
                      </span>
                      What happens
                    </summary>
                    <ProcessDetail step={s} />
                  </details>
                )}
              </li>
            ))}
          </ol>
        </ProcessLine>
      </div>
    </section>
  );
}

function ProcessDetail({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <div className="mt-4 max-w-xl">
      <p className="leading-relaxed text-muted">{step.body}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {step.items.map((it) => <li key={it} className="rounded-full border border-line-2 px-3 py-1.5 text-[0.8rem]">{it}</li>)}
      </ul>
    </div>
  );
}

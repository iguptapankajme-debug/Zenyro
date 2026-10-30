import { ProcessLine } from "@/components/animations/process-line";
import { Em } from "@/components/ui/section-heading";

export const processSteps = [
  {
    n: "01",
    title: "Discover",
    when: "Week 1–2",
    line: "We find where revenue leaks.",
    body: "We study your market, offer, current funnel and sales data, interview your team, and find where revenue is leaking. You receive a written growth plan with priorities and expected effort.",
    items: ["Funnel and tracking audit", "Customer and competitor research", "Prioritised growth plan"],
  },
  {
    n: "02",
    title: "Engineer",
    when: "Week 2–6",
    line: "We build the whole system.",
    body: "We design and build the system: website or landing pages, campaigns, AI assistants, automations and CRM, all on accounts you own. You see progress every week.",
    items: ["Design and build", "Integrations and automation", "Testing with real scenarios"],
  },
  {
    n: "03",
    title: "Launch",
    when: "Week 6–8",
    line: "We go live, with people in control.",
    body: "Everything goes live in a controlled way. AI assistants start with human approval switched on, campaigns start with measured budgets, and tracking is verified end to end.",
    items: ["Staged go-live", "Team training", "Tracking verification"],
  },
  {
    n: "04",
    title: "Optimize",
    when: "Every month",
    line: "We improve what pays, every month.",
    body: "We review the numbers weekly, fix the weakest stage of the funnel first, test new creative and messaging, and report in plain language: what changed, what we learned, what is next.",
    items: ["Weekly optimisation", "Monthly experiments", "Plain-language reporting"],
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
                <h3 className="mt-2 text-[clamp(3rem,8vw,7rem)] font-semibold uppercase leading-[0.85] tracking-[-0.055em]">{s.title}</h3>
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

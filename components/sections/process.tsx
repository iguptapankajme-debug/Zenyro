import { ProcessLine } from "@/components/animations/process-line";
import { Em } from "@/components/ui/section-heading";

export const processSteps = [
  {
    n: "01",
    title: "Discover",
    when: "Week 1–2",
    body: "We study your market, offer, current funnel and sales data, interview your team, and find where revenue is leaking. You receive a written growth plan with priorities and expected effort.",
    items: ["Funnel and tracking audit", "Customer and competitor research", "Prioritised growth plan"],
  },
  {
    n: "02",
    title: "Engineer",
    when: "Week 2–6",
    body: "We design and build the system: website or landing pages, campaigns, AI assistants, automations and CRM, all on accounts you own. You see progress every week.",
    items: ["Design and build", "Integrations and automation", "Testing with real scenarios"],
  },
  {
    n: "03",
    title: "Launch",
    when: "Week 6–8",
    body: "Everything goes live in a controlled way. AI assistants start with human approval switched on, campaigns start with measured budgets, and tracking is verified end to end.",
    items: ["Staged go-live", "Team training", "Tracking verification"],
  },
  {
    n: "04",
    title: "Optimize",
    when: "Every month",
    body: "We review the numbers weekly, fix the weakest stage of the funnel first, test new creative and messaging, and report in plain language: what changed, what we learned, what is next.",
    items: ["Weekly optimisation", "Monthly experiments", "Plain-language reporting"],
  },
];

export function Process() {
  return (
    <section className="py-28 md:py-36" aria-labelledby="process-title">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6">Our process</p>
            <h2 id="process-title" className="display-lg">
              Complex technology. <Em>Simple execution.</Em>
            </h2>
            <p className="lede mt-6">
              You get one team, one plan and one weekly update. We handle the technology so your team can focus on customers.
            </p>
          </div>
        </div>
        <ProcessLine className="lg:col-span-7">
          <ol className="grid gap-14 md:gap-20">
            {processSteps.map((s) => (
              <li key={s.n} className="relative pl-12 md:pl-16" data-reveal>
                <span aria-hidden="true" className="absolute left-0 top-1 flex size-[25px] items-center justify-center rounded-full border border-line-2 bg-ink">
                  <span className="size-1.5 rounded-full bg-ember" />
                </span>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span className="font-mono text-[0.8rem] text-ember">{s.n}</span>
                  <h3 className="text-[clamp(2rem,4vw,3.4rem)] font-semibold uppercase leading-none tracking-[-0.045em]">{s.title}</h3>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">{s.when}</span>
                </div>
                <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.items.map((it) => <li key={it} className="rounded-full border border-line-2 px-3 py-1.5 text-[0.8rem]">{it}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </ProcessLine>
      </div>
    </section>
  );
}

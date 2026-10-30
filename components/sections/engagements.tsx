import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading, Em } from "@/components/ui/section-heading";
import { consultationHref } from "@/lib/site";

const models = [
  {
    name: "Launch Sprint",
    duration: "4–8 weeks",
    for: "A new website, landing pages or a relaunch that has to start producing enquiries quickly.",
    includes: ["Positioning and page plan", "Custom design and Next.js build", "Tracking, CRM and WhatsApp hooked up", "Technical SEO foundation"],
    outcome: "A fast, measurable site ready for traffic.",
  },
  {
    name: "Growth Partnership",
    duration: "Monthly, 3-month start",
    for: "Businesses ready to scale acquisition across ads, search and AI discovery.",
    includes: ["Meta and Google Ads management", "SEO, AEO and GEO programme", "Conversion testing on key pages", "Plain-language weekly reporting"],
    outcome: "A compounding pipeline, measured in cost per customer.",
    featured: true,
  },
  {
    name: "Automation Build",
    duration: "3–6 weeks",
    for: "Teams losing leads to slow replies, missed calls or manual follow-up.",
    includes: ["WhatsApp and website AI assistant", "AI voice agent for calls (optional)", "Lead scoring and CRM pipeline", "Human approval and monitoring"],
    outcome: "Every enquiry answered, qualified and routed.",
  },
];

/** Three ways to engage, presented as columns that lift and reveal detail on hover or focus. */
export function Engagements() {
  return (
    <section className="py-28 md:py-40" aria-labelledby="engage-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Ways to work with us"
          title={<span id="engage-title">Start where it <Em>pays back first.</Em></span>}
          lede="Three focused ways to begin. Most clients start with one and add the others as results come in."
        />
        <ol className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-3">
          {models.map((m, i) => (
            <li
              key={m.name}
              data-reveal
              style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
              className={`engage-card group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-7 sm:p-9 ${m.featured ? "border-ember/60 bg-ember/[0.05]" : "border-line bg-ink-2"}`}
            >
              <div aria-hidden="true" className="engage-glow pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,.25),transparent_65%)]" />
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.72rem] text-ember">0{i + 1}</span>
                <span className="rounded-full border border-line-2 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">{m.duration}</span>
              </div>
              <h3 className="mt-8 text-[clamp(2rem,3.4vw,2.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em]">{m.name}</h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{m.for}</p>
              <ul className="mt-7 grid gap-2.5 border-t border-line pt-6">
                {m.includes.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.92rem]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />{x}</li>
                ))}
              </ul>
              <p className="mt-auto pt-8 text-[1.05rem] font-medium leading-snug">{m.outcome}</p>
              <Link href={consultationHref} className="mt-6 inline-flex items-center gap-2 text-[0.92rem] text-ember">
                <span className="link-u">Discuss a {m.name.toLowerCase()}</span> <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

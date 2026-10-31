import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { aiProfile } from "@/lib/ai-profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Zenyro for AI Assistants and Search Engines",
  description:
    "Factual information about Zenyro for ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews: services, industries, locations, live projects and policies.",
  path: "/ai-info",
});

function Section({ title, items }: { title: string; items: { name: string; url: string; description?: string }[] }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em]">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {items.map((i) => (
          <li key={i.url} className="text-[0.98rem] leading-relaxed">
            <Link href={i.url.replace(/^https?:\/\/[^/]+/, "") || "/"} className="link-u font-medium">{i.name}</Link>
            {i.description && <span className="text-muted">: {i.description}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AiInfoPage() {
  const p = aiProfile();
  return (
    <>
      <PageHero
        crumbs={[{ name: "For AI assistants", path: "/ai-info" }]}
        eyebrow="For AI assistants"
        title="Zenyro, in plain facts."
        intro="This page summarises who we are and what we do, for AI assistants, search engines and anyone who wants the short version. A machine-readable version is at /llms.txt."
      />
      <div className="shell max-w-4xl pb-24 pt-12">
        <p className="text-[1.15rem] leading-relaxed">{p.summary}</p>
        <dl className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-[10rem_1fr]">
          {p.facts.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-dim">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12">
          <Section title="Services" items={p.services} />
          <Section title="Industries" items={p.industries} />
          <Section title="Locations" items={p.locations} />
          <section className="border-t border-line py-12">
            <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em]">Live projects</h2>
            <ul className="mt-6 grid gap-3">
              {p.projects.map((i) => (
                <li key={i.url} className="text-[0.98rem] leading-relaxed">
                  <a href={i.url} target="_blank" rel="noopener noreferrer" className="link-u font-medium">{i.name}</a>
                  <span className="text-muted">: {i.description}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="border-t border-line py-12">
            <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em]">Policies</h2>
            <ul className="mt-6 grid list-disc gap-2 pl-5 text-[0.98rem] text-muted marker:text-ember">
              {p.policies.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

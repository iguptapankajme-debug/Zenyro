import { Check } from "lucide-react";
import { JsonLd } from "@/components/ui/json-ld";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { slugify } from "@/lib/slugify";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * The quotable answer at the top of a page: the question as a heading, a short self-contained answer,
 * key facts and a visible review date. Emits WebPage structured data with dateModified and a speakable
 * pointer to the answer, so search engines and AI assistants know which text answers the question.
 */
export function QuickAnswer({ q, a, facts = [], updated, path, name }: { q: string; a: string; facts?: string[]; updated: string; path: string; name: string }) {
  const id = `answer-${slugify(q)}`;
  return (
    <section className="py-12 md:py-16" aria-labelledby={id}>
      <div className="shell">
        <div className="quick-answer rounded-2xl border border-ember/30 bg-ember/[0.04] p-6 sm:p-8">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">Quick answer</p>
          <h2 id={id} className="mt-3 text-[clamp(1.35rem,2.4vw,1.8rem)] font-semibold tracking-[-0.03em]">{q}</h2>
          <p className="quick-answer-text mt-4 max-w-4xl text-[1.1rem] leading-relaxed text-paper">{a}</p>
          {facts.length > 0 && (
            <ul className="mt-6 grid gap-2 text-[0.95rem] sm:grid-cols-3 sm:gap-4">
              {facts.map((f) => (
                <li key={f} className="flex gap-2.5 text-muted"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />{f}</li>
              ))}
            </ul>
          )}
          <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-dim">
            Reviewed by the {site.name} search team · Updated <time dateTime={updated}>{fmt(updated)}</time>
          </p>
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${absoluteUrl(path)}#webpage`,
          url: absoluteUrl(path),
          name,
          description: a,
          dateModified: updated,
          inLanguage: "en",
          isPartOf: { "@id": `${site.url}/#website` },
          publisher: { "@id": `${site.url}/#organization` },
          speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer h2", ".quick-answer-text"] },
        }}
      />
    </section>
  );
}

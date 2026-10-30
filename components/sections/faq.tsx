import { JsonLd } from "@/components/ui/json-ld";
import { faqSchema } from "@/lib/seo";

export function Faq({ faqs, title = "Questions, answered." }: { faqs: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="py-24 md:py-32" aria-labelledby="faq-title">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">FAQ</p>
          <h2 id="faq-title" className="display-md">{title}</h2>
        </div>
        <div className="lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.15rem] font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="relative size-7 shrink-0 rounded-full border border-line-2 transition-colors group-open:border-ember group-open:bg-ember">
                  <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-paper group-open:bg-ember-ink" />
                  <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-paper transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}

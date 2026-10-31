import { testimonials } from "@/data/testimonials";
import { Em } from "@/components/ui/section-heading";

/** Client quotes. Renders nothing until real testimonials are added to data/testimonials.ts. */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="border-t border-line py-24 md:py-32" aria-labelledby="testimonials-title">
      <div className="shell">
        <p className="eyebrow mb-6">In their words</p>
        <h2 id="testimonials-title" className="display-md max-w-3xl">What clients <Em>say.</Em></h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name + t.company} data-reveal>
              <figure className="flex h-full flex-col rounded-[1.75rem] border border-line bg-ink-2 p-8">
                <span aria-hidden="true" className="font-serif text-[4rem] leading-[0.6] text-ember">&ldquo;</span>
                <blockquote className="mt-4 flex-1 text-[1.2rem] font-medium leading-snug tracking-[-0.01em]">{t.quote}</blockquote>
                <figcaption className="mt-8 border-t border-line pt-5 text-[0.9rem]">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-muted"> · {t.role}, {t.company}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

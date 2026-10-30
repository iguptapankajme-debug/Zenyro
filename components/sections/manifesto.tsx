import { ManifestoText } from "@/components/animations/manifesto-text";

const statement =
  "Business growth is no longer about doing more. It's about building smarter systems that acquire, engage, and convert customers.";

export function Manifesto() {
  return (
    <section className="relative py-28 md:py-40" aria-labelledby="manifesto-title">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">The Zenyro manifesto</p>
          <h2 id="manifesto-title" className="mt-6 text-[1.05rem] font-medium uppercase leading-snug tracking-[0.02em] text-muted lg:max-w-[16rem]">
            The future doesn&apos;t wait. <span className="text-paper">Neither do we.</span>
          </h2>
        </div>
        <div className="lg:col-span-8">
          <ManifestoText text={statement} emphasis={["smarter", "systems", "acquire,", "engage,", "convert"]} />
          <div className="mt-16 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
            {[
              ["Systems over campaigns", "We build assets that keep working after launch, not one-off pushes."],
              ["Revenue over vanity", "We measure cost per customer, not likes, clicks or impressions."],
              ["Speed with care", "Fast launches, with people approving what matters to your brand."],
            ].map(([t, b], i) => (
              <div key={t} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                <p className="text-[0.98rem] font-medium">{t}</p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

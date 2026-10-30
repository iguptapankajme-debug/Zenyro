import { ManifestoText } from "@/components/animations/manifesto-text";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden py-32 md:py-48" aria-label="The Zenyro manifesto">
      <div className="shell">
        <p className="eyebrow mb-10">Manifesto</p>
        <ManifestoText
          lines={[
            { words: ["The", "future", "doesn't", "wait."], emphasis: ["future"] },
            { words: ["Neither", "do", "we."], emphasis: ["we."] },
          ]}
        />
        <p className="mt-12 max-w-md text-[1.05rem] leading-relaxed text-muted md:ml-auto md:mt-16" data-reveal>
          Growth isn&apos;t about doing more. It&apos;s about smarter systems that acquire, engage and convert customers.
        </p>
      </div>
    </section>
  );
}

import { ManifestoText } from "@/components/animations/manifesto-text";
import { ShaderCanvas } from "@/components/webgl/shader-canvas";

export function Manifesto() {
  return (
    <section className="relative isolate overflow-hidden py-32 md:py-48" aria-label="The Zenyro manifesto">
      <ShaderCanvas shader="grid" className="-z-10 [mask-image:linear-gradient(to_right,transparent,black_35%,black)]" />
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

import { ButtonLink } from "@/components/ui/button";
import { HeroVisual } from "@/components/3d/hero-visual";
import { HeroScroll } from "@/components/animations/hero-scroll";
import { consultationHref } from "@/lib/site";

const lines = [
  { verb: "Build.", note: "Websites & apps" },
  { verb: "Grow.", note: "Performance marketing" },
  { verb: "Convert.", note: "AI sales automation" },
];

/**
 * On md+ screens the hero is a tall section with a sticky stage: scrolling through it moves the
 * sculpture from Build to Grow to Convert and lights the matching line. Phones get a normal
 * single-screen hero.
 */
export function Hero() {
  return (
    <section id="hero" data-stage="0" className="hero relative md:h-[230vh]" aria-labelledby="hero-title">
      <div className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 md:sticky md:top-0 md:h-screen md:min-h-0 md:pt-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] bg-[size:calc(100%/6)_100%] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="hero-glow absolute right-[-8%] top-[10%] size-[56vw] max-w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,.16),transparent_62%)]" />
        </div>

        <div className="shell grid flex-1 items-center gap-8 md:grid-cols-12">
          <div className="relative z-10 md:col-span-7">
            <p className="eyebrow mb-7">AI growth agency</p>
            <h1 id="hero-title" className="hero-title text-[clamp(3.1rem,7.4vw,7.6rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em]">
              {lines.map((l, i) => (
                <span key={l.verb} className="hero-line block overflow-hidden pb-[0.04em]" data-line={i}>
                  <span className="block md:animate-rise" style={{ animationDelay: `${120 + i * 90}ms` }}>
                    We <span className="verb">{l.verb}</span>
                  </span>
                </span>
              ))}
            </h1>
            <p className="lede mt-8 max-w-md">
              Websites, performance marketing and AI sales automation, engineered as one system that turns visitors into customers.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={consultationHref} size="lg">Build Your Growth Engine</ButtonLink>
              <ButtonLink href="/work" variant="ghost" icon="up-right" size="lg">Explore Our Work</ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm md:col-span-5 md:max-w-none">
            <HeroVisual />
          </div>
        </div>

        <div className="shell pb-6 pt-6">
          <HeroScroll stages={lines.map((l) => ({ label: l.verb.replace(".", ""), note: l.note }))} />
        </div>
      </div>
    </section>
  );
}

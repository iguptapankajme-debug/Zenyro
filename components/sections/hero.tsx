import { ButtonLink } from "@/components/ui/button";
import { HeroVisual } from "@/components/3d/hero-visual";
import { consultationHref } from "@/lib/site";

const line2 = ["We", "build", "what", "grows", "your", "business."];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32" aria-labelledby="hero-title">
      {/* Measured grid and a single warm light source, behind everything */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] bg-[size:calc(100%/6)_100%] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="absolute right-[-10%] top-[8%] size-[60vw] max-w-[54rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,.14),transparent_62%)]" />
      </div>

      <div className="shell grid flex-1 items-center gap-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-7">
          <p className="eyebrow mb-8 animate-fade">AI growth agency · Build. Grow. Convert.</p>
          <h1 id="hero-title" className="display-xl">
            <span className="block">We don&apos;t just build digital.</span>
            <span className="mt-2 block text-muted">
              {line2.map((w, i) => (
                <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    className={`inline-block animate-rise ${w === "grows" ? "text-ember" : w === "business." ? "text-paper" : ""}`}
                    style={{ animationDelay: `${250 + i * 70}ms` }}
                  >
                    {w}
                  </span>
                  {i < line2.length - 1 && " "}
                </span>
              ))}
            </span>
          </h1>
          <p className="lede mt-8">
            We combine intelligent technology, performance marketing, and automated sales systems to turn ambitious
            businesses into growth machines.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade [animation-delay:650ms]">
            <ButtonLink href={consultationHref} size="lg">Build Your Growth Engine</ButtonLink>
            <ButtonLink href="/work" variant="ghost" icon="up-right" size="lg">Explore Our Work</ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:col-span-5 lg:max-w-none">
          <HeroVisual />
        </div>
      </div>

      <div className="shell mt-10 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            <li><span className="text-ember">01</span> Websites &amp; apps</li>
            <li><span className="text-ember">02</span> Performance marketing</li>
            <li><span className="text-ember">03</span> AI sales automation</li>
          </ul>
          <p className="hidden items-center gap-3 sm:flex">
            Scroll
            <span aria-hidden="true" className="relative h-8 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scrollcue_1.8s_var(--ease-in-out-quart)_infinite] bg-ember" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

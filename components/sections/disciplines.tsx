import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { disciplines, services, type Discipline } from "@/data/services";
import { SectionHeading, Em } from "@/components/ui/section-heading";
import { Tilt } from "@/components/animations/tilt";
import { BuildVisual, ConvertVisual, GrowVisual } from "./discipline-visuals";
import { cn } from "@/lib/cn";

const visuals: Record<Discipline, React.ReactNode> = {
  build: <BuildVisual />,
  grow: <GrowVisual />,
  convert: <ConvertVisual />,
};

export function Disciplines() {
  const order: Discipline[] = ["build", "grow", "convert"];
  return (
    <section className="py-28 md:py-36" aria-labelledby="disciplines-title">
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          title={<span id="disciplines-title">Three disciplines. <Em>One growth engine.</Em></span>}
          lede="Most businesses hire a web agency, an ads agency and a software vendor, then spend their time making them talk. We run all three as one system."
        />

        <div className="mt-20 grid gap-6 md:mt-28">
          {order.map((key, idx) => {
            const d = disciplines[key];
            const related = services.filter((s) => s.discipline === key);
            return (
              <article
                key={key}
                className="group/tilt grid overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 lg:grid-cols-12"
                data-reveal
              >
                <div className={cn("flex flex-col p-7 sm:p-10 lg:col-span-6 lg:p-14", idx % 2 === 1 && "lg:order-2")}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.75rem] text-ember">{d.index}</span>
                    <h3 className="text-[clamp(3rem,7vw,6.5rem)] font-semibold uppercase leading-[0.85] tracking-[-0.05em]">{d.title}</h3>
                  </div>
                  <p className="mt-6 text-[1.35rem] font-medium tracking-[-0.02em] sm:text-[1.6rem]">{d.claim}</p>
                  <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-muted">{d.summary}</p>
                  <ul className="mt-8 border-t border-line">
                    {d.items.map((item) => (
                      <li key={item} className="flex items-center justify-between border-b border-line py-3 text-[0.95rem]">
                        {item}
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-line-2 transition-colors group-hover/tilt:bg-ember" />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                    {related.map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}`} className="link-u inline-flex items-center gap-1.5 text-[0.88rem] text-paper">
                        {s.name} <ArrowUpRight aria-hidden="true" className="size-3.5 text-ember" />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className={cn("relative min-h-[22rem] border-t border-line bg-ink grain lg:col-span-6 lg:border-l lg:border-t-0", idx % 2 === 1 && "lg:order-1 lg:border-l-0 lg:border-r")}>
                  <Tilt className="h-full min-h-[22rem] p-8 sm:p-12" max={7}>
                    {visuals[key]}
                  </Tilt>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

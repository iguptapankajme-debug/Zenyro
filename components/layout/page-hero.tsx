import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";

type Props = {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
};

/** Opening block for inner pages: breadcrumb trail, oversized H1 and an offset introduction. */
export function PageHero({ crumbs, eyebrow, title, intro, aside }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-16 pt-32 md:pb-24 md:pt-44">
      <div aria-hidden="true" className="absolute right-[-15%] top-[-30%] -z-10 size-[55vw] max-w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,.10),transparent_62%)]" />
      <div className="shell">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6 animate-fade">{eyebrow}</p>
            <h1 className="display-xl">{title}</h1>
          </div>
          {(intro || aside) && (
            <div className="animate-fade [animation-delay:160ms] lg:col-span-4">
              {intro && <p className="lede">{intro}</p>}
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import { HeroArt, HeroArtRow } from "@/components/art/hero-art";
import { ShaderCanvas } from "@/components/webgl/shader-canvas";
import type { ShaderName } from "@/components/webgl/shaders";

type Props = {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  /** WebGL backdrop behind the hero. */
  shader?: ShaderName;
  /** Show the 3D icon cluster (on by default). */
  art?: boolean;
};

/** Opening block for inner pages: breadcrumb trail, oversized H1 and an offset introduction. */
/** Each section of the site gets its own WebGL backdrop unless a page chooses one. */
const shaderFor = (path: string): ShaderName =>
  path.startsWith("/services") || path.startsWith("/search-growth") ? "warp"
  : path.startsWith("/industries") || path.startsWith("/solutions") ? "grid"
  : path.startsWith("/insights") || path.startsWith("/glossary") ? "streaks"
  : path.startsWith("/pricing") || path.startsWith("/free-audit") ? "ember"
  : "contour";

export function PageHero({ crumbs, eyebrow, title, intro, aside, shader: shaderProp, art = true }: Props) {
  const path = crumbs[crumbs.length - 1]?.path ?? "/";
  const shader = shaderProp ?? shaderFor(path);
  return (
    <section className="relative isolate overflow-hidden border-b border-line pb-16 pt-32 md:pb-24 md:pt-44">
      <ShaderCanvas shader={shader} className="-z-10 [mask-image:linear-gradient(to_left,black,transparent_75%)]" />
      <div aria-hidden="true" className="absolute right-[-15%] top-[-30%] -z-10 size-[55vw] max-w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(21,94,239,.10),transparent_62%)]" />
      <div className="shell">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className={art ? "lg:col-span-7" : "lg:col-span-9"}>
            {art && <HeroArtRow path={path} className="mb-6 lg:hidden" />}
            <p className="eyebrow mb-6 animate-fade">{eyebrow}</p>
            <h1 className="display-xl">{title}</h1>
            {(intro || aside) && (
              <div className="mt-8 max-w-2xl animate-fade [animation-delay:160ms]">
                {intro && <p className="lede">{intro}</p>}
                {aside}
              </div>
            )}
          </div>
          {art && (
            <div className="hidden animate-fade [animation-delay:160ms] lg:col-span-5 lg:block">
              <HeroArt path={path} className="mx-auto" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

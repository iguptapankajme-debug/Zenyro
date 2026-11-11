import { Icon3D, type Icon3DName } from "@/components/home/primitives";
import { cn } from "@/lib/cn";

/**
 * Decorative 3D engine icons for inner-page heroes, chosen by page type so each section of the site
 * has its own cluster: AI assistants on GEO pages, search engines on SEO pages, and so on.
 * Pure CSS motion (orbit-float); static under reduced motion. Hidden from assistive technology.
 */
const sets: [RegExp, Icon3DName[]][] = [
  [/geo|llm|chatgpt|perplexity|claude|ai-visibility|readiness|generative/, ["chatgpt", "perplexity", "claude", "gemini", "copilot"]],
  [/aeo|answer|schema|overviews|snippet/, ["google", "gemini", "chatgpt", "copilot", "globe"]],
  [/local|location|markets|uae|united-states|dubai|state/, ["globe", "google", "bing", "chatgpt", "gemini"]],
  [/technical|audit|tools|enterprise/, ["google", "bing", "brave", "globe", "perplexity"]],
  [/ecommerce|industr|solutions|b2b|saas|manufactur|legal|health|financ/, ["google", "chatgpt", "bing", "perplexity", "gemini"]],
  [/pricing|cost|free-audit|contact|about/, ["globe", "chatgpt", "google", "claude", "copilot"]],
];
const fallback: Icon3DName[] = ["google", "chatgpt", "gemini", "bing", "perplexity"];

export function iconsFor(path: string): Icon3DName[] {
  return sets.find(([rx]) => rx.test(path))?.[1] ?? fallback;
}

/** Positions for five icons on a loose orbit, largest at the centre. */
const slots = [
  { pos: "left-[34%] top-[30%]", size: 128, delay: "0s", z: "z-10" },
  { pos: "left-[4%] top-[8%]", size: 76, delay: "-1.6s", z: "" },
  { pos: "right-[2%] top-[2%]", size: 70, delay: "-3.1s", z: "" },
  { pos: "left-[0%] bottom-[4%]", size: 66, delay: "-2.4s", z: "" },
  { pos: "right-[6%] bottom-[0%]", size: 84, delay: "-4.2s", z: "" },
];

export function HeroArt({ path, className }: { path: string; className?: string }) {
  const icons = iconsFor(path);
  return (
    <div aria-hidden="true" className={cn("pointer-events-none relative h-[17rem] w-[19rem]", className)}>
      <svg viewBox="0 0 300 270" className="absolute inset-0 -z-10 h-full w-full">
        <ellipse cx="150" cy="135" rx="140" ry="58" fill="none" stroke="var(--color-line-2)" strokeDasharray="3 6" transform="rotate(-14 150 135)" />
        <ellipse cx="150" cy="135" rx="96" ry="96" fill="none" stroke="var(--color-line)" />
        <circle cx="150" cy="135" r="70" fill="url(#hero-art-glow)" />
        <defs><radialGradient id="hero-art-glow"><stop offset="0" stopColor="#155eef" stopOpacity=".22" /><stop offset="1" stopColor="#155eef" stopOpacity="0" /></radialGradient></defs>
      </svg>
      {icons.slice(0, 5).map((n, i) => {
        const s = slots[i]!;
        return (
          <span key={n} className={cn("orbit-float absolute", s.pos, s.z)} style={{ animationDelay: s.delay }}>
            <Icon3D name={n} size={s.size} className="drop-shadow-[0_16px_22px_rgba(9,9,11,.16)]" />
          </span>
        );
      })}
    </div>
  );
}

/** Phones: the same icons as an overlapping row. */
export function HeroArtRow({ path, className }: { path: string; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex", className)}>
      {iconsFor(path).slice(0, 5).map((n, i) => (
        <span key={n} className="orbit-float -mr-2" style={{ animationDelay: `${-i * 0.7}s` }}>
          <Icon3D name={n} size={44} className="size-10 drop-shadow-[0_8px_12px_rgba(9,9,11,.14)]" />
        </span>
      ))}
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section frame used across the homepage: a full-width hairline below, and the content held between
 * two vertical rails at the edges of the page column, like a product UI's layout grid.
 */
export function Rail({ children, className, inner, id, label, labelledBy }: { children: ReactNode; className?: string; inner?: string; id?: string; label?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-label={label} aria-labelledby={labelledBy} className={cn("border-b border-line", className)}>
      <div className="shell">
        <div className={cn("border-x border-line px-5 py-20 sm:px-8 md:px-12 md:py-28", inner)}>{children}</div>
      </div>
    </section>
  );
}

/** Deterministic pseudo-random numbers, so the mosaic renders identically on server and client. */
function rng(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
}

/**
 * The blue pixel mosaic: a field of small squares whose density fades from the centre, drawn as one
 * static SVG. Decorative only.
 */
export function PixelField({ className, cols = 72, rows = 26, seed = 11 }: { className?: string; cols?: number; rows?: number; seed?: number }) {
  const r = rng(seed);
  const cells: ReactNode[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dx = (x - cols / 2) / (cols / 2);
      const dy = (y - rows * 0.95) / rows;
      const d = Math.sqrt(dx * dx * 0.9 + dy * dy * 2.4);
      const p = Math.max(0, 1 - d) ** 1.6;
      const v = r();
      if (v < p * 0.9) {
        const o = (0.12 + 0.55 * p * r()).toFixed(2);
        cells.push(<rect key={`${x}-${y}`} x={x * 10} y={y * 10} width="7" height="7" fill="#155eef" opacity={o} />);
      }
    }
  }
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${cols * 10} ${rows * 10}`} preserveAspectRatio="xMidYMax slice" className={cn("pointer-events-none", className)}>
      {cells}
    </svg>
  );
}

/** Simple, brand-neutral glyphs for the places customers search (names are shown as text). */
const glyphs: Record<string, ReactNode> = {
  google: <path d="M12 11v2.8h4.6A5 5 0 1 1 15 8.6l2-2A7.8 7.8 0 1 0 19.8 12c0-.4 0-.7-.1-1z" fill="currentColor" />,
  chatgpt: <path d="M12 3.5a4.3 4.3 0 0 1 4.2 3.4 4.3 4.3 0 0 1 3 6.6 4.3 4.3 0 0 1-4.6 5.9 4.3 4.3 0 0 1-7.2-1.6 4.3 4.3 0 0 1-3-6.6A4.3 4.3 0 0 1 9 5.3a4.3 4.3 0 0 1 3-1.8z" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  perplexity: <path d="M12 3v18M5 7l7 5 7-5M5 7v10l7-5 7 5V7M5 17h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  gemini: <path d="M12 2c.6 5.3 4.7 9.4 10 10-5.3.6-9.4 4.7-10 10-.6-5.3-4.7-9.4-10-10 5.3-.6 9.4-4.7 10-10z" fill="currentColor" />,
  claude: <path d="M12 3l1.8 6.2L20 7.2l-4.5 4.8L20 16.8l-6.2-2L12 21l-1.8-6.2-6.2 2 4.5-4.8L4 7.2l6.2 2z" fill="currentColor" />,
  copilot: <path d="M8 5h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zm1 5v4m6-4v4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  overviews: <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  maps: <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  bing: <path d="M7 3l4 1.4v11.8l5.6-3.2-2.7-1.3-1.7-4.2L18 9.6v5.2L11 19l-4-2.2z" fill="currentColor" />,
  meta: <path d="M3 15c0-4 2.2-8 4.6-8 3 0 5.6 10 8.6 10 1.8 0 4.8-2.3 4.8-6 0-2-1-4-2.8-4-3 0-5.4 8-8.6 8C6 15 6 17 3 15z" fill="none" stroke="currentColor" strokeWidth="1.5" />,
};

export const engines = [
  { key: "google", name: "Google Search" },
  { key: "overviews", name: "AI Overviews" },
  { key: "chatgpt", name: "ChatGPT" },
  { key: "perplexity", name: "Perplexity" },
  { key: "gemini", name: "Gemini" },
  { key: "claude", name: "Claude" },
  { key: "copilot", name: "Copilot" },
  { key: "maps", name: "Google Maps" },
  { key: "bing", name: "Bing" },
  { key: "meta", name: "Meta AI" },
] as const;

export function EngineIcon({ name, className }: { name: keyof typeof glyphs; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4", className)}>
      {glyphs[name]}
    </svg>
  );
}

export function EngineChip({ name, label, className }: { name: keyof typeof glyphs; label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border border-line bg-ink px-2.5 py-1 text-[0.8rem] text-muted shadow-[0_1px_2px_rgba(9,9,11,.04)]", className)}>
      <EngineIcon name={name} className="size-3.5 text-paper" />
      {label}
    </span>
  );
}

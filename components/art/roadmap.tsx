import { cn } from "@/lib/cn";

/**
 * A 12-week roadmap drawn as a timeline: one bar per workstream, revealed on scroll by the global
 * reveal observer. Pure CSS; readable as a list by screen readers.
 */
export function Roadmap({ rows, className }: { rows: { label: string; from: number; to: number }[]; className?: string }) {
  const weeks = 12;
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-ink", className)}>
      <div className="grid grid-cols-[minmax(9rem,14rem)_1fr] border-b border-line bg-ink-2 text-[0.72rem] text-dim">
        <span className="p-3 font-mono uppercase tracking-[0.12em]">Workstream</span>
        <span className="grid grid-cols-12 font-mono">{Array.from({ length: weeks }, (_, i) => <span key={i} className="border-l border-line py-3 text-center">{i + 1}</span>)}</span>
      </div>
      <ol>
        {rows.map((r, i) => (
          <li key={r.label} className="grid grid-cols-[minmax(9rem,14rem)_1fr] border-b border-line last:border-b-0">
            <span className="p-3 text-[0.88rem] font-medium leading-snug">{r.label}<span className="sr-only">: weeks {r.from} to {r.to}</span></span>
            <span className="relative grid grid-cols-12" aria-hidden="true">
              {Array.from({ length: weeks }, (_, k) => <span key={k} className="border-l border-line" />)}
              <span
                data-reveal
                className="absolute inset-y-3 rounded-md bg-gradient-to-r from-ember to-[#5b3fd0] shadow-[0_8px_20px_-10px_rgba(21,94,239,.7)]"
                style={{ left: `${((r.from - 1) / weeks) * 100}%`, width: `${((r.to - r.from + 1) / weeks) * 100}%`, "--d": `${i * 120}ms` } as React.CSSProperties}
              />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

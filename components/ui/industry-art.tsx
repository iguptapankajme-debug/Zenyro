import type { IndustryArt as ArtKey } from "@/data/industries";
import { cn } from "@/lib/cn";

/** Abstract, sector-specific compositions drawn in SVG: no stock photography, nothing to download. */
export function IndustryArt({ art, className }: { art: ArtKey; className?: string }) {
  const stroke = "var(--color-line-2)";
  const ember = "var(--color-ember)";
  return (
    <svg viewBox="0 0 400 300" className={cn("h-full w-full", className)} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="var(--color-ink)" />
      {art === "skyline" && (
        <g>
          {[
            [30, 150], [78, 90], [126, 190], [170, 60], [222, 120], [268, 170], [314, 100], [356, 200],
          ].map(([x, h], i) => (
            <g key={i}>
              <rect x={x} y={300 - h! - 30} width="36" height={h! + 30} fill="none" stroke={i === 3 ? ember : stroke} strokeWidth={i === 3 ? 1.5 : 1} />
              {Array.from({ length: Math.floor(h! / 22) }).map((_, k) => (
                <line key={k} x1={x! + 8} x2={x! + 28} y1={300 - h! - 14 + k * 22} y2={300 - h! - 14 + k * 22} stroke={i === 3 && k < 2 ? ember : stroke} />
              ))}
            </g>
          ))}
          <line x1="0" x2="400" y1="270" y2="270" stroke={stroke} />
        </g>
      )}
      {art === "arches" && (
        <g fill="none">
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 40 + i * 70;
            return <path key={i} d={`M${x} 260 V140 A30 30 0 0 1 ${x + 60} 140 V260`} stroke={i === 2 ? ember : stroke} strokeWidth={i === 2 ? 1.5 : 1} />;
          })}
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${100 + i * 60} 230 V170 A20 20 0 0 1 ${140 + i * 60} 170 V230`} stroke={stroke} opacity=".5" transform="translate(-28 -90) scale(1 .9)" />
          ))}
          <line x1="20" x2="380" y1="260" y2="260" stroke={stroke} />
          <circle cx="210" cy="110" r="5" fill={ember} />
        </g>
      )}
      {art === "pulse" && (
        <g fill="none">
          {[40, 75, 110, 145].map((r) => <circle key={r} cx="200" cy="150" r={r} stroke={stroke} />)}
          <path d="M20 150 H150 L165 110 L185 200 L205 70 L225 175 L238 150 H380" stroke={ember} strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="190" y="20" width="20" height="6" fill={stroke} />
          <rect x="197" y="13" width="6" height="20" fill={stroke} />
        </g>
      )}
      {art === "planes" && (
        <g fill="none">
          <rect x="40" y="40" width="200" height="220" stroke={stroke} />
          <rect x="240" y="40" width="120" height="136" stroke={stroke} />
          <rect x="240" y="176" width="120" height="84" stroke={stroke} />
          <rect x="70" y="180" width="110" height="50" stroke={ember} strokeWidth="1.5" />
          <circle cx="300" cy="108" r="34" stroke={stroke} />
          <path d="M40 40 L240 260" stroke={stroke} opacity=".4" />
          <rect x="262" y="198" width="30" height="40" fill={ember} opacity=".9" />
        </g>
      )}
      {art === "lattice" && (
        <g>
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 10 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={38 + c * 36} cy={42 + r * 36} r="2" fill={stroke} />
            )),
          )}
          <path d="M38 258 L110 186 L146 222 L218 114 L290 150 L362 42" fill="none" stroke={ember} strokeWidth="1.6" />
          {[[110, 186], [218, 114], [362, 42]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" fill={ember} />)}
        </g>
      )}
      {art === "courses" && (
        <g fill="none">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 7 }).map((_, col) => {
              const x = col * 64 - (row % 2 ? 32 : 0) + 6;
              const isEmber = row === 3 && col === 3;
              return <rect key={`${row}-${col}`} x={x} y={14 + row * 36} width="58" height="30" stroke={isEmber ? ember : stroke} fill={isEmber ? "rgba(255,107,53,.12)" : "none"} strokeWidth={isEmber ? 1.5 : 1} />;
            }),
          )}
        </g>
      )}
    </svg>
  );
}

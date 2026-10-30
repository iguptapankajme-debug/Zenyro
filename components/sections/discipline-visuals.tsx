/* Three original, CSS/SVG-only visuals, one per discipline. No WebGL here by design. */

export function BuildVisual() {
  const layers = [
    { z: 0, label: "Infrastructure", cls: "border-line-2" },
    { z: 1, label: "Interface", cls: "border-line-2" },
    { z: 2, label: "Conversion", cls: "border-ember/70" },
  ];
  return (
    <div className="flex h-full items-center justify-center [perspective:1400px]" aria-hidden="true">
      <div className="relative size-56 [transform:rotateX(58deg)_rotateZ(-38deg)] [transform-style:preserve-3d] sm:size-64">
        {layers.map((l) => (
          <div
            key={l.label}
            className={`absolute inset-0 rounded-xl border bg-ink-2/70 transition-transform duration-700 ease-out-expo [transform:translateZ(calc(var(--i)*46px))] group-hover/tilt:[transform:translateZ(calc(var(--i)*74px))] ${l.cls}`}
            style={{ "--i": l.z } as React.CSSProperties}
          >
            <div className="grid h-full grid-cols-6 grid-rows-6 gap-1.5 p-3">
              {l.z === 0 && Array.from({ length: 36 }).map((_, i) => <span key={i} className="rounded-[2px] border border-line" />)}
              {l.z === 1 && (
                <>
                  <span className="col-span-6 rounded border border-line-2" />
                  <span className="col-span-4 row-span-3 rounded border border-line-2" />
                  <span className="col-span-2 row-span-3 rounded border border-line-2" />
                  <span className="col-span-3 row-span-2 rounded border border-line-2" />
                  <span className="col-span-3 row-span-2 rounded border border-line-2" />
                </>
              )}
              {l.z === 2 && (
                <>
                  <span className="col-span-4 col-start-2 row-start-2 rounded bg-paper/80" />
                  <span className="col-span-3 col-start-2 row-start-3 rounded bg-line-2" />
                  <span className="col-span-2 col-start-3 row-start-5 rounded-full bg-ember" />
                </>
              )}
            </div>
            <span className="absolute -bottom-6 left-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const channels = ["Meta", "Google", "Search", "Maps", "Referral"];

export function GrowVisual() {
  const ys = [40, 95, 150, 205, 260];
  return (
    <svg viewBox="0 0 420 300" className="h-full w-full" aria-hidden="true">
      {ys.map((y, i) => {
        const d = `M86 ${y} C 190 ${y}, 200 150, 268 150`;
        return (
          <g key={channels[i]}>
            <path d={d} fill="none" stroke="var(--color-line-2)" strokeWidth="1" />
            <path d={d} fill="none" stroke="var(--color-ember)" strokeWidth="1.2" strokeDasharray="4 16" className="animate-flow" style={{ animationDuration: `${1.8 + i * 0.35}s` }} />
            <circle r="2.6" fill="var(--color-ember)">
              <animateMotion dur={`${2.6 + i * 0.5}s`} repeatCount="indefinite" path={d} />
            </circle>
            <rect x="8" y={y - 13} width="78" height="26" rx="13" fill="var(--color-ink)" stroke="var(--color-line-2)" />
            <text x="47" y={y + 4} textAnchor="middle" fill="var(--color-paper)" fontSize="10.5" fontFamily="var(--font-mono)">{channels[i]}</text>
          </g>
        );
      })}
      <circle cx="290" cy="150" r="24" fill="var(--color-ink)" stroke="var(--color-ember)" />
      <circle cx="290" cy="150" r="34" fill="none" stroke="var(--color-ember)" strokeOpacity=".25">
        <animate attributeName="r" values="26;40;26" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values=".35;0;.35" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="290" y="154" textAnchor="middle" fill="var(--color-paper)" fontSize="10" fontFamily="var(--font-mono)">LEADS</text>
      <path d="M314 150 H 360" stroke="var(--color-ember)" strokeWidth="1.2" strokeDasharray="4 6" className="animate-flow" />
      <rect x="360" y="132" width="54" height="36" rx="18" fill="var(--color-ember)" />
      <text x="387" y="154" textAnchor="middle" fill="var(--color-ember-ink)" fontSize="10" fontWeight="600" fontFamily="var(--font-mono)">SALES</text>
    </svg>
  );
}

const stages = ["Enquiry", "Qualified", "Follow-up", "Booked"];

export function ConvertVisual() {
  return (
    <div className="flex h-full flex-col justify-center px-2" aria-hidden="true">
      <div className="relative grid grid-cols-4 gap-2">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-col gap-2">
            <span className={`font-mono text-[0.6rem] uppercase tracking-[0.12em] ${i === 3 ? "text-ember" : "text-muted"}`}>{s}</span>
            <div className="flex h-44 flex-col gap-1.5 rounded-lg border border-line bg-ink/60 p-1.5">
              {Array.from({ length: 4 - i }).map((_, k) => (
                <span key={k} className={`h-7 rounded-md border ${i === 3 ? "border-ember/50 bg-ember/10" : "border-line-2 bg-ink-3"}`} />
              ))}
            </div>
          </div>
        ))}
        {/* One enquiry travelling through the pipeline */}
        <span className="convert-chip absolute top-[1.85rem] flex h-7 items-center gap-1.5 rounded-md bg-paper px-2 font-mono text-[0.58rem] text-ink shadow-lg shadow-black/40">
          <span className="size-1.5 shrink-0 rounded-full bg-ember" />
          <span className="truncate">New lead</span>
        </span>
      </div>
    </div>
  );
}

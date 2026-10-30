/* Three original, CSS/SVG-only visuals, one per discipline. No WebGL here by design. */

type L = { x: string; y: string; z: number; r: string; d: number };
const layer = (l: L) => ({ "--x": l.x, "--y": l.y, "--z": `${l.z}px`, "--r": l.r, "--d": `${l.d}ms` }) as React.CSSProperties;

/** A browser interface that assembles itself from separate layers when the panel becomes active. */
export function BuildVisual() {
  return (
    <div className="flex h-full items-center justify-center [perspective:1600px]" aria-hidden="true">
      <div className="bv-frame relative aspect-[16/10] w-full max-w-[34rem] rounded-xl border border-line-2 bg-ink [transform-style:preserve-3d]">
        <div className="bv-layer flex h-8 items-center gap-1.5 border-b border-line px-3" style={layer({ x: "0", y: "-60px", z: 30, r: "0deg", d: 0 })}>
          <span className="size-2 rounded-full bg-line-2" /><span className="size-2 rounded-full bg-line-2" /><span className="size-2 rounded-full bg-line-2" />
          <span className="ml-3 h-4 flex-1 rounded-full bg-ink-3 px-2 font-mono text-[0.5rem] leading-4 text-dim">yourbusiness.com</span>
        </div>
        <div className="grid grid-cols-12 gap-2.5 p-4">
          <div className="bv-layer col-span-12 flex items-center justify-between" style={layer({ x: "-40px", y: "-30px", z: 60, r: "-2deg", d: 120 })}>
            <span className="h-2.5 w-14 rounded bg-paper/80" />
            <span className="flex gap-2"><span className="h-1.5 w-8 rounded bg-line-2" /><span className="h-1.5 w-8 rounded bg-line-2" /><span className="h-1.5 w-8 rounded bg-line-2" /></span>
          </div>
          <div className="col-span-7 grid content-start gap-2 pt-3">
            <span className="bv-layer h-5 w-[92%] rounded bg-paper" style={layer({ x: "-120px", y: "10px", z: 110, r: "-4deg", d: 220 })} />
            <span className="bv-layer h-5 w-[70%] rounded bg-paper" style={layer({ x: "-160px", y: "30px", z: 90, r: "3deg", d: 300 })} />
            <span className="bv-layer mt-1 h-1.5 w-[80%] rounded bg-line-2" style={layer({ x: "-60px", y: "60px", z: 40, r: "0deg", d: 380 })} />
            <span className="bv-layer h-1.5 w-[64%] rounded bg-line-2" style={layer({ x: "-60px", y: "70px", z: 40, r: "0deg", d: 420 })} />
            <span className="bv-layer mt-2 h-7 w-28 rounded-full bg-ember" style={layer({ x: "-30px", y: "120px", z: 140, r: "-8deg", d: 520 })} />
          </div>
          <div className="bv-layer col-span-5 aspect-square rounded-lg border border-line-2 bg-[linear-gradient(135deg,#1c1f25,#0d0e11)]" style={layer({ x: "140px", y: "-20px", z: 120, r: "6deg", d: 260 })}>
            <svg viewBox="0 0 100 100" className="h-full w-full"><path d="M10 80 L35 55 L52 68 L88 25" fill="none" stroke="#ff6b35" strokeWidth="2" /><circle cx="88" cy="25" r="3.5" fill="#ff6b35" /></svg>
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="bv-layer col-span-4 grid gap-1.5 rounded-lg border border-line p-2.5" style={layer({ x: `${(i - 1) * 80}px`, y: "120px", z: 70, r: `${(i - 1) * 5}deg`, d: 620 + i * 80 })}>
              <span className="size-4 rounded bg-line-2" />
              <span className="h-1.5 w-[80%] rounded bg-line-2" />
              <span className="h-1.5 w-[55%] rounded bg-line-2" />
            </div>
          ))}
        </div>
        <span className="bv-layer absolute -right-4 -top-4 rounded-full bg-paper px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink shadow-xl" style={layer({ x: "60px", y: "-60px", z: 180, r: "10deg", d: 900 })}>
          LCP 1.2s
        </span>
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
            <path d={d} fill="none" stroke="var(--color-line-2)" strokeWidth="1" className="grow-path" pathLength={1} style={{ transitionDelay: `${i * 90}ms` }} />
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
      <div className="mb-4 flex items-center justify-between border-b border-line pb-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
        <span>Pipeline · today</span>
        <span className="flex items-center gap-2"><span className="size-1.5 animate-pulse rounded-full bg-ember" /> AI qualifying</span>
      </div>
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

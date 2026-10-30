"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const stages = [
  { key: "traffic", label: "Traffic", line: "Ads, search and social bring buyers who are already looking.", builds: ["Meta & Google Ads", "Local SEO"] },
  { key: "leads", label: "Leads", line: "Fast pages turn visits into enquiries by form, chat or call.", builds: ["Landing pages", "Click-to-WhatsApp"] },
  { key: "qualification", label: "Qualification", line: "AI replies in seconds and scores budget, timeline and need.", builds: ["AI scoring", "Instant replies"] },
  { key: "automation", label: "Automation", line: "Follow-ups and CRM updates run on their own, and stop when a lead replies.", builds: ["WhatsApp sequences", "CRM sync"] },
  { key: "appointments", label: "Appointments", line: "Qualified buyers book a call or visit straight into your calendar.", builds: ["Booking", "Reminders"] },
  { key: "sales", label: "Sales", line: "Your team closes with full context; won deals train the ads.", builds: ["Pipeline dashboards", "Offline conversions"] },
] as const;

const W = 1200;
const H = 360;
const nodes = stages.map((_, i) => ({
  x: 100 + i * ((W - 200) / (stages.length - 1)),
  y: 270 - i * 38 + (i % 2 ? -24 : 16),
}));
const segment = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
};
const segments = nodes.slice(1).map((n, i) => segment(nodes[i]!, n));
const fullPath = `M${nodes[0]!.x} ${nodes[0]!.y} ` + segments.map((d) => d.replace(/^M[^C]+/, "")).join(" ");

export function GrowthEngine() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const touched = useRef(false);
  const root = useRef<HTMLElement>(null);
  const stage = stages[active]!;

  // Reveal once in view, then run a single quick pass through the stages.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        setRevealed(true);
        if (reduced) return;
        stages.forEach((_, i) => {
          timers.push(window.setTimeout(() => !touched.current && setActive(i), 900 + i * 520));
        });
        timers.push(window.setTimeout(() => !touched.current && setActive(0), 900 + stages.length * 520 + 400));
      },
      { threshold: 0.3 },
    );
    io.observe(root.current!);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const choose = (i: number) => {
    touched.current = true;
    setActive(i);
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(i); }
    if (e.key === "ArrowRight") { e.preventDefault(); choose(Math.min(i + 1, stages.length - 1)); (e.currentTarget.nextElementSibling as HTMLElement | null)?.focus(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); choose(Math.max(i - 1, 0)); (e.currentTarget.previousElementSibling as HTMLElement | null)?.focus(); }
  };

  return (
    <section ref={root} data-revealed={revealed} aria-labelledby="engine-title" className="engine relative border-y border-line bg-ink-2 py-28 md:py-36">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6">The growth engine</p>
            <h2 id="engine-title" className="display-lg max-w-4xl">
              From first click to <span className="text-ember">closed deal.</span>
            </h2>
          </div>
          <p className="max-w-[16rem] font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.14em] text-muted">Select a stage to explore it.</p>
        </div>

        {/* Pipeline visual (tablet and up) */}
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-12 hidden h-auto w-full overflow-visible md:block" aria-hidden="true">
          <defs>
            <linearGradient id="ge-energy" x1="0" x2="1">
              <stop offset="0" stopColor="var(--color-ember)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--color-ember)" />
            </linearGradient>
          </defs>
          <path d={fullPath} fill="none" stroke="var(--color-line-2)" strokeWidth="1.5" pathLength={1} className="engine-draw" />
          {segments.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={i === active ? "url(#ge-energy)" : "var(--color-ember)"}
              strokeWidth={i === active ? 3 : 1.5}
              strokeDasharray={i === active ? "8 10" : undefined}
              className={cn("transition-opacity duration-700", i === active && "animate-flow")}
              opacity={i < active || i === active ? 1 : 0}
            />
          ))}
          {revealed &&
            [0, 1, 2].map((k) => (
              <circle key={k} r="3.5" fill="var(--color-ember)">
                <animateMotion dur="6s" begin={`${k * 2}s`} repeatCount="indefinite" path={fullPath} />
                <animate attributeName="opacity" values="0;1;1;0" dur="6s" begin={`${k * 2}s`} repeatCount="indefinite" />
              </circle>
            ))}
          {nodes.map((n, i) => {
            const on = i === active;
            return (
              <g key={i} className="engine-node cursor-pointer" style={{ transitionDelay: `${300 + i * 110}ms` }} onClick={() => choose(i)} onPointerEnter={(e) => e.pointerType === "mouse" && choose(i)}>
                <circle cx={n.x} cy={n.y} r="38" fill="transparent" />
                <circle cx={n.x} cy={n.y} r={on ? 30 : 11} fill="var(--color-ember)" opacity={on ? 0.14 : 0} style={{ transition: "r .7s var(--ease-out-expo), opacity .5s" }} />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={on ? 18 : 10}
                  fill={on ? "var(--color-ember)" : "var(--color-ink)"}
                  stroke={i <= active ? "var(--color-ember)" : "var(--color-line-2)"}
                  strokeWidth="1.5"
                  style={{ transition: "r .7s var(--ease-out-expo), fill .4s, stroke .4s" }}
                />
                {i === active + 1 && (
                  <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="var(--color-ember)">
                    <animate attributeName="r" values="10;24;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values=".8;0;.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <text x={n.x} y={n.y + (on ? 48 : 36)} textAnchor="middle" fontSize="13" letterSpacing="1.8" fill={on ? "var(--color-paper)" : "var(--color-muted)"} fontFamily="var(--font-mono)" style={{ transition: "all .5s" }}>
                  {`0${i + 1} ${stages[i]!.label.toUpperCase()}`}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Stage selector: the accessible control for every screen size */}
        <div role="tablist" aria-label="Growth engine stages" className="mt-10 grid grid-cols-3 gap-2 md:mt-6 md:grid-cols-6">
          {stages.map((s, i) => (
            <button
              key={s.key}
              role="tab"
              type="button"
              id={`engine-tab-${s.key}`}
              aria-selected={i === active}
              aria-controls="engine-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "engine-tab rounded-full border px-3 py-2.5 text-[0.8rem] transition-colors",
                i === active ? "border-ember bg-ember text-ember-ink" : i < active ? "border-ember/50 text-paper" : "border-line-2 text-muted hover:text-paper",
              )}
              style={{ transitionDelay: revealed ? undefined : `${i * 60}ms` }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div id="engine-panel" role="tabpanel" aria-labelledby={`engine-tab-${stage.key}`} aria-live="polite" className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-12">
          <p className="font-mono text-[0.8rem] text-ember md:col-span-2">0{active + 1} / 06</p>
          <p key={stage.key} className="animate-fade text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium leading-tight tracking-[-0.025em] md:col-span-7">{stage.line}</p>
          <ul key={`${stage.key}-b`} className="flex flex-wrap content-start gap-2 md:col-span-3 md:justify-end">
            {stage.builds.map((b) => <li key={b} className="animate-fade rounded-full border border-line-2 px-3 py-1.5 text-[0.78rem] text-muted">{b}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

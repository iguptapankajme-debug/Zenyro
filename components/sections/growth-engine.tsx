"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const stages = [
  {
    key: "traffic",
    label: "Traffic",
    title: "The right people find you.",
    body: "Ads, search and social put your offer in front of buyers who are already looking, segmented by intent, location and value.",
    builds: ["Meta & Google Ads", "Local SEO", "Content"],
    satellites: ["Meta", "Google", "SEO"],
  },
  {
    key: "leads",
    label: "Leads",
    title: "Visitors become enquiries.",
    body: "Fast landing pages built for one offer, with forms, WhatsApp and call options placed where intent is highest.",
    builds: ["Landing pages", "Click-to-WhatsApp", "Smart forms"],
    satellites: ["Form", "Chat"],
  },
  {
    key: "qualification",
    label: "Qualification",
    title: "Every lead is scored in seconds.",
    body: "An AI assistant replies instantly, asks about budget, timeline and need, and scores each enquiry against the criteria your sales team agreed.",
    builds: ["AI lead scoring", "Instant replies", "Spam filtering"],
    satellites: ["Score", "Budget"],
  },
  {
    key: "automation",
    label: "Automation",
    title: "Follow-up never forgets.",
    body: "Reminders, nurture messages and CRM updates run automatically, and stop the moment a lead replies or books.",
    builds: ["WhatsApp sequences", "CRM sync", "Task rules"],
    satellites: ["CRM", "Email", "SMS"],
  },
  {
    key: "appointments",
    label: "Appointments",
    title: "Buyers book themselves in.",
    body: "Qualified leads choose a call, visit or consultation slot directly, with confirmations and reminders that reduce no-shows.",
    builds: ["Calendar booking", "Reminders", "No-show recovery"],
    satellites: ["Calendar"],
  },
  {
    key: "sales",
    label: "Sales",
    title: "Your team closes with context.",
    body: "Sales sees every conversation and score. Closed deals flow back to the ad platforms, so the whole engine learns what a customer looks like.",
    builds: ["Pipeline dashboards", "Offline conversions", "Revenue reporting"],
    satellites: ["Revenue", "Feedback"],
  },
] as const;

const W = 1200;
const H = 420;
const nodes = stages.map((_, i) => ({
  x: 110 + i * ((W - 220) / (stages.length - 1)),
  y: 320 - i * 44 + (i % 2 ? -26 : 18),
}));

function segment(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}
const fullPath = nodes.slice(1).reduce((d, n, i) => d + " " + segment(nodes[i]!, n).replace(/^M[^C]+/, ""), `M${nodes[0]!.x} ${nodes[0]!.y}`);

export function GrowthEngine() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const stage = stages[active]!;
  const next = stages[active + 1];

  // On large screens, scrolling through the tall wrapper advances the sequence.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const mqLarge = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!mqLarge.matches || pinned) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        if (total <= 0) return;
        const p = Math.min(Math.max(-r.top / total, 0), 0.999);
        setActive(Math.floor(p * stages.length));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pinned]);

  const choose = (i: number) => {
    setActive(i);
    setPinned(true);
  };

  return (
    <section aria-labelledby="engine-title" className="relative border-y border-line bg-ink-2">
      <div ref={scroller} className="lg:h-[260vh] motion-reduce:lg:h-auto">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pt-16 motion-reduce:lg:static motion-reduce:lg:h-auto">
          <div className="shell py-24 lg:py-0">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-6">The growth engine</p>
                <h2 id="engine-title" className="display-lg max-w-4xl">
                  From first click to <span className="text-ember">closed deal.</span>
                </h2>
              </div>
              <p className="hidden max-w-xs font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-muted lg:block">
                {pinned ? "Select any stage to explore it." : "Scroll to move through the engine, or select a stage."}
              </p>
            </div>

            {/* Desktop and tablet: interactive network */}
            <div className="relative mt-10 hidden md:block">
              <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" aria-hidden="true">
                <defs>
                  <linearGradient id="ge-active" x1="0" x2="1">
                    <stop offset="0" stopColor="var(--color-ember)" stopOpacity="0.2" />
                    <stop offset="1" stopColor="var(--color-ember)" />
                  </linearGradient>
                </defs>
                {/* satellites */}
                {nodes.map((n, i) =>
                  stages[i]!.satellites.map((s, k) => {
                    const angle = -Math.PI / 2 + (k - (stages[i]!.satellites.length - 1) / 2) * 0.9;
                    const sx = n.x + Math.cos(angle) * 78;
                    const sy = n.y + Math.sin(angle) * 78 - 10;
                    const on = i === active;
                    return (
                      <g key={`${i}-${s}`} className="transition-opacity duration-500" opacity={on ? 1 : 0.28}>
                        <line x1={n.x} y1={n.y} x2={sx} y2={sy} stroke={on ? "var(--color-ember)" : "var(--color-line-2)"} strokeWidth="1" strokeDasharray="2 4" />
                        <circle cx={sx} cy={sy} r="3" fill={on ? "var(--color-ember)" : "var(--color-line-2)"} />
                        <text x={sx} y={sy - 10} textAnchor="middle" fontSize="11" fill="var(--color-muted)" fontFamily="var(--font-mono)">{s}</text>
                      </g>
                    );
                  }),
                )}
                {/* backbone */}
                <path d={fullPath} fill="none" stroke="var(--color-line-2)" strokeWidth="1.5" />
                {nodes.slice(1).map((n, i) => {
                  const lit = i < active;
                  const leading = i === active;
                  return (
                    <path
                      key={i}
                      d={segment(nodes[i]!, n)}
                      fill="none"
                      stroke={leading ? "url(#ge-active)" : "var(--color-ember)"}
                      strokeWidth={leading ? 2.5 : 1.5}
                      strokeDasharray={leading ? "6 10" : undefined}
                      className={cn("transition-opacity duration-700", leading && "animate-flow")}
                      opacity={lit || leading ? 1 : 0}
                    />
                  );
                })}
                {/* particles along the whole journey */}
                {[0, 1, 2, 3].map((k) => (
                  <circle key={k} r="3" fill="var(--color-paper)" opacity=".7">
                    <animateMotion dur="7s" begin={`${k * 1.75}s`} repeatCount="indefinite" path={fullPath} />
                  </circle>
                ))}
                {/* nodes */}
                {nodes.map((n, i) => {
                  const on = i === active;
                  const nextUp = i === active + 1;
                  return (
                    <g key={i} className="cursor-pointer" onClick={() => choose(i)} onPointerEnter={(e) => e.pointerType === "mouse" && choose(i)}>
                      <circle cx={n.x} cy={n.y} r="34" fill="transparent" />
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={on ? 22 : 12}
                        fill={on ? "var(--color-ember)" : "var(--color-ink)"}
                        stroke={on || nextUp || i < active ? "var(--color-ember)" : "var(--color-line-2)"}
                        strokeWidth="1.5"
                        style={{ transition: "r .6s var(--ease-out-expo), fill .4s" }}
                      />
                      {nextUp && (
                        <circle cx={n.x} cy={n.y} r="12" fill="none" stroke="var(--color-ember)">
                          <animate attributeName="r" values="12;26;12" dur="2.2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values=".8;0;.8" dur="2.2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <text x={n.x} y={n.y + (on ? 50 : 38)} textAnchor="middle" fontSize="13" letterSpacing="1.6" fill={on ? "var(--color-paper)" : "var(--color-muted)"} fontFamily="var(--font-mono)" style={{ transition: "all .4s" }}>
                        {stages[i]!.label.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="mt-8 grid gap-8 border-t border-line pt-8 lg:grid-cols-12" aria-live="polite">
                <div className="lg:col-span-1">
                  <span className="font-mono text-[0.8rem] text-ember">0{active + 1}/06</span>
                </div>
                <div className="lg:col-span-5">
                  <h3 key={stage.key} className="animate-fade text-[1.9rem] font-semibold leading-tight tracking-[-0.03em]">{stage.title}</h3>
                </div>
                <div className="lg:col-span-6">
                  <p key={`${stage.key}-b`} className="animate-fade text-[1rem] leading-relaxed text-muted">{stage.body}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {stage.builds.map((b) => (
                      <span key={b} className="rounded-full border border-line-2 px-3 py-1.5 text-[0.8rem]">{b}</span>
                    ))}
                    {next && (
                      <button type="button" onClick={() => choose(active + 1)} className="ml-auto inline-flex items-center gap-2 text-[0.85rem] text-ember">
                        Next: {next.label} <ArrowRight aria-hidden="true" className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div role="group" aria-label="Growth engine stages" className="sr-only">
                {stages.map((s, i) => (
                  <button key={s.key} type="button" aria-pressed={i === active} onClick={() => choose(i)} className="focus:not-sr-only">
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Phones: a tappable vertical sequence with all content available */}
            <ol className="relative mt-12 md:hidden">
              <span aria-hidden="true" className="absolute bottom-6 left-[11px] top-6 w-px bg-line-2" />
              {stages.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.key} className="relative pl-10">
                    <span aria-hidden="true" className={cn("absolute left-0 top-5 size-[23px] rounded-full border transition-colors", on ? "border-ember bg-ember" : i < active ? "border-ember bg-ink" : "border-line-2 bg-ink")} />
                    <button type="button" aria-expanded={on} onClick={() => setActive(i)} className="flex w-full items-baseline justify-between py-4 text-left">
                      <span className="text-[1.35rem] font-semibold uppercase tracking-[-0.02em]">{s.label}</span>
                      <span className="font-mono text-[0.7rem] text-muted">0{i + 1}</span>
                    </button>
                    <div hidden={!on} className="pb-6">
                      <p className="font-medium">{s.title}</p>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.builds.map((b) => (
                          <span key={b} className="rounded-full border border-line-2 px-3 py-1 text-[0.78rem]">{b}</span>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

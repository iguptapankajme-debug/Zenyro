"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, Bot, CalendarCheck, Check, Database, MessageSquareText, Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { cn } from "@/lib/cn";

const capabilities = ["AI Sales Assistants", "WhatsApp Automation", "AI Voice Agents", "Intelligent CRM", "Lead Scoring", "Workflow Automation"];

type Scenario = {
  key: string;
  label: string;
  channel: string;
  from: string;
  message: string;
  reply: string;
  answer: string;
  score: number;
  temperature: string;
  interest: string;
  appointment: string;
  notify: string;
  steps: { detail: string }[];
};

// Fictional scenarios. No real customer information is used anywhere in this demo.
const scenarios: Scenario[] = [
  {
    key: "realestate",
    label: "Real estate",
    channel: "WhatsApp",
    from: "Aman (sample)",
    message: "Hi, is the 3BHK in your new tower still available? Budget is around ₹1.2 Cr.",
    reply: "Yes, a few 3BHK homes are open. When are you hoping to move, and will you need a home loan?",
    answer: "Within 3 months. Loan is pre-approved.",
    score: 84,
    temperature: "Hot",
    interest: "3BHK · ₹1.1–1.3 Cr",
    appointment: "Site visit · Sat 11:00",
    notify: "Sales advisor alerted on WhatsApp",
    steps: [{ detail: "WhatsApp ad · 21:47" }, { detail: "Budget, timeline and financing captured" }, { detail: "Deal created in “Tower launch”" }, { detail: "Visit requested, reminder set for Fri" }, { detail: "Advisor notified with full context" }],
  },
  {
    key: "clinic",
    label: "Clinic",
    channel: "Website chat",
    from: "Neha (sample)",
    message: "Hello, I need a dental cleaning this week, evening if possible.",
    reply: "Happy to help. Are you a new patient, and does Thursday at 6:30 pm work for you?",
    answer: "New patient. Thursday works.",
    score: 72,
    temperature: "Ready to book",
    interest: "Cleaning · new patient",
    appointment: "Thu 18:30 · confirmed",
    notify: "Front desk notified",
    steps: [{ detail: "Website chat · 19:12" }, { detail: "Service, preference and patient type captured" }, { detail: "Patient record created, consent stored" }, { detail: "Appointment held, confirmation sent" }, { detail: "Front desk calendar updated" }],
  },
  {
    key: "hotel",
    label: "Hotel",
    channel: "Instagram DM",
    from: "Kabir (sample)",
    message: "We're planning a wedding for about 180 guests next February. Do you have dates?",
    reply: "Congratulations! We have weekends open in February. Could you share an approximate budget so we can suggest the right venue?",
    answer: "Around ₹25–30 lakh.",
    score: 78,
    temperature: "Warm",
    interest: "Wedding · 180 guests · Feb",
    appointment: "Call with events team · Tue 16:00",
    notify: "Events manager notified",
    steps: [{ detail: "Instagram · 23:05" }, { detail: "Date, guest count and budget captured" }, { detail: "Event enquiry created with open dates" }, { detail: "Call requested with events team" }, { detail: "Manager notified by email and WhatsApp" }],
  },
];

const stepMeta = [
  { title: "Enquiry received", icon: MessageSquareText },
  { title: "AI qualification", icon: Bot },
  { title: "CRM updated", icon: Database },
  { title: "Appointment requested", icon: CalendarCheck },
  { title: "Sales notified", icon: Bell },
];
const stageNames = ["New", "Qualifying", "Qualified", "Appointment requested", "With sales"];

export function CapabilitiesDemo() {
  const [scenario, setScenario] = useState(0);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const s = scenarios[scenario]!;
  const last = stepMeta.length - 1;
  const done = step >= last;
  const running = playing && !done;

  const replay = useCallback(() => {
    setStep(0);
    setPlaying(true);
  }, []);

  // Start automatically the first time the console scrolls into view.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting && !started.current) {
        started.current = true;
        if (reduced) setStep(last);
        else replay();
      }
    }, { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, [replay, last]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setStep((v) => v + 1), 1900);
    return () => clearTimeout(t);
  }, [running, step]);

  const pickScenario = (i: number) => {
    setScenario(i);
    setStep(0);
    setPlaying(true);
  };

  return (
    <div ref={root} className="mt-14 md:mt-20">
      <ul className="mb-6 flex flex-wrap gap-2" aria-label="AI capabilities">
        {capabilities.map((c) => <li key={c} className="rounded-full border border-line-2 px-3 py-1.5 text-[0.8rem] text-muted">{c}</li>)}
      </ul>

      <div className="console overflow-hidden rounded-[1.75rem] border border-line bg-[#050608] shadow-[0_60px_120px_-60px_rgba(255,107,53,.25)]">
        {/* Title bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-line-2" /><span className="size-2.5 rounded-full bg-line-2" /><span className="size-2.5 rounded-full bg-line-2" /></span>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Zenyro ops console</span>
          </div>
          <div role="tablist" aria-label="Demo scenario" className="flex flex-wrap gap-1.5">
            {scenarios.map((sc, i) => (
              <button key={sc.key} role="tab" type="button" aria-selected={scenario === i} onClick={() => pickScenario(i)}
                className={cn("rounded-full px-3 py-1.5 text-[0.78rem] transition-colors", scenario === i ? "bg-paper text-ink" : "border border-line-2 text-muted hover:text-paper")}>
                {sc.label}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-2 rounded-full border border-ember/60 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ember">
            <span className={cn("size-1.5 rounded-full bg-ember", running && "animate-pulse")} /> Simulation · fictional data
          </span>
        </div>

        <div className="grid md:grid-cols-12">
          {/* Inbox */}
          <div className="flex min-h-[22rem] flex-col border-b border-line p-5 sm:p-6 md:col-span-4 md:border-b-0 md:border-r">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-dim">{s.channel} · {s.from}</p>
            <div key={s.key} className="mt-5 flex flex-1 flex-col gap-3" aria-live="polite">
              {step >= 0 && <Bubble side="in">{s.message}</Bubble>}
              {step === 0 && running && <Typing />}
              {step >= 1 && <Bubble side="out" label="Zenyro AI">{s.reply}</Bubble>}
              {step >= 1 && <Bubble side="in" delay={700}>{s.answer}</Bubble>}
              {step >= 3 && <Bubble side="out" label="Zenyro AI">Booked: {s.appointment}. You&apos;ll get a reminder.</Bubble>}
              {step < 0 && <p className="m-auto text-center text-[0.85rem] text-dim">Press Play to send a sample enquiry.</p>}
            </div>
          </div>

          {/* Workflow */}
          <ol className="relative border-b border-line p-5 sm:p-6 md:col-span-4 md:border-b-0 md:border-r">
            {stepMeta.map((m, i) => {
              const state = i < step || (done && i === last) ? "done" : i === step ? "current" : "todo";
              const Icon = m.icon;
              return (
                <li key={m.title} className={cn("relative flex gap-4 rounded-2xl p-2.5 transition-colors duration-500", state === "current" && "bg-ember/[0.07]")}>
                  {i < last && (
                    <span aria-hidden="true" className="absolute left-[29px] top-12 h-[calc(100%-2.25rem)] w-px bg-line">
                      <span className={cn("absolute inset-x-0 top-0 bg-ember transition-[height] duration-700", i < step ? "h-full" : "h-0")} />
                    </span>
                  )}
                  <span className={cn("relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500", state === "todo" ? "border-line-2 text-dim" : state === "current" ? "scale-110 border-ember bg-ember text-ember-ink shadow-[0_0_24px_rgba(255,107,53,.5)]" : "border-ember text-ember")}>
                    {state === "done" ? <Check aria-hidden="true" className="size-4" /> : <Icon aria-hidden="true" className="size-4" />}
                  </span>
                  <div className="min-w-0 pt-1">
                    <p className={cn("flex items-center gap-2 text-[0.92rem] font-medium transition-colors", state === "todo" ? "text-dim" : "text-paper")}>
                      {m.title}
                      <span className={cn("rounded-full px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em]", state === "done" ? "bg-ember/15 text-ember" : state === "current" ? "bg-paper text-ink" : "text-dim")}>
                        {state === "done" ? "Done" : state === "current" ? (running ? "Running" : "Paused") : "Queued"}
                      </span>
                    </p>
                    {state !== "todo" && <p key={`${s.key}-${i}`} className="mt-1 animate-fade font-mono text-[0.7rem] text-muted">{s.steps[i]!.detail}</p>}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* CRM record */}
          <div className="relative p-5 sm:p-6 md:col-span-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-dim">CRM record</p>
            <div className={cn("mt-5 rounded-2xl border p-5 transition-colors duration-700", step >= 2 ? "border-ember/40 bg-ink-2" : "border-line bg-ink")}>
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{step >= 0 ? s.from : "Waiting for enquiry"}</p>
                <span className={cn("rounded-full px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] transition-colors", step >= 2 ? "bg-ember text-ember-ink" : "bg-ink-3 text-muted")}>
                  {step >= 0 ? stageNames[step] : "—"}
                </span>
              </div>
              <dl className="mt-5 grid gap-3 text-[0.82rem]">
                <Row label="Source" value={step >= 0 ? s.channel : ""} />
                <Row label="Interest" value={step >= 1 ? s.interest : ""} />
                <div>
                  <dt className="flex justify-between text-muted"><span>Lead score</span><span className="font-mono tabular-nums text-paper">{step >= 1 ? `${s.score} · ${s.temperature}` : "—"}</span></dt>
                  <dd className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-3">
                    <span className="block h-full rounded-full bg-ember transition-[width] duration-1000 ease-out-expo" style={{ width: step >= 1 ? `${s.score}%` : "0%" }} />
                  </dd>
                </div>
                <Row label="Next step" value={step >= 3 ? s.appointment : ""} />
              </dl>
            </div>
            {step >= 4 && (
              <div key={s.key} role="status" className="toast mt-4 flex items-center gap-3 rounded-2xl bg-paper p-4 text-ink">
                <Bell aria-hidden="true" className="size-4 shrink-0 text-ember" />
                <p className="text-[0.85rem] font-medium">{s.notify}</p>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 border-t border-line px-5 py-4 sm:px-6">
          <button type="button" onClick={() => (running ? setPlaying(false) : done || step < 0 ? replay() : setPlaying(true))}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-ember px-5 text-[0.85rem] font-medium text-ember-ink transition-colors hover:bg-ember-2">
            {running ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
            {running ? "Pause" : done ? "Replay" : "Play"}
          </button>
          <button type="button" disabled={done} onClick={() => { setPlaying(false); setStep((v) => Math.min(v + 1, last)); }}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line-2 px-4 text-[0.85rem] disabled:opacity-40">
            <StepForward aria-hidden="true" className="size-4" /> Next step
          </button>
          <button type="button" onClick={() => { setPlaying(false); setStep(-1); }} aria-label="Reset demo"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line-2">
            <RotateCcw aria-hidden="true" className="size-4" />
          </button>
          <div className="ml-auto flex items-center gap-1.5" aria-hidden="true">
            {stepMeta.map((_, i) => <span key={i} className={cn("h-1 w-6 rounded-full transition-colors duration-500", i <= step ? "bg-ember" : "bg-line-2")} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, label, delay = 0, children }: { side: "in" | "out"; label?: string; delay?: number; children: React.ReactNode }) {
  return (
    <div className={cn("bubble max-w-[88%]", side === "out" ? "self-end" : "self-start")} style={{ animationDelay: `${delay}ms` }}>
      {label && <p className="mb-1 text-right font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ember">{label}</p>}
      <p className={cn("rounded-2xl px-4 py-3 text-[0.88rem] leading-snug", side === "out" ? "rounded-br-md bg-ember text-ember-ink" : "rounded-bl-md bg-ink-3 text-paper")}>{children}</p>
    </div>
  );
}

function Typing() {
  return (
    <div className="bubble flex w-16 items-center justify-center gap-1 self-end rounded-2xl rounded-br-md bg-ink-3 py-3.5" aria-label="AI is typing">
      {[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-muted" style={{ animation: `typing 1s ${i * 0.15}s infinite` }} />)}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={cn("text-right transition-colors", value ? "text-paper" : "text-dim")}>{value || "—"}</dd>
    </div>
  );
}

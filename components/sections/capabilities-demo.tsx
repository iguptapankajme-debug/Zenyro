"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, Bot, CalendarCheck, Database, MessageSquareText, Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { cn } from "@/lib/cn";

const capabilities = [
  { name: "AI Sales Assistants", body: "Answer product and pricing questions in your brand voice, any hour, then guide buyers to the next step." },
  { name: "WhatsApp Automation", body: "Instant replies, follow-ups and reminders on the official WhatsApp Business Platform." },
  { name: "AI Voice Agents", body: "Answer or return calls, qualify the caller and book appointments, with every call transcribed." },
  { name: "Intelligent CRM", body: "Every conversation summarised into the right record, with next steps suggested for your team." },
  { name: "Lead Scoring", body: "Each enquiry scored on fit and intent, so sales calls the best opportunities first." },
  { name: "Workflow Automation", body: "Quotes, onboarding, notifications and reports moved between your apps automatically." },
];

type Scenario = {
  key: string;
  label: string;
  channel: string;
  from: string;
  message: string;
  steps: { detail: string[] }[];
};

const scenarios: Scenario[] = [
  {
    key: "realestate",
    label: "Real estate",
    channel: "WhatsApp",
    from: "Sample lead · Aman",
    message: "Hi, is the 3BHK in your new tower still available? Budget is around ₹1.2 Cr.",
    steps: [
      { detail: ["Channel: WhatsApp ad", "Received 21:47, outside office hours"] },
      { detail: ["Intent: buying, 3BHK", "Budget: ₹1.1–1.3 Cr · Timeline: 3 months", "Lead score: 84 / 100 · Hot"] },
      { detail: ["Deal created in 'Tower launch' pipeline", "Conversation summary attached"] },
      { detail: ["Site visit requested: Saturday, 11:00", "Reminder scheduled for Friday evening"] },
      { detail: ["Sales advisor alerted on WhatsApp", "Full context and score included"] },
    ],
  },
  {
    key: "clinic",
    label: "Clinic",
    channel: "Website chat",
    from: "Sample lead · Neha",
    message: "Hello, I need a dental cleaning this week, evening if possible.",
    steps: [
      { detail: ["Channel: website chat", "Received 19:12"] },
      { detail: ["New patient · Service: cleaning", "Preference: weekday evening", "Priority: standard"] },
      { detail: ["Patient record created", "Consent to contact recorded"] },
      { detail: ["Appointment held: Thursday, 18:30", "Confirmation sent by WhatsApp"] },
      { detail: ["Front desk notified", "Appointment visible in clinic calendar"] },
    ],
  },
  {
    key: "hotel",
    label: "Hotel",
    channel: "Instagram DM",
    from: "Sample lead · Kabir",
    message: "We're planning a wedding for about 180 guests next February. Do you have dates?",
    steps: [
      { detail: ["Channel: Instagram", "Received 23:05"] },
      { detail: ["Event: wedding · 180 guests · February", "Budget band requested and received", "Lead score: 78 / 100 · Warm"] },
      { detail: ["Event enquiry created", "Available dates attached"] },
      { detail: ["Call with events team requested: Tuesday, 16:00"] },
      { detail: ["Events manager notified by email and WhatsApp"] },
    ],
  },
];

const stepMeta = [
  { title: "New enquiry received", icon: MessageSquareText },
  { title: "AI qualification", icon: Bot },
  { title: "CRM updated", icon: Database },
  { title: "Appointment requested", icon: CalendarCheck },
  { title: "Sales team notified", icon: Bell },
];

export function CapabilitiesDemo() {
  const [cap, setCap] = useState(0);
  const [scenario, setScenario] = useState(0);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const s = scenarios[scenario]!;

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
        if (reduced) setStep(stepMeta.length - 1);
        else replay();
      }
    }, { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, [replay]);

  const done = step >= stepMeta.length - 1;
  const running = playing && !done;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setStep((v) => v + 1), 1500);
    return () => clearTimeout(t);
  }, [running, step]);

  return (
    <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
      <ul className="lg:col-span-4" aria-label="AI capabilities">
        {capabilities.map((c, i) => (
          <li key={c.name} className="border-b border-line first:border-t">
            <button type="button" aria-expanded={cap === i} onClick={() => setCap(i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
              <span className={cn("text-[1.15rem] font-medium tracking-[-0.01em] transition-colors", cap === i ? "text-paper" : "text-muted hover:text-paper")}>{c.name}</span>
              <span aria-hidden="true" className={cn("size-2 rounded-full transition-colors", cap === i ? "bg-ember" : "bg-line-2")} />
            </button>
            <p hidden={cap !== i} className="-mt-1 pb-5 text-[0.92rem] leading-relaxed text-muted">{c.body}</p>
          </li>
        ))}
      </ul>

      <div ref={root} className="overflow-hidden rounded-[1.75rem] border border-line bg-ink lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-line-2" /><span className="size-2.5 rounded-full bg-line-2" /><span className="size-2.5 rounded-full bg-line-2" />
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">Zenyro operations console</span>
          </div>
          <span className="rounded-full border border-ember/60 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ember">Interactive demo · fictional data</span>
        </div>

        <div className="grid gap-0 md:grid-cols-5">
          <div className="border-b border-line p-5 sm:p-6 md:col-span-2 md:border-b-0 md:border-r">
            <div role="tablist" aria-label="Demo scenario" className="flex flex-wrap gap-1.5">
              {scenarios.map((sc, i) => (
                <button
                  key={sc.key}
                  role="tab"
                  type="button"
                  aria-selected={scenario === i}
                  onClick={() => { setScenario(i); setStep(0); setPlaying(true); }}
                  className={cn("rounded-full px-3 py-1.5 text-[0.8rem] transition-colors", scenario === i ? "bg-paper text-ink" : "border border-line-2 text-muted hover:text-paper")}
                >
                  {sc.label}
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-line bg-ink-2 p-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{s.channel} · {s.from}</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed">“{s.message}”</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" onClick={() => (running ? setPlaying(false) : done ? replay() : setPlaying(true))} className="inline-flex h-10 items-center gap-2 rounded-full bg-ember px-4 text-[0.85rem] font-medium text-ember-ink">
                {running ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
                {running ? "Pause" : done ? "Replay" : "Play"}
              </button>
              <button type="button" disabled={done} onClick={() => { setPlaying(false); setStep((v) => Math.min(v + 1, stepMeta.length - 1)); }} className="inline-flex h-10 items-center gap-2 rounded-full border border-line-2 px-4 text-[0.85rem] disabled:opacity-40">
                <StepForward aria-hidden="true" className="size-4" /> Next step
              </button>
              <button type="button" onClick={() => { setPlaying(false); setStep(-1); }} aria-label="Reset demo" className="inline-flex size-10 items-center justify-center rounded-full border border-line-2">
                <RotateCcw aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>

          <ol className="relative p-5 sm:p-6 md:col-span-3" aria-live="polite">
            {stepMeta.map((m, i) => {
              const state = i < step ? "done" : i === step ? "current" : "todo";
              const Icon = m.icon;
              return (
                <li key={m.title} className="relative flex gap-4 pb-5 last:pb-0">
                  {i < stepMeta.length - 1 && (
                    <span aria-hidden="true" className="absolute left-[17px] top-9 h-[calc(100%-1.75rem)] w-px bg-line">
                      <span className={cn("absolute inset-x-0 top-0 bg-ember transition-[height] duration-700", i < step ? "h-full" : "h-0")} />
                    </span>
                  )}
                  <span className={cn("relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500", state === "todo" ? "border-line-2 text-dim" : state === "current" ? "border-ember bg-ember text-ember-ink" : "border-ember text-ember")}>
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0 pt-1.5">
                    <p className={cn("text-[0.95rem] font-medium transition-colors", state === "todo" ? "text-dim" : "text-paper")}>
                      {m.title}
                      <span className="sr-only">{state === "done" ? " (complete)" : state === "current" ? " (in progress)" : " (waiting)"}</span>
                    </p>
                    {state !== "todo" && (
                      <ul key={`${s.key}-${i}`} className="mt-1.5 grid gap-0.5 animate-fade font-mono text-[0.72rem] leading-relaxed text-muted">
                        {s.steps[i]!.detail.map((d) => <li key={d}>{d}</li>)}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

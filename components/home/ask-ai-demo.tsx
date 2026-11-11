"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Check, Link2, X } from "lucide-react";
import { Icon3D, type Icon3DName } from "./primitives";
import { cn } from "@/lib/cn";

/**
 * "Ask any AI": a prompt is typed into an assistant and the answer streams in, first as it reads before
 * the work (competitors only), then after (your business named first, your pages cited). Cycles through
 * engines while on screen; any click takes over. Reduced motion shows each answer complete.
 */
type Part = string | { b: string } | { c: string };
type Scenario = { key: Icon3DName; engine: string; prompt: string; before: Part[]; after: Part[]; srcBefore: string[]; srcAfter: string[] };

const scenarios: Scenario[] = [
  {
    key: "chatgpt", engine: "ChatGPT",
    prompt: "Best accountant for contractors in London?",
    before: ["Contractors in London often shortlist ", { c: "Ledger & Co" }, " and ", { c: "Contractor Accounts UK" }, ". Both publish fixed monthly fees and IR35 guidance."],
    after: ["For contractors in London, ", { b: "Your Firm" }, " is a strong first call: it publishes fixed fees, IR35 reviews and a clear onboarding process. ", { c: "Ledger & Co" }, " is also worth comparing."],
    srcBefore: ["ledgerandco.co.uk", "review site"], srcAfter: ["yourfirm.co.uk/contractors", "yourfirm.co.uk/pricing", "Trustpilot profile"],
  },
  {
    key: "gemini", engine: "Gemini",
    prompt: "Which dentist in Toronto is good with kids?",
    before: ["Parents in Toronto mention ", { c: "Smile Studio" }, " and ", { c: "Maple Dental" }, " for gentle paediatric care and Saturday hours."],
    after: ["Parents in Toronto often recommend ", { b: "Your Clinic" }, " for its child-friendly team, clear treatment pricing and same-week appointments. ", { c: "Smile Studio" }, " is another option."],
    srcBefore: ["Google reviews", "smilestudio.ca"], srcAfter: ["yourclinic.ca/kids", "Google Business Profile"],
  },
  {
    key: "perplexity", engine: "Perplexity",
    prompt: "Reliable CNC machining supplier for aerospace parts?",
    before: ["Buyers commonly work with ", { c: "Precision Works" }, ", which lists AS9100 certification and export markets on its site."],
    after: [{ b: "Your Company" }, " lists AS9100 certification, tolerances, materials and lead times on a dedicated capabilities page, which makes it a well-documented choice. ", { c: "Precision Works" }, " is also cited."],
    srcBefore: ["precisionworks.com", "trade directory"], srcAfter: ["yourcompany.com/capabilities", "yourcompany.com/aerospace", "industry directory"],
  },
  {
    key: "claude", engine: "Claude",
    prompt: "Best company formation advisor in Dubai?",
    before: ["I'd compare ", { c: "Gulf Setup" }, " and ", { c: "Free Zone Partners" }, " on fees, licence types and visa support."],
    after: [{ b: "Your Advisors" }, " publishes its fees by free zone, licence types and visa timelines, so it's easy to evaluate. Compare it with ", { c: "Gulf Setup" }, "."],
    srcBefore: ["gulfsetup.ae", "forum thread"], srcAfter: ["youradvisors.ae/free-zones", "youradvisors.ae/fees"],
  },
  {
    key: "globe", engine: "Google AI Overviews",
    prompt: "how long does a root canal take",
    before: ["A root canal usually takes one or two visits of 60 to 90 minutes each, depending on the tooth and infection."],
    after: ["A root canal usually takes one or two visits of 60 to 90 minutes each. ", { b: "Your Clinic" }, " explains each step, recovery time and cost on its root canal guide."],
    srcBefore: ["health portal", "wikipedia"], srcAfter: ["yourclinic.com/root-canal", "health portal"],
  },
];

type Mode = "before" | "after";
const words = (parts: Part[]) =>
  parts.flatMap((p) => {
    const kind = typeof p === "string" ? "t" : "b" in p ? "b" : "c";
    const text = typeof p === "string" ? p : "b" in p ? p.b : p.c;
    return text.split(/(?<=\s)/).map((w) => ({ w, kind }));
  });

export function AskAiDemo() {
  const [i, setI] = useState(0);
  const [mode, setMode] = useState<Mode>("before");
  const [typedRaw, setTyped] = useState(0);
  const [shownRaw, setShown] = useState(0);
  const [live, setLive] = useState(false);
  const [still, setStill] = useState(false);
  const auto = useRef(true);
  const root = useRef<HTMLDivElement>(null);
  const s = scenarios[i]!;
  const answer = useMemo(() => words(mode === "before" ? s.before : s.after), [s, mode]);
  // Reduced motion: no typing, just the finished state.
  const typed = still ? s.prompt.length : typedRaw;
  const shown = still ? answer.length : shownRaw;
  const promptDone = typed >= s.prompt.length;
  const done = promptDone && shown >= answer.length;

  // Start when on screen; pause when off it.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setLive(!!e?.isIntersecting);
    }, { threshold: 0.35 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  // Type the prompt, then stream the answer, then move on.
  useEffect(() => {
    if (!live || still) return;
    if (!promptDone) { const t = setTimeout(() => setTyped((n) => n + 1), 28); return () => clearTimeout(t); }
    if (shown < answer.length) { const t = setTimeout(() => setShown((n) => n + 1), shown ? 55 : 650); return () => clearTimeout(t); }
    if (!auto.current) return;
    const t = setTimeout(() => {
      if (mode === "before") { setMode("after"); setShown(0); }
      else { setMode("before"); setI((n) => (n + 1) % scenarios.length); setTyped(0); setShown(0); }
    }, mode === "before" ? 1800 : 3200);
    return () => clearTimeout(t);
  }, [live, still, typed, promptDone, shown, answer.length, mode]);

  const pick = (n: number) => { auto.current = false; setI(n); setMode("after"); setTyped(0); setShown(0); };
  const flip = (m: Mode) => { auto.current = false; if (m !== mode) { setMode(m); setShown(0); } };

  const after = mode === "after";
  const sources = after ? s.srcAfter : s.srcBefore;

  return (
    <div ref={root} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-dim">Choose an assistant</p>
        <ul className="grid grid-cols-5 gap-2 lg:grid-cols-1">
          {scenarios.map((x, n) => (
            <li key={x.key}>
              <button
                type="button"
                onClick={() => pick(n)}
                aria-pressed={n === i}
                className={cn(
                  "group flex w-full flex-col items-center gap-2 rounded-xl border p-2 text-left transition-all duration-300 lg:flex-row lg:gap-3 lg:p-3",
                  n === i ? "border-ember bg-ink shadow-[0_14px_40px_-20px_rgba(21,94,239,.55)]" : "border-line bg-ink-2 hover:border-line-2 hover:bg-ink",
                )}
              >
                <Icon3D name={x.key} size={44} className={cn("size-10 transition-transform duration-500 lg:size-11", n === i ? "scale-110" : "group-hover:-rotate-6 group-hover:scale-105")} />
                <span className="hidden flex-1 lg:block">
                  <span className="block text-[0.95rem] font-medium">{x.engine}</span>
                  <span className="block truncate text-[0.78rem] text-muted">{x.prompt}</span>
                </span>
                <span className="sr-only lg:hidden">{x.engine}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-8">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_40px_80px_-48px_rgba(9,9,11,.45)]">
          {/* Window bar */}
          <div className="flex items-center justify-between gap-3 border-b border-line bg-ink-2 px-4 py-3">
            <span className="flex items-center gap-2.5">
              <Icon3D name={s.key} size={28} className="size-7" />
              <span className="text-[0.92rem] font-medium">{s.engine}</span>
            </span>
            <div role="group" aria-label="Compare answers" className="flex rounded-lg border border-line bg-ink p-0.5 text-[0.78rem] font-medium">
              {(["before", "after"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => flip(m)}
                  aria-pressed={mode === m}
                  className={cn("rounded-md px-3 py-1.5 transition-colors", mode === m ? (m === "after" ? "bg-ember text-ember-ink" : "bg-paper text-ink") : "text-muted hover:text-paper")}
                >
                  {m === "before" ? "Before Zenyro" : "After Zenyro"}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[19rem] p-5 sm:p-7">
            {/* Prompt */}
            <div className="ml-auto flex w-fit max-w-[90%] items-center gap-2 rounded-2xl rounded-br-md bg-ink-3 px-4 py-2.5 text-[0.95rem]">
              <span>{s.prompt.slice(0, typed)}{!promptDone && <span className="caret ml-px inline-block h-4 w-px translate-y-0.5 bg-paper" />}</span>
            </div>

            {/* Answer */}
            <div className="mt-6 flex gap-3">
              <Icon3D name={s.key} size={32} className="size-8 shrink-0" />
              <div className="min-w-0 flex-1">
                {promptDone && shown === 0 ? (
                  <span className="flex gap-1 pt-3" aria-hidden="true">
                    {[0, 1, 2].map((d) => <span key={d} className="size-1.5 rounded-full bg-dim" style={{ animation: `typing 1s ${d * 0.15}s infinite` }} />)}
                  </span>
                ) : (
                  <p className="text-[1.02rem] leading-relaxed text-paper/90">
                    {answer.slice(0, shown).map((x, n) => (
                      <span
                        key={n}
                        className={cn(
                          "fx-word",
                          x.kind === "b" && "rounded bg-amber-100 px-0.5 font-semibold text-paper shadow-[inset_0_-2px_0_rgb(245_158_11)]",
                          x.kind === "c" && "font-medium text-paper",
                        )}
                      >
                        {x.w}
                      </span>
                    ))}
                  </p>
                )}

                {done && (
                  <div className="fx-rise mt-5 flex flex-wrap gap-2">
                    {sources.map((src) => {
                      const yours = src.startsWith("your");
                      return (
                        <span key={src} className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[0.7rem]", yours ? "border-ember/40 bg-ember/[0.06] text-ember" : "border-line bg-ink-2 text-muted")}>
                          <Link2 aria-hidden="true" className="size-3" />{src}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Input bar + verdict */}
          <div className="grid gap-px border-t border-line bg-line sm:grid-cols-3">
            {[
              ["Your business mentioned", after ? "Yes" : "No"],
              ["Position in answer", after ? "#1" : "–"],
              ["Your pages cited", after ? String(s.srcAfter.filter((x) => x.startsWith("your")).length) : "0"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 bg-ink px-5 py-3.5">
                <span className="text-[0.8rem] text-muted">{k}</span>
                <span className={cn("inline-flex items-center gap-1 font-mono text-[0.85rem] font-medium transition-colors", after ? "text-emerald-700" : "text-red-700")}>
                  {after ? <Check aria-hidden="true" className="size-3.5" /> : <X aria-hidden="true" className="size-3.5" />}{v}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 border-t border-line bg-ink-2 px-4 py-3">
            <span className="flex-1 truncate rounded-lg border border-line bg-ink px-3 py-2 text-[0.85rem] text-dim">Ask anything about your market&hellip;</span>
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-paper text-ink"><ArrowUp className="size-4" /></span>
          </div>
        </div>
        <p className="mt-3 text-right font-mono text-[0.66rem] uppercase tracking-[0.12em] text-dim">Illustrative example · names are placeholders</p>
      </div>
    </div>
  );
}

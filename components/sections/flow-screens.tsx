import type { CSSProperties } from "react";
import { Check, MapPin, Search, Sparkles } from "lucide-react";
import type { FlowScreen } from "@/data/work";
import type { IndustryArt as ArtKey } from "@/data/industries";
import { IndustryArt } from "@/components/ui/industry-art";
import { cn } from "@/lib/cn";

/**
 * Motion-graphic mock screens for each stage of a system walkthrough. Every screen plays its
 * sequence once on mount (the parent remounts it when the stage changes); reduced motion shows
 * the final state. Decorative: the stage's title and description carry the meaning.
 */
const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Cursor({ delay = 0.9 }: { delay?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="fx-cursor pointer-events-none absolute -bottom-3 right-3 z-10 size-6 drop-shadow-[0_4px_10px_rgba(0,0,0,.6)]" style={d(delay)}>
      <path d="M4 2l15 9.5-6.5 1.4L10 20z" fill="#f7f7f5" stroke="#08090b" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("w-full max-w-[24rem] overflow-hidden rounded-2xl border border-line-2 bg-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)]", className)}>{children}</div>;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIMES = ["10:00", "11:00", "14:00", "16:00"];
const BUSY = new Set(["0-0", "0-2", "1-1", "2-0", "2-3", "3-1", "3-2", "4-0", "4-3", "5-0", "5-2"]);

export function FlowScreenView({ screen, art }: { screen: FlowScreen; art: ArtKey }) {
  switch (screen.type) {
    case "ad":
      return (
        <Frame className="p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-ember font-semibold text-ember-ink">{screen.brand[0]}</span>
            <span className="min-w-0">
              <span className="block truncate text-[0.85rem] font-medium">{screen.brand}</span>
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-dim">Sponsored</span>
            </span>
          </div>
          <div className="fx-zoom relative mt-3 aspect-[16/10] overflow-hidden rounded-xl border border-line">
            <IndustryArt art={art} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          </div>
          <p className="bubble mt-3 text-[0.95rem] font-medium leading-snug" style={d(0.3)}>{screen.headline}</p>
          <div className="relative mt-3">
            <span className="fx-press flex items-center justify-center rounded-lg bg-paper py-2.5 text-[0.85rem] font-medium text-ink" style={d(1.5)}>{screen.cta}</span>
            <Cursor />
          </div>
        </Frame>
      );
    case "page":
      return (
        <Frame>
          <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
            <span className="flex gap-1"><span className="size-2 rounded-full bg-line-2" /><span className="size-2 rounded-full bg-line-2" /><span className="size-2 rounded-full bg-line-2" /></span>
            <span className="flex-1 truncate rounded-full bg-ink-2 px-3 py-1 font-mono text-[0.65rem] text-muted"><span className="search-typed inline-block">{screen.url}</span></span>
          </div>
          <div className="p-4">
            <p className="blur-swap text-[1.35rem] font-semibold uppercase leading-[0.95] tracking-[-0.03em]" style={d(0.2)}>{screen.heading}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {screen.chips.map((c, i) => (
                <span key={c} className="bubble rounded-full border border-line-2 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted" style={d(0.5 + i * 0.15)}>{c}</span>
              ))}
            </div>
            <svg viewBox="0 0 200 80" className="mt-4 h-20 w-full" aria-hidden="true">
              {[[4, 4, 80, 44], [84, 4, 56, 44], [140, 4, 56, 72], [4, 48, 136, 28]].map(([x, y, w, h], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} pathLength={1} fill="none" stroke={i === 1 ? "var(--color-ember)" : "var(--color-line-2)"} className="fx-draw" style={d(0.6 + i * 0.2)} />
              ))}
            </svg>
            <div className="relative mt-3">
              <span className="fx-press fx-ring relative flex items-center justify-center rounded-lg bg-paper py-2.5 text-[0.85rem] font-medium text-ink" style={d(1.9)}>{screen.cta}</span>
              <Cursor delay={1.3} />
            </div>
          </div>
        </Frame>
      );
    case "chat":
      return (
        <Frame>
          <div className="flex items-center gap-2.5 border-b border-line bg-ink-2 px-4 py-3">
            <span className="grid size-8 place-items-center rounded-full bg-ember font-mono text-[0.65rem] font-semibold text-ember-ink">AI</span>
            <span>
              <span className="block text-[0.85rem] font-medium">{screen.name}</span>
              <span className="flex items-center gap-1.5 text-[0.65rem] text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-400" />online</span>
            </span>
          </div>
          <div className="flex flex-col gap-2 p-4">
            {screen.messages.map((m, i) => (
              <p
                key={i}
                className={cn(
                  "bubble max-w-[85%] rounded-2xl px-3.5 py-2 text-[0.82rem] leading-snug",
                  m.from === "customer" ? "self-end rounded-br-md bg-ember text-ember-ink" : "rounded-bl-md bg-ink-3 text-paper",
                )}
                style={d(0.2 + i * 0.85)}
              >
                {m.text}
              </p>
            ))}
            <span className="bubble flex w-fit gap-1 rounded-2xl rounded-bl-md bg-ink-3 px-3.5 py-3" style={d(0.2 + screen.messages.length * 0.85)}>
              {[0, 1, 2].map((k) => <span key={k} className="fx-typing size-1.5 rounded-full bg-muted" style={d(k * 0.15)} />)}
            </span>
          </div>
        </Frame>
      );
    case "checklist":
      return (
        <Frame className="p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ember">{screen.title}</p>
          <ul className="mt-4 divide-y divide-line">
            {screen.rows.map(([k, v], i) => (
              <li key={k} className="flex items-center justify-between gap-4 py-2.5 text-[0.85rem]">
                <span className="text-dim">{k}</span>
                <span className="flex items-center gap-2">
                  <span className="search-typed inline-block font-medium" style={d(0.3 + i * 0.45)}>{v}</span>
                  <span className="bubble grid size-5 place-items-center rounded-full bg-ember text-ember-ink" style={d(0.6 + i * 0.45)}><Check className="size-3" strokeWidth={3} /></span>
                </span>
              </li>
            ))}
          </ul>
          <span className="toast mt-4 inline-flex items-center gap-2 rounded-full border border-ember/50 bg-ember/10 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ember" style={d(0.5 + screen.rows.length * 0.45)}>
            <span className="size-1.5 rounded-full bg-ember" />{screen.badge}
          </span>
        </Frame>
      );
    case "calendar":
      return (
        <Frame className="p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ember">{screen.title}</p>
          <div className="mt-4 grid grid-cols-[2.6rem_repeat(6,1fr)] gap-1 text-center font-mono text-[0.55rem] uppercase tracking-[0.08em] text-dim">
            <span />
            {DAYS.map((x) => <span key={x} className="pb-1">{x}</span>)}
            {TIMES.map((t, ti) => (
              <div key={t} className="contents">
                <span className="self-center text-left normal-case">{t}</span>
                {DAYS.map((_, di) => {
                  const target = di === screen.day && ti === screen.time;
                  return (
                    <span
                      key={di}
                      className={cn("h-7 rounded-md border", target ? "fx-book border-ember" : BUSY.has(`${di}-${ti}`) ? "border-line bg-ink-3" : "border-line")}
                      style={target ? d(0.8) : undefined}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="toast mt-4 flex items-center gap-3 rounded-xl border border-line-2 bg-ink-2 p-3" style={d(1.4)}>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ember text-ember-ink"><Check className="size-4" strokeWidth={3} /></span>
            <span className="min-w-0">
              <span className="block text-[0.85rem] font-medium">{screen.slot}</span>
              <span className="block truncate text-[0.72rem] text-muted">{screen.note}</span>
            </span>
          </div>
        </Frame>
      );
    case "notify":
      return (
        <Frame className="bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,107,53,.14),transparent_60%)] p-5">
          <p className="text-center font-mono text-[2.2rem] font-medium leading-none tracking-[-0.04em]">9:41</p>
          <p className="mb-5 mt-1 text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-dim">Notifications</p>
          <div className="grid gap-2">
            {screen.items.map((n, i) => (
              <div key={i} className="toast rounded-xl border border-line-2 bg-ink-2/90 p-3 backdrop-blur" style={d(0.3 + i * 0.9)}>
                <p className="flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.1em] text-dim">
                  <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-emerald-500" />WhatsApp</span>{n.time}
                </p>
                <p className="mt-1.5 text-[0.8rem] leading-snug">{n.text}</p>
              </div>
            ))}
          </div>
          {screen.done && (
            <span className="toast mt-4 inline-flex items-center gap-2 rounded-full bg-ember px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ember-ink" style={d(0.6 + screen.items.length * 0.9)}>
              <Check className="size-3" strokeWidth={3} />{screen.done}
            </span>
          )}
        </Frame>
      );
    case "serp":
      return (
        <Frame>
          <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-[0.8rem]">
            <Search aria-hidden="true" className="size-3.5 text-dim" />
            <span className="search-typed inline-block">{screen.query}</span>
          </div>
          <ul className="grid gap-2.5 p-4">
            {screen.results.map((r, i) => (
              <li
                key={r.url}
                className={cn("toast rounded-xl border p-3", r.ours ? "fx-lift border-ember/60 bg-ember/10" : "border-line")}
                style={d(0.5 + i * 0.3)}
              >
                <p className="truncate font-mono text-[0.6rem] text-dim">{r.url}</p>
                <p className={cn("mt-1 text-[0.86rem] font-medium leading-snug", r.ours ? "text-paper" : "text-muted")}>{r.title}</p>
                <p className="mt-1 text-[0.72rem] leading-snug text-dim">{r.text}</p>
                {r.ours && <span className="mt-2 inline-block rounded-full bg-ember px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ember-ink">Your page</span>}
              </li>
            ))}
          </ul>
        </Frame>
      );
    case "answer":
      return (
        <Frame className="p-5">
          <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink-3 px-3.5 py-2 text-[0.82rem] leading-snug"><span className="search-typed inline-block">{screen.question}</span></p>
          <div className="mt-4 flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ember text-ember-ink"><Sparkles aria-hidden="true" className="size-3.5" /></span>
            <div className="min-w-0">
              <p className="bubble text-[0.84rem] leading-relaxed" style={d(0.9)}>{screen.answer}</p>
              <p className="toast mt-3 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-dim" style={d(1.5)}>Sources</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {screen.sources.map((src, i) => (
                  <span key={src} className={cn("toast rounded-full border px-2.5 py-1 text-[0.68rem]", i === 0 ? "border-ember/60 bg-ember/10 text-paper" : "border-line text-muted")} style={d(1.7 + i * 0.15)}>{src}</span>
                ))}
              </div>
            </div>
          </div>
        </Frame>
      );
    case "map":
      return (
        <Frame>
          <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-[0.8rem]">
            <Search aria-hidden="true" className="size-3.5 text-dim" />
            <span className="search-typed inline-block">{screen.query}</span>
          </div>
          <div className="relative h-40 overflow-hidden bg-ink-2">
            <svg viewBox="0 0 300 160" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {["M0 40 C80 50 160 20 300 60", "M0 120 C90 100 200 140 300 110", "M70 0 C80 60 60 110 90 160", "M210 0 C200 50 230 120 220 160"].map((p, i) => (
                <path key={i} d={p} pathLength={1} fill="none" stroke="var(--color-line-2)" strokeWidth="6" className="fx-draw" style={d(i * 0.1)} />
              ))}
            </svg>
            {[[22, 30], [55, 62], [78, 26]].map(([x, y], i) => (
              <span key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${x}%`, top: `${y! + 20}%` }}>
                <MapPin aria-hidden="true" className={cn("fx-drop size-6", i === 1 ? "fill-ember text-ink" : "fill-paper text-ink")} style={d(0.6 + i * 0.25)} />
              </span>
            ))}
          </div>
          <ul className="grid gap-1.5 p-3">
            {screen.places.map((p, i) => (
              <li key={p} className={cn("toast flex items-center justify-between rounded-lg border px-3 py-2 text-[0.78rem]", i === 1 ? "border-ember/60 bg-ember/10" : "border-line")} style={d(1.2 + i * 0.2)}>
                <span className="truncate">{p}</span>
                <span className={cn("shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.1em]", i === 1 ? "text-ember" : "text-dim")}>{i === 1 ? "Book online" : "Open now"}</span>
              </li>
            ))}
          </ul>
        </Frame>
      );
  }
}

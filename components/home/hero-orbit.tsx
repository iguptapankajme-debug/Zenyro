"use client";

import { useEffect, useRef } from "react";
import { Icon3D, type Icon3DName } from "./primitives";
import { cn } from "@/lib/cn";

/**
 * The 3D engine marks floating around the hero headline. Each one bobs on its own rhythm and leans
 * away from the pointer by its depth, so the cluster reads as layered space. Static under reduced motion.
 */
const marks: { name: Icon3DName; label: string; pos: string; size: number; depth: number; delay: string; tag?: string }[] = [
  { name: "chatgpt", label: "ChatGPT", pos: "left-[3%] top-[9%]", size: 92, depth: 26, delay: "0s", tag: "Mentioned #1" },
  { name: "claude", label: "Claude", pos: "right-[4%] top-[7%]", size: 84, depth: 18, delay: "-2.1s" },
  { name: "gemini", label: "Gemini", pos: "left-[7%] top-[56%]", size: 74, depth: 34, delay: "-3.4s" },
  { name: "perplexity", label: "Perplexity", pos: "right-[8%] top-[52%]", size: 78, depth: 22, delay: "-1.2s", tag: "Cited source" },
  { name: "globe", label: "Google", pos: "right-[1%] top-[78%]", size: 120, depth: 40, delay: "-4.6s" },
];

export function HeroOrbit() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const host = el?.parentElement;
    if (!el || !host || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => { cancelAnimationFrame(raf); host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[5] hidden lg:block">
      {marks.map((m) => (
        <div
          key={m.name}
          className={cn("absolute", m.pos)}
          style={{ transform: `translate3d(calc(var(--mx, 0) * ${-m.depth}px), calc(var(--my, 0) * ${-m.depth}px), 0)` }}
        >
          <div className="orbit-float relative" style={{ animationDelay: m.delay }}>
            <span className="absolute inset-[18%] -z-10 rounded-full bg-ember/25 blur-2xl" />
            <Icon3D name={m.name} size={m.size} className="drop-shadow-[0_18px_24px_rgba(9,9,11,.16)]" />
            {m.tag && (
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-ink/90 px-2.5 py-1 font-mono text-[0.62rem] text-paper shadow-[0_6px_18px_-8px_rgba(9,9,11,.25)] backdrop-blur">
                <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-500 align-middle" />
                {m.tag}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Phones and tablets: the marks as an overlapping stack above the eyebrow. */
export function OrbitStack() {
  return (
    <div aria-hidden="true" className="mb-6 flex justify-center lg:hidden">
      {(["chatgpt", "gemini", "claude", "perplexity", "globe"] as Icon3DName[]).map((n, i) => (
        <span key={n} className="orbit-float -mx-1.5 grid size-14 place-items-center" style={{ animationDelay: `${-i * 0.7}s` }}>
          <Icon3D name={n} size={56} priority className="drop-shadow-[0_10px_14px_rgba(9,9,11,.14)]" />
        </span>
      ))}
    </div>
  );
}

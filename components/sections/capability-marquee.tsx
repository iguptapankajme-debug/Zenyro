"use client";

import { useEffect, useRef } from "react";

const items = ["Websites", "Performance marketing", "SEO", "AEO", "GEO", "WhatsApp automation", "AI voice agents", "CRM pipelines", "Landing pages", "Lead scoring"];

/**
 * Oversized outlined marquee of capabilities. It reverses direction with the visitor's scroll
 * direction, and stops entirely when off screen or with reduced motion.
 */
export function CapabilityMarquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    let lastY = window.scrollY;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      el.style.setProperty("--marquee-state", visible ? "running" : "paused");
    });
    io.observe(el);
    const onScroll = () => {
      if (!visible) return;
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) el.style.setProperty("--marquee-dir", y > lastY ? "normal" : "reverse");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const row = (copy: number) => items.map((t, i) => (
    <span key={`${copy}-${t}`} className="flex items-center gap-10 pr-10">
      <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--color-line-2)]" : "text-paper"}>{t}</span>
      <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-ember" />
    </span>
  ));

  return (
    <div ref={ref} className="marquee overflow-hidden border-y border-line py-8" aria-label="What we do">
      <p className="sr-only">{items.join(", ")}</p>
      <div aria-hidden="true" className="marquee-track text-[clamp(2.4rem,6vw,5.5rem)] font-semibold uppercase leading-none tracking-[-0.045em] [animation-play-state:var(--marquee-state,running)]">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only cursor ring and magnetic buttons. The native cursor is never hidden.
 * Disabled for touch, coarse pointers and reduced motion.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const el = ring.current!;
    let x = -100, y = -100, cx = x, cy = y, raf = 0;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.classList.add("is-visible");
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      el.classList.toggle("is-active", !!target);

      const m = (e.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== m) magnet.style.transform = "";
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
        m.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    const onLeave = () => {
      el.classList.remove("is-visible");
      if (magnet) magnet.style.transform = "";
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ring} className="cursor-ring hidden md:block" aria-hidden="true" />;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pauses every CSS animation and SVG (SMIL) animation inside sections that are off screen, and
 * resumes them when they scroll back into view. Decorative loops then cost nothing while unseen.
 */
export function OffscreenPauser() {
  const pathname = usePathname();
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section, main .marquee");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          const off = !e.isIntersecting;
          el.toggleAttribute("data-paused", off);
          el.querySelectorAll("svg").forEach((svg) => (off ? svg.pauseAnimations() : svg.unpauseAnimations()));
        }
      },
      { rootMargin: "120px 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

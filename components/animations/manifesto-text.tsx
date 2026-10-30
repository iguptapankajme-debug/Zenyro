"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

type Line = { words: string[]; emphasis?: string[] };

/**
 * Scroll-linked kinetic statement: each word moves from dark grey to white (or orange for the
 * emphasised words) as the section passes through the viewport. Without JavaScript or with
 * reduced motion, the statement is simply shown in its final colours.
 */
export function ManifestoText({ lines }: { lines: Line[] }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !ref.current) return;
      ctx = gsap.context(() => {
        const words = ref.current!.querySelectorAll<HTMLElement>("[data-w]");
        // The starting grey still meets 3:1 contrast for large text.
        gsap.from(words, {
          color: "#5c5f67",
          yPercent: 18,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 40%", scrub: 0.4 },
        });
      }, ref);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <h2 ref={ref} className="text-[clamp(3rem,10.5vw,11rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em]">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span data-w className={`inline-block ${line.emphasis?.includes(w) ? "text-ember" : "text-paper"}`}>{w}</span>
              {i < line.words.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}

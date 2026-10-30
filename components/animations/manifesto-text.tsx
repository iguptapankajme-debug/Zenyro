"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-scrubbed reading reveal: words move from grey to white (or orange) as the paragraph passes
 * through the viewport. GSAP is loaded on demand so it never weighs on first paint.
 * Without JS, or with reduced motion, the text is fully readable in white.
 */
export function ManifestoText({ text, emphasis }: { text: string; emphasis: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const els = ref.current!.querySelectorAll<HTMLElement>("[data-w]");
        // Words start in a grey that still meets contrast for large text, then warm to their final colour.
        gsap.from(els, {
          color: "#6b6e76",
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 45%", scrub: 0.4 },
        });
      }, ref);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <p ref={ref} className="text-[clamp(1.8rem,4.1vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.035em] text-balance">
      {words.map((w, i) => (
        <span key={i} data-w className={emphasis.includes(w) ? "text-ember" : "text-paper"}>
          {w}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

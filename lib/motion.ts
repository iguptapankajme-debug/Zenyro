/**
 * Central motion helpers. GSAP and ScrollTrigger are loaded on demand, once, and shared by every
 * scroll-driven component, so no animation code ships in the initial bundle.
 *
 * Motion language: ease-out-expo for entrances (0.9s), ~80ms staggers, scroll scrubs at 0.4s,
 * and nothing that moves when the visitor prefers reduced motion.
 */
type Gsap = typeof import("gsap").gsap;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

let loader: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTriggerType }> | null = null;

export function loadGsap() {
  loader ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger };
  });
  return loader;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const ease = { out: "expo.out", inOut: "power3.inOut" } as const;

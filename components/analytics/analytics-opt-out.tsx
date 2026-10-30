"use client";

import { useSyncExternalStore } from "react";
import { OPT_OUT_KEY } from "@/lib/analytics";

const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => (listeners.add(fn), () => listeners.delete(fn));
const read = () => {
  try { return localStorage.getItem(OPT_OUT_KEY) === "1"; } catch { return false; }
};

/** Lets visitors switch off analytics for this browser. */
export function AnalyticsOptOut() {
  const optedOut = useSyncExternalStore(subscribe, read, () => false);
  const toggle = () => {
    try {
      if (optedOut) localStorage.removeItem(OPT_OUT_KEY);
      else localStorage.setItem(OPT_OUT_KEY, "1");
    } catch { /* storage blocked */ }
    listeners.forEach((l) => l());
  };
  return (
    <p className="not-prose">
      <button type="button" onClick={toggle} aria-pressed={optedOut} className="rounded-full border border-line-2 px-4 py-2 text-[0.9rem] text-paper hover:border-ember">
        {optedOut ? "Analytics off for this browser. Turn back on" : "Turn off analytics for this browser"}
      </button>
    </p>
  );
}

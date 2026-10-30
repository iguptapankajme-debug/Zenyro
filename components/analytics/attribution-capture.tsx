"use client";

import { useEffect } from "react";

const KEY = "zenyro-attribution";

/** Stores first-touch campaign parameters and the referring site for this browser session. */
export function AttributionCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
      const params = new URLSearchParams(window.location.search);
      let referrer = "";
      if (document.referrer) {
        const ref = new URL(document.referrer);
        if (ref.host !== window.location.host) referrer = ref.hostname; // site only, never the full URL
      }
      const data = {
        utm_source: params.get("utm_source") ?? "",
        utm_medium: params.get("utm_medium") ?? "",
        utm_campaign: params.get("utm_campaign") ?? "",
        referrer,
        landing_page: window.location.pathname,
      };
      sessionStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // Storage blocked: attribution is optional.
    }
  }, []);
  return null;
}

export function readStoredAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

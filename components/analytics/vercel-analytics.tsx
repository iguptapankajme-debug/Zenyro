"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { analyticsAllowed } from "@/lib/analytics";

/**
 * Vercel Web Analytics (cookie-free page views), with the same consent rules as the rest of the
 * site: nothing is sent when the visitor opted out, or sends Do Not Track or Global Privacy
 * Control. Admin pages are never tracked, and query strings are reduced to campaign (utm_) tags.
 */
function beforeSend(event: BeforeSendEvent) {
  if (!analyticsAllowed()) return null;
  const url = new URL(event.url);
  if (url.pathname.startsWith("/admin")) return null;
  for (const key of [...url.searchParams.keys()]) if (!key.startsWith("utm_")) url.searchParams.delete(key);
  return { ...event, url: url.toString() };
}

export function VercelAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}

/**
 * Consent-aware product analytics. Events go to Plausible (cookie-free) only when it is installed,
 * the visitor has not opted out on the privacy page, and the browser does not send Do Not Track
 * or Global Privacy Control. Properties are limited to non-personal values such as tool names and
 * budget bands; never pass names, emails, phone numbers, URLs typed by visitors or free text.
 */
export type AnalyticsEvent =
  | "Tool Opened"
  | "Tool Completed"
  | "Proposal Requested"
  | "Consultation Requested"
  | "Consultation Booking Opened"
  | "Contact Submitted";

type Props = Record<string, string | number | boolean>;
type PlausibleFn = (event: string, options?: { props?: Props }) => void;

export const OPT_OUT_KEY = "zenyro-analytics-optout";

export function analyticsAllowed() {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.doNotTrack === "1" || nav.globalPrivacyControl) return false;
  try {
    if (localStorage.getItem(OPT_OUT_KEY) === "1") return false;
  } catch {
    // Storage unavailable: fall through and respect the other signals only.
  }
  return true;
}

export function track(event: AnalyticsEvent, props?: Props) {
  if (!analyticsAllowed()) return;
  const plausible = (window as Window & { plausible?: PlausibleFn }).plausible;
  plausible?.(event, props ? { props } : undefined);
}

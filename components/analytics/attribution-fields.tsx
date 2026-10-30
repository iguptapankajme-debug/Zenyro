"use client";

import { useSyncExternalStore } from "react";
import { readStoredAttribution } from "./attribution-capture";

const subscribe = () => () => {};
const snapshot = () => JSON.stringify(readStoredAttribution());

/** Hidden form fields carrying the session's attribution into a lead submission. */
export function AttributionFields() {
  const json = useSyncExternalStore(subscribe, snapshot, () => "{}");
  const data = JSON.parse(json) as Record<string, string>;
  return (
    <>
      {(["utm_source", "utm_medium", "utm_campaign", "referrer", "landing_page"] as const).map((k) =>
        data[k] ? <input key={k} type="hidden" name={k} value={data[k]} /> : null,
      )}
    </>
  );
}

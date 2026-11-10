"use client";

import { useEffect, useState } from "react";

/** The current time in a market, e.g. "10:42". Renders nothing until mounted (avoids a mismatch). */
export function LocalClock({ zone, className }: { zone: string; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const t = setInterval(tick, 30_000);
    return () => { clearTimeout(first); clearInterval(t); };
  }, []);
  if (!now) return <span className={className}>--:--</span>;
  return (
    <time className={className} dateTime={now.toISOString()} suppressHydrationWarning>
      {new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: zone }).format(now)}
    </time>
  );
}

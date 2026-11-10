import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { markets } from "@/data/markets";
import { LocalClock } from "./local-clock";
import { cn } from "@/lib/cn";

/** One card per international market, with the live local time there. */
export function MarketCards({ className }: { className?: string }) {
  return (
    <ul className={cn("grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2 lg:grid-cols-3", className)}>
      {markets.map((m, i) => (
        <li key={m.slug} className={cn("border-line", i ? "border-t" : "", i === 1 ? "sm:border-t-0" : "", i % 2 ? "sm:border-l" : "", i >= 2 && i < 3 ? "lg:border-t-0" : "", i % 3 ? "lg:border-l" : "lg:border-l-0")}>
          <Link href={`/markets/${m.slug}`} className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-ink-2">
            <span className="flex items-center justify-between">
              <span className="grid h-7 min-w-10 place-items-center rounded-md bg-ink-3 px-2 font-mono text-[0.75rem] font-medium">{m.code}</span>
              <span className="font-mono text-[0.75rem] text-muted"><LocalClock zone={m.zone} className="tabular-nums text-paper" /> in {m.city}</span>
            </span>
            <span>
              <span className="block text-[1.1rem] font-semibold tracking-[-0.02em]">{m.country}</span>
              <span className="mt-1 block text-[0.88rem] leading-snug text-muted">{m.hours}</span>
            </span>
            <span className="mt-auto inline-flex items-center gap-1.5 text-[0.9rem] font-medium">
              <span className="link-u">SEO, AEO &amp; GEO in {m.code}</span>
              <ArrowUpRight aria-hidden="true" className="size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

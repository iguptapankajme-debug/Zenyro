import { cn } from "@/lib/cn";

/** Zenyro mark: an orbit with a single node, the same geometry as the hero sculpture. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-6", className)} fill="none">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="16" cy="16" rx="15" ry="5.5" transform="rotate(-28 16 16)" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.2" />
      <circle cx="28.2" cy="9.6" r="2.6" fill="#FF6B35" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 text-paper", className)}>
      <Mark />
      <span className="text-[1.05rem] font-semibold tracking-[0.18em]">ZENYRO</span>
    </span>
  );
}

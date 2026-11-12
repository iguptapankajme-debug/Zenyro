import { cn } from "@/lib/cn";

/** Compact Zenyro mark: a white lowercase z on a Zenyro-blue tile (favicon, small spaces). */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7 shrink-0", className)}>
      <rect width="32" height="32" rx="8" fill="#155EEF" />
      <path d="M9 9.5H23V12.6L14.6 20.4H23V23.5H8.6V20.4L17 12.6H9Z" fill="#fff" />
    </svg>
  );
}

/** The Zenyro logo: the white lowercase "zenyro" wordmark on a Zenyro-blue badge. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-[0.55rem] bg-[#155EEF] px-3 pb-[0.42rem] pt-[0.3rem] text-white", className)}>
      <span className="text-[1.3rem] font-bold leading-none tracking-[-0.04em]">zenyro</span>
    </span>
  );
}

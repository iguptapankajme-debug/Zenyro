import US from "country-flag-icons/react/3x2/US";
import GB from "country-flag-icons/react/3x2/GB";
import AE from "country-flag-icons/react/3x2/AE";
import CA from "country-flag-icons/react/3x2/CA";
import AU from "country-flag-icons/react/3x2/AU";
import SG from "country-flag-icons/react/3x2/SG";
import IN from "country-flag-icons/react/3x2/IN";
import { cn } from "@/lib/cn";

const flags = { US, GB, AE, CA, AU, SG, IN } as const;
export type FlagCode = keyof typeof flags;

/** Our market codes (UK, UAE) map to ISO country codes for the flag artwork. */
const alias: Record<string, FlagCode> = { UK: "GB", UAE: "AE", CA: "CA", AU: "AU", SG: "SG", US: "US", IN: "IN" };

/** A crisp SVG country flag with a hairline border; decorative unless a title is given. */
export function Flag({ code, className, title }: { code: string; className?: string; title?: string }) {
  const C = flags[alias[code] ?? (code as FlagCode)];
  if (!C) return null;
  return (
    <span className={cn("inline-block overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(9,9,11,.12)]", className)} aria-hidden={title ? undefined : true}>
      <C title={title} className="block h-full w-full" />
    </span>
  );
}

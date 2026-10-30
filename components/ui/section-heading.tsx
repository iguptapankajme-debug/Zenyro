import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2";
  size?: "lg" | "xl";
  className?: string;
};

/** Asymmetric section opener: eyebrow above, headline on the left, supporting copy offset right. */
export function SectionHeading({ eyebrow, title, lede, as: Tag = "h2", size = "lg", className }: Props) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-8">
        <p className="eyebrow mb-6" data-reveal>{eyebrow}</p>
        <Tag className={size === "xl" ? "display-xl" : "display-lg"}>
          {/* Masked rise: the wrapper is observed (it stays in view), its child slides up into it. */}
          <span className="block overflow-hidden pb-[0.06em]" data-reveal="rise">
            <span className="block">{title}</span>
          </span>
        </Tag>
      </div>
      {lede && (
        <p className="lede lg:col-span-4 lg:pb-2" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          {lede}
        </p>
      )}
    </div>
  );
}

/** Orange emphasis for selected words in a headline. */
export function Em({ children }: { children: ReactNode }) {
  return <span className="text-ember">{children}</span>;
}

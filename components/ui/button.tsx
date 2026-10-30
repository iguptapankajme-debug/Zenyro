import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: string;
  variant?: "primary" | "ghost" | "light";
  icon?: "right" | "up-right" | "none";
  size?: "md" | "lg";
  className?: string;
};

const styles = {
  primary: "bg-ember text-ember-ink hover:bg-ember-2",
  ghost: "border border-line-2 text-paper hover:border-paper",
  light: "bg-paper text-ink hover:bg-white",
};

/** Link styled as a button, with a rolling label and magnetic pull on fine pointers. */
export function ButtonLink({ href, children, variant = "primary", icon = "right", size = "md", className }: Props) {
  const external = /^https?:\/\//.test(href);
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  const cls = cn(
    "group relative inline-flex items-center justify-center gap-3 rounded-full font-medium transition-colors duration-300",
    size === "lg" ? "h-14 px-7 text-[0.98rem]" : "h-12 px-6 text-[0.92rem]",
    styles[variant],
    className,
  );
  const inner = (
    <>
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon !== "none" && (
        <Icon
          aria-hidden="true"
          className={cn(
            "size-4 transition-transform duration-500 ease-out-expo",
            icon === "up-right" ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1",
          )}
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} data-magnetic target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-magnetic>
      {inner}
    </Link>
  );
}

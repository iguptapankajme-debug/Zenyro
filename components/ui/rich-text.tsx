import Link from "next/link";
import type { ReactNode } from "react";

/** Renders [text](/path) links and **bold** inside plain content strings; internal paths use Next links. */
export function rich(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) parts.push(text.slice(last, m.index));
    const [, label, href, bold] = m;
    if (bold) parts.push(<strong key={m.index}>{bold}</strong>);
    else parts.push(href!.startsWith("/")
      ? <Link key={m.index} href={href!} className="text-paper underline decoration-ember underline-offset-[3px]">{label}</Link>
      : <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className="text-paper underline decoration-ember underline-offset-[3px]">{label}</a>);
    last = m.index! + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** The same text with link and bold syntax removed, for structured data and meta tags. */
export const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");

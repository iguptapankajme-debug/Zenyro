import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Item = { title: string; body: string; href: string; meta?: string };

/** Index of linked entries, laid out as a ruled list rather than a card grid. */
export function LinkList({ items, title, eyebrow }: { items: Item[]; title?: string; eyebrow?: string }) {
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        {(title || eyebrow) && (
          <div className="mb-10">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            {title && <h2 className="display-md">{title}</h2>}
          </div>
        )}
        <ul className="border-t border-line">
          {items.map((it) => (
            <li key={it.href} className="border-b border-line">
              <Link href={it.href} className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted md:col-span-2">{it.meta}</span>
                <span className="text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.035em] transition-colors group-hover:text-ember md:col-span-5">{it.title}</span>
                <span className="text-[0.95rem] leading-relaxed text-muted md:col-span-4">{it.body}</span>
                <ArrowUpRight aria-hidden="true" className="hidden size-6 justify-self-end text-line-2 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ember md:col-span-1 md:block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

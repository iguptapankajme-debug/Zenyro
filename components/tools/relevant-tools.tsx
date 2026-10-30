import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { tools } from "@/data/tools";
import type { ToolKey } from "@/lib/tool-lead-schema";

/** "Try it free" block linking a service or landing page to its most relevant tools. */
export function RelevantTools({ keys }: { keys: ToolKey[] }) {
  const list = tools.filter((t) => keys.includes(t.slug));
  if (!list.length) return null;
  return (
    <section className="border-t border-line py-20 md:py-24" aria-labelledby="relevant-tools">
      <div className="shell">
        <p className="eyebrow mb-6">Free tools</p>
        <h2 id="relevant-tools" className="display-md max-w-2xl">Try it before we talk.</h2>
        <ul className={`mt-10 grid gap-4 ${list.length > 1 ? "md:grid-cols-2" : ""}`}>
          {list.map((t) => (
            <li key={t.slug}>
              <Link href={`/tools/${t.slug}`} className="group flex h-full flex-col justify-between gap-6 rounded-[1.5rem] border border-line bg-ink-2 p-7 transition-colors hover:border-ember/60">
                <div>
                  <p className="text-[1.5rem] font-semibold tracking-[-0.03em] group-hover:text-ember">{t.name}</p>
                  <p className="mt-2 text-muted">{t.description}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-[0.92rem] font-medium">Open the free tool <ArrowUpRight aria-hidden="true" className="size-4 text-ember" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

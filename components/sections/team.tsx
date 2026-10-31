import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { team } from "@/data/team";

/** The people behind Zenyro. Renders nothing until data/team.ts is filled in. */
export function Team() {
  if (!team.length) return null;
  return (
    <section className="border-t border-line py-24 md:py-32" aria-labelledby="team-title">
      <div className="shell">
        <p className="eyebrow mb-6">The team</p>
        <h2 id="team-title" className="display-md max-w-3xl">The people you&apos;ll work with.</h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} data-reveal>
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-line bg-ink-2">
                {m.photo ? (
                  <Image src={m.photo} alt={m.name} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                ) : (
                  <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-[5rem] font-semibold text-line-2">{m.name[0]}</span>
                )}
              </div>
              <p className="mt-5 text-[1.3rem] font-semibold tracking-[-0.02em]">{m.name}</p>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">{m.role}</p>
              <p className="mt-3 leading-relaxed text-muted">{m.bio}</p>
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[0.9rem]">
                  <span className="link-u">LinkedIn</span> <ArrowUpRight aria-hidden="true" className="size-3.5 text-ember" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

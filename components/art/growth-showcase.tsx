import { Icon3D, type Icon3DName } from "@/components/home/primitives";
import { GrowthChart } from "./growth-chart";

/** Section: what progress looks like, with the animated chart and every engine we optimise for. */
const engines: [Icon3DName, string][] = [["google", "Google"], ["bing", "Bing"], ["chatgpt", "ChatGPT"], ["gemini", "Gemini"], ["perplexity", "Perplexity"], ["claude", "Claude"], ["copilot", "Copilot"], ["brave", "Brave"]];

export function GrowthShowcase({ title = "What progress looks like.", intro, queries, seed }: { title?: string; intro?: string; queries?: readonly string[]; seed?: number }) {
  return (
    <section className="cv-auto border-t border-line py-16 md:py-24" aria-labelledby="growth-title">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">Search performance</p>
          <h2 id="growth-title" className="display-md">{title}</h2>
          <p className="mt-5 leading-relaxed text-muted">
            {intro ?? "Impressions usually rise first as pages get indexed and start ranking, then clicks follow as positions improve. We report both every month, alongside AI mentions and enquiries."}
          </p>
          <ul className="mt-6 grid gap-2 text-[0.92rem]">
            {["Impressions grow as more pages rank", "Average position improves toward page one", "Clicks and enquiries follow", "AI mentions tracked by prompt and engine"].map((t) => (
              <li key={t} className="flex gap-2.5"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 lg:col-span-8"><GrowthChart queries={queries} seed={seed} /></div>
      </div>
      <div className="shell mt-14">
        <p className="mb-5 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-dim">Optimised for every engine your customers use</p>
        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {engines.map(([n, label], i) => (
            <li key={n} className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-ink-2 p-3 transition-colors hover:border-ember/50 hover:bg-ink">
              <span className="orbit-float" style={{ animationDelay: `${-i * 0.6}s` }}><Icon3D name={n} size={56} className="size-11 transition-transform duration-500 group-hover:scale-110 sm:size-12" /></span>
              <span className="text-[0.78rem] font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

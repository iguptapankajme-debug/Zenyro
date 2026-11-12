import { Mail } from "lucide-react";
import { Icon3D, type Icon3DName } from "@/components/home/primitives";
import { cn } from "@/lib/cn";

/**
 * How search traffic becomes customers: dots flow from Google and AI assistants into "your website"
 * and on to enquiries. Pure SVG (SMIL), no JavaScript; moving dots are hidden for reduced motion.
 * Landscape layout from sm up, portrait on phones.
 */
const SOURCES: [Icon3DName, string][] = [["google", "Google"], ["chatgpt", "ChatGPT"], ["gemini", "Gemini"], ["perplexity", "Perplexity"], ["bing", "Bing"]];

type Layout = {
  w: number; h: number;
  src: (i: number) => [number, number];
  site: [number, number]; lead: [number, number];
  inPath: (s: [number, number], t: [number, number]) => string;
};

const wide: Layout = {
  w: 1000, h: 400,
  src: (i) => [70, 48 + i * 76],
  site: [520, 200], lead: [905, 200],
  inPath: ([x, y], [tx, ty]) => `M${x + 34} ${y} C ${x + 230} ${y}, ${tx - 220} ${ty}, ${tx - 120} ${ty}`,
};
const tall: Layout = {
  w: 400, h: 560,
  src: (i) => [40 + i * 80, 50],
  site: [200, 300], lead: [200, 500],
  inPath: ([x, y], [tx, ty]) => `M${x} ${y + 30} C ${x} ${y + 140}, ${tx} ${ty - 150}, ${tx} ${ty - 72}`,
};

function Stage({ l, className }: { l: Layout; className?: string }) {
  const out = l === wide
    ? `M${l.site[0] + 120} ${l.site[1]} L${l.lead[0] - 62} ${l.lead[1]}`
    : `M${l.site[0]} ${l.site[1] + 72} L${l.lead[0]} ${l.lead[1] - 40}`;
  const pct = (x: number, y: number) => ({ left: `${(x / l.w) * 100}%`, top: `${(y / l.h) * 100}%` });
  return (
    <div className={cn("relative", className)} style={{ aspectRatio: `${l.w} / ${l.h}` }}>
      <svg viewBox={`0 0 ${l.w} ${l.h}`} className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <linearGradient id={`tf-g-${l.w}`} x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#155EEF" stopOpacity=".15" /><stop offset="1" stopColor="#155EEF" stopOpacity=".55" /></linearGradient>
        </defs>
        {SOURCES.map((_, i) => {
          const d = l.inPath(l.src(i), l.site);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={`url(#tf-g-${l.w})`} strokeWidth="1.6" strokeDasharray="4 6" className="tf-dash" />
              {[0, 1, 2].map((k) => (
                <circle key={k} r="4" fill="#155EEF" className="tf-dot">
                  <animateMotion dur={`${2.6 + i * 0.25}s`} begin={`-${k * 0.9 + i * 0.3}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".4 0 .2 1" />
                </circle>
              ))}
            </g>
          );
        })}
        <path d={out} fill="none" stroke="#0E9F6E" strokeOpacity=".5" strokeWidth="2" strokeDasharray="4 6" className="tf-dash" />
        {[0, 1].map((k) => (
          <circle key={k} r="5" fill="#0E9F6E" className="tf-dot">
            <animateMotion dur="1.8s" begin={`-${k * 0.9}s`} repeatCount="indefinite" path={out} />
          </circle>
        ))}
      </svg>

      {SOURCES.map(([n, label], i) => {
        const [x, y] = l.src(i);
        return (
          <div key={n} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={pct(x, y)}>
            <span className="orbit-float rounded-2xl bg-ink shadow-[0_10px_24px_-12px_rgba(9,9,11,.35)]" style={{ animationDelay: `${-i * 0.7}s` }}>
              <Icon3D name={n} size={56} className="size-10 sm:size-12" />
            </span>
            <span className="font-mono text-[0.62rem] text-muted sm:text-[0.68rem]">{label}</span>
          </div>
        );
      })}

      <div className="absolute w-[46%] max-w-[15rem] -translate-x-1/2 -translate-y-1/2 sm:w-[24%]" style={pct(...l.site)}>
        <div className="overflow-hidden rounded-xl border border-line bg-ink shadow-[0_30px_60px_-30px_rgba(21,94,239,.45)]">
          <div className="flex items-center gap-1 border-b border-line bg-ink-2 px-2.5 py-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="size-1.5 rounded-full" style={{ backgroundColor: c }} />)}
            <span className="ml-1.5 truncate font-mono text-[0.58rem] text-dim">yourbusiness.com</span>
          </div>
          <div className="grid gap-1.5 p-3">
            <span className="h-2 w-3/4 rounded bg-paper/80" />
            <span className="h-1.5 w-full rounded bg-line-2" />
            <span className="h-1.5 w-5/6 rounded bg-line-2" />
            <span className="mt-1 h-3.5 w-1/2 rounded bg-ember" />
          </div>
        </div>
        <p className="mt-2 text-center text-[0.75rem] font-medium">Your website</p>
      </div>

      <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={pct(...l.lead)}>
        <span className="relative grid size-14 place-items-center rounded-full bg-[#0E9F6E] text-white shadow-[0_14px_30px_-12px_rgba(14,159,110,.7)]">
          <span aria-hidden="true" className="tf-ping absolute inset-0 rounded-full bg-[#0E9F6E]" />
          <Mail aria-hidden="true" className="relative size-6" />
        </span>
        <span className="text-[0.75rem] font-medium">Enquiries</span>
      </div>
    </div>
  );
}

export function TrafficFlow({ title = "How search traffic becomes customers.", className }: { title?: string; className?: string }) {
  return (
    <section className={cn("cv-auto border-t border-line py-16 md:py-24", className)} aria-labelledby="flow-title">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-6">Traffic flow</p>
          <h2 id="flow-title" className="display-md">{title}</h2>
          <p className="lede mx-auto mt-5">
            People find you on Google, Bing and in AI assistants. We make sure they reach your site, understand it in seconds and get in touch.
          </p>
        </div>
        <div className="mt-12 rounded-3xl border border-line bg-[radial-gradient(ellipse_at_center,rgba(21,94,239,.06),transparent_70%)] p-4 sm:p-8">
          <Stage l={wide} className="hidden sm:block" />
          <Stage l={tall} className="mx-auto max-w-sm sm:hidden" />
        </div>
      </div>
    </section>
  );
}

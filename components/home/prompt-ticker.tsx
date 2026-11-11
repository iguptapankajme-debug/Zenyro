import { Check } from "lucide-react";
import { Icon3D, type Icon3DName } from "./primitives";

/**
 * Two rows of customer prompts scrolling in opposite directions, each resolving to "cited".
 * Pure CSS motion (the marquee keyframes in globals.css); static under reduced motion.
 */
const rows: [Icon3DName, string, string][][] = [
  [
    ["chatgpt", "Best family dentist in Mohali?", "Your Clinic"],
    ["perplexity", "CNC machining exporter in India", "Your Company"],
    ["gemini", "Interior designer for a 3BHK in Chandigarh", "Your Studio"],
    ["claude", "Accountant for contractors in London", "Your Firm"],
    ["globe", "how long does a root canal take", "yourclinic.in"],
    ["chatgpt", "Company formation in a Dubai free zone", "Your Advisors"],
  ],
  [
    ["gemini", "Best IELTS coaching in Panchkula", "Your Academy"],
    ["claude", "Emergency plumber in Parramatta", "Your Plumbing"],
    ["perplexity", "Shopify store for organic skincare", "Your Brand"],
    ["globe", "heritage hotel wedding venue Jaipur", "yourhotel.in"],
    ["chatgpt", "Physiotherapy clinic in Tampines", "Your Physio"],
    ["perplexity", "Immigration consultant in Brampton", "Your Consultancy"],
  ],
];

function Chip({ icon, q, brand }: { icon: Icon3DName; q: string; brand: string }) {
  return (
    <li className="mx-2 flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-ink py-2 pl-2 pr-3 shadow-[0_8px_24px_-18px_rgba(9,9,11,.4)]">
      <Icon3D name={icon} size={36} className="size-8" />
      <span className="text-[0.9rem] text-muted">{q}</span>
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-emerald-50 px-2 py-0.5 text-[0.78rem] font-medium text-emerald-800">
        <Check aria-hidden="true" className="size-3" />{brand} cited
      </span>
    </li>
  );
}

export function PromptTicker() {
  return (
    <div aria-hidden="true" className="relative grid gap-3 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      {rows.map((row, i) => (
        <div key={i} className="marquee overflow-hidden">
          <ul className="marquee-track" style={{ "--marquee-speed": `${56 + i * 10}s`, "--marquee-dir": i ? "reverse" : "normal" } as React.CSSProperties}>
            {[...row, ...row].map(([icon, q, brand], k) => <Chip key={k} icon={icon} q={q} brand={brand} />)}
          </ul>
        </div>
      ))}
    </div>
  );
}

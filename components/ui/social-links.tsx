import { site, type SocialNetwork } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Simple brand glyphs (24px grid), drawn in the current text colour. */
const icons: Record<SocialNetwork, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </>
  ),
  facebook: <path fill="currentColor" d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="currentColor" d="M10 9.2v5.6l4.8-2.8z" />
    </>
  ),
  linkedin: <path fill="currentColor" d="M5 9h3v10H5zM6.5 4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10.5 9h2.9v1.4c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-3v-4.9c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v5h-3z" />,
  x: <path fill="currentColor" d="M17.6 3.5h3l-6.6 7.5 7.8 9.5h-6.1l-4.8-5.9-5.5 5.9h-3l7.1-7.9L2 3.5h6.2l4.3 5.4zm-1 15.2h1.7L7.5 5.2H5.7z" />,
};

const names: Record<SocialNetwork, string> = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube", linkedin: "LinkedIn", x: "X" };

/** Round icon links to Zenyro's social profiles; networks without a URL are hidden. */
export function SocialLinks({ className }: { className?: string }) {
  const list = (Object.entries(site.social) as [SocialNetwork, string][]).filter(([, url]) => url);
  if (!list.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Zenyro on social media">
      {list.map(([k, url]) => (
        <li key={k}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${names[k]} (opens in a new tab)`}
            data-magnetic
            className="grid size-11 place-items-center rounded-full border border-line-2 text-muted transition-colors duration-300 hover:border-ember hover:bg-ember hover:text-ember-ink"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[1.1rem]">{icons[k]}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

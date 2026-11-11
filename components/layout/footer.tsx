import Link from "next/link";
import { SocialLinks } from "@/components/ui/social-links";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { markets } from "@/data/markets";
import { site } from "@/lib/site";
import { Mark } from "./wordmark";

const company = [
  { label: "About", href: "/about" },
  { label: "Examples", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Free audit", href: "/free-audit" },
  { label: "Pricing", href: "/pricing" },
];

const agency = [
  { label: "Search growth: SEO, AEO & GEO", href: "/search-growth" },
  { label: "Free AI visibility audit", href: "/free-audit" },
  { label: "Free AI readiness checker", href: "/tools/ai-readiness" },
  { label: "Examples", href: "/work" },
  { label: "Glossary", href: "/glossary" },
  { label: "For AI assistants", href: "/ai-info" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="eyebrow mb-5">{title}</p>
      <ul className="grid gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-u text-[0.92rem] text-muted transition-colors hover:text-paper">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pb-[calc(env(safe-area-inset-bottom)+6rem)] pt-20 lg:pb-10">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Mark className="size-10" />
            <p className="mt-6 max-w-xs text-[1.4rem] font-semibold leading-tight tracking-[-0.02em]">
              Found on Google. <span className="text-ember">Recommended by AI.</span>
            </p>
            <p className="mt-4 max-w-sm text-[0.92rem] text-muted">
              SEO, AEO and GEO for businesses that want more customers from Google, ChatGPT and AI search. Based in the {site.region}.
            </p>
            {site.email && (
              <a href={`mailto:${site.email}`} className="link-u mt-6 inline-block text-[1.05rem]">{site.email}</a>
            )}
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-u mt-2 block text-[1.05rem]">{site.phone}</a>
            )}
            <SocialLinks className="mt-6" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            <Column title="Services" links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
            <Column title="Industries" links={industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))} />
            <div className="grid content-start gap-10">
              <Column title="Company" links={company} />
              <Column title="Markets" links={[...markets.map((m) => ({ label: m.country, href: `/markets/${m.slug}` })), { label: "India: all cities", href: "/locations" }]} />
            </div>
            <Column title="Agency" links={agency} />
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-20 select-none whitespace-nowrap text-center text-[clamp(4.5rem,21vw,20rem)] font-semibold leading-[0.78] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--color-line-2)]"
        >
          ZENYRO
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-[0.8rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Zenyro. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="link-u hover:text-paper">Privacy</Link>
            <Link href="/sitemap.xml" className="link-u hover:text-paper">Sitemap</Link>
            <Link href="/ai-info" className="link-u hover:text-paper">For AI assistants</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

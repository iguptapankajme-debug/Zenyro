import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { Em } from "@/components/ui/section-heading";
import { locations } from "@/data/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Locations: Digital Growth Agency for North India",
  description:
    "Zenyro works with businesses across the Chandigarh Tricity, Punjab, Haryana, Himachal Pradesh, Uttarakhand and Delhi NCR, from a team based in Chandigarh.",
  path: "/locations",
});

const tricity = ["chandigarh", "mohali", "panchkula", "zirakpur", "kharar"];
const hills = ["shimla", "manali", "dharamshala", "dehradun"];
const groups = [
  { id: "tricity", title: "Chandigarh Tricity", items: locations.filter((l) => tricity.includes(l.slug)) },
  { id: "punjab-haryana", title: "Punjab, Haryana & Delhi NCR", items: locations.filter((l) => !tricity.includes(l.slug) && !hills.includes(l.slug)) },
  { id: "hills", title: "Himachal & Uttarakhand", items: locations.filter((l) => hills.includes(l.slug)) },
];

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", path: "/locations" }]}
        eyebrow="Locations"
        title={<>Local knowledge, <Em>one team.</Em></>}
        intro="Based in the Chandigarh Tricity and working across Punjab, Haryana, Himachal Pradesh, Uttarakhand and Delhi NCR, as well as with clients across India and abroad."
      />
      {groups.map((g) => (
        <section key={g.title} className="border-b border-line py-16 md:py-20" aria-labelledby={`loc-${g.id}`}>
          <div className="shell">
            <h2 id={`loc-${g.id}`} className="eyebrow mb-8">{g.title}</h2>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {g.items.map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="group flex h-full flex-col rounded-[1.5rem] border border-line bg-ink-2 p-7 transition-colors hover:border-ember/60">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ember">{l.region}</span>
                    <span className="mt-3 text-[1.8rem] font-semibold uppercase leading-none tracking-[-0.04em]">{l.city}</span>
                    <span className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted">{l.headline}</span>
                    <ArrowUpRight aria-hidden="true" className="mt-6 size-5 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <ContactCta />
    </>
  );
}

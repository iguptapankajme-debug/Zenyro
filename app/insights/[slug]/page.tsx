import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactCta } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { articles, getArticle } from "@/data/insights";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.description, path: `/insights/${a.slug}`, type: "article" });
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug);
  const date = new Date(a.published).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <article className="pb-24 pt-32 md:pt-44">
        <div className="shell">
          <Breadcrumbs items={[{ name: "Insights", path: "/insights" }, { name: a.title, path: `/insights/${a.slug}` }]} />
          <header className="mt-10 max-w-4xl">
            <p className="eyebrow mb-6">{a.category}</p>
            <h1 className="text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.04em] text-balance">{a.title}</h1>
            <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted">
              <time dateTime={a.published}>{date}</time> · {a.readingMinutes} min read
            </p>
          </header>
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="prose-z lg:col-span-8 lg:col-start-3">
              <p className="!text-[1.25rem] !leading-relaxed text-paper">{a.description}</p>
              {a.body.map((b, i) =>
                b.type === "h2" ? <h2 key={i}>{b.text}</h2> : b.type === "ul" ? (
                  <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
                ) : <p key={i}>{b.text}</p>,
              )}
            </div>
          </div>
          <nav aria-label="More insights" className="mt-20 border-t border-line pt-10">
            <p className="eyebrow mb-6">Keep reading</p>
            <ul className="grid gap-4 md:grid-cols-2">
              {more.map((m) => (
                <li key={m.slug}><Link href={`/insights/${m.slug}`} className="link-u text-[1.2rem] font-medium">{m.title}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </article>
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          datePublished: a.published,
          mainEntityOfPage: absoluteUrl(`/insights/${a.slug}`),
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}

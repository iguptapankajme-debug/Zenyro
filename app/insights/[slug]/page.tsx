import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactCta } from "@/components/sections/contact-cta";
import { Faq } from "@/components/sections/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { articles, getArticle, type Article } from "@/data/insights";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { slugify } from "@/lib/slugify";

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

/** Renders [text](/path) links and **bold** inside article text; internal paths use Next links. */
function rich(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) parts.push(text.slice(last, m.index));
    const [, label, href, bold] = m;
    if (bold) parts.push(<strong key={m.index}>{bold}</strong>);
    else parts.push(href!.startsWith("/")
      ? <Link key={m.index} href={href!}>{label}</Link>
      : <a key={m.index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    last = m.index! + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

function Block({ b }: { b: Article["body"][number] }) {
  switch (b.type) {
    case "h2": return <h2 id={slugify(b.text)}>{b.text}</h2>;
    case "h3": return <h3>{b.text}</h3>;
    case "ul": return <ul>{b.items.map((it) => <li key={it}>{rich(it)}</li>)}</ul>;
    case "ol": return <ol>{b.items.map((it) => <li key={it}>{rich(it)}</li>)}</ol>;
    case "table":
      return (
        <div className="relative my-8 overflow-x-auto rounded-xl border border-line">
          <table>
            <thead><tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r) => <tr key={r.join("|")}>{r.map((c, i) => i ? <td key={i}>{rich(c)}</td> : <th key={i} scope="row" className="font-medium text-paper">{rich(c)}</th>)}</tr>)}</tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside className="my-8 rounded-xl border border-ember/30 bg-ember/[0.05] p-5">
          <p className="!mb-1 font-semibold text-paper">{b.title}</p>
          <p className="!mb-0">{rich(b.text)}</p>
        </aside>
      );
    default: return <p>{rich(b.text)}</p>;
  }
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 6);
  const toc = a.body.filter((b): b is { type: "h2"; text: string } => b.type === "h2");
  const path = `/insights/${a.slug}`;

  return (
    <>
      <article className="pb-24 pt-32 md:pt-44">
        <div className="shell">
          <Breadcrumbs items={[{ name: "Insights", path: "/insights" }, { name: a.title, path }]} />
          <header className="mt-10 max-w-4xl">
            <p className="eyebrow mb-6">{a.category}</p>
            <h1 className="text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.04em] text-balance">{a.title}</h1>
            <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted">
              By the {site.name} search team · <time dateTime={a.published}>{fmt(a.published)}</time>
              {a.updated && <> · Updated <time dateTime={a.updated}>{fmt(a.updated)}</time></>} · {a.readingMinutes} min read
            </p>
          </header>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            {toc.length > 2 && (
              <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
                <div className="sticky top-28">
                  <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-dim">On this page</p>
                  <ol className="grid gap-2.5 border-l border-line text-[0.88rem]">
                    {toc.map((h) => (
                      <li key={h.text}><a href={`#${slugify(h.text)}`} className="-ml-px block border-l border-transparent pl-4 text-muted transition-colors hover:border-ember hover:text-paper">{h.text}</a></li>
                    ))}
                  </ol>
                </div>
              </nav>
            )}
            <div className={`prose-z min-w-0 lg:col-span-8 ${toc.length > 2 ? "" : "lg:col-start-3"}`}>
              <p className="!text-[1.25rem] !leading-relaxed text-paper">{a.description}</p>
              {a.takeaways && (
                <aside aria-label="Key takeaways" className="my-8 rounded-2xl border border-line bg-ink-2 p-6">
                  <p className="!mb-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember">Key takeaways</p>
                  <ul className="!mb-0">{a.takeaways.map((t) => <li key={t} className="text-paper/90">{rich(t)}</li>)}</ul>
                </aside>
              )}
              {a.body.map((b, i) => <Block key={i} b={b} />)}
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
      {a.faqs && <Faq faqs={a.faqs} title="Questions, answered." />}
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          datePublished: a.published,
          dateModified: a.updated ?? a.published,
          mainEntityOfPage: absoluteUrl(path),
          image: absoluteUrl("/og/zenyro-og.png"),
          author: { "@type": "Organization", name: `${site.name} search team`, url: site.url },
          publisher: { "@id": `${site.url}/#organization` },
          ...(a.takeaways ? { abstract: a.takeaways.map(plain).join(" ") } : {}),
        }}
      />
    </>
  );
}

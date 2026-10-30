export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { landingPages } from "@/data/landing";
import { articles } from "@/data/insights";
import { work } from "@/data/work";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, lastModified: Date = now) => ({ url: absoluteUrl(path), lastModified, priority });
  return [
    page("/", 1),
    ...["/services", "/solutions", "/work", "/about", "/insights", "/contact"].map((p) => page(p, 0.8)),
    ...services.map((s) => page(`/services/${s.slug}`, 0.8)),
    ...industries.map((i) => page(`/industries/${i.slug}`, 0.8)),
    ...work.map((w) => page(`/work/${w.slug}`, 0.5)),
    ...landingPages.map((l) => page(`/${l.slug}`, 0.7)),
    ...articles.map((a) => page(`/insights/${a.slug}`, 0.6, new Date(a.published))),
    page("/privacy", 0.2),
  ];
}

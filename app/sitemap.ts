export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { articles } from "@/data/insights";
import { concepts } from "@/data/work";
import { locations } from "@/data/locations";
import { localServices } from "@/data/local-services";
import { markets } from "@/data/markets";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, lastModified: Date = now) => ({ url: absoluteUrl(path), lastModified, priority });
  return [
    page("/", 1),
    ...["/services", "/search-growth", "/solutions", "/work", "/about", "/insights", "/contact", "/free-audit", "/locations", "/ai-info", "/markets", "/tools/ai-readiness", "/pricing"].map((p) => page(p, 0.8)),
    ...services.map((s) => page(`/services/${s.slug}`, 0.8)),
    ...industries.map((i) => page(`/industries/${i.slug}`, 0.8)),
    ...concepts().map((w) => page(`/work/${w.slug}`, 0.5)),
    ...markets.map((m) => page(`/markets/${m.slug}`, 0.8)),
    ...locations.map((l) => page(`/locations/${l.slug}`, 0.7)),
    ...localServices.map((l) => page(`/locations/${l.city}/${l.service}`, 0.7)),
    ...articles.map((a) => page(`/insights/${a.slug}`, 0.6, new Date(a.published))),
    page("/privacy", 0.2),
  ];
}

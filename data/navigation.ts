import { industries } from "./industries";

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { title: string; items: NavItem[] };

/** Services menu, grouped by search pillar. */
export const serviceGroups: NavGroup[] = [
  {
    title: "SEO · Google",
    items: [
      { label: "SEO", href: "/services/seo" },
      { label: "Local SEO", href: "/services/local-seo" },
      { label: "Technical SEO", href: "/services/technical-seo" },
      { label: "International SEO", href: "/services/international-seo" },
      { label: "E-commerce SEO", href: "/services/ecommerce-seo" },
    ],
  },
  {
    title: "AEO · Answers",
    items: [
      { label: "AEO", href: "/services/aeo" },
      { label: "Content & Digital PR", href: "/services/content-digital-pr" },
    ],
  },
  {
    title: "GEO · AI search",
    items: [
      { label: "GEO", href: "/services/geo" },
      { label: "Free AI visibility audit", href: "/free-audit" },
      { label: "Free AI readiness checker", href: "/tools/ai-readiness" },
    ],
  },
];

export const serviceLinks: NavItem[] = serviceGroups.flatMap((g) => g.items);

export const industryLinks: NavItem[] = industries.map((i) => ({
  label: i.name,
  href: `/industries/${i.slug}`,
  description: i.short,
}));

export const primaryNav = [
  { label: "Services", href: "/services", groups: serviceGroups },
  { label: "Industries", href: "/solutions", children: industryLinks },
  { label: "Global", href: "/markets" },
  { label: "Pricing", href: "/pricing" },
  { label: "Examples", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

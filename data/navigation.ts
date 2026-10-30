import { industries } from "./industries";

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { title: string; items: NavItem[] };

/** Services menu, grouped by discipline. Capabilities without their own page link to the relevant section. */
export const serviceGroups: NavGroup[] = [
  {
    title: "Build",
    items: [
      { label: "Website Development", href: "/services/website-development" },
      { label: "Next.js Development", href: "/services/nextjs-development" },
      { label: "Website Redesign", href: "/services/website-redesign" },
      { label: "Landing Pages", href: "/services/website-development#conversion-paths" },
      { label: "AI Applications", href: "/services/ai-automation#workflow-automation" },
    ],
  },
  {
    title: "Grow",
    items: [
      { label: "Performance Marketing", href: "/services/performance-marketing" },
      { label: "SEO", href: "/services/seo" },
      { label: "AEO", href: "/services/aeo" },
      { label: "GEO", href: "/services/geo" },
      { label: "Social Media", href: "/services/social-media-marketing" },
      { label: "Local SEO", href: "/services/local-seo" },
      { label: "Lead Generation", href: "/services/lead-generation" },
    ],
  },
  {
    title: "Convert",
    items: [
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "WhatsApp Automation", href: "/services/ai-automation#ai-chat-and-whatsapp-assistants" },
      { label: "CRM Integration", href: "/services/crm-automation" },
      { label: "AI Sales Assistants", href: "/services/lead-generation#qualification" },
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
  { label: "Solutions", href: "/solutions", children: industryLinks },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

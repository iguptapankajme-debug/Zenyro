import { services } from "./services";
import { industries } from "./industries";

export const serviceLinks = services.map((s) => ({
  label: s.name,
  href: `/services/${s.slug}`,
  description: s.headline,
}));

export const industryLinks = industries.map((i) => ({
  label: i.name,
  href: `/industries/${i.slug}`,
  description: i.short,
}));

export const primaryNav = [
  { label: "Services", href: "/services", children: serviceLinks },
  { label: "Solutions", href: "/solutions", children: industryLinks },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

import type { ToolKey } from "@/lib/tool-lead-schema";

export type ToolInfo = {
  slug: ToolKey;
  name: string;
  tagline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  facts: string[];
  services: string[];
};

export const tools: ToolInfo[] = [
  {
    slug: "website-cost-calculator",
    name: "Website Cost Calculator",
    tagline: "Know your budget before the first call.",
    description: "Answer nine questions and get an indicative budget range, timeline, delivery phases and technology recommendation for your website.",
    metaTitle: "Website Cost Calculator (India): Estimate Your Website Budget",
    metaDescription: "Free website cost calculator for Indian businesses. Get an indicative budget range in rupees, timeline, delivery phases and recommended technology in two minutes. No sign-up.",
    facts: ["9 questions", "About 2 minutes", "No sign-up"],
    services: ["website-development", "nextjs-development", "website-redesign"],
  },
  {
    slug: "seo-audit",
    name: "Website SEO Audit",
    tagline: "See what search engines see.",
    description: "Enter a page address for a server-side check of crawlability, on-page tags, structured data, images and performance, with evidence and fixes.",
    metaTitle: "Free Website SEO Audit Tool: Check Any Page",
    metaDescription: "Free SEO audit for any public web page: HTTPS, indexing, robots.txt, sitemap, title, meta description, headings, structured data, images and performance, with evidence and recommendations.",
    facts: ["Around 20 checks", "Evidence for every finding", "Results not stored"],
    services: ["seo", "local-seo", "website-redesign"],
  },
  {
    slug: "website-brief-generator",
    name: "Website Brief Generator",
    tagline: "Turn an idea into a clear plan.",
    description: "Answer seven questions about your business and get a structured development brief: pages, features, technology options, SEO and phases.",
    metaTitle: "Website Brief Generator: Plan Your Website Project",
    metaDescription: "Free website brief generator. Describe your business and goals to get a structured development brief with recommended pages, feature specifications, technology options, SEO considerations and phases.",
    facts: ["7 questions", "Download as text", "AI-assisted when available"],
    services: ["website-development", "nextjs-development", "seo"],
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug)!;

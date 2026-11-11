import type { Metadata } from "next";
import { site } from "./site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  /** Keep the brand suffix out of the title (used by the homepage). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

/** Shared social sharing image (1200×630), in /public/og. */
export const ogImage = { url: "/og/zenyro-og.png", width: 1200, height: 630, alt: `${site.name}: SEO, AEO and GEO agency. Get found on Google, ChatGPT and AI search.` };

export function buildMetadata({ title, description, path, absoluteTitle, type = "website" }: MetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      // Page-level openGraph replaces the inherited one, so the shared image is restated here.
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [ogImage.url],
    },
  };
}

export function absoluteUrl(path: string) {
  return `${site.url}${path === "/" ? "" : path}`;
}

export function organizationSchema() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        alternateName: ["Zenyro SEO", "Zenyro AI search agency"],
        slogan: site.tagline,
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
        image: `${site.url}/og/zenyro-og.png`,
        description: site.description,
        email: site.email || undefined,
        telephone: site.phone || undefined,
        address: { "@type": "PostalAddress", addressLocality: "Chandigarh", addressRegion: "Chandigarh Tricity", addressCountry: "IN" },
        areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
        knowsAbout: [
          "Search engine optimisation (SEO)", "Answer engine optimisation (AEO)", "Generative engine optimisation (GEO)",
          "AI search visibility", "Google AI Overviews", "ChatGPT search", "Local SEO", "Technical SEO",
          "International SEO", "E-commerce SEO", "Structured data", "Digital PR",
        ],
        contactPoint: site.email ? [{ "@type": "ContactPoint", contactType: "sales", email: site.email, availableLanguage: ["English", "Hindi", "Punjabi"], areaServed: site.areaServed }] : undefined,
        makesOffer: [
          { "@type": "Offer", name: "Growth plan: SEO, AEO and GEO", price: 799, priceCurrency: "USD", url: `${site.url}/pricing` },
          { "@type": "Offer", name: "Authority plan: SEO, AEO and GEO", price: 1799, priceCurrency: "USD", url: `${site.url}/pricing` },
          { "@type": "Offer", name: "Free AI visibility audit", price: 0, priceCurrency: "USD", url: `${site.url}/free-audit` },
        ],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

export function serviceSchema(input: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.areaServed,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "") },
    })),
  };
}

export function webApplicationSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    provider: { "@id": `${site.url}/#organization` },
  };
}

import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// PREVIEW_EXPORT=1 produces a static, server-less copy of the site for sharing previews.
// Production deployments never set it.
const preview = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], unoptimized: preview },
  experimental: { optimizePackageImports: ["lucide-react"] },
  ...(preview
    ? {
        output: "export",
        trailingSlash: true,
        distDir: ".next-preview",
        turbopack: {
          resolveAlias: {
            "next/link": "./preview/link.tsx",
            "@/app/actions/lead": "./preview/lead-action.ts",
          },
        },
      }
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
        // Zenyro is now a search agency (SEO, AEO, GEO): retired pages point to their closest match.
        async redirects() {
          const to = (source: string, destination: string) => ({ source, destination, permanent: true });
          return [
            ...["performance-marketing", "ai-automation", "website-development", "nextjs-development", "website-redesign", "social-media-marketing", "lead-generation", "crm-automation"]
              .map((s) => to(`/services/${s}`, s === "website-redesign" ? "/services/technical-seo" : "/services")),
            ...["hotel-website-development", "real-estate-website-development", "lead-generation-agency", "ai-automation-agency", "performance-marketing-agency"].map((s) => to(`/${s}`, "/services")),
            to("/ai-marketing-agency", "/services/geo"),
            ...["website-development", "performance-marketing", "social-media-marketing", "ai-automation"].map((s) => to(`/locations/:city/${s}`, "/locations/:city")),
            ...["whatsapp-lead-qualification-real-estate", "speed-to-lead", "whatsapp-automation-guide", "measure-cost-per-customer"].map((s) => to(`/insights/${s}`, "/insights")),
            ...["residential-launch-engine", "boutique-hotel-direct", "travel-quote-website", "dealer-lead-routing", "eauctionhunt", "himachal-cab-expert", "npa-experts", "himachal-taxi-and-tours", "msme-help", "travel-to-abroad"].map((s) => to(`/work/${s}`, "/work")),
            to("/work/clinic-appointment-flow", "/work/dental-local-seo"),
          ];
        },
      }),
};

export default nextConfig;

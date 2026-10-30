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
      }),
};

export default nextConfig;

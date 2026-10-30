# Zenyro website

Marketing and lead-generation site for **Zenyro**, an AI growth agency. *Build. Grow. Convert.*

Built with Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, React Three Fiber for the hero sculpture, and GSAP for the scroll-driven manifesto.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck && npm test
```

## Before launch

1. **Business details**: edit `lib/site.ts` (email, phone, WhatsApp number, booking link, social profiles, site URL). Empty values are hidden on the site.
2. **Environment variables**: copy `.env.example` to `.env.local` locally, and add the same variables in Vercel.
   - `NEXT_PUBLIC_SITE_URL`: the production domain (used for canonical URLs, sitemap and Open Graph).
   - Lead delivery: configure at least one of
     - `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM` for email notifications (verify the sender domain in Resend),
     - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` for storage (run `supabase/schema.sql` first),
     - `CRM_WEBHOOK_URL` to forward each lead to HubSpot, Zoho, Make, n8n or similar.

     In production, if none is configured, the form shows an error instead of silently losing leads.
   - `NEXT_PUBLIC_GSC_VERIFICATION`: Google Search Console verification token. After deploying, submit `/sitemap.xml` in Search Console.
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: enables cookie-free Plausible analytics.
3. **Privacy notice**: `app/privacy/page.tsx` is a starting point. Have it reviewed by a legal professional.
4. **Case studies**: `data/work.ts` holds clearly labelled *concept demonstrations*. Add real projects with `kind: "case-study"` and only client-verified outcomes.

## Where things live

| Path | Contents |
| --- | --- |
| `app/` | Routes, metadata, sitemap, robots, Open Graph image, server action for leads |
| `components/sections/` | Homepage and page sections |
| `components/3d/` | Hero sculpture (WebGL), static fallback and device-tier loader |
| `components/animations/` | Cursor, reveals, tilt, manifesto and process-line scroll effects |
| `components/calculator/`, `lib/calculator.ts` | Growth calculator UI and tested maths |
| `components/forms/`, `lib/lead-schema.ts`, `lib/leads.ts` | Lead form, Zod validation, delivery to email, Supabase and CRM |
| `data/` | All page copy: services, industries, landing pages, insights, work |

## Performance notes

- Every page is statically generated. Static content is server-rendered and only interactive pieces ship JavaScript.
- The 3D hero loads after the browser is idle, renders on demand, pauses off-screen, caps pixel ratio and drops to 30fps on mid-tier devices. Phones, low-memory devices, Save-Data users, reduced-motion users and browsers without WebGL get a static drawing instead.
- GSAP is loaded on demand when the manifesto section mounts.
- All motion respects `prefers-reduced-motion`; all content is readable without JavaScript.

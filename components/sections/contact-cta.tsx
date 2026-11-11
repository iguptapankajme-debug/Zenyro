import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Icon3D, PixelField } from "@/components/home/primitives";
import { LeadForm } from "@/components/forms/lead-form";
import { SocialLinks } from "@/components/ui/social-links";
import { ShaderCanvas } from "@/components/webgl/shader-canvas";
import { consultationHref, site } from "@/lib/site";

/**
 * Closing call to action. "band" (the default on most pages) is a compact panel with the two next
 * steps; "form" is the full enquiry form, used on the Contact page.
 */
export function ContactCta({ headingLevel = "h2", variant = "band" }: { headingLevel?: "h1" | "h2"; variant?: "band" | "form" }) {
  if (variant === "band") return <CtaBand />;
  const H = headingLevel;
  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line py-28 md:py-40" aria-labelledby="cta-title">
      <ShaderCanvas shader="ember" intensity={0.9} className="-z-20 bg-[radial-gradient(ellipse_at_20%_30%,rgba(21,94,239,.10),transparent_60%)]" />
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <svg aria-hidden="true" viewBox="0 0 400 400" className="contact-orbit pointer-events-none absolute -left-24 -top-24 -z-10 w-[34rem] max-w-none opacity-70">
            <circle cx="200" cy="200" r="120" fill="none" stroke="var(--color-line)" />
            <circle cx="200" cy="200" r="170" fill="none" stroke="var(--color-line)" strokeDasharray="2 6" />
            <ellipse cx="200" cy="200" rx="190" ry="70" fill="none" stroke="var(--color-line-2)" transform="rotate(-22 200 200)" />
            <g className="contact-spin">
              <circle cx="320" cy="200" r="5" fill="var(--color-ember)" />
            </g>
            <circle cx="200" cy="200" r="60" fill="url(#cta-glow)" />
            <defs>
              <radialGradient id="cta-glow"><stop offset="0" stopColor="#155eef" stopOpacity=".35" /><stop offset="1" stopColor="#155eef" stopOpacity="0" /></radialGradient>
            </defs>
          </svg>

          <p className="eyebrow mb-8">Get in touch</p>
          <H id="cta-title" className="text-[clamp(2.6rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
            <span className="block overflow-hidden"><span className="block" data-reveal>Let&apos;s get you</span></span>
            <span className="block overflow-hidden"><span className="hl block w-fit" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>found everywhere.</span></span>
          </H>
          <p className="lede mt-8 max-w-sm">Tell us about your business. We reply within one business day with where you stand on Google and in AI answers, and three practical fixes.</p>
          {site.bookingUrl && (
            <div className="mt-8">
              <ButtonLink href={consultationHref} variant="ghost" icon="up-right">Book a call</ButtonLink>
            </div>
          )}
          <dl className="mt-12 grid gap-5 border-t border-line pt-8 text-[0.9rem] sm:grid-cols-2 lg:grid-cols-1">
            {site.email && (
              <div>
                <dt className="eyebrow mb-2">Email</dt>
                <dd><a href={`mailto:${site.email}`} className="link-u text-[1.05rem]">{site.email}</a></dd>
              </div>
            )}
            <div>
              <dt className="eyebrow mb-2">Based in</dt>
              <dd className="text-muted">{site.region}. Working across India and abroad.</dd>
            </div>
            <div>
              <dt className="eyebrow mb-3">Follow</dt>
              <dd><SocialLinks /></dd>
            </div>
          </dl>
        </div>
        <div id="lead-form" className="scroll-mt-28 lg:col-span-7">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section id="contact" className="border-t border-line py-16 md:py-24" aria-labelledby="cta-title">
      <div className="shell">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-paper px-6 py-12 text-ink sm:px-10 md:py-16 lg:px-14">
          <PixelField cols={120} rows={34} seed={9} className="absolute inset-0 -z-10 h-full w-full opacity-40 [mask-image:linear-gradient(to_left,black,transparent_65%)]" />
          <div aria-hidden="true" className="absolute -right-20 -top-28 -z-10 size-[26rem] rounded-full bg-[radial-gradient(circle,rgb(21_94_239/.45),transparent_65%)]" />
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink/60">Next step</p>
              <h2 id="cta-title" className="mt-5 text-[clamp(2.1rem,4.4vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
                See where you stand on Google and in AI answers.
              </h2>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-ink/75">
                {["Free AI visibility audit", "Reply within one business day", "Plans from US$799 a month, no lock-in"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check aria-hidden="true" className="size-4 text-[#7aa7ff]" />{t}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/free-audit" className="inline-flex h-12 items-center gap-2 rounded-lg bg-ember px-6 font-medium text-ember-ink transition-colors hover:bg-ember-2">
                  Get my free audit <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
                <Link href="/contact" className="inline-flex h-12 items-center rounded-lg border border-ink/25 px-6 font-medium transition-colors hover:border-ink/60">Talk to us</Link>
                {site.email && <a href={`mailto:${site.email}`} className="ml-1 text-[0.92rem] text-ink/70 underline decoration-ink/30 underline-offset-4 hover:text-ink">{site.email}</a>}
              </div>
            </div>
            <div aria-hidden="true" className="relative mx-auto hidden h-56 w-full max-w-xs lg:col-span-4 lg:block">
              {([["chatgpt", "left-0 top-2", 88], ["gemini", "right-4 top-0", 72], ["perplexity", "left-10 bottom-0", 76], ["claude", "right-0 bottom-6", 84]] as const).map(([n, pos, size], i) => (
                <span key={n} className={`orbit-float absolute ${pos}`} style={{ animationDelay: `${-i * 1.4}s` }}>
                  <Icon3D name={n} size={size} className="drop-shadow-[0_18px_24px_rgba(0,0,0,.45)]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

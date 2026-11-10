import { ButtonLink } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { SocialLinks } from "@/components/ui/social-links";
import { ShaderCanvas } from "@/components/webgl/shader-canvas";
import { consultationHref, site } from "@/lib/site";

/** Two-column consultation block: editorial statement with a quiet animated orbit, and the form. */
export function ContactCta({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
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

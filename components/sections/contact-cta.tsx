import { ButtonLink } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { consultationHref, site } from "@/lib/site";

export function ContactCta({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-28 md:py-36" aria-labelledby="cta-title">
      <div aria-hidden="true" className="absolute -left-[20%] top-0 -z-10 size-[70vw] max-w-[60rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,.12),transparent_60%)]" />
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6">Start a project</p>
          <H id="cta-title" className="display-lg">
            Your next stage of growth <span className="text-ember">starts here.</span>
          </H>
          <p className="lede mt-6">Let&apos;s build the systems that bring your next customers.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={site.bookingUrl ? consultationHref : "#lead-form"} size="lg">Book a Growth Consultation</ButtonLink>
          </div>
          <dl className="mt-12 grid gap-6 border-t border-line pt-8 text-[0.92rem]">
            <div>
              <dt className="eyebrow mb-2">What happens next</dt>
              <dd className="text-muted">We reply within one business day and arrange a 30-minute call. You leave with three practical opportunities, whether or not we work together.</dd>
            </div>
            {site.email && (
              <div>
                <dt className="eyebrow mb-2">Email</dt>
                <dd><a href={`mailto:${site.email}`} className="link-u">{site.email}</a></dd>
              </div>
            )}
            <div>
              <dt className="eyebrow mb-2">Based in</dt>
              <dd className="text-muted">{site.region}. Working with businesses across India and abroad.</dd>
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

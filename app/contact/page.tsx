import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import Link from "next/link";
import { ContactCta } from "@/components/sections/contact-cta";
import { BusinessDetails } from "@/components/legal/business-details";
import { Faq } from "@/components/sections/faq";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Zenyro: Talk to an SEO, AEO & GEO Specialist",
  description: "Tell us about your business and where you want to be found. We reply within one business day and can schedule a call in your time zone.",
  path: "/contact",
});

const faqs = [
  { q: "How quickly will you reply?", a: `Within one business day. Email us at ${site.email} or use the form, and we'll suggest a call time in your working hours.` },
  { q: "What should I include in my message?", a: "Your website, the countries or cities you want customers from, and the searches or questions you'd most like to be found for. That's enough for us to prepare." },
  { q: "Do you work with businesses outside India?", a: "Yes. We work remotely with businesses in the United States, United Kingdom, UAE, Canada, Australia, Singapore and across India." },
  { q: "Is the first call free?", a: "Yes. The first call and the AI visibility audit are free, with no obligation. If we're not the right fit, we'll say so." },
  { q: "How much do your plans cost?", a: "Growth is from US$799 a month and Authority from US$1,799 a month, shown in your currency on the pricing page. No setup fee, month to month." },
];

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-36">
      <div className="shell"><Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} /></div>
      <ContactCta headingLevel="h1" variant="form" />
      <section className="border-t border-line py-16" aria-labelledby="biz-title">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">Business details</p>
            <h2 id="biz-title" className="display-md">Who you are dealing with.</h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
              Read our <Link href="/terms" className="link-u text-paper">terms</Link>, <Link href="/refund-policy" className="link-u text-paper">refund and cancellation policy</Link>, <Link href="/service-delivery" className="link-u text-paper">service delivery policy</Link> and <Link href="/privacy" className="link-u text-paper">privacy notice</Link>.
            </p>
          </div>
          <div className="lg:col-span-8"><BusinessDetails className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line text-[0.95rem] sm:grid-cols-[12rem_1fr]" /></div>
        </div>
      </section>
      <Faq faqs={faqs} title="Before you get in touch." />
    </div>
  );
}

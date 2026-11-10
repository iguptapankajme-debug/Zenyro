import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactCta } from "@/components/sections/contact-cta";
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
      <ContactCta headingLevel="h1" />
      <Faq faqs={faqs} title="Before you get in touch." />
    </div>
  );
}

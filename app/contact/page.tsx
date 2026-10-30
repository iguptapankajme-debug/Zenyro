import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Zenyro: Book a Growth Consultation",
  description: "Tell us about your business and growth goals. We reply within one business day and arrange a free 30-minute growth consultation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-36">
      <div className="shell"><Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} /></div>
      <ContactCta headingLevel="h1" />
    </div>
  );
}

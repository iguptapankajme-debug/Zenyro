import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { BusinessDetails } from "@/components/legal/business-details";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that apply when you use the Zenyro website or buy Zenyro's SEO, AEO and GEO services: plans, billing, cancellation, ownership and liability.",
  path: "/terms",
});

export default function TermsPage() {
  const name = site.legalName || site.name;
  return (
    <>
      <PageHero crumbs={[{ name: "Terms of Service", path: "/terms" }]} eyebrow="Legal" title="Terms of Service" art={false} />
      <section className="py-20">
        <div className="shell">
          <div className="prose-z">
            {/* TODO: have these terms reviewed by a legal professional. */}
            <p><strong>Last updated:</strong> November 2026. These terms apply to your use of {site.url.replace(/^https?:\/\//, "")} and to any services you buy from {name} (&quot;Zenyro&quot;, &quot;we&quot;, &quot;us&quot;). By using the website or paying for a service, you agree to them.</p>

            <h2>1. Who we are</h2>
            <p>Zenyro is a search marketing agency providing search engine optimisation (SEO), answer engine optimisation (AEO) and generative engine optimisation (GEO) services to businesses. We work remotely with clients in India and internationally.</p>
            <BusinessDetails />

            <h2>2. Our services</h2>
            <p>We sell two monthly plans, Growth and Authority, described with their prices and what is included on our <Link href="/pricing">pricing page</Link>, and occasionally one-off projects agreed in writing. All services are delivered digitally; we do not sell or ship physical goods. How and when we deliver is set out in our <Link href="/service-delivery">Service Delivery Policy</Link>.</p>
            <p>The free AI visibility audit and the AI readiness checker are free of charge and carry no obligation to buy.</p>

            <h2>3. Prices and payment</h2>
            <ul>
              <li>Plans are billed monthly in advance. The first payment is due before work starts, and each later payment is due at the start of the next monthly billing period.</li>
              <li>Prices are shown in your currency on the pricing page and confirmed on your invoice. Taxes such as GST are added where they apply.</li>
              <li>Payments are processed securely by our payment provider. We never see or store your full card details.</li>
              <li>There is no setup fee. If a payment fails, we may pause work until it is resolved.</li>
            </ul>

            <h2>4. Cancellation and refunds</h2>
            <p>There is no minimum term. Plans run month to month and you can cancel at any time by email with 30 days&apos; notice. If your next billing date falls within the notice period, that final month is billed and work continues through it. Refunds are covered in our <Link href="/refund-policy">Refund and Cancellation Policy</Link>.</p>

            <h2>5. What we need from you</h2>
            <ul>
              <li>Access to your website, Google Search Console, analytics and business profiles where the work requires it.</li>
              <li>Timely feedback and approvals on content and changes.</li>
              <li>Accurate information about your business, products and services.</li>
            </ul>

            <h2>6. No guarantees of rankings or AI mentions</h2>
            <p>Search engines and AI assistants decide their own results. We use recognised, ethical methods and report progress honestly, but no one can guarantee specific rankings, traffic, AI recommendations or revenue, and we do not.</p>

            <h2>7. Ownership</h2>
            <p>Once paid for, content and other work we create for you belongs to you. Your website, Search Console, analytics and business profile accounts always stay in your name. We may keep general know-how and our own tools, templates and methods.</p>

            <h2>8. Confidentiality</h2>
            <p>We keep your business information and data confidential and use it only to provide the services. We will not publish your name or results without your written permission.</p>

            <h2>9. Liability</h2>
            <p>To the extent the law allows, our total liability for any claim relating to the services is limited to the fees you paid us in the three months before the claim. We are not liable for indirect losses, such as lost profits, or for changes made by search engines, AI providers or third parties.</p>

            <h2>10. Using this website</h2>
            <p>Information on this website, including example playbooks and illustrative charts, is general guidance, not a promise of results. Do not misuse the website or the free tools, for example by attempting to overload them or scan sites you do not have the right to check.</p>

            <h2>11. Changes and governing law</h2>
            <p>We may update these terms and will change the date above when we do. Changes do not affect a billing period you have already paid for. These terms are governed by the laws of India, and the courts of Chandigarh have jurisdiction.</p>

            <h2>12. Contact</h2>
            <p>Questions about these terms: {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Link href="/contact">contact us</Link>}. See also our <Link href="/privacy">Privacy Notice</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}

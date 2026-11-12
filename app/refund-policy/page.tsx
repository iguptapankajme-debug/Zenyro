import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { BusinessDetails } from "@/components/legal/business-details";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Refund and Cancellation Policy",
  description: "How to cancel a Zenyro plan and when refunds apply: month to month, cancel with 30 days' notice, and a 7-day refund window on your first payment.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  const mail = site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Link href="/contact">our contact page</Link>;
  return (
    <>
      <PageHero crumbs={[{ name: "Refund and Cancellation Policy", path: "/refund-policy" }]} eyebrow="Legal" title="Refund and Cancellation Policy" art={false} />
      <section className="py-20">
        <div className="shell">
          <div className="prose-z">
            {/* TODO: confirm these refund terms match how you want to operate, and have them reviewed. */}
            <p><strong>Last updated:</strong> November 2026. This policy explains how to cancel a Zenyro service and when you can get a refund. It forms part of our <Link href="/terms">Terms of Service</Link>.</p>

            <h2>At a glance</h2>
            <div className="relative overflow-x-auto rounded-xl border border-line">
              <table>
                <thead><tr><th scope="col">Situation</th><th scope="col">What happens</th></tr></thead>
                <tbody>
                  <tr><th scope="row">You cancel a monthly plan</th><td>30 days&apos; notice by email. Work continues through the notice period; no charges after it ends.</td></tr>
                  <tr><th scope="row">First payment, within 7 days, before onboarding starts</th><td>Full refund.</td></tr>
                  <tr><th scope="row">First payment, within 7 days, after work has started</th><td>Refund of the first payment minus the value of work already delivered, which we will itemise.</td></tr>
                  <tr><th scope="row">Later monthly payments</th><td>Not refundable once the billing period has started, because work is scheduled and delivered across the month.</td></tr>
                  <tr><th scope="row">Duplicate or incorrect charge</th><td>Full refund of the incorrect amount.</td></tr>
                  <tr><th scope="row">Free audit and free checker</th><td>Free, so nothing to refund.</td></tr>
                </tbody>
              </table>
            </div>

            <h2>How to cancel</h2>
            <p>Email {mail} from the address on your account, saying which plan you want to cancel. There is no minimum term and no cancellation fee. Cancellation takes effect 30 days after we receive your email: if your next billing date falls within those 30 days, that final month is billed and work continues through it. We confirm every cancellation in writing within one business day.</p>
            <p>When a plan ends, we hand over everything we created for you, and your website, Search Console, analytics and business profile accounts stay in your name.</p>

            <h2>How to request a refund</h2>
            <ol>
              <li>Email {mail} with your invoice number and the reason for the request.</li>
              <li>We reply within two business days to confirm whether the refund applies and the amount.</li>
              <li>Approved refunds are sent to the original payment method within 5 to 10 business days. The time for it to appear depends on your bank or card provider.</li>
            </ol>

            <h2>If we cannot deliver</h2>
            <p>If we cancel a service or cannot deliver what was agreed for reasons on our side, we refund the unused part of the period you paid for.</p>

            <h2>Contact</h2>
            <BusinessDetails />
          </div>
        </div>
      </section>
    </>
  );
}

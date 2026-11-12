import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { BusinessDetails } from "@/components/legal/business-details";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Service Delivery Policy",
  description: "How Zenyro delivers its digital SEO, AEO and GEO services: no physical shipping, onboarding within 3 business days, audit within 10, and monthly reports.",
  path: "/service-delivery",
});

export default function ServiceDeliveryPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Service Delivery Policy", path: "/service-delivery" }]} eyebrow="Legal" title="Service Delivery Policy" art={false} />
      <section className="py-20">
        <div className="shell">
          <div className="prose-z">
            {/* TODO: confirm these timelines match how you operate. */}
            <p><strong>Last updated:</strong> November 2026. Zenyro provides digital services only. Nothing is shipped physically, so there are no shipping charges or delivery addresses involved. This policy explains how and when the work reaches you.</p>

            <h2>Delivery timeline</h2>
            <div className="relative overflow-x-auto rounded-xl border border-line">
              <table>
                <thead><tr><th scope="col">Stage</th><th scope="col">When</th><th scope="col">How you receive it</th></tr></thead>
                <tbody>
                  <tr><th scope="row">Payment confirmation and invoice</th><td>Immediately after payment</td><td>Email</td></tr>
                  <tr><th scope="row">Onboarding call and access requests</th><td>Within 3 business days</td><td>Video call and email</td></tr>
                  <tr><th scope="row">Audit and 12-week roadmap</th><td>Within 10 business days of receiving access</td><td>Shared document and walkthrough call</td></tr>
                  <tr><th scope="row">Ongoing work (fixes, content, listings)</th><td>Weekly through each billing month</td><td>Changes on your site or accounts, plus a shared task log</td></tr>
                  <tr><th scope="row">Monthly report</th><td>In the first week of each month</td><td>Report link and email summary</td></tr>
                  <tr><th scope="row">Free AI visibility audit</th><td>Within 2 business days of request</td><td>Email</td></tr>
                </tbody>
              </table>
            </div>

            <h2>Where the work happens</h2>
            <p>We work remotely and deliver online: on your website, in your Google Search Console, analytics and business profiles, and through shared documents. Calls are scheduled in your working hours. Access you give us can be removed at any time.</p>

            <h2>Delays</h2>
            <p>If we need something from you, such as website access or approval of content, the timeline starts once we have it. If a delay is on our side, we tell you in writing with a new date. Delays never extend your billing.</p>

            <h2>Service hours</h2>
            <p>We reply to emails within one business day, Monday to Friday. Urgent website issues we caused are handled the same business day.</p>

            <h2>Related policies</h2>
            <p>See our <Link href="/terms">Terms of Service</Link>, <Link href="/refund-policy">Refund and Cancellation Policy</Link> and <Link href="/privacy">Privacy Notice</Link>. Questions: {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Link href="/contact">contact us</Link>}.</p>
            <BusinessDetails />
          </div>
        </div>
      </section>
    </>
  );
}

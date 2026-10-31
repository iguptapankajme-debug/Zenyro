import { PageHero } from "@/components/layout/page-hero";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { AnalyticsOptOut } from "@/components/analytics/analytics-opt-out";

export const metadata = buildMetadata({
  title: "Privacy Notice",
  description: "How Zenyro collects, uses and protects the personal information you share through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy", path: "/privacy" }]} eyebrow="Legal" title="Privacy notice" />
      <section className="py-20">
        <div className="shell">
          <div className="prose-z">
            {/* TODO: have this notice reviewed by a legal professional before launch. */}
            <p><strong>Last updated:</strong> October 2026. This notice explains how {site.name} handles personal information submitted through this website, in line with India&apos;s Digital Personal Data Protection Act, 2023.</p>
            <h2>What we collect</h2>
            <p>The enquiry form on this website does not send your details to our servers. When you complete it, your own email app opens with a message to us containing your name, business name, email address, optionally your phone number and website, your industry, budget range, the challenge you describe and the page you wrote from. We receive that information only if you choose to send the email.</p>
            <h2>Why we use it</h2>
            <ul>
              <li>To reply to your enquiry and arrange a consultation.</li>
              <li>To prepare relevant recommendations for your business.</li>
              <li>To keep a record of our communication with you.</li>
            </ul>
            <p>We do not sell your information, and we do not add you to marketing lists without your separate consent.</p>
            <h2>Where it is stored</h2>
            <p>Enquiry emails are kept in our email account and, where needed, with trusted service providers we use to run our business, such as our CRM, under appropriate security controls. Access is limited to people who need it to respond to you.</p>
            <h2>How long we keep it</h2>
            <p>We keep enquiry information for as long as needed to respond and maintain our business records, and delete it when it is no longer required.</p>
            <h2>Analytics</h2>
            <p>We use Vercel Web Analytics, a privacy-friendly service that does not use cookies, to count page visits. We record events such as an enquiry being sent, without personal details. We never send names, emails, phone numbers or what you type into forms to analytics. We respect Do Not Track and Global Privacy Control, and you can opt out below.</p>
            <AnalyticsOptOut />
            <h2>Your rights</h2>
            <p>You can ask us to access, correct or delete your personal information, or withdraw your consent, by emailing {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : "us"}.</p>
          </div>
        </div>
      </section>
    </>
  );
}

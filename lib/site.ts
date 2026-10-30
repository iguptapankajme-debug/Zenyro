/**
 * Central business details. Replace the values marked TODO with Zenyro's real information
 * before launch. Empty strings are hidden on the site rather than shown as placeholders.
 */
export const site = {
  name: "Zenyro",
  tagline: "Build. Grow. Convert.",
  description:
    "Zenyro is an AI growth agency. We build conversion-focused websites, run performance marketing, and automate sales with AI so businesses acquire more customers.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zenyro.com").replace(/\/$/, ""),
  locale: "en_IN",
  // TODO: replace with Zenyro's real contact details.
  email: "hello@zenyro.com",
  phone: "",
  whatsapp: "", // international format without "+", e.g. 919876543210
  bookingUrl: "", // e.g. a Cal.com or Calendly link. Falls back to the contact form.
  region: "Chandigarh Tricity, India",
  areaServed: ["India", "United Arab Emirates", "United Kingdom", "United States"],
  social: {
    linkedin: "",
    instagram: "",
    x: "",
  } as Record<"linkedin" | "instagram" | "x", string>,
};

export const consultationHref = site.bookingUrl || "/contact#lead-form";

export type NavLink = { label: string; href: string; description?: string };

/**
 * Central business details. Replace the values marked TODO with Zenyro's real information
 * before launch. Empty strings are hidden on the site rather than shown as placeholders.
 */
export const site = {
  name: "Zenyro",
  tagline: "Get found on Google, ChatGPT and every AI search.",
  description:
    "Zenyro is an SEO, AEO and GEO agency. We help businesses rank on Google, become the answer in AI Overviews, and get recommended by ChatGPT, Perplexity, Gemini and other AI assistants.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://zenyro.in").replace(/\/$/, ""),
  locale: "en_IN",
  // Contact details. Empty values are hidden; the WhatsApp button appears once a number is set.
  email: "zenyro.in@gmail.com",
  phone: "",
  whatsapp: "", // international format without "+", e.g. 919876543210
  bookingUrl: "", // e.g. a Cal.com or Calendly link. Falls back to the contact form.
  region: "Chandigarh Tricity, India",
  areaServed: ["India", "United Arab Emirates", "United Kingdom", "United States"],
  social: {
    instagram: "https://www.instagram.com/zenyro.in",
    facebook: "https://www.facebook.com/people/Zenyro/61595171497737/",
    youtube: "https://www.youtube.com/@zenyroin",
    linkedin: "",
    x: "",
  } as Record<SocialNetwork, string>,
};

export type SocialNetwork = "instagram" | "facebook" | "youtube" | "linkedin" | "x";

export const consultationHref = site.bookingUrl || "/contact#lead-form";

export type NavLink = { label: string; href: string; description?: string };

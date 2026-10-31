import { z } from "zod";

export const industryOptions = [
  "Real Estate",
  "Hospitality",
  "Healthcare & Clinics",
  "Interior Design & Premium Retail",
  "Education & Professional Services",
  "Home Improvement & Building Materials",
  "Travel, Taxi & Tours",
  "Financial & Advisory Services",
  "Other",
] as const;

export const budgetOptions = [
  "Under ₹50,000 / month",
  "₹50,000 – ₹2,00,000 / month",
  "₹2,00,000 – ₹5,00,000 / month",
  "Above ₹5,00,000 / month",
  "Not sure yet",
] as const;

const optionalUrl = z
  .string()
  .trim()
  .max(200)
  .transform((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v))
  .refine((v) => !v || z.url().safeParse(v).success, { message: "Enter a valid website address, or leave it blank." });

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  business: z.string().trim().min(2, "Please enter your business name.").max(120),
  email: z.email("Please enter a valid email address.").trim().max(160),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((v) => !v || /^\+?[\d\s()-]{7,20}$/.test(v), { message: "Enter a valid phone number, or leave it blank." }),
  website: optionalUrl,
  industry: z.enum(industryOptions, { message: "Please choose an industry." }),
  budget: z.enum(budgetOptions, { message: "Please choose a budget range." }),
  challenge: z.string().trim().min(10, "Tell us a little more, at least 10 characters.").max(2000),
  consent: z.literal("on", { message: "Please agree so we can contact you about your enquiry." }),
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadField = keyof Lead;

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<LeadField, string>>;
  /** Echo of the submitted values so the form keeps them after a failed submission. */
  values?: Partial<Record<string, string>>;
  /** Changes on every response so the form can remount with the echoed values. */
  at?: number;
};

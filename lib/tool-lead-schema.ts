import { z } from "zod";

export const toolKeys = ["website-cost-calculator", "seo-audit", "website-brief-generator"] as const;
export type ToolKey = (typeof toolKeys)[number];

export const toolLeadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  business: z.string().trim().min(2, "Please enter your business name.").max(120),
  email: z.email("Please enter a valid email address.").trim().max(160),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((v) => !v || /^\+?[\d\s()-]{7,20}$/.test(v), { message: "Enter a valid phone number, or leave it blank." }),
  message: z.string().trim().max(1500).optional(),
  tool: z.enum(toolKeys),
  intent: z.enum(["proposal", "consultation"]),
  /** Compact tool output, JSON-encoded by the client. */
  summary: z.string().max(12000),
  consent: z.literal("on", { message: "Please agree so we can contact you about this request." }),
});

export type ToolLeadField = "name" | "business" | "email" | "phone" | "message" | "consent";

export type ToolLeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ToolLeadField, string>>;
  values?: Partial<Record<string, string>>;
  at?: number;
};

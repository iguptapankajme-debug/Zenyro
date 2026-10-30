import { z } from "zod";

/** Marketing attribution captured in the browser. Only campaign parameters and the referring site, never personal data. */
export const attributionSchema = z.object({
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(150).optional(),
  referrer: z.string().max(200).optional(),
  landing_page: z.string().max(200).optional(),
});

export type Attribution = z.infer<typeof attributionSchema>;

export function readAttribution(formData: FormData): Attribution {
  const raw = Object.fromEntries(
    (["utm_source", "utm_medium", "utm_campaign", "referrer", "landing_page"] as const)
      .map((k) => [k, String(formData.get(k) ?? "").trim()])
      .filter(([, v]) => v),
  );
  const parsed = attributionSchema.safeParse(raw);
  return parsed.success ? parsed.data : {};
}

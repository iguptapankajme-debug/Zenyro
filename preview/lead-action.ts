import type { LeadFormState } from "@/lib/lead-schema";

/** Preview-only replacement for the lead server action: static previews have no server. */
export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const values = Object.fromEntries([...formData.entries()].map(([k, v]) => [k, String(v)]));
  return {
    status: "error",
    message: "This is a static preview, so the form is not connected. On the deployed site, this sends your enquiry.",
    values,
    at: Date.now(),
  };
}

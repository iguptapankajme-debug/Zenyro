/**
 * Client testimonials. Add only real quotes, with the client's permission to publish their name.
 * The testimonials section stays hidden while this list is empty.
 *
 * Example:
 * { quote: "We now show up when customers ask ChatGPT for a dentist in Mohali.", name: "Client name",
 *   role: "Owner", company: "Company" }
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Slug of the matching entry in data/work.ts, to link the quote to the project. */
  project?: string;
};

export const testimonials: Testimonial[] = [];

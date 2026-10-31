/**
 * Client testimonials. Add only real quotes, with the client's permission to publish their name.
 * The testimonials section stays hidden while this list is empty.
 *
 * Example:
 * { quote: "Enquiries now get a reply within a minute, even at night.", name: "Rohit Sharma",
 *   role: "Owner", company: "Himachal Cab Expert", project: "himachal-cab-expert" }
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

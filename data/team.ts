/**
 * The people behind Zenyro, shown on the About page. The section stays hidden while empty.
 * Photos go in /public/images/team (square, at least 800px, .webp or .jpg).
 *
 * Example:
 * { name: "Your Name", role: "Founder", bio: "Two sentences on your background and what you do for clients.",
 *   photo: "/images/team/your-name.webp", linkedin: "https://www.linkedin.com/in/your-handle" }
 */
export type TeamMember = { name: string; role: string; bio: string; photo?: string; linkedin?: string };

export const team: TeamMember[] = [];

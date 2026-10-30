import { disciplines, services, type Discipline } from "@/data/services";
import { SectionHeading, Em } from "@/components/ui/section-heading";
import { DisciplineSystem } from "./discipline-system";

/** Server wrapper: passes plain data to the interactive system so the copy stays server-rendered. */
export function Disciplines() {
  const order: Discipline[] = ["build", "grow", "convert"];
  const items = order.map((key) => ({
    key,
    ...disciplines[key],
    links: services.filter((s) => s.discipline === key).map((s) => ({ name: s.name, href: `/services/${s.slug}` })),
  }));
  return (
    <section className="py-28 md:py-40" aria-labelledby="disciplines-title">
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          title={<span id="disciplines-title">Three disciplines. <Em>One engine.</Em></span>}
        />
        <DisciplineSystem items={items} />
      </div>
    </section>
  );
}

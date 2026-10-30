import { ButtonLink } from "@/components/ui/button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-28">
      <div className="shell">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="display-xl">This page took <span className="text-ember">a wrong turn.</span></h1>
        <p className="lede mt-6">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="ghost" icon="up-right">Contact us</ButtonLink>
        </div>
      </div>
    </section>
  );
}

import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminLogin() {
  if (await isAdmin()) redirect("/admin/leads");
  return (
    <div className="shell max-w-md">
      <h1 className="text-[2.4rem] font-semibold tracking-[-0.04em]">Lead admin</h1>
      {adminConfigured() ? (
        <div className="mt-8 rounded-3xl border border-line bg-ink-2 p-7"><LoginForm /></div>
      ) : (
        <p className="mt-6 text-muted">Admin access is not configured. Set ADMIN_PASSWORD and an ADMIN_SESSION_SECRET of at least 32 characters in the environment to enable it.</p>
      )}
    </div>
  );
}

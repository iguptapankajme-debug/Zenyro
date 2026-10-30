"use server";

import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ADMIN_COOKIE, createSessionValue, isAdmin, passwordMatches } from "@/lib/admin-auth";
import { leadStatuses, updateLeadStatus } from "@/lib/admin-leads";
import { rateLimit } from "@/lib/rate-limit";

export async function login(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000).ok) return { error: "Too many attempts. Try again in 15 minutes." };
  if (!passwordMatches(String(formData.get("password") ?? ""))) return { error: "Incorrect password." };
  const session = createSessionValue();
  (await cookies()).set(ADMIN_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    expires: session.expires,
  });
  redirect("/admin/leads");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/login");
}

const statusSchema = z.object({ id: z.uuid(), status: z.enum(leadStatuses) });

export async function setLeadStatus(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const parsed = statusSchema.safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success) return;
  await updateLeadStatus(parsed.data.id, parsed.data.status);
  revalidatePath("/admin/leads");
}

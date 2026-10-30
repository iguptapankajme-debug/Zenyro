import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "zenyro_admin";
const SESSION_HOURS = 8;

/** Admin access is only enabled when both a password and a long session secret are configured. */
export function adminConfigured() {
  return !!process.env.ADMIN_PASSWORD && (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32;
}

const sign = (payload: string) => createHmac("sha256", process.env.ADMIN_SESSION_SECRET!).update(payload).digest("base64url");

function safeEqual(a: string, b: string) {
  // Hash first so inputs of different lengths compare in constant time.
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function passwordMatches(candidate: string) {
  return adminConfigured() && safeEqual(candidate, process.env.ADMIN_PASSWORD!);
}

export function createSessionValue() {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  const payload = `admin.${expires}`;
  return { value: `${payload}.${sign(payload)}`, expires: new Date(expires) };
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const i = value.lastIndexOf(".");
  if (i < 0) return false;
  const payload = value.slice(0, i);
  const sig = value.slice(i + 1);
  if (!safeEqual(sig, sign(payload))) return false;
  const expires = Number(payload.split(".")[1]);
  return Number.isFinite(expires) && expires > Date.now();
}

import "server-only";

/**
 * Supabase settings for lead storage. Accepts the names set by hand (SUPABASE_URL) and those the
 * Vercel–Supabase integration adds (NEXT_PUBLIC_SUPABASE_URL). The service role key is server-only.
 */
export function supabaseEnv() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return url && key ? { url, key } : null;
}

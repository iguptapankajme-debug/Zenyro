import { NextResponse } from "next/server";
import { z } from "zod";
import { auditUrl } from "@/lib/seo-audit/analyze";
import { AuditFetchError, normaliseAuditUrl } from "@/lib/seo-audit/safe-fetch";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const bodySchema = z.object({ url: z.string().min(1).max(2048) });

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const limited = rateLimit(`seo-audit:${ip}`, 6, 10 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "You've run several audits in a short time. Please try again in a few minutes." }, { status: 429, headers: { "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000)) } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body with a url." }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Enter a website address." }, { status: 400 });

  try {
    const url = normaliseAuditUrl(parsed.data.url);
    const report = await auditUrl(url);
    return NextResponse.json(report, { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
  } catch (e) {
    if (e instanceof AuditFetchError) {
      const status = e.code === "invalid_url" || e.code === "blocked" ? 400 : 422;
      return NextResponse.json({ error: e.message }, { status });
    }
    console.error("[seo-audit]", e);
    return NextResponse.json({ error: "Something went wrong while analysing that page. Please try again." }, { status: 500 });
  }
}

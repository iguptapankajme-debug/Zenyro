import { NextResponse } from "next/server";
import { briefInputSchema, generateBrief } from "@/lib/brief";
import { refineBriefWithAI } from "@/lib/brief-ai";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const limited = rateLimit(`brief:${ip}`, 8, 10 * 60 * 1000);
  if (!limited.ok) return NextResponse.json({ error: "You've generated several briefs recently. Please try again in a few minutes." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = briefInputSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    // Our own messages are written for people; library defaults (wrong option, wrong type) are not.
    const friendly = issue && issue.code === "custom" ? issue.message : issue?.code === "too_small" || issue?.code === "too_big" ? issue.message : "Please check your answers and choose from the listed options.";
    return NextResponse.json({ error: friendly }, { status: 400 });
  }

  const draft = generateBrief(parsed.data);
  const refined = await refineBriefWithAI(parsed.data, draft);
  return NextResponse.json(
    { brief: refined ?? draft, source: refined ? "ai" : "template" },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
  );
}

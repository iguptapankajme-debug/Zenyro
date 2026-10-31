import { llmsText } from "@/lib/ai-profile";

export const dynamic = "force-static";

/** /llms.txt: a markdown summary of Zenyro for AI assistants (see llmstxt.org). */
export function GET() {
  return new Response(llmsText(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}

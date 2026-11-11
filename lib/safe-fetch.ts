import "server-only";
import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import zlib from "node:zlib";
import type { LookupFunction } from "node:net";
import { isPublicAddress, normaliseUrl } from "./net-guard";

/**
 * Fetch a user-supplied URL safely: each connection resolves DNS through a lookup that rejects
 * non-public addresses (so a rebinding answer can't slip through between check and connect),
 * redirects are followed manually and re-checked, and size and time are capped.
 */
const guardedLookup: LookupFunction = (hostname, options, cb) => {
  // Node (with autoSelectFamily) usually asks for all addresses; honour both forms and keep only public ones.
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return cb(err, "", 0);
    const list = (addresses as dns.LookupAddress[]).filter((x) => isPublicAddress(x.address));
    if (!list.length) return cb(new Error("blocked-address"), "", 0);
    if (options.all) return (cb as unknown as (e: null, a: dns.LookupAddress[]) => void)(null, list);
    cb(null, list[0]!.address, list[0]!.family);
  });
};

export type SafeResponse = { url: string; status: number; body: string; type: string };

function once(url: URL, maxBytes: number, timeoutMs: number): Promise<{ status: number; location?: string; body: string; type: string }> {
  return new Promise((resolve, reject) => {
    const lib = url.protocol === "https:" ? https : http;
    const req = lib.request(url, {
      method: "GET",
      lookup: guardedLookup,
      timeout: timeoutMs,
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; ZenyroAIReadiness/1.0; +https://zenyro.in/tools/ai-readiness)",
        accept: "text/html,text/plain,application/xml;q=0.9,*/*;q=0.5",
        "accept-encoding": "gzip, deflate, br",
      },
    }, (res) => {
      const status = res.statusCode ?? 0;
      if (status >= 300 && status < 400 && res.headers.location) { res.resume(); return resolve({ status, location: res.headers.location, body: "", type: "" }); }
      const enc = String(res.headers["content-encoding"] ?? "").toLowerCase();
      const stream = enc === "gzip" ? res.pipe(zlib.createGunzip()) : enc === "deflate" ? res.pipe(zlib.createInflate()) : enc === "br" ? res.pipe(zlib.createBrotliDecompress()) : res;
      const chunks: Buffer[] = [];
      let size = 0;
      stream.on("data", (c: Buffer) => {
        size += c.length;
        if (size > maxBytes) { chunks.push(c.subarray(0, Math.max(0, maxBytes - (size - c.length)))); req.destroy(); stream.destroy(); finish(); return; }
        chunks.push(c);
      });
      let done = false;
      const finish = () => { if (done) return; done = true; resolve({ status, body: Buffer.concat(chunks).toString("utf8"), type: String(res.headers["content-type"] ?? "") }); };
      stream.on("end", finish);
      stream.on("error", (e) => (done ? undefined : reject(e)));
    });
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
    req.end();
  });
}

export async function safeFetch(input: string | URL, { maxBytes = 1_500_000, timeoutMs = 8000, redirects = 4 } = {}): Promise<SafeResponse> {
  let url = typeof input === "string" ? normaliseUrl(input) : input;
  for (let hop = 0; url && hop <= redirects; hop++) {
    const r = await once(url, maxBytes, timeoutMs);
    if (!r.location) return { url: url.toString(), status: r.status, body: r.body, type: r.type };
    url = normaliseUrl(new URL(r.location, url).toString());
  }
  throw new Error(url ? "too-many-redirects" : "invalid-url");
}

import "server-only";
import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import type { LookupFunction } from "node:net";
import { AuditFetchError, assertSafeUrl, isPrivateAddress } from "./url-guard";

const MAX_REDIRECTS = 5;
const DEFAULT_TIMEOUT = 10_000;
const DEFAULT_MAX_BYTES = 2_500_000;

export { AuditFetchError, normaliseAuditUrl } from "./url-guard";

/**
 * SSRF-hardened fetch for auditing public websites.
 *
 * - Only http/https, default ports, no embedded credentials, no IP-literal hosts in private ranges.
 * - Every DNS answer is checked at connect time (the custom `lookup` below), so a hostname that
 *   resolves to, or later rebinds to, a private address is refused.
 * - Redirects are followed manually (max 5) and each hop is re-validated.
 * - Hard timeout per request and a cap on bytes read.
 */

/** DNS lookup that refuses private answers. Used by the socket itself, so it also covers rebinding. */
const safeLookup: LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, "", 4);
    const list = (Array.isArray(addresses) ? addresses : [addresses]) as dns.LookupAddress[];
    if (!list.length || list.some((a) => isPrivateAddress(a.address))) {
      return callback(new AuditFetchError("This address resolves to a private network and can't be audited.", "blocked"), "", 4);
    }
    if ((options as { all?: boolean }).all) return (callback as unknown as (e: null, a: dns.LookupAddress[]) => void)(null, list);
    const first = list[0]!;
    callback(null, first.address, first.family);
  });
};

export type SafeResponse = { url: string; status: number; headers: http.IncomingHttpHeaders; body: string; redirects: string[]; ms: number };

function requestOnce(url: URL, timeout: number, maxBytes: number, method: "GET" | "HEAD"): Promise<Omit<SafeResponse, "redirects" | "url">> {
  return new Promise((resolve, reject) => {
    const lib = url.protocol === "https:" ? https : http;
    const started = Date.now();
    const req = lib.request(
      url,
      {
        method,
        lookup: safeLookup,
        timeout,
        headers: {
          "User-Agent": "ZenyroSEOAudit/1.0 (+https://zenyro.vercel.app/tools/seo-audit)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.5",
          "Accept-Language": "en",
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        let size = 0;
        res.on("data", (c: Buffer) => {
          size += c.length;
          if (size > maxBytes) {
            req.destroy(new AuditFetchError("The page is too large to analyse.", "too_large"));
            return;
          }
          chunks.push(c);
        });
        res.on("end", () => resolve({ status: res.statusCode ?? 0, headers: res.headers, body: Buffer.concat(chunks).toString("utf8"), ms: Date.now() - started }));
        res.on("error", reject);
      },
    );
    const hard = setTimeout(() => req.destroy(new AuditFetchError("The website took too long to respond.", "timeout")), timeout);
    req.on("timeout", () => req.destroy(new AuditFetchError("The website took too long to respond.", "timeout")));
    req.on("error", (e) => {
      clearTimeout(hard);
      reject(e instanceof AuditFetchError ? e : new AuditFetchError("We couldn't connect to that website.", "network"));
    });
    req.on("close", () => clearTimeout(hard));
    req.end();
  });
}

export async function safeFetch(input: URL, opts: { timeout?: number; maxBytes?: number; method?: "GET" | "HEAD" } = {}): Promise<SafeResponse> {
  const redirects: string[] = [];
  let url = new URL(input.href);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    assertSafeUrl(url);
    const res = await requestOnce(url, opts.timeout ?? DEFAULT_TIMEOUT, opts.maxBytes ?? DEFAULT_MAX_BYTES, opts.method ?? "GET");
    const location = res.headers.location;
    if (res.status >= 300 && res.status < 400 && location) {
      redirects.push(url.href);
      url = new URL(location, url);
      continue;
    }
    return { ...res, url: url.href, redirects };
  }
  throw new AuditFetchError("The website redirects too many times.", "redirects");
}

import { isIP } from "node:net";

/**
 * Server-side fetch guard for user-supplied URLs: only public http(s) hosts on standard ports,
 * never loopback, private, link-local (cloud metadata) or reserved ranges.
 */
export function isPublicAddress(ip: string): boolean {
  const v = isIP(ip);
  if (v === 4) {
    const [a, b] = ip.split(".").map(Number) as [number, number];
    if (a === 0 || a === 10 || a === 127 || a >= 224) return false;
    if (a === 100 && b >= 64 && b <= 127) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && (b === 168 || b === 0)) return false;
    if (a === 198 && (b === 18 || b === 19)) return false;
    return true;
  }
  if (v === 6) {
    const x = ip.toLowerCase();
    const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(x);
    if (mapped) return isPublicAddress(mapped[1]!);
    if (x === "::" || x === "::1") return false;
    if (/^f[cd]/.test(x) || /^fe[89ab]/.test(x) || x.startsWith("ff")) return false;
    return true;
  }
  return false;
}

export function normaliseUrl(input: string): URL | null {
  let s = input.trim();
  if (!s || s.length > 300) return null;
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    if (u.username || u.password) return null;
    if (u.port && u.port !== "443" && u.port !== "80") return null;
    const bare = u.hostname.replace(/^\[|\]$/g, "");
    if (isIP(bare)) return isPublicAddress(bare) ? u : null;
    if (!u.hostname.includes(".") || u.hostname.endsWith(".local") || u.hostname.endsWith(".internal")) return null;
    return u;
  } catch {
    return null;
  }
}

import net from "node:net";

/** URL and address rules for the SEO audit fetcher. Kept free of server-only imports so it can be unit-tested. */

export type AuditErrorCode = "invalid_url" | "blocked" | "timeout" | "network" | "too_large" | "redirects";

export class AuditFetchError extends Error {
  readonly code: AuditErrorCode;
  constructor(message: string, code: AuditErrorCode) {
    super(message);
    this.code = code;
  }
}

function ipv4ToInt(ip: string) {
  return ip.split(".").reduce((acc, o) => (acc << 8) + Number(o), 0) >>> 0;
}
const v4Blocks: [string, number][] = [
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8], ["169.254.0.0", 16], ["172.16.0.0", 12],
  ["192.0.0.0", 24], ["192.0.2.0", 24], ["192.88.99.0", 24], ["192.168.0.0", 16], ["198.18.0.0", 15], ["198.51.100.0", 24],
  ["203.0.113.0", 24], ["224.0.0.0", 4], ["240.0.0.0", 4], ["255.255.255.255", 32],
];

export function isPrivateAddress(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const n = ipv4ToInt(ip);
    return v4Blocks.some(([base, bits]) => {
      const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
      return (n & mask) === (ipv4ToInt(base) & mask);
    });
  }
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    if (lower === "::" || lower === "::1") return true;
    const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateAddress(mapped[1]!);
    const first = parseInt(lower.split(":")[0] || "0", 16);
    if ((first & 0xfe00) === 0xfc00) return true; // fc00::/7 unique local
    if ((first & 0xffc0) === 0xfe80) return true; // fe80::/10 link-local
    if ((first & 0xff00) === 0xff00) return true; // ff00::/8 multicast
    if (lower.startsWith("2001:db8")) return true; // documentation
    if (lower.startsWith("64:ff9b")) return true; // NAT64 can reach private IPv4
    return false;
  }
  return true; // not an IP at all: refuse
}

const BLOCKED_HOSTNAMES = /(^|\.)(localhost|local|internal|intranet|home|lan|corp)$/i;

/** Parse and validate a user-supplied URL. Adds https:// when no scheme is given. */
export function normaliseAuditUrl(input: string): URL {
  const trimmed = input.trim();
  if (!trimmed || trimmed.length > 2048) throw new AuditFetchError("Enter a website address.", "invalid_url");
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    throw new AuditFetchError("Only http and https addresses can be audited.", "invalid_url");
  }
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    throw new AuditFetchError("That doesn't look like a valid website address.", "invalid_url");
  }
  assertSafeUrl(url);
  url.hash = "";
  return url;
}

export function assertSafeUrl(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new AuditFetchError("Only http and https addresses can be audited.", "invalid_url");
  if (url.username || url.password) throw new AuditFetchError("Addresses with login details can't be audited.", "invalid_url");
  if (url.port && url.port !== "80" && url.port !== "443") throw new AuditFetchError("Only standard web ports (80 and 443) can be audited.", "blocked");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(host)) {
    if (isPrivateAddress(host)) throw new AuditFetchError("Private and internal network addresses can't be audited.", "blocked");
  } else if (!host.includes(".") || BLOCKED_HOSTNAMES.test(host)) {
    throw new AuditFetchError("Only public websites can be audited.", "blocked");
  }
}


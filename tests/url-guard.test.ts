import { test } from "node:test";
import assert from "node:assert/strict";
import { isPrivateAddress, normaliseAuditUrl } from "../lib/seo-audit/url-guard.ts";

test("private and reserved addresses are blocked", () => {
  for (const ip of ["127.0.0.1", "10.1.2.3", "172.16.0.1", "172.31.255.255", "192.168.1.1", "169.254.169.254", "100.64.0.1", "0.0.0.0", "::1", "fd00::1", "fe80::1", "::ffff:10.0.0.1", "::ffff:127.0.0.1", "224.0.0.1"]) {
    assert.equal(isPrivateAddress(ip), true, ip);
  }
});

test("public addresses are allowed", () => {
  for (const ip of ["8.8.8.8", "1.1.1.1", "172.32.0.1", "2606:4700:4700::1111"]) assert.equal(isPrivateAddress(ip), false, ip);
});

test("url normalisation and refusals", () => {
  assert.equal(normaliseAuditUrl("example.com").href, "https://example.com/");
  assert.equal(normaliseAuditUrl("http://example.com/page#x").href, "http://example.com/page");
  for (const bad of ["ftp://example.com", "http://user:pass@example.com", "http://example.com:8080", "http://localhost", "http://127.0.0.1", "http://[::1]/", "http://intranet", "http://printer.local", "http://169.254.169.254/latest/meta-data", ""]) {
    assert.throws(() => normaliseAuditUrl(bad), bad);
  }
});

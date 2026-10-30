"""
Turn the static export (PREVIEW_EXPORT=1 next build) into a self-contained folder that works
from any sub-path, e.g. a claude.ai artifact: every asset and internal link becomes relative.

Usage: python3 scripts/make-preview.py <export-dir> <output-dir>
"""
import os, re, shutil, sys

src, dst = sys.argv[1], sys.argv[2]
site = os.path.join(dst, "site")
shutil.rmtree(dst, ignore_errors=True)

def keep(path):
    rel = os.path.relpath(path, src)
    return not (rel.endswith(".txt") and not rel == "robots.txt") and not rel.startswith(("404", "_not-found", "opengraph-image", "twitter-image"))

for root, _, files in os.walk(src):
    for f in files:
        p = os.path.join(root, f)
        if keep(p):
            out = os.path.join(site, os.path.relpath(p, src))
            os.makedirs(os.path.dirname(out), exist_ok=True)
            shutil.copy2(p, out)

def to_file(path, base):
    """Map an absolute site path such as /services/ai-automation#x to a relative file URL."""
    m = re.match(r"([^?#]*)([?#].*)?$", path)
    p, tail = m.group(1), m.group(2) or ""
    p = p.lstrip("/")
    last = p.rstrip("/").split("/")[-1] if p else ""
    if "." in last:
        return base + p + tail
    if p and not p.endswith("/"):
        p += "/"
    return base + p + "index.html" + tail

LINK_SCRIPT = r"""<script>
self.TURBOPACK_CHUNK_BASE_PATH=%(b)s+"_next/";self.__ZROOT=%(b)s;
document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a)return;var h=a.getAttribute("href");if(!h||h.charAt(0)!=="/"||h.indexOf("/_next/")===0){if(h&&/index\.html(#.*)?$/.test(h)&&!a.target){e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();location.href=h;}return;}if(e.metaKey||e.ctrlKey||e.shiftKey||a.target==="_blank")return;e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();var m=h.match(/^([^?#]*)([?#].*)?$/),p=m[1].replace(/^\//,""),t=m[2]||"",l=p.replace(/\/$/,"").split("/").pop();if(l.indexOf(".")<0){if(p&&p.slice(-1)!=="/")p+="/";p+="index.html";}location.href=self.__ZROOT+p+t;},true);
</script>"""

for root, _, files in os.walk(site):
    for f in files:
        p = os.path.join(root, f)
        if f.endswith(".html"):
            depth = os.path.relpath(root, site).count(os.sep) + (0 if os.path.relpath(root, site) == "." else 1)
            base = "../" * depth
            html = open(p, encoding="utf-8").read()
            html = html.replace('"/_next/', '"' + base + "_next/")
            html = re.sub(r'(href|src)="(/(?!_next/)[^"]*)"', lambda m: f'{m.group(1)}="{to_file(m.group(2), base)}"', html)
            html = html.replace("<head>", "<head>" + LINK_SCRIPT % {"b": repr(base).replace("'", '"')}, 1)
            open(p, "w", encoding="utf-8").write(html)
        elif f.endswith(".js"):
            js = open(p, encoding="utf-8").read()
            patched = js.replace("${t.assetPrefix}/_next/", '${self.TURBOPACK_CHUNK_BASE_PATH||"/_next/"}')
            if patched != js:
                open(p, "w", encoding="utf-8").write(patched)

# Entry page for the artifact: forwards to the exported homepage.
open(os.path.join(dst, "index.html"), "w").write(
    '<title>Zenyro Preview</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n'
    '<style>:root{color-scheme:dark}body{background:#08090B;color:#F7F7F5;font:16px system-ui,sans-serif;'
    'display:grid;place-items:center;min-height:100%;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}'
    'a{color:#FF6B35}</style>\n<p>Opening the Zenyro preview… <a href="site/index.html">Continue</a></p>\n'
    '<script>location.replace("site/index.html")</script>\n'
)
count = sum(len(fs) for _, _, fs in os.walk(dst))
print("files:", count)

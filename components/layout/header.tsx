"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { Wordmark } from "./wordmark";

type Child = { label: string; href: string; description?: string };

function Dropdown({ label, href, items, active }: { label: string; href: string; items: readonly Child[]; active: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrap.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <li
      ref={wrap}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        window.clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeTimer.current = window.setTimeout(() => setOpen(false), 140);
      }}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.88rem] transition-colors",
          active || open ? "text-paper" : "text-muted hover:text-paper",
        )}
      >
        {label}
        <ChevronDown aria-hidden="true" className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
      >
        <div className="animate-fade overflow-hidden rounded-2xl border border-line bg-ink-2/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <ul className="grid grid-cols-2 gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group/item block rounded-xl px-4 py-3 transition-colors hover:bg-ink-3 focus-visible:bg-ink-3"
                >
                  <span className="flex items-center justify-between text-[0.9rem] font-medium text-paper">
                    {item.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5 text-ember opacity-0 transition-opacity group-hover/item:opacity-100" />
                  </span>
                  {item.description && <span className="mt-1 block text-[0.78rem] leading-snug text-muted">{item.description}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={href}
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-xl border-t border-line px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted hover:text-paper"
          >
            All {label.toLowerCase()} <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation. Adjusting state during render avoids an extra effect pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusables = [toggleRef.current!, ...menuRef.current.querySelectorAll<HTMLElement>("a")];
        const first = focusables[0]!, last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="shell pt-3 md:pt-4">
        <div
          className={cn(
            "relative z-10 flex h-14 items-center justify-between rounded-full pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-500 md:h-16 md:pl-6",
            scrolled || menuOpen
              ? "border border-line bg-ink/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link href="/" aria-label="Zenyro, home" className="shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) =>
                "children" in item ? (
                  <Dropdown key={item.href} label={item.label} href={item.href} items={item.children} active={isActive(item.href) || (item.href === "/solutions" && pathname.startsWith("/industries"))} />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-3.5 py-2 text-[0.88rem] transition-colors",
                        isActive(item.href) ? "text-paper" : "text-muted hover:text-paper",
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-ember" />}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              data-magnetic
              className="group hidden h-11 items-center gap-2 rounded-full bg-paper px-5 text-[0.88rem] font-medium text-ink transition-colors hover:bg-ember hover:text-ember-ink sm:inline-flex"
            >
              <span className="roll"><span>Let&apos;s Talk</span><span aria-hidden="true">Let&apos;s Talk</span></span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative flex size-11 items-center justify-center rounded-full border border-line-2 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span aria-hidden="true" className={cn("absolute h-px w-4 bg-paper transition-transform duration-500", menuOpen ? "rotate-45" : "-translate-y-[3px]")} />
              <span aria-hidden="true" className={cn("absolute h-px w-4 bg-paper transition-transform duration-500", menuOpen ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!menuOpen}
        className="fixed inset-0 z-0 overflow-y-auto bg-ink pt-[calc(env(safe-area-inset-top)+6.5rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)] lg:hidden"
      >
        <nav aria-label="Mobile" className="shell">
          <ul className="border-t border-line">
            {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Contact", href: "/contact" }].map((item, i) => (
              <li key={item.href} className="border-b border-line" style={{ animation: `fade .6s var(--ease-out-expo) ${i * 45}ms both` }}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-baseline justify-between py-4 text-[2.1rem] font-semibold uppercase leading-none tracking-[-0.04em]"
                >
                  {item.label}
                  <span className="font-mono text-[0.7rem] font-normal tracking-[0.14em] text-muted">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Services</p>
              <ul className="grid gap-2">
                {primaryNav[0].children.map((c) => (
                  <li key={c.href}><Link href={c.href} className="text-[0.95rem] text-muted hover:text-paper">{c.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Industries</p>
              <ul className="grid gap-2">
                {primaryNav[1].children.map((c) => (
                  <li key={c.href}><Link href={c.href} className="text-[0.95rem] text-muted hover:text-paper">{c.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

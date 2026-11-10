"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { primaryNav, serviceGroups, type NavGroup } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { Wordmark } from "./wordmark";

type Child = { label: string; href: string; description?: string };

function Dropdown({ label, href, items = [], groups, active }: { label: string; href: string; items?: readonly Child[]; groups?: readonly NavGroup[]; active: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // When a mouse hover has just opened the menu, the following click should keep it open.
  const openedByHover = useRef(false);

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
        if (!open) openedByHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        openedByHover.current = false;
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
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
          } else {
            setOpen((v) => !v);
          }
        }}
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
        className={cn("absolute left-1/2 top-full -translate-x-1/2 pt-3", groups ? "w-[46rem]" : "w-[34rem]")}
      >
        <div className="animate-fade overflow-hidden rounded-2xl border border-line bg-ink-2/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
          {groups && (
            <div className="grid grid-cols-3 gap-1">
              {groups.map((g, gi) => (
                <div key={g.title} className="p-2">
                  <p className="flex items-center gap-2 px-2 pb-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                    <span className="text-ember">0{gi + 1}</span> {g.title}
                  </p>
                  <ul className="grid">
                    {g.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="group/item flex items-center justify-between rounded-lg px-2 py-2 text-[0.9rem] text-paper transition-colors hover:bg-ink-3 focus-visible:bg-ink-3"
                        >
                          {item.label}
                          <ArrowUpRight aria-hidden="true" className="size-3.5 text-ember opacity-0 transition-opacity group-hover/item:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          <ul className={cn("grid grid-cols-2 gap-1", !items.length && "hidden")}>
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
      <Link
        href="/free-audit"
        className={cn(
          "block overflow-hidden bg-ember text-center text-[0.78rem] font-medium text-ember-ink transition-[max-height] duration-500 sm:text-[0.82rem]",
          scrolled || menuOpen ? "max-h-0" : "max-h-10",
        )}
      >
        <span className="inline-block py-2">
          New: free AI visibility audit<span className="hidden sm:inline">. <span className="underline decoration-white/50 underline-offset-2">See what ChatGPT says about your business</span></span><span className="sm:hidden"> →</span>
        </span>
      </Link>
      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-500",
          scrolled || menuOpen ? "border-line bg-ink/90 shadow-[0_8px_30px_-18px_rgba(9,9,11,.25)] backdrop-blur-xl" : "border-line bg-ink",
        )}
      >
      <div className="shell">
        <div className="relative z-10 flex h-16 items-center justify-between">
          <Link href="/" aria-label="Zenyro, home" className="shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) =>
                "groups" in item ? (
                  <Dropdown key={item.href} label={item.label} href={item.href} groups={item.groups} active={isActive(item.href) || pathname === "/search-growth"} />
                ) : "children" in item ? (
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
              className="hidden h-10 items-center rounded-lg border border-line-2 bg-ink px-4 text-[0.86rem] font-medium text-paper shadow-[0_1px_2px_rgba(9,9,11,.06)] transition-colors hover:bg-ink-2 md:inline-flex"
            >
              Contact
            </Link>
            <Link
              href="/free-audit"
              className="group hidden h-10 items-center gap-1.5 rounded-lg bg-ember px-4 text-[0.86rem] font-medium text-ember-ink shadow-[0_1px_2px_rgba(21,94,239,.3),inset_0_1px_0_rgba(255,255,255,.18)] transition-colors hover:bg-ember-2 sm:inline-flex"
            >
              Free AI audit
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative flex size-10 items-center justify-center rounded-lg border border-line-2 lg:hidden"
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
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!menuOpen}
        className="fixed inset-0 z-0 overflow-y-auto bg-ink pt-[calc(env(safe-area-inset-top)+5.5rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)] lg:hidden"
      >
        <nav aria-label="Mobile" className="shell">
          <ul className="border-t border-line">
            {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Contact", href: "/contact" }].map((item, i) => (
              <li key={item.href} className="border-b border-line" style={{ animation: `fade .6s var(--ease-out-expo) ${i * 45}ms both` }}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-baseline justify-between py-4 text-[1.8rem] font-medium leading-none tracking-[-0.03em]"
                >
                  {item.label}
                  <span className="font-mono text-[0.7rem] font-normal tracking-[0.14em] text-muted">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {serviceGroups.map((g) => (
              <div key={g.title}>
                <p className="eyebrow mb-3">{g.title}</p>
                <ul className="grid gap-2">
                  {g.items.map((c) => (
                    <li key={c.href}><Link href={c.href} className="text-[0.95rem] text-muted hover:text-paper">{c.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
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

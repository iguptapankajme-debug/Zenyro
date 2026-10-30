"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { consultationHref, site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Sticky bottom action bar for phones. It slides in once the visitor scrolls past the opening
 * screen (where the page already shows its own buttons) and stays off the contact page.
 */
export function MobileCta() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;
  return (
    <div
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 px-[var(--gutter)] pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl transition-transform duration-500 ease-out-expo lg:hidden",
        shown ? "translate-y-0" : "invisible translate-y-full",
      )}
    >
      <div className="flex gap-2">
        <Link href={consultationHref} tabIndex={shown ? undefined : -1} className="flex h-12 flex-1 items-center justify-center rounded-full bg-ember text-[0.95rem] font-medium text-ember-ink">
          Book a Growth Consultation
        </Link>
        {site.whatsapp && (
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={shown ? undefined : -1}
            aria-label="Chat with Zenyro on WhatsApp"
            className="flex size-12 items-center justify-center rounded-full border border-line-2"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
          </a>
        )}
      </div>
    </div>
  );
}

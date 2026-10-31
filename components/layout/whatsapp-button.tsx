"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

/** Floating WhatsApp chat button for larger screens (phones get it in the bottom action bar). */
export function WhatsAppButton() {
  const pathname = usePathname();
  if (!site.whatsapp || pathname.startsWith("/admin")) return null;
  const text = encodeURIComponent("Hi Zenyro, I'd like to talk about growing my business.");
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Zenyro on WhatsApp (opens in a new tab)"
      data-magnetic
      className="group fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 font-medium text-[#06240f] shadow-[0_20px_40px_-15px_rgba(37,211,102,.6)] transition-transform duration-300 hover:-translate-y-0.5 lg:flex"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2l-.4-.2z" />
      </svg>
      <span className="text-[0.9rem]">Chat on WhatsApp</span>
    </a>
  );
}

"use client";

import { RiCalculatorLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryPhone, telHref, whatsappHref } from "@/content/company";
import { cx } from "@/utils/cx";

/** Routes with their own sticky action footer (wizards) hide this bar. */
const HIDDEN_ON = ["/preventivo", "/prenota"];

/**
 * Thumb-zone actions on phones: call, WhatsApp, quote. Fixed to the bottom,
 * clear of the home indicator (safe-area inset).
 */
export function MobileActionBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  const item =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[0.75rem] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring active:bg-background-secondary-default";

  return (
    <nav
      aria-label="Azioni rapide"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-separator-border bg-background-primary-default/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgb(15_35_48/0.06)] supports-[backdrop-filter]:backdrop-blur-md md:hidden"
    >
      <div className="flex gap-2">
        <a href={telHref(primaryPhone)} className={cx(item, "text-text-primary")}>
          <RiPhoneLine className="size-6" aria-hidden="true" />
          Chiama
        </a>
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={cx(item, "text-text-primary")}>
          <RiWhatsappLine className="size-6" aria-hidden="true" />
          WhatsApp
        </a>
        <Link href="/preventivo" className={cx(item, "bg-button-primary text-text-white active:bg-none")}>
          <RiCalculatorLine className="size-6" aria-hidden="true" />
          Preventivo
        </Link>
      </div>
    </nav>
  );
}

export function useHasMobileActionBar() {
  const pathname = usePathname();
  return !HIDDEN_ON.some((p) => pathname.startsWith(p));
}

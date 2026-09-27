"use client";

import { RiArrowRightLine, RiCalculatorLine, RiCloseLine, RiMenuLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import { company, primaryPhone, telHref, whatsappHref } from "@/content/company";
import { mainNav } from "@/content/nav";
import { cx } from "@/utils/cx";
import { Logo } from "./logo";
import { CtaLink } from "./ui";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 border-b bg-background-full/95 supports-[backdrop-filter]:bg-background-full/85 supports-[backdrop-filter]:backdrop-blur-md",
        "transition-[border-color,box-shadow] duration-200",
        scrolled ? "border-separator-border shadow-card" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link
          href="/"
          aria-label={`${company.brand}, torna alla home`}
          className="-m-1 rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
        >
          <Logo size="sm" className="md:hidden" />
          <Logo size="md" className="hidden md:inline-flex" />
        </Link>

        <nav aria-label="Principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative inline-flex h-11 items-center rounded-lg px-3 text-small-strong transition-colors duration-150",
                      "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                      active ? "text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-background-secondary-default",
                    )}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-pipe" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(primaryPhone)}
            className="hidden items-center gap-2 rounded-lg px-2 text-small-strong text-text-primary outline-none hover:text-text-accent focus-visible:ring-2 focus-visible:ring-border-focus-ring md:inline-flex md:h-11"
          >
            <RiPhoneLine className="size-5 text-text-accent" aria-hidden="true" />
            <span className="tabular-nums">{primaryPhone.display}</span>
          </a>
          <CtaLink href="/preventivo" size="medium" className="hidden h-11 px-4 md:inline-flex" icon={RiArrowRightLine}>
            Preventivo online
          </CtaLink>
          <a
            href={telHref(primaryPhone)}
            aria-label={`Chiama ${primaryPhone.display}`}
            className="inline-flex size-12 items-center justify-center rounded-xl text-text-primary outline-none hover:bg-background-secondary-default focus-visible:ring-2 focus-visible:ring-border-focus-ring md:hidden"
          >
            <RiPhoneLine className="size-6" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Apri il menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-12 items-center justify-center rounded-xl text-text-primary outline-none hover:bg-background-secondary-default focus-visible:ring-2 focus-visible:ring-border-focus-ring lg:hidden"
          >
            <RiMenuLine className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ModalOverlay
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        className={({ isEntering, isExiting }) =>
          cx(
            "fixed inset-0 z-50 bg-background-scrim lg:hidden",
            isEntering && "anim-fade-in",
            isExiting && "anim-fade-out",
          )
        }
      >
        <Modal
          className={({ isEntering, isExiting }) =>
            cx(
              "fixed inset-y-0 right-0 flex w-full max-w-md flex-col bg-background-full shadow-xl outline-none",
              isEntering && "anim-sheet-in",
              isExiting && "anim-sheet-out",
            )
          }
        >
          <Dialog id="mobile-menu" aria-label="Menu" className="flex h-full flex-col outline-none">
            {({ close }) => (
              <>
                <div className="flex h-16 items-center justify-between border-b border-separator-border px-5">
                  <Heading slot="title" className="sr-only">
                    Menu
                  </Heading>
                  <Logo size="sm" />
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Chiudi il menu"
                    className="inline-flex size-12 items-center justify-center rounded-xl text-text-primary outline-none hover:bg-background-secondary-default focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                  >
                    <RiCloseLine className="size-6" aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="divide-y divide-separator-border">
                    {[{ label: "Home", href: "/" }, ...mainNav, { label: "Lavori", href: "/lavori" }, { label: "Domande frequenti", href: "/faq" }].map(
                      (item) => {
                        const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={close}
                              aria-current={active ? "page" : undefined}
                              className={cx(
                                "flex min-h-14 items-center justify-between py-3 font-display text-h3 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring rounded-md",
                                active ? "text-text-accent" : "text-text-primary",
                              )}
                            >
                              {item.label}
                              <RiArrowRightLine className="size-5 text-foreground-icon-tertiary" aria-hidden="true" />
                            </Link>
                          </li>
                        );
                      },
                    )}
                  </ul>
                </nav>

                <div className="space-y-3 border-t border-separator-border bg-background-primary-default px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
                  <CtaLink href="/preventivo" icon={RiCalculatorLine} trailing={false} className="w-full" onClick={close}>
                    Calcola il preventivo
                  </CtaLink>
                  <div className="grid grid-cols-2 gap-3">
                    <CtaLink href={telHref(primaryPhone)} variant="secondary" icon={RiPhoneLine} trailing={false}>
                      Chiama
                    </CtaLink>
                    <CtaLink href={whatsappHref()} variant="secondary" icon={RiWhatsappLine} trailing={false} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </CtaLink>
                  </div>
                  <p className="text-center text-small text-text-tertiary">{company.hoursLabel}</p>
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </header>
  );
}

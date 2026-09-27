"use client";

import { RiArrowLeftLine, RiArrowRightLine, RiPhoneLine } from "@remixicon/react";
import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/base/buttons/button";
import { primaryPhone, telHref } from "@/content/company";
import { cx } from "@/utils/cx";

/**
 * Shared frame for multi-step flows (quote, booking): labelled progress,
 * focus moved to each new step heading, and a thumb-zone action bar that is
 * fixed on phones and inline on desktop.
 */
export function WizardShell({
  steps,
  current,
  title,
  children,
  onBack,
  onNext,
  nextLabel = "Avanti",
  nextDisabled,
  hideNav,
  busy,
  focusOnChange = true,
}: {
  steps: string[];
  current: number;
  title: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideNav?: boolean;
  busy?: boolean;
  /** False for programmatic step changes (deep links) that should not scroll */
  focusOnChange?: boolean;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current || !focusOnChange) {
      first.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to step changes
  }, [current]);

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-small text-text-tertiary">
            Passo {current + 1} di {steps.length}
          </p>
          <a href={telHref(primaryPhone)} className="inline-flex min-h-11 items-center gap-1.5 text-small-strong text-text-accent">
            <RiPhoneLine className="size-4" aria-hidden="true" />
            Preferisci chiamare?
          </a>
        </div>
        <ol className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }} aria-label="Avanzamento">
          {steps.map((s, i) => (
            <li key={s} aria-current={i === current ? "step" : undefined}>
              <span className={cx("block h-1.5 rounded-full", i <= current ? "bg-pipe" : "bg-separator-border-strong")} />
              <span className={cx("mt-2 hidden text-small sm:block", i === current ? "text-text-primary font-semibold" : "text-text-tertiary")}>{s}</span>
              <span className="sr-only">
                {s}
                {i < current ? " (completato)" : i === current ? " (in corso)" : ""}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <h2 ref={headingRef} tabIndex={-1} className="scroll-mt-24 font-display text-h2 outline-none md:text-h2-lg">
        {title}
      </h2>
      <div className="mt-6">{children}</div>

      {!hideNav && (
        <>
          {/* spacer so the fixed bar never covers the last field on phones */}
          <div className="h-24 md:hidden" aria-hidden="true" />
          <div
            className={cx(
              "fixed inset-x-0 bottom-0 z-30 border-t border-separator-border bg-background-primary-default/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] supports-[backdrop-filter]:backdrop-blur-md",
              "md:static md:mt-10 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none",
            )}
          >
            <div className="mx-auto flex max-w-3xl gap-3 md:mx-0">
              {onBack && (
                <Button variant="secondary" size="large" leadingIcon={RiArrowLeftLine} onClick={onBack} className="shrink-0 px-3 md:px-4">
                  <span className="sr-only md:not-sr-only">Indietro</span>
                </Button>
              )}
              {onNext && (
                <Button
                  size="large"
                  trailingIcon={RiArrowRightLine}
                  onClick={onNext}
                  disabled={nextDisabled || busy}
                  className="flex-1 md:flex-none md:px-6"
                >
                  {nextLabel}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

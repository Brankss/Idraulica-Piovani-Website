import { RiAddLine } from "@remixicon/react";
import type { Faq } from "@/content/faq";
import { cx } from "@/utils/cx";

/** Native <details> accordion: works without JavaScript, keyboard-friendly. */
export function FaqList({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={cx("divide-y divide-separator-border border-y border-separator-border", className)}>
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary
            className={cx(
              "flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-copy-strong text-text-primary",
              "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring rounded-md",
            )}
          >
            {f.q}
            <RiAddLine
              className="size-5 shrink-0 text-text-accent transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-5 pr-9 text-copy text-text-secondary">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

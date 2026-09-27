import { RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import type { Service } from "@/content/services";
import { cx } from "@/utils/cx";
import { ServiceIcon } from "./service-icon";

function EcoTag() {
  return (
    <span className="inline-block rounded-full bg-background-eco px-2 py-0.5 align-[0.1em] font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-text-eco">
      Bio
    </span>
  );
}

/**
 * Mobile: dense tappable rows (one per service, ≥72px). Desktop: a card grid.
 * Same data, two layouts tuned to each input mode.
 */
export function ServiceList({ services, className }: { services: Service[]; className?: string }) {
  return (
    <div className={className}>
      <ul className="divide-y divide-separator-border overflow-hidden rounded-card border border-border-card bg-background-primary-default md:hidden">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/servizi/${s.slug}`}
              className="flex min-h-[4.5rem] items-center gap-4 px-4 py-3.5 outline-none active:bg-background-primary-hover focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus-ring"
            >
              <span
                className={cx(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl",
                  s.urgent ? "bg-background-inverse text-text-accent-inverse" : "bg-background-accent-soft text-text-accent",
                )}
              >
                <ServiceIcon icon={s.icon} className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-copy-strong text-text-primary">
                  {s.title}
                  {s.eco && (
                    <>
                      {" "}
                      <EcoTag />
                    </>
                  )}
                </span>
                <span className="mt-0.5 line-clamp-2 text-small text-text-secondary">{s.summary}</span>
              </span>
              <RiArrowRightSLine className="size-5 shrink-0 text-foreground-icon-tertiary" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <ul className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/servizi/${s.slug}`}
              className={cx(
                "group flex h-full flex-col rounded-card border border-border-card bg-background-primary-default p-6",
                "transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-pipe hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
              )}
            >
              <span className="flex items-center justify-between">
                <span
                  className={cx(
                    "flex size-12 items-center justify-center rounded-xl",
                    s.urgent ? "bg-background-inverse text-text-accent-inverse" : "bg-background-accent-soft text-text-accent",
                  )}
                >
                  <ServiceIcon icon={s.icon} className="size-6" />
                </span>
                {s.eco && <EcoTag />}
              </span>
              <span className="mt-5 font-display text-h3 text-text-primary">{s.title}</span>
              <span className="mt-2 flex-1 text-small text-text-secondary">{s.summary}</span>
              <span className="mt-5 inline-flex items-center gap-1 text-small-strong text-text-accent">
                Scopri
                <RiArrowRightSLine className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

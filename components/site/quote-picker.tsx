import { RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import { quoteCategories } from "@/lib/quote/categories";
import { ServiceIcon } from "./service-icon";

/**
 * The quote wizard's first step, shown inline on the home page (the real
 * product UI, not an illustration of it). Each choice deep-links into the
 * wizard with the category preselected.
 */
export function QuotePicker() {
  return (
    <div className="rounded-card border border-border-card bg-background-primary-default p-4 shadow-card md:p-6">
      <div className="flex items-center justify-between gap-4 px-1">
        <p className="text-copy-strong text-text-primary">Di cosa hai bisogno?</p>
        <p className="font-mono text-small text-text-tertiary">Passo 1 di 4</p>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2 md:gap-3">
        {quoteCategories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/preventivo?categoria=${c.id}`}
              className="group flex h-full min-h-[5.5rem] flex-col justify-between gap-2 rounded-xl border border-border-card bg-background-full p-3 outline-none transition-colors duration-150 hover:border-pipe hover:bg-background-accent-soft focus-visible:ring-2 focus-visible:ring-border-focus-ring active:bg-background-accent-soft md:p-4"
            >
              <span className="flex items-center justify-between">
                <ServiceIcon icon={c.icon} className="size-6 text-text-accent" />
                <RiArrowRightSLine className="size-4 text-foreground-icon-tertiary transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-small-strong text-text-primary">{c.label}</span>
                <span className="mt-0.5 hidden text-small text-text-tertiary sm:block">{c.hint}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { RiEyeLine } from "@remixicon/react";
import type { ReactNode } from "react";
import { isDemo } from "@/lib/site-mode";

/** Visible only in demo mode: states plainly what is simulated. */
export function DemoNotice({ children }: { children: ReactNode }) {
  if (!isDemo) return null;
  return (
    <p className="mb-6 flex gap-3 rounded-xl border border-border-card bg-background-accent-soft p-4 text-small text-text-accent" role="note">
      <RiEyeLine className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

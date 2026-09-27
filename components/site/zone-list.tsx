import { zones } from "@/content/zones";
import { cx } from "@/utils/cx";

export function ZoneList({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <ul className={cx("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {zones.map((z) => (
        <li key={z.id} className="rounded-xl border border-border-card bg-background-primary-default p-4">
          <p className="flex items-baseline justify-between gap-3">
            <span className="text-copy-strong text-text-primary">{z.name}</span>
            <span className="font-mono text-small text-text-tertiary">~{z.travelMin}′</span>
          </p>
          {!compact && <p className="mt-1.5 text-small text-text-secondary">{z.municipalities.join(" · ")}</p>}
        </li>
      ))}
    </ul>
  );
}

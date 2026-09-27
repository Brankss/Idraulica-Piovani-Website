import { cx } from "@/utils/cx";

/**
 * Piovani mark: a "P" drawn as one copper pipe with its elbow and couplings,
 * a water drop in the counter. Hand-built from the chosen Higgsfield concept
 * (geometry on a 64-unit grid, three primitives) so it stays crisp at 16px.
 */
export function LogoMark({
  className,
  tone = "default",
  detailed = true,
}: {
  className?: string;
  tone?: "default" | "inverse";
  /** Couplings add texture at display sizes; drop them at favicon sizes */
  detailed?: boolean;
}) {
  const drop = tone === "inverse" ? "var(--color-calce-50)" : "var(--color-ink-900)";
  return (
    <svg viewBox="0 0 64 64" className={cx("shrink-0", className)} aria-hidden="true" focusable="false">
      <path
        d="M16 58V10h18a14 14 0 0 1 0 28H16"
        fill="none"
        stroke="var(--color-pipe)"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      {detailed && (
        <g fill="var(--color-pipe-joint)">
          <rect x="9" y="46" width="14" height="4" rx="1" />
          <rect x="24" y="3" width="4" height="14" rx="1" />
          <rect x="24" y="31" width="4" height="14" rx="1" />
        </g>
      )}
      <path d="M32 18s-4.5 5.2-4.5 8.5a4.5 4.5 0 0 0 9 0C36.5 23.2 32 18 32 18Z" fill={drop} />
    </svg>
  );
}

/** Horizontal lockup: mark + wordmark + descriptor. */
export function Logo({
  className,
  tone = "default",
  size = "md",
}: {
  className?: string;
  tone?: "default" | "inverse";
  size?: "sm" | "md" | "lg";
}) {
  const s = {
    sm: { mark: "size-8", word: "text-[1.125rem]", tag: "text-[0.5rem]" },
    md: { mark: "size-10", word: "text-[1.375rem]", tag: "text-[0.5625rem]" },
    lg: { mark: "size-14", word: "text-[2rem]", tag: "text-[0.75rem]" },
  }[size];
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={s.mark} tone={tone} />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            "font-display font-extrabold tracking-[0.02em]",
            s.word,
            tone === "inverse" ? "text-text-inverse" : "text-text-primary",
          )}
        >
          PIOVANI
        </span>
        <span
          className={cx(
            "eyebrow mt-1 tracking-[0.22em]",
            s.tag,
            tone === "inverse" ? "text-text-accent-inverse" : "text-text-accent",
          )}
        >
          Idraulica · dal 1930
        </span>
      </span>
    </span>
  );
}

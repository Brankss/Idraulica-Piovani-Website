import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { buttonClassName, type ButtonSize } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[76rem] px-5 md:px-8", className)}>{children}</div>;
}

const tones = {
  default: "bg-background-full text-text-primary",
  raised: "bg-background-primary-default text-text-primary",
  muted: "bg-background-secondary-default text-text-primary",
  inverse: "bg-background-inverse text-text-inverse",
  eco: "bg-background-eco text-text-primary",
} as const;

export type SectionTone = keyof typeof tones;

export function Section({
  id,
  tone = "default",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx("py-14 md:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}

/** Small copper pipe coupling — the section marker that echoes the logo. */
export function Fitting({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 12" className={cx("h-3 w-7 shrink-0", className)} aria-hidden="true">
      <rect x="0" y="3.5" width="28" height="5" rx="1" fill="var(--color-pipe)" />
      <rect x="9" y="0.5" width="4" height="11" rx="1" fill="var(--color-pipe-joint)" />
    </svg>
  );
}

export function Eyebrow({ children, className, tone = "default" }: { children: ReactNode; className?: string; tone?: "default" | "inverse" }) {
  return (
    <p
      className={cx(
        "eyebrow flex items-center gap-2.5 text-eyebrow",
        tone === "inverse" ? "text-text-accent-inverse" : "text-text-accent",
        className,
      )}
    >
      <Fitting />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = "default",
  className,
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "default" | "inverse";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cx("max-w-3xl", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cx(
          "font-display text-balance",
          Tag === "h1" ? "text-h1 md:text-h1-lg" : "text-h2 md:text-h2-lg",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cx(
            "mt-4 text-lead md:text-lead-lg text-pretty",
            tone === "inverse" ? "text-text-inverse-secondary" : "text-text-secondary",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Next.js Link styled as a BoardUI Button. */
export function CtaLink({
  href,
  variant = "primary",
  size = "large",
  className,
  children,
  icon: Icon,
  trailing = true,
  ...rest
}: {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  trailing?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const isExternal = /^(https?:|tel:|mailto:)/.test(href);
  const content = (
    <>
      {Icon && !trailing && <Icon className="size-5 shrink-0" aria-hidden="true" />}
      <span className="inline-flex items-center justify-center px-1">{children}</span>
      {Icon && trailing && <Icon className="size-5 shrink-0" aria-hidden="true" />}
    </>
  );
  const cls = buttonClassName({ variant, size, className });
  if (isExternal) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

/** Inline arrow link ("Scopri di più →"). */
export function ArrowLink({
  href,
  children,
  className,
  tone = "default",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex min-h-11 items-center gap-1.5 text-copy-strong underline-offset-4 hover:underline",
        "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2 rounded-sm",
        tone === "inverse" ? "text-text-accent-inverse" : "text-text-accent",
        className,
      )}
    >
      {children}
      <RiArrowRightLine className="size-4.5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
    </Link>
  );
}

/** Header block for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
  breadcrumb,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  breadcrumb?: ReactNode;
}) {
  return (
    <header className="border-b border-separator-border bg-background-full">
      <Container className="pb-10 pt-6 md:pb-16 md:pt-10">
        {breadcrumb}
        <div className={cx(breadcrumb ? "mt-6 md:mt-10" : "")}>
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </header>
  );
}

/** Long-form text (legal pages, articles). */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "max-w-[68ch] text-copy text-text-secondary",
        "[&_h2]:font-display [&_h2]:text-h3 [&_h2]:md:text-h3-lg [&_h2]:text-text-primary [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24",
        "[&_h3]:text-copy-strong [&_h3]:text-text-primary [&_h3]:mt-8 [&_h3]:mb-2",
        "[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_a]:text-text-accent [&_a]:underline [&_strong]:text-text-primary [&_strong]:font-semibold",
        "[&_table]:w-full [&_table]:text-small [&_th]:text-left [&_th]:text-text-primary [&_th]:font-semibold [&_th]:py-2 [&_th]:pr-4 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top [&_tr]:border-b [&_tr]:border-separator-border",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Visible marker for facts still to be confirmed by the client. */
export function ToConfirm({ children }: { children?: ReactNode }) {
  return (
    <span className="rounded-sm bg-background-accent-soft px-1 text-text-accent" title="Da confermare con il cliente prima del lancio">
      {children ?? "[da confermare]"}
    </span>
  );
}

"use client";

import { RiErrorWarningLine } from "@remixicon/react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { Textarea } from "@/components/base/textarea/textarea";
import { cx } from "@/utils/cx";

/**
 * Touch-sized field styling layered on the BoardUI inputs via their
 * fieldClassName/inputClassName hooks (no fork of the source):
 * 48px tall, white fill, a 3:1 outline (WCAG 1.4.11), copper focus ring,
 * 16px text so iOS never zooms. State comes from React Aria data-attributes.
 */
export const touchField = cx(
  "min-h-12 px-3 py-2 bg-background-primary-default ring-1 ring-border-button-hover",
  "data-[hovered]:ring-border-button-active",
  "data-[focus-within]:ring-2 data-[focus-within]:ring-border-focus-ring",
  "data-[invalid]:ring-2 data-[invalid]:ring-border-error-default data-[invalid]:bg-background-primary-default",
);
export const touchInput = "text-copy pl-0";

type TextFieldProps = Omit<ComponentProps<typeof Input>, "hint" | "isInvalid"> & {
  error?: string;
  help?: ReactNode;
};

export function TextField({ error, help, className, ...props }: TextFieldProps) {
  return (
    <Input
      {...props}
      validationBehavior="aria"
      isInvalid={!!error}
      hint={error ?? help}
      fieldClassName={touchField}
      inputClassName={touchInput}
      className={cx("[&_label]:text-small-strong [&_label]:text-text-primary", className)}
    />
  );
}

type TextAreaFieldProps = Omit<ComponentProps<typeof Textarea>, "hint" | "isInvalid"> & {
  error?: string;
  help?: ReactNode;
};

export function TextAreaField({ error, help, className, ...props }: TextAreaFieldProps) {
  return (
    <Textarea
      {...props}
      validationBehavior="aria"
      isInvalid={!!error}
      hint={error ?? help}
      fieldClassName={cx(touchField, "py-3")}
      className={cx("[&_label]:text-small-strong [&_label]:text-text-primary [&_textarea]:text-copy", className)}
    />
  );
}

/**
 * Privacy acknowledgement (required, not a consent: processing to answer a
 * request is based on pre-contractual measures) + optional marketing consent,
 * separate and never pre-ticked.
 */
export function PrivacyChecks({
  privacyAck,
  marketing,
  onPrivacyAck,
  onMarketing,
  error,
}: {
  privacyAck: boolean;
  marketing: boolean;
  onPrivacyAck: (v: boolean) => void;
  onMarketing: (v: boolean) => void;
  error?: string;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">Privacy</legend>
      <Checkbox
        isSelected={privacyAck}
        onChange={onPrivacyAck}
        isInvalid={!!error}
        name="privacyAck"
        className="min-h-11 items-start py-1.5 [&>span:last-child]:text-small [&>span:last-child]:font-normal"
      >
        Ho letto l&apos;
        <Link href="/privacy" target="_blank" className="text-text-accent underline">
          informativa privacy
        </Link>{" "}
        e chiedo di essere ricontattato per questa richiesta. *
      </Checkbox>
      {error && <FieldError>{error}</FieldError>}
      <Checkbox
        isSelected={marketing}
        onChange={onMarketing}
        name="marketing"
        className="min-h-11 items-start py-1.5 [&>span:last-child]:text-small [&>span:last-child]:font-normal [&>span:last-child]:text-text-secondary"
      >
        Facoltativo: voglio ricevere promemoria di manutenzione e comunicazioni da Idraulica Piovani (revocabile in ogni momento).
      </Checkbox>
    </fieldset>
  );
}

export function FieldError({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <p id={id} className="flex items-start gap-1.5 text-small text-text-error-primary" role="alert">
      <RiErrorWarningLine className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Top-of-form summary when several fields are invalid (WCAG error summary). */
export function ErrorSummary({ errors, labels }: { errors: Record<string, string | undefined>; labels: Record<string, string> }) {
  const entries = Object.entries(errors).filter(([, v]) => v);
  if (entries.length < 2) return null;
  return (
    <div role="alert" tabIndex={-1} className="rounded-xl border border-border-error-default bg-background-primary-default p-4">
      <p className="text-copy-strong text-text-error-primary">Controlla {entries.length} campi:</p>
      <ul className="mt-2 list-disc pl-5 text-small text-text-secondary">
        {entries.map(([k, v]) => (
          <li key={k}>
            <a href={`#field-${k}`} className="underline">
              {labels[k] ?? k}
            </a>
            : {v}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Honeypot: hidden from people and assistive tech, bots fill it in. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Azienda
        <input type="text" name="company" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

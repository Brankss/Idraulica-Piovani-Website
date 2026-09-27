"use client";

import type { ReactNode } from "react";
import { Label, Text } from "react-aria-components";
import { RadioCard } from "@/components/base/radio/radio-card";
import { RadioGroup } from "@/components/base/radio/radio";
import { cx } from "@/utils/cx";

export type ChoiceOption<T extends string> = {
  value: T;
  title: ReactNode;
  description?: ReactNode;
};

/**
 * A question with card answers — BoardUI RadioGroup + RadioCard, restyled
 * for touch: ≥56px rows, wrapping text, a clear copper selected state.
 * Arrow keys move between options (React Aria).
 */
export function ChoiceGroup<T extends string>({
  label,
  help,
  options,
  value,
  onChange,
  columns = 1,
  error,
}: {
  label: ReactNode;
  help?: ReactNode;
  options: ChoiceOption<T>[];
  value: T | undefined;
  onChange: (v: T) => void;
  columns?: 1 | 2;
  error?: string;
}) {
  return (
    <RadioGroup
      value={value ?? null}
      onChange={(v) => onChange(v as T)}
      isInvalid={!!error}
      className="gap-3"
    >
      <Label className="text-copy-strong text-text-primary">{label}</Label>
      {help && (
        <Text slot="description" className="-mt-1 text-small text-text-secondary">
          {help}
        </Text>
      )}
      <div className={cx("grid gap-2", columns === 2 && "sm:grid-cols-2")}>
        {options.map((o) => (
          <RadioCard
            key={o.value}
            value={o.value}
            title={o.title}
            description={o.description}
            className={({ isSelected, isFocusVisible }) =>
              cx(
                "min-h-14 rounded-xl py-3 [&_.truncate]:overflow-visible [&_.truncate]:whitespace-normal",
                "[&_.truncate:first-child]:text-copy-strong [&_.truncate:last-child:not(:first-child)]:text-small",
                isSelected && "border-pipe bg-background-accent-soft ring-1 ring-pipe",
                isFocusVisible && "ring-2 ring-border-focus-ring",
              )
            }
          />
        ))}
      </div>
      {error && (
        <Text slot="errorMessage" className="text-small text-text-error-primary">
          {error}
        </Text>
      )}
    </RadioGroup>
  );
}

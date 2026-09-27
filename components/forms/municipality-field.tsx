"use client";

import { RiCheckLine, RiSearchLine } from "@remixicon/react";
import { useId, useMemo, useState } from "react";
import { allMunicipalities, zoneForMunicipality, type ZoneId } from "@/content/zones";
import { cx } from "@/utils/cx";
import { touchField } from "./fields";

export type MunicipalityValue = { name: string; zoneId: ZoneId | null };

/**
 * Municipality search: a real text input plus tappable suggestions (no
 * datalist — inconsistent on mobile). The zone grouping behind it is an
 * internal, demo-only input for the quote/booking engines and is never shown
 * to the visitor. Any municipality can be typed.
 */
export function MunicipalityField({
  value,
  onChange,
  error,
}: {
  value: MunicipalityValue | null;
  onChange: (v: MunicipalityValue | null) => void;
  error?: string;
}) {
  const [query, setQuery] = useState(value?.name ?? "");
  const id = useId();
  const listId = `${id}-list`;

  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("it");
    if (!q) return allMunicipalities.filter((m) => ["Brescia", "Nave", "Caino", "Rezzato", "Lumezzane", "Gussago"].includes(m.name));
    return allMunicipalities.filter((m) => m.name.toLocaleLowerCase("it").includes(q)).slice(0, 8);
  }, [query]);

  const choose = (name: string) => {
    const z = zoneForMunicipality(name);
    onChange({ name, zoneId: z?.id ?? null });
    setQuery(name);
  };

  return (
    <div className="space-y-3">
      <label htmlFor={`${id}-input`} className="block text-copy-strong text-text-primary">
        In che comune si trova l&apos;immobile?
      </label>
      <div className={cx("flex items-center gap-2 rounded-2lg", touchField, error && "ring-2 ring-border-error-default")}>
        <RiSearchLine className="size-5 shrink-0 text-foreground-icon-tertiary" aria-hidden="true" />
        <input
          id={`${id}-input`}
          type="text"
          inputMode="search"
          autoComplete="address-level2"
          aria-describedby={`${id}-help`}
          aria-controls={listId}
          aria-invalid={!!error}
          value={query}
          placeholder="Es. Nave"
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value.trim() ? { name: e.target.value.trim(), zoneId: zoneForMunicipality(e.target.value)?.id ?? null } : null);
          }}
          className="min-w-0 flex-1 bg-transparent text-copy text-text-primary outline-none placeholder:text-text-placeholder"
        />
      </div>
      <p id={`${id}-help`} className="text-small text-text-secondary">
        Lavoriamo a Brescia e in provincia. Scrivi il nome del comune o scegli un suggerimento.
      </p>
      <ul id={listId} aria-label="Comuni suggeriti" className="flex flex-wrap gap-2">
        {matches.map((m) => {
          const selected = value?.name === m.name;
          return (
            <li key={m.name}>
              <button
                type="button"
                onClick={() => choose(m.name)}
                aria-pressed={selected}
                className={cx(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-small-strong outline-none transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                  selected ? "border-pipe bg-background-accent-soft text-text-accent" : "border-border-card bg-background-primary-default text-text-primary hover:border-pipe",
                )}
              >
                {selected && <RiCheckLine className="size-4" aria-hidden="true" />}
                {m.name}
              </button>
            </li>
          );
        })}
      </ul>
      {error && (
        <p className="text-small text-text-error-primary" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

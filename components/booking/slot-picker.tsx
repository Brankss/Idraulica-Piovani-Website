"use client";

import { RiFlashlightLine, RiRouteLine, RiSparkling2Line } from "@remixicon/react";
import { useState } from "react";
import { formatDayLong, formatDayParts, formatTime } from "@/lib/booking/calendar";
import { recommendedSlots } from "@/lib/booking/engine";
import type { DayAvailability, Slot } from "@/lib/booking/types";
import { cx } from "@/utils/cx";

const same = (a: Slot | null, b: Slot) => !!a && a.date === b.date && a.start === b.start;

/**
 * Smart slot picker: recommended slots first (why they are recommended is
 * spelled out), then a scrollable day strip and the time grid of that day.
 * Everything is a real button: keyboard and screen-reader friendly.
 */
export function SlotPicker({
  days,
  value,
  onChange,
}: {
  days: DayAvailability[];
  value: Slot | null;
  onChange: (s: Slot) => void;
}) {
  const recommended = recommendedSlots(days);
  const firstOpen = days.find((d) => d.slots.length > 0)?.date;
  const [day, setDay] = useState<string | undefined>(value?.date ?? firstOpen);
  const current = days.find((d) => d.date === day);

  if (!firstOpen) {
    return (
      <p className="rounded-xl border border-border-card bg-background-primary-default p-5 text-copy text-text-secondary">
        Nelle prossime settimane non ci sono orari liberi online. Chiamaci: troviamo insieme una soluzione.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {recommended.length > 0 && (
        <section aria-labelledby="consigliati-title">
          <h3 id="consigliati-title" className="flex items-center gap-2 text-copy-strong">
            <RiSparkling2Line className="size-5 text-text-accent" aria-hidden="true" />
            Consigliati per te
          </h3>
          <p className="mt-1 text-small text-text-secondary">Giorni in cui siamo già in zona: meno attesa e meno strada.</p>
          <ul className="mt-4 grid gap-2 md:grid-cols-3">
            {recommended.map((s) => {
              const selected = same(value, s);
              return (
                <li key={`${s.date}-${s.start}`}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setDay(s.date);
                      onChange(s);
                    }}
                    className={cx(
                      "flex h-full w-full flex-col gap-1 rounded-xl border p-4 text-left outline-none transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                      selected ? "border-pipe bg-background-accent-soft ring-1 ring-pipe" : "border-border-card bg-background-primary-default hover:border-pipe",
                    )}
                  >
                    <span className="text-copy-strong">{formatDayLong(s.date)}</span>
                    <span className="font-mono text-h3 tabular-nums">
                      {formatTime(s.start)}
                      <span className="text-small text-text-tertiary">–{formatTime(s.end)}</span>
                    </span>
                    <span className="mt-1 flex items-start gap-1.5 text-small text-text-secondary">
                      {s.badges.includes("primo") ? (
                        <RiFlashlightLine className="mt-0.5 size-4 shrink-0 text-text-accent" aria-hidden="true" />
                      ) : (
                        <RiRouteLine className="mt-0.5 size-4 shrink-0 text-text-accent" aria-hidden="true" />
                      )}
                      {s.reason ?? (s.badges.includes("primo") ? "Primo orario libero" : "Buona disponibilità quel giorno")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section aria-labelledby="giorni-title">
        <h3 id="giorni-title" className="text-copy-strong">
          Oppure scegli giorno e ora
        </h3>
        <ul className="scrollbar-none -mx-5 mt-4 flex snap-x gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0" aria-label="Giorni disponibili">
          {days.map((d) => {
            const parts = formatDayParts(d.date);
            const disabled = d.slots.length === 0;
            const selected = d.date === day;
            const label = `${formatDayLong(d.date)}${disabled ? `: ${d.closedReason ?? "completo"}` : `, ${d.slots.length} orari liberi`}`;
            return (
              <li key={d.date} className="snap-start">
                <button
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  aria-label={label}
                  title={disabled ? (d.closedReason ?? "Completo") : undefined}
                  onClick={() => setDay(d.date)}
                  className={cx(
                    "flex h-[4.75rem] w-16 flex-col items-center justify-center rounded-xl border outline-none transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                    disabled && "cursor-not-allowed border-dashed border-separator-border-strong bg-transparent text-text-tertiary",
                    !disabled && selected && "border-border-strong bg-background-inverse text-text-inverse",
                    !disabled && !selected && "border-border-card bg-background-primary-default hover:border-pipe",
                  )}
                >
                  <span className="text-[0.75rem] uppercase tracking-wide">{parts.weekday}</span>
                  <span className="font-display text-h3 leading-none">{parts.day}</span>
                  <span className="text-[0.75rem]">{parts.month}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {current && (
          <div className="mt-5">
            <p className="text-small text-text-secondary" aria-live="polite">
              {formatDayLong(current.date)} · {current.slots.length} orari liberi
            </p>
            <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {current.slots.map((s) => {
                const selected = same(value, s);
                const rec = s.badges.includes("consigliato");
                return (
                  <li key={s.start}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-label={`${formatTime(s.start)}${rec ? ", consigliato" : ""}`}
                      onClick={() => onChange(s)}
                      className={cx(
                        "relative flex h-12 w-full items-center justify-center rounded-xl border font-mono text-spec tabular-nums outline-none transition-colors",
                        "focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                        selected ? "border-pipe bg-button-primary text-text-white" : "border-border-card bg-background-primary-default hover:border-pipe",
                      )}
                    >
                      {formatTime(s.start)}
                      {rec && !selected && <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-pipe" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 flex items-center gap-2 text-small text-text-tertiary">
              <span className="size-1.5 rounded-full bg-pipe" aria-hidden="true" /> orario consigliato
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

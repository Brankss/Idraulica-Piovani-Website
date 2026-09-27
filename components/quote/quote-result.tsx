"use client";

import { RiCalendarCheckLine, RiErrorWarningLine, RiPencilLine, RiPhoneLine, RiPrinterLine, RiSearchEyeLine } from "@remixicon/react";
import { Button } from "@/components/base/buttons/button";
import { primaryPhone, telHref } from "@/content/company";
import { CtaLink } from "@/components/site/ui";
import { formatEuroRange } from "@/lib/quote/engine";
import type { QuoteResult as Result } from "@/lib/quote/types";

export function QuoteResultCard({
  result,
  municipality,
  bookHref,
  onEdit,
}: {
  result: Result;
  municipality: string;
  bookHref: string;
  onEdit: () => void;
}) {
  return (
    <div className="space-y-6">
      {result.placeholder && (
        <p className="flex gap-3 rounded-xl border border-border-card bg-background-accent-soft p-4 text-small text-text-accent" role="note">
          <RiErrorWarningLine className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          Versione dimostrativa: le cifre usano un listino di esempio, in attesa dei prezzi di Idraulica Piovani.
        </p>
      )}

      {result.kind === "estimate" ? (
        <div className="overflow-hidden rounded-card border border-border-card bg-background-primary-default">
          <div className="tech-grid border-b border-separator-border p-5 md:p-8">
            <p className="eyebrow text-eyebrow text-text-tertiary">Stima indicativa · {municipality}</p>
            <p className="mt-3 font-display text-h1 tabular-nums md:text-h1-lg">{formatEuroRange(result.min, result.max)}</p>
            <p className="mt-2 text-small text-text-secondary">IVA esclusa. Su molti interventi in abitazione può applicarsi l&apos;aliquota agevolata: te lo confermiamo nel preventivo scritto.</p>
          </div>
          <div className="p-5 md:p-8">
            <h3 className="text-copy-strong">Come arriviamo a questa cifra</h3>
            <ul className="mt-3 divide-y divide-separator-border">
              {result.lines.map((l) => (
                <li key={l.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-copy text-text-secondary">{l.label}</span>
                  <span className="shrink-0 font-mono text-spec tabular-nums text-text-primary">
                    {formatEuroRange(l.min, l.max)}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-copy-strong">Abbiamo ipotizzato che</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-small text-text-secondary">
              {result.assumptions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="mt-6 rounded-lg bg-background-secondary-default p-3 text-small text-text-secondary">
              È una stima non vincolante calcolata sulle tue risposte. Il prezzo definitivo lo trovi nel preventivo scritto, dopo il sopralluogo.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-card border border-border-card bg-background-primary-default p-5 md:p-8">
          <RiSearchEyeLine className="size-9 text-text-accent" aria-hidden="true" />
          <h3 className="mt-4 font-display text-h3">Serve un sopralluogo per darti un prezzo</h3>
          <p className="mt-2 text-copy text-text-secondary">{result.reason}</p>
        </div>
      )}

      <div className="no-print grid gap-3 sm:flex sm:flex-wrap">
        <CtaLink href={bookHref} icon={RiCalendarCheckLine} trailing={false}>
          Prenota il sopralluogo
        </CtaLink>
        <CtaLink href={telHref(primaryPhone)} variant="secondary" icon={RiPhoneLine} trailing={false}>
          Chiama {primaryPhone.display}
        </CtaLink>
      </div>
      <div className="no-print flex flex-wrap gap-2">
        <Button variant="secondary" size="medium" leadingIcon={RiPencilLine} onClick={onEdit} className="h-11">
          Modifica le risposte
        </Button>
        {result.kind === "estimate" && (
          <Button variant="secondary" size="medium" leadingIcon={RiPrinterLine} onClick={() => window.print()} className="h-11">
            Stampa o salva in PDF
          </Button>
        )}
      </div>
    </div>
  );
}

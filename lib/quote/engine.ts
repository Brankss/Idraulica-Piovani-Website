import type {
  BagnoInput,
  CaldaiaInput,
  Pricebook,
  QuoteInput,
  QuoteLine,
  QuoteResult,
  RadianteInput,
  Range,
  RiparazioneInput,
  SolareInput,
} from "./types";

/**
 * Pure quote estimator. Runs in the browser today for instant feedback; the
 * backend will run the same function server-side and store the result with
 * the pricebook version, so the two can never drift.
 */
export function estimateQuote(input: QuoteInput, book: Pricebook): QuoteResult {
  const meta = { pricebookVersion: book.version, placeholder: book.placeholder };

  switch (input.category) {
    case "acque":
      return {
        kind: "inspection",
        category: input.category,
        reason:
          "Un impianto di recupero dell'acqua piovana o di fitodepurazione dipende da tetto, terreno, scarichi e regole comunali: il prezzo si può fare solo dopo averli visti.",
        ...meta,
      };
    case "stufe":
      return {
        kind: "inspection",
        category: input.category,
        reason:
          "Stufe in terra cruda e termocamini si progettano su misura per la stanza e per l'impianto esistente: serve un sopralluogo per darti un prezzo.",
        ...meta,
      };
    case "caldaia":
      return caldaia(input, book, meta);
    case "manutenzione": {
      const r = book.manutenzione;
      return finalize(input, book, meta, [{ label: "Manutenzione dell'impianto termico", min: r[0], max: r[1] }], [
        "Impianto accessibile e in condizioni di funzionamento normali.",
        "Eventuali ricambi esclusi.",
      ]);
    }
    case "bagno":
      return bagno(input, book, meta);
    case "radiante":
      return radiante(input, book, meta);
    case "solare":
      return solare(input, book, meta);
    case "riparazione":
      return riparazione(input, book, meta);
  }
}

type Meta = { pricebookVersion: string; placeholder: boolean };

function caldaia(input: CaldaiaInput, book: Pricebook, meta: Meta): QuoteResult {
  if (input.impiantoAttuale === "nessuno") {
    return {
      kind: "inspection",
      category: "caldaia",
      reason:
        "Senza un impianto esistente si tratta di progettarne uno nuovo (tubazioni e terminali): ti prepariamo un progetto dopo il sopralluogo.",
      ...meta,
    };
  }
  const base = book.caldaia.base[input.uso];
  const factor = input.abitazione === "casa-indipendente" ? book.caldaia.casaIndipendenteFactor : 1;
  const lines: QuoteLine[] = [
    {
      label:
        input.uso === "combinata"
          ? "Sostituzione con caldaia a condensazione (riscaldamento e acqua calda) e installazione"
          : "Sostituzione con caldaia a condensazione (solo riscaldamento) e installazione",
      min: base[0] * factor,
      max: base[1] * factor,
    },
  ];
  return finalize(input, book, meta, lines, [
    "Caldaia di fascia media, marca e modello da scegliere insieme.",
    "Impianto esistente in buono stato: eventuali adeguamenti si valutano al sopralluogo.",
  ]);
}

function bagno(input: BagnoInput, book: Pricebook, meta: Meta): QuoteResult {
  const cfg = book.bagno[input.intervento];
  const extraMq = Math.max(0, input.mq - cfg.mqIncluded);
  const labels: Record<BagnoInput["intervento"], string> = {
    completa: "Rifacimento della parte idraulica del bagno (impianto, sanitari, rubinetteria)",
    "solo-sanitari": "Sostituzione di sanitari e rubinetteria",
  };
  const lines: QuoteLine[] = [
    {
      label: labels[input.intervento],
      min: cfg.base[0] + extraMq * cfg.perMq[0],
      max: cfg.base[1] + extraMq * cfg.perMq[1],
    },
  ];
  if (input.sospesi) {
    lines.push({
      label: "Sanitari sospesi con telai di supporto",
      min: book.bagno.sospesiExtra[0],
      max: book.bagno.sospesiExtra[1],
    });
  }
  return finalize(input, book, meta, lines, [
    "Solo lavorazioni idrauliche: piastrelle, opere murarie ed elettriche escluse.",
    "Sanitari e rubinetteria di fascia media.",
  ]);
}

function radiante(input: RadianteInput, book: Pricebook, meta: Meta): QuoteResult {
  const perMq = book.radiante.perMq[input.sistema];
  const factor = input.contesto === "ristrutturazione" && input.sistema === "pavimento" ? book.radiante.ristrutturazioneFactor : 1;
  const min = Math.max(book.radiante.minimum, input.mq * perMq[0] * factor);
  const max = Math.max(book.radiante.minimum, input.mq * perMq[1] * factor);
  const labels: Record<RadianteInput["sistema"], string> = {
    pavimento: `Impianto radiante a pavimento, circa ${input.mq} m²`,
    parete: `Impianto radiante a parete, circa ${input.mq} m²`,
    battiscopa: `Battiscopa radiante SANATHERM per circa ${input.mq} m²`,
  };
  return finalize(input, book, meta, [{ label: labels[input.sistema], min, max }], [
    "Generatore di calore escluso.",
    input.sistema === "pavimento"
      ? "Massetti e pavimenti esclusi."
      : "Lo sviluppo effettivo dipende dalla forma delle stanze: lo misuriamo al sopralluogo.",
  ]);
}

function solare(input: SolareInput, book: Pricebook, meta: Meta): QuoteResult {
  const tier = book.solare.byHousehold.find((t) => input.persone <= t.maxPersons)!;
  return finalize(
    input,
    book,
    meta,
    [
      {
        label: `Impianto solare per una famiglia di ${input.persone} ${input.persone === 1 ? "persona" : "persone"}`,
        min: tier.range[0],
        max: tier.range[1],
      },
    ],
    ["Tetto accessibile con esposizione favorevole: il dimensionamento si fa al sopralluogo."],
  );
}

function riparazione(input: RiparazioneInput, book: Pricebook, meta: Meta): QuoteResult {
  if (input.tipo === "altro") {
    return {
      kind: "inspection",
      category: "riparazione",
      reason: "Per questo tipo di guasto serve vedere il problema: prenota una visita o chiamaci per descriverlo.",
      ...meta,
    };
  }
  const labels: Record<Exclude<RiparazioneInput["tipo"], "altro">, string> = {
    impianto: "Riparazione dell'impianto idraulico",
    boiler: "Riparazione del boiler a gas",
  };
  const r = book.riparazione.tipo[input.tipo];
  return finalize(
    input,
    book,
    meta,
    [
      { label: "Uscita e diagnosi", min: book.riparazione.uscita[0], max: book.riparazione.uscita[1] },
      { label: labels[input.tipo], min: r[0], max: r[1] },
    ],
    ["Ricambi standard compresi; componenti particolari preventivati a parte."],
  );
}

function finalize(
  input: QuoteInput,
  book: Pricebook,
  meta: Meta,
  lines: QuoteLine[],
  assumptions: string[],
): QuoteResult {
  const travel: Range = book.travel[input.zone];
  const all = [...lines];
  if (travel[1] > 0) {
    all.push({
      label: input.zone === "unknown" ? "Trasferta (comune da verificare)" : "Trasferta",
      min: travel[0],
      max: travel[1],
    });
  }
  const rounded = all.map((l) => ({ label: l.label, min: roundPrice(l.min), max: roundPrice(l.max) }));
  const min = rounded.reduce((s, l) => s + l.min, 0);
  const max = rounded.reduce((s, l) => s + l.max, 0);
  return {
    kind: "estimate",
    category: input.category,
    min,
    max,
    lines: rounded,
    assumptions,
    ...meta,
  };
}

/** Round to a clean figure: nearest €10 under €1.000, nearest €50 above. */
export function roundPrice(value: number): number {
  const step = value < 1000 ? 10 : 50;
  return Math.round(value / step) * step;
}

// Italian locale skips grouping under 10.000 ("2200"): force "2.200".
const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always" });
const plain = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 0, useGrouping: "always" });

export function formatEuro(value: number): string {
  return euro.format(value);
}

/** "2.200 – 3.200 €" */
export function formatEuroRange(min: number, max: number): string {
  return `${plain.format(min)} – ${plain.format(max)} €`;
}

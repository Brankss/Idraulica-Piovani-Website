"use client";

import { RiInformationLine, RiSubtractLine, RiAddLine } from "@remixicon/react";
import { Slider } from "@/components/base/slider/slider";
import { Switch } from "@/components/base/switch/switch";
import { ChoiceGroup } from "@/components/forms/choice";
import type { QuoteCategory } from "@/lib/quote/types";

export type Details = Record<string, string | number | boolean | undefined>;

type Props = { details: Details; set: (k: string, v: string | number | boolean) => void; errors: Record<string, string> };

/** Default answers per category — sliders start somewhere sensible. */
export function defaultDetails(category: QuoteCategory): Details {
  switch (category) {
    case "bagno":
      return { mq: 6, sospesi: false };
    case "radiante":
      return { mq: 90 };
    case "solare":
      return { persone: 4 };
    default:
      return {};
  }
}

const REQUIRED: Record<QuoteCategory, string[]> = {
  caldaia: ["impiantoAttuale", "uso", "abitazione", "fumi"],
  manutenzione: ["tipo"],
  bagno: ["intervento"],
  radiante: ["sistema", "contesto"],
  solare: ["uso"],
  riparazione: ["tipo"],
  acque: [],
  stufe: [],
};

export function validateDetails(category: QuoteCategory, d: Details): Record<string, string> {
  const errs: Record<string, string> = {};
  for (const k of REQUIRED[category]) if (d[k] === undefined) errs[k] = "Scegli una risposta per continuare.";
  return errs;
}

function NumberStepper({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const btn =
    "inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-border-card bg-background-primary-default text-text-primary outline-none hover:border-pipe focus-visible:ring-2 focus-visible:ring-border-focus-ring disabled:opacity-40";
  return (
    <div className="rounded-xl border border-border-card bg-background-primary-default p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-copy-strong text-text-primary">{label}</p>
        <p className="font-mono text-h3 tabular-nums text-text-primary" aria-hidden="true">
          {value} <span className="text-small text-text-tertiary">{unit}</span>
        </p>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <button type="button" className={btn} onClick={() => onChange(clamp(value - step))} disabled={value <= min} aria-label={`Diminuisci ${label}`}>
          <RiSubtractLine className="size-5" aria-hidden="true" />
        </button>
        <Slider
          value={value}
          onChange={(v) => onChange(v as number)}
          minValue={min}
          maxValue={max}
          step={step}
          showTooltip={false}
          thumbLabel={label}
          className="flex-1"
          formatValue={(v) => `${v} ${unit}`}
        />
        <button type="button" className={btn} onClick={() => onChange(clamp(value + step))} disabled={value >= max} aria-label={`Aumenta ${label}`}>
          <RiAddLine className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function DetailStep({ category, details, set, errors }: Props & { category: QuoteCategory }) {
  const v = <T extends string>(k: string) => details[k] as T | undefined;

  switch (category) {
    case "caldaia":
      return (
        <div className="space-y-8">
          <ChoiceGroup
            label="Cosa c'è oggi?"
            value={v<"caldaia" | "nessuno">("impiantoAttuale")}
            onChange={(x) => set("impiantoAttuale", x)}
            error={errors.impiantoAttuale}
            options={[
              { value: "caldaia", title: "Una caldaia da sostituire" },
              { value: "nessuno", title: "Nessun impianto", description: "Casa nuova o impianto da rifare" },
            ]}
          />
          <ChoiceGroup
            label="A cosa serve la caldaia?"
            value={v("uso")}
            onChange={(x) => set("uso", x)}
            error={errors.uso}
            options={[
              { value: "combinata", title: "Riscaldamento e acqua calda" },
              { value: "solo-riscaldamento", title: "Solo riscaldamento" },
            ]}
          />
          <ChoiceGroup
            label="Tipo di abitazione"
            columns={2}
            value={v("abitazione")}
            onChange={(x) => set("abitazione", x)}
            error={errors.abitazione}
            options={[
              { value: "appartamento", title: "Appartamento" },
              { value: "casa-indipendente", title: "Casa indipendente" },
            ]}
          />
          <ChoiceGroup
            label="La canna fumaria va adeguata?"
            help="Le caldaie a condensazione hanno spesso bisogno di uno scarico fumi diverso da quello delle vecchie caldaie."
            value={v("fumi")}
            onChange={(x) => set("fumi", x)}
            error={errors.fumi}
            options={[
              { value: "no", title: "No, è già adatta" },
              { value: "si", title: "Sì" },
              { value: "non-so", title: "Non lo so", description: "Lo verifichiamo al sopralluogo" },
            ]}
          />
        </div>
      );
    case "manutenzione":
      return (
        <ChoiceGroup
          label="Che tipo di intervento?"
          help="Le scadenze dei controlli sono indicate sul libretto di impianto."
          value={v("tipo")}
          onChange={(x) => set("tipo", x)}
          error={errors.tipo}
          options={[
            { value: "ordinaria", title: "Manutenzione ordinaria", description: "Pulizia, controlli e regolazioni" },
            { value: "con-controllo-fumi", title: "Con controllo di efficienza", description: "Manutenzione più analisi dei fumi" },
          ]}
        />
      );
    case "bagno":
      return (
        <div className="space-y-8">
          <ChoiceGroup
            label="Cosa vuoi fare?"
            value={v("intervento")}
            onChange={(x) => set("intervento", x)}
            error={errors.intervento}
            options={[
              { value: "completa", title: "Rifare tutto il bagno", description: "Impianto, scarichi, sanitari e rubinetteria" },
              { value: "vasca-doccia", title: "Trasformare la vasca in doccia" },
              { value: "solo-sanitari", title: "Cambiare sanitari e rubinetti" },
            ]}
          />
          <NumberStepper label="Superficie del bagno" unit="m²" min={2} max={20} step={1} value={Number(details.mq ?? 6)} onChange={(x) => set("mq", x)} />
          <div className="flex min-h-14 items-center justify-between gap-4 rounded-xl border border-border-card bg-background-primary-default p-4">
            <span>
              <span className="block text-copy-strong">Sanitari sospesi</span>
              <span className="text-small text-text-secondary">WC e bidet fissati a muro</span>
            </span>
            <Switch size="lg" isSelected={Boolean(details.sospesi)} onChange={(x) => set("sospesi", x)} aria-label="Sanitari sospesi" />
          </div>
        </div>
      );
    case "radiante":
      return (
        <div className="space-y-8">
          <ChoiceGroup
            label="Che sistema ti interessa?"
            value={v("sistema")}
            onChange={(x) => set("sistema", x)}
            error={errors.sistema}
            options={[
              { value: "pavimento", title: "A pavimento", description: "Ideale se rifai i pavimenti" },
              { value: "parete", title: "A parete", description: "Quando il pavimento non si tocca" },
              { value: "battiscopa", title: "Battiscopa SANATHERM", description: "Lungo le pareti, senza demolizioni" },
            ]}
          />
          <NumberStepper label="Superficie da riscaldare" unit="m²" min={20} max={300} step={5} value={Number(details.mq ?? 90)} onChange={(x) => set("mq", x)} />
          <ChoiceGroup
            label="Si tratta di"
            columns={2}
            value={v("contesto")}
            onChange={(x) => set("contesto", x)}
            error={errors.contesto}
            options={[
              { value: "nuova-costruzione", title: "Nuova costruzione" },
              { value: "ristrutturazione", title: "Ristrutturazione" },
            ]}
          />
        </div>
      );
    case "solare":
      return (
        <div className="space-y-8">
          <NumberStepper label="Persone in casa" unit="" min={1} max={8} step={1} value={Number(details.persone ?? 4)} onChange={(x) => set("persone", x)} />
          <ChoiceGroup
            label="Che uso vuoi farne?"
            value={v("uso")}
            onChange={(x) => set("uso", x)}
            error={errors.uso}
            options={[
              { value: "acqua-calda", title: "Acqua calda sanitaria" },
              { value: "integrazione-riscaldamento", title: "Anche integrazione al riscaldamento", description: "Richiede un progetto dedicato" },
            ]}
          />
        </div>
      );
    case "riparazione":
      return (
        <ChoiceGroup
          label="Qual è il problema?"
          help="Se c'è acqua che esce adesso, chiudi il rubinetto generale e chiamaci."
          value={v("tipo")}
          onChange={(x) => set("tipo", x)}
          error={errors.tipo}
          options={[
            { value: "perdita", title: "Una perdita d'acqua" },
            { value: "scarico", title: "Uno scarico lento o intasato" },
            { value: "rubinetteria", title: "Rubinetti, miscelatori o cassetta WC" },
            { value: "boiler", title: "Boiler o scaldabagno" },
            { value: "altro", title: "Altro" },
          ]}
        />
      );
    case "acque":
    case "stufe":
      return (
        <p className="flex gap-3 rounded-xl border border-border-card bg-background-primary-default p-5 text-copy text-text-secondary">
          <RiInformationLine className="mt-0.5 size-5 shrink-0 text-text-accent" aria-hidden="true" />
          Questi impianti si progettano su misura: nel prossimo passo ci dici dove si trova la casa, poi ti proponiamo un sopralluogo per
          vedere spazi e impianto esistente.
        </p>
      );
  }
}

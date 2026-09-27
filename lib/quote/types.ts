import type { ZoneId } from "@/content/zones";

export type Range = readonly [min: number, max: number];

export type QuoteCategory =
  | "caldaia"
  | "manutenzione"
  | "bagno"
  | "radiante"
  | "solare"
  | "riparazione"
  | "acque"
  | "stufe";

export type ZoneKey = ZoneId | "unknown";

type Base = { zone: ZoneKey };

export type CaldaiaInput = Base & {
  category: "caldaia";
  uso: "combinata" | "solo-riscaldamento";
  abitazione: "appartamento" | "casa-indipendente";
  fumi: "si" | "no" | "non-so";
  impiantoAttuale: "caldaia" | "nessuno";
};

export type ManutenzioneInput = Base & {
  category: "manutenzione";
  tipo: "ordinaria" | "con-controllo-fumi";
};

export type BagnoInput = Base & {
  category: "bagno";
  intervento: "completa" | "vasca-doccia" | "solo-sanitari";
  mq: number;
  sospesi: boolean;
};

export type RadianteInput = Base & {
  category: "radiante";
  sistema: "pavimento" | "parete" | "battiscopa";
  mq: number;
  contesto: "nuova-costruzione" | "ristrutturazione";
};

export type SolareInput = Base & {
  category: "solare";
  persone: number;
  uso: "acqua-calda" | "integrazione-riscaldamento";
};

export type RiparazioneInput = Base & {
  category: "riparazione";
  tipo: "perdita" | "scarico" | "rubinetteria" | "boiler" | "altro";
};

export type OnSiteOnlyInput = Base & {
  category: "acque" | "stufe";
};

export type QuoteInput =
  | CaldaiaInput
  | ManutenzioneInput
  | BagnoInput
  | RadianteInput
  | SolareInput
  | RiparazioneInput
  | OnSiteOnlyInput;

export type QuoteLine = { label: string; min: number; max: number };

export type QuoteEstimate = {
  kind: "estimate";
  category: QuoteCategory;
  min: number;
  max: number;
  lines: QuoteLine[];
  assumptions: string[];
  pricebookVersion: string;
  placeholder: boolean;
};

export type QuoteInspection = {
  kind: "inspection";
  category: QuoteCategory;
  reason: string;
  pricebookVersion: string;
  placeholder: boolean;
};

export type QuoteResult = QuoteEstimate | QuoteInspection;

export type Pricebook = {
  version: string;
  placeholder: boolean;
  currency: "EUR";
  vatIncluded: boolean;
  caldaia: {
    base: Record<CaldaiaInput["uso"], Range>;
    fumi: Record<CaldaiaInput["fumi"], Range>;
    casaIndipendenteFactor: number;
  };
  manutenzione: Record<ManutenzioneInput["tipo"], Range>;
  bagno: Record<BagnoInput["intervento"], { base: Range; perMq: Range; mqIncluded: number }> & {
    sospesiExtra: Range;
  };
  radiante: {
    perMq: Record<RadianteInput["sistema"], Range>;
    ristrutturazioneFactor: number;
    minimum: number;
  };
  solare: { byHousehold: { maxPersons: number; range: Range }[] };
  riparazione: {
    uscita: Range;
    tipo: Record<Exclude<RiparazioneInput["tipo"], "altro">, Range>;
  };
  travel: Record<ZoneKey, Range>;
};

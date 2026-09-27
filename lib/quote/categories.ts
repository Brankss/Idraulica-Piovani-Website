import type { ServiceIcon } from "@/content/services";
import type { QuoteCategory } from "./types";

export const quoteCategories: { id: QuoteCategory; label: string; hint: string; icon: ServiceIcon }[] = [
  { id: "caldaia", label: "Sostituire la caldaia", hint: "Caldaia a condensazione nuova", icon: "fire" },
  { id: "manutenzione", label: "Manutenzione caldaia", hint: "Controllo periodico e fumi", icon: "tools" },
  { id: "bagno", label: "Rifare il bagno", hint: "Impianti, doccia, sanitari", icon: "shower" },
  { id: "radiante", label: "Riscaldamento radiante", hint: "Pavimento, parete, SANATHERM", icon: "radiant" },
  { id: "solare", label: "Solare termico", hint: "Acqua calda dal sole", icon: "sun" },
  { id: "riparazione", label: "Una riparazione", hint: "Perdite, scarichi, rubinetti", icon: "tools" },
  { id: "acque", label: "Acqua piovana", hint: "Recupero e fitodepurazione", icon: "drop" },
  { id: "stufe", label: "Stufe e termocamini", hint: "Terra cruda, termocamino", icon: "leaf" },
];

export function isQuoteCategory(v: string | null | undefined): v is QuoteCategory {
  return !!v && quoteCategories.some((c) => c.id === v);
}

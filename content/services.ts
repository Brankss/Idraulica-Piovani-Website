import type { QuoteCategory } from "@/lib/quote/types";

/**
 * Services — ONLY what Idraulica Piovani states on its own website
 * (idraulicapiovani.com: home, /bioedilizia, /contatti). Each service lists
 * its source in `verified`. Do not add capabilities the client has not
 * confirmed: customers will call asking for them. See docs/verifica-contenuti.md.
 */

export type ServiceIcon =
  | "alarm"
  | "tools"
  | "fire"
  | "radiant"
  | "shower"
  | "sun"
  | "drop"
  | "leaf";

export type Service = {
  slug: string;
  title: string;
  /** Short label for chips, menus and the mobile list */
  shortTitle: string;
  icon: ServiceIcon;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  includes: { title: string; items: string[] };
  highlight?: { title: string; items: string[]; tone?: "urgent" | "eco" | "neutral" };
  /** Pre-selects the quote wizard category; null = not estimable online */
  quoteCategory: QuoteCategory | null;
  /** Links to the booking calendar with this service preselected */
  bookable: boolean;
  eco?: boolean;
  urgent?: boolean;
  faqs: { q: string; a: string }[];
  related: string[];
  /** Where the client states this service (audit trail) */
  verified: string;
};

export const services: Service[] = [
  {
    slug: "pronto-intervento-idraulico",
    title: "Pronto intervento idraulico",
    shortTitle: "Pronto intervento",
    icon: "alarm",
    urgent: true,
    summary: "Un guasto all'impianto o una perdita d'acqua? Chiamaci negli orari di apertura.",
    metaTitle: "Pronto intervento idraulico a Brescia",
    metaDescription:
      "Pronto intervento idraulico a Brescia e provincia: guasti all'impianto, perdite d'acqua e boiler a gas. Chiama Idraulica Piovani.",
    intro: [
      "Quando c'è un guasto all'impianto idraulico, chiamaci: ti diciamo come metterti in sicurezza e quando possiamo intervenire.",
      "Le urgenze non si prenotano online: telefona o scrivici su WhatsApp, dal lunedì al venerdì negli orari di apertura.",
    ],
    includes: {
      title: "Interveniamo su",
      items: ["Guasti all'impianto idraulico", "Perdite d'acqua", "Boiler a gas"],
    },
    highlight: {
      title: "Cosa fare subito",
      tone: "urgent",
      items: [
        "Chiudi il rubinetto generale dell'acqua.",
        "Se l'acqua raggiunge prese o quadri elettrici, stacca l'interruttore generale.",
        "Se senti odore di gas: niente fiamme né interruttori, apri le finestre, chiudi il contatore del gas e chiama il pronto intervento gas del tuo distributore (numero in bolletta) o il 112.",
        "Fotografa il danno: può servirti per l'assicurazione.",
      ],
    },
    quoteCategory: null,
    bookable: false,
    faqs: [
      {
        q: "Posso prenotare online un intervento urgente?",
        a: "No: per le urgenze serve parlarsi subito. Chiamaci o scrivici su WhatsApp.",
      },
    ],
    related: ["riparazioni-idrauliche", "caldaie-a-condensazione"],
    verified: "Home: «pronto intervento idraulico», «riparazione di boiler a gas», «riparazione degli impianti idraulici».",
  },
  {
    slug: "riparazioni-idrauliche",
    title: "Riparazioni e manutenzione",
    shortTitle: "Riparazioni",
    icon: "tools",
    summary: "Riparazione e manutenzione degli impianti idraulici e dei boiler a gas.",
    metaTitle: "Riparazione e manutenzione impianti idraulici a Brescia",
    metaDescription:
      "Riparazione e manutenzione di impianti idraulici e riparazione di boiler a gas a Brescia e provincia. Idraulica Piovani, dal 1930.",
    intro: [
      "Dalla semplice riparazione alla manutenzione periodica: ci occupiamo dell'impianto idraulico di casa perché continui a funzionare bene nel tempo.",
      "Per i guasti che non sono urgenti puoi prenotare una visita direttamente dal calendario online.",
    ],
    includes: {
      title: "Cosa facciamo",
      items: ["Riparazione degli impianti idraulici", "Riparazione di boiler a gas", "Manutenzione degli impianti idraulici"],
    },
    quoteCategory: "riparazione",
    bookable: true,
    faqs: [],
    related: ["pronto-intervento-idraulico", "ristrutturazione-bagni"],
    verified: "Home: «riparazione degli impianti idraulici», «riparazione di boiler a gas», «manutenzione degli impianti idraulici».",
  },
  {
    slug: "caldaie-a-condensazione",
    title: "Caldaie e termosifoni",
    shortTitle: "Caldaie",
    icon: "fire",
    summary: "Installazione di caldaie a condensazione, sostituzione di termosifoni e caldaie, manutenzione degli impianti termici.",
    metaTitle: "Caldaie a condensazione e termosifoni a Brescia",
    metaDescription:
      "Installazione di nuove caldaie a condensazione, sostituzione di termosifoni e caldaie, trasformazione e manutenzione degli impianti di riscaldamento a Brescia.",
    intro: [
      "Una caldaia a condensazione recupera parte del calore contenuto nei fumi, che una caldaia tradizionale disperde: a parità di comfort consuma meno.",
      "Installiamo nuove caldaie, sostituiamo termosifoni e caldaie esistenti e ci occupiamo della manutenzione degli impianti termici.",
    ],
    includes: {
      title: "Cosa facciamo",
      items: [
        "Installazione di caldaie a condensazione",
        "Sostituzione di termosifoni e caldaie",
        "Trasformazione degli impianti di riscaldamento",
        "Manutenzione degli impianti termici",
      ],
    },
    highlight: {
      title: "Perché la condensazione",
      tone: "neutral",
      items: [
        "Consuma meno di una caldaia tradizionale a parità di calore",
        "Rende al meglio con impianti a bassa temperatura, come il riscaldamento radiante",
      ],
    },
    quoteCategory: "caldaia",
    bookable: true,
    faqs: [
      {
        q: "La sostituzione della caldaia rientra nelle detrazioni?",
        a: "Spesso sì, ma le regole cambiano di anno in anno: chiedicelo in fase di preventivo. Per la parte fiscale fai riferimento al tuo commercialista o CAF.",
      },
    ],
    related: ["riscaldamento-radiante", "solare-termico-e-rinnovabili"],
    verified:
      "Home: «nuove caldaie a condensazione», «installazione delle caldaie», «Sostituzione termosifoni e caldaie», «trasformazione degli impianti di riscaldamento»; Bioedilizia: «manutenzione degli impianti termici».",
  },
  {
    slug: "riscaldamento-radiante",
    title: "Riscaldamento radiante",
    shortTitle: "Radiante",
    icon: "radiant",
    eco: true,
    summary: "A pavimento, a parete o a battiscopa: calore uniforme con acqua a bassa temperatura.",
    metaTitle: "Riscaldamento a pavimento, parete e battiscopa a Brescia",
    metaDescription:
      "Riscaldamento radiante a pavimento, a parete e a battiscopa SANATHERM, prodotto da Idraulica Piovani. Brescia e provincia.",
    intro: [
      "I sistemi radianti scaldano le superfici invece dell'aria: il calore è distribuito in modo uniforme e l'impianto lavora con acqua a bassa temperatura.",
      "Per questo si abbinano bene alle caldaie a condensazione e agli impianti solari.",
    ],
    includes: {
      title: "Tre soluzioni",
      items: ["A pavimento", "A parete", "A battiscopa, con SANATHERM: il sistema che produciamo noi"],
    },
    quoteCategory: "radiante",
    bookable: true,
    faqs: [
      {
        q: "Posso avere il riscaldamento radiante senza rifare i pavimenti?",
        a: "Sì: il battiscopa radiante SANATHERM corre lungo le pareti e il sistema a parete non tocca il pavimento. Valutiamo insieme la soluzione durante il sopralluogo.",
      },
    ],
    related: ["caldaie-a-condensazione", "solare-termico-e-rinnovabili"],
    verified:
      "Home: «Riscaldamento a pavimento», «Riscaldamento a parete», «Riscaldamento a battiscopa», «Produciamo direttamente il sistema a battiscopa radiante SANATHERM».",
  },
  {
    slug: "ristrutturazione-bagni",
    title: "Ristrutturazione bagni",
    shortTitle: "Bagni",
    icon: "shower",
    summary: "Rifacimento della parte idraulica del bagno: impianto, sanitari e rubinetteria.",
    metaTitle: "Ristrutturazione bagno a Brescia",
    metaDescription:
      "Ristrutturazione bagni a Brescia e provincia: rifacimento dell'impianto idraulico, sanitari e rubinetteria. Stima online indicativa in 2 minuti.",
    intro: [
      "Rifare il bagno significa rifare prima di tutto ciò che non si vede: le tubazioni. Ci occupiamo della parte idraulica della ristrutturazione.",
      "Con il preventivo online ottieni subito una stima indicativa.",
    ],
    includes: {
      title: "Cosa facciamo",
      items: ["Rifacimento dell'impianto idraulico del bagno", "Posa di sanitari e rubinetteria"],
    },
    quoteCategory: "bagno",
    bookable: true,
    faqs: [
      {
        q: "La stima online comprende anche piastrelle e opere murarie?",
        a: "No: la stima riguarda la parte idraulica. Il resto si definisce al sopralluogo.",
      },
    ],
    related: ["riparazioni-idrauliche", "caldaie-a-condensazione"],
    verified: "Home: «ristrutturazione di bagni».",
  },
  {
    slug: "solare-termico-e-rinnovabili",
    title: "Impianti solari",
    shortTitle: "Solare",
    icon: "sun",
    eco: true,
    summary: "Progettazione e installazione di impianti solari e soluzioni per il recupero energetico.",
    metaTitle: "Impianti solari a Brescia",
    metaDescription:
      "Progettazione e installazione di impianti solari e soluzioni di recupero energetico a Brescia e provincia. Idraulica Piovani.",
    intro: [
      "Progettiamo e installiamo impianti solari: soluzioni che abbassano la spesa energetica della famiglia e rispettano l'ambiente.",
      "Ogni impianto parte da un sopralluogo, per valutare casa, esposizione e impianto esistente.",
    ],
    includes: {
      title: "Cosa facciamo",
      items: ["Progettazione di impianti solari", "Installazione di impianti solari", "Recupero energetico"],
    },
    quoteCategory: "solare",
    bookable: true,
    faqs: [],
    related: ["riscaldamento-radiante", "caldaie-a-condensazione"],
    verified: "Home: «progettazione e installazione di impianti solari», «recupero energetico», «sfruttamento delle energie alternative».",
  },
  {
    slug: "acque-meteoriche-e-fitodepurazione",
    title: "Acque meteoriche e fitodepurazione",
    shortTitle: "Acqua piovana",
    icon: "drop",
    eco: true,
    summary: "Recupero e riuso dell'acqua piovana e piani di fitodepurazione.",
    metaTitle: "Recupero acqua piovana e fitodepurazione a Brescia",
    metaDescription: "Recupero e uso delle acque meteoriche e piani di fitodepurazione a Brescia e provincia. Idraulica Piovani.",
    intro: [
      "L'acqua piovana raccolta può essere recuperata e riutilizzata, riducendo il consumo di acqua potabile.",
      "La fitodepurazione tratta le acque di scarico con un sistema naturale. Ogni progetto parte da un sopralluogo.",
    ],
    includes: {
      title: "Cosa facciamo",
      items: ["Recupero e uso delle acque meteoriche", "Piani di fitodepurazione"],
    },
    quoteCategory: "acque",
    bookable: true,
    faqs: [],
    related: ["solare-termico-e-rinnovabili", "stufe-in-terra-cruda-e-termocamini"],
    verified: "Home: «sviluppiamo piani di fitodepurazione, recupero e uso delle acque meteoriche», «Recupero acque meteoriche».",
  },
  {
    slug: "stufe-in-terra-cruda-e-termocamini",
    title: "Stufe in terra cruda e termocamini",
    shortTitle: "Stufe e termocamini",
    icon: "leaf",
    eco: true,
    summary: "Stufe a legna in terra cruda ad alto potere termico e sistemi termocamino.",
    metaTitle: "Stufe in terra cruda e termocamini a Brescia",
    metaDescription:
      "Costruzione di stufe a legna in terra cruda ad alto potere termico e sistemi termocamino a Brescia e provincia. Idraulica Piovani.",
    intro: [
      "Costruiamo stufe a legna in terra cruda ad alto potere termico, su misura per la casa.",
      "Realizziamo anche sistemi termocamino. Ogni progetto parte da un sopralluogo.",
    ],
    includes: {
      title: "Cosa facciamo",
      items: ["Stufe a legna in terra cruda", "Sistemi termocamino"],
    },
    quoteCategory: "stufe",
    bookable: true,
    faqs: [],
    related: ["riscaldamento-radiante", "acque-meteoriche-e-fitodepurazione"],
    verified: "Home: «costruiamo stufe a legna in terra cruda ad alto potere termico e sistemi termocamino».",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

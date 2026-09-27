import type { QuoteCategory } from "@/lib/quote/types";

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
};

export const services: Service[] = [
  {
    slug: "pronto-intervento-idraulico",
    title: "Pronto intervento idraulico",
    shortTitle: "Pronto intervento",
    icon: "alarm",
    urgent: true,
    summary:
      "Perdite, tubi rotti, scarichi bloccati, caldaia ferma: chiamaci e ti diciamo subito cosa fare.",
    metaTitle: "Pronto intervento idraulico a Brescia",
    metaDescription:
      "Perdite d'acqua, tubi rotti, scarichi intasati o caldaia in blocco a Brescia e provincia: chiama Idraulica Piovani, ti guidiamo al telefono e organizziamo l'intervento.",
    intro: [
      "Quando c'è acqua dove non dovrebbe esserci, conta la velocità. Al telefono ti guidiamo nei primi gesti e organizziamo l'intervento il prima possibile, dando precedenza alle situazioni che possono causare danni.",
      "Le urgenze non si prenotano online: chiamaci o scrivici su WhatsApp, dal lunedì al venerdì negli orari di apertura.",
    ],
    includes: {
      title: "Interveniamo su",
      items: [
        "Perdite e infiltrazioni d'acqua",
        "Tubazioni rotte, forate o gelate",
        "Scarichi e colonne intasate",
        "Caldaia in blocco o senza acqua calda",
        "Rubinetti, cassette e sanitari che perdono",
        "Ricerca del guasto dopo un allagamento",
      ],
    },
    highlight: {
      title: "Cosa fare subito",
      tone: "urgent",
      items: [
        "Chiudi il rubinetto generale dell'acqua (di solito vicino al contatore).",
        "Se l'acqua raggiunge prese o quadri elettrici, stacca l'interruttore generale.",
        "Se senti odore di gas: niente fiamme né interruttori, apri le finestre, chiudi il contatore del gas e chiama il pronto intervento gas del tuo distributore (numero in bolletta) o il 112.",
        "Fotografa il danno: ti servirà per l'assicurazione.",
      ],
    },
    quoteCategory: null,
    bookable: false,
    faqs: [
      {
        q: "Posso prenotare online un intervento urgente?",
        a: "No: per le urgenze serve parlarsi subito. Chiamaci o scrivici su WhatsApp e ti diciamo quando possiamo arrivare.",
      },
      {
        q: "Quanto costa un'uscita urgente?",
        a: "Dipende da orario, distanza e tipo di guasto. Te lo diciamo al telefono prima di partire, così sai in anticipo come funziona.",
      },
    ],
    related: ["riparazioni-idrauliche", "caldaie-a-condensazione"],
  },
  {
    slug: "riparazioni-idrauliche",
    title: "Riparazioni idrauliche",
    shortTitle: "Riparazioni",
    icon: "tools",
    summary:
      "Perdite, rubinetti, scarichi e boiler a gas: troviamo il guasto e lo ripariamo a regola d'arte.",
    metaTitle: "Riparazione impianti idraulici a Brescia",
    metaDescription:
      "Riparazione di perdite, tubazioni, rubinetteria, scarichi e boiler a gas a Brescia e provincia. Idraulica Piovani, dal 1930.",
    intro: [
      "Una piccola perdita trascurata diventa presto un danno grande. Individuiamo l'origine del problema prima di intervenire, così ripariamo una volta sola e nel punto giusto.",
      "Per i guasti che non sono urgenti puoi prenotare direttamente una visita dal calendario online.",
    ],
    includes: {
      title: "Cosa ripariamo",
      items: [
        "Ricerca e riparazione di perdite, anche sotto traccia",
        "Sostituzione di tratti di tubazione",
        "Rubinetteria, miscelatori e cassette di scarico",
        "Scarichi lenti o intasati",
        "Boiler e scaldabagni a gas",
        "Riduttori di pressione e autoclavi",
      ],
    },
    quoteCategory: "riparazione",
    bookable: true,
    faqs: [
      {
        q: "Riparate anche impianti installati da altri?",
        a: "Sì. Prima di intervenire verifichiamo lo stato dell'impianto e ti spieghiamo cosa conviene riparare e cosa sostituire.",
      },
    ],
    related: ["pronto-intervento-idraulico", "ristrutturazione-bagni"],
  },
  {
    slug: "caldaie-a-condensazione",
    title: "Caldaie a condensazione",
    shortTitle: "Caldaie",
    icon: "fire",
    summary:
      "Scelta, installazione, sostituzione e manutenzione della caldaia, con libretto e documenti in regola.",
    metaTitle: "Sostituzione e manutenzione caldaie a Brescia",
    metaDescription:
      "Installazione e sostituzione di caldaie a condensazione e manutenzione periodica a Brescia e provincia. Sopralluogo, pratiche e libretto di impianto.",
    intro: [
      "Una caldaia a condensazione recupera il calore contenuto nei fumi, che una caldaia tradizionale disperde dal camino: a parità di comfort consuma meno gas.",
      "Ti aiutiamo a scegliere il modello adatto alla tua casa, la installiamo e la seguiamo nel tempo con la manutenzione periodica.",
    ],
    includes: {
      title: "Il servizio comprende",
      items: [
        "Sopralluogo e dimensionamento",
        "Rimozione e smaltimento della vecchia caldaia",
        "Adeguamento dello scarico fumi, se necessario",
        "Installazione, collaudo e messa in funzione",
        "Dichiarazione di conformità dell'impianto",
        "Manutenzione ordinaria e controllo di efficienza energetica",
      ],
    },
    highlight: {
      title: "Perché conviene",
      tone: "neutral",
      items: [
        "Consumi più bassi rispetto a una caldaia tradizionale",
        "Rende al meglio con impianti a bassa temperatura (radianti, SANATHERM)",
        "Si abbina al solare termico per l'acqua calda",
      ],
    },
    quoteCategory: "caldaia",
    bookable: true,
    faqs: [
      {
        q: "Ogni quanto va fatta la manutenzione?",
        a: "La frequenza dipende dal tipo di impianto e dalle indicazioni del costruttore riportate sul libretto. Alla prima visita ti diciamo le scadenze del tuo impianto.",
      },
      {
        q: "La sostituzione della caldaia rientra nelle detrazioni?",
        a: "Spesso sì, ma le regole cambiano di anno in anno. Nel preventivo ti indichiamo la documentazione necessaria; per la parte fiscale fai riferimento al tuo commercialista o CAF.",
      },
    ],
    related: ["riscaldamento-radiante", "solare-termico-e-rinnovabili"],
  },
  {
    slug: "riscaldamento-radiante",
    title: "Riscaldamento radiante",
    shortTitle: "Radiante",
    icon: "radiant",
    eco: true,
    summary:
      "A pavimento, a parete o a battiscopa: calore uniforme a bassa temperatura, che consuma meno.",
    metaTitle: "Riscaldamento a pavimento, parete e battiscopa a Brescia",
    metaDescription:
      "Impianti di riscaldamento radiante a pavimento, a parete e a battiscopa SANATHERM a Brescia. Calore uniforme a bassa temperatura, progettato e installato da Idraulica Piovani.",
    intro: [
      "I sistemi radianti scaldano le superfici invece dell'aria: il calore è distribuito in modo uniforme, senza correnti né polvere sollevata.",
      "Lavorano con acqua a bassa temperatura, e per questo si abbinano bene a caldaie a condensazione, pompe di calore e solare termico.",
    ],
    includes: {
      title: "Tre soluzioni, una per ogni casa",
      items: [
        "A pavimento: per nuove costruzioni e ristrutturazioni complete",
        "A parete: quando il pavimento non si può toccare",
        "A battiscopa SANATHERM: prodotto da noi, si installa lungo il perimetro delle stanze senza demolire i pavimenti",
      ],
    },
    quoteCategory: "radiante",
    bookable: true,
    faqs: [
      {
        q: "Posso installare il radiante senza rifare i pavimenti?",
        a: "Sì, con il battiscopa radiante SANATHERM o con i pannelli a parete. Valutiamo insieme la soluzione durante il sopralluogo.",
      },
    ],
    related: ["caldaie-a-condensazione", "solare-termico-e-rinnovabili"],
  },
  {
    slug: "ristrutturazione-bagni",
    title: "Ristrutturazione bagni",
    shortTitle: "Bagni",
    icon: "shower",
    summary:
      "Dal rifacimento degli impianti alla posa dei sanitari: un unico referente per la parte idraulica del bagno.",
    metaTitle: "Ristrutturazione bagno a Brescia",
    metaDescription:
      "Rifacimento impianto idraulico, sostituzione vasca con doccia, sanitari e rubinetteria a Brescia e provincia. Preventivo online indicativo in 2 minuti.",
    intro: [
      "Rifare il bagno significa rifare prima di tutto ciò che non si vede: tubazioni e scarichi. Li progettiamo per durare, poi montiamo sanitari e rubinetteria.",
      "Con il preventivo online ottieni subito una stima indicativa della parte idraulica.",
    ],
    includes: {
      title: "Cosa facciamo",
      items: [
        "Rifacimento di impianto idraulico e scarichi",
        "Sostituzione della vasca con doccia",
        "Sanitari sospesi o a terra",
        "Rubinetteria, miscelatori termostatici e termoarredo",
      ],
    },
    quoteCategory: "bagno",
    bookable: true,
    faqs: [
      {
        q: "La stima comprende anche piastrelle e opere murarie?",
        a: "No: la stima online riguarda la parte idraulica (impianti, scarichi, sanitari, rubinetteria). Le altre lavorazioni si definiscono al sopralluogo.",
      },
    ],
    related: ["riparazioni-idrauliche", "caldaie-a-condensazione"],
  },
  {
    slug: "solare-termico-e-rinnovabili",
    title: "Solare termico e rinnovabili",
    shortTitle: "Solare",
    icon: "sun",
    eco: true,
    summary:
      "Progettiamo e installiamo impianti solari per l'acqua calda e l'integrazione al riscaldamento.",
    metaTitle: "Impianti solari termici a Brescia",
    metaDescription:
      "Progettazione e installazione di impianti solari termici per acqua calda sanitaria e integrazione al riscaldamento a Brescia. Idraulica Piovani.",
    intro: [
      "Il sole può produrre gran parte dell'acqua calda di casa. Progettiamo l'impianto in base a quante persone lo usano e a dove si trova l'abitazione.",
      "Abbinato a un impianto radiante a bassa temperatura, il solare termico può contribuire anche al riscaldamento.",
    ],
    includes: {
      title: "Il servizio comprende",
      items: [
        "Progetto e dimensionamento dell'impianto",
        "Collettori solari e bollitori di accumulo",
        "Integrazione con caldaia e impianti radianti",
        "Manutenzione e controllo del circuito solare",
      ],
    },
    quoteCategory: "solare",
    bookable: true,
    faqs: [
      {
        q: "Il solare termico funziona anche d'inverno?",
        a: "Sì, con rendimento minore. Per questo si abbina sempre a una caldaia o a un'altra fonte che interviene quando il sole non basta.",
      },
    ],
    related: ["riscaldamento-radiante", "caldaie-a-condensazione"],
  },
  {
    slug: "acque-meteoriche-e-fitodepurazione",
    title: "Acque meteoriche e fitodepurazione",
    shortTitle: "Acqua piovana",
    icon: "drop",
    eco: true,
    summary:
      "Recupero dell'acqua piovana per irrigazione e WC, e sistemi di depurazione naturale degli scarichi.",
    metaTitle: "Recupero acqua piovana e fitodepurazione a Brescia",
    metaDescription:
      "Progettazione di impianti di recupero delle acque meteoriche e piani di fitodepurazione per abitazioni a Brescia e provincia.",
    intro: [
      "L'acqua piovana raccolta dal tetto può alimentare l'irrigazione e gli scarichi dei WC, riducendo il consumo di acqua potabile.",
      "La fitodepurazione tratta gli scarichi domestici con un sistema naturale di piante e substrati filtranti. Ogni progetto parte da un sopralluogo.",
    ],
    includes: {
      title: "Cosa progettiamo",
      items: [
        "Sistemi di raccolta e accumulo dell'acqua piovana",
        "Filtri, pompe e reti duali per WC e irrigazione",
        "Piani di fitodepurazione per scarichi domestici",
      ],
    },
    quoteCategory: "acque",
    bookable: true,
    faqs: [
      {
        q: "Serve un'autorizzazione per la fitodepurazione?",
        a: "Gli scarichi sono soggetti alle regole del Comune e degli enti competenti. Durante il progetto verifichiamo cosa serve nel tuo caso.",
      },
    ],
    related: ["solare-termico-e-rinnovabili", "stufe-in-terra-cruda-e-termocamini"],
  },
  {
    slug: "stufe-in-terra-cruda-e-termocamini",
    title: "Stufe in terra cruda e termocamini",
    shortTitle: "Stufe e termocamini",
    icon: "leaf",
    eco: true,
    summary:
      "Stufe a legna in terra cruda ad alto potere termico e termocamini collegati all'impianto di casa.",
    metaTitle: "Stufe in terra cruda e termocamini a Brescia",
    metaDescription:
      "Costruzione di stufe a legna in terra cruda ad accumulo e installazione di sistemi termocamino collegati all'impianto di riscaldamento. Idraulica Piovani, Brescia.",
    intro: [
      "Una stufa in terra cruda accumula il calore della legna e lo rilascia lentamente per ore. La costruiamo su misura per la tua casa.",
      "Il termocamino riscalda l'acqua dell'impianto mentre il fuoco è acceso, contribuendo al riscaldamento di tutta la casa.",
    ],
    includes: {
      title: "Cosa facciamo",
      items: [
        "Progetto e costruzione di stufe in terra cruda",
        "Installazione di termocamini e collegamento all'impianto",
        "Integrazione con caldaia e accumuli",
      ],
    },
    quoteCategory: "stufe",
    bookable: true,
    faqs: [
      {
        q: "Quanto tempo serve per costruire una stufa in terra cruda?",
        a: "Dipende da dimensioni e finiture. Lo definiamo nel progetto, dopo il sopralluogo.",
      },
    ],
    related: ["riscaldamento-radiante", "acque-meteoriche-e-fitodepurazione"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

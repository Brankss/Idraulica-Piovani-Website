import { company } from "./company";

export type Faq = { q: string; a: string };

export const generalFaqs: Faq[] = [
  {
    q: "Il preventivo online è vincolante?",
    a: "No. È una stima indicativa, calcolata sulle informazioni che inserisci. Il prezzo definitivo lo fissiamo nel preventivo scritto, dopo il sopralluogo.",
  },
  {
    q: "Fate sopralluoghi?",
    a: "Sì. Puoi prenotare il sopralluogo online oppure chiamarci. Per installazioni e ristrutturazioni è il modo per preparare un preventivo preciso.",
  },
  {
    q: "In quali zone lavorate?",
    a: `${company.areaServed}.`,
  },
  {
    q: "Cosa faccio se ho una perdita d'acqua?",
    a: "Chiudi il rubinetto generale e chiamaci o scrivici su WhatsApp. Le urgenze non si prenotano online: parlarci subito è il modo più rapido.",
  },
  {
    q: "Quali metodi di pagamento accettate?",
    a: `${company.paymentMethods.join(", ")}.`,
  },
  {
    q: "Posso usare le detrazioni fiscali?",
    a: "Molti interventi, come la sostituzione della caldaia, gli impianti a fonti rinnovabili e le ristrutturazioni, possono rientrare nelle agevolazioni in vigore. Le regole cambiano spesso: chiedicelo in fase di preventivo e, per la parte fiscale, fai riferimento al tuo commercialista o CAF.",
  },
  {
    q: "Cos'è SANATHERM?",
    a: "È il battiscopa radiante che produciamo noi: due tubi di rame con alette in alluminio che corrono lungo il perimetro delle stanze e scaldano con acqua a bassa temperatura.",
  },
];

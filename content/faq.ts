import { company } from "./company";

export type Faq = { q: string; a: string };

export const generalFaqs: Faq[] = [
  {
    q: "Il preventivo online è vincolante?",
    a: "No. È una stima indicativa, calcolata sulle informazioni che inserisci. Il prezzo definitivo lo fissiamo nel preventivo scritto, dopo il sopralluogo.",
  },
  {
    q: "Fate il sopralluogo prima del preventivo?",
    a: "Sì: per installazioni e ristrutturazioni il preventivo definitivo si fa sempre dopo aver visto l'impianto. Puoi prenotare il sopralluogo online o chiamarci.",
  },
  {
    q: "In quali zone lavorate?",
    a: `${company.areaServed}. Inserisci il tuo comune nel preventivo o nella prenotazione: ti diciamo subito se rientri nella zona che copriamo.`,
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
    a: "Molti interventi (sostituzione della caldaia, impianti a fonti rinnovabili, ristrutturazioni) possono rientrare nelle agevolazioni in vigore. Le regole cambiano spesso: nel preventivo ti indichiamo la documentazione necessaria; per la parte fiscale fai riferimento al tuo commercialista o CAF.",
  },
  {
    q: "Cos'è SANATHERM?",
    a: "È il battiscopa radiante che produciamo noi: due tubi di rame con alette in alluminio che corrono lungo il perimetro delle stanze e scaldano con acqua a bassa temperatura.",
  },
];

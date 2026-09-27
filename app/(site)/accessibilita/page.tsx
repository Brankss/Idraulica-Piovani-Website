import type { Metadata } from "next";
import { company, primaryPhone } from "@/content/company";
import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Dichiarazione di accessibilità",
  description: "Il nostro impegno per un sito utilizzabile da tutti: standard di riferimento, misure adottate, limiti noti e come segnalarci un problema.",
  path: "/accessibilita",
});

export default function AccessibilitaPage() {
  return (
    <LegalPage
      title="Dichiarazione di accessibilità"
      path="/accessibilita"
      lead="Vogliamo che chiunque possa chiederci un preventivo o prenotare un intervento, qualunque dispositivo o tecnologia assistiva usi."
    >
      <h2 id="standard">Standard di riferimento</h2>
      <p>
        Il sito è progettato per rispettare le linee guida WCAG 2.2 di livello AA. Questa dichiarazione è pubblicata volontariamente e viene
        aggiornata a ogni revisione importante del sito.
      </p>

      <h2 id="misure">Cosa abbiamo fatto</h2>
      <ul>
        <li>Contrasti di colore verificati per testi, pulsanti e campi dei moduli.</li>
        <li>Navigazione completa da tastiera, con focus sempre visibile e collegamento «Vai al contenuto».</li>
        <li>Struttura dei titoli ordinata, etichette su tutti i campi e messaggi di errore vicino al campo interessato.</li>
        <li>Pulsanti e collegamenti di almeno 44 pixel, pensati per l&apos;uso con un dito.</li>
        <li>Animazioni ridotte o disattivate se hai attivato «riduci movimento» sul tuo dispositivo.</li>
        <li>Testo ingrandibile fino al 200% senza perdita di contenuti.</li>
      </ul>

      <h2 id="limiti">Limiti noti</h2>
      <ul>
        <li>Alcune fotografie d&apos;archivio hanno una risoluzione bassa; il loro contenuto è descritto nel testo alternativo.</li>
        <li>La mappa di Google è un servizio esterno che non controlliamo: l&apos;indirizzo è sempre riportato anche come testo.</li>
      </ul>

      <h2 id="segnalazioni">Segnalaci un problema</h2>
      <p>
        Se incontri una difficoltà nell&apos;uso del sito, scrivi a <a href={`mailto:${company.email}`}>{company.email}</a> o chiama il{" "}
        {primaryPhone.display}: ti aiutiamo subito e correggiamo il problema.
      </p>
    </LegalPage>
  );
}

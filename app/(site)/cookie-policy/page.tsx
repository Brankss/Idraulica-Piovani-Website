import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/content/company";
import { ConsentPreferencesButton } from "@/components/site/consent-preferences-button";
import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Cookie policy",
  description: "Quali cookie e strumenti di memorizzazione usa il sito di Idraulica Piovani e come gestire le tue preferenze.",
  path: "/cookie-policy",
});

const toc = [
  { id: "cosa", label: "Cosa sono" },
  { id: "tecnici", label: "Strumenti tecnici" },
  { id: "terze-parti", label: "Contenuti di terze parti" },
  { id: "statistiche", label: "Statistiche e profilazione" },
  { id: "gestione", label: "Gestire le preferenze" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie policy"
      path="/cookie-policy"
      lead="Il sito usa solo strumenti tecnici indispensabili. I contenuti di terze parti, come la mappa di Google, si caricano soltanto con il tuo consenso."
      toc={toc}
    >
      <h2 id="cosa">1. Cosa sono cookie e strumenti simili</h2>
      <p>
        I cookie sono piccoli file che un sito salva nel browser. Strumenti simili, come la memoria locale del browser (localStorage e
        sessionStorage), svolgono funzioni analoghe. Questa pagina li descrive tutti, secondo le Linee guida del Garante per la protezione dei
        dati personali del 10 giugno 2021.
      </p>

      <h2 id="tecnici">2. Strumenti tecnici (sempre attivi)</h2>
      <p>Servono al funzionamento del sito e non richiedono il consenso.</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Tipo</th>
            <th scope="col">Finalità</th>
            <th scope="col">Durata</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>piovani-consent</td>
            <td>localStorage</td>
            <td>Ricordare la tua scelta sui contenuti esterni</td>
            <td>6 mesi, poi te la richiediamo</td>
          </tr>
          <tr>
            <td>piovani-quote</td>
            <td>sessionStorage</td>
            <td>Non perdere le risposte del preventivo se ricarichi la pagina</td>
            <td>Fino alla chiusura della scheda</td>
          </tr>
        </tbody>
      </table>

      <h2 id="terze-parti">3. Contenuti di terze parti (solo con consenso)</h2>
      <p>
        La mappa nelle pagine Contatti e Zone servite è fornita da Google Ireland Limited. Quando la carichi, Google può impostare cookie propri
        e ricevere dati tecnici come il tuo indirizzo IP. Fino a quando non dai il consenso vedi solo un&apos;immagine segnaposto e un
        collegamento a Google Maps. Maggiori informazioni:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          informativa privacy di Google
        </a>
        .
      </p>

      <h2 id="statistiche">4. Statistiche e profilazione</h2>
      <p>
        Il sito non usa cookie di profilazione né strumenti pubblicitari. Se in futuro adotteremo strumenti di statistica, sceglieremo soluzioni
        che non usano cookie e aggiorneremo questa pagina.
      </p>

      <h2 id="gestione">5. Come gestire le preferenze</h2>
      <p>
        Puoi cambiare la tua scelta in qualsiasi momento dal collegamento «Preferenze cookie» in fondo a ogni pagina, oppure da qui:
      </p>
      <p>
        <ConsentPreferencesButton />
      </p>
      <p>
        Puoi anche cancellare i dati del sito dalle impostazioni del browser. Per il trattamento dei dati personali leggi l&apos;
        <Link href="/privacy">informativa privacy</Link>. Titolare: {company.legalName}, <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { company, formatAddress, primaryAddress, primaryPhone } from "@/content/company";
import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Termini e condizioni",
  description: "Condizioni d'uso del sito, del preventivo online e delle prenotazioni di Idraulica Piovani; informazioni per i consumatori.",
  path: "/termini",
});

const toc = [
  { id: "oggetto", label: "Oggetto" },
  { id: "preventivo", label: "Preventivo online" },
  { id: "prenotazioni", label: "Prenotazioni" },
  { id: "consumatori", label: "Consumatori e recesso" },
  { id: "responsabilita", label: "Responsabilità" },
  { id: "proprieta", label: "Contenuti del sito" },
  { id: "legge", label: "Legge e foro" },
];

export default function TerminiPage() {
  return (
    <LegalPage
      title="Termini e condizioni"
      path="/termini"
      lead="Le regole per usare il sito e i suoi servizi online: preventivo, prenotazione e richiesta di contatto."
      toc={toc}
    >
      <h2 id="oggetto">1. Chi siamo e oggetto</h2>
      <p>
        Il sito è gestito da {company.legalName}, {formatAddress(primaryAddress)}, P.IVA {company.vatNumber} («noi»). Questi termini regolano
        l&apos;uso del sito e dei servizi online. I lavori veri e propri sono regolati dal preventivo scritto che accetti.
      </p>

      <h2 id="preventivo">2. Preventivo online</h2>
      <ul>
        <li>
          La stima calcolata online è <strong>indicativa e non vincolante</strong>: si basa solo sulle informazioni che inserisci e non
          costituisce un&apos;offerta al pubblico né una proposta contrattuale.
        </li>
        <li>Gli importi sono indicati IVA esclusa, salvo diversa indicazione.</li>
        <li>
          Il prezzo definitivo è quello del preventivo scritto che ti consegniamo dopo il sopralluogo; il contratto si conclude solo con la tua
          accettazione di quel preventivo.
        </li>
      </ul>

      <h2 id="prenotazioni">3. Prenotazioni</h2>
      <ul>
        <li>
          La prenotazione online riguarda sopralluoghi, manutenzioni e riparazioni non urgenti. Per le urgenze chiama il {primaryPhone.display}.
        </li>
        <li>
          Se l&apos;appuntamento è indicato come «da confermare», l&apos;orario è riservato ma diventa definitivo solo con la nostra conferma.
        </li>
        <li>
          Se non puoi essere presente, avvisaci appena possibile per telefono o email così da liberare l&apos;orario per altri clienti.
        </li>
        <li>
          Eventuali costi del sopralluogo o dell&apos;uscita ti vengono comunicati prima della conferma dell&apos;appuntamento.
        </li>
        <li>
          Possiamo dover spostare un appuntamento per cause di forza maggiore o urgenze di altri clienti: in quel caso ti contattiamo per
          proporti un nuovo orario.
        </li>
      </ul>

      <h2 id="consumatori">4. Se sei un consumatore: diritto di recesso</h2>
      <p>
        Per i contratti conclusi a distanza o fuori dai locali commerciali hai diritto di recedere entro 14 giorni, senza indicarne il motivo
        (articoli 52 e seguenti del Codice del Consumo, D.Lgs. 206/2005). Per esercitarlo basta una comunicazione esplicita, anche via email a{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
      <p>Il diritto di recesso non si applica, tra l&apos;altro:</p>
      <ul>
        <li>ai lavori urgenti di riparazione o manutenzione che hai chiesto espressamente (art. 59, lett. h);</li>
        <li>ai servizi già completamente eseguiti, se l&apos;esecuzione è iniziata con il tuo accordo espresso (art. 59, lett. a).</li>
      </ul>
      <p>
        Se chiedi che il lavoro inizi durante il periodo di recesso e poi receda, sei tenuto a pagare la parte di servizio già prestata (art. 57).
        Sui beni forniti con i lavori si applica la garanzia legale di conformità prevista dal Codice del Consumo.
      </p>

      <h2 id="responsabilita">5. Responsabilità</h2>
      <p>
        Le informazioni del sito sono di carattere generale e non sostituiscono la valutazione di un tecnico sul posto. Facciamo il possibile
        perché il sito sia disponibile e corretto, ma non possiamo garantirne il funzionamento continuo.
      </p>

      <h2 id="proprieta">6. Contenuti del sito</h2>
      <p>
        Testi, grafica, logo e disegni tecnici appartengono a {company.brand} o ai rispettivi titolari e non possono essere riprodotti senza
        autorizzazione. Alcune immagini sono illustrative: lo trovi indicato sull&apos;immagine stessa. Dettagli nelle{" "}
        <Link href="/note-legali">note legali</Link>.
      </p>

      <h2 id="legge">7. Legge applicabile e foro competente</h2>
      <p>
        Si applica la legge italiana. Se sei un consumatore, per le controversie è competente il giudice del luogo in cui risiedi o sei
        domiciliato. Puoi anche ricorrere agli organismi di risoluzione alternativa delle controversie previsti dal Codice del Consumo.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { company, formatAddress, primaryAddress } from "@/content/company";
import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Informativa privacy",
  description: "Come Idraulica Piovani tratta i dati personali raccolti tramite il sito, i moduli di contatto, il preventivo online e le prenotazioni.",
  path: "/privacy",
});

const toc = [
  { id: "titolare", label: "Titolare" },
  { id: "dati", label: "Dati trattati" },
  { id: "finalita", label: "Finalità e basi giuridiche" },
  { id: "conferimento", label: "Conferimento" },
  { id: "destinatari", label: "Destinatari" },
  { id: "trasferimenti", label: "Trasferimenti" },
  { id: "conservazione", label: "Conservazione" },
  { id: "diritti", label: "I tuoi diritti" },
  { id: "modifiche", label: "Modifiche" },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Informativa privacy"
      path="/privacy"
      lead="Ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR): chi tratta i tuoi dati, perché, per quanto tempo e come puoi esercitare i tuoi diritti."
      toc={toc}
    >
      <h2 id="titolare">1. Titolare del trattamento</h2>
      <p>
        <strong>{company.legalName}</strong>, {formatAddress(primaryAddress)}, P.IVA {company.vatNumber}. Per qualsiasi domanda sui tuoi dati
        scrivi a <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2 id="dati">2. Quali dati trattiamo</h2>
      <ul>
        <li>
          <strong>Dati di contatto</strong>: nome e cognome, email, telefono.
        </li>
        <li>
          <strong>Dati sulla richiesta</strong>: comune e indirizzo dell&apos;immobile, risposte al preventivo online, data e ora
          dell&apos;appuntamento, note e fotografie che scegli di inviarci.
        </li>
        <li>
          <strong>Dati tecnici di navigazione</strong>: indirizzo IP, tipo di browser e pagine richieste, registrati dai sistemi che ospitano il
          sito per il suo funzionamento e la sua sicurezza.
        </li>
      </ul>
      <p>
        Ti chiediamo di non inviare nelle fotografie volti di persone o documenti personali. Prima di archiviare le foto rimuoviamo i dati di
        posizione contenuti nei file.
      </p>

      <h2 id="finalita">3. Perché li trattiamo e su quale base</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Finalità</th>
            <th scope="col">Base giuridica</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rispondere a richieste di contatto, preventivo e prenotazione</td>
            <td>Misure precontrattuali su tua richiesta (art. 6.1.b GDPR)</td>
          </tr>
          <tr>
            <td>Eseguire i lavori, gestire il rapporto e la fatturazione</td>
            <td>Esecuzione del contratto (art. 6.1.b) e obblighi di legge, anche fiscali (art. 6.1.c)</td>
          </tr>
          <tr>
            <td>Inviarti promemoria di manutenzione e nostre comunicazioni</td>
            <td>Il tuo consenso, facoltativo e revocabile in ogni momento (art. 6.1.a)</td>
          </tr>
          <tr>
            <td>Proteggere il sito da abusi e invii automatici</td>
            <td>Nostro legittimo interesse alla sicurezza (art. 6.1.f)</td>
          </tr>
          <tr>
            <td>Far valere o difendere un diritto</td>
            <td>Nostro legittimo interesse (art. 6.1.f)</td>
          </tr>
        </tbody>
      </table>

      <h2 id="conferimento">4. Sei obbligato a fornirli?</h2>
      <p>
        I dati di contatto sono necessari per rispondere alla tua richiesta: senza non possiamo ricontattarti. Il consenso alle comunicazioni è
        facoltativo e non influisce sul servizio.
      </p>

      <h2 id="destinatari">5. A chi li comunichiamo</h2>
      <p>I dati sono trattati da noi e, solo per quanto necessario, da:</p>
      <ul>
        <li>fornitori che gestiscono per nostro conto hosting del sito, database, invio delle email e calendario degli appuntamenti, nominati responsabili del trattamento;</li>
        <li>consulenti fiscali e amministrativi, per gli adempimenti di legge;</li>
        <li>autorità pubbliche, quando la legge lo richiede.</li>
      </ul>
      <p>Non vendiamo i tuoi dati e non li usiamo per profilazione o pubblicità.</p>

      <h2 id="trasferimenti">6. Trasferimenti fuori dall&apos;Unione Europea</h2>
      <p>
        Scegliamo fornitori con server nell&apos;Unione Europea. Se un fornitore dovesse trattare dati fuori dall&apos;UE, il trasferimento avviene
        solo con le garanzie previste dal GDPR, come una decisione di adeguatezza o le clausole contrattuali standard.
      </p>

      <h2 id="conservazione">7. Per quanto tempo li conserviamo</h2>
      <ul>
        <li>Richieste non seguite da un incarico: fino a 24 mesi dall&apos;ultimo contatto.</li>
        <li>Dati relativi a lavori eseguiti e fatture: 10 anni, come previsto dalla normativa civilistica e fiscale.</li>
        <li>Comunicazioni e promemoria: fino alla revoca del consenso.</li>
        <li>Dati tecnici di navigazione: per il tempo strettamente necessario alla sicurezza del sito.</li>
      </ul>

      <h2 id="diritti">8. I tuoi diritti</h2>
      <p>
        Puoi chiederci in ogni momento l&apos;accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del trattamento, la portabilità
        e opporti ai trattamenti basati sul legittimo interesse (articoli 15–22 GDPR). Puoi revocare il consenso alle comunicazioni senza
        conseguenze sui trattamenti già svolti. Scrivici a <a href={`mailto:${company.email}`}>{company.email}</a>: ti rispondiamo entro un mese.
      </p>
      <p>
        Hai anche il diritto di proporre reclamo al Garante per la protezione dei dati personali (
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
          garanteprivacy.it
        </a>
        ).
      </p>
      <p>
        Il sito non è rivolto a minori di 14 anni. Per cookie e strumenti simili leggi la <Link href="/cookie-policy">cookie policy</Link>.
      </p>

      <h2 id="modifiche">9. Modifiche</h2>
      <p>Possiamo aggiornare questa informativa: la versione e la data in cima alla pagina indicano l&apos;ultima modifica.</p>
    </LegalPage>
  );
}

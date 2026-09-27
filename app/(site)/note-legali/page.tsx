import type { Metadata } from "next";
import Link from "next/link";
import { company, formatAddress } from "@/content/company";
import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Note legali",
  description: "Dati societari di Idraulica Piovani, informazioni sui contenuti, sulle immagini e crediti del sito.",
  path: "/note-legali",
});

export default function NoteLegaliPage() {
  return (
    <LegalPage title="Note legali" path="/note-legali" lead="Chi gestisce il sito, i dati dell'impresa e le informazioni su contenuti e immagini.">
      <h2 id="impresa">Dati dell&apos;impresa</h2>
      <table>
        <tbody>
          <tr>
            <th scope="row">Denominazione</th>
            <td>{company.legalName}</td>
          </tr>
          {company.addresses.map((a) => (
            <tr key={a.street}>
              <th scope="row">{a.label}</th>
              <td>{formatAddress(a)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Partita IVA</th>
            <td>{company.vatNumber}</td>
          </tr>
          {company.rea && (
            <tr>
              <th scope="row">REA</th>
              <td>{company.rea}</td>
            </tr>
          )}
          {company.pec && (
            <tr>
              <th scope="row">PEC</th>
              <td>{company.pec}</td>
            </tr>
          )}
          <tr>
            <th scope="row">Email</th>
            <td>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">Telefono</th>
            <td>{company.phones.map((p) => p.display).join(" · ")}</td>
          </tr>
        </tbody>
      </table>

      <h2 id="immagini">Immagini</h2>
      <ul>
        <li>
          Le immagini contrassegnate come <strong>«Immagine illustrativa»</strong> sono state realizzate con strumenti di intelligenza artificiale
          e servono a illustrare un tipo di lavoro: non rappresentano impianti realizzati da noi.
        </li>
        <li>
          Le immagini contrassegnate come <strong>«Foto d&apos;archivio»</strong> documentano lavori realizzati da {company.brand}.
        </li>
        <li>I disegni tecnici, come la sezione del battiscopa SANATHERM, sono schemi a scopo esplicativo.</li>
      </ul>

      <h2 id="crediti">Crediti</h2>
      <ul>
        <li>Caratteri tipografici Archivo e IBM Plex, con licenza SIL Open Font License.</li>
        <li>Icone Remix Icon, con licenza Apache 2.0.</li>
        <li>Componenti di interfaccia BoardUI.</li>
      </ul>

      <h2 id="altro">Altre informazioni</h2>
      <p>
        Per i dati personali leggi l&apos;<Link href="/privacy">informativa privacy</Link> e la <Link href="/cookie-policy">cookie policy</Link>;
        per l&apos;uso dei servizi online i <Link href="/termini">termini e condizioni</Link>.
      </p>
    </LegalPage>
  );
}

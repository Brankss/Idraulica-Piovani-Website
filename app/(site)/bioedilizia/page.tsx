import type { Metadata } from "next";
import { bioArchive } from "@/content/images";
import { services } from "@/content/services";
import { Crumbs } from "@/components/site/crumbs";
import { CtaBand } from "@/components/site/cta-band";
import { Figure } from "@/components/site/figure";
import { ServiceList } from "@/components/site/service-list";
import { Container, PageHeader, Section, SectionHeading } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Bioedilizia e risparmio energetico a Brescia",
  description:
    "Impianti per la bioedilizia a Brescia: riscaldamento radiante a bassa temperatura, impianti solari, recupero dell'acqua piovana, fitodepurazione e stufe in terra cruda.",
  path: "/bioedilizia",
});

const savings = [
  {
    term: "Subito",
    text: "Isolamento, impianti a bassa temperatura e fonti rinnovabili abbassano i consumi e quindi le bollette.",
  },
  {
    term: "In pochi anni",
    text: "Le agevolazioni fiscali in vigore e il risparmio in bolletta aiutano a ripagare l'investimento negli impianti.",
  },
  {
    term: "Nel tempo",
    text: "Una casa efficiente vale di più sul mercato e pesa molto meno sull'ambiente.",
  },
];

export default function BioediliziaPage() {
  const eco = services.filter((s) => s.eco);
  return (
    <>
      <PageHeader
        breadcrumb={<Crumbs items={[{ name: "Bioedilizia", path: "/bioedilizia" }]} />}
        eyebrow="Bioedilizia"
        title="Bio vuol dire vita"
        lead="Crediamo che le case vadano costruite intorno al benessere di chi le abita, senza compromettere quello di chi verrà dopo. I nostri impianti nascono da qui."
      />

      <Section tone="eco" labelledBy="principi-title">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="principi-title"
            eyebrow="Il principio"
            title="Soddisfare i bisogni di oggi senza togliere nulla a domani"
          />
          <div className="space-y-4 text-lead text-text-secondary">
            <p>
              Una casa deve rispettare requisiti tecnici e strutturali, ma prima di tutto deve far stare bene chi ci vive, tutelando
              l&apos;ambiente che la circonda.
            </p>
            <p>
              Per questo progettiamo impianti a bassa temperatura, usiamo il sole per l&apos;acqua calda, recuperiamo la pioggia e scaldiamo
              con la legna in modo efficiente.
            </p>
          </div>
        </Container>
      </Section>

      <Section labelledBy="risparmio-title">
        <Container>
          <SectionHeading
            id="risparmio-title"
            eyebrow="Risparmio energetico"
            title="Un vantaggio che cresce con gli anni"
            lead="Un'abitazione efficiente conviene nel breve, nel medio e nel lungo periodo."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {savings.map((s, i) => (
              <li key={s.term} className="rounded-card border border-border-card bg-background-primary-default p-6">
                <p className="font-mono text-small text-text-accent">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-display text-h3">{s.term}</p>
                <p className="mt-2 text-copy text-text-secondary">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="muted" id="archivio" labelledBy="casa-title">
        <Container>
          <SectionHeading
            id="casa-title"
            eyebrow="Dal nostro archivio"
            title="La casa bio in legno con serra solare"
            lead="Alcune fotografie dal nostro archivio: la casa bio in legno con serra solare esposta a sud, dalla fase di costruzione alla casa finita."
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5">
            {bioArchive.map((img) => (
              <li key={img.src}>
                <Figure image={img} aspect="3 / 2" sizes="(min-width: 768px) 30vw, 50vw" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="eco-servizi-title">
        <Container>
          <SectionHeading id="eco-servizi-title" eyebrow="Servizi" title="Cosa possiamo fare per casa tua" />
          <ServiceList services={eco} className="mt-8" />
        </Container>
      </Section>

      <CtaBand title="Progettiamo insieme una casa che consuma meno" />
    </>
  );
}

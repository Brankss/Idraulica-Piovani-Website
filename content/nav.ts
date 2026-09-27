export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Servizi", href: "/servizi" },
  { label: "SANATHERM", href: "/sanatherm" },
  { label: "Bioedilizia", href: "/bioedilizia" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Contatti", href: "/contatti" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Servizi",
    items: [
      { label: "Pronto intervento", href: "/servizi/pronto-intervento-idraulico" },
      { label: "Caldaie a condensazione", href: "/servizi/caldaie-a-condensazione" },
      { label: "Riscaldamento radiante", href: "/servizi/riscaldamento-radiante" },
      { label: "Ristrutturazione bagni", href: "/servizi/ristrutturazione-bagni" },
      { label: "Tutti i servizi", href: "/servizi" },
    ],
  },
  {
    title: "Azienda",
    items: [
      { label: "Chi siamo", href: "/chi-siamo" },
      { label: "SANATHERM", href: "/sanatherm" },
      { label: "Bioedilizia", href: "/bioedilizia" },
      { label: "Lavori", href: "/lavori" },
      { label: "Zone servite", href: "/zone-servite" },
      { label: "Domande frequenti", href: "/faq" },
    ],
  },
  {
    title: "Richieste",
    items: [
      { label: "Preventivo online", href: "/preventivo" },
      { label: "Prenota un sopralluogo", href: "/prenota" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie", href: "/cookie-policy" },
  { label: "Termini", href: "/termini" },
  { label: "Note legali", href: "/note-legali" },
  { label: "Accessibilità", href: "/accessibilita" },
];

/**
 * Image manifest. Dimensions are the real file sizes (no layout shift).
 * `ai: true` marks illustrative images generated with AI — they are always
 * captioned "Immagine illustrativa" and never presented as client work.
 * `archive: true` marks the client's own (older, low-resolution) photos.
 */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  ai?: boolean;
  archive?: boolean;
  caption?: string;
};

export const images = {
  rameCollettore: {
    src: "/images/rame-collettore.webp",
    width: 2000,
    height: 1493,
    alt: "Collettore di un impianto di riscaldamento con tubi in rame e valvole in ottone su una parete intonacata",
    ai: true,
  },
  bagno: {
    src: "/images/bagno-ristrutturato.webp",
    width: 2000,
    height: 1342,
    alt: "Bagno ristrutturato con doccia a filo pavimento, sanitari sospesi e scaldasalviette",
    ai: true,
  },
  caldaia: {
    src: "/images/caldaia-condensazione.webp",
    width: 2000,
    height: 1342,
    alt: "Caldaia a condensazione murale con tubazioni in rame isolate e valvole di intercettazione",
    ai: true,
  },
  bioSerra: {
    src: "/images/archivio/casa-bio-serra-solare.webp",
    width: 442,
    height: 299,
    alt: "Casa in legno con serra solare sul lato sud, in collina",
    archive: true,
    caption: "Vista lato sud, serra solare",
  },
  bioInterno: {
    src: "/images/archivio/casa-bio-interno-serra.webp",
    width: 446,
    height: 303,
    alt: "Interno della serra solare con ballatoio in legno",
    archive: true,
    caption: "Interno, serra solare",
  },
  bioVista: {
    src: "/images/archivio/casa-bio-vista-valle.webp",
    width: 445,
    height: 299,
    alt: "Vista sulla valle dalle vetrate della serra solare",
    archive: true,
    caption: "Vista dalla serra solare, lato sud",
  },
  bioInverno: {
    src: "/images/archivio/casa-bio-inverno.webp",
    width: 446,
    height: 299,
    alt: "La casa in legno sotto la neve, vista dal lato ovest",
    archive: true,
    caption: "Vista lato ovest",
  },
  bioCantiere1: {
    src: "/images/archivio/casa-bio-cantiere-1.webp",
    width: 600,
    height: 401,
    alt: "Cantiere della casa in legno: fondazioni e prima struttura",
    archive: true,
    caption: "Fase di costruzione",
  },
  bioCantiere2: {
    src: "/images/archivio/casa-bio-cantiere-2.webp",
    width: 600,
    height: 401,
    alt: "Cantiere della casa in legno: telaio portante in legno",
    archive: true,
    caption: "Fase di costruzione",
  },
} satisfies Record<string, SiteImage>;

export const bioArchive: SiteImage[] = [
  images.bioSerra,
  images.bioInverno,
  images.bioInterno,
  images.bioVista,
  images.bioCantiere1,
  images.bioCantiere2,
];

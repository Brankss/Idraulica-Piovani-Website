import type { Pricebook } from "@/lib/quote/types";

/**
 * PLACEHOLDER PRICE BOOK.
 *
 * Every figure below is a plausible range for the Brescia market written only
 * to exercise the quote engine and the UI. None of it comes from the client.
 * `placeholder: true` shows a notice in the UI and makes `npm run build:strict`
 * fail, so the site cannot launch with these numbers by mistake.
 *
 * Replace the values (not the shape) with the owner's price list. All amounts
 * are EUR, VAT excluded.
 */
export const pricebook: Pricebook = {
  version: "2026-09-placeholder",
  placeholder: true,
  currency: "EUR",
  vatIncluded: false,

  caldaia: {
    base: {
      combinata: [2200, 3200],
      "solo-riscaldamento": [1900, 2800],
    },
    fumi: { si: [300, 900], no: [0, 0], "non-so": [0, 900] },
    casaIndipendenteFactor: 1.1,
  },

  manutenzione: {
    ordinaria: [90, 140],
    "con-controllo-fumi": [130, 200],
  },

  bagno: {
    completa: { base: [3500, 5500], perMq: [150, 250], mqIncluded: 5 },
    "vasca-doccia": { base: [1800, 3500], perMq: [0, 0], mqIncluded: 0 },
    "solo-sanitari": { base: [900, 2200], perMq: [0, 0], mqIncluded: 0 },
    sospesiExtra: [250, 600],
  },

  radiante: {
    perMq: {
      pavimento: [45, 75],
      parete: [60, 95],
      battiscopa: [55, 90],
    },
    ristrutturazioneFactor: 1.15,
    minimum: 2500,
  },

  solare: {
    byHousehold: [
      { maxPersons: 3, range: [3200, 4500] },
      { maxPersons: 5, range: [4200, 5800] },
      { maxPersons: 99, range: [5200, 7500] },
    ],
  },

  riparazione: {
    uscita: [70, 120],
    tipo: {
      perdita: [150, 600],
      scarico: [100, 300],
      rubinetteria: [80, 250],
      boiler: [120, 400],
    },
  },

  travel: {
    brescia: [0, 0],
    "nord-est": [0, 0],
    "sud-est": [0, 0],
    valtrompia: [30, 50],
    valsabbia: [40, 70],
    ovest: [30, 50],
    unknown: [0, 80],
  },
};

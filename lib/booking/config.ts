import { zones } from "@/content/zones";
import type { BookableService, WorkRules, ZoneLite } from "./types";

/**
 * Booking configuration. Everything the owner may want to change lives here
 * (and will move to the database in the backend phase).
 *
 * confirmationMode is decision D8 — still to be agreed with the owner. The
 * safe default is "request": the customer proposes a slot, the office
 * confirms. Flip a service to "instant" to confirm on the spot.
 */
export const bookableServices: BookableService[] = [
  {
    id: "sopralluogo",
    label: "Sopralluogo",
    description: "Per preventivi di installazioni, ristrutturazioni e impianti su misura.",
    durationMin: 60,
    bufferMin: 15,
    confirmationMode: "request",
  },
  {
    id: "manutenzione-caldaia",
    label: "Manutenzione impianto termico",
    description: "Manutenzione della caldaia e dell'impianto di riscaldamento.",
    durationMin: 60,
    bufferMin: 15,
    confirmationMode: "request",
  },
  {
    id: "riparazione",
    label: "Riparazione non urgente",
    description: "Riparazione dell'impianto idraulico o del boiler a gas.",
    durationMin: 90,
    bufferMin: 15,
    confirmationMode: "request",
  },
];

export const workRules: WorkRules = {
  workingDays: [1, 2, 3, 4, 5],
  windows: [
    { start: 8 * 60, end: 12 * 60 },
    { start: 13 * 60, end: 19 * 60 },
  ],
  slotStepMin: 30,
  leadTimeHours: 24,
  closures: [
    // Example: { from: "2026-08-10", to: "2026-08-21", reason: "Chiusura estiva" }  [DA CONFERMARE]
  ],
  sameZoneTravelMin: 10,
  adjacentZoneTravelMin: 20,
};

export const bookingHorizonDays = 21;

export const zoneLites: ZoneLite[] = zones.map((z) => ({ id: z.id, travelMin: z.travelMin, adjacent: z.adjacent }));

export function getBookableService(id: string) {
  return bookableServices.find((s) => s.id === id);
}

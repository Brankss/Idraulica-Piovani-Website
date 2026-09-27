/**
 * Service zones used by the quote engine (travel surcharge) and the booking
 * engine (travel buffers + clustering). Municipalities and travel times are a
 * first draft — [DA CONFERMARE] with the owner (see docs/da-confermare.md).
 */

export type ZoneId = "brescia" | "nord-est" | "sud-est" | "valtrompia" | "valsabbia" | "ovest";

export type Zone = {
  id: ZoneId;
  name: string;
  /** Typical drive from the Brescia base, minutes */
  travelMin: number;
  adjacent: ZoneId[];
  municipalities: string[];
};

export const zones: Zone[] = [
  {
    id: "brescia",
    name: "Brescia città",
    travelMin: 15,
    adjacent: ["nord-est", "sud-est", "ovest"],
    municipalities: ["Brescia"],
  },
  {
    id: "nord-est",
    name: "Hinterland nord",
    travelMin: 20,
    adjacent: ["brescia", "valtrompia", "valsabbia"],
    municipalities: ["Nave", "Caino", "Bovezzo", "Concesio", "Collebeato", "Cellatica"],
  },
  {
    id: "sud-est",
    name: "Hinterland sud-est",
    travelMin: 25,
    adjacent: ["brescia", "valsabbia"],
    municipalities: [
      "Rezzato",
      "Botticino",
      "Castenedolo",
      "Borgosatollo",
      "San Zeno Naviglio",
      "Flero",
      "Poncarale",
      "Mazzano",
      "Nuvolera",
    ],
  },
  {
    id: "valtrompia",
    name: "Valtrompia",
    travelMin: 30,
    adjacent: ["nord-est", "ovest"],
    municipalities: ["Villa Carcina", "Sarezzo", "Lumezzane", "Gardone Val Trompia", "Marcheno"],
  },
  {
    id: "valsabbia",
    name: "Valle Sabbia",
    travelMin: 40,
    adjacent: ["nord-est", "sud-est"],
    municipalities: ["Gavardo", "Vallio Terme", "Odolo", "Agnosine", "Vobarno", "Sabbio Chiese", "Vestone"],
  },
  {
    id: "ovest",
    name: "Ovest e Franciacorta",
    travelMin: 30,
    adjacent: ["brescia", "valtrompia"],
    municipalities: ["Gussago", "Roncadelle", "Castel Mella", "Castegnato", "Rodengo Saiano", "Ospitaletto", "Travagliato"],
  },
];

export const allMunicipalities = zones
  .flatMap((z) => z.municipalities.map((m) => ({ name: m, zoneId: z.id })))
  .sort((a, b) => a.name.localeCompare(b.name, "it"));

export function zoneForMunicipality(name: string): Zone | undefined {
  const needle = name.trim().toLocaleLowerCase("it");
  return zones.find((z) => z.municipalities.some((m) => m.toLocaleLowerCase("it") === needle));
}

export function getZone(id: ZoneId) {
  return zones.find((z) => z.id === id)!;
}

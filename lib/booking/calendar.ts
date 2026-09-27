import type { IsoDate, Minutes, Now } from "./types";

/**
 * Timezone-agnostic calendar helpers. Dates are `YYYY-MM-DD` strings in the
 * business timezone (Europe/Rome) and times are minutes from midnight, so the
 * engine is deterministic and trivially testable.
 */

export const BUSINESS_TZ = "Europe/Rome";

function toUtc(date: IsoDate) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function fromUtc(dt: Date): IsoDate {
  return dt.toISOString().slice(0, 10);
}

export function addDays(date: IsoDate, days: number): IsoDate {
  const dt = toUtc(date);
  dt.setUTCDate(dt.getUTCDate() + days);
  return fromUtc(dt);
}

/** ISO weekday: 1 = Monday … 7 = Sunday */
export function isoWeekday(date: IsoDate): number {
  const d = toUtc(date).getUTCDay();
  return d === 0 ? 7 : d;
}

export function daysBetween(a: IsoDate, b: IsoDate): number {
  return Math.round((toUtc(b).getTime() - toUtc(a).getTime()) / 86_400_000);
}

/** Easter Sunday (Anonymous Gregorian algorithm). */
export function easterSunday(year: number): IsoDate {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Italian public holidays plus the Brescia patron saints (15 February). */
export function holidayName(date: IsoDate): string | undefined {
  const year = Number(date.slice(0, 4));
  const md = date.slice(5);
  const fixed: Record<string, string> = {
    "01-01": "Capodanno",
    "01-06": "Epifania",
    "02-15": "Santi Faustino e Giovita, patroni di Brescia",
    "04-25": "Festa della Liberazione",
    "05-01": "Festa dei Lavoratori",
    "06-02": "Festa della Repubblica",
    "08-15": "Ferragosto",
    "11-01": "Ognissanti",
    "12-08": "Immacolata Concezione",
    "12-25": "Natale",
    "12-26": "Santo Stefano",
  };
  if (fixed[md]) return fixed[md];
  if (date === addDays(easterSunday(year), 1)) return "Lunedì dell'Angelo";
  return undefined;
}

export function formatTime(min: Minutes): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function parseTime(hhmm: string): Minutes {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** "Lunedì 6 ottobre" */
export function formatDayLong(date: IsoDate): string {
  const s = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(toUtc(date));
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** { weekday: "lun", day: "6", month: "ott" } for the day strip */
export function formatDayParts(date: IsoDate) {
  const dt = toUtc(date);
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("it-IT", { ...o, timeZone: "UTC" }).format(dt).replace(".", "");
  return { weekday: fmt({ weekday: "short" }), day: fmt({ day: "numeric" }), month: fmt({ month: "short" }) };
}

/** Current wall-clock date/time in Europe/Rome, regardless of the device zone. */
export function nowInRome(at: Date = new Date()): Now {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

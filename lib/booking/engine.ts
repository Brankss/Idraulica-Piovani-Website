import type { ZoneId } from "@/content/zones";
import { addDays, holidayName, isoWeekday } from "./calendar";
import type {
  BookableService,
  BusyBlock,
  DayAvailability,
  IsoDate,
  Minutes,
  Now,
  Slot,
  WorkRules,
  ZoneLite,
} from "./types";

/**
 * "Smart" slot ranking — a pure function shared by the browser (today, with
 * mock busy data) and the server (later, with the real calendar).
 *
 * A slot is valid when the job, its buffer and the drive to/from neighbouring
 * appointments all fit inside a working window. Valid slots are then scored
 * so the technician drives less: days that already have work in the same (or
 * an adjacent) zone rank higher, as do slots right next to that work. Earlier
 * days win ties, and busy days are slightly penalised to spread the load.
 */

export type RankRequest = {
  service: BookableService;
  /** null when the municipality is not in a known zone */
  zoneId: ZoneId | null;
  now: Now;
  horizonDays: number;
};

const UNKNOWN_ZONE_TRAVEL = 45;
const RECOMMENDED_COUNT = 3;

export function rankSlots(
  req: RankRequest,
  rules: WorkRules,
  busy: BusyBlock[],
  zones: ZoneLite[],
): DayAvailability[] {
  const zoneById = new Map(zones.map((z) => [z.id, z]));
  const travel = (id?: ZoneId | null) => (id ? (zoneById.get(id)?.travelMin ?? UNKNOWN_ZONE_TRAVEL) : UNKNOWN_ZONE_TRAVEL);

  const gap = (a?: ZoneId | null, b?: ZoneId | null): number => {
    if (!a || !b) return Math.max(travel(a), travel(b));
    if (a === b) return rules.sameZoneTravelMin;
    if (zoneById.get(a)?.adjacent.includes(b)) return rules.adjacentZoneTravelMin;
    return Math.max(travel(a), travel(b));
  };

  const relation = (other?: ZoneId): "same" | "adjacent" | "none" => {
    if (!req.zoneId || !other) return "none";
    if (other === req.zoneId) return "same";
    if (zoneById.get(req.zoneId)?.adjacent.includes(other)) return "adjacent";
    return "none";
  };

  // Earliest bookable moment: now + lead time, and never today.
  const leadTotal = req.now.minutes + rules.leadTimeHours * 60;
  const leadDate = addDays(req.now.date, Math.floor(leadTotal / 1440));
  const leadMinutes = leadTotal % 1440;

  const { durationMin, bufferMin } = req.service;
  const days: DayAvailability[] = [];

  for (let offset = 1; offset <= req.horizonDays; offset++) {
    const date = addDays(req.now.date, offset);
    const weekday = isoWeekday(date);
    if (!rules.workingDays.includes(weekday)) continue;

    const holiday = holidayName(date);
    const closure = rules.closures.find((c) => date >= c.from && date <= c.to);
    if (holiday || closure) {
      days.push({ date, weekday, closedReason: holiday ?? closure!.reason, slots: [] });
      continue;
    }

    const dayBusy = busy.filter((b) => b.date === date).sort((a, b) => a.start - b.start);
    const sameZoneCount = dayBusy.filter((b) => relation(b.zoneId) === "same").length;
    const adjacentCount = dayBusy.filter((b) => relation(b.zoneId) === "adjacent").length;
    const slots: Slot[] = [];

    for (const window of rules.windows) {
      for (let start = window.start; start + durationMin <= window.end; start += rules.slotStepMin) {
        const end = start + durationMin;

        if (date < leadDate || (date === leadDate && start < leadMinutes)) continue;
        if (!fits(start, end, window, dayBusy)) continue;

        let score = 100 - offset * 3 - dayBusy.length * 6;
        let reason: string | undefined;
        if (sameZoneCount > 0) {
          score += 30;
          reason = "Siamo già nella tua zona quel giorno";
        } else if (adjacentCount > 0) {
          score += 15;
          reason = "Siamo in una zona vicina quel giorno";
        }
        const backToBack = dayBusy.some(
          (b) =>
            relation(b.zoneId) === "same" &&
            ((b.end <= start && start - b.end <= 60) || (b.start >= end && b.start - end <= 60)),
        );
        if (backToBack) score += 12;

        slots.push({ date, start, end, score, badges: [], reason });
      }
    }

    days.push({ date, weekday, slots });
  }

  markBadges(days);
  return days;

  function fits(start: Minutes, end: Minutes, window: { start: Minutes; end: Minutes }, dayBusy: BusyBlock[]) {
    let hasEarlierInWindow = false;
    for (const b of dayBusy) {
      if (b.end <= start) {
        if (start < b.end + gap(b.zoneId, req.zoneId)) return false;
        if (b.end > window.start) hasEarlierInWindow = true;
      } else if (b.start >= end) {
        if (b.start < end + bufferMin + gap(req.zoneId, b.zoneId)) return false;
      } else {
        return false; // overlap
      }
    }
    // First job of the window: allow the drive from the workshop.
    if (!hasEarlierInWindow && start < window.start + travel(req.zoneId)) return false;
    return true;
  }
}

function markBadges(days: DayAvailability[]) {
  const all = days.flatMap((d) => d.slots);
  if (all.length === 0) return;

  const first = all.reduce((a, b) => (b.date < a.date || (b.date === a.date && b.start < a.start) ? b : a));
  first.badges.push("primo");

  // Best slot per day, then the top days — recommendations on distinct days
  // give the customer real alternatives.
  const bestPerDay: Slot[] = days
    .filter((d) => d.slots.length > 0)
    .map((d) => d.slots.reduce((a, b) => (b.score > a.score ? b : a)));
  bestPerDay
    .sort((a, b) => b.score - a.score || a.date.localeCompare(b.date) || a.start - b.start)
    .slice(0, RECOMMENDED_COUNT)
    .forEach((s) => s.badges.push("consigliato"));
}

/** Convenience for the UI: all recommended slots, best first. */
export function recommendedSlots(days: DayAvailability[]): Slot[] {
  return days
    .flatMap((d) => d.slots)
    .filter((s) => s.badges.includes("consigliato"))
    .sort((a, b) => b.score - a.score);
}

export function isBookableDate(days: DayAvailability[], date: IsoDate) {
  return days.some((d) => d.date === date && d.slots.length > 0);
}

import { describe, expect, it } from "vitest";
import { bookableServices, workRules, zoneLites } from "@/lib/booking/config";
import { rankSlots } from "@/lib/booking/engine";
import type { BusyBlock, WorkRules } from "@/lib/booking/types";

const sopralluogo = bookableServices.find((s) => s.id === "sopralluogo")!; // 60' + 15' buffer
// Monday 28 Sept 2026, 10:00 in Rome
const now = { date: "2026-09-28", minutes: 600 };

const rank = (busy: BusyBlock[] = [], zoneId: "brescia" | "valsabbia" | null = "brescia", rules: WorkRules = workRules) =>
  rankSlots({ service: sopralluogo, zoneId, now, horizonDays: 14 }, rules, busy, zoneLites);

const slotsOn = (days: ReturnType<typeof rank>, date: string) => days.find((d) => d.date === date)?.slots ?? [];

describe("rankSlots", () => {
  it("skips weekends and respects the 24h lead time (no same-day, nothing before tomorrow 10:00)", () => {
    const days = rank();
    expect(days.every((d) => d.weekday <= 5)).toBe(true);
    const tomorrow = slotsOn(days, "2026-09-29");
    expect(Math.min(...tomorrow.map((s) => s.start))).toBeGreaterThanOrEqual(600);
    expect(days.some((d) => d.date === "2026-09-28")).toBe(false);
  });

  it("keeps jobs inside the windows and never across lunch", () => {
    const slots = rank().flatMap((d) => d.slots);
    for (const s of slots) {
      const inMorning = s.start >= 480 && s.end <= 720;
      const inAfternoon = s.start >= 780 && s.end <= 1140;
      expect(inMorning || inAfternoon).toBe(true);
    }
  });

  it("adds the drive from the workshop before the first job of a window", () => {
    const wed = slotsOn(rank(), "2026-09-30");
    expect(wed[0].start).toBe(8 * 60 + 30); // 08:00 + 15' travel → first 30' step
    const farWed = slotsOn(rank([], "valsabbia"), "2026-09-30");
    expect(farWed[0].start).toBe(9 * 60); // 40' travel → 09:00
  });

  it("keeps travel and buffer around existing appointments", () => {
    const busy: BusyBlock[] = [{ date: "2026-09-30", start: 600, end: 660, zoneId: "valsabbia" }];
    const wed = slotsOn(rank(busy, "brescia"), "2026-09-30");
    // Brescia ↔ Valle Sabbia are not adjacent → max travel 40'
    for (const s of wed) {
      const ok = s.end + sopralluogo.bufferMin + 40 <= 600 || s.start >= 660 + 40;
      expect(ok).toBe(true);
    }
  });

  it("marks closed holidays with a reason", () => {
    const rules: WorkRules = { ...workRules, closures: [{ from: "2026-10-05", to: "2026-10-06", reason: "Chiusura" }] };
    const days = rank([], "brescia", rules);
    expect(days.find((d) => d.date === "2026-10-05")?.closedReason).toBe("Chiusura");
    expect(slotsOn(days, "2026-10-06")).toHaveLength(0);
  });

  it("recommends days when the technician is already in the same zone", () => {
    const busy: BusyBlock[] = [{ date: "2026-10-07", start: 540, end: 600, zoneId: "brescia" }];
    const days = rank(busy, "brescia");
    const recommended = days.flatMap((d) => d.slots).filter((s) => s.badges.includes("consigliato"));
    expect(recommended).toHaveLength(3);
    expect(recommended.some((s) => s.date === "2026-10-07")).toBe(true);
    expect(recommended.find((s) => s.date === "2026-10-07")?.reason).toMatch(/zona/);
  });

  it("flags exactly one earliest slot", () => {
    const all = rank().flatMap((d) => d.slots);
    const first = all.filter((s) => s.badges.includes("primo"));
    expect(first).toHaveLength(1);
    expect(first[0].date).toBe("2026-09-29");
  });

  it("falls back to a conservative travel time for unknown municipalities", () => {
    const wed = slotsOn(rank([], null), "2026-09-30");
    expect(wed[0].start).toBe(9 * 60); // 45' → first step at 09:00
  });
});

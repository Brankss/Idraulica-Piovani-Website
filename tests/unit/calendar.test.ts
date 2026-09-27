import { describe, expect, it } from "vitest";
import { addDays, easterSunday, holidayName, isoWeekday, nowInRome } from "@/lib/booking/calendar";

describe("calendar helpers", () => {
  it("computes Easter", () => {
    expect(easterSunday(2026)).toBe("2026-04-05");
    expect(easterSunday(2027)).toBe("2027-03-28");
  });

  it("knows Italian holidays, Easter Monday and the Brescia patrons", () => {
    expect(holidayName("2026-04-06")).toBe("Lunedì dell'Angelo");
    expect(holidayName("2027-02-15")).toMatch(/Faustino e Giovita/);
    expect(holidayName("2026-12-08")).toBe("Immacolata Concezione");
    expect(holidayName("2026-10-06")).toBeUndefined();
  });

  it("adds days across month and year boundaries", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-28", 2)).toBe("2026-03-30"); // DST change in Italy
  });

  it("returns ISO weekdays", () => {
    expect(isoWeekday("2026-09-28")).toBe(1); // Monday
    expect(isoWeekday("2026-10-04")).toBe(7); // Sunday
  });

  it("reads wall-clock time in Rome independent of the device zone", () => {
    // 2026-09-27 22:30 UTC = 2026-09-28 00:30 in Rome (CEST, UTC+2)
    expect(nowInRome(new Date("2026-09-27T22:30:00Z"))).toEqual({ date: "2026-09-28", minutes: 30 });
  });
});

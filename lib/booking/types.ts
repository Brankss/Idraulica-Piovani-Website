import type { ZoneId } from "@/content/zones";

/** Calendar day in Europe/Rome, `YYYY-MM-DD`. */
export type IsoDate = string;

/** Minutes from local midnight (Europe/Rome), e.g. 9:30 → 570. */
export type Minutes = number;

export type BookableServiceId = "sopralluogo" | "manutenzione-caldaia" | "riparazione";

export type ConfirmationMode = "instant" | "request";

export type BookableService = {
  id: BookableServiceId;
  label: string;
  description: string;
  durationMin: number;
  /** Time kept free after the job (clean-up, paperwork) */
  bufferMin: number;
  /** Decision D8: per-service, to be agreed with the owner */
  confirmationMode: ConfirmationMode;
};

export type TimeWindow = { start: Minutes; end: Minutes };

export type WorkRules = {
  /** ISO weekdays, 1 = Monday … 7 = Sunday */
  workingDays: number[];
  windows: TimeWindow[];
  slotStepMin: number;
  /** No online booking closer than this (hours) */
  leadTimeHours: number;
  /** Extra closures (holidays are computed) */
  closures: { from: IsoDate; to: IsoDate; reason: string }[];
  /** Travel between two jobs in the same zone */
  sameZoneTravelMin: number;
  /** Travel between adjacent zones */
  adjacentZoneTravelMin: number;
};

/** An existing appointment (from the calendar) that blocks time. */
export type BusyBlock = {
  date: IsoDate;
  start: Minutes;
  end: Minutes;
  zoneId?: ZoneId;
};

export type ZoneLite = { id: ZoneId; travelMin: number; adjacent: ZoneId[] };

export type SlotBadge = "consigliato" | "primo";

export type Slot = {
  date: IsoDate;
  start: Minutes;
  end: Minutes;
  score: number;
  badges: SlotBadge[];
  /** Short human reason shown next to recommended slots */
  reason?: string;
};

export type DayAvailability = {
  date: IsoDate;
  weekday: number;
  closedReason?: string;
  slots: Slot[];
};

export type Now = { date: IsoDate; minutes: Minutes };

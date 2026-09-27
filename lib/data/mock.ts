import type { ZoneId } from "@/content/zones";
import { zones } from "@/content/zones";
import { addDays, isoWeekday } from "@/lib/booking/calendar";
import type { BusyBlock, IsoDate } from "@/lib/booking/types";
import type { BookingRepository, DataLayer, LeadRepository, QuoteRepository } from "./ports";

/**
 * In-browser mock backend. Busy blocks are generated deterministically from
 * the date (so the calendar looks realistic and stable across reloads);
 * bookings made in the demo are kept in sessionStorage only.
 */

const DEMO_KEY = "piovani-demo-bookings";
const LATENCY_MS = 650;

const wait = (ms = LATENCY_MS) => new Promise((r) => setTimeout(r, ms));

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const TEMPLATES: { start: number; end: number }[] = [
  { start: 8 * 60 + 30, end: 10 * 60 },
  { start: 10 * 60 + 30, end: 11 * 60 + 45 },
  { start: 14 * 60, end: 15 * 60 + 30 },
  { start: 16 * 60, end: 17 * 60 + 30 },
  { start: 17 * 60 + 30, end: 18 * 60 + 45 },
];

export function mockBusyFor(date: IsoDate): BusyBlock[] {
  const wd = isoWeekday(date);
  if (wd > 5) return [];
  const rnd = seeded(hash(date));
  const count = Math.floor(rnd() * 3) + 1; // 1–3 jobs already in the agenda
  const picked = [...TEMPLATES].sort(() => rnd() - 0.5).slice(0, count);
  return picked.map((t) => ({
    date,
    start: t.start,
    end: t.end,
    zoneId: zones[Math.floor(rnd() * zones.length)].id as ZoneId,
  }));
}

function readDemo(): BusyBlock[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.sessionStorage.getItem(DEMO_KEY) ?? "[]") as BusyBlock[];
  } catch {
    return [];
  }
}

function writeDemo(blocks: BusyBlock[]) {
  try {
    window.sessionStorage.setItem(DEMO_KEY, JSON.stringify(blocks));
  } catch {
    // storage unavailable (private mode): the demo simply won't remember
  }
}

function demoId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

const bookings: BookingRepository = {
  async getBusy({ from, to }) {
    await wait(250);
    const out: BusyBlock[] = [];
    for (let d = from; d <= to; d = addDays(d, 1)) out.push(...mockBusyFor(d));
    return [...out, ...readDemo().filter((b) => b.date >= from && b.date <= to)];
  },
  async createBooking(req, mode) {
    await wait();
    writeDemo([...readDemo(), { date: req.date, start: req.start, end: req.end, zoneId: req.zoneId ?? undefined }]);
    return {
      id: demoId("PR"),
      status: mode === "instant" ? "confirmed" : "requested",
      confirmationMode: mode,
    };
  },
};

const quotes: QuoteRepository = {
  async submitQuote() {
    await wait();
    return { id: demoId("PV") };
  },
};

const leads: LeadRepository = {
  async submitContact() {
    await wait();
    return { id: demoId("CT") };
  },
};

export const mockDataLayer: DataLayer = { bookings, quotes, leads, demo: true };

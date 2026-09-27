import { company, formatAddress, primaryAddress } from "@/content/company";
import { BUSINESS_TZ } from "./calendar";
import type { IsoDate, Minutes } from "./types";

function stamp(date: IsoDate, min: Minutes) {
  const hh = String(Math.floor(min / 60)).padStart(2, "0");
  const mm = String(min % 60).padStart(2, "0");
  return `${date.replaceAll("-", "")}T${hh}${mm}00`;
}

function escapeText(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Builds an .ics file for the customer's own calendar. */
export function buildIcs(opts: {
  uid: string;
  date: IsoDate;
  start: Minutes;
  end: Minutes;
  title: string;
  description: string;
  location?: string;
}) {
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Idraulica Piovani//Prenotazioni//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${opts.uid}@idraulicapiovani.com`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=${BUSINESS_TZ}:${stamp(opts.date, opts.start)}`,
    `DTEND;TZID=${BUSINESS_TZ}:${stamp(opts.date, opts.end)}`,
    `SUMMARY:${escapeText(opts.title)}`,
    `DESCRIPTION:${escapeText(opts.description)}`,
    `LOCATION:${escapeText(opts.location ?? formatAddress(primaryAddress))}`,
    `ORGANIZER;CN=${escapeText(company.brand)}:mailto:${company.email}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

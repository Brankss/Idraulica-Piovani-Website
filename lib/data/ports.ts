import type { ZoneId } from "@/content/zones";
import type { BookableServiceId, BusyBlock, ConfirmationMode, IsoDate, Minutes } from "@/lib/booking/types";
import type { QuoteInput, QuoteResult } from "@/lib/quote/types";
import type { ContactDetails, ContactMessage } from "@/lib/quote/schema";

/**
 * Data ports. The UI depends only on these interfaces; today they are backed
 * by in-browser mocks (lib/data/mock.ts), in the backend phase by Supabase
 * server actions (lib/data/supabase.ts) — same shapes, no UI changes.
 */

export type BookingRequest = {
  serviceId: BookableServiceId;
  date: IsoDate;
  start: Minutes;
  end: Minutes;
  zoneId: ZoneId | null;
  municipality: string;
  address: string;
  notes: string;
  customer: ContactDetails;
  /** Set when the booking comes from a quote estimate */
  quoteRef?: string;
};

export type BookingReceipt = {
  id: string;
  status: "confirmed" | "requested";
  confirmationMode: ConfirmationMode;
};

export type QuoteSubmission = {
  input: QuoteInput;
  result: QuoteResult;
  municipality: string;
  customer: ContactDetails;
  notes: string;
  photoCount: number;
};

export interface BookingRepository {
  getBusy(range: { from: IsoDate; to: IsoDate }): Promise<BusyBlock[]>;
  createBooking(req: BookingRequest, mode: ConfirmationMode): Promise<BookingReceipt>;
}

export interface QuoteRepository {
  submitQuote(req: QuoteSubmission): Promise<{ id: string }>;
}

export interface LeadRepository {
  submitContact(req: ContactMessage): Promise<{ id: string }>;
}

export type DataLayer = {
  bookings: BookingRepository;
  quotes: QuoteRepository;
  leads: LeadRepository;
  /** True while backed by mocks: the UI shows a "demo" notice on success */
  demo: boolean;
};

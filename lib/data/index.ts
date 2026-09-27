import { mockDataLayer } from "./mock";
import type { DataLayer } from "./ports";

/**
 * The single switch between mock and real backend. In the backend phase this
 * returns the Supabase-backed layer when NEXT_PUBLIC_DATA_LAYER=live.
 */
export const data: DataLayer = mockDataLayer;

export type * from "./ports";

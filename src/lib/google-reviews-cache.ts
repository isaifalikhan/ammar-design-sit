/**
 * In-memory cache for Google Places API responses.
 * TTL: 30 minutes to reduce API usage and cost.
 */

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

type CacheEntry<T> = { data: T; expiresAt: number };

const cache = new Map<string, CacheEntry<unknown>>();

export function get<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function set<T>(key: string, data: T): void {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

export const CACHE_KEY_REVIEWS = "google-reviews";

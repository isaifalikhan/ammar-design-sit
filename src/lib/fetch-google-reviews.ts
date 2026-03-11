/**
 * Fetches place details including reviews from Google Places API (New) v1.
 * Keeps API key server-side only.
 */

import type { GooglePlaceResponse, GoogleReviewsResponse, GoogleReviewItem } from "./google-reviews-types";

const PLACE_ID = "ChIJ_eeSD9qn3zgRcuY93NhbOOU";
const FIELD_MASK = "id,displayName,formattedAddress,rating,userRatingCount,reviews";
const REQUEST_TIMEOUT_MS = 12_000;
const MAX_REVIEWS = 5;

export async function fetchGoogleReviews(apiKey: string): Promise<GoogleReviewsResponse> {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Google Places API error: ${res.status} ${res.statusText}${body ? ` - ${body.slice(0, 200)}` : ""}`);
    }

    const data = (await res.json()) as GooglePlaceResponse;
    return shapeResponse(data);
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error) throw err;
    throw new Error("Failed to fetch place details");
  }
}

function shapeResponse(data: GooglePlaceResponse): GoogleReviewsResponse {
  const placeId = data.id ?? PLACE_ID;
  const name = data.displayName?.text ?? "Ammar Designz";
  const address = data.formattedAddress ?? "";
  const rating = typeof data.rating === "number" ? data.rating : 0;
  const totalRatings = typeof data.userRatingCount === "number" ? data.userRatingCount : 0;

  let reviews: GoogleReviewItem[] = [];
  if (Array.isArray(data.reviews) && data.reviews.length > 0) {
    reviews = data.reviews
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Anonymous",
        authorPhoto: r.authorAttribution?.photoUri ?? null,
        authorUrl: r.authorAttribution?.uri ?? null,
        rating: typeof r.rating === "number" ? r.rating : 0,
        text: r.text?.text ?? "",
        relativeTime: r.relativePublishTimeDescription ?? "",
        publishTime: r.publishTime ?? "",
      }))
      .sort((a, b) => (b.publishTime || "").localeCompare(a.publishTime || ""))
      .slice(0, MAX_REVIEWS);
  }

  return {
    placeId,
    name,
    address,
    rating,
    totalRatings,
    reviews,
  };
}

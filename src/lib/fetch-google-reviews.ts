/**
 * Fetches place details including reviews from Google Places API (New) v1.
 * Keeps API key server-side only.
 */

import type {
  GooglePlaceDetailsApiResponse,
  GooglePlaceResponse,
  GoogleReviewsResponse,
  GoogleReviewItem,
} from "./google-reviews-types";

const PLACE_ID = "ChIJ_eeSD9qn3zgRcuY93NhbOOU";
const NEW_FIELD_MASK = "id,displayName,formattedAddress,rating,userRatingCount,reviews";
const REQUEST_TIMEOUT_MS = 12_000;
const MAX_REVIEWS = 5;

export async function fetchGoogleReviews(apiKey: string): Promise<GoogleReviewsResponse> {
  try {
    return await fetchGoogleReviewsLegacy(apiKey);
  } catch (legacyErr) {
    try {
      return await fetchGoogleReviewsNew(apiKey);
    } catch (newErr) {
      const legacyMessage = legacyErr instanceof Error ? legacyErr.message : "Legacy Places API failed";
      const newMessage = newErr instanceof Error ? newErr.message : "Places API (New) failed";
      throw new Error(`${legacyMessage} | ${newMessage}`);
    }
  }
}

async function fetchGoogleReviewsLegacy(apiKey: string): Promise<GoogleReviewsResponse> {
  const fields = "name,rating,user_ratings_total,reviews,formatted_address";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=${encodeURIComponent(fields)}&key=${encodeURIComponent(apiKey)}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Google Places API error: ${res.status} ${res.statusText}${body ? ` - ${body.slice(0, 200)}` : ""}`);
    }

    const data = (await res.json()) as GooglePlaceDetailsApiResponse;
    return shapeLegacyResponse(data);
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error) throw err;
    throw new Error("Failed to fetch place details");
  }
}

async function fetchGoogleReviewsNew(apiKey: string): Promise<GoogleReviewsResponse> {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": NEW_FIELD_MASK,
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Google Places API error: ${res.status} ${res.statusText}${body ? ` - ${body.slice(0, 200)}` : ""}`);
    }

    const data = (await res.json()) as GooglePlaceResponse;
    return shapeNewResponse(data);
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error) throw err;
    throw new Error("Failed to fetch place details");
  }
}

function shapeLegacyResponse(data: GooglePlaceDetailsApiResponse): GoogleReviewsResponse {
  if (data.status && data.status !== "OK") {
    throw new Error(data.error_message || `Google Places API status: ${data.status}`);
  }

  const result = data.result;
  const placeId = PLACE_ID;
  const name = result?.name ?? "Ammar Designz";
  const address = result?.formatted_address ?? "";
  const rating = typeof result?.rating === "number" ? result.rating : 0;
  const totalRatings = typeof result?.user_ratings_total === "number" ? result.user_ratings_total : 0;

  let reviews: GoogleReviewItem[] = [];
  if (Array.isArray(result?.reviews) && result.reviews.length > 0) {
    reviews = result.reviews
      .map((r) => ({
        author: r.author_name ?? "Anonymous",
        authorPhoto: r.profile_photo_url ?? null,
        authorUrl: r.author_url ?? null,
        rating: typeof r.rating === "number" ? r.rating : 0,
        text: r.text ?? "",
        relativeTime: r.relative_time_description ?? "",
        publishTime: typeof r.time === "number" ? new Date(r.time * 1000).toISOString() : "",
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

function shapeNewResponse(data: GooglePlaceResponse): GoogleReviewsResponse {
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

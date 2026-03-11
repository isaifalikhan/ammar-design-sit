import { NextResponse } from "next/server";
import { get, set, CACHE_KEY_REVIEWS } from "@/lib/google-reviews-cache";
import { fetchGoogleReviews } from "@/lib/fetch-google-reviews";
import type { GoogleReviewsResponse } from "@/lib/google-reviews-types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "Google Reviews are not configured." },
      { status: 503 }
    );
  }

  const cached = get<GoogleReviewsResponse>(CACHE_KEY_REVIEWS);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const data = await fetchGoogleReviews(apiKey);
    set(CACHE_KEY_REVIEWS, data);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load reviews";
    if (message.includes("403") || message.includes("API key")) {
      return NextResponse.json(
        { error: "Reviews are temporarily unavailable." },
        { status: 503 }
      );
    }
    if (message.includes("timeout") || message.includes("abort")) {
      return NextResponse.json(
        { error: "Request timed out. Please try again later." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "Could not load reviews. Please try again later." },
      { status: 502 }
    );
  }
}

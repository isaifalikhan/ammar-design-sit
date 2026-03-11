/**
 * Types for Google Places API (New) Place Details response and our API response.
 */

/** Raw review from Google Places API v1 */
export interface GooglePlaceReview {
  name?: string;
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
    uri?: string;
  };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
}

/** Raw place response from Google Places API v1 GET place */
export interface GooglePlaceResponse {
  id?: string;
  name?: string;
  displayName?: { text?: string; languageCode?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: GooglePlaceReview[];
}

/** Single review in our API response */
export interface GoogleReviewItem {
  author: string;
  authorPhoto: string | null;
  authorUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
}

/** GET /api/google-reviews response */
export interface GoogleReviewsResponse {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  totalRatings: number;
  reviews: GoogleReviewItem[];
}

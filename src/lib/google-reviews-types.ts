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

export interface GooglePlaceDetailsReview {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
  time?: number;
}

export interface GooglePlaceDetailsResult {
  name?: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: GooglePlaceDetailsReview[];
}

export interface GooglePlaceDetailsApiResponse {
  status?: string;
  error_message?: string;
  result?: GooglePlaceDetailsResult;
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

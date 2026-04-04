"use client";

import { useEffect, useState } from "react";
import type { GoogleReviewsResponse, GoogleReviewItem } from "@/lib/google-reviews-types";

type Status = "idle" | "loading" | "success" | "error" | "empty";

const PLACE_ID = "ChIJ_eeSD9qn3zgRcuY93NhbOOU";

export default function GoogleReviews() {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<GoogleReviewsResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/google-reviews")
      .then((res) => {
        if (cancelled) return;
        if (!res.ok) {
          return res.json().then((body) => {
            throw new Error(body?.error || `Request failed (${res.status})`);
          });
        }
        return res.json();
      })
      .then((json: GoogleReviewsResponse) => {
        if (cancelled) return;
        setData(json);
        setStatus(json.reviews?.length ? "success" : "empty");
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return <GoogleReviewsLoading />;
  }

  if (status === "error") {
    return <GoogleReviewsError message={errorMessage} />;
  }

  if (status === "empty" || !data) {
    return <GoogleReviewsEmpty data={data} />;
  }

  return <GoogleReviewsContent data={data} />;
}

function GoogleReviewsLoading() {
  return (
    <section className="section-padding" style={{ background: "#faf9f7" }}>
      <div className="page-container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="google-reviews-skeleton-title" />
          <div className="google-reviews-skeleton-subtitle" />
        </div>
        <div className="google-reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="google-reviews-card-skeleton" />
          ))}
        </div>
      </div>
      <style>{`
        .google-reviews-skeleton-title { height: 32px; width: 280px; margin: 0 auto 12px; background: linear-gradient(90deg, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%); background-size: 200% 100%; animation: google-reviews-shimmer 1.2s ease-in-out infinite; border-radius: 8px; }
        .google-reviews-skeleton-subtitle { height: 20px; width: 200px; margin: 0 auto; background: linear-gradient(90deg, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%); background-size: 200% 100%; animation: google-reviews-shimmer 1.2s ease-in-out infinite; border-radius: 6px; }
        .google-reviews-card-skeleton { min-height: 200px; background: #eee; border-radius: 24px; animation: google-reviews-shimmer 1.2s ease-in-out infinite; background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%); background-size: 200% 100%; }
        @keyframes google-reviews-shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
      `}</style>
    </section>
  );
}

function GoogleReviewsError({ message }: { message: string }) {
  const isApiDisabled = /has not been used|is disabled|Enable it by visiting|REQUEST_DENIED|not authorized to use this API/i.test(message);
  const enableApiUrl = "https://console.cloud.google.com/apis/library/places.googleapis.com";
  const mapsReviewsUrl = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

  return (
    <section className="section-padding" style={{ background: "#faf9f7" }}>
      <div className="page-container">
        <div style={{ textAlign: "center", padding: "48px 32px", background: "#fff", border: "1px solid rgba(0,0,0,.08)", borderRadius: 24, maxWidth: 520, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#7fbf2f", margin: "0 0 12px" }}>Google Reviews</p>
          {isApiDisabled ? (
            <>
              <p style={{ fontSize: 17, color: "#333", margin: 0, lineHeight: 1.5 }}>
                Google Places API isn’t enabled or allowed for your server key.
              </p>
              <p style={{ fontSize: 14, color: "#666", marginTop: 16 }}>
                Enable Places API and make sure the server key has access, then reviews will load here automatically.
              </p>
              <a
                href={enableApiUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 24,
                  padding: "12px 24px",
                  background: "#7fbf2f",
                  color: "#000",
                  fontSize: 14,
                  fontWeight: 600,
                  borderRadius: 100,
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(127,191,47,.3)",
                }}
              >
                Enable Places API →
              </a>
              <div style={{ marginTop: 14 }}>
                <a
                  href={mapsReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 24px",
                    background: "rgba(127,191,47,.1)",
                    color: "#111",
                    fontSize: 14,
                    fontWeight: 700,
                    borderRadius: 100,
                    textDecoration: "none",
                    border: "1px solid rgba(127,191,47,.25)",
                  }}
                >
                  See Complete Reviews →
                </a>
              </div>
            </>
          ) : (
            <>
              <p style={{ fontSize: 16, color: "#333", margin: 0 }}>{message}</p>
              <p style={{ fontSize: 13, color: "#999", marginTop: 16 }}>You can still find us on Google to read reviews.</p>
              <div style={{ marginTop: 14 }}>
                <a
                  href={mapsReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 24px",
                    background: "#7fbf2f",
                    color: "#000",
                    fontSize: 14,
                    fontWeight: 700,
                    borderRadius: 100,
                    textDecoration: "none",
                    boxShadow: "0 10px 26px rgba(127,191,47,.25)",
                  }}
                >
                  See Complete Reviews →
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function GoogleReviewsEmpty({ data }: { data: GoogleReviewsResponse | null }) {
  const name = data?.name ?? "Ammar Designz";
  const rating = data?.rating ?? 0;
  const totalRatings = data?.totalRatings ?? 0;
  const mapsReviewsUrl = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

  return (
    <section className="section-padding" style={{ background: "#faf9f7" }}>
      <div className="page-container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".28em", textTransform: "uppercase", color: "#7fbf2f", margin: "0 0 16px" }}>Google Reviews</p>
          <h2 style={{ fontWeight: 700, color: "#111", margin: 0 }}>What Our Clients <span className="gradient-text">Say</span></h2>
        </div>
        <div style={{ textAlign: "center", padding: "48px 24px", background: "#fff", border: "1px solid rgba(0,0,0,.06)", borderRadius: 24, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
          <p style={{ fontSize: 16, color: "#555", margin: 0 }}>
            {name} has a {rating > 0 ? `${rating}★ rating` : "great"} reputation{totalRatings > 0 ? ` with ${totalRatings} reviews` : ""}. Check us out on Google for more.
          </p>
          <div style={{ marginTop: 18 }}>
            <a
              href={mapsReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 24px",
                background: "#7fbf2f",
                color: "#000",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 100,
                textDecoration: "none",
                boxShadow: "0 10px 26px rgba(127,191,47,.25)",
              }}
            >
              See Complete Reviews →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleReviewsContent({ data }: { data: GoogleReviewsResponse }) {
  const { name, address, rating, totalRatings, reviews } = data;
  const mapsReviewsUrl = `https://www.google.com/maps/place/?q=place_id:${data.placeId}`;

  return (
    <section className="section-padding" style={{ background: "#faf9f7" }}>
      <div className="page-container">
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".28em", textTransform: "uppercase", color: "#7fbf2f", margin: "0 0 16px" }}>Google Reviews</p>
          <h2 style={{ fontWeight: 700, color: "#111", margin: "0 0 12px" }}>What Our Clients <span className="gradient-text">Say</span></h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#111" }}>{rating.toFixed(1)}</span>
              <span style={{ color: "#7fbf2f", fontSize: 18 }}>★</span>
            </div>
            <span style={{ fontSize: 14, color: "#666" }}>{totalRatings} reviews</span>
            {address && <span style={{ fontSize: 13, color: "#999" }}> · {address}</span>}
          </div>
        </header>

        <div className="google-reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} name={name} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a
            href={mapsReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              fontSize: 14,
              fontWeight: 700,
              background: "#7fbf2f",
              color: "#000",
              borderRadius: 100,
              textDecoration: "none",
              boxShadow: "0 18px 40px rgba(127,191,47,.28)",
            }}
          >
            See Complete Reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, name }: { review: GoogleReviewItem; name: string }) {
  return (
    <article
      className="google-review-card"
      aria-label={`Review of ${name} by ${review.author}`}
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,.06)",
        borderRadius: 24,
        padding: "28px 24px",
        boxShadow: "0 4px 24px rgba(0,0,0,.06)",
        transition: "transform .35s ease, box-shadow .35s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        {review.authorPhoto ? (
          <img src={review.authorPhoto} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#7fbf2f,#a8e04a)", display: "grid", placeItems: "center", fontSize: 18, fontWeight: 700, color: "#fff" }}>
            {review.author.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: 0 }}>{review.author}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} style={{ color: star <= review.rating ? "#7fbf2f" : "#ddd", fontSize: 14 }}>★</span>
            ))}
            {review.relativeTime && <span style={{ fontSize: 12, color: "#999", marginLeft: 8 }}>{review.relativeTime}</span>}
          </div>
        </div>
      </div>
      <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 16, lineHeight: 1.6, color: "#333", margin: 0 }}>{review.text}</p>
      <style>{`
        .google-review-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,.1); }
      `}</style>
    </article>
  );
}

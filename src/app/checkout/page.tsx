"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, Suspense } from "react";
import { COURSES, getCourseBySlug } from "@/lib/courses-data";

const PAYMENT_METHODS = [
  { icon: "📱", title: "Easypaisa", accountTitle: "Ammar Designz", detail: "Mobile No: 0318 8336761" },
  { icon: "🏦", title: "Bank Transfer", bank: "Bank Alfalah ", accountTitle: "Ammar Designz", iban: "PK50ALFH5881005002613938" },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState(courseSlug || "");
  const selectedCourse = useMemo(() => (selectedCourseSlug ? getCourseBySlug(selectedCourseSlug) : undefined), [selectedCourseSlug]);

  return (
    <div style={{ minHeight: "80vh", background: "#faf9f7" }}>
      <div className="page-container" style={{ padding: "80px 48px 100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: 32 }}>
            <Link href="/courses" style={{ fontSize: 13, color: "#7fbf2f", textDecoration: "none", fontWeight: 600 }}>
              ← Back to Courses
            </Link>
          </nav>

          {submitted ? (
            <SuccessBlock />
          ) : (
            <>
              <header style={{ marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".28em", textTransform: "uppercase", color: "#7fbf2f", margin: "0 0 12px" }}>
                  Secure Checkout
                </p>
                <h1 style={{ fontWeight: 700, color: "#111", margin: 0 }}>
                  Complete Your <span className="gradient-text">Enrolment</span>
                </h1>
                <p style={{ fontSize: 15, color: "#666", marginTop: 12 }}>
                  Fill in your details and choose a payment method. We’ll send course access within 24 hours.
                </p>
              </header>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "start" }} className="checkout-grid">
                {/* Left: Form */}
                <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,.06)", borderRadius: 28, padding: "40px 40px 44px", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#7fbf2f", margin: "0 0 20px" }}>
                    Your Details
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      style={{ height: 52, borderRadius: 14, border: "1.5px solid #e5e5e5", background: "#fafafa", padding: "0 18px", fontSize: 14, color: "#111" }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      style={{ height: 52, borderRadius: 14, border: "1.5px solid #e5e5e5", background: "#fafafa", padding: "0 18px", fontSize: 14, color: "#111" }}
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp Number *"
                      style={{ height: 52, borderRadius: 14, border: "1.5px solid #e5e5e5", background: "#fafafa", padding: "0 18px", fontSize: 14, color: "#111" }}
                    />
                    <select
                      value={selectedCourseSlug}
                      onChange={(e) => setSelectedCourseSlug(e.target.value)}
                      style={{ height: 52, borderRadius: 14, border: "1.5px solid #e5e5e5", background: "#fafafa", padding: "0 18px", fontSize: 14, color: "#555", appearance: "none" }}
                    >
                      <option value="">Select course *</option>
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.slug}>{c.title}</option>
                      ))}
                    </select>
                    <select
                      style={{ height: 52, borderRadius: 14, border: "1.5px solid #e5e5e5", background: "#fafafa", padding: "0 18px", fontSize: 14, color: "#555", appearance: "none" }}
                    >
                      <option value="">How did you hear about us?</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>Friend / Referral</option>
                      <option>Google Search</option>
                      <option>Other</option>
                    </select>
                    <textarea
                      rows={3}
                      placeholder="Any message (optional)"
                      style={{ borderRadius: 14, border: "1.5px solid #e5e5e5", background: "#fafafa", padding: "14px 18px", fontSize: 14, color: "#111", resize: "vertical", fontFamily: "inherit" }}
                    />
                  </div>

                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#7fbf2f", margin: "28px 0 14px" }}>
                    Payment Methods
                  </p>
                  <div style={{ display: "grid", gap: 12 }}>
                    {PAYMENT_METHODS.map((pm, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          borderRadius: 14,
                          border: "1px solid rgba(0,0,0,.06)",
                          background: "#fcfcfc",
                          padding: "14px 16px",
                        }}
                      >
                        <span style={{ fontSize: 20 }}>{pm.icon}</span>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: 0 }}>{pm.title}</p>
                          <p style={{ fontSize: 12, color: "#666", margin: "4px 0 0" }}>Account Title: {pm.accountTitle}</p>
                          {pm.detail && <p style={{ fontSize: 12, color: "#666", margin: 0 }}>{pm.detail}</p>}
                          {pm.bank && <p style={{ fontSize: 12, color: "#666", margin: "2px 0 0" }}>Bank: {pm.bank}</p>}
                          {pm.accountNo && <p style={{ fontSize: 12, color: "#666", margin: 0 }}>Account No: {pm.accountNo}</p>}
                          {pm.iban && <p style={{ fontSize: 12, color: "#666", margin: 0 }}>IBAN: {pm.iban}</p>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    style={{
                      marginTop: 28,
                      width: "100%",
                      height: 56,
                      borderRadius: 100,
                      background: "#7fbf2f",
                      color: "#000",
                      fontSize: 15,
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 14px 40px rgba(127,191,47,.3)",
                      transition: "all .3s",
                    }}
                  >
                    Place Order →
                  </button>
                </div>

                {/* Right: Order summary */}
                <div style={{ position: "sticky", top: 100 }} className="checkout-summary">
                  <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,.06)", borderRadius: 28, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#7fbf2f", margin: "0 0 20px" }}>
                      Order Summary
                    </p>
                    {selectedCourse ? (
                      <>
                        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                          <div style={{ width: 80, height: 80, borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
                            <img src={selectedCourse.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#7fbf2f" }}>{selectedCourse.tag}</span>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: "4px 0 0", lineHeight: 1.25 }}>{selectedCourse.title}</h3>
                            <p style={{ fontSize: 20, fontWeight: 700, color: "#7fbf2f", margin: "8px 0 0" }}>{selectedCourse.fee}</p>
                          </div>
                        </div>
                        <div style={{ borderTop: "1px solid rgba(0,0,0,.06)", paddingTop: 20 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 14, color: "#666" }}>Total</span>
                            <span style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>{selectedCourse.fee}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p style={{ fontSize: 14, color: "#888" }}>Select a course in the form to see your order total.</p>
                    )}
                  </div>
                  <Link
                    href="/courses"
                    style={{
                      display: "block",
                      marginTop: 16,
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#666",
                      textDecoration: "none",
                    }}
                  >
                    Browse more courses →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .checkout-summary { position: static !important; }
        }
        @media (max-width: 768px) {
          .page-container { padding: 60px 24px 80px !important; }
        }
      `}</style>
    </div>
  );
}

function CheckoutFallback() {
  return (
    <div style={{ minHeight: "80vh", background: "#faf9f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: 48 }}>
        <div style={{ width: 40, height: 40, border: "3px solid #e5e5e5", borderTopColor: "#7fbf2f", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ fontSize: 14, color: "#666" }}>Loading checkout...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}

function SuccessBlock() {
  return (
    <div style={{ textAlign: "center", padding: "60px 24px", background: "#fff", borderRadius: 28, border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(127,191,47,.12)", border: "2px solid #7fbf2f", display: "grid", placeItems: "center", fontSize: 36, margin: "0 auto 24px" }}>
        ✓
      </div>
      <h2 style={{ fontWeight: 700, color: "#111", margin: "0 0 12px" }}>Order Confirmed</h2>
      <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, maxWidth: 420, margin: "0 auto 32px" }}>
        Thank you for enrolling. We’ll send your course access and payment instructions to your email within 24 hours.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        <Link
          href="/courses"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#7fbf2f",
            color: "#000",
            borderRadius: 100,
            padding: "14px 28px",
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 10px 28px rgba(127,191,47,.3)",
          }}
        >
          Back to Courses
        </Link>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: "1.5px solid rgba(0,0,0,.12)",
            color: "#111",
            borderRadius: 100,
            padding: "14px 28px",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Home
        </Link>
      </div>
    </div>
  );
}

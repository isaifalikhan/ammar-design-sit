"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import PageHero from "@/components/PageHero";
import GoogleReviews from "@/components/GoogleReviews";
import { STUDENT_WORK_IMAGES } from "@/lib/student-work-images";

/* ─── Courses ────────────────────────────────────────────────────── */
const courses = [
  { id: 1, slug: "digital-calligraphy", label: "Digital Digital Calligraphy", tag: "Recorded", description: "Master the ancient art of Arabic lettering with modern digital tools. Build confidence and professional-grade skills.", fee: "Rs. 5,000", image: "/images/DSC02365.JPG" },
  { id: 2, slug: "graphic-designing", label: "Graphic Designing", tag: "Recorded", description: "Create visually compelling design systems using industry-standard tools. From concept to polished execution.", fee: "Rs. 5,000", image: "/images/DSC02366.JPG" },
  { id: 3, slug: "bilingual-brand-identity", label: "Bilingual Brand Identity", tag: "Live", description: "Craft cohesive brand identities that speak across Arabic and Latin scripts—elegant, strategic, timeless.", fee: "Rs. 5,000", image: "/images/DSC02367.JPG" },
  { id: 4, slug: "print-media-mastery", label: "Print Media Mastery", tag: "Live", description: "Turn ideas into print-ready artwork. Packaging, posters, brochures—designed to leave a lasting impression.", fee: "Rs. 5,000", image: "/images/DSC02368.JPG" },
  { id: 5, slug: "social-media-design", label: "Social Media Design", tag: "Upcoming", description: "Design scroll-stopping visuals and brand-consistent templates for every social platform.", fee: "Rs. 5,000", image: "/images/DSC02369.JPG" },
];

const services = [
  { icon: "/Quill Pen.png", title: "Digital Calligraphy", desc: "Timeless scripts, digitally mastered" },
  { icon: "/Trademark.png", title: "Brand Identity", desc: "Logos, systems & visual language" },
  { icon: "/Art Therapist.png", title: "Social Media", desc: "Scroll-stopping visual content" },
  { icon: "/Shredder.png", title: "Print Media", desc: "From concept to press-ready art" },
  { icon: "/Book.png", title: "Hands-on Learning", desc: "Courses, workshops & mentoring" },
];

const testimonials = [
  { name: "Ahmad Al-Rashid", company: "Al-Noor Mosque", text: "The calligraphy work was beyond anything I imagined. Every letterform had a presence and dignity that perfectly suited our space.", stars: 5 },
  { name: "Fatima Khalid", company: "Halal Bites", text: "Our rebrand transformed customer perception overnight. The team's understanding of Arabic visual culture is genuinely unmatched.", stars: 5 },
  { name: "Yusuf Ibrahim", company: "TechSaudi", text: "Professional, precise, and endlessly creative. The UI work was delivered on time and far exceeded our design expectations.", stars: 5 },
];

/* ─────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [courseIndex, setCourseIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setCourseIndex(p => (p + 1) % courses.length), 5500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>

        <PageHero
          pillText="THE DESIGN INSTITUTE"
          title={<>We Teach<br /><span className="gradient-text">Design.</span></>}
          subtitle="You’ll master the craft."
          description="Ammar Designz Institute empowers the next generation of designers through professional training in digital calligraphy, graphic design, brand identity, and creative tools. Learn the art, master the process, and build a career through practical education guided by industry experience."
          tags={['Graphic Design', 'UI/UX Design', 'Digital Calligraphy', 'Brand Identity','Illustration', 'Print Media','Creative Tools']}
          bgImage="/images/HeroImage.JPG"
          stats={[
            { val: 10000, suf: '+', label: 'Students Trained' },
            { val: 7, suf: '+', label: 'Years of Teaching' },
            { val: 150, suf: '+', label: 'Happy Clients' },
          ]}
          // ctaPrimary={{ text: "Explore Services", href: "/services" }}
          ctaSecondary={{ text: "View Students Work", href: "/student-work" }}
        />

        {/* ══════════════════════════════════════════
            MARQUEE DIVIDER
        ══════════════════════════════════════════ */}
        <div style={{ background: '#7fbf2f', overflow: 'hidden', padding: '14px 0' }}>
          <div className="marquee-track">
            {Array(8).fill(['Design • ', 'Calligraphy • ', 'Branding • ', 'Print • ', 'Learning • ']).flat().map((t, i) => (
              <span key={i} style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '.25em', textTransform: 'uppercase', whiteSpace: 'nowrap', paddingRight: 4 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            STUDENT WORK MARQUEE
        ══════════════════════════════════════════ */}
        <section style={{ background: 'linear-gradient(180deg, #faf9f7 0%, #f5f4f2 100%)', padding: '80px 0 100px', overflow: 'hidden' }}>
          <div className="page-container" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ width: 28, height: 1, background: '#7fbf2f', display: 'block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: '#7fbf2f' }}>From Our Students</span>
                </div>
                <h2 style={{ color: '#111', margin: 0, fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.02em' }}>
                  Student <span className="gradient-text">Work</span>
                </h2>
                <p style={{ fontSize: 14, color: '#666', marginTop: 10, maxWidth: 380 }}>Calligraphy, brand identity, and design projects created at Ammar Designz.</p>
              </div>
              <Link href="/student-work" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#7fbf2f', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                See all work <span style={{ fontSize: 18 }}>→</span>
              </Link>
            </div>
          </div>
          <div className="student-work-marquee-wrap" style={{ overflow: 'hidden', marginTop: 8 }}>
            <div className="student-work-marquee-track" style={{ display: 'flex', gap: 20, width: 'max-content', animation: 'student-work-marquee 90s linear infinite' }}>
              {[...STUDENT_WORK_IMAGES, ...STUDENT_WORK_IMAGES].map((src, i) => (
                <button key={i} type="button" className="card-hover" onClick={() => setLightboxImage(src)} style={{ flexShrink: 0, width: 280, height: 200, borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,.08)', border: '1px solid rgba(0,0,0,.06)', padding: 0, cursor: 'pointer', background: 'none' }}>
                  <img src={src} alt="Student work" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          </div>
          {lightboxImage && (
            <div role="dialog" aria-modal="true" aria-label="View image" style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(0,0,0,.85)', cursor: 'pointer' }} onClick={() => setLightboxImage(null)}>
              <button type="button" onClick={() => setLightboxImage(null)} aria-label="Close" style={{ position: 'absolute', top: 20, right: 20, width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,.15)', color: '#fff', fontSize: 24, cursor: 'pointer', display: 'grid', placeItems: 'center' }}>×</button>
              <img src={lightboxImage} alt="Student work" style={{ maxWidth: '100%', maxHeight: '90vh', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 12, boxShadow: '0 24px 80px rgba(0,0,0,.5)' }} onClick={(e) => e.stopPropagation()} />
            </div>
          )}
          <style>{`
            @keyframes student-work-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .student-work-marquee-wrap:hover .student-work-marquee-track { animation-play-state: paused; }
            @media (max-width: 768px) {
              .student-work-marquee-track div { width: 240px !important; height: 170px !important; }
            }
          `}</style>
        </section>

        {/* ══════════════════════════════════════════
            SERVICES
        ══════════════════════════════════════════ */}
 {/* /**        <section className="home-services-section" style={{ background: '#0d0d0d', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 500, height: 500, background: 'rgba(127,191,47,.07)', top: -100, right: -100 }} />
          <div className="orb" style={{ width: 400, height: 400, background: 'rgba(127,191,47,.05)', bottom: -80, left: -80 }} />

          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}> */}
            {/* Header */}
            {/* <div className="home-services-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72 }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <span style={{ width: 32, height: 1, background: '#7fbf2f', display: 'block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: '#7fbf2f' }}>What We Do</span>
                </div>
                <h2 style={{ color: '#fff' }}>
                  Elevate Your Brand<br /><span className="gradient-text">With Our Craft</span>
                </h2>
              </div>
              <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(255,255,255,.12)', color: '#fff', borderRadius: 100, padding: '12px 24px', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'all .3s' }}>
                All Services <span style={{ color: '#7fbf2f' }}>→</span>
              </Link>
            </div> */}

            {/* Services grid */}
            {/* <div className="home-services-grid" style={{ display: 'grid', gap: 16 }}>
              {services.map((s, i) => (
                <div key={i} className="service-card card-hover" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 24, padding: '32px 24px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, borderRadius: '0 0 0 80px', background: 'rgba(127,191,47,.05)' }} />
                  <div className="svc-icon" style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, rgba(127,191,47,.15), rgba(127,191,47,.05))', border: '1px solid rgba(127,191,47,.2)', display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                    <img src={s.icon} alt={s.title} style={{ width: 26, height: 26, objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ color: '#fff', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                  <div style={{ marginTop: 20, color: '#7fbf2f', fontSize: 18 }}>→</div>
                </div>
              ))}
            </div> */}

            {/* Gallery strip - Infinite Marquee */}
            {/* <div style={{ marginTop: 48, overflow: 'hidden', width: '100%', position: 'relative' }}>
              <div className="marquee-track" style={{ display: 'flex', gap: 16 }}>
                {[...Array(3)].map((_, loopI) => (
                  <div key={loopI} style={{ display: 'flex', gap: 16 }}>
                    {['/images/DSC02371.JPG', '/images/DSC02372.JPG', '/images/DSC02373.JPG', '/images/DSC02374.JPG', '/images/DSC02375.JPG', '/images/DSC02376.JPG'].map((img, i) => (
                      <div key={`${loopI}-${i}`} style={{ borderRadius: 20, overflow: 'hidden', height: 280, width: 360, position: 'relative', flexShrink: 0 }} className="card-hover">
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.4), transparent)' }} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div> */}
          {/* </div>
        </section> */}

        
        {/* ═════════   ═════════════════════════════════
            COURSES
        ══════════════════════════════════════════ */}
        <section className="home-courses-section" style={{ background: '#060606', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 600, height: 600, background: 'rgba(127,191,47,.06)', top: -100, left: '50%', transform: 'translateX(-50%)' }} />

          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div className="home-courses-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72 }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ width: 32, height: 1, background: '#7fbf2f', display: 'block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: '#7fbf2f' }}>Level Up Your Skills</span>
                </div>
                <h2 style={{ color: '#fff' }}>
                  Courses We <span className="gradient-text">Offer</span>
                </h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(255,255,255,.15)', color: '#fff', borderRadius: 100, padding: '12px 24px', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'all .3s', marginRight: 16 }}>
                  View All <span style={{ color: '#7fbf2f' }}>→</span>
                </Link>
                <button onClick={() => setCourseIndex(p => (p - 1 + courses.length) % courses.length)} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,.15)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 18, display: 'grid', placeItems: 'center' }}>←</button>
                <span style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>{courseIndex + 1} / {courses.length}</span>
                <button onClick={() => setCourseIndex(p => (p + 1) % courses.length)} style={{ width: 44, height: 44, borderRadius: '50%', background: '#7fbf2f', border: 'none', color: '#000', cursor: 'pointer', fontSize: 18, display: 'grid', placeItems: 'center', fontWeight: 700 }}>→</button>
              </div>
            </div>

            {/* Carousel */}
            <div className="home-courses-carousel" style={{ position: 'relative', height: 540, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {courses.map((c, idx) => {
                let offset = idx - courseIndex;
                if (offset > courses.length / 2) offset -= courses.length;
                else if (offset < -courses.length / 2) offset += courses.length;

                const abs = Math.abs(offset);
                if (abs > 1) return null;
                const isActive = offset === 0;
                return (
                  <button key={c.id} onClick={() => setCourseIndex(idx)}
                    className="home-course-card"
                    style={{
                      position: 'absolute',
                      width: 380,
                      transform: `translateX(${offset * 105}%) scale(${isActive ? 1 : .88})`,
                      zIndex: isActive ? 10 : 5,
                      filter: isActive ? 'none' : 'blur(.5px)',
                      opacity: isActive ? 1 : .6,
                      transition: 'all .7s cubic-bezier(.23,1,.32,1)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    }}>
                    <div style={{ background: 'linear-gradient(160deg, #181818, #0d0d0d)', borderRadius: 32, overflow: 'hidden', border: isActive ? '1px solid rgba(127,191,47,.4)' : '1px solid rgba(255,255,255,.06)', boxShadow: isActive ? '0 40px 80px rgba(0,0,0,.7), 0 0 60px rgba(127,191,47,.1)' : '0 20px 40px rgba(0,0,0,.4)' }}>
                      <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                        <img src={c.image} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: isActive ? 'scale(1.05)' : 'scale(1)', transition: 'transform .7s ease' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent)' }} />
                        <div style={{ position: 'absolute', top: 16, left: 16, background: c.tag === 'Upcoming' ? 'rgba(0,0,0,.6)' : '#7fbf2f', borderRadius: 100, padding: '5px 14px', fontSize: 10, fontWeight: 700, color: c.tag === 'Upcoming' ? '#888' : '#000', letterSpacing: '.15em', textTransform: 'uppercase' }}>{c.tag}</div>
                      </div>
                      <div style={{ padding: '28px 28px 32px' }}>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7fbf2f', margin: '0 0 10px' }}>Course {idx + 1}</p>
                        <h3 style={{ fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>{c.label}</h3>
                        <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7, margin: '0 0 24px' }}>{c.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 18, fontWeight: 700, color: isActive ? '#7fbf2f' : '#fff' }}>{c.fee}</span>
                          {isActive && (
                            <Link href={`/checkout?course=${c.slug}`} style={{ width: 38, height: 38, borderRadius: '50%', background: '#7fbf2f', display: 'grid', placeItems: 'center', color: '#000', fontSize: 18, fontWeight: 700, textDecoration: 'none' }}>→</Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
              {courses.map((_, i) => (
                <button key={i} onClick={() => setCourseIndex(i)} style={{ height: 8, width: i === courseIndex ? 32 : 8, borderRadius: 100, background: i === courseIndex ? '#7fbf2f' : '#333', border: 'none', cursor: 'pointer', transition: 'all .4s ease', boxShadow: i === courseIndex ? '0 0 16px rgba(127,191,47,.5)' : 'none', padding: 0 }} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════ */}
        <section className="home-testimonials-section" style={{ background: '#faf9f7', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 500, height: 500, background: 'rgba(127,191,47,.05)', top: 50, left: -100 }} />
          
          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: 'center' }}>
                <span style={{ width: 24, height: 1, background: '#7fbf2f', display: 'block' }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: '#7fbf2f' }}>Client Stories</span>
                <span style={{ width: 24, height: 1, background: '#7fbf2f', display: 'block' }} />
              </div>
              <h2 style={{ color: '#111' }}>
                Trusted by <span className="gradient-text">Visionaries</span>
              </h2>
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card card-hover" style={{ background: "#fff", border: "1px solid rgba(0,0,0,.06)", borderRadius: 28, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,.04)", transition: "all .3s" }}>
                  <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
                    {Array(t.stars).fill(null).map((_, si) => <span key={si} style={{ color: "#7fbf2f", fontSize: 16 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 20, fontStyle: "italic", color: "#333", lineHeight: 1.6, margin: "0 0 28px" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#7fbf2f,#a8e04a)", display: "grid", placeItems: "center", fontSize: 18, fontWeight: 700, color: "#fff" }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: 0 }}>{t.name}</p>
                      <p style={{ fontSize: 12, color: "#999", margin: 0 }}>{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            GOOGLE REVIEWS
        ══════════════════════════════════════════ */}
        <GoogleReviews />

        {/* ══════════════════════════════════════════
            CONTACT / QUOTE
        ══════════════════════════════════════════ */}
        {/* <section className="home-contact-section" style={{ background: '#faf9f7', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 500, height: 500, background: 'rgba(127,191,47,.07)', top: -50, right: -100 }} />

          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="home-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, background: '#fff', borderRadius: 48, overflow: 'hidden', boxShadow: '0 8px 60px rgba(0,0,0,.08)', border: '1px solid rgba(0,0,0,.04)' }}> */}
              {/* Left Form */}
              {/* <div style={{ padding: '64px 56px' }}>
                <div style={{ marginBottom: 48 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{ width: 24, height: 1, background: '#7fbf2f', display: 'block' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.25em', textTransform: 'uppercase', color: '#7fbf2f' }}>Get In Touch</span>
                  </div>
                  <h2 style={{ color: '#111', marginBottom: 16 }}>
                    Let's Build Something<br /><span className="gradient-text">Remarkable</span>
                  </h2>
                  <p style={{ fontSize: 15, color: '#777', lineHeight: 1.8, margin: 0 }}>Share your vision and we'll respond with a clear plan, recommended scope, and transparent pricing.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="home-contact-form-row" style={{ display: 'grid', gap: 16 }}>
                    {['Full name', 'Email address'].map(ph => (
                      <input key={ph} type={ph.includes('Email') ? 'email' : 'text'} placeholder={ph} style={{ height: 52, borderRadius: 14, border: '1.5px solid #e8e8e8', background: '#fafafa', padding: '0 18px', fontSize: 14, color: '#111', transition: 'all .25s' }} />
                    ))}
                  </div>
                  <input type="text" placeholder="Phone number (optional)" style={{ height: 52, borderRadius: 14, border: '1.5px solid #e8e8e8', background: '#fafafa', padding: '0 18px', fontSize: 14, color: '#111', transition: 'all .25s' }} />
                  <select style={{ height: 52, borderRadius: 14, border: '1.5px solid #e8e8e8', background: '#fafafa', padding: '0 18px', fontSize: 14, color: '#555', transition: 'all .25s', appearance: 'none' }}>
                    <option value="">Select service</option>
                    {services.map(s => <option key={s.title}>{s.title}</option>)}
                  </select>
                  <textarea rows={4} placeholder="Tell us about your project..." style={{ borderRadius: 14, border: '1.5px solid #e8e8e8', background: '#fafafa', padding: '16px 18px', fontSize: 14, color: '#111', resize: 'vertical', transition: 'all .25s', fontFamily: 'inherit' }} />
                  <button type="button" className="pulse-cta" style={{ height: 56, borderRadius: 100, background: '#1a1a1a', color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '.04em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, transition: 'background .3s' }}>
                    Send Your Request
                    <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#7fbf2f', display: 'grid', placeItems: 'center', fontSize: 16 }}>→</span>
                  </button>
                </div>
              </div> */}

              {/* Right Image + overlay info */}
              {/* <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src="/images/DSC02370.JPG" alt="Studio" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.2) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 40px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(127,191,47,.9)', margin: '0 0 12px' }}>Contact Details</p>
                  <h3 style={{ color: '#fff', marginBottom: 24 }}>Ammar Designz<br />Creative Studio</h3>
                  {[
                    { icon: '📍', text: 'Rawalpindi, Punjab, Pakistan' },
                    { icon: '📧', text: 'hello@ammardesignz.com' },
                    { icon: '📱', text: '+92 300 0000000' },
                  ].map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <span style={{ fontSize: 16 }}>{c.icon}</span>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,.8)' }}>{c.text}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            {/* </div>
          </div>
        </section> */}

      </div>
    </>
  );
}

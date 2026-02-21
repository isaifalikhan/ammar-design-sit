"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── CountUp ────────────────────────────────────────────────────── */
type CountUpProps = { end: number; duration?: number; suffix?: string };
function CountUp({ end, duration = 1400, suffix = "" }: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setValue(Math.round(p * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [duration, end]);
  return <span ref={ref}>{value}{suffix}</span>;
}

/* ─── Courses ────────────────────────────────────────────────────── */
const courses = [
  { id: 1, label: "Digital Arabic Calligraphy", tag: "Recorded", description: "Master the ancient art of Arabic lettering with modern digital tools. Build confidence and professional-grade skills.", fee: "Rs. 5,000", image: "/course1.png" },
  { id: 2, label: "Graphic Designing", tag: "Recorded", description: "Create visually compelling design systems using industry-standard tools. From concept to polished execution.", fee: "Rs. 5,000", image: "/course2.png" },
  { id: 3, label: "Bilingual Brand Identity", tag: "Live", description: "Craft cohesive brand identities that speak across Arabic and Latin scripts—elegant, strategic, timeless.", fee: "Rs. 5,000", image: "/course3.png" },
  { id: 4, label: "Print Media Mastery", tag: "Live", description: "Turn ideas into print-ready artwork. Packaging, posters, brochures—designed to leave a lasting impression.", fee: "Rs. 5,000", image: "/course3.png" },
  { id: 5, label: "Social Media Design", tag: "Upcoming", description: "Design scroll-stopping visuals and brand-consistent templates for every social platform.", fee: "Rs. 5,000", image: "/course3.png" },
];

const team = [
  { name: "Muhammad Ahmed", role: "Studio Manager" },
  { name: "Abu Bakar", role: "Graphic Designer" },
  { name: "Umar Farooq", role: "Video Editor" },
  { name: "Usman Ghani", role: "Graphic Designer" },
];

const services = [
  { icon: "/Quill Pen.png", title: "Arabic Calligraphy", desc: "Timeless scripts, digitally mastered" },
  { icon: "/Trademark.png", title: "Brand Identity", desc: "Logos, systems & visual language" },
  { icon: "/Art Therapist.png", title: "Social Media", desc: "Scroll-stopping visual content" },
  { icon: "/Shredder.png", title: "Print Media", desc: "From concept to press-ready art" },
  { icon: "/Book.png", title: "Hands-on Learning", desc: "Courses, workshops & mentoring" },
];

/* ─────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [courseIndex, setCourseIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: #faf9f7; color: #1a1a1a; margin: 0; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

        @keyframes fadeUp   { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
        @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float    { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes shimmer  { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes rotate   { to { transform: rotate(360deg); } }
        @keyframes marquee  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(127,191,47,.35); } 70% { box-shadow: 0 0 0 18px rgba(127,191,47,0); } 100% { box-shadow: 0 0 0 0 rgba(127,191,47,0); } }

        .anim-fade-up    { animation: fadeUp .9s cubic-bezier(.23,1,.32,1) both; }
        .anim-fade-in    { animation: fadeIn 1s ease both; }
        .delay-1 { animation-delay: .15s; } .delay-2 { animation-delay: .3s; } .delay-3 { animation-delay: .45s; } .delay-4 { animation-delay: .6s; }

        .hero-grain::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: .5;
        }

        .gradient-text {
          background: linear-gradient(135deg, #7fbf2f 0%, #a8e04a 50%, #5a9c1a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .card-hover { transition: transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 30px 60px rgba(0,0,0,.12); }

        .orb { border-radius: 50%; filter: blur(60px); position: absolute; pointer-events: none; }

        .marquee-track { display: flex; gap: 0; animation: marquee 28s linear infinite; width: max-content; }
        .marquee-wrap { overflow: hidden; }

        .float { animation: float 6s ease-in-out infinite; }
        .pulse-cta { animation: pulse-ring 2.5s ease-out infinite; }

        .service-card:hover .svc-icon { transform: scale(1.15) rotate(-5deg); }
        .svc-icon { transition: transform .4s cubic-bezier(.23,1,.32,1); }

        .line-accent::after { content: ''; display: block; margin-top: 14px; height: 2px; width: 48px; background: #7fbf2f; border-radius: 2px; }

        input, textarea { outline: none; }
        input:focus, textarea:focus { border-color: #7fbf2f !important; box-shadow: 0 0 0 3px rgba(127,191,47,.12); }

        .team-card:hover img { filter: grayscale(0) !important; transform: scale(1.05); }
        .team-card img { transition: all .5s ease; filter: grayscale(1); }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="hero-grain" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #fdfcfa 0%, #f4f9ec 50%, #fdfcfa 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          {/* Background orbs */}
          <div className="orb" style={{ width: 600, height: 600, background: 'rgba(127,191,47,.08)', top: -100, right: -150 }} />
          <div className="orb" style={{ width: 400, height: 400, background: 'rgba(127,191,47,.05)', bottom: -80, left: -80 }} />

          {/* Decorative ring */}
          <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', width: 520, height: 520, borderRadius: '50%', border: '1px dashed rgba(127,191,47,.2)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: '6.5%', top: '50%', transform: 'translateY(-50%)', width: 480, height: 480, borderRadius: '50%', border: '1px solid rgba(127,191,47,.08)', pointerEvents: 'none' }} />

          <div className="page-container" style={{ position: 'relative', zIndex: 2, width: '100%', padding: '80px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Pill badge */}
              <div className="anim-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(127,191,47,.1)', border: '1px solid rgba(127,191,47,.25)', borderRadius: 100, padding: '6px 16px', width: 'fit-content' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7fbf2f', boxShadow: '0 0 10px #7fbf2f', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#5a9c1a' }}>Rawalpindi's Creative Studio</span>
              </div>

              {/* Headline */}
              <div className="anim-fade-up delay-1">
                <h1 className="serif" style={{ fontSize: 76, fontWeight: 700, lineHeight: 1, margin: 0, color: '#111' }}>
                  We Speak<br />
                  <span className="gradient-text">Design.</span>
                </h1>
                <p style={{ fontSize: 22, fontWeight: 300, color: '#555', marginTop: 12, fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif' }}>
                  You'll love the translation.
                </p>
              </div>

              <p className="anim-fade-up delay-2" style={{ fontSize: 15, lineHeight: 1.8, color: '#666', maxWidth: 480, margin: 0 }}>
                Ammar Designz brings ideas to life through expert calligraphy, brand identity, editorial design, and print production — crafted with intention and delivered with precision.
              </p>

              {/* Tags */}
              <div className="anim-fade-up delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Graphic Design', 'UI/UX', 'Arabic Calligraphy', 'Brand Identity', 'Print Media'].map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 500, color: '#666', background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.08)', borderRadius: 100, padding: '5px 14px', letterSpacing: '.04em' }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="anim-fade-up delay-4" style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 8 }}>
                <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: '#1a1a1a', color: '#fff', borderRadius: 100, padding: '14px 28px', fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '.02em', boxShadow: '0 20px 50px rgba(0,0,0,.2)', transition: 'all .3s' }}>
                  Explore Services
                  <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#7fbf2f', display: 'grid', placeItems: 'center', fontSize: 16 }}>→</span>
                </Link>
                <Link href="/portfolio" style={{ fontSize: 14, fontWeight: 500, color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #ccc', display: 'grid', placeItems: 'center', fontSize: 14 }}>▶</span>
                  View Work
                </Link>
              </div>

              {/* Stats */}
              <div className="anim-fade-up delay-4" style={{ display: 'flex', gap: 48, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(0,0,0,.08)' }}>
                {[
                  { val: 200, suf: '+', label: 'Projects Done' },
                  { val: 5, suf: '+', label: 'Years of Craft' },
                  { val: 150, suf: '+', label: 'Happy Clients' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="serif" style={{ fontSize: 40, fontWeight: 700, color: '#111', margin: 0, lineHeight: 1 }}>
                      <CountUp end={s.val} suffix={s.suf} />
                    </p>
                    <p style={{ fontSize: 12, color: '#999', margin: '4px 0 0', letterSpacing: '.05em', textTransform: 'uppercase' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — floating image */}
            <div className="anim-fade-in delay-2" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div className="float" style={{ position: 'relative', width: 480 }}>
                {/* Main image with elegant mask */}
                <div style={{ borderRadius: '60% 40% 55% 45% / 50% 45% 55% 50%', overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,.18), 0 0 0 1px rgba(127,191,47,.15)' }}>
                  <img src="/hero-home.png" alt="Ammar Designz Studio" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                </div>
                {/* Floating badge */}
                <div style={{ position: 'absolute', bottom: 30, left: -40, background: '#fff', borderRadius: 20, padding: '14px 20px', boxShadow: '0 20px 50px rgba(0,0,0,.14)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #7fbf2f, #a8e04a)', display: 'grid', placeItems: 'center' }}>
                    <span style={{ fontSize: 20 }}>✦</span>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#111' }}>Est. 2019</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#888' }}>Premium Studio</p>
                  </div>
                </div>
                {/* Second floating badge */}
                <div style={{ position: 'absolute', top: 20, right: -30, background: '#1a1a1a', borderRadius: 16, padding: '12px 18px', boxShadow: '0 16px 40px rgba(0,0,0,.3)' }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#7fbf2f', letterSpacing: '.1em', textTransform: 'uppercase' }}>5★ Rated</p>
                  <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#7fbf2f', fontSize: 11 }}>★</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
            SERVICES
        ══════════════════════════════════════════ */}
        <section style={{ background: '#0d0d0d', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 500, height: 500, background: 'rgba(127,191,47,.07)', top: -100, right: -100 }} />
          <div className="orb" style={{ width: 400, height: 400, background: 'rgba(127,191,47,.05)', bottom: -80, left: -80 }} />

          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72 }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <span style={{ width: 32, height: 1, background: '#7fbf2f', display: 'block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: '#7fbf2f' }}>What We Do</span>
                </div>
                <h2 className="serif" style={{ fontSize: 56, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.05 }}>
                  Elevate Your Brand<br /><span className="gradient-text">With Our Craft</span>
                </h2>
              </div>
              <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(255,255,255,.12)', color: '#fff', borderRadius: 100, padding: '12px 24px', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'all .3s' }}>
                All Services <span style={{ color: '#7fbf2f' }}>→</span>
              </Link>
            </div>

            {/* Services grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
              {services.map((s, i) => (
                <div key={i} className="service-card card-hover" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 24, padding: '32px 24px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, borderRadius: '0 0 0 80px', background: 'rgba(127,191,47,.05)' }} />
                  <div className="svc-icon" style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, rgba(127,191,47,.15), rgba(127,191,47,.05))', border: '1px solid rgba(127,191,47,.2)', display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                    <img src={s.icon} alt={s.title} style={{ width: 26, height: 26, objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                  <div style={{ marginTop: 20, color: '#7fbf2f', fontSize: 18 }}>→</div>
                </div>
              ))}
            </div>

            {/* Gallery strip */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr 0.9fr', gap: 16, marginTop: 24 }}>
              {['/Mask group.png', '/Mask group (1).png', '/Mask group (2).png', '/design_ (4) 1.png'].map((img, i) => (
                <div key={i} style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: i === 0 ? '4/3' : i === 2 ? '4/3' : '1', position: 'relative' }} className="card-hover">
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.4), transparent)' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WHO WE ARE — CEO + Team
        ══════════════════════════════════════════ */}
        <section style={{ background: '#faf9f7', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 500, height: 500, background: 'rgba(127,191,47,.06)', top: 50, left: -150 }} />

          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ width: 24, height: 1, background: '#7fbf2f', display: 'block' }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: '#7fbf2f' }}>The Minds Behind The Magic</span>
                <span style={{ width: 24, height: 1, background: '#7fbf2f', display: 'block' }} />
              </div>
              <h2 className="serif" style={{ fontSize: 56, fontWeight: 700, color: '#111', margin: 0, lineHeight: 1.1 }}>
                A Studio United<br />by <span className="gradient-text">Purpose & Art</span>
              </h2>
            </div>

            {/* CEO */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 64, alignItems: 'center', marginBottom: 80, background: '#fff', borderRadius: 40, padding: '56px 64px', boxShadow: '0 4px 40px rgba(0,0,0,.06)', border: '1px solid rgba(0,0,0,.04)' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: '50% 40% 50% 40% / 40% 50% 40% 50%', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,.15)' }}>
                  <img src="/member.png" alt="Hafiz Muhammad Ammar" style={{ width: '100%', display: 'block', filter: 'grayscale(30%)' }} />
                </div>
                <div style={{ position: 'absolute', bottom: -16, right: -24, background: '#7fbf2f', borderRadius: 16, padding: '14px 20px' }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '.12em' }}>Founder & CEO</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.25em', textTransform: 'uppercase', color: '#7fbf2f', margin: '0 0 12px' }}>Creative Director</p>
                  <h3 className="serif" style={{ fontSize: 44, fontWeight: 700, color: '#111', margin: 0, lineHeight: 1.1 }}>Hafiz Muhammad Ammar</h3>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: '#666', margin: 0 }}>
                  Leading the creative direction of Ammar Designz with a deep passion for Arabic calligraphy and brand storytelling. Every project is treated as an opportunity to translate vision into visual artistry — precise, purposeful, and memorable.
                </p>
                <blockquote className="serif" style={{ fontSize: 22, fontStyle: 'italic', color: '#444', margin: 0, paddingLeft: 24, borderLeft: '3px solid #7fbf2f', lineHeight: 1.5 }}>
                  "Design is the silent ambassador of your brand."
                </blockquote>
              </div>
            </div>

            {/* Team */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {team.map((m, i) => (
                <div key={i} className="team-card card-hover" style={{ background: '#fff', borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(0,0,0,.05)', cursor: 'pointer' }}>
                  <div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative' }}>
                    <img src="/member.png" alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 50%)', opacity: 0, transition: 'opacity .4s' }} className="overlay" />
                  </div>
                  <div style={{ padding: '20px 24px' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7fbf2f', margin: '0 0 6px' }}>{m.role}</p>
                    <h4 style={{ fontSize: 17, fontWeight: 600, color: '#111', margin: 0 }}>{m.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            COURSES
        ══════════════════════════════════════════ */}
        <section style={{ background: '#060606', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 600, height: 600, background: 'rgba(127,191,47,.06)', top: -100, left: '50%', transform: 'translateX(-50%)' }} />

          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72 }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ width: 32, height: 1, background: '#7fbf2f', display: 'block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: '#7fbf2f' }}>Level Up Your Skills</span>
                </div>
                <h2 className="serif" style={{ fontSize: 56, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.05 }}>
                  Courses We <span className="gradient-text">Offer</span>
                </h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setCourseIndex(p => (p - 1 + courses.length) % courses.length)} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,.15)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 18, display: 'grid', placeItems: 'center' }}>←</button>
                <span style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>{courseIndex + 1} / {courses.length}</span>
                <button onClick={() => setCourseIndex(p => (p + 1) % courses.length)} style={{ width: 44, height: 44, borderRadius: '50%', background: '#7fbf2f', border: 'none', color: '#000', cursor: 'pointer', fontSize: 18, display: 'grid', placeItems: 'center', fontWeight: 700 }}>→</button>
              </div>
            </div>

            {/* Carousel */}
            <div style={{ position: 'relative', height: 540, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {courses.map((c, idx) => {
                const offset = idx - courseIndex;
                const abs = Math.abs(offset);
                if (abs > 1) return null;
                const isActive = offset === 0;
                return (
                  <button key={c.id} onClick={() => setCourseIndex(idx)}
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
                        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>{c.label}</h3>
                        <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7, margin: '0 0 24px' }}>{c.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 18, fontWeight: 700, color: isActive ? '#7fbf2f' : '#fff' }}>{c.fee}</span>
                          {isActive && (
                            <span style={{ width: 38, height: 38, borderRadius: '50%', background: '#7fbf2f', display: 'grid', placeItems: 'center', color: '#000', fontSize: 18, fontWeight: 700 }}>→</span>
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
            CONTACT / QUOTE
        ══════════════════════════════════════════ */}
        <section style={{ background: '#faf9f7', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 500, height: 500, background: 'rgba(127,191,47,.07)', top: -50, right: -100 }} />

          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, background: '#fff', borderRadius: 48, overflow: 'hidden', boxShadow: '0 8px 60px rgba(0,0,0,.08)', border: '1px solid rgba(0,0,0,.04)' }}>
              {/* Left — Form */}
              <div style={{ padding: '64px 56px' }}>
                <div style={{ marginBottom: 48 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{ width: 24, height: 1, background: '#7fbf2f', display: 'block' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.25em', textTransform: 'uppercase', color: '#7fbf2f' }}>Get In Touch</span>
                  </div>
                  <h2 className="serif" style={{ fontSize: 48, fontWeight: 700, color: '#111', margin: '0 0 16px', lineHeight: 1.1 }}>
                    Let's Build Something<br /><span className="gradient-text">Remarkable</span>
                  </h2>
                  <p style={{ fontSize: 15, color: '#777', lineHeight: 1.8, margin: 0 }}>Share your vision and we'll respond with a clear plan, recommended scope, and transparent pricing.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
              </div>

              {/* Right — Image + overlay info */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src="/hero-home.png" alt="Studio" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.2) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 40px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(127,191,47,.9)', margin: '0 0 12px' }}>Contact Details</p>
                  <h3 className="serif" style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 24px', lineHeight: 1.2 }}>Ammar Designz<br />Creative Studio</h3>
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
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

"use client";

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

interface PageHeroProps {
  pillText?: string;
  title: React.ReactNode;
  subtitle?: string;
  description?: string;
  tags?: string[];
  imageSrc?: string;
  bgImage?: string;
  stats?: { val: number; suf: string; label: string }[];
  ctaPrimary?: { text: string; href?: string; onClick?: () => void };
  ctaSecondary?: { text: string; href?: string; onClick?: () => void };
}

export default function PageHero({
  pillText = "THE DESIGN INSTITUTE",
  title,
  subtitle,
  description,
  tags,
  imageSrc = "/images/DSC02340.JPG",
  bgImage,
  stats,
  ctaPrimary,
  ctaSecondary = { text: "View Students Work", href: "/student-work" }
}: PageHeroProps) {
  const hasBg = !!bgImage;
  const textColor = hasBg ? '#fff' : '#111';
  const subTextColor = hasBg ? 'rgba(255,255,255,0.9)' : '#555';
  const descColor = hasBg ? 'rgba(255,255,255,0.8)' : '#666';

  const renderCta = (cta: { text: string; href?: string; onClick?: () => void }, isPrimary: boolean) => {
    const style = isPrimary
      ? { display: 'inline-flex', alignItems: 'center', gap: 14, background: '#1a1a1a', color: '#fff', borderRadius: 100, padding: '14px 28px', fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '.02em', boxShadow: '0 20px 50px rgba(0,0,0,.2)', transition: 'all .3s', border: 'none', cursor: 'pointer' }
      : { fontSize: 14, fontWeight: 500, color: hasBg ? '#fff' : '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 };

    const content = (
      <>
        {isPrimary ? (
          <>
            {cta.text}
            <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#7fbf2f', display: 'grid', placeItems: 'center', fontSize: 16 }}>→</span>
          </>
        ) : (
          <>
            <span style={{ width: 32, height: 32, borderRadius: '50%', border: hasBg ? '1.5px solid #fff' : '1.5px solid #ccc', display: 'grid', placeItems: 'center', fontSize: 14 }}>▶</span>
            {cta.text}
          </>
        )}
      </>
    );

    if (cta.onClick) {
      return (
        <button onClick={cta.onClick} style={style}>
          {content}
        </button>
      );
    }

    return (
      <Link href={cta.href || "#"} style={style}>
        {content}
      </Link>
    );
  };

  return (
    <section className="hero-grain home-hero-section" style={{ 
      marginTop: '60px', 
      position: 'relative', 
      overflow: 'hidden', 
      background: hasBg ? `url("${bgImage}") center/cover no-repeat` : 'linear-gradient(160deg, #fdfcfa 0%, #f4f9ec 50%, #fdfcfa 100%)', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center' 
    }}>
      {hasBg && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.88) 26%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,0.18) 66%, rgba(0,0,0,0) 78%)',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '42%',
              backdropFilter: 'blur(1.5px)',
              WebkitBackdropFilter: 'blur(1.5px)',
              background: 'linear-gradient(90deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0) 100%)',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />
        </>
      )}

      {/* Background orbs */}
      {!hasBg && (
        <>
          <div className="orb" style={{ width: 600, height: 600, background: 'rgba(127,191,47,.08)', top: -100, right: -150 }} />
          <div className="orb" style={{ width: 400, height: 400, background: 'rgba(127,191,47,.05)', bottom: -80, left: -80 }} />
        </>
      )}

      {/* Decorative ring */}
      {!hasBg && (
        <>
          <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', width: 520, height: 520, borderRadius: '50%', border: '1px dashed rgba(127,191,47,.2)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: '6.5%', top: '50%', transform: 'translateY(-50%)', width: 480, height: 480, borderRadius: '50%', border: '1px solid rgba(127,191,47,.08)', pointerEvents: 'none' }} />
        </>
      )}

      <div className="page-container home-hero-grid" style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '100%', 
        padding: '80px 48px', 
        // display: 'grid' is handled by class home-hero-grid
        // gap: 64 is handled by class home-hero-grid
      }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: hasBg ? 600 : undefined }}>
          {/* Pill badge */}
          {pillText && (
            <div className="anim-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(127,191,47,.1)', border: '1px solid rgba(127,191,47,.25)', borderRadius: 100, padding: '6px 16px', width: 'fit-content' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7fbf2f', boxShadow: '0 0 10px #7fbf2f', display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#5a9c1a' }}>{pillText}</span>
            </div>
          )}

          {/* Headline */}
          <div className="anim-fade-up delay-1">
            <h1 className="home-hero-title" style={{ color: textColor, lineHeight: 0.9 }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: 22, fontWeight: 300, color: subTextColor, marginTop: 12, lineHeight: 1.1 }}>
                {subtitle}
              </p>
            )}
          </div>

          {description && (
            <p className="anim-fade-up delay-2" style={{ fontSize: 15, lineHeight: 1.8, color: descColor, maxWidth: 480, margin: 0 }}>
              {description}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="anim-fade-up delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tags.map(t => (
                <span key={t} style={{ fontSize: 11, fontWeight: 500, color: hasBg ? '#fff' : '#666', background: hasBg ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.04)', border: hasBg ? '1px solid rgba(255,255,255,.2)' : '1px solid rgba(0,0,0,.08)', borderRadius: 100, padding: '5px 14px', letterSpacing: '.04em' }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="anim-fade-up delay-4" style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 8 }}>
            {ctaPrimary && renderCta(ctaPrimary, true)}
            {ctaSecondary && renderCta(ctaSecondary, false)}
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="anim-fade-up delay-4 home-hero-stats" style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginTop: 24, paddingTop: 24, borderTop: hasBg ? '1px solid rgba(255,255,255,.2)' : '1px solid rgba(0,0,0,.08)' }}>
              {stats.map(s => (
                <div key={s.label}>
                  <p style={{ fontSize: 40, fontWeight: 700, color: textColor, margin: 0, lineHeight: 1 }}>
                    <CountUp end={s.val} suffix={s.suf} />
                  </p>
                  <p style={{ fontSize: 12, color: subTextColor, margin: '4px 0 0', letterSpacing: '.05em', textTransform: 'uppercase' }}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT floating image (Only if no background image) */}
        {!hasBg && (
          <div className="anim-fade-in delay-2" style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div className="float home-hero-image" style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
              {/* Main image with elegant mask */}
              <div className="hero-img-inner" style={{ width: '100%', aspectRatio: '0.8', borderRadius: 32, overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,.18), 0 0 0 1px rgba(127,191,47,.15)' }}>
                <img src={imageSrc} alt="Hero" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
              </div>
              {/* Floating badge */}
              <div className="hero-badge-1" style={{ position: 'absolute', bottom: 30, left: -20, background: '#fff', borderRadius: 20, padding: '14px 20px', boxShadow: '0 20px 50px rgba(0,0,0,.14)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #7fbf2f, #a8e04a)', display: 'grid', placeItems: 'center' }}>
                  <span style={{ fontSize: 20 }}>✦</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#111' }}>Est. 2019</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#888' }}>Premium Studio</p>
                </div>
              </div>
              {/* Second floating badge */}
              <div className="hero-badge-2" style={{ position: 'absolute', top: 20, right: -10, background: '#1a1a1a', borderRadius: 16, padding: '12px 18px', boxShadow: '0 16px 40px rgba(0,0,0,.3)' }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#7fbf2f', letterSpacing: '.1em', textTransform: 'uppercase' }}>5★ Rated</p>
                <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#7fbf2f', fontSize: 11 }}>★</span>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

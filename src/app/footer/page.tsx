"use client";

import Image from "next/image";
import Link from "next/link";

const links = {
  Studio: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Testimonials", href: "/testimonials" },
  ],
  Services: [
    { label: "Arabic Calligraphy", href: "/services" },
    { label: "Brand Identity", href: "/services" },
    { label: "Social Media Design", href: "/services" },
    { label: "Print Media", href: "/services" },
  ],
  Learning: [
    { label: "Courses", href: "/courses" },
    { label: "Workshops", href: "/workshops" },
    { label: "Mentoring", href: "/mentoring" },
    { label: "Enroll Now", href: "/enroll" },
  ],
};

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.121 1.533 5.855L.054 23.5l5.82-1.527A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.52-5.17-1.426l-.37-.22-3.457.907.922-3.368-.24-.386A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.5v2.1C.7 16 1 18 1 18s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 22.2 12 22.2 12 22.2s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.4v-2.1C23.3 9.2 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          position: relative;
          color: #888;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 14px;
          text-decoration: none;
          transition: color .25s;
          display: inline-block;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #7fbf2f;
          transition: width .3s cubic-bezier(.23,1,.32,1);
        }
        .footer-link:hover { color: #7fbf2f; }
        .footer-link:hover::after { width: 100%; }

        .social-btn {
          width: 40px; height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.04);
          display: grid; place-items: center;
          color: #777;
          text-decoration: none;
          transition: all .3s cubic-bezier(.23,1,.32,1);
        }
        .social-btn:hover {
          background: #7fbf2f;
          border-color: #7fbf2f;
          color: #000;
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(127,191,47,.35);
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gradient-text-footer {
          background: linear-gradient(135deg, #7fbf2f 0%, #a8e04a 50%, #5a9c1a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .tag-pill {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .06em;
          color: #555;
          background: rgba(127,191,47,.07);
          border: 1px solid rgba(127,191,47,.14);
          border-radius: 100px;
          padding: 5px 14px;
          transition: all .25s;
          cursor: default;
        }
        .tag-pill:hover {
          background: rgba(127,191,47,.15);
          color: #7fbf2f;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 48px;
        }

        .footer-padding {
          padding: 64px 48px 40px;
        }

        .cta-padding {
          padding: 72px 48px;
        }

        .divider-padding {
          padding: 0 48px;
        }

        .footer-bottom-padding {
          padding: 24px 48px;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .footer-padding {
            padding: 56px 32px 32px;
          }
          .cta-padding {
            padding: 56px 32px;
          }
          .divider-padding {
            padding: 0 32px;
          }
          .footer-bottom-padding {
            padding: 24px 32px;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-padding {
            padding: 48px 24px 24px;
          }
          .cta-padding {
            padding: 48px 24px;
          }
          .divider-padding {
            padding: 0 24px;
          }
          .footer-bottom-padding {
            padding: 24px 24px;
          }
        }

        @media (max-width: 480px) {
          .footer-padding {
            padding: 40px 20px 20px;
          }
          .cta-padding {
            padding: 40px 20px;
          }
          .divider-padding {
            padding: 0 20px;
          }
          .footer-bottom-padding {
            padding: 24px 20px;
          }
        }
      `}</style>

      <footer style={{ background: '#0a0a0a', color: '#fff', position: 'relative', overflow: 'hidden' }}>

        {/* ── Top glow orbs ── */}
        <div style={{ position: 'absolute', top: -80, left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(127,191,47,.05)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '10%', width: 320, height: 320, borderRadius: '50%', background: 'rgba(127,191,47,.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        {/* ── CTA Banner ── */}
        <div className="cta-padding" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 560 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: '#7fbf2f', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 1, background: '#7fbf2f', display: 'inline-block' }} />
                Ready to Start?
              </p>
              <h2 className="h2" style={{ fontWeight: 700, margin: 0, lineHeight: 1.05, color: '#fff' }}>
                  Let's Create Something<br />
                  <span className="gradient-text-footer">Truly Unforgettable.</span>
                </h2>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#7fbf2f', color: '#000', borderRadius: 100, padding: '14px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '.02em', boxShadow: '0 14px 40px rgba(127,191,47,.35)', transition: 'all .3s' }}>
                Get a Free Quote
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,.15)', display: 'grid', placeItems: 'center', fontSize: 15 }}>→</span>
              </Link>
              <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(255,255,255,.14)', color: '#fff', borderRadius: 100, padding: '14px 28px', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'all .3s' }}>
                View Portfolio
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main Footer Body ── */}
        <div className="page-container footer-padding">
          <div className="footer-grid">

            {/* Brand Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Logo / Name */}
              <div>
                <h3 style={{ color: '#fff', letterSpacing: '.02em' }}>
                  Ammar <span className="gradient-text-footer">Designz</span>
                </h3>
                <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', margin: '4px 0 0' }}>Creative Studio</p>
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.85, color: '#666', margin: 0, maxWidth: 300 }}>
                A creative studio specialising in Arabic calligraphy, brand identity, graphic design, print production, and hands-on design education.
              </p>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '📍', text: 'The Studio, Creative Hub' },
                  { icon: '✉️', text: 'hello@ammardesignz.com' },
                  { icon: '📱', text: '+92 300 0000000' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 14 }}>{c.icon}</span>
                    <span style={{ fontSize: 13, color: '#666' }}>{c.text}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ display: 'flex', gap: 10 }}>
                {socials.map(s => (
                  <a key={s.label} href={s.href} className="social-btn" aria-label={s.label}>{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(links).map(([heading, items]) => (
              <div key={heading} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#fff', margin: '0 0 24px' }}>{heading}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {items.map(item => (
                    <Link key={item.label} href={item.href} className="footer-link">{item.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="page-container divider-padding">
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,.08) 20%, rgba(255,255,255,.08) 80%, transparent)' }} />
        </div>

        {/* ── Bottom Bar ── */}
        <div className="page-container footer-bottom-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 13, color: '#555', margin: 0 }}>
            © {new Date().getFullYear()} Ammar Designz Creative Studio. All rights reserved.
          </p>

          {/* Hashtag pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['#Graphic_Design', '#UI_UX_Design', '#Arabic_Calligraphy', '#Brand_Designing', '#Digital_Printing'].map(t => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use'].map(l => (
              <Link key={l} href="#" style={{ fontSize: 13, color: '#555', textDecoration: 'none', transition: 'color .25s' }} onMouseEnter={e => (e.currentTarget.style.color = '#7fbf2f')} onMouseLeave={e => (e.currentTarget.style.color = '#555')}>{l}</Link>
            ))}
          </div>
        </div>

        {/* ── Large Watermark Text ── */}
        <div style={{ textAlign: 'center', paddingBottom: 0, overflow: 'hidden', lineHeight: 0.85 }}>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 'clamp(60px, 10vw, 140px)', fontWeight: 700, color: 'rgba(255,255,255,.025)', margin: 0, letterSpacing: '-.02em', userSelect: 'none', pointerEvents: 'none' }}>
            AMMAR DESIGNZ
          </p>
        </div>

      </footer>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Services",  href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Career",    href: "/career" },
  { label: "Contact",   href: "/contact" },
  { label: "Institute", href: "/institute", highlight: true },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [hovered,    setHovered]    = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef  = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* sliding indicator */
  useEffect(() => {
    const key = hovered ?? pathname;
    const el  = linkRefs.current[key];
    const nav = navRef.current;
    if (!el || !nav) { setIndicatorStyle(s => ({ ...s, opacity: 0 })); return; }
    const navRect = nav.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    setIndicatorStyle({
      left:    elRect.left - navRect.left,
      width:   elRect.width,
      opacity: 1,
    });
  }, [hovered, pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --green: #7fbf2f;
          --green-dark: #5a9c1a;
          --black: #0a0a0a;
          --white: #fdfcfa;
        }

        .navbar-root * { box-sizing: border-box; }

        /* ── Wrapper ── */
        .navbar-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          padding: 0 32px;
          transition: all .45s cubic-bezier(.23,1,.32,1);
        }
        .navbar-wrap.at-top {
        //   padding-top: 24px;
          padding-bottom: 24px;
        }
        .navbar-wrap.scrolled {
          padding-top: 12px;
          padding-bottom: 12px;
        }

        /* ── Inner pill ── */
        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 100px;
        //   padding: 4px 10px 4px 20px;
          transition: all .45s cubic-bezier(.23,1,.32,1);
          position: relative;
        }
        .navbar-inner.at-top {
          background: transparent;
          border: 1px solid transparent;
          box-shadow: none;
          backdrop-filter: none;
        }
        .navbar-inner.scrolled {
          background: rgba(253, 252, 250, 0.92);
          border: 1px solid rgba(0,0,0,.07);
          box-shadow: 0 8px 40px rgba(0,0,0,.1), 0 1px 0 rgba(255,255,255,.8) inset;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* ── Logo ── */
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: 22px;
          color: #111;
          text-decoration: none;
          letter-spacing: .01em;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          transition: opacity .25s;
        }
        .nav-logo:hover { opacity: .85; }
        .nav-logo-mark {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7fbf2f, #a8e04a);
          display: grid; place-items: center;
          font-size: 16px; color: #fff;
          box-shadow: 0 4px 14px rgba(127,191,47,.4);
          flex-shrink: 0;
          transition: transform .3s ease;
        }
        .nav-logo:hover .nav-logo-mark { transform: rotate(-8deg) scale(1.05); }
        .nav-logo-text { color: #111; }
        .nav-logo-accent { color: #7fbf2f; }
        .navbar-inner.at-top .nav-logo-text { color: #111; }

        .navbar-logo-img {
          height: 110px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        .mobile-logo-img {
          height: 96px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        /* ── Links container (position relative for indicator) ── */
        .nav-links-wrap {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        /* ── Sliding background indicator ── */
        .nav-indicator {
          position: absolute;
          top: 0; bottom: 0;
          border-radius: 100px;
          background: rgba(127,191,47,.1);
          pointer-events: none;
          transition: left .35s cubic-bezier(.23,1,.32,1), width .35s cubic-bezier(.23,1,.32,1), opacity .2s;
          z-index: 0;
        }

        /* ── Individual link ── */
        .nav-link {
          position: relative; z-index: 1;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #555;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 100px;
          transition: color .25s;
          white-space: nowrap;
          letter-spacing: .01em;
        }
        .nav-link:hover { color: #111; }
        .nav-link.active { color: #1a1a1a; font-weight: 600; }

        /* Active dot */
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #7fbf2f;
          box-shadow: 0 0 6px rgba(127,191,47,.8);
        }

        /* ── Institute CTA button ── */
        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #000 !important;
          background: #7fbf2f;
          border-radius: 100px;
          padding: 10px 22px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          letter-spacing: .01em;
          box-shadow: 0 6px 20px rgba(127,191,47,.4);
          transition: all .3s ease;
          white-space: nowrap;
          border: none;
          flex-shrink: 0;
        }
        .nav-cta:hover {
          background: #5a9c1a;
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(127,191,47,.5);
          color: #000 !important;
        }
        .nav-cta-arrow {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(0,0,0,.12);
          display: grid; place-items: center;
          font-size: 12px;
          transition: transform .3s ease;
        }
        .nav-cta:hover .nav-cta-arrow { transform: translateX(2px); }

        /* ── Right side cluster ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* ── Quote button ── */
        .nav-quote {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #555;
          background: transparent;
          border: 1.5px solid rgba(0,0,0,.12);
          border-radius: 100px;
          padding: 9px 20px;
          cursor: pointer;
          transition: all .3s;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .nav-quote:hover { border-color: #7fbf2f; color: #111; background: rgba(127,191,47,.04); }

        /* ── Mobile hamburger ── */
        .nav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px; height: 40px;
          border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,.1);
          background: #fff;
          cursor: pointer;
          transition: all .25s;
          padding: 0;
        }
        .nav-burger:hover { border-color: #7fbf2f; background: rgba(127,191,47,.04); }
        .nav-burger-bar {
          width: 18px; height: 1.5px;
          background: #333;
          border-radius: 2px;
          transition: all .35s cubic-bezier(.23,1,.32,1);
          transform-origin: center;
        }
        .nav-burger.open .nav-burger-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-burger.open .nav-burger-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-burger.open .nav-burger-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile drawer ── */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          pointer-events: none;
        }
        .mobile-menu.open { pointer-events: all; }

        .mobile-backdrop {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.45);
          opacity: 0;
          transition: opacity .4s ease;
          backdrop-filter: blur(4px);
        }
        .mobile-menu.open .mobile-backdrop { opacity: 1; }

        .mobile-drawer {
          position: absolute;
          top: 0; right: 0;
          width: min(360px, 88vw);
          height: 100%;
          background: #fdfcfa;
          box-shadow: -20px 0 60px rgba(0,0,0,.15);
          transform: translateX(100%);
          transition: transform .45s cubic-bezier(.23,1,.32,1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .mobile-menu.open .mobile-drawer { transform: translateX(0); }

        .mobile-drawer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid rgba(0,0,0,.06);
        }

        .mobile-close {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,.1);
          background: transparent;
          cursor: pointer;
          display: grid; place-items: center;
          font-size: 20px;
          color: #555;
          transition: all .25s;
          line-height: 1;
        }
        .mobile-close:hover { border-color: #7fbf2f; color: #111; }

        .mobile-links {
          flex: 1;
          overflow-y: auto;
          padding: 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #444;
          text-decoration: none;
          padding: 14px 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all .25s;
        }
        .mobile-link:hover { background: rgba(127,191,47,.07); color: #111; }
        .mobile-link.active { background: rgba(127,191,47,.1); color: #1a1a1a; font-weight: 700; }
        .mobile-link.active .mobile-link-arrow { color: #7fbf2f; }
        .mobile-link-arrow { font-size: 16px; color: #ccc; transition: color .25s, transform .25s; }
        .mobile-link:hover .mobile-link-arrow { color: #7fbf2f; transform: translateX(3px); }

        .mobile-link-cta {
          margin: 8px 0 4px;
          background: #7fbf2f;
          color: #000 !important;
          font-weight: 700;
          box-shadow: 0 8px 24px rgba(127,191,47,.3);
        }
        .mobile-link-cta:hover { background: #5a9c1a !important; color: #000 !important; }

        .mobile-drawer-bottom {
          padding: 24px 28px;
          border-top: 1px solid rgba(0,0,0,.06);
        }
        .mobile-contact-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mobile-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #777;
        }
        .mobile-contact-icon {
          width: 32px; height: 32px;
          border-radius: 10px;
          background: rgba(127,191,47,.1);
          display: grid; place-items: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .nav-links-wrap, .nav-quote { display: none; }
          .nav-burger { display: flex; }
          .navbar-logo-img { height: 80px; }
        }
        @media (max-width: 768px) {
          .navbar-logo-img { height: 64px; }
          .mobile-logo-img { height: 72px; }
          .navbar-wrap { padding: 0 20px; }
        }
        @media (max-width: 640px) {
          .navbar-wrap { padding: 0 12px; }
          .navbar-inner { padding: 8px 12px; }
          .nav-cta span:not(.nav-cta-arrow) { display: none; }
          .nav-cta { padding: 0; width: 40px; height: 40px; border-radius: 50%; justify-content: center; }
          .nav-cta-arrow { background: transparent; width: auto; height: auto; font-size: 18px; }
          .nav-cta:hover .nav-cta-arrow { transform: none; }
        }
        @media (max-width: 480px) {
          .navbar-logo-img { height: 52px; }
          .mobile-logo-img { height: 60px; }
        }

        /* ── Entry animation ── */
        @keyframes navSlideDown {
          from { opacity:0; transform:translateY(-16px); }
          to   { opacity:1; transform:none; }
        }
        .navbar-wrap { animation: navSlideDown .7s cubic-bezier(.23,1,.32,1) both; }
      `}</style>

      <div className="navbar-root" style={{ marginBottom: 50 }}>
        {/* ── MAIN BAR ── */}
        <div className={`navbar-wrap ${scrolled ? "scrolled" : "at-top"}`}>
          <div className={`navbar-inner ${scrolled ? "scrolled" : "at-top"}`}>

            {/* Logo */}
            <Link href="/" className="nav-logo" style={{ textDecoration:"none" }} onClick={() => setMenuOpen(false)}>
              <img
                src="/logo.png"
                alt="Ammar Designz"
                className="navbar-logo-img"
              />
            </Link>

            {/* Desktop links */}
            <div
              className="nav-links-wrap"
              ref={navRef}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Sliding indicator */}
              <div
                className="nav-indicator"
                style={{
                  left:    indicatorStyle.left,
                  width:   indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                }}
              />

              {NAV_LINKS.filter(l => !l.highlight).map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={el => { linkRefs.current[link.href] = el; }}
                  className={`nav-link ${pathname === link.href ? "active" : ""}`}
                  onMouseEnter={() => setHovered(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="nav-right">
              <Link href="/contact" className="nav-quote">
                Free Quote
              </Link>
              <Link
                href="/institute"
                className="nav-cta"
              >
                <span>Institute</span>
                <span className="nav-cta-arrow">→</span>
              </Link>

              {/* Mobile burger */}
              <button
                className={`nav-burger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
              >
                <span className="nav-burger-bar" />
                <span className="nav-burger-bar" />
                <span className="nav-burger-bar" />
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {/* Backdrop */}
          <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />

          {/* Drawer */}
          <div className="mobile-drawer">
            {/* Top */}
            <div className="mobile-drawer-top">
              <Link href="/" style={{ display:"flex", alignItems:"center", flexShrink:0, textDecoration:"none" }} onClick={() => setMenuOpen(false)}>
                <img
                  src="/logo.png"
                  alt="Ammar Designz"
                  className="mobile-logo-img"
                />
              </Link>
              <button className="mobile-close" onClick={() => setMenuOpen(false)}>×</button>
            </div>

            {/* Links */}
            <nav className="mobile-links">
              {/* Institute CTA first on mobile */}
              <Link
                href="/institute"
                className="mobile-link mobile-link-cta"
                onClick={() => setMenuOpen(false)}
              >
                <span>🎓 Institute — Enrol Now</span>
                <span className="mobile-link-arrow">→</span>
              </Link>

              {NAV_LINKS.filter(l => !l.highlight).map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mobile-link ${pathname === link.href ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <span className="mobile-link-arrow">→</span>
                </Link>
              ))}
            </nav>

            {/* Bottom contact strip */}
            <div className="mobile-drawer-bottom">
              <div className="mobile-contact-row">
                <div className="mobile-contact-item">
                  <span className="mobile-contact-icon">📍</span>
                  <span>Rawalpindi, Punjab, Pakistan</span>
                </div>
                <div className="mobile-contact-item">
                  <span className="mobile-contact-icon">✉️</span>
                  <span>hello@ammardesignz.com</span>
                </div>
                <div className="mobile-contact-item">
                  <span className="mobile-contact-icon">📱</span>
                  <span>+92 300 0000000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

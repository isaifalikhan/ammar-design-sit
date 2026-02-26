"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #faf9f7; color: #1a1a1a; margin: 0; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
  @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
  @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
  @keyframes spin-slow { to { transform:rotate(360deg); } }
  .afu { animation: fadeUp .9s cubic-bezier(.23,1,.32,1) both; }
  .d1{animation-delay:.1s}.d2{animation-delay:.25s}.d3{animation-delay:.4s}.d4{animation-delay:.55s}
  .gradient-text {
    background: linear-gradient(135deg,#7fbf2f 0%,#a8e04a 50%,#5a9c1a 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation: shimmer 4s linear infinite;
  }
  .orb { border-radius:50%; filter:blur(70px); position:absolute; pointer-events:none; }
  .card-hover { transition: transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s ease; }
  .card-hover:hover { transform:translateY(-6px); box-shadow:0 30px 60px rgba(0,0,0,.12); }
  .val-card:hover { background:#7fbf2f !important; }
  .val-card:hover .val-icon { background:rgba(0,0,0,.12) !important; }
  .val-card:hover h3, .val-card:hover p { color:#fff !important; }
  .team-img { transition: all .5s ease; filter:grayscale(1); }
  .team-card:hover .team-img { filter:grayscale(0); transform:scale(1.05); }
  .stat-item { border-right:1px solid rgba(255,255,255,.08); }
  .stat-item:last-child { border-right:none; }

  .about-hero {
    padding: 120px 48px 80px;
    text-align: center;
  }

  .about-hero-title {
    font-size: 80px;
  }

  .about-stats-grid {
    padding: 48px;
    display: grid;
    grid-template-columns: repeat(4,1fr);
  }

  .about-founder-section {
    padding: 100px 48px;
  }

  .about-founder-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }

  .about-values-section {
    padding: 100px 48px;
  }

  .about-values-grid {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
  }

  .about-team-section {
    padding: 100px 48px;
  }

  .about-team-grid {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: 20px;
  }

  .about-cta-section {
    padding: 100px 48px;
  }

  @media (max-width: 1024px) {
    .about-stats-grid {
      grid-template-columns: repeat(2,1fr);
      padding: 40px 32px !important;
    }
    .about-values-grid {
      grid-template-columns: repeat(2,1fr);
    }
    .about-team-grid {
      grid-template-columns: repeat(3,1fr);
    }
  }

  @media (max-width: 768px) {
    .about-hero {
      padding: 96px 24px 64px !important;
    }
    .about-hero-title {
      font-size: 52px !important;
    }
    .about-stats-grid {
      grid-template-columns: repeat(2,1fr);
      padding: 32px 20px !important;
    }
    .about-founder-section {
      padding: 80px 24px !important;
    }
    .about-founder-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .about-values-section {
      padding: 80px 24px !important;
    }
    .about-values-grid {
      grid-template-columns: 1fr;
    }
    .about-team-section {
      padding: 80px 24px !important;
    }
    .about-team-grid {
      grid-template-columns: repeat(2,1fr);
    }
    .about-cta-section {
      padding: 80px 24px !important;
    }
  }

  @media (max-width: 480px) {
    .about-hero-title {
      font-size: 40px !important;
    }
    .about-stats-grid {
      grid-template-columns: 1fr;
      padding: 24px 16px !important;
    }
    .about-team-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const values = [
  { icon: "✦", title: "Precision", desc: "Every pixel, every letterform — crafted with obsessive attention to detail and purpose." },
  { icon: "◈", title: "Authenticity", desc: "We draw from deep cultural roots in Arabic art to inform work that feels genuine, not trendy." },
  { icon: "◉", title: "Collaboration", desc: "Your vision is the foundation. We listen first, then translate ideas into visual language." },
  { icon: "◇", title: "Growth", desc: "Through teaching and mentoring, we believe design knowledge should be shared and elevated." },
];

const milestones = [
  { year: "2019", title: "Studio Founded", desc: "Ammar Designz was born from a passion for calligraphy and a vision to bridge art and brand." },
  { year: "2020", title: "First 50 Clients", desc: "Word-of-mouth growth across Rawalpindi and beyond as the studio's reputation for quality spread." },
  { year: "2021", title: "Education Launch", desc: "Launched the first recorded Arabic Calligraphy course — now with hundreds of enrolled students." },
  { year: "2022", title: "Team Expansion", desc: "Brought on dedicated designers and a video editor to handle growing demand for full-service branding." },
  { year: "2023", title: "200+ Projects", desc: "Crossed a major milestone — 200 completed projects spanning calligraphy, brand, print, and digital." },
  { year: "2024", title: "Premium Studio", desc: "Moved into a dedicated creative space and launched the Bilingual Brand Identity programme." },
];

const team = [
  { name: "Hafiz Muhammad Ammar", role: "Founder & CEO", bio: "Leads creative direction with a vision rooted in calligraphy and timeless design." },
  { name: "Muhammad Ahmed", role: "Studio Manager", bio: "Keeps every project on track — client relations, timelines, and studio operations." },
  { name: "Abu Bakar", role: "Graphic Designer", bio: "Brings brand identities and social media campaigns to life with bold visual thinking." },
  { name: "Umar Farooq", role: "Video Editor", bio: "Crafts compelling motion content that extends the studio's visual language into video." },
  { name: "Usman Ghani", role: "Graphic Designer", bio: "Specialises in print media and layout — from book covers to large-format signage." },
];

export default function About() {
  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div>

        {/* ── HERO ── */}
        <section className="about-hero" style={{ position:"relative", overflow:"hidden", background:"linear-gradient(160deg,#fdfcfa 0%,#f4f9ec 60%,#fdfcfa 100%)", padding:"120px 48px 80px" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.08)", top:-80, right:-100 }} />
          <div className="orb" style={{ width:300, height:300, background:"rgba(127,191,47,.05)", bottom:-60, left:-60 }} />
          {/* Spinning ring */}
          <div style={{ position:"absolute", right:"8%", top:"50%", transform:"translateY(-50%) rotate(0deg)", width:440, height:440, borderRadius:"50%", border:"1px dashed rgba(127,191,47,.18)", animation:"spin-slow 30s linear infinite", pointerEvents:"none" }} />

          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:24 }} className="afu">
              <span style={{ width:32, height:1, background:"#7fbf2f", display:"block" }} />
              <span style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f" }}>Our Story</span>
            </div>
            <h1 className="serif afu d1 about-hero-title" style={{ fontSize:80, fontWeight:700, lineHeight:.95, margin:"0 0 28px", color:"#111", maxWidth:700 }}>
              Art Rooted<br />in <span className="gradient-text">Purpose</span>
            </h1>
            <p className="afu d2" style={{ fontSize:17, lineHeight:1.85, color:"#666", maxWidth:560, margin:"0 0 40px" }}>
              Founded in 2019 in Rawalpindi, Ammar Designz is a creative studio where Arabic calligraphy tradition meets contemporary brand thinking. We don't just design — we translate culture into craft.
            </p>
            <div className="afu d3" style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
              <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#1a1a1a", color:"#fff", borderRadius:100, padding:"14px 28px", fontSize:14, fontWeight:600, textDecoration:"none", boxShadow:"0 20px 50px rgba(0,0,0,.2)" }}>
                Work With Us <span style={{ width:30, height:30, borderRadius:"50%", background:"#7fbf2f", display:"grid", placeItems:"center" }}>→</span>
              </Link>
              <Link href="/portfolio" style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1.5px solid rgba(0,0,0,.12)", color:"#444", borderRadius:100, padding:"14px 28px", fontSize:14, fontWeight:500, textDecoration:"none" }}>
                See Our Work
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS BANNER ── */}
        <section style={{ background:"#0d0d0d" }}>
          <div className="page-container about-stats-grid">
            {[
              { val:"200+", label:"Projects Delivered" },
              { val:"150+", label:"Happy Clients" },
              { val:"5+", label:"Years of Craft" },
              { val:"3", label:"Active Courses" },
            ].map((s,i) => (
              <div key={i} className="stat-item" style={{ textAlign:"center", padding:"24px 0" }}>
                <p className="serif" style={{ fontSize:52, fontWeight:700, margin:0, lineHeight:1 }} ><span className="gradient-text">{s.val}</span></p>
                <p style={{ fontSize:12, color:"#666", margin:"8px 0 0", letterSpacing:".1em", textTransform:"uppercase" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOUNDER STORY ── */}
        <section className="about-founder-section" style={{ background:"#faf9f7", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.05)", top:0, left:-150 }} />
          <div className="page-container about-founder-grid" style={{ alignItems:"center", position:"relative", zIndex:1 }}>
            <div style={{ position:"relative" }}>
              <div style={{ borderRadius:"40% 60% 55% 45% / 45% 40% 60% 55%", overflow:"hidden", boxShadow:"0 50px 100px rgba(0,0,0,.16)" }}>
                <img src="/member.png" alt="Hafiz Muhammad Ammar" style={{ width:"100%", display:"block" }} />
              </div>
              <div style={{ position:"absolute", bottom:-20, right:-32, background:"#7fbf2f", borderRadius:20, padding:"18px 24px", boxShadow:"0 20px 50px rgba(127,191,47,.35)" }}>
                <p style={{ margin:0, fontSize:28, fontWeight:700, fontFamily:"'Cormorant Garamond', serif", color:"#fff" }}>2019</p>
                <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,.8)", letterSpacing:".15em", textTransform:"uppercase" }}>Est. Rawalpindi</p>
              </div>
              {/* Decorative corner */}
              <div style={{ position:"absolute", top:-20, left:-20, width:80, height:80, borderRadius:"50%", border:"2px dashed rgba(127,191,47,.3)" }} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              <div>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 14px" }}>The Founder</p>
                <h2 className="serif" style={{ fontSize:48, fontWeight:700, color:"#111", margin:"0 0 8px", lineHeight:1.1 }}>Hafiz Muhammad Ammar</h2>
                <p style={{ fontSize:14, color:"#999", margin:0, letterSpacing:".1em", textTransform:"uppercase" }}>Creative Director & CEO</p>
              </div>
              <p style={{ fontSize:15, lineHeight:1.9, color:"#555", margin:0 }}>
                What started as a personal obsession with the fluid geometry of Arabic script grew into a full creative studio. Ammar spent years studying traditional calligraphy before discovering how powerfully it could anchor a modern brand identity.
              </p>
              <p style={{ fontSize:15, lineHeight:1.9, color:"#555", margin:0 }}>
                Today, he leads a team of five creatives, each bringing their own discipline — from graphic design to video editing — unified by a commitment to work that is precise, purposeful, and enduring.
              </p>
              <blockquote className="serif" style={{ fontSize:24, fontStyle:"italic", color:"#333", margin:0, paddingLeft:24, borderLeft:"3px solid #7fbf2f", lineHeight:1.5 }}>
                "Every letterform has a soul. Our job is to find it and put it to work."
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="about-values-section" style={{ background:"#0d0d0d", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.06)", top:-80, right:-80 }} />
          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>What Drives Us</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#fff", margin:0 }}>Our <span className="gradient-text">Core Values</span></h2>
            </div>
            <div className="about-values-grid">
              {values.map((v,i) => (
                <div key={i} className="val-card card-hover" style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:28, padding:"36px 28px", transition:"all .35s", cursor:"default" }}>
                  <div className="val-icon" style={{ width:52, height:52, borderRadius:16, background:"rgba(127,191,47,.12)", border:"1px solid rgba(127,191,47,.2)", display:"grid", placeItems:"center", marginBottom:24, fontSize:22, color:"#7fbf2f", transition:"all .35s" }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontSize:20, fontWeight:700, color:"#fff", margin:"0 0 12px", transition:"color .35s" }}>{v.title}</h3>
                  <p style={{ fontSize:14, lineHeight:1.75, color:"#777", margin:0, transition:"color .35s" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div className="page-container">
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Our Journey</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#111", margin:0 }}>Built Year by <span className="gradient-text">Year</span></h2>
            </div>
            <div style={{ position:"relative" }}>
              {/* Center line */}
              <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, background:"linear-gradient(to bottom,transparent,rgba(127,191,47,.3) 10%,rgba(127,191,47,.3) 90%,transparent)", transform:"translateX(-50%)" }} />
              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {milestones.map((m,i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", marginBottom:48, position:"relative" }}>
                    {/* Year dot */}
                    <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:14, height:14, borderRadius:"50%", background:"#7fbf2f", boxShadow:"0 0 20px rgba(127,191,47,.5)", zIndex:2 }} />
                    {i % 2 === 0 ? (
                      <>
                        <div style={{ textAlign:"right", paddingRight:48 }}>
                          <span className="serif" style={{ fontSize:48, fontWeight:700, color:"rgba(127,191,47,.15)", display:"block", lineHeight:1 }}>{m.year}</span>
                          <h3 style={{ fontSize:20, fontWeight:700, color:"#111", margin:"4px 0 8px" }}>{m.title}</h3>
                          <p style={{ fontSize:14, lineHeight:1.75, color:"#666", margin:0 }}>{m.desc}</p>
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div style={{ paddingLeft:48 }}>
                          <span className="serif" style={{ fontSize:48, fontWeight:700, color:"rgba(127,191,47,.15)", display:"block", lineHeight:1 }}>{m.year}</span>
                          <h3 style={{ fontSize:20, fontWeight:700, color:"#111", margin:"4px 0 8px" }}>{m.title}</h3>
                          <p style={{ fontSize:14, lineHeight:1.75, color:"#666", margin:0 }}>{m.desc}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="about-team-section" style={{ background:"#060606", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.06)", top:-80, left:"50%", transform:"translateX(-50%)" }} />
          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>The People</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#fff", margin:0 }}>Meet the <span className="gradient-text">Team</span></h2>
            </div>
            <div className="about-team-grid">
              {team.map((m,i) => (
                <div key={i} className="team-card card-hover" style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:28, overflow:"hidden", cursor:"pointer" }}>
                  <div style={{ aspectRatio:"4/5", overflow:"hidden" }}>
                    <img src="/member.png" alt={m.name} className="team-img" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  </div>
                  <div style={{ padding:"20px 20px 24px" }}>
                    <p style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 6px" }}>{m.role}</p>
                    <h4 style={{ fontSize:15, fontWeight:700, color:"#fff", margin:"0 0 10px", lineHeight:1.2 }}>{m.name}</h4>
                    <p style={{ fontSize:12, color:"#777", lineHeight:1.65, margin:0 }}>{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="about-cta-section" style={{ background:"#faf9f7" }}>
          <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>Ready to Begin?</p>
            <h2 className="serif" style={{ fontSize:64, fontWeight:700, color:"#111", margin:"0 0 24px", lineHeight:1.05 }}>
              Let's Build Your Vision<br /><span className="gradient-text">Together.</span>
            </h2>
            <p style={{ fontSize:16, color:"#666", lineHeight:1.8, margin:"0 auto 40px", maxWidth:560 }}>
              Whether it's a brand identity, a calligraphy piece, or a course — the studio is ready to begin. Reach out and let's talk.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:16 }}>
              <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#1a1a1a", color:"#fff", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:700, textDecoration:"none", boxShadow:"0 20px 50px rgba(0,0,0,.2)" }}>
                Get a Free Quote <span style={{ width:32, height:32, borderRadius:"50%", background:"#7fbf2f", display:"grid", placeItems:"center" }}>→</span>
              </Link>
              <Link href="/courses" style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1.5px solid rgba(0,0,0,.12)", color:"#444", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:500, textDecoration:"none" }}>
                Explore Courses
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

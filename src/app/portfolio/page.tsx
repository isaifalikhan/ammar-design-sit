"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";

const LOCAL_STYLES = `
  .filter-btn { border:none; cursor:pointer; transition:all .3s; font-family:var(--font-dm-sans),sans-serif; }
  .filter-btn.active { background:#7fbf2f !important; color:#000 !important; border-color:#7fbf2f !important; }
  .port-card { transition:all .45s cubic-bezier(.23,1,.32,1); cursor:pointer; }
  .port-card:hover { transform:translateY(-8px); }
  .port-card:hover .port-overlay { opacity:1 !important; }
  .port-card:hover .port-img { transform:scale(1.07); }
  .port-img { transition:transform .6s ease; }
  .port-overlay { transition:opacity .4s ease; }
  .testimonial-card:hover { transform:translateY(-4px); box-shadow:0 24px 60px rgba(0,0,0,.1) !important; }
  .testimonial-card { transition:all .35s ease; }

  .portfolio-masonry { column-count:3; column-gap:20px; }
  .portfolio-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
  .portfolio-testimonials-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .section-padding { padding: 100px 48px; }
  .hero-padding { padding: 120px 48px 80px; }
  .stats-card { text-align:center; padding:32px 24px; border-right:1px solid rgba(255,255,255,.06); }
  .stats-card:last-child { border-right:none; }

  @media (max-width: 1024px) {
    .portfolio-masonry { column-count:2; }
    .portfolio-stats-grid { grid-template-columns:repeat(2,1fr) !important; }
    .portfolio-testimonials-grid { grid-template-columns:repeat(2,1fr) !important; }
    .stats-card:nth-child(2n) { border-right:none; }
    .stats-card { border-bottom:1px solid rgba(255,255,255,.06); }
    .stats-card:nth-last-child(-n+2) { border-bottom:none; }
  }

  @media (max-width: 768px) {
    .portfolio-masonry { column-count:1; display: flex; flex-direction: column; gap: 24px; }
    .port-card { margin-bottom: 0 !important; width: 100%; }
    .portfolio-stats-grid { grid-template-columns:1fr !important; }
    .portfolio-testimonials-grid { grid-template-columns:1fr !important; }
    .section-padding { padding: 60px 24px !important; }
    .hero-padding { padding: 80px 24px 60px !important; }
    .stats-card { border-right:none !important; border-bottom:1px solid rgba(255,255,255,.06); }
    .stats-card:last-child { border-bottom:none; }
  }
`;

const categories = ["All", "Calligraphy", "Brand Identity", "Social Media", "Print", "Digital"];

const projects = [
  { title: "Al-Noor Mosque Branding", category: "Brand Identity", tag: "Calligraphy + Identity", img: "/images/DSC02356.JPG", size: "large" },
  { title: "Zara Arabia Campaign", category: "Social Media", tag: "Social Campaign", img: "/images/DSC02357.JPG", size: "small" },
  { title: "Bismillah Calligraphy Series", category: "Calligraphy", tag: "Digital Calligraphy", img: "/images/DSC02358.JPG", size: "small" },
  { title: "Halal Bites Restaurant", category: "Brand Identity", tag: "Full Rebrand", img: "/images/DSC02359.JPG", size: "large" },
  { title: "Thuluth Wedding Suite", category: "Calligraphy", tag: "Wedding + Print", img: "/images/DSC02360.JPG", size: "small" },
  { title: "TechSaudi App UI", category: "Digital", tag: "UI Design", img: "/images/DSC02361.JPG", size: "small" },
  { title: "Dar Al-Kitab Publisher", category: "Print", tag: "Book Cover Series", img: "/images/DSC02362.JPG", size: "large" },
  { title: "Mabrook Events Brand", category: "Brand Identity", tag: "Event Branding", img: "/images/DSC02363.JPG", size: "small" },
  { title: "Cultural City Poster", category: "Print", tag: "Cultural Print", img: "/images/DSC02364.JPG", size: "small" },
];

const testimonials = [
  { name: "Ahmad Al-Rashid", company: "Al-Noor Mosque", text: "The calligraphy work was beyond anything I imagined. Every letterform had a presence and dignity that perfectly suited our space.", stars: 5 },
  { name: "Fatima Khalid", company: "Halal Bites", text: "Our rebrand transformed customer perception overnight. The team's understanding of Arabic visual culture is genuinely unmatched.", stars: 5 },
  { name: "Yusuf Ibrahim", company: "TechSaudi", text: "Professional, precise, and endlessly creative. The UI work was delivered on time and far exceeded our design expectations.", stars: 5 },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <style>{LOCAL_STYLES}</style>
      <div>

        {/* ── HERO ── */}
        <PageHero
          pillText="Our Work"
          title={<>200+ Projects.<br /><span className="gradient-text">One Standard.</span></>}
          description="Every project is an opportunity to push craft further. Browse our work across calligraphy, brand identity, print, social media, and digital design."
          imageSrc="/images/DSC02340.JPG"
          stats={[
            { val: 200, suf: "+", label: "Projects Delivered" },
            { val: 150, suf: "+", label: "Happy Clients" },
            { val: 98, suf: "%", label: "On-Time Delivery" },
            { val: 5, suf: "★", label: "Average Rating" }
          ]}
          ctaPrimary={{ text: "Start a Project", href: "/contact" }}
          ctaSecondary={{ text: "Our Services", href: "/services" }}
        />

        {/* ── FILTER + GRID ── */}
        <section className="section-padding" style={{ background:"#faf9f7" }}>
          <div className="page-container">
            {/* Filter bar */}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:52, justifyContent:"center" }}>
              {categories.map(c => (
                <button key={c} className={`filter-btn${activeFilter===c?" active":""}`}
                  onClick={() => setActiveFilter(c)}
                  style={{ borderRadius:100, padding:"10px 22px", fontSize:13, fontWeight:600, color:activeFilter===c?"#000":"#666", background:activeFilter===c?"#7fbf2f":"#fff", border:"1.5px solid", borderColor:activeFilter===c?"#7fbf2f":"rgba(0,0,0,.1)" }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Masonry-style grid */}
            <div className="portfolio-masonry" style={{ gap:20 }}>
              {filtered.map((p,i) => (
                <div key={i} className="port-card" style={{ breakInside:"avoid", marginBottom:20, borderRadius:24, overflow:"hidden", position:"relative", background:"#e8e8e8" }}>
                  <div style={{ position:"relative", overflow:"hidden" }}>
                    <img src={p.img} alt={p.title} className="port-img" style={{ width:"100%", display:"block", aspectRatio: p.size==="large"?"4/3":"1", objectFit:"cover" }} />
                    <div className="port-overlay" style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.1) 60%,transparent 100%)", opacity:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"28px 24px" }}>
                      <span style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#7fbf2f", marginBottom:8 }}>{p.tag}</span>
                      <h3 style={{ fontWeight:700, color:"#fff", margin:"0 0 14px", lineHeight:1.2 }}>{p.title}</h3>
                      <span style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:13, fontWeight:600, color:"#fff" }}>
                        View Project <span style={{ width:28, height:28, borderRadius:"50%", background:"#7fbf2f", display:"grid", placeItems:"center", color:"#000" }}>→</span>
                      </span>
                    </div>
                  </div>
                  <div style={{ padding:"16px 20px", background:"#fff" }}>
                    <p style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 4px" }}>{p.category}</p>
                    <h4 style={{ fontWeight:600, color:"#111", margin:0 }}>{p.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ── TESTIMONIALS ── */}
        <section className="section-padding" style={{ background:"#faf9f7" }}>
          <div className="page-container">
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Client Voices</p>
              <h2 style={{ fontWeight:700, color:"#111", margin:0 }}>What Clients <span className="gradient-text">Say</span></h2>
            </div>
            <div className="portfolio-testimonials-grid" style={{ gap:24 }}>
              {testimonials.map((t,i) => (
                <div key={i} className="testimonial-card" style={{ background:"#fff", border:"1px solid rgba(0,0,0,.06)", borderRadius:28, padding:"36px 32px", boxShadow:"0 4px 24px rgba(0,0,0,.06)" }}>
                  <div style={{ display:"flex", gap:3, marginBottom:24 }}>
                    {Array(t.stars).fill(null).map((_,si) => <span key={si} style={{ color:"#7fbf2f", fontSize:16 }}>★</span>)}
                  </div>
                  <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize:20, fontStyle:"italic", color:"#333", lineHeight:1.6, margin:"0 0 28px" }}>"{t.text}"</p>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#7fbf2f,#a8e04a)", display:"grid", placeItems:"center", fontSize:18, fontWeight:700, color:"#fff" }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p style={{ fontSize:14, fontWeight:700, color:"#111", margin:0 }}>{t.name}</p>
                      <p style={{ fontSize:12, color:"#999", margin:0 }}>{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      

      </div>
    </>
  );
}

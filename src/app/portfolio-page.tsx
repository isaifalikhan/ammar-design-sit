"use client";

import Link from "next/link";
import { useState } from "react";

const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing:border-box; }
  body { font-family:'DM Sans',sans-serif; background:#faf9f7; color:#1a1a1a; margin:0; }
  .serif { font-family:'Cormorant Garamond',Georgia,serif; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:none;} }
  @keyframes shimmer { 0%{background-position:-200% center;}100%{background-position:200% center;} }
  @keyframes spin-slow { to{transform:rotate(360deg);} }
  .afu{animation:fadeUp .9s cubic-bezier(.23,1,.32,1) both;}
  .d1{animation-delay:.1s}.d2{animation-delay:.25s}.d3{animation-delay:.4s}
  .gradient-text {
    background:linear-gradient(135deg,#7fbf2f 0%,#a8e04a 50%,#5a9c1a 100%);
    background-size:200% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;animation:shimmer 4s linear infinite;
  }
  .orb{border-radius:50%;filter:blur(70px);position:absolute;pointer-events:none;}
  .filter-btn { border:none; cursor:pointer; transition:all .3s; font-family:'DM Sans',sans-serif; }
  .filter-btn.active { background:#7fbf2f !important; color:#000 !important; border-color:#7fbf2f !important; }
  .port-card { transition:all .45s cubic-bezier(.23,1,.32,1); cursor:pointer; }
  .port-card:hover { transform:translateY(-8px); }
  .port-card:hover .port-overlay { opacity:1 !important; }
  .port-card:hover .port-img { transform:scale(1.07); }
  .port-img { transition:transform .6s ease; }
  .port-overlay { transition:opacity .4s ease; }
  .testimonial-card:hover { transform:translateY(-4px); box-shadow:0 24px 60px rgba(0,0,0,.1) !important; }
  .testimonial-card { transition:all .35s ease; }
`;

const categories = ["All", "Calligraphy", "Brand Identity", "Social Media", "Print", "Digital"];

const projects = [
  { title: "Al-Noor Mosque Branding", category: "Brand Identity", tag: "Calligraphy + Identity", img: "/Mask group.png", size: "large" },
  { title: "Zara Arabia Campaign", category: "Social Media", tag: "Social Campaign", img: "/Mask group (1).png", size: "small" },
  { title: "Bismillah Calligraphy Series", category: "Calligraphy", tag: "Digital Calligraphy", img: "/Mask group (2).png", size: "small" },
  { title: "Halal Bites Restaurant", category: "Brand Identity", tag: "Full Rebrand", img: "/design_ (4) 1.png", size: "large" },
  { title: "Thuluth Wedding Suite", category: "Calligraphy", tag: "Wedding + Print", img: "/course1.png", size: "small" },
  { title: "TechSaudi App UI", category: "Digital", tag: "UI Design", img: "/course2.png", size: "small" },
  { title: "Dar Al-Kitab Publisher", category: "Print", tag: "Book Cover Series", img: "/course3.png", size: "large" },
  { title: "Mabrook Events Brand", category: "Brand Identity", tag: "Event Branding", img: "/Mask group.png", size: "small" },
  { title: "Rawalpindi City Poster", category: "Print", tag: "Cultural Print", img: "/Mask group (1).png", size: "small" },
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
      <style>{SHARED_STYLES}</style>
      <div>

        {/* ── HERO ── */}
        <section style={{ position:"relative", overflow:"hidden", background:"linear-gradient(160deg,#fdfcfa,#f4f9ec 60%,#fdfcfa)", padding:"120px 48px 80px" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.08)", top:-80, right:-80 }} />
          <div style={{ position:"absolute", right:"6%", top:"50%", transform:"translateY(-50%)", width:460, height:460, borderRadius:"50%", border:"1px dashed rgba(127,191,47,.18)", animation:"spin-slow 30s linear infinite", pointerEvents:"none" }} />

          <div className="page-container" style={{ position:"relative", zIndex:1, textAlign:"center" }}>
            <div className="afu" style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:24 }}>
              <span style={{ width:32, height:1, background:"#7fbf2f", display:"block" }} />
              <span style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f" }}>Our Work</span>
              <span style={{ width:32, height:1, background:"#7fbf2f", display:"block" }} />
            </div>
            <h1 className="serif afu d1" style={{ fontSize:88, fontWeight:700, lineHeight:.9, margin:"0 0 28px", color:"#111" }}>
              200+ Projects.<br /><span className="gradient-text">One Standard.</span>
            </h1>
            <p className="afu d2" style={{ fontSize:17, lineHeight:1.85, color:"#666", maxWidth:540, margin:"0 auto 16px" }}>
              Every project is an opportunity to push craft further. Browse our work across calligraphy, brand identity, print, social media, and digital design.
            </p>
          </div>
        </section>

        {/* ── FILTER + GRID ── */}
        <section style={{ background:"#faf9f7", padding:"60px 48px 100px" }}>
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
            <div style={{ columns:3, gap:20 }}>
              {filtered.map((p,i) => (
                <div key={i} className="port-card" style={{ breakInside:"avoid", marginBottom:20, borderRadius:24, overflow:"hidden", position:"relative", background:"#e8e8e8" }}>
                  <div style={{ position:"relative", overflow:"hidden" }}>
                    <img src={p.img} alt={p.title} className="port-img" style={{ width:"100%", display:"block", aspectRatio: p.size==="large"?"4/3":"1", objectFit:"cover" }} />
                    <div className="port-overlay" style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.1) 60%,transparent 100%)", opacity:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"28px 24px" }}>
                      <span style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#7fbf2f", marginBottom:8 }}>{p.tag}</span>
                      <h3 style={{ fontSize:20, fontWeight:700, color:"#fff", margin:"0 0 14px", lineHeight:1.2 }}>{p.title}</h3>
                      <span style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:13, fontWeight:600, color:"#fff" }}>
                        View Project <span style={{ width:28, height:28, borderRadius:"50%", background:"#7fbf2f", display:"grid", placeItems:"center", color:"#000" }}>→</span>
                      </span>
                    </div>
                  </div>
                  <div style={{ padding:"16px 20px", background:"#fff" }}>
                    <p style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 4px" }}>{p.category}</p>
                    <h4 style={{ fontSize:15, fontWeight:600, color:"#111", margin:0 }}>{p.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ background:"#0d0d0d", padding:"80px 48px" }}>
          <div className="page-container" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0 }}>
            {[
              { val:"200+", label:"Projects Delivered", sub:"Across 5 disciplines" },
              { val:"150+", label:"Happy Clients", sub:"From 8 countries" },
              { val:"98%", label:"On-Time Delivery", sub:"Zero missed deadlines" },
              { val:"5★", label:"Average Rating", sub:"From verified clients" },
            ].map((s,i) => (
              <div key={i} style={{ textAlign:"center", padding:"32px 24px", borderRight:i<3?"1px solid rgba(255,255,255,.06)":"none" }}>
                <p className="serif gradient-text" style={{ fontSize:52, fontWeight:700, margin:0, lineHeight:1 }}>{s.val}</p>
                <p style={{ fontSize:15, fontWeight:600, color:"#fff", margin:"12px 0 4px" }}>{s.label}</p>
                <p style={{ fontSize:12, color:"#555", margin:0 }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div className="page-container">
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Client Voices</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#111", margin:0 }}>What Clients <span className="gradient-text">Say</span></h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
              {testimonials.map((t,i) => (
                <div key={i} className="testimonial-card" style={{ background:"#fff", border:"1px solid rgba(0,0,0,.06)", borderRadius:28, padding:"36px 32px", boxShadow:"0 4px 24px rgba(0,0,0,.06)" }}>
                  <div style={{ display:"flex", gap:3, marginBottom:24 }}>
                    {Array(t.stars).fill(null).map((_,si) => <span key={si} style={{ color:"#7fbf2f", fontSize:16 }}>★</span>)}
                  </div>
                  <p className="serif" style={{ fontSize:20, fontStyle:"italic", color:"#333", lineHeight:1.6, margin:"0 0 28px" }}>"{t.text}"</p>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#7fbf2f,#a8e04a)", display:"grid", placeItems:"center", fontSize:18, fontWeight:700, color:"#fff", fontFamily:"'Cormorant Garamond',serif" }}>
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

        {/* ── CTA ── */}
        <section style={{ background:"#0a0a0a", padding:"100px 48px", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:600, height:600, background:"rgba(127,191,47,.06)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
          <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
            <h2 className="serif" style={{ fontSize:64, fontWeight:700, color:"#fff", margin:"0 0 24px", lineHeight:1.05 }}>
              Your Project<br /><span className="gradient-text">Could Be Next.</span>
            </h2>
            <p style={{ fontSize:16, color:"#888", lineHeight:1.8, margin:"0 0 40px" }}>Let's create something that earns its place in a portfolio like this.</p>
            <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#7fbf2f", color:"#000", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:700, textDecoration:"none", boxShadow:"0 20px 50px rgba(127,191,47,.3)" }}>
              Start Your Project <span style={{ fontSize:18 }}>→</span>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}

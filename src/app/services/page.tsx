"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";

const LOCAL_STYLES = `
  .stab { cursor:pointer; transition:all .3s; font-family:var(--font-dm-sans),sans-serif; border:none; }
  .stab.active { background:#7fbf2f !important; color:#000 !important; border-color:#7fbf2f !important; box-shadow:0 8px 24px rgba(127,191,47,.35); }

  .check-item { display:flex; align-items:flex-start; gap:14px; padding:14px 18px; border-radius:14px; border:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.025); transition:all .3s; }
  .check-item:hover { background:rgba(127,191,47,.07); border-color:rgba(127,191,47,.2); }

  .gal-item { overflow:hidden; border-radius:22px; cursor:pointer; position:relative; }
  .gal-item img { transition:transform .6s ease; display:block; width:100%; height:100%; object-fit:cover; }
  .gal-item:hover img { transform:scale(1.07); }
  .gal-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.55),transparent); opacity:0; transition:opacity .4s; }
  .gal-item:hover .gal-overlay { opacity:1; }

  .svc-overview-card { background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07); border-radius:26px; padding:30px 22px; text-align:left; cursor:pointer; transition:all .4s cubic-bezier(.23,1,.32,1); }
  .svc-overview-card:hover { background:rgba(127,191,47,.07); border-color:rgba(127,191,47,.25); transform:translateY(-6px); }

  .pkg { transition:all .45s cubic-bezier(.23,1,.32,1); }
  .pkg:hover { transform:translateY(-10px); }
  .pkg.featured { border-color:rgba(127,191,47,.5) !important; box-shadow:0 24px 70px rgba(127,191,47,.18) !important; }

  .btn-green { display:inline-flex; align-items:center; gap:10px; background:#7fbf2f; color:#000 !important; border-radius:100px; padding:14px 30px; font-size:14px; font-weight:700; text-decoration:none; box-shadow:0 12px 36px rgba(127,191,47,.35); transition:all .3s; font-family:var(--font-dm-sans),sans-serif; border:none; cursor:pointer; }
  .btn-green:hover { background:#5a9c1a; transform:translateY(-2px); box-shadow:0 20px 50px rgba(127,191,47,.5); }
  .btn-outline-white { display:inline-flex; align-items:center; gap:10px; border:1px solid rgba(255,255,255,.16); color:#fff; border-radius:100px; padding:14px 28px; font-size:14px; font-weight:500; text-decoration:none; transition:all .3s; font-family:var(--font-dm-sans),sans-serif; }
  .btn-outline-white:hover { background:rgba(255,255,255,.06); border-color:#fff; }

  .services-detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; }
  .services-process-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; position:relative; }
  .services-process-line { position:absolute; top:27px; left:12.5%; right:12.5%; height:1px; background:linear-gradient(to right,rgba(127,191,47,.35),rgba(127,191,47,.1),rgba(127,191,47,.35)); z-index:0; }
  .services-overview-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
  .services-overview-gallery { display:grid; grid-template-columns:1.3fr 0.85fr 1fr 0.85fr; gap:16px; margin-top:24px; }
  .services-packages-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .services-detail-gallery { display:grid; grid-template-columns:1.3fr 1fr; gap:12px; margin-top:4px; }

  @media (max-width: 1024px) {
    .services-detail-grid { grid-template-columns:1fr; gap:48px; }
    .services-overview-grid { grid-template-columns:repeat(3,1fr); }
    .services-overview-gallery { grid-template-columns:repeat(2,1fr); }
    .services-packages-grid { grid-template-columns:repeat(2,1fr); }
    .services-process-grid { grid-template-columns:repeat(2,1fr); }
  }

  @media (max-width: 768px) {
    .services-detail-grid { grid-template-columns:1fr !important; gap:40px !important; }
    .services-process-grid { grid-template-columns:1fr !important; gap:32px !important; }
    .services-process-line { display:none; }
    .services-overview-grid { grid-template-columns:1fr !important; gap:24px !important; }
    .services-overview-gallery { grid-template-columns:1fr !important; gap:16px !important; }
    .services-packages-grid { grid-template-columns:1fr !important; gap:24px !important; }
    .services-detail-gallery { grid-template-columns:1fr !important; gap:16px !important; }
  }

      @media (max-width: 1024px) {
    .responsive-padding { padding-left: 32px !important; padding-right: 32px !important; }
  }
  @media (max-width: 768px) {
    .responsive-padding { padding-left: 24px !important; padding-right: 24px !important; }
    .section-padding-responsive { padding-top: 60px !important; padding-bottom: 60px !important; }
  }
  @media (max-width: 480px) {
    .responsive-padding { padding-left: 20px !important; padding-right: 20px !important; }
    .pkg-card { padding: 24px 20px !important; }
  }
      .pkg-card { padding: 44px 38px; }
      .page-container { width: 100%; max-width: 1400px; margin: 0 auto; }
    `;

const services = [
  {
    id: "calligraphy", icon: "✦", label: "Custom Calligraphic Logos", sub: "Bespoke Arabic wordmarks and logotypes.",
    heroDesc: "Bespoke Arabic wordmarks and logotypes designed to reflect brand personality, cultural depth, and market positioning. Ideal for luxury brands, Islamic institutions, personal branding, and heritage-driven businesses.",
    longDesc: "Our script-based identities and compositions are built with reverence, balance, and artistic integrity. We create high-resolution, vector-based calligraphy prepared for everything from digital screens to architectural applications.",
    features: ["Script-Based Brand Identities", "Quranic & Islamic Art Compositions", "Large-Scale & Print-Ready Artwork"],
    deliverables: "AI · EPS · SVG · PNG — print & screen ready at all sizes",
    gallery: ["/images/DSC02341.JPG", "/images/DSC02342.JPG", "/images/DSC02343.JPG"],
  },
  {
    id: "brand", icon: "◈", label: "Brand Identity", sub: "Designing Brands That Think, Speak, and Lead.",
    heroDesc: "At Ammar Designz, Brand Identity is built on clarity, strategy, and long-term vision. We don’t simply design logos — we construct cohesive visual systems that define how your brand looks, communicates, and positions itself in the market.",
    longDesc: "Every identity is developed through research, competitive analysis, and intentional design decisions to ensure it is distinctive, scalable, and built for real-world application.",
    features: ["Brand Strategy & Positioning", "Logo & Visual System Development", "Typography & Color Direction", "Brand Guidelines", "Brand Applications"],
    deliverables: "Full brand manual (PDF) · all logo formats · editable source files",
    gallery: ["/images/DSC02344.JPG", "/images/DSC02345.JPG", "/images/DSC02346.JPG"],
  },
  {
    id: "social", icon: "◉", label: "Social Media Design & Management", sub: "Strategic Visual Communication for the Digital World.",
    heroDesc: "At Ammar Designz, social media is treated as a living extension of your brand — not just a content feed. We combine strategic planning, visual consistency, and audience psychology to create content that captures attention and builds long-term engagement.",
    longDesc: "From aesthetic cohesion to performance-driven execution, every post is designed with intention. We handle platform-specific content planning, visual direction, and growth roadmaps.",
    features: ["Social Media Strategy", "Creative Content Design", "Content Planning & Calendar", "Performance-Oriented Campaign Design", "Account Management"],
    deliverables: "Editable Canva / Figma templates + exported production-ready assets",
    gallery: ["/images/DSC02347.JPG", "/images/DSC02348.JPG", "/images/DSC02349.JPG"],
  },
  {
    id: "print", icon: "◇", label: "Print Media Design", sub: "Timeless Design, Crafted for the Physical World.",
    heroDesc: "At Ammar Designz, print design is approached with precision, structure, and material awareness. We create visually powerful designs that translate flawlessly from screen to paper — ensuring color accuracy, layout balance, and production-ready execution.",
    longDesc: "Print is not just about ink on paper. It is about presence, texture, and lasting impression. From corporate stationery to large format billboards, we ensure every project looks exceptional off-press.",
    features: ["Corporate Stationery", "Brochures & Company Profiles", "Packaging Design", "Posters & Marketing Collateral", "Large Format & Production-Ready Files"],
    deliverables: "Press-ready PDFs · CMYK · crop marks · print specifications sheet",
    gallery: ["/images/DSC02350.JPG", "/images/DSC02351.JPG", "/images/DSC02352.JPG"],
  },
  {
    id: "design-dev", icon: "⬡", label: "Design & Development Department", sub: "Building Scalable, High-Performance Digital Experiences.",
    heroDesc: "From custom websites to complex web applications, we bridge the gap between stunning design and robust engineering. Our development team builds solutions that are fast, secure, and built for growth.",
    longDesc: "We don't just use templates; we engineer digital products. Whether it's a corporate website, an e-commerce platform, or a custom web application, we ensure pixel-perfect implementation of designs backed by clean, maintainable code. We specialize in modern tech stacks like Next.js, React, and Node.js to deliver seamless user experiences.",
    features: ["Custom Website Development", "E-Commerce Solutions", "Web Application Development", "CMS Integration", "Performance Optimization", "SEO & Analytics Setup"],
    deliverables: "Deployed live site · Source code repository · Admin dashboard access · Documentation",
    gallery: ["/images/DSC02353.JPG", "/images/DSC02354.JPG", "/images/DSC02355.JPG"],
  },
];

const process = [
  { n: "01", title: "Discovery", desc: "We learn your brand, audience, goals and constraints through a detailed brief session." },
  { n: "02", title: "Concept", desc: "Two to three distinct creative directions are developed and presented for your review." },
  { n: "03", title: "Refine", desc: "You choose a direction. We iterate through structured rounds until every detail is right." },
  { n: "04", title: "Deliver", desc: "Final files in all formats — organised, named and documented — ready to use immediately." },
];

const packages = [
  { name: "Starter", price: "Rs. 8,000", tagline: "For small businesses getting started.", featured: false, features: ["Logo design (2 concepts)", "Business card design", "Social profile artwork", "3 revision rounds", "All source files included"] },
  { name: "Brand Pro", price: "Rs. 22,000", tagline: "Full brand identity for growing businesses.", featured: true, features: ["Logo & brand mark system", "Colour & typography guide", "10-page brand manual", "Stationery suite", "Social media kit", "5 revision rounds", "All source files included"] },
  { name: "Studio", price: "Custom", tagline: "Comprehensive creative partnership.", featured: false, features: ["Everything in Brand Pro", "Digital Calligraphy logo", "Print campaign design", "Monthly social content", "Unlimited revisions", "Priority support", "Direct CEO access"] },
];

export default function ServicesPage() {
  const [active, setActive] = useState("calligraphy");
  const svc = services.find(s => s.id === active)!;

  return (
    <div style={{ overflowX: "hidden" }}>
          <style>{LOCAL_STYLES}</style>

          {/* ══ 1. HERO ══════════════════════════════════════ */}
          <PageHero
            pillText="What We Offer"
            title={<>Services That<br /><span className="gradient-text">Speak Volumes.</span></>}
            description="From a single calligraphy mark to a complete brand overhaul — every service is delivered with the same obsessive attention to craft."
            imageSrc="/images/DSC02341.JPG"
            ctaPrimary={{ text: "Start a Project", href: "/contact" }}
            ctaSecondary={{ text: "View Portfolio", href: "/portfolio" }}
          />

          {/* ══ SERVICE TABS ══════════════════════════════════════ */}
          <section style={{ padding: "40px 0", background: "#fdfcfa", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <div className="page-container" style={{ textAlign: "center" }}>
              <div className="afu d3" style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                {services.map(s => (
                  <button key={s.id} className={`stab${active===s.id?" active":""}`}
                    onClick={() => setActive(s.id)}
                    style={{ borderRadius:100, padding:"11px 24px", fontSize:13, fontWeight:600, letterSpacing:".02em", color:active===s.id?"#000":"#555", background:active===s.id?"#7fbf2f":"rgba(0,0,0,.04)", border:"1px solid", borderColor:active===s.id?"#7fbf2f":"rgba(0,0,0,.08)" }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ══ 2. MARQUEE ══════════════════════════════════ */}
      <div style={{ background:"#7fbf2f", overflow:"hidden", padding:"13px 0" }}>
        <div className="mq-track">
          {Array(8).fill(["Calligraphy • ", "Brand Identity • ", "Social Media • ", "Print Media • ", "UI Design • "]).flat().map((t,i) => (
            <span key={i} style={{ fontSize:11, fontWeight:700, color:"#fff", letterSpacing:".24em", textTransform:"uppercase", whiteSpace:"nowrap", paddingRight:4 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ══ 3. SERVICE DETAIL ═══════════════════════════ */}
      <section className="responsive-padding section-padding-responsive" style={{ background:"#060606", padding:"96px 48px" }}>
        <div className="page-container">
          <div className="services-detail-grid" style={{ display:"grid", gap:80, alignItems:"start" }}>

            {/* LEFT */}
            <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ width:60, height:60, borderRadius:18, background:"rgba(127,191,47,.1)", border:"1px solid rgba(127,191,47,.22)", display:"grid", placeItems:"center", fontSize:26, color:"#7fbf2f", flexShrink:0 }}>{svc.icon}</div>
                <div>
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 4px" }}>{svc.sub}</p>
                  <h2 style={{ fontWeight:700, color:"#fff", lineHeight:1.05, margin:0 }}>{svc.label}</h2>
                </div>
              </div>
              <p style={{ fontSize:15, lineHeight:1.9, color:"#aaa", margin:0 }}>{svc.heroDesc}</p>
              <p style={{ fontSize:14, lineHeight:1.95, color:"#666", margin:0 }}>{svc.longDesc}</p>
              <div style={{ background:"rgba(127,191,47,.06)", border:"1px solid rgba(127,191,47,.18)", borderRadius:18, padding:"18px 22px" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 6px" }}>Deliverables</p>
                <p style={{ fontSize:14, color:"#bbb", margin:0, lineHeight:1.6 }}>{svc.deliverables}</p>
              </div>
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                <Link href="/contact" className="btn-green">Enquire About This Service <span>→</span></Link>
                <Link href="/portfolio" className="btn-outline-white">See Examples</Link>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#555", margin:0 }}>What's Included</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {svc.features.map((f,i) => (
                  <div key={i} className="check-item">
                    <span style={{ width:24, height:24, borderRadius:"50%", background:"rgba(127,191,47,.14)", display:"grid", placeItems:"center", color:"#7fbf2f", fontSize:13, flexShrink:0, marginTop:1 }}>✓</span>
                    <span style={{ fontSize:15, color:"#ddd", fontWeight:500, lineHeight:1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              {/* Gallery strip */}
              <div className="services-detail-gallery">
                <div className="gal-item" style={{ aspectRatio:"4/3" }}>
                  <img src={svc.gallery[0]} alt="" />
                  <div className="gal-overlay" />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <div className="gal-item" style={{ aspectRatio:"1" }}><img src={svc.gallery[1]} alt="" /><div className="gal-overlay" /></div>
                  <div className="gal-item" style={{ aspectRatio:"1" }}><img src={svc.gallery[2]} alt="" /><div className="gal-overlay" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. PROCESS ══════════════════════════════════ */}
      <section className="responsive-padding section-padding-responsive" style={{ background:"#faf9f7", padding:"100px 48px" }}>
        <div className="page-container">
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Our Approach</p>
            <h2 style={{ fontWeight:700, color:"#111", lineHeight:1 }}>A Process Built for <span className="gradient-text">Great Work.</span></h2>
          </div>
          <div className="services-process-grid" style={{ display:"grid", gap:32, position:"relative" }}>
            <div className="services-process-line" style={{ position:"absolute", top:27, left:"12.5%", right:"12.5%", height:1, background:"linear-gradient(to right,rgba(127,191,47,.35),rgba(127,191,47,.1),rgba(127,191,47,.35))", zIndex:0 }} />
            {process.map((p,i) => (
              <div key={i} style={{ textAlign:"center", position:"relative", zIndex:1 }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"#7fbf2f", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 10px 32px rgba(127,191,47,.35)" }}>
                  <span style={{ fontSize:13, fontWeight:800, color:"#000" }}>{p.n}</span>
                </div>
                <h3 style={{ fontWeight:700, color:"#111", margin:"0 0 12px" }}>{p.title}</h3>
                <p style={{ fontSize:14, lineHeight:1.75, color:"#666", margin:0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   

   

      {/* ══ 7. BOTTOM CTA ═══════════════════════════════ */}
      <section className="responsive-padding section-padding-responsive" style={{ background:"#060606", padding:"110px 48px", position:"relative", overflow:"hidden" }}>
        <div className="orb" style={{ width:700, height:700, background:"rgba(127,191,47,.06)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
        <div style={{ maxWidth:820, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>Ready to Begin?</p>
          <h2 style={{ color:"#fff", marginBottom: 24 }}>
            Not Sure What<br />You Need?<br /><span className="gradient-text">Let's Talk.</span>
          </h2>
          <p style={{ fontSize:16, color:"#888", lineHeight:1.85, margin:"0 auto 44px", maxWidth:480 }}>
            Book a free 20-minute discovery call. We'll listen to your goals and recommend exactly the right service and scope.
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
            <Link href="/contact" className="btn-green" style={{ padding:"16px 38px", fontSize:15 }}>
              Book a Free Call <span style={{ width:32, height:32, borderRadius:"50%", background:"rgba(0,0,0,.14)", display:"grid", placeItems:"center", fontSize:16 }}>→</span>
            </Link>
            <Link href="/portfolio" className="btn-outline-white" style={{ padding:"15px 32px", fontSize:15 }}>
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

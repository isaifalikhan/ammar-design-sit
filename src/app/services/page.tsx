"use client";

import Link from "next/link";
import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #faf9f7; color: #1a1a1a; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:none; } }
  @keyframes shimmer  { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
  @keyframes spin     { to { transform:rotate(360deg); } }
  @keyframes marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }

  .afu  { animation: fadeUp .85s cubic-bezier(.23,1,.32,1) both; }
  .d1 { animation-delay:.1s; } .d2 { animation-delay:.25s; } .d3 { animation-delay:.4s; }

  .gradient-text {
    background: linear-gradient(135deg,#7fbf2f 0%,#a8e04a 50%,#5a9c1a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; animation: shimmer 4s linear infinite;
  }

  .orb { border-radius:50%; filter:blur(72px); position:absolute; pointer-events:none; }
  .mq-track { display:flex; animation:marquee 28s linear infinite; width:max-content; }

  .stab { cursor:pointer; transition:all .3s; font-family:'DM Sans',sans-serif; border:none; }
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

  .btn-green { display:inline-flex; align-items:center; gap:10px; background:#7fbf2f; color:#000 !important; border-radius:100px; padding:14px 30px; font-size:14px; font-weight:700; text-decoration:none; box-shadow:0 12px 36px rgba(127,191,47,.35); transition:all .3s; font-family:'DM Sans',sans-serif; border:none; cursor:pointer; }
  .btn-green:hover { background:#5a9c1a; transform:translateY(-2px); box-shadow:0 20px 50px rgba(127,191,47,.5); }
  .btn-outline-white { display:inline-flex; align-items:center; gap:10px; border:1px solid rgba(255,255,255,.16); color:#fff; border-radius:100px; padding:14px 28px; font-size:14px; font-weight:500; text-decoration:none; transition:all .3s; font-family:'DM Sans',sans-serif; }
  .btn-outline-white:hover { border-color:#7fbf2f; color:#7fbf2f; }
`;

const services = [
  {
    id: "calligraphy", icon: "✦", label: "Arabic Calligraphy", sub: "Classical scripts. Digital precision.",
    heroDesc: "We craft authentic Arabic calligraphy — digitally rendered for logos, wedding suites, signage, packaging and cultural projects. Rooted in classical scripts with a contemporary eye.",
    longDesc: "Every letterform we produce is drawn from a deep study of traditional Arabic scripts — Naskh, Thuluth, Diwani and Ruq'ah — then translated into pristine digital artwork ready for print, screen or large-format installation. Whether you need a single logo mark or an elaborate architectural installation, our calligraphy carries the weight of tradition and the precision of modern craft.",
    features: ["Logo & Brand Calligraphy", "Wedding & Event Suites", "Quranic Verses & Plaques", "Cultural & Architectural Artwork", "Bilingual Compositions", "Custom Arabic Typefaces"],
    deliverables: "AI · EPS · SVG · PNG — print & screen ready at all sizes",
    gallery: ["/Mask group.png", "/Mask group (1).png", "/Mask group (2).png"],
  },
  {
    id: "brand", icon: "◈", label: "Brand Identity", sub: "Strategy meets visual storytelling.",
    heroDesc: "From naming to logo systems, we build brand identities that hold together across every touchpoint — delivered with a complete brand manual.",
    longDesc: "A brand is more than a logo. It's a system — a collection of decisions about colour, type, voice and visual language that work together to create a recognisable, trustworthy presence. We begin every brand project with deep research and strategy before touching a single design tool, ensuring the visual identity is genuinely aligned with your values and goals.",
    features: ["Logo & Brand Mark Design", "Typography System", "Colour Palette & Usage Guide", "Brand Guidelines Manual", "Business Stationery Suite", "Social Media Kit"],
    deliverables: "Full brand manual (PDF) · all logo formats · editable source files",
    gallery: ["/Mask group (1).png", "/design_ (4) 1.png", "/Mask group.png"],
  },
  {
    id: "social", icon: "◉", label: "Social Media", sub: "Scroll-stopping visual content.",
    heroDesc: "Consistent, brand-aligned templates and campaign visuals for Instagram, Facebook, YouTube and LinkedIn — designed to stop the scroll and convert.",
    longDesc: "Social media design lives or dies on the first 0.3 seconds. We design posts, stories, reels thumbnails and campaign kits that arrest attention without sacrificing brand consistency. Every deliverable comes as an editable template so your team can move fast while staying on-brand.",
    features: ["Post & Story Templates", "Reels & YouTube Thumbnails", "Profile & Cover Art", "Campaign Visual Kits", "Monthly Content Packs", "Animated Story Templates"],
    deliverables: "Editable Canva / Figma templates + exported production-ready assets",
    gallery: ["/Mask group (2).png", "/Mask group.png", "/Mask group (1).png"],
  },
  {
    id: "print", icon: "◇", label: "Print Media", sub: "From concept to press-ready art.",
    heroDesc: "Professional print design for businesses, events and publishers — every file prepared to exact printing specifications so what you see is what gets printed.",
    longDesc: "There is something irreplaceable about a beautifully printed piece held in the hand. We design for print with rigorous attention to bleed, colour profiles, paper stock and finishing — ensuring every project looks as exceptional off-press as it does on screen. From a business card to a 200-page book, the standard never drops.",
    features: ["Business Cards & Stationery", "Brochures & Catalogues", "Banners & Signage", "Book & Magazine Layouts", "Packaging Design", "Event & Promotional Materials"],
    deliverables: "Press-ready PDFs · CMYK · crop marks · print specifications sheet",
    gallery: ["/design_ (4) 1.png", "/Mask group (2).png", "/Mask group.png"],
  },
  {
    id: "digital", icon: "⬡", label: "Digital & UI", sub: "Beautiful, functional interfaces.",
    heroDesc: "Visual UI design for websites, apps and dashboards — high-fidelity Figma prototypes and handoff-ready design systems built collaboratively with your dev team.",
    longDesc: "We bring the same rigour and aesthetic intent to digital interfaces that we apply to print and brand. Working in Figma, we produce pixel-perfect designs grounded in user-centred thinking — from wireframes to polished prototypes — and deliver fully documented component libraries ready for developer handoff.",
    features: ["Website UI Design", "Landing Page Design", "Mobile App Screens", "Figma Component Libraries", "Custom Icon Sets", "Design System Documentation"],
    deliverables: "Figma source file · component library · developer handoff package",
    gallery: ["/Mask group.png", "/Mask group (1).png", "/design_ (4) 1.png"],
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
  { name: "Studio", price: "Custom", tagline: "Comprehensive creative partnership.", featured: false, features: ["Everything in Brand Pro", "Arabic calligraphy logo", "Print campaign design", "Monthly social content", "Unlimited revisions", "Priority support", "Direct CEO access"] },
];

export default function ServicesPage() {
  const [active, setActive] = useState("calligraphy");
  const svc = services.find(s => s.id === active)!;

  return (
    <>
      <style>{STYLES}</style>

      {/* ══ 1. HERO ══════════════════════════════════════ */}
      <section style={{ position:"relative", overflow:"hidden", background:"linear-gradient(160deg, #fdfcfa 0%, #f4f9ec 50%, #fdfcfa 100%)", paddingTop:160, paddingBottom:100 }}>
        <div className="orb" style={{ width:700, height:700, background:"rgba(127,191,47,.07)", top:-160, right:-160 }} />
        <div className="orb" style={{ width:450, height:450, background:"rgba(127,191,47,.04)", bottom:-100, left:-100 }} />
        <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:750, height:750, borderRadius:"50%", border:"1px dashed rgba(127,191,47,.07)", animation:"spin 50s linear infinite", pointerEvents:"none" }} />

        <div className="page-container" style={{ padding:"0 48px", position:"relative", zIndex:1, textAlign:"center" }}>
          <div className="afu" style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:28 }}>
            <span style={{ width:32, height:1, background:"#7fbf2f", display:"block" }} />
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#5a9c1a" }}>What We Offer</span>
            <span style={{ width:32, height:1, background:"#7fbf2f", display:"block" }} />
          </div>
          <h1 className="serif afu d1" style={{ fontSize:88, fontWeight:700, lineHeight:.92, color:"#111", marginBottom:28 }}>
            Services That<br /><span className="gradient-text">Speak Volumes.</span>
          </h1>
          <p className="afu d2" style={{ fontSize:17, lineHeight:1.9, color:"#666", maxWidth:540, margin:"0 auto 52px" }}>
            From a single calligraphy mark to a complete brand overhaul — every service is delivered with the same obsessive attention to craft.
          </p>
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
      <section style={{ background:"#060606", padding:"96px 48px" }}>
        <div className="page-container">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>

            {/* LEFT */}
            <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ width:60, height:60, borderRadius:18, background:"rgba(127,191,47,.1)", border:"1px solid rgba(127,191,47,.22)", display:"grid", placeItems:"center", fontSize:26, color:"#7fbf2f", flexShrink:0 }}>{svc.icon}</div>
                <div>
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 4px" }}>{svc.sub}</p>
                  <h2 className="serif" style={{ fontSize:44, fontWeight:700, color:"#fff", lineHeight:1.05, margin:0 }}>{svc.label}</h2>
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
              <div style={{ display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:12, marginTop:4 }}>
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
      <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
        <div className="page-container">
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Our Approach</p>
            <h2 className="serif" style={{ fontSize:60, fontWeight:700, color:"#111", lineHeight:1 }}>A Process Built for <span className="gradient-text">Great Work.</span></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:32, position:"relative" }}>
            <div style={{ position:"absolute", top:27, left:"12.5%", right:"12.5%", height:1, background:"linear-gradient(to right,rgba(127,191,47,.35),rgba(127,191,47,.1),rgba(127,191,47,.35))", zIndex:0 }} />
            {process.map((p,i) => (
              <div key={i} style={{ textAlign:"center", position:"relative", zIndex:1 }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"#7fbf2f", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 10px 32px rgba(127,191,47,.35)" }}>
                  <span style={{ fontSize:13, fontWeight:800, color:"#000" }}>{p.n}</span>
                </div>
                <h3 style={{ fontSize:19, fontWeight:700, color:"#111", margin:"0 0 12px" }}>{p.title}</h3>
                <p style={{ fontSize:14, lineHeight:1.75, color:"#666", margin:0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. ALL SERVICES OVERVIEW ════════════════════ */}
      <section style={{ background:"#0d0d0d", padding:"100px 48px", position:"relative", overflow:"hidden" }}>
        <div className="orb" style={{ width:600, height:600, background:"rgba(127,191,47,.06)", top:-120, right:-120 }} />
        <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.04)", bottom:-100, left:-100 }} />
        <div className="page-container" style={{ position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Everything We Do</p>
            <h2 className="serif" style={{ fontSize:60, fontWeight:700, color:"#fff", lineHeight:1 }}>The Full <span className="gradient-text">Service Range.</span></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16 }}>
            {services.map((s,i) => (
              <button key={i} className="svc-overview-card"
                onClick={() => { setActive(s.id); window.scrollTo({ top:0, behavior:"smooth" }); }}>
                <div style={{ width:50, height:50, borderRadius:15, background:"rgba(127,191,47,.1)", border:"1px solid rgba(127,191,47,.2)", display:"grid", placeItems:"center", fontSize:22, color:"#7fbf2f", marginBottom:18 }}>{s.icon}</div>
                <h3 style={{ fontSize:15, fontWeight:700, color:"#fff", margin:"0 0 8px", lineHeight:1.3 }}>{s.label}</h3>
                <p style={{ fontSize:12, color:"#777", margin:"0 0 14px", lineHeight:1.6 }}>{s.sub}</p>
                <span style={{ fontSize:18, color:"#7fbf2f" }}>→</span>
              </button>
            ))}
          </div>
          {/* Gallery row */}
          <div style={{ display:"grid", gridTemplateColumns:"1.3fr 0.85fr 1fr 0.85fr", gap:16, marginTop:24 }}>
            {["/Mask group.png", "/Mask group (1).png", "/Mask group (2).png", "/design_ (4) 1.png"].map((img,i) => (
              <div key={i} className="gal-item" style={{ aspectRatio: i===0||i===2 ? "4/3" : "1" }}>
                <img src={img} alt="" /><div className="gal-overlay" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. PACKAGES ════════════════════════════════ */}
      <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
        <div className="page-container">
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Transparent Pricing</p>
            <h2 className="serif" style={{ fontSize:60, fontWeight:700, color:"#111", lineHeight:1 }}>Simple, Honest <span className="gradient-text">Packages.</span></h2>
            <p style={{ fontSize:15, color:"#666", margin:"16px auto 0", maxWidth:480, lineHeight:1.8 }}>Every package is a starting point. Complex or custom projects are quoted individually — reach out and we'll build the right scope together.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {packages.map((pkg,i) => (
              <div key={i} className={`pkg${pkg.featured?" featured":""}`}
                style={{ background:pkg.featured?"linear-gradient(160deg,#1a2a08,#0d1a04)":"#fff", border:"1px solid", borderColor:pkg.featured?"rgba(127,191,47,.45)":"rgba(0,0,0,.07)", borderRadius:36, padding:"44px 38px", boxShadow:pkg.featured?"0 16px 60px rgba(127,191,47,.18)":"0 4px 28px rgba(0,0,0,.06)", position:"relative" }}>
                {pkg.featured && (
                  <div style={{ position:"absolute", top:22, right:22, background:"#7fbf2f", borderRadius:100, padding:"5px 16px", fontSize:10, fontWeight:800, color:"#000", letterSpacing:".16em", textTransform:"uppercase" }}>Most Popular</div>
                )}
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:pkg.featured?"#7fbf2f":"#aaa", margin:"0 0 10px" }}>{pkg.name}</p>
                <p className="serif" style={{ fontSize:50, fontWeight:700, color:pkg.featured?"#fff":"#111", margin:"0 0 6px", lineHeight:1 }}>{pkg.price}</p>
                <p style={{ fontSize:14, color:pkg.featured?"#888":"#777", margin:"0 0 32px", lineHeight:1.7 }}>{pkg.tagline}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:36 }}>
                  {pkg.features.map((f,fi) => (
                    <div key={fi} style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                      <span style={{ color:"#7fbf2f", fontSize:14, flexShrink:0, marginTop:2 }}>✓</span>
                      <span style={{ fontSize:14, color:pkg.featured?"#ccc":"#555", lineHeight:1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" style={{ display:"block", textAlign:"center", borderRadius:100, padding:"14px 24px", fontSize:14, fontWeight:700, textDecoration:"none", background:pkg.featured?"#7fbf2f":"transparent", color:pkg.featured?"#000":"#7fbf2f", border:pkg.featured?"none":"1.5px solid rgba(127,191,47,.4)", transition:"all .3s" }}>
                  {pkg.featured ? "Get Started →" : pkg.name === "Studio" ? "Let's Talk →" : "Get Started →"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. BOTTOM CTA ═══════════════════════════════ */}
      <section style={{ background:"#060606", padding:"110px 48px", position:"relative", overflow:"hidden" }}>
        <div className="orb" style={{ width:700, height:700, background:"rgba(127,191,47,.06)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
        <div style={{ maxWidth:820, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>Ready to Begin?</p>
          <h2 className="serif" style={{ fontSize:72, fontWeight:700, color:"#fff", lineHeight:.95, margin:"0 0 24px" }}>
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
    </>
  );
}

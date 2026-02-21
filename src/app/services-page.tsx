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
  .svc-tab { cursor:pointer; border:none; background:transparent; transition:all .3s; }
  .svc-tab.active { background:#7fbf2f !important; color:#000 !important; }
  .process-line::before {
    content:''; position:absolute; top:28px; left:calc(50% + 28px);
    width:calc(100% - 56px); height:1px;
    background:linear-gradient(to right,rgba(127,191,47,.4),rgba(127,191,47,.1));
  }
  .process-item:last-child.process-line::before { display:none; }
  .pkg-card:hover { transform:translateY(-8px); box-shadow:0 40px 80px rgba(0,0,0,.25) !important; }
  .pkg-card { transition:all .4s cubic-bezier(.23,1,.32,1); }
`;

const services = [
  {
    id: "calligraphy",
    icon: "✦",
    title: "Arabic Calligraphy",
    subtitle: "Timeless scripts, digitally mastered",
    color: "#7fbf2f",
    desc: "We craft authentic Arabic calligraphy — digitally rendered for logos, wedding suites, signage, packaging, and cultural projects. Rooted in classical scripts (Thuluth, Naskh, Diwani) with a contemporary eye.",
    features: ["Logo Calligraphy", "Wedding & Event Suites", "Quranic Verses & Plaques", "Cultural Artwork", "Bilingual Compositions", "Custom Typefaces"],
    deliverables: "AI, EPS, PNG, SVG — print & screen ready",
  },
  {
    id: "brand",
    icon: "◈",
    title: "Brand Identity",
    subtitle: "Strategy meets visual storytelling",
    color: "#5a9c1a",
    desc: "From naming to logo systems, we build brand identities that hold together across every touchpoint. We research, strategise, and design — then hand over a complete brand manual so you can move forward with confidence.",
    features: ["Logo & Mark Design", "Typography System", "Colour Palette", "Brand Guidelines", "Business Stationery", "Brand Voice"],
    deliverables: "Full brand manual, all file formats, social kit",
  },
  {
    id: "social",
    icon: "◉",
    title: "Social Media Design",
    subtitle: "Scroll-stopping visual content",
    color: "#7fbf2f",
    desc: "Consistent, brand-aligned templates and campaign visuals for Instagram, Facebook, YouTube, and LinkedIn. We design for engagement — beautiful enough to stop the scroll, clear enough to convert.",
    features: ["Post & Story Templates", "Reels Thumbnails", "Profile & Cover Art", "Campaign Kits", "Monthly Content Packs", "Animated Stories"],
    deliverables: "Editable Canva / Figma templates + exported assets",
  },
  {
    id: "print",
    icon: "◇",
    title: "Print Media",
    subtitle: "From concept to press-ready art",
    color: "#5a9c1a",
    desc: "Professional print design for businesses, events, and publishers. Every file is prepared to exact printing specifications — correct bleeds, colour profiles, and resolution — so what you see on screen is what comes off the press.",
    features: ["Business Cards & Stationery", "Brochures & Catalogues", "Banners & Signage", "Book & Magazine Layouts", "Packaging Design", "Event Materials"],
    deliverables: "Press-ready PDFs, print-specifications sheet",
  },
  {
    id: "digital",
    icon: "⬡",
    title: "Digital & UI Design",
    subtitle: "Beautiful, functional interfaces",
    color: "#7fbf2f",
    desc: "Visual UI design for websites, apps, and dashboards. We work in Figma to produce high-fidelity prototypes and handoff-ready design systems, collaborating closely with your development team.",
    features: ["Website UI Design", "Landing Pages", "App Screens", "Figma Components", "Icon Sets", "Design Systems"],
    deliverables: "Figma file, component library, developer handoff",
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "We learn your brand, audience, goals, and timeline through a detailed brief." },
  { step: "02", title: "Concept", desc: "Initial directions are explored and presented — two to three distinct routes." },
  { step: "03", title: "Refine", desc: "You choose a direction, we iterate with feedback until it's exactly right." },
  { step: "04", title: "Deliver", desc: "Final files in all formats, fully documented and ready to use immediately." },
];

const packages = [
  {
    name: "Starter",
    price: "Rs. 8,000",
    desc: "Perfect for small businesses and freelancers getting started.",
    features: ["Logo design (2 concepts)", "Business card", "Social profile art", "3 revisions", "Source files"],
    highlight: false,
  },
  {
    name: "Brand Pro",
    price: "Rs. 22,000",
    desc: "Full brand identity for growing businesses ready to stand out.",
    features: ["Logo & mark system", "Full colour & type guide", "10-page brand manual", "Stationery suite", "Social media kit", "5 revisions", "All source files"],
    highlight: true,
  },
  {
    name: "Studio",
    price: "Custom",
    desc: "Comprehensive creative partnership for established brands.",
    features: ["Everything in Brand Pro", "Arabic calligraphy logo", "Print campaign design", "Monthly social content", "Priority support", "Unlimited revisions", "Direct CEO access"],
    highlight: false,
  },
];

export default function ServicesPage() {
  const [active, setActive] = useState("calligraphy");
  const current = services.find(s => s.id === active)!;

  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div>

        {/* ── HERO ── */}
        <section style={{ position:"relative", overflow:"hidden", background:"#0d0d0d", padding:"120px 48px 100px" }}>
          <div className="orb" style={{ width:600, height:600, background:"rgba(127,191,47,.07)", top:-100, right:-100 }} />
          <div className="orb" style={{ width:400, height:400, background:"rgba(127,191,47,.05)", bottom:-60, left:-80 }} />
          <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:700, height:700, borderRadius:"50%", border:"1px dashed rgba(127,191,47,.08)", animation:"spin-slow 40s linear infinite", pointerEvents:"none" }} />

          <div className="page-container" style={{ position:"relative", zIndex:1, textAlign:"center" }}>
            <div className="afu" style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:24 }}>
              <span style={{ width:32, height:1, background:"#7fbf2f", display:"block" }} />
              <span style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f" }}>What We Offer</span>
              <span style={{ width:32, height:1, background:"#7fbf2f", display:"block" }} />
            </div>
            <h1 className="serif afu d1" style={{ fontSize:88, fontWeight:700, lineHeight:.9, margin:"0 0 28px", color:"#fff" }}>
              Services That<br /><span className="gradient-text">Speak Volumes</span>
            </h1>
            <p className="afu d2" style={{ fontSize:17, lineHeight:1.85, color:"#888", maxWidth:560, margin:"0 auto 48px" }}>
              From a single logo to a complete brand overhaul — every service is delivered with the same obsessive attention to craft.
            </p>
            {/* Service tabs */}
            <div className="afu d3" style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              {services.map(s => (
                <button key={s.id} className={`svc-tab${active===s.id?" active":""}`}
                  onClick={() => setActive(s.id)}
                  style={{ borderRadius:100, padding:"10px 22px", fontSize:13, fontWeight:600, color:active===s.id?"#000":"#888", background:active===s.id?"#7fbf2f":"rgba(255,255,255,.05)", border:"1px solid", borderColor:active===s.id?"#7fbf2f":"rgba(255,255,255,.1)" }}>
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICE DETAIL ── */}
        <section style={{ background:"#060606", padding:"80px 48px" }}>
          <div className="page-container">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
                <div style={{ width:64, height:64, borderRadius:20, background:"rgba(127,191,47,.1)", border:"1px solid rgba(127,191,47,.2)", display:"grid", placeItems:"center", fontSize:28, color:"#7fbf2f" }}>
                  {current.icon}
                </div>
                <div>
                  <p style={{ fontSize:11, fontWeight:600, letterSpacing:".25em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 12px" }}>{current.subtitle}</p>
                  <h2 className="serif" style={{ fontSize:52, fontWeight:700, color:"#fff", margin:"0 0 20px", lineHeight:1.05 }}>{current.title}</h2>
                  <p style={{ fontSize:15, lineHeight:1.9, color:"#888", margin:0 }}>{current.desc}</p>
                </div>
                <div style={{ background:"rgba(127,191,47,.06)", border:"1px solid rgba(127,191,47,.15)", borderRadius:20, padding:"20px 24px" }}>
                  <p style={{ fontSize:11, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 8px" }}>Deliverables</p>
                  <p style={{ fontSize:14, color:"#aaa", margin:0 }}>{current.deliverables}</p>
                </div>
                <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#7fbf2f", color:"#000", borderRadius:100, padding:"14px 28px", fontSize:14, fontWeight:700, textDecoration:"none", width:"fit-content", boxShadow:"0 14px 40px rgba(127,191,47,.3)" }}>
                  Enquire About This Service <span style={{ fontSize:18 }}>→</span>
                </Link>
              </div>
              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#555", margin:"0 0 24px" }}>What's Included</p>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {current.features.map((f,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:16, background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)", borderRadius:14, padding:"16px 20px" }}>
                      <span style={{ width:24, height:24, borderRadius:"50%", background:"rgba(127,191,47,.15)", display:"grid", placeItems:"center", color:"#7fbf2f", fontSize:13, flexShrink:0 }}>✓</span>
                      <span style={{ fontSize:15, color:"#ddd", fontWeight:500 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div className="page-container">
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>How It Works</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#111", margin:0 }}>Our Creative <span className="gradient-text">Process</span></h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, position:"relative" }}>
              {process.map((p,i) => (
                <div key={i} className="process-line process-item" style={{ textAlign:"center", padding:"0 24px", position:"relative" }}>
                  <div style={{ width:56, height:56, borderRadius:"50%", background:"#7fbf2f", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 10px 30px rgba(127,191,47,.3)" }}>
                    <span style={{ fontSize:13, fontWeight:800, color:"#000" }}>{p.step}</span>
                  </div>
                  <h3 style={{ fontSize:20, fontWeight:700, color:"#111", margin:"0 0 12px" }}>{p.title}</h3>
                  <p style={{ fontSize:14, lineHeight:1.75, color:"#666", margin:0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section style={{ background:"#0a0a0a", padding:"100px 48px", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.06)", top:0, left:"50%", transform:"translateX(-50%)" }} />
          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Transparent Pricing</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#fff", margin:0 }}>Simple <span className="gradient-text">Packages</span></h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
              {packages.map((pkg,i) => (
                <div key={i} className="pkg-card" style={{ background:pkg.highlight?"linear-gradient(160deg,#1a2a0a,#0d1a05)":"rgba(255,255,255,.03)", border:pkg.highlight?"1px solid rgba(127,191,47,.5)":"1px solid rgba(255,255,255,.07)", borderRadius:32, padding:"40px 36px", boxShadow:pkg.highlight?"0 20px 60px rgba(127,191,47,.15)":"none", position:"relative", overflow:"hidden" }}>
                  {pkg.highlight && (
                    <div style={{ position:"absolute", top:20, right:20, background:"#7fbf2f", borderRadius:100, padding:"5px 14px", fontSize:10, fontWeight:800, color:"#000", letterSpacing:".15em", textTransform:"uppercase" }}>Most Popular</div>
                  )}
                  <p style={{ fontSize:11, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:pkg.highlight?"#7fbf2f":"#666", margin:"0 0 12px" }}>{pkg.name}</p>
                  <p className="serif" style={{ fontSize:48, fontWeight:700, color:"#fff", margin:"0 0 8px", lineHeight:1 }}>{pkg.price}</p>
                  <p style={{ fontSize:14, color:"#777", margin:"0 0 32px", lineHeight:1.7 }}>{pkg.desc}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:36 }}>
                    {pkg.features.map((f,fi) => (
                      <div key={fi} style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <span style={{ color:"#7fbf2f", fontSize:14 }}>✓</span>
                        <span style={{ fontSize:14, color:"#ccc" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" style={{ display:"block", textAlign:"center", borderRadius:100, padding:"14px 24px", fontSize:14, fontWeight:700, textDecoration:"none", background:pkg.highlight?"#7fbf2f":"transparent", color:pkg.highlight?"#000":"#7fbf2f", border:pkg.highlight?"none":"1px solid rgba(127,191,47,.4)", transition:"all .3s" }}>
                    Get Started →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
            <h2 className="serif" style={{ fontSize:64, fontWeight:700, color:"#111", margin:"0 0 24px", lineHeight:1.05 }}>
              Not Sure What You Need?<br /><span className="gradient-text">Let's Talk.</span>
            </h2>
            <p style={{ fontSize:16, color:"#666", lineHeight:1.8, margin:"0 0 40px" }}>Book a free 20-minute discovery call and we'll figure out the right package together.</p>
            <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#1a1a1a", color:"#fff", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:700, textDecoration:"none", boxShadow:"0 20px 50px rgba(0,0,0,.2)" }}>
              Book a Free Call <span style={{ width:32, height:32, borderRadius:"50%", background:"#7fbf2f", display:"grid", placeItems:"center" }}>→</span>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}

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
  @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
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
  .course-card { transition:all .45s cubic-bezier(.23,1,.32,1); cursor:pointer; }
  .course-card:hover { transform:translateY(-10px); box-shadow:0 40px 80px rgba(0,0,0,.25) !important; }
  .course-card:hover .course-img { transform:scale(1.06); }
  .course-img { transition:transform .6s ease; }
  .enroll-btn:hover { background:#5a9c1a !important; transform:translateY(-2px); box-shadow:0 16px 40px rgba(127,191,47,.5) !important; }
  .enroll-btn { transition:all .3s ease; }
  .faq-item { border-bottom:1px solid rgba(0,0,0,.06); }
  .faq-q { cursor:pointer; }
  .benefit-icon { transition:transform .3s; }
  .benefit-card:hover .benefit-icon { transform:scale(1.15) rotate(-8deg); }
`;

const courses = [
  {
    id: 1,
    title: "Digital Arabic Calligraphy",
    tag: "Recorded",
    tagColor: "#7fbf2f",
    level: "Beginner – Intermediate",
    duration: "6 Weeks",
    lessons: "24 Video Lessons",
    fee: "Rs. 5,000",
    img: "/course1.png",
    desc: "Master the foundational scripts of Arabic calligraphy — Naskh, Thuluth, and Diwani — using professional digital tools. Build confidence with the pen, then translate that mastery to screen.",
    curriculum: ["History & philosophy of Arabic scripts", "Naskh script from fundamentals", "Thuluth letterforms & compositions", "Diwani & Diwani Jali", "Digital tools: iPad + Procreate", "Creating logos & brand marks", "Final project & critique"],
    outcomes: ["Design calligraphy-based logos", "Create compositions for print & digital", "Build a professional calligraphy portfolio"],
    instructor: "Hafiz Muhammad Ammar",
    students: "340+",
  },
  {
    id: 2,
    title: "Graphic Designing",
    tag: "Recorded",
    tagColor: "#7fbf2f",
    level: "Beginner – Advanced",
    duration: "8 Weeks",
    lessons: "32 Video Lessons",
    fee: "Rs. 5,000",
    img: "/course2.png",
    desc: "A comprehensive graphic design programme covering visual thinking, typography, colour theory, layout design, and the tools of the trade. Gain real skills that get you hired or build your freelance career.",
    curriculum: ["Design principles & visual hierarchy", "Typography masterclass", "Colour theory & psychology", "Adobe Illustrator essentials", "Adobe Photoshop workflows", "Layout & print design", "Social media design", "Portfolio-ready projects"],
    outcomes: ["Design professional print & digital assets", "Use Adobe Creative Suite confidently", "Launch a freelance design career"],
    instructor: "Abu Bakar",
    students: "280+",
  },
  {
    id: 3,
    title: "Bilingual Brand Identity",
    tag: "Live",
    tagColor: "#f59e0b",
    level: "Intermediate – Advanced",
    duration: "10 Weeks",
    lessons: "Live Sessions + Recordings",
    fee: "Rs. 5,000",
    img: "/course3.png",
    desc: "The only course in Pakistan teaching brand identity specifically through the lens of Arabic and Latin bilingual design. Learn to build brand systems that work seamlessly in both scripts.",
    curriculum: ["Brand strategy fundamentals", "Logo design for bilingual brands", "Arabic + Latin type pairing", "Colour & pattern systems", "Brand guidelines documentation", "Applications: print, digital, signage", "Live critique sessions", "Capstone brand project"],
    outcomes: ["Design bilingual brand identities", "Create complete brand manuals", "Work with high-value branding clients"],
    instructor: "Hafiz Muhammad Ammar",
    students: "120+",
  },
];

const benefits = [
  { icon: "🎓", title: "Expert Instructors", desc: "Learn directly from practicing designers with real client experience." },
  { icon: "♾️", title: "Lifetime Access", desc: "All recorded courses are yours forever — revisit lessons anytime." },
  { icon: "📜", title: "Certificate", desc: "Receive a studio-verified certificate upon successful completion." },
  { icon: "🤝", title: "Community", desc: "Join a private student group for feedback, networking, and support." },
  { icon: "🗂️", title: "Project Files", desc: "Download all project assets, templates, and resource files." },
  { icon: "💬", title: "Direct Feedback", desc: "Get personal critique on your work from the course instructor." },
];

const faqs = [
  { q: "Do I need prior design experience?", a: "No. The Calligraphy and Graphic Design courses are built for complete beginners. The Bilingual Brand Identity course assumes some basic design knowledge." },
  { q: "What software do I need?", a: "For Calligraphy: an iPad with Procreate or Adobe Fresco. For Graphic Design: Adobe Illustrator and Photoshop (we guide you through setup). For Brand Identity: Illustrator + InDesign." },
  { q: "Are the live sessions recorded?", a: "Yes. All live sessions in the Bilingual Brand Identity course are recorded and available within 24 hours for enrolled students who cannot attend live." },
  { q: "Can I get a refund?", a: "We offer a 7-day satisfaction guarantee. If you're not happy in the first week, we'll refund your fee — no questions asked." },
  { q: "Is there a payment plan?", a: "Yes. We offer a two-instalment option for all courses. Contact us directly to arrange a split payment before enrolling." },
];

export default function CoursesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div>

        {/* ── HERO ── */}
        <section style={{ position:"relative", overflow:"hidden", background:"#060606", padding:"120px 48px 100px" }}>
          <div className="orb" style={{ width:600, height:600, background:"rgba(127,191,47,.07)", top:-100, right:-80 }} />
          <div className="orb" style={{ width:400, height:400, background:"rgba(127,191,47,.04)", bottom:-80, left:-80 }} />
          <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:700, height:700, borderRadius:"50%", border:"1px dashed rgba(127,191,47,.07)", animation:"spin-slow 40s linear infinite", pointerEvents:"none" }} />

          <div className="page-container" style={{ position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
            <div>
              <div className="afu" style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:24 }}>
                <span style={{ width:32, height:1, background:"#7fbf2f", display:"block" }} />
                <span style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f" }}>Learn With Us</span>
              </div>
              <h1 className="serif afu d1" style={{ fontSize:80, fontWeight:700, lineHeight:.93, margin:"0 0 28px", color:"#fff" }}>
                Skills That<br /><span className="gradient-text">Last a Lifetime.</span>
              </h1>
              <p className="afu d2" style={{ fontSize:16, lineHeight:1.9, color:"#888", margin:"0 0 40px", maxWidth:480 }}>
                Taught by professional designers who work in the industry every day. Practical, portfolio-ready, and deeply rooted in craft.
              </p>
              <div className="afu d3" style={{ display:"flex", gap:16 }}>
                <a href="#courses" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#7fbf2f", color:"#000", borderRadius:100, padding:"14px 28px", fontSize:14, fontWeight:700, textDecoration:"none", boxShadow:"0 14px 40px rgba(127,191,47,.3)" }}>
                  Browse Courses <span style={{ fontSize:16 }}>↓</span>
                </a>
                <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1px solid rgba(255,255,255,.14)", color:"#fff", borderRadius:100, padding:"14px 28px", fontSize:14, fontWeight:500, textDecoration:"none" }}>
                  Have Questions?
                </Link>
              </div>
            </div>
            {/* Stats panel */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {[
                { val:"740+", label:"Students Enrolled", icon:"🎓" },
                { val:"3", label:"Active Courses", icon:"📚" },
                { val:"4.9★", label:"Average Rating", icon:"⭐" },
                { val:"100%", label:"Online & Flexible", icon:"💻" },
              ].map((s,i) => (
                <div key={i} style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:24, padding:"28px 24px" }}>
                  <span style={{ fontSize:28, display:"block", marginBottom:12 }}>{s.icon}</span>
                  <p className="serif" style={{ fontSize:40, fontWeight:700, margin:"0 0 6px", lineHeight:1 }}><span className="gradient-text">{s.val}</span></p>
                  <p style={{ fontSize:12, color:"#666", margin:0, letterSpacing:".08em", textTransform:"uppercase" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COURSES ── */}
        <section id="courses" style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div className="page-container">
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Current Programmes</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#111", margin:0 }}>Pick Your <span className="gradient-text">Course</span></h2>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
              {courses.map((c,i) => (
                <div key={i} className="course-card" style={{ background:"#fff", border:"1px solid rgba(0,0,0,.06)", borderRadius:36, overflow:"hidden", boxShadow:"0 4px 30px rgba(0,0,0,.06)", display:"grid", gridTemplateColumns:"380px 1fr" }}>
                  <div style={{ position:"relative", overflow:"hidden" }}>
                    <img src={c.img} alt={c.title} className="course-img" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,transparent 70%,rgba(255,255,255,.3))" }} />
                    <div style={{ position:"absolute", top:20, left:20, background:c.tagColor, borderRadius:100, padding:"6px 16px", fontSize:10, fontWeight:800, color:"#000", letterSpacing:".18em", textTransform:"uppercase" }}>{c.tag}</div>
                  </div>
                  <div style={{ padding:"40px 48px", display:"flex", flexDirection:"column", gap:20 }}>
                    <div>
                      <div style={{ display:"flex", gap:16, marginBottom:16, flexWrap:"wrap" }}>
                        {[c.level, c.duration, c.lessons].map((meta,mi) => (
                          <span key={mi} style={{ fontSize:11, fontWeight:600, color:"#888", background:"rgba(0,0,0,.04)", borderRadius:100, padding:"5px 14px", letterSpacing:".05em" }}>{meta}</span>
                        ))}
                      </div>
                      <h3 className="serif" style={{ fontSize:36, fontWeight:700, color:"#111", margin:"0 0 12px", lineHeight:1.1 }}>{c.title}</h3>
                      <p style={{ fontSize:15, lineHeight:1.85, color:"#666", margin:0 }}>{c.desc}</p>
                    </div>

                    {/* Expandable curriculum */}
                    {expanded === i && (
                      <div style={{ background:"#f8f8f6", borderRadius:16, padding:"20px 24px" }}>
                        <p style={{ fontSize:11, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 14px" }}>Curriculum</p>
                        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                          {c.curriculum.map((item,ci) => (
                            <div key={ci} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                              <span style={{ color:"#7fbf2f", fontSize:13, marginTop:2 }}>→</span>
                              <span style={{ fontSize:14, color:"#555" }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:8, borderTop:"1px solid rgba(0,0,0,.06)", marginTop:"auto" }}>
                      <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                        <span className="serif" style={{ fontSize:36, fontWeight:700, color:"#7fbf2f" }}>{c.fee}</span>
                        <span style={{ fontSize:12, color:"#999" }}>/ one-time</span>
                      </div>
                      <div style={{ display:"flex", gap:12 }}>
                        <button onClick={() => setExpanded(expanded===i?null:i)} style={{ borderRadius:100, padding:"12px 22px", fontSize:13, fontWeight:600, color:"#555", background:"rgba(0,0,0,.04)", border:"1.5px solid rgba(0,0,0,.08)", cursor:"pointer" }}>
                          {expanded===i?"Hide":"View"} Curriculum
                        </button>
                        <Link href="/contact" className="enroll-btn" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#7fbf2f", color:"#000", borderRadius:100, padding:"12px 24px", fontSize:13, fontWeight:700, textDecoration:"none", boxShadow:"0 10px 28px rgba(127,191,47,.3)" }}>
                          Enrol Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section style={{ background:"#0d0d0d", padding:"100px 48px", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.06)", top:-80, right:-80 }} />
          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Why Learn Here</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#fff", margin:0 }}>The <span className="gradient-text">Ammar Designz</span> Difference</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {benefits.map((b,i) => (
                <div key={i} className="benefit-card" style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:24, padding:"32px 28px", cursor:"default" }}>
                  <span className="benefit-icon" style={{ fontSize:32, display:"block", marginBottom:20 }}>{b.icon}</span>
                  <h3 style={{ fontSize:18, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>{b.title}</h3>
                  <p style={{ fontSize:14, color:"#777", lineHeight:1.75, margin:0 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div style={{ maxWidth:800, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Common Questions</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#111", margin:0 }}>FAQ</h2>
            </div>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {faqs.map((f,i) => (
                <div key={i} className="faq-item" style={{ padding:"28px 0" }}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", background:"none", border:"none", cursor:"pointer", padding:0 }}>
                    <span style={{ fontSize:17, fontWeight:600, color:"#111", textAlign:"left" }}>{f.q}</span>
                    <span style={{ fontSize:22, color:"#7fbf2f", transform:openFaq===i?"rotate(45deg)":"none", transition:"transform .3s", flexShrink:0, marginLeft:16 }}>+</span>
                  </button>
                  {openFaq === i && (
                    <p style={{ fontSize:15, lineHeight:1.8, color:"#666", margin:"16px 0 0", maxWidth:640 }}>{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background:"#060606", padding:"100px 48px", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:600, height:600, background:"rgba(127,191,47,.06)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
          <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>Begin Today</p>
            <h2 className="serif" style={{ fontSize:64, fontWeight:700, color:"#fff", margin:"0 0 24px", lineHeight:1.05 }}>
              Invest in Your<br /><span className="gradient-text">Creative Future.</span>
            </h2>
            <p style={{ fontSize:16, color:"#888", lineHeight:1.8, margin:"0 0 40px" }}>Seats are limited. Join hundreds of students already building their design careers.</p>
            <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#7fbf2f", color:"#000", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:700, textDecoration:"none", boxShadow:"0 20px 50px rgba(127,191,47,.3)" }}>
              Enrol Now <span style={{ fontSize:18 }}>→</span>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}

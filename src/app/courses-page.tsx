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
  .pricing-card { background:#faf9f7; border-radius:20px; padding:24px; transition:all .3s ease; border:1px solid rgba(0,0,0,.06); height:100%; display:flex; flexDirection:column; }
  .pricing-card:hover { transform:translateY(-5px); box-shadow:0 10px 30px rgba(0,0,0,.08); border-color:#7fbf2f; }
`;

const courses = [
  {
    id: 1,
    title: "Digital Arabic Calligraphy Course (Beginner)",
    desc: "A complete, hands-on program designed to help you master Arabic calligraphy in the digital space, blending classical scripts with modern graphic design.",
    learnTitle: "What You’ll Master",
    learn: [
      "Graphic Design fundamentals",
      "Adobe Illustrator essentials",
      "Arabic alphabet construction principles",
      "Al-Wisam script foundations",
      "Kufic script basics",
      "Logo design & branding using Arabic typography",
      "Islamic & Quranic artwork composition"
    ],
    pricing: [
      {
        title: "Recorded Course",
        price: "7,000 Rs",
        features: [
          "30+ in-depth video lectures",
          "Downloadable assets & practice sheets",
          "Al-Wisam & Kufic scripts included",
          "Graphic Design basics included",
          "Learn at your own pace",
          "Certificate on completion"
        ]
      },
      {
        title: "Live Course",
        price: "7,000 Rs / Month",
        duration: "(2 Months)",
        features: [
          "Live interactive sessions",
          "Real-time corrections",
          "Personalized feedback",
          "Weekly practice assignments",
          "Portfolio-oriented projects",
          "Illustrator workflow guidance",
          "Layout techniques for logos & artwork",
          "Class recordings",
          "Certificate"
        ]
      }
    ],
    whoFor: [
      "Freshers in Arabic calligraphy",
      "Graphic designers wanting Arabic typography skills",
      "Artists interested in Islamic & Quranic art",
      "Logo designers & brand creators"
    ],
    cta: "Enroll Now"
  },
  {
    id: 2,
    title: "Digital Arabic Calligraphy Face Art Course (Advanced)",
    desc: "A 1-month intensive course to create Arabic calligraphy face art in vector format using Adobe Illustrator, perfect for portfolio-ready professional artworks.",
    learnTitle: "What You’ll Learn",
    learn: [
      "Vector calligraphy fundamentals",
      "Al-Wisam & Kufic in Illustrator",
      "Face art composition",
      "Typography on portraits",
      "Gradient blending techniques",
      "Path precision drawing",
      "Photo-to-vector integration",
      "Export for web & print"
    ],
    pricing: [
      {
        title: "Live Course",
        price: "8,000 Rs",
        duration: "(1 Month)",
        features: [
          "Live interactive sessions",
          "Real-time feedback",
          "Portfolio-focused projects",
          "Gradient & blending mastery",
          "Professional vector workflow",
          "Downloadable assets",
          "Certificate"
        ]
      }
    ],
    whoFor: [
      "Digital calligraphy beginners",
      "Portrait & face art creators",
      "Freelancers & content creators",
      "Designers building vector portfolios"
    ],
    cta: "Join Advanced Course"
  },
  {
    id: 3,
    title: "Graphic Design Diploma (Beginner)",
    desc: "A comprehensive diploma program designed to take you from fundamentals to professional-level work using modern AI-powered workflows.",
    learnTitle: "What You’ll Learn",
    learn: [
      "Photoshop & Illustrator",
      "Design principles & color theory",
      "Typography & layout",
      "Social media designs",
      "Logo & branding",
      "AI-powered tools",
      "Portfolio building"
    ],
    pricing: [
      {
        title: "Recorded",
        price: "15,000 Rs",
        duration: "(Full 6-Month Access)",
        features: [
          "Structured recorded lectures",
          "Lifetime access",
          "Practice files & templates"
        ]
      },
      {
        title: "Live",
        price: "5,000 Rs / Month",
        duration: "(6 Months)",
        features: [
          "Live classes",
          "Design critiques",
          "Real client projects",
          "Freelancing guidance",
          "Monthly portfolio review",
          "Class recordings",
          "Certificate"
        ]
      }
    ],
    whoFor: [
      "Complete beginners",
      "Freelancers",
      "Content creators",
      "Business owners",
      "Anyone targeting design jobs"
    ],
    cta: "Start Your Design Career"
  },
  {
    id: 4,
    title: "Brand Identity Masterclass (Advanced)",
    desc: "A live, hands-on course to master logo design, branding strategy, stylescaping, and professional brand guidelines.",
    learnTitle: "What You’ll Learn",
    learn: [
      "Advanced logo creation",
      "Branding strategy",
      "Stylescaping",
      "Brand storytelling",
      "Brand guideline development",
      "Real-world application"
    ],
    pricing: [
      {
        title: "Live Course",
        price: "6,000 Rs / Month",
        duration: "(3 Months)",
        features: [
          "Interactive sessions",
          "Real-time feedback",
          "Portfolio-ready brand projects",
          "Professional client presentation guidance",
          "Class recordings"
        ]
      }
    ],
    whoFor: [
      "Designers upgrading to branding",
      "Freelancers",
      "Creative professionals"
    ],
    cta: "Master Brand Identity"
  },
  {
    id: 5,
    title: "Social Media Designs Course",
    desc: "A practical, job-focused course to master high-impact social media visuals using Photoshop.",
    learnTitle: "What You’ll Learn",
    learn: [
      "Photoshop workflows",
      "Social media layout design",
      "Posters & flyers",
      "Image manipulation",
      "Export optimization"
    ],
    pricing: [
      {
        title: "Live Course",
        price: "5,000 Rs / Month",
        duration: "(2 Months)",
        features: [
          "Live design demonstrations",
          "Real-time corrections",
          "Portfolio projects",
          "Campaign & brand consistency training",
          "Certificate"
        ]
      }
    ],
    whoFor: [
      "Beginners",
      "Content creators",
      "Freelancers",
      "Business owners"
    ],
    cta: "Join Social Media Course"
  }
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
                { val:"5", label:"Active Courses", icon:"📚" },
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
            <div style={{ display:"flex", flexDirection:"column", gap:64 }}>
              {courses.map((c,i) => (
                <div key={i} className="course-section" style={{ background:"#fff", border:"1px solid rgba(0,0,0,.06)", borderRadius:36, padding:"48px", boxShadow:"0 4px 30px rgba(0,0,0,.04)" }}>
                  <div style={{ maxWidth:"800px", margin:"0 auto" }}>
                    <h3 className="serif" style={{ fontSize:42, fontWeight:700, color:"#111", margin:"0 0 16px" }}>{c.title}</h3>
                    <p style={{ fontSize:16, lineHeight:1.8, color:"#666", margin:"0 0 40px" }}>{c.desc}</p>

                    <div style={{ marginBottom:40 }}>
                      <h4 style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>{c.learnTitle}</h4>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                        {c.learn.map((item,idx) => (
                          <div key={idx} style={{ display:"flex", gap:10, alignItems:"start" }}>
                            <span style={{ color:"#7fbf2f", marginTop:4 }}>✓</span>
                            <span style={{ fontSize:15, color:"#444" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display:"grid", gridTemplateColumns: c.pricing.length > 1 ? "1fr 1fr" : "1fr", gap:24, marginBottom:40 }}>
                      {c.pricing.map((p,idx) => (
                        <div key={idx} className="pricing-card">
                          <h5 style={{ fontSize:18, fontWeight:700, margin:"0 0 8px" }}>{p.title}</h5>
                          <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:16 }}>
                            <span style={{ fontSize:28, fontWeight:700, color:"#7fbf2f" }}>{p.price}</span>
                            {p.duration && <span style={{ fontSize:13, color:"#888" }}>{p.duration}</span>}
                          </div>
                          <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10 }}>
                            {p.features.map((f,fidx) => (
                              <li key={fidx} style={{ fontSize:14, color:"#555", display:"flex", gap:8 }}>
                                <span style={{ color:"#ccc", fontSize:10 }}>●</span> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div style={{ background:"#f8f8f6", padding:"24px", borderRadius:16, marginBottom:40 }}>
                      <h4 style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#888", margin:"0 0 16px" }}>Who This Is For</h4>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                        {c.whoFor.map((w,idx) => (
                          <span key={idx} style={{ background:"#fff", border:"1px solid rgba(0,0,0,.05)", padding:"8px 16px", borderRadius:100, fontSize:13, color:"#555" }}>{w}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ textAlign:"center" }}>
                      <Link href="/contact" className="enroll-btn" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#7fbf2f", color:"#000", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:700, textDecoration:"none", boxShadow:"0 10px 28px rgba(127,191,47,.3)" }}>
                        {c.cta} <span style={{ fontSize:18 }}>→</span>
                      </Link>
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

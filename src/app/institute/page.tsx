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
  @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
  @keyframes marquee { from{transform:translateX(0);}to{transform:translateX(-50%);} }
  .afu{animation:fadeUp .9s cubic-bezier(.23,1,.32,1) both;}
  .d1{animation-delay:.1s}.d2{animation-delay:.25s}.d3{animation-delay:.4s}
  .gradient-text {
    background:linear-gradient(135deg,#7fbf2f 0%,#a8e04a 50%,#5a9c1a 100%);
    background-size:200% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;animation:shimmer 4s linear infinite;
  }
  .orb{border-radius:50%;filter:blur(70px);position:absolute;pointer-events:none;}
  .marquee-track { display:flex; animation:marquee 30s linear infinite; width:max-content; }
  .course-card { transition:all .45s cubic-bezier(.23,1,.32,1); }
  .course-card:hover { transform:translateY(-10px); box-shadow:0 40px 80px rgba(0,0,0,.18) !important; }
  .course-card:hover .course-thumb { transform:scale(1.06); }
  .course-thumb { transition:transform .6s ease; }
  .mentor-card:hover { transform:translateY(-6px); box-shadow:0 30px 70px rgba(0,0,0,.12) !important; }
  .mentor-card { transition:all .4s ease; }
  .mentor-card img { filter:grayscale(1); transition:all .5s ease; }
  .mentor-card:hover img { filter:grayscale(0); transform:scale(1.04); }
  .step-dot { transition:all .3s; }
  .enroll-btn:hover { background:#5a9c1a !important; transform:translateY(-2px); box-shadow:0 20px 50px rgba(127,191,47,.5) !important; }
  .enroll-btn { transition:all .3s ease; }
  input:focus, textarea:focus, select:focus { border-color:#7fbf2f !important; box-shadow:0 0 0 3px rgba(127,191,47,.12) !important; outline:none; }
  input, textarea, select { outline:none; font-family:'DM Sans',sans-serif; }
  .tab-btn.active { background:#7fbf2f !important; color:#000 !important; border-color:#7fbf2f !important; }
  .tab-btn { transition:all .25s; cursor:pointer; border:none; font-family:'DM Sans',sans-serif; }
  .stat-box:hover { transform:scale(1.03); }
  .stat-box { transition:transform .3s ease; }
  .feature-row:hover { background:rgba(127,191,47,.04) !important; }
  .feature-row { transition:background .25s; }
`;

const courses = [
  {
    title: "Digital Arabic Calligraphy",
    tag: "Recorded",
    tagColor: "#7fbf2f",
    level: "Beginner",
    weeks: "6 Weeks",
    lessons: "24 Lessons",
    students: "340+",
    rating: "4.9",
    fee: "Rs. 5,000",
    img: "/course1.png",
    desc: "Learn classical Arabic scripts — Naskh, Thuluth & Diwani — using iPad and Procreate. Create calligraphy logos, compositions, and brand marks.",
    skills: ["Naskh & Thuluth scripts", "Digital tools mastery", "Logo calligraphy", "Brand compositions"],
  },
  {
    title: "Graphic Designing",
    tag: "Recorded",
    tagColor: "#7fbf2f",
    level: "Beginner – Advanced",
    weeks: "8 Weeks",
    lessons: "32 Lessons",
    students: "280+",
    rating: "4.8",
    fee: "Rs. 5,000",
    img: "/course2.png",
    desc: "A complete graphic design programme covering visual thinking, Adobe Illustrator, Photoshop, typography, colour theory, and portfolio-ready projects.",
    skills: ["Adobe Illustrator", "Typography", "Colour theory", "Print & digital design"],
  },
  {
    title: "Bilingual Brand Identity",
    tag: "Live",
    tagColor: "#f59e0b",
    level: "Intermediate",
    weeks: "10 Weeks",
    lessons: "Live + Recorded",
    students: "120+",
    rating: "5.0",
    fee: "Rs. 5,000",
    img: "/course3.png",
    desc: "The only Pakistani course teaching brand identity specifically through Arabic and Latin bilingual design. Build complete brand systems for both scripts.",
    skills: ["Bilingual brand systems", "Brand guidelines", "Arabic + Latin pairing", "Client presentation"],
  },
  {
    title: "Social Media Design",
    tag: "Upcoming",
    tagColor: "#64748b",
    level: "Beginner",
    weeks: "4 Weeks",
    lessons: "16 Lessons",
    students: "Enrolling soon",
    rating: "New",
    fee: "Rs. 5,000",
    img: "/course3.png",
    desc: "Design scroll-stopping content for Instagram, Facebook, and YouTube. Templates, reels thumbnails, campaign kits and more.",
    skills: ["Canva & Illustrator", "Instagram design", "Reel thumbnails", "Brand templates"],
  },
];

const mentors = [
  { name: "Hafiz Muhammad Ammar", role: "CEO & Lead Instructor", specialty: "Arabic Calligraphy & Brand Identity", courses: "2 Courses", img: "/member.png" },
  { name: "Abu Bakar", role: "Senior Instructor", specialty: "Graphic Design & Print Media", courses: "1 Course", img: "/member.png" },
  { name: "Umar Farooq", role: "Guest Instructor", specialty: "Video & Motion Design", courses: "Workshops", img: "/member.png" },
];

const whyUs = [
  { icon: "🏛️", title: "Studio-Based Learning", desc: "Every lesson is built from real client work — not generic theory from a textbook." },
  { icon: "🎓", title: "Verified Certificate", desc: "A studio-issued certificate that carries weight in the Pakistani design industry." },
  { icon: "♾️", title: "Lifetime Access", desc: "Recorded courses stay yours forever. Rewatch lessons at any pace." },
  { icon: "👥", title: "Private Community", desc: "Access to a student WhatsApp group for peer feedback and networking." },
  { icon: "📁", title: "All Project Files", desc: "Download every template, exercise file, and resource used in the course." },
  { icon: "💬", title: "Direct Critique", desc: "Personal feedback from your instructor on submitted projects." },
  { icon: "🔄", title: "Content Updates", desc: "Courses are updated when tools or industry practices evolve." },
  { icon: "🤝", title: "Job Referrals", desc: "Top graduates may be referred to studio clients or hired by the team." },
];

const steps = [
  { n: "01", title: "Choose Your Course", desc: "Browse the institute's programmes and select the one that fits your goals and skill level." },
  { n: "02", title: "Enrol & Pay", desc: "Complete the simple enrolment form and make payment. Receive your login within 24 hours." },
  { n: "03", title: "Start Learning", desc: "Access your course dashboard, download resources, and begin at your own pace." },
  { n: "04", title: "Submit Projects", desc: "Complete assignments and submit for personal instructor feedback and critique." },
  { n: "05", title: "Get Certified", desc: "Pass the final project review and receive your Ammar Designz Institute certificate." },
];

const faqs = [
  { q: "Are the courses 100% online?", a: "Yes. All recorded courses are fully online. The Bilingual Brand Identity live sessions are also accessible remotely via Zoom, with recordings available within 24 hours." },
  { q: "What if I fall behind in a live cohort?", a: "No stress. All live sessions are recorded and uploaded within 24 hours. You can catch up at your own pace without missing any content." },
  { q: "Do I get a refund if the course isn't right for me?", a: "We offer a 7-day money-back guarantee on all courses. If you're not satisfied in the first week, contact us and we'll refund your fee in full." },
  { q: "Can I enrol in multiple courses at once?", a: "Absolutely. You can enrol in as many courses as you like simultaneously. We offer a bundled discount — contact us for details." },
  { q: "Is the certificate recognised?", a: "Our certificate is studio-verified and recognised by design employers and freelance clients across Pakistan. It carries genuine industry credibility." },
];

export default function InstitutePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [enrollForm, setEnrollForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const tabs = ["All", "Recorded", "Live", "Upcoming"];
  const filtered = activeTab === "All" ? courses : courses.filter(c => c.tag === activeTab);

  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div>

        {/* ── HERO ── */}
        <section style={{ position:"relative", overflow:"hidden", background:"linear-gradient(160deg,#fdfcfa,#f4f9ec 55%,#fdfcfa)", padding:"120px 48px 80px", minHeight:"90vh", display:"flex", alignItems:"center" }}>
          <div className="orb" style={{ width:600, height:600, background:"rgba(127,191,47,.09)", top:-100, right:-100 }} />
          <div className="orb" style={{ width:400, height:400, background:"rgba(127,191,47,.05)", bottom:-60, left:-80 }} />
          <div style={{ position:"absolute", right:"4%", top:"50%", transform:"translateY(-50%)", width:500, height:500, borderRadius:"50%", border:"1px dashed rgba(127,191,47,.2)", animation:"spin-slow 30s linear infinite", pointerEvents:"none" }} />
          <div style={{ position:"absolute", right:"7%", top:"50%", transform:"translateY(-50%)", width:400, height:400, borderRadius:"50%", border:"1px solid rgba(127,191,47,.07)", pointerEvents:"none" }} />

          <div className="page-container" style={{ position:"relative", zIndex:1, width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
            <div>
              {/* Badge */}
              <div className="afu" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(127,191,47,.1)", border:"1px solid rgba(127,191,47,.25)", borderRadius:100, padding:"8px 18px", marginBottom:28 }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#7fbf2f", boxShadow:"0 0 10px #7fbf2f" }} />
                <span style={{ fontSize:11, fontWeight:600, letterSpacing:".22em", textTransform:"uppercase", color:"#5a9c1a" }}>Ammar Designz Institute</span>
              </div>
              <h1 className="serif afu d1" style={{ fontSize:76, fontWeight:700, lineHeight:.95, margin:"0 0 24px", color:"#111" }}>
                Where Craft<br />Becomes <span className="gradient-text">Career.</span>
              </h1>
              <p className="afu d2" style={{ fontSize:17, lineHeight:1.9, color:"#666", maxWidth:500, margin:"0 0 40px" }}>
                Pakistan's premier design education institute — offering hands-on courses in Arabic calligraphy, graphic design, and brand identity, taught by working professionals.
              </p>
              <div className="afu d3" style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                <a href="#courses" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#1a1a1a", color:"#fff", borderRadius:100, padding:"14px 28px", fontSize:14, fontWeight:700, textDecoration:"none", boxShadow:"0 20px 50px rgba(0,0,0,.2)" }}>
                  Explore Courses <span style={{ width:30, height:30, borderRadius:"50%", background:"#7fbf2f", display:"grid", placeItems:"center" }}>↓</span>
                </a>
                <button onClick={() => setEnrollForm(true)} style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1.5px solid rgba(0,0,0,.15)", color:"#444", background:"transparent", borderRadius:100, padding:"14px 28px", fontSize:14, fontWeight:600, cursor:"pointer" }}>
                  Enrol Now
                </button>
              </div>

              {/* Micro-stats */}
              <div className="afu d4" style={{ display:"flex", gap:40, marginTop:48, paddingTop:32, borderTop:"1px solid rgba(0,0,0,.08)" }}>
                {[
                  { val:"740+", label:"Students Enrolled" },
                  { val:"4.9★", label:"Average Rating" },
                  { val:"4", label:"Courses Available" },
                ].map((s,i) => (
                  <div key={i}>
                    <p className="serif" style={{ fontSize:40, fontWeight:700, margin:0, lineHeight:1, color:"#111" }}><span className="gradient-text">{s.val}</span></p>
                    <p style={{ fontSize:12, color:"#999", margin:"4px 0 0", letterSpacing:".06em", textTransform:"uppercase" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image panel */}
            <div className="afu d2" style={{ position:"relative" }}>
              <div className="float" style={{ position:"relative" }}>
                <div style={{ borderRadius:"55% 45% 50% 50% / 45% 50% 50% 55%", overflow:"hidden", boxShadow:"0 60px 120px rgba(0,0,0,.18)" }}>
                  <img src="/course1.png" alt="Institute" style={{ width:"100%", display:"block", objectFit:"cover" }} />
                </div>
                {/* Floating badge */}
                <div style={{ position:"absolute", bottom:20, left:-40, background:"#fff", borderRadius:20, padding:"14px 20px", boxShadow:"0 20px 50px rgba(0,0,0,.14)", display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg,#7fbf2f,#a8e04a)", display:"grid", placeItems:"center", fontSize:20 }}>🎓</div>
                  <div>
                    <p style={{ margin:0, fontSize:13, fontWeight:700, color:"#111" }}>Certified Studio</p>
                    <p style={{ margin:0, fontSize:11, color:"#888" }}>Industry recognised</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div style={{ background:"#7fbf2f", overflow:"hidden", padding:"14px 0" }}>
          <div className="marquee-track">
            {Array(10).fill(["Calligraphy • ", "Brand Identity • ", "Graphic Design • ", "Print Media • ", "Certification • ", "Live Feedback • "]).flat().map((t,i) => (
              <span key={i} style={{ fontSize:11, fontWeight:700, color:"#fff", letterSpacing:".22em", textTransform:"uppercase", whiteSpace:"nowrap", paddingRight:4 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── COURSES ── */}
        <section id="courses" style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div className="page-container">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:64 }}>
              <div>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Our Programmes</p>
                <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#111", margin:0 }}>Current <span className="gradient-text">Courses</span></h2>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                {tabs.map(t => (
                  <button key={t} className={`tab-btn${activeTab===t?" active":""}`}
                    onClick={() => setActiveTab(t)}
                    style={{ borderRadius:100, padding:"10px 22px", fontSize:13, fontWeight:600, color:activeTab===t?"#000":"#666", background:activeTab===t?"#7fbf2f":"#fff", border:"1.5px solid", borderColor:activeTab===t?"#7fbf2f":"rgba(0,0,0,.1)" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:28 }}>
              {filtered.map((c,i) => (
                <div key={i} className="course-card" style={{ background:"#fff", border:"1px solid rgba(0,0,0,.06)", borderRadius:32, overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,.06)" }}>
                  <div style={{ position:"relative", height:240, overflow:"hidden" }}>
                    <img src={c.img} alt={c.title} className="course-thumb" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.5),transparent)" }} />
                    <div style={{ position:"absolute", top:20, left:20, display:"flex", gap:8 }}>
                      <span style={{ background:c.tagColor, borderRadius:100, padding:"5px 14px", fontSize:10, fontWeight:800, color:c.tag==="Upcoming"?"#fff":"#000", letterSpacing:".15em", textTransform:"uppercase" }}>{c.tag}</span>
                      <span style={{ background:"rgba(0,0,0,.5)", borderRadius:100, padding:"5px 14px", fontSize:10, fontWeight:600, color:"#fff", letterSpacing:".1em" }}>{c.level}</span>
                    </div>
                    <div style={{ position:"absolute", bottom:16, left:20, right:20, display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:12, color:"rgba(255,255,255,.8)" }}>👥 {c.students}</span>
                      <span style={{ fontSize:12, color:"rgba(255,255,255,.8)" }}>⭐ {c.rating}</span>
                    </div>
                  </div>
                  <div style={{ padding:"28px 32px" }}>
                    <div style={{ display:"flex", gap:12, marginBottom:14, flexWrap:"wrap" }}>
                      {[c.weeks, c.lessons].map((m,mi) => (
                        <span key={mi} style={{ fontSize:11, fontWeight:600, color:"#888", background:"rgba(0,0,0,.04)", borderRadius:100, padding:"5px 14px" }}>{m}</span>
                      ))}
                    </div>
                    <h3 className="serif" style={{ fontSize:30, fontWeight:700, color:"#111", margin:"0 0 12px", lineHeight:1.15 }}>{c.title}</h3>
                    <p style={{ fontSize:14, lineHeight:1.8, color:"#666", margin:"0 0 20px" }}>{c.desc}</p>

                    <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
                      {c.skills.map((s,si) => (
                        <span key={si} style={{ fontSize:11, fontWeight:500, color:"#7fbf2f", background:"rgba(127,191,47,.08)", border:"1px solid rgba(127,191,47,.18)", borderRadius:100, padding:"4px 12px" }}>{s}</span>
                      ))}
                    </div>

                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:20, borderTop:"1px solid rgba(0,0,0,.06)" }}>
                      <div>
                        <span style={{ fontSize:11, color:"#aaa", display:"block", marginBottom:2 }}>Course Fee</span>
                        <span className="serif" style={{ fontSize:32, fontWeight:700, color:"#7fbf2f" }}>{c.fee}</span>
                      </div>
                      <button onClick={() => { setSelectedCourse(c.title); setEnrollForm(true); }} className="enroll-btn"
                        style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#7fbf2f", color:"#000", borderRadius:100, padding:"12px 24px", fontSize:13, fontWeight:700, border:"none", cursor:"pointer", boxShadow:"0 10px 28px rgba(127,191,47,.3)" }}>
                        Enrol Now →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section style={{ background:"#0d0d0d", padding:"100px 48px", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.07)", top:-80, right:-80 }} />
          <div className="orb" style={{ width:400, height:400, background:"rgba(127,191,47,.05)", bottom:-80, left:-60 }} />
          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
              <div>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>The Difference</p>
                <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#fff", margin:"0 0 24px", lineHeight:1.05 }}>Why the <span className="gradient-text">Institute?</span></h2>
                <p style={{ fontSize:15, lineHeight:1.9, color:"#888", margin:"0 0 40px" }}>
                  Most design courses teach software. We teach design thinking — grounded in real studio experience, cultural depth, and the kind of feedback that actually makes you better.
                </p>
                <div style={{ background:"rgba(127,191,47,.06)", border:"1px solid rgba(127,191,47,.15)", borderRadius:24, padding:"28px 32px" }}>
                  <p className="serif" style={{ fontSize:24, fontStyle:"italic", color:"#ccc", lineHeight:1.6, margin:0 }}>
                    "Talent is everywhere. What's rare is guidance — a mentor who's walked the exact path you want to walk."
                  </p>
                  <p style={{ fontSize:13, color:"#7fbf2f", margin:"16px 0 0", fontWeight:600 }}>— Hafiz Muhammad Ammar, Founder</p>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {whyUs.map((w,i) => (
                  <div key={i} className="feature-row" style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)", borderRadius:20, padding:"22px 20px" }}>
                    <span style={{ fontSize:26, display:"block", marginBottom:12 }}>{w.icon}</span>
                    <h4 style={{ fontSize:14, fontWeight:700, color:"#fff", margin:"0 0 6px" }}>{w.title}</h4>
                    <p style={{ fontSize:12, color:"#666", lineHeight:1.65, margin:0 }}>{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div className="page-container">
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>The Journey</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#111", margin:0 }}>How It <span className="gradient-text">Works</span></h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:24, position:"relative" }}>
              {/* connecting line */}
              <div style={{ position:"absolute", top:28, left:"10%", right:"10%", height:1, background:"linear-gradient(to right,rgba(127,191,47,.3),rgba(127,191,47,.1),rgba(127,191,47,.3))", zIndex:0 }} />
              {steps.map((s,i) => (
                <div key={i} style={{ textAlign:"center", position:"relative", zIndex:1 }}>
                  <div style={{ width:56, height:56, borderRadius:"50%", background:"#7fbf2f", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 10px 30px rgba(127,191,47,.3)" }}>
                    <span style={{ fontSize:13, fontWeight:800, color:"#000" }}>{s.n}</span>
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:"#111", margin:"0 0 10px" }}>{s.title}</h3>
                  <p style={{ fontSize:13, lineHeight:1.7, color:"#777", margin:0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MENTORS ── */}
        <section style={{ background:"#060606", padding:"100px 48px", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.06)", top:-80, left:"50%", transform:"translateX(-50%)" }} />
          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Learn From the Best</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#fff", margin:0 }}>Your <span className="gradient-text">Mentors</span></h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
              {mentors.map((m,i) => (
                <div key={i} className="mentor-card" style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:32, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,.2)", cursor:"pointer" }}>
                  <div style={{ aspectRatio:"4/5", overflow:"hidden" }}>
                    <img src={m.img} alt={m.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  </div>
                  <div style={{ padding:"24px 28px" }}>
                    <p style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 6px" }}>{m.role}</p>
                    <h4 style={{ fontSize:20, fontWeight:700, color:"#fff", margin:"0 0 8px", lineHeight:1.2 }}>{m.name}</h4>
                    <p style={{ fontSize:13, color:"#888", margin:"0 0 16px" }}>{m.specialty}</p>
                    <span style={{ fontSize:11, fontWeight:600, color:"#5a9c1a", background:"rgba(127,191,47,.1)", border:"1px solid rgba(127,191,47,.2)", borderRadius:100, padding:"5px 14px" }}>{m.courses}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div style={{ maxWidth:800, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Have Questions?</p>
              <h2 className="serif" style={{ fontSize:56, fontWeight:700, color:"#111", margin:0 }}>FAQ</h2>
            </div>
            <div>
              {faqs.map((f,i) => (
                <div key={i} style={{ borderBottom:"1px solid rgba(0,0,0,.06)", padding:"28px 0" }}>
                  <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                    style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", background:"none", border:"none", cursor:"pointer", padding:0 }}>
                    <span style={{ fontSize:17, fontWeight:600, color:"#111", textAlign:"left" }}>{f.q}</span>
                    <span style={{ fontSize:24, color:"#7fbf2f", transform:openFaq===i?"rotate(45deg)":"none", transition:"transform .3s", flexShrink:0, marginLeft:16 }}>+</span>
                  </button>
                  {openFaq===i && <p style={{ fontSize:15, lineHeight:1.8, color:"#666", margin:"16px 0 0" }}>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENROL FORM MODAL ── */}
        {enrollForm && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.7)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }} onClick={() => { setEnrollForm(false); setSubmitted(false); }}>
            <div style={{ background:"#fff", borderRadius:36, padding:"52px 48px", maxWidth:560, width:"100%", maxHeight:"90vh", overflowY:"auto", position:"relative" }} onClick={e => e.stopPropagation()}>
              <button onClick={() => { setEnrollForm(false); setSubmitted(false); }} style={{ position:"absolute", top:20, right:24, background:"rgba(0,0,0,.06)", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:18, display:"grid", placeItems:"center" }}>×</button>
              {submitted ? (
                <div style={{ textAlign:"center", padding:"32px 0" }}>
                  <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(127,191,47,.1)", border:"2px solid #7fbf2f", display:"grid", placeItems:"center", fontSize:32, margin:"0 auto 20px" }}>✓</div>
                  <h3 className="serif" style={{ fontSize:36, fontWeight:700, color:"#111", margin:"0 0 14px" }}>You're Enrolled!</h3>
                  <p style={{ fontSize:15, color:"#666", lineHeight:1.8 }}>We'll send your course access details to your email within 24 hours.</p>
                </div>
              ) : (
                <>
                  <p style={{ fontSize:11, fontWeight:600, letterSpacing:".25em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 10px" }}>Course Enrolment</p>
                  <h3 className="serif" style={{ fontSize:38, fontWeight:700, color:"#111", margin:"0 0 32px", lineHeight:1.1 }}>Join the<br /><span className="gradient-text">Institute.</span></h3>
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <input type="text" placeholder="Full Name *" style={{ height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                    <input type="email" placeholder="Email Address *" style={{ height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                    <input type="tel" placeholder="WhatsApp Number *" style={{ height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                    <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}
                      style={{ height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#555", transition:"all .25s", appearance:"none" }}>
                      <option value="">Select Course *</option>
                      {courses.map(c => <option key={c.title}>{c.title}</option>)}
                    </select>
                    <select style={{ height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#555", transition:"all .25s", appearance:"none" }}>
                      <option value="">How did you hear about us?</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>Friend / Referral</option>
                      <option>Google Search</option>
                      <option>Other</option>
                    </select>
                    <button onClick={() => setSubmitted(true)}
                      style={{ height:56, borderRadius:100, background:"#7fbf2f", color:"#000", fontSize:15, fontWeight:700, border:"none", cursor:"pointer", boxShadow:"0 14px 40px rgba(127,191,47,.3)", transition:"all .3s" }}>
                      Complete Enrolment →
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── BOTTOM CTA ── */}
        <section style={{ background:"#060606", padding:"100px 48px", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:600, height:600, background:"rgba(127,191,47,.06)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
          <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>Begin Your Journey</p>
            <h2 className="serif" style={{ fontSize:64, fontWeight:700, color:"#fff", margin:"0 0 24px", lineHeight:1.05 }}>
              Your Creative<br /><span className="gradient-text">Future Starts Here.</span>
            </h2>
            <p style={{ fontSize:16, color:"#888", lineHeight:1.8, margin:"0 auto 40px", maxWidth:520 }}>
              Join 740+ students who've chosen to invest in their design career with the Ammar Designz Institute.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
              <button onClick={() => setEnrollForm(true)} className="enroll-btn"
                style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#7fbf2f", color:"#000", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:700, border:"none", cursor:"pointer", boxShadow:"0 20px 50px rgba(127,191,47,.3)" }}>
                Enrol Today <span style={{ fontSize:18 }}>→</span>
              </button>
              <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", border:"1px solid rgba(255,255,255,.14)", color:"#fff", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:500, textDecoration:"none" }}>
                Ask a Question
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

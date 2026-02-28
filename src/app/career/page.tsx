"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";

const LOCAL_STYLES = `
  .job-card { transition:all .4s cubic-bezier(.23,1,.32,1); cursor:pointer; }
  .job-card:hover { transform:translateY(-6px); box-shadow:0 30px 70px rgba(0,0,0,.12) !important; }
  .job-card.expanded { border-color:rgba(127,191,47,.4) !important; }
  .perk-card:hover { transform:translateY(-4px); }
  .perk-card { transition:transform .35s ease; }
  .perk-card:hover .perk-icon { transform:scale(1.15) rotate(-8deg); }
  .perk-icon { transition:transform .35s ease; }
  input:focus, textarea:focus, select:focus {
    border-color:#7fbf2f !important;
    box-shadow:0 0 0 3px rgba(127,191,47,.12) !important;
    outline:none;
  }
  input, textarea, select { outline:none; font-family:var(--font-dm-sans),sans-serif; }
  .submit-btn:hover { background:#5a9c1a !important; transform:translateY(-2px); box-shadow:0 20px 50px rgba(127,191,47,.5) !important; }
  .submit-btn { transition:all .3s ease; }
  .filter-btn.active { background:#7fbf2f !important; color:#000 !important; border-color:#7fbf2f !important; }
  .filter-btn { transition:all .25s; cursor:pointer; border:none; font-family:var(--font-dm-sans),sans-serif; }
  .value-item:hover { background:#fff !important; box-shadow: 0 10px 30px rgba(0,0,0,.05); }
  .value-item { transition:all .3s; }

  .career-hero { padding:120px 48px 100px; }
  .section-padding { padding:100px 48px; }

  .career-hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .career-values-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .career-perks-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .career-job-detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
  .career-form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .job-card-header { padding:28px 36px; display:grid; grid-template-columns:1fr auto; gap:24px; align-items:center; }
  .job-card-content { padding:0 36px 36px; }
  .form-card { background:#fff; border-radius:40px; padding:56px 52px; border:1px solid rgba(0,0,0,.05); box-shadow:0 8px 50px rgba(0,0,0,.07); }

  @media (max-width: 1024px) {
    .career-hero { padding:100px 32px 64px; }
    .section-padding { padding:80px 32px; }
    .career-hero-grid { grid-template-columns:1fr; gap:48px; }
    .career-perks-grid { grid-template-columns:repeat(2,1fr); }
    .form-card { padding:48px 32px; }
  }

  @media (max-width: 768px) {
    .career-hero { padding:96px 24px 56px; }
    .section-padding { padding:60px 24px; }
    .career-hero-grid { grid-template-columns:1fr !important; gap:40px !important; }
    .career-values-grid { grid-template-columns:1fr !important; gap:24px !important; }
    .career-perks-grid { grid-template-columns:1fr !important; gap:24px !important; }
    .career-job-detail-grid { grid-template-columns:1fr !important; gap:32px !important; }
    .career-form-row { grid-template-columns:1fr !important; gap:24px !important; }
    .job-card-header { padding:24px 20px !important; grid-template-columns:1fr !important; gap:20px !important; }
    .job-card-content { padding:0 20px 24px !important; }
    .form-card { padding:40px 24px !important; border-radius:28px !important; }
  }

  @media (max-width: 480px) {
    .career-hero { padding:80px 20px 48px; }
    .section-padding { padding:48px 20px; }
    .form-card { padding:32px 20px !important; border-radius:24px !important; }
  }
`;

const openings = [
  {
    title: "Senior Graphic Designer",
    type: "Full-Time",
    location: "The Studio",
    department: "Design",
    salary: "Rs. 40,000 – 60,000/mo",
    posted: "2 days ago",
    urgent: true,
    desc: "We're looking for a senior designer who can lead visual projects independently, mentor junior team members, and bring fresh creative ideas to client briefs across brand, print, and digital.",
    requirements: [
      "3+ years of professional graphic design experience",
      "Expert in Adobe Illustrator, Photoshop & InDesign",
      "Strong portfolio across brand and print projects",
      "Ability to handle multiple projects simultaneously",
      "Strong communication and client-facing skills",
    ],
    niceToHave: [
      "Experience with Arabic / bilingual design",
      "Motion graphics or video editing skills",
      "Figma / UI design experience",
    ],
  },
  {
    title: "Arabic Calligraphy Artist",
    type: "Full-Time",
    location: "The Studio",
    department: "Calligraphy",
    salary: "Rs. 35,000 – 55,000/mo",
    posted: "5 days ago",
    urgent: false,
    desc: "Join our calligraphy team to create stunning digital and traditional Arabic scripts for clients across brand, publishing, cultural, and architectural projects.",
    requirements: [
      "Formal training or 2+ years in Arabic calligraphy",
      "Proficiency in at least 3 classical scripts (Naskh, Thuluth, Diwani)",
      "Digital calligraphy skills (iPad / Procreate)",
      "Eye for composition and negative space",
      "Attention to detail and cultural sensitivity",
    ],
    niceToHave: [
      "Experience with logo calligraphy",
      "Knowledge of Ruq'ah or Kufic scripts",
      "Adobe Illustrator for tracing",
    ],
  },
  {
    title: "Social Media & Content Designer",
    type: "Full-Time",
    location: "The Studio",
    department: "Design",
    salary: "Rs. 28,000 – 42,000/mo",
    posted: "1 week ago",
    urgent: false,
    desc: "Design scroll-stopping social content for our studio clients — Instagram posts, Reels thumbnails, stories, and ad creatives — while managing consistency with brand guidelines.",
    requirements: [
      "1–2 years of social media design experience",
      "Canva and Adobe Creative Suite skills",
      "Understanding of visual trends across Instagram & Facebook",
      "Ability to maintain brand consistency across assets",
      "Fast turnaround without sacrificing quality",
    ],
    niceToHave: [
      "Motion / animation skills",
      "Copywriting ability",
      "Experience with Reels / short-form video design",
    ],
  },
  {
    title: "Social Media Designer Junior",
    type: "Full-Time",
    location: "The Studio",
    department: "Design",
    salary: "Rs. 20,000 – 30,000/mo",
    posted: "Just now",
    urgent: true,
    desc: "Kickstart your career by creating engaging social media content. Perfect for fresh graduates with a strong eye for design and trends.",
    requirements: [
      "Strong portfolio of social media graphics",
      "Proficiency in Adobe Photoshop & Illustrator",
      "Understanding of visual hierarchy and typography",
      "Ability to work in a fast-paced environment",
    ],
    niceToHave: [
      "Video editing skills (CapCut/Premiere)",
      "Basic animation knowledge",
    ],
  },
  {
    title: "Design Intern",
    type: "Internship",
    location: "The Studio",
    department: "Design",
    salary: "Paid – Rs. 10,000 – 15,000/mo",
    posted: "3 days ago",
    urgent: true,
    desc: "A 3-month hands-on internship ideal for students or fresh graduates who want to build real portfolio work inside a professional creative studio.",
    requirements: [
      "Currently studying or recently graduated in design",
      "Basic knowledge of Adobe Illustrator or Photoshop",
      "Eagerness to learn and take feedback well",
      "Punctual, reliable and team-oriented",
    ],
    niceToHave: [
      "Any personal design projects or coursework",
      "Interest in Arabic calligraphy",
      "Social media awareness",
    ],
  },
];

const perks = [
  { icon: "💰", title: "Competitive Pay", desc: "Market-rate salaries reviewed every 6 months based on performance and growth." },
  { icon: "📚", title: "Free Courses", desc: "All studio courses are free for team members. Learn calligraphy, branding, and more." },
  { icon: "🎨", title: "Creative Freedom", desc: "We encourage experiments, personal projects, and bringing bold ideas to the table." },
  { icon: "🤝", title: "Mentorship", desc: "Direct mentorship from Ammar and senior team members on every project." },
  { icon: "⏰", title: "Flexible Hours", desc: "Core hours with flexibility around your schedule — results matter more than rigid hours." },
  { icon: "🏆", title: "Portfolio Growth", desc: "Work on diverse, high-quality client projects that genuinely elevate your portfolio." },
];

const values = [
  { icon: "✦", title: "Craft First", desc: "We prioritise quality over speed. Every detail matters." },
  { icon: "◈", title: "Honest Feedback", desc: "Open, respectful critique — we make each other better." },
  { icon: "◉", title: "Keep Learning", desc: "Curious, always growing. We invest in your education." },
  { icon: "◇", title: "Own Your Work", desc: "Every team member has ownership and accountability." },
];

const departments = ["All", "Design", "Calligraphy"];

export default function CareerPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [applying, setApplying] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const filtered = filter === "All" ? openings : openings.filter(o => o.department === filter);

  return (
    <>
      <style>{LOCAL_STYLES}</style>
      <div>

        {/* ── HERO ── */}
        <PageHero
          pillText={`${openings.length} Positions Open`}
          title={<>Build Your<br />Career at <span className="gradient-text">Ammar Designz.</span></>}
          description="Join a studio where craft is taken seriously, creativity is celebrated, and every team member grows. We're building something special — come be part of it."
          imageSrc="/images/DSC02344.JPG"
          ctaPrimary={{ text: "See Open Roles", href: "#openings" }}
          ctaSecondary={{ text: "General Application", href: "#apply" }}
        />

        {/* ── VALUES ── */}
        <section className="section-padding" style={{ background:"#fff", borderBottom:"1px solid rgba(0,0,0,.06)" }}>
          <div className="page-container">
            <div className="career-values-grid" style={{ gap:16 }}>
              {values.map((v,i) => (
                <div key={i} className="value-item" style={{ background:"rgba(255,255,255,.6)", border:"1px solid rgba(0,0,0,.06)", borderRadius:22, padding:"24px 22px", cursor:"default" }}>
                  <span style={{ fontSize:22, color:"#7fbf2f", display:"block", marginBottom:12 }}>{v.icon}</span>
                  <h4 style={{ fontWeight:700, color:"#111", margin:"0 0 8px" }}>{v.title}</h4>
                  <p style={{ fontSize:13, color:"#666", lineHeight:1.65, margin:0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PERKS ── */}
        <section className="section-padding" style={{ background:"#faf9f7" }}>
          <div className="page-container">
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Why Join Us</p>
              <h2 style={{ fontWeight:700, color:"#111", margin:0 }}>
                More Than a <span className="gradient-text">Job.</span>
              </h2>
            </div>
            <div className="career-perks-grid" style={{ gap:24 }}>
              {perks.map((p,i) => (
                <div key={i} className="perk-card" style={{ background:"#fff", border:"1px solid rgba(0,0,0,.06)", borderRadius:28, padding:"36px 32px", boxShadow:"0 4px 24px rgba(0,0,0,.05)", cursor:"default" }}>
                  <span className="perk-icon" style={{ fontSize:36, display:"block", marginBottom:20 }}>{p.icon}</span>
                  <h4 style={{ fontWeight:700, color:"#111", margin:"0 0 10px" }}>{p.title}</h4>
                  <p style={{ fontSize:14, color:"#666", lineHeight:1.75, margin:0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPEN POSITIONS ── */}
        <section id="openings" className="section-padding" style={{ background:"#060606", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.06)", top:-80, right:-80 }} />
          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:56, flexWrap:"wrap", gap:24 }}>
              <div>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Now Hiring</p>
                <h2 style={{ fontWeight:700, color:"#fff", margin:0 }}>
                  Open <span className="gradient-text">Positions</span>
                </h2>
              </div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {departments.map(d => (
                  <button key={d} className={`filter-btn${filter===d?" active":""}`}
                    onClick={() => setFilter(d)}
                    style={{ borderRadius:100, padding:"10px 22px", fontSize:13, fontWeight:600, color:filter===d?"#000":"#777", background:filter===d?"#7fbf2f":"rgba(255,255,255,.05)", border:"1px solid", borderColor:filter===d?"#7fbf2f":"rgba(255,255,255,.1)" }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {filtered.map((job,i) => (
                <div key={i} className={`job-card${expanded===i?" expanded":""}`}
                  style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:28, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,.2)" }}>
                  {/* Job header */}
                  <button onClick={() => setExpanded(expanded===i?null:i)}
                    className="job-card-header"
                    style={{ width:"100%", background:"transparent", border:"none", cursor:"pointer", textAlign:"left" }}>
                    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                        {job.urgent && (
                          <span style={{ fontSize:9, fontWeight:800, letterSpacing:".2em", textTransform:"uppercase", background:"rgba(239,68,68,.15)", color:"#f87171", borderRadius:100, padding:"4px 12px", border:"1px solid rgba(239,68,68,.25)" }}>Urgent</span>
                        )}
                        <span style={{ fontSize:9, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", background:"rgba(127,191,47,.1)", color:"#7fbf2f", borderRadius:100, padding:"4px 12px", border:"1px solid rgba(127,191,47,.2)" }}>{job.type}</span>
                        <span style={{ fontSize:12, color:"#555" }}>{job.posted}</span>
                      </div>
                      <h3 style={{ fontWeight:700, color:"#fff", margin:0, lineHeight:1.2 }}>{job.title}</h3>
                      <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                        {[job.location, job.department, job.salary].map((m,mi) => (
                          <span key={mi} style={{ fontSize:13, color:"#888", display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ color:"#7fbf2f" }}>{mi===0?"📍":mi===1?"🎨":"💰"}</span>{m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <button onClick={(e) => { e.stopPropagation(); setApplying(job.title); }} style={{ borderRadius:100, padding:"10px 22px", fontSize:13, fontWeight:700, color:"#000", background:"#7fbf2f", border:"none", cursor:"pointer", whiteSpace:"nowrap", boxShadow:"0 8px 24px rgba(127,191,47,.3)" }}>
                        Apply Now
                      </button>
                      <span style={{ width:36, height:36, borderRadius:"50%", border:"1px solid rgba(255,255,255,.12)", display:"grid", placeItems:"center", color:"#fff", fontSize:16, transform:expanded===i?"rotate(180deg)":"none", transition:"transform .3s" }}>↓</span>
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {expanded === i && (
                    <div className="career-job-detail-grid job-card-content" style={{ gap:40, borderTop:"1px solid rgba(255,255,255,.06)" }}>
                      <div style={{ paddingTop:28 }}>
                        <p style={{ fontSize:15, lineHeight:1.85, color:"#888", margin:"0 0 24px" }}>{job.desc}</p>
                        <p style={{ fontSize:11, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Requirements</p>
                        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                          {job.requirements.map((r,ri) => (
                            <div key={ri} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                              <span style={{ color:"#7fbf2f", fontSize:14, marginTop:2, flexShrink:0 }}>✓</span>
                              <span style={{ fontSize:14, color:"#ccc", lineHeight:1.5 }}>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ paddingTop:28 }}>
                        <p style={{ fontSize:11, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#555", margin:"0 0 16px" }}>Nice to Have</p>
                        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:32 }}>
                          {job.niceToHave.map((n,ni) => (
                            <div key={ni} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                              <span style={{ color:"#555", fontSize:14, marginTop:2, flexShrink:0 }}>+</span>
                              <span style={{ fontSize:14, color:"#777", lineHeight:1.5 }}>{n}</span>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => setApplying(job.title)}
                          style={{ width:"100%", borderRadius:100, padding:"14px 24px", fontSize:14, fontWeight:700, color:"#000", background:"#7fbf2f", border:"none", cursor:"pointer", boxShadow:"0 10px 30px rgba(127,191,47,.35)" }}>
                          Apply for This Role →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPLICATION FORM ── */}
        <section id="apply" style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>
                {applying ? `Applying for: ${applying}` : "General Application"}
              </p>
              <h2 style={{ fontWeight:700, color:"#111", margin:"0 0 16px" }}>
                {applying ? <><span className="gradient-text">Let's Talk.</span></> : <>Don't See Your Role?<br /><span className="gradient-text">Apply Anyway.</span></>}
              </h2>
              <p style={{ fontSize:15, color:"#666", lineHeight:1.8, margin:0 }}>
                We review every application carefully. If we see a fit — now or in the future — we'll reach out.
              </p>
            </div>

            {submitted ? (
              <div className="form-card" style={{ textAlign:"center" }}>
                <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(127,191,47,.1)", border:"2px solid #7fbf2f", display:"grid", placeItems:"center", fontSize:36, margin:"0 auto 24px" }}>✓</div>
                <h3 style={{ fontWeight:700, color:"#111", margin:"0 0 16px" }}>Application Received!</h3>
                <p style={{ fontSize:15, color:"#666", lineHeight:1.8, maxWidth:440, margin:"0 auto 32px" }}>We'll review your application and be in touch within 5–7 business days if there's a match.</p>
                <button onClick={() => { setSubmitted(false); setApplying(null); }} style={{ background:"transparent", border:"1.5px solid rgba(0,0,0,.12)", borderRadius:100, padding:"12px 28px", fontSize:14, fontWeight:600, color:"#555", cursor:"pointer" }}>Submit Another</button>
              </div>
            ) : (
              <div className="form-card">
                <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                  <div className="career-form-row">
                    {["Full Name *", "Email Address *"].map((label,i) => (
                      <div key={i}>
                        <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>{label}</label>
                        <input type={i===1?"email":"text"} placeholder={i===0?"Your full name":"you@email.com"} style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                      </div>
                    ))}
                  </div>
                  <div className="career-form-row">
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Phone / WhatsApp</label>
                      <input type="tel" placeholder="+92 300 0000000" style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                    </div>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Role Applying For *</label>
                      <select value={applying||""} onChange={e => setApplying(e.target.value)} style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#555", transition:"all .25s", appearance:"none" }}>
                        <option value="">Select a role</option>
                        {openings.map(o => <option key={o.title}>{o.title}</option>)}
                        <option>General Application</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Portfolio / Work Samples URL</label>
                    <input type="url" placeholder="behance.net/yourname or drive.google.com/..." style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                  </div>
                  <div>
                    <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Years of Experience</label>
                    <select style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#555", transition:"all .25s", appearance:"none" }}>
                      <option value="">Select experience level</option>
                      <option>Student / Fresh Graduate</option>
                      <option>Less than 1 year</option>
                      <option>1–2 years</option>
                      <option>3–5 years</option>
                      <option>5+ years</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Why Do You Want to Join Us? *</label>
                    <textarea rows={5} placeholder="Tell us about yourself, your passion for design, and why Ammar Designz is the right fit for you..." style={{ width:"100%", borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"16px 18px", fontSize:14, color:"#111", resize:"vertical", transition:"all .25s", lineHeight:1.65 }} />
                  </div>
                  <button className="submit-btn" onClick={() => setSubmitted(true)}
                    style={{ height:58, borderRadius:100, background:"#7fbf2f", color:"#000", fontSize:15, fontWeight:700, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12, boxShadow:"0 14px 40px rgba(127,191,47,.3)" }}>
                    Submit Application
                    <span style={{ width:34, height:34, borderRadius:"50%", background:"rgba(0,0,0,.15)", display:"grid", placeItems:"center", fontSize:18 }}>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";

const LOCAL_STYLES = `
  input, textarea, select { outline:none; font-family:var(--font-dm-sans),sans-serif; }
  input:focus, textarea:focus, select:focus {
    border-color:#7fbf2f !important;
    box-shadow:0 0 0 3px rgba(127,191,47,.12) !important;
  }
  .info-card:hover { transform:translateY(-4px); box-shadow:0 20px 50px rgba(0,0,0,.1) !important; }
  .info-card { transition:all .35s ease; }
  .social-link:hover { background:#7fbf2f !important; color:#000 !important; border-color:#7fbf2f !important; transform:translateY(-3px); box-shadow:0 10px 28px rgba(127,191,47,.3); }
  .social-link { transition:all .3s ease; }
  .submit-btn:hover { background:#5a9c1a !important; transform:translateY(-2px); box-shadow:0 20px 50px rgba(127,191,47,.5) !important; }
  .submit-btn { transition:all .3s ease; }
  .service-opt:hover { border-color:#7fbf2f !important; background:rgba(127,191,47,.05) !important; }
  .service-opt.selected { border-color:#7fbf2f !important; background:rgba(127,191,47,.1) !important; }
  .service-opt { transition:all .25s ease; cursor:pointer; }

  .contact-hero { padding:120px 48px 80px; }
  .contact-section-cards { padding:60px 48px 0; }
  .contact-section-main { padding:60px 48px 100px; }
  .contact-section-faq { padding:80px 48px; }
  .contact-form-card { padding:56px 52px; border-radius:40px; }

  .contact-info-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
  .contact-main-grid { display:grid; grid-template-columns:1.1fr 0.9fr; gap:40px; }
  .contact-form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .contact-faq-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }

  @media (max-width: 1024px) {
    .contact-hero { padding:100px 32px 64px; }
    .contact-section-cards,
    .contact-section-main,
    .contact-section-faq { padding:60px 32px 80px; }
    .contact-info-grid { grid-template-columns:repeat(2,1fr); }
    .contact-main-grid { grid-template-columns:1fr; gap:32px; }
    .contact-faq-grid { grid-template-columns:1fr; gap:40px; }
  }

  @media (max-width: 768px) {
    .contact-hero { padding:96px 24px 56px; }
    .contact-section-cards,
    .contact-section-main,
    .contact-section-faq { padding:48px 24px 64px; }
    .contact-info-grid { grid-template-columns:1fr; }
    .contact-form-row { grid-template-columns:1fr; }
    .contact-form-card { padding:40px 24px; border-radius:28px; }
  }

  @media (max-width: 480px) {
    .contact-hero { padding:80px 20px 48px; }
    .contact-section-cards,
    .contact-section-main,
    .contact-section-faq { padding:40px 20px 56px; }
    .contact-form-card { padding:32px 20px; border-radius:24px; }
  }

  .page-container { width: 100%; max-width: 1400px; margin: 0 auto; }
`;

const contactInfo = [
  { icon: "📍", title: "Studio Location", detail: "Pakistan", sub: "Available in-person by appointment" },
  { icon: "✉️", title: "Email Us", detail: "hello@ammardesignz.com", sub: "Response within 24 hours" },
  { icon: "📱", title: "WhatsApp", detail: "+92 300 0000000", sub: "Mon–Thu, 10am – 8pm PKT" },
  { icon: "📸", title: "Instagram", detail: "@ammardesignz", sub: "Follow for latest work" },
];

const services = ["Arabic Calligraphy", "Brand Identity", "Social Media Design", "Print Media", "Digital / UI Design", "Courses & Workshops", "Other"];

const budgets = ["Under Rs. 10,000", "Rs. 10,000 – 30,000", "Rs. 30,000 – 75,000", "Rs. 75,000+", "Let's Discuss"];

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!submitted) setSubmitted(true);
  };

  return (
    <>
      <style>{LOCAL_STYLES}</style>
      <div style={{ overflowX: "hidden" }}>

        {/* ── HERO ── */}
        <PageHero
          pillText="Get In Touch"
          title={<>Let's Make<br />Something <span className="gradient-text">Great.</span></>}
          description="Whether you have a project in mind, a question about our courses, or just want to say hello — we'd love to hear from you."
          imageSrc="/images/DSC02345.JPG"
          ctaPrimary={{ text: "Start a Project", href: "#contact-form" }}
          ctaSecondary={{ text: "Email Us", href: "mailto:hello@ammardesignz.com" }}
        />

        {/* ── CONTACT CARDS ── */}
        <section className="contact-section-cards" style={{ background:"#faf9f7" }}>
          <div className="page-container contact-info-grid">
            {contactInfo.map((c,i) => (
              <div key={i} className="info-card" style={{ background:"#fff", border:"1px solid rgba(0,0,0,.06)", borderRadius:24, padding:"28px 24px", boxShadow:"0 4px 20px rgba(0,0,0,.05)", cursor:"default" }}>
                <span style={{ fontSize:28, display:"block", marginBottom:16 }}>{c.icon}</span>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 6px" }}>{c.title}</p>
                <p style={{ fontSize:15, fontWeight:600, color:"#111", margin:"0 0 4px" }}>{c.detail}</p>
                <p style={{ fontSize:12, color:"#999", margin:0 }}>{c.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MAIN FORM + MAP ── */}
        <section id="contact-form" className="contact-section-main" style={{ background:"#faf9f7" }}>
          <div className="page-container contact-main-grid">

            {/* FORM */}
            <div className="contact-form-card" style={{ background:"#fff", borderRadius:40, padding:"56px 52px", border:"1px solid rgba(0,0,0,.05)", boxShadow:"0 8px 50px rgba(0,0,0,.07)" }}>
              {submitted ? (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, textAlign:"center", gap:24 }}>
                  <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(127,191,47,.1)", border:"2px solid #7fbf2f", display:"grid", placeItems:"center", fontSize:36, animation:"pulse 2s ease-in-out infinite" }}>✓</div>
                  <h2 style={{ fontWeight:700, color:"#111", margin:0, lineHeight:1.1 }}>Message Received!</h2>
                  <p style={{ fontSize:15, color:"#666", lineHeight:1.8, margin:0, maxWidth:380 }}>Thank you for reaching out. We'll review your project details and get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} style={{ background:"transparent", border:"1.5px solid rgba(0,0,0,.12)", borderRadius:100, padding:"12px 28px", fontSize:14, fontWeight:600, color:"#555", cursor:"pointer" }}>Send Another Message</button>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom:40 }}>
                    <p style={{ fontSize:11, fontWeight:600, letterSpacing:".25em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 10px" }}>Project Brief</p>
                    <h2 style={{ fontWeight:700, color:"#111", margin:0, lineHeight:1.1 }}>Tell Us About<br />Your Project</h2>
                  </div>

                  <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                    {/* Name + Email */}
                    <div className="contact-form-row">
                      <div>
                        <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Full Name *</label>
                        <input type="text" placeholder="Your name" style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                      </div>
                      <div>
                        <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Email *</label>
                        <input type="email" placeholder="you@email.com" style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                      </div>
                    </div>

                    {/* Phone + Company */}
                    <div className="contact-form-row">
                      <div>
                        <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Phone / WhatsApp</label>
                        <input type="tel" placeholder="+92 300 0000000" style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                      </div>
                      <div>
                        <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Company / Brand</label>
                        <input type="text" placeholder="Your brand name" style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#111", transition:"all .25s" }} />
                      </div>
                    </div>

                    {/* Service selection */}
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:12 }}>Service Needed *</label>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                        {services.map(s => (
                          <button key={s} type="button" className={`service-opt${selectedService===s?" selected":""}`}
                            onClick={() => setSelectedService(s)}
                            style={{ borderRadius:100, padding:"9px 18px", fontSize:13, fontWeight:500, color:selectedService===s?"#1a1a1a":"#666", background:selectedService===s?"rgba(127,191,47,.1)":"transparent", border:"1.5px solid", borderColor:selectedService===s?"#7fbf2f":"rgba(0,0,0,.1)" }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Project Timeline</label>
                      <select style={{ width:"100%", height:52, borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"0 18px", fontSize:14, color:"#555", transition:"all .25s", appearance:"none" }}>
                        <option value="">Select timeline</option>
                        <option>ASAP (Rush order)</option>
                        <option>Within 2 weeks</option>
                        <option>Within 1 month</option>
                        <option>1–3 months</option>
                        <option>No rush — quality first</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:"#888", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Project Details *</label>
                      <textarea rows={5} placeholder="Describe your project, goals, inspirations, or any specific requirements..." style={{ width:"100%", borderRadius:14, border:"1.5px solid #e5e5e5", background:"#fafafa", padding:"16px 18px", fontSize:14, color:"#111", resize:"vertical", transition:"all .25s", lineHeight:1.6 }} />
                    </div>

                    <button type="button" className="submit-btn" onClick={handleSubmit}
                      style={{ height:58, borderRadius:100, background:"#7fbf2f", color:"#000", fontSize:15, fontWeight:700, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12, boxShadow:"0 14px 40px rgba(127,191,47,.3)" }}>
                      Send Project Brief
                      <span style={{ width:34, height:34, borderRadius:"50%", background:"rgba(0,0,0,.15)", display:"grid", placeItems:"center", fontSize:18 }}>→</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT PANEL */}
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              {/* Map placeholder */}
              <div style={{ flex:1, borderRadius:32, overflow:"hidden", background:"linear-gradient(135deg,#1a2a0a,#0a1a05)", border:"1px solid rgba(127,191,47,.2)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:280, gap:16 }}>
                <span style={{ fontSize:48 }}>📍</span>
                <div style={{ textAlign:"center" }}>
                  <h3 style={{ fontWeight:700, color:"#fff", margin:"0 0 6px" }}>The Studio</h3>
                  <p style={{ fontSize:14, color:"#888", margin:0 }}>Pakistan</p>
                </div>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(127,191,47,.15)", border:"1px solid rgba(127,191,47,.3)", color:"#7fbf2f", borderRadius:100, padding:"10px 20px", fontSize:13, fontWeight:600, textDecoration:"none", marginTop:8 }}>
                  Open in Maps →
                </a>
              </div>

              {/* Business hours */}
              <div style={{ background:"#fff", borderRadius:28, padding:"28px 32px", border:"1px solid rgba(0,0,0,.05)", boxShadow:"0 4px 20px rgba(0,0,0,.05)" }}>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>Studio Hours</p>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {[
                    { day:"Monday – Thursday", hours:"10:00am – 7:00pm" },
                    { day:"Friday – Sunday", hours:"Closed" },
                  ].map((h,i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:12, borderBottom:i<2?"1px solid rgba(0,0,0,.05)":"none" }}>
                      <span style={{ fontSize:14, color:"#555", fontWeight:500 }}>{h.day}</span>
                      <span style={{ fontSize:14, fontWeight:700, color:h.hours==="Closed"?"#ccc":"#111" }}>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div style={{ background:"#0d0d0d", borderRadius:28, padding:"28px 32px" }}>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>Follow Our Work</p>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {[
                    { label:"Instagram", handle:"@ammardesignz", icon:"📸" },
                    { label:"Facebook", handle:"Ammar Designz Studio", icon:"👍" },
                    { label:"YouTube", handle:"Ammar Designz", icon:"▶" },
                  ].map((s,i) => (
                    <a key={i} href="#" className="social-link" style={{ display:"flex", alignItems:"center", gap:14, borderRadius:14, padding:"12px 16px", border:"1px solid rgba(255,255,255,.07)", background:"rgba(255,255,255,.03)", textDecoration:"none", color:"#ddd" }}>
                      <span style={{ fontSize:20 }}>{s.icon}</span>
                      <div>
                        <p style={{ fontSize:12, fontWeight:700, color:"#fff", margin:0 }}>{s.label}</p>
                        <p style={{ fontSize:11, color:"#666", margin:0 }}>{s.handle}</p>
                      </div>
                      <span style={{ marginLeft:"auto", color:"#555" }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUICK FAQ ── */}
        <section className="contact-section-faq" style={{ background:"#0a0a0a", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.05)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
          <div className="page-container contact-faq-grid" style={{ position:"relative", zIndex:1 }}>
            <div>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Quick Answers</p>
              <h2 style={{ fontWeight:700, color:"#fff", margin:"0 0 24px", lineHeight:1.05 }}>Before You<br /><span className="gradient-text">Reach Out</span></h2>
              <p style={{ fontSize:15, lineHeight:1.85, color:"#888", margin:0 }}>A few things clients often want to know before getting in touch. Still have questions? The form is right above.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {[
                { q:"How fast is your turnaround?", a:"Typical projects take 5–14 business days. Rush orders are available at a premium." },
                { q:"Do you work with international clients?", a:"Yes. We work with clients across Pakistan, UAE, Saudi Arabia, UK, and beyond — fully remote." },
                { q:"What if I don't like the first draft?", a:"Every project includes structured revision rounds. We don't stop until you're genuinely happy." },
              ].map((f,i) => (
                <div key={i} style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:20, padding:"24px 28px" }}>
                  <p style={{ fontSize:15, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>{f.q}</p>
                  <p style={{ fontSize:14, color:"#888", lineHeight:1.7, margin:0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

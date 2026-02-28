"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";

const values = [
  { icon: "✦", title: "Precision", desc: "Every pixel, every letterform — crafted with obsessive attention to detail and purpose." },
  { icon: "◈", title: "Authenticity", desc: "We draw from deep cultural roots in Arabic art to inform work that feels genuine, not trendy." },
  { icon: "◉", title: "Collaboration", desc: "Your vision is the foundation. We listen first, then translate ideas into visual language." },
  { icon: "◇", title: "Growth", desc: "Through teaching and mentoring, we believe design knowledge should be shared and elevated." },
];

const milestones = [
  { year: "2019", title: "Studio Founded", desc: "Ammar Designz was born from a passion for calligraphy and a vision to bridge art and brand." },
  { year: "2020", title: "First 50 Clients", desc: "Word-of-mouth growth across the region and beyond as the studio's reputation for quality spread." },
  { year: "2021", title: "Education Launch", desc: "Launched the first recorded Arabic Calligraphy course — now with hundreds of enrolled students." },
  { year: "2022", title: "Team Expansion", desc: "Brought on dedicated designers and a video editor to handle growing demand for full-service branding." },
  { year: "2023", title: "200+ Projects", desc: "Crossed a major milestone — 200 completed projects spanning calligraphy, brand, print, and digital." },
  { year: "2024", title: "Premium Studio", desc: "Moved into a dedicated creative space and launched the Bilingual Brand Identity programme." },
];

const team = [
  { name: "Hafiz Muhammad Ammar", role: "Founder & CEO", image: "/Team/Hafiz Muhammad Ammar Khan.png", bio: "Leads creative direction with a vision rooted in calligraphy and timeless design." },
  { name: "Imran Khan", role: "Creative Design Head", image: "/Team/Imran Khan.png", bio: "Oversees the artistic vision, ensuring every design meets our high standards of creativity and innovation." },
  { name: "Ahtisham Arshad", role: "Brand Identity & Arabic Logo Designer", image: "/Team/Ahtisham Arshad.png", bio: "Specializes in crafting unique brand identities and intricate Arabic logos that tell a story." },
  { name: "Saliha Shehzad", role: "Social Media Designer", image: "/Team/Saliha Shahzad.png", bio: "Creates engaging social media visuals that capture attention and drive audience engagement." },
  { name: "Hiba Rashid", role: "Finance Manager", image: "/Team/Hiba Rashid.png", bio: "Manages the studio's financial health, ensuring sustainable growth and operational efficiency." },
  { name: "Hanzala", role: "Video Editor", image: "/Team/Muhammad Hanzala .png", bio: "Brings stories to life through dynamic video editing and motion graphics." },
  { name: "Abubakar Javed", role: "Voice Over Artist", image: "/Team/Abubakar Javed (2).png", bio: "The voice behind the brand, adding professional narration and character to our multimedia projects." },
];

export default function About() {
  return (
    <>
      <div>

        {/* ── HERO ── */}
        <PageHero
          pillText="Our Story"
          title={<>Art Rooted<br />in <span className="gradient-text">Purpose</span></>}
          description="Founded in 2019, Ammar Designz is a creative studio where Arabic calligraphy tradition meets contemporary brand thinking. We don't just design — we translate culture into craft."
          imageSrc="/images/DSC02370.JPG"
          stats={[
            { val: 200, suf: "+", label: "Projects Delivered" },
            { val: 150, suf: "+", label: "Happy Clients" },
            { val: 5, suf: "+", label: "Years of Craft" },
            { val: 3, suf: "", label: "Active Courses" }
          ]}
          ctaPrimary={{ text: "Work With Us", href: "/contact" }}
          ctaSecondary={{ text: "See Our Work", href: "/portfolio" }}
        />

        {/* ── FOUNDER STORY ── */}
        <section className="about-founder-section" style={{ background:"#faf9f7", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.05)", top:0, left:-150 }} />
          <div className="page-container about-founder-grid" style={{ alignItems:"center", position:"relative", zIndex:1 }}>
            <div style={{ position:"relative" }}>
              <div style={{ borderRadius:"40% 60% 55% 45% / 45% 40% 60% 55%", overflow:"hidden", boxShadow:"0 50px 100px rgba(0,0,0,.16)" }}>
                <img src="/team/Hafiz Muhammad Ammar Khan.png" alt="Hafiz Muhammad Ammar" style={{ width:"100%", display:"block" }} />
              </div>
              <div style={{ position:"absolute", bottom:-20, right:-32, background:"#7fbf2f", borderRadius:20, padding:"18px 24px", boxShadow:"0 20px 50px rgba(127,191,47,.35)" }}>
                <p style={{ margin:0, fontSize:28, fontWeight:700, color:"#fff" }}>2019</p>
                <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,.8)", letterSpacing:".15em", textTransform:"uppercase" }}>Est. Rawalpindi</p>
              </div>
              {/* Decorative corner */}
              <div style={{ position:"absolute", top:-20, left:-20, width:80, height:80, borderRadius:"50%", border:"2px dashed rgba(127,191,47,.3)" }} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              <div>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 14px" }}>The Founder</p>
                <h2 style={{ color:"#111", margin:"0 0 8px" }}>Hafiz Muhammad Ammar</h2>
                <p style={{ fontSize:14, color:"#999", margin:0, letterSpacing:".1em", textTransform:"uppercase" }}>Creative Director & CEO</p>
              </div>
              <p style={{ fontSize:15, lineHeight:1.9, color:"#555", margin:0 }}>
                What started as a personal obsession with the fluid geometry of Arabic script grew into a full creative studio. Ammar spent years studying traditional calligraphy before discovering how powerfully it could anchor a modern brand identity.
              </p>
              <p style={{ fontSize:15, lineHeight:1.9, color:"#555", margin:0 }}>
                Today, he leads a team of five creatives, each bringing their own discipline — from graphic design to video editing — unified by a commitment to work that is precise, purposeful, and enduring.
              </p>
              <blockquote style={{ fontSize:24, fontStyle:"italic", color:"#333", margin:0, paddingLeft:24, borderLeft:"3px solid #7fbf2f", lineHeight:1.5 }}>
                "Every letterform has a soul. Our job is to find it and put it to work."
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="about-values-section" style={{ background:"#0d0d0d", position:"relative", overflow:"hidden" ,padding:"100px 48px" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.06)", top:-80, right:-80 }} />
          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>What Drives Us</p>
              <h2 style={{ color:"#fff", margin:0 }}>Our <span className="gradient-text">Core Values</span></h2>
            </div>
            <div className="about-values-grid">
              {values.map((v,i) => (
                <div key={i} className="val-card card-hover" style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:28, padding:"36px 28px", transition:"all .35s", cursor:"default" }}>
                  <div className="val-icon" style={{ width:52, height:52, borderRadius:16, background:"rgba(127,191,47,.12)", border:"1px solid rgba(127,191,47,.2)", display:"grid", placeItems:"center", marginBottom:24, fontSize:22, color:"#7fbf2f", transition:"all .35s" }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontWeight:700, color:"#fff", margin:"0 0 12px", transition:"color .35s" }}>{v.title}</h3>
                  <p style={{ fontSize:14, lineHeight:1.75, color:"#777", margin:0, transition:"color .35s" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div className="page-container">
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>Our Journey</p>
              <h2 style={{ color:"#111", margin:0 }}>Built Year by <span className="gradient-text">Year</span></h2>
            </div>
            <div style={{ position:"relative" }}>
              {/* Center line */}
              <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, background:"linear-gradient(to bottom,transparent,rgba(127,191,47,.3) 10%,rgba(127,191,47,.3) 90%,transparent)", transform:"translateX(-50%)" }} />
              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {milestones.map((m,i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", marginBottom:48, position:"relative" }}>
                    {/* Year dot */}
                    <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:14, height:14, borderRadius:"50%", background:"#7fbf2f", boxShadow:"0 0 20px rgba(127,191,47,.5)", zIndex:2 }} />
                    {i % 2 === 0 ? (
                      <>
                        <div style={{ textAlign:"right", paddingRight:48 }}>
                          <span style={{ fontSize:48, fontWeight:700, color:"rgba(127,191,47,.15)", display:"block", lineHeight:1 }}>{m.year}</span>
                          <h3 style={{ fontWeight:700, color:"#111", margin:"4px 0 8px" }}>{m.title}</h3>
                          <p style={{ fontSize:14, lineHeight:1.75, color:"#666", margin:0 }}>{m.desc}</p>
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div style={{ paddingLeft:48 }}>
                          <span style={{ fontSize:48, fontWeight:700, color:"rgba(127,191,47,.15)", display:"block", lineHeight:1 }}>{m.year}</span>
                          <h3 style={{ fontWeight:700, color:"#111", margin:"4px 0 8px" }}>{m.title}</h3>
                          <p style={{ fontSize:14, lineHeight:1.75, color:"#666", margin:0 }}>{m.desc}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="about-team-section" style={{ background:"#060606", position:"relative", overflow:"hidden", padding:"100px 48px" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.06)", top:-80, left:"50%", transform:"translateX(-50%)" }} />
          <div className="page-container" style={{ position:"relative", zIndex:1 }}>
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 16px" }}>The People</p>
              <h2 style={{ fontWeight:700, color:"#fff", margin:0 }}>Meet the <span className="gradient-text">Team</span></h2>
            </div>
            <div className="about-team-grid">
              {team.map((m,i) => (
                <div key={i} className="team-card card-hover" style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:28, overflow:"hidden", cursor:"pointer" }}>
                  <div style={{ aspectRatio:"4/5", overflow:"hidden" }}>
                    <img src={m.image} alt={m.name} className="team-img" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  </div>
                  <div style={{ padding:"20px 20px 24px" }}>
                    <p style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 6px" }}>{m.role}</p>
                    <h4 style={{ fontWeight:700, color:"#fff", margin:"0 0 10px", lineHeight:1.2 }}>{m.name}</h4>
                    <p style={{ fontSize:12, color:"#777", lineHeight:1.65, margin:0 }}>{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="about-cta-section" style={{ background:"#faf9f7", padding:"100px 48px" }}>
          <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 20px" }}>Ready to Begin?</p>
            <h2 style={{ fontWeight:700, color:"#111", margin:"0 0 24px", lineHeight:1.05 }}>
              Let's Build Your Vision<br /><span className="gradient-text">Together.</span>
            </h2>
            <p style={{ fontSize:16, color:"#666", lineHeight:1.8, margin:"0 auto 40px", maxWidth:560 }}>
              Whether it's a brand identity, a calligraphy piece, or a course — the studio is ready to begin. Reach out and let's talk.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:16 }}>
              <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#1a1a1a", color:"#fff", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:700, textDecoration:"none", boxShadow:"0 20px 50px rgba(0,0,0,.2)" }}>
                Get a Free Quote <span style={{ width:32, height:32, borderRadius:"50%", background:"#7fbf2f", display:"grid", placeItems:"center" }}>→</span>
              </Link>
              <Link href="/courses" style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1.5px solid rgba(0,0,0,.12)", color:"#444", borderRadius:100, padding:"16px 36px", fontSize:15, fontWeight:500, textDecoration:"none" }}>
                Explore Courses
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

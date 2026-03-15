"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";

const values = [
  { icon: "✦", title: "Precision", desc: "Every pixel, every letterform crafted with obsessive attention to detail and purpose." },
  { icon: "◈", title: "Authenticity", desc: "We draw from deep cultural roots in Arabic art to inform work that feels genuine, not trendy." },
  { icon: "◉", title: "Collaboration", desc: "Your vision is the foundation. We listen first, then translate ideas into visual language." },
  { icon: "◇", title: "Growth", desc: "Through teaching and mentoring, we believe design knowledge should be shared and elevated." },
];

const milestones = [
  { year: "2019", title: "Studio Founded", desc: "Ammar Designz was born from a passion for calligraphy and a vision to bridge art and brand." },
  { year: "2020", title: "First 50 Clients", desc: "Word-of-mouth growth across the region and beyond as the studio's reputation for quality spread." },
  { year: "2021", title: "Education Launch", desc: "Launched the first recorded Digital Calligraphy course now with hundreds of enrolled students." },
  { year: "2022", title: "Team Expansion", desc: "Brought on dedicated designers and a video editor to handle growing demand for full-service branding." },
  { year: "2023", title: "10000+ Projects", desc: "Crossed a major milestone 10000 completed projects spanning calligraphy, brand, print, and digital." },
  { year: "2024", title: "Premium Studio", desc: "Moved into a dedicated creative space and launched the Bilingual Brand Identity programme." },
];

const team = [
  { name: "Hafiz Muhammad Ammar", role: "Founder & CEO", image: "/Team/Hafiz Muhammad Ammar Khan.png", bio: "Teaches Brand Identity Design and Digital Arabic Calligraphy, guiding students to merge cultural heritage with modern design principles while building strong visual identities." },
  { name: "Imran Khan", role: "FOUNDER & INSTRUCTOR", image: "/Team/Imran Khan.png", bio: "Teaches modern social media design strategies, guiding students in creating engaging visual content, platform-ready creatives, and trend-driven designs while developing practical industry skills." },
  { name: "Saif Ali", role: "Website Developer", image: "/Team/saif.jpeg", bio: "Guiding students to build modern web applications by blending front-end creativity with back-end logic to create seamless and scalable digital experiences." },
];

export default function About() {
  return (
    <>
      <div>

        {/* ── HERO ── */}
        <PageHero
          pillText="Our Story"
          title={<>The story of our design studio Creativity and  <span className="gradient-text">  industry</span></>}
          description="Founded in 2019, Ammar Designz Institute is a creative education platform where the heritage of Digital Calligraphy meets contemporary design practice. We don’t just teach design we train the next generation of designers to translate culture into craft."
          bgImage="/images/AboutHero.JPG"
          stats={[
            { val: 10000, suf: "+", label: "Projects Delivered" },
            { val: 150, suf: "+", label: "Happy Clients" },
            { val: 5, suf: "+", label: "Years of Craft" },
            { val: 3, suf: "", label: "Active Courses" }
          ]}
          ctaPrimary={{ text: "Work With Us", href: "/contact" }}
          ctaSecondary={{ text: "See Students work", href: "/student-work" }}
        />

        {/* ── FOUNDER STORY ── */}
        <section className="about-founder-section" style={{ background:"#faf9f7", position:"relative", overflow:"hidden" }}>
          <div className="orb" style={{ width:500, height:500, background:"rgba(127,191,47,.05)", top:0, left:-150 }} />
          <div className="page-container about-founder-grid" style={{ alignItems:"center", position:"relative", zIndex:1 }}>
            <div style={{ position:"relative" }}>
              <div style={{ borderRadius:"25% ", overflow:"hidden", boxShadow:"0 50px 100px rgba(0,0,0,.16)" }}>
                <img src="/team/Hafiz Muhammad Ammar Khan.png" alt="Hafiz Muhammad Ammar" style={{ width:"100%", display:"block" }} />
              </div>
             
        
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              <div>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f", margin:"0 0 14px" }}>The Founder</p>
                <h2 style={{ color:"#111", margin:"0 0 8px" }}>Hafiz Muhammad Ammar</h2>
                <p style={{ fontSize:14, color:"#999", margin:0, letterSpacing:".1em", textTransform:"uppercase" }}>Creative Director & CEO</p>
              </div>
              <p style={{ fontSize:15, lineHeight:1.9, color:"#555", margin:0 }}>
                Founded by Ammar Khan, Ammar Designz is a forward-thinking creative studio driven by strategy, design intelligence, and refined visual execution. With over 15 years of experience in graphic design, branding, and visual storytelling, Ammar has collaborated with diverse clients to build impactful identities that stand strong in competitive markets.

              </p>
           
             
            </div>
          </div>
        </section>

     


        {/* ── TEAM ── */}
        <section className="about-team-section" style={{ background:"linear-gradient(180deg, #060606 0%, #0a0a0a 50%, #060606 100%)", position:"relative", overflow:"hidden", padding:"120px 48px" }}>
          <div className="orb" style={{ width:600, height:600, background:"rgba(127,191,47,.07)", top:-120, left:"50%", transform:"translateX(-50%)", opacity:0.8 }} />
          <div className="orb" style={{ width:400, height:400, background:"rgba(127,191,47,.04)", bottom:-80, right:"-10%", opacity:0.6 }} />
          <div className="page-container" style={{ position:"relative", zIndex:1, maxWidth:1200, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:80 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:12, marginBottom:20 }}>
                <span style={{ width:40, height:1, background:"linear-gradient(90deg, transparent, #7fbf2f)", display:"block" }} />
                <span style={{ fontSize:11, fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#7fbf2f" }}>The People</span>
                <span style={{ width:40, height:1, background:"linear-gradient(90deg, #7fbf2f, transparent)", display:"block" }} />
              </div>
              <h2 style={{ fontWeight:700, color:"#fff", margin:0, fontSize:"clamp(32px, 4vw, 48px)", letterSpacing:"-0.02em" }}>Meet our <span className="gradient-text">Mentors</span></h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,.55)", marginTop:16, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>The minds behind your growth in design and craft.</p>
            </div>
            <div className="about-team-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:32 }}>
              {team.map((m,i) => (
                <div key={i} className="team-card card-hover" style={{ background:"linear-gradient(145deg, rgba(255,255,255,.04) 0%, rgba(255,255,255,.01) 100%)", border:"1px solid rgba(255,255,255,.08)", borderRadius:32, overflow:"hidden", cursor:"pointer", boxShadow:"0 24px 48px rgba(0,0,0,.25), 0 0 0 1px rgba(127,191,47,.05)", transition:"all .45s cubic-bezier(.23,1,.32,1)" }}>
                  <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden" }}>
                    <img src={m.image} alt={m.name} className="team-img" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .6s ease" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 50%)", pointerEvents:"none" }} />
                    <div style={{ position:"absolute", bottom:20, left:24, right:24 }}>
                      <span style={{ fontSize:10, fontWeight:700, letterSpacing:".25em", textTransform:"uppercase", color:"#7fbf2f", textShadow:"0 1px 2px rgba(0,0,0,.5)" }}>{m.role}</span>
                    </div>
                  </div>
                  <div style={{ padding:"28px 28px 32px" }}>
                    <h4 style={{ fontWeight:700, color:"#fff", margin:"0 0 12px", lineHeight:1.2, fontSize:20 }}>{m.name}</h4>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,.6)", lineHeight:1.75, margin:0 }}>{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            .about-team-section .team-card:hover { transform: translateY(-8px); box-shadow: 0 32px 64px rgba(0,0,0,.35), 0 0 0 1px rgba(127,191,47,.15); border-color: rgba(127,191,47,.2); }
            .about-team-section .team-card:hover .team-img { transform: scale(1.06); }
            @media (max-width: 900px) { .about-team-section .about-team-grid { grid-template-columns: 1fr !important; max-width: 400px; margin: 0 auto; } }
          `}</style>
        </section>

     

      </div>
    </>
  );
}

import React from "react";
import { portfolioData } from "../../data/portfolioData";
import { retroAudio } from "../../utils/audioSystem";

export const AboutWindow: React.FC = () => {
  const { user, stickyNote, likesAndDislikes, whatsInMyBag } = portfolioData;

  const TOUR_DATES = [
    {
      date: "AUG 2024 — PRESENT",
      city: "BENGALURU, IN",
      venue: "BMSIT CODING CLUB // NIRMAAN 2026",
      act: "Treasurer & Core Member | Lead Organiser",
      status: "HEADLINING",
      statusColor: "#ffe500",
      statusBg: "#000"
    },
    {
      date: "AUG 2026 — PRESENT",
      city: "ZURICH (REMOTE)",
      venue: "KLARDATALABS AI RESEARCH",
      act: "Agentic AI & LLM Engineer Intern (AWS Bedrock)",
      status: "ACTIVE GIG",
      statusColor: "#39ff14",
      statusBg: "#001a05"
    },
    {
      date: "SUMMER 2027",
      city: "PAN-INDIA / GLOBAL",
      venue: "SOFTWARE ENGINEER INTERN (AMTS)",
      act: "Full-Time Internship Role (Relational Schema & Systems)",
      status: "BOOKING NOW",
      statusColor: "#ff3b30",
      statusBg: "#ffe500"
    }
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
        backgroundColor: "#ffffff",
        height: "100%",
        overflowY: "auto",
        fontFamily: "var(--font-body)"
      }}
      className="bevel-sunken"
    >
      {/* Retro Menu Bar */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          borderBottom: "1px solid #c0c0c0",
          padding: "4px 8px",
          fontSize: "12px",
          color: "#000",
          fontFamily: "var(--font-pixel)",
          background: "#f0f0f0",
          flexShrink: 0
        }}
      >
        <span><u>F</u>ile</span>
        <span><u>E</u>dit</span>
        <span><u>V</u>iew</span>
        <span><u>I</u>nsert</span>
        <span><u>F</u>ormat</span>
        <span><u>H</u>elp</span>
      </div>

      {/* ===== HERO SECTION: Full-width dramatic gig-poster banner ===== */}
      <div
        style={{
          position: "relative",
          minHeight: "260px",
          overflow: "hidden",
          flexShrink: 0,
          background: "#111"
        }}
      >
        {/* Full-bleed photo */}
        <img
          src={user.avatarUrl}
          alt={user.name}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "260px",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            filter: "contrast(1.15) saturate(0.95)"
          }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />

        {/* Dark gradient overlay bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.88) 100%)"
          }}
        />

        {/* RISO-PRINT REGISTRATION MARKS (Aesthetic Gig-Poster Imperfection) */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 10,
            userSelect: "none"
          }}
        >
          {/* Alignment Crosshair */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              color: "#ffe500",
              textShadow: "1px 1px 0 #000",
              letterSpacing: "1px"
            }}
          >
            ⊕ REG.04/RISO
          </div>
          {/* CMYK/Riso Ink Blocks */}
          <div style={{ display: "flex", gap: "2px" }}>
            <span style={{ width: "8px", height: "8px", backgroundColor: "#ff3b30", border: "1px solid #000" }} title="Fluo Red" />
            <span style={{ width: "8px", height: "8px", backgroundColor: "#ffe500", border: "1px solid #000" }} title="Solar Yellow" />
            <span style={{ width: "8px", height: "8px", backgroundColor: "#00d2ff", border: "1px solid #000" }} title="Sky Blue" />
            <span style={{ width: "8px", height: "8px", backgroundColor: "#000000", border: "1px solid #fff" }} title="Noir" />
          </div>
        </div>

        {/* Giant Title overlay */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            right: "14px"
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(34px, 6vw, 48px)",
              color: "#ff3b30",
              textTransform: "uppercase",
              lineHeight: 0.9,
              letterSpacing: "-1px",
              transform: "rotate(-2deg)",
              textShadow: "3px 3px 0px #ffe500, 5px 5px 0px #000",
              display: "inline-block"
            }}
          >
            Meet<br />The Artist ★
          </div>
        </div>

        {/* Bottom info strip */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "14px",
            right: "14px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px"
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "24px",
                color: "#ffe500",
                textShadow: "2px 2px 4px #000",
                letterSpacing: "-0.5px"
              }}
            >
              {user.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "11px",
                color: "#39ff14",
                textShadow: "0 0 6px #39ff14",
                marginTop: "2px"
              }}
            >
              ● LIVE · {user.location} · 8.7 CGPA
            </div>
          </div>

          {/* Social handles */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {stickyNote.handles.map((h, i) => (
              <a
                key={i}
                href={h.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => retroAudio.playClick(1.0)}
                style={{
                  background: "#000",
                  color: "#ffe500",
                  padding: "4px 8px",
                  borderRadius: "2px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  fontFamily: "var(--font-silkscreen)",
                  border: "1px solid #ffe500",
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.6)"
                }}
              >
                {h.label.includes("github") ? "🐙 GitHub" : "💼 LinkedIn"}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PROFILE CARD (Responsive fluid grid) ===== */}
      <div
        style={{
          background: "#fffde7",
          borderBottom: "3px solid #000",
          padding: "12px 14px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "14px",
          flexShrink: 0
        }}
      >
        {/* Left: key info */}
        <div
          style={{
            fontFamily: "var(--font-marker)",
            fontSize: "15px",
            lineHeight: 1.6,
            color: "#1a1a1a",
            display: "flex",
            flexDirection: "column",
            gap: "3px"
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              borderBottom: "2px dashed #b8b04a",
              marginBottom: "4px",
              paddingBottom: "4px"
            }}
          >
            {user.name} &nbsp;
            <span style={{ fontSize: "14px", fontWeight: "normal", color: "#555" }}>
              {stickyNote.pronouns}
            </span>
          </div>
          <div>📌 <b>Role:</b> {user.role}</div>
          <div>🎓 <b>Edu:</b> {user.education}</div>
          <div>⚡ <b>MBTI:</b> {stickyNote.mbti}</div>
          <div>📍 <b>Base:</b> {user.location}</div>
        </div>

        {/* Right: quote + download */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "space-between" }}>
          <div
            style={{
              padding: "8px 12px",
              background: "rgba(255,229,0,0.35)",
              border: "2px solid #ffe500",
              borderRadius: "4px",
              fontFamily: "var(--font-marker)",
              fontSize: "14px",
              fontStyle: "italic",
              color: "#1a1a1a",
              lineHeight: 1.45
            }}
          >
            "{stickyNote.quote}"
          </div>
          <a
            href={portfolioData.contact.resumeUrl}
            download="Shashikiran_BS_Resume.pdf"
            onClick={() => retroAudio.playClick(1.2)}
            className="bevel-button"
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: "#ffe500",
              alignSelf: "flex-start",
              padding: "4px 12px"
            }}
          >
            📄 Download Resume (PDF)
          </a>
        </div>
      </div>

      {/* ===== BIO SECTION ===== */}
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #ddd", flexShrink: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-silkscreen)",
            fontSize: "13px",
            color: "#000080",
            marginBottom: "8px"
          }}
        >
          ABOUT.TXT — ARTIST STATEMENT
        </div>
        {user.bio.map((p, idx) => (
          <p
            key={idx}
            style={{
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#222",
              fontFamily: "var(--font-body)",
              marginBottom: "6px"
            }}
          >
            {p}
          </p>
        ))}
      </div>

      {/* ===== DIY GIG POSTER: TOUR DATES // CAREER GIGS ===== */}
      <div
        style={{
          padding: "12px 14px",
          backgroundColor: "#161b26",
          borderBottom: "3px solid #000",
          color: "#fff"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px dashed rgba(255,255,255,0.3)",
            paddingBottom: "6px",
            marginBottom: "10px"
          }}
        >
          <div style={{ fontFamily: "var(--font-silkscreen)", fontSize: "14px", color: "#ffe500" }}>
            TOUR DATES // 2024–2027 CAREER GIGS 🎸
          </div>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: "10px", color: "#39ff14" }}>
            ALL AGES // LIVE IN PROD
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {TOUR_DATES.map((tour, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                gap: "8px"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: "11px",
                    color: "#ffe500",
                    fontWeight: "bold"
                  }}
                >
                  {tour.date} · {tour.city}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "#fff" }}>
                  {tour.venue}
                </span>
                <span style={{ fontSize: "11px", color: "#aaa" }}>{tour.act}</span>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-silkscreen)",
                  fontSize: "10px",
                  padding: "3px 8px",
                  color: tour.statusColor,
                  backgroundColor: tour.statusBg,
                  border: `1px solid ${tour.statusColor}`,
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap"
                }}
              >
                {tour.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== EXPERIENCE & LEADERSHIP ===== */}
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #ddd", flexShrink: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-silkscreen)",
            fontSize: "13px",
            color: "#000080",
            marginBottom: "8px"
          }}
        >
          EXPERIENCE & ARCHITECTURE 💼
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {portfolioData.experience.map((exp, idx) => (
            <div
              key={idx}
              className="bevel-raised"
              style={{
                padding: "10px 12px",
                backgroundColor: "#f7f7f7",
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: "4px"
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "13px", color: "#000080" }}>
                  {exp.role} @ {exp.company}
                </span>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-pixel)", color: "#666" }}>
                  {exp.period} · {exp.location}
                </span>
              </div>
              <ul style={{ paddingLeft: "16px", fontSize: "12px", lineHeight: "1.5", color: "#333", margin: "4px 0" }}>
                {exp.highlights.map((h, hIdx) => (
                  <li key={hIdx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ===== LIKES & DISLIKES ===== */}
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #ddd", flexShrink: 0 }}>
        <div className="bevel-raised" style={{ padding: "10px", backgroundColor: "#c0c0c0" }}>
          <div
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "13px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#000"
            }}
          >
            SYSTEM_PREFERENCES.INI — [LIKES & DISLIKES]
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px"
            }}
          >
            {/* Likes */}
            <div className="bevel-sunken" style={{ padding: "8px", backgroundColor: "#f7fff7" }}>
              <div
                style={{
                  fontFamily: "var(--font-silkscreen)",
                  fontSize: "11px",
                  color: "#2e7d32",
                  marginBottom: "6px"
                }}
              >
                LIKES (++)
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", padding: 0, margin: 0 }}>
                {likesAndDislikes.likes.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "12px",
                      fontFamily: "var(--font-pixel)",
                      color: "#1b5e20",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <span style={{ color: "#4caf50" }}>✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dislikes */}
            <div className="bevel-sunken" style={{ padding: "8px", backgroundColor: "#fff7f7" }}>
              <div
                style={{
                  fontFamily: "var(--font-silkscreen)",
                  fontSize: "11px",
                  color: "#c62828",
                  marginBottom: "6px"
                }}
              >
                DISLIKES (--)
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", padding: 0, margin: 0 }}>
                {likesAndDislikes.dislikes.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "12px",
                      fontFamily: "var(--font-pixel)",
                      color: "#b71c1c",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <span style={{ color: "#f44336" }}>✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== WHAT'S IN MY BAG ===== */}
      <div style={{ padding: "12px 14px 18px" }}>
        <div
          style={{
            fontFamily: "var(--font-silkscreen)",
            fontSize: "13px",
            color: "#000080",
            marginBottom: "8px"
          }}
        >
          WHAT'S IN MY BAG? 🎒
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px"
          }}
        >
          {whatsInMyBag.map((item) => (
            <div
              key={item.id}
              className="bevel-raised"
              style={{
                padding: "10px 8px",
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <span style={{ fontSize: "28px", marginBottom: "4px" }}>{item.emoji}</span>
              <span style={{ fontSize: "12px", fontWeight: "bold", fontFamily: "var(--font-display)" }}>
                {item.name}
              </span>
              <span style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { portfolioData } from "../../data/portfolioData";

export const AboutWindow: React.FC = () => {
  const { user, stickyNote, likesAndDislikes, whatsInMyBag } = portfolioData;

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
          paddingBottom: "4px",
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

      {/* ===== HERO SECTION: Full-width dramatic banner ===== */}
      <div style={{
        position: "relative",
        height: "240px",
        overflow: "hidden",
        flexShrink: 0,
        background: "#111"
      }}>
        {/* Full-bleed photo */}
        <img
          src={user.avatarUrl}
          alt={user.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            filter: "contrast(1.1) saturate(0.9)"
          }}
          onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
        />

        {/* Dark gradient overlay bottom */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)"
        }} />

        {/* Giant Title overlay */}
        <div style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          right: "12px"
        }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "42px",
            color: "#ff3b30",
            textTransform: "uppercase",
            lineHeight: 0.9,
            letterSpacing: "-1px",
            transform: "rotate(-2deg)",
            textShadow: "3px 3px 0px #ffe500, 5px 5px 0px #000",
            display: "inline-block"
          }}>
            Meet<br/>The Artist ★
          </div>
        </div>

        {/* Bottom info strip */}
        <div style={{
          position: "absolute",
          bottom: "10px",
          left: "12px",
          right: "12px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "22px",
              color: "#fff",
              textShadow: "1px 1px 4px #000"
            }}>
              {user.name}
            </div>
            <div style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "11px",
              color: "#39ff14",
              textShadow: "0 0 6px #39ff14"
            }}>
              ● LIVE · {user.location}
            </div>
          </div>

          {/* Social handles */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {stickyNote.handles.map((h, i) => (
              <a
                key={i}
                href={h.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "rgba(0,0,0,0.8)",
                  color: "#fff",
                  padding: "3px 8px",
                  borderRadius: "2px",
                  fontSize: "11px",
                  textDecoration: "none",
                  fontFamily: "var(--font-silkscreen)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(4px)"
                }}
              >
                @{h.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PROFILE CARD ===== */}
      <div style={{
        background: "#fffde7",
        borderBottom: "3px solid #000",
        padding: "10px 12px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        flexShrink: 0
      }}>
        {/* Left: key info */}
        <div style={{
          fontFamily: "var(--font-marker)",
          fontSize: "16px",
          lineHeight: 1.6,
          color: "#1a1a1a",
          display: "flex",
          flexDirection: "column",
          gap: "2px"
        }}>
          <div style={{ fontSize: "18px", fontWeight: "bold", borderBottom: "2px dashed #b8b04a", marginBottom: "4px", paddingBottom: "4px" }}>
            {user.name} &nbsp;<span style={{ fontSize: "14px", fontWeight: "normal", color: "#555" }}>{stickyNote.pronouns}</span>
          </div>
          <div>📌 <b>Role:</b> {user.role}</div>
          <div>🎓 <b>Edu:</b> {user.education}</div>
          <div>⚡ <b>MBTI:</b> {stickyNote.mbti}</div>
          <div>📍 <b>Base:</b> {user.location}</div>
        </div>

        {/* Right: quote + download */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "space-between" }}>
          <div style={{
            padding: "8px 10px",
            background: "rgba(255,229,0,0.3)",
            border: "2px solid #ffe500",
            borderRadius: "4px",
            fontFamily: "var(--font-marker)",
            fontSize: "14px",
            fontStyle: "italic",
            color: "#1a1a1a",
            lineHeight: 1.4
          }}>
            "{stickyNote.quote}"
          </div>
          <a
            href={portfolioData.contact.resumeUrl}
            download="Shashikiran_BS_Resume.pdf"
            className="bevel-button"
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: "#ffe500",
              alignSelf: "flex-start"
            }}
          >
            📄 Download Resume (PDF)
          </a>
        </div>
      </div>

      {/* ===== BIO SECTION ===== */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #ddd", flexShrink: 0 }}>
        <div style={{
          fontFamily: "var(--font-silkscreen)",
          fontSize: "13px",
          color: "#000080",
          marginBottom: "6px"
        }}>
          ABOUT.TXT
        </div>
        {user.bio.map((p, idx) => (
          <p key={idx} style={{
            fontSize: "13px",
            lineHeight: 1.55,
            color: "#222",
            fontFamily: "var(--font-body)",
            marginBottom: "6px"
          }}>
            {p}
          </p>
        ))}
      </div>

      {/* ===== EXPERIENCE ===== */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #ddd", flexShrink: 0 }}>
        <div style={{
          fontFamily: "var(--font-silkscreen)",
          fontSize: "13px",
          color: "#000080",
          marginBottom: "8px"
        }}>
          EXPERIENCE & LEADERSHIP 💼
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {portfolioData.experience.map((exp, idx) => (
            <div
              key={idx}
              className="bevel-raised"
              style={{
                padding: "8px 10px",
                backgroundColor: "#f7f7f7",
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "4px" }}>
                <span style={{ fontWeight: "bold", fontSize: "13px", color: "#000080" }}>
                  {exp.role} @ {exp.company}
                </span>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-pixel)", color: "#666" }}>
                  {exp.period} · {exp.location}
                </span>
              </div>
              <ul style={{ paddingLeft: "16px", fontSize: "12px", lineHeight: "1.4", color: "#333" }}>
                {exp.highlights.map((h, hIdx) => (
                  <li key={hIdx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ===== LIKES & DISLIKES — styled like win95 dialog ===== */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #ddd", flexShrink: 0 }}>
        <div
          className="bevel-raised"
          style={{ padding: "10px", backgroundColor: "#c0c0c0" }}
        >
          <div style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#000"
          }}>
            SYSTEM_PREFERENCES.INI — [LIKES & DISLIKES]
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px"
          }}>
            {/* Likes */}
            <div className="bevel-sunken" style={{ padding: "8px", backgroundColor: "#f7fff7" }}>
              <div style={{ fontFamily: "var(--font-silkscreen)", fontSize: "11px", color: "#2e7d32", marginBottom: "6px" }}>LIKES (++)</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                {likesAndDislikes.likes.map((item, i) => (
                  <li key={i} style={{ fontSize: "12px", fontFamily: "var(--font-pixel)", color: "#1b5e20", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#4caf50" }}>✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dislikes */}
            <div className="bevel-sunken" style={{ padding: "8px", backgroundColor: "#fff7f7" }}>
              <div style={{ fontFamily: "var(--font-silkscreen)", fontSize: "11px", color: "#c62828", marginBottom: "6px" }}>DISLIKES (--)</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                {likesAndDislikes.dislikes.map((item, i) => (
                  <li key={i} style={{ fontSize: "12px", fontFamily: "var(--font-pixel)", color: "#b71c1c", display: "flex", alignItems: "center", gap: "6px" }}>
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
      <div style={{ padding: "10px 12px 16px" }}>
        <div style={{ fontFamily: "var(--font-silkscreen)", fontSize: "13px", color: "#000080", marginBottom: "8px" }}>
          WHAT'S IN MY BAG? 🎒
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "8px"
        }}>
          {whatsInMyBag.map((item) => (
            <div
              key={item.id}
              className="bevel-raised"
              style={{
                padding: "8px 6px",
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

import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "../../data/portfolioData";
import { retroAudio } from "../../utils/audioSystem";

export const AboutWindow: React.FC = () => {
  const { user, stickyNote, likesAndDislikes, whatsInMyBag, contact } = portfolioData;

  const [activeMenu, setActiveMenu] = useState<"file" | "edit" | "view" | "help" | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const showToast = (msg: string) => {
    retroAudio.playClick(1.2);
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`COPIED: ${label}`);
    } else {
      showToast(`${label}: ${text}`);
    }
    setActiveMenu(null);
  };

  const scrollToSection = (id: string) => {
    retroAudio.playClick(1.05);
    setActiveMenu(null);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      ref={scrollContainerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
        backgroundColor: "#ffffff",
        height: "100%",
        overflowY: "auto",
        fontFamily: "var(--font-body)",
        position: "relative"
      }}
      className="bevel-sunken"
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          style={{
            position: "sticky",
            top: "28px",
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "#000080",
            color: "#ffe500",
            fontFamily: "var(--font-pixel)",
            fontSize: "11px",
            padding: "6px 12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
            borderBottom: "1px solid #ffe500"
          }}
        >
          <span>★ {toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Interactive Retro Menu Bar */}
      <div
        ref={menuBarRef}
        style={{
          display: "flex",
          gap: "2px",
          borderBottom: "1px solid #c0c0c0",
          padding: "2px 4px",
          fontSize: "12px",
          color: "#000",
          fontFamily: "var(--font-pixel)",
          background: "#ece9d8",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          zIndex: 500,
          userSelect: "none"
        }}
      >
        {/* File Menu */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick(1.0);
              setActiveMenu(activeMenu === "file" ? null : "file");
            }}
            style={{
              padding: "2px 8px",
              background: activeMenu === "file" ? "#000080" : "transparent",
              color: activeMenu === "file" ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-pixel)",
              fontSize: "12px"
            }}
          >
            <u>F</u>ile
          </button>
          {activeMenu === "file" && (
            <div
              className="bevel-raised"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "210px",
                backgroundColor: "#ece9d8",
                padding: "2px 0",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.4)",
                zIndex: 600
              }}
            >
              <div
                className="retro-dropdown-item"
                onClick={() => {
                  retroAudio.playClick(1.2);
                  setActiveMenu(null);
                  window.open(contact.resumeUrl, "_blank");
                }}
              >
                <span>📄 Download Resume (PDF)</span>
              </div>
              <div
                className="retro-dropdown-item"
                onClick={() => {
                  retroAudio.playClick(1.0);
                  setActiveMenu(null);
                  window.print();
                }}
              >
                <span>🖨️ Print / Save Document</span>
              </div>
              <hr style={{ margin: "2px 0", borderColor: "#808080" }} />
              <div
                className="retro-dropdown-item"
                onClick={() => {
                  showToast("Use Titlebar ✕ to close window");
                  setActiveMenu(null);
                }}
              >
                <span>🚪 Exit Notepad</span>
              </div>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick(1.0);
              setActiveMenu(activeMenu === "edit" ? null : "edit");
            }}
            style={{
              padding: "2px 8px",
              background: activeMenu === "edit" ? "#000080" : "transparent",
              color: activeMenu === "edit" ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-pixel)",
              fontSize: "12px"
            }}
          >
            <u>E</u>dit
          </button>
          {activeMenu === "edit" && (
            <div
              className="bevel-raised"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "230px",
                backgroundColor: "#ece9d8",
                padding: "2px 0",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.4)",
                zIndex: 600
              }}
            >
              <div
                className="retro-dropdown-item"
                onClick={() => copyToClipboard(contact.email, "Email Address")}
              >
                <span>✉️ Copy Email Address</span>
              </div>
              <div
                className="retro-dropdown-item"
                onClick={() => copyToClipboard(contact.github, "GitHub URL")}
              >
                <span>🐙 Copy GitHub Link</span>
              </div>
              <div
                className="retro-dropdown-item"
                onClick={() => copyToClipboard(contact.linkedin, "LinkedIn URL")}
              >
                <span>💼 Copy LinkedIn Link</span>
              </div>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick(1.0);
              setActiveMenu(activeMenu === "view" ? null : "view");
            }}
            style={{
              padding: "2px 8px",
              background: activeMenu === "view" ? "#000080" : "transparent",
              color: activeMenu === "view" ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-pixel)",
              fontSize: "12px"
            }}
          >
            <u>V</u>iew
          </button>
          {activeMenu === "view" && (
            <div
              className="bevel-raised"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "210px",
                backgroundColor: "#ece9d8",
                padding: "2px 0",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.4)",
                zIndex: 600
              }}
            >
              <div className="retro-dropdown-item" onClick={() => scrollToSection("tour-dates")}>
                <span>🎪 Jump to Tour Dates</span>
              </div>
              <div className="retro-dropdown-item" onClick={() => scrollToSection("experience-section")}>
                <span>💼 Jump to Experience</span>
              </div>
              <div className="retro-dropdown-item" onClick={() => scrollToSection("prefs-section")}>
                <span>⚡ Jump to Preferences</span>
              </div>
              <div className="retro-dropdown-item" onClick={() => scrollToSection("bag-section")}>
                <span>🎒 Jump to What's in Bag</span>
              </div>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick(1.0);
              setActiveMenu(activeMenu === "help" ? null : "help");
            }}
            style={{
              padding: "2px 8px",
              background: activeMenu === "help" ? "#000080" : "transparent",
              color: activeMenu === "help" ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-pixel)",
              fontSize: "12px"
            }}
          >
            <u>H</u>elp
          </button>
          {activeMenu === "help" && (
            <div
              className="bevel-raised"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "240px",
                backgroundColor: "#ece9d8",
                padding: "2px 0",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.4)",
                zIndex: 600
              }}
            >
              <div
                className="retro-dropdown-item"
                onClick={() => {
                  showToast("Targeting: Summer 2027 SWE Intern (AMTS)");
                  setActiveMenu(null);
                }}
              >
                <span>★ Target: AMTS Summer 2027</span>
              </div>
              <div
                className="retro-dropdown-item"
                onClick={() => {
                  showToast("Shashi OS v3.0 · Built with React & Vite");
                  setActiveMenu(null);
                }}
              >
                <span>ℹ️ About Shashi OS v3.0</span>
              </div>
            </div>
          )}
        </div>
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

        {/* Right: quote + quick action buttons */}
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
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
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
                padding: "4px 12px"
              }}
            >
              📄 Download Resume (PDF)
            </a>
            <button
              type="button"
              className="bevel-button"
              onClick={() => copyToClipboard(contact.email, "Email")}
              style={{
                fontSize: "11px",
                padding: "4px 8px",
                cursor: "pointer"
              }}
            >
              ✉️ Copy Email
            </button>
          </div>
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
        id="tour-dates"
        style={{
          padding: "14px",
          background: "#0d0d0d",
          color: "#fff",
          borderBottom: "3px solid #ff3b30",
          flexShrink: 0
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "12px",
            borderBottom: "1px dashed rgba(255,255,255,0.2)",
            paddingBottom: "8px"
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "20px",
                color: "#ffe500",
                letterSpacing: "-0.5px"
              }}
            >
              ★ TOUR DATES & CAREER GIGS ★
            </div>
            <div style={{ fontFamily: "var(--font-silkscreen)", fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>
              SHASHIKIRAN B S // LIVE WORLD TOUR 2024–2027
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "11px",
              color: "#39ff14",
              border: "1px solid #39ff14",
              padding: "2px 8px"
            }}
          >
            TICKETS AVAILABLE NOW
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {TOUR_DATES.map((tour, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
                padding: "8px 12px",
                background: "rgba(255,255,255,0.05)",
                borderLeft: `4px solid ${tour.statusColor}`,
                borderBottom: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontFamily: "var(--font-silkscreen)", fontSize: "11px", color: tour.statusColor }}>
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
      <div id="experience-section" style={{ padding: "12px 14px", borderBottom: "1px solid #ddd", flexShrink: 0 }}>
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
      <div id="prefs-section" style={{ padding: "12px 14px", borderBottom: "1px solid #ddd", flexShrink: 0 }}>
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
      <div id="bag-section" style={{ padding: "12px 14px 18px" }}>
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

      <style>{`
        .retro-dropdown-item {
          padding: 4px 14px;
          cursor: pointer;
          font-family: var(--font-pixel);
          font-size: 11px;
          color: #000;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .retro-dropdown-item:hover {
          background-color: #000080;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

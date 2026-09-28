import React, { useState } from "react";
import { motion } from "motion/react";
import { retroAudio } from "../../utils/audioSystem";
import { portfolioData } from "../../data/portfolioData";

// ─── Deterministic QR-like pixel grid (encodes GitHub URL visually) ──────────
// This is a stylized QR-art representation, not a scannable QR, but looks authentic
const QR_MATRIX: number[][] = [
  [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
  [1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1],
  [0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0],
  [1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1],
  [0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0],
  [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,1,0,1,1,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,1,0,0,1,1,0,1,1,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,1,0,0,1,0,0,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,0,1,1,0],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,0,1,1],
];

export const IDBadgeWindow: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.06);
    setRotateY(x * 0.06);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 16px",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        height: "100%",
        overflowY: "auto",
        position: "relative",
        gap: "10px"
      }}
      className="bevel-sunken"
    >
      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", zIndex: 10 }}>
        <button
          type="button"
          className="bevel-button"
          onClick={() => {
            retroAudio.playClick(1.2);
            setIsFlipped(!isFlipped);
          }}
          style={{
            backgroundColor: "#ffe500",
            color: "#000",
            fontWeight: "bold",
            padding: "4px 12px",
            fontSize: "12px"
          }}
        >
          🔄 Flip Card: {isFlipped ? "Show Front" : "Show Back"}
        </button>
        <span style={{ fontFamily: "var(--font-pixel)", color: "#39ff14", fontSize: "11px" }}>
          [Hover to tilt • Click to flip]
        </span>
      </div>

      {/* Lanyard string */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <div style={{
          width: "3px",
          height: "18px",
          background: "linear-gradient(to bottom, #c0a070, #a08060)",
          borderRadius: "2px"
        }} />
        <div style={{
          width: "28px",
          height: "16px",
          background: "linear-gradient(135deg, #d4a843, #b8860b)",
          borderRadius: "4px 4px 0 0",
          boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.4), inset -1px -1px 2px rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{ width: "12px", height: "6px", background: "#1a1a1a", borderRadius: "3px" }} />
        </div>
      </div>

      {/* 3D Card Stage */}
      <div
        style={{ perspective: "1200px", cursor: "pointer" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          animate={{
            rotateX: rotateX,
            rotateY: isFlipped ? 180 + rotateY : rotateY
          }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          style={{
            width: "310px",
            height: "460px",
            transformStyle: "preserve-3d",
            position: "relative",
            borderRadius: "18px",
            boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)"
          }}
        >
          {/* ================= CARD FRONT ================= */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              backgroundColor: "#d91e18",
              borderRadius: "18px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              border: "2px solid rgba(255,100,100,0.5)",
            }}
          >
            {/* BIG BACKGROUND STAR WATERMARK */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 0
            }}>
              <div style={{
                fontSize: "320px",
                color: "rgba(180, 10, 10, 0.45)",
                lineHeight: 1,
                userSelect: "none",
                transform: "rotate(-15deg)"
              }}>★</div>
            </div>

            {/* DYNAMIC HOLOGRAPHIC FOIL SHIMMER */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(${115 + rotateY * 2.5}deg, rgba(255,0,128,0.12) 0%, rgba(0,255,255,0.18) 25%, rgba(255,255,0,0.15) 50%, rgba(0,255,128,0.18) 75%, rgba(0,128,255,0.12) 100%)`,
                mixBlendMode: "screen",
                opacity: Math.min(0.65, 0.2 + Math.abs(rotateX + rotateY) * 0.04),
                pointerEvents: "none",
                zIndex: 8,
                borderRadius: "18px",
                transition: "opacity 0.2s ease"
              }}
            />

            {/* Lanyard punch hole at top */}
            <div style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "52px",
              height: "12px",
              backgroundColor: "#111",
              borderRadius: "10px",
              border: "2px solid rgba(255,80,80,0.6)",
              zIndex: 10
            }} />

            {/* === TOP SECTION: Branding + Photo + Skills === */}
            <div style={{
              position: "relative",
              zIndex: 2,
              padding: "28px 16px 10px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flex: 1
            }}>
              {/* LEFT: Branding + Photo */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Branding */}
                <div>
                  <div style={{
                    fontFamily: "var(--font-silkscreen)",
                    fontSize: "16px",
                    color: "#fff",
                    fontWeight: "bold",
                    letterSpacing: "0.5px"
                  }}>
                    shashi★deck
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "12px",
                    color: "#ffe500",
                    letterSpacing: "2px",
                    fontWeight: 600,
                    marginTop: "2px"
                  }}>
                    mitarbeiterkarte
                  </div>
                </div>

                {/* Photo - LARGER to fill space */}
                <div style={{
                  width: "130px",
                  height: "160px",
                  backgroundColor: "#ffe500",
                  padding: "5px",
                  position: "relative",
                  boxShadow: "3px 3px 0 rgba(0,0,0,0.5)"
                }}>
                  <div style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#000"
                  }}>
                    <img
                      src="/avatar.jpg"
                      alt="Shashi Kiran"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                        display: "block"
                      }}
                    />
                  </div>
                  {/* star corner */}
                  <div style={{
                    position: "absolute",
                    bottom: "-14px",
                    right: "-14px",
                    color: "#ffffff",
                    fontSize: "32px",
                    lineHeight: 1,
                    textShadow: "1px 1px 3px rgba(0,0,0,0.5)"
                  }}>★</div>
                </div>
              </div>

              {/* RIGHT: Specializations */}
              <div style={{
                textAlign: "right",
                fontFamily: "var(--font-display)",
                color: "#ffe500",
                fontSize: "15px",
                lineHeight: 1.4,
                fontWeight: 800,
                textTransform: "lowercase",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                paddingTop: "32px"
              }}>
                <div>design</div>
                <div>fullstack</div>
                <div>react 19</div>
                <div>motion</div>
                <div>ai/ml</div>
                <div>systems</div>
                <div style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: "8px",
                  textAlign: "right",
                  lineHeight: 1.3
                }}>
                  oTX: 1164a5<br/>825.4.3 004.0°
                </div>
              </div>
            </div>

            {/* === BOTTOM SECTION: Giant Name + Details === */}
            <div style={{
              position: "relative",
              zIndex: 2,
              padding: "10px 16px 14px 16px",
              borderTop: "3px solid rgba(255,80,80,0.3)"
            }}>
              {/* GIANT NAME */}
              <div style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "64px",
                color: "#ffe500",
                lineHeight: 0.85,
                letterSpacing: "-3px",
                textTransform: "uppercase",
                textShadow: "3px 3px 0 rgba(0,0,0,0.3)"
              }}>
                SHASHI
              </div>

              {/* Engineer badge + barcode row */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px"
              }}>
                {/* Engineer badge */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{
                    backgroundColor: "#ffe500",
                    color: "#d91e18",
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "12px",
                    padding: "2px 8px",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    engineer 01
                  </div>
                  <div style={{ height: "4px", backgroundColor: "#ffe500", width: "90px" }} />
                  <div style={{ height: "4px", backgroundColor: "#ffe500", width: "65px" }} />
                </div>

                {/* Barcode */}
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    height: "38px",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "2px",
                    backgroundColor: "#fff",
                    padding: "3px 5px"
                  }}>
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1].map((w, i) => (
                      <div
                        key={i}
                        style={{
                          width: `${w * 1.4}px`,
                          height: "100%",
                          backgroundColor: "#000"
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: "8px", fontFamily: "var(--font-pixel)", color: "rgba(255,255,255,0.8)" }}>
                    625.4.3 004.0*
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CARD BACK ================= */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundColor: "#d91e18",
              borderRadius: "18px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              border: "2px solid rgba(255,100,100,0.5)"
            }}
          >
            {/* BIG BACKGROUND STAR WATERMARK - back */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 0
            }}>
              <div style={{
                fontSize: "280px",
                color: "rgba(180, 10, 10, 0.4)",
                lineHeight: 1,
                userSelect: "none",
                transform: "rotate(15deg)"
              }}>★</div>
            </div>

            {/* DYNAMIC HOLOGRAPHIC FOIL SHIMMER - BACK */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(${115 - rotateY * 2.5}deg, rgba(255,0,128,0.12) 0%, rgba(0,255,255,0.18) 25%, rgba(255,255,0,0.15) 50%, rgba(0,255,128,0.18) 75%, rgba(0,128,255,0.12) 100%)`,
                mixBlendMode: "screen",
                opacity: Math.min(0.65, 0.2 + Math.abs(rotateX + rotateY) * 0.04),
                pointerEvents: "none",
                zIndex: 8,
                borderRadius: "18px",
                transition: "opacity 0.2s ease"
              }}
            />

            {/* Lanyard punch hole back */}
            <div style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "52px",
              height: "12px",
              backgroundColor: "#111",
              borderRadius: "10px",
              border: "2px solid rgba(255,80,80,0.6)",
              zIndex: 10
            }} />

            {/* Magnetic stripe at top */}
            <div style={{
              position: "relative",
              zIndex: 2,
              height: "44px",
              marginTop: "28px",
              backgroundColor: "#0a0a0a",
              boxShadow: "inset 0 3px 8px rgba(0,0,0,0.9), inset 0 -3px 8px rgba(0,0,0,0.9)"
            }} />

            {/* Back content: QR + Contact + Skills */}
            <div style={{ position: "relative", zIndex: 2, padding: "12px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Row: QR code + identity */}
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                {/* QR Code art */}
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  title="Open GitHub Profile"
                  style={{ flexShrink: 0, textDecoration: "none" }}
                >
                  <div style={{
                    backgroundColor: "#fff",
                    padding: "5px",
                    borderRadius: "2px",
                    boxShadow: "2px 2px 0 rgba(0,0,0,0.4)",
                    display: "inline-block",
                    cursor: "pointer"
                  }}>
                    <svg width="76" height="76" viewBox="0 0 19 19" style={{ imageRendering: "pixelated" }}>
                      {QR_MATRIX.map((row, y) =>
                        row.map((cell, x) =>
                          cell ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#000" /> : null
                        )
                      )}
                    </svg>
                    <div style={{ fontSize: "7px", fontFamily: "var(--font-pixel)", textAlign: "center", color: "#333", marginTop: "2px" }}>GITHUB ↗</div>
                  </div>
                </a>

                {/* Identity block */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "22px",
                    color: "#ffe500",
                    lineHeight: 0.9,
                    letterSpacing: "-1px",
                    textTransform: "uppercase",
                    textShadow: "2px 2px 0 rgba(0,0,0,0.3)"
                  }}>SHASHI<br/>KIRAN</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "9px", color: "#fff", marginTop: "4px", letterSpacing: "1px" }}>BACKEND · AGENTIC AI</div>
                  <div style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", color: "rgba(255,255,255,0.7)", marginTop: "3px" }}>CGPA 8.7 / 10 · BMSIT CSE (AI/ML)</div>
                </div>
              </div>

              {/* Contact info */}
              <div style={{
                backgroundColor: "rgba(0,0,0,0.35)",
                borderRadius: "2px",
                padding: "7px 9px",
                fontFamily: "var(--font-pixel)",
                fontSize: "9px",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: "3px"
              }}>
                <div>✉ {portfolioData.contact.email}</div>
                <div>🐙 github.com/shashikiranbs2006</div>
                <div>💼 linkedin.com/in/shashikiranbs</div>
                <div>📍 Bengaluru, Karnataka — Open to relocate</div>
              </div>

              {/* Skill chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {["FastAPI", "PostgreSQL", "Docker", "AWS Bedrock", "Scikit-Learn", "React 19", "TypeScript", "LLM Tooling", "RAG", "Chrome Ext"].map((skill, i) => (
                  <span
                    key={skill}
                    style={{
                      backgroundColor: ["#ffe500", "#ff5c5c", "#3cf", "#39ff14", "#f472b6", "#a78bfa"][i % 6],
                      color: i % 6 === 0 ? "#000" : i % 6 === 2 || i % 6 === 3 ? "#000" : "#fff",
                      fontFamily: "var(--font-pixel)",
                      fontSize: "8px",
                      padding: "2px 5px",
                      borderRadius: "1px",
                      fontWeight: "bold",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Signature + serial bottom */}
            <div style={{ position: "relative", zIndex: 2, padding: "0 16px 12px" }}>
              <div style={{
                backgroundColor: "#ffffff",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 10px",
                backgroundImage: "repeating-linear-gradient(transparent, transparent 11px, rgba(0,0,0,0.05) 11px, rgba(0,0,0,0.05) 12px)",
                overflow: "hidden"
              }}>
                <img
                  src="/signature.jpg"
                  alt="Signature"
                  style={{
                    height: "40px",
                    maxWidth: "150px",
                    objectFit: "contain",
                    objectPosition: "left center",
                    mixBlendMode: "multiply",
                    filter: "contrast(1.5) brightness(0.8)",
                    transform: "rotate(-2deg)",
                    opacity: 0.9
                  }}
                  onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                />
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: "#888" }}>AUTHORIZED<br/>SIGNATURE</div>
                  <div style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: "#bbb", marginTop: "2px" }}>ID: SHSH-2026-0001</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Shine hint text */}
      <div style={{
        fontFamily: "var(--font-pixel)",
        color: "rgba(255,255,255,0.4)",
        fontSize: "10px",
        letterSpacing: "1px",
        textAlign: "center"
      }}>
        HOVER · TILT · CLICK TO FLIP
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { motion } from "motion/react";

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
          onClick={() => setIsFlipped(!isFlipped)}
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
              justifyContent: "space-between",
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
                fontSize: "320px",
                color: "rgba(180, 10, 10, 0.45)",
                lineHeight: 1,
                userSelect: "none",
                transform: "rotate(15deg)"
              }}>★</div>
            </div>

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

            {/* Back top branding */}
            <div style={{ position: "relative", zIndex: 2, padding: "32px 18px 0" }}>
              <div style={{
                fontFamily: "var(--font-silkscreen)",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center"
              }}>
                shashi★deck
              </div>
            </div>

            {/* Magnetic Stripe */}
            <div style={{
              position: "relative",
              zIndex: 2,
              height: "52px",
              backgroundColor: "#0a0a0a",
              boxShadow: "inset 0 3px 8px rgba(0,0,0,0.9), inset 0 -3px 8px rgba(0,0,0,0.9)"
            }} />

            {/* Signature Panel */}
            <div style={{ position: "relative", zIndex: 2, padding: "0 18px" }}>
              <div style={{
                backgroundColor: "#ffffff",
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 10px",
                backgroundImage: "repeating-linear-gradient(transparent, transparent 13px, rgba(0,0,0,0.06) 13px, rgba(0,0,0,0.06) 14px)",
                position: "relative",
                overflow: "hidden"
              }}>
                <img
                  src="/signature.jpg"
                  alt="Signature"
                  style={{
                    height: "52px",
                    maxWidth: "180px",
                    objectFit: "contain",
                    objectPosition: "left center",
                    mixBlendMode: "multiply",
                    filter: "contrast(1.5) brightness(0.8)",
                    transform: "rotate(-2deg) translateY(2px)",
                    opacity: 0.9
                  }}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "9px",
                  color: "#888",
                  flexShrink: 0,
                  textAlign: "right",
                  lineHeight: 1.3
                }}>
                  AUTHORIZED<br/>SIGNATURE
                </span>
              </div>
            </div>

            {/* Bottom Back: Serial + Big Star Name */}
            <div style={{ position: "relative", zIndex: 2, padding: "12px 18px 18px" }}>
              <div style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "2px",
                marginBottom: "4px"
              }}>
                770776
              </div>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  top: "-22px",
                  left: "4px",
                  color: "#ffffff",
                  fontSize: "32px",
                  textShadow: "2px 2px 0 rgba(0,0,0,0.3)"
                }}>★</span>
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

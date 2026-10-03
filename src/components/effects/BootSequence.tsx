import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { retroAudio } from "../../utils/audioSystem";

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"bios" | "loading" | "logo" | "done">("bios");
  const [progress, setProgress] = useState(0);
  const [biosLines, setBiosLines] = useState<string[]>([]);
  const hasFinishedRef = useRef(false);

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setPhase("done");
    setTimeout(onComplete, 200);
  }, [onComplete]);

  const BIOS_LINES = [
    "SHASHI-DECK BIOS v2.0  ★  Sep 27 2026",
    "Core: AMD Athlon XP 1800+    RAM: 786432K OK",
    "",
    "Detecting Primary Master  ... SHASHIKIRAN_BS [HDD]",
    "Detecting Primary Slave   ... PORTFOLIO_V3.0 [SSD]",
    "Detecting Remote Server   ... AWS_BEDROCK [AI ENGINE]",
    "",
    "Verifying soul data ......... DONE",
    "Loading creative engine ..... OK",
    "Initializing portfolio OS ...",
  ];

  // Drive sound on mount
  useEffect(() => {
    retroAudio.playDriveRead();
  }, []);

  // Keyboard skip listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || phase === "logo") {
        finish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, finish]);

  useEffect(() => {
    let lineIdx = 0;
    const biosTimer = setInterval(() => {
      if (lineIdx < BIOS_LINES.length) {
        setBiosLines(prev => [...prev, BIOS_LINES[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(biosTimer);
        setTimeout(() => setPhase("loading"), 400);
      }
    }, 80);
    return () => clearInterval(biosTimer);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    let p = 0;
    const progressTimer = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(progressTimer);
        setTimeout(() => setPhase("logo"), 600);
      }
      setProgress(Math.min(p, 100));
    }, 120);
    return () => clearInterval(progressTimer);
  }, [phase]);

  useEffect(() => {
    if (phase === "logo") {
      const t = setTimeout(() => {
        finish();
      }, 2400);
      return () => clearTimeout(t);
    }
  }, [phase, finish]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={finish}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background: phase === "logo" ? "#0a0a0c" : "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: phase === "logo" ? "center" : "flex-start",
            justifyContent: phase === "logo" ? "center" : "flex-start",
            padding: phase === "logo" ? "0" : "20px 24px",
            transition: "background 0.3s",
            cursor: phase === "logo" ? "pointer" : "default",
            userSelect: "none"
          }}
        >
          {/* Quick Skip Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              finish();
            }}
            title="Skip boot sequence (ESC)"
            style={{
              position: "fixed",
              top: "16px",
              right: "16px",
              padding: "6px 12px",
              background: "rgba(20, 20, 24, 0.85)",
              border: "1px solid rgba(255, 229, 0, 0.4)",
              color: "#ffe500",
              fontFamily: "var(--font-silkscreen, monospace)",
              fontSize: "11px",
              cursor: "pointer",
              letterSpacing: "1px",
              zIndex: 1000000,
              boxShadow: "2px 2px 0px rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.15s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ffe500";
              e.currentTarget.style.color = "#000000";
              e.currentTarget.style.borderColor = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(20, 20, 24, 0.85)";
              e.currentTarget.style.color = "#ffe500";
              e.currentTarget.style.borderColor = "rgba(255, 229, 0, 0.4)";
            }}
          >
            <span>ESC</span>
            <span style={{ fontSize: "9px", opacity: 0.8 }}>SKIP ⏭</span>
          </button>

          {/* BIOS Phase */}
          {phase === "bios" && (
            <div style={{ fontFamily: "monospace", fontSize: "13px", color: "#c0c0c0", lineHeight: "1.5" }}>
              {biosLines.map((line, i) => (
                <div
                  key={`bios-line-${i}`}
                  style={{
                    color: line?.startsWith("SHASHI") ? "#ffe500" : (line?.startsWith("Detecting") || line?.startsWith("Loading") || line?.startsWith("Initializing")) ? "#ffffff" : "#c0c0c0",
                    minHeight: "1.5em"
                  }}
                >
                  {line || "\u00a0"}
                </div>
              ))}
              <span style={{ color: "#ffe500", animation: "blink 1s step-end infinite" }}>_</span>
            </div>
          )}

          {/* Loading Phase */}
          {phase === "loading" && (
            <div style={{
              width: "100%",
              height: "100%",
              background: "#000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px"
            }}>
              {/* Shashi branding logo */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "var(--font-display, 'Outfit', sans-serif)",
                  fontSize: "52px",
                  fontWeight: 900,
                  color: "#ffe500",
                  letterSpacing: "-2px",
                  textShadow: "0 0 40px rgba(255,229,0,0.4), 0 0 80px rgba(255,229,0,0.15)",
                  lineHeight: 1
                }}>
                  SHASHI★
                </div>
                <div style={{
                  fontFamily: "var(--font-silkscreen, 'Silkscreen', monospace)",
                  fontSize: "14px",
                  color: "#ff3b30",
                  marginTop: "6px",
                  letterSpacing: "4px"
                }}>
                  OS v3.0 — PORTFOLIO EDITION
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
              }}>
                <div style={{
                  width: "100%",
                  height: "4px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  overflow: "hidden"
                }}>
                  <motion.div
                    style={{
                      height: "100%",
                      borderRadius: "2px",
                      background: "linear-gradient(90deg, #ffe500 0%, #ff3b30 100%)",
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
                <div style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "1px"
                }}>
                  Loading portfolio... {Math.round(progress)}%
                </div>
              </div>
            </div>
          )}

          {/* Logo Splash — Shashi-themed with Riso Touches */}
          {phase === "logo" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: "relative",
                textAlign: "center",
                color: "#fff",
                padding: "36px 48px",
                border: "2px solid rgba(255,229,0,0.25)",
                background: "rgba(18, 18, 22, 0.7)",
                backdropFilter: "blur(8px)",
                maxWidth: "460px",
                width: "90%"
              }}
            >
              {/* Riso registration targets */}
              <span style={{ position: "absolute", top: "8px", left: "10px", color: "#00a0e9", fontSize: "14px", opacity: 0.6 }}>⨁</span>
              <span style={{ position: "absolute", top: "8px", right: "10px", color: "#ff3b30", fontSize: "14px", opacity: 0.6 }}>⨁</span>
              <span style={{ position: "absolute", bottom: "8px", left: "10px", color: "#ffe500", fontSize: "14px", opacity: 0.6 }}>⨁</span>
              <span style={{ position: "absolute", bottom: "8px", right: "10px", color: "#00a0e9", fontSize: "14px", opacity: 0.6 }}>⨁</span>

              {/* Riso Color Swatches */}
              <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "16px" }}>
                {["#ffe500", "#ff3b30", "#00a0e9", "#111111"].map((c, i) => (
                  <span
                    key={i}
                    style={{
                      width: "14px",
                      height: "6px",
                      backgroundColor: c,
                      display: "inline-block",
                      border: "1px solid rgba(255,255,255,0.3)"
                    }}
                  />
                ))}
              </div>

              {/* Avatar photo */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                style={{
                  width: "88px",
                  height: "88px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto 14px",
                  border: "3px solid #ffe500",
                  boxShadow: "0 0 25px rgba(255,229,0,0.4)"
                }}
              >
                <img
                  src="/avatar.jpg"
                  alt="Shashi Kiran"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </motion.div>

              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                style={{
                  fontSize: "56px",
                  fontFamily: "var(--font-display, 'Outfit', sans-serif)",
                  fontWeight: 900,
                  color: "#ffe500",
                  textShadow: "0 0 35px rgba(255,229,0,0.5), 3px 3px 0 rgba(217,30,24,0.8)",
                  letterSpacing: "-2px",
                  lineHeight: 1
                }}
              >
                SHASHI★
              </motion.div>

              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "15px",
                  fontFamily: "var(--font-silkscreen, monospace)",
                  marginTop: "8px",
                  letterSpacing: "2px"
                }}
              >
                Shashikiran B S · Engineer 01
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono, monospace)",
                  color: "#00a0e9",
                  marginTop: "6px",
                  letterSpacing: "1px"
                }}
              >
                SWE INTERN APPLICANT 2027 ★ KLARDATALABS
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 0.6, duration: 1.2, repeat: Infinity }}
                style={{
                  marginTop: "22px",
                  color: "#ffe500",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  padding: "4px 8px",
                  background: "rgba(255,229,0,0.1)",
                  borderRadius: "2px",
                  display: "inline-block"
                }}
              >
                ▶ press any key or click to enter ◀
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </AnimatePresence>
  );
};

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"bios" | "loading" | "logo" | "done">("bios");
  const [progress, setProgress] = useState(0);
  const [biosLines, setBiosLines] = useState<string[]>([]);

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
        setPhase("done");
        setTimeout(onComplete, 600);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background: phase === "logo" ? "#0d0d0d" : "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: phase === "logo" ? "center" : "flex-start",
            justifyContent: phase === "logo" ? "center" : "flex-start",
            padding: phase === "logo" ? "0" : "20px 24px",
            transition: "background 0.3s"
          }}
        >
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

          {/* Logo Splash — Shashi-themed */}
          {phase === "logo" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", color: "#fff", padding: "20px" }}
            >
              {/* Big avatar photo */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto 16px",
                  border: "3px solid #ffe500",
                  boxShadow: "0 0 30px rgba(255,229,0,0.5)"
                }}
              >
                <img
                  src="/avatar.jpg"
                  alt="Shashi Kiran"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </motion.div>

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: "64px",
                  fontFamily: "var(--font-display, 'Outfit', sans-serif)",
                  fontWeight: 900,
                  color: "#ffe500",
                  textShadow: "0 0 40px rgba(255,229,0,0.5), 4px 4px 0 rgba(217,30,24,0.8)",
                  letterSpacing: "-3px",
                  lineHeight: 1
                }}
              >
                SHASHI★
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "16px",
                  fontFamily: "var(--font-silkscreen, monospace)",
                  marginTop: "8px",
                  letterSpacing: "2px"
                }}
              >
                Shashikiran B S · Engineer 01
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 1, duration: 1, repeat: Infinity }}
                style={{ marginTop: "28px", color: "rgba(255,229,0,0.5)", fontSize: "12px", fontFamily: "monospace" }}
              >
                press any key to enter...
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

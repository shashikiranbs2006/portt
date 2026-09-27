import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { retroAudio } from "../../utils/audioSystem";

interface BSODProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const BSOD: React.FC<BSODProps> = ({ isVisible, onDismiss }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isVisible) {
      setCountdown(10);
      return;
    }
    if (countdown <= 0) {
      retroAudio.playBootJingle();
      onDismiss();
      return;
    }
    const t = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [isVisible, countdown, onDismiss]);

  const handleDismiss = () => {
    retroAudio.playBootJingle();
    onDismiss();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999999,
            backgroundColor: "#0000AA",
            fontFamily: "'Courier New', Courier, monospace",
            color: "#fff",
            padding: "clamp(16px, 5vw, 48px)",
            fontSize: "clamp(12px, 2.5vw, 14px)",
            lineHeight: "1.6",
            cursor: "pointer",
            overflowY: "auto"
          }}
          onClick={handleDismiss}
        >
          {/* XP BSOD style */}
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div style={{ marginBottom: "20px", fontSize: "clamp(14px, 3vw, 16px)", fontWeight: "bold" }}>
              A problem has been detected and SHASHI★ OS has been shut down to prevent damage to your sense of professionalism.
            </div>

            <div style={{ marginBottom: "20px" }}>
              <strong style={{ backgroundColor: "#fff", color: "#0000AA", padding: "1px 6px" }}>
                RECRUITER_NOT_IMPRESSED_EXCEPTION
              </strong>
            </div>

            <div style={{ marginBottom: "20px" }}>
              If this is the first time you've seen this stop error screen, restart your brain and keep scrolling.
              If this screen appears again, follow these steps:
            </div>

            <div style={{ marginBottom: "20px", paddingLeft: "16px" }}>
              <div>• Check to make sure you actually looked at the Projects section.</div>
              <div>• Verify that you explored the Multi-Tenant Scoped Query Simulator.</div>
              <div>• If problems continue, disable or remove any recently installed hiring biases.</div>
              <div>• For immediate recovery, send an interview offer to shashibs238@gmail.com.</div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              Technical information:
            </div>

            <div style={{ marginBottom: "20px", color: "#ffe500" }}>
              *** STOP: 0x0000007E (0x0000404F, 0xSHASHI_CERTIFIED, 0xBAD_HIRE_DECISION, 0xC0DER_FOUND)
            </div>

            <div style={{ marginBottom: "20px", fontFamily: "'Courier New', monospace", fontSize: "11px", color: "#ccc" }}>
              Beginning dump of physical memory<br />
              Physical memory dump complete.<br />
              Contact shashibs238@gmail.com for technical support and interview arrangements.
            </div>

            <div style={{ marginTop: "32px", textAlign: "center", animation: "blink 1.5s step-end infinite", color: "#39ff14" }}>
              Resuming portfolio in {countdown}s... or click anywhere to wake up.
            </div>
          </div>

          <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
      onDismiss();
      return;
    }
    const t = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [isVisible, countdown, onDismiss]);

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
            padding: "48px 60px",
            fontSize: "14px",
            lineHeight: "1.6",
            cursor: "default"
          }}
          onClick={onDismiss}
        >
          {/* XP BSOD style */}
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div style={{ marginBottom: "24px", fontSize: "16px" }}>
              A problem has been detected and Shashi OS has been shut down to prevent damage to your sense of professionalism.
            </div>

            <div style={{ marginBottom: "24px" }}>
              <strong>RECRUITER_NOT_IMPRESSED_EXCEPTION</strong>
            </div>

            <div style={{ marginBottom: "24px" }}>
              If this is the first time you've seen this stop error screen, restart your brain and keep scrolling.
              If this screen appears again, follow these steps:
            </div>

            <div style={{ marginBottom: "24px", paddingLeft: "24px" }}>
              <div>Check to make sure you actually looked at the Projects section.</div>
              <div>If this is a new portfolio, ask the developer for an updated version.</div>
              <div>If problems continue, disable or remove any recently installed hiring biases.</div>
              <div>If you need to use safe mode to remove or disable components, restart your career.</div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              Technical information:
            </div>

            <div style={{ marginBottom: "24px" }}>
              *** STOP: 0x0000007E (0x0000404F, 0xSHASHI_CERTIFIED, 0xBAD_HIRE_DECISION, 0xC0DER_NOT_FOUND)
            </div>

            <div style={{ marginBottom: "24px", fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#ccc" }}>
              Beginning dump of physical memory<br />
              Physical memory dump complete.<br />
              Contact your system administrator or technical support for further assistance.
            </div>

            <div style={{ marginTop: "40px", textAlign: "center", animation: "blink 1.5s step-end infinite" }}>
              Resuming portfolio in {countdown} seconds... or click anywhere to wake up.
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

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { WindowId } from "../../types/os";

const CLIPPY_MESSAGES = [
  {
    trigger: "idle",
    messages: [
      "It looks like you're looking at a portfolio! Would you like help sending a hire request?",
      "Hi! I'm Clippy! Shashi asked me to stay here and bug you until you hire him.",
      "Did you know Shashi built this entire OS experience just to flex on other devs? Impressive, right?",
      "I see you haven't clicked the contact button yet. Shall I send an email on your behalf?",
      "This portfolio has more windows than your actual house. Just saying.",
    ]
  }
];

interface ClippyProps {
  onOpenWindow?: (id: WindowId) => void;
}

export const Clippy: React.FC<ClippyProps> = ({ onOpenWindow }) => {
  const [visible, setVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pos, setPos] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth - 180 : 800,
    y: typeof window !== 'undefined' ? window.innerHeight - 260 : 500
  }));
  const messages = CLIPPY_MESSAGES[0].messages;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartRef = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  // Show Clippy after 8s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(t);
  }, []);

  // Rotate messages
  useEffect(() => {
    if (!visible || dismissed) return;
    const show = () => {
      setMsgIndex(prev => (prev + 1) % messages.length);
      setShowBubble(true);
      timerRef.current = setTimeout(() => setShowBubble(false), 6000);
    };
    // Show first message quickly
    const first = setTimeout(show, 800);
    const interval = setInterval(show, 18000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, dismissed, messages.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };

    const onMove = (ev: MouseEvent) => {
      setPos({
        x: dragStartRef.current.px + (ev.clientX - dragStartRef.current.mx),
        y: dragStartRef.current.py + (ev.clientY - dragStartRef.current.my),
      });
    };
    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  if (!visible || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 99000,
        userSelect: "none",
        cursor: isDragging ? "grabbing" : "grab"
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{
              position: "absolute",
              bottom: "110px",
              right: "0px",
              width: "240px",
              backgroundColor: "#fffce6",
              border: "2px solid #c0c0c0",
              padding: "10px 12px",
              boxShadow: "4px 4px 0px #808080",
              borderRadius: "4px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "12px",
              color: "#000",
              lineHeight: "1.4"
            }}
          >
            {/* Bubble tail */}
            <div style={{
              position: "absolute",
              bottom: "-10px",
              right: "30px",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "10px solid #c0c0c0"
            }} />
            <div style={{
              position: "absolute",
              bottom: "-8px",
              right: "30px",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "10px solid #fffce6"
            }} />

            <div style={{ marginBottom: "8px" }}>{messages[msgIndex]}</div>

            <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="bevel-button"
                style={{ fontSize: "10px", padding: "2px 8px" }}
                onClick={(e) => { e.stopPropagation(); if (onOpenWindow) onOpenWindow("phone"); setShowBubble(false); }}
              >
                📱 Contact
              </button>
              <button
                type="button"
                className="bevel-button"
                style={{ fontSize: "10px", padding: "2px 8px" }}
                onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clippy Character */}
      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
        onClick={() => { setShowBubble(prev => !prev); setMsgIndex(prev => (prev + 1) % messages.length); }}
      >
        {/* Clippy SVG body - authentic paperclip shape */}
        <svg width="72" height="96" viewBox="0 0 72 96" style={{ filter: "drop-shadow(2px 4px 4px rgba(0,0,0,0.3))" }}>
          {/* Body */}
          <ellipse cx="36" cy="58" rx="26" ry="30" fill="#f5e642" stroke="#c8b800" strokeWidth="2" />
          {/* Head */}
          <ellipse cx="36" cy="26" rx="18" ry="18" fill="#f5e642" stroke="#c8b800" strokeWidth="2" />
          {/* Face: Eyes */}
          <ellipse cx="29" cy="24" rx="3" ry="4" fill="#1a1a1a" />
          <ellipse cx="43" cy="24" rx="3" ry="4" fill="#1a1a1a" />
          {/* Eye shine */}
          <ellipse cx="30" cy="22.5" rx="1.2" ry="1.5" fill="#fff" />
          <ellipse cx="44" cy="22.5" rx="1.2" ry="1.5" fill="#fff" />
          {/* Smile */}
          <path d="M28 31 Q36 37 44 31" fill="none" stroke="#7a6000" strokeWidth="2" strokeLinecap="round" />
          {/* Arms */}
          <line x1="10" y1="52" x2="24" y2="60" stroke="#c8b800" strokeWidth="4" strokeLinecap="round" />
          <line x1="62" y1="52" x2="48" y2="60" stroke="#c8b800" strokeWidth="4" strokeLinecap="round" />
          {/* Tiny hands/paws */}
          <circle cx="9" cy="51" r="4" fill="#f5e642" stroke="#c8b800" strokeWidth="2" />
          <circle cx="63" cy="51" r="4" fill="#f5e642" stroke="#c8b800" strokeWidth="2" />
          {/* Legs */}
          <line x1="28" y1="86" x2="24" y2="96" stroke="#c8b800" strokeWidth="4" strokeLinecap="round" />
          <line x1="44" y1="86" x2="48" y2="96" stroke="#c8b800" strokeWidth="4" strokeLinecap="round" />
          {/* Paperclip loop detail on body */}
          <path d="M22 50 Q36 42 50 50 Q50 68 36 70 Q22 68 22 50" fill="none" stroke="#c8b800" strokeWidth="2" strokeDasharray="3 2" />
        </svg>

        {/* Label */}
        <div style={{
          backgroundColor: "#fffce6",
          border: "1px solid #c0c0c0",
          fontSize: "10px",
          padding: "1px 6px",
          fontFamily: "var(--font-pixel)",
          boxShadow: "1px 1px 0 #808080",
          color: "#000"
        }}>
          Clippy
        </div>

        {/* X dismiss button */}
        <button
          type="button"
          style={{
            width: "16px",
            height: "16px",
            background: "#c0c0c0",
            border: "1px solid #808080",
            fontSize: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "-6px",
            right: "-6px",
            lineHeight: 1
          }}
          onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
          title="Dismiss Clippy"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

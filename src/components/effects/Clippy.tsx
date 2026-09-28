import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { WindowId } from "../../types/os";
import { retroAudio } from "../../utils/audioSystem";

// ─── Agentic Message Bank ───────────────────────────────────────────────────
// Contextual, witty messages referencing real portfolio features
const MESSAGES: string[] = [
  "It looks like you're evaluating a developer! I can help you draft a hire request. 📋",
  "👀 Psst — open the PROJECTS window. You can launch live deployed apps for The Relay, Yoru Chatbot, Prompt Compiler & more!",
  "Fun fact: this whole OS was built by one person. One chaotic, over-engineered person. Hire them.",
  "⚡ Have you tried the MS Paint window? You can stamp riso-print art on a canvas. It slaps.",
  "I see you haven't clicked CONTACT yet. Shall I schedule an interview on your behalf? I'm very persuasive.",
  "🧠 Check out The Relay and Prompt Compiler in the Projects window — both have live deployed simulations!",
  "Between you and me, the Minesweeper game has a secret easter egg. Win it to find out. 👀",
  "VS Code extensions, Chrome extensions, RAG retrieval & ML fraud scoring... Shashi builds things that actually work.",
  "🎸 Check the ABOUT window — there's a full tour schedule of Shashi's 2026–2027 career gigs.",
  "I've been a paperclip since 1997. I've seen a LOT of portfolios. This one is different. Trust me.",
  "Recruiter tip: The MESSENGER window has quick-prompt shortcuts. You can ask me anything. Well, not me. The other bot.",
  "Did you know this entire audio system is zero external dependencies? Procedural Web Audio synthesis only. Nerd. 🔊",
  "Shashi's building things at AMTS Summer 2027. You should probably reach out before someone else does.",
  "🖨️ This portfolio has riso-print grain, halftone textures, and gig-poster typography. Intentional. It's *design*.",
  "The sticky notes on the desktop are draggable. Try it. Also try dragging me. I like it when you drag me.",
];

// ─── Animation states for Clippy ────────────────────────────────────────────
type ClippyMood = "idle" | "waving" | "thinking" | "excited";

interface ClippyProps {
  onOpenWindow?: (id: WindowId) => void;
}

export const Clippy: React.FC<ClippyProps> = ({ onOpenWindow }) => {
  const [visible, setVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mood, setMood] = useState<ClippyMood>("idle");
  const [nudgeAnim, setNudgeAnim] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [pos, setPos] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth - 180 : 800,
    y: typeof window !== "undefined" ? window.innerHeight - 290 : 500,
  }));

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartRef = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const didDragRef = useRef(false);

  // Show Clippy after 8s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const showNextMessage = useCallback(() => {
    if (dismissed) return;
    const next = (msgIndex + 1) % MESSAGES.length;
    setMsgIndex(next);
    setShowBubble(true);
    // Pick mood based on message content
    const msg = MESSAGES[next];
    if (msg.includes("⚡") || msg.includes("🎸") || msg.includes("🔊")) {
      setMood("excited");
    } else if (msg.includes("🧠") || msg.includes("Psst") || msg.includes("between")) {
      setMood("thinking");
    } else {
      setMood("idle");
    }
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => setShowBubble(false), 7000);
  }, [msgIndex, dismissed]);

  // Auto-rotate messages
  useEffect(() => {
    if (!visible || dismissed) return;
    // Show first message quickly
    timerRef.current = setTimeout(() => {
      setShowBubble(true);
      setMood("waving");
      retroAudio.playClick(0.8);
      bubbleTimerRef.current = setTimeout(() => setShowBubble(false), 7000);
    }, 900);

    const interval = setInterval(showNextMessage, 20000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      clearInterval(interval);
    };
  }, [visible, dismissed]); // eslint-disable-line react-hooks/exhaustive-deps

  // Nudge animation trigger
  const triggerNudge = () => {
    setNudgeAnim(true);
    retroAudio.playClick(1.4);
    setTimeout(() => setNudgeAnim(false), 600);
  };

  // Drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    didDragRef.current = false;
    setIsDragging(true);
    dragStartRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStartRef.current.mx;
      const dy = ev.clientY - dragStartRef.current.my;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDragRef.current = true;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.px + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 150, dragStartRef.current.py + dy)),
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

  const handleBodyClick = () => {
    if (didDragRef.current) return;
    const newCount = clickCount + 1;
    setClickCount(newCount);
    retroAudio.playClick(0.9 + newCount * 0.05);
    showNextMessage();
    triggerNudge();
  };

  // ─── Mouth curve based on mood ─────────────────────────────────────────────
  const smilePath: Record<ClippyMood, string> = {
    idle: "M28 31 Q36 37 44 31",
    waving: "M27 30 Q36 38 45 30",
    thinking: "M29 33 Q36 33 43 33", // flat / neutral
    excited: "M26 30 Q36 40 46 30",
  };

  // ─── Eye shape based on mood ───────────────────────────────────────────────
  const eyeRy: Record<ClippyMood, number> = {
    idle: 4,
    waving: 3.5,
    thinking: 2.5, // squint
    excited: 5,
  };

  // Contextual action button from current message
  const getActionButton = () => {
    const msg = MESSAGES[msgIndex];
    if (msg.includes("PROJECTS") || msg.includes("simulator") || msg.includes("RAG") || msg.includes("LLM")) {
      return { label: "📂 Projects", window: "projects" as WindowId };
    }
    if (msg.includes("Paint") || msg.includes("riso")) {
      return { label: "🎨 Paint", window: "paint" as WindowId };
    }
    if (msg.includes("Minesweeper") || msg.includes("easter")) {
      return { label: "💣 Sweeper", window: "minesweeper" as WindowId };
    }
    if (msg.includes("ABOUT") || msg.includes("tour") || msg.includes("gig")) {
      return { label: "👤 About", window: "about" as WindowId };
    }
    if (msg.includes("MESSENGER") || msg.includes("quick-prompt") || msg.includes("bot")) {
      return { label: "💬 Chat", window: "messenger" as WindowId };
    }
    return { label: "📱 Contact", window: "phone" as WindowId };
  };

  const actionBtn = getActionButton();

  if (!visible || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 99000,
        userSelect: "none",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            style={{
              position: "absolute",
              bottom: "118px",
              right: "0px",
              width: "260px",
              backgroundColor: "#fffce6",
              border: "2px solid #7a6000",
              padding: "10px 12px 8px",
              boxShadow: "3px 3px 0px #7a6000",
              borderRadius: "2px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "12px",
              color: "#1a1a1a",
              lineHeight: "1.5",
            }}
          >
            {/* Riso-print top accent bar */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "repeating-linear-gradient(90deg, #f5e642 0px, #f5e642 8px, #ff5c5c 8px, #ff5c5c 16px, #3cf 16px, #3cf 24px)",
              opacity: 0.7,
            }} />

            {/* Bubble tail */}
            <div style={{
              position: "absolute",
              bottom: "-11px",
              right: "32px",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "11px solid #7a6000",
            }} />
            <div style={{
              position: "absolute",
              bottom: "-8px",
              right: "32px",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "9px solid #fffce6",
            }} />

            {/* Message text */}
            <div style={{ marginBottom: "10px", marginTop: "4px", fontWeight: 500 }}>
              {MESSAGES[msgIndex]}
            </div>

            {/* Action + Dismiss */}
            <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="bevel-button"
                style={{ fontSize: "10px", padding: "2px 8px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  retroAudio.playWindowSwoosh(true);
                  if (onOpenWindow) onOpenWindow(actionBtn.window);
                  setShowBubble(false);
                }}
              >
                {actionBtn.label}
              </button>
              <button
                type="button"
                className="bevel-button"
                style={{ fontSize: "10px", padding: "2px 8px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  retroAudio.playClick(0.7);
                  setShowBubble(false);
                }}
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clippy Character */}
      <motion.div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
        animate={nudgeAnim ? { x: [0, -6, 8, -5, 3, 0], rotate: [0, -4, 4, -2, 1, 0] } : {}}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        onClick={handleBodyClick}
      >
        {/* Wiggle idle animation wrapper */}
        <motion.div
          animate={!isDragging ? {
            y: [0, -4, 0],
            rotate: mood === "waving" ? [0, -5, 5, -3, 2, 0] : [0, -1.5, 1.5, 0],
          } : {}}
          transition={mood === "waving"
            ? { duration: 0.8, repeat: 2, repeatType: "mirror", ease: "easeInOut" }
            : { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
          }
        >
          <svg
            width="72"
            height="100"
            viewBox="0 0 72 100"
            style={{ filter: "drop-shadow(2px 4px 5px rgba(0,0,0,0.35))" }}
          >
            {/* Body */}
            <ellipse cx="36" cy="60" rx="26" ry="30" fill="#f5e642" stroke="#7a6000" strokeWidth="2" />
            {/* Paperclip loop detail on body */}
            <path
              d="M22 52 Q36 44 50 52 Q50 72 36 74 Q22 72 22 52"
              fill="none"
              stroke="#c8b800"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
            {/* Head */}
            <ellipse cx="36" cy="26" rx="18" ry="18" fill="#f5e642" stroke="#7a6000" strokeWidth="2" />
            {/* Eyes */}
            <ellipse cx="29" cy="24" rx="3" ry={eyeRy[mood]} fill="#1a1a1a" />
            <ellipse cx="43" cy="24" rx="3" ry={eyeRy[mood]} fill="#1a1a1a" />
            {/* Eye shine */}
            <ellipse cx="30" cy="22" rx="1.2" ry="1.5" fill="#fff" />
            <ellipse cx="44" cy="22" rx="1.2" ry="1.5" fill="#fff" />
            {/* Eyebrows — raise on excited */}
            {mood === "excited" && (
              <>
                <path d="M26 18 Q29 16 32 18" stroke="#7a6000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M40 18 Q43 16 46 18" stroke="#7a6000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </>
            )}
            {/* Thinking sweat drop */}
            {mood === "thinking" && (
              <ellipse cx="48" cy="16" rx="2.5" ry="3.5" fill="#88ccff" opacity={0.85} />
            )}
            {/* Smile */}
            <path
              d={smilePath[mood]}
              fill="none"
              stroke="#7a6000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Arms */}
            <motion.line
              x1="10" y1="54" x2="24" y2="62"
              stroke="#c8b800" strokeWidth="4" strokeLinecap="round"
              animate={mood === "waving" ? { x2: [24, 14, 24], y2: [62, 50, 62] } : {}}
              transition={{ duration: 0.4, repeat: 3, repeatType: "mirror" }}
            />
            <line x1="62" y1="54" x2="48" y2="62" stroke="#c8b800" strokeWidth="4" strokeLinecap="round" />
            {/* Tiny hands */}
            <motion.circle
              cx="9" cy="53" r="4"
              fill="#f5e642" stroke="#c8b800" strokeWidth="2"
              animate={mood === "waving" ? { cx: [9, 2, 9], cy: [53, 43, 53] } : {}}
              transition={{ duration: 0.4, repeat: 3, repeatType: "mirror" }}
            />
            <circle cx="63" cy="53" r="4" fill="#f5e642" stroke="#c8b800" strokeWidth="2" />
            {/* Legs */}
            <line x1="28" y1="88" x2="24" y2="100" stroke="#c8b800" strokeWidth="4" strokeLinecap="round" />
            <line x1="44" y1="88" x2="48" y2="100" stroke="#c8b800" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Label */}
        <div style={{
          backgroundColor: "#fffce6",
          border: "1px solid #7a6000",
          fontSize: "9px",
          padding: "1px 6px",
          fontFamily: "var(--font-pixel)",
          boxShadow: "1px 1px 0 #7a6000",
          color: "#1a1a1a",
          letterSpacing: "0.05em",
        }}>
          CLIPPY v2.1
        </div>

        {/* X dismiss button */}
        <button
          type="button"
          style={{
            width: "16px",
            height: "16px",
            background: "#c0c0c0",
            border: "2px solid #808080",
            fontSize: "9px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "-6px",
            right: "-6px",
            lineHeight: 1,
            fontWeight: "bold",
          }}
          onClick={(e) => {
            e.stopPropagation();
            retroAudio.playClick(0.6);
            setDismissed(true);
          }}
          title="Dismiss Clippy"
        >
          ✕
        </button>
      </motion.div>
    </div>
  );
};

import React, { useState } from "react";
import { motion } from "motion/react";
import { retroAudio } from "../../utils/audioSystem";

interface Sticker {
  id: string;
  content: React.ReactNode;
  getPos: (w: number, h: number) => { x: number; y: number };
  rotate?: number;
}

const STICKERS: Sticker[] = [
  {
    id: "star-red",
    content: (
      <div
        style={{
          color: "#ff3b30",
          fontSize: "28px",
          filter: "drop-shadow(2px 2px 0px #000)",
          lineHeight: 1
        }}
      >
        ★
      </div>
    ),
    getPos: (w) => ({ x: Math.min(260, w - 80), y: 40 }),
    rotate: 15
  },
  {
    id: "star-yellow",
    content: (
      <div
        style={{
          color: "#ffe500",
          fontSize: "24px",
          filter: "drop-shadow(2px 2px 0px #000)",
          lineHeight: 1
        }}
      >
        ✦
      </div>
    ),
    getPos: (w) => ({ x: Math.max(20, w - 120), y: 75 }),
    rotate: -12
  },
  {
    id: "y2k-badge",
    content: (
      <div
        style={{
          background: "#ffe500",
          color: "#000",
          border: "2px solid #000",
          padding: "2px 8px",
          fontFamily: "var(--font-silkscreen)",
          fontSize: "10px",
          fontWeight: "bold",
          boxShadow: "3px 3px 0px #000"
        }}
      >
        ★ Y2K CERTIFIED ★
      </div>
    ),
    getPos: (w) => ({ x: Math.min(420, w - 160), y: 16 }),
    rotate: -4
  },
  {
    id: "nirmaan-badge",
    content: (
      <div
        style={{
          background: "#ff3b30",
          color: "#fff",
          border: "2px solid #000",
          padding: "3px 8px",
          fontFamily: "var(--font-silkscreen)",
          fontSize: "9px",
          fontWeight: "bold",
          boxShadow: "3px 3px 0px #000",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}
      >
        <span>🏷️</span>
        <span>NIRMAAN 2026</span>
      </div>
    ),
    getPos: (w) => ({ x: Math.max(16, w - 240), y: 120 }),
    rotate: 6
  },
  {
    id: "amts-sticker",
    content: (
      <div
        style={{
          background: "#000",
          color: "#39ff14",
          border: "1px solid #39ff14",
          padding: "3px 8px",
          fontFamily: "var(--font-pixel)",
          fontSize: "11px",
          boxShadow: "2px 2px 0px rgba(0,0,0,0.6)"
        }}
      >
        ⚡ SWE INTERN // SUMMER 2027
      </div>
    ),
    getPos: (w, h) => ({ x: Math.min(140, w - 200), y: Math.max(100, h - 220) }),
    rotate: -2
  },
  {
    id: "rec-tag",
    content: (
      <div
        style={{
          background: "#000",
          color: "#ff3b30",
          border: "1px solid #ff3b30",
          padding: "2px 6px",
          fontFamily: "var(--font-pixel)",
          fontSize: "12px",
          boxShadow: "2px 2px 0px rgba(0,0,0,0.5)"
        }}
      >
        REC ● 00:24:18
      </div>
    ),
    getPos: (_w, h) => ({ x: 20, y: Math.max(120, h - 140) }),
    rotate: 3
  }
];

export const DraggableStickers: React.FC = () => {
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const getDims = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    return { w, h };
  };

  const { w, h } = getDims();

  return (
    <>
      {STICKERS.map((sticker) => {
        const pos = sticker.getPos(w, h);
        const isDragging = activeDragId === sticker.id;

        return (
          <motion.div
            key={sticker.id}
            drag
            dragMomentum={false}
            initial={{
              x: pos.x,
              y: pos.y,
              rotate: sticker.rotate || 0
            }}
            whileHover={{ scale: 1.15, cursor: "grab" }}
            whileTap={{ scale: 0.95, cursor: "grabbing" }}
            onDragStart={() => {
              retroAudio.playPeel();
              setActiveDragId(sticker.id);
            }}
            onDragEnd={() => {
              setActiveDragId(null);
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: isDragging ? 9999 : 15,
              userSelect: "none"
            }}
          >
            {sticker.content}
          </motion.div>
        );
      })}
    </>
  );
};

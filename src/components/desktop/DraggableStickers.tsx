import React from "react";
import { motion } from "motion/react";

interface Sticker {
  id: string;
  content: React.ReactNode;
  initialPos: { x: number; y: number };
  rotate?: number;
}

const STICKERS: Sticker[] = [
  {
    id: "star-1",
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
    initialPos: { x: 260, y: 40 },
    rotate: 15
  },
  {
    id: "star-2",
    content: (
      <div
        style={{
          color: "#ffe500",
          fontSize: "22px",
          filter: "drop-shadow(2px 2px 0px #000)",
          lineHeight: 1
        }}
      >
        ✦
      </div>
    ),
    initialPos: { x: 740, y: 70 },
    rotate: -12
  },
  {
    id: "sparkles",
    content: (
      <div
        style={{
          background: "rgba(255, 235, 59, 0.95)",
          color: "#000",
          border: "2px solid #000",
          padding: "2px 8px",
          fontFamily: "var(--font-silkscreen)",
          fontSize: "10px",
          borderRadius: "4px",
          boxShadow: "3px 3px 0px #000"
        }}
      >
        ★ Y2K CERTIFIED ★
      </div>
    ),
    initialPos: { x: 420, y: 18 },
    rotate: -4
  },
  {
    id: "pixel-heart",
    content: (
      <div
        style={{
          color: "#ff2a85",
          fontSize: "24px",
          filter: "drop-shadow(2px 2px 0px #000)"
        }}
      >
        💖
      </div>
    ),
    initialPos: { x: 880, y: 320 },
    rotate: 8
  },
  {
    id: "cd-sticker",
    content: (
      <div
        style={{
          background: "#000",
          color: "#39ff14",
          border: "1px solid #39ff14",
          padding: "2px 6px",
          fontFamily: "var(--font-pixel)",
          fontSize: "12px",
          boxShadow: "2px 2px 0px rgba(0,0,0,0.5)"
        }}
      >
        REC ● 00:24:18
      </div>
    ),
    initialPos: { x: 140, y: 480 },
    rotate: 3
  }
];

export const DraggableStickers: React.FC = () => {
  return (
    <>
      {STICKERS.map((sticker) => (
        <motion.div
          key={sticker.id}
          drag
          dragMomentum={false}
          initial={{
            x: sticker.initialPos.x,
            y: sticker.initialPos.y,
            rotate: sticker.rotate || 0
          }}
          whileHover={{ scale: 1.15, cursor: "grab" }}
          whileTap={{ scale: 0.95, cursor: "grabbing" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 15,
            userSelect: "none"
          }}
        >
          {sticker.content}
        </motion.div>
      ))}
    </>
  );
};

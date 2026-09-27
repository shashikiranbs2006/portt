import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { retroAudio } from "../../utils/audioSystem";

interface DesktopIconProps {
  id: string;
  title: string;
  icon: string | React.ReactNode;
  defaultPosition: { x: number; y: number };
  onOpen: () => void;
  sublabel?: string;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  title,
  icon,
  defaultPosition,
  onOpen,
  sublabel
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const lastClickTimeRef = useRef<number>(0);

  const handleInteraction = () => {
    setIsSelected(true);
    const now = Date.now();
    const isDoubleClick = now - lastClickTimeRef.current < 450;
    lastClickTimeRef.current = now;

    retroAudio.playClick(1.05);

    // Support single click for touch / mobile screens (<768px), double click for desktop
    if (window.innerWidth < 768 || isDoubleClick) {
      retroAudio.playClick(1.25);
      onOpen();
      lastClickTimeRef.current = 0;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      retroAudio.playClick(1.25);
      onOpen();
    }
  };

  const tooltipText = `${title}${sublabel ? ` [${sublabel}]` : ""} — Double-click or Press Enter to open`;

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: defaultPosition.x, y: defaultPosition.y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleInteraction}
      onDoubleClick={(e) => {
        e.stopPropagation();
        retroAudio.playClick(1.25);
        onOpen();
      }}
      onKeyDown={handleKeyDown}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
      role="button"
      aria-label={title}
      title={tooltipText}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "84px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "6px 4px",
        zIndex: 10,
        outline: "none"
      }}
    >
      {/* Icon frame */}
      <div
        style={{
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "30px",
          filter: isSelected ? "drop-shadow(0 0 6px rgba(0, 0, 128, 0.6))" : "drop-shadow(2px 2px 2px rgba(0,0,0,0.35))",
          marginBottom: "4px",
          userSelect: "none"
        }}
      >
        {typeof icon === "string" ? <span>{icon}</span> : icon}
      </div>

      {/* Label */}
      <div
        style={{
          backgroundColor: isSelected ? "#000080" : "rgba(0, 0, 0, 0.55)",
          color: "#ffffff",
          padding: "1px 5px",
          borderRadius: "2px",
          fontSize: "12px",
          fontFamily: "var(--font-pixel)",
          letterSpacing: "0.5px",
          textAlign: "center",
          wordBreak: "break-word",
          lineHeight: "1.1",
          border: isSelected ? "1px dotted #ffffff" : "1px solid transparent",
          textShadow: "1px 1px 2px rgba(0,0,0,0.9)",
          userSelect: "none"
        }}
      >
        {title}
      </div>

      {sublabel && (
        <span
          style={{
            fontSize: "10px",
            color: "#ffff00",
            fontFamily: "var(--font-pixel)",
            marginTop: "2px",
            textShadow: "1px 1px 1px #000",
            userSelect: "none"
          }}
        >
          {sublabel}
        </span>
      )}
    </motion.div>
  );
};

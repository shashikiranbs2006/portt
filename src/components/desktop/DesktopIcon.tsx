import React, { useState } from "react";
import { motion } from "motion/react";

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
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setIsSelected(true);
    setClickCount((prev) => prev + 1);

    // Support single click for touch / mobile, double click for desktop
    if (window.innerWidth < 768 || clickCount >= 1) {
      onOpen();
      setClickCount(0);
    } else {
      setTimeout(() => setClickCount(0), 400);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: defaultPosition.x, y: defaultPosition.y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
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
        zIndex: 10
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
          marginBottom: "4px"
        }}
      >
        {typeof icon === "string" ? <span>{icon}</span> : icon}
      </div>

      {/* Label */}
      <div
        style={{
          backgroundColor: isSelected ? "#000080" : "rgba(0, 0, 0, 0.45)",
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
          textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
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
            textShadow: "1px 1px 1px #000"
          }}
        >
          {sublabel}
        </span>
      )}
    </motion.div>
  );
};

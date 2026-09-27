import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { WindowState } from "../../types/os";

interface RetroWindowProps {
  window: WindowState;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  children: React.ReactNode;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  window: win,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  children
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  if (!win.isOpen || win.isMinimized) {
    return null;
  }

  const isMax = win.isMaximized;

  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        drag={!isMax}
        dragMomentum={false}
        dragElastic={0.05}
        initial={{
          opacity: 0,
          scale: 0.92,
          x: win.position.x,
          y: win.position.y
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isMax ? 0 : win.position.x,
          y: isMax ? 0 : win.position.y,
          width: isMax ? "100vw" : win.size.width,
          height: isMax ? "calc(100vh - 36px)" : win.size.height
        }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        onPointerDown={onFocus}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: win.zIndex,
          display: "flex",
          flexDirection: "column",
          maxWidth: "100vw",
          maxHeight: "calc(100vh - 36px)"
        }}
        className="bevel-raised"
      >
        {/* Retro Titlebar */}
        <div
          className="win-titlebar"
          onDoubleClick={onToggleMaximize}
          style={{ cursor: isMax ? "default" : "grab" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            <span style={{ fontSize: "14px" }}>{win.icon}</span>
            <span
              style={{
                fontFamily: "var(--font-silkscreen)",
                fontSize: "11px",
                letterSpacing: "0.5px"
              }}
            >
              {win.title}
            </span>
          </div>

          {/* Window Control Buttons */}
          <div className="win-controls">
            <button
              type="button"
              className="win-btn"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              title="Minimize"
            >
              _
            </button>
            <button
              type="button"
              className="win-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMaximize();
              }}
              title={isMax ? "Restore" : "Maximize"}
            >
              {isMax ? "❐" : "□"}
            </button>
            <button
              type="button"
              className="win-btn"
              style={{ color: "#800000", fontWeight: "900" }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window Body Container */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#c0c0c0",
            padding: "4px"
          }}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

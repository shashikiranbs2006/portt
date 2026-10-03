import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { WindowState } from "../../types/os";

interface RetroWindowProps {
  window: WindowState;
  isActive?: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onPositionChange?: (id: WindowState["id"], pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  window: win,
  isActive = true,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onPositionChange,
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
        dragElastic={0.02}
        onDragEnd={(_e, info) => {
          if (!isMax && onPositionChange) {
            onPositionChange(win.id, {
              x: Math.max(0, Math.min(window.innerWidth - 100, win.position.x + info.offset.x)),
              y: Math.max(0, Math.min(window.innerHeight - 80, win.position.y + info.offset.y))
            });
          }
        }}
        initial={{
          opacity: 0,
          scale: 0.94,
          x: win.position.x,
          y: win.position.y
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isMax ? 0 : win.position.x,
          y: isMax ? 0 : win.position.y,
          width: isMax ? "100vw" : win.size.width,
          height: isMax ? "calc(100vh - 34px)" : win.size.height
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
          maxHeight: "calc(100vh - 34px)",
          boxShadow: isActive
            ? "3px 3px 12px rgba(0, 0, 0, 0.45)"
            : "2px 2px 8px rgba(0, 0, 0, 0.25)"
        }}
        className="bevel-raised"
      >
        {/* Retro Titlebar */}
        <div
          className={`win-titlebar ${!isActive ? "inactive" : ""}`}
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
          <div className="win-controls" onPointerDown={(e) => e.stopPropagation()}>
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
          onPointerDown={(e) => {
            // Prevent motion drag on interactive child elements
            if (
              e.target instanceof HTMLInputElement ||
              e.target instanceof HTMLTextAreaElement ||
              e.target instanceof HTMLButtonElement ||
              e.target instanceof HTMLCanvasElement ||
              e.target instanceof HTMLAnchorElement
            ) {
              e.stopPropagation();
            }
          }}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

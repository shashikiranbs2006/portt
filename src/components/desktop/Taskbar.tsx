import React, { useState, useEffect } from "react";
import type { WindowState, WindowId } from "../../types/os";

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: WindowId | null;
  onToggleWindow: (id: WindowId) => void;
  isStartOpen: boolean;
  onToggleStart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onToggleWindow,
  isStartOpen,
  onToggleStart,
  isMuted,
  onToggleMute
}) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bevel-raised"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2px 4px",
        zIndex: 99999,
        backgroundColor: "#c0c0c0"
      }}
    >
      {/* Left: Start button + Window tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", overflow: "hidden" }}>
        {/* Start Button */}
        <button
          type="button"
          className={`bevel-button ${isStartOpen ? "active font-bold" : ""}`}
          onClick={onToggleStart}
          style={{
            height: "26px",
            padding: "0 8px",
            fontFamily: "var(--font-silkscreen)",
            fontSize: "11px",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <span style={{ fontSize: "15px" }}>🪟</span>
          <span>Start</span>
        </button>

        {/* Vertical divider */}
        <div
          style={{
            width: "2px",
            height: "22px",
            borderLeft: "1px solid #808080",
            borderRight: "1px solid #fff",
            margin: "0 2px"
          }}
        />

        {/* Open Windows Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            overflowX: "auto",
            maxWidth: "calc(100vw - 220px)"
          }}
        >
          {windows
            .filter((w) => w.isOpen)
            .map((win) => {
              const isActive = activeWindowId === win.id && !win.isMinimized;
              return (
                <button
                  key={win.id}
                  type="button"
                  className={`bevel-button ${isActive ? "active" : ""}`}
                  onClick={() => onToggleWindow(win.id)}
                  style={{
                    height: "24px",
                    maxWidth: "150px",
                    padding: "0 6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                  title={win.title}
                >
                  <span>{win.icon}</span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontFamily: "var(--font-pixel)"
                    }}
                  >
                    {win.title}
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Right: System Tray */}
      <div
        className="bevel-sunken"
        style={{
          height: "24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 8px",
          backgroundColor: "#c0c0c0",
          fontFamily: "var(--font-pixel)",
          fontSize: "13px"
        }}
      >
        {/* Audio Mute Toggle */}
        <button
          type="button"
          onClick={onToggleMute}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "13px",
            display: "flex",
            alignItems: "center"
          }}
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* Network status */}
        <span title="Connected to 21st.dev Hypernet" style={{ fontSize: "12px" }}>
          🌐
        </span>

        {/* Digital Clock */}
        <span style={{ minWidth: "48px", textAlign: "right" }}>{time}</span>
      </div>
    </div>
  );
};

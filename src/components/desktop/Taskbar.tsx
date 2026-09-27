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
  const [date, setDate] = useState("");
  const [showCgpaTip, setShowCgpaTip] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString([], { month: "short", day: "numeric" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // CGPA "battery" — 8.7 / 10 = 87% filled
  const cgpaPercent = 87;

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
          className={`bevel-button ${isStartOpen ? "active" : ""}`}
          onClick={onToggleStart}
          style={{
            height: "26px",
            padding: "0 8px",
            fontFamily: "var(--font-silkscreen)",
            fontSize: "11px",
            fontWeight: isStartOpen ? 700 : 400,
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
            maxWidth: "calc(100vw - 240px)"
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
                    textOverflow: "ellipsis",
                    fontWeight: isActive ? 700 : 400,
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
          fontSize: "13px",
          flexShrink: 0
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

        {/* CGPA "battery" meter — easter egg */}
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onMouseEnter={() => setShowCgpaTip(true)}
          onMouseLeave={() => setShowCgpaTip(false)}
          title="CGPA Charge: 8.7 / 10"
        >
          {/* Tooltip */}
          {showCgpaTip && (
            <div style={{
              position: "absolute",
              bottom: "28px",
              right: 0,
              backgroundColor: "#fffce6",
              border: "1px solid #7a6000",
              padding: "3px 6px",
              fontFamily: "var(--font-pixel)",
              fontSize: "10px",
              whiteSpace: "nowrap",
              boxShadow: "2px 2px 0 #7a6000",
              color: "#1a1a1a",
              zIndex: 99999
            }}>
              CGPA: 8.7 / 10 ⚡ (87% charged)
            </div>
          )}
          {/* Battery body */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1px"
          }}>
            <div style={{
              width: "28px",
              height: "12px",
              border: "1.5px solid #444",
              borderRadius: "2px",
              padding: "1.5px",
              backgroundColor: "#c0c0c0",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${cgpaPercent}%`,
                height: "100%",
                backgroundColor: cgpaPercent > 70 ? "#39ff14" : "#ffe500",
                borderRadius: "1px",
              }} />
            </div>
            {/* Battery nub */}
            <div style={{
              width: "3px",
              height: "6px",
              backgroundColor: "#444",
              borderRadius: "0 1px 1px 0"
            }} />
          </div>
        </div>

        {/* Network status */}
        <span title="Connected to 21st.dev Hypernet" style={{ fontSize: "12px" }}>
          🌐
        </span>

        {/* Date + Clock */}
        <div style={{ textAlign: "right", lineHeight: 1 }}>
          <div style={{ fontSize: "10px", color: "#444" }}>{date}</div>
          <div style={{ fontSize: "12px", minWidth: "48px" }}>{time}</div>
        </div>
      </div>
    </div>
  );
};

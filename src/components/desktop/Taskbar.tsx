import React, { useState, useEffect } from "react";
import type { WindowState, WindowId } from "../../types/os";
import { retroAudio } from "../../utils/audioSystem";

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: WindowId | null;
  onToggleWindow: (id: WindowId) => void;
  onOpenWindow: (id: WindowId) => void;
  isStartOpen: boolean;
  onToggleStart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onToggleShowDesktop: () => void;
  enableCRT?: boolean;
  onToggleCRT?: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onToggleWindow,
  onOpenWindow,
  isStartOpen,
  onToggleStart,
  isMuted,
  onToggleMute,
  onToggleShowDesktop,
  enableCRT,
  onToggleCRT
}) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showCgpaTip, setShowCgpaTip] = useState(false);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(80);

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
      onClick={(e) => {
        // Prevent click bubbling to Desktop which would immediately close start menu
        e.stopPropagation();
      }}
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
        backgroundColor: "#c0c0c0",
        userSelect: "none"
      }}
    >
      {/* Left: Start button + Quick Launch + Window tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", overflow: "hidden", flex: 1 }}>
        {/* Start Button */}
        <button
          type="button"
          className={`bevel-button ${isStartOpen ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            retroAudio.playClick(1.15);
            onToggleStart();
          }}
          style={{
            height: "26px",
            padding: "0 8px",
            fontFamily: "var(--font-silkscreen)",
            fontSize: "11px",
            fontWeight: isStartOpen ? 700 : 400,
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
            flexShrink: 0
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
            margin: "0 2px",
            flexShrink: 0
          }}
        />

        {/* Quick Launch Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px", flexShrink: 0 }}>
          <button
            type="button"
            className="bevel-button"
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.playClick(1.1);
              onToggleShowDesktop();
            }}
            title="Show Desktop (Minimize all)"
            style={{ width: "24px", height: "24px", padding: 0, fontSize: "13px" }}
          >
            🖥️
          </button>
          <button
            type="button"
            className="bevel-button"
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.playClick(1.1);
              onOpenWindow("projects");
            }}
            title="Projects Explorer"
            style={{ width: "24px", height: "24px", padding: 0, fontSize: "13px" }}
          >
            📁
          </button>
          <button
            type="button"
            className="bevel-button"
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.playClick(1.1);
              onOpenWindow("messenger");
            }}
            title="MSN Messenger (AI Chat)"
            style={{ width: "24px", height: "24px", padding: 0, fontSize: "13px" }}
          >
            💬
          </button>
          <button
            type="button"
            className="bevel-button"
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.playClick(1.1);
              onOpenWindow("terminal");
            }}
            title="Command Prompt"
            style={{ width: "24px", height: "24px", padding: 0, fontSize: "13px" }}
          >
            📟
          </button>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: "2px",
            height: "22px",
            borderLeft: "1px solid #808080",
            borderRight: "1px solid #fff",
            margin: "0 2px",
            flexShrink: 0
          }}
        />

        {/* Open Windows Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            overflowX: "auto",
            flex: 1
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWindow(win.id);
                  }}
                  style={{
                    height: "24px",
                    maxWidth: "160px",
                    minWidth: "70px",
                    padding: "0 6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: isActive ? 700 : 400,
                    cursor: "pointer",
                    backgroundColor: isActive ? "#dcdcdc" : "#c0c0c0"
                  }}
                  title={win.title}
                >
                  <span style={{ fontSize: "13px" }}>{win.icon}</span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontFamily: "var(--font-pixel)",
                      fontSize: "12px"
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
          padding: "0 6px",
          backgroundColor: "#c0c0c0",
          fontFamily: "var(--font-pixel)",
          fontSize: "13px",
          flexShrink: 0,
          position: "relative"
        }}
      >
        {/* Volume Popup */}
        {showVolumePopup && (
          <div
            className="bevel-raised"
            style={{
              position: "absolute",
              bottom: "28px",
              right: "80px",
              width: "120px",
              padding: "8px",
              backgroundColor: "#c0c0c0",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              zIndex: 99999
            }}
          >
            <div style={{ fontSize: "10px", fontWeight: "bold", textAlign: "center" }}>Volume: {volumeLevel}%</div>
            <input
              type="range"
              min="0"
              max="100"
              value={volumeLevel}
              onChange={(e) => {
                const val = Number(e.target.value);
                setVolumeLevel(val);
                if (val === 0 && !isMuted) onToggleMute();
                if (val > 0 && isMuted) onToggleMute();
                retroAudio.playClick(val / 80);
              }}
              style={{ width: "100%", cursor: "pointer" }}
            />
            <button
              type="button"
              className="bevel-button"
              onClick={onToggleMute}
              style={{ fontSize: "10px", padding: "2px 4px" }}
            >
              {isMuted ? "Unmute" : "Mute Sound"}
            </button>
          </div>
        )}

        {/* Audio Mute Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowVolumePopup(!showVolumePopup);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            padding: 0
          }}
          title={isMuted ? "Audio Muted (Click for volume)" : "Audio Enabled (Click for volume)"}
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
          {showCgpaTip && (
            <div
              style={{
                position: "absolute",
                bottom: "28px",
                right: 0,
                backgroundColor: "#fffce6",
                border: "1px solid #7a6000",
                padding: "3px 6px",
                fontFamily: "var(--font-pixel)",
                fontSize: "11px",
                whiteSpace: "nowrap",
                boxShadow: "2px 2px 0 #7a6000",
                color: "#1a1a1a",
                zIndex: 99999
              }}
            >
              CGPA: 8.7 / 10.0 ⚡ (87% charged @ BMSIT)
            </div>
          )}
          {/* Battery body */}
          <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            <div
              style={{
                width: "28px",
                height: "12px",
                border: "1.5px solid #444",
                borderRadius: "2px",
                padding: "1.5px",
                backgroundColor: "#c0c0c0",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${cgpaPercent}%`,
                  height: "100%",
                  backgroundColor: cgpaPercent > 70 ? "#39ff14" : "#ffe500",
                  borderRadius: "1px"
                }}
              />
            </div>
            <div
              style={{
                width: "3px",
                height: "6px",
                backgroundColor: "#444",
                borderRadius: "0 1px 1px 0"
              }}
            />
          </div>
        </div>

        {/* Network status */}
        <span title="Connected to 21st.dev Hypernet" style={{ fontSize: "12px", cursor: "help" }}>
          🌐
        </span>

        {/* CRT Scanline Toggle */}
        {onToggleCRT && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.playClick(1.0);
              onToggleCRT();
            }}
            style={{
              background: enableCRT ? "#39ff1425" : "transparent",
              border: enableCRT ? "1px solid #2e7d32" : "1px solid #808080",
              cursor: "pointer",
              fontSize: "10px",
              padding: "1px 5px",
              fontFamily: "var(--font-pixel)",
              color: enableCRT ? "#1b5e20" : "#555",
              fontWeight: enableCRT ? "bold" : "normal"
            }}
            title={enableCRT ? "CRT Scanlines: ON (Click to turn OFF)" : "CRT Scanlines: OFF (Click to turn ON)"}
          >
            📺 CRT {enableCRT ? "ON" : "OFF"}
          </button>
        )}

        {/* Date + Clock */}
        <div style={{ textAlign: "right", lineHeight: 1, cursor: "default" }}>
          <div style={{ fontSize: "10px", color: "#444" }}>{date}</div>
          <div style={{ fontSize: "12px", minWidth: "46px" }}>{time}</div>
        </div>

        {/* Classic "Show Desktop" corner bar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            retroAudio.playClick(1.2);
            onToggleShowDesktop();
          }}
          title="Show Desktop"
          style={{
            width: "6px",
            height: "22px",
            borderLeft: "1px solid #808080",
            backgroundColor: "#dfdfdf",
            cursor: "pointer",
            marginLeft: "2px"
          }}
        />
      </div>
    </div>
  );
};

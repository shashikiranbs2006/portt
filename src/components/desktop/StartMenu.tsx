import React from "react";
import type { WindowId, WallpaperTheme } from "../../types/os";
import { retroAudio } from "../../utils/audioSystem";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
  currentTheme: WallpaperTheme;
  onSelectTheme: (theme: WallpaperTheme) => void;
  onShutdown: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenWindow,
  currentTheme,
  onSelectTheme,
  onShutdown
}) => {
  if (!isOpen) return null;

  const handleLaunch = (id: WindowId) => {
    retroAudio.playClick(1.1);
    onOpenWindow(id);
    onClose();
  };

  return (
    <>
      {/* Backdrop click to close */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99990
        }}
        onClick={onClose}
      />

      {/* Start Menu Box */}
      <div
        className="bevel-raised"
        style={{
          position: "fixed",
          bottom: "34px",
          left: "2px",
          width: "250px",
          display: "flex",
          zIndex: 99995,
          backgroundColor: "#c0c0c0"
        }}
      >
        {/* Left vertical banner */}
        <div
          style={{
            width: "32px",
            background: "linear-gradient(180deg, #000080 0%, #1084d0 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "12px"
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "var(--font-silkscreen)",
              fontSize: "14px",
              letterSpacing: "2px",
              color: "#ffffff",
              textShadow: "1px 1px 0px #000"
            }}
          >
            SHASHI 2000
          </span>
        </div>

        {/* Menu Items */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "4px 2px"
          }}
        >
          {/* Programs */}
          <div
            className="start-menu-item"
            onClick={() => handleLaunch("about")}
          >
            <span style={{ fontSize: "18px" }}>📝</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>Meet The Artist</span>
              <span style={{ fontSize: "11px", color: "#555" }}>Bio, Lore & Bags</span>
            </div>
          </div>

          <div
            className="start-menu-item"
            onClick={() => handleLaunch("projects")}
          >
            <span style={{ fontSize: "18px" }}>📁</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>Projects Explorer</span>
              <span style={{ fontSize: "11px", color: "#555" }}>Code & Apps</span>
            </div>
          </div>

          <div
            className="start-menu-item"
            onClick={() => handleLaunch("idbadge")}
          >
            <span style={{ fontSize: "18px" }}>🪪</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>Staff ID Badge</span>
              <span style={{ fontSize: "11px", color: "#555" }}>3D Tilt & Flip Pass</span>
            </div>
          </div>

          <div
            className="start-menu-item"
            onClick={() => handleLaunch("paint")}
          >
            <span style={{ fontSize: "18px" }}>🎨</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>MS Paint Canvas</span>
              <span style={{ fontSize: "11px", color: "#555" }}>Draw & Doodle</span>
            </div>
          </div>

          <div
            className="start-menu-item"
            onClick={() => handleLaunch("phone")}
          >
            <span style={{ fontSize: "18px" }}>📱</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>Motorola Razr</span>
              <span style={{ fontSize: "11px", color: "#555" }}>SMS Contact Widget</span>
            </div>
          </div>

          <div
            className="start-menu-item"
            onClick={() => handleLaunch("terminal")}
          >
            <span style={{ fontSize: "18px" }}>📟</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>MS-DOS Terminal</span>
              <span style={{ fontSize: "11px", color: "#555" }}>CLI & Tech Specs</span>
            </div>
          </div>

          <div
            className="start-menu-item"
            onClick={() => handleLaunch("music")}
          >
            <span style={{ fontSize: "18px" }}>💿</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>CD-ROM Player</span>
              <span style={{ fontSize: "11px", color: "#555" }}>Kanye — Can't Tell Me Nothing</span>
            </div>
          </div>

          <div
            className="start-menu-item"
            onClick={() => handleLaunch("messenger")}
          >
            <span style={{ fontSize: "18px" }}>💬</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>MSN Messenger</span>
              <span style={{ fontSize: "11px", color: "#555" }}>Chat with AI-Shashi</span>
            </div>
          </div>

          <div
            className="start-menu-item"
            onClick={() => handleLaunch("minesweeper")}
          >
            <span style={{ fontSize: "18px" }}>💣</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>Minesweeper</span>
              <span style={{ fontSize: "11px", color: "#555" }}>Easter Egg — Games</span>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #808080", borderBottom: "1px solid #fff", margin: "4px 2px" }} />


          {/* Wallpaper Switcher */}
          <div style={{ padding: "4px 8px", fontSize: "11px", fontFamily: "var(--font-pixel)", color: "#333" }}>
            <span>WALLPAPER THEME:</span>
            <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
              {(["bliss", "cyber", "sunset", "matrix"] as WallpaperTheme[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`bevel-button ${currentTheme === t ? "active" : ""}`}
                  style={{
                    fontSize: "11px",
                    padding: "2px 5px",
                    textTransform: "uppercase"
                  }}
                  onClick={() => {
                    retroAudio.playClick(1.0);
                    onSelectTheme(t);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #808080", borderBottom: "1px solid #fff", margin: "4px 2px" }} />

          {/* Shut down */}
          <div
            className="start-menu-item"
            style={{ color: "#800000" }}
            onClick={() => {
              retroAudio.playErrorChord();
              onClose();
              onShutdown();
            }}
          >
            <span style={{ fontSize: "18px" }}>🚪</span>
            <span style={{ fontWeight: 700 }}>Shut Down...</span>
          </div>
        </div>
      </div>

      <style>{`
        .start-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 8px;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 13px;
        }
        .start-menu-item:hover {
          background-color: #000080;
          color: #ffffff !important;
        }
        .start-menu-item:hover .text-gray-600 {
          color: #dfdfdf !important;
        }
      `}</style>
    </>
  );
};

import React, { useEffect, useRef } from "react";
import type { WindowId, WallpaperTheme } from "../../types/os";
import { retroAudio } from "../../utils/audioSystem";

interface Props {
  x: number;
  y: number;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
  currentTheme: WallpaperTheme;
  onSelectTheme: (theme: WallpaperTheme) => void;
  onToggleCRT: () => void;
}

export const DesktopContextMenu: React.FC<Props> = ({
  x,
  y,
  onClose,
  onOpenWindow,
  currentTheme,
  onSelectTheme,
  onToggleCRT
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onClose]);

  // Clamp to viewport
  const menuWidth = 220;
  const menuHeight = 360;
  const left = Math.min(x, window.innerWidth - menuWidth - 8);
  const top = Math.min(y, window.innerHeight - menuHeight - 8);

  const divider = (
    <div
      style={{
        height: "1px",
        backgroundColor: "#808080",
        margin: "2px 0",
        borderTop: "1px solid #fff"
      }}
    />
  );

  const item = (
    label: string,
    icon: string,
    onClick: () => void,
    disabled = false
  ) => (
    <div
      role="menuitem"
      onClick={
        disabled
          ? undefined
          : () => {
              retroAudio.playClick(1.05);
              onClick();
              onClose();
            }
      }
      style={{
        padding: "4px 18px 4px 28px",
        fontSize: "12px",
        fontFamily: "var(--font-sans)",
        cursor: disabled ? "default" : "pointer",
        color: disabled ? "#888" : "#000",
        position: "relative",
        userSelect: "none",
        display: "flex",
        alignItems: "center"
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.background = "#000080";
          (e.currentTarget as HTMLElement).style.color = "#fff";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = disabled ? "#888" : "#000";
      }}
    >
      <span style={{ position: "absolute", left: "6px", fontSize: "14px" }}>{icon}</span>
      {label}
    </div>
  );

  const themes: WallpaperTheme[] = ["bliss", "cyber", "sunset", "matrix", "riso"];

  return (
    <div
      ref={ref}
      className="bevel-raised"
      style={{
        position: "fixed",
        left,
        top,
        zIndex: 999999,
        width: `${menuWidth}px`,
        backgroundColor: "#c0c0c0",
        boxShadow: "3px 3px 10px rgba(0,0,0,0.5), inset 1px 1px 0 #fff, inset -1px -1px 0 #808080",
        padding: "3px 0",
        fontSize: "12px"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Quick Launchers */}
      {item("Open Meet The Artist", "📝", () => onOpenWindow("about"))}
      {item("Open Projects Archive", "📁", () => onOpenWindow("projects"))}
      {item("Open Terminal (C:\\SHASHI)", "📟", () => onOpenWindow("terminal"))}
      {item("Open Motorola RAZR", "📱", () => onOpenWindow("phone"))}
      {item("Open MS Paint Studio", "🎨", () => onOpenWindow("paint"))}
      {item("Open MSN Messenger", "💬", () => onOpenWindow("messenger"))}

      {divider}

      {/* Wallpaper Themes */}
      <div
        style={{
          padding: "3px 8px 1px",
          fontSize: "10px",
          color: "#444",
          fontFamily: "var(--font-silkscreen)",
          fontWeight: "bold"
        }}
      >
        WALLPAPER THEME:
      </div>
      {themes.map((t) =>
        item(
          `${t === currentTheme ? "✓ " : "  "}${t.charAt(0).toUpperCase() + t.slice(1)}`,
          t === "bliss" ? "🌄" : t === "cyber" ? "🌐" : t === "sunset" ? "🌇" : t === "matrix" ? "💚" : "🖨️",
          () => onSelectTheme(t)
        )
      )}

      {divider}

      {item("Toggle CRT Scanlines", "📺", onToggleCRT)}
      {item("View Mitarbeiterkarte (3D ID)", "🪪", () => onOpenWindow("idbadge"))}
    </div>
  );
};

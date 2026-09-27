import React, { useEffect, useRef } from "react";
import type { WindowId, WallpaperTheme } from "../../types/os";

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
  x, y, onClose, onOpenWindow, currentTheme, onSelectTheme, onToggleCRT
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Clamp to viewport
  const menuWidth = 200;
  const menuHeight = 300;
  const left = Math.min(x, window.innerWidth - menuWidth - 8);
  const top = Math.min(y, window.innerHeight - menuHeight - 8);

  const divider = (
    <div style={{
      height: "1px",
      backgroundColor: "#808080",
      margin: "2px 0",
      borderTop: "1px solid #fff"
    }} />
  );

  const item = (
    label: string,
    icon: string,
    onClick: () => void,
    disabled = false
  ) => (
    <div
      role="menuitem"
      onClick={disabled ? undefined : () => { onClick(); onClose(); }}
      style={{
        padding: "3px 20px 3px 28px",
        fontSize: "13px",
        fontFamily: "var(--font-body)",
        cursor: disabled ? "default" : "pointer",
        color: disabled ? "#888" : "#000",
        position: "relative",
        userSelect: "none"
      }}
      onMouseEnter={e => {
        if (!disabled) (e.currentTarget as HTMLElement).style.background = "#000080";
        if (!disabled) (e.currentTarget as HTMLElement).style.color = "#fff";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = disabled ? "#888" : "#000";
      }}
    >
      <span style={{ position: "absolute", left: "6px" }}>{icon}</span>
      {label}
    </div>
  );

  const themes: WallpaperTheme[] = ["bliss", "cyber", "sunset", "matrix"];

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
        boxShadow: "2px 2px 4px rgba(0,0,0,0.4), inset 1px 1px 0 #fff, inset -1px -1px 0 #808080",
        padding: "2px 0",
        fontSize: "13px"
      }}
      onClick={e => e.stopPropagation()}
    >
      {item("View", "👀", () => {}, true)}
      {item("Arrange Icons", "📐", () => {}, true)}
      {divider}
      {item("New Sticky Note", "📌", () => {})}
      {divider}

      {/* Wallpaper submenu label */}
      <div style={{ padding: "3px 6px 1px", fontSize: "11px", color: "#666", fontFamily: "var(--font-pixel)" }}>
        WALLPAPER
      </div>
      {themes.map(t => item(
        `${t === currentTheme ? "✓ " : "  "}${t.charAt(0).toUpperCase() + t.slice(1)}`,
        t === "bliss" ? "🌄" : t === "cyber" ? "🌐" : t === "sunset" ? "🌇" : "💚",
        () => onSelectTheme(t)
      ))}
      {divider}
      {item("Toggle CRT Filter", "📺", onToggleCRT)}
      {divider}
      {item("Properties", "⚙️", () => onOpenWindow("about"))}
    </div>
  );
};

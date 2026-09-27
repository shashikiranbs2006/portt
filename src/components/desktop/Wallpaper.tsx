import React from "react";
import type { WallpaperTheme } from "../../types/os";

interface WallpaperProps {
  theme: WallpaperTheme;
}

export const Wallpaper: React.FC<WallpaperProps> = ({ theme }) => {
  // ─── CYBER: neon grid perspective ────────────────────────────────────────
  if (theme === "cyber") {
    return (
      <div style={{
        position: "absolute", inset: 0,
        pointerEvents: "none", overflow: "hidden",
        backgroundColor: "#090b10"
      }}>
        {/* Perspective grid floor */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.28,
          backgroundImage:
            "linear-gradient(to right, rgba(0,255,255,0.22) 1px, transparent 1px), " +
            "linear-gradient(to bottom, rgba(255,0,128,0.22) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: "perspective(500px) rotateX(30deg) translateY(-50px) scale(1.4)"
        }} />
        {/* Horizon glow */}
        <div style={{
          position: "absolute", bottom: "40px", left: 0, right: 0, height: "160px",
          background: "linear-gradient(to top, rgba(255,0,127,0.22), transparent)"
        }} />
        {/* Top scanlines */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
          pointerEvents: "none"
        }} />
        {/* Corner vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)"
        }} />
      </div>
    );
  }

  // ─── SUNSET: synthwave gradient + sun disc ────────────────────────────────
  if (theme === "sunset") {
    return (
      <div style={{
        position: "absolute", inset: 0,
        pointerEvents: "none", overflow: "hidden",
        background: "linear-gradient(180deg, #2b1055 0%, #75225b 45%, #b83b5e 70%, #f9a825 100%)"
      }}>
        {/* Sun disc */}
        <div style={{
          position: "absolute",
          bottom: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "linear-gradient(to top, #f9d423, #ff4e50)",
          opacity: 0.82,
          filter: "blur(1px)"
        }} />
        {/* Horizontal sun stripe bands */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            position: "absolute",
            bottom: `${12 + i * 22}px`,
            left: "50%",
            transform: "translateX(-50%)",
            width: `${160 + i * 60}px`,
            height: "6px",
            backgroundColor: "#2b1055",
            opacity: 0.7
          }} />
        ))}
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.14,
          backgroundImage:
            "linear-gradient(rgba(255,200,100,0.4) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,200,100,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
      </div>
    );
  }

  // ─── MATRIX: binary rain + green grid ────────────────────────────────────
  if (theme === "matrix") {
    return (
      <div style={{
        position: "absolute", inset: 0,
        pointerEvents: "none", overflow: "hidden",
        backgroundColor: "#050e05"
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.2,
          backgroundImage:
            "linear-gradient(rgba(0,255,70,0.22) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(0,255,70,0.22) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
        {/* glow from top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "200px",
          background: "linear-gradient(to bottom, rgba(0,255,70,0.1), transparent)"
        }} />
        {/* scanlines */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)"
        }} />
      </div>
    );
  }

  // ─── DEFAULT (bliss): XP photo + riso-print grain overlay ────────────────
  return (
    <div style={{
      position: "absolute", inset: 0,
      overflow: "hidden", pointerEvents: "none"
    }}>
      {/* XP Bliss photo */}
      <img
        src="/bliss.jpg"
        alt="Windows XP Bliss Wallpaper"
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center center",
          display: "block"
        }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
          (el.parentElement as HTMLElement).style.background =
            "linear-gradient(180deg, #1b73e8 0%, #4facfe 35%, #70c4ff 60%, #a0e0ff 75%, #5cb85c 75%, #3d9142 100%)";
        }}
      />
      {/* Subtle riso-print grain overlay — the key aesthetic touch */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        opacity: 0.5,
        mixBlendMode: "multiply",
        pointerEvents: "none"
      }} />
    </div>
  );
};

import React from "react";
import type { WallpaperTheme } from "../../types/os";

interface WallpaperProps {
  theme: WallpaperTheme;
}

export const Wallpaper: React.FC<WallpaperProps> = ({ theme }) => {
  if (theme === "cyber") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#090b10]">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 128, 0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            perspective: "500px",
            transform: "rotateX(30deg) translateY(-50px) scale(1.4)"
          }}
        />
        <div className="absolute bottom-10 left-0 right-0 h-40 bg-gradient-to-t from-[#ff007f33] to-transparent" />
      </div>
    );
  }

  if (theme === "sunset") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#2b1055] via-[#75225b] to-[#b83b5e]">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-t from-[#f9d423] to-[#ff4e50] opacity-80 blur-sm" />
      </div>
    );
  }

  if (theme === "matrix") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#050e05]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 70, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 70, 0.2) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>
    );
  }

  // Default: Real Windows XP Bliss photo
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none"
      }}
    >
      <img
        src="/bliss.jpg"
        alt="Windows XP Bliss Wallpaper"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          display: "block"
        }}
        onError={(e) => {
          // Fallback to CSS gradient if bliss.jpg isn't there yet
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
          (el.parentElement as HTMLElement).style.background =
            "linear-gradient(180deg, #1b73e8 0%, #4facfe 35%, #70c4ff 60%, #a0e0ff 75%)";
        }}
      />
    </div>
  );
};

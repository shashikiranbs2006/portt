import React, { useState } from "react";
import type { WindowId, WallpaperTheme } from "../../types/os";
import { retroAudio } from "../../utils/audioSystem";
import { portfolioData } from "../../data/portfolioData";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
  currentTheme: WallpaperTheme;
  onSelectTheme: (theme: WallpaperTheme) => void;
  onShutdown: () => void;
}

interface MenuItem {
  id: WindowId | "resume" | "github" | "linkedin";
  title: string;
  subtitle: string;
  icon: string;
  action?: () => void;
  keywords: string[];
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenWindow,
  currentTheme,
  onSelectTheme,
  onShutdown
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const handleLaunch = (id: WindowId) => {
    retroAudio.playClick(1.1);
    onOpenWindow(id);
    onClose();
  };

  const menuItems: MenuItem[] = [
    {
      id: "about",
      title: "Meet The Artist",
      subtitle: "Bio, Lore & Bags",
      icon: "📝",
      action: () => handleLaunch("about"),
      keywords: ["about", "bio", "artist", "education", "bmsit", "skills", "story"]
    },
    {
      id: "projects",
      title: "Projects Explorer",
      subtitle: "Relay, EduRAG, Prompt Compiler",
      icon: "📁",
      action: () => handleLaunch("projects"),
      keywords: ["projects", "code", "relay", "edurag", "yoru", "prompt", "fraud", "fitphile"]
    },
    {
      id: "messenger",
      title: "MSN Messenger (Groq AI)",
      subtitle: "Live chat with AI-Shashi",
      icon: "💬",
      action: () => handleLaunch("messenger"),
      keywords: ["messenger", "msn", "chat", "groq", "ai", "llm", "llama", "hire"]
    },
    {
      id: "terminal",
      title: "MS-DOS Terminal",
      subtitle: "C:\\SHASHI CLI & Tech Specs",
      icon: "📟",
      action: () => handleLaunch("terminal"),
      keywords: ["terminal", "cmd", "dos", "cli", "bash", "ssh", "curl", "neofetch"]
    },
    {
      id: "phone",
      title: "Motorola Razr",
      subtitle: "SMS & Instant Contact",
      icon: "📱",
      action: () => handleLaunch("phone"),
      keywords: ["phone", "razr", "sms", "contact", "call", "email", "dialer"]
    },
    {
      id: "paint",
      title: "MS Paint Canvas",
      subtitle: "Draw & Stamp Riso Art",
      icon: "🎨",
      action: () => handleLaunch("paint"),
      keywords: ["paint", "art", "draw", "canvas", "riso", "sketch"]
    },
    {
      id: "idbadge",
      title: "Staff ID Badge",
      subtitle: "3D Hologram Flip Pass",
      icon: "🪪",
      action: () => handleLaunch("idbadge"),
      keywords: ["badge", "pass", "id", "3d", "card", "staff", "photo"]
    },
    {
      id: "music",
      title: "CD-ROM Player",
      subtitle: "Kanye — Can't Tell Me Nothing",
      icon: "💿",
      action: () => handleLaunch("music"),
      keywords: ["music", "cd", "player", "audio", "song", "playlist", "sound"]
    },
    {
      id: "minesweeper",
      title: "Minesweeper",
      subtitle: "Easter Egg — Retro Game",
      icon: "💣",
      action: () => handleLaunch("minesweeper"),
      keywords: ["minesweeper", "game", "bomb", "play", "easter egg"]
    },
    {
      id: "resume",
      title: "Download Resume",
      subtitle: "Verified 1-Page PDF",
      icon: "📄",
      action: () => {
        retroAudio.playClick(1.2);
        window.open(portfolioData.contact.resumeUrl, "_blank");
        onClose();
      },
      keywords: ["resume", "cv", "pdf", "download", "hire"]
    }
  ];

  const filteredItems = menuItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.includes(q))
    );
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredItems.length > 0 && filteredItems[0].action) {
      filteredItems[0].action();
    }
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
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          bottom: "34px",
          left: "2px",
          width: "285px",
          display: "flex",
          zIndex: 99995,
          backgroundColor: "#c0c0c0",
          boxShadow: "4px 4px 14px rgba(0,0,0,0.5)",
          maxHeight: "calc(100vh - 44px)",
          flexDirection: "column",
          userSelect: "none"
        }}
      >
        {/* User Profile Header banner */}
        <div
          style={{
            background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
            color: "#ffffff",
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderBottom: "1px solid #ffffff"
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #ffe500",
              flexShrink: 0
            }}
          >
            <img
              src="/avatar.jpg"
              alt="Shashikiran"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-silkscreen)", fontSize: "12px", fontWeight: "bold" }}>
              SHASHIKIRAN B S
            </div>
            <div style={{ fontSize: "11px", color: "#dbeafe" }}>
              CSE (AI/ML) · BMSIT 8.7 CGPA
            </div>
          </div>
        </div>

        {/* Quick Search / Run input */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            padding: "4px 6px",
            backgroundColor: "#dfdfdf",
            borderBottom: "1px solid #808080",
            display: "flex",
            gap: "4px",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: "12px" }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs or run..."
            autoFocus
            style={{
              flex: 1,
              padding: "3px 6px",
              fontSize: "11px",
              border: "1px solid #808080",
              outline: "none",
              backgroundColor: "#fff",
              fontFamily: "var(--font-sans)"
            }}
          />
          {searchQuery && (
            <button
              type="button"
              className="bevel-button"
              onClick={() => setSearchQuery("")}
              style={{ padding: "1px 5px", fontSize: "10px" }}
            >
              ✕
            </button>
          )}
        </form>

        {/* Main Body with vertical banner on left */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left vertical banner */}
          <div
            style={{
              width: "28px",
              background: "linear-gradient(180deg, #000080 0%, #1084d0 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: "10px"
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontFamily: "var(--font-silkscreen)",
                fontSize: "12px",
                letterSpacing: "2px",
                color: "#ffffff",
                textShadow: "1px 1px 0px #000"
              }}
            >
              SHASHI★2000
            </span>
          </div>

          {/* Menu Items List */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "4px 2px",
              overflowY: "auto",
              maxHeight: "360px"
            }}
          >
            {filteredItems.length === 0 ? (
              <div style={{ padding: "16px", textAlign: "center", fontSize: "11px", color: "#666" }}>
                No program matching &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="start-menu-item"
                  onClick={item.action}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <span style={{ fontWeight: 700, fontSize: "12px" }}>{item.title}</span>
                    <span style={{ fontSize: "10px", color: "#555", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              ))
            )}

            <hr style={{ border: "none", borderTop: "1px solid #808080", borderBottom: "1px solid #fff", margin: "4px 2px" }} />

            {/* Quick Links */}
            <div style={{ display: "flex", gap: "2px", padding: "0 4px", justifyContent: "space-between" }}>
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noreferrer"
                className="bevel-button"
                style={{ fontSize: "10px", padding: "2px 6px", textDecoration: "none", color: "#000" }}
                onClick={() => {
                  retroAudio.playClick(1.0);
                  onClose();
                }}
              >
                🐙 GitHub
              </a>
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="bevel-button"
                style={{ fontSize: "10px", padding: "2px 6px", textDecoration: "none", color: "#000" }}
                onClick={() => {
                  retroAudio.playClick(1.0);
                  onClose();
                }}
              >
                💼 LinkedIn
              </a>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="bevel-button"
                style={{ fontSize: "10px", padding: "2px 6px", textDecoration: "none", color: "#000" }}
                onClick={() => {
                  retroAudio.playClick(1.0);
                  onClose();
                }}
              >
                ✉️ Email
              </a>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #808080", borderBottom: "1px solid #fff", margin: "4px 2px" }} />

            {/* Wallpaper Switcher */}
            <div style={{ padding: "2px 6px", fontSize: "10px", fontFamily: "var(--font-pixel)", color: "#333" }}>
              <span>DESKTOP THEME:</span>
              <div style={{ display: "flex", gap: "3px", marginTop: "3px", flexWrap: "wrap" }}>
                {(["bliss", "cyber", "sunset", "matrix", "riso"] as WallpaperTheme[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`bevel-button ${currentTheme === t ? "active" : ""}`}
                    style={{
                      fontSize: "9px",
                      padding: "1px 4px",
                      textTransform: "uppercase",
                      backgroundColor: currentTheme === t ? "#dcdcdc" : "#c0c0c0"
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
              <span style={{ fontWeight: 700, fontSize: "12px" }}>Shut Down...</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .start-menu-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 6px;
          cursor: pointer;
          font-family: var(--font-body);
        }
        .start-menu-item:hover {
          background-color: #000080;
          color: #ffffff !important;
        }
        .start-menu-item:hover span {
          color: #ffffff !important;
        }
      `}</style>
    </>
  );
};

import React, { useState } from "react";
import type { WindowState, WindowId, WallpaperTheme } from "../../types/os";
import { Wallpaper } from "./Wallpaper";
import { DesktopIcon } from "./DesktopIcon";
import { RetroWindow } from "./RetroWindow";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { DraggableStickers } from "./DraggableStickers";

// Windows
import { AboutWindow } from "../windows/AboutWindow";
import { ProjectsWindow } from "../windows/ProjectsWindow";
import { IDBadgeWindow } from "../windows/IDBadgeWindow";
import { PaintWindow } from "../windows/PaintWindow";
import { ContactPhoneWindow } from "../windows/ContactPhoneWindow";
import { TerminalWindow } from "../windows/TerminalWindow";
import { MusicPlayerWidget } from "../windows/MusicPlayerWidget";
import { SystemWarningModal } from "../windows/SystemWarningModal";
import { Minesweeper } from "../windows/Minesweeper";
import { MessengerWindow } from "../windows/MessengerWindow";

// Effects
import { BootSequence } from "../effects/BootSequence";
import { Clippy } from "../effects/Clippy";
import { BSOD } from "../effects/BSOD";
import { StickyNotesDesktop } from "../effects/StickyNotes";
import { ErrorBoundary } from "../effects/ErrorBoundary";

// Context menu
import { DesktopContextMenu } from "./DesktopContextMenu";
import { retroAudio } from "../../utils/audioSystem";

const getInitialWindows = (): WindowState[] => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth <= 1100;
  const W = typeof window !== "undefined" ? window.innerWidth : 1200;
  const H = typeof window !== "undefined" ? window.innerHeight : 800;

  return [
    {
      id: "about",
      title: "Meet The Artist — Notepad",
      icon: "📝",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 20,
      position: { x: isMobile ? 8 : isTablet ? 30 : 100, y: isMobile ? 8 : 18 },
      size: {
        width: isMobile ? "96vw" : isTablet ? 680 : 720,
        height: isMobile ? Math.min(520, H - 70) : 560
      }
    },
    {
      id: "idbadge",
      title: "Mitarbeiterkarte [3D ID Pass]",
      icon: "🪪",
      isOpen: !isMobile && W > 1100,
      isMinimized: false,
      isMaximized: false,
      zIndex: 25,
      position: { x: isMobile ? 12 : W > 1200 ? 840 : 40, y: isMobile ? 12 : 20 },
      size: { width: isMobile ? 320 : 400, height: isMobile ? Math.min(540, H - 80) : 600 }
    },
    {
      id: "projects",
      title: "C:\\Portfolio\\Projects",
      icon: "📁",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: isMobile ? 10 : 70, y: isMobile ? 20 : 60 },
      size: { width: isMobile ? "95vw" : 720, height: isMobile ? Math.min(500, H - 70) : 500 }
    },
    {
      id: "paint",
      title: "untitled - Paint",
      icon: "🎨",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: isMobile ? 10 : 140, y: isMobile ? 20 : 40 },
      size: { width: isMobile ? "95vw" : 740, height: isMobile ? Math.min(480, H - 70) : 520 }
    },
    {
      id: "phone",
      title: "Motorola Razr — Quick SMS",
      icon: "📱",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: isMobile ? 8 : 320, y: isMobile ? 16 : 30 },
      size: { width: isMobile ? "96vw" : 520, height: isMobile ? Math.min(480, H - 70) : 480 }
    },
    {
      id: "terminal",
      title: "Command Prompt (C:\\SHASHI)",
      icon: "📟",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: isMobile ? 10 : 180, y: isMobile ? 30 : 120 },
      size: { width: isMobile ? "95vw" : 620, height: isMobile ? Math.min(420, H - 70) : 400 }
    },
    {
      id: "music",
      title: "CD Player — Can't Tell Me Nothing",
      icon: "💿",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: isMobile ? 10 : 50, y: isMobile ? 50 : 380 },
      size: { width: isMobile ? "95vw" : 420, height: 280 }
    },
    {
      id: "minesweeper",
      title: "Minesweeper — Shashi Edition",
      icon: "💣",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: isMobile ? 20 : 300, y: isMobile ? 40 : 80 },
      size: { width: isMobile ? 290 : 280, height: 380 }
    },
    {
      id: "messenger",
      title: "MSN Messenger — shashikiran_bs",
      icon: "💬",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: isMobile ? 10 : 200, y: isMobile ? 30 : 50 },
      size: { width: isMobile ? "95vw" : 400, height: isMobile ? Math.min(480, H - 70) : 520 }
    }
  ];
};

export const Desktop: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>(getInitialWindows);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>("about");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<WallpaperTheme>("bliss");
  const [isMuted, setIsMuted] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [showBSOD, setShowBSOD] = useState(false);
  const [enableCRT, setEnableCRT] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Highest z-index tracking
  const getNextZIndex = () => {
    const maxZ = Math.max(...windows.map((w) => w.zIndex), 20);
    return maxZ + 1;
  };

  const focusWindow = (id: WindowId) => {
    setActiveWindowId(id);
    retroAudio.playClick(1.0);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, zIndex: getNextZIndex(), isMinimized: false }
          : w
      )
    );
  };

  const openWindow = (id: WindowId) => {
    setActiveWindowId(id);
    retroAudio.playWindowSwoosh(true);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: true,
              isMinimized: false,
              zIndex: getNextZIndex()
            }
          : w
      )
    );
  };

  const closeWindow = (id: WindowId) => {
    retroAudio.playWindowSwoosh(false);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
    if (activeWindowId === id) {
      const remainingOpen = windows.filter((w) => w.isOpen && w.id !== id);
      setActiveWindowId(remainingOpen.length > 0 ? remainingOpen[0].id : null);
    }
  };

  const toggleMinimize = (id: WindowId) => {
    retroAudio.playClick(0.85);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      )
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    } else {
      setActiveWindowId(id);
    }
  };

  const toggleMaximize = (id: WindowId) => {
    retroAudio.playClick(1.2);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  };

  const handleRecycleBin = () => {
    retroAudio.playErrorChord();
    setShowBSOD(true);
  };

  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setIsStartOpen(false);
  };

  const handleDesktopClick = () => {
    setContextMenu(null);
    setIsStartOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#008080"
      }}
      onContextMenu={handleDesktopRightClick}
      onClick={handleDesktopClick}
    >
      {/* Boot Sequence */}
      <ErrorBoundary name="BootSequence">
        {!booted && (
          <BootSequence
            onComplete={() => {
              setBooted(true);
              retroAudio.playBootJingle();
            }}
          />
        )}
      </ErrorBoundary>

      {/* Background Wallpaper */}
      <Wallpaper theme={currentTheme} />

      {/* CRT Scanline overlay toggle */}
      {enableCRT && <div className="crt-overlay" />}

      {/* Floating Draggable Stickers */}
      <DraggableStickers />

      {/* Sticky Notes */}
      <ErrorBoundary name="StickyNotes">
        <StickyNotesDesktop />
      </ErrorBoundary>

      {/* Clippy Assistant */}
      <ErrorBoundary name="Clippy">
        {booted && <Clippy onOpenWindow={openWindow} />}
      </ErrorBoundary>

      {/* Desktop Icons Column */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <DesktopIcon
          id="icon-about"
          title="Meet The Artist"
          sublabel=".txt"
          icon="📝"
          defaultPosition={{ x: 18, y: 16 }}
          onOpen={() => openWindow("about")}
        />

        <DesktopIcon
          id="icon-projects"
          title="Projects"
          sublabel=".folder"
          icon="📁"
          defaultPosition={{ x: 18, y: 100 }}
          onOpen={() => openWindow("projects")}
        />

        <DesktopIcon
          id="icon-idbadge"
          title="3D ID Badge"
          sublabel=".pass"
          icon="🪪"
          defaultPosition={{ x: 18, y: 184 }}
          onOpen={() => openWindow("idbadge")}
        />

        <DesktopIcon
          id="icon-paint"
          title="MS Paint"
          sublabel=".exe"
          icon="🎨"
          defaultPosition={{ x: 18, y: 268 }}
          onOpen={() => openWindow("paint")}
        />

        <DesktopIcon
          id="icon-phone"
          title="Motorola Razr"
          sublabel="SMS"
          icon="📱"
          defaultPosition={{ x: 18, y: 352 }}
          onOpen={() => openWindow("phone")}
        />

        <DesktopIcon
          id="icon-terminal"
          title="Terminal CLI"
          sublabel=".bat"
          icon="📟"
          defaultPosition={{ x: 18, y: 436 }}
          onOpen={() => openWindow("terminal")}
        />

        <DesktopIcon
          id="icon-music"
          title="CD Player"
          sublabel=".mp3"
          icon="💿"
          defaultPosition={{ x: 18, y: 520 }}
          onOpen={() => openWindow("music")}
        />

        <DesktopIcon
          id="icon-resume"
          title="Resume"
          sublabel=".pdf"
          icon="📄"
          defaultPosition={{ x: 18, y: 604 }}
          onOpen={() => window.open("/resume.pdf", "_blank")}
        />

        <DesktopIcon
          id="icon-recycle"
          title="Recycle Bin"
          sublabel="empty"
          icon="🗑️"
          defaultPosition={{ x: 18, y: 688 }}
          onOpen={handleRecycleBin}
        />
      </div>

      {/* Top Controls Quick Pill (CRT & Wallpaper) */}
      <div
        className="bevel-raised"
        style={{
          position: "fixed",
          top: "8px",
          right: "12px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "3px 8px",
          fontSize: "11px",
          fontFamily: "var(--font-pixel)",
          backgroundColor: "#c0c0c0"
        }}
      >
        <button
          type="button"
          className={`bevel-button ${enableCRT ? "active" : ""}`}
          onClick={() => setEnableCRT(!enableCRT)}
          style={{ fontSize: "11px", padding: "1px 6px" }}
        >
          CRT: {enableCRT ? "ON" : "OFF"}
        </button>
        <span style={{ color: "#666" }}>|</span>
        <button
          type="button"
          className="bevel-button"
          onClick={() => {
            const themes: WallpaperTheme[] = ["bliss", "cyber", "sunset", "matrix", "riso"];
            const next = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
            setCurrentTheme(next);
          }}
          style={{ fontSize: "11px", padding: "1px 6px" }}
        >
          Theme: {currentTheme}
        </button>
      </div>

      {/* Active Windows Manager */}
      {windows.map((win) => (
        <RetroWindow
          key={win.id}
          window={win}
          onFocus={() => focusWindow(win.id)}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => toggleMinimize(win.id)}
          onToggleMaximize={() => toggleMaximize(win.id)}
        >
          {win.id === "about" && <AboutWindow />}
          {win.id === "projects" && <ProjectsWindow />}
          {win.id === "idbadge" && <IDBadgeWindow />}
          {win.id === "paint" && <PaintWindow />}
          {win.id === "phone" && <ContactPhoneWindow />}
          {win.id === "terminal" && <TerminalWindow />}
          {win.id === "music" && <MusicPlayerWidget />}
          {win.id === "minesweeper" && <Minesweeper />}
          {win.id === "messenger" && <MessengerWindow />}
        </RetroWindow>
      ))}

      {/* BSOD Easter Egg (replaces System Warning) */}
      <BSOD
        isVisible={showBSOD}
        onDismiss={() => setShowBSOD(false)}
      />

      {/* Legacy Warning Modal (kept for shutdown button) */}
      <SystemWarningModal
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
      />

      {/* Desktop Right-Click Context Menu */}
      {contextMenu && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onOpenWindow={openWindow}
          currentTheme={currentTheme}
          onSelectTheme={setCurrentTheme}
          onToggleCRT={() => setEnableCRT(e => !e)}
        />
      )}

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenWindow={openWindow}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        onShutdown={() => setIsWarningOpen(true)}
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onToggleWindow={(id) => {
          const target = windows.find((w) => w.id === id);
          if (target?.isMinimized) {
            focusWindow(id);
          } else if (activeWindowId === id) {
            toggleMinimize(id);
          } else {
            focusWindow(id);
          }
        }}
        isStartOpen={isStartOpen}
        onToggleStart={() => setIsStartOpen(!isStartOpen)}
        isMuted={isMuted}
        onToggleMute={() => {
          retroAudio.isMuted = !isMuted;
          setIsMuted(!isMuted);
        }}
      />
    </div>
  );
};

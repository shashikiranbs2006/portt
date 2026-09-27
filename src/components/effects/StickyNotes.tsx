import React, { useState, useEffect, useRef } from "react";
import { retroAudio } from "../../utils/audioSystem";

interface StickyNote {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
  minimized?: boolean;
  tag?: string;
}

const RISO_PALETTE = [
  { name: "Sunlight Yellow", bg: "#fff9a5", border: "#f2ea79" },
  { name: "Fluorescent Pink", bg: "#ffd1dc", border: "#f5a6b8" },
  { name: "Mint Teal", bg: "#c8f7dc", border: "#9be4ba" },
  { name: "Federal Blue", bg: "#d0e8ff", border: "#a3cfff" },
  { name: "Peach Coral", bg: "#ffe0cc", border: "#f5ba98" }
];

const getInitialNotes = (): StickyNote[] => {
  const isClient = typeof window !== "undefined";
  const W = isClient ? window.innerWidth : 1200;
  const H = isClient ? window.innerHeight : 800;
  const isMobile = W < 800;

  // On mobile, keep them minimized by default so they never block windows
  return [
    {
      id: "n1",
      text: "⚡ HIRE ME\nSummer 2027 SWE Intern\nAMTS Target ★",
      color: "#fff9a5",
      x: Math.max(12, W - 185),
      y: isMobile ? H - 120 : Math.max(20, H - 380),
      rotation: 2.5,
      minimized: isMobile,
      tag: "PRIORITY"
    },
    {
      id: "n2",
      text: "TODO:\n- Multi-tenant isolation\n- LLM routing pipeline\n- Eat ramen 🍜",
      color: "#c8f7dc",
      x: Math.max(12, W - 190),
      y: isMobile ? H - 80 : Math.max(20, H - 220),
      rotation: -2,
      minimized: isMobile,
      tag: "SPRINT"
    }
  ];
};

export const StickyNotesDesktop: React.FC = () => {
  const [notes, setNotes] = useState<StickyNote[]>(getInitialNotes);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [allHidden, setAllHidden] = useState(false);
  const dragOffset = useRef({ dx: 0, dy: 0 });

  const addNote = () => {
    retroAudio.playClick(1.2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    const colorObj = RISO_PALETTE[Math.floor(Math.random() * RISO_PALETTE.length)];
    const newNote: StickyNote = {
      id: Date.now().toString(),
      text: "New note...",
      color: colorObj.bg,
      x: Math.max(20, W - 220),
      y: Math.max(50, Math.min(H - 260, 100 + Math.random() * 150)),
      rotation: (Math.random() - 0.5) * 6,
      minimized: false,
      tag: "MEMO"
    };
    setNotes((prev) => [...prev, newNote]);
    setFocusedId(newNote.id);
    setEditingId(newNote.id);
  };

  const deleteNote = (id: string) => {
    retroAudio.playClick(0.85);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleMinimize = (id: string) => {
    retroAudio.playClick(1.1);
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, minimized: !n.minimized } : n))
    );
  };

  const updateText = (id: string, text: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, text } : n)));
  };

  const updateColor = (id: string, color: string) => {
    retroAudio.playClick(1.15);
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, color } : n)));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (e.button !== 0) return;
    retroAudio.playPeel();
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    dragOffset.current = { dx: e.clientX - note.x, dy: e.clientY - note.y };
    setDraggingId(id);
    setFocusedId(id);
    e.preventDefault();
  };

  useEffect(() => {
    if (!draggingId) return;
    const onMove = (e: MouseEvent) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const newX = Math.max(4, Math.min(W - 170, e.clientX - dragOffset.current.dx));
      const newY = Math.max(4, Math.min(H - 60, e.clientY - dragOffset.current.dy));

      setNotes((prev) =>
        prev.map((n) => (n.id === draggingId ? { ...n, x: newX, y: newY } : n))
      );
    };
    const onUp = () => setDraggingId(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [draggingId]);

  if (allHidden) {
    return (
      <button
        type="button"
        onClick={() => {
          retroAudio.playClick(1.1);
          setAllHidden(false);
        }}
        title="Show Sticky Notes"
        style={{
          position: "fixed",
          bottom: "44px",
          right: "12px",
          zIndex: 9,
          padding: "4px 8px",
          background: "#fff9a5",
          border: "1px solid #000",
          fontFamily: "var(--font-silkscreen, monospace)",
          fontSize: "10px",
          boxShadow: "2px 2px 0px #000",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}
      >
        <span>📝</span>
        <span>NOTES ({notes.length})</span>
      </button>
    );
  }

  return (
    <>
      {notes.map((note) => {
        const isInteracting = draggingId === note.id || focusedId === note.id;
        // CRITICAL FIX: Base zIndex is 7 (desktop layer, strictly under open windows which start at 10-25)
        // Elevates to 28 temporarily only when actively dragged or edited
        const currentZIndex = isInteracting ? 28 : 7;

        return (
          <div
            key={note.id}
            style={{
              position: "fixed",
              left: note.x,
              top: note.y,
              zIndex: currentZIndex,
              transform: `rotate(${note.rotation}deg)`,
              userSelect: "none",
              cursor: draggingId === note.id ? "grabbing" : "grab",
              filter: isInteracting
                ? "drop-shadow(3px 8px 12px rgba(0,0,0,0.35))"
                : "drop-shadow(2px 3px 6px rgba(0,0,0,0.2))",
              transition: draggingId === note.id ? "none" : "filter 0.15s ease"
            }}
            onMouseDown={(e) => {
              if (editingId === note.id) return;
              handleMouseDown(e, note.id);
            }}
          >
            {/* Washi Paper Tape at top */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "48px",
                height: "18px",
                background: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(200, 200, 200, 0.5)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                backdropFilter: "blur(1px)",
                zIndex: 5
              }}
            />

            {/* Minimized Pill View */}
            {note.minimized ? (
              <div
                style={{
                  backgroundColor: note.color,
                  border: "1px solid rgba(0,0,0,0.2)",
                  padding: "4px 8px",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-pixel, monospace)",
                  fontSize: "10px",
                  color: "#111",
                  boxShadow: "1px 1px 0px rgba(0,0,0,0.2)"
                }}
              >
                <span>📌</span>
                <span style={{ fontWeight: "bold" }}>
                  {note.text.split("\n")[0].slice(0, 16)}...
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize(note.id);
                  }}
                  title="Expand Note"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "10px",
                    padding: "0 2px"
                  }}
                >
                  ▲
                </button>
              </div>
            ) : (
              /* Expanded Paper Note */
              <div
                style={{
                  width: "168px",
                  minHeight: "120px",
                  backgroundColor: note.color,
                  padding: "14px 10px 10px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 21px, rgba(0,0,0,0.06) 21px, rgba(0,0,0,0.06) 22px)",
                  backgroundSize: "100% 22px",
                  backgroundPosition: "0 26px",
                  borderLeft: "3px solid rgba(0,0,0,0.1)",
                  borderBottom: "1px solid rgba(0,0,0,0.12)"
                }}
              >
                {/* Riso Stamp Tag */}
                {note.tag && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      left: "8px",
                      fontFamily: "var(--font-silkscreen, monospace)",
                      fontSize: "7px",
                      color: "rgba(0,0,0,0.4)",
                      letterSpacing: "1px"
                    }}
                  >
                    ★ {note.tag}
                  </span>
                )}

                {/* Folded Corner */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 0,
                    height: 0,
                    borderStyle: "solid",
                    borderWidth: "0 0 16px 16px",
                    borderColor: "transparent transparent rgba(0,0,0,0.15) transparent",
                    zIndex: 2
                  }}
                />

                {/* Toolbar */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "absolute",
                    top: "4px",
                    left: "6px",
                    right: "6px",
                    zIndex: 3
                  }}
                >
                  {/* Color Swatch Dots */}
                  <div style={{ display: "flex", gap: "2px" }}>
                    {RISO_PALETTE.map((c) => (
                      <span
                        key={c.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateColor(note.id, c.bg);
                        }}
                        title={c.name}
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: c.bg,
                          border: "1px solid rgba(0,0,0,0.3)",
                          cursor: "pointer",
                          display: "inline-block"
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "2px" }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(editingId === note.id ? null : note.id);
                      }}
                      title="Edit Note"
                      style={{
                        width: "16px",
                        height: "16px",
                        fontSize: "8px",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "2px",
                        cursor: "pointer",
                        background: "rgba(255,255,255,0.7)",
                        lineHeight: 1,
                        padding: 0
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMinimize(note.id);
                      }}
                      title="Minimize Note"
                      style={{
                        width: "16px",
                        height: "16px",
                        fontSize: "9px",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "2px",
                        cursor: "pointer",
                        background: "rgba(255,255,255,0.7)",
                        lineHeight: 1,
                        padding: 0
                      }}
                    >
                      –
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      title="Delete Note"
                      style={{
                        width: "16px",
                        height: "16px",
                        fontSize: "10px",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "2px",
                        cursor: "pointer",
                        background: "rgba(255,255,255,0.7)",
                        lineHeight: 1,
                        padding: 0,
                        fontWeight: "bold"
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Content */}
                {editingId === note.id ? (
                  <textarea
                    autoFocus
                    value={note.text}
                    onChange={(e) => updateText(note.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    style={{
                      width: "100%",
                      minHeight: "75px",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      resize: "none",
                      fontFamily: "'Caveat', cursive, sans-serif",
                      fontSize: "15px",
                      lineHeight: "22px",
                      color: "#1a1a1a",
                      cursor: "text",
                      marginTop: "4px"
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontFamily: "'Caveat', cursive, sans-serif",
                      fontSize: "15px",
                      lineHeight: "22px",
                      color: "#1a1a1a",
                      whiteSpace: "pre-wrap",
                      minHeight: "75px",
                      paddingTop: "6px"
                    }}
                  >
                    {note.text}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Floating Add Note + Toggle Dock */}
      <div
        style={{
          position: "fixed",
          bottom: "44px",
          right: "12px",
          zIndex: 8,
          display: "flex",
          gap: "6px"
        }}
      >
        <button
          type="button"
          onClick={() => {
            retroAudio.playClick(0.9);
            setAllHidden(true);
          }}
          title="Hide All Sticky Notes"
          style={{
            padding: "2px 6px",
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(0,0,0,0.3)",
            borderRadius: "2px",
            fontSize: "9px",
            fontFamily: "var(--font-pixel, monospace)",
            cursor: "pointer",
            boxShadow: "1px 1px 2px rgba(0,0,0,0.2)"
          }}
        >
          👁 HIDE
        </button>

        <button
          type="button"
          onClick={addNote}
          title="Add Sticky Note"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            backgroundColor: "#fff9a5",
            border: "1px solid #000",
            boxShadow: "1px 1px 4px rgba(0,0,0,0.3)",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1
          }}
        >
          📌
        </button>
      </div>
    </>
  );
};

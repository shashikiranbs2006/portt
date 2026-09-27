import React, { useState, useEffect, useRef } from "react";
import { retroAudio } from "../../utils/audioSystem";

interface StickyNote {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
  pinned: boolean;
}

const NOTE_COLORS = ["#fff9a5", "#a8f0c6", "#f0a8c6", "#a8d4f0", "#f0c6a8", "#d4a8f0"];

// All notes on right side or bottom — never blocking main windows
const getInitialNotes = (): StickyNote[] => {
  const W = window.innerWidth;
  const H = window.innerHeight;
  return [
    {
      id: "n1",
      text: "🔥 hire me\nbefore someone\nelse does!!!",
      color: "#fff9a5",
      x: W - 195,
      y: H - 340,
      rotation: 3,
      pinned: false
    },
    {
      id: "n2",
      text: "todo:\n- deploy world domination\n- fix that one bug\n- eat lunch",
      color: "#a8f0c6",
      x: W - 200,
      y: H - 175,
      rotation: -2,
      pinned: false
    },
    {
      id: "n3",
      text: "SHASHI\n2024\nB.E. CSE (AI/ML)\nBMSIT",
      color: "#a8d4f0",
      x: W - 205,
      y: H - 500,
      rotation: 2,
      pinned: false
    }
  ];
};

export const StickyNotesDesktop: React.FC = () => {
  const [notes, setNotes] = useState<StickyNote[]>(getInitialNotes);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const dragOffset = useRef({ dx: 0, dy: 0 });

  const addNote = () => {
    retroAudio.playClick(1.2);
    const newNote: StickyNote = {
      id: Date.now().toString(),
      text: "New note...",
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 200,
      rotation: (Math.random() - 0.5) * 8,
      pinned: false
    };
    setNotes(prev => [...prev, newNote]);
    setEditingId(newNote.id);
  };

  const deleteNote = (id: string) => {
    retroAudio.playClick(0.8);
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const updateText = (id: string, text: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, text } : n));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (e.button !== 0) return;
    retroAudio.playPeel();
    const note = notes.find(n => n.id === id)!;
    dragOffset.current = { dx: e.clientX - note.x, dy: e.clientY - note.y };
    setDraggingId(id);
    setNotes(prev => {
      const note = prev.find(n => n.id === id)!;
      return [...prev.filter(n => n.id !== id), note];
    });
    e.preventDefault();
  };

  useEffect(() => {
    if (!draggingId) return;
    const onMove = (e: MouseEvent) => {
      setNotes(prev => prev.map(n => n.id === draggingId
        ? { ...n, x: e.clientX - dragOffset.current.dx, y: e.clientY - dragOffset.current.dy }
        : n
      ));
    };
    const onUp = () => setDraggingId(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [draggingId]);

  return (
    <>
      {notes.map(note => (
        <div
          key={note.id}
          style={{
            position: "fixed",
            left: note.x,
            top: note.y,
            zIndex: 50000,
            transform: `rotate(${note.rotation}deg)`,
            userSelect: "none",
            cursor: draggingId === note.id ? "grabbing" : "grab",
            filter: "drop-shadow(3px 6px 10px rgba(0,0,0,0.3))"
          }}
          onMouseDown={(e) => {
            if (editingId === note.id) return;
            handleMouseDown(e, note.id);
          }}
        >
          {/* Tape strip at top */}
          <div style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "54px",
            height: "22px",
            background: "rgba(200,220,255,0.55)",
            border: "1px solid rgba(180,200,240,0.4)",
            borderRadius: "2px",
            backdropFilter: "blur(1px)",
            zIndex: 5
          }} />

          {/* Paper note */}
          <div
            style={{
              width: "175px",
              minHeight: "130px",
              backgroundColor: note.color,
              padding: "16px 12px 14px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              backgroundImage: `
                repeating-linear-gradient(
                  transparent,
                  transparent 23px,
                  rgba(0,0,0,0.07) 23px,
                  rgba(0,0,0,0.07) 24px
                )
              `,
              backgroundSize: "100% 24px",
              backgroundPosition: "0 30px",
              borderLeft: "4px solid rgba(0,0,0,0.07)"
            }}
          >
            {/* Folded corner */}
            <div style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 0 20px 20px",
              borderColor: `transparent transparent rgba(0,0,0,0.18) transparent`,
              zIndex: 2
            }} />

            {/* Toolbar */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "4px",
              marginBottom: "4px",
              position: "absolute",
              top: "6px",
              right: "6px",
              zIndex: 3
            }}>
              <button
                type="button"
                onClick={() => setEditingId(editingId === note.id ? null : note.id)}
                style={{
                  width: "18px", height: "18px",
                  fontSize: "9px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.6)",
                  lineHeight: 1,
                  padding: 0
                }}
              >
                ✏️
              </button>
              <button
                type="button"
                onClick={() => deleteNote(note.id)}
                style={{
                  width: "18px", height: "18px",
                  fontSize: "11px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.6)",
                  lineHeight: 1,
                  padding: 0,
                  fontWeight: "bold"
                }}
              >
                ×
              </button>
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
                  minHeight: "90px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  resize: "none",
                  fontFamily: "'Caveat', cursive",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#1a1a1a",
                  cursor: "text"
                }}
              />
            ) : (
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#1a1a1a",
                  whiteSpace: "pre-wrap",
                  minHeight: "90px",
                  paddingTop: "4px"
                }}
              >
                {note.text}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Add note FAB */}
      <button
        type="button"
        onClick={addNote}
        title="Add Sticky Note"
        style={{
          position: "fixed",
          bottom: "60px",
          right: "12px",
          zIndex: 55000,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          backgroundColor: "#fff9a5",
          border: "2px solid rgba(0,0,0,0.2)",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.35)",
          cursor: "pointer",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1
        }}
      >
        📌
      </button>
    </>
  );
};

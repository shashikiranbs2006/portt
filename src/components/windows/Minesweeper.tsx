import React, { useState, useEffect } from "react";
import { retroAudio } from "../../utils/audioSystem";

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

const ROWS = 9;
const COLS = 9;
const MINES = 10;

const NUMBER_COLORS: Record<number, string> = {
  1: "#0000ff",
  2: "#008000",
  3: "#ff0000",
  4: "#000080",
  5: "#800000",
  6: "#008080",
  7: "#000000",
  8: "#808080"
};

function createEmptyGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborCount: 0
    }))
  );
}

function placeMines(grid: Cell[][], firstRow: number, firstCol: number): Cell[][] {
  const g = grid.map((row) => row.map((cell) => ({ ...cell })));
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!g[r][c].isMine && !(r === firstRow && c === firstCol)) {
      g[r][c].isMine = true;
      placed++;
    }
  }
  // Count neighbors
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (g[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && g[nr][nc].isMine) count++;
        }
      }
      g[r][c].neighborCount = count;
    }
  }
  return g;
}

function revealCells(grid: Cell[][], startRow: number, startCol: number): Cell[][] {
  const g = grid.map((row) => row.map((c) => ({ ...c })));
  const stack = [[startRow, startCol]];
  while (stack.length) {
    const [r, c] = stack.pop()!;
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
    if (g[r][c].isRevealed || g[r][c].isFlagged) continue;
    g[r][c].isRevealed = true;
    if (g[r][c].neighborCount === 0 && !g[r][c].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          stack.push([r + dr, c + dc]);
        }
      }
    }
  }
  return g;
}

export const Minesweeper: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>(createEmptyGrid());
  const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "lost">("idle");
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);
  const [face, setFace] = useState("🙂");
  const [touchFlagMode, setTouchFlagMode] = useState(false);
  const [showVIPPass, setShowVIPPass] = useState(false);

  useEffect(() => {
    if (gameState !== "playing") return;
    const t = setInterval(() => setTime((prev) => Math.min(prev + 1, 999)), 1000);
    return () => clearInterval(t);
  }, [gameState]);

  const handleReset = () => {
    retroAudio.playClick(1.0);
    setGrid(createEmptyGrid());
    setGameState("idle");
    setFlagCount(0);
    setTime(0);
    setFace("🙂");
    setShowVIPPass(false);
  };

  const handleCellClick = (r: number, c: number) => {
    if (touchFlagMode) {
      toggleFlag(r, c);
    } else {
      handleReveal(r, c);
    }
  };

  const toggleFlag = (r: number, c: number) => {
    if (gameState === "won" || gameState === "lost" || grid[r][c].isRevealed) return;
    retroAudio.playClick(0.9);
    const newGrid = grid.map((row) => row.map((c2) => ({ ...c2 })));
    newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
    setFlagCount((prev) => (newGrid[r][c].isFlagged ? prev + 1 : prev - 1));
    setGrid(newGrid);
  };

  const handleReveal = (r: number, c: number) => {
    if (gameState === "won" || gameState === "lost") return;
    if (grid[r][c].isFlagged || grid[r][c].isRevealed) return;

    let g = grid;
    if (gameState === "idle") {
      g = placeMines(createEmptyGrid(), r, c);
      setGameState("playing");
    }

    if (g[r][c].isMine) {
      // Detonate
      retroAudio.playErrorChord();
      const revealed = g.map((row) =>
        row.map((cell) => ({
          ...cell,
          isRevealed: cell.isMine ? true : cell.isRevealed
        }))
      );
      setGrid(revealed);
      setGameState("lost");
      setFace("😵");
      return;
    }

    retroAudio.playClick(1.15);
    const newGrid = revealCells(g, r, c);
    setGrid(newGrid);

    // Check win condition
    const unrevealed = newGrid.flat().filter((cell) => !cell.isRevealed && !cell.isMine);
    if (unrevealed.length === 0) {
      retroAudio.playBootJingle();
      setGameState("won");
      setFace("😎");
      setShowVIPPass(true);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    toggleFlag(r, c);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#c0c0c0",
        fontFamily: "var(--font-pixel)",
        height: "100%",
        userSelect: "none"
      }}
      className="bevel-sunken"
    >
      {/* Header Panel */}
      <div
        className="bevel-raised"
        style={{
          width: "100%",
          padding: "6px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          backgroundColor: "#c0c0c0"
        }}
      >
        {/* Mine counter LCD */}
        <div
          className="bevel-sunken"
          style={{
            backgroundColor: "#000",
            color: "#ff3b30",
            fontFamily: "monospace",
            fontSize: "22px",
            fontWeight: "bold",
            padding: "2px 6px",
            minWidth: "48px",
            textAlign: "right",
            letterSpacing: "2px",
            boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.8)"
          }}
        >
          {String(Math.max(0, MINES - flagCount)).padStart(3, "0")}
        </div>

        {/* Face Reset Button */}
        <button
          type="button"
          className="win-btn"
          onClick={handleReset}
          style={{
            width: "36px",
            height: "36px",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          title="Restart Game"
        >
          {face}
        </button>

        {/* Timer LCD */}
        <div
          className="bevel-sunken"
          style={{
            backgroundColor: "#000",
            color: "#ff3b30",
            fontFamily: "monospace",
            fontSize: "22px",
            fontWeight: "bold",
            padding: "2px 6px",
            minWidth: "48px",
            textAlign: "right",
            letterSpacing: "2px",
            boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.8)"
          }}
        >
          {String(time).padStart(3, "0")}
        </div>
      </div>

      {/* Mobile Touch Mode Switcher */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "8px", width: "100%" }}>
        <button
          type="button"
          className={`bevel-button ${!touchFlagMode ? "active font-bold" : ""}`}
          onClick={() => {
            retroAudio.playClick(1.0);
            setTouchFlagMode(false);
          }}
          style={{
            flex: 1,
            fontSize: "11px",
            padding: "3px 4px",
            backgroundColor: !touchFlagMode ? "#fff" : "#dfdfdf"
          }}
        >
          ⛏️ DIG MODE
        </button>
        <button
          type="button"
          className={`bevel-button ${touchFlagMode ? "active font-bold" : ""}`}
          onClick={() => {
            retroAudio.playClick(1.0);
            setTouchFlagMode(true);
          }}
          style={{
            flex: 1,
            fontSize: "11px",
            padding: "3px 4px",
            backgroundColor: touchFlagMode ? "#ffe500" : "#dfdfdf",
            color: touchFlagMode ? "#d91e18" : "#000"
          }}
        >
          🚩 FLAG MODE
        </button>
      </div>

      {/* Mines Grid */}
      <div
        className="bevel-sunken"
        style={{
          padding: "4px",
          backgroundColor: "#808080",
          display: "inline-block"
        }}
      >
        {grid.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((cell, c) => {
              let content: React.ReactNode = null;
              if (cell.isRevealed) {
                if (cell.isMine) {
                  content = "💣";
                } else if (cell.neighborCount > 0) {
                  content = (
                    <span
                      style={{
                        color: NUMBER_COLORS[cell.neighborCount],
                        fontWeight: "bold",
                        fontSize: "13px"
                      }}
                    >
                      {cell.neighborCount}
                    </span>
                  );
                }
              } else if (cell.isFlagged) {
                content = "🚩";
              }

              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCellClick(r, c)}
                  onContextMenu={(e) => handleContextMenu(e, r, c)}
                  className={cell.isRevealed ? "bevel-sunken" : "bevel-raised"}
                  style={{
                    width: "26px",
                    height: "26px",
                    padding: 0,
                    margin: "1px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    backgroundColor: cell.isRevealed
                      ? cell.isMine
                        ? "#ff4444"
                        : "#dfdfdf"
                      : "#c0c0c0",
                    cursor: cell.isRevealed ? "default" : "pointer",
                    border: "none",
                    outline: "none"
                  }}
                >
                  {content}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Gig-Poster VIP Pass Victory Modal Easter Egg */}
      {showVIPPass && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backdropFilter: "blur(2px)"
          }}
          onClick={() => setShowVIPPass(false)}
        >
          <div
            className="bevel-raised"
            style={{
              width: "360px",
              maxWidth: "100%",
              backgroundColor: "#d91e18",
              color: "#fff",
              padding: "4px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
              border: "3px solid #ffe500"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="win-titlebar" style={{ background: "#000" }}>
              <span>★ SECRET VIP BACKSTAGE PASS UNLOCKED ★</span>
              <button
                type="button"
                className="win-btn"
                onClick={() => setShowVIPPass(false)}
              >
                ✕
              </button>
            </div>
            <div
              style={{
                backgroundColor: "#fffde7",
                color: "#111",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "8px",
                fontFamily: "var(--font-display)"
              }}
            >
              <div style={{ fontSize: "36px" }}>🏆</div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 900,
                  color: "#d91e18",
                  letterSpacing: "-0.5px"
                }}
              >
                MINEFIELD CLEARED!
              </div>
              <div style={{ fontSize: "12px", color: "#333", lineHeight: 1.4 }}>
                You successfully swept all 10 mines! You've unlocked the recruiter fast-track pass:
              </div>
              <div
                style={{
                  backgroundColor: "#000",
                  color: "#ffe500",
                  fontFamily: "var(--font-silkscreen)",
                  fontSize: "16px",
                  padding: "6px 14px",
                  letterSpacing: "2px",
                  border: "2px dashed #ff3b30",
                  marginTop: "4px"
                }}
              >
                CODE: AMTS-2027
              </div>
              <div style={{ fontSize: "11px", color: "#666" }}>
                Mention this code when emailing Shashi for immediate priority response!
              </div>
              <button
                type="button"
                className="bevel-button"
                onClick={() => {
                  retroAudio.playClick(1.2);
                  window.open(
                    `mailto:shashibs238@gmail.com?subject=${encodeURIComponent(
                      "Minesweeper VIP Pass [AMTS-2027]: Interview Request"
                    )}`
                  );
                  setShowVIPPass(false);
                }}
                style={{
                  backgroundColor: "#ffe500",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "12px",
                  padding: "4px 12px",
                  marginTop: "6px"
                }}
              >
                ✉ Claim VIP Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Helper Footer */}
      <div
        style={{
          marginTop: "auto",
          fontSize: "10px",
          color: "#444",
          textAlign: "center",
          paddingTop: "6px"
        }}
      >
        Left-click to reveal · Right-click (or toggle mode) to flag
      </div>
    </div>
  );
};

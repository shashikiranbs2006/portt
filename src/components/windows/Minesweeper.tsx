import React, { useState, useEffect } from "react";

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
  const g = grid.map(row => row.map(cell => ({ ...cell })));
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
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && g[nr][nc].isMine) count++;
        }
      }
      g[r][c].neighborCount = count;
    }
  }
  return g;
}

function revealCells(grid: Cell[][], startRow: number, startCol: number): Cell[][] {
  const g = grid.map(row => row.map(c => ({ ...c })));
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

  useEffect(() => {
    if (gameState !== "playing") return;
    const t = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(t);
  }, [gameState]);

  const handleReset = () => {
    setGrid(createEmptyGrid());
    setGameState("idle");
    setFlagCount(0);
    setTime(0);
    setFace("🙂");
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
      // Reveal all mines
      const revealed = g.map(row => row.map(cell => ({
        ...cell,
        isRevealed: cell.isMine ? true : cell.isRevealed
      })));
      setGrid(revealed);
      setGameState("lost");
      setFace("😵");
      return;
    }

    const newGrid = revealCells(g, r, c);
    setGrid(newGrid);

    // Check win
    const unrevealed = newGrid.flat().filter(cell => !cell.isRevealed && !cell.isMine);
    if (unrevealed.length === 0) {
      setGameState("won");
      setFace("😎");
    }
  };

  const handleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState === "won" || gameState === "lost" || grid[r][c].isRevealed) return;
    const newGrid = grid.map(row => row.map(c2 => ({ ...c2 })));
    newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
    setFlagCount(prev => newGrid[r][c].isFlagged ? prev + 1 : prev - 1);
    setGrid(newGrid);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "12px",
      backgroundColor: "#c0c0c0",
      fontFamily: "var(--font-pixel)",
      height: "100%"
    }}>
      {/* Header Panel */}
      <div className="bevel-raised" style={{
        width: "100%",
        padding: "6px 8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px"
      }}>
        {/* Mine counter */}
        <div className="bevel-sunken" style={{
          backgroundColor: "#000",
          color: "#ff0000",
          fontFamily: "monospace",
          fontSize: "24px",
          padding: "2px 6px",
          minWidth: "52px",
          textAlign: "right",
          letterSpacing: "2px"
        }}>
          {String(Math.max(0, MINES - flagCount)).padStart(3, "0")}
        </div>

        {/* Face reset button */}
        <button
          type="button"
          className="bevel-button"
          onClick={handleReset}
          style={{ fontSize: "20px", width: "34px", height: "32px", padding: 0 }}
          onMouseDown={() => setFace("😮")}
          onMouseUp={() => gameState !== "won" && gameState !== "lost" && setFace("🙂")}
        >
          {face}
        </button>

        {/* Timer */}
        <div className="bevel-sunken" style={{
          backgroundColor: "#000",
          color: "#ff0000",
          fontFamily: "monospace",
          fontSize: "24px",
          padding: "2px 6px",
          minWidth: "52px",
          textAlign: "right",
          letterSpacing: "2px"
        }}>
          {String(Math.min(999, time)).padStart(3, "0")}
        </div>
      </div>

      {/* Win/Loss Banner */}
      {(gameState === "won" || gameState === "lost") && (
        <div style={{
          marginBottom: "8px",
          padding: "4px 12px",
          backgroundColor: gameState === "won" ? "#d4edda" : "#f8d7da",
          border: `1px solid ${gameState === "won" ? "#28a745" : "#dc3545"}`,
          color: gameState === "won" ? "#155724" : "#721c24",
          fontSize: "12px",
          textAlign: "center"
        }}>
          {gameState === "won"
            ? "🎉 You found all mines! Shashi approves."
            : "💥 BOOM! Just like Shashi's coding sessions at 3AM."}
        </div>
      )}

      {/* Grid */}
      <div className="bevel-sunken" style={{ padding: "4px" }}>
        {grid.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((cell, c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleReveal(r, c)}
                onContextMenu={(e) => handleFlag(e, r, c)}
                style={{
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: cell.isRevealed ? "#c0c0c0" : undefined,
                  boxShadow: cell.isRevealed
                    ? "inset 1px 1px 0 #808080, inset -1px -1px 0 #fff"
                    : "inset 1px 1px 0 #fff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040",
                  color: cell.isRevealed && !cell.isMine && cell.neighborCount > 0
                    ? NUMBER_COLORS[cell.neighborCount]
                    : "#000"
                }}
              >
                {cell.isFlagged && !cell.isRevealed
                  ? "🚩"
                  : cell.isRevealed && cell.isMine
                    ? (gameState === "lost" ? "💣" : "💣")
                    : cell.isRevealed && cell.neighborCount > 0
                      ? cell.neighborCount
                      : null}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

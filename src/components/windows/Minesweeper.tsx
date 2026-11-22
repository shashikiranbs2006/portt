import { useEffect, useState } from "react";

type Cell = { mine: boolean; revealed: boolean; flagged: boolean; nearby: number };
type Status = "ready" | "playing" | "won" | "lost";
const SIZE = 9;
const MINES = 10;
const adjacent = [-1, 0, 1];

function emptyBoard(): Cell[][] {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => ({ mine: false, revealed: false, flagged: false, nearby: 0 })));
}

function placeMines(firstRow: number, firstCol: number): Cell[][] {
  const board = emptyBoard();
  const candidates: [number, number][] = [];
  for (let row = 0; row < SIZE; row++) for (let col = 0; col < SIZE; col++) {
    if (Math.abs(row - firstRow) > 1 || Math.abs(col - firstCol) > 1) candidates.push([row, col]);
  }
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  candidates.slice(0, MINES).forEach(([row, col]) => { board[row][col].mine = true; });
  for (let row = 0; row < SIZE; row++) for (let col = 0; col < SIZE; col++) {
    let nearby = 0;
    for (const dr of adjacent) for (const dc of adjacent) if (board[row + dr]?.[col + dc]?.mine) nearby++;
    board[row][col].nearby = nearby;
  }
  return board;
}

function reveal(board: Cell[][], startRow: number, startCol: number): Cell[][] {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack: [number, number][] = [[startRow, startCol]];
  while (stack.length) {
    const [row, col] = stack.pop()!;
    const cell = next[row]?.[col];
    if (!cell || cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.nearby === 0 && !cell.mine) for (const dr of adjacent) for (const dc of adjacent) stack.push([row + dr, col + dc]);
  }
  return next;
}

export function Minesweeper() {
  const [board, setBoard] = useState(emptyBoard);
  const [status, setStatus] = useState<Status>("ready");
  const [seconds, setSeconds] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const flagged = board.flat().filter((cell) => cell.flagged).length;

  useEffect(() => {
    if (status !== "playing") return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [status]);

  const reset = () => { setBoard(emptyBoard()); setStatus("ready"); setSeconds(0); setFlagMode(false); };
  const flag = (row: number, col: number) => {
    if (status === "won" || status === "lost" || board[row][col].revealed) return;
    setBoard((current) => current.map((line, r) => line.map((cell, c) => r === row && c === col ? { ...cell, flagged: !cell.flagged } : cell)));
  };
  const dig = (row: number, col: number) => {
    if (status === "won" || status === "lost" || board[row][col].flagged || board[row][col].revealed) return;
    const startingBoard = status === "ready" ? placeMines(row, col) : board;
    if (status === "ready") board.forEach((line, r) => line.forEach((cell, c) => { startingBoard[r][c].flagged = cell.flagged; }));
    const next = reveal(startingBoard, row, col);
    if (startingBoard[row][col].mine) {
      next.forEach((line) => line.forEach((cell) => { if (cell.mine) cell.revealed = true; }));
      setStatus("lost");
    } else if (next.flat().every((cell) => cell.mine || cell.revealed)) {
      setStatus("won");
    } else setStatus("playing");
    setBoard(next);
  };

  return <div className="mine-game">
    <div className="mine-toolbar"><div className="mine-count"><span>MINES LEFT</span><strong>{String(Math.max(0, MINES - flagged)).padStart(2, "0")}</strong></div><button type="button" className="mine-face" onClick={reset} aria-label="Start a new Minesweeper game">{status === "won" ? "😎" : status === "lost" ? "😵" : "🙂"}</button><div className="mine-count"><span>TIME</span><strong>{String(seconds).padStart(3, "0")}</strong></div></div>
    <div className="mine-mode" aria-label="Choose interaction mode"><button type="button" aria-pressed={!flagMode} className={!flagMode ? "active" : ""} onClick={() => setFlagMode(false)}>⛏ Dig</button><button type="button" aria-pressed={flagMode} className={flagMode ? "active" : ""} onClick={() => setFlagMode(true)}>⚑ Flag</button></div>
    <div className="mine-board" role="grid" aria-label="Minesweeper board">
      {board.flatMap((line, row) => line.map((cell, col) => <button type="button" role="gridcell" key={`${row}-${col}`} className={`mine-cell ${cell.revealed ? "revealed" : ""} ${cell.mine && cell.revealed ? "exploded" : ""}`} aria-label={`Row ${row + 1}, column ${col + 1}: ${cell.revealed ? cell.mine ? "mine" : cell.nearby ? `${cell.nearby} nearby mines` : "empty" : cell.flagged ? "flagged" : "covered"}`} onClick={() => flagMode ? flag(row, col) : dig(row, col)} onContextMenu={(event) => { event.preventDefault(); flag(row, col); }} disabled={status === "won" || status === "lost"}>{cell.revealed ? cell.mine ? "✱" : cell.nearby || "" : cell.flagged ? "⚑" : ""}</button>))}
    </div>
    {status === "won" || status === "lost" ? <div className={`mine-result ${status}`}><strong>{status === "won" ? "FIELD CLEARED" : "BOOM. TRY AGAIN."}</strong><span>{status === "won" ? `Finished in ${seconds} seconds.` : "The next field is waiting."}</span><button type="button" onClick={reset}>New game ↗</button></div> : <p className="mine-hint">First dig is always safe. Right-click to flag, or use Flag mode on touchscreens.</p>}
  </div>;
}

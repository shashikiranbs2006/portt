import { useCallback, useEffect, useRef, useState } from "react";
import { Minesweeper } from "./Minesweeper";
import { advanceSnake, create2048, createSnake, move2048, SNAKE_SIZE } from "./arcadeLogic";
import type { Direction } from "./arcadeLogic";
import "./arcade.css";

type GameId = "snake" | "2048" | "mines";

const games: { id: GameId; icon: string; title: string; detail: string }[] = [
  { id: "snake", icon: "▦", title: "Snake", detail: "Eat pixels. Avoid yourself." },
  { id: "2048", icon: "◈", title: "2048", detail: "Merge your way up." },
  { id: "mines", icon: "✱", title: "Minesweeper", detail: "Clear the field." },
];

const keyDirection: Record<string, Direction> = {
  ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
  w: "up", s: "down", a: "left", d: "right",
};

function readBest(key: string) {
  try { return Number(localStorage.getItem(key) || 0); } catch { return 0; }
}

function saveBest(key: string, score: number) {
  try { localStorage.setItem(key, String(score)); } catch { /* Scores still work in memory. */ }
}

export function ArcadeWindow({ isActive }: { isActive: boolean }) {
  const [active, setActive] = useState<GameId>("snake");
  const game = games.find((item) => item.id === active)!;
  const gameNumber = games.findIndex((item) => item.id === active) + 1;

  return <div className="arcade-app">
    <header className="arcade-header">
      <div><span className="arcade-header-index">SHASHI★ OS / GAMES</span><h1>ARCADE<span>★</span></h1><p>Three complete classics. Pick one and play.</p></div>
      <div className="arcade-header-mark" aria-hidden="true">0{gameNumber}<span>/</span>03</div>
    </header>
    <nav className="arcade-tabs" aria-label="Choose a game">
      {games.map((item, index) => <button type="button" key={item.id} className={active === item.id ? "arcade-tab active" : "arcade-tab"} aria-pressed={active === item.id} onClick={() => setActive(item.id)}><span className="arcade-tab-number">0{index + 1}</span><span className="arcade-tab-icon" aria-hidden="true">{item.icon}</span>{item.title}</button>)}
    </nav>
    <div className="arcade-game-area" key={active}>
      <div className="arcade-game-intro"><div><span className="arcade-game-label">NOW PLAYING / {game.id.toUpperCase()}</span><h2>{game.title}</h2></div><p>{game.detail}</p></div>
      {active === "snake" && <SnakeGame isActive={isActive} />}
      {active === "2048" && <Game2048 isActive={isActive} />}
      {active === "mines" && <div className="arcade-mines"><Minesweeper /></div>}
    </div>
  </div>;
}

function DirectionPad({ onMove }: { onMove: (direction: Direction) => void }) {
  return <div className="arcade-pad" aria-label="Direction controls">
    <button type="button" className="pad-up" onClick={() => onMove("up")} aria-label="Move up">↑</button>
    <button type="button" className="pad-left" onClick={() => onMove("left")} aria-label="Move left">←</button>
    <button type="button" className="pad-down" onClick={() => onMove("down")} aria-label="Move down">↓</button>
    <button type="button" className="pad-right" onClick={() => onMove("right")} aria-label="Move right">→</button>
  </div>;
}

function SnakeGame({ isActive }: { isActive: boolean }) {
  const [game, setGame] = useState(createSnake);
  const requested = useRef<Direction>("right");
  const [best, setBest] = useState(() => readBest("shashi-arcade-snake-best"));

  const restart = () => { setBest(Math.max(best, game.score)); requested.current = "right"; setGame({ ...createSnake(), status: "running" }); };
  const move = useCallback((direction: Direction) => {
    requested.current = direction;
    setGame((current) => current.status === "ready" ? { ...current, status: "running" } : current);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!isActive) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const direction = keyDirection[event.key];
      if (direction) { event.preventDefault(); move(direction); }
      if (event.code === "Space") {
        event.preventDefault();
        setGame((current) => ({ ...current, status: current.status === "running" ? "paused" : current.status === "paused" || current.status === "ready" ? "running" : current.status }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, isActive]);

  useEffect(() => {
    if (game.status !== "running") return;
    const timer = window.setInterval(() => setGame((current) => advanceSnake(current, requested.current)), Math.max(85, 150 - Math.floor(game.score / 40) * 8));
    return () => window.clearInterval(timer);
  }, [game.status, game.score]);

  useEffect(() => {
    if (game.score <= best) return;
    saveBest("shashi-arcade-snake-best", game.score);
  }, [game.score, best]);

  const body = new Set(game.body.map(({ x, y }) => `${x},${y}`));
  const head = `${game.body[0].x},${game.body[0].y}`;
  return <div className="arcade-play-layout">
    <div className="snake-stage">
      <div className="snake-grid" role="img" aria-label={`Snake board. Score ${game.score}. ${game.status}.`}>
        {Array.from({ length: SNAKE_SIZE * SNAKE_SIZE }, (_, index) => {
          const x = index % SNAKE_SIZE, y = Math.floor(index / SNAKE_SIZE), key = `${x},${y}`;
          const kind = key === head ? "head" : body.has(key) ? "body" : game.food?.x === x && game.food.y === y ? "food" : "empty";
          return <span key={key} className={`snake-cell ${kind}`} />;
        })}
      </div>
      {game.status !== "running" && <div className="arcade-board-message"><strong>{game.status === "ready" ? "READY?" : game.status === "paused" ? "PAUSED" : game.status === "won" ? "PERFECT RUN" : "GAME OVER"}</strong><span>{game.status === "ready" ? "Press start or an arrow key" : game.status === "paused" ? "Press space to continue" : game.status === "won" ? "You filled the whole board." : "Try another run."}</span>{(game.status === "ready" || game.status === "lost" || game.status === "won") && <button type="button" onClick={restart}>{game.status === "ready" ? "Start game" : "Play again"} ↗</button>}</div>}
    </div>
    <aside className="arcade-side-panel"><div className="arcade-stat"><span>SCORE</span><strong>{String(game.score).padStart(3, "0")}</strong></div><div className="arcade-stat"><span>BEST</span><strong>{String(Math.max(best, game.score)).padStart(3, "0")}</strong></div><div className="arcade-game-buttons"><button type="button" onClick={restart}>New game ↗</button><button type="button" onClick={() => setGame((current) => ({ ...current, status: current.status === "running" ? "paused" : current.status === "paused" ? "running" : current.status }))} disabled={game.status === "ready" || game.status === "lost" || game.status === "won"}>{game.status === "paused" ? "Resume" : "Pause"}</button></div><DirectionPad onMove={move} /><p className="arcade-hint">Arrow keys or WASD to steer. Space to pause.</p></aside>
  </div>;
}

function Game2048({ isActive }: { isActive: boolean }) {
  const [game, setGame] = useState(() => ({ board: create2048(), score: 0, over: false }));
  const [best, setBest] = useState(() => readBest("shashi-arcade-2048-best"));
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const restart = () => { setBest(Math.max(best, game.score)); setGame({ board: create2048(), score: 0, over: false }); };
  const move = useCallback((direction: Direction) => {
    setGame((current) => {
      if (current.over) return current;
      const result = move2048(current.board, direction);
      return result.changed || result.over
        ? { board: result.board, score: current.score + result.gained, over: result.over }
        : current;
    });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!isActive) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const direction = keyDirection[event.key];
      if (direction) { event.preventDefault(); move(direction); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, isActive]);

  useEffect(() => {
    if (game.score <= best) return;
    saveBest("shashi-arcade-2048-best", game.score);
  }, [game.score, best]);

  const reached2048 = game.board.some((row) => row.some((value) => value >= 2048));
  return <div className="arcade-play-layout">
    <div className="merge-stage">
      <div className="merge-grid" role="img" aria-label={`2048 game board. Score ${game.score}.`} onTouchStart={(event) => { const touch = event.touches[0]; if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY }; }} onTouchEnd={(event) => { const start = touchStart.current, end = event.changedTouches[0]; if (!start || !end) return; const dx = end.clientX - start.x, dy = end.clientY - start.y; if (Math.max(Math.abs(dx), Math.abs(dy)) > 35) move(Math.abs(dx) > Math.abs(dy) ? dx > 0 ? "right" : "left" : dy > 0 ? "down" : "up"); touchStart.current = null; }}>
        {game.board.flatMap((row, y) => row.map((value, x) => <div aria-hidden="true" className={`merge-tile tile-${Math.min(value, 2048)}`} key={`${x}-${y}`}>{value || ""}</div>))}
      </div>
      {game.over && <div className="arcade-board-message merge-message"><strong>NO MOVES LEFT</strong><span>One more round?</span><button type="button" onClick={restart}>Try again ↗</button></div>}
    </div>
    <aside className="arcade-side-panel"><div className="arcade-stat"><span>SCORE</span><strong>{game.score}</strong></div><div className="arcade-stat"><span>BEST</span><strong>{Math.max(best, game.score)}</strong></div>{reached2048 && <div className="arcade-achievement">★ 2048 UNLOCKED</div>}<div className="arcade-game-buttons"><button type="button" onClick={restart}>New game ↗</button></div><DirectionPad onMove={move} /><p className="arcade-hint">Use arrow keys, WASD, or the controls. Matching tiles merge once per move.</p></aside>
  </div>;
}

export type Direction = "up" | "down" | "left" | "right";
export type Point = { x: number; y: number };
export type SnakeStatus = "ready" | "running" | "paused" | "lost" | "won";
export type SnakeState = {
  body: Point[];
  direction: Direction;
  food: Point | null;
  score: number;
  status: SnakeStatus;
};

export const SNAKE_SIZE = 16;

const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

export function pickFood(body: Point[], random = Math.random): Point | null {
  const occupied = new Set(body.map(({ x, y }) => `${x},${y}`));
  const free: Point[] = [];
  for (let y = 0; y < SNAKE_SIZE; y++) {
    for (let x = 0; x < SNAKE_SIZE; x++) {
      if (!occupied.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  return free.length ? free[Math.min(free.length - 1, Math.floor(random() * free.length))] : null;
}

export function createSnake(random = Math.random): SnakeState {
  const body = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
  return { body, direction: "right", food: pickFood(body, random), score: 0, status: "ready" };
}

export function advanceSnake(state: SnakeState, requested: Direction, random = Math.random): SnakeState {
  if (state.status !== "running") return state;
  const opposite: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" };
  const direction = requested === opposite[state.direction] ? state.direction : requested;
  const head = state.body[0];
  const delta: Record<Direction, Point> = {
    up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 }
  };
  const next = { x: head.x + delta[direction].x, y: head.y + delta[direction].y };
  const eating = state.food !== null && samePoint(next, state.food);
  const collidable = eating ? state.body : state.body.slice(0, -1);
  if (next.x < 0 || next.y < 0 || next.x >= SNAKE_SIZE || next.y >= SNAKE_SIZE || collidable.some((part) => samePoint(part, next))) {
    return { ...state, direction, status: "lost" };
  }
  const body = [next, ...state.body.slice(0, eating ? undefined : -1)];
  const food = eating ? pickFood(body, random) : state.food;
  return { body, direction, food, score: state.score + (eating ? 10 : 0), status: food ? "running" : "won" };
}

export type Board2048 = number[][];

export function addTile(board: Board2048, random = Math.random): Board2048 {
  const free: Point[] = [];
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) if (!board[y][x]) free.push({ x, y });
  if (!free.length) return board.map((row) => [...row]);
  const point = free[Math.min(free.length - 1, Math.floor(random() * free.length))];
  const next = board.map((row) => [...row]);
  next[point.y][point.x] = random() < 0.9 ? 2 : 4;
  return next;
}

export function create2048(random = Math.random): Board2048 {
  const empty = Array.from({ length: 4 }, () => [0, 0, 0, 0]);
  return addTile(addTile(empty, random), random);
}

function slideLine(line: number[]): { line: number[]; gained: number } {
  const values = line.filter(Boolean);
  const result: number[] = [];
  let gained = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] === values[i + 1]) {
      const merged = values[i] * 2;
      result.push(merged);
      gained += merged;
      i++;
    } else result.push(values[i]);
  }
  while (result.length < 4) result.push(0);
  return { line: result, gained };
}

export function has2048Moves(board: Board2048): boolean {
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
    if (!board[y][x] || (x < 3 && board[y][x] === board[y][x + 1]) || (y < 3 && board[y][x] === board[y + 1][x])) return true;
  }
  return false;
}

export function move2048(board: Board2048, direction: Direction, random = Math.random) {
  const next = board.map((row) => [...row]);
  let gained = 0;
  for (let index = 0; index < 4; index++) {
    const points: Point[] = Array.from({ length: 4 }, (_, i) => direction === "left"
      ? { x: i, y: index } : direction === "right"
        ? { x: 3 - i, y: index } : direction === "up"
          ? { x: index, y: i } : { x: index, y: 3 - i });
    const moved = slideLine(points.map(({ x, y }) => board[y][x]));
    gained += moved.gained;
    points.forEach(({ x, y }, i) => { next[y][x] = moved.line[i]; });
  }
  const changed = next.some((row, y) => row.some((value, x) => value !== board[y][x]));
  const result = changed ? addTile(next, random) : next;
  return { board: result, gained, changed, over: !has2048Moves(result) };
}

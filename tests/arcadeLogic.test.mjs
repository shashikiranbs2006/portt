import assert from 'node:assert/strict';
import test from 'node:test';
import { advanceSnake, create2048, createSnake, move2048, pickFood } from '../src/components/windows/arcadeLogic.ts';

test('snake starts on an empty food tile and rejects an immediate reverse turn', () => {
  const ready = createSnake(() => 0);
  assert.ok(ready.food && !ready.body.some((part) => part.x === ready.food.x && part.y === ready.food.y));
  const moved = advanceSnake({ ...ready, status: 'running' }, 'left', () => 0);
  assert.deepEqual(moved.body[0], { x: 9, y: 8 });
  assert.equal(moved.direction, 'right');
});

test('snake grows after food, detects walls, and can move into its vacated tail', () => {
  const ready = createSnake(() => 0);
  const fed = advanceSnake({ ...ready, food: { x: 9, y: 8 }, status: 'running' }, 'right', () => 0);
  assert.equal(fed.body.length, 4);
  assert.equal(fed.score, 10);
  const wall = advanceSnake({ ...fed, body: [{ x: 15, y: 8 }, { x: 14, y: 8 }], direction: 'right' }, 'right');
  assert.equal(wall.status, 'lost');
  const tail = advanceSnake({ body: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 0, y: 1 }], direction: 'up', food: { x: 8, y: 8 }, score: 0, status: 'running' }, 'left');
  assert.equal(tail.status, 'running');
  assert.deepEqual(tail.body[0], { x: 0, y: 1 });
});

test('food picker returns no tile when the board is full', () => {
  const full = Array.from({ length: 256 }, (_, index) => ({ x: index % 16, y: Math.floor(index / 16) }));
  assert.equal(pickFood(full), null);
});

test('2048 starts with two tiles and merges each pair once', () => {
  const initial = create2048(() => 0);
  assert.equal(initial.flat().filter(Boolean).length, 2);
  const result = move2048([[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 'left', () => 0);
  assert.deepEqual(result.board[0], [4, 4, 2, 0]);
  assert.equal(result.gained, 8);
});

test('2048 spawns no tile after an ineffective move and detects blocked boards', () => {
  const board = [[2, 4, 8, 16], [16, 8, 4, 2], [2, 4, 8, 16], [16, 8, 4, 2]];
  const result = move2048(board, 'left', () => 0);
  assert.equal(result.changed, false);
  assert.equal(result.over, true);
  assert.deepEqual(result.board, board);
});

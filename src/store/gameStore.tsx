import { create } from 'zustand';
import { GameState, Direction, Cell } from '../types/game';

interface GameStore extends GameState {
  setMode: (mode: GameState['mode']) => void;
  setSpeed: (speedMs: number) => void;
  setGridSize: (rows: number, cols: number) => void;
  setDirection: (direction: Direction) => void;
  togglePause: () => void;
  resetGame: () => void;
  tick: () => void;
  gameOver: boolean;
  setGameOver: (value: boolean) => void;
}

const initialState: GameState = {
  grid: { rows: 20, cols: 20 },
  snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
  direction: 'RIGHT',
  food: [{ x: 15, y: 15 }],
  bombs: [{ x: 5, y: 5 }, { x: 12, y: 8 }],
  score: 0,
  speedMs: 200,
  running: false,
  mode: 'WALLS_SOLID',
};

// Helper functions
const getNextPosition = (head: Cell, direction: Direction): Cell => {
  switch (direction) {
    case 'UP': return { x: head.x, y: head.y - 1 };
    case 'DOWN': return { x: head.x, y: head.y + 1 };
    case 'LEFT': return { x: head.x - 1, y: head.y };
    case 'RIGHT': return { x: head.x + 1, y: head.y };
  }
};

const wrapPosition = (pos: Cell, grid: { rows: number; cols: number }): Cell => {
  return {
    x: (pos.x + grid.cols) % grid.cols,
    y: (pos.y + grid.rows) % grid.rows,
  };
};

const isOutOfBounds = (pos: Cell, grid: { rows: number; cols: number }): boolean => {
  return pos.x < 0 || pos.x >= grid.cols || pos.y < 0 || pos.y >= grid.rows;
};

const cellsEqual = (a: Cell, b: Cell): boolean => {
  return a.x === b.x && a.y === b.y;
};

const randomPosition = (grid: { rows: number; cols: number }, avoid: Cell[]): Cell => {
  let pos: Cell;
  let attempts = 0;
  do {
    pos = {
      x: Math.floor(Math.random() * grid.cols),
      y: Math.floor(Math.random() * grid.rows),
    };
    attempts++;
  } while (attempts < 100 && avoid.some(cell => cellsEqual(cell, pos)));
  return pos;
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  gameOver: false,
  
  setMode: (mode) => set({ mode }),
  setSpeed: (speedMs) => set({ speedMs }),
  setGridSize: (rows, cols) => set({ grid: { rows, cols } }),
  setDirection: (direction) => {
    const state = get();
    // Prevent 180-degree turns
    if (state.snake.length > 1) {
      const head = state.snake[0];
      const neck = state.snake[1];
      const nextPos = getNextPosition(head, direction);
      if (cellsEqual(nextPos, neck)) return;
    }
    set({ direction });
  },
  togglePause: () => set((state) => ({ running: !state.running })),
  setGameOver: (value) => set({ gameOver: value }),
  
  resetGame: () => set({ ...initialState, gameOver: false }),
  
  tick: () => {
    const state = get();
    if (!state.running || state.gameOver) return;
    
    const head = state.snake[0];
    let nextHead = getNextPosition(head, state.direction);
    
    // Handle wrap mode
    if (state.mode === 'WRAP') {
      nextHead = wrapPosition(nextHead, state.grid);
    } else if (isOutOfBounds(nextHead, state.grid)) {
      // Hit wall in WALLS_SOLID mode
      set({ running: false, gameOver: true });
      return;
    }
    
    // Check collision with self
    if (state.snake.some(segment => cellsEqual(segment, nextHead))) {
      set({ running: false, gameOver: true });
      return;
    }
    
    // Check collision with bombs
    if (state.bombs.some(bomb => cellsEqual(bomb, nextHead))) {
      set({ running: false, gameOver: true });
      return;
    }
    
    // Check if eating food
    const ateFood = state.food.some(f => cellsEqual(f, nextHead));
    
    let newSnake: Cell[];
    let newScore = state.score;
    let newFood = state.food;
    
    if (ateFood) {
      // Grow snake (don't remove tail)
      newSnake = [nextHead, ...state.snake];
      newScore += 10;
      
      // Spawn new food
      newFood = [randomPosition(state.grid, [...newSnake, ...state.bombs])];
    } else {
      // Move snake (remove tail)
      newSnake = [nextHead, ...state.snake.slice(0, -1)];
    }
    
    set({
      snake: newSnake,
      score: newScore,
      food: newFood,
    });
  },
}));
import { create } from 'zustand';
import { GameState, Direction, Cell, GameConfig } from '../types/game';

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
  spawnBomb: () => void;
  spawnFood: () => void;
  setConfig: (config: Partial<GameConfig>) => void;
}

const defaultConfig: GameConfig = {
  initialFoodCount: 2,
  initialBombCount: 2,
  autoBombSpawn: true,
  bombSpawnInterval: 50,
};

const createInitialState = (
  rows: number = 20, 
  cols: number = 20,
  config: GameConfig = defaultConfig
): GameState => {
  const center = { x: Math.floor(cols / 2), y: Math.floor(rows / 2) };
  const snake = [
    center,
    { x: center.x - 1, y: center.y },
    { x: center.x - 2, y: center.y }
  ];
  
  const occupied: Cell[] = [...snake];
  
  // Spawn initial food
  const food: Cell[] = [];
  for (let i = 0; i < config.initialFoodCount; i++) {
    const newFood = randomPosition({ rows, cols }, occupied);
    food.push(newFood);
    occupied.push(newFood);
  }
  
  // Spawn initial bombs
  const bombs: Cell[] = [];
  for (let i = 0; i < config.initialBombCount; i++) {
    const newBomb = randomPosition({ rows, cols }, occupied);
    bombs.push(newBomb);
    occupied.push(newBomb);
  }
  
  return {
    grid: { rows, cols },
    snake,
    direction: 'RIGHT',
    food,
    bombs,
    score: 0,
    speedMs: 200,
    running: false,
    mode: 'WALLS_SOLID',
    config,
  };
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
  ...createInitialState(),
  gameOver: false,
  
  setMode: (mode) => set({ mode }),
  setSpeed: (speedMs) => set({ speedMs }),
  
  setGridSize: (rows, cols) => {
    const state = get();
    const newState = createInitialState(rows, cols, state.config);
    set({
      ...newState,
      mode: state.mode,
      speedMs: state.speedMs,
      gameOver: false,
      running: false,
    });
  },
  
  setConfig: (configUpdate) => {
    const state = get();
    const newConfig = { ...state.config, ...configUpdate };
    const newState = createInitialState(state.grid.rows, state.grid.cols, newConfig);
    set({
      ...newState,
      mode: state.mode,
      speedMs: state.speedMs,
      gameOver: false,
      running: false,
    });
  },
  
  setDirection: (direction) => {
    const state = get();
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
  
  spawnBomb: () => {
    const state = get();
    const newBomb = randomPosition(state.grid, [...state.snake, ...state.food, ...state.bombs]);
    set({ bombs: [...state.bombs, newBomb] });
  },
  
  spawnFood: () => {
    const state = get();
    const newFood = randomPosition(state.grid, [...state.snake, ...state.food, ...state.bombs]);
    set({ food: [...state.food, newFood] });
  },
  
  resetGame: () => {
    const state = get();
    const newState = createInitialState(state.grid.rows, state.grid.cols, state.config);
    set({
      ...newState,
      mode: state.mode,
      speedMs: state.speedMs,
      gameOver: false,
    });
  },
  
  tick: () => {
    const state = get();
    if (!state.running || state.gameOver) return;
    
    const head = state.snake[0];
    let nextHead = getNextPosition(head, state.direction);
    
    if (state.mode === 'WRAP') {
      nextHead = wrapPosition(nextHead, state.grid);
    } else if (isOutOfBounds(nextHead, state.grid)) {
      set({ running: false, gameOver: true });
      return;
    }
    
    if (state.snake.some(segment => cellsEqual(segment, nextHead))) {
      set({ running: false, gameOver: true });
      return;
    }
    
    if (state.bombs.some(bomb => cellsEqual(bomb, nextHead))) {
      set({ running: false, gameOver: true });
      return;
    }
    
    const foodIndex = state.food.findIndex(f => cellsEqual(f, nextHead));
    const ateFood = foodIndex !== -1;
    
    let newSnake: Cell[];
    let newScore = state.score;
    let newFood = state.food;
    let newBombs = state.bombs;
    
    if (ateFood) {
      newSnake = [nextHead, ...state.snake];
      newScore += 10;
      
      newFood = state.food.filter((_, idx) => idx !== foodIndex);
      const spawnedFood = randomPosition(state.grid, [...newSnake, ...state.bombs, ...newFood]);
      newFood = [...newFood, spawnedFood];
      
      // Auto spawn bombs based on config
      if (
        state.config.autoBombSpawn && 
        state.config.bombSpawnInterval > 0 &&
        newScore % state.config.bombSpawnInterval === 0 &&
        newBombs.length < 20
      ) {
        const newBomb = randomPosition(state.grid, [...newSnake, ...newFood, ...newBombs]);
        newBombs = [...newBombs, newBomb];
      }
    } else {
      newSnake = [nextHead, ...state.snake.slice(0, -1)];
    }
    
    set({
      snake: newSnake,
      score: newScore,
      food: newFood,
      bombs: newBombs,
    });
  },
}));
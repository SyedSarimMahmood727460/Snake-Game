export type Cell = { x: number; y: number };
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameMode = 'WALLS_SOLID' | 'WRAP';

export interface GameConfig {
  initialFoodCount: number;
  initialBombCount: number;
  autoBombSpawn: boolean;
  bombSpawnInterval: number; // spawn bomb every X points
}

export interface GameState {
  grid: { rows: number; cols: number };
  snake: Cell[];
  direction: Direction;
  food: Cell[];
  bombs: Cell[];
  score: number;
  speedMs: number;
  running: boolean;
  mode: GameMode;
  config: GameConfig;
}
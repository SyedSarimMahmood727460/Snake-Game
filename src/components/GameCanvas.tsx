'use client';

import { useGameStore } from '@/store/gameStore';
import { useState, useEffect } from 'react';

export const GameCanvas = () => {
  const { grid, snake, food, bombs } = useGameStore();
  const [cellSize, setCellSize] = useState(30); 
  const [mounted, setMounted] = useState(false);
  
  //cell size
  useEffect(() => {
    const calculateCellSize = () => {
      const maxWidth = Math.min(window.innerWidth * 0.6, 600);
      const size = Math.floor(maxWidth / grid.cols);
      setCellSize(size);
    };
    
    calculateCellSize();
    setMounted(true);
    
    window.addEventListener('resize', calculateCellSize);
    return () => window.removeEventListener('resize', calculateCellSize);
  }, [grid.cols]);
  
  // is snake in grid
  const isSnakeinGrid = (x: number, y: number): 'head' | 'body' | null => {
    if (snake.length === 0) return null;
    if (snake[0].x === x && snake[0].y === y) return 'head';
    if (snake.some((cell, idx) => idx > 0 && cell.x === x && cell.y === y)) return 'body';
    return null;
  };
  
  // is food in grid
  const isFoodinGrid = (x: number, y: number): boolean => {
    return food.some(f => f.x === x && f.y === y);
  };
  
  // is bomb in grid
  const isBombinGrid = (x: number, y: number): boolean => {
    return bombs.some(b => b.x === x && b.y === y);
  };
  
  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading game board...</div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="grid gap-0 border-4 border-gray-800 rounded-lg overflow-hidden shadow-2xl bg-gray-900"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${grid.rows}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: grid.rows }).map((_, row) =>
          Array.from({ length: grid.cols }).map((_, col) => {
            const snakeType = isSnakeinGrid(col, row);
            const hasFood = isFoodinGrid(col, row);
            const hasBomb = isBombinGrid(col, row);
            
            let cellClass = 'transition-all duration-100 ';
            
            if (snakeType === 'head') {
              cellClass += 'bg-green-700 border border-green-600 shadow-lg';
            } else if (snakeType === 'body') {
              cellClass += 'bg-green-500 border border-green-400';
            } else if (hasFood) {
              cellClass += 'bg-red-500 rounded-full animate-pulse shadow-lg';
            } else if (hasBomb) {
              cellClass += 'bg-gray-700 rounded-full shadow-lg';
            } else {
              // Checkerboard pattern
              cellClass += (row + col) % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
            }
            
            return (
              <div
                key={`${row}-${col}`}
                className={cellClass}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
              >
                {snakeType === 'head' && (
                  <div className="w-full h-full flex items-center justify-center text-xs">
                    👁️
                  </div>
                )}
                {hasFood && (
                  <div className="w-full h-full flex items-center justify-center text-xs">
                    🍎
                  </div>
                )}
                {hasBomb && (
                  <div className="w-full h-full flex items-center justify-center text-xs">
                    💣
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
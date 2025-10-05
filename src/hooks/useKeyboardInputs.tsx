'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Direction } from '@/types/game';

export const useKeyboardInput = () => {
  const { direction, gameOver, setDirection, togglePause } = useGameStore();
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      let newDirection: Direction | null = null;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'DOWN') newDirection = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'UP') newDirection = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'RIGHT') newDirection = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'LEFT') newDirection = 'RIGHT';
          break;
        case ' ':
          e.preventDefault();
          togglePause();
          return;
      }
      
      if (newDirection) {
        e.preventDefault();
        setDirection(newDirection);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver, setDirection, togglePause]);
};
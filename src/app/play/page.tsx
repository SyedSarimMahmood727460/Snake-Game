'use client';

import { useGameStore } from '@/store/gameStore';
import { GameCanvas } from '@/components/GameCanvas';
import { HudBar } from '@/components/HudBar';
import { useKeyboardInput } from '@/hooks/useKeyboardInputs';
import { useEffect } from 'react';

export default function Play() {
  const { 
    running, 
    speedMs, 
    gameOver, 
    togglePause, 
    resetGame, 
    tick,
    // spawnBomb,
    // spawnFood 
  } = useGameStore();
  
  useKeyboardInput();
  
  useEffect(() => {
    if (!running) return;
    
    const interval = setInterval(() => {
      tick();
    }, speedMs);
    
    return () => clearInterval(interval);
  }, [running, speedMs, tick]);
  
  const handleReset = () => {
    resetGame();
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {gameOver && (
        <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-red-800">Game Over!</h3>
              <p className="text-red-700">You crashed! Try again?</p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg transition-all"
            >
              New Game
            </button>
          </div>
        </div>
      )}
      
      <div className="mb-6 flex justify-center gap-4 flex-wrap">
        <button
          onClick={togglePause}
          disabled={gameOver}
          className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all ${
            gameOver 
              ? 'bg-gray-400 cursor-not-allowed' 
              : running 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg transition-all"
        >
          Reset
        </button>
      </div>
      
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Board</h2>
          <GameCanvas />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Game Info</h3>
          <HudBar />
        </div>
      </div>
    </div>
  );
}
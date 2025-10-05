'use client';

import { useGameStore } from '@/store/gameStore';

export const HudBar = () => {
  const { score, speedMs, mode, direction, running } = useGameStore();
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg text-white">
        <div className="text-sm font-semibold mb-1">Score</div>
        <div className="text-4xl font-bold">{score}</div>
      </div>
      
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="text-sm text-gray-600 mb-1">Speed</div>
        <div className="text-xl font-semibold text-gray-800">{speedMs}ms</div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ width: `${((500 - speedMs) / 450) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="text-sm text-gray-600 mb-1">Mode</div>
        <div className="text-lg font-semibold text-gray-800">
          {mode === 'WALLS_SOLID' ? '🧱 Walls Solid' : '🔄 Wrap Mode'}
        </div>
      </div>
      
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="text-sm text-gray-600 mb-1">Direction</div>
        <div className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          {direction === 'UP' && '⬆️ UP'}
          {direction === 'DOWN' && '⬇️ DOWN'}
          {direction === 'LEFT' && '⬅️ LEFT'}
          {direction === 'RIGHT' && '➡️ RIGHT'}
        </div>
      </div>
      
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="text-sm text-gray-600 mb-1">Status</div>
        <div className={`text-lg font-semibold ${running ? 'text-green-600' : 'text-gray-400'}`}>
          {running ? '🟢 Running' : '⏸️ Paused'}
        </div>
      </div>
      
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-white">
        <div className="text-sm font-semibold mb-2">Controls</div>
        <div className="text-xs space-y-1">
          <div>⬆️ Arrow Up / W</div>
          <div>⬇️ Arrow Down / S</div>
          <div>⬅️ Arrow Left / A</div>
          <div>➡️ Arrow Right / D</div>
          <div className="pt-2 border-t border-gray-600">Space - Pause</div>
        </div>
      </div>
    </div>
  );
};
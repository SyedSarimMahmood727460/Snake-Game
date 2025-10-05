'use client';

import { useGameStore } from '@/store/gameStore';

export default function Settings() {
  const { mode, speedMs, grid, setMode, setSpeed, setGridSize, resetGame } = useGameStore();
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Game Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as 'WALLS_SOLID' | 'WRAP')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="WALLS_SOLID">🧱 Walls Solid (Die on collision)</option>
              <option value="WRAP">🔄 Wrap Mode (Teleport to opposite side)</option>
            </select>
            <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-600">
              {mode === 'WRAP' ? (
                <>
                  <strong>Wrap Mode:</strong> When the snake moves off one edge, 
                  it appears on the opposite side. Walls don't kill you!
                </>
              ) : (
                <>
                  <strong>Walls Solid:</strong> Hitting any wall ends the game. 
                  Stay inside the boundaries!
                </>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Speed: {speedMs}ms ({speedMs <= 100 ? 'Very Fast ⚡' : speedMs <= 200 ? 'Fast 🏃' : speedMs <= 350 ? 'Normal 🚶' : 'Slow 🐌'})
            </label>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={speedMs}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>⚡ Fast (50ms)</span>
              <span>🐌 Slow (500ms)</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Grid Size
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600 block mb-1">Rows</label>
                <input
                  type="number"
                  min="10"
                  max="40"
                  value={grid.rows}
                  onChange={(e) => setGridSize(Number(e.target.value), grid.cols)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 block mb-1">Columns</label>
                <input
                  type="number"
                  min="10"
                  max="40"
                  value={grid.cols}
                  onChange={(e) => setGridSize(grid.rows, Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Current: {grid.rows} × {grid.cols} = {grid.rows * grid.cols} cells
            </p>
          </div>
          
          <button
            onClick={resetGame}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
          >
            🔄 Reset to Defaults
          </button>
        </div>
      </div>
      
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>Stage 1 Complete:</strong> Grid and snake are now rendering! 
          Press arrow keys or WASD to see direction changes.
        </p>
      </div>
    </div>
  );
}
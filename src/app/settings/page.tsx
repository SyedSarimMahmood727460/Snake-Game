'use client';

import { useGameStore } from '@/store/gameStore';
import React from 'react';
import { useState } from 'react';

export default function Settings() {
  const { mode, speedMs, grid, config, setMode, setSpeed, setGridSize, setConfig } = useGameStore();
  
  // Local state for input fields to allow free typing
  const [rowsInput, setRowsInput] = useState(grid.rows.toString());
  const [colsInput, setColsInput] = useState(grid.cols.toString());
  
  // Update local state when grid changes from store
  React.useEffect(() => {
    setRowsInput(grid.rows.toString());
    setColsInput(grid.cols.toString());
  }, [grid.rows, grid.cols]);
  
  const validateAndSetRows = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      const validValue = Math.max(10, Math.min(40, num));
      setGridSize(validValue, grid.cols);
      setRowsInput(validValue.toString());
    } else {
      setRowsInput(grid.rows.toString());
    }
  };
  
  const validateAndSetCols = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      const validValue = Math.max(10, Math.min(40, num));
      setGridSize(grid.rows, validValue);
      setColsInput(validValue.toString());
    } else {
      setColsInput(grid.cols.toString());
    }
  };
  
  const handleResetSettings = () => {
    setMode('WALLS_SOLID');
    setSpeed(200);
    setGridSize(20, 20);
    setConfig({
      initialFoodCount: 2,
      initialBombCount: 2,
      autoBombSpawn: true,
      bombSpawnInterval: 50,
    });
  };
  
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
              <option value="WALLS_SOLID">Walls Solid (Die on collision)</option>
              <option value="WRAP">Wrap Mode (Teleport to opposite side)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Speed: {speedMs}ms ({speedMs <= 100 ? 'Very Fast' : speedMs <= 200 ? 'Fast' : speedMs <= 350 ? 'Normal' : 'Slow'})
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
              <span>Fast (50ms)</span>
              <span>Slow (500ms)</span>
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
                  value={rowsInput}
                  onChange={(e) => setRowsInput(e.target.value)}
                  onBlur={(e) => validateAndSetRows(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      validateAndSetRows(e.currentTarget.value);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 block mb-1">Columns</label>
                <input
                  type="number"
                  min="10"
                  max="40"
                  value={colsInput}
                  onChange={(e) => setColsInput(e.target.value)}
                  onBlur={(e) => validateAndSetCols(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      validateAndSetCols(e.currentTarget.value);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Range: 10-40 | Current: {grid.rows} × {grid.cols} = {grid.rows * grid.cols} cells
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Spawn Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Initial Food Count: {config.initialFoodCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={config.initialFoodCount}
                  onChange={(e) => setConfig({ initialFoodCount: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 food</span>
                  <span>10 food items</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Initial Bomb Count: {config.initialBombCount}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={config.initialBombCount}
                  onChange={(e) => setConfig({ initialBombCount: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>No bombs</span>
                  <span>10 bombs</span>
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={config.autoBombSpawn}
                    onChange={(e) => setConfig({ autoBombSpawn: e.target.checked })}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Auto-spawn bombs during gameplay
                  </span>
                </label>
              </div>

              {config.autoBombSpawn && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Spawn bomb every {config.bombSpawnInterval} points
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={config.bombSpawnInterval}
                    onChange={(e) => setConfig({ bombSpawnInterval: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Every 10 pts</span>
                    <span>Every 100 pts</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    A new bomb will spawn automatically every {config.bombSpawnInterval} points (max 20 bombs)
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleResetSettings}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
          >
            Reset Settings to Defaults
          </button>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Changing spawn configuration will reset the game with new settings applied.
        </p>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import BestPaceCalculator from './BestPaceCalculator';
import TargetBestPaceCalculator from './TargetBestPaceCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState('pace-to-time');

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b-2 border-indigo-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">NYRR Best Pace Tools</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('pace-to-time')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === 'pace-to-time'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Race → Best Pace
            </button>
            <button
              onClick={() => setActiveTab('time-to-pace')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === 'time-to-pace'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Best Pace → All Races
            </button>
          </div>
        </div>
      </nav>

      <main>
        {activeTab === 'pace-to-time' && <BestPaceCalculator />}
        {activeTab === 'time-to-pace' && <TargetBestPaceCalculator />}
      </main>

      <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-12 border-t border-gray-700">
        <p className="text-sm">NYRR Best Pace Calculator • Based on official NYRR corral assignment formula</p>
      </footer>
    </div>
  );
}

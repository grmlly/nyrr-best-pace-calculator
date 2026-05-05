import React, { useState } from 'react';

export default function TargetBestPaceCalculator() {
  const [paceInput, setPaceInput] = useState('8:00');
  const [results, setResults] = useState(null);

  const distances = {
    '5K': { miles: 3.107, factor: 2.09 },
    '4 Miles': { miles: 4, factor: 1.60 },
    '8K': { miles: 4.971, factor: 1.27 },
    '5 Miles': { miles: 5, factor: 1.26 },
    '10K': { miles: 6.214, factor: 1.00 },
    '12K': { miles: 7.456, factor: 0.82 },
    '15K': { miles: 9.321, factor: 0.65 },
    '10 Miles': { miles: 10, factor: 0.60 },
    '20K': { miles: 12.427, factor: 0.48 },
    'Half-Marathon': { miles: 13.109, factor: 0.45 },
    '25K': { miles: 15.534, factor: 0.38 },
    '30K': { miles: 18.641, factor: 0.31 },
    '20 Miles': { miles: 20, factor: 0.29 },
    'Marathon': { miles: 26.219, factor: 0.22 },
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const formatPace = (seconds, distanceMiles) => {
    const paceSeconds = seconds / distanceMiles;
    const paceMinutes = Math.floor(paceSeconds / 60);
    const paceSecs = Math.round(paceSeconds % 60);
    return `${paceMinutes}:${paceSecs.toString().padStart(2, '0')}/mile`;
  };

  const handleCalculate = () => {
    // Parse pace input (MM:SS format)
    const [paceMin, paceSec] = paceInput.split(':').map(Number);
    
    if (!paceMin) {
      setResults(null);
      return;
    }

    // Convert pace to seconds per mile
    const pacePerMileSeconds = paceMin * 60 + (paceSec || 0);
    
    // Equivalent 10K time = pace × 6.214 miles
    const equiv10KSeconds = pacePerMileSeconds * 6.214;

    // Calculate for each distance
    const raceData = {};
    Object.entries(distances).forEach(([distName, data]) => {
      const raceTimeSeconds = equiv10KSeconds / data.factor;
      raceData[distName] = {
        time: formatTime(raceTimeSeconds),
        pace: formatPace(raceTimeSeconds, data.miles),
        seconds: raceTimeSeconds
      };
    });

    setResults({
      targetPace: paceInput,
      equiv10K: formatTime(equiv10KSeconds),
      races: raceData
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Target Best Pace Calculator</h1>
        <p className="text-gray-600 mb-8">See all race times needed to achieve your desired best pace</p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Target Best Pace (MM:SS/mile)</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={paceInput}
                onChange={(e) => setPaceInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="8:00"
                className="flex-1 p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none font-mono"
              />
              <button
                onClick={handleCalculate}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg transition duration-200"
              >
                Calculate
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Equivalent 10K time: ~50:00 at 8:00/mile</p>
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg text-white">
              <p className="text-sm font-semibold opacity-90 mb-1">TARGET BEST PACE</p>
              <p className="text-5xl font-bold">{results.targetPace}/mile</p>
              <p className="text-sm opacity-90 mt-2">Equivalent 10K: {results.equiv10K}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Race Times & Paces</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Distance</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Finish Time</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Pace/Mile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(results.races).map(([distName, data], idx) => (
                      <tr 
                        key={distName} 
                        className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-emerald-50 transition`}
                      >
                        <td className="py-4 px-4 font-medium text-gray-800">{distName}</td>
                        <td className="py-4 px-4 text-right font-mono text-lg text-emerald-600">{data.time}</td>
                        <td className="py-4 px-4 text-right font-mono text-emerald-600">{data.pace}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-700 uppercase mb-2">💡 Tip</p>
                <p className="text-sm text-blue-900">Only NYRR races 3+ miles within a rolling 2-year window count toward your best pace.</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs font-semibold text-amber-700 uppercase mb-2">🎯 Strategy</p>
                <p className="text-sm text-amber-900">Half-marathon and marathon times are often easiest to achieve relative to shorter distances.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

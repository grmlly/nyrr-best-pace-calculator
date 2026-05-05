import React, { useState } from 'react';

export default function BestPaceCalculator() {
  const [distance, setDistance] = useState('10K');
  const [inputType, setInputType] = useState('time');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [pace, setPace] = useState('');
  const [result, setResult] = useState(null);

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

  const calculatePace = (totalSeconds, distanceMiles) => {
    const paceSeconds = totalSeconds / distanceMiles;
    const paceMinutes = Math.floor(paceSeconds / 60);
    const paceSecs = Math.round(paceSeconds % 60);
    return `${paceMinutes}:${paceSecs.toString().padStart(2, '0')}`;
  };

  const secondsToTimeString = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleCalculate = () => {
    const distanceData = distances[distance];
    let raceTimeSeconds;

    if (inputType === 'time') {
      raceTimeSeconds =
        (parseInt(hours) || 0) * 3600 +
        (parseInt(minutes) || 0) * 60 +
        (parseInt(seconds) || 0);
    } else {
      // Parse pace input (mm:ss format)
      const [paceMin, paceSec] = pace.split(':').map(Number);
      raceTimeSeconds = distanceData.miles * (paceMin * 60 + (paceSec || 0));
    }

    if (raceTimeSeconds === 0) {
      setResult(null);
      return;
    }

    // Calculate equivalent 10K time
    const equiv10KSeconds = raceTimeSeconds * distanceData.factor;

    // Convert to best pace (per mile)
    const bestPacePerMile = equiv10KSeconds / 6.214; // 10K = 6.214 miles
    const bestPaceMinutes = Math.floor(bestPacePerMile / 60);
    const bestPaceSeconds = Math.round(bestPacePerMile % 60);

    // Also calculate what the best pace would be for other distances
    const otherDistances = {};
    Object.entries(distances).forEach(([distName, data]) => {
      const equiv10KSeconds = bestPacePerMile * 6.214;
      const timeNeeded = equiv10KSeconds / data.factor;
      const timeMinutes = Math.floor(timeNeeded / 60);
      const timeSecs = Math.round(timeNeeded % 60);
      const displayTime = timeMinutes > 60
        ? `${Math.floor(timeMinutes / 60)}:${(timeMinutes % 60).toString().padStart(2, '0')}:${timeSecs.toString().padStart(2, '0')}`
        : `${timeMinutes}:${timeSecs.toString().padStart(2, '0')}`;
      otherDistances[distName] = {
        time: displayTime,
        pace: calculatePace(timeNeeded, data.miles)
      };
    });

    setResult({
      bestPace: `${bestPaceMinutes}:${bestPaceSeconds.toString().padStart(2, '0')}/mile`,
      equiv10K: secondsToTimeString(equiv10KSeconds),
      otherDistances
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">NYRR Best Pace Calculator</h1>
        <p className="text-gray-600 mb-8">Convert any NYRR race to your best pace for corral assignment</p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Race Distance</label>
            <select
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            >
              {Object.keys(distances).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Input Type</label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="time"
                  checked={inputType === 'time'}
                  onChange={(e) => setInputType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">Race Time (HH:MM:SS)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="pace"
                  checked={inputType === 'pace'}
                  onChange={(e) => setInputType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">Pace (MM:SS/mile)</span>
              </label>
            </div>
          </div>

          {inputType === 'time' ? (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Race Time</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="HH"
                  className="w-16 p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-center"
                />
                <span className="text-2xl text-gray-400">:</span>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  placeholder="MM"
                  className="w-16 p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-center"
                />
                <span className="text-2xl text-gray-400">:</span>
                <input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  placeholder="SS"
                  className="w-16 p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-center"
                />
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pace (MM:SS/mile)</label>
              <input
                type="text"
                value={pace}
                onChange={(e) => setPace(e.target.value)}
                placeholder="8:00"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              />
            </div>
          )}

          <button
            onClick={handleCalculate}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Calculate Best Pace
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-white">
              <p className="text-sm font-semibold opacity-90 mb-1">YOUR BEST PACE</p>
              <p className="text-5xl font-bold">{result.bestPace}</p>
              <p className="text-sm opacity-90 mt-2">Equivalent 10K: {result.equiv10K}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Times needed to match this pace at other distances:</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(result.otherDistances).map(([distName, data]) => (
                  <div key={distName} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{distName}</p>
                    <p className="text-sm text-indigo-600">{data.time}</p>
                    <p className="text-xs text-gray-600">{data.pace}/mile</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

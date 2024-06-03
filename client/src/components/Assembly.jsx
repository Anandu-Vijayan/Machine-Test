import React, { useContext, useState } from 'react';
import AssemblyContext from '../context/AssemblyContext';

const Assembly = () => {
  const assemblyContext = useContext(AssemblyContext);
  const { startAssembly, endAssembly, currentAssembly, error } = assemblyContext;

  const [bikeType, setBikeType] = useState('Bike 1');

  const onStart = async () => {
    try {
      await startAssembly(bikeType);
    } catch (err) {
      console.error("Failed to start assembly:", err);
    }
  };

  const onEnd = async () => {
    try {
      await endAssembly();
    } catch (err) {
      console.error("Failed to end assembly:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Bike Assembly</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="bikeType" className="block text-gray-700 text-sm font-bold mb-2">
            Select Bike
          </label>
          <select
            name="bikeType"
            value={bikeType}
            onChange={(e) => setBikeType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Bike 1">Bike 1 (50 minutes)</option>
            <option value="Bike 2">Bike 2 (1 hour)</option>
            <option value="Bike 3">Bike 3 (1 hour and 20 minutes)</option>
          </select>
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          onClick={onStart}
        >
          Start Assembly
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onEnd}
        >
          End Assembly
        </button>
        {currentAssembly && (
          <div className="mt-5">
            <h2 className="text-xl font-bold">Current Assembly</h2>
            <p>Bike: {currentAssembly.bikeType}</p>
            <p>Start Time: {new Date(currentAssembly.startTime).toLocaleTimeString()}</p>
          </div>
        )}
        {error && <div className="text-red-500 text-xs italic">{error}</div>}
      </div>
    </div>
  );
};

export default Assembly;

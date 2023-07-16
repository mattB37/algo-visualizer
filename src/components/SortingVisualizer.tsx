import React, { useState } from "react";
import BlockArray from "./BlockArray";
import useSort from "../hooks/useSort";
import { sortAlgorithms } from "../utils/sortAlgorithms";

type AlgorithmName = keyof typeof sortAlgorithms;

const SortingVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmName>("Bubble Sort");
  const [speed, setSpeed] = useState(1);
  const [count, setCount] = useState(8);
  const { blocks, generateSteps, isSorting, randomizeBlocks } = useSort(
    algorithm,
    speed,
    count
  );

  return (
    <div>
      <BlockArray blocks={blocks} />
      <select
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        disabled={isSorting}
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value as AlgorithmName)}
      >
        {Object.keys(sortAlgorithms).map((algorithmName) => (
          <option key={algorithmName} value={algorithmName}>
            {algorithmName}
          </option>
        ))}
      </select>
      <select
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        disabled={isSorting}
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      >
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={2}>2x</option>
        <option value={5}>5x</option>
        <option value={10}>10x</option>
        <option value={100}>100x</option>
        <option value={1000}>1000x</option>
      </select>
      <button
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={generateSteps}
        disabled={isSorting}
      >
        Sort
      </button>
      <button
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={randomizeBlocks}
        disabled={isSorting}
      >
        Randomize Array
      </button>
      <div>
        <label className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Blocks: {count}
          <input
            type="range"
            value={count}
            min={4}
            max={30}
            onChange={(e) => setCount(Number(e.target.value))}
            disabled={isSorting}
          />
        </label>
      </div>
    </div>
  );
};

export default SortingVisualizer;

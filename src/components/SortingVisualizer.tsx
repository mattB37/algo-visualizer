import React, { useState } from "react";
import BlockArray from "./BlockArray";
import useSort from "../hooks/useSort";
import { sortAlgorithms } from "../utils/sortAlgorithms";

type AlgorithmName = keyof typeof sortAlgorithms;

const SortingVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmName>("Bubble Sort");
  const [speed, setSpeed] = useState(1);
  const { blocks, generateSteps, isSorting, randomizeBlocks } = useSort(
    algorithm,
    speed
  );

  return (
    <div>
      <BlockArray blocks={blocks} />
      <select
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
      <button onClick={generateSteps} disabled={isSorting}>
        Sort
      </button>
      <button onClick={randomizeBlocks} disabled={isSorting}>
        Randomize Array
      </button>
    </div>
  );
};

export default SortingVisualizer;

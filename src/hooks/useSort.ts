// useSort.ts
import { useState, useEffect } from "react";
import { sortAlgorithms } from "../utils/sortAlgorithms";
import { randomize } from "../utils/utils";
import { Block } from "../types";

const useSort = (
  algorithmName: keyof typeof sortAlgorithms,
  speed: number,
  count: number
) => {
  const [blocks, setBlocks] = useState(randomize(count));
  const [steps, setSteps] = useState<Block[][]>([]);
  const [isSorting, setIsSorting] = useState(false);

  const randomizeBlocks = () => {
    setBlocks(randomize(count));
  };

  const generateSteps = () => {
    setIsSorting(true);
    setSteps(sortAlgorithms[algorithmName](blocks));
  };

  useEffect(() => {
    // console.log(steps.length);
    if (steps.length > 0) {
      const timer = setTimeout(() => {
        setBlocks(steps[0]);
        setSteps(steps.slice(1));
      }, 500 / speed);
      return () => clearTimeout(timer);
    } else {
      setIsSorting(false);
    }
  }, [steps, speed]);

  return { blocks, steps, generateSteps, isSorting, randomizeBlocks };
};

export default useSort;

import React, { useState, useEffect } from "react";

interface Block {
  id: number;
  size: number;
  highlighted: boolean;
  toSwap: boolean;
}

const randomize = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    size: getRandomNumber(10, 300),
    highlighted: false,
    toSwap: false,
  }));
};

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

const BubbleSortDemo: React.FC = () => {
  // var initialBlocks = randomize();
  const [blocks, setBlocks] = useState<Block[]>(randomize());
  const [sortSteps, setSortSteps] = useState<Block[][]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState<number>(1);

  useEffect(() => {
    if (sortSteps.length > 0) {
      const timer = setTimeout(() => {
        setBlocks(sortSteps[0]);
        setSortSteps(sortSteps.slice(1));
      }, 500 / speed);
      return () => clearTimeout(timer); // cleanup on unmount or when sortSteps changes
    } else {
      setIsSorting(false);
    }
  }, [sortSteps, speed]);

  const bubbleSort = () => {
    setIsSorting(true);
    let arr = [...blocks];
    let len = arr.length;
    let newSortSteps: Block[][] = [];

    for (let i = 1; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        // add highlight to blocks being swapped
        arr[j].highlighted = true;
        arr[j + 1].toSwap = true;
        newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
        if (arr[j].size > arr[j + 1].size) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
          // remove the highlight
          arr[j].toSwap = false;
          arr[j + 1].highlighted = false;
          newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
        } else {
          // remove the highlight
          arr[j].highlighted = false;
          arr[j + 1].toSwap = false;
          newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
        }
      }
    }

    for (let i = 0; i < len; i++) {
      arr[i].toSwap = false;
      arr[i].highlighted = false;
    }

    setSortSteps(newSortSteps);
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      {blocks.map((block) => (
        <div
          key={block.id}
          style={{
            height: `${block.size}px`,
            width: "30px",
            backgroundColor: block.highlighted
              ? "red"
              : block.toSwap
              ? "green"
              : "blue",
            margin: "5px",
          }}
        />
      ))}
      <button onClick={bubbleSort} disabled={isSorting}>
        Bubble Sort
      </button>
      <button onClick={() => setBlocks(randomize())} disabled={isSorting}>
        Randomize List
      </button>
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
      </select>
    </div>
  );
};

export default BubbleSortDemo;

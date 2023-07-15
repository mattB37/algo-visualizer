//sortalgorithms.ts
import { Block } from "../types";

const bubbleSortSteps = (blocks: Block[]): Block[][] => {
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

  return newSortSteps;
};

const bogoSortSteps = (blocks: Block[]): Block[][] => {
  let arr = blocks.slice(0, 5);
  let len = arr.length;
  let newSortSteps: Block[][] = [];

  const isSorted = (arr: Block[]) => {
    for (let i = 0; i < len - 1; i++) {
      if (arr[i].size > arr[i + 1].size) {
        return false;
      }
    }
    return true;
  };

  const shuffleArray = (arr: Block[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  while (!isSorted(arr)) {
    for (let i = 0; i < len; i++) {
      arr[i].toSwap = true;
    }
    newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
    shuffleArray(arr);
    for (let i = 0; i < len; i++) {
      arr[i].toSwap = false;
    }
    newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
  }

  return newSortSteps;
};

const selectionSortSteps = (blocks: Block[]): Block[][] => {
  let arr = [...blocks];
  let len = arr.length;
  let newSortSteps: Block[][] = [];

  for (let i = 0; i < len - 1; i++) {
    arr[i].toSwap = true;
    newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
    let minElement = { val: arr[i].size, idx: i };
    for (let j = i + 1; j < len; j++) {
      arr[j].highlighted = true;
      if (arr[j].size < minElement.val) {
        minElement.val = arr[j].size;
        minElement.idx = j;
      }
      newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
      arr[j].highlighted = false;
    }
    if (minElement.idx !== i) {
      arr[minElement.idx].toSwap = true;
      newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
      [arr[i], arr[minElement.idx]] = [arr[minElement.idx], arr[i]];
      newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
    }
    arr[minElement.idx].toSwap = false;
    arr[i].toSwap = false;
    newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
  }
  return newSortSteps;
};

const insertionSortSteps = (blocks: Block[]): Block[][] => {
  let arr = [...blocks];
  let len = arr.length;
  let newSortSteps: Block[][] = [];
  for (let i = 1; i < len; i++) {
    let j = i;
    arr[i].highlighted = true;
    newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
    arr[i].highlighted = false;
    while (j > 0 && arr[j - 1].size > arr[j].size) {
      arr[j - 1].highlighted = true;
      arr[j].toSwap = true;
      newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps

      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];

      arr[j].highlighted = false;
      arr[j - 1].toSwap = false;
      newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
      j -= 1;
    }
    newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
  }
  return newSortSteps;
};

const mergeSortSteps = (blocks: Block[]): Block[][] => {
  let arr = [...blocks];
  let workArr = arr.map((block) => ({ ...block }));
  let len = arr.length;
  let newSortSteps: Block[][] = [];

  newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps

  const merge = (
    A: Block[],
    left: number,
    right: number,
    end: number,
    B: Block[]
  ) => {
    let i = left;
    let j = right;
    for (let k = left; k < end; k++) {
      if (i < right && (j >= end || arr[i].size <= arr[j].size)) {
        B[k] = A[i];
        i = i + 1;
      } else {
        B[k] = A[j];
        j = j + 1;
      }
      B[k].highlighted = true;
    }
    newSortSteps.push(B.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
  };

  const copy = (A: Block[], B: Block[]) => {
    for (let i = 0; i < len; i++) {
      A[i] = B[i];
      A[i].highlighted = false;
    }
    newSortSteps.push(A.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
  };

  for (let width = 1; width < len; width *= 2) {
    for (let i = 0; i < len; i = i + 2 * width) {
      merge(
        arr,
        i,
        Math.min(i + width, len),
        Math.min(i + 2 * width, len),
        workArr
      );
    }
    copy(arr, workArr);
    newSortSteps.push(workArr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps
  }

  newSortSteps.push(arr.map((block) => ({ ...block }))); // push a deep copy of the array to the steps

  return newSortSteps;
};

// Export the sorting functions in an object, so they can be accessed by name
export const sortAlgorithms = {
  "Bubble Sort": bubbleSortSteps,
  "Bogo Sort": bogoSortSteps,
  "Selection Sort": selectionSortSteps,
  "Insertion Sort": insertionSortSteps,
  "Merge Sort (iterative)": mergeSortSteps,
};

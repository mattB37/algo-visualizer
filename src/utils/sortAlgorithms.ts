//sortalgorithms.ts
import { Block } from "../types";

const bubbleSortSteps = (blocks: Block[]): Block[][] => {
  // implementation of Bubble Sort
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

// const bogoSortSteps = (blocks: Block[]): Block[][] => {
//   // implementation of Bogo Sort
// };

// Export the sorting functions in an object, so they can be accessed by name
export const sortAlgorithms = {
  "Bubble Sort": bubbleSortSteps,
  //   bogoSortSteps,
};

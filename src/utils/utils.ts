//utils.ts
// Function to get random number
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

// Function to randomize array
export const randomize = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    size: getRandomNumber(10, 300),
    width: "30px",
    highlighted: false,
    toSwap: false,
  }));
};

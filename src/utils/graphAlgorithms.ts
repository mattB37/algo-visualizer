//graphAlgorithms.ts
import { Node, Edge } from "reactflow";
import { GraphStorage } from "../types";

const BFSSteps = (nodes: Node[], edges: Edge[]): GraphStorage[] => {
  //   const { nodes, edges } = graph;
  //   const queue = [];
  //   const visited = new Set();
  const newSearchSteps: GraphStorage[] = [];

  return newSearchSteps;
};

// Export the sorting functions in an object, so they can be accessed by name
export const graphAlgorithms = {
  "Breadth First Search": BFSSteps,
};

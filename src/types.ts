import { Node, Edge } from "reactflow";

export type Block = {
  id: number;
  size: number;
  width: string;
  highlighted: boolean;
  toSwap: boolean;
  pivot: boolean;
};

//types.ts
export type GraphStorage = {
  nodes: Node[];
  edges: Edge[];
};
